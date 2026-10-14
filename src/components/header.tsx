"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { Logo } from "./logo";
import { buttonClasses } from "./button";
import { LanguageSwitch } from "./language-switch";
import { ThemeToggle } from "./theme-toggle";

export function Header({ lang, t }: { lang: Locale; t: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const links = [
    { href: `/${lang}#leistungen`, label: t.nav.services },
    { href: `/${lang}#fristen`, label: t.nav.deadlines },
    { href: `/${lang}#ablauf`, label: t.nav.process },
    { href: `/${lang}#fragen`, label: t.nav.faq },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const button = menuButton.current;
    panel.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const items = panel.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        open
          ? "border-b border-rule bg-paper" // no backdrop-filter: it would trap the fixed menu panel
          : scrolled
            ? "border-b border-rule bg-paper/85 backdrop-blur-md"
            : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href={`/${lang}`}
          aria-label={`${t.nav.home} – jera`}
          className="shrink-0 rounded-sm"
        >
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group rounded-full px-3.5 py-2 text-[0.95rem] font-medium text-ink"
                >
                  <span className="mark-hover">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitch lang={lang} label={t.nav.language} />
          <ThemeToggle labels={t.nav.theme} />
          <Link
            href={`/${lang}/kontakt`}
            className={buttonClasses("primary", "px-5 py-2.5")}
          >
            {t.nav.cta}
          </Link>
        </div>

        <button
          ref={menuButton}
          type="button"
          className="grid size-11 place-items-center rounded-full border border-rule text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? t.nav.closeMenu : t.nav.openMenu}</span>
          {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.openMenu}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
            className="ledger fixed inset-x-0 top-18 bottom-0 overflow-y-auto border-t border-rule bg-paper lg:hidden"
          >
            <div className="flex min-h-full flex-col px-5 pt-6 pb-10 sm:px-8">
              <ul className="flex flex-col">
                {[...links, { href: `/${lang}/kontakt`, label: t.nav.contact }].map(
                  (l, i) => (
                    <motion.li
                      key={l.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i + 0.05 }}
                    >
                      <Link
                        href={l.href}
                        onClick={close}
                        className="group block py-3 text-3xl font-bold tracking-tight text-ink"
                      >
                        <span className="mark-hover">{l.label}</span>
                      </Link>
                    </motion.li>
                  ),
                )}
              </ul>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-10">
                <LanguageSwitch lang={lang} label={t.nav.language} onNavigate={close} />
                <ThemeToggle labels={t.nav.theme} />
              </div>
              <Link
                href={`/${lang}/kontakt`}
                onClick={close}
                className={buttonClasses("primary", "mt-6 w-full py-4")}
              >
                {t.nav.cta}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
