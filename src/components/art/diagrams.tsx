import type { Localized } from "@/lib/i18n/config";
import { DIAGRAM_PARTS, type DiagramArt } from "@/lib/content/diagrams";

/**
 * Labelled diagrams: a textbook page's figure, drawn rather than scanned.
 *
 * A printed page can only label its parts once, in one language, in one set of
 * colours. Drawn from data, the same figure carries Arabic or English, works in
 * light or dark, and — the point — knows which part is which, so a child can ask
 * it about one and be shown exactly where that part sits.
 *
 * Each art has a fixed set of part ids. They are exported so the catalogue
 * validator can check that a lesson's labels name parts the drawing actually
 * has: a label pointing at nothing is the mistake this file is most likely to
 * cause.
 */

export type { DiagramArt };
export { DIAGRAM_PARTS };

type ArtProps = {
  /** The part under the cursor or chosen from the list; everything else dims. */
  active?: string;
  onSelect?: (part: string) => void;
  labels: Record<string, string>;
};

/* -------------------------------------------------------------- the flower */

/**
 * A flower cut down the middle, which is the only way to show the ovary at all.
 * Stylised on purpose: the job is to tell six parts apart at a glance, not to be
 * a botanical drawing of one species.
 */
export function FlowerDiagram({ active, onSelect, labels }: ArtProps) {
  /**
   * Each part carries its own label and leader line, as a printed figure does —
   * the name has to sit beside the thing, not only in a list to the side. Label
   * and shape dim together, so choosing a part leaves exactly one name on the
   * page.
   */
  const part = (
    id: string,
    colour: string,
    label: { x: number; y: number; anchor: "start" | "end"; to: [number, number] },
    shapes: React.ReactNode,
  ) => {
    const dim = active !== undefined && active !== id;
    const [toX, toY] = label.to;

    return (
      <g
        key={id}
        role={onSelect ? "button" : undefined}
        tabIndex={onSelect ? 0 : undefined}
        aria-label={labels[id]}
        onClick={onSelect ? () => onSelect(id) : undefined}
        onKeyDown={
          onSelect
            ? (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(id);
                }
              }
            : undefined
        }
        className={`origin-center outline-none transition-opacity focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 ${
          onSelect ? "cursor-pointer" : ""
        } ${dim ? "opacity-30" : "opacity-100"}`}
        style={{ color: colour }}
      >
        {shapes}
        <line
          x1={label.anchor === "end" ? label.x + 6 : label.x - 6}
          y1={label.y - 4}
          x2={toX}
          y2={toY}
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.65"
        />
        <circle cx={toX} cy={toY} r="3" fill="currentColor" />
        <text
          x={label.x}
          y={label.y}
          textAnchor={label.anchor}
          className={`text-[13px] font-semibold ${active === id ? "fill-current" : "fill-body"}`}
        >
          {labels[id]}
        </text>
      </g>
    );
  };

  return (
    <svg viewBox="0 0 520 400" className="w-full" role="img" aria-label={labels.figure ?? "flower"}>
      {/* stem and receptacle: structure, not a part anybody has to name */}
      <path d="M260 400V318" stroke="#0a946d" strokeWidth="8" strokeLinecap="round" fill="none" />
      <ellipse cx="260" cy="312" rx="24" ry="10" fill="#0a946d" />

      {part(
        "petals",
        "#ff77a8",
        { x: 124, y: 212, anchor: "end", to: [172, 216] },
        <>
          {/* the far petal, behind the carpel */}
          <path
            d="M254 296c-14-36-16-82-4-120 6-18 18-18 24 0 12 38 10 84-4 120z"
            fill="currentColor"
            opacity="0.55"
          />
          <path d="M250 302c-50-14-100-58-112-112-6-28 18-42 38-24 38 34 68 84 74 136z" fill="currentColor" />
          <path d="M270 302c50-14 100-58 112-112 6-28-18-42-38-24-38 34-68 84-74 136z" fill="currentColor" />
        </>,
      )}

      {part(
        "sepals",
        "#14b886",
        { x: 396, y: 330, anchor: "start", to: [348, 318] },
        <>
          <path d="M252 306c-32 16-66 20-94 12 28-18 62-20 94-12z" fill="currentColor" />
          <path d="M268 306c32 16 66 20 94 12-28-18-62-20-94-12z" fill="currentColor" />
        </>,
      )}

      {/* the style: the carpel's stalk, drawn as structure so no label claims it */}
      <path d="M260 236V176" stroke="#7a5cf0" strokeWidth="8" strokeLinecap="round" fill="none" />

      {part(
        "filament",
        "#f5a70b",
        { x: 396, y: 240, anchor: "start", to: [302, 232] },
        <>
          <path d="M244 292c-16-42-26-80-30-114" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M276 292c16-42 26-80 30-114" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
        </>,
      )}

      {part(
        "anther",
        "#d98103",
        { x: 396, y: 148, anchor: "start", to: [318, 164] },
        <>
          <rect x="196" y="158" width="36" height="21" rx="10.5" fill="currentColor" transform="rotate(-16 214 168)" />
          <rect x="288" y="158" width="36" height="21" rx="10.5" fill="currentColor" transform="rotate(16 306 168)" />
          {/* pollen coming loose */}
          <circle cx="204" cy="142" r="3.4" fill="currentColor" />
          <circle cx="218" cy="134" r="2.6" fill="currentColor" />
          <circle cx="316" cy="142" r="3.4" fill="currentColor" />
          <circle cx="302" cy="134" r="2.6" fill="currentColor" />
        </>,
      )}

      {part(
        "ovary",
        "#5a34e6",
        { x: 124, y: 286, anchor: "end", to: [234, 268] },
        <>
          <ellipse cx="260" cy="266" rx="27" ry="35" fill="currentColor" />
          {/* the eggs that become seeds */}
          <circle cx="251" cy="256" r="5.5" fill="#fff" opacity="0.9" />
          <circle cx="269" cy="268" r="5.5" fill="#fff" opacity="0.9" />
          <circle cx="253" cy="280" r="5.5" fill="#fff" opacity="0.9" />
        </>,
      )}

      {part(
        "stigma",
        "#6c4cf5",
        { x: 124, y: 146, anchor: "end", to: [240, 168] },
        <>
          <path d="M238 172c0-14 10-24 22-24s22 10 22 24c-8 6-36 6-44 0z" fill="currentColor" />
          {/* sticky, so pollen holds */}
          <circle cx="246" cy="154" r="3" fill="#fff" opacity="0.85" />
          <circle cx="260" cy="149" r="3" fill="#fff" opacity="0.85" />
          <circle cx="274" cy="154" r="2.6" fill="#fff" opacity="0.85" />
        </>,
      )}
    </svg>
  );
}

