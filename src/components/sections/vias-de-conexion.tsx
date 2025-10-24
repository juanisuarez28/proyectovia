"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const viasData = [
  {
    title: "Conectamos a las personas con Dios.",
    description:
      "El ser humano camina sin rumbo hasta encontrarse con Dios. Por eso, en Proyecto Vía nuestra prioridad es animar a las personas a acercarse a Él.",
    image: PlaceHolderImages.find((img) => img.id === "conexion-1")!,
  },
  {
    title: "Conectamos a las personas entre sí.",
    description:
      "En este peregrinaje nadie viaja solo. Creemos que Dios nos llama a formar una familia de caminantes que comparten la fe y se apoyan mutuamente.",
    image: PlaceHolderImages.find((img) => img.id === "conexion-2")!,
  },
  {
    title: "Conectamos a las personas con las necesidades.",
    description:
      "Dios actúa a través de quienes están dispuestos a responder a las necesidades del camino. Queremos ser un puente entre quienes pueden ayudar y quienes necesitan ser alcanzados.",
    image: PlaceHolderImages.find((img) => img.id === "conexion-3")!,
  },
  {
    title: "Conectamos a las personas con la cultura.",
    description:
      "Cada seguidor de Jesús está llamado a ser luz y bendición en su entorno. En Proyecto Vía alentamos a cada creyente a usar sus talentos para influir positivamente en la cultura que le rodea.",
    image: PlaceHolderImages.find((img) => img.id === "conexion-4")!,
  },
];

const ViaItem = ({
  title,
  description,
  image,
  index,
  progress,
  range,
}: {
  title: string;
  description: string;
  image: any;
  index: number;
  progress: any;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [50, 0]);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      style={{ opacity, y }}
      className={cn(
        "flex flex-col md:flex-row items-center gap-8 md:gap-12 my-12 z-10 relative",
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      <div className="w-full md:w-1/2">
        <h3 className="text-2xl font-bold text-primary mb-3">{title}</h3>
        <p className="text-foreground/80 text-base">{description}</p>
      </div>
      <div className="w-full md:w-1/2 relative aspect-video rounded-lg overflow-hidden shadow-lg">
        <Image
          src={image.imageUrl}
          alt={image.description}
          fill
          className="object-cover"
          data-ai-hint={image.imageHint}
        />
      </div>
    </motion.div>
  );
};

const WindingRoad = ({ progress }: { progress: any }) => {
  const pathLength = useTransform(progress, [0, 1], [0, 1]);

  return (
    <svg
      width="202"
      height="1808"
      viewBox="0 0 202 1808"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-auto"
    >
      <motion.path
        d="M101 0V1808"
        stroke="hsl(var(--secondary))"
        strokeOpacity="0.3"
        strokeWidth="100"
        pathLength="1"
        style={{ pathLength: pathLength }}
      />
      <motion.path
        d="M192 1C192 1 10 173 10 451C10 729 192 889 192 1167C192 1445 10 1593 10 1807"
        stroke="hsl(var(--border))"
        strokeWidth="4"
        strokeLinecap="round"
        pathLength="1"
        style={{ pathLength: pathLength }}
      />
       <motion.path
        d="M202 1C202 1 20 173 20 451C20 729 202 889 202 1167C202 1445 20 1593 20 1807"
        stroke="hsl(var(--border))"
        strokeWidth="4"
        strokeLinecap="round"
        pathLength="1"
        style={{ pathLength: pathLength }}
      />
    </svg>
  );
};

export function ViasDeConexion() {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="vias-de-conexion" className="relative py-20 overflow-hidden">
       <WindingRoad progress={scrollYProgress} />
      <div className="container" ref={targetRef}>
        <h2 className="text-4xl font-bold text-primary mb-12 text-center relative z-10">
          Vías de Conexión
        </h2>
        {viasData.map((via, index) => {
          const totalItems = viasData.length;
          const segment = 1 / totalItems;
          const start = index * segment;
          const end = start + segment;
          const animationStart = start + segment * 0.1;
          const animationEnd = end - segment * 0.1;

          return (
            <ViaItem
              key={via.title}
              {...via}
              index={index}
              progress={scrollYProgress}
              range={[animationStart, animationEnd]}
            />
          );
        })}
      </div>
    </section>
  );
}
