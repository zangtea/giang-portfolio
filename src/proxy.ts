import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["vi", "en"] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = "vi";

function getLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  // Check for Vietnamese preference
  if (acceptLanguage.toLowerCase().includes("vi")) return "vi";
  // Check for explicit English
  if (acceptLanguage.toLowerCase().includes("en")) return "en";
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip _next internals and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    /\.(.*)$/.test(pathname) // has file extension
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect to locale-prefixed path
  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
