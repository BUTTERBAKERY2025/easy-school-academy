import { buildCatalog } from "./build";
import type { Curriculum, Grade, Lesson, Subject, Unit } from "./types";

export * from "./types";

/** The whole catalogue is derived once per process from the topic banks. */
export const catalog: Curriculum[] = buildCatalog();

const curriculumIndex = new Map<string, Curriculum>();
const gradeIndex = new Map<string, Grade>();
const subjectIndex = new Map<string, Subject>();
const unitIndex = new Map<string, Unit>();
const lessonIndex = new Map<string, Lesson>();

for (const curriculum of catalog) {
  curriculumIndex.set(curriculum.id, curriculum);
  for (const stage of curriculum.stages) {
    for (const grade of stage.grades) {
      gradeIndex.set(grade.id, grade);
      for (const subject of grade.subjects) {
        subjectIndex.set(subject.id, subject);
        for (const unit of subject.units) {
          unitIndex.set(unit.id, unit);
          for (const lesson of unit.lessons) lessonIndex.set(lesson.id, lesson);
        }
      }
    }
  }
}

export const getCurriculum = (id: string): Curriculum | undefined => curriculumIndex.get(id);
export const getGrade = (id: string): Grade | undefined => gradeIndex.get(id);
export const getSubject = (id: string): Subject | undefined => subjectIndex.get(id);
export const getUnit = (id: string): Unit | undefined => unitIndex.get(id);
export const getLesson = (id: string): Lesson | undefined => lessonIndex.get(id);

export const allGrades = (): Grade[] => [...gradeIndex.values()];
export const allLessons = (): Lesson[] => [...lessonIndex.values()];

export function gradesOf(curriculumId: string): Grade[] {
  const curriculum = curriculumIndex.get(curriculumId);
  if (!curriculum) return [];
  return curriculum.stages.flatMap((stage) => stage.grades);
}

export function lessonsOfSubject(subjectId: string): Lesson[] {
  const subject = subjectIndex.get(subjectId);
  if (!subject) return [];
  return subject.units.flatMap((unit) => unit.lessons);
}

/** The next lesson in the same subject, continuing into the following unit. */
export function nextLesson(lessonId: string): Lesson | undefined {
  const lesson = lessonIndex.get(lessonId);
  if (!lesson) return undefined;
  const ordered = lessonsOfSubject(lesson.subjectId);
  const position = ordered.findIndex((candidate) => candidate.id === lesson.id);
  return position === -1 ? undefined : ordered[position + 1];
}

export function previousLesson(lessonId: string): Lesson | undefined {
  const lesson = lessonIndex.get(lessonId);
  if (!lesson) return undefined;
  const ordered = lessonsOfSubject(lesson.subjectId);
  const position = ordered.findIndex((candidate) => candidate.id === lesson.id);
  return position <= 0 ? undefined : ordered[position - 1];
}

export type CatalogStats = {
  curricula: number;
  grades: number;
  subjects: number;
  units: number;
  lessons: number;
  authoredLessons: number;
};

export function catalogStats(): CatalogStats {
  let authored = 0;
  for (const lesson of lessonIndex.values()) if (lesson.authored) authored += 1;

  return {
    curricula: curriculumIndex.size,
    grades: gradeIndex.size,
    subjects: subjectIndex.size,
    units: unitIndex.size,
    lessons: lessonIndex.size,
    authoredLessons: authored,
  };
}
