// components/contact/ContactHero.tsx
import Image from "next/image";

export default function ContactHero() {
  return (
    <div className="relative bg-gradient-to-br from-primary to-primary-dark text-white py-28 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/contacto.png"
          alt="Radio Antena Nueve - Contacto"
          fill
          className="object-cover object-center md:object-[center_-150px]"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold">
            Contáctanos
          </h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
            Estamos aquí para escucharte. Ponte en contacto con Radio Antena Nueve,
            tu &quot;Señal que manda&quot; desde Barranca, Perú.
          </p>
        </div>
      </div>
    </div>
  );
}