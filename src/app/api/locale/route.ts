import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, defaultLocale, isLocale } from "@/lib/i18n/config";

/**
 * Language switching runs through a route handler rather than a Server Action:
 * the handler owns the response, so the cookie and the redirect always travel
 * together.
 */
export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const to = params.get("to");
  const back = params.get("next");

  // Only same-origin paths, so the switcher can never be used as an open redirect.
  const destination = back && back.startsWith("/") && !back.startsWith("//") ? back : "/";
  const response = NextResponse.redirect(new URL(destination, request.nextUrl.origin));

  response.cookies.set(LOCALE_COOKIE, isLocale(to) ? to : defaultLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}
