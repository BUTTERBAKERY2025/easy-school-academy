/**
 * The site's icon set, drawn inline.
 *
 * Every glyph is line art on a 48x48 grid over a translucent rounded tile, so a
 * single definition works on any surface: the tile is `currentColor` at low
 * opacity and the glyph is `currentColor` at full strength, and both follow the
 * tint class rather than a baked-in colour. That is why these replaced the PNG
 * set — a raster icon carries its own background and turned into a bright white
 * square in dark mode.
 */

export type IconName =
  /* feature grid */
  | "textbook"
  | "interactive"
  | "bilingual"
  | "mastery"
  | "parent"
  | "pacing"
  /* catalogue stats */
  | "curricula"
  | "grades"
  | "subjects"
  | "lessons"
  /* the seven question types */
  | "mcq"
  | "multi"
  | "truefalse"
  | "fill"
  | "match"
  | "order"
  | "sort"
  /* accents */
  | "gift"
  | "streak";

export type IconTint = "brand" | "sun" | "mint" | "sky" | "coral" | "berry";

/**
 * Light mode takes the 500 shade; dark mode lifts to 300, which keeps the glyph
 * legible against the deep violet surface without a second icon set.
 */
const TINTS: Record<IconTint, string> = {
  brand: "text-brand-500 dark:text-brand-300",
  sun: "text-sun-600 dark:text-sun-300",
  mint: "text-mint-600 dark:text-mint-300",
  sky: "text-sky-600 dark:text-sky-300",
  coral: "text-coral-500 dark:text-coral-300",
  berry: "text-berry-500 dark:text-berry-300",
};

