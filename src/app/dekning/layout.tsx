import type { Metadata } from "next";
import { DELEBILDE } from "@/app/delebilde";

export const metadata: Metadata = {
  title: "Informasjon og støtteordninger",
  description:
    "Støtteordninger for tannbehandling. Gratis for barn under 18, 25 % for deg mellom 19 og 28, HELFO, frikort og NAV.",
  alternates: { canonical: "/dekning" },
  openGraph: {
    images: [DELEBILDE],
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
