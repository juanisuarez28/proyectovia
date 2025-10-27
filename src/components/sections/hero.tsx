"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { LogoHero } from "../layout/logohero";

const heroImages = PlaceHolderImages.filter(img => img.id.startsWith("hero-"));

export function Hero() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  return (
    <section className="relative w-full h-[80vh] bg-background -mt-14" aria-label="Carrusel de imágenes de bienvenida">
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
      <Carousel
        className="w-full h-full"
        opts={{ loop: true }}
        plugins={[plugin.current]}
      >
        <CarouselContent className="h-full">
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative w-full h-full">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  data-ai-hint={image.imageHint}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute inset-0 flex items-start justify-center pt-20 z-20">
        <div className="w-80">
          <LogoHero />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full z-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 60C360 -20 1080 140 1440 60V120H0V60Z" className="fill-background" />
        </svg>
      </div>
    </section>
  );
}
