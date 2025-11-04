// hooks/useRadioPlayer.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

type RadioStation = 'fm' | 'retro';

interface RadioPlayerContextType {
  isPlaying: boolean;
  station: RadioStation;
  togglePlayback: () => void;
  startPlayback: () => void;
  stopPlayback: () => void;
  switchStation: (newStation: RadioStation) => void;
}

const RadioPlayerContext = createContext<RadioPlayerContextType | undefined>(undefined);

export function RadioPlayerProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [station, setStation] = useState<RadioStation>('fm');

  const togglePlayback = () => setIsPlaying(prev => !prev);
  const startPlayback = () => setIsPlaying(true);
  const stopPlayback = () => setIsPlaying(false);
  
  const switchStation = (newStation: RadioStation) => {
    setStation(newStation);
    // Al cambiar de estación, detenemos la reproducción para que se reinicie con la nueva señal
    setIsPlaying(false);
  };

  return (
    <RadioPlayerContext.Provider value={{ 
      isPlaying, 
      station,
      togglePlayback, 
      startPlayback, 
      stopPlayback,
      switchStation
    }}>
      {children}
    </RadioPlayerContext.Provider>
  );
}

export function useRadioPlayer() {
  const context = useContext(RadioPlayerContext);
  if (context === undefined) {
    throw new Error('useRadioPlayer must be used within a RadioPlayerProvider');
  }
  return context;
}