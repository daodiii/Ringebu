import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Behandlinger og priser",
  description:
    "Se alle tannbehandlinger vi tilbyr ved Ringebu Tannlegesenter — generell tannbehandling, kosmetisk tannpleie, implantater, akutt hjelp og forebyggende behandling med priser.",
  alternates: { canonical: "/behandlinger" },
  openGraph: {
    title: "Behandlinger og priser | Ringebu Tannlegesenter",
    description:
      "Se alle tannbehandlinger vi tilbyr — fra generell tannbehandling til kosmetisk tannpleie og implantater.",
  },
};

export default function BehandlingerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
