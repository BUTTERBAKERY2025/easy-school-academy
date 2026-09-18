import Link from "next/link";
import { notFound } from "next/navigation";
import { getI18n } from "@/lib/i18n/server";
import { num, t } from "@/lib/i18n/config";
import { catalog, getCurriculum } from "@/lib/content";
import { Chevron, themeClasses } from "@/components/ui";

export function generateStaticParams() {
  return catalog.map((curriculum) => ({ curriculumId: curriculum.id }));
}

export default async function CurriculumPage({ params }: { params: Promise<{ curriculumId: string }> }) {
  const { curriculumId } = await params;
  const curriculum = getCurriculum(curriculumId);
  if (!curriculum) notFound();

  const { locale, d } = await getI18n();
  const theme = themeClasses[curriculum.theme];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <nav className="text-sm text-muted">
        <Link href="/curricula" className="hover:text-body">
          {d.curricula.backToCurricula}
        </Link>
      </nav>

      <header className="mt-4">
        <h1 className="flex items-center gap-3 text-3xl font-extrabold">
          <span aria-hidden>{curriculum.flag}</span>
          {t(curriculum.title, locale)}
        </h1>
        <p className="mt-3 max-w-3xl text-muted">{t(curriculum.description, locale)}</p>
      </header>

      <div className="mt-10 space-y-8">
        {curriculum.stages.map((stage) => (
          <section key={stage.id}>
            <h2 className="text-xl font-bold">{t(stage.title, locale)}</h2>
            <p className="mt-1 text-sm text-muted">{t(stage.description, locale)}</p>

            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stage.grades.map((grade) => (
                <li key={grade.id}>
                  <Link href={`/grade/${grade.id}`} className="card group flex h-full flex-col p-5 transition-transform hover:-translate-y-1">
                    <span className={`chip w-fit ${theme.chip}`}>{grade.ages}</span>
                    <h3 className="mt-3 text-lg font-bold">{t(grade.title, locale)}</h3>
                    <p className="mt-1 text-sm text-muted">
                      {num(grade.subjects.length, locale)} {d.curricula.subjects}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1">
                      {grade.subjects.slice(0, 6).map((subject) => (
                        <li key={subject.id} className="text-xl" title={t(subject.title, locale)} aria-hidden>
                          {subject.glyph}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-auto flex items-center gap-1 pt-4 text-sm font-semibold text-brand-600 dark:text-brand-300">
                      {d.curricula.viewSubjects}
                      <Chevron className="transition-transform group-hover:translate-x-1" />
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
