import type { Localized } from "@/lib/i18n/config";
import { bi, topicsForGrade, type Band } from "./banks/shared";
import { curriculumDefs, type CurriculumDef, type GradeDef, type SubjectDef } from "./curricula";
import { authoredLessons, type AuthoredLesson } from "./lessons";
import type { Curriculum, Grade, Lesson, Stage, Subject, Unit } from "./types";
import { buildBook } from "./books";
import { syllabusFor, type Syllabus } from "./syllabus";

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const durationForBand: Record<Band, number> = { early: 12, lower: 15, middle: 20, upper: 25 };

function objectivesFor(topic: Localized, subject: Localized): Localized[] {
  return [
    {
      ar: `أن يشرح الطالب ${topic.ar} بلغته الخاصة.`,
      en: `Explain ${topic.en.toLowerCase()} in your own words.`,
    },
    {
      ar: `أن يطبّق ما تعلّمه على أمثلة محلولة خطوة بخطوة.`,
      en: `Apply the idea to worked examples, step by step.`,
    },
    {
      ar: `أن يحل تمارين ${subject.ar} على هذا الدرس بثقة.`,
      en: `Solve ${subject.en.toLowerCase()} practice questions on this lesson with confidence.`,
    },
  ];
}

function summaryFor(topic: Localized, strand: Localized): Localized {
  return {
    ar: `درس تفاعلي يشرح «${topic.ar}» خطوة بخطوة ضمن وحدة ${strand.ar}.`,
    en: `An interactive lesson on "${topic.en}", taught step by step inside the ${strand.en} unit.`,
  };
}

function buildLesson(args: {
  curriculumId: string;
  gradeId: string;
  subjectId: string;
  subjectTitle: Localized;
  unitId: string;
  strandTitle: Localized;
  topic: Localized;
  index: number;
  band: Band;
  isFirstOfSubject: boolean;
  bookPage?: number;
}): Lesson {
  const id = `${args.unitId}-${args.index + 1}`;
  const authored: AuthoredLesson | undefined = authoredLessons[id];

  return {
    id,
    unitId: args.unitId,
    subjectId: args.subjectId,
    gradeId: args.gradeId,
    curriculumId: args.curriculumId,
    index: args.index,
    title: authored?.title ?? args.topic,
    summary: authored?.summary ?? summaryFor(args.topic, args.strandTitle),
    objectives: authored?.objectives ?? objectivesFor(args.topic, args.subjectTitle),
    durationMinutes: authored?.durationMinutes ?? durationForBand[args.band],
    free: authored?.free ?? args.isFirstOfSubject,
    authored: Boolean(authored),
    bookPage: args.bookPage,
    screens: authored?.screens,
    // Screens are the way a lesson is written; blocks are what everything else
    // reads — the validator, the unit review, the question count. Flattening
    // here means neither has to know about the other.
    blocks: authored?.screens?.flatMap((screen) => screen.blocks) ?? authored?.blocks ?? [],
  };
}


/**
 * Builds the units of a subject whose scope has been pinned, rather than sliced
 * out of a band. Lesson ids come out identically shaped either way
 * (`{subject}-{unit}-{n}`), so nothing downstream can tell the difference.
 */
function unitsFromSyllabus(
  pinned: Syllabus,
  context: {
    curriculumId: string;
    gradeId: string;
    subjectId: string;
    subjectTitle: Localized;
    band: Band;
  },
): Unit[] {
  return pinned.units.map((unit, unitIndex) => {
    const unitId = `${context.subjectId}-${unit.id}`;
    return {
      id: unitId,
      subjectId: context.subjectId,
      gradeId: context.gradeId,
      curriculumId: context.curriculumId,
      index: unitIndex,
      title: unit.title,
      summary: unit.summary,
      lessons: unit.lessons.map((lesson, index) =>
        buildLesson({
          curriculumId: context.curriculumId,
          gradeId: context.gradeId,
          subjectId: context.subjectId,
          subjectTitle: context.subjectTitle,
          unitId,
          strandTitle: unit.title,
          topic: lesson.title,
          index,
          band: context.band,
          isFirstOfSubject: unitIndex === 0 && index === 0,
          bookPage: lesson.page,
        }),
      ),
    };
  });
}

