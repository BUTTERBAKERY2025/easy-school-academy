import type { Sql } from "./sql";
import type { Database } from "./types";

/**
 * Writes a whole `Database` into Postgres.
 *
 * Shared by the two ways rows first arrive: `db:migrate`, which carries an
 * existing JSON file across, and `db:seed`, which puts the demo accounts into a
 * database that has none. Both are re-runnable — every insert is `on conflict do
 * nothing`, so a second pass reports zero and changes nothing.
 */

export type ImportCounts = {
  users: number;
  progress: number;
  subscriptions: number;
  activity: number;
  assignments: number;
};

export async function importDatabase(client: Sql, db: Database): Promise<ImportCounts> {
  const counts: ImportCounts = { users: 0, progress: 0, subscriptions: 0, activity: 0, assignments: 0 };

  await client.begin(async (tx) => {
    // Parents go in before the children that reference them; the self-reference
    // on users is why this cannot be one bulk insert.
    const users = [...db.users].sort(
      (a, b) => Number(Boolean(a.parentId)) - Number(Boolean(b.parentId)),
    );

    for (const user of users) {
      const rows = await tx`
        insert into users (id, name, email, password_hash, role, curriculum_id, grade_id, parent_id,
                           teaching_grade_ids, xp, streak_days, last_active_on, created_at)
        values (${user.id}, ${user.name}, ${user.email.toLowerCase()}, ${user.passwordHash}, ${user.role},
                ${user.curriculumId ?? null}, ${user.gradeId ?? null}, ${user.parentId ?? null},
                ${user.teachingGradeIds ?? []}, ${user.xp}, ${user.streakDays},
                ${user.lastActiveOn ?? null}, ${user.createdAt})
        on conflict do nothing returning id
      `;
      counts.users += rows.length;
    }

    for (const row of db.progress) {
      const rows = await tx`
        insert into progress (id, user_id, lesson_id, unit_id, subject_id, grade_id, curriculum_id,
                              status, step_index, score, seconds_spent, started_at, updated_at, completed_at)
        values (${row.id}, ${row.userId}, ${row.lessonId}, ${row.unitId}, ${row.subjectId}, ${row.gradeId},
                ${row.curriculumId}, ${row.status}, ${row.stepIndex}, ${row.score}, ${row.secondsSpent},
                ${row.startedAt}, ${row.updatedAt}, ${row.completedAt ?? null})
        on conflict do nothing returning id
      `;
      counts.progress += rows.length;
    }

    for (const row of db.subscriptions) {
      const rows = await tx`
        insert into subscriptions (id, user_id, plan_id, interval, status, seats, started_at,
                                   current_period_end, cancelled_at)
        values (${row.id}, ${row.userId}, ${row.planId}, ${row.interval}, ${row.status}, ${row.seats},
                ${row.startedAt}, ${row.currentPeriodEnd}, ${row.cancelledAt ?? null})
        on conflict do nothing returning id
      `;
      counts.subscriptions += rows.length;
    }

    for (const row of db.activity) {
      const rows = await tx`
        insert into activity (id, user_id, kind, lesson_id, badge_id, xp, created_at)
        values (${row.id}, ${row.userId}, ${row.kind}, ${row.lessonId ?? null}, ${row.badgeId ?? null},
                ${row.xp}, ${row.createdAt})
        on conflict do nothing returning id
      `;
      counts.activity += rows.length;
    }

    for (const row of db.assignments) {
      const rows = await tx`
        insert into assignments (id, teacher_id, grade_id, subject_id, lesson_ids, due_on, created_at)
        values (${row.id}, ${row.teacherId}, ${row.gradeId}, ${row.subjectId}, ${row.lessonIds},
                ${row.dueOn}, ${row.createdAt})
        on conflict do nothing returning id
      `;
      counts.assignments += rows.length;
    }
  });

  return counts;
}

export async function report(client: Sql, counts: ImportCounts): Promise<void> {
  console.log("\ninserted this run:");
  for (const [table, n] of Object.entries(counts)) {
    const total = Number((await client.unsafe(`select count(*)::int as n from ${table}`))[0].n);
    console.log(`  ${table.padEnd(14)} +${String(n).padStart(4)}   (now ${total})`);
  }
}
