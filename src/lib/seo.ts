import type { Metadata } from "next";
import { locales, type Locale } from "./i18n";

/** Canonical + hreflang links for a path below the locale prefix ("" for home). */
export function alternates(lang: Locale, path: string): Metadata["alternates"] {
  const languages = Object.fromEntries(
    locales.map((l) => [l === "de" ? "de-CH" : l, `/${l}${path}`]),
  );
  return {
    canonical: `/${lang}${path}`,
    languages: { ...languages, "x-default": `/de${path}` },
  };
}
