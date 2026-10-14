"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import type { Dictionary } from "@/content/dictionaries";

export function Faq({ t }: { t: Dictionary["faq"] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <section aria-labelledby="fragen" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
      <div className="grid gap-12 md:grid-cols-12">
        <h2
          id="fragen"
          className="text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-ink md:col-span-4"
        >
          {t.title}
        </h2>
        <ul className="border-t-2 border-ink md:col-span-8">
          {t.items.map((item, i) => {
            const isOpen = open === i;
            const btn = `${base}-q${i}`;
            const panel = `${base}-a${i}`;
            return (
              <li key={item.q} className="border-b border-rule-strong">
                <h3>
                  <button
                    id={btn}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left text-lg font-semibold text-ink sm:text-xl"
                  >
                    <span className="mark-hover">{item.q}</span>
                    <Plus
                      aria-hidden
                      className={`mt-1 size-5 shrink-0 text-fir transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panel}
                      role="region"
                      aria-labelledby={btn}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 font-serif text-lg leading-relaxed text-muted">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
