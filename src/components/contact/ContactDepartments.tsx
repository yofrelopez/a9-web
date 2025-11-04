// components/contact/ContactDepartments.tsx
import Link from "next/link";
import { FaWhatsapp, FaPhone, FaEnvelope } from "react-icons/fa";

export default function ContactDepartments() {
  const departments = [
    {
      title: "Noticias",
      description: "Envíanos tus noticias, denuncias o acontecimientos importantes",
      whatsapp: "993250932",
      color: "bg-blue-500"
    },
    {
      title: "Publicidad",
      description: "Anuncia tu negocio en la radio más escuchada de Barranca",
      whatsapp: "923419162", 
      color: "bg-green-500"
    },
    {
      title: "Administración",
      description: "Consultas generales y temas administrativos",
      whatsapp: "906477442",
      color: "bg-purple-500"
    }
  ];

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Departamentos
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Cada departamento tiene un contacto directo para atenderte mejor
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {departments.map((dept, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Icon */}
            <div className={`w-12 h-12 ${dept.color} rounded-full flex items-center justify-center mb-4`}>
              <FaWhatsapp className="text-white" size={24} />
            </div>

            {/* Content */}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {dept.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
              {dept.description}
            </p>

            {/* Contact Button */}
            <Link
              href={`https://wa.me/51${dept.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium"
            >
              <FaWhatsapp size={16} />
              <span>WhatsApp</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}