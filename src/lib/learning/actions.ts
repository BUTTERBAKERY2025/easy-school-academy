"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getLesson, getUnit } from "@/lib/content";
import { getCurrentUser } from "@/lib/auth/current";
import { saveProgress } from "@/lib/db/repo";
import { REVIEW_PASS } from "./unit-review";

const schema = z.object({
  lessonId: z.string().min(1).max(120),
  stepIndex: z.number().int().min(0).max(500),
  score: z.number().int().min(0).max(100),
  secondsSpent: z.number().int().min(0).max(60 * 60 * 6),
  completed: z.boolean(),
});

export type SaveProgressInput = z.infer<typeof schema>;

/** Called by the lesson player as the student advances and when they finish. */
export async function saveLessonProgressAction(input: SaveProgressInput): Promise<{ saved: boolean }> {
  const user = await getCurrentUser();
  if (!user) return { saved: false };

  const parsed = schema.safeParse(input);
  if (!parsed.success) return { saved: false };

  const lesson = getLesson(parsed.data.lessonId);
  if (!lesson) return { saved: false };

  await saveProgress({
    userId: user.id,
    lessonId: lesson.id,
    unitId: lesson.unitId,
    subjectId: lesson.subjectId,
    gradeId: lesson.gradeId,
    curriculumId: lesson.curriculumId,
    stepIndex: parsed.data.stepIndex,
    score: parsed.data.score,
    secondsSpent: parsed.data.secondsSpent,
    completed: parsed.data.completed,
  });

  if (parsed.data.completed) {
    revalidatePath("/learn");
    revalidatePath(`/learn/lesson/${lesson.id}`);
  }
  return { saved: true };
}

/* -------------------------------------------------------------- unit review */

const reviewSchema = z.object({
  unitId: z.string().min(1).max(120),
  secondsSpent: z.number().int().min(0).max(60 * 60 * 2),
  results: z
    .array(z.object({ lessonId: z.string().min(1).max(120), score: z.number().int().min(0).max(100) }))
    .max(40),
});

export type SaveUnitReviewInput = z.infer<typeof reviewSchema>;

/**
 * Records the end-of-unit review.
 *
 * Only the lessons the student actually held are written back, and that rule
 * lives here rather than in the browser. It matters more than it looks: a saved
 * row moves `updatedAt` to now, which is what tells the learner model the memory
 * has been refreshed. Writing a failed lesson would therefore mark it as revised
 * while the student still cannot do it — and since the stores keep the better of
 * the two scores, the failure would leave no trace at all. Leaving it untouched
 * is the honest outcome: it stays due, and the plan offers it again tomorrow.
 */
export async function saveUnitReviewAction(
  input: SaveUnitReviewInput,
): Promise<{ saved: boolean; refreshed: string[] }> {
  const user = await getCurrentUser();
  if (!user) return { saved: false, refreshed: [] };

  const parsed = reviewSchema.safeParse(input);
  if (!parsed.success) return { saved: false, refreshed: [] };

  const unit = getUnit(parsed.data.unitId);
  if (!unit) return { saved: false, refreshed: [] };

  const passed = parsed.data.results.filter((result) => result.score >= REVIEW_PASS);
  const share = passed.length ? Math.round(parsed.data.secondsSpent / passed.length) : 0;
  const refreshed: string[] = [];

  for (const result of passed) {
    const lesson = unit.lessons.find((candidate) => candidate.id === result.lessonId);
    if (!lesson) continue;

    await saveProgress({
      userId: user.id,
      lessonId: lesson.id,
      unitId: lesson.unitId,
      subjectId: lesson.subjectId,
      gradeId: lesson.gradeId,
      curriculumId: lesson.curriculumId,
      stepIndex: Math.max(0, lesson.blocks.length - 1),
      score: result.score,
      secondsSpent: share,
      completed: true,
    });
    refreshed.push(lesson.id);
  }

  revalidatePath("/learn");
  revalidatePath(`/books/${unit.subjectId}`);
  revalidatePath(`/books/${unit.subjectId}/${unit.id}`);
  return { saved: true, refreshed };
}
