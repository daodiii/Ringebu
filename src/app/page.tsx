"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import ScrollSection, { AnimatedContent } from "@/components/ScrollSection";
import SectionDots from "@/components/SectionDots";
import Image from "next/image";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
/* ──────────────────────────────────────────────
   SECTION COMPONENTS
   ────────────────────────────────────────────── */

function HeroCardContent() {
  return (
    <div className="relative rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(2,44,34,0.15)] h-[85dvh] max-h-[500px] md:h-[550px] md:max-h-none w-full group bg-[var(--color-emerald)] flex flex-col">
      {/* Top 55% Image */}
      <div className="relative h-[55%] md:h-[65%] w-full overflow-hidden">
        <Image
          src="/images/ringebutannMain.jpg"
          alt="Moderne tannlegestol"
          fill
          className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 md:h-24 bg-gradient-to-t from-[var(--color-emerald)] to-transparent pointer-events-none saturate-150" />
      </div>

      {/* Bottom 45% Content */}
      <div className="relative h-[45%] md:h-[35%] w-full flex flex-col justify-end p-5 md:p-6 lg:p-7 text-white z-10">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="!text-white text-[22px] sm:text-[24px] md:text-[26px] font-sans font-semibold mb-1.5 md:mb-2 leading-[1.15] tracking-tight">
            Ringebu Tannlegesenter
          </h1>
          <p className="text-white/80 text-[13px] md:text-[13.5px] lg:text-[14.5px] mb-3 md:mb-4 leading-relaxed max-w-[100%] md:max-w-[95%]">
            Vi kombinerer moderne tannmedisin med personlig omsorg i trygge og rolige omgivelser i Gudbrandsdalen.
          </p>
        </div>

        <Link href="/kontakt" className="w-full bg-white text-black text-center py-3 md:py-3.5 mt-1 md:mt-2 rounded-full font-bold text-[14px] md:text-[15px] hover:bg-gray-100 transition-colors shadow-lg shadow-black/20">
          Bestill Time
        </Link>
      </div>
    </div>
  );
}

function AboutCardContent() {
  return (
    <div className="relative rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(2,44,34,0.15)] h-[85dvh] max-h-[500px] md:h-[550px] md:max-h-none w-full group bg-[var(--color-emerald)] flex flex-col">
      {/* Top 55% Image */}
      <div className="relative h-[55%] md:h-[65%] w-full overflow-hidden">
        <Image
          src="/images/about-clinic.jpg"
          alt="Moderne tannklinikk"
          fill
          className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 md:h-24 bg-gradient-to-t from-[var(--color-emerald)] to-transparent pointer-events-none saturate-150" />
      </div>

      {/* Bottom 45% Content */}
      <div className="relative h-[45%] md:h-[35%] w-full flex flex-col justify-end p-5 md:p-6 lg:p-7 text-white z-10">
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="!text-white text-[22px] sm:text-[24px] md:text-[26px] font-sans font-semibold mb-1.5 md:mb-2 leading-[1.15] tracking-tight">
            Trygghet i fokus
          </h2>
          <p className="text-white/80 text-[13px] md:text-[13.5px] lg:text-[14.5px] mb-3 md:mb-4 leading-relaxed max-w-[100%] md:max-w-[95%]">
            Med over 15 års erfaring tilbyr vi tannpleie som fokuserer på at du skal føle deg 100% trygg og ivaretatt.
          </p>
        </div>

        <Link href="/behandlinger" className="w-full bg-white text-black text-center py-3 md:py-3.5 mt-1 md:mt-2 rounded-full font-bold text-[14px] md:text-[15px] hover:bg-gray-100 transition-colors shadow-lg shadow-black/20">
          Våre behandlinger
        </Link>
      </div>
    </div>
  );
}

