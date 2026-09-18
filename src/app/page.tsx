import Link from "next/link";
import { getI18n } from "@/lib/i18n/server";
import { num, t } from "@/lib/i18n/config";
import { catalog, catalogStats } from "@/lib/content";
import { plans, currency } from "@/lib/billing/plans";
import { Chevron, SectionHeading, themeClasses } from "@/components/ui";

export default async function HomePage() {
  const { locale, d } = await getI18n();
  const stats = catalogStats();

  const features = [
    { glyph: "📖", title: d.features.textbookTitle, body: d.features.textbookBody },
    { glyph: "🕹️", title: d.features.interactiveTitle, body: d.features.interactiveBody },
    { glyph: "🌍", title: d.features.bilingualTitle, body: d.features.bilingualBody },
    { glyph: "🎯", title: d.features.masteryTitle, body: d.features.masteryBody },
    { glyph: "👨‍👩‍👧", title: d.features.parentTitle, body: d.features.parentBody },
    { glyph: "🗓️", title: d.features.pacingTitle, body: d.features.pacingBody },
  ];

  const steps = [
    { title: d.how.step1Title, body: d.how.step1Body },
    { title: d.how.step2Title, body: d.how.step2Body },
    { title: d.how.step3Title, body: d.how.step3Body },
    { title: d.how.step4Title, body: d.how.step4Body },
  ];

  const faqs =
    locale === "ar"
      ? [
          { q: "هل المحتوى مطابق لمنهج مدرسة ابني؟", a: "الوحدات والدروس مبنية على النطاق والتسلسل الرسمي لكل منهج، فتجد أسماء الصفوف والمواد والوحدات كما هي في المدرسة، وتقدر تتابع درسًا بدرس." },
          { q: "هل يحتاج الطفل لمساعدتي أثناء الدرس؟", a: "الدرس مصمم ليعمل عليه الطالب وحده: شرح مبسّط، ثم مثال محلول، ثم نشاط، ثم تمرين يُصحَّح فورًا مع تفسير الإجابة." },
          { q: "ماذا لو كان ابني في صف ومستواه في مادة أقل؟", a: "تقدر تفتح أي صف في أي مادة، فالمنصة لا تقيّدك بصف واحد، ويستطيع الطالب مراجعة صف سابق أو التقدم لصف أعلى." },
          { q: "هل أستطيع التجربة قبل الاشتراك؟", a: "نعم. أول درس في كل مادة مجاني بالكامل بكل أنشطته، ولا يحتاج بطاقة." },
        ]
      : [
          { q: "Does this match my child's school curriculum?", a: "Units and lessons follow the official scope and sequence of each curriculum, using the same grade, subject and unit names, so a student can follow along lesson by lesson." },
          { q: "Does my child need my help during a lesson?", a: "Lessons are built for the student to work alone: a simple explanation, a worked example, an activity, then practice graded instantly with an explanation." },
          { q: "What if my child is behind in one subject?", a: "You can open any grade in any subject. Nothing locks a student to a single year, so they can revise a lower grade or move ahead." },
          { q: "Can I try before subscribing?", a: "Yes. The first lesson of every subject is completely free, with all of its activities, and needs no card." },
        ];

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_0%,var(--color-brand-100),transparent),radial-gradient(50%_50%_at_10%_20%,var(--color-sun-100),transparent)] opacity-70 dark:opacity-20"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="chip bg-sun-100 text-sun-800 dark:bg-sun-900/50 dark:text-sun-100">
              ✨ {d.home.eyebrow}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-5xl">{d.home.heroTitle}</h1>
            <p className="mt-5 text-lg text-muted">{d.home.heroBody}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/register" className="btn btn-primary px-6 py-3 text-base">
                {d.home.ctaPrimary}
                <Chevron />
              </Link>
              <Link href="/curricula" className="btn btn-ghost px-6 py-3 text-base">
                {d.home.ctaSecondary}
              </Link>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
              <div>
                <dt className="text-xs text-muted">{d.home.statLessons}</dt>
                <dd className="text-2xl font-extrabold">{num(stats.lessons, locale)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">{d.home.statSubjects}</dt>
                <dd className="text-2xl font-extrabold">{num(stats.subjects, locale)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">{d.home.statGrades}</dt>
                <dd className="text-2xl font-extrabold">{num(stats.grades, locale)}</dd>
              </div>
            </dl>
          </div>

          <div className="card p-6">
            <p className="text-sm font-semibold text-muted">{d.dashboard.todaysPlan}</p>
            <ul className="mt-4 space-y-3">
              {[
                { glyph: "📐", title: locale === "ar" ? "الرياضيات — جمع الكسور المتشابهة" : "Maths — adding like fractions", meta: "22 " + d.common.minutes, done: true },
                { glyph: "🔬", title: locale === "ar" ? "العلوم — الخلية وعضياتها" : "Science — cells and organelles", meta: "26 " + d.common.minutes, done: false },
                { glyph: "✒️", title: locale === "ar" ? "لغتي — أنواع النصوص" : "Arabic — text types", meta: "20 " + d.common.minutes, done: false },
              ].map((item) => (
                <li key={item.title} className="flex items-center gap-3 rounded-2xl border border-line bg-surface-muted p-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-surface text-xl" aria-hidden>
                    {item.glyph}
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold">{item.title}</span>
                    <span className="block text-xs text-muted">{item.meta}</span>
                  </span>
                  <span aria-hidden className="text-lg">
                    {item.done ? "✅" : "▶️"}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-between rounded-2xl bg-brand-600 p-4 text-white">
              <span className="text-sm">🔥 5 {d.dashboard.streak}</span>
              <span className="text-sm font-bold">420 XP</span>
            </div>
          </div>
        </div>
      </section>

      {/* curricula */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading title={d.home.curriculaTitle} body={d.home.curriculaBody} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {catalog.map((curriculum) => {
            const gradeCount = curriculum.stages.reduce((total, stage) => total + stage.grades.length, 0);
            return (
              <Link
                key={curriculum.id}
                href={`/curricula/${curriculum.id}`}
                className="card group p-6 transition-transform hover:-translate-y-1"
              >
                <span className="text-4xl" aria-hidden>
                  {curriculum.flag}
                </span>
                <h3 className="mt-3 text-xl font-bold">{t(curriculum.title, locale)}</h3>
                <p className="mt-2 text-sm text-muted">{t(curriculum.description, locale)}</p>
                <ul className="mt-4 space-y-1.5 text-sm">
                  {curriculum.highlights.map((highlight, index) => (
                    <li key={index} className="flex gap-2">
                      <span aria-hidden className={themeClasses[curriculum.theme].chip + " chip"}>
                        ✓
                      </span>
                      <span>{t(highlight, locale)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-300">
                  {num(gradeCount, locale)} {d.curricula.grades}
                  <Chevron className="transition-transform group-hover:translate-x-1" />
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* features */}
      <section className="border-y border-line bg-surface-muted">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <SectionHeading title={d.home.featuresTitle} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="card p-6">
                <span className="text-3xl" aria-hidden>
                  {feature.glyph}
                </span>
                <h3 className="mt-3 text-lg font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* how it works */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading title={d.home.howTitle} />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="card p-6">
              <span className="grid size-10 place-items-center rounded-2xl bg-brand-600 text-lg font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-3 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* plans */}
      <section className="border-y border-line bg-surface-muted">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <SectionHeading title={d.home.plansTitle} body={d.pricing.subtitle} />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <article key={plan.id} className={`card p-6 ${plan.popular ? "ring-2 ring-brand-400" : ""}`}>
                {plan.popular ? <span className="chip bg-brand-600 text-white">{d.pricing.popular}</span> : null}
                <h3 className="mt-2 text-xl font-bold">{t(plan.title, locale)}</h3>
                <p className="text-sm text-muted">{t(plan.tagline, locale)}</p>
                <p className="mt-4 text-3xl font-extrabold">
                  {plan.monthly}
                  <span className="text-base font-medium text-muted">
                    {" "}
                    {t(currency, locale)} {d.pricing.perMonth}
                  </span>
                </p>
                <Link href="/pricing" className="btn btn-primary mt-5 w-full">
                  {d.pricing.choose}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* faq */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <SectionHeading title={d.home.faqTitle} />
        <div className="mt-8 space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="card p-5">
              <summary className="cursor-pointer font-bold">{faq.q}</summary>
              <p className="mt-3 text-muted">{faq.a}</p>
            </details>
          ))}
        </div>

        <div className="card mt-12 bg-brand-600 p-8 text-center text-white">
          <h2 className="text-2xl font-bold">{d.home.ctaPrimary}</h2>
          <p className="mt-2 text-brand-100">{d.pricing.guarantee}</p>
          <Link href="/register" className="btn btn-sun mt-6 px-6 py-3 text-base">
            {d.nav.register}
          </Link>
        </div>
      </section>
    </>
  );
}
