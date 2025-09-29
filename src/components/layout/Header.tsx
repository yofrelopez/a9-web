"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Play } from "lucide-react"; // 👈 nuevo ícono
import ThemeToggle from "../shared/ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white dark:bg-bg-dark shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        
        {/* Logo + texto */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logos/logo-color.png"
            alt="Antena Nueve logo"
            width={80}
            height={40}
            priority
            className="dark:hidden w-14 h-8 md:w-16 md:h-10"
          />
          <Image
            src="/logos/logo-white.png"
            alt="Antena Nueve logo"
            width={80}
            height={40}
            priority
            className="hidden dark:block w-14 h-8 md:w-16 md:h-10"
          />
          <span className="font-heading font-semibold text-sm md:text-xl text-primary leading-none">
            Antena Nueve
          </span>
        </Link>

        {/* Navegación (solo desktop) */}
        <nav className="hidden md:flex space-x-8 text-sm md:text-base font-medium">
          <Link
            href="/en-vivo"
            className={`hover:text-primary transition ${
              isActive("/en-vivo") ? "text-primary" : "text-body dark:text-white"
            }`}
          >
            En vivo
          </Link>
          <Link
            href="/programacion"
            className={`hover:text-primary transition ${
              isActive("/programacion") ? "text-primary" : "text-body dark:text-white"
            }`}
          >
            Programación
          </Link>
          <Link
            href="/nosotros"
            className={`hover:text-primary transition ${
              isActive("/nosotros") ? "text-primary" : "text-body dark:text-white"
            }`}
          >
            Nosotros
          </Link>
          <Link
            href="/contacto"
            className={`hover:text-primary transition ${
              isActive("/contacto") ? "text-primary" : "text-body dark:text-white"
            }`}
          >
            Contacto
          </Link>
        </nav>

        {/* Acciones: Theme + Botón en vivo */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Botón en vivo con icono + texto dinámico */}
          <Link
            href="/en-vivo"
            className="btn btn-live flex items-center gap-2 px-3 py-2 text-sm md:text-base"
          >
            <Play size={18} className="shrink-0" />
            <span className="hidden md:inline">Escúchanos en vivo</span>
            <span className="md:hidden">En vivo</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
