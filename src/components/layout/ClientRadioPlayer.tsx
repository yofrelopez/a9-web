"use client";

import dynamic from 'next/dynamic';

// Carga dinámica del SimpleRadioPlayer
const SimpleRadioPlayer = dynamic(() => import('./SimpleRadioPlayer'), {
  ssr: false,
  loading: () => (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900/95 via-purple-900/95 to-gray-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          <div className="text-white/60 text-center">
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm">Cargando reproductor...</p>
          </div>
        </div>
      </div>
    </div>
  )
});

export default function ClientRadioPlayer() {
  return <SimpleRadioPlayer />;
}