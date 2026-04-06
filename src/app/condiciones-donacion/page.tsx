import React from 'react';

export default function CondicionesDonacion() {
  return (
    <div className="container py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-primary mb-8 underline decoration-primary/30 underline-offset-8">CONDICIONES DE DONACIÓN</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Donaciones</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
          <p>
            Las aportaciones realizadas a través de este sitio web tienen carácter de donación voluntaria destinada al sostenimiento y desarrollo de las actividades de Asociación Proyecto Vía.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Uso de los fondos</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
          <p>
            Las donaciones recibidas se destinan a apoyar las actividades ministeriales, formativas y sociales promovidas por la asociación.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Política de devoluciones</h2>
        <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
          <p>
            Las donaciones realizadas tienen carácter voluntario y no son reembolsables, salvo en caso de error en la transacción.
          </p>
          <div className="bg-muted p-6 rounded-lg border-l-4 border-primary">
            <p className="m-0">
              Para cualquier incidencia, el donante puede contactar con la asociación a través del correo electrónico: <a href="mailto:info@proyectovia.org" className="text-primary font-bold hover:underline">info@proyectovia.org</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
