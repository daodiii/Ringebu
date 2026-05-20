import Image from "next/image";
import { DataCell } from "@/components/ui/DataCell";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function AboutPlate() {
  return (
    <section className="bg-[var(--color-paper-warm)] py-[var(--space-section)]">
      <RevealOnScroll className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <h2 className="display-section mb-5 text-[var(--color-text-primary)]">
              Et lite kontor, med tid til hver pasient.
            </h2>
            <p className="mb-7 max-w-[420px] text-[14px] leading-[1.65] text-[var(--color-text-secondary)]">
              Ringebu Tannlegesenter har holdt til midt i dalen siden 1985. Vi er et lite
              team som har valgt å bli her — fordi vi tror på å kjenne pasientene våre.
            </p>
            <dl className="grid max-w-[400px] grid-cols-2 gap-x-4 gap-y-4">
              <DataCell label="Adresse" value="Hanstadgata 2, Ringebu" />
              <DataCell
                label="Telefon"
                value={<a href="tel:61280412">61 28 04 12</a>}
              />
              <DataCell
                label="Åpningstid"
                value={
                  <>
                    <span className="block">Man – Tor · 08:00–15:30</span>
                    <span className="block">Fredag · 08:00–15:00</span>
                  </>
                }
              />
              <DataCell label="Parkering" value="Gratis ved klinikken" />
            </dl>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-tile)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_50px_rgba(26,20,16,0.10)]">
            <Image
              src="/images/ringebutannMain.jpg"
              alt="Behandlingsrom ved Ringebu Tannlegesenter"
              fill
              sizes="(max-width: 1023px) 100vw, 55vw"
              className="object-cover"
              style={{ objectPosition: "center 45%" }}
            />
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
