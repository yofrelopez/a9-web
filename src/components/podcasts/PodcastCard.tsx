// components/podcasts/PodcastCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface PodcastCardProps {
  podcast: {
    id: string;
    title: string;
    conductor: string;
    description: string;
    horario: string;
    whatsapp: string;
    facebook: string;
    image: string;
    url: string;
  };
}

export default function PodcastCard({ podcast }: PodcastCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shortDescription = podcast.description.length > 120 
    ? podcast.description.slice(0, 120) + "..."
    : podcast.description;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={podcast.image}
          alt={podcast.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            console.error(`Error loading image for ${podcast.title}:`, podcast.image);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title & Conductor */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-[var(--accent-b)] transition-colors">
            {podcast.title}
          </h3>
          <p className="text-sm text-primary dark:text-[var(--accent-b)] font-semibold">
            Conducido por {podcast.conductor}
          </p>
        </div>
        
        {/* Schedule */}
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <svg className="w-4 h-4 mr-2 text-fuchsia-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.7L16.2,16.2Z"/>
          </svg>
          {podcast.horario}
        </div>
        
        {/* Description */}
        <div>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {isExpanded ? podcast.description : shortDescription}
          </p>
          {podcast.description.length > 120 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary dark:text-[var(--accent-b)] text-sm font-medium hover:underline mt-1 inline-flex items-center"
            >
              {isExpanded ? "Ver menos" : "Leer más"}
              <svg 
                className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </button>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          {/* Contact Icons - Circular */}
          <div className="flex gap-2">
            <a
              href={`https://wa.me/${podcast.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors flex items-center justify-center"
              title="Contactar por WhatsApp"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.386"/>
              </svg>
            </a>
            
            <a
              href={podcast.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors flex items-center justify-center"
              title="Visitar página de Facebook"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
          
          {/* Listen Button - Outline Style with Fuchsia */}
          <Link
            href={podcast.url}
            className="flex-1 border-2 border-fuchsia-500 text-fuchsia-600 hover:bg-fuchsia-500 hover:text-white text-center font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm"
          >
            Escuchar Programa
          </Link>
        </div>
      </div>
    </div>
  );
}