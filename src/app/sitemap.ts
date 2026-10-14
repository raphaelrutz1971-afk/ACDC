import type { MetadataRoute } from "next";
import { serviceSlugs } from "@/content/dictionaries";
import { site } from "@/content/site";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    { path: "", priority: 1 },
    ...serviceSlugs.map((s) => ({ path: `/leistungen/${s}`, priority: 0.8 })),
    { path: "/kontakt", priority: 0.7 },
    { path: "/impressum", priority: 0.2 },
    { path: "/datenschutz", priority: 0.2 },
  ];

  return paths.flatMap(({ path, priority }) =>
    locales.map((lang) => ({
      url: `${site.url}/${lang}${path}`,
      priority,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])),
      },
    })),
  );
}
