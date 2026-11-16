import "server-only";
import type { Locale } from "@/config/site";

type Dictionary = typeof import("@/content/dictionaries/vi.json");

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  vi: () =>
    import("@/content/dictionaries/vi.json").then((m) => m.default),
  en: () =>
    import("@/content/dictionaries/en.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
