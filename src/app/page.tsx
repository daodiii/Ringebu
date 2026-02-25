"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import ScrollSection, { AnimatedContent } from "@/components/ScrollSection";
import SectionDots from "@/components/SectionDots";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";

/* ──────────────────────────────────────────────
   SECTION COMPONENTS
   ────────────────────────────────────────────── */

function HeroSection() {
  return (
    <ScrollSection id="hero" bg="cream">
      <div className="container-width w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20 lg:py-0">
        {/* Left — Text */}
        <div className="flex flex-col gap-6 lg:gap-8 max-w-xl">
          <AnimatedContent delay={0}>
            <span className="eyebrow">Ringebu Tannlegesenter</span>
          </AnimatedContent>
          <AnimatedContent delay={0.15}>
            <h1 className="heading-editorial">
              Tannpleie med
              <br />
              omtanke
            </h1>
          </AnimatedContent>
          <AnimatedContent delay={0.3}>
            <p className="body-editorial max-w-md">
              Vi kombinerer moderne tannmedisin med personlig omsorg,
              i rolige omgivelser midt i Gudbrandsdalen.
            </p>
          </AnimatedContent>
          <AnimatedContent delay={0.45}>
            <div>
              <Link href="/kontakt" className="btn-primary">
                Bestill Time
              </Link>
            </div>
          </AnimatedContent>
        </div>

        {/* Right — Image placeholder */}
        <AnimatedContent delay={0.2} direction="none" className="flex justify-center lg:justify-end">
          <motion.div
            initial={{ scale: 1.02, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ImagePlaceholder
              className="w-full max-w-md lg:max-w-lg aspect-[3/4] shadow-2xl shadow-black/5"
              tone="light"
              rounded="rounded-2xl"
              label="Hero foto"
            />
          </motion.div>
        </AnimatedContent>
      </div>
    </ScrollSection>
  );
}

function AboutSection() {
  return (
    <ScrollSection id="about" bg="cream">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-screen lg:min-h-0">
        {/* Left — Image (edge-to-edge on left) */}
        <AnimatedContent
          direction="left"
          className="lg:col-span-7 flex"
        >
          <ImagePlaceholder
            className="w-full h-[50vh] lg:h-full"
            tone="mid"
            rounded="rounded-none lg:rounded-r-3xl"
            label="Klinikk foto"
          />
        </AnimatedContent>

        {/* Right — Text */}
        <div className="lg:col-span-5 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 lg:py-0 gap-6">
          <AnimatedContent delay={0.1}>
            <div className="gold-line mb-4" />
          </AnimatedContent>
          <AnimatedContent delay={0.15}>
            <span className="eyebrow">Vår Filosofi</span>
          </AnimatedContent>
          <AnimatedContent delay={0.25}>
            <h2 className="heading-editorial text-3xl lg:text-5xl">
              Din trygghet er vår prioritet
            </h2>
          </AnimatedContent>
          <AnimatedContent delay={0.35}>
            <div className="flex flex-col gap-4">
              <p className="body-editorial">
                Hos Ringebu Tannlegesenter tror vi på at tannpleie handler om mer enn bare tenner.
                Det handler om å skape en trygg og behagelig opplevelse for hver enkelt pasient.
              </p>
              <p className="body-editorial">
                Med over 15 års erfaring i Gudbrandsdalen kombinerer vi faglig dyktighet
                med ekte omsorg. Vår moderne klinikk er designet for din komfort.
              </p>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </ScrollSection>
  );
}

function ServicesSection() {
  const services = [
    {
      title: "Generell Tannpleie",
      desc: "Undersøkelser, rengjøring og forebyggende behandling",
    },
    {
      title: "Kosmetisk Tannpleie",
      desc: "Bleking, fasetter og estetiske løsninger",
    },
    {
      title: "Implantat",
      desc: "Tannimplantater med naturlig utseende og holdbarhet",
    },
    {
      title: "Akutt Behandling",
      desc: "Rask hjelp ved tannverk og akutte problemer",
    },
  ];

  return (
    <ScrollSection id="services" bg="warm">
      <div className="container-width w-full flex flex-col items-center justify-center py-20 lg:py-0">
        <AnimatedContent className="text-center mb-12 lg:mb-16">
          <span className="eyebrow block mb-4">Våre Tjenester</span>
          <h2 className="heading-editorial text-3xl lg:text-5xl">
            Behandlinger tilpasset deg
          </h2>
        </AnimatedContent>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 w-full max-w-4xl">
          {services.map((service, i) => (
            <AnimatedContent key={service.title} delay={0.1 + i * 0.15}>
              <div className="group bg-[var(--color-card-white)] border border-[var(--color-border)] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5">
                <ImagePlaceholder
                  className="w-full h-40 lg:h-48"
                  tone={i % 2 === 0 ? "light" : "mid"}
                  rounded="rounded-none"
                  label={service.title}
                />
                <div className="p-6">
                  <h3 className="font-serif text-lg font-bold text-[var(--color-text-dark)] mb-1">
                    {service.title}
                  </h3>
                  <p className="text-sm font-sans font-light text-[var(--color-text-muted)] leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}

function TeamSection() {
  const teamMembers = [
    {
      name: "Dr. Lars Haugen",
      designation: "Tannlege — Klinikksjef",
      quote:
        "For meg handler tannlegeyrket om å bygge tillit. Når en pasient føler seg trygg og ivaretatt, kan vi sammen skape resultater som varer. Vår klinikk er bygget på denne filosofien.",
      src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1368&auto=format&fit=crop",
    },
    {
      name: "Dr. Ingrid Moen",
      designation: "Tannlege — Kosmetisk Spesialist",
      quote:
        "Et vakkert smil gir selvtillit. Jeg brenner for å hjelpe pasienter med å føle seg komfortable med smilet sitt, gjennom moderne estetisk tannbehandling tilpasset hver enkelt.",
      src: "https://images.unsplash.com/photo-1594824476967-48c8b964f137?q=80&w=1368&auto=format&fit=crop",
    },
    {
      name: "Dr. Erik Nordby",
      designation: "Tannlege — Implantologi",
      quote:
        "Moderne implantater gir pasienter tilbake livskvalitet. Med presisjon og de nyeste teknikkene sørger vi for løsninger som både ser naturlige ut og holder i mange år.",
      src: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1368&auto=format&fit=crop",
    },
  ];

  return (
    <ScrollSection id="team" bg="warmest">
      <div className="container-width w-full flex flex-col items-center justify-center py-20 lg:py-0">
        <AnimatedContent className="text-center mb-8 lg:mb-12">
          <span className="eyebrow block mb-4">Vårt Team</span>
          <h2 className="heading-editorial text-3xl lg:text-5xl">
            Møt tannlegene våre
          </h2>
        </AnimatedContent>

        <AnimatedContent delay={0.2}>
          <CircularTestimonials
            testimonials={teamMembers}
            autoplay={true}
            colors={{
              name: "#2C2825",
              designation: "#B8A88A",
              testimony: "#5C5650",
              arrowBackground: "#2C2825",
              arrowForeground: "#FAF8F5",
              arrowHoverBackground: "#B8A88A",
            }}
            fontSizes={{
              name: "24px",
              designation: "14px",
              quote: "17px",
            }}
          />
        </AnimatedContent>
      </div>
    </ScrollSection>
  );
}

function ContactSection() {
  return (
    <ScrollSection id="contact" bg="cream">
      <div className="container-width w-full flex flex-col items-center justify-center text-center py-20 lg:py-0">
        <AnimatedContent>
          <span className="eyebrow block mb-4">Ta Kontakt</span>
        </AnimatedContent>
        <AnimatedContent delay={0.1}>
          <h2 className="heading-editorial text-3xl lg:text-6xl mb-6">
            Klar for ditt neste besøk?
          </h2>
        </AnimatedContent>
        <AnimatedContent delay={0.2}>
          <p className="body-editorial max-w-lg mx-auto mb-10">
            Vi tar imot nye pasienter og ser frem til å høre fra deg.
          </p>
        </AnimatedContent>

        {/* CTAs */}
        <AnimatedContent delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <Link href="/kontakt" className="btn-primary">
              Bestill Time
            </Link>
            <a href="tel:+4761280412" className="btn-secondary">
              Ring Oss
            </a>
          </div>
        </AnimatedContent>

        {/* Decorative line */}
        <AnimatedContent delay={0.4}>
          <div className="gold-line mx-auto mb-8" />
        </AnimatedContent>

        {/* Contact details */}
        <AnimatedContent delay={0.45}>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm font-sans font-light text-[var(--color-text-muted)]">
            <a href="tel:+4761280412" className="hover:text-[var(--color-text-dark)] transition-colors">
              61 28 04 12
            </a>
            <span className="hidden sm:block">·</span>
            <a href="mailto:post@ringebutann.no" className="hover:text-[var(--color-text-dark)] transition-colors">
              post@ringebutann.no
            </a>
            <span className="hidden sm:block">·</span>
            <span>Jernbanegata 4, 2630 Ringebu</span>
          </div>
        </AnimatedContent>

        <AnimatedContent delay={0.5}>
          <div className="mt-4 text-xs font-sans text-[var(--color-text-muted)]/60">
            Man–Fre: 08:00–15:30 · Tirs, Tors: 08:00–17:00
          </div>
        </AnimatedContent>
      </div>
    </ScrollSection>
  );
}

/* ──────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────── */

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <SectionDots containerRef={containerRef} />
      <div ref={containerRef} className="snap-container">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TeamSection />
        <ContactSection />
      </div>
    </>
  );
}
