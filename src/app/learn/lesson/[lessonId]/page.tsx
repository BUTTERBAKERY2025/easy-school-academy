import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/server";
import { num, t } from "@/lib/i18n/config";
import { getGrade, getLesson, getSubject, getUnit, nextLesson } from "@/lib/content";
import { getViewer } from "@/lib/auth/current";
import { progressForLesson } from "@/lib/db/repo";
import { LessonPlayer } from "@/components/lesson-player";
import { themeClasses } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ lessonId: string }> }): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = getLesson(lessonId);
  return { title: lesson ? `${lesson.title.ar} · ${lesson.title.en}` : "Lesson" };
}

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const lesson = getLesson(lessonId);
  if (!lesson) notFound();

  const subject = getSubject(lesson.subjectId);
  const unit = getUnit(lesson.unitId);
  const grade = getGrade(lesson.gradeId);
  const { locale, d } = await getI18n();

  const viewer = await getViewer();
  const locked = !lesson.free && !viewer?.hasAccess;
  const saved = viewer ? await progressForLesson(viewer.user.id, lesson.id) : undefined;
  const theme = themeClasses[subject?.theme ?? "brand"];
  const following = nextLesson(lesson.id);
  const subjectHref = `/subject/${lesson.subjectId}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-muted">
        {grade ? (
          <Link href={`/grade/${grade.id}`} className="hover:text-body">
            {t(grade.title, locale)}
          </Link>
        ) : null}
        {subject ? (
          <>
            <span aria-hidden>/</span>
            <Link href={subjectHref} className="hover:text-body">
              {t(subject.title, locale)}
            </Link>
          </>
        ) : null}
      </nav>

      <header className="mt-4">
        {unit ? (
          <span className={`chip ${theme.chip}`}>
            {d.curricula.unit} {num(unit.index + 1, locale)}: {t(unit.title, locale)}
          </span>
        ) : null}
        <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl">{t(lesson.title, locale)}</h1>
        <p className="mt-2 text-muted">{t(lesson.summary, locale)}</p>
        <p className="mt-2 text-sm text-muted">
          ⏱️ {num(lesson.durationMinutes, locale)} {d.common.minutes}
          {lesson.free ? ` · ${d.lesson.freePreview}` : ""}
        </p>
      </header>

      <section className="card mt-6 p-5">
        <h2 className="text-sm font-bold text-muted">{d.lesson.objectives}</h2>
        <ul className="mt-3 space-y-1.5">
          {lesson.objectives.map((objective, index) => (
            <li key={index} className="flex gap-2 text-sm">
              <span aria-hidden>🎯</span>
              <span>{t(objective, locale)}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8">
        {locked ? (
          <div className="card p-8 text-center">
            <p className="text-4xl" aria-hidden>
              🔒
            </p>
            <h2 className="mt-3 text-xl font-bold">{d.lesson.locked}</h2>
            <p className="mt-2 text-muted">{d.lesson.lockedBody}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/pricing" className="btn btn-primary">
                {d.pricing.choose}
              </Link>
              <Link href={subjectHref} className="btn btn-ghost">
                {d.lesson.backToSubject}
              </Link>
            </div>
          </div>
        ) : (
          <LessonPlayer
            lesson={lesson}
            locale={locale}
            startIndex={saved?.status === "in_progress" ? saved.stepIndex : 0}
            canSave={Boolean(viewer)}
            nextHref={following ? `/learn/lesson/${following.id}` : undefined}
            subjectHref={subjectHref}
          />
        )}
      </div>
    </div>
  );
}
