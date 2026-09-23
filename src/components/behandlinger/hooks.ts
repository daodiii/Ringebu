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

/**
 * Lets a pinned, scroll-driven section come to rest on a stop, never between
 * two, and always on the one you were heading for. `stops` are scroll offsets
 * from the top of the section, in order; the first and last bound the pinned
 * stretch, and outside it this does nothing.
 *
 * CSS proximity snapping is not enough here: its stops are most of a screen
 * apart, so one slow notch of a mouse wheel lands closest to the stop it left
 * and is pulled straight back. A wheel user who scrolls a notch at a time
 * never gets past the first stop. Instead, when scrolling pauses between two
 * stops, this glides on to the next stop in the direction of travel.
 */
export function useStopSettle(ref: RefObject<HTMLElement | null>, stops: number[], enabled: boolean) {
  useEffect(() => {
    if (!enabled || stops.length < 2) return;
    let last = window.scrollY;
    let dir = 0;
    let touching = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const settle = () => {
      const el = ref.current;
      // Never move the page under a finger that is holding it still.
      if (!el || touching) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const y = window.scrollY - top;
      // Only inside the pinned stretch, and only between two stops.
      if (y <= stops[0] || y >= stops[stops.length - 1]) return;
      if (stops.some((s) => Math.abs(y - s) < 2)) return;
      const n = stops.findIndex((s) => s > y);
      const lo = stops[n - 1];
      const hi = stops[n];
      const to = dir > 0 ? hi : dir < 0 ? lo : y - lo < hi - y ? lo : hi;
      window.scrollTo({ top: top + to, behavior: "smooth" });
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (y !== last) dir = Math.sign(y - last);
      last = y;
      clearTimeout(timer);
      timer = setTimeout(settle, 160);
    };
    const onTouchStart = () => {
      touching = true;
    };
    // A release without a fling fires no more scroll events, so settle from here.
    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length) return;
      touching = false;
      clearTimeout(timer);
      timer = setTimeout(settle, 160);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      clearTimeout(timer);
    };
  }, [ref, stops, enabled]);
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
