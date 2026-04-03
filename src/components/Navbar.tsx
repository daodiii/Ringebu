"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/behandlinger", label: "Behandlinger" },
  { href: "/symptomer", label: "Symptomer" },
  { href: "/artikler", label: "Artikler" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navBg = isHome && !scrolled
    ? "bg-transparent"
    : "bg-white/90 backdrop-blur-xl shadow-sm";

  const textColor = isHome && !scrolled
    ? "text-white"
    : "text-[var(--color-emerald-950)]";

  const logoColor = isHome && !scrolled
    ? "text-white"
    : "text-[var(--color-emerald-950)]";

  return (
    <>
      <nav className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        navBg
      )}>
        <div className="container-width flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className={cn("relative z-50 flex items-center gap-1", logoColor)}>
            <div className="flex flex-col leading-none font-heading font-700 tracking-tight">
              <span className="text-xl">RINGEBU</span>
              <span className="text-[0.65rem] font-sans font-400 tracking-[0.25em] uppercase opacity-70">
                Tannlegesenter
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-full text-[0.9375rem] font-sans transition-all duration-300",
                  pathname === link.href
                    ? isHome && !scrolled
                      ? "bg-white/20 text-white font-500"
                      : "bg-[var(--color-emerald-50)] text-[var(--color-emerald-700)] font-500"
                    : isHome && !scrolled
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : "text-[var(--color-stone-600)] hover:text-[var(--color-emerald-700)] hover:bg-[var(--color-emerald-50)]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — CTA + Phone + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="tel:61280412"
              className={cn(
                "hidden md:flex items-center gap-2 text-sm font-sans transition-colors",
                isHome && !scrolled ? "text-white/80 hover:text-white" : "text-[var(--color-stone-500)] hover:text-[var(--color-emerald-600)]"
              )}
            >
              <Phone className="size-4" />
              <span>61 28 04 12</span>
            </a>
            <Link
              href="/kontakt"
              className={cn(
                "hidden md:inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-500 font-sans transition-all duration-300",
                isHome && !scrolled
                  ? "bg-white text-[var(--color-emerald-800)] hover:bg-white/90 hover:shadow-lg"
                  : "bg-[var(--color-emerald-600)] text-white hover:bg-[var(--color-emerald-700)] hover:shadow-lg hover:shadow-[#B8976A]/20"
              )}
            >
              Bestill time
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "lg:hidden p-2 relative z-50 transition-colors",
                mobileOpen ? "text-[var(--color-emerald-950)]" : textColor
              )}
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
            className="fixed inset-0 bg-white z-40 lg:hidden"
          >
            <div className="flex flex-col justify-center items-center h-full gap-6 px-8">
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
                      "text-3xl font-heading font-600 tracking-tight transition-colors",
                      pathname === link.href
                        ? "text-[var(--color-emerald-600)]"
                        : "text-[var(--color-stone-800)]"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="flex flex-col items-center gap-4 mt-4"
              >
                <a
                  href="tel:61280412"
                  className="flex items-center gap-2 text-[var(--color-stone-500)] text-lg"
                >
                  <Phone className="size-5" />
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
