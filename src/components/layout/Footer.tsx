// components/layout/Footer.tsx
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white dark:bg-gray-100 dark:text-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Columna: Branding / Logo */}
        <div className="flex flex-col items-start space-y-4">
          <Image
            src="/logos/logo_white_2.png"
            alt="Logo Antena Nueve"
            width={140}
            height={45}
            priority
            className="mb-2 dark:hidden"
          />
          <Image
            src="/logos/logo_footer.png"
            alt="Logo Antena Nueve"
            width={140}
            height={45}
            priority
            className="mb-2 hidden dark:block"
          />
          <p className="text-sm text-gray-300 dark:text-gray-600 leading-relaxed">
            "            &quot;Señal que manda&quot;"
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-300 dark:text-gray-600">
            <FaMapMarkerAlt size={16} className="text-gray-400 dark:text-gray-600" />
            <span>Barranca, Perú</span>
          </div>
        </div>

        {/* Columna: Ubicación y Contacto Principal */}
        <div className="flex flex-col space-y-3">
          <h4 className="font-semibold text-lg text-white dark:text-gray-900 mb-2">Ubicación</h4>
          <div className="flex items-start space-x-2 text-sm text-gray-300 dark:text-gray-600">
            <FaMapMarkerAlt size={16} className="text-gray-400 dark:text-gray-600 mt-0.5 flex-shrink-0" />
            <span>Urbanización Independencia A - 12<br />Barranca</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-300 dark:text-gray-600">
            <FaPhone size={16} className="text-gray-400 dark:text-gray-600" />
            <span>Cabina en vivo: 01 633 0256</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-300 dark:text-gray-600">
            <FaEnvelope size={16} className="text-gray-400 dark:text-gray-600" />
            <Link href="mailto:antena9.pe@gmail.com" className="hover:text-primary transition-colors">
              antena9.pe@gmail.com
            </Link>
          </div>
        </div>

        {/* Columna: WhatsApp */}
        <div className="flex flex-col space-y-3">
          <h4 className="font-semibold text-lg text-white dark:text-gray-900 mb-2">WhatsApp</h4>
          <Link 
            href="https://wa.me/51993250932" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-gray-300 dark:text-gray-600 hover:text-green-400 dark:hover:text-green-500 transition-colors group"
          >
            <FaWhatsapp size={18} className="text-green-500 group-hover:text-green-600 dark:group-hover:text-green-400" />
            <div>
              <span className="block">Noticias</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">993 250 932</span>
            </div>
          </Link>
          <Link 
            href="https://wa.me/51923419162" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-gray-300 dark:text-gray-600 hover:text-green-400 dark:hover:text-green-500 transition-colors group"
          >
            <FaWhatsapp size={18} className="text-green-500 group-hover:text-green-600 dark:group-hover:text-green-400" />
            <div>
              <span className="block">Publicidad</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">923 419 162</span>
            </div>
          </Link>
          <Link 
            href="https://wa.me/51906477442" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-gray-300 dark:text-gray-600 hover:text-green-400 dark:hover:text-green-500 transition-colors group"
          >
            <FaWhatsapp size={18} className="text-green-500 group-hover:text-green-600 dark:group-hover:text-green-400" />
            <div>
              <span className="block">Administración</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">906 477 442</span>
            </div>
          </Link>
        </div>

        {/* Columna: Redes Sociales */}
        <div className="flex flex-col space-y-3">
          <h4 className="font-semibold text-lg text-white dark:text-gray-900 mb-2">Síguenos</h4>
          
          <Link 
            href="https://www.facebook.com/Antena9.pe" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-sm text-gray-300 dark:text-gray-600 hover:text-blue-400 dark:hover:text-blue-500 transition-colors group"
          >
            <FaFacebookF size={18} className="text-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            <span>Facebook</span>
          </Link>

          <div className="flex items-center space-x-3 text-sm text-gray-300 dark:text-gray-600 hover:text-red-400 dark:hover:text-red-500 transition-colors group">
            <FaYoutube size={20} className="text-red-500 group-hover:text-red-600 dark:group-hover:text-red-400" />
            <span>YouTube</span>
          </div>

          <div className="flex items-center space-x-3 text-sm text-gray-300 dark:text-gray-600 hover:text-pink-400 dark:hover:text-pink-500 transition-colors group">
            <FaInstagram size={18} className="text-pink-500 group-hover:text-pink-600 dark:group-hover:text-pink-400" />
            <span>Instagram</span>
          </div>

          <div className="flex items-center space-x-3 text-sm text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-800 transition-colors group">
            <FaTiktok size={18} className="text-gray-700 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-white" />
            <span>TikTok</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 dark:border-gray-300">
        <div className="container mx-auto px-6 md:px-8 py-4 text-center text-xs text-gray-400 dark:text-gray-500">
          © {currentYear} Antena Nueve. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}