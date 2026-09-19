import type { Locale } from "@/lib/i18n/config";

/**
 * The language a curriculum is taught in.
 *
 * A course is written in a language, and the words of the subject belong to it:
 * a child following the British curriculum meets the stamen as the stamen and
 * reads the lesson in the language the course is set in. So lesson bodies render
 * in the curriculum's own language rather than in whichever language the
 * interface happens to be in — the navigation, the buttons and the dashboard
 * still follow the reader.
 *
 * An Arabic reader on an English course can still turn the Arabic on inside a
 * lesson; it is support, and it is off by default, because a course taught in
 * English is what the family chose when they chose the curriculum.
 */
const TEACHING: Record<string, Locale> = {
  american: "en",
  british: "en",
  saudi: "ar",
};

export const teachingLocale = (curriculumId: string, fallback: Locale): Locale =>
  TEACHING[curriculumId] ?? fallback;

/** The other language, offered as support when it differs from the reader's own. */
export const supportLocale = (curriculumId: string, reader: Locale): Locale | undefined => {
  const taught = teachingLocale(curriculumId, reader);
  return taught === reader ? undefined : reader;
};
