"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  animation?: "fadeUp" | "fadeIn" | "fadeRight" | "scaleIn";
  delay?: number;
  className?: string;
}

const transforms: Record<string, string> = {
  fadeUp: "translate-y-6",
  fadeIn: "",
  fadeRight: "translate-x-6",
  scaleIn: "scale-95",
};

export default function AnimateOnScroll({
  children,
  animation = "fadeUp",
  delay = 0,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible
          ? "opacity-100 translate-y-0 translate-x-0 scale-100"
          : `opacity-0 ${transforms[animation]}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
