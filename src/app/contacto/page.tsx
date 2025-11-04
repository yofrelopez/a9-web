// app/contacto/page.tsx
import ContactPage from "@/components/contact/ContactPage";

export const metadata = {
  title: "Contacto - Radio Antena Nueve | Contáctanos 95.9 FM Barranca",
  description: "Ponte en contacto con Radio Antena Nueve. WhatsApp, teléfono, email y ubicación en Barranca. Noticias: 993 250 932, Publicidad: 923 419 162, Administración: 906 477 442.",
  keywords: ["contacto radio antena nueve", "WhatsApp radio Barranca", "teléfono radio 95.9", "ubicación radio Barranca", "noticias WhatsApp", "publicidad radio"],
  openGraph: {
    title: "Contacto - Radio Antena Nueve | Contáctanos 95.9 FM Barranca",
    description: "Ponte en contacto con Radio Antena Nueve. WhatsApp, teléfono, email y ubicación en Barranca.",
    url: "https://a9-web.vercel.app/contacto",
    images: [
      {
        url: "https://a9-web.vercel.app/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Contacto Radio Antena Nueve - Barranca",
      },
    ],
  },
  twitter: {
    title: "Contacto - Radio Antena Nueve | Contáctanos 95.9 FM Barranca",
    description: "Ponte en contacto con Radio Antena Nueve. WhatsApp, teléfono, email y ubicación en Barranca.",
    images: ["https://a9-web.vercel.app/preview.jpg"],
  },
  alternates: {
    canonical: "https://a9-web.vercel.app/contacto",
  },
};

export default function Contacto() {
  return <ContactPage />;
}