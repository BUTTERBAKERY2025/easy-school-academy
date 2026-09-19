import Link from "next/link";
import { Avatar, avatarFor } from "@/components/art/avatar";
import { getI18n } from "@/lib/i18n/server";
import { num, t } from "@/lib/i18n/config";
import { getCurriculum, getGrade } from "@/lib/content";
import type { PublicUser } from "@/lib/db/types";
import { EnrolmentPicker } from "@/components/enrolment";

/**
 * Who the student is, at the top of their own page.
 *
 * A child arriving at a dashboard should see themselves before they see any
 * number: their face, their name, their curriculum and their year — the things
 * that make this their school rather than a website. The face is derived from
 * the account id, so it is there from the first visit and is the same face every
 * time.
 */
export async function IdentityCard({ user }: { user: PublicUser }) {
  const { locale, d } = await getI18n();
  const grade = user.gradeId ? getGrade(user.gradeId) : undefined;
  const curriculum = user.curriculumId ? getCurriculum(user.curriculumId) : undefined;

  return (
    <section className="card overflow-hidden">
      <div className="flex flex-wrap items-center gap-5 bg-gradient-to-br from-brand-50 to-surface p-6 dark:from-brand-900/40 dark:to-surface">
        <span className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-full ring-4 ring-surface">
          <Avatar person={avatarFor(user.id)} className="size-20" title={user.name} />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-sm text-muted">{d.dashboard.greeting}</p>
          <h1 className="truncate text-2xl font-extrabold sm:text-3xl">{user.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {curriculum ? (
              <span className="chip gap-1.5 bg-surface-muted">
                <span aria-hidden>{curriculum.flag}</span>
                {t(curriculum.title, locale)}
              </span>
            ) : null}
            {grade ? <span className="chip bg-surface-muted">{t(grade.title, locale)}</span> : null}
            <span className="chip gap-1.5 bg-sun-100 text-sun-800 dark:bg-sun-900/50 dark:text-sun-100">
              <span aria-hidden>⭐</span>
              <span dir="ltr" className="tabular-nums">
                {num(user.xp, locale)}
              </span>
            </span>
            {user.streakDays > 0 ? (
              <span className="chip gap-1.5 bg-coral-100 text-coral-700 dark:bg-coral-900/50 dark:text-coral-100">
                <span aria-hidden>🔥</span>
                <span dir="ltr" className="tabular-nums">
                  {num(user.streakDays, locale)}
                </span>
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2">
          <Link href="/books" className="btn btn-ghost whitespace-nowrap text-sm">
            {d.books.navTitle}
          </Link>
        </div>
      </div>

      <details className="border-t border-line px-6 py-3 text-sm">
        <summary className="cursor-pointer font-semibold text-muted">{d.dashboard.changeGrade}</summary>
        <div className="mt-4 w-72 max-w-full pb-2">
          <EnrolmentPicker />
        </div>
      </details>
    </section>
  );
}
