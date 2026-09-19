import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getI18n } from "@/lib/i18n/server";
import { num, percent, t } from "@/lib/i18n/config";
import { getCurriculum, getGrade, getSubject } from "@/lib/content";
import { getViewer } from "@/lib/auth/current";
import { progressOf } from "@/lib/db/repo";
import { subjectState, type UnitState } from "@/lib/learning/model";
import { BookCover } from "@/components/art/book-cover";
import { LevelChip, MasteryBar } from "@/components/learn/mastery";
import { Chevron, Ratio, themeClasses } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ bookId: string }> }): Promise<Metadata> {
  const { bookId } = await params;
  const subject = getSubject(bookId);
  return { title: subject ? subject.book.title.en : "Book" };
}

/**
 * One book, opened.
 *
 * The shape is a real book's: the copy itself on one side — cover, framework,
 * year, how far through it you are — and the table of contents filling the rest.
 * Units are `<details>` rather than a scripted accordion, so the contents open
 * and close with no JavaScript at all and every chapter is linkable.
 */
export default async function BookPage({ params }: { params: Promise<{ bookId: string }> }) {
  const { bookId } = await params;
  const subject = getSubject(bookId);
  if (!subject) notFound();

  const { locale, d } = await getI18n();
  const grade = getGrade(subject.gradeId);
  const curriculum = getCurriculum(subject.curriculumId);

  const viewer = await getViewer();
  const progress = viewer ? await progressOf(viewer.user.id) : [];
  const rows = new Map(progress.map((row) => [row.lessonId, row]));
  const state = subjectState(subject, rows, new Date());
  const book = subject.book;
  const mine = viewer?.user.gradeId === subject.gradeId;

  // Where to pick the book up: the first unit that is not finished.
  const openAt = state.units.find((unit) => !unit.complete) ?? state.units[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <Link href={mine ? "/books" : "/curricula"} className="hover:text-body">
          {mine ? d.books.backToShelf : d.curricula.backToCurricula}
        </Link>
        {curriculum ? (
          <>
            <span aria-hidden>/</span>
            <Link href={`/curricula/${curriculum.id}`} className="hover:text-body">
              {t(curriculum.title, locale)}
            </Link>
          </>
        ) : null}
        {grade ? (
          <>
            <span aria-hidden>/</span>
            <Link href={`/grade/${grade.id}`} className="hover:text-body">
              {t(grade.title, locale)}
            </Link>
          </>
        ) : null}
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="card flex flex-col items-center p-6 text-center">
            <BookCover book={book} locale={locale} className="w-44" />

            <h1 className="mt-5 text-xl font-extrabold leading-snug">{t(book.title, locale)}</h1>
            <p className="mt-1 text-xs text-muted">{t(book.board, locale)}</p>
            <p className="mt-0.5 text-xs font-semibold text-muted">{t(book.level, locale)}</p>
            {book.follows ? (
              <p className="mt-3 rounded-2xl bg-surface-muted px-3 py-2 text-[0.7rem] leading-relaxed text-muted">
                {d.books.follows} <span className="font-semibold text-body">{t(book.follows, locale)}</span>
              </p>
            ) : null}

            <dl className="mt-5 grid w-full grid-cols-2 gap-3 text-xs">
              <div className="rounded-2xl bg-surface-muted p-3">
                <dt className="text-muted">{d.books.units}</dt>
                <dd className="mt-0.5 text-lg font-bold tabular-nums" dir="ltr">
                  {num(book.unitCount, locale)}
                </dd>
              </div>
              <div className="rounded-2xl bg-surface-muted p-3">
                <dt className="text-muted">{d.books.lessons}</dt>
                <dd className="mt-0.5 text-lg font-bold tabular-nums" dir="ltr">
                  {num(book.lessonCount, locale)}
                </dd>
              </div>
            </dl>

            {viewer ? (
              <div className="mt-5 w-full">
                <MasteryBar counts={state.counts} total={state.total} />
                <p className="mt-2 text-xs text-muted">
                  {d.dashboard.mastery}{" "}
                  <span dir="ltr" className="font-semibold tabular-nums">
                    {percent(state.mastery, locale)}
                  </span>
                  {" · "}
                  <Ratio done={state.completed} total={state.total} locale={locale} /> {d.books.lessons}
                </p>
              </div>
            ) : null}

            {openAt?.states[0] ? (
              <Link
                href={`/learn/lesson/${(openAt.states.find((entry) => entry.row?.status !== "completed") ?? openAt.states[0]).lesson.id}`}
                className="btn btn-primary mt-5 w-full"
              >
                {state.completed > 0 ? d.lesson.resume : d.books.openBook}
              </Link>
            ) : null}

            <p className="mt-4 text-[0.65rem] leading-relaxed text-muted">{d.books.aboutCovers}</p>
          </div>
        </aside>

        <main>
          <h2 className="text-2xl font-extrabold">{d.books.contents}</h2>
          <p className="mt-1 text-sm text-muted">{t(subject.description, locale)}</p>

          <ol className="mt-6 space-y-3">
            {state.units.map((unit) => (
              <ContentsUnit key={unit.unit.id} unit={unit} theme={subject.theme} openByDefault={unit.unit.id === openAt?.unit.id} hasAccess={Boolean(viewer?.hasAccess)} />
            ))}
          </ol>
        </main>
      </div>
    </div>
  );
}

