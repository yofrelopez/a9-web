"use client";

import Logo from "./Logo";
import MainNavbar from "./MainNavbar";
import HeaderActions from "./HeaderActions";

export default function SiteHeader() {
  return (
    <header 
      className="bg-white/95 dark:bg-bg-dark/95 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-800/20 sticky top-0 z-50 transition-all duration-300"
      role="banner"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Sección izquierda: Logo y branding */}
          <div className="flex-shrink-0">
            <Logo />
          </div>
          
          {/* Sección central: Navegación principal */}
          <div className="flex-1 flex justify-center">
            <MainNavbar />
          </div>
          
          {/* Sección derecha: Acciones del usuario */}
          <div className="flex-shrink-0">
            <HeaderActions />
          </div>
        </div>
      </div>

      {/* Línea decorativa gradiente */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </header>
  );
}