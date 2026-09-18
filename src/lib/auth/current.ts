import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { effectiveSubscription, findUserById } from "@/lib/db/repo";
import type { Role, Subscription, User } from "@/lib/db/types";
import { readSession } from "./session";

/** Deduplicated per request so several components can ask without re-reading. */
export const getCurrentUser = cache(async (): Promise<User | null> => {
  const session = await readSession();
  if (!session) return null;
  return (await findUserById(session.userId)) ?? null;
});

export type Viewer = {
  user: User;
  subscription?: Subscription;
  /** True when the viewer (or the parent covering them) has an active plan. */
  hasAccess: boolean;
};

export const getViewer = cache(async (): Promise<Viewer | null> => {
  const user = await getCurrentUser();
  if (!user) return null;
  const subscription = await effectiveSubscription(user);
  return { user, subscription, hasAccess: Boolean(subscription) };
});

export async function requireUser(redirectTo = "/login"): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect(redirectTo);
  return user;
}

export async function requireRole(roles: Role[], redirectTo = "/login"): Promise<User> {
  const user = await requireUser(redirectTo);
  if (!roles.includes(user.role)) redirect("/learn");
  return user;
}
