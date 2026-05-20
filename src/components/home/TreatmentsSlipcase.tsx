"use client";

import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

type Spine = {
  id: string;
  name: string;
  body: string;
  detail: string;
  refusjon: string;
  duration: string;
  // Subtle tonal variation across the row — 5–8% within the warm palette.
  // Open spine ignores this and uses --color-ink for the cinematic contrast.
  closedTone: string;
};

const SPINES: ReadonlyArray<Spine> = [
  {
    id: "forebyggende",
    name: "Forebyggende",
    body: "Den enkleste timen er den du tar i tide.",
    detail:
      "Rutinekontroll, profesjonell rens og fluorbehandling. Vi ser etter de små tegnene før de blir store problemer — i ro, uten hastverk.",
    refusjon: "HELFO",
    duration: "30–45 min",
    closedTone: "#EFE8DA",
  },
  {
    id: "generell",
    name: "Generell tannbehandling",
    body: "Tradisjonelt håndverk med moderne materialer.",
    detail:
      "Fyllinger, kroner og broer utført med vekt på presisjon og estetikk. Komposittfyllinger som matcher dine egne tenner.",
    refusjon: "HELFO",
    duration: "45–90 min",
    closedTone: "#EBE2CE",
  },
  {
    id: "akutt",
    name: "Akutt tannhjelp",
    body: "Hurtig vurdering, samme dag.",
    detail:
      "Tannverk venter ikke. Vi setter av tid hver dag for akutte tilfeller — ring tidlig på dagen, så finner vi løsning.",
    refusjon: "HELFO",
    duration: "Samme dag",
    closedTone: "#F0E8D6",
  },
  {
    id: "bleking",
    name: "Bleking & estetikk",
    body: "Skånsom klinisk bleking, varig resultat.",
    detail:
      "Klinisk bleking under kontroll. Ikke butikkprodukter, ikke sjokkeffekter — bare et reelt, varig hvitere smil.",
    refusjon: "Egenandel",
    duration: "60–90 min",
    closedTone: "#ECE6D6",
  },
  {
    id: "implantater",
    name: "Implantater",
    body: "Permanente, naturlige løsninger.",
    detail:
      "Implantater som ser ut og føles som dine egne tenner. Hele forløpet — fra vurdering til ferdig tann — i én klinikk.",
    refusjon: "Delvis HELFO",
    duration: "Flere besøk",
    closedTone: "#E8DCC2",
  },
  {
    id: "rotbehandling",
    name: "Rotbehandling",
    body: "Skånsom, smertefri behandling som bevarer tannen.",
    detail:
      "Moderne rotbehandling med digital røntgen og lokalbedøvelse. Målet er alltid å bevare din egen tann.",
    refusjon: "HELFO",
    duration: "60–90 min",
    closedTone: "#EEE3CC",
  },
];

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function TreatmentsSlipcase() {
  const [openId, setOpenId] = useState<string>(SPINES[0].id);
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="behandlinger"
      className="bg-[var(--color-paper)] py-[var(--space-section)]"
    >
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <h2 className="display-section max-w-[640px] text-[var(--color-text-primary)]">
            Skreddersydde løsninger for{" "}
            <span className="font-light text-[var(--color-stone)]">ditt</span> smil.
          </h2>
          <p className="max-w-[300px] text-[15px] leading-[1.55] text-[var(--color-text-secondary)] md:text-right">
            Seks fagområder, ett team. HELFO direkte oppgjør på alle stønadsberettigede behandlinger.
          </p>
        </div>

        {/* Slipcase — desktop */}
        <div
          className="hidden h-[520px] gap-2 md:flex"
          role="tablist"
          aria-label="Behandlinger"
        >
          {SPINES.map((spine, i) => {
            const isOpen = openId === spine.id;
            return (
              <motion.button
                type="button"
                key={spine.id}
                role="tab"
                aria-selected={isOpen}
                onClick={() => setOpenId(spine.id)}
                onMouseEnter={() => setOpenId(spine.id)}
                animate={{ flex: isOpen ? 5 : 1 }}
                transition={
                  prefersReduced
                    ? { duration: 0 }
                    : { duration: 0.7, ease: EASE }
                }
                style={isOpen ? undefined : { backgroundColor: spine.closedTone }}
                className={`group relative overflow-hidden border-l border-[var(--color-rule)] text-left transition-colors ${
                  isOpen
                    ? "bg-[var(--color-ink)] text-white"
                    : "text-[var(--color-text-primary)]"
                } ${i === SPINES.length - 1 ? "border-r border-[var(--color-rule)]" : ""}`}
              >
                {/* Top brass tick */}
                <div
                  aria-hidden="true"
                  className={`absolute left-0 right-0 top-0 h-px transition-colors duration-500 ${
                    isOpen ? "bg-[var(--color-amber)]" : "bg-[var(--color-brass)]/40"
                  }`}
                />

                {/* Index number */}
                <div
                  className={`absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors ${
                    isOpen ? "text-[var(--color-amber)]" : "text-[var(--color-brass)]"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Collapsed (spine) content */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center px-2 transition-opacity duration-500 ${
                    isOpen ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                  aria-hidden={isOpen}
                >
                  <span
                    className="font-sans text-[15px] font-medium tracking-[-0.01em]"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {spine.name}
                  </span>
                </div>

                {/* Expanded content */}
                <AnimatePresence mode="wait">
                  {isOpen && (
                    <motion.div
                      key="expanded"
                      initial={prefersReduced ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
                      className="relative flex h-full flex-col justify-between p-8 md:p-10"
                    >
                      <div className="flex items-start justify-between gap-6">
                        <h3
                          className="font-sans text-white"
                          style={{
                            fontWeight: 300,
                            fontSize: "clamp(34px, 3.6vw, 56px)",
                            lineHeight: 1.02,
                            letterSpacing: "-0.03em",
                          }}
                        >
                          {spine.name}
                        </h3>
                        <div className="flex flex-col items-end gap-2 pt-3">
                          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-amber)]/70">
                            {spine.refusjon}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-amber)]/70">
                            {spine.duration}
                          </span>
                        </div>
                      </div>

                      <div className="max-w-[520px]">
                        <p className="text-[18px] leading-[1.4] text-[var(--color-amber)]">
                          {spine.body}
                        </p>
                        <p className="mt-4 text-[14px] leading-[1.6] text-[var(--color-text-on-dark-muted)]">
                          {spine.detail}
                        </p>
                        <Link
                          href="/behandlinger"
                          className="mt-8 inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--color-amber)] transition-colors hover:text-white"
                        >
                          Les mer
                          <ArrowUpRight
                            className="size-3.5 transition-transform hover:translate-x-0.5 hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* Mobile — accordion */}
        <div className="md:hidden">
          {SPINES.map((spine, i) => {
            const isOpen = openId === spine.id;
            return (
              <div
                key={spine.id}
                className="border-t border-[var(--color-rule)] last:border-b"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? "" : spine.id)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-brass)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-sans text-[22px] font-medium tracking-[-0.02em] text-[var(--color-text-primary)]">
                      {spine.name}
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    className={`size-2 rounded-full bg-[var(--color-brass)] transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6">
                        <p className="text-[15px] leading-[1.6] text-[var(--color-text-secondary)]">
                          {spine.detail}
                        </p>
                        <Link
                          href="/behandlinger"
                          className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-primary)]"
                        >
                          Les mer
                          <ArrowUpRight className="size-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Footer link */}
        <div className="mt-12">
          <Link
            href="/behandlinger"
            className="group inline-flex items-center gap-2 text-[13px] font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-stone)]"
          >
            Se alle behandlinger
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
