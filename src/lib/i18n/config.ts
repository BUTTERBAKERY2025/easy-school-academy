export const locales = ["ar", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

export const LOCALE_COOKIE = "school_on_locale";

export const localeMeta: Record<Locale, { dir: "rtl" | "ltr"; label: string; htmlLang: string }> = {
  ar: { dir: "rtl", label: "العربية", htmlLang: "ar" },
  en: { dir: "ltr", label: "English", htmlLang: "en" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** A string that carries both languages. Content and UI copy both use this shape. */
export type Localized = { ar: string; en: string };

export function t(value: Localized, locale: Locale): string {
  return value[locale] ?? value.ar;
}

/**
 * Formats a number for display, in Western digits in both languages.
 *
 * Arabic-Indic digits were the earlier default, but this academy teaches the
 * American and British curricula beside the Saudi one, and those are taught and
 * examined in Western digits — a grade, a price and a lesson count all read the
 * same to a parent whichever language the interface is in. Written out rather
 * than left to `toLocaleString`, whose numbering system depends on the ICU data
 * a given Node build happens to ship.
 */
export function num(value: number, _locale: Locale): string {
  return new Intl.NumberFormat("en-US").format(value);
}

/** The sign sits after the number in both languages. */
export function percent(value: number, locale: Locale): string {
  return `${num(value, locale)}%`;
}
