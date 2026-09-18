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

const ARABIC_INDIC = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

/**
 * Formats a number the way the lesson text writes it: Arabic-Indic digits in Arabic,
 * Western digits in English. Done by hand rather than through `toLocaleString`, whose
 * numbering system depends on the ICU data a given Node build happens to ship.
 */
export function num(value: number, locale: Locale): string {
  const grouped = new Intl.NumberFormat("en-US").format(value);
  if (locale !== "ar") return grouped;
  return grouped.replace(/\d/g, (digit) => ARABIC_INDIC[Number(digit)] ?? digit).replace(/,/g, "٬");
}

/** Arabic uses its own percent sign, and it sits after the number in both locales. */
export function percent(value: number, locale: Locale): string {
  return `${num(value, locale)}${locale === "ar" ? "٪" : "%"}`;
}
