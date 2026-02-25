import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-footer-bg)] text-[var(--color-bg-cream)] py-10">
      <div className="container-width">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <Link href="/" className="font-serif text-lg font-bold tracking-tight">
            Ringebu
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm font-sans font-light opacity-60">
            <Link href="/behandlinger" className="hover:opacity-100 transition-opacity">
              Behandlinger
            </Link>
            <Link href="/priser" className="hover:opacity-100 transition-opacity">
              Priser
            </Link>
            <Link href="/kontakt" className="hover:opacity-100 transition-opacity">
              Kontakt
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs font-sans opacity-40">
            &copy; {new Date().getFullYear()} Ringebu Tannlegesenter
          </p>
        </div>
      </div>
    </footer>
  );
}
