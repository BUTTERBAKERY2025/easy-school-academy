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
