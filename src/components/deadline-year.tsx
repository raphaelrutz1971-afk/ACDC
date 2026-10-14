"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, useSyncExternalStore } from "react";
import type { Dictionary } from "@/content/dictionaries";

const noop = () => () => {};
const getMonth = () => new Date().getMonth();
const getServerMonth = () => null;

export function DeadlineYear({ t }: { t: Dictionary["deadlines"] }) {
  const current = useSyncExternalStore(noop, getMonth, getServerMonth);
  const [picked, setPicked] = useState<number | null>(null);
  const selected = picked ?? current ?? 0;
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const entries = t.entries[selected] ?? [];
  const upcoming =
    Array.from({ length: 11 }, (_, k) => (selected + 1 + k) % 12).find(
      (m) => (t.entries[m]?.length ?? 0) > 0,
    ) ?? null;

  const focusTab = (i: number) => {
    const next = (i + 12) % 12;
    setPicked(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const map: Record<string, number> = {
      ArrowRight: i + 1,
      ArrowLeft: i - 1,
      Home: 0,
      End: 11,
    };
    if (e.key in map) {
      e.preventDefault();
      focusTab(map[e.key]);
    }
  };

  return (
    <div className="mt-14">
      <div
        role="tablist"
        aria-label={t.title}
        className="grid grid-cols-6 border-t border-l border-band-rule lg:grid-cols-12"
      >
        {t.monthsShort.map((m, i) => {
          const active = i === selected;
          const count = t.entries[i]?.length ?? 0;
          return (
            <button
              key={m}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`month-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={active}
              aria-controls="month-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => setPicked(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`relative flex h-24 flex-col justify-between border-r border-b border-band-rule p-3 text-left transition-colors sm:h-28 ${
                active
                  ? "bg-marker text-on-marker"
                  : "text-on-band hover:bg-white/5"
              }`}
            >
              <span className="flex items-center justify-between">
                <span className="text-lg font-bold tracking-tight">
                  <span aria-hidden>{m}</span>
                  <span className="sr-only">{t.months[i]}</span>
                </span>
                {current === i && (
                  <span
                    title={t.current}
                    className={`size-2 rounded-full ${active ? "bg-on-marker" : "bg-marker"}`}
                  >
                    <span className="sr-only">({t.current})</span>
                  </span>
                )}
              </span>
              <span aria-hidden className="flex gap-1">
                {Array.from({ length: count }, (_, k) => (
                  <span
                    key={k}
                    className={`h-1.5 w-4 rounded-full ${active ? "bg-on-marker" : "bg-band-muted"}`}
                  />
                ))}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="month-panel"
        role="tabpanel"
        aria-labelledby={`month-tab-${selected}`}
        tabIndex={0}
        className="grid min-h-64 gap-8 border-b border-band-rule py-10 md:grid-cols-12"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
            className="grid gap-8 md:col-span-12 md:grid-cols-12"
          >
            <h3 className="text-4xl font-extrabold tracking-[-0.03em] text-on-band md:col-span-4 md:text-5xl">
              {t.months[selected]}
            </h3>
            <div className="md:col-span-8">
              {entries.length === 0 ? (
                <div>
                  <p className="max-w-xl font-serif text-lg leading-relaxed text-band-muted">
                    {t.empty}
                  </p>
                  {upcoming !== null && (
                    <button
                      type="button"
                      onClick={() => focusTab(upcoming)}
                      className="mt-6 inline-flex items-center gap-3 rounded-full border border-band-rule py-2 pr-5 pl-2 text-left text-on-band transition-colors hover:border-marker"
                    >
                      <span className="rounded-full bg-marker px-3 py-1 text-sm font-bold text-on-marker">
                        {t.monthsShort[upcoming]}
                      </span>
                      <span>
                        <span className="text-band-muted">{t.next}: </span>
                        <span className="font-semibold">{t.entries[upcoming][0].title}</span>
                      </span>
                    </button>
                  )}
                </div>
              ) : (
                <ul className="space-y-7">
                  {entries.map((e) => (
                    <li key={e.title} className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:gap-6">
                      <span className="self-start justify-self-start rounded-full border border-band-rule px-3 py-1 text-sm font-semibold text-band-muted">
                        {e.tag}
                      </span>
                      <div>
                        <p className="text-xl font-bold text-on-band">{e.title}</p>
                        <p className="mt-1.5 max-w-xl font-serif text-lg leading-relaxed text-band-muted">
                          {e.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-band-muted">{t.note}</p>
    </div>
  );
}
