import Image from "next/image";
import type { Dictionary } from "@/content/dictionaries";
import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/** Renders only when firm details have been filled in src/content/site.ts. */
export function About({ lang, t }: { lang: Locale; t: Dictionary["about"] }) {
  const hasContent = site.about || site.team.length > 0 || site.memberships.length > 0;
  if (!hasContent) return null;

  return (
    <section aria-labelledby="ueber-uns" className="border-t border-rule bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:grid-cols-12 md:py-32">
        <h2
          id="ueber-uns"
          className="text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-ink md:col-span-4"
        >
          {t.title}
        </h2>
        <div className="md:col-span-8">
          {site.about && (
            <p className="max-w-2xl font-serif text-xl leading-relaxed text-ink">{site.about[lang]}</p>
          )}

          {site.team.length > 0 && (
            <>
              <h3 className="mt-14 text-sm font-semibold text-muted">{t.team}</h3>
              <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {site.team.map((m) => (
                  <li key={m.name}>
                    {m.photo && (
                      <Image
                        src={m.photo}
                        alt={m.name}
                        width={600}
                        height={600}
                        sizes="(min-width: 1024px) 240px, (min-width: 640px) 45vw, 90vw"
                        className="mb-4 aspect-square w-full rounded-[6px] object-cover"
                      />
                    )}
                    <p className="text-lg font-bold text-ink">{m.name}</p>
                    <p className="text-muted">{m.role[lang]}</p>
                    {m.email && (
                      <a
                        href={`mailto:${m.email}`}
                        className="mt-1 inline-block text-fir underline-offset-4 hover:underline"
                      >
                        {m.email}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}

          {site.memberships.length > 0 && (
            <>
              <h3 className="mt-14 text-sm font-semibold text-muted">{t.memberships}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {site.memberships.map((m) => (
                  <li key={m} className="rounded-full border border-rule-strong px-4 py-1.5 text-ink">
                    {m}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
