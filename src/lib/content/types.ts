import type { Localized } from "@/lib/i18n/config";
import type { Book } from "./books";
import type { DiagramArt } from "./diagrams";

/* ------------------------------------------------------------------ visuals */

/**
 * Teaching visuals are described as data and drawn with SVG at render time, so a
 * lesson never depends on an external image and both locales share one figure.
 */
export type Visual =
  | { type: "figure"; glyph: string; caption?: Localized }
  | { type: "array"; rows: number; cols: number; glyph: string; caption?: Localized }
  | { type: "fraction"; numerator: number; denominator: number; caption?: Localized }
  | { type: "numberline"; from: number; to: number; step: number; marks: number[]; caption?: Localized }
  | { type: "bars"; items: { label: Localized; value: number }[]; caption?: Localized }
  | { type: "table"; headers: Localized[]; rows: Localized[][]; caption?: Localized }
  | { type: "steps"; items: Localized[]; caption?: Localized }
  /**
   * A picture, for the one thing drawing from data cannot give: a real plant, a
   * real flower, a photograph or a painted illustration.
   *
   * `src` is a path under `public/`, and the catalogue validator fails a lesson
   * that points at a file which is not there — a broken image in a lesson is
   * worse than no image, because a child assumes they are missing something.
   * `alt` is required and bilingual: a picture that carries teaching has to
   * carry it for a child using a screen reader too.
   */
  | {
      type: "image";
      src: string;
      alt: Localized;
      /** How tall to draw it. `wide` is the default lesson illustration. */
      shape?: "wide" | "square" | "tall";
      caption?: Localized;
    };

/* ------------------------------------------------------------------- blocks */

export type Choice = { id: string; label: Localized };

/** A `{{1}}`-style placeholder inside the text marks a blank to fill. */
export type Blank = { id: string; answers: string[] };

export type Block =
  | { kind: "concept"; id: string; title: Localized; body: Localized; visual?: Visual }
  | { kind: "example"; id: string; title: Localized; steps: Localized[]; visual?: Visual }
  | { kind: "callout"; id: string; tone: "tip" | "warning" | "fact"; title: Localized; body: Localized }
  | { kind: "vocab"; id: string; title: Localized; terms: { term: Localized; meaning: Localized }[] }
  /**
   * Practical work, done away from the screen: collect flowers, count petals,
   * plan an investigation. Science that is only read about is not science, and a
   * lesson that never asks the child to touch anything teaches them that it is.
   */
  | {
      kind: "activity";
      id: string;
      title: Localized;
      /** What the activity is for, in a sentence. */
      intro: Localized;
      /** Equipment, kept to what a home actually has. */
      needs?: Localized[];
      /** Shown in its own band — handling, sharp edges, washing hands. */
      safety?: Localized;
      steps: Localized[];
    }
  /**
   * A labelled figure the child can interrogate.
   *
   * The page's diagram, except that it knows which part is which: choosing a
   * label lights that part up in the drawing and explains it, which is the one
   * thing a printed figure cannot do.
   */
  | {
      kind: "diagram";
      id: string;
      title: Localized;
      art: DiagramArt;
      intro?: Localized;
      /** One per part; every `id` must be a part the drawing actually has. */
      parts: { id: string; term: Localized; body: Localized }[];
    }
  /**
   * Walking through a page of the course book before teaching from it.
   *
   * A teacher opening a textbook points at the page before reading it: this is
   * the aims box, this is the task, keep these words. Each region is a rectangle
   * in percentages of the page, so the markers sit on the right places at any
   * size, and on any copy of that edition.
   */
  | {
      kind: "pagewalk";
      id: string;
      title: Localized;
      intro: Localized;
      /** The printed page number this walks through. */
      page: number;
      /** The one sentence the page is for. */
      bigIdea: Localized;
      regions: {
        id: string;
        /** `[x, y, width, height]`, each a percentage of the page. */
        rect: [number, number, number, number];
        title: Localized;
        body: Localized;
      }[];
    }
  /** The closing self-check: what the child should now be able to do. */
  | { kind: "checklist"; id: string; title: Localized; items: Localized[] }
  | { kind: "flashcards"; id: string; title: Localized; cards: { id: string; front: Localized; back: Localized }[] }
  | {
      kind: "mcq";
      id: string;
      prompt: Localized;
      choices: Choice[];
      correctId: string;
      explanation: Localized;
      hint?: Localized;
      visual?: Visual;
    }
  | {
      kind: "multi";
      id: string;
      prompt: Localized;
      choices: Choice[];
      correctIds: string[];
      explanation: Localized;
    }
  | { kind: "truefalse"; id: string; statement: Localized; answer: boolean; explanation: Localized }
  | { kind: "fill"; id: string; prompt: Localized; text: Localized; blanks: Blank[]; explanation: Localized }
  | {
      kind: "match";
      id: string;
      prompt: Localized;
      pairs: { id: string; left: Localized; right: Localized }[];
      explanation: Localized;
    }
  | {
      kind: "order";
      id: string;
      prompt: Localized;
      /** Stored in the correct order; the player shuffles them for the student. */
      items: { id: string; label: Localized }[];
      explanation: Localized;
    }
  | {
      kind: "sort";
      id: string;
      prompt: Localized;
      buckets: { id: string; label: Localized }[];
      items: { id: string; label: Localized; bucketId: string }[];
      explanation: Localized;
    }
  | { kind: "summary"; id: string; title: Localized; points: Localized[] };

