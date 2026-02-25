"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import GradientBorderCard from "@/components/ui/GradientBorderCard";
import { cn } from "@/lib/utils";

export default function Hero() {
    return (

        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Direct Video Background for Hero only */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
                    maskComposite: "intersect",
                    WebkitMaskComposite: "source-in"
                }}
            >
                <video
                    autoPlay
                    loop={false}
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-15"
                    ref={(el) => {
                        if (el) {
                            el.playbackRate = 2.0;
                        }
                    }}
                >
                    <source src="/I_want_this_1080p_202602161502.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="container-width relative z-10 flex flex-col items-center justify-center min-h-screen pt-20 pb-12 text-center">

                {/* Badge */}
                <div className="glass px-4 py-1.5 rounded-full mb-8 animate-fade-in-up">
                    <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                        Moderne tannpleie i Gudbrandsdalen
                    </span>
                </div>

                {/* Heading */}
                <h1 className="max-w-4xl text-5xl sm:text-7xl font-bold tracking-tight mb-8 animate-fade-in-up delay-100">
                    <span className="block text-foreground">Klar for et</span>
                    <span className="aurora-text">sunnere smil?</span>
                </h1>

                {/* Subtitle */}
                <p className="max-w-2xl text-lg sm:text-xl text-gray-800 mb-10 animate-fade-in-up delay-200 leading-relaxed text-balance">
                    Hos Ringebu Tannlegesenter kombinerer vi lang erfaring med den nyeste teknologien for å gi deg skånsom og profesjonell behandling.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in-up delay-300">
                    <Link
                        href="/kontakt"
                        className="btn-primary h-12 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30"
                    >
                        Bestill Time
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    <Link
                        href="/behandlinger"
                        className="btn-secondary h-12 px-8 text-base backdrop-blur-md bg-white/50 shadow-[0_0_20px_rgba(0,122,255,0.3)] hover:shadow-[0_0_25px_rgba(0,122,255,0.45)] border border-primary/20"
                    >
                        Våre Behandlinger
                    </Link>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl animate-fade-in-up delay-400 px-4">
                    {[
                        {
                            title: "Erfarne Spesialister",
                            desc: "Vårt team består av høyt kvalifiserte tannleger og tannpleiere med lang erfaring innen alle områder av tannmedisinen.",
                        },
                        {
                            title: "Topp Moderne Klinikk",
                            desc: "Vi investerer kontinuerlig i det nyeste utstyret og teknologien for å sikre presis diagnostikk og skånsom behandling.",
                        },
                        {
                            title: "Pasientfokusert",
                            desc: "Hos oss er du mer enn bare en pasient. Vi tar oss tid til å lytte, forklare og tilpasse behandlingen til dine behov.",
                        },
                    ].map((item, i) => (
                        <GradientBorderCard key={item.title} containerClassName="shadow-[0_0_30px_-5px_rgba(0,122,255,0.3)] border-primary/20" className="p-5 flex flex-col items-center gap-3 text-center">
                            <h3 className="font-semibold text-base text-foreground">{item.title}</h3>
                            <p className="text-sm text-gray-800 leading-relaxed">{item.desc}</p>
                        </GradientBorderCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
