"use client";

import { useState, useEffect } from "react";
import programmingData from "@/data/programming.json";

type Program = {
  id: number;
  hora: string;
  horaFin: string;
  programa: string;
  conductor: string;
  tipo: "magazin" | "musical" | "informativo" | "deportivo" | "cultural";
  descripcion: string;
  enVivo: boolean;
};

const dias = [
  { key: "lunes", label: "Lunes" },
  { key: "martes", label: "Martes" },
  { key: "miercoles", label: "Miércoles" },
  { key: "jueves", label: "Jueves" },
  { key: "viernes", label: "Viernes" },
  { key: "sabado", label: "Sábado" },
  { key: "domingo", label: "Domingo" }
];

export const useCurrentProgram = () => {
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null);
  const [limaTime, setLimaTime] = useState<Date>(new Date());

  // Obtener hora de Lima, Perú (UTC-5)
  const getLimaTime = () => {
    const now = new Date();
    const limaTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Lima" }));
    return limaTime;
  };

  // Encontrar programa actual
  const findCurrentProgram = () => {
    try {
      const now = getLimaTime();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTimeMinutes = currentHour * 60 + currentMinute;

      // Obtener el día actual de Lima
      const limaDay = now.getDay();
      const limaDayIndex = limaDay === 0 ? 6 : limaDay - 1;
      const limaDayKey = dias[limaDayIndex].key;

      const radioData = (programmingData as { radio: Record<string, Program[]> })?.radio;
      const todayPrograms = radioData?.[limaDayKey] || [];

      const current = todayPrograms.find((program: Program) => {
        if (!program.hora || !program.horaFin) return false;
        
        const [startHour, startMinute] = program.hora.split(':').map(Number);
        const [endHour, endMinute] = program.horaFin.split(':').map(Number);

        const startMinutes = startHour * 60 + startMinute;
        let endMinutes = endHour * 60 + endMinute;

        // Manejar programas que cruzan medianoche (como 23:00 - 06:00)
        if (endMinutes <= startMinutes) {
          endMinutes += 24 * 60; // Agregar 24 horas
          if (currentTimeMinutes < 12 * 60) { // Si es antes del mediodía
            return currentTimeMinutes + 24 * 60 >= startMinutes && currentTimeMinutes + 24 * 60 < endMinutes;
          }
        }

        return currentTimeMinutes >= startMinutes && currentTimeMinutes < endMinutes;
      });

      return current || null;
    } catch (error) {
      console.error('Error finding current program:', error);
      return null;
    }
  };

  useEffect(() => {
    // Actualizar inmediatamente
    setLimaTime(getLimaTime());
    setCurrentProgram(findCurrentProgram());

    // Actualizar cada minuto
    const timer = setInterval(() => {
      setLimaTime(getLimaTime());
      setCurrentProgram(findCurrentProgram());
    }, 60000);

    return () => clearInterval(timer);
  }, [findCurrentProgram]);

  return { currentProgram, limaTime };
};