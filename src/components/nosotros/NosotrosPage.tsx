// components/nosotros/NosotrosPage.tsx
import NosotrosHero from "./NosotrosHero";
import MisionVisionValores from "./MisionVisionValores";
import LogrosSection from "./LogrosSection";
import StatsSection from "./StatsSection";

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <NosotrosHero />
      
      {/* Main Content */}
      <div className="container mx-auto px-6 space-y-20 py-16">
        {/* Misión, Visión, Valores */}
        <MisionVisionValores />
        
        {/* Logros */}
        <LogrosSection />
        
        {/* Estadísticas */}
        <StatsSection />
      </div>
    </div>
  );
}