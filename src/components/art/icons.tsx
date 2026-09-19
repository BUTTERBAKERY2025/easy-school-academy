import type { SubjectTheme } from "@/lib/content/types";

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
  | "streak"
  /* school subjects — one per glyph the catalogue uses */
  | "maths"
  | "science"
  | "language"
  | "social"
  | "computing"
  | "art"
  | "history"
  | "islamic"
  | "arabic"
  | "english";

export type IconTint = "brand" | "sun" | "mint" | "sky" | "coral" | "berry" | "inherit";

/**
 * Light mode takes the 500 shade; dark mode lifts to 300, which keeps the glyph
 * legible against the deep violet surface without a second icon set.
 */
const TINTS: Record<IconTint, string> = {
  /** Take the colour of whatever the icon sits in — a book cover, a dark panel. */
  inherit: "",
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

  /* Mathematics: a set square over a protractor arc. */
  maths: (
    <>
      <path d="M13 34h22L13 14Z" />
      <path d="M13 27h6M20 34v-5" />
    </>
  ),

  /* Science: a conical flask. */
  science: (
    <>
      <path d="M20 12v9.5L13.4 33a3.2 3.2 0 0 0 2.8 4.8h15.6a3.2 3.2 0 0 0 2.8-4.8L28 21.5V12" />
      <path d="M17.5 12h13" />
      <circle cx="22" cy="31" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="27" cy="34" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),

  /* Language arts: an open book with a ribbon. */
  language: (
    <>
      <path d="M11 15.5c4.4-.9 8.7-.1 12 2.4v15c-3.3-2.5-7.6-3.3-12-2.4v-15Z" />
      <path d="M37 15.5c-4.4-.9-8.7-.1-12 2.4v15c3.3-2.5 7.6-3.3 12-2.4v-15Z" />
      <path d="M30 15v9l3-2 3 2" />
    </>
  ),

  /* Social studies: a folded map. */
  social: (
    <>
      <path d="M11 17.5 20 14v17l-9 3.5v-17Z" />
      <path d="M20 14l8 3.5v17L20 31" />
      <path d="M28 17.5 37 14v17l-9 3.5" />
    </>
  ),

  /* Computing: a laptop. */
  computing: (
    <>
      <rect x="13" y="14" width="22" height="15" rx="3" />
      <path d="M10 33.5h28" />
      <path d="M21 21.5l-2.5 2.5 2.5 2.5M27 21.5l2.5 2.5-2.5 2.5" />
    </>
  ),

  /* Art: a palette. */
  art: (
    <>
      <path d="M24 12c7.7 0 14 5.4 14 12 0 3.6-3 5.5-6 5.5h-2.6c-1.9 0-3.4 1.5-3.4 3.4 0 .8.3 1.5.3 2.3 0 1.6-1.3 2.8-2.9 2.8-7.4 0-13.4-6.3-13.4-14S16.3 12 24 12Z" />
      <circle cx="18" cy="21" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="24" cy="18.5" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="30" cy="21" r="1.8" fill="currentColor" stroke="none" />
    </>
  ),

  /* History: a classical column. */
  history: (
    <>
      <path d="M11 16h26M13 36h22" />
      <path d="M17 16v20M24 16v20M31 16v20" />
    </>
  ),

  /* Islamic studies: a dome between two minarets. */
  islamic: (
    <>
      <path d="M17 36V25c0-4.4 3.1-8 7-8s7 3.6 7 8v11" />
      <path d="M24 17v-3" />
      <path d="M12 36V22M36 36V22" />
      <path d="M12 22c0-1.7.9-3 .9-3s.9 1.3.9 3M35.1 22c0-1.7.9-3 .9-3s.9 1.3.9 3" />
      <path d="M10 36h28" />
    </>
  ),

  /* Arabic: a reed pen over the line it writes. */
  arabic: (
    <>
      <path d="M32 12.5 35.5 16 20 31.5l-5.5 2 2-5.5L32 12.5Z" />
      <path d="M12 37c4-2.5 8-2.5 12 0s8 2.5 12 0" />
    </>
  ),

  /* English as a subject: the letters it teaches. */
  english: (
    <>
      <path d="M13 31 19 17l6 14M15.2 26.5h7.6" />
      <path d="M35 24.5a4.5 4.5 0 1 0 0 6.5V21" />
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

/**
 * The drawn icon for a subject.
 *
 * The catalogue names each subject with an emoji, which is the one glyph in the
 * data that also has to be a picture on screen. Rather than rewrite the topic
 * banks, the emoji is looked up here — so the data keeps its compact form and
 * the page still draws in the site's own hand.
 *
 * A subject whose emoji is not listed falls back to showing it, so adding one to
 * the catalogue can never leave a blank square.
 */
const SUBJECT_ICONS: Record<string, IconName> = {
  "\u{1F4D0}": "maths",
  "\u{1F52C}": "science",
  "\u{1F4DA}": "language",
  "\u{1F5FA}": "social",
  "\u{1F4BB}": "computing",
  "\u{1F3A8}": "art",
  "\u{1F3F0}": "history",
  "\u{1F54C}": "islamic",
  "\u{2712}": "arabic",
  "\u{1F524}": "english",
};

/**
 * `ink` is the one subject theme with no icon tint of its own — it is the
 * neutral used for subjects that take the page's own colour — so it borrows the
 * brand hue rather than adding a sixth tint nobody else uses.
 */
const TINT_FOR_THEME: Record<SubjectTheme, IconTint> = {
  brand: "brand",
  sun: "sun",
  mint: "mint",
  berry: "berry",
  ink: "brand",
};

export function SubjectIcon({
  glyph,
  theme,
  tint,
  className = "size-12",
}: {
  glyph: string;
  /** The subject's own theme, so the glyph matches the tile it sits on. */
  theme?: SubjectTheme;
  /** Overrides the theme — `inherit` lets a coloured surface set the glyph. */
  tint?: IconTint;
  className?: string;
}) {
  // Emoji are written with a trailing variation selector as often as not, and
  // the two spellings must find the same icon.
  const name = SUBJECT_ICONS[glyph.replace(/\uFE0F/g, "")];
  if (!name) {
    return (
      <span aria-hidden className={className}>
        {glyph}
      </span>
    );
  }
  return (
    <Icon
      name={name}
      tint={tint ?? (theme ? TINT_FOR_THEME[theme] : "brand")}
      className={className}
      tile={false}
    />
  );
}
