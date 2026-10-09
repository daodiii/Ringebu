import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { supportPages } from "@/data/content";
import { Sauene } from "@/components/home/Sauene";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DELEBILDE } from "@/app/delebilde";

/**
 * One support scheme, set as the rest of the site's reading pages are: on the
 * paper, in the one ink, with the shared heading size, and ending in the
 * pasture with the contact lines and the form. It used to open on a dark
 * banner with pills and close on a dark gradient, the last of an earlier
 * template.
 */

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
    alternates: { canonical: `/dekning/${slug}` },
    openGraph: {
      images: [DELEBILDE],
      title: page.title,
      description: page.metaDescription,
      type: "article",
      locale: "nb_NO",
    },
  };
}

/* ─────────── Content Renderer ─────────── */

const H2 = "text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--color-ink)] md:text-[28px]";
const P = "mb-4 text-pretty text-[18px] leading-[1.7] text-[var(--color-text-secondary)]";

/** **bold** inside a line, as the texts in content.ts write it */
function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-[var(--color-ink)]">
            {part.replace(/\*\*/g, "")}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function renderContent(paragraph: string) {
  if (paragraph.startsWith("## ")) {
    return <h2 className={`${H2} mb-4 mt-12`}>{paragraph.replace("## ", "")}</h2>;
  }

  if (paragraph.startsWith("- ")) {
    const items = paragraph.split("\n").filter((l) => l.startsWith("- "));
    return (
      <ul className="my-5 border-t border-[var(--color-rule)]">
        {items.map((item, i) => (
          <li key={i} className="border-b border-[var(--color-rule)] py-3 text-[17px] leading-[1.6] text-[var(--color-text-secondary)]">
            <Inline text={item.replace("- ", "")} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className={P}>
      <Inline text={paragraph} />
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
    <main>
      <article className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] pb-[var(--space-section)] pt-32 md:pt-40">
        <div className="max-w-[68ch]">
          <Link
            href="/dekning"
            className="group inline-flex items-center gap-2 text-[16px] font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-ink)]"
          >
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
            Støtte og rettigheter
          </Link>

          <p className="mt-10 text-[17px] text-[var(--color-stone)] md:text-[19px]">
            {page.heroSubtitle} · {page.badge}
          </p>
          <h1 className="display-section mt-3 text-balance text-[var(--color-ink)]">{page.title}</h1>

          <div className="mt-8 [&_p]:text-[19px] [&_p]:text-[var(--color-ink)] md:[&_p]:text-[20px]">
            {page.intro.map((p, i) => (
              <div key={i}>{renderContent(p)}</div>
            ))}
          </div>

          {page.sections.map((section) => (
            <section key={section.heading} className="mt-14">
              <h2 className={`${H2} mb-5`}>{section.heading}</h2>
              {section.content.map((p, j) => (
                <div key={j}>{renderContent(p)}</div>
              ))}
            </section>
          ))}

          {page.practicalSteps && (
            <section className="mt-14">
              <h2 className={`${H2} mb-5`}>{page.practicalSteps.title}</h2>
              <ol className="border-t border-[var(--color-rule)]">
                {page.practicalSteps.steps.map((step, i) => (
                  <li key={i} className="grid grid-cols-[2.2rem_1fr] border-b border-[var(--color-rule)] py-4 text-[17px] leading-[1.6] text-[var(--color-text-secondary)]">
                    <span className="font-semibold text-[var(--color-ink)]">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section className="mt-14">
            <h2 className={`${H2} mb-5`}>Nyttige lenker</h2>
            <ul className="border-t border-[var(--color-rule)]">
              {page.externalLinks.map((link) => (
                <li key={link.href} className="border-b border-[var(--color-rule)]">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-4 text-[17px] font-medium text-[var(--color-ink)]"
                  >
                    <span className="underline decoration-[rgba(14,42,48,0.25)] underline-offset-[5px] group-hover:decoration-[var(--color-ink)]">{link.label}</span>
                    <ArrowUpRight className="size-4 shrink-0 text-[var(--color-text-secondary)]" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {related.length > 0 && (
            <section className="mt-14">
              <h2 className={`${H2} mb-5`}>Les også</h2>
              <ul className="border-t border-[var(--color-rule)]">
                {related.map((r) => (
                  <li key={r.slug} className="border-b border-[var(--color-rule)]">
                    <Link href={`/dekning/${r.slug}`} className="group block py-4">
                      <span className="flex items-center gap-2 text-[18px] font-semibold text-[var(--color-ink)]">
                        {r.shortTitle}
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                      <span className="mt-1 block text-[16px] leading-[1.55] text-[var(--color-text-secondary)]">{r.hubSummary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>

      <div className="senere">
        <Sauene />
      </div>
    </main>
  );
}
