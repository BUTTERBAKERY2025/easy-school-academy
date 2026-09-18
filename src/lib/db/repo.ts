import "server-only";
import { mutate, newId, read } from "./store";
import type {
  Activity,
  ActivityKind,
  Assignment,
  BillingInterval,
  LessonProgress,
  PublicUser,
  Role,
  Subscription,
  User,
} from "./types";

function toPublic(user: User): PublicUser {
  const copy: Partial<User> = { ...user };
  delete copy.passwordHash;
  return copy as PublicUser;
}

const isLive = (subscription: Subscription): boolean =>
  subscription.status === "active" && new Date(subscription.currentPeriodEnd).getTime() > Date.now();

const normaliseEmail = (email: string) => email.trim().toLowerCase();

/* ------------------------------------------------------------------- users */

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const db = await read();
  const wanted = normaliseEmail(email);
  return db.users.find((user) => user.email.toLowerCase() === wanted);
}

export async function findUserById(id: string): Promise<User | undefined> {
  const db = await read();
  return db.users.find((user) => user.id === id);
}

export async function listUsers(): Promise<PublicUser[]> {
  const db = await read();
  return db.users.map(toPublic);
}

export async function listChildren(parentId: string): Promise<PublicUser[]> {
  const db = await read();
  return db.users.filter((user) => user.parentId === parentId).map(toPublic);
}

export type NewUser = {
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  curriculumId?: string;
  gradeId?: string;
  parentId?: string;
};

export async function createUser(input: NewUser): Promise<User> {
  return mutate((db) => {
    const email = normaliseEmail(input.email);
    if (db.users.some((user) => user.email.toLowerCase() === email)) {
      throw new EmailTakenError();
    }

    const user: User = {
      id: newId("usr"),
      name: input.name.trim(),
      email,
      passwordHash: input.passwordHash,
      role: input.role,
      curriculumId: input.curriculumId,
      gradeId: input.gradeId,
      parentId: input.parentId,
      xp: 0,
      streakDays: 0,
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);
    return user;
  });
}

export class EmailTakenError extends Error {
  constructor() {
    super("email_taken");
    this.name = "EmailTakenError";
  }
}

export async function updateUser(id: string, patch: Partial<Omit<User, "id">>): Promise<User | undefined> {
  return mutate((db) => {
    const user = db.users.find((candidate) => candidate.id === id);
    if (!user) return undefined;
    Object.assign(user, patch);
    return user;
  });
}

/* ----------------------------------------------------------- subscriptions */

export async function subscriptionOf(userId: string): Promise<Subscription | undefined> {
  const db = await read();
  return db.subscriptions.find((subscription) => subscription.userId === userId && isLive(subscription));
}

/**
 * A student is covered by their own subscription or by the parent account that
 * follows them, which is how the family plan works.
 */
export async function effectiveSubscription(user: User): Promise<Subscription | undefined> {
  const own = await subscriptionOf(user.id);
  if (own) return own;
  if (!user.parentId) return undefined;
  return subscriptionOf(user.parentId);
}

export async function startSubscription(
  userId: string,
  planId: string,
  interval: BillingInterval,
  seats: number,
): Promise<Subscription> {
  return mutate((db) => {
    for (const existing of db.subscriptions) {
      if (existing.userId === userId && existing.status === "active") {
        existing.status = "cancelled";
        existing.cancelledAt = new Date().toISOString();
      }
    }

    const now = new Date();
    const end = new Date(now);
    if (interval === "yearly") end.setFullYear(end.getFullYear() + 1);
    else end.setMonth(end.getMonth() + 1);

    const subscription: Subscription = {
      id: newId("sub"),
      userId,
      planId,
      interval,
      status: "active",
      seats,
      startedAt: now.toISOString(),
      currentPeriodEnd: end.toISOString(),
    };
    db.subscriptions.push(subscription);
    db.activity.push({
      id: newId("act"),
      userId,
      kind: "subscribed",
      xp: 0,
      createdAt: now.toISOString(),
    });
    return subscription;
  });
}

