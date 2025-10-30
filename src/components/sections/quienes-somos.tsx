"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
    <motion.section 
      id="quienes-somos" 
      className="py-20 md:pb-40"
      ref={ref}
      style={{ opacity, y }}
    >
      <div className="flex flex-col md:flex-row justify-end items-start relative mx-auto md:max-w-6xl w-[85%] md:w-full">
        {/* Texto (div de color) */}
        <div className="relative z-10 w-full md:w-3/4 bg-secondary rounded-lg px-6 pt-8 pb-12 md:p-16 text-center md:text-left shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
            Quiénes somos
          </h2>

          <div className="space-y-4 text-foreground/80 text-sm md:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
            <p>
              <strong className="font-bold text-primary">Nati y Cami Hernández</strong> son los fundadores de <strong className="font-bold text-primary">Proyecto Vía</strong>.
              La filosofía del proyecto nació en Buenos Aires, Argentina, en el año 2020. En ese entonces, eran un matrimonio recién casado, apasionado por discipular a las nuevas generaciones y promover la extensión del <strong className="font-bold text-primary">Reino de Dios</strong> más allá de las fronteras locales.
            </p>
            <p>
              En 2021, Dios los impulsó a servir en España y en la región del Mediterráneo. Desde entonces, dedican su tiempo y energía a apoyar a la iglesia en Europa mediante la formación de líderes, el evangelismo, el discipulado y la plantación de iglesias.
            </p>
            <p>
              Durante su misión en Europa nacieron sus dos hijos Feli y Teo, que ya forman parte de los proyectos de Dios para esta familia.
            </p>
            <p>
              Actualmente, Dios los ha desafiado a comenzar una nueva etapa de plantación de iglesias en el <strong className="font-bold text-primary">País Vasco</strong>.
            </p>
          </div>
        </div>

        {/* Imagen superpuesta en desktop */}
        {imageData && (
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-0 z-20 w-1/3">
            <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={imageData.imageUrl}
                alt={imageData.description}
                fill
                className="object-cover"
                data-ai-hint={imageData.imageHint}
              />
            </div>
          </div>
        )}

        {/* Imagen superpuesta en mobile */}
        {imageData && (
          <div className="md:hidden w-full px-6 -mt-6 z-20">
             <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl h-72">
               <Image
                src={imageData.imageUrl}
                alt={imageData.description}
                fill
                className="object-cover"
                data-ai-hint={imageData.imageHint}
              />
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}
