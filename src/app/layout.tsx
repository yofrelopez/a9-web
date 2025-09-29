// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Player from "@/components/layout/Player";


export const metadata: Metadata = {
  title: "Antena Nueve — Señal que manda",
  description: "Radio Antena Nueve 95.9 FM Barranca. Transmisión en vivo, noticias, programación, podcasts.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="font-sans bg-bg-light text-ink dark:bg-bg-dark dark:text-white min-h-screen flex flex-col transition-colors duration-300">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Player />
      </body>
    </html>
  );
}
