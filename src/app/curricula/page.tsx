import Link from "next/link";
import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/server";
import { t } from "@/lib/i18n/config";
import { catalog } from "@/lib/content";
import { Chevron, SectionHeading } from "@/components/ui";

export const metadata: Metadata = { title: "Curricula" };

export default async function CurriculaPage() {
  const { locale, d } = await getI18n();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeading title={d.curricula.title} body={d.curricula.subtitle} />

      <div className="mt-10 space-y-6">
        {catalog.map((curriculum) => (
          <section key={curriculum.id} className="card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="flex items-center gap-3 text-2xl font-bold">
                  <span aria-hidden>{curriculum.flag}</span>
                  {t(curriculum.title, locale)}
                </h2>
                <p className="mt-2 max-w-2xl text-muted">{t(curriculum.description, locale)}</p>
              </div>
              <Link href={`/curricula/${curriculum.id}`} className="btn btn-primary">
                {d.curricula.selectGrade}
                <Chevron />
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {curriculum.stages.map((stage) => (
                <div key={stage.id} className="rounded-3xl border border-line bg-surface-muted p-4">
                  <h3 className="font-bold">{t(stage.title, locale)}</h3>
                  <p className="mt-1 text-xs text-muted">{t(stage.description, locale)}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {stage.grades.map((grade) => (
                      <li key={grade.id}>
                        <Link
                          href={`/grade/${grade.id}`}
                          className="chip border border-line bg-surface hover:bg-brand-50 dark:hover:bg-brand-900/30"
                        >
                          {t(grade.shortTitle, locale)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
