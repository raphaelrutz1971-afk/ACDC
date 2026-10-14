import type { Locale } from "@/lib/i18n";
import { de, type Dictionary } from "./de";
import { en } from "./en";

const dictionaries: Record<Locale, Dictionary> = { de, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
export type Service = Dictionary["services"]["items"][number];
export const serviceSlugs = de.services.items.map((s) => s.slug);
