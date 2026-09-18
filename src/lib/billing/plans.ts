import type { Localized } from "@/lib/i18n/config";

export type PlanId = "basic" | "premium" | "family";

export type Plan = {
  id: PlanId;
  title: Localized;
  tagline: Localized;
  monthly: number;
  yearly: number;
  seats: number;
  popular?: boolean;
  features: Localized[];
};

export const currency: Localized = { ar: "ر.س", en: "SAR" };

export const plans: Plan[] = [
  {
    id: "basic",
    title: { ar: "الأساسية", en: "Basic" },
    tagline: { ar: "منهج واحد لطالب واحد", en: "One curriculum for one student" },
    monthly: 99,
    yearly: 990,
    seats: 1,
    features: [
      { ar: "منهج واحد بكل مواده ووحداته", en: "One full curriculum with every subject and unit" },
      { ar: "دروس تفاعلية غير محدودة", en: "Unlimited interactive lessons" },
      { ar: "تقارير تقدّم أسبوعية", en: "Weekly progress reports" },
      { ar: "دعم عبر البريد", en: "Email support" },
    ],
  },
  {
    id: "premium",
    title: { ar: "المتميزة", en: "Premium" },
    tagline: { ar: "المناهج الثلاثة لطالب واحد", en: "All three curricula for one student" },
    monthly: 149,
    yearly: 1490,
    seats: 1,
    popular: true,
    features: [
      { ar: "المنهج الأمريكي والبريطاني والسعودي", en: "American, British and Saudi curricula" },
      { ar: "التبديل بين المناهج في أي وقت", en: "Switch curriculum at any time" },
      { ar: "خطة يومية مقترحة تلقائيًا", en: "An automatically suggested daily plan" },
      { ar: "شهادات إتمام الوحدات", en: "Unit completion certificates" },
      { ar: "أولوية في الدعم", en: "Priority support" },
    ],
  },
  {
    id: "family",
    title: { ar: "العائلية", en: "Family" },
    tagline: { ar: "حتى ٤ طلاب في حساب واحد", en: "Up to 4 students on one account" },
    monthly: 249,
    yearly: 2490,
    seats: 4,
    features: [
      { ar: "كل مزايا الخطة المتميزة", en: "Everything in Premium" },
      { ar: "حتى ٤ حسابات طلاب", en: "Up to 4 student accounts" },
      { ar: "لوحة متابعة موحّدة لولي الأمر", en: "One parent dashboard for all children" },
      { ar: "تقرير مقارن بين الأبناء", en: "A comparative report across children" },
    ],
  },
];

export const getPlan = (id: string): Plan | undefined => plans.find((plan) => plan.id === id);

export const isPlanId = (value: unknown): value is PlanId =>
  typeof value === "string" && plans.some((plan) => plan.id === value);
