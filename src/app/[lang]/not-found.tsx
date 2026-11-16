"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import enDictionary from "@/content/dictionaries/en.json";
import viDictionary from "@/content/dictionaries/vi.json";

export default function NotFound() {
  const locale = usePathname()?.startsWith("/en") ? "en" : "vi";
  const dict = locale === "vi" ? viDictionary : enDictionary;

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="mb-4 font-mono text-sm text-[var(--color-accent)]">404</p>
      <h1 className="mb-2 text-2xl font-semibold">{dict.errors["404_title"]}</h1>
      <p className="mb-8 max-w-md text-[var(--color-mut)]">{dict.errors["404_desc"]}</p>
      <Link
        href={`/${locale}`}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-accent)] text-white font-medium hover:opacity-90 transition-opacity"
      >
        {dict.errors.back_home}
      </Link>
    </div>
  );
}
