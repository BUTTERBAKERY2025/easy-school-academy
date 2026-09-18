import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "أكاديمية سكول أون | School On Academy",
    template: "%s · School On",
  },
  description:
    "منصة تعليمية تفاعلية تدرّس المنهج الأمريكي والبريطاني والسعودي من الروضة حتى الصف الثالث المتوسط.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0f1c" },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { locale } = await getI18n();
  const meta = localeMeta[locale];

  return (
    <html lang={meta.htmlLang} dir={meta.dir} className={`${appSans.variable} h-full`}>
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
