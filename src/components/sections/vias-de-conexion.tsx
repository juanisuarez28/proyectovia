
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
    offset: ["start end", "end center"],
  });

  const opacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const y = useTransform(scrollYProgress, [0.6, 0.8], [50, 0]);

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
      <div className="w-full md:w-1/2 relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
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

  const [sleepers, setSleepers] = React.useState<any[]>([]);

  React.useLayoutEffect(() => {
    // This effect can only run in the browser
    if (typeof window === "undefined" || !pathRef.current) return;
    
    const path = pathRef.current;
    const totalLength = path.getTotalLength();
    if (totalLength === 0) return;

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
    setSleepers(positions);
  }, [pathRef.current]);

  return (
    <svg
      width="142"
      height="1808"
      viewBox="0 0 142 1808"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-auto"
    >
      <motion.path
        d="M71 0V1808"
        stroke="hsl(var(--secondary))"
        strokeOpacity="0.1"
        strokeWidth="60"
        pathLength="1"
        style={{ pathLength: pathLength }}
      />
      
      <defs>
        <path
            id="rail-path"
            ref={pathRef}
            d="M71 1 C71 1, 1 173, 1 451 C1 729, 141 889, 141 1167 C141 1445, 71 1593, 71 1807"
            fill="transparent"
            stroke="none"
        />
       </defs>
      
      <motion.path
        d="M61 1 C61 1, -9 173, -9 451 C-9 729, 131 889, 131 1167 C131 1445, 61 1593, 61 1807"
        stroke="hsl(var(--border))"
        strokeWidth="4"
        strokeLinecap="round"
        pathLength="1"
        style={{ pathLength: pathLength }}
      />
       <motion.path
        d="M81 1 C81 1, 21 173, 21 451 C21 729, 151 889, 151 1167 C151 1445, 81 1593, 81 1807"
        stroke="hsl(var(--border))"
        strokeWidth="4"
        strokeLinecap="round"
        pathLength="1"
        style={{ pathLength: pathLength }}
      />

      <g stroke="hsl(var(--border))" strokeWidth="4" strokeLinecap="round">
        {sleepers.map((sleeper, i) => {
          const sleeperProgress = sleeper.distance / (pathRef.current?.getTotalLength() || 1);
          const opacity = useTransform(progress, [sleeperProgress - 0.2, sleeperProgress], [0, 1]);

          return (
            <motion.line
              key={i}
              x1="-20" y1="0"
              x2="20" y2="0"
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
    offset: ["start end", "end end"],
  });

  return (
    <section id="vias-de-conexion" className="relative py-12 md:py-16 overflow-hidden">
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
