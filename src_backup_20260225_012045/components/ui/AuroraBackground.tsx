"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    showRadialGradient?: boolean;
    videoSrc?: string;
    videoOpacity?: number;
    videoPlaybackRate?: number;
}

export default function AuroraBackground({
    className,
    showRadialGradient = true,
    children,
    ...props
}: AuroraBackgroundProps) {
    return (
        <div
            className={cn(
                "relative flex flex-col items-center justify-center bg-background text-foreground transition-bg",
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 overflow-hidden">
                {/* Optional Video Background */}
                {props.videoSrc && (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ opacity: props.videoOpacity ?? 0.2 }}
                        ref={(el) => {
                            if (el) {
                                el.playbackRate = props.videoPlaybackRate ?? 1.0;
                            }
                        }}
                    >
                        <source src={props.videoSrc} type="video/mp4" />
                    </video>
                )}

                <div
                    className={cn(
                        // Base aurora layer
                        "absolute -inset-[10px] opacity-40",
                        // Vertical gradient: Blue (top) -> Transparent (mid) -> Blue (bottom)
                        "dark:[background-image:linear-gradient(to_bottom,rgba(59,130,246,0.3)_0%,transparent_50%,rgba(59,130,246,0.4)_100%)]",
                        "[background-image:linear-gradient(to_bottom,var(--color-aurora-3)_0%,transparent_45%,transparent_55%,var(--color-aurora-3)_100%)]",
                        // Maintain subtle blur
                        "filter blur-[20px]",
                        "pointer-events-none"
                    )}
                ></div>
                {/* Secondary soft blobs for depth */}
                <div className="absolute top-0 left-0 w-[50vw] h-[50vh] bg-blue-400/20 rounded-full blur-[120px] mix-blend-multiply animate-float opacity-70" />
                <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-blue-400/20 rounded-full blur-[120px] mix-blend-multiply animate-float delay-1000 opacity-70" />
            </div>
            {children}
        </div>
    );
}
