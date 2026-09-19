import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getI18n } from "@/lib/i18n/server";
import { num, t, type Locale } from "@/lib/i18n/config";
import { getCurriculum, getGrade, getLesson } from "@/lib/content";
import { getViewer } from "@/lib/auth/current";
import { progressOf, recentActivity } from "@/lib/db/repo";
import { activityDays, minutesOn, studyPlan, subjectState } from "@/lib/learning/model";
import { badgesFor } from "@/lib/learning/badges";
import { Chevron, Stat } from "@/components/ui";
import { EnrolmentPicker } from "@/components/enrolment";
import { TodaysPlan } from "@/components/learn/plan";
import { StrengthPanel, SubjectPath } from "@/components/learn/mastery";
import { GoalRing } from "@/components/learn/goal-ring";
import { WeekStrip } from "@/components/learn/week";
import { BadgeWall } from "@/components/learn/badges";

export const metadata: Metadata = { title: "Dashboard" };

/**
 * The student's dashboard.
 *
 * Everything on the page is derived from the progress rows by
 * `lib/learning/model`, so the page itself only arranges: the plan first,
 * because a child arriving here needs one obvious thing to do; the learner
 * model next, because knowing what you hold and what has faded is what lets a
 * student eventually plan for themselves; and the goal, week and badges last,
 * as the record rather than the instruction.
 */
export default async function LearnPage() {
  const viewer = await getViewer();
  if (!viewer) redirect("/login");
  if (viewer.user.role === "parent") redirect("/parent");
  if (viewer.user.role === "teacher") redirect("/teacher");

  const { locale, d } = await getI18n();
  const grade = viewer.user.gradeId ? getGrade(viewer.user.gradeId) : undefined;
  const curriculum = viewer.user.curriculumId ? getCurriculum(viewer.user.curriculumId) : undefined;

  if (!grade) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-2xl font-bold">
          {d.dashboard.greeting} {viewer.user.name} 👋
        </h1>
        <p className="mt-2 text-muted">{d.auth.registerSubtitle}</p>
        <div className="card mt-6 p-6">
          <EnrolmentPicker />
        </div>
      </div>
    );
  }

  const now = new Date();
  const progress = await progressOf(viewer.user.id);
  const activity = await recentActivity(viewer.user.id);
  const rows = new Map(progress.map((row) => [row.lessonId, row]));

  const subjects = grade.subjects.map((subject) => subjectState(subject, rows, now));
  const plan = studyPlan(grade.subjects, rows, now, { hasAccess: viewer.hasAccess });
  const badges = badgesFor(viewer.user, progress, subjects);

  // What to draw the path for: whatever today's plan opens with, so the map
  // below the plan is the map of the work above it.
  const focus =
    subjects.find((entry) => entry.subject.id === plan[0]?.subject.id) ??
    subjects.find((entry) => entry.completed > 0) ??
    subjects[0];

  const completed = progress.filter((row) => row.status === "completed").length;
  const minutesSpent = Math.round(progress.reduce((total, row) => total + row.secondsSpent, 0) / 60);
  const minutesToday = minutesOn(progress, now.toISOString().slice(0, 10));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
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

      {!viewer.hasAccess ? (
        <div className="card mt-6 flex flex-wrap items-center justify-between gap-4 border-sun-300 bg-sun-50 p-5 dark:border-sun-700 dark:bg-sun-900/30">
          <p className="font-semibold">{d.lesson.lockedBody}</p>
          <Link href="/pricing" className="btn btn-primary">
            {d.pricing.choose}
          </Link>
        </div>
      ) : null}

      <div className="mt-8">
        <TodaysPlan items={plan} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <StrengthPanel subjects={subjects} />
          {focus ? <SubjectPath subject={focus} /> : null}

          <section className="card p-6">
            <h2 className="text-lg font-bold">{d.dashboard.recentActivity}</h2>
            <ul className="mt-4 divide-y divide-line">
              {activity.length === 0 ? (
                <li className="py-3 text-sm text-muted">{d.dashboard.noProgress}</li>
              ) : (
                activity.map((event) => (
                  <li key={event.id} className="flex items-center gap-3 py-3 text-sm">
                    <span aria-hidden>
                      {event.kind === "lesson_completed" ? "✅" : event.kind === "subscribed" ? "💳" : "🏅"}
                    </span>
                    <span className="min-w-0 flex-1 truncate">
                      {activityLabel(event.lessonId, locale) ?? d.pricing.subscribed}
                    </span>
                    {event.xp ? (
                      <span dir="ltr" className="chip bg-sun-100 text-sun-800 dark:bg-sun-900/50 dark:text-sun-100">
                        +{num(event.xp, locale)}
                      </span>
                    ) : null}
                  </li>
                ))
              )}
            </ul>
          </section>
        </div>

        <aside className="space-y-6">
          <GoalRing
            minutesToday={minutesToday}
            locale={locale}
            labels={{
              title: d.dashboard.goalTitle,
              done: d.dashboard.goalDone,
              toGo: d.dashboard.goalToGo,
              of: d.dashboard.goalOf,
              change: d.dashboard.goalChange,
              minutes: d.dashboard.goalMinutes,
              hint: d.dashboard.goalHint,
            }}
          />

          <WeekStrip days={activityDays(progress, now, 7)} streakDays={viewer.user.streakDays} />

          <div className="grid grid-cols-3 gap-3">
            <Stat glyph="⭐" label={d.dashboard.totalXp} value={num(viewer.user.xp, locale)} />
            <Stat glyph="✅" label={d.dashboard.lessonsDone} value={num(completed, locale)} />
            <Stat glyph="⏱️" label={d.dashboard.timeSpent} value={num(minutesSpent, locale)} />
          </div>

          <BadgeWall badges={badges} />

          <Link
            href="/certificates"
            className="card flex items-center justify-between gap-4 p-5 transition-colors hover:bg-surface-muted"
          >
            <span className="font-bold">{d.certificates.navTitle}</span>
            <Chevron />
          </Link>
        </aside>
      </div>
    </div>
  );
}

function activityLabel(lessonId: string | undefined, locale: Locale): string | undefined {
  if (!lessonId) return undefined;
  const lesson = getLesson(lessonId);
  return lesson ? t(lesson.title, locale) : lessonId;
}
