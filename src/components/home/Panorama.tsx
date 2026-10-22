import { Phone } from "lucide-react";
import { Merke } from "@/components/Merke";
import { RING } from "@/components/kontakt/data";
import { AskButton } from "./panorama/AskButton";
import { Flis } from "./panorama/KlinikkBilde";
import { KLINIKK as K } from "./panorama/klinikk";
import { NavSignal } from "./panorama/NavSignal";
import { Slides } from "./panorama/Slides";
import { ValleyPicture } from "./panorama/ValleyPicture";
import s from "./panorama/panorama.module.css";
import type { CSSProperties } from "react";

/**
 * «Panorama». The front page opens on the whole valley, the view from the lookout
 * above Ringebu, edge to edge. After a moment the warm-white column (the clinic's
 * mark and name, the line under it, the two actions) slides in from the left and the
 * first three photographs of the clinic from the right (the dental chair big, the
 * X-ray and the hall beside it), and they meet over it. A few seconds on, a second set
 * takes their place and stays (the treatment room big, the sign and the instruments). It happens
 * by itself, once; nobody has to scroll through it. How it moves, and why the second
 * set loads late, is in panorama.module.css and Slides.tsx.
 *
 * On a phone the column is a panel at the bottom, in thumb reach, and the
 * photographs are above it.
 */

/** The words come in one after another once the column has landed. */
const after = (d: string) => ({ "--d": d }) as CSSProperties;

export function Panorama() {
  return (
    <section aria-label="Velkommen" data-panorama="" className={s.root}>
      <NavSignal />

      {/* ── The valley ── */}
      <div className={s.valley}>
        <ValleyPicture />
      </div>

      {/* ── The column ── */}
      <div className={s.col}>
        <h1 className={`${s.lock} ${s.in}`} style={after("0.8s")}>
          <Merke className={s.mark} />
          <span className={s.name}>
            <span>Ringebu</span>
            <span>Tannlegesenter</span>
          </span>
        </h1>
        <p className={`${s.sub} ${s.in}`} style={after("0.92s")}>
          Hos oss er du i trygge hender
        </p>
        <div className={`${s.actions} ${s.in}`} style={after("1.04s")}>
          <a href={RING.href} className="knapp knapp-blekk">
            <Phone aria-hidden="true" />
            {RING.label}
          </a>
          <AskButton />
        </div>
      </div>

      {/* ── The clinic: two sets of photographs ── */}
      <div className={s.field}>
        <Slides
          holdDesk={5400}
          holdPhone={3800}
          aClass={s.bigRight}
          bClass={s.bigLeft}
          a={
            <>
              <div className={s.stack}>
                <Flis b={K.gang} sizes="(min-width: 900px) 30vw, 40vw" />
                <Flis b={K.rontgen} sizes="(min-width: 900px) 30vw, 40vw" />
              </div>
              <Flis b={K.stol} sizes="(min-width: 900px) 40vw, 60vw" />
            </>
          }
          b={
            <>
              <Flis b={K.rom} sizes="(min-width: 900px) 40vw, 60vw" />
              <div className={s.stack}>
                <Flis b={K.skilt} sizes="(min-width: 900px) 30vw, 40vw" />
                <Flis b={K.utstyr} sizes="(min-width: 900px) 30vw, 40vw" />
              </div>
            </>
          }
        />
      </div>
    </section>
  );
}
