import { existsSync } from "node:fs";
import { join } from "node:path";

export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];

export function isValidLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale);
}

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
let siteUrl: string | undefined;

if (configuredSiteUrl) {
  try {
    siteUrl = new URL(configuredSiteUrl).origin;
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.warn("NEXT_PUBLIC_SITE_URL must be a valid absolute URL.");
    }
  }
} else if (process.env.NODE_ENV === "development") {
  console.warn("NEXT_PUBLIC_SITE_URL is not set; absolute SEO URLs are omitted.");
}

const hasPublicAsset = (filename: string) =>
  existsSync(join(process.cwd(), "public", filename));

export const siteConfig = {
  name: "Lê Thị Trà Giang",
  displayName: "LE THI TRA GIANG",
  title: "Full-stack Developer",
  location: "Đà Nẵng, Việt Nam",
  email: "tragiang080404@gmail.com",
  github: "https://github.com/zangtea",
  linkedin: "https://www.linkedin.com/in/th%E1%BB%8B-tr%C3%A0-giang-l%C3%AA-4610612b1/", // Cập nhật link thực tế
  avatarUrl: hasPublicAsset("avatar.jpg") ? "/avatar.jpg" : null,
  cvUrl: hasPublicAsset("cv.pdf") ? "/cv.pdf" : null,
  defaultLocale: "vi" as const,
  locales,
  siteUrl,
  bio: {
    vi: "Chuyên phát triển ứng dụng web full-stack, tích hợp giải pháp AI và thiết kế hệ thống hướng đến bài toán thực tế cho sản phẩm và dự án freelance.",
    en: "Full-stack developer focused on practical web products, thoughtful AI integration, and maintainable systems for real-world needs.",
  },
};