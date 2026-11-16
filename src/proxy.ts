import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { projects } from "@/content/projects/projects";

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

  const projectMatch = pathname.match(/^\/(vi|en)\/projects\/([^/]+)\/?$/);
  if (
    projectMatch &&
    !projects.some((project) => project.slug === projectMatch[2])
  ) {
    const locale = projectMatch[1];
    const isVietnamese = locale === "vi";
    const title = isVietnamese ? "Dự án không tồn tại" : "Project not found";
    const description = isVietnamese
      ? "Dự án bạn tìm kiếm không tồn tại hoặc đã bị gỡ."
      : "The project you are looking for does not exist or is unavailable.";
    const backLabel = isVietnamese ? "Về trang chủ" : "Back to home";
    const html = `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>404 | ${title}</title></head><body style="margin:0;background:#fbfaf8;color:#292522;font-family:Georgia,serif"><main style="box-sizing:border-box;display:grid;min-height:100vh;place-content:center;padding:24px;text-align:center"><p style="font:12px monospace;color:#a93622">404</p><h1 style="font-size:clamp(28px,6vw,48px)">${title}</h1><p style="max-width:440px;line-height:1.7;color:#625b56">${description}</p><a style="justify-self:center;margin-top:24px;padding:12px 18px;background:#a93622;color:white;text-decoration:none" href="/${locale}">${backLabel}</a></main></body></html>`;
    return new NextResponse(html, {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

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
