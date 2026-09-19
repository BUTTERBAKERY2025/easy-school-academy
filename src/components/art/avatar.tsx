/**
 * One drawn character, configured rather than redrawn.
 *
 * The site needs a dozen faces — children for the age bands, teachers, parents —
 * and hand-drawing each one would be a dozen files to keep consistent. This draws
 * them from a small set of features instead, so every face shares the same
 * construction and the cast can grow by adding a description, not artwork.
 */

export type HairStyle = "short" | "curly" | "long" | "bun" | "hijab" | "cap" | "ghutra";

export type Person = {
  skin: string;
  hair: string;
  hairStyle: HairStyle;
  clothes: string;
  /** Background disc behind the character. */
  backdrop: string;
  glasses?: boolean;
  beard?: boolean;
  /** Headscarf colour; falls back to the outfit colour. */
  scarf?: string;
};

/* A cast with a range of ages and looks, reused across the site. */
export const cast = {
  layla: { skin: "#f3c9a4", hair: "#3a2318", hairStyle: "long", clothes: "#ff6b4a", backdrop: "#ffe3db" },
  omar: { skin: "#e8b184", hair: "#241710", hairStyle: "short", clothes: "#35c3f3", backdrop: "#cff3ff" },
  sara: { skin: "#d69a6a", hair: "#2b1a12", hairStyle: "bun", clothes: "#2ed3a0", backdrop: "#ccf9e6" },
  youssef: { skin: "#b8794a", hair: "#1c1209", hairStyle: "curly", clothes: "#ffc53d", backdrop: "#fff1c6" },
  maryam: { skin: "#f0c3a0", hair: "#2b1a12", hairStyle: "hijab", clothes: "#6c4cf5", backdrop: "#e7e1ff", scarf: "#9172ff" },
  khaled: { skin: "#c98a5c", hair: "#1c1209", hairStyle: "cap", clothes: "#ff5d8f", backdrop: "#ff9cc0" },
  ustadha: { skin: "#e8b184", hair: "#241710", hairStyle: "hijab", clothes: "#14b886", backdrop: "#ccf9e6", glasses: true, scarf: "#2ed3a0" },
  ustath: { skin: "#d69a6a", hair: "#211409", hairStyle: "ghutra", clothes: "#5a34e6", backdrop: "#e7e1ff", beard: true },
  missEmma: { skin: "#f6d8bd", hair: "#8a5a2b", hairStyle: "long", clothes: "#f5a70b", backdrop: "#fff1c6", glasses: true },
} as const satisfies Record<string, Person>;

export type CastMember = keyof typeof cast;

/** The children in the cast; the rest are drawn as adults. */
const PUPILS = ["layla", "omar", "sara", "youssef", "maryam", "khaled"] as const;

/**
 * A stable face for an account.
 *
 * Derived from the account id rather than stored, so every child has a face from
 * their first visit and no column has to exist for it. When choosing one becomes
 * a feature, the chosen value takes over and this stays as the default.
 */
export function avatarFor(seed: string): CastMember {
  let hash = 0;
  for (const character of seed) hash = (hash * 31 + (character.codePointAt(0) ?? 0)) >>> 0;
  return PUPILS[hash % PUPILS.length];
}

/**
 * The drawing itself, as a group on a 120x120 grid. Scenes place it with a
 * transform; a nested `<svg>` would take the parent's dimensions instead of its
 * own and blow up to fill the whole illustration.
 */
