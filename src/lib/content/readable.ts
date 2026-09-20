import { t, type Locale } from "@/lib/i18n/config";
import type { Block } from "./types";

/**
 * What a block would sound like read aloud.
 *
 * A teacher's explanation is spoken. Ours was silent text, which is the largest
 * single difference between reading a page and being taught from it — so every
 * block has to be able to say what it is, in order, without the furniture:
 * a table's cells are read as a table, but the word "table" is not read out.
 *
 * Returned as sentences rather than one string so the narration can move block
 * by block and the screen can show which one is being read.
 */
export function readableText(block: Block, locale: Locale): string {
  const say = (...parts: (string | undefined)[]) => parts.filter(Boolean).join(". ").replace(/\.\.+/g, ".");

  switch (block.kind) {
    case "concept":
      return say(t(block.title, locale), t(block.body, locale));

    case "example":
      return say(t(block.title, locale), ...block.steps.map((step) => t(step, locale)));

    case "callout":
      return say(t(block.title, locale), t(block.body, locale));

    case "vocab":
      return say(
        t(block.title, locale),
        ...block.terms.map((term) => `${t(term.term, locale)}: ${t(term.meaning, locale)}`),
      );

    case "flashcards":
      return t(block.title, locale);

    case "activity":
      return say(t(block.title, locale), t(block.intro, locale), ...block.steps.map((step) => t(step, locale)));

    case "checklist":
      return say(t(block.title, locale), ...block.items.map((item) => t(item, locale)));

    case "diagram":
      return say(t(block.title, locale), block.intro ? t(block.intro, locale) : undefined);

    case "pagewalk":
      return say(t(block.title, locale), t(block.intro, locale), t(block.bigIdea, locale));

    case "summary":
      return say(t(block.title, locale), ...block.points.map((point) => t(point, locale)));

    // A question is read as the teacher would ask it: the question, then the
    // options. The answer is never read — that is the child's part.
    case "mcq":
      return say(t(block.prompt, locale), ...block.choices.map((choice) => t(choice.label, locale)));

    case "multi":
      return say(t(block.prompt, locale), ...block.choices.map((choice) => t(choice.label, locale)));

    case "truefalse":
      return t(block.statement, locale);

    case "fill":
    case "match":
    case "order":
    case "sort":
      return t(block.prompt, locale);
  }
}
