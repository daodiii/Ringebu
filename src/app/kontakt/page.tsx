import type { Metadata } from "next";

import PageHeader from "@/components/PageHeader";
import GlassCard from "@/components/GlassCard";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Kontakt Oss",
  description:
    "Kontakt Ringebu Tannlegesenter for timebestilling eller spørsmål. Vi er her for å hjelpe deg.",
};

export default function Kontakt() {
  return (
    <>
      {/* Page header */}
      <PageHeader
        subtitle="Vi er her for deg"
        title="Kontakt Oss"
        description="Har du spørsmål eller ønsker å bestille time? Ta kontakt med oss — vi hjelper deg gjerne."
      />

      {/* Contact content */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Ta kontakt
              </h2>
              <div className="gold-divider w-16 mb-6" />
              <p className="text-muted text-lg mb-10 leading-relaxed">
                Vi ønsker å gjøre det enkelt for deg å nå oss. Ring oss direkte,
                send en e-post, eller stikk innom klinikken.
              </p>

              {/* Contact cards - Mobile layout */}
              <div className="flex flex-col gap-3 sm:hidden mb-10 w-full max-w-[340px] mx-auto">
                <AnimateOnScroll animation="fadeUp" delay={0}>
                  <a href="tel:+4761280412" className="bg-[#033b2e] border border-white/10 rounded-xl py-3.5 px-5 flex items-center justify-between active:bg-[#044233] transition-colors shadow-md">
                    <span className="text-[var(--color-accent-gold)] font-medium text-sm">Telefon:</span>
                    <span className="text-white text-[15px] font-medium">61 28 04 12</span>
                  </a>
                </AnimateOnScroll>
                <AnimateOnScroll animation="fadeUp" delay={0.1}>
                  <a href="mailto:post@ringebutann.no" className="bg-[#033b2e] border border-white/10 rounded-xl py-3.5 px-5 flex items-center justify-between active:bg-[#044233] transition-colors shadow-md">
                    <span className="text-[var(--color-accent-gold)] font-medium text-sm">E-post:</span>
                    <span className="text-white text-[15px] font-medium">post@ringebutann.no</span>
                  </a>
                </AnimateOnScroll>
                <AnimateOnScroll animation="fadeUp" delay={0.2}>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Jernbanegata+4,+2630+Ringebu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="bg-[#033b2e] border border-white/10 rounded-xl py-3.5 px-4 flex flex-col items-center text-center justify-center shadow-md active:bg-[#044233] transition-colors">
                      <span className="text-[var(--color-accent-gold)] font-semibold text-[11px] uppercase tracking-widest mb-1.5 opacity-90">
                        Adresse
                      </span>
                      <span className="text-white text-[15px] font-medium">
                        Jernbanegata 4, 2630 Ringebu
                      </span>
                      <span className="text-[var(--color-accent-gold)] text-[11px] mt-1.5 opacity-80">
                        Trykk her for veibeskrivelse
                      </span>
                    </div>
                  </a>
                </AnimateOnScroll>
                <AnimateOnScroll animation="fadeUp" delay={0.3}>
                  <div className="bg-[#033b2e] border border-white/10 rounded-xl py-3.5 px-4 flex flex-col items-center text-center justify-center shadow-md">
                    <span className="text-[var(--color-accent-gold)] font-semibold text-[11px] uppercase tracking-widest mb-1.5 opacity-90">Åpningstider</span>
                    <span className="text-white text-[14px] font-medium leading-relaxed">
                      Man–Fre: 08:00–15:30 <br /> Tirs, Tors: 08:00–17:00
                    </span>
                  </div>
                </AnimateOnScroll>
              </div>

              {/* Contact cards - Desktop layout */}
              <div className="hidden sm:block space-y-4">
                <AnimateOnScroll animation="fadeUp" delay={0}>
                  <a href="tel:+4761280412" className="block">
                    <GlassCard level={2} hover className="p-6">
                      <div className="flex items-start gap-4">
                        <div>
                          <h3 className="font-bold text-foreground mb-1">Telefon</h3>
                          <p className="text-primary font-semibold text-lg">
                            61 28 04 12
                          </p>
                          <p className="text-muted text-sm mt-1">
                            Ring oss i åpningstiden for timebestilling
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  </a>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fadeUp" delay={0.1}>
                  <a href="mailto:post@ringebutann.no" className="block">
                    <GlassCard level={2} hover className="p-6">
                      <div className="flex items-start gap-4">
                        <div>
                          <h3 className="font-bold text-foreground mb-1">E-post</h3>
                          <p className="text-primary font-semibold">
                            post@ringebutann.no
                          </p>
                          <p className="text-muted text-sm mt-1">
                            Vi svarer vanligvis innen 1-2 virkedager
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  </a>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fadeUp" delay={0.2}>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Jernbanegata+4,+2630+Ringebu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <GlassCard level={2} hover className="p-6">
                      <div className="flex items-start gap-4">
                        <div>
                          <h3 className="font-bold text-foreground mb-1">
                            Adresse
                          </h3>
                          <p className="text-foreground/80">Jernbanegata 4</p>
                          <p className="text-foreground/80">2630 Ringebu</p>
                          <p className="text-[var(--color-emerald)] text-xs font-semibold mt-2">
                            Trykk her for veibeskrivelse
                          </p>
                          <p className="text-muted text-sm mt-1">
                            Enkel parkering rett utenfor klinikken
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  </a>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fadeUp" delay={0.3}>
                  <GlassCard level={2} hover className="p-6">
                    <div className="flex items-start gap-4">
                      <div>
                        <h3 className="font-bold text-foreground mb-2">
                          Åpningstider
                        </h3>
                        <div className="space-y-1">
                          <div className="flex justify-between gap-8">
                            <span className="text-foreground/80">Mandag</span>
                            <span className="text-foreground font-medium">
                              08:00 - 15:30
                            </span>
                          </div>
                          <div className="flex justify-between gap-8">
                            <span className="text-foreground/80">Tirsdag</span>
                            <span className="text-foreground font-medium">
                              08:00 - 17:00
                            </span>
                          </div>
                          <div className="flex justify-between gap-8">
                            <span className="text-foreground/80">Onsdag</span>
                            <span className="text-foreground font-medium">
                              08:00 - 15:30
                            </span>
                          </div>
                          <div className="flex justify-between gap-8">
                            <span className="text-foreground/80">Torsdag</span>
                            <span className="text-foreground font-medium">
                              09:00 - 17:00
                            </span>
                          </div>
                          <div className="flex justify-between gap-8">
                            <span className="text-foreground/80">Fredag</span>
                            <span className="text-foreground font-medium">
                              08:00 - 15:30
                            </span>
                          </div>
                          <div className="flex justify-between gap-8">
                            <span className="text-muted">Lørdag - Søndag</span>
                            <span className="text-muted font-medium">Stengt</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </AnimateOnScroll>
              </div>
            </div>

            {/* Map + Emergency */}
            <div className="space-y-6">


              {/* Emergency info */}
              <AnimateOnScroll animation="fadeUp" delay={0.1}>
                <div className="glass-2 bg-red-50/80 rounded-2xl p-8 border border-red-200/50">
                  <h3 className="text-xl font-bold text-red-900 mb-3">
                    Akutt tannverk?
                  </h3>
                  <p className="text-red-800/80 leading-relaxed mb-4">
                    Ved akutt tannverk i åpningstiden, ring oss på{" "}
                    <a
                      href="tel:+4761280412"
                      className="font-bold text-red-900 underline"
                    >
                      61 28 04 12
                    </a>{" "}
                    for raskest mulig hjelp. Vi forsøker alltid å prioritere
                    akutte tilfeller.
                  </p>
                  <p className="text-red-800/70 text-sm">
                    Utenom åpningstid: Kontakt tannlegevakten på 116 117.
                  </p>
                </div>
              </AnimateOnScroll>

              {/* Booking CTA */}
              <AnimateOnScroll animation="fadeUp" delay={0.2}>
                <GlassCard level={3} className="p-8 bg-primary/90 text-white">
                  <h3 className="text-xl font-bold mb-3 !text-white">Bestill time</h3>
                  <p className="text-white/80 leading-relaxed mb-6">
                    Den enkleste måten å bestille time er å ringe oss direkte.
                    Vårt vennlige personale hjelper deg med å finne en tid som
                    passer.
                  </p>
                  <a
                    href="tel:+4761280412"
                    className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl text-base font-semibold transition-all duration-300 shadow-lg"
                  >
                    Ring 61 28 04 12
                  </a>
                </GlassCard>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
