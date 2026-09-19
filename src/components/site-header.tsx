import Link from "next/link";
import { getI18n } from "@/lib/i18n/server";
import { getCurrentUser } from "@/lib/auth/current";
import { logoutAction } from "@/lib/auth/actions";
import { LogoMark } from "@/components/art/logo";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";

export async function SiteHeader() {
  const { d } = await getI18n();
  const user = await getCurrentUser();

  const links = [
    // A student's own shelf replaces the public catalogue in their navigation:
    // once enrolled, "my books" is the thing they came for.
    ...(user?.role === "student"
      ? [{ href: "/books", label: d.books.navTitle }]
      : [{ href: "/curricula", label: d.nav.curricula }]),
    { href: "/how-it-works", label: d.nav.howItWorks },
    { href: "/pricing", label: d.nav.pricing },
  ];

  const dashboardHref =
    user?.role === "parent" ? "/parent" : user?.role === "teacher" ? "/teacher" : user?.role === "admin" ? "/admin" : "/learn";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 font-extrabold">
          <LogoMark className="size-9 text-brand-600" />
          <span className="hidden sm:inline">{d.brand.short}</span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 md:flex" aria-label={d.nav.menu}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-body"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2 md:ms-0">
          <LocaleSwitcher />

          {user ? (
            <>
              <Link href={dashboardHref} className="btn btn-primary hidden px-4 py-2 text-sm sm:inline-flex">
                {d.nav.dashboard}
              </Link>
              <form action={logoutAction} className="hidden sm:block">
                <button type="submit" className="btn btn-ghost px-3 py-2 text-sm">
                  {d.nav.logout}
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost hidden px-4 py-2 text-sm sm:inline-flex">
                {d.nav.login}
              </Link>
              <Link href="/register" className="btn btn-primary px-4 py-2 text-sm">
                {d.nav.register}
              </Link>
            </>
          )}

          <MobileNav links={links} dashboardHref={dashboardHref} signedIn={Boolean(user)} />
        </div>
      </div>
    </header>
  );
}
