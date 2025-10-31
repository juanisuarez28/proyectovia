import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { Instagram, Facebook } from "lucide-react";

const navLinks = [
  { href: "#vias-de-conexion", label: "Vías de conexión" },
  { href: "#quienes-somos", label: "Quiénes somos" },
  { href: "#recursos", label: "Recursos" },
  { href: "#colabora", label: "Colabora" },
  { href: "#contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="bg-muted py-8 text-muted-foreground">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Logo />
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5 hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-5 w-5 hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border/50 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Proyecto Vía. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
