import Link from "next/link";
import {
  Shield,
  Award,
  Heart,
  Sparkles,
  ArrowRight,
  Phone,
  Stethoscope,
  Syringe,
  Zap,
  SmilePlus,
  Camera,
} from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import GlassCard from "@/components/GlassCard";
import SectionHeader from "@/components/SectionHeader";
import TestimonialCard from "@/components/TestimonialCard";
import StatsSection from "./StatsSection";

export default function Home() {
  return (
    <>
      {/* ═══════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
        {/* Gradient mesh orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] bg-accent/12 rounded-full blur-[100px]" />
        <div className="absolute top-[30%] right-[20%] w-[350px] h-[350px] bg-primary-light/20 rounded-full blur-[80px]" />

        {/* Hero content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <div>
              <AnimateOnScroll animation="fadeUp">
                <GlassCard level={3} className="p-8 sm:p-10 lg:p-12">
                  {/* Badge */}
                  <div className="glass-1 inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-muted">
                      Moderne tannpleie i Gudbrandsdalen
                    </span>
                  </div>

                  {/* Heading */}
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-6">
                    Et smil verdt
                    <br />
                    <span className="text-primary italic">å verne om</span>
                  </h1>

                  {/* Subtitle */}
                  <p className="text-lg sm:text-xl text-muted leading-relaxed mb-10 max-w-xl">
                    Hos Ringebu Tannlegesenter kombinerer vi lang erfaring med den
                    nyeste teknologien for å gi deg den beste tannbehandlingen. Vi
                    setter din komfort og trygghet først.
                  </p>

                  {/* CTA buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    <Link
                      href="/kontakt"
                      className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20"
                    >
                      Bestill Time
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      href="/behandlinger"
                      className="glass-1 inline-flex items-center justify-center gap-2 text-foreground hover:text-primary px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300"
                    >
                      Våre Behandlinger
                    </Link>
                  </div>

                  {/* Trust strip */}
                  <div className="flex flex-wrap items-center gap-4">
                    {[
                      { icon: Shield, label: "Trygg Behandling" },
                      { icon: Sparkles, label: "Moderne Utstyr" },
                      { icon: Heart, label: "Omsorg Først" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="glass-1 inline-flex items-center gap-2 rounded-full px-4 py-2"
                      >
                        <item.icon className="w-4 h-4 text-primary" />
                        <span className="text-muted text-sm font-medium">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </AnimateOnScroll>
            </div>

            {/* Right side — photo placeholder */}
            <div className="hidden lg:block">
              <AnimateOnScroll animation="fadeIn" delay={200}>
                <div className="photo-placeholder rounded-2xl aspect-[4/5] w-full max-w-lg mx-auto flex items-center justify-center">
                  <Camera className="w-16 h-16 text-muted/40" />
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          WHY CHOOSE US
      ═══════════════════════════════════════════════ */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <SectionHeader
              subtitle="Hvorfor velge oss"
              title="Tannpleie du kan stole på"
            />
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: Award,
                title: "Erfarne Spesialister",
                desc: "Vårt team består av høyt kvalifiserte tannleger og tannpleiere med lang erfaring innen alle områder av tannmedisinen.",
              },
              {
                icon: Sparkles,
                title: "Topp Moderne Klinikk",
                desc: "Vi investerer kontinuerlig i det nyeste utstyret og teknologien for å sikre presis diagnostikk og skånsom behandling.",
              },
              {
                icon: Heart,
                title: "Pasientfokusert",
                desc: "Hos oss er du mer enn bare en pasient. Vi tar oss tid til å lytte, forklare og tilpasse behandlingen til dine behov.",
              },
            ].map((item, i) => (
              <AnimateOnScroll key={item.title} delay={i * 100}>
                <GlassCard level={2} hover className="p-8 text-center h-full">
                  <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted leading-relaxed">{item.desc}</p>
                </GlassCard>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SERVICES PREVIEW
      ═══════════════════════════════════════════════ */}
      <section className="py-24 bg-surface relative overflow-hidden">
        {/* Gradient orbs for background depth */}
        <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[5%] right-[-5%] w-[350px] h-[350px] bg-accent/8 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <SectionHeader
              subtitle="Våre tjenester"
              title="Komplett tannbehandling"
            />
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {[
              {
                title: "Generell Tannpleie",
                desc: "Undersøkelser, rengjøring og forebyggende behandling",
                icon: Stethoscope,
              },
              {
                title: "Kosmetisk Tannpleie",
                desc: "Bleking, fasetter og estetiske løsninger",
                icon: SmilePlus,
              },
              {
                title: "Implantat",
                desc: "Tannimplantater med naturlig utseende og holdbarhet",
                icon: Syringe,
              },
              {
                title: "Akutt Behandling",
                desc: "Rask hjelp ved tannverk og akutte problemer",
                icon: Zap,
              },
            ].map((service, i) => (
              <AnimateOnScroll key={service.title} delay={i * 80}>
                <GlassCard level={2} hover className="p-7 h-full">
                  <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center mb-5">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </GlassCard>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll delay={400}>
            <div className="text-center mt-12">
              <Link
                href="/behandlinger"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition-colors group"
              >
                Se alle behandlinger
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          STATS SECTION
      ═══════════════════════════════════════════════ */}
      <StatsSection />

      {/* ═══════════════════════════════════════════════
          TESTIMONIALS SECTION
      ═══════════════════════════════════════════════ */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <SectionHeader
              subtitle="Hva pasientene sier"
              title="Ekte erfaringer"
            />
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                quote:
                  "Fantastisk opplevelse! Personalet var utrolig vennlige og profesjonelle. Anbefales på det varmeste.",
                author: "Maria H.",
              },
              {
                quote:
                  "Endelig en tannlege hvor jeg føler meg trygg. De tar seg god tid og forklarer alt grundig.",
                author: "Erik S.",
              },
              {
                quote:
                  "Moderne klinikk med dyktige fagfolk. Hele familien vår går hit, og vi er veldig fornøyde.",
                author: "Anne K.",
              },
            ].map((testimonial, i) => (
              <AnimateOnScroll key={testimonial.author} delay={i * 100}>
                <TestimonialCard
                  quote={testimonial.quote}
                  author={testimonial.author}
                  rating={5}
                />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════ */}
      <section className="py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <GlassCard level={3} className="p-10 sm:p-14 text-center">
              <div className="gold-divider w-16 mx-auto mb-10" />
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-5">
                Klar for et{" "}
                <span className="text-accent italic">sunnere smil?</span>
              </h2>
              <p className="text-muted text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                Ta kontakt med oss i dag for å bestille en time. Vi hjelper deg
                gjerne med å finne den beste behandlingen for dine behov.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-primary/15"
                >
                  Bestill Time
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:+4761280412"
                  className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  61 28 04 12
                </a>
              </div>
            </GlassCard>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
