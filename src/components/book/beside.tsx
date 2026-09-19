"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/client";
import { BookReader } from "./reader";

/**
 * The lesson and the book, side by side.
 *
 * Closed by default and remembered for nothing: a student who has the book open
 * on the desk does not need it on the screen. When it is opened the lesson moves
 * into a column beside it, so the page being read and the part being worked
 * through are visible at once — which is the whole reason to have it there.
 */
export function BookBeside({
  bookId,
  startPage,
  locale,
  children,
}: {
  bookId: string;
  startPage?: number;
  locale: Locale;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { d } = useI18n();

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setOpen((was) => !was)}
          className="btn btn-ghost px-4 py-2 text-sm"
          aria-expanded={open}
        >
          <span aria-hidden>📖</span>
          {open ? d.reader.hideBook : d.reader.showBook}
        </button>
      </div>

      {open ? (
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="xl:sticky xl:top-20 xl:self-start">
            <BookReader bookId={bookId} startPage={startPage} locale={locale} />
          </div>
          <div>{children}</div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
