import Link from "next/link";
import { getI18n } from "@/lib/i18n/server";

export async function SiteFooter() {
  const { d } = await getI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface-muted">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-extrabold">
            <span className="grid size-8 place-items-center rounded-xl bg-brand-600 text-white" aria-hidden>
              🎓
            </span>
            {d.brand.short}
          </div>
          <p className="mt-3 text-sm text-muted">{d.brand.tagline}</p>
        </div>

        <nav aria-label={d.nav.curricula}>
          <h2 className="text-sm font-bold">{d.nav.curricula}</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/curricula/american" className="hover:text-body">
                🇺🇸 {d.curricula.title} — American
              </Link>
            </li>
            <li>
              <Link href="/curricula/british" className="hover:text-body">
                🇬🇧 {d.curricula.title} — British
              </Link>
            </li>
            <li>
              <Link href="/curricula/saudi" className="hover:text-body">
                🇸🇦 {d.curricula.title} — Saudi
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label={d.nav.menu}>
          <h2 className="text-sm font-bold">{d.nav.menu}</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/how-it-works" className="hover:text-body">
                {d.nav.howItWorks}
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-body">
                {d.nav.pricing}
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-body">
                {d.nav.login}
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold">{d.brand.name}</h2>
          <p className="mt-3 text-sm text-muted">
            © {year} {d.brand.name}. {d.common.footerRights}.
          </p>
        </div>
      </div>
    </footer>
  );
}
