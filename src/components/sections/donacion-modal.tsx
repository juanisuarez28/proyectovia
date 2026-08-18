"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { sendDonationEmail } from "@/app/actions/donacion";

const formSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Introduce un email válido."),
  telefono: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function DonacionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Abrir el modal automáticamente al cargar la página
  useEffect(() => {
    // Pequeño delay para que la animación de entrada sea suave
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await sendDonationEmail(values);

      if (result.success) {
        setIsOpen(false);
        setShowSuccess(true);
      } else {
        setErrorMessage(result.error || "Ocurrió un error al enviar el mensaje.");
      }
    } catch {
      setErrorMessage("Ocurrió un error inesperado. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-primary text-center">¡Casi terminamos!</DialogTitle>
            <DialogDescription className="text-center">
              Para poder agradecerte personalmente y mantenerte al tanto, ¿podrías dejarnos tus datos de contacto?
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre y Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="tu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu número de celular" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {errorMessage && (
                <p className="text-sm text-red-500 text-center">{errorMessage}</p>
              )}

              <div className="flex flex-col gap-2 pt-2">
                <Button type="submit" className="w-full font-bold" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar mis datos"}
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="w-full text-muted-foreground" 
                  onClick={() => setIsOpen(false)}
                >
                  Prefiero no dejar mis datos
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center text-primary">¡Datos recibidos!</DialogTitle>
            <DialogDescription className="text-center">
              Muchas gracias por dejarnos tus datos y por tu generosidad. Pronto nos pondremos en contacto contigo.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-2">
            <Button onClick={() => setShowSuccess(false)}>Cerrar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
