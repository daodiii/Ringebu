import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "En liten tannlegeklinikk i Ringebu med god tid til hver pasient. Bli kjent med oss — og se hvordan et besøk hos oss foregår.",
  alternates: { canonical: "/informasjon" },
  openGraph: {
    title: "Om oss | Ringebu Tannlegesenter",
    description:
      "En liten tannlegeklinikk i Ringebu med god tid til hver pasient.",
  },
};

const display = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const serif = "font-[family-name:var(--font-display)]";

const passages = [
  {
    title: "Du er ikke en i rekka her",
    body: "Vi prioriterer kunden, og det får du merke med en gang. Vi tar én pasient om gangen, og vi har ikke det travelt. Du skal rekke å sette deg godt til rette før vi setter i gang.",
  },
  {
    title: "Vi sier det som det er",
    body: "Du skal kunne stole på det vi sier. Vi anbefaler aldri behandling du ikke trenger, og vi er ærlige med deg hvis noe bør gjøres. Det skal aldri være tvil om hva du betaler for, eller hvorfor.",
  },
  {
    title: "Gruer du deg litt? Det er helt greit.",
    body: "Mange synes det er ubehagelig å gå til tannlegen. Det skjønner vi godt. Vi går rolig fram, forteller deg hva vi gjør underveis, og tar en pause med en gang du trenger det. Du bestemmer takten.",
  },
];

const steps = [
  {
    n: "1",
    title: "Ta kontakt",
    body: "Ring oss eller send en e-post, så finner vi en tid som passer for deg.",
  },
  {
    n: "2",
    title: "Vi blir kjent",
    body: "Vi tar en rolig prat og en grundig sjekk av tennene dine. Ingen hastverk.",
  },
  {
    n: "3",
    title: "Du får klar beskjed",
    body: "Vi forteller deg hva vi ser, hva som haster, og hva som kan vente.",
  },
  {
    n: "4",
    title: "Vi blir enige om veien videre",
    body: "Sammen legger vi en plan du er trygg på. Ingen overraskelser på regningen.",
  },
];

