import Link from 'next/link';
import { ArrowLeft, RadioIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-bg-dark flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <RadioIcon className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primary">404</h1>
          <h2 className="text-xl font-semibold text-ink dark:text-white">
            Podcast no encontrado
          </h2>
          <p className="text-muted-foreground">
            Lo sentimos, el programa que buscas no existe o ha sido movido.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/podcasts"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Ver todos los podcasts
          </Link>
          <div className="text-sm text-muted-foreground">
            o regresa al{' '}
            <Link 
              href="/" 
              className="text-primary hover:text-primary/80 underline"
            >
              inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}