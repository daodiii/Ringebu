"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";

interface GradientBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
    containerClassName?: string;
}

export default function GradientBorderCard({
    children,
    className,
    containerClassName,
    ...props
}: GradientBorderCardProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setOpacity(1);
    };

    const handleBlur = () => {
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-background border border-border/50",
                containerClassName
            )}
            {...props}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0, 122, 255, 0.4), transparent 40%)`,
                }}
            />
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(0, 122, 255, 0.1), transparent 40%)`,
                }}
            />

            <div className={cn("relative h-full w-full bg-white/40 backdrop-blur-2xl rounded-[inherit] z-10", className)}>
                {children}
            </div>
        </div>
    );
}
