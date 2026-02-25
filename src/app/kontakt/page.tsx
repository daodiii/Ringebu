import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
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

              {/* Contact cards */}
              <div className="space-y-4">
                <AnimateOnScroll animation="fadeUp" delay={0}>
                  <a href="tel:+4761280412" className="block">
                    <GlassCard level={2} hover className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center shrink-0">
                          <Phone className="w-6 h-6 text-primary" />
                        </div>
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
                        <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center shrink-0">
                          <Mail className="w-6 h-6 text-primary" />
                        </div>
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
                  <GlassCard level={2} hover className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-1">Adresse</h3>
                        <p className="text-foreground/80">Jernbanegata 4</p>
                        <p className="text-foreground/80">2630 Ringebu</p>
                        <p className="text-muted text-sm mt-1">
                          Enkel parkering rett utenfor klinikken
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fadeUp" delay={0.3}>
                  <GlassCard level={2} hover className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center shrink-0">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
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
              {/* Map */}
              <AnimateOnScroll animation="fadeIn">
                <GlassCard level={2} className="overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1876.5!2d10.165!3d61.526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjHCsDMxJzMzLjYiTiAxMMKwMDknNTQuMCJF!5e0!3m2!1sno!2sno!4v1"
                      className="absolute inset-0 w-full h-full"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Kart til Ringebu Tannlegesenter"
                    />
                  </div>
                  <div className="p-4 bg-background">
                    <p className="text-sm text-muted flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      Jernbanegata 4, 2630 Ringebu
                    </p>
                  </div>
                </GlassCard>
              </AnimateOnScroll>

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
                  <h3 className="text-xl font-bold mb-3">Bestill time</h3>
                  <p className="text-white/80 leading-relaxed mb-6">
                    Den enkleste måten å bestille time er å ringe oss direkte.
                    Vårt vennlige personale hjelper deg med å finne en tid som
                    passer.
                  </p>
                  <a
                    href="tel:+4761280412"
                    className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl text-base font-semibold transition-all duration-300 shadow-lg"
                  >
                    <Phone className="w-5 h-5" />
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
