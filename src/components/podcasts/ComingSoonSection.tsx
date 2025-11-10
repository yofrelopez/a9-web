import { Headphones, Video, MessageSquare, Bell } from 'lucide-react';

interface ComingSoonSectionProps {
  podcastTitle: string;
}

export default function ComingSoonSection({ podcastTitle }: ComingSoonSectionProps) {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/10 mb-8">
      <div className="text-center space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-2xl font-bold text-primary mb-2">
            Próximamente todos los podcasts aquí
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Muy pronto podrás escuchar y ver todos los episodios de{" "}
            <span className="font-semibold text-primary">&ldquo;{podcastTitle}&rdquo;</span>{" "}
            directamente desde esta página.
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="flex flex-col items-center space-y-3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Headphones className="w-6 h-6 text-primary" />
            </div>
            <div className="text-center">
              <div className="font-medium text-body dark:text-white mb-1">
                Audio completo
              </div>
              <div className="text-xs text-muted-foreground">
                Programas enteros y segmentos destacados
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Video className="w-6 h-6 text-primary" />
            </div>
            <div className="text-center">
              <div className="font-medium text-body dark:text-white mb-1">
                Videos y clips
              </div>
              <div className="text-xs text-muted-foreground">
                Momentos destacados en video
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <div className="text-center">
              <div className="font-medium text-body dark:text-white mb-1">
                Interacción
              </div>
              <div className="text-xs text-muted-foreground">
                Comentarios y participación
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="space-y-4">
          <button className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl">
            <Bell className="w-4 h-4" />
            Notificarme cuando esté listo
          </button>
          <p className="text-xs text-muted-foreground">
            Te enviaremos un aviso cuando esta funcionalidad esté disponible
          </p>
        </div>
      </div>
    </div>
  );
}