import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ringebu Tannlegesenter | Profesjonell Tannpleie",
    template: "%s | Ringebu Tannlegesenter",
  },
  description:
    "Ringebu Tannlegesenter tilbyr moderne tannbehandling av høy kvalitet. Erfarne tannleger, siste teknologi, og fokus på din komfort. Bestill time i dag.",
  keywords: [
    "tannlege",
    "Ringebu",
    "tannlegesenter",
    "tannbehandling",
    "tannhelse",
    "Gudbrandsdalen",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className={`${dmSerif.variable} ${dmSans.variable}`}>
      <body className="antialiased font-sans bg-background text-foreground">
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
