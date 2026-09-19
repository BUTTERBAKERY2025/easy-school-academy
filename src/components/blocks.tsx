"use client";

import { useState } from "react";
import type { Block } from "@/lib/content/types";
import { t, type Locale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/client";
import { VisualView } from "./visual";

/** Renders the teaching (non-question) half of a lesson. */
export function TeachingBlock({ block, locale }: { block: Block; locale: Locale }) {
  switch (block.kind) {
    case "concept":
      return (
        <section className="space-y-3">
          <h2 className="text-xl font-bold sm:text-2xl">{t(block.title, locale)}</h2>
          {t(block.body, locale)
            .split("\n\n")
            .map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed text-body/90">
                {paragraph}
              </p>
            ))}
          {block.visual ? <VisualView visual={block.visual} locale={locale} /> : null}
        </section>
      );

    case "example":
      return (
        <section className="space-y-3">
          <h2 className="text-xl font-bold sm:text-2xl">{t(block.title, locale)}</h2>
          <ol className="space-y-2">
            {block.steps.map((step, index) => (
              <li key={index} className="flex gap-3 rounded-2xl border border-line bg-surface-muted p-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="text-lg">{t(step, locale)}</span>
              </li>
            ))}
          </ol>
          {block.visual ? <VisualView visual={block.visual} locale={locale} /> : null}
        </section>
      );

    case "callout": {
      const tone = {
        tip: { glyph: "💡", classes: "border-brand-300 bg-brand-50 dark:border-brand-700 dark:bg-brand-900/30" },
        warning: { glyph: "⚠️", classes: "border-sun-300 bg-sun-50 dark:border-sun-700 dark:bg-sun-900/30" },
        fact: { glyph: "📌", classes: "border-mint-300 bg-mint-50 dark:border-mint-700 dark:bg-mint-900/30" },
      }[block.tone];

      return (
        <aside className={`rounded-3xl border p-5 ${tone.classes}`}>
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <span aria-hidden>{tone.glyph}</span>
            {t(block.title, locale)}
          </h2>
          <p className="mt-2 text-lg leading-relaxed">{t(block.body, locale)}</p>
        </aside>
      );
    }

    case "vocab":
      return (
        <section className="space-y-3">
          <h2 className="text-xl font-bold sm:text-2xl">{t(block.title, locale)}</h2>
          <dl className="grid gap-3 sm:grid-cols-2">
            {block.terms.map((term, index) => (
              <div key={index} className="rounded-3xl border border-line bg-surface-muted p-4">
                <dt className="font-bold text-brand-700 dark:text-brand-300">{t(term.term, locale)}</dt>
                <dd className="mt-1 text-sm leading-relaxed">{t(term.meaning, locale)}</dd>
              </div>
            ))}
          </dl>
        </section>
      );

    case "flashcards":
      return <Flashcards block={block} locale={locale} />;

    case "activity":
      return <Activity block={block} locale={locale} />;

    case "checklist":
      return <Checklist block={block} locale={locale} />;

    case "summary":
      return (
        <section className="rounded-3xl border border-mint-300 bg-mint-50 p-5 dark:border-mint-700 dark:bg-mint-900/30">
          <h2 className="text-xl font-bold">🎯 {t(block.title, locale)}</h2>
          <ul className="mt-3 space-y-2">
            {block.points.map((point, index) => (
              <li key={index} className="flex gap-2 text-lg">
                <span aria-hidden>✔️</span>
                <span>{t(point, locale)}</span>
              </li>
            ))}
          </ul>
        </section>
      );

    default:
      return null;
  }
}

