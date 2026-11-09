import "server-only";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/config/site";

type Dictionary = typeof import("@/content/dictionaries/vi.json");

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  vi: () =>
    import("@/content/dictionaries/vi.json").then((m) => m.default),
  en: () =>
    import("@/content/dictionaries/en.json").then((m) => m.default),
};

export async function getDictionary(): Promise<Dictionary> {
  const locale = await lang();
  if (!isValidLocale(locale)) notFound();
  return dictionaries[locale]();
}

export async function getLocale(): Promise<Locale> {
  const locale = await lang();
  if (!isValidLocale(locale)) notFound();
  return locale;
}
