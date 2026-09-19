import "server-only";
import { usingPostgres } from "./sql";
import { jsonStore } from "./stores/json";
import { postgresStore } from "./stores/postgres";
import type { Store } from "./contract";
import type { Subscription, User } from "./types";

/**
 * The only door to persistence.
 *
 * Which store answers is decided once, by whether DATABASE_URL is set: Postgres
 * when it is, the JSON file when it is not. Callers see the same functions
 * either way, which is what makes the choice a deployment setting rather than a
 * change to the app.
 */

const store: Store = usingPostgres() ? postgresStore : jsonStore;

/** Named so a misconfigured deployment is visible in the logs at boot. */
export const backend = (): "postgres" | "json" => (usingPostgres() ? "postgres" : "json");

export { EmailTakenError } from "./contract";
export type { NewUser, ProgressInput } from "./contract";

/* ------------------------------------------------------------------- users */

export const findUserByEmail = (email: string) => store.findUserByEmail(email);
export const findUserById = (id: string) => store.findUserById(id);
export const listUsers = () => store.listUsers();
export const listChildren = (parentId: string) => store.listChildren(parentId);
export const createUser: Store["createUser"] = (input) => store.createUser(input);
export const updateUser: Store["updateUser"] = (id, patch) => store.updateUser(id, patch);

/* ----------------------------------------------------------- subscriptions */

export const subscriptionOf = (userId: string) => store.subscriptionOf(userId);
export const startSubscription: Store["startSubscription"] = (userId, planId, interval, seats) =>
  store.startSubscription(userId, planId, interval, seats);
export const cancelSubscription = (userId: string) => store.cancelSubscription(userId);
export const listSubscriptions = () => store.listSubscriptions();
export const listActiveSubscriptions = () => store.listActiveSubscriptions();

/**
 * A student is covered by their own subscription or by the parent account that
 * follows them, which is how the family plan works.
 */
export async function effectiveSubscription(user: User): Promise<Subscription | undefined> {
  const own = await store.subscriptionOf(user.id);
  if (own) return own;
  if (!user.parentId) return undefined;
  return store.subscriptionOf(user.parentId);
}

/* ---------------------------------------------------------------- progress */

export const progressOf = (userId: string) => store.progressOf(userId);
export const progressForLesson = (userId: string, lessonId: string) =>
  store.progressForLesson(userId, lessonId);
export const saveProgress: Store["saveProgress"] = (input) => store.saveProgress(input);
export const allProgress = () => store.allProgress();

/* ---------------------------------------------------------------- activity */

export const recentActivity = (userId: string, limit = 8) => store.recentActivity(userId, limit);
export const logActivity: Store["logActivity"] = (userId, kind, xp = 0, lessonId) =>
  store.logActivity(userId, kind, xp, lessonId);

/* ------------------------------------------------------------- assignments */

export const assignmentsFor = (gradeId: string) => store.assignmentsFor(gradeId);
export const assignmentsByTeacher = (teacherId: string) => store.assignmentsByTeacher(teacherId);
export const studentsInGrades = (gradeIds: string[]) => store.studentsInGrades(gradeIds);
