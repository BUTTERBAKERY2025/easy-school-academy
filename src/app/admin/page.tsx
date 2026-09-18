import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/server";
import { requireRole } from "@/lib/auth/current";
import { allProgress, listActiveSubscriptions, listUsers } from "@/lib/db/repo";
import { catalog, catalogStats } from "@/lib/content";
import { num, t } from "@/lib/i18n/config";
import { getPlan } from "@/lib/billing/plans";
import { ProgressBar, Ratio, SectionHeading, Stat } from "@/components/ui";

export const metadata: Metadata = { title: "Admin" };

export default async function AdminPage() {
  await requireRole(["admin"]);
  const { locale, d } = await getI18n();

  const [users, active, progress] = await Promise.all([listUsers(), listActiveSubscriptions(), allProgress()]);
  const stats = catalogStats();

  const roleLabels: Record<string, string> = {
    student: d.auth.roleStudent,
    parent: d.auth.roleParent,
    teacher: d.auth.roleTeacher,
    admin: d.nav.admin,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeading title={d.admin.title} body={d.admin.subtitle} />

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat glyph="👥" label={d.admin.users} value={num(users.length, locale)} />
        <Stat glyph="💳" label={d.admin.activeSubs} value={num(active.length, locale)} />
        <Stat glyph="📚" label={d.curricula.lessons} value={num(stats.lessons, locale)} />
        <Stat glyph="✅" label={d.dashboard.lessonsDone} value={num(progress.filter((row) => row.status === "completed").length, locale)} />
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-bold">{d.admin.contentCoverage}</h2>
        <div className="card mt-4 p-6">
          <div className="flex items-center justify-between text-sm">
            <span>{d.admin.authoredLessons}</span>
            <span className="font-bold">
              <Ratio done={stats.authoredLessons} total={stats.lessons} locale={locale} />
            </span>
          </div>
          <ProgressBar value={(stats.authoredLessons / stats.lessons) * 100} className="mt-2" />

          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {catalog.map((curriculum) => {
              const grades = curriculum.stages.reduce((total, stage) => total + stage.grades.length, 0);
              const subjects = curriculum.stages.reduce(
                (total, stage) => total + stage.grades.reduce((inner, grade) => inner + grade.subjects.length, 0),
                0,
              );
              return (
                <li key={curriculum.id} className="rounded-3xl border border-line bg-surface-muted p-4">
                  <p className="font-bold">
                    {curriculum.flag} {t(curriculum.title, locale)}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {num(grades, locale)} {d.curricula.grades} · {num(subjects, locale)} {d.curricula.subjects}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">{d.admin.recentUsers}</h2>
        <div className="card mt-4 overflow-x-auto">
          <table className="w-full min-w-xl text-sm">
            <thead className="bg-surface-muted">
              <tr>
                <th className="p-3 text-start">{d.auth.name}</th>
                <th className="p-3 text-start">{d.auth.email}</th>
                <th className="p-3 text-start">{d.admin.role}</th>
                <th className="p-3 text-start">{d.parent.subscription}</th>
                <th className="p-3 text-start">{d.admin.joined}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[...users]
                .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                .map((user) => {
                  const subscription = active.find((row) => row.userId === user.id);
                  const plan = subscription ? getPlan(subscription.planId) : undefined;
                  return (
                    <tr key={user.id}>
                      <td className="p-3 font-semibold">{user.name}</td>
                      <td className="p-3" dir="ltr">
                        {user.email}
                      </td>
                      <td className="p-3">{roleLabels[user.role] ?? user.role}</td>
                      <td className="p-3">{plan ? t(plan.title, locale) : "—"}</td>
                      <td className="p-3">{new Date(user.createdAt).toLocaleDateString(locale)}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
