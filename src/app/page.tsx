
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { ViasDeConexion } from "@/components/sections/vias-de-conexion";


export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <section id="viajemos-juntos" className="relative py-20 container text-center z-10">
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Viajemos juntos por esta vía</h2>
            <div className="max-w-4xl mx-auto text-sm md:text-base space-y-4 text-foreground/80">
              <p>
                Cada vida es un viaje, una vía por la que transitar.
                <strong className="font-bold text-primary"> Jesús</strong> nos invita a caminar junto a Él y a sumarnos a su vía.
                Él afirmó que es el camino que nos conduce a un buen destino.
              </p>
              <p>
                La invitación de <strong className="font-bold text-primary">Jesús</strong> no es a un evento aislado, sino a un proyecto de largo recorrido: un proceso de aprendizaje, de transformación y de vida compartida con otros.
              </p>
              <p>
                En <strong className="font-bold text-primary">Proyecto Vía</strong> existimos para alentar a otros a sumarse a la vía de <strong className="font-bold text-primary">Jesús</strong>, y para acompañar y animar a quienes ya se han embarcado en este camino.
              </p>
            </div>
          </div>
        </section>
        
        <ViasDeConexion />

        {/* Placeholder sections for navigation */}
        <section id="quienes-somos" className="min-h-screen py-20 container" />
        <section id="recursos" className="min-h-screen py-20 container" />
        <section id="colabora" className="min-h-screen py-20 container" />
        <section id="contacto" className="min-h-screen py-20 container" />
      </main>
    </div>
  );
}
