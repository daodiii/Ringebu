import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { HOURS, KONTAKT } from "@/components/kontakt/data";

type ContactRow = { value: string; href?: string };

const CONTACT_ROWS: ContactRow[] = [
  { value: KONTAKT.phone.display, href: KONTAKT.phone.href },
  { value: KONTAKT.email.display, href: KONTAKT.email.href },
  { value: KONTAKT.address.display },
];

const OPEN_DAYS = HOURS.filter((h) => !h.closed);

const ROW =
  "border-t border-[var(--color-rule-dark)] py-4 text-[17px] font-medium leading-[1.4] tracking-[-0.01em] last:border-b last:border-[var(--color-rule-dark)]";

export function CtaCloseout() {
  return (
    <section className="relative isolate min-h-[80vh] overflow-hidden bg-[var(--color-ink)] md:min-h-[88vh]">
      <Image
        src="/images/hero-valley-bg.webp"
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
            <li key={row.value} className={ROW}>
              {row.href ? (
                <a href={row.href} className="transition-colors hover:text-[var(--color-amber-deep)]">
                  {row.value}
                </a>
              ) : (
                row.value
              )}
            </li>
          ))}
          <li className={`${ROW} grid grid-cols-[auto_1fr] gap-x-5 tabular-nums`}>
            {OPEN_DAYS.map((h) => (
              <Fragment key={h.code}>
                <span>{h.code}</span>
                <span>{h.hours}</span>
              </Fragment>
            ))}
          </li>
        </ul>

        {/* Main content — bottom left */}
        <div className="order-1 max-w-[640px] md:order-none md:col-start-1 md:row-start-3">
          <h2 className="font-sans text-[40px] font-semibold leading-[1] tracking-[-0.032em] text-[var(--color-paper)] md:text-[54px]">
            Trenger du tannlege?<br />
            <span className="font-light text-[var(--color-amber)]">Ta kontakt.</span>
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
