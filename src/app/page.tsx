import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        {/* Placeholder sections for navigation */}
        <section id="vias-de-conexion" className="min-h-screen py-20 container" />
        <section id="quienes-somos" className="min-h-screen py-20 container" />
        <section id="recursos" className="min-h-screen py-20 container" />
        <section id="colabora" className="min-h-screen py-20 container" />
        <section id="contacto" className="min-h-screen py-20 container" />
      </main>
    </div>
  );
}
