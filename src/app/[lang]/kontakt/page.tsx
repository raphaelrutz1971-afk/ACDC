import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { isLocale } from "@/lib/i18n";
import { alternates } from "@/lib/seo";
import { ContactSection } from "@/components/contact-section";

export async function generateMetadata({ params }: PageProps<"/[lang]/kontakt">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.contact.pageTitle,
    description: t.contact.pageIntro,
    alternates: alternates(lang, "/kontakt"),
  };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/kontakt">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <div className="ledger min-h-full">
      <ContactSection
        lang={lang}
        t={t}
        headingLevel="h1"
        title={t.contact.pageTitle}
        intro={t.contact.pageIntro}
        readQuery
      />
    </div>
  );
}
