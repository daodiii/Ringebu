"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/behandlinger", label: "Behandlinger" },
  { href: "/symptomer", label: "Symptomer" },
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

  return (
    <>
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-[var(--color-text-primary)] transition-[background-color,backdrop-filter] duration-500",
          overHero
            ? "bg-transparent"
            : "bg-[var(--color-paper)]/90 backdrop-blur-md border-b border-[var(--color-rule)]"
        )}
      >
        <div className="mx-auto flex w-full max-w-[var(--container-max,1280px)] items-center justify-between px-[var(--container-px,24px)] py-4">
          <Link href="/" className="relative z-50 flex items-center gap-2.5 leading-none">
            <Image
              src="/images/logo-mark.png"
              alt=""
              width={217}
              height={200}
              className="h-10 w-auto"
              priority
            />
            <span className="font-sans text-[15px] font-semibold tracking-[-0.01em]">
              Ringebu Tannlegesenter
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

          <div className="flex items-center gap-3">
            <Link
              href="/kontakt"
              className="hidden md:inline-flex items-center rounded-full bg-[var(--color-copper)] px-5 py-2 text-[13px] font-semibold text-[var(--color-paper)] transition-colors hover:bg-[var(--color-copper)]/90"
            >
              Bestill time
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
