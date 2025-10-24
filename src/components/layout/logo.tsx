import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2" aria-label="Volver a la página de inicio de ProyectoVia">
      {/* 
        This is a placeholder for the logo. The user specified 'Completo Azul.png'.
        Replace the span with an Image component once the asset is available.
        e.g., <Image src="/completo-azul.png" alt="ProyectoVia Logo" width={150} height={40} />
      */}
      <span className="font-headline text-2xl font-bold text-primary">
        ProyectoVia
      </span>
    </Link>
  );
}
