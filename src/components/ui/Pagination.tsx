import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaginationProps {
    currentPage: number
    totalPages: number
    baseUrl: string
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
    // Logic to determine visible page numbers (sliding window or simple range)
    // For simplicity and typical use cases, we show all if <= 7, otherwise smart truncation
    // But let's start with a solid simple version that is robust.

    const getPageNumbers = () => {
        const pages = []
        const maxVisiblePages = 5

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Always show first, last, and around current
            // [1] ... [4] [5] [6] ... [10]
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i)
                pages.push('...')
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1)
                pages.push('...')
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
            } else {
                pages.push(1)
                pages.push('...')
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
                pages.push('...')
                pages.push(totalPages)
            }
        }
        return pages
    }

    if (totalPages <= 1) return null

    const pages = getPageNumbers()

    return (
        <div className="flex justify-center items-center gap-2 mt-12 mb-8">
            {/* Previous Button */}
            {currentPage > 1 ? (
                <Link
                    href={`${baseUrl}?page=${currentPage - 1}`}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-200 group"
                    aria-label="Anterior"
                >
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </Link>
            ) : (
                <span className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-100 dark:border-zinc-800 text-zinc-300 dark:text-zinc-700 cursor-not-allowed">
                    <ChevronLeft className="w-5 h-5" />
                </span>
            )}

            {/* Page Numbers */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 px-1.5 py-1 rounded-full border border-zinc-100 dark:border-zinc-800 shadow-sm">
                {pages.map((page, idx) => {
                    if (page === '...') {
                        return (
                            <span key={`dots-${idx}`} className="w-8 text-center text-zinc-400 text-sm">
                                ...
                            </span>
                        )
                    }

                    const isCurrent = page === currentPage

                    return (
                        <Link
                            key={page}
                            href={`${baseUrl}?page=${page}`}
                            className={cn(
                                "flex items-center justify-center w-9 h-9 text-sm font-bold rounded-full transition-all duration-200",
                                isCurrent
                                    ? "bg-accent text-white shadow-md shadow-accent/25 scale-105"
                                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-primary"
                            )}
                        >
                            {page}
                        </Link>
                    )
                })}
            </div>

            {/* Next Button */}
            {currentPage < totalPages ? (
                <Link
                    href={`${baseUrl}?page=${currentPage + 1}`}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-200 group"
                    aria-label="Siguiente"
                >
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
            ) : (
                <span className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-100 dark:border-zinc-800 text-zinc-300 dark:text-zinc-700 cursor-not-allowed">
                    <ChevronRight className="w-5 h-5" />
                </span>
            )}
        </div>
    )
}
