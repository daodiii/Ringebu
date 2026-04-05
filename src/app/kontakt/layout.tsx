import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt oss",
  description:
    "Kontakt Ringebu Tannlegesenter — ring 61 28 04 12, send e-post til post@ringebutann.no, eller besøk oss i Hanstadgata 2, 2630 Ringebu.",
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title: "Kontakt oss | Ringebu Tannlegesenter",
    description:
      "Ring, send e-post eller besøk oss i Ringebu sentrum. Åpent mandag–fredag.",
  },
};

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="preconnect" href="https://www.google.com" />
      <link rel="preconnect" href="https://maps.googleapis.com" />
      {children}
    </>
  );
}
