import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, FileText } from "lucide-react";
import { getDictionary, serviceSlugs } from "@/content/dictionaries";
import { isLocale, locales } from "@/lib/i18n";
import { alternates } from "@/lib/seo";
import { buttonClasses } from "@/components/button";
import { ServiceIcon } from "@/components/service-icon";

export function generateStaticParams() {
  return locales.flatMap((lang) => serviceSlugs.map((slug) => ({ lang, slug })));
}

function load(lang: string, slug: string) {
  if (!isLocale(lang)) return null;
  const t = getDictionary(lang);
  const service = t.services.items.find((s) => s.slug === slug);
  return service ? { t, service, lang } : null;
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/leistungen/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const data = load(lang, slug);
  if (!data) return {};
  return {
    title: data.service.title,
    description: data.service.short,
    alternates: alternates(data.lang, `/leistungen/${slug}`),
    openGraph: { title: data.service.title, description: data.service.short },
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/[lang]/leistungen/[slug]">) {
  const { lang: rawLang, slug } = await params;
  const data = load(rawLang, slug);
  if (!data) notFound();
  const { t, service, lang } = data;
  const others = t.services.items.filter((s) => s.slug !== slug);

  return (
    <article>
      <header className="ledger border-b border-rule">
        <div className="mx-auto max-w-7xl px-5 pt-10 pb-16 sm:px-8 md:pt-14 md:pb-24">
          <Link
            href={`/${lang}#leistungen`}
            className="inline-flex items-center gap-2 rounded-full py-1 text-sm font-semibold text-muted hover:text-ink"
          >
            <ArrowLeft aria-hidden className="size-4" />
            {t.services.back}
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <span className="grid size-14 place-items-center rounded-full bg-fir text-on-fir">
                <ServiceIcon slug={slug} className="size-6" />
              </span>
              <h1 className="mt-8 text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1] font-extrabold tracking-[-0.035em] text-balance text-ink">
                {service.title}
              </h1>
              <p className="mt-8 max-w-2xl font-serif text-xl leading-relaxed text-muted sm:text-[1.3rem]">
                {service.intro}
              </p>
            </div>
            <div className="flex items-end lg:col-span-4 lg:justify-end">
              <Link
                href={`/${lang}/kontakt?leistung=${slug}`}
                className={buttonClasses("primary", "px-7 py-3.5")}
              >
                {t.services.request}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-16 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-12">
        <section aria-labelledby="included" className="lg:col-span-6">
          <h2 id="included" className="text-2xl font-bold tracking-tight text-ink">
            {t.services.included}
          </h2>
          <ul className="mt-6 border-t-2 border-ink">
            {service.includes.map((item) => (
              <li key={item} className="flex gap-4 border-b border-rule py-4 text-[1.05rem] text-ink">
                <Check aria-hidden className="mt-1 size-4 shrink-0 text-fir" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="needs" className="lg:col-span-5 lg:col-start-8">
          <h2 id="needs" className="text-2xl font-bold tracking-tight text-ink">
            {t.services.needs}
          </h2>
          <ul className="mt-6 rounded-[6px] border border-rule-strong bg-surface p-2">
            {service.needs.map((item) => (
              <li key={item} className="flex gap-4 rounded-[4px] px-4 py-3.5 text-[1.05rem] text-ink">
                <FileText aria-hidden className="mt-1 size-4 shrink-0 text-muted" />
                {item}
              </li>
            ))}
          </ul>

          {service.months.length > 0 && (
            <>
              <h2 className="mt-14 text-2xl font-bold tracking-tight text-ink">{t.services.related}</h2>
              <ul className="mt-6 space-y-5">
                {service.months.flatMap((m) =>
                  (t.deadlines.entries[m] ?? [])
                    .filter((e) => relevant(slug, e.tag))
                    .map((e) => (
                      <li key={`${m}-${e.title}`} className="grid grid-cols-[5.5rem_1fr] gap-4">
                        <span className="self-start rounded-full bg-marker px-3 py-1 text-center text-sm font-bold text-on-marker">
                          {t.deadlines.monthsShort[m]}
                        </span>
                        <div>
                          <p className="font-semibold text-ink">{e.title}</p>
                          <p className="mt-0.5 font-serif text-muted">{e.text}</p>
                        </div>
                      </li>
                    )),
                )}
              </ul>
              <p className="mt-6 text-sm text-muted">{t.deadlines.note}</p>
            </>
          )}
        </section>
      </div>

      <nav aria-label={t.services.title} className="border-t border-rule bg-surface">
        <ul className="mx-auto grid max-w-7xl px-5 sm:px-8 md:grid-cols-3">
          {others.map((s) => (
            <li key={s.slug} className="border-b border-rule md:border-b-0 md:border-l md:first:border-l-0">
              <Link
                href={`/${lang}/leistungen/${s.slug}`}
                className="group flex items-center gap-4 py-8 md:px-8 md:first:pl-0"
              >
                <ServiceIcon slug={s.slug} className="size-5 text-fir" />
                <span className="text-lg font-bold text-ink">
                  <span className="mark-hover">{s.title}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}

/** Only show deadline entries whose tag belongs to this service. */
function relevant(slug: string, tag: string) {
  const tags: Record<string, string[]> = {
    buchhaltung: ["Abschluss", "Accounts"],
    steuern: ["Steuern", "Taxes", "MWST", "VAT"],
    lohn: ["Lohn", "Payroll"],
    gruendung: ["Abschluss", "Accounts"],
  };
  return tags[slug]?.includes(tag) ?? true;
}
