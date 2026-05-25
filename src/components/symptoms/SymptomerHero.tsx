import Image from "next/image";

export function SymptomerHero() {
  return (
    <section className="relative isolate min-h-[75vh] overflow-hidden border-t border-[var(--color-brass)]/40 text-[var(--color-amber)]">
      <Image
        src="/images/about-clinic.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_45%] brightness-[0.55] saturate-[0.92]"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,42,48,0.55) 0%, rgba(14,42,48,0.20) 35%, rgba(8,32,37,0.85) 100%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[75vh] w-full max-w-[var(--container-max,1280px)] flex-col justify-end px-[var(--container-px,24px)] py-32 md:py-36">
        <div className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-brass)]">
          <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--color-brass)]" />
          Hva du kan kjenne på
        </div>

        <h1
          className="mt-7 max-w-[14ch] font-sans font-extralight text-[var(--color-amber)]"
          style={{
            fontSize: "clamp(56px, 8vw, 128px)",
            letterSpacing: "-0.045em",
            lineHeight: 0.92,
            textShadow: "0 2px 24px rgba(0, 0, 0, 0.4)",
          }}
        >
          Symptomer<span className="text-[var(--color-copper)]">.</span>
        </h1>

        <p className="mt-6 max-w-[48ch] text-[18px] leading-[1.55] text-[var(--color-amber)]/95">
          Åtte ting tennene gjør når noe rører seg. Hva det er — og hva du gjør med det.
        </p>
      </div>
    </section>
  );
}
