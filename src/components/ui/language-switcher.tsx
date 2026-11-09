"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/config/site";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
}

export function LanguageSwitcher({
  currentLocale,
  className,
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  // Replace the current locale segment with the target locale
  function getLocalizedPath(targetLocale: Locale): string {
    if (!pathname) return `/${targetLocale}`;
    // pathname starts with /vi/... or /en/...
    const segments = pathname.split("/");
    segments[1] = targetLocale;
    return segments.join("/") || `/${targetLocale}`;
  }

  return (
    <div
      className={cn("flex items-center gap-1 text-sm font-medium", className)}
      aria-label="Language switcher"
    >
      <Link
        href={getLocalizedPath("vi")}
        className={cn(
          "px-2 py-1 rounded transition-colors",
          currentLocale === "vi"
            ? "text-[var(--color-accent)] font-semibold"
            : "text-[var(--color-mut)] hover:text-[var(--color-fg)]"
        )}
        aria-current={currentLocale === "vi" ? "true" : undefined}
        hrefLang="vi"
      >
        VI
      </Link>
      <span className="text-[var(--color-bdr)]" aria-hidden="true">
        |
      </span>
      <Link
        href={getLocalizedPath("en")}
        className={cn(
          "px-2 py-1 rounded transition-colors",
          currentLocale === "en"
            ? "text-[var(--color-accent)] font-semibold"
            : "text-[var(--color-mut)] hover:text-[var(--color-fg)]"
        )}
        aria-current={currentLocale === "en" ? "true" : undefined}
        hrefLang="en"
      >
        EN
      </Link>
    </div>
  );
}
