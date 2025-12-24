import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import podcasts from '@/data/podcasts.json';
import PodcastDetailView from '@/components/podcasts/PodcastDetailView';

type Props = {
  params: Promise<{ slug: string }>;
};

// Generar parámetros estáticos para todas las rutas de podcasts
export function generateStaticParams() {
  return podcasts.map((podcast) => ({
    slug: podcast.id,
  }));
}

// Generar metadata dinámica para SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const podcast = podcasts.find((p) => p.id === slug);

  if (!podcast) {
    return {
      title: 'Podcast no encontrado - Radio Antena Nueve',
    };
  }

  return {
    title: `${podcast.title} - Radio Antena Nueve 95.9 FM`,
    description: podcast.description,
    openGraph: {
      title: podcast.title,
      description: podcast.description,
      images: [
        {
          url: podcast.image,
          alt: podcast.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: podcast.title,
      description: podcast.description,
      images: [podcast.image],
    },
  };
}

export default async function PodcastPage({ params }: Props) {
  const { slug } = await params;
  const podcast = podcasts.find((p) => p.id === slug);

  if (!podcast) {
    notFound();
  }

  return <PodcastDetailView podcast={podcast} />;
}