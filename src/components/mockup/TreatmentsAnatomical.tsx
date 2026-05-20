"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

type Treatment = {
  id: string;
  name: string;
  body: string;
  // Anatomical region the treatment maps to
  region: "enamel" | "crown" | "pulp" | "root" | "missing" | "gum";
  // Label position (percent of svg viewbox 0-100)
  labelX: number;
  labelY: number;
  // Anchor on the tooth for the connecting line (percent)
  anchorX: number;
  anchorY: number;
};

const TREATMENTS: ReadonlyArray<Treatment> = [
  {
    id: "forebyggende",
    name: "Forebyggende",
    body: "Kontroll, rens, fluor — i ro.",
    region: "enamel",
    labelX: 8,
    labelY: 18,
    anchorX: 37,
    anchorY: 26,
  },
  {
    id: "bleking",
    name: "Bleking & estetikk",
    body: "Skånsom klinisk bleking, varig resultat.",
    region: "crown",
    labelX: 78,
    labelY: 18,
    anchorX: 63,
    anchorY: 26,
  },
  {
    id: "generell",
    name: "Generell tannbehandling",
    body: "Fyllinger, kroner, broer.",
    region: "crown",
    labelX: 6,
    labelY: 45,
    anchorX: 37,
    anchorY: 42,
  },
  {
    id: "rotbehandling",
    name: "Rotbehandling",
    body: "Skånsom, smertefri behandling.",
    region: "pulp",
    labelX: 78,
    labelY: 45,
    anchorX: 53,
    anchorY: 40,
  },
  {
    id: "akutt",
    name: "Akutt tannhjelp",
    body: "Hurtig vurdering, samme dag.",
    region: "gum",
    labelX: 8,
    labelY: 78,
    anchorX: 40,
    anchorY: 53,
  },
  {
    id: "implantater",
    name: "Implantater",
    body: "Permanente, naturlige løsninger.",
    region: "root",
    labelX: 78,
    labelY: 78,
    anchorX: 58,
    anchorY: 76,
  },
];

