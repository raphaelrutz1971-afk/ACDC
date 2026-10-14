import { getDictionary } from "@/content/dictionaries";
import { displayName, site } from "@/content/site";
import type { Locale } from "./i18n";

/** schema.org data built only from facts present in site.ts. */
export function organizationJsonLd(lang: Locale) {
  const t = getDictionary(lang);
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: displayName,
    url: `${site.url}/${lang}`,
    description: t.meta.description,
    areaServed: "CH",
    ...(site.email && { email: site.email }),
    ...(site.phone && { telephone: site.phone }),
    ...(site.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        postalCode: site.address.zip,
        addressLocality: site.address.city,
        addressRegion: site.address.canton,
        addressCountry: "CH",
      },
    }),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t.services.title,
      itemListElement: t.services.items.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.short,
          url: `${site.url}/${lang}/leistungen/${s.slug}`,
        },
      })),
    },
  };
}
