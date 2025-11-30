import HeroSlider from "@/components/home/HeroSlider";
import PodcastsSection from "@/components/home/PodcastsSection";
import TvSection from "@/components/home/TvSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main>
        <HeroSlider />
        <TvSection />
        <PodcastsSection />


      </main>


    </div>
  );
}
