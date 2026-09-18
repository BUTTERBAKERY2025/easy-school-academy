import type { Localized } from "@/lib/i18n/config";

const ARABIC_SCRIPT = /[\u0600-\u06FF]/;

/**
 * Topic banks hold hundreds of short bilingual phrases, so they are written in a
 * compact `"one side|the other"` form and expanded here.
 *
 * Either order is accepted — Arabic-first reads better in the Saudi banks and
 * English-first in the others — because the Arabic side is identified by its
 * script rather than by its position.
 */
export function bi(pair: string): Localized {
  const separator = pair.indexOf("|");
  if (separator === -1) return { en: pair, ar: pair };

  const first = pair.slice(0, separator).trim();
  const second = pair.slice(separator + 1).trim();

  return ARABIC_SCRIPT.test(first) && !ARABIC_SCRIPT.test(second)
    ? { ar: first, en: second }
    : { en: first, ar: second };
}

export const biList = (pairs: string[]): Localized[] => pairs.map(bi);

/** Grade bands group grades that share a scope-and-sequence chunk. */
export type Band = "early" | "lower" | "middle" | "upper";

export type Strand = {
  id: string;
  title: Localized;
  summary: Localized;
  /** Topics for each band, distributed evenly across the grades inside that band. */
  topics: Partial<Record<Band, Localized[]>>;
};

export type TopicBank = {
  id: string;
  strands: Strand[];
};

type RawStrand = {
  id: string;
  title: string;
  summary: string;
  topics: Partial<Record<Band, string[]>>;
};

export function bank(id: string, strands: RawStrand[]): TopicBank {
  return {
    id,
    strands: strands.map((strand) => ({
      id: strand.id,
      title: bi(strand.title),
      summary: bi(strand.summary),
      topics: Object.fromEntries(
        Object.entries(strand.topics).map(([band, pairs]) => [band, biList(pairs)]),
      ) as Partial<Record<Band, Localized[]>>,
    })),
  };
}

/**
 * Splits a band's topics between the grades that share it, so two grades in the same
 * band never teach the same lesson list. `position` is the grade's index inside its
 * band and `count` is how many grades that band holds in this curriculum.
 */
export function topicsForGrade(topics: Localized[], position: number, count: number): Localized[] {
  if (topics.length === 0 || count <= 0) return [];
  const slot = Math.min(Math.max(position, 0), count - 1);

  if (topics.length <= count) {
    const picked = topics[slot % topics.length];
    return picked ? [picked] : [];
  }

  const size = Math.floor(topics.length / count);
  const remainder = topics.length % count;
  const start = slot * size + Math.min(slot, remainder);
  const length = size + (slot < remainder ? 1 : 0);
  return topics.slice(start, start + length);
}
