// components/nosotros/StatsSection.tsx
import { FaUsers, FaClock, FaGlobe, FaCalendarAlt } from "react-icons/fa";

export default function StatsSection() {
  const stats = [
    {
      icon: FaUsers,
      number: "50K+",
      label: "Oyentes Diarios",
      color: "bg-blue-500"
    },
    {
      icon: FaClock,
      number: "24/7",
      label: "Horas al Aire",
      color: "bg-green-500"
    },
    {
      icon: FaGlobe,
      number: "100%",
      label: "Cobertura regional",
      color: "bg-purple-500"
    },
    {
      icon: FaCalendarAlt,
      number: "15+",
      label: "Años de Experiencia",
      color: "bg-red-500"
    }
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 md:p-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Radio Antena Nueve en Números
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Cifras que reflejan nuestro compromiso con Barranca y la región
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`w-16 h-16 md:w-20 md:h-20 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <stat.icon className="text-white" size={24} />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {stat.number}
            </div>
            <div className="text-sm md:text-base text-gray-600 dark:text-gray-300">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}