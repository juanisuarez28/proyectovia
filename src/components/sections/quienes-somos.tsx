import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function QuienesSomos() {
  const imageData = PlaceHolderImages.find((img) => img.id === "quienes-somos");

  return (
    <section id="quienes-somos" className="py-20">
      <div className="flex flex-col md:flex-row justify-end items-start relative mx-auto md:max-w-6xl">

        {/* Texto + imagen en mobile */}
        <div className="relative z-10 w-full md:w-3/4 bg-secondary rounded-lg px-6 pt-12 pb-32 md:pb-24 md:px-16 md:pr-20 text-center md:text-left shadow-lg">
          <h2 className="text-lg md:text-2xl font-bold text-primary mb-6">
            Quiénes somos
          </h2>

          <div className="space-y-3 text-foreground/80 text-sm md:text-[15px] leading-relaxed md:max-w-[95%]">
            <p>
              <strong className="font-bold text-primary">Nati y Cami Hernández</strong> son los fundadores de <strong className="font-bold text-primary">Proyecto Vía</strong>.<br></br> La
              filosofía del proyecto nació en Buenos Aires, Argentina, en el
              año 2020. En ese entonces, eran un matrimonio recién casado,
              apasionado por discipular a las nuevas generaciones y promover
              la extensión del <strong className="font-bold text-primary">Reino de Dios</strong> más allá de las fronteras
              locales.
            </p>
            <p>
              En 2021, Dios los impulsó a servir en España y en la región del
              Mediterráneo. Desde entonces, dedican su tiempo y energía a
              apoyar a la iglesia en Europa mediante la formación de líderes,
              el evangelismo, el discipulado y la plantación de iglesias.
            </p>
            <p>
              Durante su misión en Europa nacieron sus dos hijos Feli y Teo,
              que ya forman parte de los proyectos de Dios para esta familia.
            </p>
            <p>
              Actualmente, Dios los ha desafiado a comenzar una nueva etapa de
              plantación de iglesias en el <strong className="font-bold text-primary">País Vasco</strong>.
            </p>
          </div>

          {/* Imagen dentro del div en mobile */}
          {imageData && (
            <div className="mt-6 md:hidden w-full flex justify-center">
              <Image
                src={imageData.imageUrl}
                alt={imageData.description}
                width={200} // ancho fijo, ajusta a tu gusto
                height={280} // altura proporcional
                className="object-cover rounded-lg shadow-2xl"
                data-ai-hint={imageData.imageHint}
              />
            </div>
          )}
        </div>

        {/* Imagen superpuesta en desktop */}
        {imageData && (
          <div className="hidden md:block relative w-1/4 md:-ml-24 z-20 flex justify-end">
            <div className="aspect-[3/4] w-[90%] rounded-lg overflow-hidden shadow-2xl -translate-y-2">
              <Image
                src={imageData.imageUrl}
                alt={imageData.description}
                fill
                className="object-cover"
                data-ai-hint={imageData.imageHint}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
