"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
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

  const opacity = useTransform(scrollYProgress, [0.25, 0.5], [0.4, 1]);
  const y = useTransform(scrollYProgress, [0.25, 0.5], [30, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={cn(
        "flex flex-col md:flex-row items-center gap-2 my-4 z-10 relative",
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      <div className="w-full md:w-1/2">
        <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
        <p className="text-foreground/80 text-base">{description}</p>
      </div>
      <div className="w-full md:w-1/2 relative aspect-square rounded-lg overflow-hidden shadow-lg max-w-[200px] mx-auto">
        <Image
          src={image.imageUrl}
          alt={image.description}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          data-ai-hint={image.imageHint}
        />
      </div>
    </motion.div>
  );
};

interface SleeperProps {
    pathRef: React.RefObject<SVGPathElement>;
    distance: number;
    progress: MotionValue<number>;
    angle: number;
}

const Sleeper: React.FC<SleeperProps> = ({ pathRef, distance, progress, angle }) => {
    const path = pathRef.current;
    if (!path) return null;
    
    const sleeperProgress = distance / path.getTotalLength();
    const opacity = useTransform(progress, [sleeperProgress - 0.2, sleeperProgress], [0, 1]);
    const point = path.getPointAtLength(distance);

    return (
        <motion.line
            x1="-15"
            y1="0"
            x2="15"
            y2="0"
            transform={`translate(${point.x} ${point.y}) rotate(${angle + 90})`}
            stroke="hsl(var(--border))"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ opacity }}
        />
    );
};

const WindingRoad = ({ progress }: { progress: MotionValue<number> }) => {
  const pathRef = React.useRef<SVGPathElement>(null);
  const [sleepers, setSleepers] = React.useState<Omit<SleeperProps, 'progress' | 'pathRef'>[]>([]);

  React.useLayoutEffect(() => {
    if (pathRef.current) {
      const path = pathRef.current;
      const length = path.getTotalLength();
      if (length === 0) return;

      const sleeperCount = 240;
      const positions: Omit<SleeperProps, 'progress' | 'pathRef'>[] = [];

      for (let i = 0; i < sleeperCount; i++) {
        const distance = (i / (sleeperCount - 1)) * length;
        const point = path.getPointAtLength(distance);
        const nextPoint = path.getPointAtLength(Math.min(distance + 1, length));
        const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
        
        positions.push({ distance, angle });
      }
      setSleepers(positions);
    }
  }, []);

  const pathLength = useTransform(progress, [0, 1], [0, 1]);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="-40 -10 181 1828"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-auto"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <path
            id="rail-path"
            ref={pathRef}
            d="M51 1 C51 1, -20 273, 1 551 C20 829, 121 989, 101 1267 C81 1545, 51 1693, 51 1807"
            fill="transparent"
            stroke="none"
        />
       </defs>
      
      <motion.path
        d="M41 1 C41 1, -30 273, -9 551 C10 829, 111 989, 91 1267 C71 1545, 41 1693, 41 1807"
        stroke="hsl(var(--border))"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ pathLength }}
      />
       <motion.path
        d="M61 1 C61 1, -10 273, 11 551 C30 829, 131 989, 111 1267 C91 1545, 61 1693, 61 1807"
        stroke="hsl(var(--border))"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ pathLength }}
      />
      
      <g>
        {sleepers.map((sleeperProps, i) => (
             <Sleeper
                key={i}
                pathRef={pathRef}
                {...sleeperProps}
                progress={progress}
            />
        ))}
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
    <section id="vias-de-conexion" className="relative py-8 md:py-12 overflow-hidden">
       <WindingRoad progress={scrollYProgress} />
      <div className="container" ref={targetRef}>
        <h2 className="text-xl md:text-xl font-bold text-primary mb-8 text-center relative z-10">
          Vías de Conexión
        </h2>
        <div className="flex flex-col gap-4">
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
