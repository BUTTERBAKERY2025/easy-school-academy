import Link from "next/link";
import Image from "next/image";
import { getI18n } from "@/lib/i18n/server";
import { num, t, type Locale } from "@/lib/i18n/config";
import { catalog, catalogStats, gradesOf } from "@/lib/content";
import { plans, currency } from "@/lib/billing/plans";
import { Chevron } from "@/components/ui";
import { Avatar, type CastMember } from "@/components/art/avatar";
import { HeroScene, StepScene, WaveDivider, type StepTint } from "@/components/art/scenes";
import { Icon, type IconTint } from "@/components/art/icons";

/** Age bands map a parent's "how old is my child" to a grade in each curriculum. */
const AGE_STEPS: { age: string; ordinal: number; face: CastMember }[] = [
  { age: "4-6", ordinal: 0, face: "khaled" },
  { age: "6-8", ordinal: 1, face: "sara" },
  { age: "8-10", ordinal: 3, face: "layla" },
  { age: "10-12", ordinal: 5, face: "omar" },
  { age: "12-15", ordinal: 7, face: "youssef" },
];

export default async function HomePage() {
  const { locale, d } = await getI18n();
  const stats = catalogStats();

  const heroWords = splitHighlight(d.home.heroTitle, d.home.heroHighlight);

  return (
    <>
      <Hero locale={locale} d={d} heroWords={heroWords} stats={stats} />
      <TrustStrip d={d} locale={locale} stats={stats} />
      <Curricula locale={locale} d={d} />
      <HowItWorks d={d} />
      <InsideLesson d={d} />
      <Ages locale={locale} d={d} />
      <WhyUs d={d} />
      <Teachers d={d} />
      <Voices d={d} />
      <Plans locale={locale} d={d} />
      <Faq d={d} />
      <FinalCta d={d} />
      <StickyCta d={d} />
    </>
  );
}

type Dict = Awaited<ReturnType<typeof getI18n>>["d"];
type Stats = ReturnType<typeof catalogStats>;

/* --------------------------------------------------------------------- hero */

