import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Behandlinger",
  description:
    "Behandlinger hos Ringebu Tannlegesenter. Kontroll, fyllinger, kroner, rotfylling, bleking og akutt hjelp.",
  alternates: { canonical: "/behandlinger" },
  openGraph: {
    title: "Behandlinger | Ringebu Tannlegesenter",
    description:
      "Fra vanlig kontroll til rotfylling. Her er alt vi gjør.",
  },
};

export default function BehandlingerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
