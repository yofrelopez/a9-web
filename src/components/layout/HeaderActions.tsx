"use client";

import { Play, Radio } from "lucide-react";
import ThemeToggle from "../shared/ThemeToggle";
import MobileMenuButton from "./MobileMenuButton";
import { useRadioPlayer } from "@/hooks/useRadioPlayer";

export default function HeaderActions() {
  const { isPlaying, startPlayback } = useRadioPlayer();

  const handleLiveClick = () => {
    startPlayback();
    // Scroll al radio player si está visible
    const radioPlayer = document.querySelector('[class*="SimpleRadioPlayer"], [class*="ClientRadioPlayer"]');
    if (radioPlayer) {
      radioPlayer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {/* Toggle de tema */}
      <div className="hidden sm:block">
        <ThemeToggle />
      </div>

      {/* Botón de transmisión en vivo - versión desktop */}
      <button
        onClick={handleLiveClick}
        className="hidden md:flex btn btn-live items-center gap-2 px-4 py-2.5 text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
        aria-label="Escuchar transmisión en vivo"
      >
        <div className="relative">
          <Radio size={18} className="shrink-0 group-hover:animate-pulse" />
          <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
            isPlaying ? 'bg-red-500 animate-pulse' : 'bg-gray-400'
          }`} />
        </div>
        <span className="lg:inline hidden">
          {isPlaying ? 'Reproduciendo' : 'Escúchanos en vivo'}
        </span>
        <span className="lg:hidden">
          {isPlaying ? 'ON' : 'En vivo'}
        </span>
      </button>

      {/* Botón de transmisión en vivo - versión móvil */}
      <button
        onClick={handleLiveClick}
        className="md:hidden btn btn-live p-2.5 shadow-lg"
        aria-label="Transmisión en vivo"
      >
        <div className="relative">
          <Play size={18} className="shrink-0" fill="currentColor" />
          <div className={`absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full ${
            isPlaying ? 'bg-red-500 animate-pulse' : 'bg-gray-400'
          }`} />
        </div>
      </button>

      {/* Botón hamburger móvil */}
      <MobileMenuButton />
    </div>
  );
}