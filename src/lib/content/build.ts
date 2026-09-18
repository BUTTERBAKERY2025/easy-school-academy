import type { Localized } from "@/lib/i18n/config";
import { bi, topicsForGrade, type Band } from "./banks/shared";
import { curriculumDefs, type CurriculumDef, type GradeDef, type SubjectDef } from "./curricula";
import { authoredLessons, type AuthoredLesson } from "./lessons";
import type { Curriculum, Grade, Lesson, Stage, Subject, Unit } from "./types";

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
    blocks: authored?.blocks ?? [],
  };
}

function buildSubject(
  def: SubjectDef,
  curriculum: CurriculumDef,
  grade: GradeDef,
  bandPosition: number,
  bandSize: number,
): Subject | null {
  const gradeId = `${curriculum.id}-g${grade.ordinal}`;
  const subjectId = `${gradeId}-${slug(def.key)}`;
  const subjectTitle = bi(def.title);

  const units: Unit[] = [];
  let unitIndex = 0;

  for (const strand of def.bank.strands) {
    const bandTopics = strand.topics[grade.band];
    if (!bandTopics || bandTopics.length === 0) continue;

    const topics = topicsForGrade(bandTopics, bandPosition, bandSize);
    if (topics.length === 0) continue;

    const unitId = `${subjectId}-${strand.id}`;
    const isFirstUnit = unitIndex === 0;

    units.push({
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

  if (units.length === 0) return null;

  return {
    id: subjectId,
    gradeId,
    curriculumId: curriculum.id,
    title: subjectTitle,
    description: bi(def.description),
    glyph: def.glyph,
    theme: def.theme,
    units,
  };
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

      const subjects = def.subjects
        .filter((subject) => grade.ordinal >= (subject.fromOrdinal ?? 0))
        .map((subject) => buildSubject(subject, def, grade, bandPosition, members.length))
        .filter((subject): subject is Subject => subject !== null);

      return {
        id: `${def.id}-g${grade.ordinal}`,
        curriculumId: def.id,
        stageId: `${def.id}-${stage.id}`,
        ordinal: grade.ordinal,
        title: bi(grade.title),
        shortTitle: bi(grade.shortTitle),
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
