import React from 'react';

export default function PoliticaCookies() {
  return (
    <div className="container py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-primary mb-8">POLÍTICA DE COOKIES</h1>
      
      <p className="text-muted-foreground mb-10 leading-relaxed text-lg">
        Este sitio web utiliza cookies para mejorar la experiencia de navegación.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4 font-bold">¿Qué son las cookies?</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Las cookies son pequeños archivos que se almacenan en el dispositivo del usuario al visitar una página web.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4 font-bold">Tipos de cookies utilizadas</h2>
        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <div>
            <h3 className="text-xl font-medium text-foreground mb-2">Cookies técnicas</h3>
            <p>Necesarias para el funcionamiento del sitio web.</p>
          </div>
          <div>
            <h3 className="text-xl font-medium text-foreground mb-2">Cookies de análisis</h3>
            <p>Permiten conocer cómo interactúan los usuarios con la web para mejorar los servicios ofrecidos.</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4 font-bold">Gestión de cookies</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            El usuario puede configurar su navegador para aceptar o rechazar las cookies o eliminar las ya instaladas.
          </p>
          <p>
            Cada navegador ofrece instrucciones específicas para ello.
          </p>
        </div>
      </section>
    </div>
  );
}
