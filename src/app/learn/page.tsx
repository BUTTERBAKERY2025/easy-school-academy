import Link from "next/link";
import { SubjectIcon } from "@/components/art/icons";
import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/server";
import { num, t, type Locale } from "@/lib/i18n/config";
import { getCurriculum, getGrade, getLesson } from "@/lib/content";
import { getViewer } from "@/lib/auth/current";
import { recentActivity } from "@/lib/db/repo";
import { lessonBreadcrumb, summariseLearner } from "@/lib/learning/summary";
import { redirect } from "next/navigation";
import { Chevron, Percent, ProgressBar, Ratio, Stat, themeClasses } from "@/components/ui";
import { EnrolmentPicker } from "@/components/enrolment";

export const metadata: Metadata = { title: "Dashboard" };

export default async function LearnPage() {
  const viewer = await getViewer();
  if (!viewer) redirect("/login");
  if (viewer.user.role === "parent") redirect("/parent");
  if (viewer.user.role === "teacher") redirect("/teacher");

  const { locale, d } = await getI18n();
  const summary = await summariseLearner(viewer.user);
  const activity = await recentActivity(viewer.user.id);
  const grade = viewer.user.gradeId ? getGrade(viewer.user.gradeId) : undefined;
  const curriculum = viewer.user.curriculumId ? getCurriculum(viewer.user.curriculumId) : undefined;

  if (!grade) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-2xl font-bold">{d.dashboard.greeting} {viewer.user.name} 👋</h1>
        <p className="mt-2 text-muted">{d.auth.registerSubtitle}</p>
        <div className="card mt-6 p-6">
          <EnrolmentPicker />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">
            {d.dashboard.greeting} {viewer.user.name} 👋
          </h1>
          <p className="mt-2 text-muted">
            {curriculum ? `${curriculum.flag} ${t(curriculum.title, locale)} · ` : ""}
            {t(grade.title, locale)}
          </p>
        </div>
        <details className="card p-4">
          <summary className="cursor-pointer text-sm font-semibold">{d.dashboard.changeGrade}</summary>
          <div className="mt-4 w-72 max-w-full">
            <EnrolmentPicker />
          </div>
        </details>
      </header>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat glyph="🔥" label={d.dashboard.streak} value={num(viewer.user.streakDays, locale)} />
        <Stat glyph="⭐" label={d.dashboard.totalXp} value={num(viewer.user.xp, locale)} />
        <Stat glyph="✅" label={d.dashboard.lessonsDone} value={num(summary.completedCount, locale)} />
        <Stat glyph="⏱️" label={d.dashboard.timeSpent} value={`${num(summary.minutesSpent, locale)} ${d.common.minutes}`} />
      </div>

      <Link
        href="/certificates"
        className="card mt-6 flex items-center justify-between gap-4 p-5 transition-colors hover:bg-surface-muted"
      >
        <span className="font-bold">{d.certificates.navTitle}</span>
        <Chevron />
      </Link>

      {!viewer.hasAccess ? (
        <div className="card mt-6 flex flex-wrap items-center justify-between gap-4 border-sun-300 bg-sun-50 p-5 dark:border-sun-700 dark:bg-sun-900/30">
          <p className="font-semibold">{d.lesson.lockedBody}</p>
          <Link href="/pricing" className="btn btn-primary">
            {d.pricing.choose}
          </Link>
        </div>
      ) : null}

      <section className="mt-10">
        <h2 className="text-xl font-bold">{d.dashboard.continueLearning}</h2>
        {summary.continueWith.length === 0 ? (
          <p className="mt-3 text-muted">{d.dashboard.noProgress}</p>
        ) : (
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {summary.continueWith.map((lesson) => {
              const crumb = lessonBreadcrumb(lesson);
              const theme = themeClasses[crumb.theme ?? "brand"];
              const row = summary.progress.find((entry) => entry.lessonId === lesson.id);
              return (
                <li key={lesson.id}>
                  <Link href={`/learn/lesson/${lesson.id}`} className="card group flex h-full flex-col p-5 transition-transform hover:-translate-y-1">
                    <span className={`grid size-11 place-items-center rounded-2xl text-xl ${theme.soft}`} aria-hidden>
                      {crumb.glyph}
                    </span>
                    <span className="mt-3 block text-xs text-muted">
                      {crumb.subjectTitle ? t(crumb.subjectTitle, locale) : ""}
                    </span>
                    <span className="mt-1 block font-bold">{t(lesson.title, locale)}</span>
                    <span className="mt-auto pt-4 text-sm font-semibold text-brand-600 dark:text-brand-300">
                      {row?.status === "in_progress" ? d.lesson.resume : d.lesson.start}
                      <Chevron className="inline transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold">{d.dashboard.mySubjects}</h2>
          <ul className="mt-5 space-y-3">
            {summary.subjects.map((entry) => (
              <li key={entry.subject.id}>
                <Link href={`/subject/${entry.subject.id}`} className="card flex items-center gap-4 p-4 transition-colors hover:bg-surface-muted">
                  <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${themeClasses[entry.subject.theme].soft}`} aria-hidden>
                    <SubjectIcon glyph={entry.subject.glyph} theme={entry.subject.theme} className="size-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold">{t(entry.subject.title, locale)}</span>
                    <span className="mt-1 block">
                      <ProgressBar value={entry.total ? (entry.completed / entry.total) * 100 : 0} theme={entry.subject.theme} />
                    </span>
                    <span className="mt-1 block text-xs text-muted">
                      <Ratio done={entry.completed} total={entry.total} locale={locale} /> {d.curricula.lessons}
                      {entry.mastery ? (
                        <>
                          {" · "}
                          {d.dashboard.mastery} <Percent value={entry.mastery} locale={locale} />
                        </>
                      ) : null}
                    </span>
                  </span>
                  <Chevron className="shrink-0 text-muted" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold">{d.dashboard.recentActivity}</h2>
          <ul className="card mt-5 divide-y divide-line">
            {activity.length === 0 ? (
              <li className="p-4 text-sm text-muted">{d.dashboard.noProgress}</li>
            ) : (
              activity.map((event) => (
                <li key={event.id} className="flex items-center gap-3 p-4 text-sm">
                  <span aria-hidden>{event.kind === "lesson_completed" ? "✅" : event.kind === "subscribed" ? "💳" : "🏅"}</span>
                  <span className="min-w-0 flex-1 truncate">
                    {activityLabel(event.lessonId, locale) ?? d.pricing.subscribed}
                  </span>
                  {event.xp ? <span dir="ltr" className="chip bg-sun-100 text-sun-800 dark:bg-sun-900/50 dark:text-sun-100">
                      +{num(event.xp, locale)}
                    </span> : null}
                </li>
              ))
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}

function activityLabel(lessonId: string | undefined, locale: Locale): string | undefined {
  if (!lessonId) return undefined;
  const lesson = getLesson(lessonId);
  return lesson ? t(lesson.title, locale) : lessonId;
}
