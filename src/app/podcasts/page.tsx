// app/podcasts/page.tsx
import PodcastsPageContent from "@/components/podcasts/PodcastsPageContent";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Todos los Podcasts - Radio Antena 9',
  description: 'Descubre todos nuestros programas de radio. La mejor programación de noticias, análisis político y entretenimiento desde Barranca, Perú.',
  keywords: ['radio', 'podcasts', 'programas', 'noticias', 'Barranca', 'Perú', 'análisis político'],
};

export default function PodcastsPage() {
  return <PodcastsPageContent />;
}