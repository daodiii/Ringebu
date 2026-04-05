import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Symptomer og veiledning",
  description:
    "Har du tannpine, blødende tannkjøtt eller andre symptomer? Finn ut hva som kan være årsaken og når du bør kontakte tannlegen.",
  alternates: { canonical: "/symptomer" },
  openGraph: {
    title: "Symptomer og veiledning | Ringebu Tannlegesenter",
    description:
      "Finn ut hva tannsmertene dine betyr og når du bør oppsøke tannlegen.",
  },
};

export default function SymptomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
