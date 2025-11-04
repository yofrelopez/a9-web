"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Elementos de navegación compartidos
const navigationItems = [
  { href: "/", label: "Inicio" },
  { href: "/programacion", label: "Programación" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" }
] as const;

export default function MainNavbar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;

  return (
    <nav 
      className="hidden md:flex items-center space-x-1 lg:space-x-2"
      role="navigation"
      aria-label="Navegación principal"
    >
      {navigationItems.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`relative px-4 py-2 rounded-xl font-medium text-sm lg:text-base transition-all duration-300 group ${
            isActive(href)
              ? "text-primary bg-primary/10 font-semibold shadow-sm"
              : "text-body dark:text-white hover:text-primary hover:bg-primary/5"
          }`}
          aria-current={isActive(href) ? "page" : undefined}
        >
          {/* Texto del enlace */}
          <span className="relative z-10">{label}</span>
          

          
          {/* Efecto hover animado */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      ))}
    </nav>
  );
}