export default function OmOss() {
  return (
    <main
      className={`${display.variable} relative overflow-hidden bg-[var(--color-paper)] text-[var(--color-text-primary)]`}
    >
      {/* Soft ambient cream gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1100px 720px at 78% -8%, rgba(124,177,167,0.10), transparent 60%), radial-gradient(900px 640px at 8% 36%, rgba(245,239,224,0.85), transparent 65%), radial-gradient(1000px 900px at 60% 108%, rgba(111,147,139,0.08), transparent 60%)",
        }}
      />

      {/* ───────────────── HERO ───────────────── */}
      <section className="relative mx-auto flex min-h-[76vh] w-full max-w-[82rem] flex-col justify-center px-6 pt-28 pb-16 md:px-10 md:pt-32">
        <div className="relative">
          <RevealOnScroll>
            <h1
              className={`${serif} max-w-[18ch] text-[var(--color-ink)]`}
              style={{
                fontSize: "clamp(2.7rem, 5.5vw, 4.3rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.018em",
              }}
            >
              Et lite sted, med{" "}
              <span className={`${serif} italic text-[var(--color-stone)]`}>god tid</span> til deg.
            </h1>
          </RevealOnScroll>

          {/* Thread flourish — flows beneath the headline, aligned to the text */}
          <svg
            aria-hidden
            viewBox="0 0 600 70"
            fill="none"
            className="pointer-events-none mt-8 h-[54px] w-[min(86%,580px)] overflow-visible"
          >
            <path
              d="M 4 42 C 120 6, 220 66, 344 36 S 544 6, 596 46"
              stroke="var(--color-amber-deep)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
              className="thread-draw"
            />
            <path
              d="M 40 52 C 150 30, 250 70, 360 50"
              stroke="var(--color-brass)"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.3"
              className="thread-draw thread-draw-slow"
            />
            <circle cx="4" cy="42" r="4" fill="var(--color-stone)" opacity="0.75" />
            <circle cx="596" cy="46" r="5" fill="none" stroke="var(--color-amber-deep)" strokeWidth="1.3" opacity="0.75" />
          </svg>

          <RevealOnScroll delay={0.12}>
            <p className="mt-7 max-w-[46ch] text-[1.0625rem] leading-relaxed text-[var(--color-text-secondary)] md:text-[1.125rem]">
              Vi er en liten tannlegeklinikk i Ringebu. Her er det ikke stress og lange køer — bare
              fokus på pasienten, og nok tid til å gjøre ting ordentlig.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ───────────────── BODY PASSAGES ───────────────── */}
      <section className="relative mx-auto w-full max-w-[78rem] px-6 pb-8 md:px-10">
        {/* Continuous meandering thread connecting the three passages */}
        <svg
          aria-hidden
          viewBox="0 0 200 1000"
          preserveAspectRatio="none"
          fill="none"
          className="pointer-events-none absolute left-6 top-0 -z-0 hidden h-full w-[120px] md:left-10 md:block"
        >
          <path
            d="M 60 0 C 60 90, 120 140, 110 240 S 30 360, 50 470 S 130 600, 100 720 S 40 860, 70 1000"
            stroke="var(--color-amber-deep)"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M 70 30 C 80 120, 30 180, 55 280"
            stroke="var(--color-brass)"
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity="0.28"
          />
        </svg>

        <div className="relative space-y-24 py-12 md:space-y-32 md:py-16 md:pl-32">
          {passages.map((p, i) => (
            <RevealOnScroll key={p.title} delay={i * 0.05}>
              <article
                className={`relative max-w-[52ch] ${
                  i % 2 === 1 ? "md:ml-auto md:mr-12" : ""
                }`}
              >
                {/* Node marker */}
                <span
                  aria-hidden
                  className="absolute -left-8 top-3 hidden h-3 w-3 rounded-full border border-[var(--color-amber-deep)] bg-[var(--color-paper)] md:block"
                />
                <h2
                  className={`${serif} text-[var(--color-ink)]`}
                  style={{
                    fontSize: "clamp(1.9rem, 4.4vw, 3.25rem)",
                    lineHeight: 1.08,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.title}
                </h2>
                <p className="mt-5 text-[1.0625rem] leading-relaxed text-[var(--color-text-secondary)]">
                  {p.body}
                </p>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ───────────────── STEPS ALONG A THREAD ───────────────── */}
      <section className="relative mx-auto w-full max-w-[78rem] px-6 py-20 md:px-10 md:py-28">
        <RevealOnScroll>
          <h2
            className={`${serif} max-w-[16ch] text-[var(--color-ink)]`}
            style={{
              fontSize: "clamp(2rem, 5vw, 3.75rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.012em",
            }}
          >
            Slik er det å komme til oss
          </h2>
        </RevealOnScroll>

        <div className="relative mt-16 md:mt-20">
          {/* Curving descending thread that guides 1 → 4 */}
          <svg
            aria-hidden
            viewBox="0 0 120 880"
            preserveAspectRatio="none"
            fill="none"
            className="pointer-events-none absolute left-[26px] top-0 h-full w-[60px] md:left-[34px]"
          >
            <path
              d="M 60 8 C 24 110, 96 200, 56 300 S 18 470, 64 560 S 98 700, 50 800 L 52 872"
              stroke="var(--color-amber-deep)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.55"
              className="thread-draw"
            />
          </svg>

          <ol className="relative space-y-12 md:space-y-16">
            {steps.map((s, i) => (
              <RevealOnScroll key={s.n} delay={i * 0.08}>
                <li className="relative flex items-start gap-6 pl-2 md:gap-8">
                  {/* Node ring */}
                  <span
                    aria-hidden
                    className="relative z-10 mt-0.5 flex h-12 w-12 flex-none items-center justify-center rounded-full border border-[var(--color-amber-deep)] bg-[var(--color-paper)] shadow-[0_1px_0_rgba(26,20,16,0.04)] transition-transform duration-500 ease-out group-hover:scale-105"
                  >
                    <span className="text-[1.5rem] font-medium leading-none tabular-nums text-[var(--color-stone)]">
                      {s.n}
                    </span>
                  </span>
                  <div className="max-w-[46ch] pt-1.5">
                    <h3 className="text-[1.0625rem] font-medium tracking-tight text-[var(--color-ink)]">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[1.0625rem] leading-relaxed text-[var(--color-text-secondary)]">
                      {s.body}
                    </p>
                  </div>
                </li>
              </RevealOnScroll>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────────── CLOSING / CONTACT ───────────────── */}
      <section className="relative mx-auto w-full max-w-[78rem] px-6 pb-32 pt-8 md:px-10 md:pb-40">
        {/* The thread resolves into a single node */}
        <svg
          aria-hidden
          viewBox="0 0 120 160"
          fill="none"
          className="pointer-events-none absolute left-1/2 -top-6 h-[150px] w-[120px] -translate-x-1/2"
        >
          <path
            d="M 60 0 C 90 50, 30 80, 60 130"
            stroke="var(--color-amber-deep)"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.5"
            className="thread-draw"
          />
          <circle cx="60" cy="140" r="6" fill="none" stroke="var(--color-amber-deep)" strokeWidth="1.3" opacity="0.8" />
          <circle cx="60" cy="140" r="2.2" fill="var(--color-stone)" opacity="0.8" />
        </svg>

        <RevealOnScroll>
          <div className="relative mx-auto mt-12 max-w-[44rem] rounded-[2rem] border border-[var(--color-rule)] bg-[var(--color-paper-warm)]/55 px-7 py-12 text-center backdrop-blur-[1px] md:px-14 md:py-16">
            <h2
              className={`${serif} text-[var(--color-ink)]`}
              style={{
                fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.012em",
              }}
            >
              Stikk innom oss
            </h2>

            <dl className="mx-auto mt-10 grid max-w-[34rem] grid-cols-1 gap-x-10 gap-y-7 text-left sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-[18px] w-[18px] flex-none text-[var(--color-brass)]" strokeWidth={1.6} />
                <div>
                  <dt className="text-[0.8125rem] tracking-wide text-[var(--color-text-muted)]">
                    Adresse
                  </dt>
                  <dd className="mt-1 text-[1.0625rem] leading-snug text-[var(--color-text-primary)]">
                    Hanstadgata 2, 2630 Ringebu
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-[18px] w-[18px] flex-none text-[var(--color-brass)]" strokeWidth={1.6} />
                <div>
                  <dt className="text-[0.8125rem] tracking-wide text-[var(--color-text-muted)]">
                    Åpningstider
                  </dt>
                  <dd className="mt-1 text-[1.0625rem] leading-snug text-[var(--color-text-primary)]">
                    Mandag–torsdag 08.00–15.30
                    <br />
                    Fredag 08.00–15.00
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-[18px] w-[18px] flex-none text-[var(--color-brass)]" strokeWidth={1.6} />
                <div>
                  <dt className="text-[0.8125rem] tracking-wide text-[var(--color-text-muted)]">
                    Telefon
                  </dt>
                  <dd className="mt-1 text-[1.0625rem] leading-snug">
                    <a
                      href="tel:+4761280412"
                      className="text-[var(--color-text-primary)] underline-offset-4 transition-colors hover:text-[var(--color-stone)] hover:underline"
                    >
                      61 28 04 12
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-[18px] w-[18px] flex-none text-[var(--color-brass)]" strokeWidth={1.6} />
                <div>
                  <dt className="text-[0.8125rem] tracking-wide text-[var(--color-text-muted)]">
                    E-post
                  </dt>
                  <dd className="mt-1 text-[1.0625rem] leading-snug">
                    <a
                      href="mailto:post@ringebutann.no"
                      className="text-[var(--color-text-primary)] underline-offset-4 transition-colors hover:text-[var(--color-stone)] hover:underline"
                    >
                      post@ringebutann.no
                    </a>
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-12">
              <Link
                href="/kontakt"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--color-ink)] px-8 py-3.5 text-[0.95rem] font-medium text-[var(--color-paper)] shadow-[0_1px_2px_rgba(8,32,37,0.18)] transition-all duration-300 ease-out hover:bg-[var(--color-ink-warm)] hover:shadow-[0_6px_18px_rgba(8,32,37,0.22)]"
              >
                Ta kontakt
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                  strokeWidth={1.8}
                />
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Thread draw-in — respects reduced motion */}
      <style>{`
        .thread-draw {
          stroke-dasharray: 2200;
          stroke-dashoffset: 2200;
          animation: thread-in 2.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
        }
        .thread-draw-slow {
          animation-duration: 3.4s;
          animation-delay: 0.2s;
        }
        @media (prefers-reduced-motion: reduce) {
          .thread-draw {
            animation: none;
            stroke-dashoffset: 0;
          }
        }
        @keyframes thread-in {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </main>
  );
}
