"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { num, type Locale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/client";
import { forgetBookFile, loadBookFile, saveBookFile } from "@/lib/book-file";

/**
 * Opens the family's own copy of the book beside the lesson.
 *
 * The file is chosen from their device and rendered in the browser. It is never
 * uploaded, never reaches this server and is not part of this application — a
 * textbook belongs to its publisher, and the only copy this shows is the one the
 * family already owns.
 *
 * Printed page numbers rarely match a PDF's page numbers, because a scan carries
 * the cover and the front matter. So the reader is calibrated once — tell it the
 * number printed on the page you are looking at — and from then on a lesson can
 * say "page 6" and mean it.
 */

type Doc = {
  numPages: number;
  getPage: (n: number) => Promise<{
    getViewport: (options: { scale: number }) => { width: number; height: number };
    render: (options: { canvasContext: CanvasRenderingContext2D; viewport: unknown }) => {
      promise: Promise<void>;
      cancel: () => void;
    };
  }>;
};

export function BookReader({
  bookId,
  startPage,
  locale,
}: {
  bookId: string;
  /** The printed page this lesson begins on. */
  startPage?: number;
  locale: Locale;
}) {
  const { d } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  const docRef = useRef<Doc | null>(null);
  const renderRef = useRef<{ cancel: () => void } | null>(null);

  const [state, setState] = useState<"empty" | "loading" | "ready" | "failed">("empty");
  const [fileName, setFileName] = useState("");
  const [pages, setPages] = useState(0);
  const [sheet, setSheet] = useState(1);
  const [offset, setOffset] = useState(0);
  const [calibrating, setCalibrating] = useState(false);

  const printed = sheet - offset;

  /** Draws one sheet of the PDF onto the canvas at the width it has to fill. */
  const draw = useCallback(async (page: number) => {
    const doc = docRef.current;
    const canvas = canvasRef.current;
    const holder = holderRef.current;
    if (!doc || !canvas || !holder) return;

    renderRef.current?.cancel();
    const pdfPage = await doc.getPage(Math.min(Math.max(page, 1), doc.numPages));
    const unscaled = pdfPage.getViewport({ scale: 1 });
    const scale = (holder.clientWidth || 640) / unscaled.width;
    const viewport = pdfPage.getViewport({ scale: scale * (window.devicePixelRatio || 1) });

    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    canvas.style.width = "100%";
    canvas.style.height = "auto";

    const context = canvas.getContext("2d");
    if (!context) return;
    const task = pdfPage.render({ canvasContext: context, viewport });
    renderRef.current = task;
    await task.promise.catch(() => {
      /* a cancelled render is how we move between pages quickly */
    });
  }, []);

  const openBlob = useCallback(
    async (blob: Blob, name: string, savedOffset: number) => {
      setState("loading");
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();

        const data = new Uint8Array(await blob.arrayBuffer());
        const doc = (await pdfjs.getDocument({ data }).promise) as unknown as Doc;
        docRef.current = doc;
        setPages(doc.numPages);
        setFileName(name);
        setOffset(savedOffset);
        const first = startPage !== undefined ? startPage + savedOffset : 1;
        setSheet(Math.min(Math.max(first, 1), doc.numPages));
        setState("ready");
      } catch {
        setState("failed");
      }
    },
    [startPage],
  );

  // Reopen the copy this device already holds, without asking again.
  useEffect(() => {
    let cancelled = false;
    void loadBookFile(bookId).then((stored) => {
      if (!cancelled && stored) void openBlob(stored.blob, stored.name, stored.offset);
    });
    return () => {
      cancelled = true;
      renderRef.current?.cancel();
    };
  }, [bookId, openBlob]);

  useEffect(() => {
    if (state === "ready") void draw(sheet);
  }, [state, sheet, draw]);

  // Keep the page sharp when the column changes width.
  useEffect(() => {
    if (state !== "ready") return;
    const onResize = () => void draw(sheet);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [state, sheet, draw]);

  async function choose(file: File) {
    await saveBookFile(bookId, { blob: file, name: file.name, offset: 0 });
    await openBlob(file, file.name, 0);
  }

  async function calibrate(printedNow: number) {
    const next = sheet - printedNow;
    setOffset(next);
    setCalibrating(false);
    const stored = await loadBookFile(bookId);
    if (stored) await saveBookFile(bookId, { ...stored, offset: next });
  }

  if (state === "empty" || state === "failed") {
    return (
      <div className="card border-dashed p-6 text-center">
        <p className="text-3xl" aria-hidden>
          📖
        </p>
        <h2 className="mt-3 font-bold">{d.reader.title}</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">{d.reader.privacy}</p>
        {state === "failed" ? <p className="mt-2 text-sm text-coral-600">{d.reader.failed}</p> : null}

        <label className="btn btn-primary mt-5 cursor-pointer">
          {d.reader.choose}
          <input
            type="file"
            accept="application/pdf"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void choose(file);
            }}
          />
        </label>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 border-b border-line p-3 text-sm">
        <button
          type="button"
          className="btn btn-ghost px-3 py-1.5 text-sm"
          onClick={() => setSheet((at) => Math.max(1, at - 1))}
          disabled={sheet <= 1}
        >
          ‹
        </button>
        <button
          type="button"
          className="btn btn-ghost px-3 py-1.5 text-sm"
          onClick={() => setSheet((at) => Math.min(pages, at + 1))}
          disabled={sheet >= pages}
        >
          ›
        </button>

        <span className="text-muted" dir="ltr">
          {d.reader.page} {num(printed > 0 ? printed : sheet, locale)}
          {offset ? "" : ` / ${num(pages, locale)}`}
        </span>

        {startPage !== undefined ? (
          <button
            type="button"
            className="chip bg-brand-100 text-brand-800 dark:bg-brand-900/50 dark:text-brand-100"
            onClick={() => setSheet(Math.min(Math.max(startPage + offset, 1), pages))}
          >
            {d.reader.lessonPage} {num(startPage, locale)}
          </button>
        ) : null}

        <div className="ms-auto flex items-center gap-2">
          {calibrating ? (
            <form
              className="flex items-center gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                const value = Number(new FormData(event.currentTarget).get("printed"));
                if (Number.isFinite(value) && value > 0) void calibrate(value);
              }}
            >
              <label className="text-xs text-muted">{d.reader.calibrateAsk}</label>
              <input
                name="printed"
                type="number"
                min={1}
                dir="ltr"
                className="w-20 rounded-xl border border-line bg-surface px-2 py-1 text-sm"
                autoFocus
              />
              <button type="submit" className="btn btn-primary px-3 py-1 text-xs">
                {d.common.save}
              </button>
            </form>
          ) : (
            <button type="button" className="text-xs text-muted underline" onClick={() => setCalibrating(true)}>
              {d.reader.calibrate}
            </button>
          )}
          <button
            type="button"
            className="text-xs text-muted underline"
            onClick={() => {
              void forgetBookFile(bookId);
              docRef.current = null;
              setState("empty");
            }}
            title={fileName}
          >
            {d.reader.forget}
          </button>
        </div>
      </div>

      <div ref={holderRef} className="max-h-[80vh] overflow-auto bg-ink-50 p-3 dark:bg-ink-950">
        <canvas ref={canvasRef} className="mx-auto block rounded-lg shadow" />
      </div>
    </div>
  );
}
