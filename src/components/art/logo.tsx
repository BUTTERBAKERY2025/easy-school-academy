/**
 * The academy's mark: an open book knocked out of a filled disc.
 *
 * Drawn rather than placed as an image so it stays crisp at the 20px it renders
 * in the header and the 512px an installed icon asks for, and so the disc takes
 * the surrounding colour — the header carries it in brand violet, the footer in
 * white on a dark ground, and the favicon on its own navy tile.
 */

export function LogoMark({
  className = "size-9",
  disc = "currentColor",
  page = "var(--surface-raised)",
}: {
  className?: string;
  /** The filled circle behind the book. */
  disc?: string;
  /** The book itself, knocked out of the disc. */
  page?: string;
}) {
  return (
    <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="24" cy="24" r="24" fill={disc} />
      <g fill={page}>
        {/* left leaf — the inner edge leans in so the two meet in a narrow spine */}
        <path d="M10.6 16.4c4.6-.8 8.9 0 12.1 2.6l.6 14.6c-3.3-2.6-7.8-3.4-12.7-2.5V16.4Z" />
        {/* right leaf */}
        <path d="M37.4 16.4c-4.6-.8-8.9 0-12.1 2.6l-.6 14.6c3.3-2.6 7.8-3.4 12.7-2.5V16.4Z" />
        {/* the page block each leaf rests on */}
        <path d="M10.6 32.4c4.9-.9 9.4-.1 12.7 2.5-3.3-1.4-7.8-1.8-12.7-1.2v-1.3Z" />
        <path d="M37.4 32.4c-4.9-.9-9.4-.1-12.7 2.5 3.3-1.4 7.8-1.8 12.7-1.2v-1.3Z" />
      </g>
    </svg>
  );
}

/** The mark beside the wordmark, as the header and footer show it. */
export function Logo({
  className = "",
  markClassName = "size-9",
  wordmark = true,
  name,
}: {
  className?: string;
  markClassName?: string;
  wordmark?: boolean;
  name: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName} />
      {wordmark ? <span className="font-display text-lg font-extrabold">{name}</span> : null}
    </span>
  );
}