export function AvatarShape({ person, backdrop = true }: { person: Person | CastMember; backdrop?: boolean }) {
  const p: Person = typeof person === "string" ? cast[person] : person;
  const covered = p.hairStyle === "hijab" || p.hairStyle === "ghutra";

  return (
    <g>
      {backdrop ? <circle cx="60" cy="60" r="60" fill={p.backdrop} /> : null}

      {/* shoulders */}
      <path d="M22 120c0-19 17-32 38-32s38 13 38 32z" fill={p.clothes} />
      <path d="M52 84h16v12a8 8 0 0 1-16 0z" fill={p.skin} />

      {/* hair behind the head */}
      {p.hairStyle === "long" ? (
        <path d="M28 58c0-20 14-34 32-34s32 14 32 34v34c0 4-4 6-7 4-4-3-6-9-6-16V56H41v22c0 8-2 14-6 17-3 2-7 0-7-4z" fill={p.hair} />
      ) : null}
      {p.hairStyle === "bun" ? <circle cx="60" cy="20" r="12" fill={p.hair} /> : null}

      {/* head */}
      <ellipse cx="60" cy="56" rx="27" ry="29" fill={p.skin} />
      <ellipse cx="33" cy="58" rx="5" ry="7" fill={p.skin} />
      <ellipse cx="87" cy="58" rx="5" ry="7" fill={p.skin} />

      {/* hair on top */}
      {p.hairStyle === "short" ? (
        <path d="M33 52c0-17 12-28 27-28s27 11 27 28c0-8-12-13-27-13s-27 5-27 13Z" fill={p.hair} />
      ) : null}
      {p.hairStyle === "curly" ? (
        <g fill={p.hair}>
          <circle cx="42" cy="36" r="11" />
          <circle cx="58" cy="30" r="13" />
          <circle cx="76" cy="37" r="11" />
          <path d="M33 50c0-10 12-16 27-16s27 6 27 16c0-6-12-10-27-10s-27 4-27 10Z" />
        </g>
      ) : null}
      {p.hairStyle === "long" || p.hairStyle === "bun" ? (
        <path d="M33 54c0-18 12-30 27-30s27 12 27 30c0-9-12-15-27-15s-27 6-27 15Z" fill={p.hair} />
      ) : null}
      {p.hairStyle === "cap" ? (
        <g fill={p.clothes}>
          <path d="M33 46c0-15 12-25 27-25s27 10 27 25z" />
          <rect x="29" y="44" width="62" height="7" rx="3.5" />
          <path d="M87 44h18a4 4 0 0 1 0 8H87z" />
        </g>
      ) : null}
      {p.hairStyle === "hijab" ? (
        <path
          d="M60 20c-19 0-32 15-32 36 0 10 3 18 8 24l-6 22c-1 4 2 8 6 8h48c4 0 7-4 6-8l-6-22c5-6 8-14 8-24 0-21-13-36-32-36Zm0 14c11 0 18 9 18 22 0 9-3 15-8 19H50c-5-4-8-10-8-19 0-13 7-22 18-22Z"
          fill={p.scarf ?? p.clothes}
        />
      ) : null}
      {p.hairStyle === "ghutra" ? (
        <g>
          <path
            d="M60 20c-19 0-32 14-32 34 0 9 2 16 6 21l-5 20c-1 4 2 7 6 7h50c4 0 7-3 6-7l-5-20c4-5 6-12 6-21 0-20-13-34-32-34Zm0 13c11 0 18 8 18 21 0 8-3 14-8 18H50c-5-4-8-10-8-18 0-13 7-21 18-21Z"
            fill="#ffffff"
          />
          <path d="M30 32h60c2 4 3 8 3 12H27c0-4 1-8 3-12Z" fill={p.hair} opacity="0.85" />
        </g>
      ) : null}

      {/* face */}
      {p.glasses ? (
        <g stroke={p.hair} strokeWidth="2.4" fill="none">
          <circle cx="49" cy="56" r="9" fill="#ffffff" fillOpacity="0.35" />
          <circle cx="71" cy="56" r="9" fill="#ffffff" fillOpacity="0.35" />
          <path d="M58 56h4" />
        </g>
      ) : null}
      <circle cx="49" cy="56" r="3.2" fill="#2e2555" />
      <circle cx="71" cy="56" r="3.2" fill="#2e2555" />
      <circle cx="50.2" cy="55" r="1" fill="#ffffff" />
      <circle cx="72.2" cy="55" r="1" fill="#ffffff" />
      <path d="M43 47c3-2 7-2 10 0M67 47c3-2 7-2 10 0" stroke="#2e2555" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.7" />
      {p.beard ? (
        <path d="M38 60c0 16 10 26 22 26s22-10 22-26c0 10-10 15-22 15s-22-5-22-15Z" fill={p.hair} opacity="0.9" />
      ) : null}
      <path d="M52 68c2.6 3.4 5.2 5 8 5s5.4-1.6 8-5" stroke="#2e2555" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      {covered ? null : (
        <>
          <circle cx="40" cy="64" r="4.5" fill="#ff6b4a" opacity="0.28" />
          <circle cx="80" cy="64" r="4.5" fill="#ff6b4a" opacity="0.28" />
        </>
      )}
    </g>
  );
}

/** The same drawing as a standalone image. */
export function Avatar({
  person,
  className = "",
  title,
}: {
  person: Person | CastMember;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <AvatarShape person={person} />
    </svg>
  );
}
