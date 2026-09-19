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

/**
 * What persistence has to provide, whichever store is behind it.
 *
 * Both backends are written against this, so the JSON file and Postgres cannot
 * drift apart in what they offer — a method added to one fails to compile until
 * the other has it too.
 */

export type NewUser = {
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  curriculumId?: string;
  gradeId?: string;
  parentId?: string;
};

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

export type Store = {
  findUserByEmail(email: string): Promise<User | undefined>;
  findUserById(id: string): Promise<User | undefined>;
  listUsers(): Promise<PublicUser[]>;
  listChildren(parentId: string): Promise<PublicUser[]>;
  createUser(input: NewUser): Promise<User>;
  updateUser(id: string, patch: Partial<Omit<User, "id">>): Promise<User | undefined>;

  subscriptionOf(userId: string): Promise<Subscription | undefined>;
  startSubscription(
    userId: string,
    planId: string,
    interval: BillingInterval,
    seats: number,
  ): Promise<Subscription>;
  cancelSubscription(userId: string): Promise<void>;
  listSubscriptions(): Promise<Subscription[]>;
  listActiveSubscriptions(): Promise<Subscription[]>;

  progressOf(userId: string): Promise<LessonProgress[]>;
  progressForLesson(userId: string, lessonId: string): Promise<LessonProgress | undefined>;
  saveProgress(input: ProgressInput): Promise<LessonProgress>;
  allProgress(): Promise<LessonProgress[]>;

  recentActivity(userId: string, limit: number): Promise<Activity[]>;
  logActivity(userId: string, kind: ActivityKind, xp: number, lessonId?: string): Promise<void>;

  assignmentsFor(gradeId: string): Promise<Assignment[]>;
  assignmentsByTeacher(teacherId: string): Promise<Assignment[]>;
  studentsInGrades(gradeIds: string[]): Promise<PublicUser[]>;
};

export class EmailTakenError extends Error {
  constructor() {
    super("email_taken");
    this.name = "EmailTakenError";
  }
}

export function toPublic(user: User): PublicUser {
  const copy: Partial<User> = { ...user };
  delete copy.passwordHash;
  return copy as PublicUser;
}

export const isLive = (subscription: Subscription): boolean =>
  subscription.status === "active" && new Date(subscription.currentPeriodEnd).getTime() > Date.now();

export const normaliseEmail = (email: string): string => email.trim().toLowerCase();

/**
 * The XP a finished lesson is worth, and the streak it continues.
 *
 * Both stores award the same thing, so the rule lives here rather than being
 * written out twice and drifting.
 */
export const xpForLesson = (score: number): number => 20 + Math.round(score / 2);

export function nextStreak(lastActiveOn: string | undefined, today: string, current: number): number {
  if (lastActiveOn === today) return current;
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  return lastActiveOn === yesterday ? current + 1 : 1;
}
