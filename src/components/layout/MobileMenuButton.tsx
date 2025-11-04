"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function MobileMenuButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Escuchar cuando se cierra el menú desde otro lugar
  useEffect(() => {
    const handleMenuClose = () => setIsOpen(false);
    window.addEventListener('closeMobileMenu', handleMenuClose);
    
    return () => {
      window.removeEventListener('closeMobileMenu', handleMenuClose);
    };
  }, []);

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    
    // Disparar evento personalizado para el overlay
    if (newState) {
      window.dispatchEvent(new CustomEvent('toggleMobileMenu'));
    } else {
      window.dispatchEvent(new CustomEvent('closeMobileMenu'));
    }
  };

  if (!isMounted) return null;

  return (
    <button
      onClick={toggleMenu}
      className="md:hidden w-10 h-10 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center hover:scale-105"
      aria-label="Abrir menú de navegación"
      aria-expanded={isOpen}
    >
      <div className="relative w-6 h-6">
        <Menu 
          size={20} 
          className={`absolute inset-0 text-ink dark:text-white transition-all duration-300 ${
            isOpen ? 'opacity-0 rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        <X 
          size={20} 
          className={`absolute inset-0 text-ink dark:text-white transition-all duration-300 ${
            isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-75'
          }`}
        />
      </div>
    </button>
  );
}