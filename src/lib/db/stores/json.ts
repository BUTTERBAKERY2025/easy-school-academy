import "server-only";
import { mutate, newId, read } from "../store";
import {
  EmailTakenError,
  isLive,
  nextStreak,
  normaliseEmail,
  toPublic,
  xpForLesson,
  type NewUser,
  type ProgressInput,
  type Store,
} from "../contract";
import type { LessonProgress, Subscription, User } from "../types";

/**
 * Persistence in a JSON file — the development and demo backend.
 *
 * This is the behaviour the app shipped with, kept intact so that running
 * without a DATABASE_URL still works: a clone with no database starts, seeds
 * itself and is usable. Everything it does is also done by the Postgres store,
 * which is what a deployment should be pointed at.
 */
export const jsonStore: Store = {
  /* ----------------------------------------------------------------- users */

  async findUserByEmail(email) {
    const db = await read();
    const wanted = normaliseEmail(email);
    return db.users.find((user) => user.email.toLowerCase() === wanted);
  },

  async findUserById(id) {
    const db = await read();
    return db.users.find((user) => user.id === id);
  },

  async listUsers() {
    const db = await read();
    return db.users.map(toPublic);
  },

  async listChildren(parentId) {
    const db = await read();
    return db.users.filter((user) => user.parentId === parentId).map(toPublic);
  },

  async createUser(input: NewUser) {
    return mutate((db) => {
      const email = normaliseEmail(input.email);
      if (db.users.some((user) => user.email.toLowerCase() === email)) throw new EmailTakenError();

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
  },

  async updateUser(id, patch) {
    return mutate((db) => {
      const user = db.users.find((candidate) => candidate.id === id);
      if (!user) return undefined;
      Object.assign(user, patch);
      return user;
    });
  },

  /* --------------------------------------------------------- subscriptions */

  async subscriptionOf(userId) {
    const db = await read();
    return db.subscriptions.find((row) => row.userId === userId && isLive(row));
  },

  async startSubscription(userId, planId, interval, seats) {
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
  },

  async cancelSubscription(userId) {
    await mutate((db) => {
      for (const subscription of db.subscriptions) {
        if (subscription.userId === userId && subscription.status === "active") {
          subscription.status = "cancelled";
          subscription.cancelledAt = new Date().toISOString();
        }
      }
    });
  },

  async listSubscriptions() {
    const db = await read();
    return [...db.subscriptions];
  },

  async listActiveSubscriptions() {
    const db = await read();
    return db.subscriptions.filter(isLive);
  },

  /* -------------------------------------------------------------- progress */

  async progressOf(userId) {
    const db = await read();
    return db.progress.filter((row) => row.userId === userId);
  },

  async progressForLesson(userId, lessonId) {
    const db = await read();
    return db.progress.find((row) => row.userId === userId && row.lessonId === lessonId);
  },

  async saveProgress(input: ProgressInput) {
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
        } satisfies LessonProgress;
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

        const earned = xpForLesson(input.score);
        const user = db.users.find((candidate) => candidate.id === input.userId);
        if (user) {
          const today = now.slice(0, 10);
          user.xp += earned;
          user.streakDays = nextStreak(user.lastActiveOn, today, user.streakDays);
          user.lastActiveOn = today;
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
  },

  async allProgress() {
    const db = await read();
    return [...db.progress];
  },

  /* -------------------------------------------------------------- activity */

  async recentActivity(userId, limit) {
    const db = await read();
    return db.activity
      .filter((row) => row.userId === userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, limit);
  },

  async logActivity(userId, kind, xp, lessonId) {
    await mutate((db) => {
      db.activity.push({ id: newId("act"), userId, kind, lessonId, xp, createdAt: new Date().toISOString() });
    });
  },

  /* ----------------------------------------------------------- assignments */

  async assignmentsFor(gradeId) {
    const db = await read();
    return db.assignments.filter((row) => row.gradeId === gradeId);
  },

  async assignmentsByTeacher(teacherId) {
    const db = await read();
    return db.assignments.filter((row) => row.teacherId === teacherId);
  },

  async studentsInGrades(gradeIds) {
    const db = await read();
    const wanted = new Set(gradeIds);
    return db.users
      .filter((user) => user.role === "student" && user.gradeId && wanted.has(user.gradeId))
      .map(toPublic);
  },
};
