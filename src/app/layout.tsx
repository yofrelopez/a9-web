// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import ClientRadioPlayer from "@/components/layout/ClientRadioPlayer";
import MobileMenuOverlay from "@/components/layout/MobileMenuOverlay";
import { RadioPlayerProvider } from "@/hooks/useRadioPlayer";


export const metadata: Metadata = {
  title: "Radio Antena Nueve — Señal que manda | 95.9 FM Barranca",
  description: "Radio Antena Nueve 95.9 FM, la señal que manda desde Barranca. Transmisión en vivo 24/7, noticias locales, programación variada y música. Tu radio de confianza en Lima Norte.",
  keywords: ["radio", "antena nueve", "95.9 FM", "Barranca", "noticias", "música", "programación en vivo", "Lima Norte", "radio online"],
  authors: [{ name: "Radio Antena Nueve" }],
  creator: "Radio Antena Nueve",
  publisher: "Radio Antena Nueve",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://a9-web.vercel.app/",
    title: "Radio Antena Nueve — Señal que manda | 95.9 FM Barranca",
    description: "Radio Antena Nueve 95.9 FM, la señal que manda desde Barranca. Transmisión en vivo 24/7, noticias locales y música.",
    siteName: "Radio Antena Nueve",
    images: [
      {
        url: "https://a9-web.vercel.app/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Radio Antena Nueve - Señal que manda desde Barranca",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Radio Antena Nueve — Señal que manda | 95.9 FM Barranca",
    description: "Radio Antena Nueve 95.9 FM, la señal que manda desde Barranca. Transmisión en vivo 24/7, noticias locales y música.",
    images: ["https://a9-web.vercel.app/preview.jpg"],
    creator: "@antena9pe",
  },
  verification: {
    google: "verification-code-here", // Reemplazar con código real
  },
  alternates: {
    canonical: "https://a9-web.vercel.app/",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="font-sans bg-bg-light text-ink dark:bg-bg-dark dark:text-white min-h-screen flex flex-col transition-colors duration-300">
        <RadioPlayerProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <Footer />
          <ClientRadioPlayer />
          <MobileMenuOverlay />
        </RadioPlayerProvider>
      </body>
    </html>
  );
}
