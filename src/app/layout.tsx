import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Ringebu Tannlegesenter | Din Tannlege i Ringebu",
    template: "%s | Ringebu Tannlegesenter",
  },
  description:
    "Ringebu Tannlegesenter tilbyr moderne tannbehandling med personlig omsorg. Erfarne tannleger, siste teknologi og fokus på din komfort. Bestill time i dag.",
  keywords: [
    "tannlege Ringebu",
    "tannlegesenter",
    "tannbehandling",
    "tannhelse",
    "Gudbrandsdalen",
    "tannpine",
    "tannkjøtt",
    "tannbleking",
    "implantater",
    "akutt tannlege",
  ],
  openGraph: {
    title: "Ringebu Tannlegesenter | Din Tannlege i Ringebu",
    description:
      "Moderne tannbehandling med personlig omsorg i hjertet av Gudbrandsdalen.",
    type: "website",
    locale: "nb_NO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased font-sans min-h-screen">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
