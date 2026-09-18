"use client";

import type { ReactNode } from "react";
import { useI18n } from "@/lib/i18n/client";

export type Verdict = "correct" | "incorrect" | "revealed" | null;

/** Shared frame for every question type: prompt, body, check button and feedback. */
export function QuestionShell({
  prompt,
  hint,
  explanation,
  verdict,
  canCheck,
  onCheck,
  onRetry,
  onReveal,
  canReveal,
  children,
}: {
  prompt: string;
  hint?: string;
  explanation: string;
  verdict: Verdict;
  canCheck: boolean;
  onCheck: () => void;
  onRetry: () => void;
  onReveal?: () => void;
  canReveal?: boolean;
  children: ReactNode;
}) {
  const { d } = useI18n();

  return (
    <div className="space-y-4">
      <p className="text-lg font-semibold">{prompt}</p>
      {children}

      {verdict === null ? (
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-primary" onClick={onCheck} disabled={!canCheck}>
            {d.lesson.check}
          </button>
          {hint ? <span className="text-sm text-muted">💡 {d.lesson.hint}: {hint}</span> : null}
        </div>
      ) : (
        <div
          role="status"
          className={`rounded-3xl border p-4 ${
            verdict === "correct"
              ? "border-mint-300 bg-mint-50 dark:border-mint-700 dark:bg-mint-900/30"
              : "border-sun-300 bg-sun-50 dark:border-sun-700 dark:bg-sun-900/30"
          }`}
        >
          <p className="font-bold">
            {verdict === "correct"
              ? `✅ ${d.lesson.correct}`
              : verdict === "revealed"
                ? `💡 ${d.lesson.showAnswer}`
                : `🤔 ${d.lesson.incorrect}`}
          </p>
          <p className="mt-2 text-sm">
            <span className="font-semibold">{d.lesson.explanation}: </span>
            {explanation}
          </p>
          {verdict === "incorrect" ? (
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" className="btn btn-ghost px-4 py-1.5 text-sm" onClick={onRetry}>
                {d.lesson.tryAgain}
              </button>
              {canReveal && onReveal ? (
                <button type="button" className="btn btn-sun px-4 py-1.5 text-sm" onClick={onReveal}>
                  {d.lesson.showAnswer}
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export const optionClass = (state: "idle" | "selected" | "right" | "wrong") =>
  [
    "flex w-full items-center gap-3 rounded-2xl border p-3 text-start transition-colors",
    state === "idle" ? "border-line bg-surface hover:bg-surface-muted" : "",
    state === "selected" ? "border-brand-400 bg-brand-50 dark:bg-brand-900/30" : "",
    state === "right" ? "border-mint-400 bg-mint-50 dark:bg-mint-900/30" : "",
    state === "wrong" ? "border-sun-400 bg-sun-50 dark:bg-sun-900/30" : "",
  ]
    .filter(Boolean)
    .join(" ");
