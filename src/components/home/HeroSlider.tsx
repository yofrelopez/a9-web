"use client";

import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination, Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; 

import slides from "@/data/slides.json";

type Slide = {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  cta?: { label: string; href: string };
  position?: "left" | "center" | "right";
};

const posToClass = (pos: Slide["position"]) => {
  switch (pos) {
    case "left":
      return "items-start text-left";
    case "right":
      return "items-end text-right";
    default:
      return "items-center text-center";
  }
};

export default function HeroSlider() {
  return (
    <section aria-label="Destacados" className="relative overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, A11y]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}

        /* 👇 Navegación: OFF por defecto (mobile) */
        navigation={{ enabled: false }}

        /* 👇 A partir de 768px, ON */
        breakpoints={{
            768: {
            navigation: { enabled: true },
            },
        }}

        /* 👇 Tamaño de flechas fiable (override inline) */
        style={
            {
            // Puedes subir/bajar el tamaño aquí (px)
            "--swiper-navigation-size": "22px",
            // Si quisieras fijar color inline (ya lo tienes por CSS variables):
            // "--swiper-navigation-color": "var(--primary)",
            } as React.CSSProperties
        }

          className={`h-[52vh] md:h-[64vh] xl:h-[76vh] max-h-[600px]
              [--swiper-navigation-color:var(--accent)]
              dark:[--swiper-navigation-color:var(--accent-b)]`}
        >

        {(slides as Slide[]).map((s, idx) => (
          <SwiperSlide key={s.id}>
            <div className="relative w-full h-full">
              <Image
                src={s.image}
                alt={s.title}
                fill
                priority={idx === 0}            /* Solo primer slide con prioridad */
                className="object-cover object-[70%_50%] md:object-center"
                sizes="(max-width: 768px) 100vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent dark:from-black/70 dark:via-black/40"></div>
              <div className={`absolute inset-0 flex ${posToClass(s.position)}`}>
                <div className="container mx-auto px-6 md:px-8 my-auto flex flex-col gap-3 md:gap-4">
                  <h2 className="font-heading font-bold text-white leading-tight text-2xl sm:text-3xl md:text-5xl">
                    {s.title}
                  </h2>
                  {s.subtitle && (
                    <p className="text-white/90 text-sm md:text-lg max-w-3xl">
                      {s.subtitle}
                    </p>
                  )}
                  {s.cta && (
                    <div className="mt-2">
                      <Link href={s.cta.href} className="btn btn-live text-sm md:text-base">
                        {s.cta.label}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
