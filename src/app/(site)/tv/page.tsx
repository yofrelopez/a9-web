import TvSection from "@/components/home/TvSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "TV En Vivo | Antena 9",
    description: "Disfruta de la señal en vivo de Antena 9 TV. Noticias, música y entretenimiento las 24 horas.",
};

export default function TvPage() {
    return (
        <main className="pt-20 min-h-screen bg-bg-dark">
            <TvSection />

            {/* Placeholder for future programming schedule or related content */}
            <div className="container mx-auto px-4 py-12 text-center text-gray-500">
                <p>Más contenido próximamente...</p>
            </div>
        </main>
    );
}