export type QuestionBlock = Extract<
  Block,
  { kind: "mcq" | "multi" | "truefalse" | "fill" | "match" | "order" | "sort" }
>;

const QUESTION_KINDS = new Set(["mcq", "multi", "truefalse", "fill", "match", "order", "sort"]);

export function isQuestion(block: Block): block is QuestionBlock {
  return QUESTION_KINDS.has(block.kind);
}

/* ---------------------------------------------------------------- structure */

/**
 * One screen of a lesson.
 *
 * A lesson reads better in a few whole screens than in twenty single steps: the
 * child sees a question, a reading and a figure as one move rather than three,
 * and each screen can say what it is for before they start it.
 *
 * A lesson written as blocks alone still works — each block becomes a screen of
 * its own, which is exactly what it was before.
 */
export type Screen = {
  id: string;
  /** The small label above the title: "Think first", "Observe and sort". */
  kicker: Localized;
  title: Localized;
  /** One sentence setting the screen up. */
  lead?: Localized;
  /** What the child leaves this screen able to do. Shown, not hidden. */
  aim?: Localized;
  blocks: Block[];
};

export type Lesson = {
  id: string;
  unitId: string;
  subjectId: string;
  gradeId: string;
  curriculumId: string;
  index: number;
  title: Localized;
  summary: Localized;
  objectives: Localized[];
  durationMinutes: number;
  /** The first lesson of every subject is playable without a subscription. */
  free: boolean;
  /** True when a teacher has written the full interactive body for this lesson. */
  authored: boolean;
  /** The page this lesson is taught on in the course book, where one is aligned. */
  bookPage?: number;
  /** Set when the lesson is written as screens; `blocks` is then their contents. */
  screens?: Screen[];
  blocks: Block[];
};

export type Unit = {
  id: string;
  subjectId: string;
  gradeId: string;
  curriculumId: string;
  index: number;
  title: Localized;
  summary: Localized;
  lessons: Lesson[];
};

export type SubjectTheme = "brand" | "sun" | "mint" | "berry" | "ink";

export type Subject = {
  id: string;
  gradeId: string;
  curriculumId: string;
  /** The topic-bank key this subject was built from, e.g. `math`, `ela`, `arabic`. */
  key: string;
  title: Localized;
  description: Localized;
  glyph: string;
  theme: SubjectTheme;
  units: Unit[];
  /** The same subject presented as the course book a child carries. */
  book: Book;
};

export type Grade = {
  id: string;
  curriculumId: string;
  stageId: string;
  /** 0 = kindergarten / reception / الروضة, then 1..9. */
  ordinal: number;
  title: Localized;
  shortTitle: Localized;
  ages: string;
  subjects: Subject[];
};

export type Stage = {
  id: string;
  curriculumId: string;
  title: Localized;
  description: Localized;
  grades: Grade[];
};

export type Curriculum = {
  id: string;
  title: Localized;
  origin: Localized;
  flag: string;
  theme: SubjectTheme;
  description: Localized;
  highlights: Localized[];
  stages: Stage[];
};

export type { Localized };
export type { Book } from "./books";
