import { getNews } from "@/lib/payload-api";
import NewsCard from "@/components/news/NewsCard";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";

export default async function LatestNews() {
    const { docs: news } = await getNews({ limit: 3 });

    if (!news || news.length === 0) return null;

    return (
        <section className="py-16 md:py-24 bg-zinc-50 dark:bg-zinc-900/50 relative overflow-hidden">
            {/* Decoración de fondo sutil */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent"></div>

            <div className="container mx-auto px-4">
                {/* Header de Sección */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                        <span className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-2">
                            <Newspaper className="w-4 h-4" />
                            Actualidad
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
                            Últimas <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Noticias</span>
                        </h2>
                    </div>

                    <Link
                        href="/noticias"
                        className="group flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary font-medium transition-colors"
                    >
                        Ver todas las noticias
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Grid de Noticias */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.map((item, index) => (
                        <NewsCard key={item.id} news={item} priority={index === 0} />
                    ))}
                </div>

                {/* Botón Móvil (visible solo en móviles si se prefiere énfasis) */}
                <div className="mt-8 text-center md:hidden">
                    <Link href="/noticias" className="btn btn-live w-full justify-center">
                        Ver todas
                    </Link>
                </div>
            </div>
        </section>
    );
}
