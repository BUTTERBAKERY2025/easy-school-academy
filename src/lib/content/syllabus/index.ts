import { bi } from "../banks/shared";
import type { Localized } from "@/lib/i18n/config";
import { britishScience5 } from "./british-science-5";

/**
 * A pinned scope and sequence for one subject in one year.
 *
 * The topic banks generate a plausible catalogue for all 1331 lessons, which is
 * what makes every grade browsable from the first day. A syllabus is the other
 * thing: the real course, unit by unit and lesson by lesson, written down once
 * the alignment work has actually been done for that year.
 *
 * Where one exists it replaces the generated slice entirely, so the band-splitting
 * in `topicsForGrade` never has to approximate a course we know exactly. Where one
 * does not, nothing changes. That is deliberate — it lets the catalogue be filled
 * in one curriculum, subject and year at a time, which is how this project works.
 *
 * Unit ids become part of every lesson id underneath them
 * (`british-g5-science-plants-1`), so they are chosen once and never renamed.
 */

export type SyllabusLesson = { title: Localized; page?: number };

export type SyllabusUnit = {
  id: string;
  title: Localized;
  summary: Localized;
  lessons: SyllabusLesson[];
};

export type Syllabus = {
  curriculumId: string;
  gradeOrdinal: number;
  subjectKey: string;
  /**
   * The published curriculum this scope follows. Named rather than reproduced:
   * a scope and sequence is a fact about a course, and none of the text, figures
   * or exercises of any book are copied into this repository.
   */
  follows: Localized;
  units: SyllabusUnit[];
};

/** A lesson is its title, or its title and the page it is taught on. */
type RawLesson = string | { t: string; page: number };

type RawUnit = { id: string; title: string; summary: string; lessons: RawLesson[] };

export type RawSyllabus = {
  curriculumId: string;
  gradeOrdinal: number;
  subjectKey: string;
  follows: string;
  units: RawUnit[];
};

export function syllabus(raw: RawSyllabus): Syllabus {
  return {
    curriculumId: raw.curriculumId,
    gradeOrdinal: raw.gradeOrdinal,
    subjectKey: raw.subjectKey,
    follows: bi(raw.follows),
    units: raw.units.map((unit) => ({
      id: unit.id,
      title: bi(unit.title),
      summary: bi(unit.summary),
      lessons: unit.lessons.map((lesson) =>
        typeof lesson === "string" ? { title: bi(lesson) } : { title: bi(lesson.t), page: lesson.page },
      ),
    })),
  };
}

const all: Syllabus[] = [britishScience5];

const key = (curriculumId: string, ordinal: number, subjectKey: string) =>
  `${curriculumId}:${ordinal}:${subjectKey}`;

const index = new Map(all.map((entry) => [key(entry.curriculumId, entry.gradeOrdinal, entry.subjectKey), entry]));

export const syllabusFor = (curriculumId: string, ordinal: number, subjectKey: string): Syllabus | undefined =>
  index.get(key(curriculumId, ordinal, subjectKey));
