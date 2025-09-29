// components/layout/Player.tsx
"use client";

import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const STREAM_URL = "https://panel.foxradios.com:8100/radioantena9";

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Error reproduciendo stream:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-bg-dark shadow-xl z-50 transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-8 flex items-center justify-between h-16">
        {/* Info del player */}
        <span className="font-medium text-sm md:text-base">
          🎵 Antena Nueve — Señal que manda
        </span>

        {/* Controles */}
        <div className="flex items-center space-x-4">


          <button
            onClick={togglePlay}
            className="p-2 rounded-full 
                        bg-primary text-white hover:bg-primary-600 
                        dark:bg-[var(--accent-b)] dark:hover:opacity-90 transition"
            aria-label={isPlaying ? "Pausar transmisión" : "Reproducir transmisión"}
            >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>



          <button
            onClick={toggleMute}
            className="p-2 rounded-full 
                        bg-gray-200 hover:bg-primary hover:text-white
                        dark:bg-[var(--accent-b)] dark:text-white dark:hover:opacity-90 transition"
            aria-label={muted ? "Activar volumen" : "Silenciar"}
            >
            {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>



        </div>

        {/* Elemento de audio */}
        <audio ref={audioRef} src={STREAM_URL} preload="none" />
      </div>
    </div>
  );
}
