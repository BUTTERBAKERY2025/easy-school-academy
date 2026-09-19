import { permanentRedirect } from "next/navigation";

/**
 * A subject and its course book are the same thing under two names, and the book
 * is the one a student recognises — so this address keeps working and hands over
 * to it rather than maintaining a second page of the same contents.
 */
export default async function SubjectPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = await params;
  permanentRedirect(`/books/${subjectId}`);
}
