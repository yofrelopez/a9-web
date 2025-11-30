"use client";

import { FaPlay, FaBroadcastTower } from "react-icons/fa";

export default function TvSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-bg-dark">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 w-fit mx-auto lg:mx-0">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
              <span className="text-red-500 font-bold text-xs tracking-wider uppercase">En Vivo</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight">
              Antena 9 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-600">TV</span>
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed">
              Disfruta de nuestra programación en tiempo real. Noticias, entretenimiento y la mejor música, donde quiera que estés.
            </p>

            <div className="hidden lg:flex gap-4 mt-2">
               <div className="flex items-center gap-3 text-white/80">
                  <div className="p-3 rounded-full bg-white/5 border border-white/10">
                    <FaBroadcastTower className="text-primary text-xl" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">Señal HD</span>
                    <span className="text-xs text-gray-500">Alta Definición</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Video Player */}
          <div className="w-full lg:w-2/3">
            <div className="relative group rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10 bg-black aspect-video">
              <iframe 
                src="https://ok.ru/videoembed/9468835536414" 
                className="absolute top-0 left-0 w-full h-full" 
                frameBorder="0" 
                allow="autoplay; fullscreen" 
                allowFullScreen
                title="Antena 9 TV En Vivo"
              ></iframe>
              
              {/* Optional Overlay for aesthetics before play (if needed, but iframe usually handles it) */}
              {/* <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl"></div> */}
            </div>
             <div className="flex lg:hidden justify-center gap-6 mt-6">
               <div className="flex items-center gap-2 text-white/80">
                  <FaBroadcastTower className="text-primary" />
                  <span className="text-sm font-medium">Señal HD 24/7</span>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
