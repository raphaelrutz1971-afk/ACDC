import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { isLocale } from "@/lib/i18n";
import { organizationJsonLd } from "@/lib/json-ld";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { DeadlineYear } from "@/components/deadline-year";
import { Process } from "@/components/process";
import { About } from "@/components/about";
import { Faq } from "@/components/faq";
import { ContactSection } from "@/components/contact-section";
import { SectionHeading } from "@/components/section-heading";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(lang)) }}
      />
      <Hero lang={lang} t={t} />
      <Services lang={lang} t={t} />

      <section aria-labelledby="fristen" className="bg-band text-on-band">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32 [&_h2]:text-on-band [&_p]:text-band-muted">
          <SectionHeading id="fristen" title={t.deadlines.title} intro={t.deadlines.intro} />
          <DeadlineYear t={t.deadlines} />
        </div>
      </section>

      <Process t={t.process} />
      <About lang={lang} t={t.about} />
      <div className="border-t border-rule">
        <Faq t={t.faq} />
      </div>
      <div className="ledger border-t border-rule">
        <ContactSection lang={lang} t={t} title={t.contact.title} intro={t.contact.intro} />
      </div>
    </>
  );
}
