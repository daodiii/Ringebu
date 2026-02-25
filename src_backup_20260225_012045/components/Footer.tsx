import Link from "next/link";
import { cn } from "@/lib/utils";

const footerLinks = {
  Sider: [
    { href: "/", label: "Hjem" },
    { href: "/behandlinger", label: "Behandlinger" },
    { href: "/priser", label: "Priser" },
    { href: "/kontakt", label: "Kontakt Oss" },
  ],
  Kontakt: [
    { href: "https://maps.google.com/?q=Jernbanegata+4,2630+Ringebu", label: "Jernbanegata 4, 2630 Ringebu" },
    { href: "tel:+4761280412", label: "61 28 04 12" },
    { href: "mailto:post@ringebutann.no", label: "post@ringebutann.no" },
  ],
  Åpningstider: [
    { label: "Man, Ons, Fre: 08:00 – 15:30" },
    { label: "Tirs, Tors: 08:00 – 17:00" },
    { label: "Lør – Søn: Stengt" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8 text-sm">
      <div className="container-width">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="font-serif font-bold text-lg">Ringebu Tannlegesenter</span>
            </Link>
            <p className="text-muted max-w-xs leading-relaxed">
              Din tannhelse er vår prioritet. Moderne behandling med fokus på kvalitet og omsorg.
            </p>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={typeof link === 'string' ? link : link.label}>
                    {'href' in link ? (
                      <Link
                        href={link.href}
                        className="text-muted hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span className="text-muted block">{link.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border text-muted text-xs">
          <p>&copy; {new Date().getFullYear()} Ringebu Tannlegesenter. Alle rettigheter reservert.</p>
          <div className="flex gap-6">
            <Link href="/personvern" className="hover:text-foreground transition-colors">Personvern</Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">Informasjonskapsler</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
