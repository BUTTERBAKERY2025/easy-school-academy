"use client";

import { createContext, useContext } from "react";
import { defaultLocale, localeMeta, type Locale } from "./config";
import { getDictionary, type Dictionary } from "./dictionary";

type I18nValue = { locale: Locale; d: Dictionary; dir: "rtl" | "ltr" };

const I18nContext = createContext<I18nValue>({
  locale: defaultLocale,
  d: getDictionary(defaultLocale),
  dir: localeMeta[defaultLocale].dir,
});

export function I18nProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const value: I18nValue = { locale, d: getDictionary(locale), dir: localeMeta[locale].dir };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  return useContext(I18nContext);
}
