// components/nosotros/LogrosSection.tsx
import { FaTrophy, FaAward, FaHeart, FaStar, FaUsers, FaMedal } from "react-icons/fa";

export default function LogrosSection() {
  const logros = [
    {
      icon: FaTrophy,
      titulo: "Radio Líder en Barranca",
      descripcion: "Reconocida como la radio más escuchada en la provincia de Barranca",
      color: "bg-yellow-500"
    },
    {
      icon: FaHeart,
      titulo: "Compromiso Social",
      descripcion: "Más de 100 campañas solidarias realizadas en beneficio de la comunidad",
      color: "bg-red-500"
    },
    {
      icon: FaUsers,
      titulo: "Audiencia Fiel",
      descripcion: "Más de 50,000 oyentes diarios que confían en nuestra programación",
      color: "bg-blue-500"
    },
    {
      icon: FaStar,
      titulo: "Calidad Profesional",
      descripcion: "Equipo técnico y periodístico de primer nivel en la región",
      color: "bg-purple-500"
    },
    {
      icon: FaAward,
      titulo: "Reconocimiento Regional",
      descripcion: "Escuchados y reconocidos en todo el norte chico por nuestra eficiente labor",
      color: "bg-green-500"
    },
    {
      icon: FaMedal,
      titulo: "Trayectoria Sólida",
      descripcion: "15+ años de experiencia ininterrumpida sirviendo a la comunidad",
      color: "bg-orange-500"
    }
  ];

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Nuestros Logros
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Reconocimientos y logros que reflejan nuestro compromiso constante 
          con la excelencia y el servicio a la comunidad
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {logros.map((logro, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Ícono */}
            <div className={`w-14 h-14 ${logro.color} rounded-full flex items-center justify-center mb-4`}>
              <logro.icon className="text-white" size={20} />
            </div>

            {/* Contenido */}
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              {logro.titulo}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {logro.descripcion}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}