function HeroSectionDesktop() {
  return (
    <ScrollSection id="hero-desktop" bg="cream" className="hidden md:flex">
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

        {/* Right — Image */}
        <AnimatedContent delay={0.2} direction="none" className="flex justify-center lg:justify-end w-full">
          <motion.div
            initial={{ scale: 1.02, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-md lg:max-w-lg"
          >
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/5">
              <Image
                src="/images/ringebutannMain.jpg"
                alt="Moderne tannlegestol"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 512px"
              />
            </div>
          </motion.div>
        </AnimatedContent>
      </div>
    </ScrollSection>
  );
}

function AboutSectionDesktop() {
  return (
    <ScrollSection id="about-desktop" bg="cream" className="hidden md:flex">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[100dvh] lg:min-h-0">
        {/* Left — Image (edge-to-edge on left) */}
        <AnimatedContent
          direction="left"
          className="lg:col-span-7 flex w-full"
        >
          <div className="relative w-full h-[50vh] min-h-[500px] lg:h-[100dvh] rounded-none lg:rounded-r-3xl overflow-hidden">
            <Image
              src="/images/about-clinic.jpg"
              alt="Moderne tannklinikk interiør"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
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

function HeroSectionMobile() {
  return (
    <ScrollSection id="hero-mobile" bg="none" className="md:hidden bg-transparent flex flex-col items-center justify-center py-4 min-h-[100dvh]">
      <div className="w-full h-full flex items-center justify-center px-4">
        <AnimatedContent delay={0.1} className="w-full max-w-[420px] mx-auto">
          <HeroCardContent />
        </AnimatedContent>
      </div>
    </ScrollSection>
  );
}

function AboutSectionMobile() {
  return (
    <ScrollSection id="about-mobile" bg="none" className="md:hidden bg-transparent flex flex-col items-center justify-center py-4 min-h-[100dvh]">
      <div className="w-full h-full flex items-center justify-center px-4">
        <AnimatedContent delay={0.2} className="w-full max-w-[420px] mx-auto">
          <AboutCardContent />
        </AnimatedContent>
      </div>
    </ScrollSection>
  );
}

function ServicesSection() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth > 1024 ? window.innerWidth * 0.4 : window.innerWidth * 0.85;
      carouselRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const services = [
    {
      id: 1,
      src: "/images/service-general.jpg",
      alt: "Generell tannpleie",
      title: "Generell Tannpleie",
      description: "Undersøkelser, rengjøring og forebyggende behandling",
    },
    {
      id: 2,
      src: "/images/service-cosmetic.jpg",
      alt: "Kosmetisk tannpleie",
      title: "Kosmetisk Tannpleie",
      description: "Bleking, fasetter og estetiske løsninger",
    },
    {
      id: 3,
      src: "/images/service-implant.jpg",
      alt: "Implantat",
      title: "Implantat",
      description: "Tannimplantater med naturlig utseende og holdbarhet",
    },
    {
      id: 4,
      src: "/images/service-emergency.jpg",
      alt: "Akutt behandling",
      title: "Akutt Behandling",
      description: "Rask hjelp ved tannverk og akutte problemer",
    },
  ];

  return (
    <ScrollSection id="services" bg="none" className="bg-[var(--color-emerald)] lg:bg-[var(--color-bg-warm)]">
      <div className="container-width w-full flex flex-col items-center justify-center py-4 md:py-20 lg:py-0">
        <AnimatedContent className="text-center mb-3 lg:mb-12">
          <span className="eyebrow block max-lg:!text-[var(--color-bg-cream)] opacity-90 text-[10px] md:text-[12px]">
            Kvalitet i hvert smil
          </span>
          <h2 className="heading-editorial lg:hidden mt-1 md:mt-2 text-[var(--color-accent-gold)]" style={{ fontSize: "clamp(1.75rem, 7vw, 3rem)" }}>
            Våre Tjenester
          </h2>
        </AnimatedContent>

        <AnimatedContent delay={0.2} className="w-full relative px-0 lg:px-8">
          <div className="flex flex-col items-center w-full">
            <div
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 w-full px-4 md:px-0 pb-8 pt-4 no-scrollbar touch-pan-x relative"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-none w-[85vw] md:w-[45vw] lg:w-[350px] snap-center group relative overflow-hidden rounded-[32px] bg-white/5 border border-white/10 shadow-[0_20px_50px_rgba(2,44,34,0.15)] h-[55dvh] min-h-[350px] max-h-[450px]"
                >
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={service.src}
                      alt={service.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 350px"
                    />
                    {/* Gradient Overlay for text readability */}
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 lg:p-8 flex flex-col justify-end h-full text-white">
                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                      <div className="w-1 h-5 md:h-6 bg-[var(--color-accent-gold)] rounded-full" />
                      <h3 className="text-[20px] md:text-2xl font-serif font-bold text-white leading-tight">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-[13px] md:text-base text-white/90 font-light ml-3 md:ml-4 mb-4 md:mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <Link
                      href="/behandlinger"
                      className="inline-block ml-4 text-[var(--color-accent-gold)] text-sm font-medium uppercase tracking-wider hover:text-white transition-colors"
                    >
                      Les mer →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation Controls */}
            <button
              onClick={() => scroll('left')}
              className="absolute left-1 md:-left-4 lg:-left-4 top-[45%] -translate-y-1/2 w-12 h-12 flex flex-col items-center justify-center rounded-full bg-[var(--color-emerald)]/80 backdrop-blur-md border border-[var(--color-accent-gold)] text-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold)] hover:text-[var(--color-emerald)] transition-all shadow-lg z-10"
              aria-label="Forrige"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-1 md:-right-4 lg:-right-4 top-[45%] -translate-y-1/2 w-12 h-12 flex flex-col items-center justify-center rounded-full bg-[var(--color-emerald)]/80 backdrop-blur-md border border-[var(--color-accent-gold)] text-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold)] hover:text-[var(--color-emerald)] transition-all shadow-lg z-10"
              aria-label="Neste"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-6 md:mt-8 text-center"
            >
              <Link href="/behandlinger" className="btn-primary !bg-[var(--color-accent-gold)] !text-[var(--color-emerald)] px-6 py-2.5 md:px-8 md:py-3 rounded-full font-bold text-[14px]">
                Se alle behandlinger
              </Link>
            </motion.div>
          </div>
        </AnimatedContent>
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

  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth * 0.85;
      carouselRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <ScrollSection id="team" bg="none" className="bg-[var(--color-emerald)] lg:bg-[var(--color-bg-warmest)]">
      <div className="container-width w-full flex flex-col items-center justify-center py-4 md:py-20 lg:py-0">
        <AnimatedContent className="text-center mb-3 lg:mb-12">
          <span className="eyebrow block mb-2 md:mb-4 max-lg:!text-[var(--color-accent-gold)] text-[10px] md:text-[12px]">Vårt Team</span>
          <h2 className="heading-editorial max-lg:!text-[var(--color-bg-cream)]" style={{ fontSize: "clamp(1.75rem, 7vw, 3.5rem)" }}>
            Møt tannlegene våre
          </h2>
        </AnimatedContent>

        <AnimatedContent delay={0.2} className="w-full">
          {/* Desktop/Tablet Carousel */}
          <div className="hidden lg:block w-full">
            <CircularTestimonials
              testimonials={teamMembers}
              autoplay={true}
              colors={{
                name: "#2C2825",
                designation: "#B8A88A",
                testimony: "#5C5650",
                arrowBackground: "#2C2825",
                arrowForeground: "#FAF8F5",
                arrowHoverBackground: "#022C22",
              }}
              fontSizes={{
                name: "24px",
                designation: "14px",
                quote: "17px",
              }}
            />
          </div>

          {/* Mobile Horizontal Carousel */}
          <div className="lg:hidden flex flex-col items-center w-full relative">
            <div
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 w-full px-6 pb-4 pt-4 no-scrollbar touch-pan-x relative"
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-none w-[85vw] max-w-sm snap-center flex flex-col items-center text-center relative"
                >
                  <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 mb-3 md:mb-5 lg:mb-6 rounded-full overflow-hidden border-2 border-[var(--color-accent-gold)] shadow-lg mx-auto">
                    <Image
                      src={member.src}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                  <h3 className="text-[20px] md:text-2xl font-serif font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[11px] md:text-sm font-sans text-[var(--color-accent-gold)] uppercase tracking-wider mb-2 md:mb-4">
                    {member.designation}
                  </p>
                  <div className="relative px-4 md:px-6">
                    <span className="absolute top-0 left-0 text-2xl md:text-3xl font-serif text-[var(--color-accent-gold)]/30 opacity-50">"</span>
                    <p className="text-[13px] md:text-base text-white/80 font-light italic leading-relaxed pt-1 md:pt-2">
                      {member.quote}
                    </p>
                    <span className="absolute bottom-0 right-0 text-2xl md:text-3xl font-serif text-[var(--color-accent-gold)]/30 opacity-50 relative top-1 md:top-2">"</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Navigation Controls */}
            <button
              onClick={() => scroll('left')}
              className="absolute left-2 top-24 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-emerald)]/80 backdrop-blur-sm border border-[var(--color-accent-gold)] text-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold)] hover:text-[var(--color-emerald)] transition-colors z-10"
              aria-label="Forrige"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-2 top-24 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-emerald)]/80 backdrop-blur-sm border border-[var(--color-accent-gold)] text-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold)] hover:text-[var(--color-emerald)] transition-colors z-10"
              aria-label="Neste"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </AnimatedContent>
      </div>
    </ScrollSection>
  );
}

