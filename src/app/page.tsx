"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import ScrollSection, { AnimatedContent } from "@/components/ScrollSection";
import SectionDots from "@/components/SectionDots";
import ImagePlaceholder from "@/components/ImagePlaceholder";

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

function GallerySection() {
  return (
    <ScrollSection id="gallery" bg="warmest">
      <div className="container-width w-full flex flex-col items-center justify-center py-20 lg:py-0">
        <div className="w-full max-w-6xl">
          {/* Mosaic grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 h-auto lg:h-[70vh]">
            {/* Large image — left */}
            <AnimatedContent className="lg:col-span-3 h-[60vh] lg:h-full">
              <ImagePlaceholder
                className="w-full h-full"
                tone="light"
                rounded="rounded-xl"
                label="Klinikk interiør"
              />
            </AnimatedContent>

            {/* Two stacked — right */}
            <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-2 h-auto lg:h-full">
              <AnimatedContent delay={0.2} className="h-[30vh] lg:h-full">
                <ImagePlaceholder
                  className="w-full h-full"
                  tone="mid"
                  rounded="rounded-xl"
                  label="Behandlingsrom"
                />
              </AnimatedContent>
              <AnimatedContent delay={0.4} className="h-[30vh] lg:h-full">
                <ImagePlaceholder
                  className="w-full h-full"
                  tone="dark"
                  rounded="rounded-xl"
                  label="Utstyr"
                />
              </AnimatedContent>
            </div>
          </div>

          {/* Caption */}
          <AnimatedContent delay={0.5} className="text-center mt-6">
            <p className="text-sm font-sans font-light italic text-[var(--color-text-muted)]">
              Moderne fasiliteter i hjertet av Gudbrandsdalen
            </p>
          </AnimatedContent>
        </div>
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
        <GallerySection />
        <ContactSection />
      </div>
    </>
  );
}
