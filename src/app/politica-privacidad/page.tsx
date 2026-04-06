import React from 'react';

export default function PoliticaPrivacidad() {
  return (
    <div className="container py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-primary mb-8">POLÍTICA DE PRIVACIDAD</h1>
      
      <p className="text-muted-foreground mb-8">
        En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y de la Ley Orgánica 3/2018 de Protección de Datos Personales, informamos de lo siguiente:
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Responsable del tratamiento</h2>
        <div className="space-y-2 text-muted-foreground">
          <p><strong className="text-foreground">Entidad:</strong> Asociación Proyecto Vía</p>
          <p><strong className="text-foreground">CIF:</strong> G21680400</p>
          <p><strong className="text-foreground">Dirección:</strong> AVDA DAROCA, NUM 63 LOCAL 28017 MADRID - (MADRID)</p>
          <p><strong className="text-foreground">Correo electrónico:</strong> <a href="mailto:info@proyectovia.org" className="text-primary hover:underline">info@proyectovia.org</a></p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Datos que recogemos</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>A través de este sitio web se pueden recoger los siguientes datos personales:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Nombre y apellidos</li>
            <li>Dirección de correo electrónico</li>
            <li>Datos necesarios para procesar donaciones</li>
            <li>Cualquier información que el usuario proporcione voluntariamente en formularios de contacto.</li>
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Finalidad del tratamiento</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>Los datos personales serán utilizados para:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Gestionar donaciones realizadas a la asociación</li>
            <li>Atender solicitudes de información</li>
            <li>Mantener comunicación con los colaboradores y donantes</li>
            <li>Cumplir con obligaciones legales.</li>
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Base legal</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>El tratamiento de los datos se basa en:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>El consentimiento del usuario</li>
            <li>La relación establecida con los donantes o colaboradores</li>
            <li>El cumplimiento de obligaciones legales.</li>
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Conservación de datos</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Los datos se conservarán durante el tiempo necesario para cumplir con las finalidades para las que fueron recogidos y para atender posibles responsabilidades legales.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Derechos del usuario</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>El usuario puede ejercer sus derechos de:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Acceso</li>
            <li>Rectificación</li>
            <li>Supresión</li>
            <li>Limitación del tratamiento</li>
            <li>Oposición</li>
            <li>Portabilidad</li>
          </ul>
          <p>enviando una solicitud al correo electrónico: <a href="mailto:info@proyectovia.org" className="text-primary hover:underline">info@proyectovia.org</a></p>
        </div>
      </section>
    </div>
  );
}
