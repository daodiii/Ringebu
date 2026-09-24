"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function RevealOnScroll({ children, delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      // Hidden at first for everyone, as in the server's HTML: the server
      // cannot know the motion setting. Reduced motion then shows the block
      // at once, without waiting to be scrolled to. Started from
      // `initial={false}` instead, it kept the server's hidden style for good.
      initial={{ opacity: 0, y: 32 }}
      animate={inView || prefersReduced ? { opacity: 1, y: 0 } : undefined}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
