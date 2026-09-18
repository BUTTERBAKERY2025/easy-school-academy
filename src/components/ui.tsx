import type { SubjectTheme } from "@/lib/content/types";
import { num, type Locale } from "@/lib/i18n/config";

export const themeClasses: Record<SubjectTheme, { chip: string; ring: string; bar: string; soft: string }> = {
  brand: {
    chip: "bg-brand-100 text-brand-800 dark:bg-brand-900/50 dark:text-brand-100",
    ring: "ring-brand-300/60",
    bar: "bg-brand-500",
    soft: "bg-brand-50 dark:bg-brand-900/25",
  },
  sun: {
    chip: "bg-sun-100 text-sun-800 dark:bg-sun-900/50 dark:text-sun-100",
    ring: "ring-sun-300/60",
    bar: "bg-sun-400",
    soft: "bg-sun-50 dark:bg-sun-900/25",
  },
  mint: {
    chip: "bg-mint-100 text-mint-800 dark:bg-mint-900/50 dark:text-mint-100",
    ring: "ring-mint-300/60",
    bar: "bg-mint-500",
    soft: "bg-mint-50 dark:bg-mint-900/25",
  },
  berry: {
    chip: "bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-100",
    ring: "ring-pink-300/60",
    bar: "bg-berry-500",
    soft: "bg-pink-50 dark:bg-pink-900/25",
  },
  ink: {
    chip: "bg-ink-100 text-ink-800 dark:bg-ink-800 dark:text-ink-100",
    ring: "ring-ink-300/60",
    bar: "bg-ink-600",
    soft: "bg-ink-50 dark:bg-ink-900/40",
  },
};

export function ProgressBar({
  value,
  theme = "brand",
  className = "",
}: {
  value: number;
  theme?: SubjectTheme;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-surface-muted ${className}`}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={`h-full rounded-full ${themeClasses[theme].bar} transition-[width] duration-500`} style={{ width: `${clamped}%` }} />
    </div>
  );
}

export function Stat({ label, value, glyph }: { label: string; value: string; glyph?: string }) {
  return (
    <div className="card p-4 text-center">
      {glyph ? <div className="text-2xl">{glyph}</div> : null}
      <div className="mt-1 text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted">{label}</div>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <header className="mx-auto max-w-2xl text-center">
      {eyebrow ? <p className="text-sm font-semibold text-brand-600 dark:text-brand-300">{eyebrow}</p> : null}
      <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h2>
      {body ? <p className="mt-3 text-muted">{body}</p> : null}
    </header>
  );
}

/** Keeps mixed number/punctuation strings such as "3 / 10" in logical order in RTL. */
export function Ratio({ done, total, locale }: { done: number; total: number; locale: Locale }) {
  return (
    <span dir="ltr" className="inline-block tabular-nums">
      {num(done, locale)} / {num(total, locale)}
    </span>
  );
}

export function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className={`dir-flip size-4 ${className}`} fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M7 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
