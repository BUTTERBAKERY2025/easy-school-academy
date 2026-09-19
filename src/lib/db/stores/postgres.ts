import "server-only";
import { randomUUID } from "node:crypto";
import { sql } from "../sql";
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
} from "../types";

/**
 * Persistence in Postgres.
 *
 * The JSON store had to serialise every write through one queue, because a
 * read-modify-write of the whole file cannot safely interleave. Here the
 * database does that work: the statements below are each atomic, the ones that
 * touch two tables run in a transaction, and the constraints in db/schema.sql
 * hold the invariants the queue used to protect — one account per address, one
 * progress row per student and lesson, one active subscription per account.
 */

export function newId(prefix: string): string {
  return `${prefix}_${randomUUID().replace(/-/g, "").slice(0, 16)}`;
}

/* ------------------------------------------------------------------ shapes */

/** A row as Postgres returns it, before the column names are camel-cased. */
type Row = Record<string, unknown>;

const iso = (value: unknown): string | undefined => {
  if (!value) return undefined;
  return value instanceof Date ? value.toISOString() : String(value);
};

function rowToUser(row: Row): User {
  return {
    id: row.id as string,
    name: row.name as string,
    email: row.email as string,
    passwordHash: row.password_hash as string,
    role: row.role as Role,
    curriculumId: (row.curriculum_id as string) ?? undefined,
    gradeId: (row.grade_id as string) ?? undefined,
    parentId: (row.parent_id as string) ?? undefined,
    teachingGradeIds: (row.teaching_grade_ids as string[] | null) ?? undefined,
    xp: Number(row.xp),
    streakDays: Number(row.streak_days),
    lastActiveOn: iso(row.last_active_on)?.slice(0, 10),
    createdAt: iso(row.created_at)!,
  };
}

function rowToProgress(row: Row): LessonProgress {
  return {
    id: row.id as string,
    userId: row.user_id as string,
    lessonId: row.lesson_id as string,
    unitId: row.unit_id as string,
    subjectId: row.subject_id as string,
    gradeId: row.grade_id as string,
    curriculumId: row.curriculum_id as string,
    status: row.status as LessonProgress["status"],
    stepIndex: Number(row.step_index),
    score: Number(row.score),
    secondsSpent: Number(row.seconds_spent),
    startedAt: iso(row.started_at)!,
    updatedAt: iso(row.updated_at)!,
    completedAt: iso(row.completed_at),
  };
}

function rowToSubscription(row: Row): Subscription {
  return {
    id: row.id as string,
    userId: row.user_id as string,
    planId: row.plan_id as string,
    interval: row.interval as BillingInterval,
    status: row.status as Subscription["status"],
    seats: Number(row.seats),
    startedAt: iso(row.started_at)!,
    currentPeriodEnd: iso(row.current_period_end)!,
    cancelledAt: iso(row.cancelled_at),
  };
}

function rowToActivity(row: Row): Activity {
  return {
    id: row.id as string,
    userId: row.user_id as string,
    kind: row.kind as ActivityKind,
    lessonId: (row.lesson_id as string) ?? undefined,
    badgeId: (row.badge_id as string) ?? undefined,
    xp: Number(row.xp),
    createdAt: iso(row.created_at)!,
  };
}

function rowToAssignment(row: Row): Assignment {
  return {
    id: row.id as string,
    teacherId: row.teacher_id as string,
    gradeId: row.grade_id as string,
    subjectId: row.subject_id as string,
    lessonIds: (row.lesson_ids as string[] | null) ?? [],
    dueOn: iso(row.due_on)!.slice(0, 10),
    createdAt: iso(row.created_at)!,
  };
}

/* ------------------------------------------------------------------- store */

