"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getLesson } from "@/lib/content";
import { getCurrentUser } from "@/lib/auth/current";
import { saveProgress } from "@/lib/db/repo";

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
