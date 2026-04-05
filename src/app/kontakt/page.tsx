"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  AlertTriangle,
  Calendar,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

/* ─────────────────────── Data ─────────────────────── */

const openingHours = [
  { day: "Mandag", hours: "08:00 – 15:30" },
  { day: "Tirsdag", hours: "08:00 – 17:00" },
  { day: "Onsdag", hours: "08:00 – 15:30" },
  { day: "Torsdag", hours: "09:00 – 17:00" },
  { day: "Fredag", hours: "08:00 – 15:30" },
  { day: "Lørdag – Søndag", hours: "Stengt", closed: true },
];

const touristDistances = [
  {
    place: "Kvitfjell",
    drive: "~25 min",
    km: "30 km",
    desc: "Skianlegg og hytteområde",
    direction: "sør",
  },
  {
    place: "Lillehammer",
    drive: "~45 min",
    km: "55 km",
    desc: "OL-byen med kultur og aktiviteter",
    direction: "sør",
  },
  {
    place: "Vinstra",
    drive: "~15 min",
    km: "18 km",
    desc: "Kommunesenter i Nord-Fron",
    direction: "nord",
  },
  {
    place: "Sjusjøen",
    drive: "~50 min",
    km: "60 km",
    desc: "Populært hytteområde og skisenter",
    direction: "sør-øst",
  },
  {
    place: "Sør-Fron",
    drive: "~10 min",
    km: "12 km",
    desc: "Nabokommune med Hundorp stavkirke",
    direction: "sør",
  },
];

/* ─────────────────────── Helpers ─────────────────────── */

