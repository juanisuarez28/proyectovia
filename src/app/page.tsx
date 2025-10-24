import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <section className="py-20 container text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">Viajemos juntos por esta vía.</h2>
          <div className="max-w-4xl mx-auto text-lg space-y-4 text-foreground/80">
            <p>
              Cada vida es un viaje, una vía por la que transitar.
              Jesús nos invita a caminar junto a Él y a sumarnos a su vía.
              Él afirmó que es el camino que nos conduce a un buen destino.
            </p>
            <p>
              La invitación de Jesús no es a un evento aislado, sino a un proyecto de largo recorrido: un proceso de aprendizaje, de transformación y de vida compartida con otros.
            </p>
            <p>
              En <strong className="font-bold text-primary">Proyecto Vía</strong> existimos para alentar a otros a sumarse a la vía de Jesús, y para acompañar y animar a quienes ya se han embarcado en este camino.
            </p>
          </div>
        </section>
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
