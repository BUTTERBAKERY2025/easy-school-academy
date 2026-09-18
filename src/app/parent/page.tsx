import Link from "next/link";
import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/server";
import { num, percent, t } from "@/lib/i18n/config";
import { getCurriculum, getGrade } from "@/lib/content";
import { requireRole } from "@/lib/auth/current";
import { findUserById, listChildren, subscriptionOf } from "@/lib/db/repo";
import { summariseLearner } from "@/lib/learning/summary";
import { getPlan } from "@/lib/billing/plans";
import { ProgressBar, Ratio, SectionHeading, Stat, themeClasses } from "@/components/ui";

export const metadata: Metadata = { title: "Parent dashboard" };

export default async function ParentPage() {
  const parent = await requireRole(["parent", "admin"]);
  const { locale, d } = await getI18n();

  const children = await listChildren(parent.id);
  const subscription = await subscriptionOf(parent.id);
  const plan = subscription ? getPlan(subscription.planId) : undefined;

  const reports = await Promise.all(
    children.map(async (child) => {
      const full = await findUserById(child.id);
      const summary = full ? await summariseLearner(full) : undefined;
      return { child, summary };
    }),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeading title={d.parent.title} body={d.parent.subtitle} />

      <section className="card mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <h2 className="text-sm font-bold text-muted">{d.parent.subscription}</h2>
          <p className="mt-1 text-lg font-bold">
            {plan ? t(plan.title, locale) : d.common.notStarted}
            {subscription ? (
              <span className="ms-2 text-sm font-normal text-muted">
                {new Date(subscription.currentPeriodEnd).toLocaleDateString(locale)}
              </span>
            ) : null}
          </p>
        </div>
        <Link href="/pricing" className="btn btn-ghost">
          {d.parent.manageSubscription}
        </Link>
      </section>

      <h2 className="mt-12 text-xl font-bold">{d.parent.children}</h2>

      {reports.length === 0 ? (
        <p className="mt-3 text-muted">{d.parent.noChildren}</p>
      ) : (
        <div className="mt-6 space-y-6">
          {reports.map(({ child, summary }) => {
            const grade = child.gradeId ? getGrade(child.gradeId) : undefined;
            const curriculum = child.curriculumId ? getCurriculum(child.curriculumId) : undefined;

            return (
              <section key={child.id} className="card p-6">
                <header className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold">{child.name}</h3>
                    <p className="text-sm text-muted">
                      {curriculum ? `${curriculum.flag} ${t(curriculum.title, locale)}` : ""}
                      {grade ? ` · ${t(grade.title, locale)}` : ""}
                    </p>
                  </div>
                  <span className="chip bg-sun-100 text-sun-800 dark:bg-sun-900/50 dark:text-sun-100">
                    🔥 {num(child.streakDays, locale)} {d.dashboard.streak}
                  </span>
                </header>

                <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  <Stat glyph="⭐" label={d.dashboard.totalXp} value={num(child.xp, locale)} />
                  <Stat glyph="✅" label={d.dashboard.lessonsDone} value={num(summary?.completedCount ?? 0, locale)} />
                  <Stat glyph="⏱️" label={d.dashboard.timeSpent} value={`${num(summary?.minutesSpent ?? 0, locale)} ${d.common.minutes}`} />
                  <Stat glyph="🎯" label={d.dashboard.mastery} value={percent(summary?.averageScore ?? 0, locale)} />
                </div>

                <h4 className="mt-6 text-sm font-bold text-muted">{d.parent.weeklyReport}</h4>
                <ul className="mt-3 space-y-2">
                  {(summary?.subjects ?? []).map((entry) => (
                    <li key={entry.subject.id} className="flex items-center gap-3 rounded-2xl border border-line p-3">
                      <span className={`grid size-9 shrink-0 place-items-center rounded-xl ${themeClasses[entry.subject.theme].soft}`} aria-hidden>
                        {entry.subject.glyph}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">{t(entry.subject.title, locale)}</span>
                        <ProgressBar
                          value={entry.total ? (entry.completed / entry.total) * 100 : 0}
                          theme={entry.subject.theme}
                          className="mt-1"
                        />
                      </span>
                      <span className="shrink-0 text-sm text-muted">
                        <Ratio done={entry.completed} total={entry.total} locale={locale} />
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
