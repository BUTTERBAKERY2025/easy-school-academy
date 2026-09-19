import { AvatarShape } from "./avatar";

/**
 * Scene illustrations, drawn inline. They read the theme tokens, so they follow
 * light and dark without a second set of assets, and they scale without blurring.
 */

/* ------------------------------------------------------------------- hero */

export function HeroScene({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 520 440" className="h-auto w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="es-sky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-sky-100)" />
            <stop offset="100%" stopColor="var(--color-brand-100)" />
          </linearGradient>
          <linearGradient id="es-device" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-brand-500)" />
            <stop offset="100%" stopColor="var(--color-brand-700)" />
          </linearGradient>
        </defs>

        {/* backdrop */}
        <path
          d="M262 14c86 0 163 42 196 115 33 73 13 163-42 216-55 53-146 68-220 48C122 373 54 325 34 254 14 183 47 99 111 55 159 22 209 14 262 14Z"
          fill="url(#es-sky)"
          opacity="0.55"
        />
        <circle cx="446" cy="92" r="30" fill="var(--color-sun-300)" opacity="0.7" />
        <circle cx="60" cy="318" r="19" fill="var(--color-coral-300)" opacity="0.65" />
        <circle cx="430" cy="352" r="12" fill="var(--color-mint-300)" opacity="0.8" />

        {/* desk */}
        <rect x="96" y="352" width="330" height="14" rx="7" fill="var(--color-ink-200)" />

        {/* laptop showing a live lesson */}
        <g>
          <rect x="150" y="150" width="236" height="168" rx="20" fill="url(#es-device)" />
          <rect x="164" y="164" width="208" height="140" rx="13" fill="var(--surface-raised)" />
          <path d="M132 318h272l16 30H116z" fill="var(--color-ink-300)" />
          <rect x="236" y="330" width="64" height="6" rx="3" fill="var(--color-ink-400)" />

          {/* teacher on the call */}
          <g transform="translate(176 178) scale(0.58)">
            <AvatarShape person="ustadha" />
          </g>
          <rect x="176" y="248" width="66" height="7" rx="3.5" fill="var(--color-ink-200)" />

          {/* the lesson beside her: a shaded fraction bar and a correct answer */}
          <rect x="254" y="178" width="104" height="10" rx="5" fill="var(--color-brand-300)" />
          <g>
            <rect x="254" y="198" width="104" height="26" rx="8" fill="var(--color-brand-50)" stroke="var(--color-brand-400)" strokeWidth="2" />
            <path d="M255 199h33v24h-33z" fill="var(--color-brand-500)" />
            <path d="M288 199h33v24h-33z" fill="var(--color-brand-500)" opacity="0.88" />
            <line x1="288" y1="199" x2="288" y2="223" stroke="var(--surface-raised)" strokeWidth="2" />
            <line x1="321" y1="199" x2="321" y2="223" stroke="var(--color-brand-400)" strokeWidth="2" />
          </g>
          <rect x="254" y="236" width="104" height="22" rx="11" fill="var(--color-mint-100)" />
          <circle cx="268" cy="247" r="7.5" fill="var(--color-mint-500)" />
          <path d="m264.4 247 2.8 2.8 5.4-5.6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="282" y="242" width="62" height="9" rx="4.5" fill="var(--color-mint-500)" opacity="0.4" />
          <rect x="254" y="270" width="72" height="18" rx="9" fill="var(--color-sun-300)" />
        </g>

        {/* the child, watching */}
        <g transform="translate(214 286) scale(0.82)">
          <AvatarShape person="layla" backdrop={false} />
        </g>

        {/* floating subjects */}
        <g>
          <circle cx="86" cy="150" r="33" fill="var(--surface-raised)" stroke="var(--color-brand-200)" strokeWidth="2" />
          <text x="86" y="162" textAnchor="middle" fontSize="30" fill="currentColor">📐</text>

          <circle cx="446" cy="222" r="33" fill="var(--surface-raised)" stroke="var(--color-mint-300)" strokeWidth="2" />
          <text x="446" y="234" textAnchor="middle" fontSize="30" fill="currentColor">🔬</text>

          <circle cx="104" cy="256" r="27" fill="var(--surface-raised)" stroke="var(--color-sun-300)" strokeWidth="2" />
          <text x="104" y="266" textAnchor="middle" fontSize="24" fill="currentColor">✒️</text>
        </g>

        <path d="M70 70l5 14 14 5-14 5-5 14-5-14-14-5 14-5z" fill="var(--color-sun-400)" />
        <path d="M470 290l3.5 10 10 3.5-10 3.5-3.5 10-3.5-10-10-3.5 10-3.5z" fill="var(--color-coral-400)" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------ step scenes */

const stepTint = {
  brand: "var(--color-brand-100)",
  sun: "var(--color-sun-100)",
  mint: "var(--color-mint-100)",
  sky: "var(--color-sky-100)",
} as const;

export type StepTint = keyof typeof stepTint;

/** Small square scenes for the four stages of a lesson. */
export function StepScene({ step, tint }: { step: 1 | 2 | 3 | 4; tint: StepTint }) {
  return (
    <svg viewBox="0 0 96 96" className="h-16 w-16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="0" y="0" width="96" height="96" rx="26" fill={stepTint[tint]} />

      {step === 1 ? (
        <g>
          {/* three curricula to choose between */}
          <rect x="16" y="26" width="24" height="44" rx="6" fill="var(--color-brand-500)" />
          <rect x="44" y="20" width="24" height="56" rx="6" fill="var(--color-sun-400)" />
          <rect x="70" y="32" width="14" height="38" rx="6" fill="var(--color-mint-400)" />
          <circle cx="56" cy="34" r="6" fill="#fff" />
          <path d="m53 34 2.4 2.4L61 31" stroke="var(--color-sun-600)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      ) : null}

      {step === 2 ? (
        <g>
          {/* an open book */}
          <path d="M14 30c10-6 22-6 32 0v42c-10-6-22-6-32 0z" fill="var(--color-brand-500)" />
          <path d="M50 30c10-6 22-6 32 0v42c-10-6-22-6-32 0z" fill="var(--color-brand-400)" />
          <path d="M22 42h16M22 52h16M58 42h16M58 52h12" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
        </g>
      ) : null}

      {step === 3 ? (
        <g>
          {/* a hand tapping an answer */}
          <rect x="18" y="22" width="60" height="34" rx="9" fill="var(--color-mint-500)" />
          <path d="M28 39h16M52 39h14" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
          <path d="M44 58c0-4 3-7 7-7s7 3 7 7v6h10a6 6 0 0 1 6 6v4c0 7-6 12-13 12H56c-8 0-12-5-12-12z" fill="var(--color-sun-300)" />
        </g>
      ) : null}

      {step === 4 ? (
        <g>
          {/* a rising progress chart with a star */}
          <rect x="18" y="56" width="14" height="22" rx="4" fill="var(--color-sky-400)" />
          <rect x="40" y="44" width="14" height="34" rx="4" fill="var(--color-sky-500)" />
          <rect x="62" y="30" width="14" height="48" rx="4" fill="var(--color-brand-500)" />
          <path d="M69 8l3.6 8.4 8.4 3.6-8.4 3.6L69 32l-3.6-8.4-8.4-3.6 8.4-3.6z" fill="var(--color-sun-400)" />
        </g>
      ) : null}
    </svg>
  );
}

/* ---------------------------------------------------------------- divider */

/** A soft wave between two coloured bands, so sections flow instead of stacking. */
export function WaveDivider({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`block h-10 w-full sm:h-16 ${flip ? "rotate-180" : ""} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M0 80V34c180 34 360 44 540 24 180-20 360-52 540-52 120 0 240 16 360 44v30z" fill="currentColor" />
    </svg>
  );
}
