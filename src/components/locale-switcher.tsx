"use client";

import { usePathname } from "next/navigation";
import { localeMeta, locales } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/client";

export function LocaleSwitcher() {
  const { locale, d } = useI18n();
  const pathname = usePathname();
  const next = locales.find((candidate) => candidate !== locale) ?? locale;
  const back = pathname;

  return (
    // A plain anchor, not next/link: the client router cannot navigate to a route
    // handler, and this needs a real request so the cookie is applied.
    <a
      href={`/api/locale?to=${next}&next=${encodeURIComponent(back)}`}
      className="btn btn-ghost px-3 py-1.5 text-sm"
      aria-label={`${d.nav.language}: ${localeMeta[next].label}`}
    >
      <span aria-hidden>🌐</span>
      {localeMeta[next].label}
    </a>
  );
}
