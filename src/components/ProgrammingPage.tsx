"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, Play, User, Radio, Tv } from "lucide-react";
import programmingData from "@/data/programming.json";
import { useCurrentProgram } from "@/hooks/useCurrentProgram";

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
  { key: "lunes", label: "Lunes", short: "LUN", mini: "L" },
  { key: "martes", label: "Martes", short: "MAR", mini: "M" },
  { key: "miercoles", label: "Miércoles", short: "MIÉ", mini: "X" },
  { key: "jueves", label: "Jueves", short: "JUE", mini: "J" },
  { key: "viernes", label: "Viernes", short: "VIE", mini: "V" },
  { key: "sabado", label: "Sábado", short: "SÁB", mini: "S" },
  { key: "domingo", label: "Domingo", short: "DOM", mini: "D" }
];

const tipoColors = {
  magazin: "from-blue-500 to-purple-600",
  musical: "from-pink-500 to-red-500",
  informativo: "from-green-500 to-teal-600",
  deportivo: "from-orange-500 to-yellow-500",
  cultural: "from-indigo-500 to-blue-600"
};

export default function ProgrammingPage() {
  const [selectedDay, setSelectedDay] = useState("lunes");
  const [selectedMedium, setSelectedMedium] = useState<"radio" | "tv">("radio");
  const [mounted, setMounted] = useState(false);
  
  // Usar el hook compartido para el programa actual
  const { currentProgram, limaTime } = useCurrentProgram();

  // Marcar como montado
  useEffect(() => {
    setMounted(true);
  }, []);

  // Obtener día actual basado en hora de Lima
  useEffect(() => {
    const today = limaTime.getDay();
    const dayIndex = today === 0 ? 6 : today - 1; // Ajustar domingo
    setSelectedDay(dias[dayIndex].key);
  }, [limaTime]);

  const todayPrograms = programmingData[selectedMedium][selectedDay as keyof typeof programmingData.radio] as Program[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 py-6">
      <div className="container mx-auto px-4">
        




        {/* Selector de Días */}
        <div className="flex justify-center gap-1 sm:gap-2 mb-6">
          {dias.map((dia) => (
            <button
              key={dia.key}
              onClick={() => setSelectedDay(dia.key)}
              className={`sm:px-3 sm:py-2 px-2 py-2 rounded-lg font-medium transition-all text-xs sm:text-sm ${
                selectedDay === dia.key
                  ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-md"
                  : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700"
              }`}
              title={dia.label} // Tooltip para identificar el día completo
            >
              <span className="hidden sm:inline">{dia.label}</span>
              <span className="hidden xs:inline sm:hidden">{dia.short}</span>
              <span className="xs:hidden sm:hidden">{dia.mini}</span>
            </button>
          ))}
        </div>

        {/* Programación del Día */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar className="text-purple-600" size={20} />
              {dias.find(d => d.key === selectedDay)?.label}
            </h3>
            
            {/* Selector Radio/TV compacto */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setSelectedMedium("radio")}
                className={`flex items-center gap-1 px-3 py-1 rounded-md transition-all text-xs ${
                  selectedMedium === "radio"
                    ? "bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                <Radio size={14} />
                Radio
              </button>
              <button
                onClick={() => setSelectedMedium("tv")}
                className={`flex items-center gap-1 px-3 py-1 rounded-md transition-all text-xs ${
                  selectedMedium === "tv"
                    ? "bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                <Tv size={14} />
                TV
              </button>
            </div>
          </div>

          <div className="p-4">
            {todayPrograms && todayPrograms.length > 0 ? (
              <div className="space-y-3">
                {todayPrograms.map((program) => {
                  const isCurrentProgram = currentProgram?.id === program.id;
                  
                  return (
                    <div
                      key={program.id}
                      className={`relative p-3 rounded-lg border-l-4 transition-all hover:shadow-md ${
                        isCurrentProgram
                          ? "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-l-red-500"
                          : "bg-gray-50 dark:bg-gray-700/50 border-l-gray-300 dark:border-l-gray-600"
                      }`}
                    >
                      {isCurrentProgram && (
                        <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                          EN VIVO
                        </div>
                      )}

                      <div className="grid md:grid-cols-4 gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${tipoColors[program.tipo]} flex items-center justify-center text-white font-bold text-xs shadow-md`}>
                            {program.hora.substring(0, 2)}:{program.hora.substring(3, 5)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white text-sm">
                              {program.hora} - {program.horaFin}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                              {program.tipo}
                            </p>
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <h4 className="font-bold text-base text-gray-900 dark:text-white mb-1">
                            {program.programa}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {program.descripcion}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                            <User size={14} />
                            <span className="text-xs">{program.conductor}</span>
                          </div>
                          {program.enVivo && (
                            <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                              En Vivo
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📻</div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  Sin programación disponible
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No hay programas registrados para este día.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-500">
          <p>📡 Antena 9 - 95.9 FM | 🌐 En vivo 24/7</p>
          {mounted && (
            <p className="mt-1">
              🕐 Hora de Lima: {limaTime.toLocaleDateString('es-PE')} - {limaTime.toLocaleTimeString('es-PE', { hour12: false })} (GMT-5)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}