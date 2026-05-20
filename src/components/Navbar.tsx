"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/behandlinger", label: "Behandlinger" },
  { href: "/symptomer", label: "Symptomer" },
  { href: "/priser", label: "Priser" },
  { href: "/informasjon", label: "Om oss" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

type Mode = "dark" | "light";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [heroInView, setHeroInView] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onEnter = () => setHeroInView(true);
    const onExit = () => setHeroInView(false);
    window.addEventListener("ringebu:hero-enter", onEnter);
    window.addEventListener("ringebu:hero-exit", onExit);
    return () => {
      window.removeEventListener("ringebu:hero-enter", onEnter);
      window.removeEventListener("ringebu:hero-exit", onExit);
    };
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const mode: Mode = isHome && heroInView ? "dark" : "light";

  return (
    <>
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,color,backdrop-filter] duration-500",
          mode === "dark"
            ? "bg-transparent text-[var(--color-text-on-dark)]"
            : "bg-[var(--color-paper)]/90 backdrop-blur-md text-[var(--color-text-primary)] border-b border-[var(--color-rule)]"
        )}
      >
        <div className="mx-auto flex w-full max-w-[var(--container-max,1280px)] items-center justify-between px-[var(--container-px,24px)] py-4">
          <Link href="/" className="relative z-50 flex flex-col leading-none">
            <span className="font-sans text-sm font-semibold tracking-[-0.01em]">
              Ringebu Tannlegesenter
            </span>
            <span
              className={cn(
                "mt-0.5 font-mono text-[9px] uppercase tracking-[0.3em]",
                mode === "dark"
                  ? "text-[var(--color-text-on-dark-muted)]"
                  : "text-[var(--color-text-muted)]"
              )}
            >
              Gudbrandsdalen · siden 1985
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-6">
            {LINKS.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-[12.5px] font-medium tracking-[0.005em] transition-colors",
                      mode === "dark"
                        ? active
                          ? "text-[var(--color-amber)]"
                          : "text-[var(--color-text-on-dark)]/75 hover:text-[var(--color-text-on-dark)]"
                        : active
                          ? "text-[var(--color-text-primary)]"
                          : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="/kontakt"
              className="hidden md:inline-flex items-center rounded-full bg-[var(--color-copper)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-paper)] transition-colors hover:bg-[var(--color-copper)]/90"
            >
              Bestill time
            </Link>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Lukk meny" : "Åpne meny"}
              aria-expanded={mobileOpen}
              className={cn(
                "relative z-50 p-2 lg:hidden",
                mode === "dark" && !mobileOpen
                  ? "text-[var(--color-text-on-dark)]"
                  : "text-[var(--color-text-primary)]"
              )}
            >
              {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--color-paper)] lg:hidden overflow-y-auto overscroll-contain"
            role="dialog"
            aria-modal="true"
            aria-label="Navigasjonsmeny"
          >
            <div className="flex min-h-dvh flex-col items-center justify-between gap-8 pt-24 pb-12 px-8">
              <ul className="flex flex-1 flex-col items-center justify-center gap-6">
                {LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-sans text-3xl font-medium tracking-[-0.02em] text-[var(--color-text-primary)]"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="flex flex-col items-center gap-4"
              >
                <a
                  href="tel:61280412"
                  className="flex items-center gap-2 text-[var(--color-text-secondary)]"
                >
                  <Phone className="size-5" aria-hidden="true" /> 61 28 04 12
                </a>
                <Link
                  href="/kontakt"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-[var(--color-copper)] px-7 py-3 font-semibold text-[var(--color-paper)]"
                >
                  Bestill time
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
