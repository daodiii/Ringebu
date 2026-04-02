"use client";

import Counter from "@/components/Counter";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const stats = [
  { end: 15, suffix: "+", label: "Års Erfaring" },
  { end: 2000, suffix: "+", label: "Fornøyde Pasienter" },
  { end: 15, suffix: "+", label: "Behandlingstyper" },
  { end: 100, suffix: "%", label: "Dedikasjon" },
];

export default function StatsSection() {
  return (
    <section className="py-4 relative overflow-hidden bg-white/5 backdrop-blur-sm border-b border-white/10">
      <div className="container-width">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          {stats.map((stat, i) => (
            <AnimateOnScroll key={stat.label} delay={i * 100}>
              <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                <div className="font-serif text-xl sm:text-2xl font-bold text-black">
                  <Counter end={stat.end} suffix={stat.suffix} />
                </div>
                <p className="text-black/80 text-xs font-medium uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
