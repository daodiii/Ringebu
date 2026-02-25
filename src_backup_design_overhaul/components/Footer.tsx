import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-footer text-white">
      {/* Sage + Gold accent lines */}
      <div className="h-[2px] bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0" />
      <div className="h-[2px] bg-gradient-to-r from-accent/0 via-accent to-accent/0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-white/8 rounded-xl flex items-center justify-center">
                <svg
                  viewBox="0 0 32 32"
                  className="w-6 h-6 text-primary-light"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 6c-1.5 0-3 1.2-3 3.5 0 1.8.8 3.2 1.8 4.5l7.2 14 7.2-14c1-1.3 1.8-2.7 1.8-4.5 0-2.3-1.5-3.5-3-3.5-1.2 0-2.2.6-3 1.5-.6.7-1.5 1-2 1h-2c-.5 0-1.4-.3-2-1C12.2 6.6 11.2 6 10 6z" />
                  <path
                    d="M13 14c.5 1.5 1.5 2.5 3 2.5s2.5-1 3-2.5"
                    opacity="0.5"
                  />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-xl text-white tracking-tight">
                  Ringebu
                </span>
                <span className="text-[10px] font-semibold text-primary-light uppercase tracking-[0.2em] mt-0.5">
                  Tannlegesenter
                </span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Din tannhelse er vår prioritet. Vi tilbyr moderne tannbehandling
              med fokus på kvalitet, komfort og omsorg.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-primary-light font-semibold mb-5 text-xs uppercase tracking-[0.15em]">
              Sider
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Hjem" },
                { href: "/behandlinger", label: "Behandlinger" },
                { href: "/priser", label: "Priser" },
                { href: "/kontakt", label: "Kontakt Oss" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-primary-light font-semibold mb-5 text-xs uppercase tracking-[0.15em]">
              Kontakt
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary-light mt-0.5 shrink-0" />
                <span className="text-white/50 text-sm">
                  Jernbanegata 4, 2630 Ringebu
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-light shrink-0" />
                <a
                  href="tel:+4761280412"
                  className="text-white/50 hover:text-white transition-colors duration-200 text-sm"
                >
                  61 28 04 12
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-light shrink-0" />
                <a
                  href="mailto:post@ringebutann.no"
                  className="text-white/50 hover:text-white transition-colors duration-200 text-sm"
                >
                  post@ringebutann.no
                </a>
              </li>
            </ul>
          </div>

          {/* Opening hours */}
          <div>
            <h3 className="text-primary-light font-semibold mb-5 text-xs uppercase tracking-[0.15em]">
              Åpningstider
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary-light shrink-0" />
                <div className="text-sm">
                  <p className="text-white/70">Man, Ons, Fre</p>
                  <p className="text-white/50">08:00 – 15:30</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary-light shrink-0" />
                <div className="text-sm">
                  <p className="text-white/70">Tirs, Tors</p>
                  <p className="text-white/50">08:00 / 09:00 – 17:00</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary-light/40 shrink-0" />
                <div className="text-sm">
                  <p className="text-white/70">Lørdag – Søndag</p>
                  <p className="text-white/50">Stengt</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Ringebu Tannlegesenter. Alle
            rettigheter reservert.
          </p>
          <p className="text-white/20 text-xs">
            Profesjonell tannpleie i hjertet av Gudbrandsdalen
          </p>
        </div>
      </div>
    </footer>
  );
}
