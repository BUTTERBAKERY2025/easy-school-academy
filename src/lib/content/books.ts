import type { Localized } from "@/lib/i18n/config";
import type { Subject, SubjectTheme } from "./types";

/** A subject before its book exists — what the builder has to hand. */
type SubjectDraft = Omit<Subject, "book">;

/**
 * The course book behind each subject.
 *
 * A child at school does not think in "subjects and units" — they think in the
 * books in their bag. So every subject is also presented as a book, with a
 * shelf, a cover and a table of contents, and its units are the book's chapters.
 * A book is a view of a subject rather than a new layer: same id, same units,
 * nothing duplicated and nothing to keep in step.
 *
 * What the cover claims is chosen carefully. It names the authority whose
 * framework the subject follows — the Ministry, the Cambridge stage, the
 * standards — because that is a stable fact about the curriculum. It does not
 * name a publisher's edition, and no cover art, page or exercise from any
 * publisher is reproduced anywhere in this repository: every cover here is drawn
 * from the subject's own colour and icon.
 */

export type Book = {
  /** A book is its subject seen as a textbook, so they share an id. */
  id: string;
  subjectId: string;
  gradeId: string;
  curriculumId: string;
  /** What is printed largest on the cover. */
  title: Localized;
  /** The line above it: the framework this subject follows. */
  board: Localized;
  /** The same, short enough to sit on a cover the width of a thumb. */
  boardShort: Localized;
  /** The line below it: which year of school this copy is for. */
  level: Localized;
  /** The same, abbreviated, for the cover. */
  levelShort: Localized;
  theme: SubjectTheme;
  glyph: string;
  /** Chapters. */
  unitCount: number;
  lessonCount: number;
};

/**
 * Cambridge splits its primary and lower-secondary programmes at Year 6, and
 * only some subjects sit inside them; the rest follow the national curriculum.
 */
const CAMBRIDGE_SUBJECTS = new Set(["maths", "english", "science", "computing"]);

function britishBoard(key: string, ordinal: number): { full: Localized; short: Localized } {
  if (!CAMBRIDGE_SUBJECTS.has(key)) {
    return {
      full: { ar: "المنهج الوطني لإنجلترا", en: "National Curriculum for England" },
      short: { ar: "National Curriculum", en: "National Curriculum" },
    };
  }
  const stage = ordinal <= 6 ? "Cambridge Primary" : "Cambridge Lower Secondary";
  return { full: { ar: stage, en: stage }, short: { ar: "Cambridge", en: "Cambridge" } };
}

/**
 * The United States has no national textbook, so the honest label is the
 * standards a subject is written against rather than a book that does not exist.
 */
function americanBoard(key: string): { full: Localized; short: Localized } {
  if (key === "math" || key === "ela") {
    const label = "Common Core State Standards";
    return { full: { ar: label, en: label }, short: { ar: "Common Core", en: "Common Core" } };
  }
  if (key === "science") {
    const label = "Next Generation Science Standards";
    return { full: { ar: label, en: label }, short: { ar: "NGSS", en: "NGSS" } };
  }
  return {
    full: { ar: "State Standards", en: "State Standards" },
    short: { ar: "State Standards", en: "State Standards" },
  };
}

const SAUDI_BOARD = {
  full: {
    ar: "وزارة التعليم — المملكة العربية السعودية",
    en: "Ministry of Education — Saudi Arabia",
  },
  short: { ar: "وزارة التعليم", en: "Ministry of Education" },
};

function boardFor(curriculumId: string, key: string, ordinal: number): { full: Localized; short: Localized } {
  if (curriculumId === "saudi") return SAUDI_BOARD;
  if (curriculumId === "british") return britishBoard(key, ordinal);
  return americanBoard(key);
}

/**
 * The Saudi Arabic course is called by a different name either side of primary,
 * and children know it by that name rather than by "Arabic".
 */
function titleFor(subject: SubjectDraft, key: string, ordinal: number): Localized {
  if (subject.curriculumId === "saudi" && key === "arabic") {
    if (ordinal === 0) return { ar: "لغتي", en: "My Language" };
    return ordinal <= 6
      ? { ar: "لغتي الجميلة", en: "My Beautiful Language" }
      : { ar: "لغتي الخالدة", en: "My Enduring Language" };
  }
  return subject.title;
}

export function buildBook(
  subject: SubjectDraft,
  key: string,
  ordinal: number,
  gradeTitle: Localized,
  gradeShortTitle: Localized,
): Book {
  const board = boardFor(subject.curriculumId, key, ordinal);
  return {
    id: subject.id,
    subjectId: subject.id,
    gradeId: subject.gradeId,
    curriculumId: subject.curriculumId,
    title: titleFor(subject, key, ordinal),
    board: board.full,
    boardShort: board.short,
    level: gradeTitle,
    levelShort: gradeShortTitle,
    theme: subject.theme,
    glyph: subject.glyph,
    unitCount: subject.units.length,
    lessonCount: subject.units.reduce((total, unit) => total + unit.lessons.length, 0),
  };
}
