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
