"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import podcasts from "@/data/podcasts.json";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function PodcastsSection() {
  return (
    <section className="bg-gray-50 dark:bg-bg-dark py-12">
      <div className="container mx-auto px-6 md:px-8">
        {/* Título */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Nuestros Podcast&apos;s
            </h2>
            <div className="h-1 w-16 bg-primary dark:bg-[var(--accent-b)] mt-2 rounded"></div>
          </div>

          <Link
            href="/podcasts"
            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white 
                       bg-primary dark:bg-[var(--accent-b)] rounded-md shadow hover:opacity-90 
                       transition"
          >
            Todos →
          </Link>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          grabCursor={true}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
          }}
          className="podcasts-swiper"
        >
          {podcasts.map((podcast) => (
            <SwiperSlide key={podcast.id}>
              <Link
                href={podcast.url}
                className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow 
                           hover:shadow-lg transition block h-full"
              >
                <div className="relative w-full h-48">
                  <Image
                      src={podcast.image}
                      alt={podcast.title}
                      fill
                      sizes="(max-width: 640px) 100vw,
                              (max-width: 1024px) 50vw,
                              20vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-800 dark:text-white group-hover:text-primary">
                    {podcast.title}
                  </h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