function ContactSection() {
  return (
    <ScrollSection id="contact" bg="none" className="bg-[var(--color-emerald)] lg:bg-[var(--color-bg-cream)]">
      <div className="container-width w-full flex flex-col items-center justify-center text-center py-4 md:py-20 lg:py-0">
        <AnimatedContent>
          <span className="eyebrow block mb-2 md:mb-4 max-lg:!text-[var(--color-bg-cream)] opacity-90 text-[10px] md:text-[12px]">Ta Kontakt</span>
        </AnimatedContent>
        <AnimatedContent delay={0.1}>
          <h2 className="heading-editorial mb-3 md:mb-6 max-lg:!text-[var(--color-bg-cream)]" style={{ fontSize: "clamp(1.75rem, 6vw, 3.5rem)" }}>
            Klar for ditt neste besøk?
          </h2>
        </AnimatedContent>
        <AnimatedContent delay={0.2}>
          <p className="body-editorial max-w-lg mx-auto mb-6 md:mb-10 max-lg:!text-white/80 text-[14px] md:text-[16px]">
            Vi tar imot nye pasienter og ser frem til å høre fra deg.
          </p>
        </AnimatedContent>

        {/* CTAs */}
        <AnimatedContent delay={0.3} className="w-full max-w-xs sm:max-w-none">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-8 md:mb-12">
            <Link href="/kontakt" className="btn-primary w-full sm:w-auto !text-white lg:!text-white max-lg:!bg-[var(--color-accent-gold)] max-lg:!text-[var(--color-emerald)] border max-lg:border-[var(--color-accent-gold)] py-3 md:py-3.5 text-[14px]">
              Bestill Time
            </Link>
            <a href="tel:+4761280412" className="btn-secondary w-full sm:w-auto max-lg:border-[var(--color-accent-gold)] max-lg:!text-[var(--color-accent-gold)] hover:max-lg:bg-[var(--color-accent-gold)] hover:max-lg:!text-[var(--color-emerald)] py-3 md:py-3.5 text-[14px]">
              Ring Oss
            </a>
          </div>
        </AnimatedContent>

        {/* Decorative line */}
        <AnimatedContent delay={0.4}>
          <div className="gold-line mx-auto mb-6 md:mb-8" />
        </AnimatedContent>

        {/* Contact details */}
        <AnimatedContent delay={0.45}>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm font-sans font-light text-[var(--color-bg-cream)]/90 lg:text-[var(--color-text-muted)]">
            <a href="tel:+4761280412" className="hover:text-white lg:hover:text-[var(--color-text-dark)] transition-colors flex items-center gap-2">
              <span className="lg:hidden text-[var(--color-accent-gold)]">📞</span> 61 28 04 12
            </a>
            <span className="hidden sm:block">·</span>
            <a href="mailto:post@ringebutann.no" className="hover:text-white lg:hover:text-[var(--color-text-dark)] transition-colors flex items-center gap-2">
              <span className="lg:hidden text-[var(--color-accent-gold)]">✉️</span> post@ringebutann.no
            </a>
            <span className="hidden sm:block">·</span>
            <span className="flex items-center gap-2">
              <span className="lg:hidden text-[var(--color-accent-gold)]">📍</span> Jernbanegata 4, 2630 Ringebu
            </span>
          </div>
        </AnimatedContent>

        <AnimatedContent delay={0.5}>
          <div className="mt-6 lg:mt-4 text-xs font-sans text-[var(--color-bg-cream)]/60 lg:text-[var(--color-text-muted)]/60">
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
        <HeroSectionDesktop />
        <AboutSectionDesktop />
        <HeroSectionMobile />
        <AboutSectionMobile />
        <ServicesSection />
        <TeamSection />
        <ContactSection />
      </div>
    </>
  );
}
