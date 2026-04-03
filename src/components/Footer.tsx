import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const treatments = [
  { label: "Generell tannbehandling", href: "/behandlinger" },
  { label: "Kosmetisk tannpleie", href: "/behandlinger" },
  { label: "Tannimplantater", href: "/behandlinger" },
  { label: "Akutt tannhjelp", href: "/behandlinger" },
  { label: "Forebyggende behandling", href: "/behandlinger" },
  { label: "Rotbehandling", href: "/behandlinger" },
];

const quickLinks = [
  { label: "Symptomer", href: "/symptomer" },
  { label: "Artikler", href: "/artikler" },
  { label: "Priser", href: "/behandlinger" },
  { label: "Kontakt oss", href: "/kontakt" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-emerald-950)] text-white">
      {/* Main Footer */}
      <div className="container-width py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <div className="font-heading font-700 text-2xl tracking-tight text-white">
                RINGEBU
              </div>
              <div className="font-sans text-[0.7rem] tracking-[0.25em] uppercase text-white/80 mt-0.5">
                Tannlegesenter
              </div>
            </Link>
            <p className="mt-4 text-white/90 text-sm leading-relaxed max-w-xs">
              Moderne tannbehandling med personlig omsorg i hjertet av Gudbrandsdalen.
              Vi tar vare på smilet ditt.
            </p>
          </div>

          {/* Treatments */}
          <div>
            <h3 className="font-sans font-600 text-sm uppercase tracking-wider text-white mb-5">
              Behandlinger
            </h3>
            <ul className="space-y-3">
              {treatments.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/85 hover:text-white text-sm transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans font-600 text-sm uppercase tracking-wider text-white mb-5">
              Nyttige lenker
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/85 hover:text-white text-sm transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sans font-600 text-sm uppercase tracking-wider text-white mb-5">
              Kontakt
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:61280412" className="flex items-center gap-3 text-white/85 hover:text-white text-sm transition-colors">
                  <Phone className="size-4 text-white/70 shrink-0" />
                  61 28 04 12
                </a>
              </li>
              <li>
                <a href="mailto:post@ringebutann.no" className="flex items-center gap-3 text-white/85 hover:text-white text-sm transition-colors">
                  <Mail className="size-4 text-white/70 shrink-0" />
                  post@ringebutann.no
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/85 text-sm">
                  <MapPin className="size-4 text-white/70 shrink-0 mt-0.5" />
                  <span>Jernbanegata 4,<br />2630 Ringebu</span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/85 text-sm">
                  <Clock className="size-4 text-white/70 shrink-0 mt-0.5" />
                  <div>
                    <div>Man-Fre: 08:00–15:30</div>
                    <div>Tirs & Tors: 08:00–17:00</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-width py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-xs">
            &copy; {new Date().getFullYear()} Ringebu Tannlegesenter. Alle rettigheter forbeholdt.
          </p>
          <div className="flex items-center gap-6 text-white/60 text-xs">
            <Link href="/kontakt" className="hover:text-white transition-colors">
              Personvern
            </Link>
            <Link href="/kontakt" className="hover:text-white transition-colors">
              Vilkår
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
