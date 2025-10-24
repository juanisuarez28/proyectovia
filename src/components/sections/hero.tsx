"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const heroImages = PlaceHolderImages.filter(img => img.id.startsWith("hero-"));

export function Hero() {
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000); // Change image every 5 seconds

    // Reset timer on manual interaction
    api.on("select", () => {
      clearInterval(interval);
    });

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="relative w-full h-[70vh]" aria-label="Carrusel de imágenes de bienvenida">
      <Carousel setApi={setApi} className="w-full h-full" opts={{loop: true}}>
        <CarouselContent>
          {heroImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[70vh]">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  data-ai-hint={image.imageHint}
                />
                <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:inline-flex" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden sm:inline-flex" />
      </Carousel>
    </section>
  );
}
