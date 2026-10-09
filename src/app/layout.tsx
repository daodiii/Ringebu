import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

// The one typeface, drawn for the Norwegian media house Schibsted: a
// variable font, so every weight from 400 to 900 is one file.
const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0E2A30",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ringebutannlegesenter.no"),
  title: {
    default: "Ringebu Tannlegesenter | Din Tannlege i Ringebu",
    template: "%s | Ringebu Tannlegesenter",
  },
  description:
    "Tannlege i Ringebu sentrum. Ring 61 28 04 12, eller be om time på nettsiden.",
  keywords: [
    "tannlege Ringebu",
    "tannlegesenter",
    "tannbehandling",
    "tannhelse",
    "Gudbrandsdalen",
    "tannpine",
    "tannkjøtt",
    "karies",
    "implantater",
    "akutt tannlege",
  ],
  // No `alternates.canonical` here on purpose. Next inherits it into every
  // child route that does not override it, so declaring "/" at the root made
  // whole sections of the site announce themselves as duplicates of the
  // homepage. Each route sets its own; the homepage sets "/" in page.tsx.
  openGraph: {
    title: "Ringebu Tannlegesenter | Din Tannlege i Ringebu",
    description:
      "Tannlege i Ringebu sentrum.",
    type: "website",
    locale: "nb_NO",
    siteName: "Ringebu Tannlegesenter",
    url: "https://ringebutannlegesenter.no",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ringebu Tannlegesenter | Din Tannlege i Ringebu",
    description:
      "Tannlege i Ringebu sentrum.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb" className={schibsted.variable}>
      <head>
        <script
          type="application/ld+json"
          // Safe: hardcoded static data, not user input
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              name: "Ringebu Tannlegesenter",
              description:
                "Tannlege i Ringebu sentrum.",
              url: "https://ringebutannlegesenter.no",
              logo: "https://ringebutannlegesenter.no/images/logo-mark.svg",
              image: "https://ringebutannlegesenter.no/opengraph-image.jpg",
              hasMap: "https://www.google.com/maps/search/?api=1&query=Jernbanegata+4,+2630+Ringebu",
              telephone: "+4761280412",
              email: "post@ringebutannlegesenter.no",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jernbanegata 4",
                addressLocality: "Ringebu",
                postalCode: "2630",
                addressCountry: "NO",
              },
              // Jernbanegata 4 in Kartverket's address register
              geo: {
                "@type": "GeoCoordinates",
                latitude: 61.5299,
                longitude: 10.1384,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Monday",
                  opens: "08:00",
                  closes: "15:30",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Tuesday",
                  opens: "08:30",
                  closes: "18:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Wednesday", "Friday"],
                  opens: "08:00",
                  closes: "15:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Thursday",
                  opens: "09:00",
                  closes: "18:00",
                },
              ],
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body className="antialiased font-sans min-h-screen">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
