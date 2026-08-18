"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Recurso } from "@/lib/recursos";
import { motion } from "framer-motion";
import { getRecursosAction } from "@/app/actions/recursos";

export function Recursos() {
  const [recursos, setRecursos] = React.useState<Recurso[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchRecursos() {
      try {
        const result = await getRecursosAction();
        const data = result.data as Recurso[];
        
        // Si no hay recursos en Firebase, usamos el local como fallback o mostramos vacío
        if (!result.success || data.length === 0) {
          const { RecursosData } = await import("@/lib/recursos");
          setRecursos(RecursosData);
        } else {
          setRecursos(data);
        }
      } catch (error) {
        console.error("Error fetching recursos:", error);
        // Fallback a local
        const { RecursosData } = await import("@/lib/recursos");
        setRecursos(RecursosData);
      } finally {
        setLoading(false);
      }
    }
    fetchRecursos();
  }, []);

  if (loading) {
    return (
      <section id="recursos" className="pt-48 md:pt-24 pb-20 container animate-fadeInUp">
        <div className="text-center py-20">Cargando recursos...</div>
      </section>
    );
  }

  return (
    <section id="recursos" className="pt-48 md:pt-24 pb-20 container animate-fadeInUp max-w-6xl">
      <div className="mb-8 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
          Recursos
        </h2>
        <p className="text-foreground/80 text-sm md:text-base max-w-4xl">
          En esta sección encontrarás materiales que te inspirarán a caminar con
          Jesús de una manera más plena. Podrás acceder a{" "}
          <strong className="font-bold text-primary">
            devocionales escritos
          </strong>
          , <strong className="font-bold text-primary">videos</strong> y otros{" "}
          <strong className="font-bold text-primary">recursos prácticos</strong>{" "}
          para tu vida espiritual y tu servicio.
        </p>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full mx-auto px-4 md:px-8"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {recursos.map((recurso: Recurso) => (
            <CarouselItem
              key={recurso.id}
              className="pl-2 md:pl-4 basis-[90%] sm:basis-[80%] md:basis-1/2 lg:basis-1/3"
            >
              <div className="py-2">
                <motion.div
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="relative"
                >
                  <Link href={recurso.url} target="_blank" rel="noopener noreferrer" className="block focus:outline-none">
                    <Card className="h-full overflow-hidden border-0 bg-transparent shadow-md hover:shadow-xl transition-shadow rounded-md relative group/card">
                      <CardContent className="p-0">
                        <div className="relative w-full aspect-video bg-muted">
                          <Image
                            src={recurso.imageUrl}
                            alt={recurso.title || "Recurso"}
                            fill
                            className="object-cover rounded-md"
                            sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                          {recurso.title && (
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12 rounded-b-md flex items-end">
                              <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2 drop-shadow-md">
                                {recurso.title}
                              </h3>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {recursos.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-0 md:left-[-1rem] top-1/2 -translate-y-1/2 hidden md:flex h-10 w-10 bg-background/80 backdrop-blur-sm border-0 shadow hover:bg-background" />
            <CarouselNext className="absolute right-0 md:right-[-1rem] top-1/2 -translate-y-1/2 hidden md:flex h-10 w-10 bg-background/80 backdrop-blur-sm border-0 shadow hover:bg-background" />
          </>
        )}
      </Carousel>
    </section>
  );
}
