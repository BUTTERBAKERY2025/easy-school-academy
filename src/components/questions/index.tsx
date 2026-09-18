"use client";

import { useMemo, useState } from "react";
import type { QuestionBlock } from "@/lib/content/types";
import { t, type Locale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/client";
import { seededShuffle } from "@/lib/shuffle";
import { VisualView } from "@/components/visual";
import { QuestionShell, optionClass, type Verdict } from "./shell";

export type QuestionProps = {
  block: QuestionBlock;
  locale: Locale;
  verdict: Verdict;
  onAnswer: (correct: boolean) => void;
  onRetry: () => void;
  /** Offered once a student has missed the question twice. */
  onReveal: () => void;
  canReveal: boolean;
};

export function Question(props: QuestionProps) {
  switch (props.block.kind) {
    case "mcq":
      return <ChoiceQuestion {...props} block={props.block} />;
    case "multi":
      return <MultiQuestion {...props} block={props.block} />;
    case "truefalse":
      return <TrueFalseQuestion {...props} block={props.block} />;
    case "fill":
      return <FillQuestion {...props} block={props.block} />;
    case "match":
      return <MatchQuestion {...props} block={props.block} />;
    case "order":
      return <OrderQuestion {...props} block={props.block} />;
    case "sort":
      return <SortQuestion {...props} block={props.block} />;
  }
}

/* --------------------------------------------------- single choice (MCQ) */

function ChoiceQuestion({ block, locale, verdict, onAnswer, onRetry, onReveal, canReveal }: QuestionProps & { block: Extract<QuestionBlock, { kind: "mcq" }> }) {
  const [selected, setSelected] = useState<string | null>(null);
  const choices = useMemo(() => seededShuffle(block.choices, block.id), [block]);

  return (
    <QuestionShell
      prompt={t(block.prompt, locale)}
      hint={block.hint ? t(block.hint, locale) : undefined}
      explanation={t(block.explanation, locale)}
      verdict={verdict}
      canCheck={selected !== null}
      onCheck={() => onAnswer(selected === block.correctId)}
      onReveal={() => {
        setSelected(block.correctId);
        onReveal();
      }}
      canReveal={canReveal}
      onRetry={() => {
        setSelected(null);
        onRetry();
      }}
    >
      {block.visual ? <VisualView visual={block.visual} locale={locale} /> : null}
      <div className="grid gap-2" role="radiogroup">
        {choices.map((choice) => {
          const isSelected = selected === choice.id;
          const state =
            verdict === null
              ? isSelected
                ? "selected"
                : "idle"
              : choice.id === block.correctId
                ? "right"
                : isSelected && verdict !== "revealed"
                  ? "wrong"
                  : "idle";
          return (
            <button
              key={choice.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={verdict !== null}
              className={optionClass(state)}
              onClick={() => setSelected(choice.id)}
            >
              <span
                aria-hidden
                className={`grid size-6 shrink-0 place-items-center rounded-full border-2 ${
                  isSelected ? "border-brand-500 bg-brand-500 text-white" : "border-ink-300"
                }`}
              >
                {isSelected ? "✓" : ""}
              </span>
              <span>{t(choice.label, locale)}</span>
            </button>
          );
        })}
      </div>
    </QuestionShell>
  );
}

/* ------------------------------------------------- multiple correct answers */

function MultiQuestion({ block, locale, verdict, onAnswer, onRetry, onReveal, canReveal }: QuestionProps & { block: Extract<QuestionBlock, { kind: "multi" }> }) {
  const [selected, setSelected] = useState<string[]>([]);
  const choices = useMemo(() => seededShuffle(block.choices, block.id), [block]);
  const correct = useMemo(() => new Set(block.correctIds), [block]);

  const toggle = (id: string) =>
    setSelected((current) => (current.includes(id) ? current.filter((value) => value !== id) : [...current, id]));

  return (
    <QuestionShell
      prompt={t(block.prompt, locale)}
      explanation={t(block.explanation, locale)}
      verdict={verdict}
      canCheck={selected.length > 0}
      onCheck={() =>
        onAnswer(selected.length === correct.size && selected.every((id) => correct.has(id)))
      }
      onReveal={() => {
        setSelected(block.correctIds);
        onReveal();
      }}
      canReveal={canReveal}
      onRetry={() => {
        setSelected([]);
        onRetry();
      }}
    >
      <div className="grid gap-2">
        {choices.map((choice) => {
          const isSelected = selected.includes(choice.id);
          const state =
            verdict === null
              ? isSelected
                ? "selected"
                : "idle"
              : correct.has(choice.id)
                ? "right"
                : isSelected
                  ? "wrong"
                  : "idle";
          return (
            <button
              key={choice.id}
              type="button"
              role="checkbox"
              aria-checked={isSelected}
              disabled={verdict !== null}
              className={optionClass(state)}
              onClick={() => toggle(choice.id)}
            >
              <span
                aria-hidden
                className={`grid size-6 shrink-0 place-items-center rounded-lg border-2 ${
                  isSelected ? "border-brand-500 bg-brand-500 text-white" : "border-ink-300"
                }`}
              >
                {isSelected ? "✓" : ""}
              </span>
              <span>{t(choice.label, locale)}</span>
            </button>
          );
        })}
      </div>
    </QuestionShell>
  );
}

/* ------------------------------------------------------------- true / false */

function TrueFalseQuestion({ block, locale, verdict, onAnswer, onRetry, onReveal, canReveal }: QuestionProps & { block: Extract<QuestionBlock, { kind: "truefalse" }> }) {
  const [selected, setSelected] = useState<boolean | null>(null);
  const { d } = useI18n();
  const labels = locale === "ar" ? ["صح", "خطأ"] : ["True", "False"];

  return (
    <QuestionShell
      prompt={t(block.statement, locale)}
      explanation={t(block.explanation, locale)}
      verdict={verdict}
      canCheck={selected !== null}
      onCheck={() => onAnswer(selected === block.answer)}
      onReveal={() => {
        setSelected(block.answer);
        onReveal();
      }}
      canReveal={canReveal}
      onRetry={() => {
        setSelected(null);
        onRetry();
      }}
    >
      <p className="sr-only">{d.lesson.check}</p>
      <div className="grid grid-cols-2 gap-3">
        {[true, false].map((value, index) => {
          const isSelected = selected === value;
          const state =
            verdict === null
              ? isSelected
                ? "selected"
                : "idle"
              : value === block.answer
                ? "right"
                : isSelected
                  ? "wrong"
                  : "idle";
          return (
            <button
              key={String(value)}
              type="button"
              aria-pressed={isSelected}
              disabled={verdict !== null}
              className={`${optionClass(state)} justify-center text-lg font-bold`}
              onClick={() => setSelected(value)}
            >
              {value ? "✔️" : "✖️"} {labels[index]}
            </button>
          );
        })}
      </div>
    </QuestionShell>
  );
}

/* ----------------------------------------------------------- fill the blank */

const normalise = (value: string) =>
  value
    .trim()
    .toLowerCase()
    // Arabic-Indic digits are typed either way round, so compare on Western digits.
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 0x06f0))
    .replace(/[٫،]/g, ".")
    .replace(/[−–—]/g, "-")
    .replace(/\s+/g, " ");

