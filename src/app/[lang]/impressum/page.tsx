import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { displayName, site, telHref } from "@/content/site";
import { isLocale } from "@/lib/i18n";
import { alternates } from "@/lib/seo";
import { LegalPage } from "@/components/legal-page";

export async function generateMetadata({ params }: PageProps<"/[lang]/impressum">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: getDictionary(lang).legal.imprintTitle,
    alternates: alternates(lang, "/impressum"),
  };
}

export default async function ImprintPage({ params }: PageProps<"/[lang]/impressum">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const l = t.legal;

  return (
    <LegalPage title={l.imprintTitle}>
      <section>
        <h2>{l.company}</h2>
        <p>
          {displayName}
          {site.address ? (
            <>
              <br />
              {site.address.street}
              <br />
              {site.address.zip} {site.address.city}
              <br />
              {lang === "de" ? "Schweiz" : "Switzerland"}
            </>
          ) : (
            <>
              <br />
              {l.pending}
            </>
          )}
        </p>
      </section>
      <section>
        <h2>{l.contact}</h2>
        <p>
          {site.phone && (
            <>
              {t.contact.phone}: <a className="text-ink underline underline-offset-4" href={telHref(site.phone)}>{site.phone}</a>
              <br />
            </>
          )}
          {site.email ? (
            <>
              {t.contact.email}: <a className="text-ink underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>
            </>
          ) : (
            !site.phone && l.pending
          )}
        </p>
      </section>
      <section>
        <h2>{l.responsible}</h2>
        <p>{site.responsiblePerson ?? l.pending}</p>
      </section>
      <section>
        <h2>{l.uid}</h2>
        <p>{site.uid ?? l.pending}</p>
      </section>
      <section>
        <h2>{l.disclaimerTitle}</h2>
        <p>{l.disclaimer}</p>
      </section>
    </LegalPage>
  );
}
