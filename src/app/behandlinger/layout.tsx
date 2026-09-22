import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Behandlinger og priser",
  description:
    "Behandlinger og priser hos Ringebu Tannlegesenter. Kontroll, fyllinger, kroner, rotfylling, bleking og akutt hjelp.",
  alternates: { canonical: "/behandlinger" },
  openGraph: {
    title: "Behandlinger og priser | Ringebu Tannlegesenter",
    description:
      "Se hva vi gjør, og hva det koster.",
  },
};

export default function BehandlingerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