function SectionFade({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────── Page ─────────────────────── */

export default function Kontakt() {
  return (
    <main className="pt-20">
      {/* ── Hero Header ── */}
      <section className="relative bg-[var(--color-primary)] py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)]" />
        <div className="absolute inset-0">
          <div className="absolute -top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-accent)]/8 blur-3xl" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-[var(--color-accent-light)]/5 blur-3xl" />
        </div>
        <div className="container-width text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="w-12 h-[2px] bg-[var(--color-accent)] mx-auto mb-6" />
            <p className="text-sm font-sans font-600 uppercase tracking-[0.2em] text-[var(--color-accent-light)] mb-4">
              Ringebu Tannlegesenter
            </p>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="heading-display text-white mb-5"
          >
            Kontakt oss
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-white/70 font-sans font-300 max-w-2xl mx-auto leading-relaxed"
          >
            Midt i Gudbrandsdalen — lett tilgjengelig fra Kvitfjell,
            Lillehammer og hele dalføret. Vi tar imot både fastboende og
            besøkende.
          </motion.p>
        </div>
      </section>

      {/* ── Contact Info + Hours ── */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
            {/* Left — Contact Details */}
            <div>
              <SectionFade>
                <p className="eyebrow mb-3">Ta kontakt</p>
                <h2 className="heading-section mb-3">
                  Vi er her for deg
                </h2>
                <p className="body-large mb-10">
                  Ring oss direkte, send en e-post, eller stikk innom
                  klinikken. Enkel parkering rett utenfor døren.
                </p>
              </SectionFade>

              <div className="space-y-4">
                {/* Phone */}
                <SectionFade delay={0.05}>
                  <a
                    href="tel:61280412"
                    className="block card p-6 group cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-bg-cream)] to-[var(--color-bg-mint)] flex items-center justify-center shrink-0 group-hover:from-[var(--color-accent)]/10 group-hover:to-[var(--color-accent)]/20 transition-all duration-300">
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
                </SectionFade>

                {/* Email */}
                <SectionFade delay={0.1}>
                  <a
                    href="mailto:post@ringebutann.no"
                    className="block card p-6 group cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-bg-cream)] to-[var(--color-bg-mint)] flex items-center justify-center shrink-0 group-hover:from-[var(--color-accent)]/10 group-hover:to-[var(--color-accent)]/20 transition-all duration-300">
                        <Mail className="size-5 text-[var(--color-accent)]" />
                      </div>
                      <div>
                        <h3 className="font-heading font-600 text-[var(--color-primary)] mb-1">
                          E-post
                        </h3>
                        <p className="text-[var(--color-primary-light)] font-sans font-600">
                          post@ringebutann.no
                        </p>
                        <p className="text-sm text-[var(--color-text-muted)] font-sans font-300 mt-1">
                          Vi svarer vanligvis innen 1–2 virkedager
                        </p>
                      </div>
                    </div>
                  </a>
                </SectionFade>

                {/* Address */}
                <SectionFade delay={0.15}>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Jernbanegata+4,+2630+Ringebu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block card p-6 group cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-bg-cream)] to-[var(--color-bg-mint)] flex items-center justify-center shrink-0 group-hover:from-[var(--color-accent)]/10 group-hover:to-[var(--color-accent)]/20 transition-all duration-300">
                        <MapPin className="size-5 text-[var(--color-accent)]" />
                      </div>
                      <div>
                        <h3 className="font-heading font-600 text-[var(--color-primary)] mb-1">
                          Adresse
                        </h3>
                        <p className="text-[var(--color-text-primary)] font-sans">
                          Jernbanegata 4, 2630 Ringebu
                        </p>
                        <p className="text-sm text-[var(--color-accent)] font-sans font-500 mt-1 group-hover:underline">
                          Åpne i Google Maps &rarr;
                        </p>
                        <p className="text-sm text-[var(--color-text-muted)] font-sans font-300 mt-1">
                          Enkel parkering rett utenfor klinikken
                        </p>
                      </div>
                    </div>
                  </a>
                </SectionFade>
              </div>
            </div>

            {/* Right — Opening Hours + Emergency + Booking */}
            <div className="space-y-6">
              {/* Opening Hours */}
              <SectionFade delay={0.1}>
                <div className="card p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-bg-cream)] to-[var(--color-bg-mint)] flex items-center justify-center shrink-0">
                      <Clock className="size-5 text-[var(--color-accent)]" />
                    </div>
                    <h3 className="font-heading font-600 text-xl text-[var(--color-primary)]">
                      Åpningstider
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {openingHours.map((h) => (
                      <div
                        key={h.day}
                        className={`flex justify-between items-center py-2 border-b border-[var(--color-border)]/50 last:border-0 ${
                          h.closed ? "opacity-50" : ""
                        }`}
                      >
                        <span className="text-[var(--color-text-secondary)] font-sans text-[0.95rem]">
                          {h.day}
                        </span>
                        <span
                          className={`font-sans text-[0.95rem] ${
                            h.closed
                              ? "text-[var(--color-text-muted)] italic"
                              : "text-[var(--color-text-primary)] font-500"
                          }`}
                        >
                          {h.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionFade>

              {/* Emergency */}
              <SectionFade delay={0.2}>
                <div className="rounded-2xl bg-rose-50 border border-rose-200/80 p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                      <AlertTriangle className="size-6 text-rose-600" />
                    </div>
                    <div>
                      <h3 className="font-heading font-600 text-xl text-rose-900 mb-2">
                        Akutt tannverk?
                      </h3>
                      <p className="text-rose-800/80 font-sans font-300 leading-relaxed mb-3">
                        Ved akutt tannverk i åpningstiden, ring oss på{" "}
                        <a
                          href="tel:61280412"
                          className="font-600 text-rose-900 underline underline-offset-2"
                        >
                          61 28 04 12
                        </a>{" "}
                        for raskest mulig hjelp.
                      </p>
                      <p className="text-rose-700/70 text-sm font-sans">
                        Utenom åpningstid:{" "}
                        <a
                          href="tel:116117"
                          className="font-600 underline underline-offset-2"
                        >
                          116 117
                        </a>{" "}
                        (tannlegevakten)
                      </p>
                    </div>
                  </div>
                </div>
              </SectionFade>

              {/* Booking CTA */}
              <SectionFade delay={0.3}>
                <div className="rounded-2xl bg-[var(--color-primary)] p-8 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[var(--color-accent)]/10 blur-2xl" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="size-6 text-[var(--color-accent-light)]" />
                      <h3 className="font-heading font-600 text-xl text-white">
                        Bestill time
                      </h3>
                    </div>
                    <p className="text-white/70 font-sans font-300 leading-relaxed mb-6">
                      Ring oss direkte for å bestille en time som passer deg.
                      Vårt vennlige personale hjelper deg gjerne.
                    </p>
                    <a
                      href="tel:61280412"
                      className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-6 py-3 rounded-full font-sans font-500 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                    >
                      <Phone className="size-4" />
                      Ring 61 28 04 12
                    </a>
                  </div>
                </div>
              </SectionFade>
            </div>
          </div>
        </div>
      </section>

      {/* ── Google Maps ── */}
      <section className="relative">
        <SectionFade>
          <div className="w-full h-[400px] md:h-[500px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1870.5!2d10.1614!3d61.5267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4614f8e5a5a5a5a5%3A0x0!2sJernbanegata%204%2C%202630%20Ringebu!5e0!3m2!1sno!2sno!4v1700000000000!5m2!1sno!2sno"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ringebu Tannlegesenter på kartet"
              className="grayscale-[30%] contrast-[1.05]"
            />
            {/* Overlay gradient at top for smooth transition */}
            <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-white to-transparent pointer-events-none" />
          </div>
        </SectionFade>
      </section>

      {/* ── Finn oss fra turistområder ── */}
      <section className="section-padding bg-[var(--color-bg-cream)]">
        <div className="container-width">
          <SectionFade>
            <div className="text-center mb-14">
              <p className="eyebrow mb-3">Finn oss</p>
              <h2 className="heading-section mb-4">
                Tannlegen i Gudbrandsdalen
              </h2>
              <p className="body-large max-w-2xl mx-auto">
                Ringebu ligger sentralt i dalen med enkel tilgang fra E6. Enten
                du er på hytta, på skiferie, eller bare kjører gjennom — vi er
                lett å finne.
              </p>
            </div>
          </SectionFade>

          {/* Distance Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mb-14">
            {touristDistances.map((d, i) => (
              <SectionFade key={d.place} delay={0.05 * i}>
                <a
                  href={`https://www.google.com/maps/dir/${encodeURIComponent(d.place)},+Norge/Jernbanegata+4,+2630+Ringebu`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-2xl p-6 border border-[var(--color-border)] hover:border-[var(--color-accent)]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group h-full"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4 text-[var(--color-accent)]" />
                      <h3 className="font-heading font-600 text-lg text-[var(--color-primary)]">
                        {d.place}
                      </h3>
                    </div>
                    <span className="text-xs font-sans font-500 uppercase tracking-wider text-[var(--color-text-muted)]">
                      {d.direction}
                    </span>
                  </div>

                  <p className="text-sm text-[var(--color-text-secondary)] font-sans font-300 mb-4">
                    {d.desc}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Clock className="size-4 text-[var(--color-accent)]" />
                      <span className="font-sans font-600 text-[var(--color-primary)]">
                        {d.drive}
                      </span>
                    </div>
                    <span className="text-sm text-[var(--color-text-muted)] font-sans">
                      {d.km}
                    </span>
                    <ChevronRight className="size-3.5 text-[var(--color-accent)] ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </a>
              </SectionFade>
            ))}

            {/* "Hele Gudbrandsdalen" context card */}
            <SectionFade delay={0.3}>
              <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-2xl p-6 text-white h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="size-4 text-[var(--color-accent-light)]" />
                    <h3 className="font-heading font-600 text-lg">
                      Hele Gudbrandsdalen
                    </h3>
                  </div>
                  <p className="text-sm text-white/70 font-sans font-300 leading-relaxed mb-4">
                    Vi tar imot pasienter fra hele dalføret — fra Dovre i nord
                    til Lillehammer i sør. Ligger rett ved E6 med enkel
                    parkering.
                  </p>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Jernbanegata+4,+2630+Ringebu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--color-accent-light)] font-sans font-500 text-sm hover:underline underline-offset-2 cursor-pointer"
                >
                  Se veibeskrivelse
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </SectionFade>
          </div>

          {/* SEO-rich descriptive text */}
          <SectionFade delay={0.1}>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-[var(--color-text-secondary)] font-sans font-300 leading-relaxed text-base">
                Ringebu Tannlegesenter ligger i Jernbanegata 4 i Ringebu
                sentrum, like ved E6 i hjertet av Gudbrandsdalen. Vi er den
                nærmeste tannklinikken for deg som er på ferie i Kvitfjell,
                bor på hytta i Venabygdsfjellet, eller besøker dalføret.
                Trenger du akutt tannbehandling mens du er på reise? Vi
                prioriterer alltid akutte tilfeller.
              </p>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* ── Tourist Emergency Banner ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-width">
          <SectionFade>
            <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-[var(--color-bg-cream)] via-white to-[var(--color-bg-mint)] border border-[var(--color-border)] p-10 md:p-14 text-center relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[var(--color-accent)]/5 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[var(--color-primary)]/5 blur-3xl" />

              <div className="relative z-10">
                <p className="eyebrow mb-3">For besøkende</p>
                <h2 className="font-heading font-600 text-2xl md:text-3xl text-[var(--color-primary)] mb-4 leading-tight">
                  På ferie i Gudbrandsdalen og trenger tannlege?
                </h2>
                <p className="body-editorial max-w-xl mx-auto mb-8">
                  Enten det gjelder en brukket tann på skitur, tannverk på
                  hytteferien, eller en vanlig sjekk — vi tar deg imot raskt
                  og profesjonelt.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="tel:61280412"
                    className="btn-primary"
                  >
                    <Phone className="size-4" />
                    Ring oss: 61 28 04 12
                  </a>
                  <a
                    href="mailto:post@ringebutann.no"
                    className="btn-outline"
                  >
                    <Mail className="size-4" />
                    Send e-post
                  </a>
                </div>
              </div>
            </div>
          </SectionFade>
        </div>
      </section>
    </main>
  );
}
