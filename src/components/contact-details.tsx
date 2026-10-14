import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import { displayName, site, telHref } from "@/content/site";
import type { Locale } from "@/lib/i18n";

export const hasContactDetails = Boolean(site.address || site.phone || site.email || site.hours);

/** Lists only the details that are filled in src/content/site.ts. */
export function ContactDetails({ lang, t }: { lang: Locale; t: Dictionary["contact"] }) {
  if (!hasContactDetails) return null;
  const row = "flex gap-4 border-b border-rule py-5";
  const icon = "mt-0.5 size-5 shrink-0 text-fir";

  return (
    <div>
      <h3 className="text-sm font-semibold text-muted">{t.details}</h3>
      <dl className="mt-3 border-t border-rule">
        {site.address && (
          <div className={row}>
            <MapPin aria-hidden className={icon} />
            <div>
              <dt className="sr-only">{t.address}</dt>
              <dd className="text-ink">
                <a
                  className="underline-offset-4 hover:underline"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${displayName}, ${site.address.street}, ${site.address.zip} ${site.address.city}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {site.address.street}
                  <br />
                  {site.address.zip} {site.address.city}
                </a>
              </dd>
            </div>
          </div>
        )}
        {site.phone && (
          <div className={row}>
            <Phone aria-hidden className={icon} />
            <div>
              <dt className="sr-only">{t.phone}</dt>
              <dd>
                <a className="text-lg font-semibold text-ink underline-offset-4 hover:underline" href={telHref(site.phone)}>
                  {site.phone}
                </a>
              </dd>
            </div>
          </div>
        )}
        {site.email && (
          <div className={row}>
            <Mail aria-hidden className={icon} />
            <div>
              <dt className="sr-only">{t.email}</dt>
              <dd>
                <a className="text-lg font-semibold text-ink underline-offset-4 hover:underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </dd>
            </div>
          </div>
        )}
        {site.hours && (
          <div className={row}>
            <Clock aria-hidden className={icon} />
            <div>
              <dt className="sr-only">{t.hours}</dt>
              {site.hours[lang].map((h) => (
                <dd key={h} className="text-ink">
                  {h}
                </dd>
              ))}
            </div>
          </div>
        )}
      </dl>
    </div>
  );
}
