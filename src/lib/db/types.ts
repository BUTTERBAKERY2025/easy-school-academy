export type Role = "student" | "parent" | "teacher" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  /** Students only: the curriculum and grade they are enrolled in. */
  curriculumId?: string;
  gradeId?: string;
  /** Students only: the parent account following them. */
  parentId?: string;
  /** Teachers only: the grades they teach. */
  teachingGradeIds?: string[];
  xp: number;
  streakDays: number;
  lastActiveOn?: string;
  createdAt: string;
};

export type PublicUser = Omit<User, "passwordHash">;

export type ProgressStatus = "in_progress" | "completed";

export type LessonProgress = {
  id: string;
  userId: string;
  lessonId: string;
  unitId: string;
  subjectId: string;
  gradeId: string;
  curriculumId: string;
  status: ProgressStatus;
  /** Index of the furthest step the student reached inside the lesson player. */
  stepIndex: number;
  /** Percentage of checkpoint questions answered correctly, 0-100. */
  score: number;
  secondsSpent: number;
  startedAt: string;
  updatedAt: string;
  completedAt?: string;
};

export type BillingInterval = "monthly" | "yearly";

export type Subscription = {
  id: string;
  userId: string;
  planId: string;
  interval: BillingInterval;
  status: "active" | "cancelled";
  seats: number;
  startedAt: string;
  currentPeriodEnd: string;
  cancelledAt?: string;
};

export type ActivityKind = "lesson_started" | "lesson_completed" | "badge_earned" | "subscribed";

export type Activity = {
  id: string;
  userId: string;
  kind: ActivityKind;
  lessonId?: string;
  badgeId?: string;
  xp: number;
  createdAt: string;
};

export type Assignment = {
  id: string;
  teacherId: string;
  gradeId: string;
  subjectId: string;
  lessonIds: string[];
  dueOn: string;
  createdAt: string;
};

export type Database = {
  version: number;
  users: User[];
  progress: LessonProgress[];
  subscriptions: Subscription[];
  activity: Activity[];
  assignments: Assignment[];
};

export const emptyDatabase = (): Database => ({
  version: 1,
  users: [],
  progress: [],
  subscriptions: [],
  activity: [],
  assignments: [],
});
