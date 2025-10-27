import Link from 'next/link';
import Image from 'next/image';

export function LogoHero() {
  return (
    <Link href="/" className="flex items-center space-x-2" aria-label="Volver a la página de inicio de ProyectoVia">
      <Image src="/logocremapv.png" alt="ProyectoVia Logo" width={500} height={200} className="w-auto h-auto max-h-40" />
      </Link>
  );
}