export function Icon({
  name,
  tint = "brand",
  className = "size-12",
  tile = true,
}: {
  name: IconName;
  tint?: IconTint;
  className?: string;
  /** Drop the backdrop where the icon already sits on a tinted surface, such as a chip. */
  tile?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={`${TINTS[tint]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {tile ? <rect width="48" height="48" rx="14" fill="currentColor" opacity="0.13" /> : null}
      <g
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {GLYPHS[name]}
      </g>
    </svg>
  );
}

const GLYPHS: Record<IconName, React.ReactNode> = {
  /* An open book: the course the lessons follow. */
  textbook: (
    <>
      <path d="M24 17c-2.4-1.9-5.6-2.9-9.5-2.9V31c3.9 0 7.1 1 9.5 2.9" />
      <path d="M24 17c2.4-1.9 5.6-2.9 9.5-2.9V31c-3.9 0-7.1 1-9.5 2.9" />
      <path d="M24 17v16.9" />
    </>
  ),

  /* A gamepad: lessons are played, not watched. */
  interactive: (
    <>
      <rect x="10" y="18" width="28" height="15" rx="7.5" />
      <path d="M17 22.5v6M14 25.5h6" />
      <circle cx="30.5" cy="23.5" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="33.5" cy="28" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),

  /* Two speech bubbles: the same lesson in either language. */
  bilingual: (
    <>
      <path d="M12 16h14a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-7l-5 4v-4a3 3 0 0 1-2-3v-6a3 3 0 0 1 3-3Z" />
      <path d="M33 21h3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3v4l-5-4h-3" />
    </>
  ),

  /* A passed checkpoint. */
  mastery: (
    <>
      <circle cx="24" cy="24" r="11" />
      <path d="M18.5 24.2l3.8 3.8L30 20.3" />
    </>
  ),

  /* A report with bars: what the parent dashboard shows. */
  parent: (
    <>
      <rect x="12" y="13" width="24" height="22" rx="5" />
      <path d="M18 29v-4M24 29v-8M30 29v-6" />
    </>
  ),

  /* A calendar: the plan spread across the school year. */
  pacing: (
    <>
      <rect x="12" y="15" width="24" height="21" rx="5" />
      <path d="M12 21.5h24M18 12v5M30 12v5" />
      <circle cx="20" cy="28" r="1.7" fill="currentColor" stroke="none" />
    </>
  ),

  /* A globe: the three curricula. */
  curricula: (
    <>
      <circle cx="24" cy="24" r="11" />
      <path d="M13.5 20.5h21M13.5 27.5h21" />
      <path d="M24 13c3 3.3 4.5 7 4.5 11S27 31.7 24 35c-3-3.3-4.5-7-4.5-11S21 16.3 24 13Z" />
    </>
  ),

  /* A backpack: the grades. The full-width flap keeps it from reading as a padlock. */
  grades: (
    <>
      <path d="M19.5 17v-1a4.5 4.5 0 0 1 9 0v1" />
      <rect x="12" y="17" width="24" height="19" rx="6" />
      <path d="M12.5 25.5h23" />
      <rect x="20" y="28.5" width="8" height="7.5" rx="2.4" />
    </>
  ),

  /* Stacked books: the subjects. */
  subjects: (
    <>
      <rect x="13" y="14" width="22" height="6.5" rx="2.5" />
      <rect x="13" y="20.5" width="22" height="6.5" rx="2.5" />
      <rect x="13" y="27" width="22" height="6.5" rx="2.5" />
    </>
  ),

  /* A sparkle: the lesson count. */
  lessons: (
    <>
      <path d="M22 13.5l2.4 6.1 6.1 2.4-6.1 2.4-2.4 6.1-2.4-6.1-6.1-2.4 6.1-2.4 2.4-6.1Z" />
      <path d="M32.5 28l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2 1.2-3Z" />
    </>
  ),

  /* Multiple choice: one radio filled. */
  mcq: (
    <>
      <circle cx="17" cy="18" r="4" />
      <circle cx="17" cy="30" r="4" />
      <circle cx="17" cy="30" r="1.8" fill="currentColor" stroke="none" />
      <path d="M25 18h9M25 30h9" />
    </>
  ),

  /* Multiple answers: two boxes ticked. */
  multi: (
    <>
      <rect x="13" y="14" width="9" height="9" rx="3" />
      <path d="M15.5 18.5l2 2 3.5-3.7" />
      <rect x="13" y="26" width="9" height="9" rx="3" />
      <path d="M15.5 30.5l2 2 3.5-3.7" />
      <path d="M27 18.5h8M27 30.5h8" />
    </>
  ),

  /* True or false: a tick against a cross. */
  truefalse: (
    <>
      <path d="M12.5 24.5l3 3 5.5-6" />
      <path d="M28 20.5l8 8M36 20.5l-8 8" />
    </>
  ),

  /* Fill the blank: a gap waiting for a word, on a ruled line. */
  fill: (
    <>
      <path d="M12 19h6M31 19h5" />
      <rect x="21" y="14" width="7" height="10" rx="2" strokeDasharray="3 2.6" />
      <path d="M12 31h24" />
    </>
  ),

  /* Matching: pairs joined across a gap. */
  match: (
    <>
      <circle cx="16" cy="18" r="3" />
      <circle cx="16" cy="30" r="3" />
      <circle cx="32" cy="18" r="3" />
      <circle cx="32" cy="30" r="3" />
      <path d="M19 18h10M19 30c4 0 6-12 10-12" />
    </>
  ),

  /* Ordering: an arrow that puts a list in sequence. */
  order: (
    <>
      <path d="M14 20l4.5-4.5L23 20" />
      <path d="M18.5 15.5v17" />
      <path d="M28 18h8M28 24h6M28 30h4" />
    </>
  ),

  /* Sorting: a square and a circle dropped into their own buckets. */
  sort: (
    <>
      <path d="M12 23h10l-1.4 11h-7.2L12 23Z" />
      <path d="M26 23h10l-1.4 11h-7.2L26 23Z" />
      <rect x="14" y="13" width="6" height="6" rx="1.6" />
      <circle cx="31" cy="16" r="3.2" />
    </>
  ),

  /* A wrapped gift: the free first lesson. */
  gift: (
    <>
      <rect x="12" y="20" width="24" height="15" rx="4" />
      <path d="M12 25.5h24M24 20v15" />
      <path d="M24 20c-1-4-3.5-6-6-5s-1.5 5 6 5Zm0 0c1-4 3.5-6 6-5s1.5 5-6 5Z" />
    </>
  ),

  /* A flame: the running streak. */
  streak: (
    <>
      <path d="M24 12c5.5 5 8.5 9 8.5 13.5a8.5 8.5 0 0 1-17 0C15.5 21 18.5 17 24 12Z" />
      <path d="M24 23c2.2 2.2 3.3 3.9 3.3 5.4a3.3 3.3 0 0 1-6.6 0c0-1.5 1.1-3.2 3.3-5.4Z" />
    </>
  ),
};
