// components/contact/ContactMap.tsx
export default function ContactMap() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Ubicación
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Encuéntranos en el centro de Barranca, fácil acceso desde cualquier punto de la ciudad.
        </p>
      </div>

      {/* Map Container */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="aspect-square lg:aspect-[4/3] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.2345678901234!2d-77.765358!3d-10.748548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ0JzU0LjgiUyA3N8KwNDUnNTUuMyJX!5e0!3m2!1ses!2spe!4v1699017600000!5m2!1ses!2spe"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>
        
        {/* Map Footer */}
        <div className="p-4 bg-white dark:bg-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Radio Antena Nueve
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Urb Independencia, Barranca 15169
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=-10.748548,-77.765358"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
            >
              Ver en Maps
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}