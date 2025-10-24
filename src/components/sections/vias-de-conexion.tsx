

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
    offset: ["start end", "end center"],
  });

  const opacity = useTransform(scrollYProgress, [0.4, 0.6], [0.4, 1]);
  const y = useTransform(scrollYProgress, [0.4, 0.6], [30, 0]);

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
        <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
        <p className="text-foreground/80 text-xs">{description}</p>
      </div>
      <div className="w-full md:w-1/2 relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
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
    x: number;
    y: number;
    angle: number;
    distance: number;
    totalLength: number;
    progress: MotionValue<number>;
}

const Sleeper: React.FC<SleeperProps> = ({ x, y, angle, distance, totalLength, progress }) => {
    const sleeperProgress = distance / totalLength;
    const opacity = useTransform(progress, [sleeperProgress - 0.1, sleeperProgress], [0, 1]);

    return (
        <motion.line
            x1="-15"
            y1="0"
            x2="15"
            y2="0"
            transform={`translate(${x} ${y}) rotate(${angle})`}
            style={{ opacity }}
        />
    );
};


const WindingRoad = ({ progress }: { progress: any }) => {
  const pathRef = React.useRef<SVGPathElement>(null);

  const [sleepers, setSleepers] = React.useState<any[]>([]);
  const [totalLength, setTotalLength] = React.useState(0);

  React.useLayoutEffect(() => {
    if (pathRef.current) {
      const path = pathRef.current;
      const length = path.getTotalLength();
      setTotalLength(length);
      if (length === 0) return;

      const sleeperCount = 40; 
      const positions = [];

      for (let i = 0; i < sleeperCount; i++) {
        const distance = (i / (sleeperCount - 1)) * length;
        const point = path.getPointAtLength(distance);
        const nextPoint = path.getPointAtLength(Math.min(distance + 1, length));
        const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
        
        positions.push({ x: point.x, y: point.y, angle: angle + 90, distance });
      }
      setSleepers(positions);
    }
  }, []);

  const pathLength = useTransform(progress, [0, 1], [0, 1]);

  return (
    <svg
      width="102"
      height="1808"
      viewBox="0 0 102 1808"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-auto"
    >
      <defs>
        <path
            id="rail-path"
            ref={pathRef}
            d="M51 1 C51 1, 1 273, 1 551 C1 829, 101 989, 101 1267 C101 1545, 51 1693, 51 1807"
            fill="transparent"
            stroke="none"
        />
       </defs>
      
      <motion.path
        d="M41 1 C41 1, -9 273, -9 551 C-9 829, 91 989, 91 1267 C91 1545, 41 1693, 41 1807"
        stroke="hsl(var(--border))"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ pathLength }}
      />
       <motion.path
        d="M61 1 C61 1, 11 273, 11 551 C11 829, 111 989, 111 1267 C111 1545, 61 1693, 61 1807"
        stroke="hsl(var(--border))"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ pathLength }}
      />
      
      <g stroke="hsl(var(--border))" strokeWidth="2" strokeLinecap="round">
        {sleepers.map((sleeper, i) => (
             <Sleeper
                key={i}
                x={sleeper.x}
                y={sleeper.y}
                angle={sleeper.angle}
                distance={sleeper.distance}
                totalLength={totalLength}
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
    <section id="vias-de-conexion" className="relative py-12 md:py-16 overflow-hidden">
       <WindingRoad progress={scrollYProgress} />
      <div className="container" ref={targetRef}>
        <h2 className="text-xl md:text-xl font-bold text-primary mb-10 text-center relative z-10">
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
