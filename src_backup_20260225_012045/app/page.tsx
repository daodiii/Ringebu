import {
  Sparkles,
  ArrowRight,
  Phone,
  Stethoscope,
  Syringe,
  Zap,
  SmilePlus,
} from "lucide-react";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import GlassCard from "@/components/GlassCard";
import SectionHeader from "@/components/SectionHeader";
import TestimonialCard from "@/components/TestimonialCard";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import StatsSection from "./StatsSection";
import Hero from "@/components/Hero";
import AuroraBackground from "@/components/ui/AuroraBackground";

export default function Home() {
  return (
    <AuroraBackground className="min-h-screen">
      <Hero />

      {/* ═══════════════════════════════════════════════
          STATS SECTION
      ═══════════════════════════════════════════════ */}
      <StatsSection />

      {/* ═══════════════════════════════════════════════
          SERVICES PREVIEW
      ═══════════════════════════════════════════════ */}
      {/* ═══════════════════════════════════════════════
          SERVICES & TESTIMONIALS (COMPACT)
      ═══════════════════════════════════════════════ */}
      <section className="py-12 bg-white/5 backdrop-blur-sm relative overflow-hidden">
        {/* Gradient orbs removed as AuroraBackground handles it */}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* SERVICES */}
          <div className="mb-12">
            <AnimateOnScroll>
              <SectionHeader
                subtitle="Våre tjenester"
                className="mb-6"
              />
            </AnimateOnScroll>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <AnimateOnScroll key={service.title} delay={i * 50}>
                  <GlassCard level={2} hover className="p-5 h-full flex flex-col items-start gap-3">
                    <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                      <service.icon className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-black mb-1">
                        {service.title}
                      </h3>
                      <p className="text-black/70 text-xs leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </GlassCard>
                </AnimateOnScroll>
              ))}
            </div>

            <AnimateOnScroll delay={200}>
              <div className="text-center mt-6">
                <Link
                  href="/behandlinger"
                  className="inline-flex items-center gap-2 text-black hover:text-black/80 text-sm font-semibold transition-colors group"
                >
                  Se alle behandlinger
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </AnimateOnScroll>
          </div>

          {/* DIVIDER */}
          <div className="w-full h-px bg-border/50 mb-12" />

          {/* TESTIMONIALS */}
          <div className="mb-4">
            <AnimateOnScroll>
              <SectionHeader
                subtitle="Hva pasientene sier"
                className="mb-6"
              />
            </AnimateOnScroll>

            <div className="mb-4 relative">
              {/* Pass minimal height container to reserve space */}
              <div className="min-h-[250px]">
                <TestimonialsCarousel
                  items={[
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
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA SECTION REMOVED
      ═══════════════════════════════════════════════ */}
    </AuroraBackground>
  );
}
