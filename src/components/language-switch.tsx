"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n";

export function LanguageSwitch({
  lang,
  label,
  onNavigate,
}: {
  lang: Locale;
  label: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname() ?? `/${lang}`;
  const rest = pathname.replace(/^\/(de|en)(?=\/|$)/, "");

  return (
    <nav aria-label={label} className="flex items-center gap-1 text-sm font-semibold">
      {locales.map((l) => {
        const active = l === lang;
        return (
          <Link
            key={l}
            href={`/${l}${rest}`}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            onClick={onNavigate}
            title={localeNames[l]}
            className={`rounded-full px-2.5 py-1.5 uppercase transition-colors ${
              active ? "bg-marker text-on-marker" : "text-muted hover:text-ink"
            }`}
          >
            <span aria-hidden>{l}</span>
            <span className="sr-only">{localeNames[l]}</span>
          </Link>
        );
      })}
    </nav>
  );
}
