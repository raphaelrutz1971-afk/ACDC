# jera.ch – Website

Bilingual (German/English) website for the fiduciary office **jera**: services, an interactive deadline calendar, FAQ and a contact form that sends email via SMTP.

**Stack:** Next.js 16 (App Router, TypeScript, Cache Components) · Tailwind CSS 4 · Motion for React · Lucide icons · Zod · Nodemailer · Playwright

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # optional: fill in SMTP to test the contact form
npm run dev                  # http://localhost:3000 → redirects to /de or /en
```

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run test:e2e` | Playwright end-to-end tests (run `npm run build` first). If Playwright can't find a browser, set `CHROMIUM_PATH` to a Chromium binary or run `npx playwright install chromium`. |

## Content to fill in before going live

Nothing about the firm has been invented. Everything the site needs to know about the business lives in **`src/content/site.ts`**:

| Field | Shown in |
| --- | --- |
| `legalName`, `address`, `phone`, `email` | Footer, contact section, imprint, structured data (SEO) |
| `uid`, `responsiblePerson` | Imprint (legally required in Switzerland) |
| `hours` | Contact section |
| `about`, `team`, `memberships` | "About us" section – hidden until at least one is filled |

Empty fields are simply not shown. The imprint shows "Angaben folgen" until `address`, `uid` and `responsiblePerson` are set, so **fill these in before launch**.

All copy (DE/EN) is in `src/content/dictionaries/de.ts` and `en.ts`. The deadline calendar entries are in the `deadlines.entries` block of the same files – they describe typical Swiss dates and should be reviewed by the firm. The privacy policy (`legal.privacy`) is a starting point and should be checked against the firm's actual data processing.

Team photos go in `public/team/` and are referenced from `site.ts` (e.g. `photo: "/team/anna.jpg"`).

## Contact form (SMTP)

The form validates on the client and again on the server (`src/app/api/contact/route.ts`), has a honeypot against bots and a simple per-instance rate limit. Requests are sent as plain-text email to `CONTACT_TO`, with the visitor's address as *Reply-To*.

Set these environment variables (see `.env.example`):

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` – your mail provider's SMTP account (e.g. the firm's existing mailbox; for Microsoft 365 or Google Workspace use an app password / SMTP AUTH must be enabled)
- `CONTACT_TO` – mailbox that receives requests
- `CONTACT_FROM` – sender address (defaults to `SMTP_USER`)

Without them, the form shows: "Das Kontaktformular ist noch nicht eingerichtet …" – nothing fails silently.

## Deploy to Vercel

1. Push this repository to GitHub (already done if you're reading this there).
2. In Vercel: **Add New → Project → Import** the repository. Vercel detects Next.js automatically; no build settings need changing.
3. Under **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL` and the SMTP variables from `.env.example`.
4. Deploy. Then under **Settings → Domains**, add `jera.ch` and `www.jera.ch` and set the DNS records Vercel shows at your domain registrar.

Or with the CLI: `npx vercel` (preview) and `npx vercel --prod` (production).

## Project structure

```
src/
  app/
    [lang]/                 de / en routes (root layout, home, services, contact, legal, 404)
    api/contact/route.ts    contact form endpoint (SMTP)
    sitemap.ts, robots.ts, icon.svg
  components/               UI components (header, hero, deadline calendar, form, …)
  content/
    site.ts                 firm facts – edit here
    dictionaries/           all copy in German and English
  lib/                      i18n, SEO helpers, validation schema, theme
  proxy.ts                  redirects "/" to /de or /en by browser language
e2e/                        Playwright tests
```

## Notes

- **Dark mode** follows the system setting by default; visitors can switch between light, dark and system in the header. The choice is stored in `localStorage` only.
- **No tracking or cookies.** If you add analytics later, update the privacy policy.
- **Accessibility:** skip link, keyboard-navigable menu (focus trap, Escape), calendar with arrow-key navigation, labelled form errors, visible focus, `prefers-reduced-motion` respected.
