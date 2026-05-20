import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type ContactRow = { label: string; value: string; href?: string };

const CONTACT_ROWS: ContactRow[] = [
  { label: "Tlf", value: "61 28 04 12", href: "tel:61280412" },
  { label: "E-post", value: "post@ringebutann.no", href: "mailto:post@ringebutann.no" },
  { label: "Adresse", value: "Hanstadgata 2, 2630 Ringebu" },
  { label: "Åpent", value: "Man – Tor · 08:00 – 15:30 · Fre · 08:00 – 15:00" },
];

export function CtaCloseout() {
  return (
    <section className="relative isolate min-h-[80vh] overflow-hidden bg-[var(--color-ink)] md:min-h-[88vh]">
      <Image
        src="/images/hero-valley-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[center_55%] brightness-[0.55] saturate-[0.92]"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.78) 100%)",
        }}
      />

      <RevealOnScroll className="relative mx-auto grid min-h-[80vh] w-full max-w-[var(--container-max,1280px)] grid-cols-1 grid-rows-[auto_1fr_auto] gap-10 px-[var(--container-px,24px)] pt-32 pb-20 md:min-h-[88vh] md:grid-cols-[1.4fr_1fr] md:gap-10 md:pt-36 md:pb-24">
        {/* Contact info — top right (same column widths as original grid) */}
        <ul className="order-2 text-[var(--color-text-on-dark)] md:order-none md:col-start-2 md:row-start-1">
          {CONTACT_ROWS.map((row) => (
            <li
              key={row.label}
              className="grid grid-cols-[auto_1fr] items-baseline gap-4 border-t border-[var(--color-rule-dark)] py-3.5 last:border-b last:border-[var(--color-rule-dark)]"
            >
              <span className="font-mono text-[9.5px] uppercase tracking-[0.25em] text-[var(--color-brass)]">
                {row.label}
              </span>
              <span className="text-[14px] font-medium tracking-[-0.01em]">
                {row.href ? (
                  <a href={row.href} className="hover:text-[var(--color-amber)]">
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </span>
            </li>
          ))}
        </ul>

        {/* Main content — bottom left */}
        <div className="order-1 max-w-[640px] md:order-none md:col-start-1 md:row-start-3">
          <SectionEyebrow tone="ink" withRule className="mb-5">
            Bestill en time
          </SectionEyebrow>
          <h2 className="font-sans text-[40px] font-semibold leading-[1] tracking-[-0.032em] text-white md:text-[54px]">
            Smilet ditt fortjener<br />
            <span className="font-light text-[var(--color-amber)]">litt mer tid.</span>
          </h2>
          <Link
            href="/kontakt"
            className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-[var(--color-amber)] px-6 py-3 text-[13px] font-semibold tracking-[0.005em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-amber-deep)]"
          >
            Finn en ledig time
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </RevealOnScroll>
    </section>
  );
}
