/**
 * Guards the catalogue against the mistakes that are easy to make when authoring
 * hundreds of bilingual strings: a missing translation, a side that ended up in the
 * wrong language, a duplicate id, or an interactive block that cannot be answered.
 */
import { catalog, catalogStats } from "../src/lib/content/index.js";
import { isQuestion } from "../src/lib/content/types.js";
import type { Localized } from "../src/lib/i18n/config.js";

const ARABIC = /[؀-ۿ]/;
const LATIN = /[A-Za-z]/;
const problems: string[] = [];
const ids = new Set<string>();

const fail = (where: string, what: string) => problems.push(`${where}: ${what}`);

function checkId(id: string, where: string) {
  if (ids.has(id)) fail(where, `duplicate id "${id}"`);
  ids.add(id);
}

function checkText(value: Localized, where: string) {
  if (!value.ar?.trim()) fail(where, "missing Arabic");
  if (!value.en?.trim()) fail(where, "missing English");
  // The Arabic side must be written in Arabic script; the English side must not be.
  if (value.ar && !ARABIC.test(value.ar) && LATIN.test(value.ar)) fail(where, `Arabic side is Latin: "${value.ar}"`);
  if (value.en && ARABIC.test(value.en)) fail(where, `English side is Arabic: "${value.en}"`);
}

for (const curriculum of catalog) {
  checkId(curriculum.id, curriculum.id);
  checkText(curriculum.title, `${curriculum.id}.title`);
  checkText(curriculum.description, `${curriculum.id}.description`);

  for (const stage of curriculum.stages) {
    checkId(stage.id, stage.id);
    checkText(stage.title, `${stage.id}.title`);

    for (const grade of stage.grades) {
      checkId(grade.id, grade.id);
      checkText(grade.title, `${grade.id}.title`);
      checkText(grade.shortTitle, `${grade.id}.shortTitle`);
      if (grade.subjects.length === 0) fail(grade.id, "no subjects");

      for (const subject of grade.subjects) {
        checkId(subject.id, subject.id);
        checkText(subject.title, `${subject.id}.title`);
        checkText(subject.description, `${subject.id}.description`);
        if (subject.units.length === 0) fail(subject.id, "no units");

        let freeCount = 0;
        for (const unit of subject.units) {
          checkId(unit.id, unit.id);
          checkText(unit.title, `${unit.id}.title`);
          if (unit.lessons.length === 0) fail(unit.id, "no lessons");

          for (const lesson of unit.lessons) {
            checkId(lesson.id, lesson.id);
            checkText(lesson.title, `${lesson.id}.title`);
            checkText(lesson.summary, `${lesson.id}.summary`);
            if (lesson.objectives.length === 0) fail(lesson.id, "no objectives");
            if (lesson.free) freeCount += 1;

            const blockIds = new Set<string>();
            for (const block of lesson.blocks) {
              if (blockIds.has(block.id)) fail(lesson.id, `duplicate block id "${block.id}"`);
              blockIds.add(block.id);

              if (!isQuestion(block)) continue;

              if (block.kind === "mcq" && !block.choices.some((choice) => choice.id === block.correctId)) {
                fail(`${lesson.id}/${block.id}`, "correctId is not one of the choices");
              }
              if (block.kind === "multi" && block.correctIds.length === 0) {
                fail(`${lesson.id}/${block.id}`, "no correct answers");
              }
              if (block.kind === "fill") {
                const placeholders = new Set((block.text.en.match(/\{\{\d+\}\}/g) ?? []).join(","));
                const arabicCount = (block.text.ar.match(/\{\{\d+\}\}/g) ?? []).length;
                if (arabicCount !== block.blanks.length || placeholders.size === 0) {
                  fail(`${lesson.id}/${block.id}`, "blanks do not match the placeholders in the text");
                }
                if (block.blanks.some((blank) => blank.answers.length === 0)) {
                  fail(`${lesson.id}/${block.id}`, "a blank has no accepted answer");
                }
              }
              if (block.kind === "sort") {
                const buckets = new Set(block.buckets.map((bucket) => bucket.id));
                for (const item of block.items) {
                  if (!buckets.has(item.bucketId)) fail(`${lesson.id}/${block.id}`, `item "${item.id}" has no bucket`);
                }
              }
              if (block.kind === "order" && block.items.length < 2) {
                fail(`${lesson.id}/${block.id}`, "ordering needs at least two items");
              }
              if (block.kind === "match" && block.pairs.length < 2) {
                fail(`${lesson.id}/${block.id}`, "matching needs at least two pairs");
              }
            }
          }
        }

        // Every subject must offer a way in without a subscription.
        if (freeCount === 0) fail(subject.id, "no free lesson");
      }
    }
  }
}

const stats = catalogStats();
console.log(
  `catalogue: ${stats.curricula} curricula · ${stats.grades} grades · ${stats.subjects} subjects · ` +
    `${stats.units} units · ${stats.lessons} lessons (${stats.authoredLessons} fully authored)`,
);

if (problems.length > 0) {
  console.error(`\n${problems.length} problem(s):`);
  for (const problem of problems.slice(0, 40)) console.error(` - ${problem}`);
  process.exit(1);
}
console.log("no problems found.");
