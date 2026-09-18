"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/client";

export function MobileNav({
  links,
  dashboardHref,
  signedIn,
}: {
  links: { href: string; label: string }[];
  dashboardHref: string;
  signedIn: boolean;
}) {
  const [open, setOpen] = useState(false);
  const { d } = useI18n();

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="btn btn-ghost px-3 py-2"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={d.nav.menu}
      >
        <span aria-hidden>{open ? "✕" : "☰"}</span>
      </button>

      {open ? (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-16 border-b border-line bg-surface p-4 shadow-lg"
        >
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2.5 font-medium hover:bg-surface-muted"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={signedIn ? dashboardHref : "/login"}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 font-medium hover:bg-surface-muted"
              >
                {signedIn ? d.nav.dashboard : d.nav.login}
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
