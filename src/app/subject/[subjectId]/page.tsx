import Link from "next/link";
import { notFound } from "next/navigation";
import { getI18n } from "@/lib/i18n/server";
import { num, t } from "@/lib/i18n/config";
import { getCurriculum, getGrade, getSubject, lessonsOfSubject } from "@/lib/content";
import { getViewer } from "@/lib/auth/current";
import { progressOf } from "@/lib/db/repo";
import { ProgressBar, Ratio, themeClasses } from "@/components/ui";

export default async function SubjectPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = await params;
  const subject = getSubject(subjectId);
  if (!subject) notFound();

  const grade = getGrade(subject.gradeId);
  const curriculum = getCurriculum(subject.curriculumId);
  const { locale, d } = await getI18n();

  const viewer = await getViewer();
  const progress = viewer ? await progressOf(viewer.user.id) : [];
  const byLesson = new Map(progress.map((row) => [row.lessonId, row]));

  const lessons = lessonsOfSubject(subject.id);
  const completed = lessons.filter((lesson) => byLesson.get(lesson.id)?.status === "completed").length;
  const theme = themeClasses[subject.theme];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <Link href="/curricula" className="hover:text-body">
          {d.curricula.backToCurricula}
        </Link>
        {curriculum ? (
          <>
            <span aria-hidden>/</span>
            <Link href={`/curricula/${curriculum.id}`} className="hover:text-body">
              {t(curriculum.title, locale)}
            </Link>
          </>
        ) : null}
        {grade ? (
          <>
            <span aria-hidden>/</span>
            <Link href={`/grade/${grade.id}`} className="hover:text-body">
              {t(grade.title, locale)}
            </Link>
          </>
        ) : null}
      </nav>

      <header className="mt-4 flex items-start gap-4">
        <span className={`grid size-16 shrink-0 place-items-center rounded-3xl text-3xl ${theme.soft}`} aria-hidden>
          {subject.glyph}
        </span>
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold">{t(subject.title, locale)}</h1>
          <p className="mt-2 text-muted">{t(subject.description, locale)}</p>
          <div className="mt-4 flex items-center gap-3">
            <ProgressBar value={lessons.length ? (completed / lessons.length) * 100 : 0} theme={subject.theme} className="max-w-sm" />
            <span className="text-sm text-muted">
              <Ratio done={completed} total={lessons.length} locale={locale} />
            </span>
          </div>
        </div>
      </header>

      <div className="mt-10 space-y-6">
        {subject.units.map((unit) => (
          <section key={unit.id} className="card overflow-hidden">
            <header className={`p-5 ${theme.soft}`}>
              <h2 className="text-lg font-bold">
                {d.curricula.unit} {num(unit.index + 1, locale)}: {t(unit.title, locale)}
              </h2>
              <p className="mt-1 text-sm text-muted">{t(unit.summary, locale)}</p>
            </header>

            <ol className="divide-y divide-line">
              {unit.lessons.map((lesson) => {
                const row = byLesson.get(lesson.id);
                const locked = !lesson.free && !viewer?.hasAccess;

                return (
                  <li key={lesson.id}>
                    <Link href={`/learn/lesson/${lesson.id}`} className="flex items-center gap-4 p-4 transition-colors hover:bg-surface-muted">
                      <span
                        aria-hidden
                        className="grid size-10 shrink-0 place-items-center rounded-2xl bg-surface-muted text-sm font-bold"
                      >
                        {row?.status === "completed" ? "✅" : locked ? "🔒" : lesson.index + 1}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold">{t(lesson.title, locale)}</span>
                        <span className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted">
                          <span>
                            {num(lesson.durationMinutes, locale)} {d.common.minutes}
                          </span>
                          {lesson.free ? <span className="chip bg-mint-100 text-mint-800 dark:bg-mint-900/50 dark:text-mint-100">{d.lesson.freePreview}</span> : null}
                          {lesson.authored ? null : <span className="chip bg-surface-muted text-muted">{d.common.comingSoon}</span>}
                          {row?.status === "completed" ? <span dir="ltr">{num(row.score, locale)}%</span> : null}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
