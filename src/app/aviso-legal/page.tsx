import React from 'react';

export default function AvisoLegal() {
  return (
    <div className="container py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-primary mb-8">AVISO LEGAL</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Titular del sitio web</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            En cumplimiento de lo dispuesto en la Ley 34/2002 de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa que el presente sitio web es titularidad de:
          </p>
          <ul className="list-none space-y-2 pl-0">
            <li><strong className="text-foreground">Asociación:</strong> Asociación Proyecto Vía</li>
            <li><strong className="text-foreground">CIF:</strong> G21680400</li>
            <li><strong className="text-foreground">Domicilio social:</strong> AVDA DAROCA, NUM 63 LOCAL 28017 MADRID - (MADRID)</li>
            <li><strong className="text-foreground">Correo electrónico de contacto:</strong> <a href="mailto:info@proyectovia.org" className="text-primary hover:underline">info@proyectovia.org</a></li>
            <li><strong className="text-foreground">Registro:</strong> Inscrita en el Registro Nacional de Asociaciones, Grupo 1, Sección 1, Número Nacional 629961</li>
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Condiciones de uso</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            El acceso y uso del presente sitio web atribuye la condición de usuario e implica la aceptación plena de las presentes condiciones de uso.
          </p>
          <p>
            El usuario se compromete a utilizar el sitio web, sus contenidos y servicios conforme a la ley, la buena fe y el orden público.
          </p>
          <p>
            Queda prohibido el uso del sitio web con fines ilícitos o que puedan causar perjuicio a la Asociación Proyecto Vía o a terceros.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Propiedad intelectual</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Todos los contenidos de este sitio web, incluyendo textos, imágenes, logotipos, diseños y materiales, son propiedad de Asociación Proyecto Vía o se utilizan con autorización de sus respectivos propietarios.
          </p>
          <p>
            Queda prohibida su reproducción, distribución o modificación sin autorización expresa.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Responsabilidad</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Asociación Proyecto Vía no se responsabiliza del uso indebido de la información contenida en este sitio web ni de posibles daños derivados del acceso o uso del mismo.
          </p>
        </div>
      </section>
    </div>
  );
}
