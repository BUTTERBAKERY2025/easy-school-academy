import Link from "next/link";
import { SubjectIcon } from "@/components/art/icons";
import { notFound } from "next/navigation";
import { getI18n } from "@/lib/i18n/server";
import { num, t } from "@/lib/i18n/config";
import { getCurriculum, getGrade, lessonsOfSubject } from "@/lib/content";
import { getCurrentUser } from "@/lib/auth/current";
import { progressOf } from "@/lib/db/repo";
import { Chevron, ProgressBar, themeClasses } from "@/components/ui";

export default async function GradePage({ params }: { params: Promise<{ gradeId: string }> }) {
  const { gradeId } = await params;
  const grade = getGrade(gradeId);
  if (!grade) notFound();

  const curriculum = getCurriculum(grade.curriculumId);
  const { locale, d } = await getI18n();

  const user = await getCurrentUser();
  const progress = user ? await progressOf(user.id) : [];
  const completedIds = new Set(progress.filter((row) => row.status === "completed").map((row) => row.lessonId));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <Link href="/curricula" className="hover:text-body">
          {d.curricula.backToCurricula}
        </Link>
        <span aria-hidden>/</span>
        {curriculum ? (
          <Link href={`/curricula/${curriculum.id}`} className="hover:text-body">
            {t(curriculum.title, locale)}
          </Link>
        ) : null}
      </nav>

      <header className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">{t(grade.title, locale)}</h1>
          <p className="mt-2 text-muted">
            {grade.ages} · {num(grade.subjects.length, locale)} {d.curricula.subjects}
          </p>
        </div>
      </header>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {grade.subjects.map((subject) => {
          const lessons = lessonsOfSubject(subject.id);
          const done = lessons.filter((lesson) => completedIds.has(lesson.id)).length;
          const theme = themeClasses[subject.theme];

          return (
            <li key={subject.id}>
              <Link href={`/subject/${subject.id}`} className="card group flex h-full flex-col p-5 transition-transform hover:-translate-y-1">
                <span className={`grid size-12 place-items-center rounded-2xl ${theme.soft}`} aria-hidden>
                  <SubjectIcon glyph={subject.glyph} theme={subject.theme} className="size-7" />
                </span>
                <h2 className="mt-3 text-lg font-bold">{t(subject.title, locale)}</h2>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{t(subject.description, locale)}</p>

                <p className="mt-4 text-xs text-muted">
                  {num(subject.units.length, locale)} {d.curricula.units} · {num(lessons.length, locale)}{" "}
                  {d.curricula.lessons}
                </p>
                <div className="mt-2">
                  <ProgressBar value={lessons.length ? (done / lessons.length) * 100 : 0} theme={subject.theme} />
                </div>

                <p className="mt-auto flex items-center gap-1 pt-4 text-sm font-semibold text-brand-600 dark:text-brand-300">
                  {d.common.open}
                  <Chevron className="transition-transform group-hover:translate-x-1" />
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
