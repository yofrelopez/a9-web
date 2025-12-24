import { getNewsBySlug, getNews } from '@/lib/payload-api'
import type { NewsListResponse, NewsItem } from '@/types/news'
import RichTextParser from '@/components/news/RichTextParser'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Calendar, User, Clock, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export const revalidate = 60 // ISR

export async function generateStaticParams() {
  const result: NewsListResponse = await getNews({ limit: 50 })
  const news = result.docs
  return news.map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const news: NewsItem | null = await getNewsBySlug(slug)

  if (!news) {
    return {
      title: 'Noticia no encontrada',
    }
  }

  return {
    title: `${news.title} | Antena 9 News`,
    description: news.excerpt,
    openGraph: {
      images: [news.imageUrl!],
    },
  }
}

export default async function NewsDetailPage({ params }: Props) {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const news: NewsItem | null = await getNewsBySlug(slug)

  if (!news) {
    notFound()
  }

  const formattedDate = new Date(news.publishedAt!).toLocaleDateString('es-PE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="bg-white dark:bg-black min-h-screen pb-20">

      {/* Hero Header */}
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <Image
          src={news.imageUrl!}
          alt={news.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 container mx-auto">
          <Link
            href="/noticias"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm font-medium transition-colors bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full"
          >
            <ChevronLeft size={16} className="mr-1" />
            Volver a Noticias
          </Link>

          {/* Badges */}
          <div className="flex gap-2 mb-4">
            {news.categoryList?.map((cat: string) => (
              <span key={cat} className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded uppercase tracking-wider">
                {cat}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 max-w-4xl shadow-black drop-shadow-lg">
            {news.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base font-medium">
            <div className="flex items-center gap-2">
              <User className="text-red-500" />
              <span>{news.authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="text-red-500" />
              <span className="capitalize">{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800">
          {/* Excerpt */}
          <p className="text-xl md:text-2xl font-serif text-zinc-700 dark:text-zinc-300 italic mb-8 leading-relaxed border-l-4 border-red-600 pl-6 py-2">
            {news.excerpt}
          </p>

          <hr className="my-8 border-zinc-200 dark:border-zinc-800" />

          {/* Rich Content */}
          <RichTextParser content={news.content} />
        </div>
      </div>

    </div>
  )
}
