import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt oss",
  description:
    "Ring 61 28 04 12 eller send e-post til post@ringebutann.no. Du finner oss i Hanstadgata 2 i Ringebu sentrum.",
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
