import Link from "next/link";
import { getI18n } from "@/lib/i18n/server";
import { num, percent, t } from "@/lib/i18n/config";
import type { PlanItem, PlanReason } from "@/lib/learning/model";
import { SubjectIcon } from "@/components/art/icons";
import { Chevron, themeClasses } from "@/components/ui";
import { LevelChip } from "./mastery";

/**
 * Today's plan — the one part of the dashboard a student must be able to act on
 * without deciding anything.
 *
 * Its order is the argument: what is fading is reviewed before anything new is
 * added, and consecutive items come from different subjects. Each card says why
 * it is there, because a plan a student understands is one they can eventually
 * make for themselves, which is the point.
 */

const REASON_STYLE: Record<PlanReason, string> = {
  review: "bg-coral-100 text-coral-700 dark:bg-coral-900/50 dark:text-coral-100",
  resume: "bg-sun-100 text-sun-800 dark:bg-sun-900/50 dark:text-sun-100",
  fresh: "bg-brand-100 text-brand-800 dark:bg-brand-900/50 dark:text-brand-100",
};

export async function TodaysPlan({ items }: { items: PlanItem[] }) {
  const { locale, d } = await getI18n();

  const reasonLabel: Record<PlanReason, string> = {
    review: d.dashboard.reasonReview,
    resume: d.dashboard.reasonResume,
    fresh: d.dashboard.reasonFresh,
  };
  const reasonWhy: Record<PlanReason, string> = {
    review: d.dashboard.whyReview,
    resume: d.dashboard.whyResume,
    fresh: d.dashboard.whyFresh,
  };

  if (items.length === 0) {
    return (
      <section className="card p-6">
        <h2 className="text-lg font-bold">{d.dashboard.planTitle}</h2>
        <p className="mt-2 text-muted">{d.dashboard.planEmpty}</p>
      </section>
    );
  }

  return (
    <section>
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-bold">{d.dashboard.planTitle}</h2>
        <p className="text-sm text-muted">{d.dashboard.planBody}</p>
      </header>

      <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, at) => {
          const theme = themeClasses[item.subject.theme];
          // The first card is the one thing to do now, so it carries the only
          // filled button on the page.
          const lead = at === 0;

          return (
            <li key={item.lesson.id}>
              <Link
                href={`/learn/lesson/${item.lesson.id}`}
                className={`card group flex h-full flex-col p-5 transition-transform hover:-translate-y-1 ${
                  lead ? "ring-2 ring-brand-300 dark:ring-brand-500/60" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${theme.soft}`} aria-hidden>
                    <SubjectIcon glyph={item.subject.glyph} theme={item.subject.theme} className="size-6" />
                  </span>
                  <span className={`chip ${REASON_STYLE[item.reason]}`}>{reasonLabel[item.reason]}</span>
                </div>

                <span className="mt-3 block text-xs text-muted">{t(item.subject.title, locale)}</span>
                <span className="mt-1 block font-bold leading-snug">{t(item.lesson.title, locale)}</span>
                <span className="mt-2 block text-xs text-muted">{reasonWhy[item.reason]}</span>

                {item.reason === "review" ? (
                  <span className="mt-3 flex items-center gap-2 text-xs">
                    <LevelChip level={item.state.level} d={d} />
                    <span className="text-muted">
                      {d.dashboard.recallNow}{" "}
                      <span dir="ltr" className="font-semibold tabular-nums">
                        {percent(Math.round(item.state.retrievability * 100), locale)}
                      </span>
                    </span>
                  </span>
                ) : null}

                <span className="mt-auto flex items-center justify-between gap-2 pt-5">
                  <span className="text-xs text-muted">
                    {d.dashboard.aboutMinutes}{" "}
                    <span dir="ltr" className="tabular-nums">
                      {num(
                        item.reason === "review"
                          ? Math.max(1, Math.round(item.lesson.durationMinutes / 2))
                          : item.lesson.durationMinutes,
                        locale,
                      )}
                    </span>{" "}
                    {d.common.minutes}
                  </span>
                  <span
                    className={
                      lead
                        ? "btn btn-primary px-4 py-2 text-sm"
                        : "text-sm font-semibold text-brand-600 dark:text-brand-300"
                    }
                  >
                    {item.reason === "resume" ? d.lesson.resume : d.lesson.start}
                    <Chevron className="inline transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
