
"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { LogoHero } from "../layout/logohero";

const heroImages = PlaceHolderImages.filter(img => img.id.startsWith("hero-"));

export function Hero() {
  return (
    <section className="relative w-full h-[80vh] bg-background pt-14" aria-label="Carrusel de imágenes de bienvenida">
      <div className="relative h-full w-full">
        <Carousel 
          className="w-full h-full" 
          opts={{loop: true}}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-[calc(80vh-3.5rem)]">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    data-ai-hint={image.imageHint}
                  />
                  <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute inset-0 flex items-start justify-center pt-20 z-20">
              <div className="w-80">
                  <LogoHero />
              </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
