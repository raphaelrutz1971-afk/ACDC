import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";
import { ServiceIcon } from "./service-icon";

export function Services({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <section
      aria-labelledby="leistungen"
      className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32"
    >
      <SectionHeading id="leistungen" title={t.services.title} intro={t.services.intro} />

      <ul className="mt-16 border-t-2 border-ink">
        {t.services.items.map((s) => (
          <li key={s.slug} className="border-b border-rule-strong">
            <Link
              href={`/${lang}/leistungen/${s.slug}`}
              className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-5 gap-y-3 px-1 py-8 transition-colors hover:bg-surface sm:px-4 md:grid-cols-12 md:items-center md:gap-x-8 md:py-10"
            >
              <span className="grid size-12 place-items-center rounded-full border border-rule-strong text-fir transition-colors group-hover:border-fir group-hover:bg-fir group-hover:text-on-fir md:col-span-1">
                <ServiceIcon slug={s.slug} className="size-5" />
              </span>
              <span className="text-2xl font-bold tracking-tight text-ink sm:text-3xl md:col-span-4">
                <span className="mark-hover">{s.title}</span>
              </span>
              <ArrowUpRight
                aria-hidden
                className="size-6 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ink md:col-start-12 md:row-start-1 md:justify-self-end"
              />
              <span className="col-span-3 font-serif text-lg leading-relaxed text-muted md:col-span-6 md:col-start-6 md:row-start-1">
                {s.short}
                <span className="sr-only">
                  {" "}
                  – {t.services.more} {s.title}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
