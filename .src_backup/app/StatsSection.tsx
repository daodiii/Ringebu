"use client";

import Counter from "@/components/Counter";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const stats = [
  { end: 20, suffix: "+", label: "Års Erfaring" },
  { end: 5000, suffix: "+", label: "Fornøyde Pasienter" },
  { end: 15, suffix: "+", label: "Behandlingstyper" },
  { end: 100, suffix: "%", label: "Engasjement" },
];

export default function StatsSection() {
  return (
    <section className="relative">
      {/* Gold accent top border */}
      <div className="h-[3px] bg-gradient-to-r from-accent/0 via-accent to-accent/0" />

      <div
        className="py-20"
        style={{
          background:
            "linear-gradient(135deg, #3D6B4A 0%, #6B9E7A 50%, #3D6B4A 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimateOnScroll key={stat.label} delay={i * 100}>
                <div className="text-center glass-dark rounded-2xl py-8 px-4">
                  <Counter
                    end={stat.end}
                    suffix={stat.suffix}
                    className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-accent"
                  />
                  <p className="text-white/60 text-sm uppercase tracking-[0.15em] mt-3">
                    {stat.label}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
