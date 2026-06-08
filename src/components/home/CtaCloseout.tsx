import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type ContactRow = { value: string; href?: string };

const CONTACT_ROWS: ContactRow[] = [
  { value: "61 28 04 12", href: "tel:61280412" },
  { value: "post@ringebutann.no", href: "mailto:post@ringebutann.no" },
  { value: "Hanstadgata 2, 2630 Ringebu" },
  { value: "Man – Tor · 08:00 – 15:30 · Fre · 08:00 – 15:00" },
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
            "linear-gradient(180deg, rgba(14,42,48,0.45) 0%, transparent 30%, transparent 60%, rgba(8,32,37,0.82) 100%)",
        }}
      />

      <RevealOnScroll className="relative mx-auto grid min-h-[80vh] w-full max-w-[var(--container-max,1280px)] grid-cols-1 grid-rows-[auto_1fr_auto] gap-10 px-[var(--container-px,24px)] pt-32 pb-20 md:min-h-[88vh] md:grid-cols-[1.4fr_1fr] md:gap-10 md:pt-36 md:pb-24">
        {/* Contact info — top right */}
        <ul className="order-2 text-white md:order-none md:col-start-2 md:row-start-1 md:text-[var(--color-text-on-dark)]">
          {CONTACT_ROWS.map((row) => (
            <li
              key={row.value}
              className="border-t border-[var(--color-rule-dark)] py-4 text-[17px] font-medium leading-[1.4] tracking-[-0.01em] last:border-b last:border-[var(--color-rule-dark)]"
            >
              {row.href ? (
                <a href={row.href} className="transition-colors hover:text-[var(--color-amber-deep)]">
                  {row.value}
                </a>
              ) : (
                row.value
              )}
            </li>
          ))}
        </ul>

        {/* Main content — bottom left */}
        <div className="order-1 max-w-[640px] md:order-none md:col-start-1 md:row-start-3">
          <h2 className="font-sans text-[40px] font-semibold leading-[1] tracking-[-0.032em] text-[var(--color-paper)] md:text-[54px]">
            Smilet ditt fortjener<br />
            <span className="font-light text-[var(--color-amber)]">litt mer tid.</span>
          </h2>
          <Link
            href="/kontakt"
            className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-[var(--color-amber-deep)] px-6 py-3 text-[13px] font-semibold tracking-[0.005em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-amber-deep)]/90"
          >
            Finn en ledig time
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </RevealOnScroll>
    </section>
  );
}
