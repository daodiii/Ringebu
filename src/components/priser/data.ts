/**
 * The price list on /priser, in the owner's own words and numbers
 * (2026-10-07). A price with `fra` is the lowest it can cost.
 */

export type Pris = { navn: string; kr: number; fra?: boolean };
export type Gruppe = { tittel: string; priser: readonly Pris[] };

export const PRISER: readonly Gruppe[] = [
  {
    tittel: "Undersøkelse",
    priser: [{ navn: "Undersøkelse og behandlingsplanlegging, 2 røntgenbilder og rens", kr: 1490 }],
  },
  {
    tittel: "Fylling",
    priser: [
      { navn: "Liten fylling", kr: 1390, fra: true },
      { navn: "Mellomstor fylling", kr: 1790, fra: true },
      { navn: "Stor fylling", kr: 1990, fra: true },
    ],
  },
  {
    tittel: "Rotfylling",
    priser: [
      { navn: "Fortann", kr: 4900 },
      { navn: "Liten jeksel – premolar", kr: 5900 },
      { navn: "Jeksel – molar", kr: 6900 },
    ],
  },
  {
    tittel: "Krone",
    priser: [{ navn: "Krone", kr: 8000 }],
  },
  {
    tittel: "Tanntrekking",
    priser: [
      { navn: "Enkel trekking", kr: 1690, fra: true },
      { navn: "Komplisert trekking", kr: 2080, fra: true },
    ],
  },
];

/** 1490 as «1 490», with a no-break space, the same on the server and in the browser. */
export const kroner = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export const TEKST = {
  tittel: "Priser.",
  overslag:
    "Vil du vite mer nøyaktig hva det blir? Bestill en undersøkelse. Da får du en plan og et prisoverslag før vi begynner.",
  helfo: "Vi har direkte oppgjør med HELFO.",
};
