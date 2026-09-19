/**
 * The labelled figures a lesson can point at, and the parts each one knows.
 *
 * Kept here rather than beside the drawing so the catalogue validator can check
 * a lesson's labels without pulling in React: a label naming a part the figure
 * does not have is the easiest mistake to make and the hardest to notice.
 */
export type DiagramArt = "flower" | "life-cycle";

export const DIAGRAM_PARTS: Record<DiagramArt, readonly string[]> = {
  flower: ["sepals", "petals", "filament", "anther", "stigma", "ovary"],
  "life-cycle": ["seed", "seedling", "plant", "flower", "fruit"],
};
