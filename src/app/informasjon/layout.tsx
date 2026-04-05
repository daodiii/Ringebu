import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Informasjon og støtteordninger",
  description:
    "Alt om støtteordninger for tannbehandling — gratis tannlege for barn, rabatt for unge voksne, HELFO-stønad, frikort, NAV-støtte og tilbud for eldre.",
  alternates: { canonical: "/informasjon" },
  openGraph: {
    title: "Informasjon og støtteordninger | Ringebu Tannlegesenter",
    description:
      "Finn ut hvilke støtteordninger du har rett på for tannbehandling.",
  },
};

export default function InformasjonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
