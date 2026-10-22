"use client";

import { useEffect, useRef } from "react";

/** Tells the floating nav when the hero (this component's parent) is on screen. */
export function NavSignal() {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) window.dispatchEvent(new CustomEvent(e.isIntersecting ? "ringebu:hero-enter" : "ringebu:hero-exit"));
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <span ref={ref} hidden aria-hidden="true" />;
}
