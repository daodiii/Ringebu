"use client";

import { useEffect, useLayoutEffect, useState, type RefObject } from "react";

// useLayoutEffect warns during SSR; this runs it only in the browser.
export const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Window size, kept in sync on resize. Uses innerWidth so a scroll lock does not change it. */
export function useViewport() {
  const [vp, setVp] = useState({ w: 1440, h: 900, ready: false });
  useIsoLayoutEffect(() => {
    const sync = () => setVp({ w: window.innerWidth, h: window.innerHeight, ready: true });
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);
  return vp;
}

/**
 * An element's inner size, kept in sync as it changes. Measure a box sized in
 * `svh` with this rather than reading the window: a phone's address bar
 * changes innerHeight as it comes and goes, and every change would lay the
 * whole box out again.
 */
export function useElementSize(ref: RefObject<HTMLElement | null>, fallback = { w: 1440, h: 900 }) {
  const [size, setSize] = useState(fallback);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sync = () =>
      setSize((s) => (s.w === el.clientWidth && s.h === el.clientHeight ? s : { w: el.clientWidth, h: el.clientHeight }));
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

/**
 * Stops the page scrolling under a full-screen layer. The scrollbar's width is
 * padded back so nothing behind the layer jumps sideways when it disappears.
 *
 * Locks <body>, not <html>: globals.css gives body `overflow-x: hidden`, which
 * only reaches the viewport while html stays `visible`. Hiding html's overflow
 * turns body into its own scroll container, and every sticky stage on the
 * page snaps back to the top of its section.
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const body = document.body;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prev = { overflow: body.style.overflow, padding: body.style.paddingRight };
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prev.overflow;
      body.style.paddingRight = prev.padding;
    };
  }, [locked]);
}

/** Closes a layer on Escape and steps through it with the arrow keys. */
export function useLayerKeys(
  active: boolean,
  { onClose, onPrev, onNext }: { onClose: () => void; onPrev: () => void; onNext: () => void }
) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, onClose, onPrev, onNext]);
}
