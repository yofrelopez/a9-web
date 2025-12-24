// app/nosotros/page.tsx
import NosotrosPage from "@/components/nosotros/NosotrosPage";

export const metadata = {
  title: "Nosotros - Radio Antena Nueve | Historia y Misión 95.9 FM Barranca",
  description: "Conoce la historia, misión, visión y valores de Radio Antena Nueve. 15+ años siendo la señal que manda desde Barranca con 50K+ oyentes diarios y cobertura regional 100%.",
  keywords: ["historia radio antena nueve", "misión radio Barranca", "radio 15 años experiencia", "50k oyentes diarios", "cobertura regional", "valores radio"],
  openGraph: {
    title: "Nosotros - Radio Antena Nueve | Historia y Misión 95.9 FM Barranca",
    description: "Conoce la historia, misión, visión y valores de Radio Antena Nueve. 15+ años siendo la señal que manda desde Barranca.",
    url: "https://a9-web.vercel.app/nosotros",
    images: [
      {
        url: "https://a9-web.vercel.app/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Nosotros Radio Antena Nueve - Historia y Misión",
      },
    ],
  },
  twitter: {
    title: "Nosotros - Radio Antena Nueve | Historia y Misión 95.9 FM Barranca",
    description: "Conoce la historia, misión, visión y valores de Radio Antena Nueve. 15+ años siendo la señal que manda desde Barranca.",
    images: ["https://a9-web.vercel.app/preview.jpg"],
  },
  alternates: {
    canonical: "https://a9-web.vercel.app/nosotros",
  },
};

export default function Nosotros() {
  return <NosotrosPage />;
}