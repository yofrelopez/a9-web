import Image from 'next/image'
import Link from 'next/link'
import type { NewsItem } from '@/types/news'
import { Calendar, User } from 'lucide-react'

interface NewsCardProps {
    news: NewsItem
    priority?: boolean
}

export default function NewsCard({ news, priority = false }: NewsCardProps) {
    // Formatear fecha
    const formattedDate = new Date(news.publishedAt!).toLocaleDateString('es-PE', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })

    return (
        <article className="group flex flex-col h-full bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
            {/* Image Container */}
            <Link href={`/noticias/${news.slug}`} className="relative aspect-video overflow-hidden">
                <Image
                    src={news.imageUrl!}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={priority}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category Badge */}
                {news.categoryList && news.categoryList.length > 0 && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                        {news.categoryList[0]}
                    </span>
                )}
            </Link>

            {/* Content */}
            <div className="flex-1 p-5 flex flex-col">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 leading-tight group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                    <Link href={`/noticias/${news.slug}`}>
                        {news.title}
                    </Link>
                </h3>

                <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3 mb-4 flex-1">
                    {news.excerpt}
                </p>

                {/* Footer Meta */}
                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                    <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{news.authorName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <time>{formattedDate}</time>
                    </div>
                </div>
            </div>
        </article>
    )
}
