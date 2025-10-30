import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function QuienesSomos() {
  const imageData = PlaceHolderImages.find((img) => img.id === "quienes-somos");

  return (
    <section id="quienes-somos" className="py-20">
      <div className="w-[85%] md:w-auto mx-auto md:mx-0">
        <div className="flex flex-col md:flex-row justify-end items-start relative mx-auto md:max-w-6xl">
          {/* Texto + imagen en mobile */}
          <div className="relative z-10 w-full md:w-3/4 bg-secondary rounded-lg px-6 pt-12 pb-32 md:pb-24 md:px-16 md:pr-20 text-center md:text-left shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
              Quiénes somos
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed md:max-w-[95%]">
              <p>
                <strong className="font-bold text-primary">
                  Nati y Cami Hernández
                </strong>{" "}
                son los fundadores de{" "}
                <strong className="font-bold text-primary">Proyecto Vía</strong>.
                <br></br> La filosofía del proyecto nació en Buenos Aires,
                Argentina, en el año 2020. En ese entonces, eran un matrimonio
                recién casado, apasionado por discipular a las nuevas
                generaciones y promover la extensión del{" "}
                <strong className="font-bold text-primary">Reino de Dios</strong>{" "}
                más allá de las fronteras locales.
              </p>
              <p>
                En 2021, Dios los impulsó a servir en España y en la región del
                Mediterráneo. Desde entonces, dedican su tiempo y energía a apoyar
                a la iglesia en Europa mediante la formación de líderes, el
                evangelismo, el discipulado y la plantación de iglesias.
              </p>
              <p>
                Durante su misión en Europa nacieron sus dos hijos Feli y Teo, que
                ya forman parte de los proyectos de Dios para esta familia.
              </p>
              <p>
                Actualmente, Dios los ha desafiado a comenzar una nueva etapa de
                plantación de iglesias en el{" "}
                <strong className="font-bold text-primary">País Vasco</strong>.
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
            <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-1/4 h-[110%] z-20">
              <div className="relative w-full h-full">
                <Image
                  src={imageData.imageUrl}
                  alt={imageData.description}
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                  data-ai-hint={imageData.imageHint}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
