
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
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Recurso, RecursosData } from "@/lib/recursos";
import { motion } from "framer-motion";

export function Recursos() {
  return (
    <section id="recursos" className="pt-48 md:pt-24 pb-20 container animate-fadeInUp">
      <div className="max-w-4xl mb-12 mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
          Recursos
        </h2>
        <p className="text-foreground/80 text-sm md:text-base">
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
        }}
        className="w-full max-w-4xl mx-auto"
      >
        <CarouselContent>
          {RecursosData.map((recurso: Recurso) => (
            <CarouselItem
              key={recurso.id}
              className="md:basis-1/2 lg:basis-[30%]"
            >
              <div className="p-1">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link href={recurso.url} target="_blank" rel="noopener noreferrer">
                    <Card className="h-full overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative w-full aspect-video">
                          <Image
                            src={recurso.imageUrl}
                            alt={recurso.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            data-ai-hint={recurso.imageHint}
                          />
                        </div>
                        <div className="p-6">
                          <CardTitle className="text-lg mb-2 line-clamp-2">
                            {recurso.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-3">
                            {recurso.description}
                          </CardDescription>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-1rem] top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-[-1rem] top-1/2 -translate-y-1/2" />
      </Carousel>
    </section>
  );
}
