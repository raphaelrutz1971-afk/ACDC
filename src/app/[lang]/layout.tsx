import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Schibsted_Grotesk, Source_Serif_4 } from "next/font/google";
import "../globals.css";
import { htmlLang, isLocale, locales } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionaries";
import { displayName, site } from "@/content/site";
import { alternates } from "@/lib/seo";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
import { themeScript } from "@/lib/theme";

const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const text = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-text",
  display: "swap",
  style: ["normal", "italic"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f5f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1a1d" },
  ],
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${displayName} – ${t.meta.title}`,
      template: `%s – ${displayName}`,
    },
    description: t.meta.description,
    applicationName: displayName,
    alternates: alternates(lang, ""),
    openGraph: {
      type: "website",
      siteName: displayName,
      locale: lang === "de" ? "de_CH" : "en",
      title: `${displayName} – ${t.meta.title}`,
      description: t.meta.description,
    },
    twitter: { card: "summary_large_image" },
    formatDetection: { telephone: false },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <html
      lang={htmlLang[lang]}
      className={`${grotesk.variable} ${text.variable}`}
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="sr-only z-[100] rounded bg-marker px-4 py-2 font-semibold text-on-marker focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {t.nav.skip}
        </a>
        <MotionProvider>
          <Header lang={lang} t={t} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer lang={lang} t={t} />
        </MotionProvider>
      </body>
    </html>
  );
}
