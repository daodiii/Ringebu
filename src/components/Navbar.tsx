"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Hjem" },
  { href: "/behandlinger", label: "Behandlinger" },
  { href: "/priser", label: "Priser" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[var(--color-bg-cream)]/80 backdrop-blur-xl border-b border-[var(--color-border)]/50"
            : "bg-transparent"
        )}
      >
        <div className="container-width flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <span className="font-serif text-xl font-bold text-[var(--color-text-dark)] tracking-tight">
              Ringebu
            </span>
          </Link>

          {/* Desktop Links — centered */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-sans font-light tracking-wide transition-colors duration-300",
                  pathname === link.href
                    ? "text-[var(--color-text-dark)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-dark)]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/kontakt"
              className="hidden md:inline-flex btn-primary text-sm px-6 py-2.5"
            >
              Bestill Time
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-[var(--color-text-dark)] relative z-50"
              aria-label="Toggle menu"
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
            className="fixed inset-0 bg-[var(--color-bg-cream)] z-40 md:hidden flex flex-col justify-center items-center gap-8"
          >
            {navLinks.map((link, i) => (
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
                    "text-3xl font-serif font-bold tracking-tight transition-colors",
                    pathname === link.href
                      ? "text-[var(--color-accent-gold)]"
                      : "text-[var(--color-text-dark)]"
                  )}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <Link
                href="/kontakt"
                onClick={() => setMobileOpen(false)}
                className="btn-primary text-lg px-10 py-4 mt-4"
              >
                Bestill Time
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
