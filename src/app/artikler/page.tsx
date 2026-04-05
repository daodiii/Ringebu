import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { articles } from "@/data/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikler om tannhelse",
  description:
    "Les nyttige artikler om tannhelse, forebygging, symptomer og behandlinger. Få ekspertråd fra Ringebu Tannlegesenter.",
};

export default function ArtiklerPage() {
  return (
    <main className="pt-20">
      {/* Header */}
      <section className="relative bg-[var(--color-primary)] py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-accent)]" />
        <div className="absolute inset-0">
          <div className="absolute -top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-accent)]/8 blur-3xl" />
        </div>
        <div className="container-width text-center relative z-10">
          <h1 className="heading-display text-white mb-5">
            Nyttige artikler om tannhelse
          </h1>
          <p className="text-lg text-white/70 font-sans font-300 max-w-xl mx-auto">
            Lær mer om vanlige tannproblemer, forebygging og behandlinger.
            Kunnskap er det første steget mot bedre tannhelse.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding bg-[var(--color-bg-cream)]">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/artikler/${article.slug}`}
                className="group block"
              >
                <div className="card overflow-hidden h-full">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-accent)] text-white text-xs font-500 font-sans">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)] font-sans mb-3">
                      <Clock className="size-4" />
                      <span>{article.readTime} lesetid</span>
                    </div>
                    <h2 className="font-heading font-600 text-lg mb-3 text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed font-sans font-300 mb-4">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-500 text-[var(--color-accent)] group-hover:gap-2 transition-all">
                      Les artikkel
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-bg-blue)] py-16">
        <div className="container-width text-center">
          <h2 className="heading-section mb-4">Har du spørsmål?</h2>
          <p className="body-large mb-8 max-w-lg mx-auto">
            Finner du ikke svar på det du lurer på? Ta kontakt med oss, så
            hjelper vi deg gjerne.
          </p>
          <Link href="/kontakt" className="btn-primary px-8 py-4">
            Kontakt oss
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
