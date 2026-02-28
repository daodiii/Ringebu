"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bg?: "cream" | "warm" | "warmest" | "none";
}

const bgMap = {
  cream: "bg-[var(--color-bg-cream)]",
  warm: "bg-[var(--color-bg-warm)]",
  warmest: "bg-[var(--color-bg-warmest)]",
  none: "",
};

export default function ScrollSection({
  children,
  className,
  id,
  bg = "cream",
}: ScrollSectionProps) {
  return (
    <section
      id={id}
      className={cn("snap-section flex items-center", bgMap[bg], className)}
    >
      {children}
    </section>
  );
}

/* Animated wrapper for content within a section */
export function AnimatedContent({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: -40 },
    right: { y: 0, x: 40 },
    none: { y: 0, x: 0 },
  };

  const offset = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
