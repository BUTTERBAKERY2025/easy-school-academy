import "server-only";
import { hashPassword } from "@/lib/auth/password";
import type { Database, LessonProgress, User } from "./types";

/**
 * Demo data so a fresh checkout has something to log into. Every account uses the
 * same password, printed on the login page.
 */
const DEMO_PASSWORD = "demo1234";

const daysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

const dayString = (days: number): string => daysAgo(days).slice(0, 10);

type SeedUser = Omit<User, "passwordHash" | "createdAt"> & { createdDaysAgo: number };

const seedUsers: SeedUser[] = [
  {
    id: "usr_demo_student",
    name: "سلمى أحمد",
    email: "student@easyschool.test",
    role: "student",
    curriculumId: "saudi",
    gradeId: "saudi-g4",
    parentId: "usr_demo_parent",
    xp: 420,
    streakDays: 5,
    lastActiveOn: dayString(0),
    createdDaysAgo: 40,
  },
  {
    id: "usr_demo_student2",
    name: "Omar Ahmed",
    email: "student2@easyschool.test",
    role: "student",
    curriculumId: "american",
    gradeId: "american-g4",
    parentId: "usr_demo_parent",
    xp: 180,
    streakDays: 2,
    lastActiveOn: dayString(1),
    createdDaysAgo: 40,
  },
  {
    id: "usr_demo_parent",
    name: "أحمد المطيري",
    email: "parent@easyschool.test",
    role: "parent",
    xp: 0,
    streakDays: 0,
    createdDaysAgo: 41,
  },
  {
    id: "usr_demo_teacher",
    name: "الأستاذة هدى",
    email: "teacher@easyschool.test",
    role: "teacher",
    teachingGradeIds: ["saudi-g4", "american-g4"],
    xp: 0,
    streakDays: 0,
    createdDaysAgo: 60,
  },
  {
    id: "usr_demo_admin",
    name: "easy school admin",
    email: "admin@easyschool.test",
    role: "admin",
    xp: 0,
    streakDays: 0,
    createdDaysAgo: 90,
  },
];

type SeedProgress = {
  userId: string;
  lessonId: string;
  status: "completed" | "in_progress";
  score: number;
  stepIndex: number;
  seconds: number;
  daysAgo: number;
};

/** Progress rows reference real lesson ids from the catalogue. */
const seedProgress: SeedProgress[] = [
  { userId: "usr_demo_student", lessonId: "saudi-g4-math-fractions-1", status: "completed", score: 88, stepIndex: 8, seconds: 1320, daysAgo: 1 },
  { userId: "usr_demo_student", lessonId: "saudi-g4-arabic-qiraa-1", status: "completed", score: 100, stepIndex: 7, seconds: 1080, daysAgo: 2 },
  { userId: "usr_demo_student", lessonId: "saudi-g4-social-watan-2", status: "in_progress", score: 60, stepIndex: 3, seconds: 420, daysAgo: 0 },
  { userId: "usr_demo_student", lessonId: "saudi-g4-math-number-1", status: "completed", score: 75, stepIndex: 5, seconds: 900, daysAgo: 4 },
  { userId: "usr_demo_student2", lessonId: "american-g4-math-fractions-1", status: "completed", score: 92, stepIndex: 10, seconds: 1500, daysAgo: 1 },
  { userId: "usr_demo_student2", lessonId: "american-g4-math-number-1", status: "in_progress", score: 40, stepIndex: 2, seconds: 300, daysAgo: 1 },
];

function splitLessonId(lessonId: string): { unitId: string; subjectId: string; gradeId: string; curriculumId: string } {
  // Lesson ids are `${curriculum}-g${ordinal}-${subject}-${strand}-${n}`.
  const parts = lessonId.split("-");
  return {
    unitId: parts.slice(0, 4).join("-"),
    subjectId: parts.slice(0, 3).join("-"),
    gradeId: parts.slice(0, 2).join("-"),
    curriculumId: parts[0] ?? "",
  };
}

export async function seedDatabase(db: Database): Promise<Database> {
  const passwordHash = await hashPassword(DEMO_PASSWORD);

  db.users = seedUsers.map(({ createdDaysAgo, ...user }) => ({
    ...user,
    passwordHash,
    createdAt: daysAgo(createdDaysAgo),
  }));

  db.progress = seedProgress.map((row, index): LessonProgress => {
    const ids = splitLessonId(row.lessonId);
    return {
      id: `prg_seed_${index}`,
      userId: row.userId,
      lessonId: row.lessonId,
      ...ids,
      status: row.status,
      stepIndex: row.stepIndex,
      score: row.score,
      secondsSpent: row.seconds,
      startedAt: daysAgo(row.daysAgo),
      updatedAt: daysAgo(row.daysAgo),
      completedAt: row.status === "completed" ? daysAgo(row.daysAgo) : undefined,
    };
  });

  db.subscriptions = [
    {
      id: "sub_seed_family",
      userId: "usr_demo_parent",
      planId: "family",
      interval: "yearly",
      status: "active",
      seats: 4,
      startedAt: daysAgo(35),
      currentPeriodEnd: new Date(Date.now() + 330 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  db.activity = seedProgress
    .filter((row) => row.status === "completed")
    .map((row, index) => ({
      id: `act_seed_${index}`,
      userId: row.userId,
      kind: "lesson_completed" as const,
      lessonId: row.lessonId,
      xp: Math.round(row.score / 2) + 20,
      createdAt: daysAgo(row.daysAgo),
    }));

  db.assignments = [
    {
      id: "asg_seed_1",
      teacherId: "usr_demo_teacher",
      gradeId: "saudi-g4",
      subjectId: "saudi-g4-math",
      lessonIds: ["saudi-g4-math-fractions-1", "saudi-g4-math-fractions-2"],
      dueOn: dayString(-7),
      createdAt: daysAgo(3),
    },
  ];

  return db;
}
