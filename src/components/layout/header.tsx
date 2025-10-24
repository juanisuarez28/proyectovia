
"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Logo } from "@/components/layout/logo";

const navLinks = [
  { href: "#vias-de-conexion", label: "Vías de conexión" },
  { href: "#quienes-somos", label: "Quiénes somos" },
  { href: "#recursos", label: "Recursos" },
  { href: "#colabora", label: "Colabora" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Logo />
        
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-primary transition-colors hover:text-primary/80 font-bold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-primary" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <div className="mt-8">
                <Logo />
              </div>
              <nav className="grid gap-6 text-lg font-medium mt-10">
                {navLinks.map((link) => (
                   <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="text-primary transition-colors hover:text-primary/80"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
