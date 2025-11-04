// components/nosotros/EquipoSection.tsx
import { FaMicrophone, FaClock, FaMusic } from "react-icons/fa";

export default function EquipoSection() {
  const equipo = [
    {
      nombre: "Carlos Mendoza",
      cargo: "Director General",
      horario: "Gestión y Dirección",
      especialidad: "Administración de medios",
      imagen: "/team/director.jpg", // Agregar imágenes reales
      icon: FaMicrophone
    },
    {
      nombre: "Ana García",
      cargo: "Locutora Principal", 
      horario: "6:00 AM - 10:00 AM",
      especialidad: "Noticias matutinas",
      imagen: "/team/ana.jpg", // Agregar imágenes reales
      icon: FaMicrophone
    },
    {
      nombre: "Roberto Silva",
      cargo: "Locutor de Tarde",
      horario: "2:00 PM - 6:00 PM", 
      especialidad: "Música y entretenimiento",
      imagen: "/team/roberto.jpg", // Agregar imágenes reales
      icon: FaMusic
    },
    {
      nombre: "María López",
      cargo: "Locutora Nocturna",
      horario: "8:00 PM - 12:00 AM",
      especialidad: "Programas nocturnos",
      imagen: "/team/maria.jpg", // Agregar imágenes reales
      icon: FaClock
    }
  ];

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Nuestro Equipo
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Las voces que día a día te acompañan y hacen posible que Radio Antena Nueve 
          sea tu &quot;Señal que manda&quot;
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {equipo.map((miembro, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
            {/* Imagen placeholder */}
            <div className="aspect-square bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
              <miembro.icon className="text-white" size={48} />
            </div>
            
            {/* Contenido */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {miembro.nombre}
              </h3>
              <p className="text-primary font-medium mb-2">
                {miembro.cargo}
              </p>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center space-x-2">
                  <FaClock size={12} />
                  <span>{miembro.horario}</span>
                </div>
                <p className="text-xs">
                  {miembro.especialidad}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nota sobre las imágenes */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-w-2xl mx-auto">
          <strong>Nota:</strong> Las imágenes del equipo se agregarán próximamente. 
          Los datos mostrados son ejemplos y deben actualizarse con información real del equipo de Radio Antena Nueve.
        </p>
      </div>
    </section>
  );
}