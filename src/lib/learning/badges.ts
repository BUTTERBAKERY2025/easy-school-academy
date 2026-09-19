import type { Localized } from "@/lib/i18n/config";
import type { IconName } from "@/components/art/icons";
import type { LessonProgress, User } from "@/lib/db/types";
import type { SubjectState } from "./model";

/**
 * Badges, derived rather than awarded.
 *
 * The database has carried a `badge_id` column since the first schema and
 * nothing ever wrote to it. Computing badges from progress instead means they
 * can never disagree with the progress they describe, a rule added today
 * applies to work already done, and a rule that turns out to be badly judged is
 * a change to this file and nothing else.
 *
 * What is rewarded is chosen as carefully as how. Every badge below is earned
 * by studying well — coming back, going deep, spreading practice across
 * subjects — and none by spending, waiting, or opening the app. Each one also
 * carries its own progress, so an unearned badge tells the student what is left
 * rather than only that they have not got it.
 */

export type Badge = {
  id: string;
  title: Localized;
  description: Localized;
  icon: IconName;
  tint: "brand" | "sun" | "mint" | "coral" | "berry" | "sky";
  /** How far along the student is, 0-1. 1 means earned. */
  progress: number;
  /** Where they stand against the bar, for "3 / 5". */
  at: number;
  goal: number;
};

type Definition = Omit<Badge, "progress" | "at" | "goal"> & { goal: number; measure: (facts: Facts) => number };

type Facts = {
  completed: number;
  perfect: number;
  strong: number;
  minutes: number;
  streakDays: number;
  subjectsTouched: number;
  repractised: number;
  unitsComplete: number;
};

const DEFINITIONS: Definition[] = [
  {
    id: "first-step",
    title: { ar: "أول خطوة", en: "First step" },
    description: { ar: "أنهيت أول درس لك.", en: "You finished your first lesson." },
    icon: "lessons",
    tint: "brand",
    goal: 1,
    measure: (facts) => facts.completed,
  },
  {
    id: "five-lessons",
    title: { ar: "خمسة دروس", en: "Five lessons" },
    description: { ar: "أنهيت خمسة دروس.", en: "You finished five lessons." },
    icon: "textbook",
    tint: "sky",
    goal: 5,
    measure: (facts) => facts.completed,
  },
  {
    id: "twenty-lessons",
    title: { ar: "عشرون درسًا", en: "Twenty lessons" },
    description: { ar: "أنهيت عشرين درسًا.", en: "You finished twenty lessons." },
    icon: "subjects",
    tint: "berry",
    goal: 20,
    measure: (facts) => facts.completed,
  },
  {
    id: "flawless",
    title: { ar: "إجابة كاملة", en: "Flawless" },
    description: { ar: "أجبت عن كل أسئلة درس إجابة صحيحة.", en: "Every question in a lesson answered correctly." },
    icon: "truefalse",
    tint: "mint",
    goal: 1,
    measure: (facts) => facts.perfect,
  },
  {
    id: "steady-hand",
    title: { ar: "يد ثابتة", en: "Steady hand" },
    description: { ar: "خمسة دروس بإتقان 90% فأكثر.", en: "Five lessons at 90% or better." },
    icon: "mastery",
    tint: "sun",
    goal: 5,
    measure: (facts) => facts.strong,
  },
  {
    id: "returner",
    title: { ar: "المراجِع", en: "The reviewer" },
    description: {
      ar: "راجعت درسًا أنهيته من قبل — وهذا ما يثبّت ما تعرفه.",
      en: "You went back over a lesson you had already finished — which is what makes knowledge stick.",
    },
    icon: "interactive",
    tint: "coral",
    goal: 1,
    measure: (facts) => facts.repractised,
  },
  {
    id: "three-reviews",
    title: { ar: "مراجعة منتظمة", en: "Regular review" },
    description: { ar: "راجعت ثلاثة دروس بعد إنهائها.", en: "Three finished lessons revisited." },
    icon: "pacing",
    tint: "coral",
    goal: 3,
    measure: (facts) => facts.repractised,
  },
  {
    id: "explorer",
    title: { ar: "مستكشِف", en: "Explorer" },
    description: { ar: "درست في ثلاث مواد مختلفة.", en: "You studied in three different subjects." },
    icon: "curricula",
    tint: "sky",
    goal: 3,
    measure: (facts) => facts.subjectsTouched,
  },
  {
    id: "unit-done",
    title: { ar: "وحدة كاملة", en: "A whole unit" },
    description: { ar: "أتقنت كل دروس وحدة كاملة.", en: "Every lesson in a unit held at proficient or better." },
    icon: "grades",
    tint: "brand",
    goal: 1,
    measure: (facts) => facts.unitsComplete,
  },
  {
    id: "streak-3",
    title: { ar: "ثلاثة أيام", en: "Three days" },
    description: { ar: "درست ثلاثة أيام متتالية.", en: "Three days in a row." },
    icon: "streak",
    tint: "sun",
    goal: 3,
    measure: (facts) => facts.streakDays,
  },
  {
    id: "streak-14",
    title: { ar: "أسبوعان", en: "Two weeks" },
    description: { ar: "درست أربعة عشر يومًا متتالية.", en: "Fourteen days in a row." },
    icon: "streak",
    tint: "coral",
    goal: 14,
    measure: (facts) => facts.streakDays,
  },
  {
    id: "an-hour",
    title: { ar: "ساعة تعلّم", en: "An hour of learning" },
    description: { ar: "قضيت ستين دقيقة في الدروس.", en: "Sixty minutes spent inside lessons." },
    icon: "gift",
    tint: "mint",
    goal: 60,
    measure: (facts) => facts.minutes,
  },
];

const STRONG_SCORE = 90;

export function badgesFor(user: User, progress: LessonProgress[], subjects: SubjectState[]): Badge[] {
  const done = progress.filter((row) => row.status === "completed");

  const facts: Facts = {
    completed: done.length,
    perfect: done.filter((row) => row.score >= 100).length,
    strong: done.filter((row) => row.score >= STRONG_SCORE).length,
    minutes: Math.round(progress.reduce((total, row) => total + row.secondsSpent, 0) / 60),
    streakDays: user.streakDays,
    subjectsTouched: new Set(progress.map((row) => row.subjectId)).size,
    repractised: done.filter((row) => row.completedAt && row.updatedAt > row.completedAt).length,
    unitsComplete: subjects.reduce(
      (total, subject) => total + subject.units.filter((unit) => unit.complete).length,
      0,
    ),
  };

  return DEFINITIONS.map(({ measure, goal, ...rest }) => {
    const at = measure(facts);
    return { ...rest, goal, at: Math.min(at, goal), progress: Math.min(1, at / goal) };
  });
}

export const isEarned = (badge: Badge): boolean => badge.progress >= 1;

/** Earned first, then whichever unearned badge the student is closest to. */
export function rankBadges(badges: Badge[]): Badge[] {
  return [...badges].sort((a, b) => {
    if (isEarned(a) !== isEarned(b)) return isEarned(a) ? -1 : 1;
    return b.progress - a.progress;
  });
}