/* ----------------------------------------------------------- the life cycle */

const CYCLE: { id: string; glyph: string; angle: number }[] = [
  { id: "seed", glyph: "🌰", angle: -90 },
  { id: "seedling", glyph: "🌱", angle: -18 },
  { id: "plant", glyph: "🌿", angle: 54 },
  { id: "flower", glyph: "🌸", angle: 126 },
  { id: "fruit", glyph: "🍑", angle: 198 },
];

const RADIUS = 96;
const CENTRE = { x: 230, y: 160 };

const at = (angle: number, radius = RADIUS) => ({
  x: CENTRE.x + radius * Math.cos((angle * Math.PI) / 180),
  y: CENTRE.y + radius * Math.sin((angle * Math.PI) / 180),
});

/** The cycle drawn as a circle, because that is the thing being taught. */
export function LifeCycleDiagram({ active, onSelect, labels }: ArtProps) {
  return (
    <svg viewBox="0 0 460 320" className="w-full" role="img" aria-label={labels.figure ?? "life cycle"}>
      <defs>
        <marker id="cycle-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0l10 5-10 5z" className="fill-brand-400" />
        </marker>
      </defs>

      {CYCLE.map((node, index) => {
        const nextNode = CYCLE[(index + 1) % CYCLE.length];
        const from = at(node.angle + 16);
        const to = at(nextNode.angle - 16);
        return (
          <path
            key={`arc-${node.id}`}
            d={`M${from.x} ${from.y}A${RADIUS} ${RADIUS} 0 0 1 ${to.x} ${to.y}`}
            className="stroke-brand-300 dark:stroke-brand-600"
            strokeWidth="3"
            fill="none"
            markerEnd="url(#cycle-arrow)"
          />
        );
      })}

      {CYCLE.map((node) => {
        const point = at(node.angle);
        const dim = active !== undefined && active !== node.id;
        const outward = at(node.angle, RADIUS + 44);
        const anchor = Math.abs(node.angle) === 90 ? "middle" : point.x > CENTRE.x ? "start" : "end";

        return (
          <g
            key={node.id}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-label={labels[node.id]}
            onClick={onSelect ? () => onSelect(node.id) : undefined}
            onKeyDown={
              onSelect
                ? (event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onSelect(node.id);
                    }
                  }
                : undefined
            }
            className={`outline-none transition-opacity focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 ${
              onSelect ? "cursor-pointer" : ""
            } ${dim ? "opacity-30" : "opacity-100"}`}
          >
            <circle
              cx={point.x}
              cy={point.y}
              r="28"
              className={
                active === node.id
                  ? "fill-brand-500 stroke-brand-600"
                  : "fill-surface stroke-brand-300 dark:fill-ink-800 dark:stroke-brand-600"
              }
              strokeWidth="3"
            />
            <text x={point.x} y={point.y + 8} textAnchor="middle" fontSize="24">
              {node.glyph}
            </text>
            <text
              x={outward.x}
              y={outward.y + 4}
              textAnchor={anchor}
              className="fill-current text-[13px] font-semibold"
            >
              {labels[node.id]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export type DiagramLabels = Record<string, Localized>;
