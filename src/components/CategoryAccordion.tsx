"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface CategoryAccordionProps {
    category: string;
    subtitle: string;
    children: React.ReactNode;
}

export default function CategoryAccordion({
    category,
    subtitle,
    children,
}: CategoryAccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row md:gap-16">
            {/* Category Header */}
            <div className="md:w-[35%] md:sticky md:top-24 md:self-start">
                {/* Desktop Header (Hidden on Mobile) */}
                <div className="hidden md:block mb-8 md:mb-0">
                    <h2
                        className="font-serif font-bold text-text-dark"
                        style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
                    >
                        {category}
                    </h2>
                    <div className="w-[60px] h-[1px] bg-accent-gold mt-4 mb-3" />
                    <p className="text-sm font-light text-text-body">{subtitle}</p>
                </div>

                {/* Mobile Button Header (Hidden on Desktop) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden flex w-full items-center justify-between py-5 border-b border-accent-gold/20 text-left cursor-pointer group"
                    aria-expanded={isOpen}
                >
                    <div>
                        <h2 className="font-serif font-bold text-text-dark text-2xl group-hover:text-accent-gold transition-colors">
                            {category}
                        </h2>
                        <p className="text-sm font-light text-text-body mt-1">
                            {subtitle}
                        </p>
                    </div>
                    <motion.div
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="shrink-0 ml-4"
                    >
                        <ChevronRight className="w-6 h-6 text-accent-gold" />
                    </motion.div>
                </button>
            </div>

            {/* Accordion Content */}
            <div className="md:w-[65%]">
                {/* Desktop Content (Always visible) */}
                <div className="hidden md:block">{children}</div>

                {/* Mobile Content (Animated Accordion) */}
                <div className="md:hidden">
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
                                <div className="py-2">{children}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
