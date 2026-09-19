import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getI18n } from "@/lib/i18n/server";
import { getGrade } from "@/lib/content";
import { getViewer } from "@/lib/auth/current";
import { progressOf } from "@/lib/db/repo";
import { subjectState } from "@/lib/learning/model";
import { IdentityCard } from "@/components/learn/identity";
import { BookShelf } from "@/components/learn/bookshelf";
import { EnrolmentPicker } from "@/components/enrolment";

export const metadata: Metadata = { title: "My books" };

/** Every book for the student's own year, on one shelf. */
export default async function BooksPage() {
  const viewer = await getViewer();
  if (!viewer) redirect("/login");

  const { d } = await getI18n();
  const grade = viewer.user.gradeId ? getGrade(viewer.user.gradeId) : undefined;

  if (!grade) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-2xl font-bold">{d.books.navTitle}</h1>
        <p className="mt-2 text-muted">{d.books.noBooks}</p>
        <div className="card mt-6 p-6">
          <EnrolmentPicker />
        </div>
      </div>
    );
  }

  const now = new Date();
  const progress = await progressOf(viewer.user.id);
  const rows = new Map(progress.map((row) => [row.lessonId, row]));
  const subjects = grade.subjects.map((subject) => subjectState(subject, rows, now));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <IdentityCard user={viewer.user} />
      <div className="mt-10">
        <BookShelf subjects={subjects} />
      </div>
    </div>
  );
}
