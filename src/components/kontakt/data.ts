export const MAPS_SEARCH =
  "https://www.google.com/maps/search/?api=1&query=Hanstadgata+2,+2630+Ringebu";
export const MAPS_EMBED =
  "https://www.google.com/maps?q=Hanstadgata+2,+2630+Ringebu&output=embed";

export const KONTAKT = {
  lead: "Midt i Gudbrandsdalen, rett ved E6. Vi tar imot fastboende og besøkende.",
  phone: { display: "61 28 04 12", href: "tel:61280412" },
  email: { display: "post@ringebutann.no", href: "mailto:post@ringebutann.no" },
  address: { display: "Hanstadgata 2, 2630 Ringebu", short: "Hanstadgata 2", href: MAPS_SEARCH },
  akutt: {
    inHours: { label: "I åpningstiden", display: "61 28 04 12", href: "tel:61280412" },
    after: { label: "Utenom åpningstid", display: "116 117", href: "tel:116117", note: "tannlegevakten" },
  },
};

export const DISTANCES = [
  { place: "Sør-Fron", drive: "~10 min", km: "12 km" },
  { place: "Vinstra", drive: "~15 min", km: "18 km" },
  { place: "Kvitfjell", drive: "~25 min", km: "30 km" },
  { place: "Lillehammer", drive: "~45 min", km: "55 km" },
  { place: "Sjusjøen", drive: "~50 min", km: "60 km" },
];

export function dirUrl(place: string) {
  return `https://www.google.com/maps/dir/${encodeURIComponent(place)},+Norge/Hanstadgata+2,+2630+Ringebu`;
}

export const SEO_TEXT =
  "Ringebu Tannlegesenter ligger i Hanstadgata 2, midt i Ringebu sentrum og like ved E6. Er du på ferie i Kvitfjell, på hytta i Venabygdsfjellet eller bare på gjennomreise, er vi nærmeste tannklinikk. Akutte tilfeller går alltid først.";

type HourRow = { day: string; code: string; hours: string; closed?: boolean };

export const HOURS: HourRow[] = [
  { day: "Mandag", code: "Man", hours: "08:00 – 15:30" },
  { day: "Tirsdag", code: "Tir", hours: "08:00 – 17:00" },
  { day: "Onsdag", code: "Ons", hours: "08:00 – 15:30" },
  { day: "Torsdag", code: "Tor", hours: "09:00 – 17:00" },
  { day: "Fredag", code: "Fre", hours: "08:00 – 15:30" },
  { day: "Lør – Søn", code: "Helg", hours: "Stengt", closed: true },
];
