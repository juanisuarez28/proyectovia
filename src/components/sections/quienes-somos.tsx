"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function QuienesSomos() {
  const imageData = PlaceHolderImages.find((img) => img.id === "quienes-somos");
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.25, 0.5], [0.4, 1]);
  const y = useTransform(scrollYProgress, [0.25, 0.5], [30, 0]);

  return (
    <section id="quienes-somos" className="py-20 bg-background" ref={ref}>
      <motion.div style={{ opacity, y }}>
        <div className="md:max-w-6xl mx-auto w-[85%] md:w-full">
          <div className="flex flex-col md:flex-row items-center justify-center">
            {/* Columna Izquierda (Imagen) */}
            {imageData && (
              <div className="w-full md:w-1/4 z-20 mb-8 md:mb-0 md:mr-[-4rem]">
                <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-2xl mx-auto max-w-xs">
                  <Image
                    src={imageData.imageUrl}
                    alt={imageData.description}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 80vw, 25vw"
                    data-ai-hint={imageData.imageHint}
                  />
                </div>
              </div>
            )}

            {/* Columna Derecha (Texto) */}
            <div className="w-full md:w-3/4 bg-secondary rounded-lg p-8 md:p-12 text-center shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                Quiénes somos
              </h2>

              <div className="space-y-4 text-sm md:text-base text-foreground/80 max-w-2xl mx-auto">
                <p>
                  <strong className="font-bold text-primary">Nati y Cami Hernández</strong> son los fundadores de{" "}
                  <strong className="font-bold text-primary">Proyecto Vía</strong>.
                  La filosofía del proyecto nació en Buenos Aires, Argentina, en el
                  año 2020. En ese entonces, eran un matrimonio recién casado,
                  apasionado por discipular a las nuevas generaciones y promover la
                  extensión del <strong className="font-bold text-primary">Reino de Dios</strong> más allá de las fronteras
                  locales.
                </p>
                <p>
                  En 2021, Dios los impulsó a servir en España y en la región del
                  Mediterráneo. Desde entonces, dedican su tiempo y energía a apoyar
                  a la iglesia en Europa mediante la formación de líderes, el
                  evangelismo, el discipulado y la plantación de iglesias.
                </p>
                <p>
                  Durante su misión en Europa nacieron sus dos hijos Feli y Teo, que
                  ya forman parte de los proyectos de Dios para esta familia.
                </p>
                <p>
                  Actualmente, Dios los ha desafiado a comenzar una nueva etapa de
                  plantación de iglesias en el{" "}
                  <strong className="font-bold text-primary">País Vasco</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
