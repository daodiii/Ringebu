"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";


interface Card {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface CardStackProps {
  cards: Card[];
}

export default function CardStack({ cards: initialCards }: CardStackProps) {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Configuration
  const offset = 2;
  const scaleStep = 0.015;
  const dimStep = 0.15;
  const borderRadius = 12;
  const swipeThreshold = 50;

  const spring = {
    type: "spring" as const,
    stiffness: 300,
    damping: 35,
  };

  const moveToEnd = () => {
    setCards((prev) => [...prev.slice(1), prev[0]]);
    setCurrentIndex((prev) => (prev + 1) % initialCards.length);
  };

  const moveToStart = () => {
    setCards((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    setCurrentIndex(
      (prev) => (prev - 1 + initialCards.length) % initialCards.length
    );
  };

  const handleDragEnd = (
    _: unknown,
    info: { velocity: { y: number }; offset: { y: number } }
  ) => {
    const velocity = info.velocity.y;
    const dy = info.offset.y;

    if (Math.abs(dy) > swipeThreshold || Math.abs(velocity) > 500) {
      if (dy < 0 || velocity < 0) {
        moveToEnd();
      } else {
        moveToStart();
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center gap-6 mt-[20px]">
      {/* Card Stack + Arrows wrapper */}
      <div className="relative flex items-center gap-4 lg:gap-8">
        {/* Left Arrow */}
        <motion.button
          onClick={moveToStart}
          className="hidden lg:flex items-center justify-center px-4 h-12 rounded-xl bg-[var(--color-footer-bg)] hover:bg-[var(--color-accent-gold)] transition-colors duration-200 shrink-0"
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous card"
        >
          <span className="text-[var(--color-bg-cream)] text-xs font-sans uppercase tracking-wider font-medium">Bak</span>
        </motion.button>

        {/* Card Stack — explicit width to prevent collapse */}
        <div
          className="relative overflow-visible w-[68vw] max-w-[720px]"
          style={{ aspectRatio: "16/10" }}
        >
          <ul className="relative w-full h-full m-0 p-0">
            <AnimatePresence>
              {cards.map(({ id, src, alt, title, description }, i) => {
                const isFront = i === 0;
                const brightness = Math.max(0.3, 1 - i * dimStep);
                const baseZ = cards.length - i;

                return (
                  <motion.li
                    key={id}
                    className="absolute w-full h-full list-none overflow-hidden border-2 border-[var(--color-border)]"
                    style={{
                      borderRadius: `${borderRadius}px`,
                      cursor: isFront ? "grab" : "auto",
                      touchAction: "none",
                      boxShadow: isFront
                        ? "0 25px 50px rgba(0, 0, 0, 0.2)"
                        : "0 15px 30px rgba(0, 0, 0, 0.1)",
                    }}
                    animate={{
                      top: `${i * -offset}%`,
                      scale: 1 - i * scaleStep,
                      filter: `brightness(${brightness})`,
                      zIndex: baseZ,
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      transition: { duration: 0.2 },
                    }}
                    transition={spring}
                    drag={isFront ? "y" : false}
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={0.4}
                    onDragEnd={handleDragEnd}
                  >
                    <img
                      src={src}
                      alt={alt}
                      className="w-full h-full object-cover pointer-events-none select-none"
                      draggable={false}
                    />

                    {/* Card Info Overlay */}
                    <div
                      className="absolute bottom-0 left-0 right-0 px-6 py-5 bg-gradient-to-t from-black/70 via-black/40 to-transparent"
                    >
                      <h3
                        className="text-white font-serif font-bold text-3xl"
                        style={{ textShadow: "0 2px 4px rgba(0,0,0,0.9), 0 4px 12px rgba(0,0,0,0.7), 0 0px 20px rgba(0,0,0,0.5)" }}
                      >
                        {title}
                      </h3>
                      <p
                        className="text-white font-sans text-lg font-light mt-1"
                        style={{ textShadow: "0 2px 4px rgba(0,0,0,0.9), 0 4px 12px rgba(0,0,0,0.7), 0 0px 20px rgba(0,0,0,0.5)" }}
                      >
                        {description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>

        {/* Right Arrow */}
        <motion.button
          onClick={moveToEnd}
          className="hidden lg:flex items-center justify-center px-4 h-12 rounded-xl bg-[var(--color-footer-bg)] hover:bg-[var(--color-accent-gold)] transition-colors duration-200 shrink-0"
          whileHover={{ scale: 1.1, x: 3 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next card"
        >
          <span className="text-[var(--color-bg-cream)] text-xs font-sans uppercase tracking-wider font-medium">Neste</span>
        </motion.button>
      </div>

      {/* Info Text */}
      <div className="text-center">
        <p className="text-[var(--color-text-muted)]/60 text-xs font-sans">
          Dra opp/ned eller bruk pilene for a navigere
        </p>
      </div>
    </div>
  );
}
