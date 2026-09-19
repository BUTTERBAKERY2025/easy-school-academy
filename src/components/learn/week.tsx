import { getI18n } from "@/lib/i18n/server";
import { num } from "@/lib/i18n/config";

/**
 * The last seven days.
 *
 * Spacing beats cramming, and the only way a student can see whether they are
 * spacing their practice is to see the days themselves. Shown as evidence, not
 * as a demand: a missed day is drawn as an empty square, never as a warning.
 */
export async function WeekStrip({ days, streakDays }: { days: { day: string; minutes: number }[]; streakDays: number }) {
  const { locale, d } = await getI18n();
  const busiest = Math.max(1, ...days.map((entry) => entry.minutes));

  return (
    <section className="card p-6">
      <header className="flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-bold text-muted">{d.dashboard.weekTitle}</h2>
        {streakDays > 0 ? (
          <span className="chip gap-1 bg-sun-100 text-sun-800 dark:bg-sun-900/50 dark:text-sun-100">
            <span aria-hidden>🔥</span>
            <span dir="ltr" className="tabular-nums">
              {num(streakDays, locale)}
            </span>
          </span>
        ) : null}
      </header>

      <ol className="mt-4 flex items-end justify-between gap-1.5">
        {days.map((entry) => {
          const weekday = new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", {
            weekday: "short",
          }).format(new Date(`${entry.day}T00:00:00Z`));
          const height = entry.minutes ? 16 + Math.round((entry.minutes / busiest) * 40) : 6;

          return (
            <li key={entry.day} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                title={`${entry.minutes ? `${entry.minutes} ${d.common.minutes}` : d.dashboard.noStudy}`}
                style={{ height }}
                className={`w-full rounded-lg transition-all ${
                  entry.minutes ? "bg-brand-500 dark:bg-brand-400" : "bg-surface-muted"
                }`}
              />
              <span className="text-[10px] text-muted">{weekday}</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
