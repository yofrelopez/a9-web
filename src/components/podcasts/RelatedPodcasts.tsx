import Image from 'next/image';
import Link from 'next/link';
import { Clock, User } from 'lucide-react';
import podcasts from '@/data/podcasts.json';

interface RelatedPodcastsProps {
  currentId: string;
}

export default function RelatedPodcasts({ currentId }: RelatedPodcastsProps) {
  // Obtener otros podcasts (excluir el actual)
  const otherPodcasts = podcasts.filter(podcast => podcast.id !== currentId);
  
  // Mostrar máximo 3 podcasts relacionados
  const relatedPodcasts = otherPodcasts.slice(0, 3);

  if (relatedPodcasts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-primary">
          Otros Programas
        </h2>
        <Link 
          href="/podcasts"
          className="text-sm text-primary hover:text-primary/80 font-medium"
        >
          Ver todos →
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedPodcasts.map((podcast) => (
          <Link
            key={podcast.id}
            href={`/podcasts/${podcast.id}`}
            className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="flex gap-3">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={podcast.image}
                  alt={podcast.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="48px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-body dark:text-white group-hover:text-primary transition-colors line-clamp-2 text-sm">
                  {podcast.title}
                </h3>
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <User className="w-3 h-3" />
                  <span className="truncate">{podcast.conductor}</span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span className="truncate">{podcast.horario}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}