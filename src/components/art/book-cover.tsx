import type { Book } from "@/lib/content/books";
import type { SubjectTheme } from "@/lib/content/types";
import { t, type Locale } from "@/lib/i18n/config";
import { SubjectIcon } from "./icons";

/**
 * A book cover, drawn rather than scanned.
 *
 * No publisher's artwork appears anywhere in this repository, so every cover is
 * built from what the catalogue already knows: the subject's colour, its icon,
 * the framework it follows and the year it is for. That also means a new grade
 * or a new subject arrives with a cover already, and light and dark mode need no
 * second set of images.
 *
 * Laid out in HTML rather than SVG because the titles are real sentences in two
 * scripts — wrapping Arabic inside an SVG would mean measuring text by hand.
 */

/** Deep on the spine, lighter at the fore-edge: how a printed cover catches light. */
const COVER: Record<SubjectTheme, { from: string; to: string }> = {
  brand: { from: "#241553", to: "#5a34e6" },
  sun: { from: "#4c250a", to: "#d98103" },
  mint: { from: "#07352b", to: "#0a946d" },
  berry: { from: "#5c1330", to: "#ed3d73" },
  ink: { from: "#140f2b", to: "#52458c" },
};

export function BookCover({
  book,
  locale,
  className = "w-40",
}: {
  book: Book;
  locale: Locale;
  className?: string;
}) {
  const { from, to } = COVER[book.theme];

  return (
    <div
      // Sized in container units, so one cover reads correctly at the width of a
      // thumbnail on the shelf and at full size on the book's own page.
      className={`@container relative aspect-[3/4] shrink-0 overflow-hidden rounded-e-xl rounded-s-sm shadow-xl ring-1 ring-black/10 ${className}`}
      style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 115%)` }}
    >
      {/* The binding, and the thin catch of light beside it. */}
      <div className="absolute inset-y-0 start-0 w-[7%] bg-black/30" aria-hidden />
      <div className="absolute inset-y-0 start-[7%] w-px bg-white/25" aria-hidden />
      {/* The cut page edges on the opposite side. */}
      <div className="absolute inset-y-[3%] end-0 w-[2%] rounded-e-xl bg-white/70" aria-hidden />

      {/* The subject icon, sunk into the board like a blind emboss. */}
      <div className="absolute bottom-[-6%] end-[-4%] w-[55%] text-white/15" aria-hidden>
        <SubjectIcon glyph={book.glyph} tint="inherit" className="w-full" />
      </div>

      <div className="relative flex h-full flex-col p-[8%] ps-[12%] text-white">
        <p
          className="font-semibold uppercase leading-tight tracking-wide text-white/70"
          style={{ fontSize: "5.5cqw" }}
        >
          {t(book.boardShort, locale)}
        </p>
        <p className="mt-auto font-extrabold leading-tight drop-shadow-sm" style={{ fontSize: "11cqw" }}>
          {t(book.title, locale)}
        </p>
        <p
          className="mt-[4%] inline-flex w-fit rounded-full bg-white/20 px-[4%] py-[1.5%] font-semibold backdrop-blur-sm"
          style={{ fontSize: "6cqw" }}
        >
          {t(book.levelShort, locale)}
        </p>
      </div>
    </div>
  );
}
