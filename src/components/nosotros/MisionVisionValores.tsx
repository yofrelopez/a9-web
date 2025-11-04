// components/nosotros/MisionVisionValores.tsx
import { FaEye, FaBullseye, FaHeart } from "react-icons/fa";

export default function MisionVisionValores() {
  const valores = [
    {
      icon: FaBullseye,
      title: "Misión",
      content: "Ser el medio de comunicación líder en Barranca, informando, educando y entreteniendo a nuestra comunidad con contenido de calidad, promoviendo el desarrollo social y cultural de la región.",
      color: "bg-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800"
    },
    {
      icon: FaEye,
      title: "Visión", 
      content: "Convertirnos en la radio más influyente del norte chico, reconocida por nuestra credibilidad, innovación tecnológica y compromiso inquebrantable con el progreso de Barranca y sus habitantes.",
      color: "bg-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800"
    },
    {
      icon: FaHeart,
      title: "Valores",
      content: "Honestidad, Compromiso Social, Calidad Profesional, Respeto a la Diversidad, Innovación Constante, Servicio a la Comunidad, Transparencia Informativa.",
      color: "bg-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20", 
      borderColor: "border-purple-200 dark:border-purple-800"
    }
  ];

  return (
    <section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {valores.map((item, index) => (
          <div 
            key={index}
            className={`${item.bgColor} ${item.borderColor} border rounded-2xl p-6 md:p-8 text-center hover:shadow-lg transition-shadow duration-300`}
          >
            {/* Ícono */}
            <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
              <item.icon className="text-white" size={24} />
            </div>

            {/* Título */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {item.title}
            </h3>

            {/* Contenido */}
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}