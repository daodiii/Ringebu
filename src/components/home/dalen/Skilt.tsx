"use client";

import Image from "next/image";
import { useRef } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import s from "./dalen.module.css";

/**
 * The clinic's sign, as it hangs outside the door in Jernbanegata: a dark
 * board on two chains from a round iron bar, the tooth on a pale square and
 * the name beside it. Here the bar is the arm of a post by the road, so the
 * valley shows where the clinic is. Brush past it or tap it and it swings on
 * its chains, then settles; in winter snow lies along the arm and the board.
 *
 * Sizes are in cqw of the sign's own box, which is placed on the strip in
 * strip units (Dalen.tsx), so the sign grows and shrinks with the valley.
 */

/** One chain, a column of links seen face on and edge on in turn. */
function Lenke() {
  const links = 5;
  return (
    <svg viewBox={`0 0 6 ${links * 7 + 2}`} preserveAspectRatio="none" className="block h-full w-full overflow-visible">
      {Array.from({ length: links }, (_, i) =>
        i % 2 ? (
          <rect key={i} x={2.3} y={i * 7 + 0.5} width={1.4} height={8} rx={0.7} fill="#2A3138" />
        ) : (
          <rect key={i} x={1} y={i * 7 + 0.5} width={4} height={8} rx={2} fill="none" stroke="#2A3138" strokeWidth={1.3} />
        ),
      )}
    </svg>
  );
}

export function Skilt({ reduced }: { reduced: boolean }) {
  const rotX = useMotionValue(0);
  const rotZ = useMotionValue(0);
  const lastPush = useRef(0);

  /** A push from the pointer: speed in px per event, which way it went. */
  const push = (dx: number, dy: number) => {
    if (reduced) return;
    const now = performance.now();
    if (now - lastPush.current < 140) return;
    lastPush.current = now;
    const speed = Math.min(40, Math.hypot(dx, dy));
    if (speed < 1.5) return;
    // The board swings about its bar, mostly towards you and away; a sideways
    // brush rocks it a little too, as far as the two chains let it.
    const dir = dy < 0 || (dy === 0 && dx > 0) ? 1 : -1;
    animate(rotX, 0, {
      type: "spring",
      stiffness: 24,
      damping: 1.5,
      velocity: Math.max(-260, Math.min(260, rotX.getVelocity() + dir * (60 + speed * 5))),
    });
    animate(rotZ, 0, {
      type: "spring",
      stiffness: 34,
      damping: 3.2,
      velocity: Math.max(-14, Math.min(14, rotZ.getVelocity() - dx * 0.4)),
    });
  };

  return (
    <div aria-hidden="true" className={s.skilt}>
      {/* The post by the road, its arm and the brace under it */}
      <span className={s.stolpe} />
      <span className={s.stag} />
      <span className={s.bom}>
        <span className={s.sno} />
      </span>
      <motion.div
        className={s.sving}
        style={{ rotateX: rotX, rotate: rotZ, transformPerspective: 700 }}
        onPointerMove={(e) => e.pointerType === "mouse" && push(e.movementX, e.movementY)}
        onPointerDown={(e) => {
          lastPush.current = 0;
          push(e.pointerType === "mouse" ? 6 : 10, -14);
        }}
      >
        <div className={s.utfold}>
          <div className={s.vugge}>
            <span className={`${s.lenke} left-[13%]`}>
              <Lenke />
            </span>
            <span className={`${s.lenke} right-[13%]`}>
              <Lenke />
            </span>
            <div className={s.tavle}>
              <span className={s.sno} />
              <span className={s.merke}>
                <Image src="/images/logo-mark.png" alt="" width={217} height={200} sizes="80px" className="h-auto w-full" />
              </span>
              <span className={s.navn}>
                <span>Ringebu</span>
                <span>Tannlegesenter</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
