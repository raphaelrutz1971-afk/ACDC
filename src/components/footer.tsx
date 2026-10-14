import Link from "next/link";
import { ArrowUp } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import { displayName, site, telHref } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { Logo } from "./logo";
import { CurrentYear } from "./current-year";

export function Footer({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <footer className="border-t border-rule bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-4 max-w-sm font-serif text-lg leading-relaxed text-muted">
            {t.footer.tagline}
          </p>
        </div>

        <nav aria-label={t.services.title} className="md:col-span-3">
          <h2 className="text-sm font-semibold text-muted">{t.services.title}</h2>
          <ul className="mt-4 space-y-2.5">
            {t.services.items.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${lang}/leistungen/${s.slug}`}
                  className="group text-ink"
                >
                  <span className="mark-hover">{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="text-sm font-semibold text-muted">{t.contact.title}</h2>
          <address className="mt-4 space-y-1.5 not-italic text-ink">
            <div>{displayName}</div>
            {site.address && (
              <>
                <div>{site.address.street}</div>
                <div>
                  {site.address.zip} {site.address.city}
                </div>
              </>
            )}
            {site.phone && (
              <div>
                <a className="underline-offset-4 hover:underline" href={telHref(site.phone)}>
                  {site.phone}
                </a>
              </div>
            )}
            {site.email && (
              <div>
                <a className="underline-offset-4 hover:underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </div>
            )}
            <div className="pt-2">
              <Link
                href={`/${lang}/kontakt`}
                className="font-semibold text-fir underline-offset-4 hover:underline"
              >
                {t.nav.cta}
              </Link>
            </div>
          </address>
        </div>
      </div>

      <div className="border-t border-rule">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 text-sm text-muted sm:px-8">
          <p>
            © <CurrentYear /> {displayName}
          </p>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}/impressum`} className="hover:text-ink">
              {t.footer.imprint}
            </Link>
            <Link href={`/${lang}/datenschutz`} className="hover:text-ink">
              {t.footer.privacy}
            </Link>
            <a href="#main" className="inline-flex items-center gap-1.5 hover:text-ink">
              <ArrowUp aria-hidden className="size-4" />
              {t.footer.top}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
