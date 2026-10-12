import type { Metadata } from "next";
import Link from "next/link";
import { FIRMA, KONTAKT } from "@/components/kontakt/data";
import { DELEBILDE } from "@/app/delebilde";

const DESCRIPTION = "Vilkårene for å bruke nettsiden til Ringebu Tannlegesenter.";

export const metadata: Metadata = {
  title: "Vilkår",
  description: DESCRIPTION,
  alternates: { canonical: "/vilkar" },
  openGraph: { images: [DELEBILDE], title: "Vilkår | Ringebu Tannlegesenter", description: DESCRIPTION },
};

/**
 * The terms for using the website, set as /personvern is. Only what holds
 * for the site itself: what its pages are and are not, what a message
 * through the form is, the prices, links out, and who owns the content.
 * The clinic's terms for treatment (cancellation, payment) belong to the
 * clinic and are not made up here.
 */

const H2 = "text-[22px] font-semibold tracking-[-0.02em] text-[var(--color-ink)]";
const P = "mt-3 text-[18px] leading-[1.65] text-[var(--color-text-secondary)]";
const LINK = "font-medium text-[var(--color-ink)] underline decoration-[rgba(14,42,48,0.3)] underline-offset-4 hover:decoration-[var(--color-ink)]";

export default function VilkarPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] pb-28 pt-36 md:pt-44">
      <div className="max-w-[62ch]">
        <h1 className="display-page text-[var(--color-ink)]">Vilkår</h1>
        <p className="mt-6 text-[20px] leading-[1.55] text-[var(--color-ink)]">
          Nettsiden eies av {FIRMA.name} (org.nr. <span>{FIRMA.orgnr}</span>). Når du bruker den, gjelder disse vilkårene.
        </p>

        <section className="mt-14">
          <h2 className={H2}>Informasjonen på nettsiden</h2>
          <p className={P}>
            Det du leser her om symptomer, behandlinger og støtteordninger er generell informasjon. Den erstatter ikke en undersøkelse hos tannlegen. Regler og satser hos HELFO, NAV og fylkeskommunen kan endre seg, så sjekk med dem før du søker.
          </p>
          <p className={P}>
            Har du vondt nå, ring oss på{" "}
            <a href={KONTAKT.phone.href} className={LINK}>
              {KONTAKT.phone.display}
            </a>
            . Utenom åpningstiden ringer du tannlegevakten på{" "}
            <a href={KONTAKT.akutt.after.href} className={LINK}>
              {KONTAKT.akutt.after.display}
            </a>
            .
          </p>
        </section>

        <section className="mt-12">
          <h2 className={H2}>Å be om time</h2>
          <p className={P}>
            En melding gjennom skjemaet er en forespørsel. Timen er avtalt først når vi har svart deg og vi er blitt enige om tidspunktet.
          </p>
        </section>

        <section className="mt-12">
          <h2 className={H2}>Priser</h2>
          <p className={P}>
            Prisene på nettsiden viser hva behandlingene vanligvis koster. Hva du betaler, avhenger av hva du trenger. Spør oss gjerne hva behandlingen vil koste før vi begynner.
          </p>
        </section>

        <section className="mt-12">
          <h2 className={H2}>Lenker til andre nettsteder</h2>
          <p className={P}>
            Vi lenker til blant andre Helsenorge, HELFO og NAV. Vi har ikke ansvar for innholdet på sidene deres.
          </p>
        </section>

        <section className="mt-12">
          <h2 className={H2}>Tekst og illustrasjoner</h2>
          <p className={P}>
            Du kan gjerne lenke til oss. Vil du bruke tekster eller illustrasjoner fra nettsiden andre steder, spør oss først.
          </p>
        </section>

        <section className="mt-12">
          <h2 className={H2}>Personvern</h2>
          <p className={P}>
            Hva vi gjør med opplysningene du sender oss, står på siden om{" "}
            <Link href="/personvern" className={LINK}>
              personvern
            </Link>
            . Spørsmål om vilkårene kan du sende til{" "}
            <a href={KONTAKT.email.href} className={LINK}>
              {KONTAKT.email.display}
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
