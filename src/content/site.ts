/**
 * Firm facts for jera.ch — the ONLY place to edit business details.
 *
 * Everything set to `null` (or an empty list) is not shown on the website.
 * Nothing here is invented: fill in the real values before going live.
 * See README.md → "Content to fill in".
 */

export type TeamMember = {
  name: string;
  role: { de: string; en: string };
  email?: string;
  /** Path to an image in /public, e.g. "/team/anna.jpg" (square, ≥ 600px). */
  photo?: string;
};

export type SiteConfig = {
  /** Brand name as it appears in the logo and titles. */
  name: string;
  /** Legal name as registered in the commercial register, e.g. "jera Treuhand GmbH". */
  legalName: string | null;
  /** Production URL without trailing slash. Used for SEO, sitemap and canonical links. */
  url: string;
  address: {
    street: string;
    zip: string;
    city: string;
    /** Two-letter canton code, e.g. "ZH". */
    canton: string;
  } | null;
  /** Display format, e.g. "+41 44 123 45 67". */
  phone: string | null;
  email: string | null;
  /** UID from the commercial register, e.g. "CHE-123.456.789". Shown in the imprint. */
  uid: string | null;
  /** Person(s) responsible for the content, shown in the imprint. */
  responsiblePerson: string | null;
  /** Opening hours, one line per entry. */
  hours: { de: string[]; en: string[] } | null;
  /** Memberships, e.g. "TREUHAND|SUISSE", "EXPERTsuisse". */
  memberships: string[];
  /** Short paragraph about the firm. Shown in the "About" section when set. */
  about: { de: string; en: string } | null;
  team: TeamMember[];
};

export const site: SiteConfig = {
  name: "jera",
  legalName: null,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jera.ch",
  address: null,
  phone: null,
  email: null,
  uid: null,
  responsiblePerson: null,
  hours: null,
  memberships: [],
  about: null,
  team: [],
};

export const displayName = site.legalName ?? `${site.name} Treuhand`;

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