function Flashcards({ block, locale }: { block: Extract<Block, { kind: "flashcards" }>; locale: Locale }) {
  const [flipped, setFlipped] = useState<string[]>([]);
  const { d } = useI18n();

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold sm:text-2xl">{t(block.title, locale)}</h2>
      <p className="text-sm text-muted">{d.lesson.flashcardPrompt}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {block.cards.map((card) => {
          const isFlipped = flipped.includes(card.id);
          return (
            <button
              key={card.id}
              type="button"
              aria-pressed={isFlipped}
              onClick={() =>
                setFlipped((current) =>
                  current.includes(card.id) ? current.filter((id) => id !== card.id) : [...current, card.id],
                )
              }
              className={`min-h-24 rounded-3xl border p-5 text-center text-lg font-semibold transition-colors ${
                isFlipped
                  ? "border-brand-400 bg-brand-50 dark:bg-brand-900/30"
                  : "border-line bg-surface-muted hover:bg-surface"
              }`}
            >
              {isFlipped ? t(card.back, locale) : t(card.front, locale)}
            </button>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Practical work, away from the screen.
 *
 * Shown as a card the child can work from rather than a paragraph to read past:
 * what it is for, what they need, the safety line if there is one, and numbered
 * steps. Nothing here is marked — the point is that they do it.
 */
function Activity({ block, locale }: { block: Extract<Block, { kind: "activity" }>; locale: Locale }) {
  const { d } = useI18n();

  return (
    <section className="rounded-3xl border border-sky-300 bg-sky-50 p-5 dark:border-sky-700 dark:bg-sky-900/25">
      <p className="text-xs font-bold uppercase tracking-wide text-sky-700 dark:text-sky-200">{d.lesson.activity}</p>
      <h2 className="mt-1 flex items-center gap-2 text-xl font-bold">
        <span aria-hidden>🔬</span>
        {t(block.title, locale)}
      </h2>
      <p className="mt-2 text-lg leading-relaxed">{t(block.intro, locale)}</p>

      {block.needs?.length ? (
        <div className="mt-4 rounded-2xl bg-surface p-4">
          <h3 className="text-sm font-bold text-muted">{d.lesson.youWillNeed}</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {block.needs.map((item, index) => (
              <li key={index} className="chip bg-surface-muted">
                {t(item, locale)}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {block.safety ? (
        <p className="mt-3 flex gap-2 rounded-2xl bg-sun-100 p-3 text-sm dark:bg-sun-900/40">
          <span aria-hidden>🧼</span>
          <span>{t(block.safety, locale)}</span>
        </p>
      ) : null}

      <ol className="mt-4 space-y-2">
        {block.steps.map((step, index) => (
          <li key={index} className="flex gap-3 rounded-2xl bg-surface p-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-sky-600 text-sm font-bold text-white">
              {index + 1}
            </span>
            <span className="text-lg">{t(step, locale)}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

/**
 * The closing self-check.
 *
 * Ticking a box proves nothing to anybody but the child, which is the point:
 * naming what you can now do is what turns a lesson into something you know you
 * know. Nothing is saved or scored.
 */
function Checklist({ block, locale }: { block: Extract<Block, { kind: "checklist" }>; locale: Locale }) {
  const [ticked, setTicked] = useState<number[]>([]);
  const { d } = useI18n();

  return (
    <section className="rounded-3xl border border-brand-300 bg-brand-50 p-5 dark:border-brand-700 dark:bg-brand-900/30">
      <h2 className="text-xl font-bold">✅ {t(block.title, locale)}</h2>
      <p className="mt-1 text-sm text-muted">{d.lesson.checklistPrompt}</p>
      <ul className="mt-4 space-y-2">
        {block.items.map((item, index) => {
          const on = ticked.includes(index);
          return (
            <li key={index}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() =>
                  setTicked((current) =>
                    current.includes(index) ? current.filter((at) => at !== index) : [...current, index],
                  )
                }
                className={`flex w-full items-start gap-3 rounded-2xl border p-3 text-start transition-colors ${
                  on ? "border-mint-400 bg-mint-50 dark:bg-mint-900/30" : "border-line bg-surface hover:bg-surface-muted"
                }`}
              >
                <span
                  aria-hidden
                  className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg border-2 text-sm ${
                    on ? "border-mint-500 bg-mint-500 text-white" : "border-ink-300"
                  }`}
                >
                  {on ? "✓" : ""}
                </span>
                <span className="text-lg">{t(item, locale)}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
