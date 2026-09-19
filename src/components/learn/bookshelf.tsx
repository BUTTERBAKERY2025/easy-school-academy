import Link from "next/link";
import { getI18n } from "@/lib/i18n/server";
import { num, percent, t } from "@/lib/i18n/config";
import type { SubjectState } from "@/lib/learning/model";
import { BookCover } from "@/components/art/book-cover";
import { MasteryBar } from "./mastery";

/**
 * The shelf.
 *
 * Drawn as a row of standing books rather than a list of rows, because that is
 * how a child recognises their own: by the spine and the colour before the
 * title. Each one carries its own progress, so the shelf doubles as the answer
 * to "how far am I through this book".
 */
export async function BookShelf({
  subjects,
  compact = false,
}: {
  subjects: SubjectState[];
  compact?: boolean;
}) {
  const { locale, d } = await getI18n();

  return (
    <section>
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-bold">{d.books.navTitle}</h2>
        {compact ? (
          <Link href="/books" className="text-sm font-semibold text-brand-600 dark:text-brand-300">
            {d.books.backToShelf}
          </Link>
        ) : (
          <p className="text-sm text-muted">{d.books.subtitle}</p>
        )}
      </header>

      <ul
        className={
          compact
            ? "-mx-4 mt-5 flex snap-x gap-4 overflow-x-auto px-4 pb-2"
            : "mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {subjects.map((entry) => (
          <li key={entry.subject.id} className={compact ? "w-40 shrink-0 snap-start" : ""}>
            <Link
              href={`/books/${entry.subject.book.id}`}
              className={`group block h-full ${compact ? "" : "card p-5"}`}
            >
              <div className={compact ? "" : "flex gap-5"}>
                <BookCover
                  book={entry.subject.book}
                  locale={locale}
                  className={
                    compact
                      ? "w-full transition-transform group-hover:-translate-y-1"
                      : "w-32 transition-transform group-hover:-translate-y-1"
                  }
                />

                <div className={compact ? "mt-3" : "min-w-0 flex-1"}>
                  <p className="truncate text-sm font-bold">{t(entry.subject.book.title, locale)}</p>
                  {compact ? null : (
                    <p className="mt-1 text-xs text-muted">{t(entry.subject.book.board, locale)}</p>
                  )}

                  <p className="mt-2 text-xs text-muted">
                    <span dir="ltr" className="tabular-nums">
                      {num(entry.subject.book.unitCount, locale)}
                    </span>{" "}
                    {d.books.units}
                    {" · "}
                    <span dir="ltr" className="tabular-nums">
                      {num(entry.subject.book.lessonCount, locale)}
                    </span>{" "}
                    {d.books.lessons}
                  </p>

                  <div className="mt-2.5">
                    <MasteryBar counts={entry.counts} total={entry.total} />
                  </div>
                  <p className="mt-1.5 text-xs text-muted">
                    {d.dashboard.mastery}{" "}
                    <span dir="ltr" className="font-semibold tabular-nums">
                      {percent(entry.mastery, locale)}
                    </span>
                    {entry.dueCount ? (
                      <span className="ms-2 chip bg-coral-100 text-coral-700 dark:bg-coral-900/50 dark:text-coral-100">
                        {num(entry.dueCount, locale)} {d.dashboard.dueNow}
                      </span>
                    ) : null}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {compact ? null : <p className="mt-6 text-xs text-muted">{d.books.aboutCovers}</p>}
    </section>
  );
}
