import { getNews } from '@/lib/payload-api'
import NewsCard from '@/components/news/NewsCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Noticias | Radio Antena 9',
  description: 'Últimas noticias y actualidad de Soritor y el Alto Mayo.',
}

export const revalidate = 60 // ISR: Revalidar cada minuto

import { Pagination } from '@/components/ui/Pagination'

export default async function NewsIndexPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const currentPage = Number(searchParams.page) || 1
  const { docs: news, totalPages } = await getNews({
    limit: 12,
    page: currentPage
  })

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="inline-block py-1 px-3 mb-4 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide uppercase border border-primary/20">
            Actualidad
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
            Noticias <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Antena 9</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Cobertura periodística <span className="text-gray-900 dark:text-white font-semibold">Nacional, Regional y Local</span>. Todo lo que acontece en <span className="text-gray-900 dark:text-white font-semibold">Barranca</span> y la región <span className="text-gray-900 dark:text-white font-semibold">Lima</span>.
          </p>
        </div>

        {/* Grid */}
        {news.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {news.map((item, index) => (
                <NewsCard key={item.id} news={item} priority={index < 3} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl="/noticias"
            />
          </>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <p className="text-xl text-zinc-500">No hay noticias publicadas en este momento.</p>
          </div>
        )}

      </div>
    </div>
  )
}
