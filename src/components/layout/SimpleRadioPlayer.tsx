"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import AudioMotionAnalyzer from "audiomotion-analyzer";
import { useCurrentProgram } from "@/hooks/useCurrentProgram";
import { useRadioPlayer } from "@/hooks/useRadioPlayer";

export default function SimpleRadioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const spectrumRef = useRef<HTMLDivElement>(null);
  const audioMotionRef = useRef<AudioMotionAnalyzer | null>(null);
  
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioMotionReady, setAudioMotionReady] = useState(false);


  // Hook para obtener el programa actual
  const { currentProgram } = useCurrentProgram();
  
  // Hook para el estado global del radio player
  const { isPlaying, togglePlayback, startPlayback, stopPlayback } = useRadioPlayer();
  
  // URL del stream de radio a través del proxy local (sin CORS)
  const RADIO_STREAM_URL = "/api/radio-stream";

  // Inicializar AudioMotion de manera segura
  const initializeAudioMotion = useCallback(() => {
    if (!audioRef.current || !spectrumRef.current || audioMotionRef.current) {
      console.log('AudioMotion: Skipping initialization');
      return;
    }

    try {
      console.log('AudioMotion: Initializing...');
      
      // Detectar si es móvil para ajustar configuración
      const isMobile = window.innerWidth < 640; // sm breakpoint
      
      audioMotionRef.current = new AudioMotionAnalyzer(spectrumRef.current, {
        source: audioRef.current,
        height: 48, // Altura del contenedor
        mode: isMobile ? 4 : 6, // Menos bandas en móvil (1/6 octave vs 1/3 octave)
        frequencyScale: 'log',
        gradient: 'prism',
        showPeaks: true,
        smoothing: 0.8,
        barSpace: isMobile ? 0.15 : 0.1, // Más espacio entre barras en móvil
        ledBars: false, // Mantener simple
        lumiBars: false,
        reflexRatio: 0,
        minDecibels: -70,
        maxDecibels: -10,
        showScaleX: false,
        showScaleY: false,
        overlay: true,
        showBgColor: false,
        connectSpeakers: true // CORREGIDO: Sí conectar a speakers
      });

      // Sincronizar volumen y mute con el estado actual
      const currentVolume = isMuted ? 0 : volume;
      audioMotionRef.current.volume = currentVolume;
      
      console.log(`AudioMotion: Volume set to ${currentVolume}`);
      
      console.log('AudioMotion: Initialized successfully');
      setAudioMotionReady(true);
      
    } catch (err) {
      console.warn('AudioMotion: Failed to initialize, using CSS fallback', err);
      setAudioMotionReady(false);
    }
  }, []);



  // Manejar play/pause
  const handlePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Si está cargando, no hacer nada
    if (isLoading) {
      console.log('Already loading, ignoring click');
      return;
    }

    setError(null);
    
    try {
      if (isPlaying) {
        console.log('Pausing audio...');
        audio.pause();
        // El evento 'pause' se encargará de setIsPlaying(false)
      } else {
        console.log('Starting audio playback...');
        setIsLoading(true);
        
        // Cargar el stream
        audio.load(); // Forzar recarga del stream
        
        // Intentar reproducir el audio
        console.log('Attempting to play audio stream...');
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          console.log('Audio playback started successfully');
        }
      }
    } catch (err: unknown) {
      console.error('Error during playback:', err);
      
      // Manejar diferentes tipos de errores
      const error = err as { name?: string };
      if (error.name === 'NotAllowedError') {
        setError('Haz clic para permitir reproducción de audio');
      } else if (error.name === 'NotSupportedError') {
        setError('Formato de audio no soportado');
      } else if (error.name === 'AbortError') {
        setError('Reproducción cancelada');
      } else {
        setError('Error al conectar. Verifica tu conexión.');
      }
      
      setIsLoading(false);
    }
  };

  // Manejar mute/unmute
  const handleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newMutedState = !isMuted;
    audio.muted = newMutedState;
    setIsMuted(newMutedState);
    
    // Sincronizar con AudioMotion
    if (audioMotionRef.current) {
      audioMotionRef.current.volume = newMutedState ? 0 : volume;
    }
  };

  // Manejar cambio de volumen
  const handleVolumeChange = (newVolume: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    setVolume(newVolume);
    audio.volume = newVolume;
    
    // Sincronizar con AudioMotion
    if (audioMotionRef.current && !isMuted) {
      audioMotionRef.current.volume = newVolume;
    }
  };



  // Event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      startPlayback();
      setIsLoading(false);
      setError(null);
      
      // Inicializar AudioMotion después de que el audio funcione
      if (!audioMotionReady && !audioMotionRef.current) {
        setTimeout(() => {
          initializeAudioMotion();
        }, 1500); // Esperar a que el stream se estabilice
      }
    };

    const handlePause = () => {
      stopPlayback();
    };

    const handleError = () => {
      setError('Error de conexión con la radio');
      setIsLoading(false);
      stopPlayback();
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);

    // Configurar volumen inicial
    audio.volume = volume;
    audio.muted = isMuted;

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [volume, isMuted, initializeAudioMotion, startPlayback, stopPlayback]);

  // Escuchar cambios en el estado global para controlar el audio desde el navbar
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Si el estado global dice que debe estar reproduciendo pero el audio no está reproduciendo
    if (isPlaying && audio.paused) {
      setError(null);
      setIsLoading(true);
      audio.load();
        audio.play().catch((err: unknown) => {
        console.error('Error al iniciar desde navegación:', err);
        setError('Error al reproducir desde navegación');
        stopPlayback();
      }).finally(() => {
        setIsLoading(false);
      });
    }
    
    // Si el estado global dice que debe estar pausado pero el audio está reproduciendo
    if (!isPlaying && !audio.paused) {
      audio.pause();
    }
  }, [isPlaying, stopPlayback]);

  // Cleanup AudioMotion al desmontar
  useEffect(() => {
    return () => {
      if (audioMotionRef.current) {
        try {
          console.log('AudioMotion: Cleaning up...');
          audioMotionRef.current.destroy();
          audioMotionRef.current = null;
        } catch (err) {
          console.warn('AudioMotion: Error during cleanup', err);
        }
      }
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900/95 via-purple-900/95 to-gray-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl z-50">
      <div className="container mx-auto px-4 py-4">
        
        {/* Layout horizontal: Logo | Espectro | Controles */}
        <div className="flex items-center gap-6">
          
          {/* IZQUIERDA: Info de la radio */}
          <div className="flex items-center gap-3 min-w-0 flex-shrink-0">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs">A9</span>
              </div>
              {isPlaying && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
            

            
            <div className="hidden sm:block">
              <h3 className="font-semibold text-white text-sm">
                {currentProgram && isPlaying ? currentProgram.programa : "Antena Nueve"}
              </h3>
              <div className="text-xs text-gray-300 flex items-center gap-2">
                {isLoading && (
                  <>
                    <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin"></div>
                    Conectando...
                  </>
                )}
                {!isLoading && isPlaying && (
                  <>
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    {currentProgram ? (
                      <span>EN VIVO • {currentProgram.conductor}</span>
                    ) : (
                      <span>En vivo • 95.9 FM</span>
                    )}
                  </>
                )}
                {!isLoading && !isPlaying && !error && (
                  <span>{currentProgram ? `${currentProgram.hora} • ${currentProgram.conductor}` : "95.9 FM"}</span>
                )}
                {error && (
                  <span className="text-red-400 text-xs">Error</span>
                )}
              </div>
            </div>
          </div>

          {/* CENTRO: Visualizador de espectro */}
          <div className="flex-1 h-12 bg-black/20 rounded-lg border border-white/10 flex items-center justify-center px-4 relative overflow-hidden">
            
            {/* Nombre del programa en móvil - encima del espectro */}
            {currentProgram && isPlaying && (
              <div className="absolute top-0 left-0 right-0 sm:hidden">
                <div className="text-center text-xs text-white/70 font-medium bg-gradient-to-r from-transparent via-black/30 to-transparent px-2 py-0.5 backdrop-blur-sm">
                  {currentProgram.programa}
                </div>
              </div>
            )}
            
            {/* Contenedor AudioMotion */}
            <div 
              ref={spectrumRef}
              className="absolute inset-0 w-full h-full"
              style={{ display: audioMotionReady ? 'block' : 'none' }}
            />
            
            {/* Fallback CSS cuando AudioMotion no está listo */}
            {!audioMotionReady && (
              <>
                {isPlaying ? (
                  <>
                    {/* Versión móvil - menos barras */}
                    <div className="flex items-center gap-1 w-full justify-center sm:hidden">
                      {Array.from({ length: 15 }, (_, i) => (
                        <div
                          key={i}
                          className="w-1 bg-gradient-to-t from-pink-400 to-purple-400 rounded-full animate-pulse"
                          style={{
                            height: `${Math.random() * 32 + 8}px`,
                            animationDelay: `${i * 80}ms`,
                            animationDuration: `${800 + Math.random() * 400}ms`
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Versión desktop - cantidad normal */}
                    <div className="hidden sm:flex items-center gap-1 w-full justify-center">
                      {Array.from({ length: 30 }, (_, i) => (
                        <div
                          key={i}
                          className="w-1 bg-gradient-to-t from-pink-400 to-purple-400 rounded-full animate-pulse"
                          style={{
                            height: `${Math.random() * 32 + 8}px`,
                            animationDelay: `${i * 80}ms`,
                            animationDuration: `${800 + Math.random() * 400}ms`
                          }}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-white/40 text-xs text-center">
                    {isLoading ? 'Conectando...' : 'Espectro de audio'}
                  </div>
                )}
              </>
            )}
            
            {/* Indicador de AudioMotion activo */}
            {audioMotionReady && (
              <div className="absolute top-1 right-2 text-xs text-white/30">
                AM
              </div>
            )}
          </div>

          {/* DERECHA: Controles principales */}
          <div className="flex items-center gap-2 flex-shrink-0">
            
            {/* Control de volumen - solo en desktop */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={handleMute}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                title={isMuted ? "Activar sonido" : "Silenciar"}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="w-12 h-1 accent-purple-500"
                disabled={isMuted}
              />
            </div>

            {/* Botón principal play/pause */}
            <button
              onClick={handlePlayPause}
              disabled={isLoading}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              title={isPlaying ? "Pausar" : "Reproducir"}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : isPlaying ? (
                <Pause size={20} />
              ) : (
                <Play size={20} className="ml-1" />
              )}
            </button>
          </div>
        </div>

        {/* Audio element */}
        <audio
          ref={audioRef}
          src={RADIO_STREAM_URL}
          preload="none"
          crossOrigin="anonymous"
        />
      </div>
    </div>
  );
}