import type { Metadata } from "next";
import { DELEBILDE } from "@/app/delebilde";

export const metadata: Metadata = {
  // A layout with a plain string title ends the root template for the pages
  // under it, so /dekning/<slug> lost «| Ringebu Tannlegesenter». It is
  // passed on here.
  title: { default: "Informasjon og støtteordninger", template: "%s | Ringebu Tannlegesenter" },
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
