import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { DonacionModal } from "@/components/sections/donacion-modal";

export default function DonacionExito() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center relative">
      <DonacionModal />
      
      <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-2xl max-w-lg border border-border relative z-0">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-20 h-20 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-primary">¡Muchas Gracias!</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Tu donación se ha procesado con éxito. Gracias a tu colaboración podemos seguir adelante con la misión de Proyecto Vía.
        </p>
        <Button asChild size="lg" className="font-bold">
          <Link href="/">VOLVER AL INICIO</Link>
        </Button>
      </div>
    </div>
  );
}
