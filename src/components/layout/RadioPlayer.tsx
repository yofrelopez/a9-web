"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Radio } from "lucide-react";
import AudioMotionAnalyzer from "audiomotion-analyzer";

// URL del stream de radio
const RADIO_STREAM_URL = "https://panel.foxradios.com:8100/radioantena9";

export default function RadioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioMotionRef = useRef<AudioMotionAnalyzer | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');

  // Inicializar AudioMotion Analyzer
  const initializeAudioMotion = useCallback(() => {
    if (!audioRef.current || !containerRef.current || audioMotionRef.current) {
      console.log('AudioMotion init skipped - missing refs or already initialized');
      return;
    }

    try {
      console.log('Initializing AudioMotion...');
      // Configuración simplificada del espectrograma
      audioMotionRef.current = new AudioMotionAnalyzer(containerRef.current, {
        source: audioRef.current,
        height: 120,
        mode: 6, // 1/3rd octave bands
        frequencyScale: 'log',
        gradient: 'prism',
        showPeaks: true,
        smoothing: 0.8,
        minDecibels: -70,
        maxDecibels: -10,
        showScaleX: false,
        showScaleY: false,
        connectSpeakers: true
      });

      console.log('AudioMotion initialized successfully');
      setIsInitialized(true);
      setError(null);
    } catch (err) {
      console.error('Error initializing AudioMotion:', err);
      setError('Error al inicializar el visualizador');
      setIsInitialized(false);
    }
  }, []);

  // Manejar play/pause
  const handlePlayPause = async () => {
    if (!audioRef.current) {
      console.error('Audio element not available');
      return;
    }

    // Si está cargando, no hacer nada
    if (isLoading) {
      console.log('Already loading, ignoring click');
      return;
    }

    setError(null);
    
    try {
      if (isPlaying) {
        console.log('Pausing audio...');
        audioRef.current.pause();
        // El evento 'pause' se encargará de setIsPlaying(false)
      } else {
        console.log('Starting audio playback...');
        setIsLoading(true);
        
        // Cargar el stream
        audioRef.current.load(); // Forzar recarga del stream
        
        // Intentar reproducir el audio
        console.log('Attempting to play audio stream...');
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          console.log('Audio playback started successfully');
          
          // Inicializar AudioMotion después de que el audio esté funcionando
          if (!isInitialized && !audioMotionRef.current) {
            console.log('Initializing AudioMotion after successful play...');
            setTimeout(() => {
              initializeAudioMotion();
            }, 1000); // Dar tiempo al stream para estabilizarse
          }
        }
      }
    } catch (err: unknown) {
      console.error('Error during playbook:', err);
      
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
      
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  // Manejar mute/unmute
  const handleMute = () => {
    if (!audioRef.current) return;
    
    const newMutedState = !isMuted;
    audioRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
    
    if (audioMotionRef.current) {
      audioMotionRef.current.volume = newMutedState ? 0 : volume;
    }
  };

  // Manejar cambio de volumen
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (audioMotionRef.current && !isMuted) {
      audioMotionRef.current.volume = newVolume;
    }
  };

  // Timeout para evitar loading infinito
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isLoading) {
      timeoutId = setTimeout(() => {
        console.log('Loading timeout - stopping loading state');
        setIsLoading(false);
        if (!isPlaying) {
          setError('Tiempo de espera agotado. Verifica tu conexión.');
        }
      }, 15000); // 15 segundos timeout
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isLoading, isPlaying]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (audioMotionRef.current) {
        try {
          audioMotionRef.current.destroy();
        } catch (err) {
          console.error('Error destroying AudioMotion:', err);
        }
      }
    };
  }, []);

  // Event listeners del audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadStart = () => {
      console.log('Audio: Load start');
      setIsLoading(true);
      setConnectionStatus('connecting');
    };
    
    const handleCanPlay = () => {
      console.log('Audio: Can play');
      setIsLoading(false);
    };
    
    const handlePlay = () => {
      console.log('Audio: Play event');
      setIsPlaying(true);
      setIsLoading(false);
      setConnectionStatus('connected');
    };
    
    const handlePause = () => {
      console.log('Audio: Pause event');
      setIsPlaying(false);
      setConnectionStatus('idle');
    };
    
    const handleError = (e: Event) => {
      const target = e.target as HTMLAudioElement;
      console.error('Audio error event:', {
        error: target.error,
        networkState: target.networkState,
        readyState: target.readyState
      });
      
      setError('Error de conexión con la radio');
      setIsLoading(false);
      setIsPlaying(false);
      setConnectionStatus('error');
    };

    const handleWaiting = () => {
      console.log('Audio: Waiting for data');
      setIsLoading(true);
    };

    const handleStalled = () => {
      console.log('Audio: Stalled');
      setError('Conexión lenta. Reintentando...');
    };

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('stalled', handleStalled);

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('stalled', handleStalled);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900/98 via-purple-900/98 to-gray-900/98 backdrop-blur-xl border-t border-white/10 shadow-2xl z-50">
      <div className="container mx-auto px-4">
        
        {/* Contenedor del espectrograma */}
        <div className="relative w-full h-32 overflow-hidden">
          <div 
            ref={containerRef}
            className="w-full h-full"
          />
          
          {/* Overlay con información cuando no está reproduciendo */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="text-center text-white/60">
                <Radio className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium">Espectrograma de audio</p>
              </div>
            </div>
          )}
        </div>

        {/* Controles del reproductor */}
        <div className="flex items-center justify-between py-4">
          
          {/* Información de la radio */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A9</span>
              </div>
              {isPlaying && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
            
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-white text-lg">Antena Nueve Retro</h3>
              <div className="text-sm text-gray-300 flex items-center gap-2">
                {connectionStatus === 'connecting' && (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Conectando con la radio...
                  </>
                )}
                {connectionStatus === 'connected' && isPlaying && (
                  <>
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    🔴 En vivo - Antena 9 Retro
                  </>
                )}
                {connectionStatus === 'idle' && !isPlaying && !error && (
                  <span>📻 Presiona play para escuchar en vivo</span>
                )}
                {connectionStatus === 'error' && (
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">❌ {error || 'Error de conexión'}</span>
                    <button 
                      onClick={() => {
                        setError(null);
                        setIsLoading(false);
                        setIsPlaying(false);
                        setConnectionStatus('idle');
                      }}
                      className="text-xs text-blue-400 hover:text-blue-300 underline"
                    >
                      Reintentar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Controles principales */}
          <div className="flex items-center gap-3">
            
            {/* Control de volumen */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={handleMute}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-300 border border-white/20"
                title={isMuted ? "Activar sonido" : "Silenciar"}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #ec4899 0%, #8b5cf6 ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%)`
                }}
                disabled={isMuted}
              />
            </div>

            {/* Botón principal play/pause */}
            <button
              onClick={handlePlayPause}
              disabled={isLoading}
              className="relative w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              title={isPlaying ? "Pausar" : "Reproducir"}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : isPlaying ? (
                <Pause size={22} />
              ) : (
                <Play size={22} className="ml-1" />
              )}
            </button>
          </div>
        </div>

        {/* Audio element oculto */}
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