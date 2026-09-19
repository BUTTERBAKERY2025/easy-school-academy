import type { Localized } from "@/lib/i18n/config";
import type { Block, Screen } from "../types";
import { americanLessons } from "./american";
import { britishLessons } from "./british";
import { saudiLessons } from "./saudi";

/**
 * A fully written lesson body. Anything left out falls back to the value generated
 * from the curriculum's scope and sequence, so an author only writes what differs.
 */
export type AuthoredLesson = {
  title?: Localized;
  summary?: Localized;
  objectives?: Localized[];
  durationMinutes?: number;
  free?: boolean;
  /** Write either the blocks in order, or the screens that hold them. */
  blocks?: Block[];
  screens?: Screen[];
};

export type LessonLibrary = Record<string, AuthoredLesson>;

export const authoredLessons: LessonLibrary = {
  ...americanLessons,
  ...britishLessons,
  ...saudiLessons,
};