export async function cancelSubscription(userId: string): Promise<void> {
  await mutate((db) => {
    for (const subscription of db.subscriptions) {
      if (subscription.userId === userId && subscription.status === "active") {
        subscription.status = "cancelled";
        subscription.cancelledAt = new Date().toISOString();
      }
    }
  });
}

export async function listSubscriptions(): Promise<Subscription[]> {
  const db = await read();
  return [...db.subscriptions];
}

export async function listActiveSubscriptions(): Promise<Subscription[]> {
  const db = await read();
  return db.subscriptions.filter(isLive);
}

/* ---------------------------------------------------------------- progress */

export async function progressOf(userId: string): Promise<LessonProgress[]> {
  const db = await read();
  return db.progress.filter((row) => row.userId === userId);
}

export async function progressForLesson(userId: string, lessonId: string): Promise<LessonProgress | undefined> {
  const db = await read();
  return db.progress.find((row) => row.userId === userId && row.lessonId === lessonId);
}

export type ProgressInput = {
  userId: string;
  lessonId: string;
  unitId: string;
  subjectId: string;
  gradeId: string;
  curriculumId: string;
  stepIndex: number;
  score: number;
  secondsSpent: number;
  completed: boolean;
};

export async function saveProgress(input: ProgressInput): Promise<LessonProgress> {
  return mutate((db) => {
    const now = new Date().toISOString();
    let row = db.progress.find(
      (candidate) => candidate.userId === input.userId && candidate.lessonId === input.lessonId,
    );

    if (!row) {
      row = {
        id: newId("prg"),
        userId: input.userId,
        lessonId: input.lessonId,
        unitId: input.unitId,
        subjectId: input.subjectId,
        gradeId: input.gradeId,
        curriculumId: input.curriculumId,
        status: "in_progress",
        stepIndex: 0,
        score: 0,
        secondsSpent: 0,
        startedAt: now,
        updatedAt: now,
      };
      db.progress.push(row);
    }

    // Progress never moves backwards: a review pass cannot lower a finished score.
    row.stepIndex = Math.max(row.stepIndex, input.stepIndex);
    row.score = Math.max(row.score, input.score);
    row.secondsSpent += Math.max(0, input.secondsSpent);
    row.updatedAt = now;

    if (input.completed && row.status !== "completed") {
      row.status = "completed";
      row.completedAt = now;

      const earned = 20 + Math.round(input.score / 2);
      const user = db.users.find((candidate) => candidate.id === input.userId);
      if (user) {
        user.xp += earned;
        const today = now.slice(0, 10);
        if (user.lastActiveOn !== today) {
          const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
          user.streakDays = user.lastActiveOn === yesterday ? user.streakDays + 1 : 1;
          user.lastActiveOn = today;
        }
      }

      db.activity.push({
        id: newId("act"),
        userId: input.userId,
        kind: "lesson_completed",
        lessonId: input.lessonId,
        xp: earned,
        createdAt: now,
      });
    }

    return row;
  });
}

/* ---------------------------------------------------------------- activity */

export async function recentActivity(userId: string, limit = 8): Promise<Activity[]> {
  const db = await read();
  return db.activity
    .filter((row) => row.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export async function logActivity(userId: string, kind: ActivityKind, xp = 0, lessonId?: string): Promise<void> {
  await mutate((db) => {
    db.activity.push({ id: newId("act"), userId, kind, lessonId, xp, createdAt: new Date().toISOString() });
  });
}

/* ------------------------------------------------------------- assignments */

export async function assignmentsFor(gradeId: string): Promise<Assignment[]> {
  const db = await read();
  return db.assignments.filter((row) => row.gradeId === gradeId);
}

export async function assignmentsByTeacher(teacherId: string): Promise<Assignment[]> {
  const db = await read();
  return db.assignments.filter((row) => row.teacherId === teacherId);
}

export async function studentsInGrades(gradeIds: string[]): Promise<PublicUser[]> {
  const db = await read();
  const wanted = new Set(gradeIds);
  return db.users.filter((user) => user.role === "student" && user.gradeId && wanted.has(user.gradeId)).map(toPublic);
}

export async function allProgress(): Promise<LessonProgress[]> {
  const db = await read();
  return [...db.progress];
}
