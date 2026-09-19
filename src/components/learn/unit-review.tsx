"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { num, percent, t, type Locale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/client";
import { REVIEW_PASS, type ReviewQuestion } from "@/lib/learning/unit-review";
import { saveUnitReviewAction } from "@/lib/learning/actions";
import { Question } from "@/components/questions";
import type { Verdict } from "@/components/questions/shell";
import { ProgressBar, Ratio, Chevron } from "@/components/ui";

/**
 * The end-of-unit review.
 *
 * Shorter than a lesson and made only of questions, because the whole value is
 * in the retrieval: answering from memory is what strengthens it, and re-reading
 * is what feels like learning without being it. Which lessons it refreshes is
 * decided on the server — a lesson the student could not do is left due rather
 * than marked as revised.
 */

/** Same bookkeeping the lesson keeps, so a review is scored the same way. */
type Outcome = { attempts: number; correct: boolean; revealed: boolean };

export function UnitReview({
  unitId,
  questions,
  locale,
  canSave,
}: {
  unitId: string;
  questions: ReviewQuestion[];
  locale: Locale;
  canSave: boolean;
}) {
  const { d } = useI18n();
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [verdict, setVerdict] = useState<Verdict>(null);
  const [outcomes, setOutcomes] = useState<Record<string, Outcome>>({});
  const [finished, setFinished] = useState(false);
  const [refreshed, setRefreshed] = useState<string[] | null>(null);

  const startedAt = useRef<number | null>(null);
  useEffect(() => {
    if (started) startedAt.current = Date.now();
  }, [started]);

  const answered = Object.values(outcomes).filter((outcome) => outcome.correct && !outcome.revealed).length;
  // First-try answers score in full, later attempts half, revealed answers nothing.
  const earned = Object.values(outcomes).reduce(
    (total, outcome) =>
      !outcome.correct || outcome.revealed ? total : total + (outcome.attempts <= 1 ? 1 : 0.5),
    0,
  );
  const score = questions.length ? Math.round((earned / questions.length) * 100) : 0;

  /** Per lesson, so the server is told which parts of the unit actually held. */
  const perLesson = useMemo(() => {
    const totals = new Map<string, { right: number; asked: number }>();
    for (const question of questions) {
      const tally = totals.get(question.lessonId) ?? { right: 0, asked: 0 };
      tally.asked += 1;
      const outcome = outcomes[question.block.id];
      if (outcome?.correct && !outcome.revealed) tally.right += outcome.attempts <= 1 ? 1 : 0.5;
      totals.set(question.lessonId, tally);
    }
    return [...totals].map(([lessonId, tally]) => ({
      lessonId,
      score: Math.round((tally.right / tally.asked) * 100),
    }));
  }, [questions, outcomes]);

  async function finish() {
    setFinished(true);
    if (!canSave) {
      setRefreshed([]);
      return;
    }
    const seconds = startedAt.current ? Math.floor((Date.now() - startedAt.current) / 1000) : 0;
    const result = await saveUnitReviewAction({ unitId, secondsSpent: seconds, results: perLesson });
    setRefreshed(result.refreshed);
  }

  if (questions.length === 0) {
    return (
      <section className="card p-6">
        <h2 className="text-lg font-bold">{d.unit.reviewTitle}</h2>
        <p className="mt-2 text-sm text-muted">{d.unit.reviewEmpty}</p>
      </section>
    );
  }

  if (!started) {
    return (
      <section className="card border-brand-200 bg-brand-50 p-6 dark:border-brand-700 dark:bg-brand-900/30">
        <h2 className="text-lg font-bold">{d.unit.reviewTitle}</h2>
        <p className="mt-2 text-sm text-muted">{d.unit.reviewBody}</p>
        <p className="mt-4 text-sm">
          <span dir="ltr" className="font-bold tabular-nums">
            {num(questions.length, locale)}
          </span>{" "}
          {d.unit.reviewQuestions}
          {" · "}
          <span dir="ltr" className="tabular-nums">
            {num(Math.max(2, Math.round(questions.length * 0.6)), locale)}
          </span>{" "}
          {d.common.minutes}
        </p>
        <button type="button" className="btn btn-primary mt-5" onClick={() => setStarted(true)}>
          {d.unit.reviewStart}
          <Chevron />
        </button>
      </section>
    );
  }

  if (finished) {
    const held = perLesson.filter((entry) => entry.score >= REVIEW_PASS).length;
    return (
      <section className="card p-6 text-center">
        <p className="text-4xl" aria-hidden>
          {score >= REVIEW_PASS ? "🎉" : "💪"}
        </p>
        <h2 className="mt-3 text-xl font-bold">{d.unit.reviewDone}</h2>
        <p className="mt-2 text-3xl font-extrabold tabular-nums" dir="ltr">
          {percent(score, locale)}
        </p>

        <p className="mt-3 text-sm text-muted">
          {refreshed === null
            ? d.common.loading
            : refreshed.length > 0
              ? `${d.unit.reviewRefreshed} ${num(refreshed.length, locale)}`
              : d.unit.reviewNothingHeld}
        </p>
        {held < perLesson.length ? <p className="mt-1 text-xs text-muted">{d.unit.reviewStillDue}</p> : null}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setOutcomes({});
              setVerdict(null);
              setIndex(0);
              setRefreshed(null);
              setFinished(false);
              setStarted(true);
            }}
          >
            {d.lesson.review}
          </button>
          <Link href="/learn" className="btn btn-ghost">
            {d.nav.dashboard}
          </Link>
        </div>
      </section>
    );
  }

  const current = questions[index];
  const settled = verdict === "correct" || verdict === "revealed";

  return (
    <section className="card p-5 sm:p-6">
      <div className="mb-3 flex items-center justify-between text-sm text-muted">
        <span>
          {d.lesson.step} {num(index + 1, locale)} {d.lesson.of} {num(questions.length, locale)}
        </span>
        <span>
          <Ratio done={answered} total={questions.length} locale={locale} /> ✓
        </span>
      </div>
      <ProgressBar value={((index + 1) / questions.length) * 100} />

      <p className="mt-4 text-xs text-muted">{t(current.lessonTitle, locale)}</p>

      <div className="mt-2">
        <Question
          key={current.block.id}
          block={current.block}
          locale={locale}
          verdict={verdict}
          onAnswer={(correct) => {
            setVerdict(correct ? "correct" : "incorrect");
            setOutcomes((state) => {
              const previous = state[current.block.id];
              return {
                ...state,
                [current.block.id]: {
                  attempts: (previous?.attempts ?? 0) + 1,
                  correct,
                  revealed: previous?.revealed ?? false,
                },
              };
            });
          }}
          onRetry={() => setVerdict(null)}
          onReveal={() => {
            setVerdict("revealed");
            setOutcomes((state) => ({
              ...state,
              [current.block.id]: { attempts: state[current.block.id]?.attempts ?? 1, correct: false, revealed: true },
            }));
          }}
          // Offered only after two misses, as in a lesson: an answer given away on
          // the first try is not retrieval, and a review is nothing else.
          canReveal={(outcomes[current.block.id]?.attempts ?? 0) >= 2}
        />
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          className="btn btn-primary"
          disabled={!settled}
          onClick={() => {
            if (index >= questions.length - 1) {
              void finish();
              return;
            }
            setIndex((value) => value + 1);
            setVerdict(null);
          }}
        >
          {index >= questions.length - 1 ? d.lesson.finish : d.lesson.next}
          <Chevron />
        </button>
      </div>
    </section>
  );
}
