import Link from "next/link";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default function DonacionError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-2xl max-w-lg border border-border">
        <div className="flex justify-center mb-6">
          <XCircle className="w-20 h-20 text-destructive" />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-destructive">Algo ha fallado</h1>
        <p className="text-lg text-muted-foreground mb-8">
          No hemos podido procesar tu donación en este momento. Por favor, inténtalo de nuevo o contacta con nosotros si el problema persiste.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/#colabora">REINTENTAR</Link>
          </Button>
          <Button asChild size="lg">
            <Link href="/">VOLVER AL INICIO</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
