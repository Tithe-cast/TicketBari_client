"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "By road",
    title: "Every highway, one ticket window",
    subtitle: "Compare AC, non-AC, and sleeper buses across 200+ routes.",
  },
  {
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "By rail",
    title: "Book your berth before the queue forms",
    subtitle: "Real-time seat counts straight from the operator.",
  },
  {
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "By air & water",
    title: "Flights and launches, side by side",
    subtitle: "Find the fastest or the cheapest — your call.",
  },
];

const Banner = () => {
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="h-[480px] md:h-[560px]"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="relative flex h-full items-center"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(15,27,61,0.92) 0%, rgba(15,27,61,0.55) 55%, rgba(15,27,61,0.25) 100%), url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="mx-auto w-full max-w-7xl px-4">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="max-w-xl text-paper-cream"
                >
                  <span className="font-ticket text-xs uppercase tracking-[0.25em] text-ticket-amber">
                    {slide.eyebrow}
                  </span>
                  <h1 className="font-display mt-3 text-3xl font-bold leading-tight md:text-5xl">
                    {slide.title}
                  </h1>
                  <p className="mt-4 text-base text-paper-cream/80 md:text-lg">{slide.subtitle}</p>
                  <Link href="/all-tickets" className="btn btn-primary mt-6 gap-2 font-display">
                    <FiSearch /> Browse tickets
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="route-line absolute inset-x-0 bottom-0 h-[3px] text-ticket-amber" />
    </div>
  );
};

export default Banner;
