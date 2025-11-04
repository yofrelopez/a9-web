// components/nosotros/NosotrosHero.tsx
import Image from "next/image";

export default function NosotrosHero() {
  return (
    <div className="relative bg-gradient-to-br from-primary to-primary-dark text-white py-28 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/nosotros.png"
          alt="Radio Antena Nueve - Nosotros"
          fill
          className="object-cover object-center md:object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold">
            Radio Antena 9
          </h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
            Empresa de comunicación de reconocida trayectoria, la &quot;Señal que manda&quot; 
            desde Barranca. Más de 15 años acompañando a nuestra comunidad.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm md:text-base">

          </div>
        </div>
      </div>
    </div>
  );
}