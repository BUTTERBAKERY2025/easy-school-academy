import type { Lesson, Subject, Unit } from "@/lib/content/types";
import type { LessonProgress } from "@/lib/db/types";

/**
 * The learner model: what the student knows, how firmly, and what to do next.
 *
 * Two results from the learning-science literature shape everything below.
 * Distributed practice and practice testing are the two study techniques with
 * the strongest evidence behind them; and mastery is a claim that decays — a
 * lesson answered perfectly six weeks ago is not the same knowledge as one
 * answered perfectly yesterday. So this module never stores a level. It derives
 * one from the score and from how long ago the lesson was practised, and the
 * dashboard shows the student both halves of that reasoning rather than a bare
 * number.
 *
 * Everything here is a pure function of rows the database already keeps, which
 * is deliberate: an estimate that is derived cannot drift out of step with the
 * progress it was estimated from, and it needs no migration to change.
 */

/* ------------------------------------------------------------------- memory */

/**
 * Forgetting is modelled as `R = 2^(-t/S)`: recall falls to one half after a
 * time `S`, the stability of the memory. This is the same shape the DSR family
 * of schedulers uses. A full implementation fits stability per student from a
 * long review history; this one reads it off the evidence a single progress row
 * actually carries, which is less precise and cannot pretend otherwise.
 */
export function retrievability(daysSince: number, stabilityDays: number): number {
  return 2 ** (-Math.max(0, daysSince) / Math.max(stabilityDays, 0.5));
}

/** A lesson scraped through is forgotten in days; a perfect one holds for a month. */
const MIN_STABILITY_DAYS = 3;
const STABILITY_RANGE = 9;
/** Practising something a second time is what makes it durable, so it counts double. */
const REPRACTICE_FACTOR = 2.2;

export function stabilityDays(row: LessonProgress): number {
  const quality = Math.max(0, Math.min(100, row.score)) / 100;
  const base = MIN_STABILITY_DAYS * (1 + STABILITY_RANGE * quality * quality);
  // The one repetition a stored row can evidence: the student came back to a
  // lesson they had already finished.
  const repractised = Boolean(row.completedAt) && row.updatedAt > (row.completedAt as string);
  return repractised ? base * REPRACTICE_FACTOR : base;
}

/** Below this the lesson is due: the standard "review at high retention" rule. */
const REVIEW_AT = 0.85;
/** Below this the model stops claiming the level the score alone would give. */
const FADED_AT = 0.7;

/* ------------------------------------------------------------------ mastery */

/**
 * Five states, the set intelligent tutors have settled on. `familiar` is
 * deliberately not a pass: a lesson finished at under 70% is knowledge the
 * student has met, not knowledge they hold.
 */
export type MasteryLevel = "new" | "attempted" | "familiar" | "proficient" | "mastered";

export const MASTERY_ORDER: MasteryLevel[] = ["new", "attempted", "familiar", "proficient", "mastered"];

const PROFICIENT_SCORE = 70;
const MASTERED_SCORE = 90;

function attainedLevel(row: LessonProgress | undefined): MasteryLevel {
  if (!row) return "new";
  if (row.status !== "completed") return "attempted";
  if (row.score >= MASTERED_SCORE) return "mastered";
  if (row.score >= PROFICIENT_SCORE) return "proficient";
  return "familiar";
}

function lower(level: MasteryLevel): MasteryLevel {
  const at = MASTERY_ORDER.indexOf(level);
  return MASTERY_ORDER[Math.max(0, at - 1)];
}

export function atLeast(level: MasteryLevel, floor: MasteryLevel): boolean {
  return MASTERY_ORDER.indexOf(level) >= MASTERY_ORDER.indexOf(floor);
}

const DAY_MS = 86_400_000;

function daysBetween(iso: string, now: Date): number {
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return 0;
  return Math.max(0, (now.getTime() - then) / DAY_MS);
}

