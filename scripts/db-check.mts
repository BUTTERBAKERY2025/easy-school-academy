/**
 * Runs the same scenario against both stores and compares the answers.
 *
 * The point of the repository is that the app cannot tell which one is behind
 * it, and the only way to know that holds is to ask both the same questions.
 * The Postgres half needs DATABASE_URL and a database with db/schema.sql
 * applied; it is skipped, loudly, when there is none.
 *
 *   DATABASE_URL=postgres://… npm run db:check
 */
import { jsonStore } from "../src/lib/db/stores/json.js";
import { postgresStore } from "../src/lib/db/stores/postgres.js";
import { sql, usingPostgres } from "../src/lib/db/sql.js";
import type { Store } from "../src/lib/db/contract.js";

let failures = 0;

function check(what: string, got: unknown, want: unknown) {
  const a = JSON.stringify(got);
  const b = JSON.stringify(want);
  if (a === b) {
    console.log(`   ok   ${what}`);
  } else {
    failures += 1;
    console.log(`   FAIL ${what}\n        got  ${a}\n        want ${b}`);
  }
}

/** Everything the two stores must agree on, expressed as plain values. */
async function scenario(store: Store, tag: string) {
  console.log(`\n── ${tag} ──`);
  const stamp = Date.now() + Math.random().toString(36).slice(2, 8);

  const parent = await store.createUser({
    name: "ولي أمر", email: `parent-${stamp}@test.local`, passwordHash: "x", role: "parent",
  });
  const child = await store.createUser({
    name: "طالب", email: `child-${stamp}@test.local`, passwordHash: "x", role: "student",
    curriculumId: "saudi", gradeId: "saudi-g4", parentId: parent.id,
  });

  check("email is folded to lower case", (await store.findUserByEmail(`CHILD-${stamp}@TEST.LOCAL`))?.id, child.id);
  check("a second sign-up on one address is refused", await taken(store, `child-${stamp}@test.local`), true);
  check("the parent sees their child", (await store.listChildren(parent.id)).map((u) => u.id), [child.id]);
  check("a public user carries no password hash", "passwordHash" in ((await store.listUsers()).find((u) => u.id === child.id) ?? {}), false);

  const lesson = { unitId: "saudi-g4-math-fractions", subjectId: "saudi-g4-math", gradeId: "saudi-g4", curriculumId: "saudi" };

  await store.saveProgress({ userId: child.id, lessonId: "l1", ...lesson, stepIndex: 2, score: 40, secondsSpent: 60, completed: false });
  await store.saveProgress({ userId: child.id, lessonId: "l1", ...lesson, stepIndex: 5, score: 90, secondsSpent: 30, completed: true });
  // A review pass: lower score, earlier step. Neither may move the row backwards.
  const after = await store.saveProgress({ userId: child.id, lessonId: "l1", ...lesson, stepIndex: 1, score: 10, secondsSpent: 15, completed: true });

  check("one row per student and lesson", (await store.progressOf(child.id)).length, 1);
  check("the score never drops", after.score, 90);
  check("the step never rewinds", after.stepIndex, 5);
  check("time accumulates", after.secondsSpent, 105);
  check("completion sticks", after.status, "completed");

  const learner = await store.findUserById(child.id);
  check("a finished lesson is paid once", learner?.xp, 65);
  check("the streak starts at one", learner?.streakDays, 1);
  check("one completion is logged", (await store.recentActivity(child.id, 10)).filter((a) => a.kind === "lesson_completed").length, 1);

  await store.startSubscription(parent.id, "family", "monthly", 4);
  check("the parent's plan is live", (await store.subscriptionOf(parent.id))?.planId, "family");
  check("the child has none of their own", await store.subscriptionOf(child.id), undefined);

  await store.startSubscription(parent.id, "family", "yearly", 4);
  const live = (await store.listActiveSubscriptions()).filter((s) => s.userId === parent.id);
  check("resubscribing leaves exactly one active plan", live.length, 1);
  check("and it is the new one", live[0]?.interval, "yearly");

  await store.cancelSubscription(parent.id);
  check("cancelling ends it", await store.subscriptionOf(parent.id), undefined);

  check("students are found by grade", (await store.studentsInGrades(["saudi-g4"])).some((u) => u.id === child.id), true);
  check("an empty grade list asks for nothing", await store.studentsInGrades([]), []);

  await store.updateUser(child.id, { name: "طالب مُحدَّث" });
  check("an update touches only what it names", (await store.findUserById(child.id))?.gradeId, "saudi-g4");
  check("and does change what it does name", (await store.findUserById(child.id))?.name, "طالب مُحدَّث");
}

async function taken(store: Store, email: string): Promise<boolean> {
  try {
    await store.createUser({ name: "x", email, passwordHash: "x", role: "student" });
    return false;
  } catch (error) {
    // Compared by name, not with `instanceof`: the runner loads this file and the
    // stores through different specifiers, so the class can be two objects here
    // even though the application bundles it once.
    return (error as Error).name === "EmailTakenError";
  }
}

await scenario(jsonStore, "JSON file");

if (usingPostgres()) {
  await scenario(postgresStore, "Postgres");
  await sql().end();
} else {
  console.log("\n── Postgres ── skipped: DATABASE_URL is not set");
}

console.log(failures === 0 ? "\nboth stores agree." : `\n${failures} disagreement(s).`);
process.exit(failures === 0 ? 0 : 1);
