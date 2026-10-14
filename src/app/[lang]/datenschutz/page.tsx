import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { displayName } from "@/content/site";
import { isLocale } from "@/lib/i18n";
import { alternates } from "@/lib/seo";
import { LegalPage } from "@/components/legal-page";

export async function generateMetadata({ params }: PageProps<"/[lang]/datenschutz">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: getDictionary(lang).legal.privacyTitle,
    alternates: alternates(lang, "/datenschutz"),
  };
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/datenschutz">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const l = getDictionary(lang).legal;

  return (
    <LegalPage title={l.privacyTitle}>
      {l.privacy.map((s) => (
        <section key={s.h}>
          <h2>{s.h}</h2>
          <p>{s.p.replace("{company}", displayName)}</p>
        </section>
      ))}
    </LegalPage>
  );
}
