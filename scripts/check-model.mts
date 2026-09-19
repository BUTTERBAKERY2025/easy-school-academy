/**
 * Exercises the learner model against dates rather than a database.
 *
 * The scheduler decides what a student is shown first every time they open the
 * dashboard, and it is the one part of the product whose mistakes are invisible
 * — a plan in the wrong order still looks like a plan. So the rules are asserted
 * here: that memory decays, that a scraped pass is not mastery, that the most
 * faded lesson is reviewed first, and that a student without a subscription is
 * never sent to a lesson they cannot open.
 *
 *   npm run check:model
 */
import { lessonState, retrievability, stabilityDays, studyPlan } from "../src/lib/learning/model.js";
import { getGrade, getLesson, getUnit } from "../src/lib/content/index.js";
import { reviewQuestions, reviewSeed, unitGlossary, unitObjectives } from "../src/lib/learning/unit-review.js";
import { isQuestion } from "../src/lib/content/types.js";
import type { LessonProgress } from "../src/lib/db/types.js";

const DAY = 86_400_000;
const now = new Date("2026-09-19T12:00:00Z");
const ago = (days: number) => new Date(now.getTime() - days * DAY).toISOString();

const grade = getGrade("saudi-g4");
if (!grade) throw new Error("saudi-g4 is missing from the catalogue");
const maths = grade.subjects.find((subject) => subject.id.includes("math"));
if (!maths) throw new Error("saudi-g4 has no mathematics");
const lessons = maths.units.flatMap((unit) => unit.lessons);

function row(lessonId: string, score: number, daysAgo: number): LessonProgress {
  const lesson = getLesson(lessonId);
  if (!lesson) throw new Error(`no such lesson: ${lessonId}`);
  return {
    id: `p-${lessonId}`,
    userId: "u",
    lessonId,
    unitId: lesson.unitId,
    subjectId: lesson.subjectId,
    gradeId: lesson.gradeId,
    curriculumId: lesson.curriculumId,
    status: "completed",
    stepIndex: 8,
    score,
    secondsSpent: 600,
    startedAt: ago(daysAgo),
    updatedAt: ago(daysAgo),
    completedAt: ago(daysAgo),
  };
}

let failures = 0;
function check(name: string, ok: boolean, detail = ""): void {
  if (ok) {
    console.log(`  ok    ${name}`);
    return;
  }
  failures += 1;
  console.log(`  FAIL  ${name}${detail ? `  — ${detail}` : ""}`);
}

console.log("\nforgetting");
check("recall is whole on the day", Math.abs(retrievability(0, 10) - 1) < 1e-9);
check("recall halves after one stability", Math.abs(retrievability(10, 10) - 0.5) < 1e-9);
check("and keeps falling after that", retrievability(20, 10) < retrievability(10, 10));
check(
  "a better score is held for longer",
  stabilityDays(row(lessons[0].id, 100, 0)) > stabilityDays(row(lessons[0].id, 60, 0)),
);

console.log("\nlevels");
const fresh = lessonState(lessons[0], row(lessons[0].id, 95, 0), now);
const stale = lessonState(lessons[0], row(lessons[0].id, 95, 60), now);
const scraped = lessonState(lessons[0], row(lessons[0].id, 55, 0), now);
check("a near-perfect score today is mastered", fresh.level === "mastered", fresh.level);
check("nothing learnt today is due", !fresh.needsReview);
check("the same lesson two months on is not still mastered", stale.level !== "mastered", stale.level);
check("and it is due for review", stale.needsReview);
check("a scraped pass is familiar, not proficient", scraped.level === "familiar", scraped.level);
check("an untouched lesson is new", lessonState(lessons[1], undefined, now).level === "new");

console.log("\ntoday's plan");
const rows = new Map<string, LessonProgress>([
  [lessons[0].id, row(lessons[0].id, 95, 40)],
  [lessons[1].id, row(lessons[1].id, 80, 25)],
  [lessons[2].id, row(lessons[2].id, 100, 0)],
]);
const plan = studyPlan(grade.subjects, rows, now);
console.log(`        ${plan.map((item) => `${item.reason}(${item.subject.id})`).join("  ")}`);
check("three things to do", plan.length === 3, String(plan.length));
check("review comes before anything new", plan[0]?.reason === "review", plan[0]?.reason);
check("the most faded lesson is first", plan[0]?.lesson.id === lessons[0].id, plan[0]?.lesson.id);
check("at most two reviews in one day", plan.filter((item) => item.reason === "review").length <= 2);
check(
  "two lessons from one subject are not adjacent",
  plan.every((item, at) => at === 0 || item.subject.id !== plan[at - 1].subject.id),
);

console.log("\nwithout a subscription");
const locked = studyPlan(grade.subjects, new Map(), now, { hasAccess: false });
check("nothing locked is offered", locked.length > 0 && locked.every((item) => item.lesson.free));

console.log("\nthe unit's opening and closing");
const fractions = getUnit("saudi-g4-math-fractions");
if (!fractions) throw new Error("saudi-g4-math-fractions is missing from the catalogue");

const seed = reviewSeed(fractions.id, now);
const draw = reviewQuestions(fractions, seed);
const perLesson = new Map<string, number>();
for (const question of draw) perLesson.set(question.lessonId, (perLesson.get(question.lessonId) ?? 0) + 1);

check("a unit with an authored lesson has a review", draw.length > 0, String(draw.length));
check("the same day draws the same questions",
  JSON.stringify(reviewQuestions(fractions, seed).map((q) => q.block.id)) ===
    JSON.stringify(draw.map((q) => q.block.id)));
check("another day draws again without failing", reviewQuestions(fractions, reviewSeed(fractions.id, new Date("2026-11-01"))).length > 0);
check("no more than two questions from one lesson", [...perLesson.values()].every((n) => n <= 2));
check("no more than ten questions in all", draw.length <= 10, String(draw.length));
check("every drawn block really is a question", draw.every((q) => isQuestion(q.block)));
check("the draw walks the unit rather than working down it",
  perLesson.size < 2 || draw.every((q, at) => at === 0 || q.lessonId !== draw[at - 1].lessonId));

const emptyUnit = getUnit("saudi-g4-math-geometry") ?? getUnit("saudi-g4-science-life");
check("a unit with nothing written has no review",
  !emptyUnit || reviewQuestions(emptyUnit, seed).length === 0);

const objectives = unitObjectives(fractions);
check("the unit states what it is for", objectives.length > 0, String(objectives.length));
check("no objective is listed twice", new Set(objectives.map((o) => o.ar)).size === objectives.length);
check("objectives are capped", unitObjectives(fractions, 2).length <= 2);
// Fractions teaches through worked examples and defines no vocabulary; reading
// does. Both cases have to come out right.
const reading = getUnit("saudi-g4-arabic-qiraa");
if (!reading) throw new Error("saudi-g4-arabic-qiraa is missing from the catalogue");
const words = unitGlossary(reading);
check("the glossary gathers the words a unit defines", words.length > 0, String(words.length));
check("no word is listed twice", new Set(words.map((entry) => entry.term.ar)).size === words.length);
check("the glossary is capped", unitGlossary(reading, 2).length <= 2);
check("a unit that defines no words has no glossary", unitGlossary(fractions).length === 0);

console.log(failures ? `\n${failures} failure(s).\n` : "\nno problems found.\n");
process.exit(failures ? 1 : 0);