export type LessonState = {
  lesson: Lesson;
  row?: LessonProgress;
  /** The level the score alone would give, before any forgetting. */
  attained: MasteryLevel;
  /** What the student is expected to recall today, 0-1. */
  retrievability: number;
  /** `attained`, lowered once the memory has faded. This is what is shown. */
  level: MasteryLevel;
  daysSince: number;
  stability: number;
  /** Days until the lesson falls due. Negative means it is due already. */
  dueInDays: number;
  needsReview: boolean;
};

export function lessonState(lesson: Lesson, row: LessonProgress | undefined, now: Date): LessonState {
  const attained = attainedLevel(row);

  if (!row || row.status !== "completed") {
    return {
      lesson,
      row,
      attained,
      retrievability: 0,
      level: attained,
      daysSince: row ? daysBetween(row.updatedAt, now) : 0,
      stability: 0,
      dueInDays: 0,
      needsReview: false,
    };
  }

  const stability = stabilityDays(row);
  const daysSince = daysBetween(row.updatedAt, now);
  const recall = retrievability(daysSince, stability);
  // Solve R = REVIEW_AT for t, so the countdown the student sees is the model's
  // own threshold rather than a separate guess.
  const dueAfter = stability * Math.log2(1 / REVIEW_AT);

  return {
    lesson,
    row,
    attained,
    retrievability: recall,
    level: recall < FADED_AT ? lower(attained) : attained,
    daysSince,
    stability,
    dueInDays: dueAfter - daysSince,
    needsReview: recall < REVIEW_AT,
  };
}

/* ---------------------------------------------------------------- aggregate */

export type MasteryTally = Record<MasteryLevel, number>;

function tally(states: LessonState[]): MasteryTally {
  const counts: MasteryTally = { new: 0, attempted: 0, familiar: 0, proficient: 0, mastered: 0 };
  for (const state of states) counts[state.level] += 1;
  return counts;
}

export type UnitState = {
  unit: Unit;
  states: LessonState[];
  counts: MasteryTally;
  /** Share of the unit's lessons held at proficient or better, 0-100. */
  mastery: number;
  started: boolean;
  complete: boolean;
  dueCount: number;
};

export function unitState(unit: Unit, rows: Map<string, LessonProgress>, now: Date): UnitState {
  const states = unit.lessons.map((lesson) => lessonState(lesson, rows.get(lesson.id), now));
  const counts = tally(states);
  const strong = counts.proficient + counts.mastered;
  return {
    unit,
    states,
    counts,
    mastery: states.length ? Math.round((strong / states.length) * 100) : 0,
    started: states.some((state) => state.level !== "new"),
    complete: strong === states.length && states.length > 0,
    dueCount: states.filter((state) => state.needsReview).length,
  };
}

export type SubjectState = {
  subject: Subject;
  units: UnitState[];
  counts: MasteryTally;
  mastery: number;
  total: number;
  completed: number;
  dueCount: number;
  /** The lesson to open next in this subject: unfinished, earliest in order. */
  next?: Lesson;
};

export function subjectState(subject: Subject, rows: Map<string, LessonProgress>, now: Date): SubjectState {
  const units = subject.units.map((unit) => unitState(unit, rows, now));
  const states = units.flatMap((entry) => entry.states);
  const counts = tally(states);
  const strong = counts.proficient + counts.mastered;

  return {
    subject,
    units,
    counts,
    mastery: states.length ? Math.round((strong / states.length) * 100) : 0,
    total: states.length,
    completed: states.filter((state) => state.row?.status === "completed").length,
    dueCount: states.filter((state) => state.needsReview).length,
    next: states.find((state) => state.row?.status !== "completed")?.lesson,
  };
}

/* --------------------------------------------------------------------- plan */

/**
 * Why a lesson is in today's plan. The student is told which of the three it is,
 * because "revise this, you are about to lose it" and "here is something new"
 * ask for different effort and deserve different words.
 */
export type PlanReason = "review" | "resume" | "fresh";

export type PlanItem = {
  reason: PlanReason;
  lesson: Lesson;
  state: LessonState;
  subject: Subject;
};

const MAX_REVIEWS = 2;

