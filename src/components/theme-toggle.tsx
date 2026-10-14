"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useSyncExternalStore } from "react";
import {
  resolveTheme,
  THEME_STORAGE_KEY,
  type ThemePreference,
} from "@/lib/theme";

const listeners = new Set<() => void>();

function readPreference(): ThemePreference {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    return "system";
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function apply(pref: ThemePreference) {
  document.documentElement.setAttribute("data-theme", resolveTheme(pref));
}

type Labels = { label: string; light: string; dark: string; system: string };

export function ThemeToggle({ labels }: { labels: Labels }) {
  const pref = useSyncExternalStore(subscribe, readPreference, () => "system");

  const choose = useCallback((next: ThemePreference) => {
    try {
      if (next === "system") localStorage.removeItem(THEME_STORAGE_KEY);
      else localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage blocked: theme still applies for this page view */
    }
    apply(next);
    listeners.forEach((l) => l());
  }, []);

  // Follow the OS setting live while "system" is selected.
  useEffect(() => {
    if (pref !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => apply("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [pref]);

  const options = [
    { value: "light", label: labels.light, Icon: Sun },
    { value: "dark", label: labels.dark, Icon: Moon },
    { value: "system", label: labels.system, Icon: Monitor },
  ] as const;

  return (
    <div
      role="radiogroup"
      aria-label={labels.label}
      className="inline-flex rounded-full border border-rule p-0.5"
    >
      {options.map(({ value, label, Icon }) => {
        const active = pref === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            title={label}
            onClick={() => choose(value)}
            className={`grid size-8 place-items-center rounded-full transition-colors ${
              active
                ? "bg-ink text-paper"
                : "text-muted hover:bg-surface hover:text-ink"
            }`}
          >
            <Icon aria-hidden className="size-4" strokeWidth={2} />
            <span className="sr-only">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
