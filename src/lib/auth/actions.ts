"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getPlan, isPlanId } from "@/lib/billing/plans";
import { EmailTakenError, createUser, findUserByEmail, startSubscription, updateUser } from "@/lib/db/repo";
import { getCurrentUser } from "./current";
import { hashPassword, verifyPassword } from "./password";
import { createSession, destroySession } from "./session";

export type FormState = { error?: string; ok?: boolean };

const loginSchema = z.object({
  email: z.string().trim().min(3).max(200),
  password: z.string().min(1).max(200),
});

export async function loginAction(_previous: FormState, formData: FormData): Promise<FormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: "required" };

  const user = await findUserByEmail(parsed.data.email);
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return { error: "invalid" };
  }

  await createSession(user.id);
  redirect(landingFor(user.role));
}

const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(200),
  password: z.string().min(8).max(200),
  role: z.enum(["student", "parent", "teacher"]),
  curriculumId: z.string().trim().max(40).optional(),
  gradeId: z.string().trim().max(60).optional(),
});

export async function registerAction(_previous: FormState, formData: FormData): Promise<FormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
    curriculumId: formData.get("curriculumId") || undefined,
    gradeId: formData.get("gradeId") || undefined,
  };

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    if (issue?.path[0] === "password") return { error: "short_password" };
    return { error: "required" };
  }

  try {
    const user = await createUser({
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash: await hashPassword(parsed.data.password),
      role: parsed.data.role,
      curriculumId: parsed.data.role === "student" ? parsed.data.curriculumId : undefined,
      gradeId: parsed.data.role === "student" ? parsed.data.gradeId : undefined,
    });
    await createSession(user.id);
    redirect(landingFor(user.role));
  } catch (error) {
    if (error instanceof EmailTakenError) return { error: "taken" };
    throw error;
  }
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/");
}

export async function subscribeAction(_previous: FormState, formData: FormData): Promise<FormState> {
  const user = await getCurrentUser();
  const planId = formData.get("planId");
  const interval = formData.get("interval");

  if (!user) return { error: "need_login" };
  if (!isPlanId(planId)) return { error: "required" };

  const plan = getPlan(planId);
  if (!plan) return { error: "required" };

  await startSubscription(user.id, plan.id, interval === "yearly" ? "yearly" : "monthly", plan.seats);
  revalidatePath("/pricing");
  revalidatePath("/learn");
  return { ok: true };
}

const enrolmentSchema = z.object({
  curriculumId: z.string().trim().min(1).max(40),
  gradeId: z.string().trim().min(1).max(60),
});

export async function updateEnrolmentAction(_previous: FormState, formData: FormData): Promise<FormState> {
  const user = await getCurrentUser();
  if (!user) return { error: "need_login" };

  const parsed = enrolmentSchema.safeParse({
    curriculumId: formData.get("curriculumId"),
    gradeId: formData.get("gradeId"),
  });
  if (!parsed.success) return { error: "required" };

  await updateUser(user.id, { curriculumId: parsed.data.curriculumId, gradeId: parsed.data.gradeId });
  revalidatePath("/learn");
  return { ok: true };
}

function landingFor(role: string): string {
  if (role === "parent") return "/parent";
  if (role === "teacher") return "/teacher";
  if (role === "admin") return "/admin";
  return "/learn";
}
