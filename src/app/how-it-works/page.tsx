import Link from "next/link";
import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/server";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = { title: "How it works" };

export default async function HowItWorksPage() {
  const { locale, d } = await getI18n();

  const steps = [
    { glyph: "1️⃣", title: d.how.step1Title, body: d.how.step1Body },
    { glyph: "2️⃣", title: d.how.step2Title, body: d.how.step2Body },
    { glyph: "3️⃣", title: d.how.step3Title, body: d.how.step3Body },
    { glyph: "4️⃣", title: d.how.step4Title, body: d.how.step4Body },
  ];

  const blockTypes =
    locale === "ar"
      ? [
          { glyph: "📖", title: "شرح مبسّط", body: "فكرة الدرس بلغة يفهمها الطالب، مع رسم توضيحي مناسب لعمره." },
          { glyph: "🧮", title: "مثال محلول", body: "خطوات الحل مرقّمة، يتابعها الطالب خطوة بخطوة قبل أن يجرّب بنفسه." },
          { glyph: "✅", title: "اختيار من متعدد", body: "سؤال يُصحَّح فورًا مع تفسير سبب صحة الإجابة أو خطئها." },
          { glyph: "✍️", title: "ملء الفراغات", body: "يكتب الطالب الإجابة بنفسه، والمنصة تقبل الأرقام العربية والهندية." },
          { glyph: "🔗", title: "التوصيل", body: "يربط الطالب كل عنصر بما يناسبه، وهو نشاط ممتاز للمصطلحات." },
          { glyph: "🔢", title: "الترتيب", body: "يرتّب الخطوات أو الأحداث بالترتيب الصحيح." },
          { glyph: "🗂️", title: "التصنيف", body: "يوزّع العناصر على مجموعات، فيكشف الفهم لا الحفظ." },
          { glyph: "🃏", title: "بطاقات المراجعة", body: "بطاقات تُقلب للمراجعة السريعة قبل الاختبار." },
        ]
      : [
          { glyph: "📖", title: "Plain explanation", body: "The idea in language a student understands, with a figure drawn for their age." },
          { glyph: "🧮", title: "Worked example", body: "Numbered solution steps the student follows before trying alone." },
          { glyph: "✅", title: "Multiple choice", body: "Graded on the spot, with an explanation of why an answer is right or wrong." },
          { glyph: "✍️", title: "Fill in the blank", body: "The student types the answer; Arabic and Western digits are both accepted." },
          { glyph: "🔗", title: "Matching", body: "Pair each item with its partner — ideal for vocabulary and terminology." },
          { glyph: "🔢", title: "Ordering", body: "Put steps or events into the correct sequence." },
          { glyph: "🗂️", title: "Sorting", body: "Place items into groups, which shows understanding rather than recall." },
          { glyph: "🃏", title: "Flashcards", body: "Cards to flip for quick revision before a test." },
        ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <SectionHeading title={d.home.howTitle} body={d.brand.tagline} />

      <ol className="mt-10 grid gap-5 sm:grid-cols-2">
        {steps.map((step) => (
          <li key={step.title} className="card p-6">
            <span className="text-2xl" aria-hidden>
              {step.glyph}
            </span>
            <h2 className="mt-3 text-lg font-bold">{step.title}</h2>
            <p className="mt-2 text-muted">{step.body}</p>
          </li>
        ))}
      </ol>

      <section className="mt-16">
        <SectionHeading title={d.features.interactiveTitle} body={d.features.interactiveBody} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {blockTypes.map((item) => (
            <li key={item.title} className="card p-5">
              <span className="text-2xl" aria-hidden>
                {item.glyph}
              </span>
              <h3 className="mt-2 font-bold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="card mt-16 bg-brand-600 p-8 text-center text-white">
        <h2 className="text-2xl font-bold">{d.home.ctaPrimary}</h2>
        <Link href="/curricula" className="btn btn-sun mt-6 px-6 py-3 text-base">
          {d.home.ctaSecondary}
        </Link>
      </div>
    </div>
  );
}
