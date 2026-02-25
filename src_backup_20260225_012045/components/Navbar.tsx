"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Hjem" },
  { href: "/behandlinger", label: "Vår ekspertise" },
  { href: "/priser", label: "Behandlinger" },
  { href: "/kontakt", label: "Kontakt Oss" },
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

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "glass border-white/20 py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container-width flex items-center justify-between h-14">
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-2 group relative z-50">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-hover text-white flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
            <span className="font-serif font-bold text-lg leading-none mt-0.5">R</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
              Ringebu Tannlegesenter
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - Capsule Style */}
        <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center p-1 rounded-full glass border border-white/20 shadow-sm bg-white/50 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300",
                    isActive
                      ? "bg-white text-primary shadow-sm"
                      : "text-muted hover:text-foreground hover:bg-white/40"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Area: CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/kontakt"
            className="hidden sm:inline-flex btn-primary shadow-lg shadow-primary/20"
          >
            Bestill Time
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-foreground/80 hover:bg-black/5 rounded-full transition-colors relative z-50"
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-xl z-40 md:hidden transition-all duration-500 ease-in-out flex flex-col justify-center items-center gap-6",
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "text-2xl font-medium tracking-tight transition-all duration-300 hover:scale-110",
              pathname === link.href ? "text-primary" : "text-foreground/60 hover:text-foreground"
            )}
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/kontakt"
          onClick={() => setMobileOpen(false)}
          className="mt-4 btn-primary text-lg px-8 py-4 shadow-xl shadow-primary/20"
        >
          Bestill Time
        </Link>
      </div>
    </nav>
  );
}
