"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

interface ArticleHeroProps {
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
}

export default function ArticleHero({
  title,
  category,
  readTime,
  date,
  image,
}: ArticleHeroProps) {
  const [imgFailed, setImgFailed] = useState(false);

  const formattedDate = new Date(date).toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="relative overflow-hidden">
      {/* ── Background: image or gradient fallback ── */}
      <div className="relative h-72 sm:h-80 md:h-[26rem] lg:h-[30rem]">
        {!imgFailed ? (
          <>
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
              onError={() => setImgFailed(true)}
            />
            {/* Multi-layer gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-dark)] via-[var(--color-primary-dark)]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-dark)]/40 to-transparent" />
          </>
        ) : (
          <>
            {/* Gradient fallback with decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-dark)] to-[var(--color-primary-light)]" />
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[var(--color-accent)]/[0.07]" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[var(--color-accent-light)]/[0.05]" />
            {/* Subtle noise texture via gradient lines */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
            }} />
          </>
        )}
      </div>

      {/* ── Text content anchored at bottom of hero ── */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container-width pb-10 md:pb-14">
          {/* Back link */}
          <Link
            href="/artikler"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-sans mb-5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            Tilbake til artikler
          </Link>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-accent)] text-white text-xs font-500 font-sans">
              {category}
            </span>
            <span className="flex items-center gap-1.5 text-white/60 text-sm font-sans">
              <Clock className="size-3.5" />
              {readTime} lesetid
            </span>
            <span className="flex items-center gap-1.5 text-white/60 text-sm font-sans">
              <Calendar className="size-3.5" />
              {formattedDate}
            </span>
          </div>

          {/* Accent line */}
          <div className="w-10 h-[2px] bg-[var(--color-accent)] rounded-full mb-5" />

          {/* Title */}
          <h1
            className="font-heading font-700 text-white max-w-3xl leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)" }}
          >
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
