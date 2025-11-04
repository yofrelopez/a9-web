// components/nosotros/HistoriaSection.tsx
import { FaCalendarAlt, FaBroadcastTower, FaMicrophone, FaHeart } from "react-icons/fa";

export default function HistoriaSection() {
  const timeline = [
    {
      year: "1995", // Ajusta el año real
      title: "Nuestros Inicios",
      description: "Radio Antena Nueve inicia transmisiones en Barranca con el objetivo de ser la voz de la comunidad.",
      icon: FaBroadcastTower,
      color: "bg-blue-500"
    },
    {
      year: "2005", // Ajusta según historia real
      title: "Expansión de Cobertura",
      description: "Ampliamos nuestra señal para llegar a más distritos de la provincia de Barranca.",
      icon: FaMicrophone,
      color: "bg-green-500"
    },
    {
      year: "2015", // Ajusta según historia real
      title: "Era Digital",
      description: "Incursionamos en las plataformas digitales y redes sociales para estar más cerca de nuestra audiencia.",
      icon: FaCalendarAlt,
      color: "bg-purple-500"
    },
    {
      year: "2024",
      title: "Presente",
      description: "Continuamos siendo la 'Señal que manda', conectando a Barranca con información, música y entretenimiento.",
      icon: FaHeart,
      color: "bg-red-500"
    }
  ];

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Nuestra Trayectoria
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Desde nuestros inicios, hemos sido testigos y protagonistas del crecimiento de Barranca, 
          acompañando a cada familia con nuestra programación.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Línea central */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gray-300 dark:bg-gray-600"></div>

        <div className="space-y-12">
          {timeline.map((item, index) => (
            <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              {/* Contenido */}
              <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} ml-12 md:ml-0`}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center`}>
                      <item.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {item.year}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Punto en la línea */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2">
                <div className={`w-4 h-4 ${item.color} rounded-full border-4 border-white dark:border-gray-900`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}