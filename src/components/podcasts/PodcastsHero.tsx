// components/podcasts/PodcastsHero.tsx
import Image from "next/image";

export default function PodcastsHero() {
  return (
    <div className="relative bg-gradient-to-br from-primary to-primary-600 dark:from-[var(--accent-b)] dark:to-accent text-white py-28 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/stuidio-podcast.png"
          alt="Studio Podcast - Radio Antena 9"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg 
                className="w-8 h-8 md:w-10 md:h-10 text-white" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.5 16.5v-9l7 4.5-7 4.5z"/>
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Todos Nuestros
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">
              Podcasts
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
            Descubre la programación noticiosa completa de Radio Antena 9. 
            Noticias, análisis político y entretenimiento desde Barranca, Perú.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-8 text-sm md:text-base">
              <div className="text-center">
                <div className="font-bold text-xl md:text-2xl">8</div>
                <div className="text-gray-300">Programas</div>
              </div>
              <div className="w-px h-8 bg-white/30"></div>
              <div className="text-center">
                <div className="font-bold text-xl md:text-2xl">7</div>
                <div className="text-gray-300">Días</div>
              </div>
              <div className="w-px h-8 bg-white/30"></div>
              <div className="text-center">
                <div className="font-bold text-xl md:text-2xl">24/7</div>
                <div className="text-gray-300">Al aire</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}