export const postgresStore: Store = {
  /* ----------------------------------------------------------------- users */

  async findUserByEmail(email) {
    const rows = await sql()<Row[]>`
      select * from users where lower(email) = ${normaliseEmail(email)} limit 1
    `;
    return rows[0] ? rowToUser(rows[0]) : undefined;
  },

  async findUserById(id) {
    const rows = await sql()<Row[]>`select * from users where id = ${id} limit 1`;
    return rows[0] ? rowToUser(rows[0]) : undefined;
  },

  async listUsers() {
    const rows = await sql()<Row[]>`select * from users order by created_at`;
    return rows.map((row) => toPublic(rowToUser(row)));
  },

  async listChildren(parentId) {
    const rows = await sql()<Row[]>`select * from users where parent_id = ${parentId} order by created_at`;
    return rows.map((row) => toPublic(rowToUser(row)));
  },

  async createUser(input: NewUser) {
    const email = normaliseEmail(input.email);
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

    // The unique index decides, not a prior read: two sign-ups for the same
    // address at the same moment would both pass a check-then-insert.
    const rows = await sql()<Row[]>`
      insert into users (id, name, email, password_hash, role, curriculum_id, grade_id, parent_id, xp, streak_days, created_at)
      values (${user.id}, ${user.name}, ${user.email}, ${user.passwordHash}, ${user.role},
              ${user.curriculumId ?? null}, ${user.gradeId ?? null}, ${user.parentId ?? null},
              0, 0, ${user.createdAt})
      on conflict do nothing
      returning *
    `;
    if (rows.length === 0) throw new EmailTakenError();
    return rowToUser(rows[0]);
  },

  async updateUser(id, patch) {
    // Only the columns present in the patch are written, so an update never
    // silently resets a field the caller did not mention.
    const columns: Record<string, unknown> = {};
    if ("name" in patch) columns.name = patch.name;
    if ("email" in patch) columns.email = normaliseEmail(patch.email!);
    if ("passwordHash" in patch) columns.password_hash = patch.passwordHash;
    if ("role" in patch) columns.role = patch.role;
    if ("curriculumId" in patch) columns.curriculum_id = patch.curriculumId ?? null;
    if ("gradeId" in patch) columns.grade_id = patch.gradeId ?? null;
    if ("parentId" in patch) columns.parent_id = patch.parentId ?? null;
    if ("teachingGradeIds" in patch) columns.teaching_grade_ids = patch.teachingGradeIds ?? [];
    if ("xp" in patch) columns.xp = patch.xp;
    if ("streakDays" in patch) columns.streak_days = patch.streakDays;
    if ("lastActiveOn" in patch) columns.last_active_on = patch.lastActiveOn ?? null;

    if (Object.keys(columns).length === 0) return this.findUserById(id);

    const rows = await sql()<Row[]>`
      update users set ${sql()(columns)} where id = ${id} returning *
    `;
    return rows[0] ? rowToUser(rows[0]) : undefined;
  },

  /* --------------------------------------------------------- subscriptions */

  async subscriptionOf(userId) {
    const rows = await sql()<Row[]>`
      select * from subscriptions
      where user_id = ${userId} and status = 'active' and current_period_end > now()
      limit 1
    `;
    return rows[0] ? rowToSubscription(rows[0]) : undefined;
  },

  async startSubscription(userId, planId, interval, seats) {
    const now = new Date();
    const end = new Date(now);
    if (interval === "yearly") end.setFullYear(end.getFullYear() + 1);
    else end.setMonth(end.getMonth() + 1);

    // Cancelling the old row and inserting the new one is one unit of work: the
    // partial unique index would reject the insert if the cancel were not
    // already visible, and a failure between them would leave two active rows.
    return sql().begin(async (tx) => {
      await tx`
        update subscriptions set status = 'cancelled', cancelled_at = ${now.toISOString()}
        where user_id = ${userId} and status = 'active'
      `;

      const rows = await tx<Row[]>`
        insert into subscriptions (id, user_id, plan_id, interval, status, seats, started_at, current_period_end)
        values (${newId("sub")}, ${userId}, ${planId}, ${interval}, 'active', ${seats},
                ${now.toISOString()}, ${end.toISOString()})
        returning *
      `;

      await tx`
        insert into activity (id, user_id, kind, xp, created_at)
        values (${newId("act")}, ${userId}, 'subscribed', 0, ${now.toISOString()})
      `;

      return rowToSubscription(rows[0]);
    }) as Promise<Subscription>;
  },

  async cancelSubscription(userId) {
    await sql()`
      update subscriptions set status = 'cancelled', cancelled_at = ${new Date().toISOString()}
      where user_id = ${userId} and status = 'active'
    `;
  },

  async listSubscriptions() {
    const rows = await sql()<Row[]>`select * from subscriptions order by started_at desc`;
    return rows.map(rowToSubscription);
  },

  async listActiveSubscriptions() {
    const rows = await sql()<Row[]>`select * from subscriptions order by started_at desc`;
    return rows.map(rowToSubscription).filter(isLive);
  },

  /* -------------------------------------------------------------- progress */

  async progressOf(userId) {
    const rows = await sql()<Row[]>`select * from progress where user_id = ${userId}`;
    return rows.map(rowToProgress);
  },

  async progressForLesson(userId, lessonId) {
    const rows = await sql()<Row[]>`
      select * from progress where user_id = ${userId} and lesson_id = ${lessonId} limit 1
    `;
    return rows[0] ? rowToProgress(rows[0]) : undefined;
  },

  async saveProgress(input: ProgressInput) {
    const now = new Date().toISOString();

    return sql().begin(async (tx) => {
      // Progress never moves backwards — a review pass cannot lower a finished
      // score — and time is added rather than replaced. Doing that in the upsert
      // means two saves racing produce the same answer as two saves in order.
      // Read and lock the existing row first, as its own statement. RETURNING can
      // only ever show the new row, and a CTE cannot stand in for this: every
      // sub-statement of one command sees the same snapshot, so a `before` clause
      // beside the upsert would not observe what the upsert is about to change.
      // This value decides whether finishing has already been paid for.
      const prior = await tx<Row[]>`
        select completed_at from progress
        where user_id = ${input.userId} and lesson_id = ${input.lessonId}
        for update
      `;
      const alreadyFinished = Boolean(prior[0]?.completed_at);

      const rows = await tx<Row[]>`
          insert into progress (
            id, user_id, lesson_id, unit_id, subject_id, grade_id, curriculum_id,
            status, step_index, score, seconds_spent, started_at, updated_at, completed_at
          )
          values (
            ${newId("prg")}, ${input.userId}, ${input.lessonId}, ${input.unitId}, ${input.subjectId},
            ${input.gradeId}, ${input.curriculumId},
            ${input.completed ? "completed" : "in_progress"},
            ${input.stepIndex}, ${input.score}, ${Math.max(0, input.secondsSpent)},
            ${now}, ${now}, ${input.completed ? now : null}
          )
          on conflict (user_id, lesson_id) do update set
            step_index    = greatest(progress.step_index, excluded.step_index),
            score         = greatest(progress.score, excluded.score),
            seconds_spent = progress.seconds_spent + excluded.seconds_spent,
            status        = case when progress.status = 'completed' then 'completed' else excluded.status end,
            completed_at  = coalesce(progress.completed_at, excluded.completed_at),
            updated_at    = excluded.updated_at
          returning *
      `;

      const saved = rowToProgress(rows[0]);
      if (input.completed && !alreadyFinished) {
        const earned = xpForLesson(input.score);
        const today = now.slice(0, 10);

        const users = await tx<Row[]>`
          select xp, streak_days, last_active_on from users where id = ${input.userId} for update
        `;
        if (users[0]) {
          const lastActiveOn = iso(users[0].last_active_on)?.slice(0, 10);
          await tx`
            update users set
              xp = ${Number(users[0].xp) + earned},
              streak_days = ${nextStreak(lastActiveOn, today, Number(users[0].streak_days))},
              last_active_on = ${today}
            where id = ${input.userId}
          `;
        }

        await tx`
          insert into activity (id, user_id, kind, lesson_id, xp, created_at)
          values (${newId("act")}, ${input.userId}, 'lesson_completed', ${input.lessonId}, ${earned}, ${now})
        `;
      }

      return saved;
    }) as Promise<LessonProgress>;
  },

  async allProgress() {
    const rows = await sql()<Row[]>`select * from progress`;
    return rows.map(rowToProgress);
  },

  /* -------------------------------------------------------------- activity */

  async recentActivity(userId, limit) {
    const rows = await sql()<Row[]>`
      select * from activity where user_id = ${userId}
      order by created_at desc limit ${limit}
    `;
    return rows.map(rowToActivity);
  },

  async logActivity(userId, kind, xp, lessonId) {
    await sql()`
      insert into activity (id, user_id, kind, lesson_id, xp, created_at)
      values (${newId("act")}, ${userId}, ${kind}, ${lessonId ?? null}, ${xp}, ${new Date().toISOString()})
    `;
  },

  /* ----------------------------------------------------------- assignments */

  async assignmentsFor(gradeId) {
    const rows = await sql()<Row[]>`select * from assignments where grade_id = ${gradeId} order by due_on`;
    return rows.map(rowToAssignment);
  },

  async assignmentsByTeacher(teacherId) {
    const rows = await sql()<Row[]>`select * from assignments where teacher_id = ${teacherId} order by due_on`;
    return rows.map(rowToAssignment);
  },

  async studentsInGrades(gradeIds): Promise<PublicUser[]> {
    if (gradeIds.length === 0) return [];
    const rows = await sql()<Row[]>`
      select * from users where role = 'student' and grade_id = any(${gradeIds}) order by name
    `;
    return rows.map((row) => toPublic(rowToUser(row)));
  },
};
