import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type Tile = {
  name: string;
  body: string;
  image: string;
  alt: string;
  span: "feature" | "tall" | "wide" | "normal";
  objectPosition?: string;
};

// All photos are of the real clinic. No service-*.jpg stock imagery.
const TILES: ReadonlyArray<Tile> = [
  {
    name: "Forebyggende",
    body: "Den enkleste timen er den du tar i tide. Kontroll, rens, fluor — i ro.",
    image: "/images/clinic-instruments.jpg",
    alt: "Tannlegeinstrumenter",
    span: "feature",
  },
  {
    name: "Generell tannbehandling",
    body: "Fyllinger, kroner, broer.",
    image: "/images/hero-clinic.jpg",
    alt: "Behandlingsrom ved Ringebu Tannlegesenter",
    span: "tall",
    objectPosition: "center 45%",
  },
  {
    name: "Akutt tannhjelp",
    body: "Hurtig vurdering, samme dag.",
    image: "/images/ringebutannMain.jpg",
    alt: "Behandlingsrom",
    span: "tall",
    objectPosition: "center 45%",
  },
  {
    name: "Bleking & estetikk",
    body: "Skånsom klinisk bleking — varig resultat.",
    image: "/images/clinic-valley.jpg",
    alt: "Klinikken i Gudbrandsdalen",
    span: "wide",
    objectPosition: "center 50%",
  },
  {
    name: "Implantater",
    body: "Permanente løsninger som ser ut og føles som dine egne.",
    image: "/images/hero-clinic.jpg",
    alt: "Behandlingsrom ved klinikken",
    span: "normal",
    objectPosition: "center 55%",
  },
  {
    name: "Rotbehandling",
    body: "Skånsom, smertefri behandling.",
    image: "/images/clinic-sign.jpg",
    alt: "Skiltet utenfor klinikken",
    span: "normal",
    objectPosition: "center 40%",
  },
];

const SPAN_CLASSES: Record<Tile["span"], string> = {
  feature: "md:col-span-6 md:row-span-2",
  tall: "md:col-span-3 md:row-span-2",
  wide: "md:col-span-6 md:row-span-1",
  normal: "md:col-span-3 md:row-span-1",
};

export function TreatmentsBento() {
  return (
    <section
      id="behandlinger"
      className="bg-[var(--color-paper)] py-[var(--space-section)]"
    >
      <RevealOnScroll className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-14 md:flex-row md:items-end">
          <h2 className="display-section max-w-[640px] text-[var(--color-text-primary)]">
            Skreddersydde løsninger for{" "}
            <span className="font-light text-[var(--color-stone)]">ditt</span> smil.
          </h2>
          <p className="max-w-[300px] text-[15px] leading-[1.55] text-[var(--color-text-secondary)] md:text-right">
            Seks fagområder, ett team. HELFO direkte oppgjør på alle stønadsberettigede behandlinger.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-12 md:auto-rows-[210px] md:gap-3.5 lg:auto-rows-[230px]">
          {TILES.map((tile) => (
            <Link
              key={tile.name}
              href="/behandlinger"
              className={[
                "group relative col-span-1 overflow-hidden rounded-[var(--radius-tile)] bg-[var(--color-ink)] text-white",
                "min-h-[280px]",
                SPAN_CLASSES[tile.span],
              ].join(" ")}
            >
              <Image
                src={tile.image}
                alt={tile.alt}
                fill
                sizes={
                  tile.span === "feature" || tile.span === "wide"
                    ? "(max-width: 768px) 100vw, 60vw"
                    : "(max-width: 768px) 100vw, 30vw"
                }
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                style={{ objectPosition: tile.objectPosition ?? "center" }}
                quality={88}
              />
              {/* Persistent bottom gradient for legibility */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/85 via-[var(--color-ink)]/15 to-transparent"
              />
              {/* Hover veil */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[var(--color-ink)]/0 transition-colors duration-500 group-hover:bg-[var(--color-ink)]/15"
              />
              {/* Brass corner tick on the feature tile */}
              {tile.span === "feature" && (
                <div aria-hidden="true" className="absolute right-0 top-0">
                  <div className="absolute right-0 top-0 h-10 w-px bg-gradient-to-b from-[var(--color-amber)] to-transparent" />
                  <div className="absolute right-0 top-0 h-px w-10 bg-gradient-to-r from-transparent to-[var(--color-amber)]" />
                </div>
              )}

              <div
                className={[
                  "relative z-10 flex h-full flex-col justify-end",
                  tile.span === "feature" ? "p-7 md:p-9" : "p-6 md:p-7",
                ].join(" ")}
              >
                <h3
                  className={[
                    "font-sans font-medium leading-[1.1] tracking-[-0.022em] text-white",
                    tile.span === "feature"
                      ? "text-[28px] md:text-[34px]"
                      : tile.span === "tall" || tile.span === "wide"
                        ? "text-[22px] md:text-[26px]"
                        : "text-[20px] md:text-[22px]",
                  ].join(" ")}
                >
                  {tile.name}
                </h3>
                <p
                  className={[
                    "mt-2 max-w-[440px] text-[var(--color-text-on-dark-muted)]",
                    tile.span === "feature" ? "text-[14px] leading-[1.55]" : "text-[13px] leading-[1.5]",
                  ].join(" ")}
                >
                  {tile.body}
                </p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-amber)]/75 transition-colors group-hover:text-[var(--color-amber)]">
                  Les mer
                  <ArrowRight
                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/behandlinger"
            className="group inline-flex items-center gap-2 text-[13px] font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-stone)]"
          >
            Se alle behandlinger
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </RevealOnScroll>
    </section>
  );
}
