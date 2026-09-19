"use client";

import { useEffect, useRef, useState } from "react";
import { num, t, type Locale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/client";
import type { Block } from "@/lib/content/types";
import { useBookDoc, type PdfDoc } from "./use-book-doc";

/**
 * Walking through a page of the book.
 *
 * This is how a teacher opens a textbook page: not by reading it aloud, but by
 * pointing. Each numbered marker sits on the region it names, and choosing one
 * says what that part of the page is for — the aims box, the getting-started
 * task, the key words — before any of the content is taught.
 *
 * The page underneath is the family's own copy, rendered in their browser from
 * their own file. When they have not opened it, the walkthrough still works: the
 * regions become a numbered list, and they read it beside the paper book.
 */
export function PageWalk({
  block,
  locale,
  bookId,
}: {
  block: Extract<Block, { kind: "pagewalk" }>;
  locale: Locale;
  bookId: string;
}) {
  const { d } = useI18n();
  const book = useBookDoc(bookId);
  const [active, setActive] = useState<string | undefined>(undefined);

  const chosen = block.regions.find((region) => region.id === active);

  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-extrabold text-brand-600 dark:text-brand-300">{d.lesson.pageWalk}</p>
        <h2 className="mt-1 text-xl font-bold sm:text-2xl">{t(block.title, locale)}</h2>
        <p className="mt-2 text-lg leading-relaxed text-body/90">{t(block.intro, locale)}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]">
        <div className="rounded-3xl border border-line bg-surface-warm p-3">
          {book.status === "ready" && book.doc ? (
            <PageWithMarkers
              doc={book.doc}
              sheet={block.page + book.offset}
              regions={block.regions}
              active={active}
              onSelect={(id) => setActive(id === active ? undefined : id)}
              locale={locale}
            />
          ) : (
            <div className="grid place-items-center gap-3 p-8 text-center">
              <p className="text-3xl" aria-hidden>
                📖
              </p>
              <p className="max-w-xs text-sm text-muted">{d.reader.privacy}</p>
              <label className="btn btn-primary cursor-pointer text-sm">
                {d.reader.choose}
                <input
                  type="file"
                  accept="application/pdf"
                  className="sr-only"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) void book.pick(file);
                  }}
                />
              </label>
              <p className="text-xs text-muted">
                {d.reader.page} {num(block.page, locale)}
              </p>
            </div>
          )}

          {book.status === "ready" ? (
            /* A scan carries a cover and front matter, so the book's page 2 is
               rarely the file's second sheet. Rather than ask a child what an
               offset is, let them nudge until the right page appears — the
               difference is learned from that and every later lesson lands. */
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-muted">
              <span>
                {d.reader.page} {num(block.page, locale)}
              </span>
              <span className="flex items-center gap-1">
                <span>{d.reader.nudge}</span>
                <button
                  type="button"
                  aria-label={d.reader.nudgeBack}
                  className="rounded-lg border border-line bg-surface px-2 py-0.5 font-bold"
                  onClick={() => void book.setOffset(book.offset - 1)}
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label={d.reader.nudgeOn}
                  className="rounded-lg border border-line bg-surface px-2 py-0.5 font-bold"
                  onClick={() => void book.setOffset(book.offset + 1)}
                >
                  ›
                </button>
              </span>
            </div>
          ) : null}
        </div>

        <ol className="space-y-2">
          {block.regions.map((region, index) => (
            <li key={region.id}>
              <button
                type="button"
                aria-pressed={active === region.id}
                onClick={() => setActive(region.id === active ? undefined : region.id)}
                className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-start transition-colors ${
                  active === region.id
                    ? "border-brand-400 bg-brand-500 text-white"
                    : "border-line bg-surface hover:bg-brand-50 dark:hover:bg-brand-900/30"
                }`}
              >
                <span
                  aria-hidden
                  className={`grid size-7 shrink-0 place-items-center rounded-full text-sm font-extrabold tabular-nums ${
                    active === region.id ? "bg-white text-brand-600" : "bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-100"
                  }`}
                  dir="ltr"
                >
                  {index + 1}
                </span>
                <span className="text-sm font-bold">{t(region.title, locale)}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <p
        role="status"
        className={`min-h-20 rounded-2xl p-4 text-lg leading-relaxed ${
          chosen ? "bg-brand-50 dark:bg-brand-900/30" : "bg-surface-muted text-muted"
        }`}
      >
        {chosen ? t(chosen.body, locale) : d.lesson.pageWalkPrompt}
      </p>

      <p className="rounded-2xl border-s-4 border-mint-500 bg-mint-50 p-4 dark:bg-mint-900/30">
        <span className="block text-xs font-extrabold uppercase tracking-wide text-mint-700 dark:text-mint-200">
          {d.lesson.bigIdea}
        </span>
        <span className="mt-1 block text-lg font-semibold">{t(block.bigIdea, locale)}</span>
      </p>
    </section>
  );
}

/** The rendered page, with a marker sitting on each region it names. */
function PageWithMarkers({
  doc,
  sheet,
  regions,
  active,
  onSelect,
  locale,
}: {
  doc: PdfDoc;
  sheet: number;
  regions: Extract<Block, { kind: "pagewalk" }>["regions"];
  active?: string;
  onSelect: (id: string) => void;
  locale: Locale;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  const taskRef = useRef<{ cancel: () => void } | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function draw() {
      const canvas = canvasRef.current;
      const holder = holderRef.current;
      if (!canvas || !holder) return;
      taskRef.current?.cancel();

      const page = await doc.getPage(Math.min(Math.max(sheet, 1), doc.numPages));
      if (cancelled) return;
      const unscaled = page.getViewport({ scale: 1 });
      const scale = ((holder.clientWidth || 560) / unscaled.width) * (window.devicePixelRatio || 1);
      const viewport = page.getViewport({ scale });

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      const context = canvas.getContext("2d");
      if (!context) return;
      const task = page.render({ canvasContext: context, viewport });
      taskRef.current = task;
      await task.promise.catch(() => {
        /* cancelled by the next draw */
      });
    }

    void draw();
    const onResize = () => void draw();
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      taskRef.current?.cancel();
      window.removeEventListener("resize", onResize);
    };
  }, [doc, sheet]);

  return (
    <div ref={holderRef} className="relative" dir="ltr">
      <canvas ref={canvasRef} className="block w-full rounded-xl shadow-sm" />

      {regions.map((region, index) => {
        const [x, y, w, h] = region.rect;
        const on = active === region.id;
        return (
          <button
            key={region.id}
            type="button"
            aria-label={t(region.title, locale)}
            aria-pressed={on}
            onClick={() => onSelect(region.id)}
            style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}
            className={`absolute rounded-lg border-2 transition-colors ${
              on
                ? "border-brand-500 bg-brand-500/20"
                : "border-transparent bg-transparent hover:border-brand-300 hover:bg-brand-500/10"
            }`}
          >
            <span
              className={`absolute -start-3 -top-3 grid size-7 place-items-center rounded-full text-sm font-extrabold tabular-nums shadow ${
                on ? "bg-brand-600 text-white" : "bg-white text-brand-700"
              }`}
            >
              {index + 1}
            </span>
          </button>
        );
      })}
    </div>
  );
}