function FillQuestion({ block, locale, verdict, onAnswer, onRetry, onReveal, canReveal }: QuestionProps & { block: Extract<QuestionBlock, { kind: "fill" }> }) {
  const [values, setValues] = useState<string[]>(() => block.blanks.map(() => ""));
  const segments = useMemo(() => t(block.text, locale).split(/(\{\{\d+\}\})/g), [block, locale]);

  const check = () =>
    onAnswer(
      block.blanks.every((blank, index) =>
        blank.answers.some((answer) => normalise(answer) === normalise(values[index] ?? "")),
      ),
    );

  return (
    <QuestionShell
      prompt={t(block.prompt, locale)}
      explanation={t(block.explanation, locale)}
      verdict={verdict}
      canCheck={values.every((value) => value.trim().length > 0)}
      onCheck={check}
      onReveal={() => {
        setValues(block.blanks.map((blank) => blank.answers[0] ?? ""));
        onReveal();
      }}
      canReveal={canReveal}
      onRetry={() => {
        setValues(block.blanks.map(() => ""));
        onRetry();
      }}
    >
      <p className="flex flex-wrap items-center gap-1 rounded-3xl border border-line bg-surface-muted p-4 text-lg leading-loose">
        {segments.map((segment, index) => {
          const match = /^\{\{(\d+)\}\}$/.exec(segment);
          if (!match) return <span key={index}>{segment}</span>;

          const blankIndex = Number(match[1]) - 1;
          const blank = block.blanks[blankIndex];
          if (!blank) return <span key={index}>{segment}</span>;

          const isRight =
            verdict !== null && blank.answers.some((answer) => normalise(answer) === normalise(values[blankIndex] ?? ""));

          return (
            <input
              key={index}
              type="text"
              inputMode="text"
              disabled={verdict !== null}
              aria-label={`${blankIndex + 1}`}
              value={values[blankIndex] ?? ""}
              onChange={(event) =>
                setValues((current) => current.map((value, i) => (i === blankIndex ? event.target.value : value)))
              }
              className={`mx-1 w-24 rounded-xl border-2 bg-surface px-2 py-1 text-center font-bold outline-none ${
                verdict === null
                  ? "border-brand-300 focus:border-brand-500"
                  : isRight
                    ? "border-mint-500 text-mint-700 dark:text-mint-300"
                    : "border-sun-500 text-sun-700 dark:text-sun-300"
              }`}
            />
          );
        })}
      </p>
    </QuestionShell>
  );
}

