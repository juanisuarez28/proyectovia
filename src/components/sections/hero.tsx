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
  return (
    <section className="relative w-full h-[80vh] bg-background" aria-label="Carrusel de imágenes de bienvenida">
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
      <Carousel
        className="w-full h-full"
        opts={{ loop: true }}
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
              <div className="relative w-full h-[80vh]">
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
          <path d="M0 48.2166C360 -21.7834 1080 118.217 1440 48.2166V120H0V48.2166Z" className="fill-background" />
        </svg>
      </div>
    </section>
  );
}
