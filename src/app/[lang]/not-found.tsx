"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { isLocale } from "@/lib/i18n";
import { buttonClasses } from "@/components/button";

export default function NotFound() {
  const params = useParams<{ lang?: string }>();
  const lang = params?.lang && isLocale(params.lang) ? params.lang : "de";
  const t = getDictionary(lang).notFound;

  return (
    <div className="ledger">
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-40">
        <p aria-hidden className="text-[clamp(5rem,16vw,11rem)] leading-none font-extrabold tracking-[-0.06em] text-transparent [-webkit-text-stroke:2px_var(--fir)]">
          404
        </p>
        <h1 className="mt-8 text-4xl font-extrabold tracking-[-0.03em] text-ink md:text-5xl">{t.title}</h1>
        <p className="mt-4 max-w-lg font-serif text-xl leading-relaxed text-muted">{t.text}</p>
        <Link href={`/${lang}`} className={buttonClasses("primary", "mt-10")}>
          {t.home}
        </Link>
      </div>
    </div>
  );
}
