"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { isQuestion, type Lesson, type Screen } from "@/lib/content/types";
import { localeMeta, num, percent, t, type Locale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/client";
import { saveLessonProgressAction } from "@/lib/learning/actions";
import { TeachingBlock } from "./blocks";
import { Question } from "./questions";
import type { Verdict } from "./questions/shell";
import { ProgressBar, Chevron, Ratio } from "./ui";

type Result = { attempts: number; correct: boolean; revealed: boolean };

/**
 * Whether the reader wants their own language shown alongside the course's.
 *
 * A per-viewer convenience, so it lives in `localStorage` and is read as an
 * external store rather than copied into state — the server cannot know it, and
 * this is the shape React provides for exactly that. Off by default: the course
 * is taught in its own language, and support is something you reach for.
 */
const SUPPORT_KEY = "easy-school:support-language";
const supportListeners = new Set<() => void>();
let supportCache: boolean | undefined;

function readSupport(): boolean {
  if (supportCache !== undefined) return supportCache;
  try {
    supportCache = window.localStorage.getItem(SUPPORT_KEY) === "on";
  } catch {
    supportCache = false;
  }
  return supportCache;
}

function subscribeSupport(notify: () => void): () => void {
  supportListeners.add(notify);
  return () => supportListeners.delete(notify);
}

function writeSupport(on: boolean): void {
  supportCache = on;
  try {
    window.localStorage.setItem(SUPPORT_KEY, on ? "on" : "off");
  } catch {
    /* blocked storage: the choice still holds for this visit */
  }
  for (const notify of supportListeners) notify();
}

export function LessonPlayer({
  lesson,
  locale,
  supportLocale,
  startIndex,
  canSave,
  nextHref,
  subjectHref,
}: {
  lesson: Lesson;
  /** The language the course is taught in. */
  locale: Locale;
  /** The reader's own language, when it differs and can be offered as support. */
  supportLocale?: Locale;
  startIndex: number;
  canSave: boolean;
  nextHref?: string;
  subjectHref: string;
}) {
  const { d } = useI18n();
  const supportOn = useSyncExternalStore(subscribeSupport, readSupport, () => false);
  const reading: Locale = supportOn && supportLocale ? supportLocale : locale;

  // Every lesson is a list of screens. One written as blocks alone gets a screen
  // per block, which is exactly how it behaved before screens existed.
  const steps: Screen[] = useMemo(
    () =>
      lesson.screens ??
      lesson.blocks.map((block) => ({
        id: block.id,
        kicker: { ar: "", en: "" },
        title: { ar: "", en: "" },
        blocks: [block],
      })),
    [lesson],
  );
  const questionCount = useMemo(() => lesson.blocks.filter(isQuestion).length, [lesson]);

  const [index, setIndex] = useState(() => Math.min(startIndex, Math.max(steps.length - 1, 0)));
  const [verdicts, setVerdicts] = useState<Record<string, Verdict>>({});
  const [results, setResults] = useState<Record<string, Result>>({});
  const [finished, setFinished] = useState(false);

  // Clock reads happen after mount so rendering stays pure.
  const startedAt = useRef<number | null>(null);
  const savedSeconds = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, [lesson.id]);

  // First-try answers score in full, later attempts half, revealed answers nothing.
  const score = useMemo(() => {
    if (questionCount === 0) return 100;
    const earned = Object.values(results).reduce((total, result) => {
      if (!result.correct || result.revealed) return total;
      return total + (result.attempts <= 1 ? 1 : 0.5);
    }, 0);
    return Math.round((earned / questionCount) * 100);
  }, [results, questionCount]);

  const elapsedSeconds = useCallback(() => {
    if (startedAt.current === null) return 0;
    const total = Math.floor((Date.now() - startedAt.current) / 1000);
    const delta = Math.max(0, total - savedSeconds.current);
    savedSeconds.current = total;
    return delta;
  }, []);

  const persist = useCallback(
    (stepIndex: number, completed: boolean) => {
      if (!canSave) return;
      void saveLessonProgressAction({
        lessonId: lesson.id,
        stepIndex,
        score: completed ? score : 0,
        secondsSpent: elapsedSeconds(),
        completed,
      });
    },
    [canSave, lesson.id, score, elapsedSeconds],
  );

  // Checkpoint the furthest step reached, so a student can come back to it later.
  useEffect(() => {
    if (finished || index === 0) return;
    const timer = setTimeout(() => persist(index, false), 1500);
    return () => clearTimeout(timer);
  }, [index, finished, persist]);

  const current = steps[index];
  // A screen is left once every question on it has been answered or revealed.
  const blocked = Boolean(
    current?.blocks.some((block) => {
      if (!isQuestion(block)) return false;
      const verdict = verdicts[block.id] ?? null;
      return verdict !== "correct" && verdict !== "revealed";
    }),
  );

  const answer = (blockId: string, correct: boolean) => {
    setVerdicts((state) => ({ ...state, [blockId]: correct ? "correct" : "incorrect" }));
    setResults((state) => {
      const previous = state[blockId];
      return {
        ...state,
        [blockId]: {
          attempts: (previous?.attempts ?? 0) + 1,
          correct,
          revealed: previous?.revealed ?? false,
        },
      };
    });
  };

  const retry = (blockId: string) => setVerdicts((state) => ({ ...state, [blockId]: null }));

  const reveal = (blockId: string) => {
    setVerdicts((state) => ({ ...state, [blockId]: "revealed" }));
    setResults((state) => ({
      ...state,
      [blockId]: { attempts: state[blockId]?.attempts ?? 1, correct: false, revealed: true },
    }));
  };

  const goNext = () => {
    if (index >= steps.length - 1) {
      setFinished(true);
      persist(steps.length - 1, true);
      return;
    }
    setIndex((value) => value + 1);
  };

  if (steps.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-2xl" aria-hidden>
          🛠️
        </p>
        <h2 className="mt-3 text-xl font-bold">{d.common.comingSoon}</h2>
        <p className="mt-2 text-muted">{t(lesson.summary, locale)}</p>
        <Link href={subjectHref} className="btn btn-ghost mt-6">
          {d.lesson.backToSubject}
        </Link>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="card p-8 text-center">
        <p className="text-5xl" aria-hidden>
          🎉
        </p>
        <h2 className="mt-4 text-2xl font-bold">{d.lesson.completedTitle}</h2>
        <p className="mt-2 text-muted">{d.lesson.completedBody}</p>

        <dl className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-3">
          <div className="rounded-3xl bg-surface-muted p-4">
            <dt className="text-xs text-muted">{d.lesson.score}</dt>
            <dd className="text-2xl font-bold" dir="ltr">{percent(score, locale)}</dd>
          </div>
          <div className="rounded-3xl bg-surface-muted p-4">
            <dt className="text-xs text-muted">{d.lesson.xpEarned}</dt>
            <dd className="text-2xl font-bold" dir="ltr">+{num(20 + Math.round(score / 2), locale)}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {nextHref ? (
            <Link href={nextHref} className="btn btn-primary">
              {d.lesson.nextLesson}
              <Chevron />
            </Link>
          ) : null}
          <Link href={subjectHref} className="btn btn-ghost">
            {d.lesson.backToSubject}
          </Link>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setFinished(false);
              setIndex(0);
            }}
          >
            {d.lesson.review}
          </button>
        </div>
      </div>
    );
  }

  const named = Boolean(lesson.screens);

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-center justify-between text-sm text-muted">
          <span>
            {d.lesson.step} {num(index + 1, locale)} {d.lesson.of} {num(steps.length, locale)}
          </span>
          {questionCount > 0 ? (
            <span>
              <Ratio
                done={Object.values(results).filter((result) => result.correct && !result.revealed).length}
                total={questionCount}
                locale={locale}
              />{" "}
              ✓
            </span>
          ) : null}
        </div>

        {/* A segment per screen while they can be told apart at a glance; a
            single bar once there are too many for that to mean anything. */}
        {steps.length <= 8 ? (
          <ol className="flex gap-1.5" aria-hidden>
            {steps.map((step, at) => (
              <li
                key={step.id}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  at < index ? "bg-mint-500" : at === index ? "bg-brand-500" : "bg-surface-muted"
                }`}
              />
            ))}
          </ol>
        ) : (
          <ProgressBar value={((index + 1) / steps.length) * 100} />
        )}
      </div>

      {supportLocale ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface-muted px-4 py-2.5 text-sm">
          <span className="text-muted">{d.lesson.supportNote}</span>
          <button
            type="button"
            aria-pressed={supportOn}
            onClick={() => writeSupport(!supportOn)}
            className="shrink-0 font-semibold text-brand-600 underline dark:text-brand-300"
          >
            {supportOn ? d.lesson.hideSupport : d.lesson.showSupport}
          </button>
        </div>
      ) : null}

      <article
        className={`card p-5 sm:p-8 ${named ? "bg-surface-warm" : ""}`}
        lang={reading}
        dir={localeMeta[reading].dir}
      >
        {named && current ? (
          <header className="mb-6">
            <p className="text-sm font-extrabold text-brand-600 dark:text-brand-300">
              {t(current.kicker, reading)}
            </p>
            <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">{t(current.title, reading)}</h2>
            {current.lead ? (
              <p className="mt-3 max-w-prose text-lg text-muted">{t(current.lead, reading)}</p>
            ) : null}
            {current.aim ? (
              <p className="mt-4 flex gap-2 rounded-2xl bg-surface p-3 text-sm">
                <span aria-hidden>🎯</span>
                <span>{t(current.aim, reading)}</span>
              </p>
            ) : null}
          </header>
        ) : null}

        <div className="space-y-8">
          {current?.blocks.map((block) =>
            isQuestion(block) ? (
              <Question
                key={block.id}
                block={block}
                locale={reading}
                verdict={verdicts[block.id] ?? null}
                onAnswer={(correct) => answer(block.id, correct)}
                onRetry={() => retry(block.id)}
                onReveal={() => reveal(block.id)}
                canReveal={(results[block.id]?.attempts ?? 0) >= 2}
              />
            ) : (
              <TeachingBlock key={block.id} block={block} locale={reading} bookId={lesson.subjectId} />
            ),
          )}
        </div>
      </article>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => setIndex((value) => Math.max(0, value - 1))}
          disabled={index === 0}
        >
          <Chevron className="rotate-180" />
          {d.lesson.previous}
        </button>

        <button type="button" className="btn btn-primary" onClick={goNext} disabled={blocked}>
          {index >= steps.length - 1 ? d.lesson.finish : d.lesson.next}
          <Chevron />
        </button>
      </div>

      {!canSave ? (
        <p className="text-center text-sm text-muted">
          <Link href="/login" className="underline">
            {d.nav.login}
          </Link>{" "}
          — {d.dashboard.noProgress}
        </p>
      ) : null}
    </div>
  );
}
