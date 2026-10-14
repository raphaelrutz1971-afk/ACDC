"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { buttonClasses } from "./button";

const ease = [0.2, 0.7, 0.2, 1] as const;

export function Hero({ lang, t }: { lang: Locale; t: Dictionary }) {
  const reduce = useReducedMotion();
  const [swept, setSwept] = useState(false);
  const items = t.hero.checklist;
  const tickDelay = (i: number) => 0.7 + i * 0.28;
  const sweepDelay = tickDelay(items.length - 1) + 0.25;

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="ledger pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_30%,transparent)] opacity-70"
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pt-12 pb-20 sm:px-8 md:pt-20 lg:grid-cols-12 lg:gap-10 lg:pt-24 lg:pb-28">
        <div className="lg:col-span-7">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="text-[clamp(2.5rem,5.3vw,4.6rem)] leading-[0.98] font-extrabold tracking-[-0.035em] text-balance text-ink"
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease }}
            className="mt-8 max-w-[34rem] font-serif text-xl leading-relaxed text-muted sm:text-[1.35rem]"
          >
            {t.hero.lead}
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link href={`/${lang}/kontakt`} className={buttonClasses("primary", "px-7 py-3.5")}>
              {t.hero.primary}
            </Link>
            <Link href={`/${lang}#leistungen`} className={buttonClasses("secondary", "px-7 py-3.5")}>
              {t.hero.secondary}
            </Link>
          </motion.div>
        </div>

        {/* The worksheet: ticks fill in one by one, the last line gets highlighted. */}
        <motion.figure
          aria-label={`${t.hero.sheetTitle} – ${t.hero.sheetSub}`}
          initial={reduce ? false : { opacity: 0, y: 24, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
          className="relative mx-auto w-full max-w-md self-center lg:col-span-5 lg:mx-0 lg:justify-self-end"
        >
          <div className="relative rounded-[6px] border border-rule-strong bg-surface shadow-[0_1px_0_var(--rule),0_24px_48px_-24px_rgb(20_34_41/0.35)]">
            <div className="flex items-baseline justify-between border-b-2 border-ink px-6 pt-6 pb-3">
              <span className="text-lg font-bold tracking-tight text-ink">{t.hero.sheetTitle}</span>
              <span className="font-serif text-sm italic text-muted">{t.hero.sheetSub}</span>
            </div>
            <div className="absolute top-0 bottom-0 left-12 w-px bg-fir/40" aria-hidden />
            <ul className="pb-3">
              {items.map((item, i) => {
                const last = i === items.length - 1;
                return (
                  <li key={item} className="flex min-h-12 items-center border-b border-rule py-2 pr-5 last:border-b-0">
                    <span className="grid w-12 shrink-0 place-items-center">
                      <motion.span
                        initial={reduce ? false : { scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: tickDelay(i), type: "spring", stiffness: 500, damping: 24 }}
                        className="grid size-5 place-items-center rounded-full bg-fir text-on-fir"
                      >
                        <Check aria-hidden className="size-3.5" strokeWidth={3} />
                      </motion.span>
                    </span>
                    <span className="relative pl-4 text-[0.98rem] text-ink">
                      {last && (
                        <motion.span
                          aria-hidden
                          initial={reduce ? false : { scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: sweepDelay, duration: 0.55, ease }}
                          onAnimationComplete={() => setSwept(true)}
                          className="absolute inset-y-[22%] right-[-0.3em] left-[0.7em] origin-left -skew-x-6 rounded-[2px] bg-marker"
                        />
                      )}
                      <span className={`relative ${last ? `font-semibold transition-colors duration-300 ${swept ? "text-on-marker" : "text-ink"}` : ""}`}>
                        {item}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
