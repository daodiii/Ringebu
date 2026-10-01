"use client";

import Image from "next/image";
import { useRef } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import skilt from "./skilt.webp";
import s from "./panorama.module.css";

/**
 * The clinic's own sign, the board that hangs outside the door in
 * Jernbanegata, photographed and squared up. Here it hangs on two chains from
 * hooks just under the menu, by the top right corner, in the sky of the view.
 * Brush past it or tap it and it swings, then settles.
 *
 * Sizes are in cqw of the sign's own box, so it scales with that box.
 */

/** One chain, a column of links seen face on and edge on in turn. */
function Lenke() {
  const links = 9;
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
    const dir = dy < 0 || (dy === 0 && dx > 0) ? 1 : -1;
    animate(rotX, 0, {
      type: "spring",
      stiffness: 26,
      damping: 1.8,
      velocity: Math.max(-200, Math.min(200, rotX.getVelocity() + dir * (50 + speed * 4))),
    });
    animate(rotZ, 0, {
      type: "spring",
      stiffness: 34,
      damping: 3,
      velocity: Math.max(-14, Math.min(14, rotZ.getVelocity() - dx * 0.4)),
    });
  };

  return (
    <span aria-hidden="true" className={s.skilt}>
      <span className={`${s.feste} ${s.festeL}`} />
      <span className={`${s.feste} ${s.festeR}`} />
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
            <span className={`${s.lenke} ${s.lenkeL}`}>
              <Lenke />
            </span>
            <span className={`${s.lenke} ${s.lenkeR}`}>
              <Lenke />
            </span>
            <span className={s.tavle}>
              <Image src={skilt} alt="" sizes="(max-width: 767px) 150px, 320px" />
            </span>
          </span>
        </span>
      </motion.span>
    </span>
  );
}