/**
 * Today's plan: due reviews first, then whatever was left half-finished, then
 * one new lesson — and interleaved across subjects, because practising one
 * skill in a block feels more fluent than it is.
 *
 * `hasAccess` is respected here rather than at the last moment: pointing a
 * locked student at a locked lesson as the one thing to do today would be a
 * worse dashboard than one that simply offers what they can open.
 */
export function studyPlan(
  subjects: Subject[],
  rows: Map<string, LessonProgress>,
  now: Date,
  { size = 3, hasAccess = true }: { size?: number; hasAccess?: boolean } = {},
): PlanItem[] {
  const states = subjects.map((subject) => ({ subject, state: subjectState(subject, rows, now) }));
  const openable = (lesson: Lesson) => hasAccess || lesson.free;

  const reviews: PlanItem[] = states
    .flatMap(({ subject, state }) =>
      state.units
        .flatMap((unit) => unit.states)
        .filter((entry) => entry.needsReview && openable(entry.lesson))
        .map((entry) => ({ reason: "review" as const, lesson: entry.lesson, state: entry, subject })),
    )
    .sort((a, b) => a.state.retrievability - b.state.retrievability)
    .slice(0, MAX_REVIEWS);

  const resume: PlanItem[] = states
    .flatMap(({ subject, state }) =>
      state.units
        .flatMap((unit) => unit.states)
        .filter((entry) => entry.row?.status === "in_progress" && openable(entry.lesson))
        .map((entry) => ({ reason: "resume" as const, lesson: entry.lesson, state: entry, subject })),
    )
    .sort((a, b) => (b.state.row?.updatedAt ?? "").localeCompare(a.state.row?.updatedAt ?? ""));

  // A subject's next lesson, preferring one that has been written out in full:
  // sending a student to a title with no body is not a plan.
  const fresh: PlanItem[] = states.flatMap(({ subject, state }) => {
    const candidates = state.units
      .flatMap((unit) => unit.states)
      .filter((entry) => !entry.row && openable(entry.lesson));
    const entry = candidates.find((item) => item.lesson.authored) ?? candidates[0];
    return entry ? [{ reason: "fresh" as const, lesson: entry.lesson, state: entry, subject }] : [];
  });

  return interleave([...reviews, ...resume, ...fresh]).slice(0, size);
}

/** Keeps two lessons from the same subject apart while any other subject is waiting. */
function interleave(items: PlanItem[]): PlanItem[] {
  const remaining = [...items];
  const ordered: PlanItem[] = [];

  while (remaining.length) {
    const last = ordered.at(-1)?.subject.id;
    const at = remaining.findIndex((item) => item.subject.id !== last);
    ordered.push(...remaining.splice(at === -1 ? 0 : at, 1));
  }

  return ordered;
}

/* ------------------------------------------------------------------ minutes */

/** What today's plan asks for, so the goal ring has something honest to fill. */
export function planMinutes(items: PlanItem[]): number {
  return items.reduce(
    // A review is a second pass over known ground, not a first reading.
    (total, item) => total + Math.round(item.lesson.durationMinutes * (item.reason === "review" ? 0.5 : 1)),
    0,
  );
}

/**
 * Minutes studied on a given calendar day, from the progress rows themselves.
 *
 * The store keeps total seconds per lesson rather than per day, so a lesson
 * resumed today counts all of its time towards today. That is an overstatement
 * on the day a long lesson is picked up again, and splitting it properly means
 * recording time per session — a schema change, and its own piece of work.
 */
export function minutesOn(progress: LessonProgress[], day: string): number {
  return Math.round(
    progress
      .filter((row) => row.updatedAt.slice(0, 10) === day)
      .reduce((total, row) => total + row.secondsSpent, 0) / 60,
  );
}

/** The last `days` calendar days, oldest first, with whether each was studied. */
export function activityDays(progress: LessonProgress[], now: Date, days: number): { day: string; minutes: number }[] {
  const out: { day: string; minutes: number }[] = [];
  for (let back = days - 1; back >= 0; back -= 1) {
    const day = new Date(now.getTime() - back * DAY_MS).toISOString().slice(0, 10);
    out.push({ day, minutes: minutesOn(progress, day) });
  }
  return out;
}
