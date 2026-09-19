import Link from "next/link";
import { getI18n } from "@/lib/i18n/server";
import { num, percent, t, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { MASTERY_ORDER, type MasteryLevel, type SubjectState, type UnitState } from "@/lib/learning/model";
import { SubjectIcon } from "@/components/art/icons";
import { Chevron, themeClasses } from "@/components/ui";

/**
 * The learner model, shown to the learner.
 *
 * A dashboard that only counts finished lessons tells a student something they
 * already know. What they cannot see for themselves is how firmly they hold it,
 * so these panels put the model's own estimate on screen — including where it
 * has decayed — and label it as an estimate rather than a score.
 */

export const LEVEL_STYLE: Record<MasteryLevel, { dot: string; chip: string; bar: string }> = {
  new: { dot: "bg-line", chip: "bg-surface-muted text-muted", bar: "bg-surface-muted ring-1 ring-inset ring-line" },
  attempted: {
    dot: "bg-sky-300",
    chip: "bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-100",
    bar: "bg-sky-300",
  },
  familiar: {
    dot: "bg-sun-400",
    chip: "bg-sun-100 text-sun-800 dark:bg-sun-900/50 dark:text-sun-100",
    bar: "bg-sun-400",
  },
  proficient: {
    dot: "bg-mint-500",
    chip: "bg-mint-100 text-mint-800 dark:bg-mint-900/50 dark:text-mint-100",
    bar: "bg-mint-500",
  },
  mastered: {
    dot: "bg-brand-500",
    chip: "bg-brand-100 text-brand-800 dark:bg-brand-900/50 dark:text-brand-100",
    bar: "bg-brand-500",
  },
};

export function levelLabel(level: MasteryLevel, d: Dictionary): string {
  const labels: Record<MasteryLevel, string> = {
    new: d.dashboard.levelNew,
    attempted: d.dashboard.levelAttempted,
    familiar: d.dashboard.levelFamiliar,
    proficient: d.dashboard.levelProficient,
    mastered: d.dashboard.levelMastered,
  };
  return labels[level];
}

export function LevelChip({ level, d }: { level: MasteryLevel; d: Dictionary }) {
  return (
    <span className={`chip gap-1.5 ${LEVEL_STYLE[level].chip}`}>
      <span className={`size-1.5 rounded-full ${LEVEL_STYLE[level].dot}`} aria-hidden />
      {levelLabel(level, d)}
    </span>
  );
}

/** One bar carrying the whole distribution, so weak and strong are read together. */
export function MasteryBar({ counts, total }: { counts: Record<MasteryLevel, number>; total: number }) {
  if (!total) return <div className="h-2.5 w-full rounded-full bg-surface-muted" />;
  return (
    <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-surface-muted" aria-hidden>
      {[...MASTERY_ORDER].reverse().map((level) =>
        counts[level] ? (
          <div
            key={level}
            className={`h-full ${LEVEL_STYLE[level].bar} transition-[width] duration-500`}
            style={{ width: `${(counts[level] / total) * 100}%` }}
          />
        ) : null,
      )}
    </div>
  );
}

export async function StrengthPanel({ subjects }: { subjects: SubjectState[] }) {
  const { locale, d } = await getI18n();

  const counts = subjects.reduce(
    (total, subject) => {
      for (const level of MASTERY_ORDER) total[level] += subject.counts[level];
      return total;
    },
    { new: 0, attempted: 0, familiar: 0, proficient: 0, mastered: 0 } as Record<MasteryLevel, number>,
  );
  const total = MASTERY_ORDER.reduce((sum, level) => sum + counts[level], 0);
  const held = counts.proficient + counts.mastered;

  return (
    <section className="card p-6">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-lg font-bold">{d.dashboard.strengthTitle}</h2>
        <span className="text-2xl font-extrabold text-brand-600 dark:text-brand-300" dir="ltr">
          {percent(total ? Math.round((held / total) * 100) : 0, locale)}
        </span>
      </header>
      <p className="mt-1 text-sm text-muted">{d.dashboard.strengthBody}</p>

      <div className="mt-4">
        <MasteryBar counts={counts} total={total} />
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">
        {[...MASTERY_ORDER].reverse().map((level) => (
          <li key={level} className="flex items-center gap-1.5">
            <span className={`size-2 rounded-full ${LEVEL_STYLE[level].dot}`} aria-hidden />
            <span className="text-muted">{levelLabel(level, d)}</span>
            <span className="font-semibold tabular-nums" dir="ltr">
              {num(counts[level], locale)}
            </span>
          </li>
        ))}
      </ul>

      <ul className="mt-6 space-y-3">
        {subjects.map((entry) => (
          <li key={entry.subject.id}>
            <Link
              href={`/subject/${entry.subject.id}`}
              className="flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-surface-muted"
            >
              <span
                className={`grid size-10 shrink-0 place-items-center rounded-2xl ${themeClasses[entry.subject.theme].soft}`}
                aria-hidden
              >
                <SubjectIcon glyph={entry.subject.glyph} theme={entry.subject.theme} className="size-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-sm font-bold">{t(entry.subject.title, locale)}</span>
                  <span className="shrink-0 text-xs font-semibold tabular-nums text-muted" dir="ltr">
                    {percent(entry.mastery, locale)}
                  </span>
                </span>
                <span className="mt-1.5 block">
                  <MasteryBar counts={entry.counts} total={entry.total} />
                </span>
              </span>
              {entry.dueCount ? (
                <span className="chip shrink-0 bg-coral-100 text-coral-700 dark:bg-coral-900/50 dark:text-coral-100">
                  {num(entry.dueCount, locale)}
                </span>
              ) : (
                <Chevron className="shrink-0 text-muted" />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * The path through a subject: one dot per lesson, grouped by unit.
 *
 * A list of titles hides the shape of the work. Dots show it at a glance — how
 * far in the student is, where the weak patch sits, how much of the unit is
 * left — and the colour is the model's level, not merely done-or-not.
 */
export async function SubjectPath({ subject }: { subject: SubjectState }) {
  const { locale, d } = await getI18n();

  return (
    <section className="card p-6">
      <header className="flex items-center gap-3">
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-2xl ${themeClasses[subject.subject.theme].soft}`}
          aria-hidden
        >
          <SubjectIcon glyph={subject.subject.glyph} theme={subject.subject.theme} className="size-6" />
        </span>
        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold">{t(subject.subject.title, locale)}</h2>
          <p className="text-xs text-muted">{d.dashboard.mapBody}</p>
        </div>
        <Link
          href={`/subject/${subject.subject.id}`}
          className="ms-auto shrink-0 text-sm font-semibold text-brand-600 dark:text-brand-300"
        >
          {d.common.all}
        </Link>
      </header>

      <ol className="mt-5 space-y-4">
        {subject.units.slice(0, 4).map((unit) => (
          <UnitRow key={unit.unit.id} unit={unit} locale={locale} d={d} />
        ))}
      </ol>
    </section>
  );
}

function UnitRow({ unit, locale, d }: { unit: UnitState; locale: Locale; d: Dictionary }) {
  return (
    <li>
      <div className="flex items-baseline justify-between gap-2">
        <Link
          href={`/books/${unit.unit.subjectId}/${unit.unit.id}`}
          className="truncate text-sm font-semibold hover:underline"
        >
          {t(unit.unit.title, locale)}
        </Link>
        <span className="shrink-0 text-xs tabular-nums text-muted" dir="ltr">
          {percent(unit.mastery, locale)}
        </span>
      </div>
      <ol className="mt-2 flex flex-wrap gap-1.5">
        {unit.states.map((state) => (
          <li key={state.lesson.id}>
            <Link
              href={`/learn/lesson/${state.lesson.id}`}
              title={`${t(state.lesson.title, locale)} — ${levelLabel(state.level, d)}`}
              className={`grid size-7 place-items-center rounded-full text-[10px] font-bold text-white transition-transform hover:scale-110 ${
                LEVEL_STYLE[state.level].bar
              } ${state.level === "new" ? "text-muted" : ""} ${
                state.needsReview ? "ring-2 ring-coral-400 ring-offset-2 ring-offset-surface" : ""
              }`}
            >
              <span dir="ltr">{num(state.lesson.index, locale)}</span>
            </Link>
          </li>
        ))}
      </ol>
    </li>
  );
}