function buildSubject(
  def: SubjectDef,
  curriculum: CurriculumDef,
  grade: GradeDef,
  bandPosition: number,
  bandSize: number,
  gradeTitle: Localized,
  gradeShortTitle: Localized,
): Subject | null {
  const gradeId = `${curriculum.id}-g${grade.ordinal}`;
  const subjectId = `${gradeId}-${slug(def.key)}`;
  const subjectTitle = bi(def.title);

  function unitsFromBank(): Unit[] {
    const built: Unit[] = [];
    let unitIndex = 0;

    for (const strand of def.bank.strands) {
      const bandTopics = strand.topics[grade.band];
      if (!bandTopics || bandTopics.length === 0) continue;

      const topics = topicsForGrade(bandTopics, bandPosition, bandSize);
      if (topics.length === 0) continue;

      const unitId = `${subjectId}-${strand.id}`;
      const isFirstUnit = unitIndex === 0;

      built.push({
        id: unitId,
        subjectId,
        gradeId,
        curriculumId: curriculum.id,
        index: unitIndex,
        title: strand.title,
        summary: strand.summary,
        lessons: topics.map((topic, index) =>
          buildLesson({
            curriculumId: curriculum.id,
            gradeId,
            subjectId,
            subjectTitle,
            unitId,
            strandTitle: strand.title,
            topic,
            index,
            band: grade.band,
            isFirstOfSubject: isFirstUnit && index === 0,
          }),
        ),
      });
      unitIndex += 1;
    }
    return built;
  }

  // Where the real course has been written down, it replaces the slice the bank
  // would have generated; everywhere else the bank still fills the catalogue.
  const pinned = syllabusFor(curriculum.id, grade.ordinal, def.key);
  const units: Unit[] = pinned
    ? unitsFromSyllabus(pinned, { curriculumId: curriculum.id, gradeId, subjectId, subjectTitle, band: grade.band })
    : unitsFromBank();

  if (units.length === 0) return null;

  const subject = {
    id: subjectId,
    gradeId,
    curriculumId: curriculum.id,
    key: def.key,
    title: subjectTitle,
    description: bi(def.description),
    glyph: def.glyph,
    theme: def.theme,
    units,
  };

  // The book is built from the finished subject, so a cover can never describe
  // a different set of chapters from the one below it.
  return { ...subject, book: buildBook(subject, def.key, grade.ordinal, gradeTitle, gradeShortTitle) };
}

function buildCurriculum(def: CurriculumDef): Curriculum {
  // A band can span more than one stage, so band positions are counted across the
  // whole curriculum rather than inside a single stage.
  const allGrades = def.stages.flatMap((stage) => stage.grades);
  const bandMembers = new Map<Band, number[]>();
  for (const grade of allGrades) {
    const list = bandMembers.get(grade.band) ?? [];
    list.push(grade.ordinal);
    bandMembers.set(grade.band, list);
  }

  const stages: Stage[] = def.stages.map((stage) => ({
    id: `${def.id}-${stage.id}`,
    curriculumId: def.id,
    title: bi(stage.title),
    description: bi(stage.description),
    grades: stage.grades.map((grade): Grade => {
      const members = bandMembers.get(grade.band) ?? [grade.ordinal];
      const bandPosition = members.indexOf(grade.ordinal);

      const gradeTitle = bi(grade.title);
      const gradeShortTitle = bi(grade.shortTitle);
      const subjects = def.subjects
        .filter((subject) => grade.ordinal >= (subject.fromOrdinal ?? 0))
        .map((subject) => buildSubject(subject, def, grade, bandPosition, members.length, gradeTitle, gradeShortTitle))
        .filter((subject): subject is Subject => subject !== null);

      return {
        id: `${def.id}-g${grade.ordinal}`,
        curriculumId: def.id,
        stageId: `${def.id}-${stage.id}`,
        ordinal: grade.ordinal,
        title: gradeTitle,
        shortTitle: gradeShortTitle,
        ages: grade.ages,
        subjects,
      };
    }),
  }));

  return {
    id: def.id,
    title: bi(def.title),
    origin: bi(def.origin),
    flag: def.flag,
    theme: def.theme,
    description: bi(def.description),
    highlights: def.highlights.map(bi),
    stages,
  };
}

export function buildCatalog(): Curriculum[] {
  return curriculumDefs.map(buildCurriculum);
}
