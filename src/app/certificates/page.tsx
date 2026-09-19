import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getI18n } from "@/lib/i18n/server";
import { num, percent, t } from "@/lib/i18n/config";
import { getViewer } from "@/lib/auth/current";
import { progressOf } from "@/lib/db/repo";
import { certificatesFor } from "@/lib/learning/certificates";
import { Chevron } from "@/components/ui";

export const metadata: Metadata = { title: "Certificates" };

export default async function CertificatesPage() {
  const viewer = await getViewer();
  if (!viewer) redirect("/login");

  const { locale, d } = await getI18n();
  const certificates = certificatesFor(viewer.user.id, await progressOf(viewer.user.id));

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 lg:py-16">
      <header className="text-center">
        <Image
          src="/images/icons/certificate.svg"
          alt=""
          width={96}
          height={96}
          className="mx-auto size-16"
        />
        <h1 className="mt-4 text-3xl sm:text-4xl">{d.certificates.listTitle}</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted">{d.certificates.listBody}</p>
      </header>

      {certificates.length === 0 ? (
        <div className="card mt-10 p-10 text-center">
          <p className="text-muted">{d.certificates.empty}</p>
          <Link href="/learn" className="btn btn-primary mt-6 px-6 py-3">
            {d.certificates.emptyCta}
            <Chevron />
          </Link>
        </div>
      ) : (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {certificates.map((certificate) => (
            <li key={certificate.unitId} className="card flex flex-col p-6">
              <Image
                src="/images/icons/badge.svg"
                alt=""
                width={96}
                height={96}
                className="size-12"
              />
              <h2 className="mt-3 text-lg">{t(certificate.unit, locale)}</h2>
              <p className="mt-1 text-sm text-muted">
                {t(certificate.subject, locale)} · {t(certificate.grade, locale)}
              </p>

              <dl className="mt-4 flex gap-6 text-sm">
                <div>
                  <dt className="text-xs text-muted">{d.certificates.mastery}</dt>
                  <dd className="font-display text-xl font-extrabold">
                    {percent(certificate.mastery, locale)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">{d.certificates.lessons}</dt>
                  <dd className="font-display text-xl font-extrabold">
                    {num(certificate.lessonCount, locale)}
                  </dd>
                </div>
              </dl>

              <Link
                href={`/certificates/${certificate.unitId}`}
                className="btn btn-ghost mt-5 w-full py-2.5"
              >
                {d.certificates.open}
                <Chevron />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
