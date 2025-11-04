// components/contact/ContactInfo.tsx
import Link from "next/link";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaMicrophone } from "react-icons/fa";

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Información de Contacto
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Visítanos o contáctanos directamente. Estamos ubicados en el corazón de Barranca.
        </p>
      </div>

      {/* Contact Items */}
      <div className="space-y-6">
        {/* Address */}
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <FaMapMarkerAlt className="text-white" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Dirección</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Urb Independencia<br />
              Barranca 15169, Lima - Perú
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <FaPhone className="text-white" size={18} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Cabina en Vivo</h3>
            <Link 
              href="tel:016330256" 
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              01 633 0256
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Para participar en programas en vivo
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <FaEnvelope className="text-white" size={18} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
            <Link 
              href="mailto:antena9.pe@gmail.com" 
              className="text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 transition-colors"
            >
              antena9.pe@gmail.com
            </Link>
          </div>
        </div>

        {/* Schedule */}
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
            <FaClock className="text-white" size={18} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Horario de Atención</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Lunes a Domingo<br />
              6:00 AM - 11:00 PM
            </p>
          </div>
        </div>

        {/* Live Programs */}
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
            <FaMicrophone className="text-white" size={18} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Programas en Vivo</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Participa llamando al 01 633 0256<br />
              durante la transmisión
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}