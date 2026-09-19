import Image from "next/image";
import type { Visual } from "@/lib/content/types";
import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/config";

/** Draws a lesson's teaching visual from its data description. */
export function VisualView({ visual, locale }: { visual: Visual; locale: Locale }) {
  return (
    <figure className="my-4 rounded-3xl border border-line bg-surface-muted p-5">
      <div className="flex justify-center">{renderBody(visual, locale)}</div>
      {visual.caption ? (
        <figcaption className="mt-3 text-center text-sm text-muted">{t(visual.caption, locale)}</figcaption>
      ) : null}
    </figure>
  );
}

function renderBody(visual: Visual, locale: Locale) {
  switch (visual.type) {
    case "figure":
      return <div className="text-6xl leading-none">{visual.glyph}</div>;

    case "image": {
      const shape = { wide: "aspect-[16/9]", square: "aspect-square", tall: "aspect-[3/4]" }[
        visual.shape ?? "wide"
      ];
      return (
        <div className={`relative w-full overflow-hidden rounded-2xl bg-surface ${shape}`}>
          <Image
            src={visual.src}
            alt={t(visual.alt, locale)}
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover"
          />
        </div>
      );
    }

    case "array":
      return (
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${visual.cols}, minmax(0, 1fr))` }}
          role="img"
          aria-label={`${visual.rows * visual.cols}`}
        >
          {Array.from({ length: visual.rows * visual.cols }, (_, index) => (
            <span key={index} className="text-3xl leading-none">
              {visual.glyph}
            </span>
          ))}
        </div>
      );

    case "fraction": {
      const parts = Array.from({ length: visual.denominator }, (_, index) => index < visual.numerator);
      return (
        <div className="w-full max-w-md">
          <div className="flex overflow-hidden rounded-xl border-2 border-brand-500">
            {parts.map((filled, index) => (
              <span
                key={index}
                className={`h-12 flex-1 border-brand-500 ${index > 0 ? "border-s-2" : ""} ${filled ? "bg-brand-500" : "bg-surface"}`}
              />
            ))}
          </div>
          <p className="mt-2 text-center text-lg font-bold" dir="ltr">
            {visual.numerator}/{visual.denominator}
          </p>
        </div>
      );
    }

    case "numberline": {
      const ticks: number[] = [];
      for (let value = visual.from; value <= visual.to; value += visual.step) ticks.push(value);
      return (
        <div className="w-full max-w-lg" dir="ltr">
          <div className="relative flex items-end justify-between border-b-2 border-body pb-1">
            {ticks.map((value) => (
              <span key={value} className="flex flex-col items-center gap-1 text-xs">
                <span className={`block w-0.5 ${visual.marks.includes(value) ? "h-6 bg-brand-500" : "h-3 bg-ink-400"}`} />
                <span className={visual.marks.includes(value) ? "font-bold text-brand-600" : "text-muted"}>{value}</span>
              </span>
            ))}
          </div>
        </div>
      );
    }

    case "bars": {
      const max = Math.max(...visual.items.map((item) => item.value), 1);
      return (
        <div className="w-full max-w-lg space-y-2">
          {visual.items.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-sm text-muted">{t(item.label, locale)}</span>
              <span className="h-6 flex-1 overflow-hidden rounded-full bg-surface">
                <span
                  className="block h-full rounded-full bg-mint-500"
                  style={{ width: `${Math.max(4, (item.value / max) * 100)}%` }}
                />
              </span>
              <span className="w-12 shrink-0 text-end text-sm font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      );
    }

    case "table":
      return (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-md border-collapse text-sm">
            <thead>
              <tr>
                {visual.headers.map((header, index) => (
                  <th key={index} className="border border-line bg-surface px-3 py-2 text-start font-bold">
                    {t(header, locale)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visual.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border border-line px-3 py-2">
                      {t(cell, locale)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "steps":
      return (
        <ol className="flex flex-wrap items-center justify-center gap-2">
          {visual.items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="rounded-2xl border border-line bg-surface px-3 py-2 text-sm font-semibold">
                {t(item, locale)}
              </span>
              {index < visual.items.length - 1 ? (
                <span aria-hidden className="dir-flip text-muted">
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      );
  }
}
