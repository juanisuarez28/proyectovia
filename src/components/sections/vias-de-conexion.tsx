
"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const viasData = [
  {
    title: "Conectamos a las personas con Dios",
    description:
      "El ser humano camina sin rumbo hasta encontrarse con Dios. Por eso, en Proyecto Vía nuestra prioridad es animar a las personas a acercarse a Él.",
    image: PlaceHolderImages.find((img) => img.id === "conexion-1")!,
  },
  {
    title: "Conectamos a las personas entre sí",
    description:
      "En este peregrinaje nadie viaja solo. Creemos que Dios nos llama a formar una familia de caminantes que comparten la fe y se apoyan mutuamente.",
    image: PlaceHolderImages.find((img) => img.id === "conexion-2")!,
  },
  {
    title: "Conectamos a las personas con las necesidades",
    description:
      "Dios actúa a través de quienes están dispuestos a responder a las necesidades del camino. Queremos ser un puente entre quienes pueden ayudar y quienes necesitan ser alcanzados.",
    image: PlaceHolderImages.find((img) => img.id === "conexion-3")!,
  },
  {
    title: "Conectamos a las personas con la cultura",
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

  // Split description to apply styles
  const renderDescription = () => {
    const parts = description.split(/(Dios|Jesús|Proyecto Vía)/g);
    return parts.map((part, index) => {
      if (part === "Dios" || part === "Jesús" || part === "Proyecto Vía") {
        return <strong key={index} className="font-bold text-primary">{part}</strong>;
      }
      return part;
    });
  };

  const gradientClasses = "md:bg-gradient-to-r from-transparent via-background to-background";

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={cn(
        "relative flex justify-center my-12 z-10"
      )}
    >
        <div className={cn(
            "relative flex flex-col md:flex-row items-center gap-2 w-full max-w-4xl bg-background md:bg-transparent p-4 rounded-lg md:p-0",
            isEven ? "md:flex-row" : "md:flex-row-reverse"
        )}>
            {/* Gradient Overlay for Desktop */}
            <div className="absolute inset-0 z-10 hidden md:block bg-gradient-to-r from-transparent via-background to-background" />

            {/* Content */}
            <div className={cn(
                "relative z-20 w-full md:w-1/2 p-4 md:p-6"
              )}
            >
                <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
                <p className="text-foreground/80 text-base">{renderDescription()}</p>
            </div>
             <div className={cn(
                "relative z-20 w-full md:w-1/2 flex justify-center"
             )}>
                <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg max-w-[200px] w-full">
                    <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    data-ai-hint={image.imageHint}
                    />
                </div>
            </div>
      </div>
    </motion.div>
  );
};

interface SleeperProps {
    pathRef: React.RefObject<SVGPathElement>;
    distance: number;
    progress: MotionValue<number>;
}

const Sleeper = ({ pathRef, distance, progress }: SleeperProps) => {
    const path = pathRef.current;
    if (!path) return null;

    const sleeperProgress = distance / path.getTotalLength();
    const opacity = useTransform(progress, [sleeperProgress - 0.1, sleeperProgress], [0, 1]);
    const point = path.getPointAtLength(distance);
    
    let nextPoint;
    if (distance + 1 > path.getTotalLength()) {
        nextPoint = path.getPointAtLength(distance - 1);
    } else {
        nextPoint = path.getPointAtLength(distance + 1);
    }
    
    let angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
    if (distance + 1 > path.getTotalLength()) {
      angle += 180; // Correct angle for the last sleeper
    }


    return (
        <motion.line
            x1="-22.5"
            y1="0"
            x2="22.5"
            y2="0"
            transform={`translate(${point.x} ${point.y}) rotate(${angle + 90})`}
            stroke="hsl(var(--border))"
            strokeWidth="3"
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

      const sleeperCount = 119;
      const positions: Omit<SleeperProps, 'progress' | 'pathRef'>[] = [];

      for (let i = 0; i < sleeperCount; i++) {
        const distance = (i / (sleeperCount - 1)) * length;
        positions.push({ distance });
      }
      setSleepers(positions);
    }
  }, []);

  const pathLength = useTransform(progress, [0, 1], [0, 1]);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="-40 -10 262 1828"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-auto"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <path
            id="rail-path"
            ref={pathRef}
            d="M91.5 1 C91.5 1, -25.5 273, 46.5 551 C118.5 829, 233.5 989, 191.5 1267 C149.5 1545, 91.5 1693, 91.5 1807"
            fill="transparent"
            stroke="none"
        />
       </defs>
      
      <motion.path
        d="M76.5 1 C76.5 1, -40.5 273, 31.5 551 C103.5 829, 218.5 989, 176.5 1267 C134.5 1545, 76.5 1693, 76.5 1807"
        stroke="hsl(var(--border))"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ pathLength }}
      />
       <motion.path
        d="M106.5 1 C106.5 1, -10.5 273, 61.5 551 C133.5 829, 248.5 989, 206.5 1267 C164.5 1545, 106.5 1693, 106.5 1807"
        stroke="hsl(var(--border))"
        strokeWidth="3"
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
      <div className="container relative" ref={targetRef}>
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
