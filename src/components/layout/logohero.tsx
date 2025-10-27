import Link from 'next/link';
import Image from 'next/image';

export function LogoHero() {
  return (
    <Link href="/" className="flex items-center space-x-2" aria-label="Volver a la página de inicio de ProyectoVia">
      <Image src="/logo.png" alt="ProyectoVia Logo" width={100%} height={100%} className="w-auto h-8" />
    </Link>
  );
}
