import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { Instagram, Facebook } from "lucide-react";

const navLinks = [
  { href: "/#vias-de-conexion", label: "Vías de conexión" },
  { href: "/#quienes-somos", label: "Quiénes somos" },
  { href: "/#recursos", label: "Recursos" },
  { href: "/#colabora", label: "Colabora" },
  { href: "/#contacto", label: "Contacto" },
];

const legalLinks = [
  { href: "/aviso-legal", label: "Aviso Legal" },
  { href: "/politica-privacidad", label: "Política de Privacidad" },
  { href: "/politica-cookies", label: "Política de Cookies" },
  { href: "/condiciones-donacion", label: "Condiciones de Donación" },
];

export function Footer() {
  return (
    <footer className="bg-muted py-12 text-muted-foreground border-t border-border/50">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Logo />
            <p className="text-sm text-center md:text-left max-w-xs">
              Alentando a otros a sumarse a la vía de Jesús y acompañando en el camino.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <Link href="https://www.instagram.com/proyectovia.blog/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5 hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="font-bold text-foreground text-sm uppercase tracking-wider">Navegación</h3>
            <nav className="flex flex-col items-center md:items-start gap-3 text-sm">
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
          </div>

          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="font-bold text-foreground text-sm uppercase tracking-wider">Legal</h3>
            <nav className="flex flex-col items-center md:items-start gap-3 text-sm">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Proyecto Vía. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
