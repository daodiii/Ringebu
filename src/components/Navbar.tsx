"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Merke } from "@/components/Merke";
import { cn } from "@/lib/utils";
import { BE_OM_TIME, KONTAKT, RING } from "@/components/kontakt/data";
import { tilSkjema } from "@/components/kontakt/tilSkjema";

const LINKS = [
  { href: "/behandlinger", label: "Behandlinger" },
  { href: "/symptomer", label: "Symptomer" },
  { href: "/priser", label: "Priser" },
  { href: "/informasjon", label: "Om oss" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

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

  const overHero = isHome && heroInView;
  // The form is on the front page itself; anywhere else it is on /kontakt.
  const timeHref = isHome ? `#${BE_OM_TIME.id}` : BE_OM_TIME.href;

  return (
    <>
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-[var(--color-text-primary)] transition-[background-color,backdrop-filter] duration-500",
          overHero
            ? // Over the hero's photograph a phone shows plain sky behind the
              // menu, so there it is see-through, its letters with a glow of
              // paper; a desktop puts birch leaves there, so it keeps its bar
              "bg-transparent [text-shadow:0_0_2px_rgba(252,249,242,0.9),0_0_10px_rgba(252,249,242,0.75),0_0_22px_rgba(252,249,242,0.5)] [&_svg]:drop-shadow-[0_0_8px_rgba(252,249,242,0.85)] lg:bg-[var(--color-paper)] lg:border-b lg:border-[var(--color-rule)] lg:[text-shadow:none] lg:[&_svg]:drop-shadow-none"
            : "bg-[var(--color-paper)]/90 backdrop-blur-md border-b border-[var(--color-rule)]"
        )}
      >
        <div className="mx-auto flex w-full max-w-[var(--container-max,1280px)] items-center justify-between px-[var(--container-px,24px)] py-4 lg:py-2.5">
          <Link
            href="/"
            className="relative z-50 flex items-center gap-2.5 leading-none lg:gap-3"
          >
            {/* The PNG this replaces had air round the mark; the vector is cut tight, so it is set smaller for the same size */}
            <Merke className="h-[34px] w-auto text-[var(--color-ink)] lg:h-[44px]" />
            <span className="font-sans text-[15px] font-semibold tracking-[-0.01em] lg:text-[18px]">
              Ringebu Tannlegesenter
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-7">
            {LINKS.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-[15px] font-medium tracking-[-0.005em] transition-colors",
                      active
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

          <div className="flex items-center gap-5">
            <a
              href={KONTAKT.phone.href}
              className="hidden xl:inline-flex items-center gap-2 text-[15px] font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-brass)]"
            >
              <Phone className="size-4" aria-hidden="true" />
              {KONTAKT.phone.display}
            </a>
            <Link
              href={timeHref}
              onClick={(e) => { if (tilSkjema()) e.preventDefault(); }}
              className="knapp knapp-blekk knapp-liten hidden md:inline-flex"
            >
              {BE_OM_TIME.label}
            </Link>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Lukk meny" : "Åpne meny"}
              aria-expanded={mobileOpen}
              className="relative z-50 p-2 text-[var(--color-text-primary)] lg:hidden"
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
                className="flex w-full max-w-[320px] flex-col items-stretch gap-3"
              >
                <a href={RING.href} className="knapp knapp-blekk">
                  <Phone aria-hidden="true" />
                  {RING.label}
                </a>
                <Link
                  href={timeHref}
                  onClick={(e) => {
                    setMobileOpen(false);
                    // The open menu holds the page still; scroll once it has closed
                    if (document.getElementById(BE_OM_TIME.id)) {
                      e.preventDefault();
                      window.setTimeout(() => tilSkjema(), 80);
                    }
                  }}
                  className="knapp knapp-papir"
                >
                  {BE_OM_TIME.label}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