/* ------------------------------------------------------------------ matching */

function MatchQuestion({ block, locale, verdict, onAnswer, onRetry, onReveal, canReveal }: QuestionProps & { block: Extract<QuestionBlock, { kind: "match" }> }) {
  const [pairs, setPairs] = useState<Record<string, string>>({});
  const [activeLeft, setActiveLeft] = useState<string | null>(null);
  const { d } = useI18n();
  const rights = useMemo(() => seededShuffle(block.pairs, `${block.id}-right`), [block]);

  const choose = (rightId: string) => {
    if (!activeLeft) return;
    setPairs((current) => {
      const next: Record<string, string> = {};
      // Each right-hand card belongs to one pairing only.
      for (const [left, right] of Object.entries(current)) if (right !== rightId) next[left] = right;
      next[activeLeft] = rightId;
      return next;
    });
    setActiveLeft(null);
  };

  return (
    <QuestionShell
      prompt={t(block.prompt, locale)}
      explanation={t(block.explanation, locale)}
      verdict={verdict}
      canCheck={Object.keys(pairs).length === block.pairs.length}
      onCheck={() => onAnswer(block.pairs.every((pair) => pairs[pair.id] === pair.id))}
      onReveal={() => {
        setPairs(Object.fromEntries(block.pairs.map((pair) => [pair.id, pair.id])));
        setActiveLeft(null);
        onReveal();
      }}
      canReveal={canReveal}
      onRetry={() => {
        setPairs({});
        setActiveLeft(null);
        onRetry();
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <ul className="space-y-2" aria-label={d.lesson.itemsToMatch}>
          {block.pairs.map((pair) => {
            const chosen = pairs[pair.id];
            const state =
              verdict !== null ? (chosen === pair.id ? "right" : "wrong") : activeLeft === pair.id ? "selected" : "idle";
            const partner = chosen ? block.pairs.find((candidate) => candidate.id === chosen) : undefined;
            return (
              <li key={pair.id}>
                <button
                  type="button"
                  disabled={verdict !== null}
                  className={`${optionClass(state)} flex-col items-start`}
                  onClick={() => setActiveLeft(pair.id)}
                >
                  <span className="font-semibold">{t(pair.left, locale)}</span>
                  <span className="text-sm text-muted">
                    {partner ? `→ ${t(partner.right, locale)}` : "…"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <ul className="space-y-2" aria-label={d.lesson.possibleMatches}>
          {rights.map((pair) => {
            const taken = Object.values(pairs).includes(pair.id);
            return (
              <li key={pair.id}>
                <button
                  type="button"
                  disabled={verdict !== null || !activeLeft}
                  className={`${optionClass(taken ? "selected" : "idle")} ${!activeLeft && verdict === null ? "opacity-60" : ""}`}
                  onClick={() => choose(pair.id)}
                >
                  {t(pair.right, locale)}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </QuestionShell>
  );
}

/* ------------------------------------------------------------------ ordering */

function OrderQuestion({ block, locale, verdict, onAnswer, onRetry, onReveal, canReveal }: QuestionProps & { block: Extract<QuestionBlock, { kind: "order" }> }) {
  const shuffled = useMemo(() => seededShuffle(block.items, block.id), [block]);
  const [items, setItems] = useState(shuffled);

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    setItems((current) => {
      const next = [...current];
      [next[index], next[target]] = [next[target]!, next[index]!];
      return next;
    });
  };

  return (
    <QuestionShell
      prompt={t(block.prompt, locale)}
      explanation={t(block.explanation, locale)}
      verdict={verdict}
      canCheck
      onCheck={() => onAnswer(items.every((item, index) => item.id === block.items[index]?.id))}
      onReveal={() => {
        setItems(block.items);
        onReveal();
      }}
      canReveal={canReveal}
      onRetry={() => {
        setItems(shuffled);
        onRetry();
      }}
    >
      <ol className="space-y-2">
        {items.map((item, index) => {
          const state = verdict === null ? "idle" : item.id === block.items[index]?.id ? "right" : "wrong";
          return (
            <li key={item.id} className={`${optionClass(state)} justify-between`}>
              <span className="flex items-center gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-surface-muted text-sm font-bold">
                  {index + 1}
                </span>
                <span>{t(item.label, locale)}</span>
              </span>
              <span className="flex shrink-0 gap-1">
                <button
                  type="button"
                  className="btn btn-ghost size-8 p-0"
                  aria-label="↑"
                  disabled={verdict !== null || index === 0}
                  onClick={() => move(index, -1)}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="btn btn-ghost size-8 p-0"
                  aria-label="↓"
                  disabled={verdict !== null || index === items.length - 1}
                  onClick={() => move(index, 1)}
                >
                  ↓
                </button>
              </span>
            </li>
          );
        })}
      </ol>
    </QuestionShell>
  );
}

/* ---------------------------------------------------------- sorting into bins */

function SortQuestion({ block, locale, verdict, onAnswer, onRetry, onReveal, canReveal }: QuestionProps & { block: Extract<QuestionBlock, { kind: "sort" }> }) {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [active, setActive] = useState<string | null>(null);
  const pool = useMemo(() => seededShuffle(block.items, block.id), [block]);
  const { d } = useI18n();

  const drop = (bucketId: string) => {
    if (!active) return;
    setPlaced((current) => ({ ...current, [active]: bucketId }));
    setActive(null);
  };

  const unplaced = pool.filter((item) => !placed[item.id]);

  return (
    <QuestionShell
      prompt={t(block.prompt, locale)}
      explanation={t(block.explanation, locale)}
      verdict={verdict}
      canCheck={unplaced.length === 0}
      onCheck={() => onAnswer(block.items.every((item) => placed[item.id] === item.bucketId))}
      onReveal={() => {
        setPlaced(Object.fromEntries(block.items.map((item) => [item.id, item.bucketId])));
        setActive(null);
        onReveal();
      }}
      canReveal={canReveal}
      onRetry={() => {
        setPlaced({});
        setActive(null);
        onRetry();
      }}
    >
      <div role="group" aria-label={d.lesson.itemsToSort} className="flex flex-wrap gap-2 rounded-3xl border border-dashed border-line p-3">
        {unplaced.length === 0 ? (
          <span className="text-sm text-muted">✓</span>
        ) : (
          unplaced.map((item) => (
            <button
              key={item.id}
              type="button"
              disabled={verdict !== null}
              aria-pressed={active === item.id}
              className={`chip border ${
                active === item.id ? "border-brand-500 bg-brand-100 dark:bg-brand-900/40" : "border-line bg-surface"
              }`}
              onClick={() => setActive(item.id)}
            >
              {t(item.label, locale)}
            </button>
          ))
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {block.buckets.map((bucket) => (
          <div key={bucket.id} className="rounded-3xl border border-line bg-surface-muted p-3">
            <button
              type="button"
              disabled={verdict !== null || !active}
              onClick={() => drop(bucket.id)}
              className={`w-full rounded-2xl px-3 py-2 text-sm font-bold ${
                active ? "bg-brand-600 text-white" : "bg-surface"
              }`}
            >
              {t(bucket.label, locale)}
              {active ? <span className="ms-2 text-xs font-normal">{d.lesson.dragHere}</span> : null}
            </button>
            <ul className="mt-2 space-y-1">
              {block.items
                .filter((item) => placed[item.id] === bucket.id)
                .map((item) => {
                  const right = item.bucketId === bucket.id;
                  return (
                    <li
                      key={item.id}
                      className={`flex items-center justify-between rounded-xl px-3 py-1.5 text-sm ${
                        verdict === null
                          ? "bg-surface"
                          : right
                            ? "bg-mint-100 dark:bg-mint-900/40"
                            : "bg-sun-100 dark:bg-sun-900/40"
                      }`}
                    >
                      <span>{t(item.label, locale)}</span>
                      {verdict !== null ? <span aria-hidden>{right ? "✓" : "✕"}</span> : null}
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
    </QuestionShell>
  );
}
