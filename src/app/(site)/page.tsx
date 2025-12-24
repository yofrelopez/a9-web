import HeroSlider from "@/components/home/HeroSlider";
import TvSection from "@/components/home/TvSection";
import PodcastsSection from "@/components/home/PodcastsSection";
import LatestNews from "@/components/home/LatestNews";

export default function Home() {
  return (
    <div>
      <main>
        <HeroSlider />
        <LatestNews />
        <TvSection />
        <PodcastsSection />


      </main>


    </div>
  );
}
