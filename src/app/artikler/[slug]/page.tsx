import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, Phone } from "lucide-react";
import { articles } from "@/data/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleHero from "@/components/ArticleHero";

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
      <ArticleHero
        title={article.title}
        category={article.category}
        readTime={article.readTime}
        date={article.date}
        image={article.image}
      />

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
