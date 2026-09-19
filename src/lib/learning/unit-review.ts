import { isQuestion, type Localized, type QuestionBlock, type Unit } from "@/lib/content/types";
import { seededShuffle } from "@/lib/shuffle";

/**
 * What a unit is, beyond a list of lessons.
 *
 * A textbook chapter opens by saying what it is for and closes by asking whether
 * you got it. Both are derived from the lessons the unit already holds — the
 * objectives from their own objectives, the glossary from the words they teach,
 * the closing questions from the questions they ask — so a unit gains all three
 * the moment its lessons are written, and none of it can describe content that
 * is not there.
 */

/* --------------------------------------------------------------- objectives */

/** The lessons' own first objectives, which together are the unit's. */
export function unitObjectives(unit: Unit, limit = 6): Localized[] {
  const seen = new Set<string>();
  const out: Localized[] = [];

  for (const lesson of unit.lessons) {
    const first = lesson.objectives[0];
    if (!first || seen.has(first.ar)) continue;
    seen.add(first.ar);
    out.push(first);
    if (out.length >= limit) break;
  }
  return out;
}

/* ----------------------------------------------------------------- glossary */

export type GlossaryEntry = { term: Localized; meaning: Localized };

/**
 * Every word the unit defines, gathered in one place.
 *
 * Vocabulary met once inside a lesson and never again is vocabulary lost;
 * collecting it at the chapter's front gives it a second and a third encounter.
 */
export function unitGlossary(unit: Unit, limit = 14): GlossaryEntry[] {
  const seen = new Set<string>();
  const out: GlossaryEntry[] = [];

  for (const lesson of unit.lessons) {
    for (const block of lesson.blocks) {
      if (block.kind === "vocab") {
        for (const entry of block.terms) {
          if (seen.has(entry.term.ar)) continue;
          seen.add(entry.term.ar);
          out.push(entry);
        }
      }
      if (block.kind === "flashcards") {
        for (const card of block.cards) {
          if (seen.has(card.front.ar)) continue;
          seen.add(card.front.ar);
          out.push({ term: card.front, meaning: card.back });
        }
      }
      if (out.length >= limit) return out.slice(0, limit);
    }
  }
  return out;
}

/* ------------------------------------------------------------------- review */

export type ReviewQuestion = { block: QuestionBlock; lessonId: string; lessonTitle: Localized };

/** A lesson counts as held when this share of its review questions came back right. */
export const REVIEW_PASS = 70;

const PER_LESSON = 2;
const MAX_QUESTIONS = 10;

/**
 * The closing check: a few questions from each lesson of the unit, interleaved.
 *
 * Only a couple per lesson, because the point is retrieval across the whole
 * chapter rather than a second sitting of one lesson; and never two from the
 * same lesson in a row, because practising one idea in a block feels more
 * fluent than it is. `seed` fixes the draw for a day, so a refresh does not
 * reshuffle mid-review but tomorrow asks something else.
 */
export function reviewQuestions(unit: Unit, seed: string): ReviewQuestion[] {
  const perLesson = unit.lessons.map((lesson) => {
    const questions = lesson.blocks.filter(isQuestion);
    return seededShuffle(questions, `${seed}:${lesson.id}`)
      .slice(0, PER_LESSON)
      .map((block) => ({ block, lessonId: lesson.id, lessonTitle: lesson.title }));
  });

  // Round-robin, so the draw walks the chapter rather than working down it.
  const out: ReviewQuestion[] = [];
  for (let round = 0; round < PER_LESSON; round += 1) {
    for (const lessonQuestions of perLesson) {
      const question = lessonQuestions[round];
      if (question) out.push(question);
      if (out.length >= MAX_QUESTIONS) return out;
    }
  }
  return out;
}

/** The lessons a review can actually refresh, and how many questions each gets. */
export function reviewCoverage(questions: ReviewQuestion[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const question of questions) {
    counts.set(question.lessonId, (counts.get(question.lessonId) ?? 0) + 1);
  }
  return counts;
}

/** The seed that holds a draw steady for one calendar day. */
export const reviewSeed = (unitId: string, now: Date): string => `${unitId}:${now.toISOString().slice(0, 10)}`;