export function TreatmentsAnatomical() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();
  const active = TREATMENTS.find((t) => t.id === activeId) ?? null;

  return (
    <section className="bg-[var(--color-paper)] py-[var(--space-section)]">
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <h2 className="display-section max-w-[640px] text-[var(--color-text-primary)]">
            Seks fagområder,{" "}
            <span className="font-light text-[var(--color-stone)]">én</span> tann.
          </h2>
          <p className="max-w-[300px] text-[15px] leading-[1.55] text-[var(--color-text-secondary)] md:text-right">
            Hold pekeren over et felt for å se hvordan behandlingen påvirker tannen.
          </p>
        </div>

        {/* Diagram canvas */}
        <div className="relative mx-auto aspect-[5/4] w-full max-w-[1080px]">
          {/* Mobile: stacked list (no diagram) */}
          <div className="grid grid-cols-1 gap-px bg-[var(--color-rule)] md:hidden">
            {TREATMENTS.map((t) => (
              <Link
                key={t.id}
                href="/behandlinger"
                className="group flex items-start justify-between gap-4 bg-[var(--color-paper)] p-5"
              >
                <div>
                  <h3 className="font-sans text-[20px] font-medium tracking-[-0.02em] text-[var(--color-text-primary)]">
                    {t.name}
                  </h3>
                  <p className="mt-1 text-[14px] text-[var(--color-text-secondary)]">
                    {t.body}
                  </p>
                </div>
                <ArrowUpRight className="size-4 text-[var(--color-brass)]" aria-hidden="true" />
              </Link>
            ))}
          </div>

          {/* Desktop diagram */}
          <div className="absolute inset-0 hidden md:block">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <defs>
                {/* Enamel — pearly cream, brightest at top */}
                <linearGradient id="enamelFill" x1="0.5" y1="0" x2="0.5" y2="1">
                  <stop offset="0%" stopColor="#FBF5E5" />
                  <stop offset="60%" stopColor="#F4EAD2" />
                  <stop offset="100%" stopColor="#EDDFBC" />
                </linearGradient>
                {/* Dentin — warm taupe, slightly darker, forms tooth body and roots */}
                <linearGradient id="dentinFill" x1="0.5" y1="0" x2="0.5" y2="1">
                  <stop offset="0%" stopColor="#E8D4AE" />
                  <stop offset="100%" stopColor="#C9AC7E" />
                </linearGradient>
                {/* Cementum on roots — slightly more muted */}
                <linearGradient id="cementumFill" x1="0.5" y1="0" x2="0.5" y2="1">
                  <stop offset="0%" stopColor="#D4B98C" />
                  <stop offset="100%" stopColor="#A88A5C" />
                </linearGradient>
                {/* Pulp — warm pink-amber */}
                <radialGradient id="pulpFill" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#D4906A" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#A85838" stopOpacity="0.85" />
                </radialGradient>
                {/* Subtle inflammation pulse for gum */}
                <radialGradient id="gumGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#B8624A" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#B8624A" stopOpacity="0" />
                </radialGradient>
                {/* Drop shadow for the tooth */}
                <filter id="toothShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="0.6" />
                  <feOffset dx="0" dy="0.6" result="offsetblur" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.25" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="brassFade" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#B8945C" stopOpacity="0" />
                  <stop offset="50%" stopColor="#B8945C" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#B8945C" stopOpacity="0" />
                </linearGradient>
                {/* Clip path for enamel — only above gum line */}
                <clipPath id="enamelClip">
                  <rect x="0" y="0" width="100" height="52" />
                </clipPath>
              </defs>

              {/* Soft floor shadow under the tooth */}
              <ellipse cx="50" cy="89" rx="22" ry="1.5" fill="#1A1410" opacity="0.10" />

              {/* ── ANATOMICAL TOOTH (cross-section molar) ─────────────────
                  Layer order, bottom up:
                  1. Cementum (roots) — covers root surface, below gum
                  2. Dentin (whole tooth) — fills entire silhouette
                  3. Enamel (crown only, above gum) — outer crown
                  4. Pulp chamber + canals — inner red
                  5. Outlines + gum line
                  ───────────────────────────────────────────────────────── */}
              <g filter="url(#toothShadow)">
                {/* Tooth body — DENTIN fills whole silhouette.
                    Path: crown with 3 cusps → neck → 2 splayed roots → back up.
                    Coordinates: crown 36–64 wide @ y22–50, roots splay to 33/67 @ y86. */}
                <path
                  d="
                    M 38,50
                    C 36,46 35,38 36,30
                    C 37,24 38,22 40,22
                    C 41,20 43,18 44,18
                    C 45,20 46,22 47,22
                    C 48,20 50,17 50,17
                    C 50,17 52,20 53,22
                    C 54,22 55,20 56,18
                    C 57,18 59,20 60,22
                    C 62,22 63,24 64,30
                    C 65,38 64,46 62,50
                    L 62,52
                    C 62,56 64,60 65,64
                    C 67,72 67,80 64,84
                    C 62,88 60,86 60,82
                    C 58,76 56,70 54,62
                    L 54,60
                    C 52,59 48,59 46,60
                    L 46,62
                    C 44,70 42,76 40,82
                    C 40,86 38,88 36,84
                    C 33,80 33,72 35,64
                    C 36,60 38,56 38,52
                    Z
                  "
                  fill="url(#dentinFill)"
                />

                {/* CEMENTUM — covers roots below gum line (subtle band) */}
                <path
                  d="
                    M 38,52
                    C 38,56 36,60 35,64
                    C 33,72 33,80 36,84
                    C 38,88 40,86 40,82
                    C 42,76 44,70 46,62
                    L 46,60
                    C 48,59 52,59 54,60
                    L 54,62
                    C 56,70 58,76 60,82
                    C 60,86 62,88 64,84
                    C 67,80 67,72 65,64
                    C 64,60 62,56 62,52
                    Z
                  "
                  fill="url(#cementumFill)"
                  opacity="0.92"
                />

                {/* ENAMEL — crown layer, clipped to above gum line. Inset slightly. */}
                <path
                  clipPath="url(#enamelClip)"
                  d="
                    M 39,50
                    C 37,46 36.5,38 37.5,30
                    C 38.5,25 39.5,23.5 41,23.5
                    C 42,21.5 43.5,19.5 44.5,19.5
                    C 45.5,21.5 46.5,23 47.5,23
                    C 48.5,21 50,18.5 50,18.5
                    C 50,18.5 51.5,21 52.5,23
                    C 53.5,23 54.5,21.5 55.5,19.5
                    C 56.5,19.5 58,21.5 59,23.5
                    C 60.5,23.5 61.5,25 62.5,30
                    C 63.5,38 63,46 61,50
                    Z
                  "
                  fill="url(#enamelFill)"
                />

                {/* PULP CHAMBER — bell shape in upper crown */}
                <path
                  d="
                    M 46,30
                    C 46,28 48,27 50,27
                    C 52,27 54,28 54,30
                    C 54,36 53,42 52,46
                    L 52,52
                    C 51.4,53 50.6,53 50,52
                    L 50,52
                    L 48,52
                    C 47.4,53 48.6,53 48,52
                    L 48,46
                    C 47,42 46,36 46,30
                    Z
                  "
                  fill="url(#pulpFill)"
                  opacity="0.85"
                />

                {/* PULP CANALS — narrow channels down each root */}
                <path
                  d="M 48,52 C 48,58 47,66 45,76 C 44,80 43,82 42,82"
                  stroke="#A85838"
                  strokeWidth="0.7"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.78"
                />
                <path
                  d="M 52,52 C 52,58 53,66 55,76 C 56,80 57,82 58,82"
                  stroke="#A85838"
                  strokeWidth="0.7"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.78"
                />

                {/* OUTER STROKE — tooth silhouette */}
                <path
                  d="
                    M 38,50
                    C 36,46 35,38 36,30
                    C 37,24 38,22 40,22
                    C 41,20 43,18 44,18
                    C 45,20 46,22 47,22
                    C 48,20 50,17 50,17
                    C 50,17 52,20 53,22
                    C 54,22 55,20 56,18
                    C 57,18 59,20 60,22
                    C 62,22 63,24 64,30
                    C 65,38 64,46 62,50
                    L 62,52
                    C 62,56 64,60 65,64
                    C 67,72 67,80 64,84
                    C 62,88 60,86 60,82
                    C 58,76 56,70 54,62
                    L 54,60
                    C 52,59 48,59 46,60
                    L 46,62
                    C 44,70 42,76 40,82
                    C 40,86 38,88 36,84
                    C 33,80 33,72 35,64
                    C 36,60 38,56 38,52
                    Z
                  "
                  fill="none"
                  stroke="#3A2A1A"
                  strokeWidth="0.45"
                  strokeLinejoin="round"
                />

                {/* CEJ (cementum-enamel junction) — thin band at neck */}
                <path
                  d="M 38,52 L 62,52"
                  stroke="#8B6F4A"
                  strokeWidth="0.25"
                  opacity="0.6"
                />
              </g>

              {/* GUM LINE — runs horizontally across, sitting at the neck. Faint pink-brass. */}
              <path
                d="M 18,53 C 30,52 38,52 50,52 C 62,52 70,52 82,53"
                stroke="#C28570"
                strokeWidth="0.5"
                fill="none"
                opacity="0.45"
              />
              <path
                d="M 18,53.5 C 30,52.5 38,52.5 50,52.5 C 62,52.5 70,52.5 82,53.5"
                stroke="#3A2A1A"
                strokeWidth="0.18"
                fill="none"
                opacity="0.35"
              />

              {/* ── REGION HIGHLIGHTS on active ───────────────────────── */}
              {active && (
                <g style={{ pointerEvents: "none" }}>
                  {active.region === "enamel" && (
                    <>
                      {/* Outer enamel glow — thicker stroke on outer crown edge */}
                      <path
                        d="M 38,50 C 36,46 35,38 36,30 C 37,24 38,22 40,22 C 41,20 43,18 44,18 C 45,20 46,22 47,22 C 48,20 50,17 50,17 C 50,17 52,20 53,22 C 54,22 55,20 56,18 C 57,18 59,20 60,22 C 62,22 63,24 64,30 C 65,38 64,46 62,50"
                        fill="none"
                        stroke="#B8945C"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        opacity="0.95"
                      >
                        <animate attributeName="opacity" values="0;0.95" dur="0.4s" />
                      </path>
                      <path
                        d="M 38,50 C 36,46 35,38 36,30 C 37,24 38,22 40,22 C 41,20 43,18 44,18 C 45,20 46,22 47,22 C 48,20 50,17 50,17 C 50,17 52,20 53,22 C 54,22 55,20 56,18 C 57,18 59,20 60,22 C 62,22 63,24 64,30 C 65,38 64,46 62,50"
                        fill="none"
                        stroke="#F5E9CB"
                        strokeWidth="0.35"
                        strokeLinecap="round"
                      />
                    </>
                  )}
                  {active.region === "crown" && (
                    <path
                      d="M 39,50 C 37,46 36.5,38 37.5,30 C 38.5,25 39.5,23.5 41,23.5 C 42,21.5 43.5,19.5 44.5,19.5 C 45.5,21.5 46.5,23 47.5,23 C 48.5,21 50,18.5 50,18.5 C 50,18.5 51.5,21 52.5,23 C 53.5,23 54.5,21.5 55.5,19.5 C 56.5,19.5 58,21.5 59,23.5 C 60.5,23.5 61.5,25 62.5,30 C 63.5,38 63,46 61,50 Z"
                      fill="#B8945C"
                      opacity="0.25"
                    >
                      <animate attributeName="opacity" values="0;0.25" dur="0.4s" />
                    </path>
                  )}
                  {active.region === "pulp" && (
                    <path
                      d="M 46,30 C 46,28 48,27 50,27 C 52,27 54,28 54,30 C 54,36 53,42 52,46 L 52,52 L 48,52 L 48,46 C 47,42 46,36 46,30 Z"
                      fill="#B8624A"
                      opacity="0.6"
                    >
                      <animate attributeName="opacity" values="0;0.7;0.45;0.7" dur="1.8s" repeatCount="indefinite" />
                    </path>
                  )}
                  {active.region === "root" && (
                    <>
                      <path
                        d="M 48,52 C 48,58 47,66 45,76 C 44,80 43,82 42,82"
                        stroke="#B8945C"
                        strokeWidth="1.4"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0.95"
                      />
                      <path
                        d="M 52,52 C 52,58 53,66 55,76 C 56,80 57,82 58,82"
                        stroke="#B8945C"
                        strokeWidth="1.4"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0.95"
                      />
                      {/* Implant indicator: small target glow at root tips */}
                      <circle cx="42" cy="83" r="1.6" fill="#B8945C" opacity="0.6">
                        <animate attributeName="opacity" values="0;0.6" dur="0.5s" />
                      </circle>
                      <circle cx="58" cy="83" r="1.6" fill="#B8945C" opacity="0.6">
                        <animate attributeName="opacity" values="0;0.6" dur="0.5s" />
                      </circle>
                    </>
                  )}
                  {active.region === "missing" && (
                    <>
                      {/* Implant: dashed silhouette + screw post next to tooth */}
                      <g transform="translate(0,0)">
                        <ellipse cx="75" cy="89" rx="4" ry="0.8" fill="#1A1410" opacity="0.12" />
                        <rect x="73" y="56" width="4" height="28" rx="0.6" fill="url(#cementumFill)" opacity="0.85" />
                        {/* Screw threads */}
                        {Array.from({ length: 8 }).map((_, i) => (
                          <line
                            key={i}
                            x1="73"
                            y1={60 + i * 3}
                            x2="77"
                            y2={61.5 + i * 3}
                            stroke="#3A2A1A"
                            strokeWidth="0.2"
                            opacity="0.6"
                          />
                        ))}
                        {/* Crown atop implant */}
                        <path
                          d="M 71,56 C 71,52 73,49 75,49 C 77,49 79,52 79,56 Z"
                          fill="url(#enamelFill)"
                          stroke="#3A2A1A"
                          strokeWidth="0.3"
                        />
                      </g>
                    </>
                  )}
                  {active.region === "gum" && (
                    <>
                      <ellipse cx="50" cy="53" rx="25" ry="2.5" fill="url(#gumGlow)">
                        <animate attributeName="opacity" values="0;1" dur="0.5s" />
                      </ellipse>
                      <path
                        d="M 18,53 C 30,52 38,52 50,52 C 62,52 70,52 82,53"
                        stroke="#B8624A"
                        strokeWidth="0.9"
                        fill="none"
                      >
                        <animate attributeName="opacity" values="0;0.95;0.55;0.95" dur="1.6s" repeatCount="indefinite" />
                      </path>
                    </>
                  )}

                  {/* Connecting line from label to anchor */}
                  <line
                    x1={active.labelX + (active.labelX < 50 ? 12 : -2)}
                    y1={active.labelY + 2}
                    x2={active.anchorX}
                    y2={active.anchorY}
                    stroke="url(#brassFade)"
                    strokeWidth="0.3"
                    strokeDasharray="0.8 0.8"
                  />
                  <circle cx={active.anchorX} cy={active.anchorY} r="0.9" fill="#B8945C" />
                </g>
              )}
            </svg>

            {/* Labels positioned over SVG */}
            {TREATMENTS.map((t) => {
              const isActive = activeId === t.id;
              return (
                <Link
                  key={t.id}
                  href="/behandlinger"
                  onMouseEnter={() => setActiveId(t.id)}
                  onMouseLeave={() => setActiveId((prev) => (prev === t.id ? null : prev))}
                  onFocus={() => setActiveId(t.id)}
                  onBlur={() => setActiveId((prev) => (prev === t.id ? null : prev))}
                  className="group absolute block"
                  style={{
                    left: `${t.labelX}%`,
                    top: `${t.labelY}%`,
                    width: t.labelX < 50 ? "26%" : "26%",
                    textAlign: t.labelX < 50 ? "left" : "right",
                  }}
                >
                  <motion.div
                    initial={false}
                    animate={
                      prefersReduced
                        ? undefined
                        : { x: isActive ? (t.labelX < 50 ? 4 : -4) : 0 }
                    }
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div
                      className={`mb-1.5 inline-flex items-center gap-2 ${
                        t.labelX < 50 ? "flex-row" : "flex-row-reverse"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-px transition-all duration-500 ${
                          isActive ? "w-10 bg-[var(--color-brass)]" : "w-5 bg-[var(--color-rule)]"
                        }`}
                      />
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-brass)]">
                        {String(TREATMENTS.indexOf(t) + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3
                      className={`font-sans font-medium tracking-[-0.02em] transition-colors duration-300 ${
                        isActive ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-primary)]"
                      }`}
                      style={{ fontSize: "clamp(18px, 1.6vw, 22px)", lineHeight: 1.15 }}
                    >
                      {t.name}
                    </h3>
                    <p className="mt-1 text-[13px] leading-[1.5] text-[var(--color-text-secondary)]">
                      {t.body}
                    </p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer link */}
        <div className="mt-16">
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
