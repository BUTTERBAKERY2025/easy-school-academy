import type { Metadata, Viewport } from "next";
import { Baloo_Bhaijaan_2, Cairo } from "next/font/google";
import { getI18n } from "@/lib/i18n/server";
import { I18nProvider } from "@/lib/i18n/client";
import { localeMeta } from "@/lib/i18n/config";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

/** Cairo carries both Arabic and Latin, so one family serves both locales. */
const appSans = Cairo({
  variable: "--font-app-sans",
  subsets: ["arabic", "latin"],
  display: "swap",
});

/** A rounded display face for headings — friendly for children, and it covers Arabic. */
const appDisplay = Baloo_Bhaijaan_2({
  variable: "--font-app-display",
  subsets: ["arabic", "latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "أكاديمية إيزي سكول | easy school academy",
    template: "%s · easy school",
  },
  description:
    "أكاديمية إيزي سكول: منصة تعليمية تفاعلية تدرّس المنهج الأمريكي والبريطاني والسعودي من الروضة حتى الصف الثالث المتوسط.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#140f2b" },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { locale } = await getI18n();
  const meta = localeMeta[locale];

  return (
    <html lang={meta.htmlLang} dir={meta.dir} className={`${appSans.variable} ${appDisplay.variable} h-full`}>
      <body className="font-sans min-h-full flex flex-col bg-surface text-body">
        <I18nProvider locale={locale}>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </I18nProvider>
      </body>
    </html>
  );
}
