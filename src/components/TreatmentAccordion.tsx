"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
} from "lucide-react";

interface Treatment {
  title: string;
  description: string;
  features: string[];
  category: string;
}

interface TreatmentAccordionProps {
  treatment: Treatment;
}

export default function TreatmentAccordion({ treatment }: TreatmentAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border">
      {/* Collapsed row — clickable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 py-5 px-4 text-left cursor-pointer
                   transition-colors duration-200
                   border-l-3 border-l-transparent hover:border-l-accent-gold
                   hover:bg-bg-warm/50 group"
        aria-expanded={isOpen}
      >
        <span className="font-serif text-lg font-semibold text-text-dark flex-1">
          {treatment.title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="shrink-0"
        >
          <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-accent-gold transition-colors" />
        </motion.span>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-4 border-l-3 border-l-accent-gold bg-bg-warm py-6 px-4 ml-0">
              <p className="font-sans text-base font-light leading-relaxed text-text-dark/80 mb-5">
                {treatment.description}
              </p>
              <ul className="space-y-2.5">
                {treatment.features.map((feature, i) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                    className="flex items-center gap-2.5 text-sm font-normal text-text-dark"
                  >
                    <span className="w-1.5 h-1.5 bg-accent-gold rounded-full shrink-0" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
