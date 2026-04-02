"use client";

import { useState, useEffect } from "react";
import { QuoteIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
    quote: string;
    author: string;
}

interface TestimonialsCarouselProps {
    items: Testimonial[];
    className?: string;
}

export default function TestimonialsCarousel({
    items,
    className,
}: TestimonialsCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, 5000); // 5 seconds per slide

        return () => clearInterval(interval);
    }, [items.length, isPaused]);

    return (
        <div
            className={cn("relative min-h-[200px] flex flex-col items-center justify-center text-center", className)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {items.map((item, index) => (
                <div
                    key={index}
                    className={cn(
                        "absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out px-4",
                        index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    )}
                >
                    <svg className="w-8 h-8 text-black/20 mb-4 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                    </svg>

                    <p className="text-xl sm:text-2xl md:text-3xl font-serif text-black leading-relaxed mb-6 max-w-3xl mx-auto italic">
                        &ldquo;{item.quote}&rdquo;
                    </p>

                    <div className="flex items-center gap-2">
                        <div className="h-px w-8 bg-black/30" />
                        <span className="font-medium text-black text-base sm:text-lg tracking-wide">
                            {item.author}
                        </span>
                        <div className="h-px w-8 bg-black/30" />
                    </div>
                </div>
            ))}

            {/* Indicators */}
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            index === currentIndex
                                ? "bg-black w-6"
                                : "bg-black/20 hover:bg-black/40"
                        )}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
