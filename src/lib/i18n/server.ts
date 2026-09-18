import { cookies } from "next/headers";
import { LOCALE_COOKIE, defaultLocale, isLocale, localeMeta, type Locale } from "./config";
import { getDictionary, type Dictionary } from "./dictionary";

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
}

export async function getI18n(): Promise<{ locale: Locale; d: Dictionary; dir: "rtl" | "ltr" }> {
  const locale = await getLocale();
  return { locale, d: getDictionary(locale), dir: localeMeta[locale].dir };
}