async function ContentsUnit({
  unit,
  theme,
  openByDefault,
  hasAccess,
}: {
  unit: UnitState;
  theme: keyof typeof themeClasses;
  openByDefault: boolean;
  hasAccess: boolean;
}) {
  const { locale, d } = await getI18n();
  const tone = themeClasses[theme];

  return (
    <li className="card overflow-hidden">
      <details open={openByDefault} className="group">
        <summary className={`flex cursor-pointer list-none items-center gap-4 p-5 ${tone.soft}`}>
          <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-surface font-bold tabular-nums" dir="ltr">
            {num(unit.unit.index + 1, locale)}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-bold">{t(unit.unit.title, locale)}</span>
            <span className="mt-1.5 block max-w-xs">
              <MasteryBar counts={unit.counts} total={unit.states.length} />
            </span>
          </span>
          <span className="shrink-0 text-xs text-muted">
            <Ratio
              done={unit.states.filter((entry) => entry.row?.status === "completed").length}
              total={unit.states.length}
              locale={locale}
            />
          </span>
          <svg
            viewBox="0 0 20 20"
            aria-hidden
            className="size-4 shrink-0 text-muted transition-transform group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M4 7l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </summary>

        <Link
          href={`/books/${unit.unit.subjectId}/${unit.unit.id}`}
          className="flex items-center justify-between gap-2 border-t border-line px-5 py-3 text-sm font-semibold text-brand-600 transition-colors hover:bg-surface-muted dark:text-brand-300"
        >
          {d.unit.openUnit}
          <Chevron />
        </Link>

        <ol className="divide-y divide-line border-t border-line">
          {unit.states.map((entry) => {
            const locked = !entry.lesson.free && !hasAccess;
            return (
              <li key={entry.lesson.id}>
                <Link
                  href={`/learn/lesson/${entry.lesson.id}`}
                  className="flex items-center gap-4 p-4 transition-colors hover:bg-surface-muted"
                >
                  <span
                    aria-hidden
                    className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-muted text-xs font-bold tabular-nums"
                    dir="ltr"
                  >
                    {entry.row?.status === "completed" ? "✅" : locked ? "🔒" : entry.lesson.index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{t(entry.lesson.title, locale)}</span>
                    <span className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted">
                      <span dir="ltr" className="tabular-nums">
                        {num(entry.lesson.durationMinutes, locale)}
                      </span>
                      <span>{d.common.minutes}</span>
                      {entry.lesson.free ? (
                        <span className="chip bg-mint-100 text-mint-800 dark:bg-mint-900/50 dark:text-mint-100">
                          {d.lesson.freePreview}
                        </span>
                      ) : null}
                      {entry.lesson.authored ? null : (
                        <span className="chip bg-surface-muted text-muted">{d.common.comingSoon}</span>
                      )}
                    </span>
                  </span>
                  {entry.level === "new" ? null : <LevelChip level={entry.level} d={d} />}
                  {entry.needsReview ? (
                    <span className="chip shrink-0 bg-coral-100 text-coral-700 dark:bg-coral-900/50 dark:text-coral-100">
                      {d.dashboard.dueNow}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ol>
      </details>
    </li>
  );
}
