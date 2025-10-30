import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function QuienesSomos() {
  const imageData = PlaceHolderImages.find((img) => img.id === "quienes-somos");

  return (
    <section id="quienes-somos" className="py-20 container">
      <div className="flex justify-center items-center">
        <div className="relative flex items-center w-full max-w-5xl">
          {/* Columna de la Imagen */}
          <div className="relative z-20 w-1/3 flex-shrink-0">
            <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-2xl">
              {imageData && (
                <Image
                  src={imageData.imageUrl}
                  alt={imageData.description}
                  fill
                  className="object-cover"
                  data-ai-hint={imageData.imageHint}
                />
              )}
            </div>
          </div>

          {/* Columna del Texto */}
          <div className="relative z-10 w-3/4 -ml-16">
            <div className="bg-secondary rounded-lg p-8 pl-24 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                Quiénes somos
              </h2>
              <div className="space-y-4 text-foreground/80 text-sm md:text-base">
                <p>
                  Nati y Cami Hernández son los fundadores de Proyecto Vía. La
                  filosofía del proyecto nació en Buenos Aires, Argentina, en el
                  año 2020. En ese entonces, eran un matrimonio recién casado,
                  apasionado por discipular a las nuevas generaciones y promover
                  la extensión del Reino de Dios más allá de las fronteras
                  locales.
                </p>
                <p>
                  En 2021, Dios los impulsó a servir en España y en la región
                  del Mediterráneo. Desde entonces, dedican su tiempo y energía
                  a apoyar a la iglesia en Europa mediante la formación de
                  líderes, el evangelismo, el discipulado y la plantación de
                  iglesias.
                </p>
                <p>
                  Durante su misión en Europa nacieron sus dos hijos Feli y Teo,
                  que ya forman parte de los proyectos de Dios para esta
                  familia.
                </p>
                <p>
                  Actualmente, Dios los ha desafiado a comenzar una nueva etapa
                  de plantación de iglesias en el País Vasco.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
