import { ImageResponse } from "next/og";
import { getDictionary } from "@/content/dictionaries";
import { displayName } from "@/content/site";
import { isLocale, locales } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = displayName;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(isLocale(lang) ? lang : "de");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f3f5f2",
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 47px, #c5d9cf 47px, #c5d9cf 48px)",
          color: "#142229",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: -6,
              bottom: 4,
              width: 150,
              height: 28,
              background: "#ecd84a",
              transform: "skewX(-12deg)",
            }}
          />
          <div style={{ display: "flex", fontSize: 72, fontWeight: 800, letterSpacing: -3, position: "relative" }}>
            jera<span style={{ color: "#1d4b42" }}>.</span>
          </div>
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, maxWidth: 1000 }}>
          {t.hero.title}
        </div>
        <div style={{ fontSize: 28, color: "#56666b" }}>{t.meta.title}</div>
      </div>
    ),
    size,
  );
}
