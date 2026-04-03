"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  AlertTriangle,
  Calendar,
} from "lucide-react";

const openingHours = [
  { day: "Mandag", hours: "08:00 – 15:30" },
  { day: "Tirsdag", hours: "08:00 – 17:00" },
  { day: "Onsdag", hours: "08:00 – 15:30" },
  { day: "Torsdag", hours: "09:00 – 17:00" },
  { day: "Fredag", hours: "08:00 – 15:30" },
  { day: "Lørdag – Søndag", hours: "Stengt", closed: true },
];

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Kontakt() {
  return (
    <main className="pt-20">
      {/* Header */}
      <section className="bg-[var(--color-primary)] py-20 md:py-28">
        <div className="container-width text-center">
          <span className="text-[#C9B99A] text-sm font-sans font-600 uppercase tracking-[0.15em] mb-4 block">
            Kontakt
          </span>
          <h1 className="heading-display text-white mb-5">Kontakt oss</h1>
          <p className="text-lg text-[#FBF9F3]/70 font-sans font-300 max-w-xl mx-auto">
            Har du spørsmål eller ønsker å bestille time? Vi er her for å hjelpe
            deg.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div>
              <FadeIn>
                <h2 className="heading-section mb-3">Ta kontakt</h2>
                <p className="body-large mb-10">
                  Vi ønsker å gjøre det enkelt for deg å nå oss. Ring oss
                  direkte, send en e-post, eller stikk innom klinikken.
                </p>
              </FadeIn>

              <div className="space-y-4">
                <FadeIn delay={0.05}>
                  <a href="tel:61280412" className="block card p-6 group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-cream)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-bg-cream)] transition-colors">
                        <Phone className="size-5 text-[var(--color-accent)]" />
                      </div>
                      <div>
                        <h3 className="font-heading font-600 text-[var(--color-primary)] mb-1">
                          Telefon
                        </h3>
                        <p className="text-[var(--color-primary-light)] font-sans font-600 text-lg">
                          61 28 04 12
                        </p>
                        <p className="text-sm text-[var(--color-text-muted)] font-sans font-300 mt-1">
                          Ring oss i åpningstiden for timebestilling
                        </p>
                      </div>
                    </div>
                  </a>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <a href="mailto:post@ringebutann.no" className="block card p-6 group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#FBF9F3] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-border)] transition-colors">
                        <Mail className="size-5 text-[#C4873B]" />
                      </div>
                      <div>
                        <h3 className="font-heading font-600 text-[var(--color-primary)] mb-1">
                          E-post
                        </h3>
                        <p className="text-[#6B5744] font-sans font-600">
                          post@ringebutann.no
                        </p>
                        <p className="text-sm text-[var(--color-text-muted)] font-sans font-300 mt-1">
                          Vi svarer vanligvis innen 1–2 virkedager
                        </p>
                      </div>
                    </div>
                  </a>
                </FadeIn>

                <FadeIn delay={0.15}>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Jernbanegata+4,+2630+Ringebu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block card p-6 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#FBF9F3] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-border)] transition-colors">
                        <MapPin className="size-5 text-[#C4873B]" />
                      </div>
                      <div>
                        <h3 className="font-heading font-600 text-[var(--color-primary)] mb-1">
                          Adresse
                        </h3>
                        <p className="text-[var(--color-text-primary)] font-sans">
                          Jernbanegata 4, 2630 Ringebu
                        </p>
                        <p className="text-sm text-[#C4873B] font-sans font-500 mt-1">
                          Se veibeskrivelse
                        </p>
                        <p className="text-sm text-[var(--color-text-muted)] font-sans font-300 mt-1">
                          Enkel parkering rett utenfor klinikken
                        </p>
                      </div>
                    </div>
                  </a>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <div className="card p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#FBF9F3] flex items-center justify-center shrink-0">
                        <Clock className="size-5 text-[#C4873B]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading font-600 text-[var(--color-primary)] mb-3">
                          Åpningstider
                        </h3>
                        <div className="space-y-2">
                          {openingHours.map((h) => (
                            <div key={h.day} className="flex justify-between text-sm">
                              <span className={h.closed ? "text-[var(--color-text-muted)]" : "text-[var(--color-text-secondary)]"}>
                                {h.day}
                              </span>
                              <span className={h.closed ? "text-[var(--color-text-muted)]" : "text-[var(--color-text-primary)] font-500"}>
                                {h.hours}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>

            {/* Right Side */}
            <div className="space-y-6">
              {/* Emergency */}
              <FadeIn delay={0.1}>
                <div className="rounded-2xl bg-rose-50 border border-rose-200 p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                      <AlertTriangle className="size-6 text-rose-600" />
                    </div>
                    <div>
                      <h3 className="font-heading font-600 text-xl text-rose-900 mb-3">
                        Akutt tannverk?
                      </h3>
                      <p className="text-rose-800/80 font-sans font-300 leading-relaxed mb-4">
                        Ved akutt tannverk i åpningstiden, ring oss på{" "}
                        <a
                          href="tel:61280412"
                          className="font-600 text-rose-900 underline"
                        >
                          61 28 04 12
                        </a>{" "}
                        for raskest mulig hjelp. Vi forsøker alltid å prioritere
                        akutte tilfeller.
                      </p>
                      <p className="text-rose-700/70 text-sm font-sans">
                        Utenom åpningstid: Kontakt tannlegevakten på{" "}
                        <a href="tel:116117" className="font-600 underline">
                          116 117
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Booking CTA */}
              <FadeIn delay={0.2}>
                <div className="rounded-2xl bg-[var(--color-bg-mint)] p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                      <Calendar className="size-6 text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <h3 className="font-heading font-600 text-xl text-[var(--color-primary)] mb-3">
                        Bestill time
                      </h3>
                      <p className="text-[var(--color-text-secondary)] font-sans font-300 leading-relaxed mb-6">
                        Den enkleste måten å bestille time er å ringe oss
                        direkte. Vårt vennlige personale hjelper deg med å finne
                        en tid som passer.
                      </p>
                      <a
                        href="tel:61280412"
                        className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-6 py-3 rounded-full font-sans font-500 transition-all duration-300"
                      >
                        <Phone className="size-4" />
                        Ring 61 28 04 12
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Map Placeholder */}
              <FadeIn delay={0.3}>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Jernbanegata+4,+2630+Ringebu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-cream)] aspect-[4/3] flex items-center justify-center group"
                >
                  <div className="text-center p-8">
                    <MapPin className="size-12 text-[var(--color-accent)]/40 mx-auto mb-4 group-hover:text-[var(--color-accent)] transition-colors" />
                    <p className="font-heading font-600 text-[var(--color-primary)] mb-1">
                      Jernbanegata 4, 2630 Ringebu
                    </p>
                    <p className="text-sm text-[var(--color-accent)] font-sans font-500">
                      Åpne i Google Maps
                    </p>
                  </div>
                </a>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
