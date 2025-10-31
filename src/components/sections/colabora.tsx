
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Colabora() {
  return (
    <section id="colabora" className="bg-primary text-primary-foreground py-20">
      <div className="container text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Colabora
        </h2>
        <p className="max-w-3xl mx-auto mb-8 text-base md:text-lg text-primary-foreground/80">
          Nos encantaría que formes parte de lo que Dios está haciendo a través de Proyecto Vía. 
          En esta sección encontrarás las diferentes maneras en que puedes apoyar el ministerio, 
          ya sea mediante tus oraciones, aportaciones financieras o difusión del proyecto.
        </p>
        <Button 
          asChild 
          size="lg" 
          className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold"
        >
          <Link href="https://give.iphc.org/project/mediterranean-national-missionaries" target="_blank" rel="noopener noreferrer">
            COLABORAR
          </Link>
        </Button>
      </div>
    </section>
  );
}
