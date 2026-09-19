import { createHash } from "node:crypto";
import { getCurriculum, getGrade, getSubject, getUnit } from "@/lib/content";
import type { LessonProgress } from "@/lib/db/types";
import type { Localized } from "@/lib/i18n/config";

/**
 * Unit completion certificates, derived rather than stored.
 *
 * Nothing is written when a unit is finished: a certificate is a reading of the
 * progress rows a student already has, so it cannot drift from them. Award one
 * and the student would hold a certificate for a unit whose lessons could still
 * be reset; derive it and the two can never disagree.
 *
 * A unit is earned when every lesson in it is completed — not most of them. The
 * mastery figure is the mean of those lessons' scores, which is the number the
 * dashboards already show, so a certificate never flatters a student past what
 * their own subject page says.
 */

export type Certificate = {
  unitId: string;
  unit: Localized;
  subject: Localized;
  grade: Localized;
  curriculum: Localized;
  curriculumId: string;
  lessonCount: number;
  /** Mean lesson score across the unit, 0-100. */
  mastery: number;
  secondsSpent: number;
  /** When the last lesson of the unit was completed. */
  earnedAt: string;
  /** Printed on the sheet so a certificate can be checked against a record. */
  reference: string;
};

/**
 * A short, stable reference for one student's certificate in one unit.
 *
 * It is a hash rather than a counter so it can be recomputed anywhere from the
 * two ids, and it carries no personal data — the point is that the same pair
 * always prints the same code, and a different pair almost never collides.
 */
export function certificateReference(userId: string, unitId: string): string {
  const digest = createHash("sha256").update(`${userId}:${unitId}`).digest("hex");
  return `ES-${digest.slice(0, 4)}-${digest.slice(4, 8)}`.toUpperCase();
}

export function certificatesFor(userId: string, progress: LessonProgress[]): Certificate[] {
  const byUnit = new Map<string, LessonProgress[]>();
  for (const row of progress) {
    if (row.status !== "completed") continue;
    const rows = byUnit.get(row.unitId);
    if (rows) rows.push(row);
    else byUnit.set(row.unitId, [row]);
  }

  const earned: Certificate[] = [];

  for (const [unitId, rows] of byUnit) {
    const unit = getUnit(unitId);
    if (!unit || unit.lessons.length === 0) continue;

    // Every lesson, not merely as many rows as the unit has lessons: a lesson
    // could in principle be recorded twice, and a unit could gain one later.
    const done = new Set(rows.map((row) => row.lessonId));
    if (!unit.lessons.every((lesson) => done.has(lesson.id))) continue;

    const subject = getSubject(unit.subjectId);
    const grade = getGrade(unit.gradeId);
    const curriculum = getCurriculum(unit.curriculumId);
    if (!subject || !grade || !curriculum) continue;

    const scored = unit.lessons.map((lesson) => rows.find((row) => row.lessonId === lesson.id)!);
    const mastery = Math.round(scored.reduce((sum, row) => sum + row.score, 0) / scored.length);
    const secondsSpent = scored.reduce((sum, row) => sum + row.secondsSpent, 0);
    const earnedAt = scored
      .map((row) => row.completedAt ?? row.updatedAt)
      .sort()
      .at(-1)!;

    earned.push({
      unitId,
      unit: unit.title,
      subject: subject.title,
      grade: grade.title,
      curriculum: curriculum.title,
      curriculumId: curriculum.id,
      lessonCount: unit.lessons.length,
      mastery,
      secondsSpent,
      earnedAt,
      reference: certificateReference(userId, unitId),
    });
  }

  return earned.sort((a, b) => b.earnedAt.localeCompare(a.earnedAt));
}

/** One certificate, or undefined when this student has not earned that unit. */
export function certificateFor(
  userId: string,
  progress: LessonProgress[],
  unitId: string,
): Certificate | undefined {
  return certificatesFor(userId, progress).find((certificate) => certificate.unitId === unitId);
}
