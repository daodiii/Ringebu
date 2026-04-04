import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Phone,
  Calendar,
} from "lucide-react";
import { supportPages } from "@/data/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

/* ─────────── Static Generation ─────────── */

export function generateStaticParams() {
  return supportPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = supportPages.find((p) => p.slug === slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.metaDescription,
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      type: "article",
      locale: "nb_NO",
    },
  };
}

/* ─────────── Content Renderer ─────────── */

function renderContent(paragraph: string) {
  if (paragraph.startsWith("## ")) {
    return (
      <h2 className="font-heading font-600 text-2xl md:text-3xl text-[var(--color-primary)] mt-10 mb-4">
        {paragraph.replace("## ", "")}
      </h2>
    );
  }

  if (paragraph.startsWith("- ")) {
    const items = paragraph.split("\n").filter((l) => l.startsWith("- "));
    return (
      <ul className="space-y-3 my-5 ml-1">
        {items.map((item, i) => {
          const text = item.replace("- ", "");
          const parts = text.split(/(\*\*[^*]+\*\*)/g);
          return (
            <li
              key={i}
              className="flex items-start gap-3 text-[var(--color-text-secondary)] font-sans font-300 leading-relaxed"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2.5 shrink-0" />
              <span>
                {parts.map((part, j) =>
                  part.startsWith("**") && part.endsWith("**") ? (
                    <strong
                      key={j}
                      className="font-600 text-[var(--color-text-primary)]"
                    >
                      {part.replace(/\*\*/g, "")}
                    </strong>
                  ) : (
                    <span key={j}>{part}</span>
                  )
                )}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }

  // Regular paragraph with bold support
  const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className="text-[var(--color-text-secondary)] font-sans font-300 text-base md:text-lg leading-[1.85] mb-4">
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong
            key={i}
            className="font-600 text-[var(--color-text-primary)]"
          >
            {part.replace(/\*\*/g, "")}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}

/* ─────────── Page Component ─────────── */

export default async function SupportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = supportPages.find((p) => p.slug === slug);

  if (!page) notFound();

  const related = supportPages.filter((p) =>
    page.relatedSlugs.includes(p.slug)
  );

  return (
    <main className="pt-20">
      {/* ── Hero ── */}
      <section className="bg-[var(--color-primary)] py-16 md:py-24">
        <div className="container-width">
          <Link
            href="/informasjon"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-sans mb-8 transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            Tilbake til informasjon
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-accent)] text-white text-xs font-600 font-sans tracking-wide">
              {page.badge}
            </span>
            <span className="text-white/50 text-sm font-sans">
              {page.heroSubtitle}
            </span>
          </div>

          <h1 className="font-heading font-700 text-3xl md:text-4xl lg:text-5xl text-white leading-tight max-w-3xl">
            {page.title}
          </h1>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-12 md:py-16 bg-[var(--color-bg-cream)]">
        <div className="container-width">
          <div className="max-w-3xl mx-auto">
            {page.intro.map((p, i) => (
              <div key={i}>{renderContent(p)}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Content Sections ── */}
      {page.sections.map((section, i) => (
        <section
          key={section.heading}
          className={`py-12 md:py-16 ${
            i % 2 === 0
              ? "bg-[var(--color-bg)]"
              : "bg-[var(--color-bg-cream)]"
          }`}
        >
          <div className="container-width">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-0.5 rounded-full bg-[var(--color-accent)]" />
                <h2 className="font-heading font-700 text-2xl md:text-3xl text-[var(--color-primary)]">
                  {section.heading}
                </h2>
              </div>
              {section.content.map((p, j) => (
                <div key={j}>{renderContent(p)}</div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── Practical Steps ── */}
      {page.practicalSteps && (
        <section className="py-12 md:py-16 bg-[var(--color-bg-blue)]">
          <div className="container-width">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-8 md:p-10">
                <h2 className="font-heading font-700 text-xl md:text-2xl text-[var(--color-primary)] mb-6">
                  {page.practicalSteps.title}
                </h2>
                <ol className="space-y-4">
                  {page.practicalSteps.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-accent)] text-white font-sans font-700 text-sm flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-[var(--color-text-secondary)] font-sans font-400 leading-relaxed pt-1">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── External Links ── */}
      <section className="py-12 md:py-16 bg-[var(--color-bg-yellow)]">
        <div className="container-width">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-700 text-xl md:text-2xl text-[var(--color-primary)] mb-6">
              Nyttige lenker
            </h2>
            <div className="space-y-3">
              {page.externalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 bg-white rounded-xl border border-[var(--color-border)] px-6 py-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer group"
                >
                  <span className="text-[var(--color-primary)] font-sans font-500 group-hover:text-[var(--color-accent)] transition-colors">
                    {link.label}
                  </span>
                  <ArrowUpRight className="size-4 text-[var(--color-text-muted)] shrink-0 group-hover:text-[var(--color-accent)] transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Pages ── */}
      {related.length > 0 && (
        <section className="py-12 md:py-16 bg-[var(--color-bg-cream)]">
          <div className="container-width">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading font-700 text-xl md:text-2xl text-[var(--color-primary)] mb-8">
                Les også
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/informasjon/${r.slug}`}
                    className="group block"
                  >
                    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                      <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-bg-cream)] text-[var(--color-accent)] text-xs font-600 font-sans mb-3">
                        {r.badge}
                      </span>
                      <h3 className="font-heading font-600 text-base text-[var(--color-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                        {r.shortTitle}
                      </h3>
                      <p className="text-sm text-[var(--color-text-muted)] font-sans font-300 line-clamp-2">
                        {r.hubSummary}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)]" />
        <div className="absolute inset-0">
          <div className="absolute -top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
        </div>

        <div className="relative z-10 container-width py-16 md:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading font-700 text-2xl md:text-3xl text-white mb-4">
              Har du spørsmål om dine rettigheter?
            </h2>
            <p className="text-lg text-white/75 font-sans font-400 leading-relaxed mb-8">
              Vi hjelper deg gjerne med å finne ut hva du har rett på. Ta
              kontakt, så tar vi en prat.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-full bg-white text-[var(--color-primary)] px-8 py-3.5 font-sans font-600 text-sm transition-all duration-300 hover:bg-[var(--color-bg-cream)] hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
              >
                <Calendar className="size-4" />
                Bestill time
              </Link>
              <a
                href="tel:61280412"
                className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-white/30 text-white px-8 py-3.5 font-sans font-500 text-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:-translate-y-0.5 cursor-pointer"
              >
                <Phone className="size-4" />
                Ring 61 28 04 12
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
