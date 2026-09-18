import Link from "next/link";
import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/server";
import { num, percent, t } from "@/lib/i18n/config";
import { getGrade, getLesson } from "@/lib/content";
import { requireRole } from "@/lib/auth/current";
import { assignmentsByTeacher, findUserById, studentsInGrades } from "@/lib/db/repo";
import { summariseLearner } from "@/lib/learning/summary";
import { Percent, SectionHeading, Stat } from "@/components/ui";

export const metadata: Metadata = { title: "Teacher dashboard" };

export default async function TeacherPage() {
  const teacher = await requireRole(["teacher", "admin"]);
  const { locale, d } = await getI18n();

  const gradeIds = teacher.teachingGradeIds ?? [];
  const students = await studentsInGrades(gradeIds);
  const assignments = await assignmentsByTeacher(teacher.id);

  const rows = await Promise.all(
    students.map(async (student) => {
      const full = await findUserById(student.id);
      const summary = full ? await summariseLearner(full) : undefined;
      return { student, summary };
    }),
  );

  const averageMastery = rows.length
    ? Math.round(rows.reduce((sum, row) => sum + (row.summary?.averageScore ?? 0), 0) / rows.length)
    : 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeading title={d.teacher.title} body={d.teacher.subtitle} />

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat glyph="🏫" label={d.teacher.classes} value={num(gradeIds.length, locale)} />
        <Stat glyph="🎒" label={d.teacher.students} value={num(students.length, locale)} />
        <Stat glyph="📋" label={d.teacher.assignments} value={num(assignments.length, locale)} />
        <Stat glyph="🎯" label={d.teacher.averageMastery} value={percent(averageMastery, locale)} />
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-bold">{d.teacher.classes}</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {gradeIds.map((gradeId) => {
            const grade = getGrade(gradeId);
            return grade ? (
              <li key={gradeId}>
                <Link href={`/grade/${gradeId}`} className="chip border border-line bg-surface hover:bg-surface-muted">
                  {t(grade.title, locale)}
                </Link>
              </li>
            ) : null;
          })}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">{d.teacher.students}</h2>
        <div className="card mt-4 overflow-x-auto">
          <table className="w-full min-w-xl text-sm">
            <thead className="bg-surface-muted text-start">
              <tr>
                <th className="p-3 text-start">{d.auth.name}</th>
                <th className="p-3 text-start">{d.auth.grade}</th>
                <th className="p-3 text-start">{d.dashboard.lessonsDone}</th>
                <th className="p-3 text-start">{d.dashboard.mastery}</th>
                <th className="p-3 text-start">{d.dashboard.timeSpent}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-muted">
                    {d.dashboard.noProgress}
                  </td>
                </tr>
              ) : (
                rows.map(({ student, summary }) => {
                  const grade = student.gradeId ? getGrade(student.gradeId) : undefined;
                  return (
                    <tr key={student.id}>
                      <td className="p-3 font-semibold">{student.name}</td>
                      <td className="p-3">{grade ? t(grade.title, locale) : "—"}</td>
                      <td className="p-3">{num(summary?.completedCount ?? 0, locale)}</td>
                      <td className="p-3">
                        <Percent value={summary?.averageScore ?? 0} locale={locale} />
                      </td>
                      <td className="p-3">
                        {num(summary?.minutesSpent ?? 0, locale)} {d.common.minutes}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">{d.teacher.assignments}</h2>
        <ul className="mt-4 space-y-3">
          {assignments.length === 0 ? (
            <li className="text-muted">{d.dashboard.noProgress}</li>
          ) : (
            assignments.map((assignment) => {
              const grade = getGrade(assignment.gradeId);
              return (
                <li key={assignment.id} className="card p-4">
                  <p className="font-bold">{grade ? t(grade.title, locale) : assignment.gradeId}</p>
                  <p className="mt-1 text-sm text-muted">
                    {new Date(assignment.dueOn).toLocaleDateString(locale)}
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {assignment.lessonIds.map((lessonId) => {
                      const lesson = getLesson(lessonId);
                      return (
                        <li key={lessonId}>
                          <Link href={`/learn/lesson/${lessonId}`} className="chip border border-line bg-surface-muted">
                            {lesson ? t(lesson.title, locale) : lessonId}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })
          )}
        </ul>
      </section>
    </div>
  );
}
