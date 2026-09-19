import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getI18n } from "@/lib/i18n/server";
import { num, percent, t, type Locale } from "@/lib/i18n/config";
import { getViewer } from "@/lib/auth/current";
import { progressOf } from "@/lib/db/repo";
import { certificateFor, type Certificate } from "@/lib/learning/certificates";
import { LogoMark } from "@/components/art/logo";
import { PrintButton } from "@/components/certificate-print";
import { Chevron } from "@/components/ui";

export const metadata: Metadata = { title: "Certificate" };

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ unitId: string }>;
}) {
  const viewer = await getViewer();
  if (!viewer) redirect("/login");

  const { unitId } = await params;
  const { locale, d } = await getI18n();

  // Derived from this viewer's own rows, so a unit somebody else finished is
  // simply not found here rather than rendered for the wrong name.
  const certificate = certificateFor(viewer.user.id, await progressOf(viewer.user.id), unitId);
  if (!certificate) notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 lg:py-14">
      <div className="flex items-center justify-between gap-4 print:hidden">
        <Link href="/certificates" className="btn btn-ghost px-5 py-2.5">
          <Chevron className="dir-flip rotate-180" />
          {d.certificates.back}
        </Link>
        <PrintButton label={d.certificates.print} />
      </div>

      <Sheet certificate={certificate} name={viewer.user.name} locale={locale} d={d} />
    </main>
  );
}

type Dict = Awaited<ReturnType<typeof getI18n>>["d"];

/**
 * The sheet. It carries its own light colours and a fixed aspect rather than
 * the theme tokens, because this one page is meant to leave the screen: a dark
 * certificate would print as a black rectangle, and the print rules below drop
 * everything around it.
 */
function Sheet({
  certificate,
  name,
  locale,
  d,
}: {
  certificate: Certificate;
  name: string;
  locale: Locale;
  d: Dict;
}) {
  const minutes = Math.max(1, Math.round(certificate.secondsSpent / 60));
  const earned = new Date(certificate.earnedAt).toISOString().slice(0, 10);

  return (
    <article className="mt-6 overflow-hidden rounded-4xl border-8 border-brand-600 bg-[#fffdf8] p-8 text-center text-ink-900 shadow-[var(--shadow-card)] sm:p-12 print:mt-0 print:rounded-none print:border-4 print:shadow-none">
      <div className="flex items-center justify-center gap-3">
        <LogoMark className="size-11 text-brand-600" page="#fffdf8" />
        <span className="font-display text-xl font-extrabold">{d.brand.short}</span>
      </div>

      <p className="mt-8 text-sm font-bold tracking-wide text-ink-500">{d.certificates.awardedTo}</p>
      <p className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">{name}</p>

      <p className="mt-6 text-sm text-ink-500">{d.certificates.forUnit}</p>
      <p className="mt-1.5 font-display text-2xl font-bold text-brand-700">
        {t(certificate.unit, locale)}
      </p>
      <p className="mt-1.5 text-ink-600">
        {d.certificates.inSubject} {t(certificate.subject, locale)} — {t(certificate.grade, locale)} ·{" "}
        {t(certificate.curriculum, locale)}
      </p>

      <dl className="mx-auto mt-8 grid max-w-lg grid-cols-3 gap-4 border-y border-ink-200 py-5">
        <Figure label={d.certificates.mastery} value={percent(certificate.mastery, locale)} />
        <Figure label={d.certificates.lessons} value={num(certificate.lessonCount, locale)} />
        <Figure
          label={d.certificates.timeSpent}
          value={`${num(minutes, locale)} ${d.certificates.minutes}`}
        />
      </dl>

      <div className="mt-7 flex flex-col items-center gap-3">
        <Image src="/images/icons/badge.svg" alt="" width={96} height={96} className="size-14" />
        <p className="text-sm text-ink-600">{d.certificates.issuer}</p>
      </div>

      <p className="mt-6 text-xs text-ink-400" dir="ltr">
        {d.certificates.earnedOn} {earned} · {d.certificates.reference} {certificate.reference}
      </p>
    </article>
  );
}

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-ink-500">{label}</dt>
      <dd className="mt-0.5 font-display text-2xl font-extrabold text-brand-700">{value}</dd>
    </div>
  );
}
