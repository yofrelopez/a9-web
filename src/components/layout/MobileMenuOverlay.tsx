"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronDown } from "lucide-react";

// Elementos de navegación simples
const simpleNavigationItems = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" }
] as const;

// Sub-items para Programación
const programmingSubItems = [
  { href: "/programacion", label: "Horarios", description: "Ver la programación completa" },
  { href: "/podcasts", label: "Podcasts", description: "Nuestros programas de audio" }
] as const;

export default function MobileMenuOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isProgrammingExpanded, setIsProgrammingExpanded] = useState(false);
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  const isProgrammingSection = pathname === "/programacion" || pathname === "/podcasts";
  
  const closeMenu = () => {
    setIsOpen(false);
    // Notificar al botón que el menú se cerró
    window.dispatchEvent(new CustomEvent('closeMobileMenu'));
  };

  // Marcar como montado
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-expandir sección de Programación si estamos en una de sus páginas
  useEffect(() => {
    if (isProgrammingSection) {
      setIsProgrammingExpanded(true);
    }
  }, [isProgrammingSection]);

  // Escuchar eventos para abrir/cerrar el menú
  useEffect(() => {
    const handleOpenMenu = () => {
      setIsOpen(true);
    };
    const handleCloseMenu = () => {
      setIsOpen(false);
    };

    // Escuchar eventos personalizados
    window.addEventListener('openMobileMenu', handleOpenMenu);
    window.addEventListener('closeMobileMenu', handleCloseMenu);

    // Cerrar al cambiar de ruta
    setIsOpen(false);
    setIsProgrammingExpanded(false);

    return () => {
      window.removeEventListener('openMobileMenu', handleOpenMenu);
      window.removeEventListener('closeMobileMenu', handleCloseMenu);
    };
  }, [pathname]);

  // Cerrar menú al cambiar a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // No renderizar si no está montado
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Overlay con blur que cubre toda la aplicación */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-lg backdrop-saturate-150 z-[60] transition-all duration-500 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Menu móvil */}
      <nav
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-bg-dark border-l border-gray-200 dark:border-gray-700 shadow-2xl z-[70] transform transition-all duration-300 ease-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="navigation"
        aria-label="Navegación móvil"
      >
        {/* Header del menu */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-bg-dark relative z-10">
          <h2 className="text-lg font-heading font-semibold text-primary">
            Menú
          </h2>
          <button
            onClick={closeMenu}
            className="w-9 h-9 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-center"
            aria-label="Cerrar menú"
          >
            <X size={18} className="text-ink dark:text-white" />
          </button>
        </div>

        {/* Enlaces de navegación */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-bg-dark">
          <div className="p-6 space-y-3">
            {/* Inicio */}
            <Link
              href="/"
              onClick={closeMenu}
              className={`relative block px-4 py-3 rounded-xl font-medium transition-all duration-300 transform active:scale-[0.98] ${
                isActive("/")
                  ? 'bg-primary/8 text-primary font-semibold'
                  : 'text-ink dark:text-white bg-white dark:bg-bg-dark hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary'
              }`}
              aria-current={isActive("/") ? "page" : undefined}
            >
              <div className="flex items-center justify-between">
                <span className="text-base">Inicio</span>
                {isActive("/") && (
                  <div className="w-2 h-2 bg-accent rounded-full" />
                )}
              </div>
            </Link>

            {/* Sección expandible de Programación */}
            <div className="space-y-2">
              <button
                onClick={() => setIsProgrammingExpanded(!isProgrammingExpanded)}
                className={`relative w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-300 transform active:scale-[0.98] ${
                  isProgrammingSection
                    ? 'bg-primary/8 text-primary font-semibold'
                    : 'text-ink dark:text-white bg-white dark:bg-bg-dark hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary'
                }`}
                aria-expanded={isProgrammingExpanded}
                aria-current={isProgrammingSection ? "page" : undefined}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-base">Programación</span>
                  {isProgrammingSection && (
                    <div className="w-2 h-2 bg-accent rounded-full" />
                  )}
                </div>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isProgrammingExpanded ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              {/* Sub-items expandibles */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isProgrammingExpanded 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="ml-4 space-y-2 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                  {programmingSubItems.map(({ href, label, description }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={closeMenu}
                      className={`block px-3 py-2 rounded-lg transition-all duration-200 transform active:scale-[0.98] ${
                        isActive(href)
                          ? 'bg-primary/10 text-primary font-medium border border-primary/20'
                          : 'text-body dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary'
                      }`}
                      aria-current={isActive(href) ? "page" : undefined}
                    >
                      <div className="text-sm font-medium">{label}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {description}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Resto de elementos simples de navegación */}
            {simpleNavigationItems.slice(1).map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className={`relative block px-4 py-3 rounded-xl font-medium transition-all duration-300 transform active:scale-[0.98] ${
                  isActive(href)
                    ? 'bg-primary/8 text-primary font-semibold'
                    : 'text-ink dark:text-white bg-white dark:bg-bg-dark hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary'
                }`}
                aria-current={isActive(href) ? "page" : undefined}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base">{label}</span>
                  {isActive(href) && (
                    <div className="w-2 h-2 bg-accent rounded-full" />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer del menu */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-bg-dark relative z-10">
          <div className="p-4 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 rounded-2xl border border-primary/20 shadow-sm">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
              <p className="text-sm font-medium text-body dark:text-gray-300">
                Radio Antena Nueve 95.9 FM
              </p>
            </div>
            <p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-1">
              Tu señal que manda
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}