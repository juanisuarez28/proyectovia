"use client";

import { useState, useRef, useEffect } from "react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, CreditCard, Landmark } from "lucide-react";
import { getRedsysParameters } from "@/app/actions/redsys";
import { useToast } from "@/hooks/use-toast";

export function Colabora() {
  const [amount, setAmount] = useState<string>("10");
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [redsysData, setRedsysData] = useState<{ signature: string; paramsBase64: string; url: string } | null>(null);
  const { toast } = useToast();

  const handleDonate = async () => {
    const numAmount = parseFloat(amount.replace(',', '.'));
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Importe no válido",
        description: "Por favor, introduce una cantidad válida para colaborar.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const data = await getRedsysParameters(numAmount);
      setRedsysData(data);
      // El envío se disparará en el useEffect cuando redsysData cambie
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message || "No se ha podido iniciar el proceso de pago. Inténtalo de nuevo.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  // Efecto para enviar el formulario automáticamente una vez que tenemos los datos de firma
  useEffect(() => {
    if (redsysData && formRef.current) {
      formRef.current.submit();
    }
  }, [redsysData]);

  return (
    <section
      id="colabora"
      className="py-16 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent via-primary to-secondary text-primary-foreground"
    >
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Colabora
        </h2>
        <p className="max-w-3xl mx-auto mb-10 text-base md:text-lg text-primary-foreground/90">
          Nos encantaría que formes parte de lo que Dios está haciendo a través de <strong>Proyecto Vía</strong>.
          En esta sección encontrarás las diferentes maneras en que puedes <strong>apoyar el ministerio</strong>,
          ya sea mediante tus <strong>oraciones</strong>, <strong>aportaciones financieras</strong> o <strong>difusión del proyecto</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch max-w-4xl mx-auto bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-2xl">

          {/* Opción 1: Redsys / Tarjeta */}
          <div className="flex flex-col items-center gap-6">
            <div className="bg-primary-foreground/10 p-3 rounded-full mb-2">
              <CreditCard className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold">Tarjeta Bancaria</h3>
            <p className="text-sm text-primary-foreground/70 mb-4 h-12 flex items-center">
              Colaboración segura a través de la pasarela Redsys.
            </p>

            <div className="flex flex-col gap-3 w-full mt-auto">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">€</span>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10 bg-primary-foreground text-primary font-bold text-lg h-12 text-center rounded-xl border-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50"
                  placeholder="0.00"
                  min="1"
                  step="0.01"
                />
              </div>
              <Button
                size="lg"
                onClick={handleDonate}
                disabled={isLoading}
                className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold h-12 rounded-xl text-base shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "COLABORAR"}
              </Button>
            </div>
          </div>

          {/* Opción 2: Transferencia */}
          <div className="flex flex-col items-center gap-6 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-8">
            <div className="bg-primary-foreground/10 p-3 rounded-full mb-2">
              <Landmark className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold">Transferencia</h3>
            <div className="text-center space-y-4 my-auto">
              <div>
                <p className="text-sm font-medium opacity-80 mb-1">IBAN:</p>
                <p className="text-base md:text-lg font-bold select-all bg-white/10 px-4 py-2 rounded-lg tracking-wider break-all">
                  ES27 0049 0125 1624 1039 2127
                </p>
              </div>
              <div>
                <p className="text-sm font-medium opacity-80 mb-1">Beneficiario:</p>
                <p className="text-base font-bold">Proyecto VIA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Separador y Link IPHC */}
        <div className="mt-16 pt-8 border-t border-white/10 max-w-2xl mx-auto">
          <p className="mb-6 text-sm md:text-base text-primary-foreground/80 italic">
            Si prefieres hacer tu donación a través del portal de donaciones de la IPHC pulsa el siguiente botón:
          </p>
          <Button
            asChild
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold px-12 h-12 rounded-xl text-base shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Link href="https://give.iphc.org/project/mediterranean-national-missionaries" target="_blank" rel="noopener noreferrer">
              IR AL PORTAL IPHC
            </Link>
          </Button>
        </div>

        {/* Formulario oculto para Redsys */}
        {redsysData && (
          <form ref={formRef} action={redsysData.url} method="POST" className="hidden">
            <input type="hidden" name="Ds_SignatureVersion" value="HMAC_SHA256_V1" />
            <input type="hidden" name="Ds_MerchantParameters" value={redsysData.paramsBase64} />
            <input type="hidden" name="Ds_Signature" value={redsysData.signature} />
          </form>
        )}
      </div>
    </section>
  );
}
