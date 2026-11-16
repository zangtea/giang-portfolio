import type viDictionary from "@/content/dictionaries/vi.json";
import type { Locale } from "@/config/site";

export type Dictionary = typeof viDictionary;

export interface SectionProps {
  dict: Dictionary;
  locale: Locale;
}