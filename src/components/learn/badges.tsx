import { getI18n } from "@/lib/i18n/server";
import { num, t } from "@/lib/i18n/config";
import { Icon } from "@/components/art/icons";
import { isEarned, rankBadges, type Badge } from "@/lib/learning/badges";

/**
 * The badge wall.
 *
 * An unearned badge is shown, not hidden, and shows how far along it is: a goal
 * you can see is worth more than a surprise. The dimming is the only difference
 * between earned and not, so the wall never reads as a wall of failures.
 */
export async function BadgeWall({ badges, limit }: { badges: Badge[]; limit?: number }) {
  const { locale, d } = await getI18n();
  const ranked = rankBadges(badges);
  const shown = limit ? ranked.slice(0, limit) : ranked;
  const earned = ranked.filter(isEarned).length;

  return (
    <section className="card p-6">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-bold">{d.dashboard.badgesTitle}</h2>
        <span className="text-sm text-muted">
          <span dir="ltr" className="font-semibold tabular-nums">
            {num(earned, locale)} / {num(ranked.length, locale)}
          </span>{" "}
          {d.dashboard.badgesEarned}
        </span>
      </header>
      <p className="mt-1 text-sm text-muted">{d.dashboard.badgesBody}</p>

      <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {shown.map((badge) => {
          const won = isEarned(badge);
          return (
            <li
              key={badge.id}
              title={t(badge.description, locale)}
              className={`rounded-2xl border p-3 text-center transition-colors ${
                won ? "border-line bg-surface-muted" : "border-dashed border-line"
              }`}
            >
              <span className={won ? "" : "opacity-35 grayscale"}>
                <Icon name={badge.icon} tint={badge.tint} className="mx-auto size-10" />
              </span>
              <span className="mt-2 block text-xs font-bold leading-tight">{t(badge.title, locale)}</span>
              {won ? null : (
                <span className="mt-1 block text-[10px] tabular-nums text-muted" dir="ltr">
                  {num(badge.at, locale)} / {num(badge.goal, locale)}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
