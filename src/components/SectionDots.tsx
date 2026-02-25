"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "hero", label: "Hjem" },
  { id: "about", label: "Om Oss" },
  { id: "services", label: "Tjenester" },
  { id: "team", label: "Teamet" },
  { id: "contact", label: "Kontakt" },
];

interface SectionDotsProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export default function SectionDots({ containerRef }: SectionDotsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const sectionHeight = window.innerHeight;
      const index = Math.round(scrollTop / sectionHeight);
      setActiveIndex(Math.min(index, sections.length - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  const scrollToSection = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({
      top: index * window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
      {sections.map((section, i) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(i)}
          className="group relative flex items-center"
          aria-label={`Go to ${section.label}`}
        >
          {/* Tooltip */}
          <span className="absolute right-full mr-3 text-xs font-sans text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {section.label}
          </span>
          {/* Dot */}
          <span
            className={cn(
              "block rounded-full transition-all duration-300",
              activeIndex === i
                ? "w-2.5 h-2.5 bg-[var(--color-accent-gold)]"
                : "w-1.5 h-1.5 bg-[var(--color-text-muted)]/40 group-hover:bg-[var(--color-accent-gold)]/60"
            )}
          />
        </button>
      ))}
    </div>
  );
}
