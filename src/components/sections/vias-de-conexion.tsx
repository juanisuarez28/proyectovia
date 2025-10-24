
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

  const opacity = useTransform(scrollYProgress, [0.4, 0.6], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0.4, 0.6], [50, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={cn(
        "flex flex-col md:flex-row items-center gap-4 md:gap-8 my-4 z-10 relative",
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      <div className="w-full md:w-1/2">
        <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
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
    // This effect can only run in the browser
    if (typeof window === "undefined" || !pathRef.current) return [];
    
    const path = pathRef.current;
    const totalLength = path.getTotalLength();
    const sleeperCount = 50; 
    const positions = [];

    for (let i = 0; i < sleeperCount; i++) {
      const distance = (i / (sleeperCount - 1)) * totalLength;
      const point = path.getPointAtLength(distance);
      // Get a point slightly ahead to calculate the angle
      const nextPoint = path.getPointAtLength(Math.min(distance + 1, totalLength));
      const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
      
      positions.push({ x: point.x, y: point.y, angle: angle, distance });
    }
    return positions;
  }, [pathRef.current]); // Dependency on pathRef.current ensures this recalculates when the ref is set

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
      
      {/* Helper path for measurements - centered between rails */}
       <defs>
        <path
            id="rail-path"
            ref={pathRef}
            d="M101 1C101 1 101 173 101 451C101 729 101 889 101 1167C101 1445 101 1593 101 1807"
            transform="translate(0, 0) scale(1,1)"
            fill="transparent"
            stroke="none"
        />
       </defs>
      
      {/* Rails */}
      <motion.path
        d="M10 1C10 1 192 173 192 451C192 729 10 889 10 1167C10 1445 192 1593 192 1807"
        stroke="hsl(var(--border))"
        strokeWidth="4"
        strokeLinecap="round"
        pathLength="1"
        style={{ pathLength: pathLength }}
      />
       <motion.path
        d="M20 1C20 1 202 173 202 451C202 729 20 889 20 1167C20 1445 202 1593 202 1807"
        stroke="hsl(var(--border))"
        strokeWidth="4"
        strokeLinecap="round"
        pathLength="1"
        style={{ pathLength: pathLength }}
      />

      {/* Sleepers */}
      <g stroke="hsl(var(--border))" strokeWidth="4" strokeLinecap="round">
        {sleepers.map((sleeper, i) => {
          // Animate opacity based on overall path progress
          const sleeperProgress = (i + 1) / sleepers.length;
          const opacity = useTransform(progress, [sleeperProgress - 0.1, sleeperProgress], [0, 1]);

          return (
            <motion.line
              key={i}
              x1="-96" y1="0"
              x2="96" y2="0"
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
        <div className="flex flex-col gap-8">
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