function Hero({
  locale,
  d,
  heroWords,
  stats,
}: {
  locale: Locale;
  d: Dict;
  heroWords: [string, string, string];
  stats: Stats;
}) {
  const [before, highlight, after] = heroWords;

  return (
    <section className="relative overflow-hidden bg-surface-warm">
      <span aria-hidden className="blob -start-24 -top-28 size-80 bg-brand-200/50" />
      <span aria-hidden className="blob -end-20 top-40 size-72 bg-sun-200/50" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pb-20 lg:pt-16">
        <div className="text-center lg:text-start">
          <span className="chip bg-mint-100 px-4 py-1.5 text-mint-800 dark:bg-mint-900/50 dark:text-mint-100">
            <Icon name="gift" tint="mint" tile={false} className="size-4" />
            {d.home.badge}
          </span>

          <h1 className="mt-5 text-4xl leading-[1.15] font-extrabold sm:text-5xl lg:text-6xl">
            {before}
            <span className="relative whitespace-nowrap text-brand-600 dark:text-brand-300">
              {highlight}
              <svg
                aria-hidden
                viewBox="0 0 200 14"
                preserveAspectRatio="none"
                className="absolute inset-x-0 -bottom-1 h-3 w-full text-sun-300"
              >
                <path d="M2 9c48-7 128-9 196-4" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
              </svg>
            </span>
            {after}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-muted lg:mx-0">{d.home.heroBody}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link href="/register" className="btn btn-coral px-7 py-3.5 text-base">
              {d.home.ctaPrimary}
              <Chevron />
            </Link>
            <Link href="/curricula" className="btn btn-ghost px-7 py-3.5 text-base">
              {d.home.ctaSecondary}
            </Link>
          </div>

          <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-muted lg:justify-start">
            {[d.home.trustAges, d.home.trustSelf, d.home.trustBilingual].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <span aria-hidden className="text-mint-500">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <HeroScene />
          <div className="card absolute -bottom-2 start-0 flex items-center gap-2.5 px-4 py-2.5 sm:start-4">
            <Icon name="streak" tint="coral" tile={false} className="size-7 shrink-0" />
            <span className="text-sm leading-tight">
              <span className="block font-extrabold">{num(stats.lessons, locale)}</span>
              <span className="block text-xs text-muted">{d.home.statLessons}</span>
            </span>
          </div>
        </div>
      </div>

      <WaveDivider className="text-surface" />
    </section>
  );
}

/* -------------------------------------------------------------- trust strip */

function TrustStrip({ d, locale, stats }: { d: Dict; locale: Locale; stats: Stats }) {
  const items: { value: number; label: string; icon: "curricula" | "grades" | "subjects" | "lessons"; tint: IconTint }[] = [
    { value: stats.curricula, label: d.home.statCurricula, icon: "curricula", tint: "sky" },
    { value: stats.grades, label: d.home.statGrades, icon: "grades", tint: "coral" },
    { value: stats.subjects, label: d.home.statSubjects, icon: "subjects", tint: "brand" },
    { value: stats.lessons, label: d.home.statLessons, icon: "lessons", tint: "sun" },
  ];

  return (
    <section className="border-y border-line bg-surface">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <dt className="sr-only">{item.label}</dt>
            <dd>
              <Icon name={item.icon} tint={item.tint} className="mx-auto size-11" />
              <span className="mt-2 block font-display text-3xl font-extrabold">{num(item.value, locale)}</span>
              <span className="block text-sm text-muted">{item.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ---------------------------------------------------------------- curricula */

function Curricula({ locale, d }: { locale: Locale; d: Dict }) {
  const tints = ["bg-brand-50 dark:bg-brand-900/25", "bg-sun-50 dark:bg-sun-900/25", "bg-mint-50 dark:bg-mint-900/25"];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
      <SectionHead title={d.home.curriculaTitle} body={d.home.curriculaBody} />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {catalog.map((curriculum, index) => {
          const grades = gradesOf(curriculum.id);
          return (
            <Link
              key={curriculum.id}
              href={`/curricula/${curriculum.id}`}
              className="card group relative overflow-hidden p-7 transition-transform hover:-translate-y-1.5"
            >
              <span aria-hidden className={`absolute -end-8 -top-8 size-28 rounded-full ${tints[index % tints.length]}`} />
              <span className="relative text-5xl">{curriculum.flag}</span>
              <h3 className="relative mt-4 text-xl">{t(curriculum.title, locale)}</h3>
              <p className="relative mt-2 text-sm text-muted">{t(curriculum.origin, locale)}</p>

              <ul className="relative mt-5 flex flex-wrap gap-1.5">
                {grades.slice(0, 6).map((grade) => (
                  <li key={grade.id} className="chip border border-line bg-surface text-xs">
                    {t(grade.shortTitle, locale)}
                  </li>
                ))}
                {grades.length > 6 ? (
                  <li dir="ltr" className="chip bg-surface-muted text-xs text-muted">
                    +{num(grades.length - 6, locale)}
                  </li>
                ) : null}
              </ul>

              <p className="relative mt-6 flex items-center gap-1 font-bold text-brand-600 dark:text-brand-300">
                {d.home.curriculaOpen}
                <Chevron className="transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- how it works */

function HowItWorks({ d }: { d: Dict }) {
  const steps: { title: string; body: string; scene: 1 | 2 | 3 | 4; tint: StepTint }[] = [
    { title: d.how.step1Title, body: d.how.step1Body, scene: 1, tint: "brand" },
    { title: d.how.step2Title, body: d.how.step2Body, scene: 2, tint: "sun" },
    { title: d.how.step3Title, body: d.how.step3Body, scene: 3, tint: "mint" },
    { title: d.how.step4Title, body: d.how.step4Body, scene: 4, tint: "sky" },
  ];

  return (
    <section className="bg-surface-muted pt-16 lg:pt-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead title={d.home.howTitle} body={d.home.howBody} />

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="card relative p-6 pt-12">
              <span className="absolute -top-8 start-6">
                <StepScene step={step.scene} tint={step.tint} />
              </span>
              <span className="font-display text-sm font-extrabold text-muted">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-1 text-lg">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <WaveDivider className="mt-16 text-surface" />
    </section>
  );
}

/* ----------------------------------------------------------- inside a lesson */

function InsideLesson({ d }: { d: Dict }) {
  const kinds: { name: "mcq" | "multi" | "truefalse" | "fill" | "match" | "order" | "sort"; label: string; tint: IconTint }[] = [
    { name: "mcq", label: d.questionKinds.mcq, tint: "brand" },
    { name: "multi", label: d.questionKinds.multi, tint: "mint" },
    { name: "truefalse", label: d.questionKinds.truefalse, tint: "sky" },
    { name: "fill", label: d.questionKinds.fill, tint: "coral" },
    { name: "match", label: d.questionKinds.match, tint: "sun" },
    { name: "order", label: d.questionKinds.order, tint: "berry" },
    { name: "sort", label: d.questionKinds.sort, tint: "brand" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="text-3xl sm:text-4xl">{d.home.insideTitle}</h2>
          <p className="mt-4 text-lg text-muted">{d.home.insideBody}</p>
          <Link href="/how-it-works" className="btn btn-primary mt-7 px-6 py-3">
            {d.home.insideCta}
            <Chevron />
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          {kinds.map((kind) => (
            <li
              key={kind.name}
              className="card flex flex-col items-center gap-2 px-3 py-5 text-center text-sm font-semibold"
            >
              <Icon name={kind.name} tint={kind.tint} className="size-11" />
              {kind.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- age strip */

function Ages({ locale, d }: { locale: Locale; d: Dict }) {
  const saudi = gradesOf("saudi");

  return (
    <section className="bg-surface-warm pt-16 lg:pt-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead title={d.home.agesTitle} body={d.home.agesBody} />

        <ul className="mt-10 flex flex-wrap justify-center gap-4">
          {AGE_STEPS.map((step) => {
            const grade = saudi.find((candidate) => candidate.ordinal === step.ordinal);
            if (!grade) return null;
            return (
              <li key={step.age}>
                <Link
                  href={`/grade/${grade.id}`}
                  className="card flex w-36 flex-col items-center gap-1 px-4 py-6 transition-transform hover:-translate-y-1"
                >
                  <Avatar person={step.face} className="size-20" />
                  <span className="mt-1 font-display text-xl font-extrabold" dir="ltr">
                    {num(Number(step.age.split("-")[0]), locale)}–{num(Number(step.age.split("-")[1]), locale)}
                  </span>
                  <span className="text-xs text-muted">{t(grade.shortTitle, locale)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <WaveDivider className="mt-16 text-surface" />
    </section>
  );
}

/* --------------------------------------------------------------------- why */

function WhyUs({ d }: { d: Dict }) {
  const features: { icon: string; tile: string; title: string; body: string }[] = [
    { icon: "folder", tile: "bg-coral-100 dark:bg-coral-400/20", title: d.features.textbookTitle, body: d.features.textbookBody },
    { icon: "gamepad", tile: "bg-brand-100 dark:bg-brand-400/25", title: d.features.interactiveTitle, body: d.features.interactiveBody },
    { icon: "globe", tile: "bg-mint-100 dark:bg-mint-400/20", title: d.features.bilingualTitle, body: d.features.bilingualBody },
    { icon: "check", tile: "bg-mint-100 dark:bg-mint-400/20", title: d.features.masteryTitle, body: d.features.masteryBody },
    { icon: "badge", tile: "bg-sun-100 dark:bg-sun-400/20", title: d.features.parentTitle, body: d.features.parentBody },
    { icon: "certificate", tile: "bg-sun-100 dark:bg-sun-400/20", title: d.features.pacingTitle, body: d.features.pacingBody },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
      <SectionHead title={d.home.whyTitle} />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.title} className="rounded-4xl border border-line bg-surface p-6">
            <Image
              src={`/images/icons/${feature.icon}.png`}
              alt=""
              width={160}
              height={160}
              /* The artwork is 160px wide; asking the optimiser for a width
                 above that drops its alpha channel and the icon comes back on
                 an opaque white card. Pinning the display size keeps every
                 requested width inside the source. */
              sizes="56px"
              className={`size-14 rounded-2xl p-2 ${feature.tile}`}
            />
            <h3 className="mt-3 text-lg">{feature.title}</h3>
            <p className="mt-2 text-sm text-muted">{feature.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- teachers */

function Teachers({ d }: { d: Dict }) {
  const subjects: { face?: CastMember; photo?: string; subject: string; curriculum: string }[] = [
    { face: "ustadha", subject: d.teachers.mathsScience, curriculum: d.teachers.saudiCurriculum },
    { face: "ustath", subject: d.teachers.arabicIslamic, curriculum: d.teachers.saudiCurriculum },
    { photo: "/images/teacher.jpg", subject: d.teachers.ela, curriculum: d.teachers.angloCurriculum },
  ];

  return (
    <section className="bg-surface-warm pt-16 lg:pt-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead title={d.home.teachersTitle} body={d.home.teachersBody} />

        <div className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
          {subjects.map((member) => (
            <article key={member.subject} className="card flex flex-col items-center justify-center p-7 text-center">
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt=""
                  width={640}
                  height={953}
                  sizes="112px"
                  className="size-28 rounded-full object-cover object-top"
                />
              ) : (
                <Avatar person={member.face!} className="size-28" />
              )}
              <p className="mt-4 font-display text-lg font-bold">{member.subject}</p>
              <p className="mt-1 text-sm text-muted">{member.curriculum}</p>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-muted">{d.home.teachersNote}</p>
      </div>

      <WaveDivider className="mt-16 text-surface-muted" />
    </section>
  );
}

/* ------------------------------------------------------------------ voices */

function Voices({ d }: { d: Dict }) {
  const voices: { quote: string; who: string; face: CastMember }[] = [
    { quote: d.voices.quote1, who: d.voices.who1, face: "maryam" },
    { quote: d.voices.quote2, who: d.voices.who2, face: "ustath" },
    { quote: d.voices.quote3, who: d.voices.who3, face: "missEmma" },
  ];

  return (
    <section className="bg-surface-muted py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead title={d.home.voicesTitle} body={d.home.voicesBody} />

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {voices.map((voice) => (
            <li key={voice.who} className="card relative p-6">
              <span className="chip absolute end-5 top-5 bg-surface-muted text-[11px] text-muted">
                {d.home.voicesPlaceholder}
              </span>
              <Avatar person={voice.face} className="size-14" />
              <p className="mt-3 text-lg leading-relaxed">“{voice.quote}”</p>
              <p className="mt-3 text-sm text-muted">{voice.who}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- plans */

function Plans({ locale, d }: { locale: Locale; d: Dict }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
      <SectionHead title={d.home.plansTitle} body={d.home.plansBody} />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.id}
            className={`card flex flex-col p-7 ${plan.popular ? "ring-2 ring-brand-400" : ""}`}
          >
            {plan.popular ? <span className="chip w-fit bg-brand-600 text-white">{d.pricing.popular}</span> : null}
            <h3 className="mt-2 text-xl">{t(plan.title, locale)}</h3>
            <p className="mt-1 text-sm text-muted">{t(plan.tagline, locale)}</p>
            <p className="mt-5 font-display text-4xl font-extrabold">
              {num(plan.monthly, locale)}
              <span className="font-sans text-base font-medium text-muted">
                {" "}
                {t(currency, locale)} {d.pricing.perMonth}
              </span>
            </p>
            <Link
              href="/pricing"
              className={`btn mt-6 w-full ${plan.popular ? "btn-coral" : "btn-ghost"}`}
            >
              {d.pricing.choose}
            </Link>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center">
        <Link href="/pricing" className="font-bold text-brand-600 underline dark:text-brand-300">
          {d.home.plansCta}
        </Link>
      </p>
    </section>
  );
}

/* --------------------------------------------------------------------- faq */

function Faq({ d }: { d: Dict }) {
  const faqs = [
    { q: d.faq.q1, a: d.faq.a1 },
    { q: d.faq.q2, a: d.faq.a2 },
    { q: d.faq.q3, a: d.faq.a3 },
    { q: d.faq.q4, a: d.faq.a4 },
    { q: d.faq.q5, a: d.faq.a5 },
  ];

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 lg:py-20">
      <SectionHead title={d.home.faqTitle} />

      <div className="mt-8 space-y-3">
        {faqs.map((faq) => (
          <details key={faq.q} className="card group p-5 open:bg-surface-muted">
            <summary className="flex cursor-pointer items-center justify-between gap-3 font-bold marker:content-['']">
              {faq.q}
              <span aria-hidden className="shrink-0 text-xl text-brand-500 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-muted">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- final cta */

function FinalCta({ d }: { d: Dict }) {
  return (
    <section className="px-4 pb-20 lg:pb-24">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-5xl bg-brand-600 px-6 py-14 text-center text-white">
        <span aria-hidden className="blob -start-10 -top-10 size-52 bg-brand-400/50" />
        <span aria-hidden className="blob -end-8 -bottom-12 size-56 bg-sun-400/30" />

        <div className="relative">
          <h2 className="text-3xl sm:text-4xl">{d.home.finalTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-100">{d.home.finalBody}</p>
          <Link href="/register" className="btn btn-sun mt-8 px-8 py-4 text-base">
            {d.home.ctaPrimary}
            <Chevron />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- sticky cta */

function StickyCta({ d }: { d: Dict }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 p-3 sm:hidden">
      <Link
        href="/register"
        className="btn btn-coral pointer-events-auto w-full py-3.5 text-base shadow-lg"
      >
        {d.home.stickyCta}
        <Chevron />
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ shared */

function SectionHead({ title, body }: { title: string; body?: string }) {
  return (
    <header className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl sm:text-4xl">{title}</h2>
      {body ? <p className="mt-4 text-lg text-muted">{body}</p> : null}
    </header>
  );
}

/**
 * Splits the headline around its highlighted phrase so the underline decoration
 * can wrap only that phrase, in whichever language is showing.
 */
function splitHighlight(title: string, highlight: string): [string, string, string] {
  const at = title.lastIndexOf(highlight);
  if (at === -1) return ["", title, ""];
  return [title.slice(0, at), highlight, title.slice(at + highlight.length)];
}
