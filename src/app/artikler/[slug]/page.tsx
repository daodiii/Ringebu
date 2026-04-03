import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, ArrowRight, Phone } from "lucide-react";
import { articles } from "@/data/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      locale: "nb_NO",
    },
  };
}

function renderContent(paragraph: string) {
  if (paragraph.startsWith("## ")) {
    return (
      <h2 className="font-heading font-600 text-2xl md:text-3xl text-[var(--color-primary)] mt-10 mb-4">
        {paragraph.replace("## ", "")}
      </h2>
    );
  }

  if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
    return (
      <p className="text-[var(--color-primary-dark)] font-sans font-600 text-lg mt-6 mb-2">
        {paragraph.replace(/\*\*/g, "")}
      </p>
    );
  }

  if (paragraph.startsWith("- ")) {
    const items = paragraph.split("\n").filter((l) => l.startsWith("- "));
    return (
      <ul className="space-y-2 my-4 ml-1">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-[var(--color-text-secondary)] font-sans font-300 leading-relaxed"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2.5 shrink-0" />
            {item.replace("- ", "")}
          </li>
        ))}
      </ul>
    );
  }

  // Bold segments
  const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className="text-[var(--color-text-secondary)] font-sans font-300 text-[1.05rem] leading-[1.85] mb-4">
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-600 text-[var(--color-text-primary)]">
            {part.replace(/\*\*/g, "")}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) notFound();

  const related = articles
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-64 md:h-80 overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-[var(--color-primary)]/70 to-transparent" />
        </div>
        <div className="container-width relative -mt-24 z-10 pb-8">
          <Link
            href="/artikler"
            className="inline-flex items-center gap-2 text-[#FBF9F3]/80 hover:text-white text-sm font-sans mb-4 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Tilbake til artikler
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-accent)] text-white text-xs font-500 font-sans">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-[#FBF9F3]/70 text-sm font-sans">
              <Clock className="size-4" />
              {article.readTime} lesetid
            </span>
            <span className="flex items-center gap-1.5 text-[#FBF9F3]/70 text-sm font-sans">
              <Calendar className="size-4" />
              {new Date(article.date).toLocaleDateString("nb-NO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <h1 className="heading-display text-white text-3xl md:text-5xl max-w-3xl">
            {article.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="max-w-3xl mx-auto">
            {article.content.map((p, i) => (
              <div key={i}>{renderContent(p)}</div>
            ))}

            {/* CTA in article */}
            <div className="mt-12 bg-white rounded-2xl p-8 border border-[var(--color-border)]">
              <h3 className="font-heading font-600 text-xl text-[var(--color-primary)] mb-3">
                Bestill time hos Ringebu Tannlegesenter
              </h3>
              <p className="text-[var(--color-text-secondary)] font-sans font-300 mb-5">
                Har du spørsmål eller ønsker å bestille en time? Vi er her for å hjelpe deg.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/kontakt" className="btn-primary">
                  <Calendar className="size-4" />
                  Bestill time
                </Link>
                <a href="tel:61280412" className="btn-outline">
                  <Phone className="size-4" />
                  Ring oss
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <h2 className="heading-section mb-8">Andre artikler</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((a) => (
              <Link
                key={a.slug}
                href={`/artikler/${a.slug}`}
                className="group block"
              >
                <div className="card overflow-hidden h-full">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-[var(--color-accent)] font-sans font-500">
                      {a.category}
                    </span>
                    <h3 className="font-heading font-600 text-base text-[var(--color-primary)] mt-1 group-hover:text-[var(--color-accent)] transition-colors">
                      {a.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
