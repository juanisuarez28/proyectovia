
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
}: {
  title: string;
  description: string;
  image: any;
  index: number;
}) => {
  const isEven = index % 2 === 0;
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.3, 0.6], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0.3, 0.6], [50, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={cn(
        "flex flex-col md:flex-row items-center gap-6 md:gap-10 my-8 z-10 relative",
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      <div className="w-full md:w-1/2">
        <h3 className="text-xl md:text-xl font-bold text-primary mb-2">{title}</h3>
        <p className="text-foreground/80 text-sm">{description}</p>
      </div>
      <div className="w-full md:w-1/2 relative aspect-video rounded-lg overflow-hidden shadow-lg">
        <Image
          src={image.imageUrl}
          alt={image.description}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          data-ai-hint={image.imageHint}
        />
      </div>
    </motion.div>
  );
};

const WindingRoad = ({ progress }: { progress: any }) => {
  const pathLength = useTransform(progress, [0, 1], [0, 1]);

  const pathRef = React.useRef<SVGPathElement>(null);

  const sleepers = React.useMemo(() => {
    if (!pathRef.current) return [];
    
    const path = pathRef.current;
    const totalLength = path.getTotalLength();
    const sleeperCount = 60;
    const sleeperWidth = 180;
    const positions = [];

    for (let i = 0; i < sleeperCount; i++) {
        const distance = (i / (sleeperCount - 1)) * totalLength;
        const point = path.getPointAtLength(distance);
        const nextPoint = path.getPointAtLength(Math.min(distance + 1, totalLength));
        const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
        positions.push({ x: point.x, y: point.y, angle: angle - 90, distance });
    }
    return positions;

  }, [pathRef.current]);

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
      
      {/* Rails */}
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

      {/* Helper path for measurements */}
      <defs>
        <path
            id="rail-path"
            ref={pathRef}
            d="M197 1C197 1 15 173 15 451C15 729 197 889 197 1167C197 1445 15 1593 15 1807"
            fill="transparent"
            stroke="none"
        />
      </defs>
      
      {/* Sleepers */}
      <g stroke="hsl(var(--border))" strokeWidth="4" strokeLinecap="round">
        {sleepers.map((sleeper, i) => {
          const sleeperProgress = useTransform(progress, [0, 1], [0, sleeper.distance]);
          const opacity = useTransform(sleeperProgress, [sleeper.distance - 1, sleeper.distance], [0, 1]);

          return (
            <motion.line
              key={i}
              x1={-90} y1={0}
              x2={90} y2={0}
              transform={`translate(${sleeper.x} ${sleeper.y}) rotate(${sleeper.angle})`}
              style={{ opacity }}
            />
          );
        })}
      </g>
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
    <section id="vias-de-conexion" className="relative py-16 md:py-20 overflow-hidden">
       <WindingRoad progress={scrollYProgress} />
      <div className="container" ref={targetRef}>
        <h2 className="text-xl md:text-2xl font-bold text-primary mb-10 text-center relative z-10">
          Vías de Conexión
        </h2>
        <div className="flex flex-col">
            {viasData.map((via, index) => (
                <ViaItem
                key={via.title}
                {...via}
                index={index}
                />
            ))}
        </div>
      </div>
    </section>
  );
}
