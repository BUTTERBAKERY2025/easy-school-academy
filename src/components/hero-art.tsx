/**
 * The hero illustration, drawn inline so it themes with the page and needs no
 * image hosting. A real photo shoot would replace this before launch; until then
 * this keeps the page warm rather than leaving an empty column.
 */
export function HeroArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 430"
      className={className}
      role="img"
      aria-label=""
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ea-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-500)" />
          <stop offset="100%" stopColor="var(--color-brand-700)" />
        </linearGradient>
        <linearGradient id="ea-blob" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-sky-200)" />
          <stop offset="100%" stopColor="var(--color-brand-200)" />
        </linearGradient>
      </defs>

      {/* soft background shapes */}
      <path
        d="M242 18c78 0 148 38 178 104 30 66 12 148-38 196-50 48-132 62-200 44C114 344 52 300 34 236 16 172 46 96 104 56 148 26 194 18 242 18Z"
        fill="url(#ea-blob)"
        opacity="0.45"
      />
      <circle cx="404" cy="96" r="30" fill="var(--color-sun-300)" opacity="0.65" />
      <circle cx="64" cy="300" r="20" fill="var(--color-coral-300)" opacity="0.6" />

      {/* tablet */}
      <g>
        <rect x="118" y="96" width="250" height="196" rx="26" fill="var(--color-ink-900)" opacity="0.08" />
        <rect x="126" y="88" width="250" height="196" rx="26" fill="url(#ea-screen)" />
        <rect x="142" y="104" width="218" height="164" rx="18" fill="var(--surface-raised)" />

        {/* lesson card inside the screen */}
        <rect x="160" y="122" width="104" height="11" rx="5.5" fill="var(--color-brand-300)" />
        <rect x="160" y="144" width="182" height="9" rx="4.5" fill="var(--color-ink-200)" />
        <rect x="160" y="160" width="150" height="9" rx="4.5" fill="var(--color-ink-200)" />

        {/* fraction bar — the shape a maths lesson actually shows */}
        <g>
          <rect x="160" y="184" width="182" height="30" rx="9" fill="var(--color-brand-50)" stroke="var(--color-brand-400)" strokeWidth="2" />
          <rect x="161" y="185" width="59" height="28" rx="8" fill="var(--color-brand-500)" />
          <rect x="220" y="185" width="59" height="28" rx="1" fill="var(--color-brand-500)" opacity="0.85" />
          <line x1="220" y1="185" x2="220" y2="213" stroke="var(--surface-raised)" strokeWidth="2" />
          <line x1="279" y1="185" x2="279" y2="213" stroke="var(--color-brand-400)" strokeWidth="2" />
        </g>

        {/* answer row with a tick */}
        <rect x="160" y="228" width="128" height="24" rx="12" fill="var(--color-mint-100)" />
        <circle cx="176" cy="240" r="8" fill="var(--color-mint-500)" />
        <path d="m172 240 3 3 6-6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="192" y="235" width="80" height="10" rx="5" fill="var(--color-mint-500)" opacity="0.45" />

        {/* progress pip */}
        <rect x="300" y="230" width="42" height="20" rx="10" fill="var(--color-sun-300)" />
      </g>

      {/* child */}
      <g>
        <path d="M196 292c0-26 22-46 50-46s50 20 50 46v34h-100z" fill="var(--color-coral-400)" />
        <circle cx="246" cy="232" r="34" fill="var(--color-sun-200)" />
        <path d="M212 226c0-20 15-34 34-34s34 14 34 34c0-8-14-12-34-12s-34 4-34 12Z" fill="var(--color-ink-800)" />
        <circle cx="235" cy="234" r="3.4" fill="var(--color-ink-900)" />
        <circle cx="258" cy="234" r="3.4" fill="var(--color-ink-900)" />
        <path d="M236 246c3.5 4.5 7 6.5 10 6.5s6.5-2 10-6.5" stroke="var(--color-ink-900)" strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="224" cy="243" r="4.5" fill="var(--color-coral-300)" opacity="0.7" />
        <circle cx="269" cy="243" r="4.5" fill="var(--color-coral-300)" opacity="0.7" />
      </g>

      {/* floating subject bubbles */}
      <g>
        <circle cx="92" cy="140" r="30" fill="var(--surface-raised)" stroke="var(--color-brand-200)" strokeWidth="2" />
        <text x="92" y="151" textAnchor="middle" fontSize="28" fill="currentColor">📐</text>

        <circle cx="402" cy="212" r="30" fill="var(--surface-raised)" stroke="var(--color-mint-300)" strokeWidth="2" />
        <text x="402" y="223" textAnchor="middle" fontSize="28" fill="currentColor">🔬</text>

        <circle cx="120" cy="352" r="27" fill="var(--surface-raised)" stroke="var(--color-sun-300)" strokeWidth="2" />
        <text x="120" y="362" textAnchor="middle" fontSize="25" fill="currentColor">✒️</text>

        <circle cx="366" cy="356" r="27" fill="var(--surface-raised)" stroke="var(--color-sky-300)" strokeWidth="2" />
        <text x="366" y="366" textAnchor="middle" fontSize="25" fill="currentColor">🌍</text>
      </g>

      {/* sparkles */}
      <path d="M78 64l4 12 12 4-12 4-4 12-4-12-12-4 12-4z" fill="var(--color-sun-400)" />
      <path d="M430 300l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" fill="var(--color-coral-400)" />
    </svg>
  );
}
