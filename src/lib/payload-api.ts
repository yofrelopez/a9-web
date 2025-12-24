import { getPayload, Where } from 'payload'
import config from '@payload-config'
import type { NewsItem, NewsListResponse } from '@/types/news'
import type { Category } from '@/payload-types'

// Cliente Singleton para reusar la instancia
const getPayloadClient = async () => {
    return await getPayload({ config })
}

/**
 * Obtiene lista de noticias con filtros y paginación
 * Usa Local API para máxima velocidad (Server Components)
 */
export async function getNews(params: {
    limit?: number
    page?: number
    featured?: boolean
    categorySlug?: string
} = {}): Promise<NewsListResponse> {
    const payload = await getPayloadClient()
    const { limit = 10, page = 1, featured, categorySlug } = params

    const where: Where = {
        status: {
            equals: 'published',
        },
    }

    if (typeof featured === 'boolean') {
        where.featured = {
            equals: featured,
        }
    }

    if (categorySlug) {
        // Primero buscamos la categoría por slug para obtener su ID
        const categories = await payload.find({
            collection: 'categories',
            where: {
                slug: {
                    equals: categorySlug,
                },
            },
        })

        if (categories.docs.length > 0) {
            where.categories = {
                contains: categories.docs[0].id,
            }
        } else {
            // Si la categoría no existe, retornamos lista vacía o manejamos error
            return {
                docs: [],
                hasNextPage: false,
                hasPrevPage: false,
                limit,
                pagingCounter: 0,
                totalDocs: 0,
                totalPages: 0,
            }
        }
    }

    const result = await payload.find({
        collection: 'news',
        limit,
        page,
        sort: '-publishedAt', // Más recientes primero
        where,
        depth: 2, // Populate relacion (imagen, autor, categorias)
    }) as unknown as NewsListResponse

    // Transformación ligera para facilitar uso en frontend
    const docs = result.docs.map(transformNewsItem)

    return {
        ...result,
        docs,
    }
}

/**
 * Obtiene una noticia individual por Slug
 */
export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
    const payload = await getPayloadClient()

    const result = await payload.find({
        collection: 'news',
        where: {
            slug: {
                equals: slug,
            },
            status: {
                equals: 'published',
            },
        },
        limit: 1,
        depth: 2,
    })

    if (!result.docs || result.docs.length === 0) {
        return null
    }

    return transformNewsItem(result.docs[0] as unknown as NewsItem)
}

/**
 * Helper para normalizar datos (URLs de imágenes, nombres, etc)
 */
function transformNewsItem(item: NewsItem): NewsItem {
    // Manejo seguro de imagen con Fallback Robusto
    const media = item.featuredImage
    let imageUrl = '/images/placeholder.jpg'

    if (media && typeof media === 'object' && 'url' in media && media.url) {
        imageUrl = media.url
    } else {
        // FALLBACK TEMPORAL PARA DESARROLLO
        const seed = item.id || 'default'
        imageUrl = `https://picsum.photos/seed/${seed}/800/600`
    }

    // Manejo seguro de autor
    const author = item.author
    const authorName = (author && typeof author === 'object')
        ? `${author.firstName || ''} ${author.lastName || ''}`.trim()
        : 'Redacción'

    // Manejo de categorías
    const categories = Array.isArray(item.categories)
        ? item.categories
            .filter((cat): cat is Category => typeof cat === 'object')
            .map((cat) => cat.name)
            .filter((name): name is string => typeof name === 'string')
        : []

    return {
        ...item,
        imageUrl,
        authorName,
        categoryList: categories,
    }
}
