"use client";

import { useCallback, useEffect, useState } from "react";
import { forgetBookFile, loadBookFile, saveBookFile } from "@/lib/book-file";

/**
 * The family's own book, opened once and shared by everything that shows it.
 *
 * The reader and the page walkthrough both need the same document and the same
 * page-number calibration, so loading lives here rather than twice. The file
 * comes from the device, stays on the device, and is never uploaded.
 */

export type PdfPage = {
  getViewport: (options: { scale: number }) => { width: number; height: number };
  render: (options: { canvasContext: CanvasRenderingContext2D; viewport: unknown }) => {
    promise: Promise<void>;
    cancel: () => void;
  };
};

export type PdfDoc = { numPages: number; getPage: (n: number) => Promise<PdfPage> };

export type BookDoc = {
  status: "empty" | "loading" | "ready" | "failed";
  doc: PdfDoc | null;
  name: string;
  /** Sheet number minus printed number, so `printed + offset` is the sheet to draw. */
  offset: number;
  pick: (file: File) => Promise<void>;
  setOffset: (value: number) => Promise<void>;
  forget: () => Promise<void>;
};

export function useBookDoc(bookId: string): BookDoc {
  const [status, setStatus] = useState<BookDoc["status"]>("empty");
  const [name, setName] = useState("");
  const [offset, setOffsetState] = useState(0);
  const [doc, setDoc] = useState<PdfDoc | null>(null);

  const open = useCallback(async (blob: Blob, fileName: string, savedOffset: number) => {
    setStatus("loading");
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url,
      ).toString();
      const data = new Uint8Array(await blob.arrayBuffer());
      setDoc((await pdfjs.getDocument({ data }).promise) as unknown as PdfDoc);
      setName(fileName);
      setOffsetState(savedOffset);
      setStatus("ready");
    } catch {
      setStatus("failed");
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    void loadBookFile(bookId).then((stored) => {
      if (!cancelled && stored) void open(stored.blob, stored.name, stored.offset);
    });
    return () => {
      cancelled = true;
    };
  }, [bookId, open]);

  return {
    status,
    doc,
    name,
    offset,
    pick: async (file: File) => {
      await saveBookFile(bookId, { blob: file, name: file.name, offset: 0 });
      await open(file, file.name, 0);
    },
    setOffset: async (value: number) => {
      setOffsetState(value);
      const stored = await loadBookFile(bookId);
      if (stored) await saveBookFile(bookId, { ...stored, offset: value });
    },
    forget: async () => {
      await forgetBookFile(bookId);
      setDoc(null);
      setStatus("empty");
    },
  };
}
