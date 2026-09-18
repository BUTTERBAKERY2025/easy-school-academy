import "server-only";
import { getGrade, getLesson, getSubject, lessonsOfSubject } from "@/lib/content";
import type { Lesson, Subject } from "@/lib/content/types";
import type { LessonProgress, User } from "@/lib/db/types";
import { progressOf } from "@/lib/db/repo";

export type SubjectSummary = {
  subject: Subject;
  total: number;
  completed: number;
  mastery: number;
  nextLesson?: Lesson;
};

export type LearnerSummary = {
  gradeId?: string;
  subjects: SubjectSummary[];
  completedCount: number;
  minutesSpent: number;
  averageScore: number;
  /** Lessons to pick up first: in-progress ones, then the next unstarted lesson. */
  continueWith: Lesson[];
  progress: LessonProgress[];
};

export async function summariseLearner(user: User): Promise<LearnerSummary> {
  const progress = await progressOf(user.id);
  const byLesson = new Map(progress.map((row) => [row.lessonId, row]));
  const grade = user.gradeId ? getGrade(user.gradeId) : undefined;

  const subjects: SubjectSummary[] = (grade?.subjects ?? []).map((subject) => {
    const lessons = lessonsOfSubject(subject.id);
    const completedLessons = lessons.filter((lesson) => byLesson.get(lesson.id)?.status === "completed");
    const scores = completedLessons.map((lesson) => byLesson.get(lesson.id)?.score ?? 0);

    return {
      subject,
      total: lessons.length,
      completed: completedLessons.length,
      mastery: scores.length ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0,
      nextLesson: lessons.find((lesson) => byLesson.get(lesson.id)?.status !== "completed"),
    };
  });

  const completedRows = progress.filter((row) => row.status === "completed");
  const inProgress = progress
    .filter((row) => row.status === "in_progress")
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .map((row) => getLesson(row.lessonId))
    .filter((lesson): lesson is Lesson => Boolean(lesson));

  // Fill the "continue" rail with the next unstarted lesson from each subject.
  const upcoming = subjects
    .map((entry) => entry.nextLesson)
    .filter((lesson): lesson is Lesson => Boolean(lesson) && !inProgress.some((row) => row.id === lesson?.id));

  return {
    gradeId: user.gradeId,
    subjects,
    completedCount: completedRows.length,
    minutesSpent: Math.round(progress.reduce((sum, row) => sum + row.secondsSpent, 0) / 60),
    averageScore: completedRows.length
      ? Math.round(completedRows.reduce((sum, row) => sum + row.score, 0) / completedRows.length)
      : 0,
    continueWith: [...inProgress, ...upcoming].slice(0, 4),
    progress,
  };
}

export function lessonBreadcrumb(lesson: Lesson): { subjectTitle?: Subject["title"]; glyph?: string; theme?: Subject["theme"] } {
  const subject = getSubject(lesson.subjectId);
  return { subjectTitle: subject?.title, glyph: subject?.glyph, theme: subject?.theme };
}
