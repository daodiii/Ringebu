"use client";

import { useRef, useState } from "react";
import styles from "./KlinikkBilder.module.css";

const bilder = [
  { fil: "01-treatment-room", tekst: "Behandlingsrommet", alt: "Behandlingsrom med grønn tannlegestol, arbeidsbenk og undersøkelseslampe", bredde: 2160, hoyde: 2880 },
  { fil: "02-dental-chair", tekst: "Tannlegestolen", alt: "Grønn tannlegestol med undersøkelseslampe og behandlingsutstyr", bredde: 2160, hoyde: 2880 },
  { fil: "03-instruments", tekst: "Utstyret vårt", alt: "Tannlegeinstrumenter og behandlingsenhet med blått underlag", bredde: 2880, hoyde: 2160 },
  { fil: "05-clinic-interior", tekst: "Inne på klinikken", alt: "Glassvegger med motiv fra Gudbrandsdalen inne på klinikken", bredde: 2160, hoyde: 2880 },
  { fil: "06-clinic-sign", tekst: "Her finner du oss", alt: "Skiltet til Ringebu Tannlegesenter på fasaden en vinterdag", bredde: 2880, hoyde: 2685 },
  { fil: "07-xray-machine", tekst: "Panoramarøntgen", alt: "Klinikkens apparat for panoramarøntgen", bredde: 2160, hoyde: 2880 },
] as const;

export function KlinikkBilder() {
  const [aktiv, settAktiv] = useState(0);
  const spor = useRef<HTMLDivElement>(null);

  function vis(indeks: number) {
    const neste = Math.max(0, Math.min(bilder.length - 1, indeks));
    const element = spor.current;
    if (!element) return;
    element.scrollTo({
      left: neste * element.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <section className={styles.galleri} aria-labelledby="klinikk-bilder-tittel">
      <header className={styles.innledning}>
        <p className={styles.overlinje}>Ringebu Tannlegesenter</p>
        <h2 id="klinikk-bilder-tittel">Et lite innblikk i klinikken.</h2>
      </header>
      <div
        ref={spor}
        className={styles.bilder}
        role="region"
        aria-label="Bilder fra klinikken. Bruk piltastene for å bla."
        aria-roledescription="bildekarusell"
        tabIndex={0}
        onScroll={(event) => {
          const element = event.currentTarget;
          settAktiv(Math.round(element.scrollLeft / element.clientWidth));
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            vis(aktiv + (event.key === "ArrowRight" ? 1 : -1));
          }
        }}
      >
        {bilder.map((bilde, indeks) => (
          <figure key={bilde.fil} aria-label={`${indeks + 1} av ${bilder.length}: ${bilde.tekst}`}>
            {/* Pre-encoded WebP sizes are served directly to avoid recompression. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/klinikk/${bilde.fil}-1920.webp`}
              srcSet={[960, 1920, 2880].map((kant) => {
                const bredde = Math.round(kant * bilde.bredde / Math.max(bilde.bredde, bilde.hoyde));
                return `/images/klinikk/${bilde.fil}-${kant}.webp ${bredde}w`;
              }).join(", ")}
              sizes="(min-width: 1280px) 960px, 92vw"
              width={bilde.bredde}
              height={bilde.hoyde}
              alt={bilde.alt}
              loading="lazy"
              decoding="async"
            />
          </figure>
        ))}
      </div>
      <div className={styles.kontroller}>
        <p aria-live="polite" aria-atomic="true">
          <span className={styles.teller}>{aktiv + 1} / {bilder.length}</span>
          {bilder[aktiv].tekst}
        </p>
        <div className={styles.piler}>
          <button type="button" onClick={() => vis(aktiv - 1)} disabled={aktiv === 0} aria-label="Forrige bilde">←</button>
          <button type="button" onClick={() => vis(aktiv + 1)} disabled={aktiv === bilder.length - 1} aria-label="Neste bilde">→</button>
        </div>
      </div>
      <div className={styles.miniatyrer} role="group" aria-label="Velg bilde">
        {bilder.map((bilde, indeks) => (
          <button key={bilde.fil} type="button" onClick={() => vis(indeks)} aria-label={`Vis bilde ${indeks + 1}: ${bilde.tekst}`} aria-pressed={aktiv === indeks}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/klinikk/${bilde.fil}-960.webp`} alt="" width={120} height={90} loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
    </section>
  );
}
