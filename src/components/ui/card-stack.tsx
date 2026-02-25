"use client";

import React, { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Card {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface CardStackProps {
  cards: Card[];
  showArrows?: boolean;
}

export default function CardStack({ cards: initialCards, showArrows = true }: CardStackProps) {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [dragDirection, setDragDirection] = useState<"up" | "down" | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const dragY = useMotionValue(0);
  const rotateX = useTransform(dragY, [-200, 0, 200], [15, 0, -15]);

  // Configuration
  const offset = 10;
  const scaleStep = 0.06;
  const dimStep = 0.15;
  const borderRadius = 12;
  const swipeThreshold = 50;

  const spring = {
    type: "spring" as const,
    stiffness: 170,
    damping: 26,
  };

  const moveToEnd = () => {
    setCards((prev) => [...prev.slice(1), prev[0]]);
    setCurrentIndex((prev) => (prev + 1) % initialCards.length);
  };

  const moveToStart = () => {
    setCards((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    setCurrentIndex((prev) => (prev - 1 + initialCards.length) % initialCards.length);
  };

  const handleDragEnd = (_: unknown, info: { velocity: { y: number }; offset: { y: number } }) => {
    const velocity = info.velocity.y;
    const dy = info.offset.y;

    if (Math.abs(dy) > swipeThreshold || Math.abs(velocity) > 500) {
      if (dy < 0 || velocity < 0) {
        setDragDirection("up");
        setTimeout(() => {
          moveToEnd();
          setDragDirection(null);
        }, 150);
      } else {
        setDragDirection("down");
        setTimeout(() => {
          moveToStart();
          setDragDirection(null);
        }, 150);
      }
    }
    dragY.set(0);
  };

  return (
    <div className="relative flex flex-col items-center gap-6">
      {/* Card Stack + Arrows wrapper */}
      <div className="relative flex items-center gap-4 lg:gap-8">
        {/* Left Arrow */}
        {showArrows && (
          <motion.button
            onClick={moveToStart}
            className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-footer-bg)] hover:bg-[var(--color-accent-gold)] transition-colors duration-200 shrink-0"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous card"
          >
            <ChevronLeft className="w-5 h-5 text-[var(--color-bg-cream)]" />
          </motion.button>
        )}

        {/* Card Stack */}
        <div className="relative w-full max-w-md aspect-video overflow-visible">
          <ul className="relative w-full h-full m-0 p-0">
            <AnimatePresence>
              {cards.map(({ id, src, alt, title, description }, i) => {
                const isFront = i === 0;
                const brightness = Math.max(0.3, 1 - i * dimStep);
                const baseZ = cards.length - i;

                return (
                  <motion.li
                    key={id}
                    className="absolute w-full h-full list-none overflow-hidden border border-[var(--color-border)] rounded-xl"
                    style={{
                      borderRadius: `${borderRadius}px`,
                      cursor: isFront ? "grab" : "auto",
                      touchAction: "none",
                      boxShadow: isFront
                        ? "0 25px 50px rgba(0, 0, 0, 0.15)"
                        : "0 15px 30px rgba(0, 0, 0, 0.08)",
                      rotateX: isFront ? rotateX : 0,
                      transformPerspective: 1000,
                    }}
                    animate={{
                      top: `${i * -offset}%`,
                      scale: 1 - i * scaleStep,
                      filter: `brightness(${brightness})`,
                      zIndex: baseZ,
                      opacity: dragDirection && isFront ? 0 : 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      transition: { duration: 0.2 },
                    }}
                    transition={spring}
                    drag={isFront ? "y" : false}
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={0.7}
                    onDrag={(_, info) => {
                      if (isFront) {
                        dragY.set(info.offset.y);
                      }
                    }}
                    onDragEnd={handleDragEnd}
                    whileDrag={
                      isFront
                        ? {
                            zIndex: cards.length + 1,
                            cursor: "grabbing",
                            scale: 1.05,
                          }
                        : {}
                    }
                    onHoverStart={() => isFront && setShowInfo(true)}
                    onHoverEnd={() => setShowInfo(false)}
                  >
                    <img
                      src={src}
                      alt={alt}
                      className="w-full h-full object-cover pointer-events-none select-none"
                      draggable={false}
                    />

                    {/* Card Info Overlay */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[var(--color-footer-bg)]/80 to-transparent"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: isFront && showInfo ? 1 : 0,
                        y: isFront && showInfo ? 0 : 20,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-[var(--color-bg-cream)] font-serif font-bold text-lg">
                        {title}
                      </h3>
                      <p className="text-[var(--color-bg-cream)]/80 font-sans text-sm font-light">
                        {description}
                      </p>
                    </motion.div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>

        {/* Right Arrow */}
        {showArrows && (
          <motion.button
            onClick={moveToEnd}
            className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-footer-bg)] hover:bg-[var(--color-accent-gold)] transition-colors duration-200 shrink-0"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next card"
          >
            <ChevronRight className="w-5 h-5 text-[var(--color-bg-cream)]" />
          </motion.button>
        )}
      </div>

      {/* Progress Dots */}
      <div className="flex gap-2">
        {initialCards.map((_, i) => (
          <motion.div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex % initialCards.length
                ? "bg-[var(--color-accent-gold)] w-8"
                : "bg-[var(--color-border)] w-1.5"
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  );
}
