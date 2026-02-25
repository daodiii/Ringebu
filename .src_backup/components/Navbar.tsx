"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Calendar } from "lucide-react";

const navLinks = [
  { href: "/", label: "Hjem" },
  { href: "/behandlinger", label: "Behandlinger" },
  { href: "/priser", label: "Priser" },
  { href: "/kontakt", label: "Kontakt Oss" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 shadow-lg shadow-black/[0.03] backdrop-blur-xl"
          : "glass-1"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:bg-primary-hover transition-colors duration-300">
              <svg
                viewBox="0 0 32 32"
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 6c-1.5 0-3 1.2-3 3.5 0 1.8.8 3.2 1.8 4.5l7.2 14 7.2-14c1-1.3 1.8-2.7 1.8-4.5 0-2.3-1.5-3.5-3-3.5-1.2 0-2.2.6-3 1.5-.6.7-1.5 1-2 1h-2c-.5 0-1.4-.3-2-1C12.2 6.6 11.2 6 10 6z" />
                <path d="M13 14c.5 1.5 1.5 2.5 3 2.5s2.5-1 3-2.5" opacity="0.5" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-xl text-primary-dark tracking-tight">
                Ringebu
              </span>
              <span className="text-[10px] font-semibold text-accent uppercase tracking-[0.2em] mt-0.5">
                Tannlegesenter
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-primary-dark"
                      : "text-muted hover:text-primary-dark"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-0.5 bg-primary transition-all duration-300 ${
                      isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/kontakt"
              className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              Bestill Time
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-foreground/70 hover:bg-surface transition-colors"
              aria-label="Åpne meny"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-2 border-t border-white/20 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? "bg-primary/8 text-primary-dark border-l-3 border-primary"
                      : "text-muted hover:bg-surface hover:text-primary-dark"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/kontakt"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-3 rounded-xl text-base font-semibold mt-3 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Bestill Time
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
