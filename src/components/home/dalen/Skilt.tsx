"use client";

import Image from "next/image";
import { useRef } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import s from "./dalen.module.css";

/**
 * The clinic's sign, as it hangs outside the door in Jernbanegata: a dark
 * board with the tooth on a pale square and the name beside it. Here it hangs
 * from a ring under «Bestill time», on two chains spread to its corners, in
 * the sky under the words, so the valley keeps its view. Brush past it or tap
 * it and it swings about the ring, then settles; in winter snow lies on top.
 *
 * Sizes are in cqw of the sign's own box (the button's width and a little
 * either side), so it scales with the button.
 */

/** One chain, a column of links seen face on and edge on in turn. */
function Lenke() {
  const links = 14;
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
    // Hung from one ring, the board swings towards you and away, and turns a
    // little more in its own plane than it would on two hooks.
    const dir = dy < 0 || (dy === 0 && dx > 0) ? 1 : -1;
    animate(rotX, 0, {
      type: "spring",
      stiffness: 24,
      damping: 1.5,
      velocity: Math.max(-260, Math.min(260, rotX.getVelocity() + dir * (60 + speed * 5))),
    });
    animate(rotZ, 0, {
      type: "spring",
      stiffness: 30,
      damping: 2.6,
      velocity: Math.max(-22, Math.min(22, rotZ.getVelocity() - dx * 0.6)),
    });
  };

  return (
    <span aria-hidden="true" className={s.skilt}>
      <span className={s.ring} />
      <motion.span
        className={s.sving}
        style={{ rotateX: rotX, rotate: rotZ, transformPerspective: 700 }}
        onPointerMove={(e) => e.pointerType === "mouse" && push(e.movementX, e.movementY)}
        onPointerDown={(e) => {
          lastPush.current = 0;
          push(e.pointerType === "mouse" ? 6 : 10, -14);
        }}
      >
        <span className={s.utfold}>
          <span className={s.vugge}>
            <span className={`${s.lenke} ${s.lenkeV}`}>
              <Lenke />
            </span>
            <span className={`${s.lenke} ${s.lenkeH}`}>
              <Lenke />
            </span>
            <span className={s.tavle}>
              <span className={s.sno} />
              <span className={s.merke}>
                <Image src="/images/logo-mark.png" alt="" width={217} height={200} sizes="64px" className="h-auto w-full" />
              </span>
              <span className={s.navn}>
                <span>Ringebu</span>
                <span>Tannlegesenter</span>
              </span>
            </span>
          </span>
        </span>
      </motion.span>
    </span>
  );
}
