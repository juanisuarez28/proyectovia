import { Instagram, Facebook } from "lucide-react";
import Link from "next/link";
import { ContactoForm } from "./contacto-form";

export function Contacto() {
  return (
    <section id="contacto" className="py-20 container">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
          Contacto
        </h2>
        <p className="text-foreground/80 text-sm md:text-base mb-8">
          Queremos estar en contacto contigo. <br />
          Déjanos tus datos en el formulario y conversemos. <br />
          También puedes seguirnos en nuestras redes sociales.
        </p>
      </div>

      <ContactoForm />

      <div className="flex justify-center gap-6 mt-12">
        <Link href="#" aria-label="Instagram">
          <Instagram className="h-6 w-6 text-primary hover:text-primary/80 transition-colors" />
        </Link>
        <Link href="#" aria-label="Facebook">
          <Facebook className="h-6 w-6 text-primary hover:text-primary/80 transition-colors" />
        </Link>
      </div>
    </section>
  );
}
