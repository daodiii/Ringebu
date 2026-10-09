import type { Metadata } from "next";
import { FIRMA, KONTAKT } from "@/components/kontakt/data";

export const metadata: Metadata = {
  title: "Personvern",
  description: "Hva vi gjør med opplysningene du sender oss på nettsiden.",
  alternates: { canonical: "/personvern" },
};

/**
 * Only what the law asks for: who is responsible, what the form collects
 * and why, who handles it for us, and what the visitor can ask for. The
 * site sets no cookies and counts no visits, and says so.
 */

const H2 = "text-[22px] font-semibold tracking-[-0.02em] text-[var(--color-ink)]";
const P = "mt-3 text-[18px] leading-[1.65] text-[var(--color-text-secondary)]";
const LINK = "font-medium text-[var(--color-ink)] underline decoration-[rgba(14,42,48,0.3)] underline-offset-4 hover:decoration-[var(--color-ink)]";

export default function PersonvernPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] pb-28 pt-36 md:pt-44">
      <div className="max-w-[62ch]">
        <h1 className="display-page text-[var(--color-ink)]">Personvern</h1>
        <p className="mt-6 text-[20px] leading-[1.55] text-[var(--color-ink)]">
          {FIRMA.name} (org.nr. <span>{FIRMA.orgnr}</span>) er ansvarlig for opplysningene du sender oss her på nettsiden.
        </p>

        <section className="mt-14">
          <h2 className={H2}>Skjemaet</h2>
          <p className={P}>
            Når du ber om time, får vi navnet ditt, telefonnummeret, e-postadressen og meldingen på e-post. Vi bruker dem bare til å svare deg, fordi du har bedt om det, og sletter dem når vi ikke lenger trenger dem.
          </p>
          <p className={P}>Nettsiden ligger hos Vercel, og e-posten går gjennom one.com. De behandler opplysningene bare på våre vegne.</p>
        </section>

        <section className="mt-12">
          <h2 className={H2}>Informasjonskapsler</h2>
          <p className={P}>Nettsiden bruker ikke informasjonskapsler, og den måler ikke besøk.</p>
        </section>

        <section className="mt-12">
          <h2 className={H2}>Dine rettigheter</h2>
          <p className={P}>
            Du kan be om innsyn i, retting av eller sletting av opplysningene om deg. Skriv til{" "}
            <a href={KONTAKT.email.href} className={LINK}>
              {KONTAKT.email.display}
            </a>
            . Du kan også klage til{" "}
            <a href="https://www.datatilsynet.no" className={LINK} target="_blank" rel="noopener noreferrer">
              Datatilsynet
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
