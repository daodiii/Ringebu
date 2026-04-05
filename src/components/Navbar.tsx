"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const mainLinks = [
  { href: "/", label: "Hjem" },
  { href: "/behandlinger", label: "Behandlinger" },
];

const nyttigInfoLinks = [
  { href: "/symptomer", label: "Symptomer" },
  { href: "/informasjon", label: "Støtte" },
  { href: "/artikler", label: "Artikler" },
];

const allMobileLinks = [
  { href: "/", label: "Hjem" },
  { href: "/behandlinger", label: "Behandlinger" },
  { href: "/symptomer", label: "Symptomer" },
  { href: "/informasjon", label: "Støtte" },
  { href: "/artikler", label: "Artikler" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [pathname]);

  const isNyttigActive = nyttigInfoLinks.some((l) => pathname === l.href || pathname.startsWith(l.href + "/"));

  const navBg = scrolled
    ? "bg-white/90 backdrop-blur-xl shadow-sm"
    : "bg-white/80 backdrop-blur-sm";

  return (
    <>
      <nav className={cn(
        "fixed top-0 inset-x-0 z-50 transition-[background-color,box-shadow] duration-500",
        navBg
      )}>
        <div className="container-width flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center gap-1 text-[var(--color-primary)]">
            <div className="flex flex-col leading-none font-heading font-700 tracking-tight">
              <span className="text-xl">RINGEBU</span>
              <span className="text-[0.6875rem] font-sans font-400 tracking-[0.25em] uppercase opacity-70">
                Tannlegesenter
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Hjem + Behandlinger */}
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-sans transition-colors duration-300",
                  pathname === link.href
                    ? "bg-[var(--color-bg-cream)] text-[var(--color-primary)] font-500"
                    : "text-[var(--color-stone-600)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-cream)]"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Nyttig info dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                className={cn(
                  "flex items-center gap-1 px-4 py-2 rounded-full text-sm font-sans transition-colors duration-300 cursor-pointer",
                  isNyttigActive
                    ? "bg-[var(--color-bg-cream)] text-[var(--color-primary)] font-500"
                    : "text-[var(--color-stone-600)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-cream)]"
                )}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                Nyttig info
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform duration-200",
                    dropdownOpen && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    onMouseLeave={() => setDropdownOpen(false)}
                    className="absolute top-full left-0 mt-1 w-48 rounded-2xl bg-white border border-[var(--color-border)] shadow-lg shadow-black/5 overflow-hidden py-1.5"
                  >
                    {nyttigInfoLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "block px-4 py-2.5 text-sm font-sans transition-colors duration-200",
                          pathname === link.href || pathname.startsWith(link.href + "/")
                            ? "bg-[var(--color-bg-cream)] text-[var(--color-primary)] font-500"
                            : "text-[var(--color-stone-600)] hover:bg-[var(--color-bg-cream)] hover:text-[var(--color-primary)]"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Kontakt */}
            <Link
              href="/kontakt"
              className={cn(
                "px-4 py-2 rounded-full text-sm font-sans transition-colors duration-300",
                pathname === "/kontakt"
                  ? "bg-[var(--color-bg-cream)] text-[var(--color-primary)] font-500"
                  : "text-[var(--color-stone-600)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-cream)]"
              )}
            >
              Kontakt
            </Link>
          </div>

          {/* Right — CTA + Phone + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="tel:61280412"
              className="hidden md:flex items-center gap-2 text-sm font-sans transition-colors text-[var(--color-stone-500)] hover:text-[var(--color-accent)]"
            >
              <Phone className="size-4" aria-hidden="true" />
              <span>61 28 04 12</span>
            </a>
            <Link
              href="/kontakt"
              className="hidden md:inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-500 font-sans transition-colors duration-300 bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] hover:shadow-lg hover:shadow-[var(--color-accent)]/20"
            >
              Bestill time
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "lg:hidden p-2 relative z-50 transition-colors",
                "text-[var(--color-primary)]"
              )}
              aria-label="Meny"
            >
              {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-45 bg-white lg:hidden overflow-y-auto overscroll-contain"
            style={{ zIndex: 45 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigasjonsmeny"
          >
            <div className="flex flex-col items-center min-h-dvh pt-24 pb-12 px-8 gap-5">
              {/* Nav links */}
              <div className="flex flex-col items-center gap-5 flex-1 justify-center">
                {allMobileLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "text-3xl font-heading font-600 tracking-tight transition-colors",
                        pathname === link.href
                          ? "text-[var(--color-accent)]"
                          : "text-[var(--color-stone-800)]"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Bottom actions — always visible */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="flex flex-col items-center gap-4 pt-4 shrink-0"
              >
                <a
                  href="tel:61280412"
                  className="flex items-center gap-2 text-[var(--color-stone-500)] text-lg"
                >
                  <Phone className="size-5" aria-hidden="true" />
                  61 28 04 12
                </a>
                <Link
                  href="/kontakt"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary text-lg px-10 py-4"
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
