import Image from 'next/image';
import Link from 'next/link';
import { 
  Clock, 
  User, 
  ArrowLeft,
  ExternalLink 
} from 'lucide-react';
import { FaWhatsapp, FaFacebook } from 'react-icons/fa';
import ComingSoonSection from './ComingSoonSection';
import RelatedPodcasts from './RelatedPodcasts';

type Podcast = {
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

interface PodcastDetailViewProps {
  podcast: Podcast;
}

export default function PodcastDetailView({ podcast }: PodcastDetailViewProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-bg-dark">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link 
            href="/podcasts" 
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Podcasts
          </Link>
          <span>/</span>
          <span className="text-body dark:text-white font-medium">
            {podcast.title}
          </span>
        </nav>

        {/* Header Compacto - Sin Hero */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Imagen del Programa */}
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <Image
                  src={podcast.image}
                  alt={podcast.title}
                  fill
                  className="object-cover rounded-xl shadow-lg"
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </div>
            </div>

            {/* Información Principal */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {podcast.title}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <User className="w-4 h-4" />
                  <span className="font-medium text-body dark:text-white">
                    {podcast.conductor}
                  </span>
                </div>
              </div>

              <p className="text-body dark:text-gray-300 leading-relaxed">
                {podcast.description}
              </p>

              {/* Horarios */}
              <div className="flex items-center gap-2 text-primary">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{podcast.horario}</span>
              </div>

              {/* Botones de Contacto - Solo íconos redondos */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${podcast.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
                  title="Contactar por WhatsApp"
                >
                  <FaWhatsapp className="w-5 h-5" />
                </a>
                <a
                  href={podcast.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                  title="Seguir en Facebook"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sección Coming Soon */}
        <ComingSoonSection podcastTitle={podcast.title} />

        {/* Contacto Directo */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-primary/10 p-6 mb-8">
          <h2 className="text-xl font-semibold text-primary mb-4">
            Contáctanos Directamente
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href={`https://wa.me/${podcast.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-all group"
            >
              <FaWhatsapp className="w-6 h-6 text-green-600" />
              <div>
                <div className="font-medium text-body dark:text-white">
                  WhatsApp
                </div>
                <div className="text-sm text-muted-foreground">
                  Envía un mensaje directo
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary ml-auto" />
            </a>
            <a
              href={podcast.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-all group"
            >
              <FaFacebook className="w-6 h-6 text-blue-600" />
              <div>
                <div className="font-medium text-body dark:text-white">
                  Facebook
                </div>
                <div className="text-sm text-muted-foreground">
                  Síguenos en redes
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary ml-auto" />
            </a>
          </div>
        </div>

        {/* Otros Programas */}
        <RelatedPodcasts currentId={podcast.id} />
      </div>
    </div>
  );
}