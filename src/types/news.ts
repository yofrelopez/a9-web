import type { News, Category, User, Media } from '@/payload-types'

export interface NewsItem extends Omit<News, 'featuredImage' | 'author' | 'categories'> {
    featuredImage: Media | number
    author: User | number
    categories?: (Category | number)[] | null
    // Helper para facilitar el acceso a la URL de la imagen si está populada
    imageUrl?: string
    // Helper para el nombre del autor
    authorName?: string
    // Helper para nombres de categorías
    categoryList?: string[]
}

export interface NewsListResponse {
    docs: NewsItem[]
    hasNextPage: boolean
    hasPrevPage: boolean
    limit: number
    nextPage?: number | null
    page?: number
    pagingCounter: number
    prevPage?: number | null
    totalDocs: number
    totalPages: number
}
