"use client";

/**
 * Printing is the download.
 *
 * Every browser's print dialogue can save to PDF, so the certificate is made
 * printable rather than generated server-side as a file: no PDF library ships,
 * the sheet stays selectable text at any size, and the student gets the same
 * page they were looking at.
 */
export function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-coral px-6 py-2.5">
      {label}
    </button>
  );
}
