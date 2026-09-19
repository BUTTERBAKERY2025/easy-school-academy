import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getI18n } from "@/lib/i18n/server";
import { num, percent, t } from "@/lib/i18n/config";
import { getSubject, getUnit } from "@/lib/content";
import { getViewer } from "@/lib/auth/current";
import { progressOf } from "@/lib/db/repo";
import { subjectState } from "@/lib/learning/model";
import { reviewQuestions, reviewSeed, unitGlossary, unitObjectives } from "@/lib/learning/unit-review";
import { LevelChip, MasteryBar } from "@/components/learn/mastery";
import { UnitReview } from "@/components/learn/unit-review";
import { Chevron, Ratio, themeClasses } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unitId: string }>;
}): Promise<Metadata> {
  const { unitId } = await params;
  const unit = getUnit(unitId);
  return { title: unit ? unit.title.en : "Unit" };
}

/**
 * One unit of a book, the way a chapter opens and closes.
 *
 * What it is for comes first, then the lessons, then the check that the chapter
 * stuck. All three are derived from the lessons themselves, so a unit gains its
 * opening and its closing review the moment its lessons are written and neither
 * can describe content that is not there.
 */
export default async function UnitPage({
  params,
}: {
  params: Promise<{ bookId: string; unitId: string }>;
}) {
  const { bookId, unitId } = await params;
  const subject = getSubject(bookId);
  const unit = getUnit(unitId);
  if (!subject || !unit || unit.subjectId !== subject.id) notFound();

  const { locale, d } = await getI18n();
  const viewer = await getViewer();
  const progress = viewer ? await progressOf(viewer.user.id) : [];
  const rows = new Map(progress.map((row) => [row.lessonId, row]));

  const now = new Date();
  const state = subjectState(subject, rows, now);
  const here = state.units.find((entry) => entry.unit.id === unit.id);
  if (!here) notFound();

  const objectives = unitObjectives(unit);
  const glossary = unitGlossary(unit);
  const questions = reviewQuestions(unit, reviewSeed(unit.id, now));
  const due = here.states.filter((entry) => entry.needsReview);

  const at = state.units.findIndex((entry) => entry.unit.id === unit.id);
  const previous = state.units[at - 1]?.unit;
  const next = state.units[at + 1]?.unit;
  const tone = themeClasses[subject.theme];
  const done = here.states.filter((entry) => entry.row?.status === "completed").length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <Link href={`/books/${subject.id}`} className="hover:text-body">
          {t(subject.book.title, locale)}
        </Link>
        <span aria-hidden>/</span>
        <span>
          {d.unit.label} {num(unit.index + 1, locale)}
        </span>
      </nav>

      <header className={`card mt-4 p-6 sm:p-8 ${tone.soft}`}>
        <p className="text-sm font-semibold text-muted">
          {d.unit.label} {num(unit.index + 1, locale)} {d.lesson.of} {num(state.units.length, locale)}
        </p>
        <h1 className="mt-1 text-3xl font-extrabold">{t(unit.title, locale)}</h1>
        <p className="mt-3 max-w-2xl text-muted">{t(unit.summary, locale)}</p>

        <div className="mt-5 max-w-md">
          <MasteryBar counts={here.counts} total={here.states.length} />
          <p className="mt-2 text-sm text-muted">
            <Ratio done={done} total={here.states.length} locale={locale} /> {d.books.lessons}
            {" · "}
            {d.dashboard.mastery}{" "}
            <span dir="ltr" className="font-semibold tabular-nums">
              {percent(here.mastery, locale)}
            </span>
          </p>
        </div>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-6">
          {objectives.length ? (
            <section className="card p-6">
              <h2 className="text-lg font-bold">{d.unit.objectives}</h2>
              <ul className="mt-4 space-y-2.5">
                {objectives.map((objective) => (
                  <li key={objective.ar} className="flex gap-3 text-sm">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-400" aria-hidden />
                    <span>{t(objective, locale)}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="card overflow-hidden">
            <h2 className="p-5 text-lg font-bold">{d.unit.lessonsTitle}</h2>
            <ol className="divide-y divide-line border-t border-line">
              {here.states.map((entry) => {
                const locked = !entry.lesson.free && !viewer?.hasAccess;
                return (
                  <li key={entry.lesson.id}>
                    <Link
                      href={`/learn/lesson/${entry.lesson.id}`}
                      className="flex items-center gap-4 p-4 transition-colors hover:bg-surface-muted"
                    >
                      <span
                        aria-hidden
                        className="grid size-10 shrink-0 place-items-center rounded-2xl bg-surface-muted text-sm font-bold tabular-nums"
                        dir="ltr"
                      >
                        {entry.row?.status === "completed" ? "✅" : locked ? "🔒" : entry.lesson.index + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold">{t(entry.lesson.title, locale)}</span>
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
                      <Chevron className="shrink-0 text-muted" />
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>

          <UnitReview
            unitId={unit.id}
            questions={questions}
            locale={locale}
            canSave={Boolean(viewer)}
          />

          <nav className="flex flex-wrap items-center justify-between gap-3">
            {previous ? (
              <Link href={`/books/${subject.id}/${previous.id}`} className="btn btn-ghost">
                <Chevron className="rotate-180" />
                {d.unit.previousUnit}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/books/${subject.id}/${next.id}`} className="btn btn-ghost">
                {d.unit.nextUnit}
                <Chevron />
              </Link>
            ) : null}
          </nav>
        </div>

        <aside className="space-y-6">
          {due.length ? (
            <section className="card border-coral-200 bg-coral-50 p-5 dark:border-coral-700 dark:bg-coral-900/25">
              <h2 className="text-sm font-bold">{d.unit.dueHere}</h2>
              <ul className="mt-3 space-y-2">
                {due.map((entry) => (
                  <li key={entry.lesson.id}>
                    <Link
                      href={`/learn/lesson/${entry.lesson.id}`}
                      className="flex items-center justify-between gap-2 text-sm hover:underline"
                    >
                      <span className="min-w-0 truncate">{t(entry.lesson.title, locale)}</span>
                      <span dir="ltr" className="shrink-0 text-xs tabular-nums text-muted">
                        {percent(Math.round(entry.retrievability * 100), locale)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {glossary.length ? (
            <section className="card p-5">
              <h2 className="text-sm font-bold">{d.unit.glossary}</h2>
              <p className="mt-1 text-xs text-muted">{d.unit.glossaryBody}</p>
              <dl className="mt-4 space-y-3">
                {glossary.map((entry) => (
                  <div key={entry.term.ar}>
                    <dt className="text-sm font-semibold">{t(entry.term, locale)}</dt>
                    <dd className="text-xs text-muted">{t(entry.meaning, locale)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
