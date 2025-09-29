// components/layout/Footer.tsx
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-dark text-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Columna: Branding / Logo */}
        <div className="flex flex-col items-start space-y-4">
          <Image
            src="/logos/logo-color.png"
            alt="Logo Antena Nueve"
            width={120}
            height={40}
            priority
            className="dark:hidden"
          />
          <Image
            src="/logos/logo-white.png"
            alt="Logo Antena Nueve"
            width={120}
            height={40}
            priority
            className="hidden dark:block"
          />
          <p className="text-sm">“Señal que manda” — Barranca, Perú</p>
        </div>

        {/* Columna: Contacto */}
        <div className="flex flex-col items-start space-y-2">
          <h4 className="font-heading text-lg">Contacto</h4>
          <p className="text-sm">Correo: antena9.pe@gmail.com</p>
          <p className="text-sm">Publicidad: publicidad@antena9.pe</p>
        </div>

        {/* Columna: Redes */}
        <div className="flex flex-col items-start space-y-2">
          <h4 className="font-heading text-lg">Síguenos</h4>
          <div className="flex space-x-4">
            <Link href="#" className="text-sm hover:text-primary transition">Facebook</Link>
            <Link href="#" className="text-sm hover:text-primary transition">YouTube</Link>
            <Link href="#" className="text-sm hover:text-primary transition">Instagram</Link>
            <Link href="#" className="text-sm hover:text-primary transition">TikTok</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="container mx-auto px-6 md:px-8 py-4 text-center text-xs">
          © {currentYear} Antena Nueve. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
