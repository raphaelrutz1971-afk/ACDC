import { Suspense } from "react";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { ContactDetails, hasContactDetails } from "./contact-details";
import { ContactForm } from "./contact-form";
import { QueryContactForm } from "./query-contact-form";

export function ContactSection({
  lang,
  t,
  headingLevel = "h2",
  title,
  intro,
  readQuery = false,
}: {
  lang: Locale;
  t: Dictionary;
  headingLevel?: "h1" | "h2";
  title: string;
  intro: string;
  /** Preselect a service from `?leistung=<slug>` (used on the contact page). */
  readQuery?: boolean;
}) {
  const Heading = headingLevel;
  const services = t.services.items.map(({ slug, title }) => ({ slug, title }));

  return (
    <section aria-labelledby="kontakt" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Heading
            id="kontakt"
            className="text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-ink"
          >
            {title}
          </Heading>
          <p className="mt-5 max-w-md font-serif text-lg leading-relaxed text-muted">{intro}</p>
          {hasContactDetails && (
            <div className="mt-12">
              <ContactDetails lang={lang} t={t.contact} />
            </div>
          )}
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          {readQuery ? (
            <Suspense fallback={<ContactForm lang={lang} t={t.contact} services={services} />}>
              <QueryContactForm lang={lang} t={t.contact} services={services} />
            </Suspense>
          ) : (
            <ContactForm lang={lang} t={t.contact} services={services} />
          )}
        </div>
      </div>
    </section>
  );
}
