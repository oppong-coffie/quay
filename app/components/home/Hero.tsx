'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CAROUSEL_SLIDES = [
  {
    topTag: "MENS",
    title: "NEW ARRIVALS",
    subtitle: "The freshest styles your closet needs from our men's new collection",
    cta: "SHOP NOW",
    link: "/category/new-arrivals",
    image: "/hero1.jpg",
  },
  {
    topTag: "WOMENS",
    title: "CHIC ESSENTIALS",
    subtitle: "Timeless silhouettes and statement frames designed to elevate your everyday look",
    cta: "SHOP NOW",
    link: "/category/womens-sunglasses",
    image: "/hero2.jpg",
  },
  {
    topTag: "POLARIZED",
    title: "PRECISION OPTICS",
    subtitle: "High-definition clarity, vivid contrast, and glare-free comfort under the sun",
    cta: "SHOP NOW",
    link: "/category/polarized",
    image: "/hero3.jpg",
  },
  {
    topTag: "BESTSELLERS",
    title: "ICONIC FRAMES",
    subtitle: "Our most coveted luxury shapes and modern bestsellers back in stock",
    cta: "SHOP NOW",
    link: "/category/bestsellers",
    image: "/home2.webp",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play Carousel Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const activeSlide = CAROUSEL_SLIDES[currentSlide];

  return (
    <section className="relative w-full h-[calc(100vh-64px)] min-h-[580px] max-h-[1050px] overflow-hidden select-none bg-zinc-950">
      {/* Background Images with smooth crossfade */}
      {CAROUSEL_SLIDES.map((slide, idx) => {
        const isActive = idx === currentSlide;
        return (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-0" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover object-center transition-transform duration-[10000ms] ease-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
            />
            {/* Cinematic Gradient Overlays for optimal text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/35" />
          </div>
        );
      })}

      {/* Hero Content Overlay: Top Label, Center Title/Subtitle/Button, Bottom Dots */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center py-8 sm:py-12 md:py-14 px-4 text-center pointer-events-none">
        
        {/* Top Collection/Category Tag */}
        <div className="min-h-[28px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={`tag-${currentSlide}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4 }}
              className="text-xs sm:text-sm font-light tracking-[0.35em] uppercase text-white/90 drop-shadow-md"
            >
              {activeSlide.topTag}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Center Title, Subtitle, and Call to Action */}
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto space-y-3 sm:space-y-4 my-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center space-y-3 sm:space-y-4"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase text-white drop-shadow-xl leading-none">
                {activeSlide.title}
              </h1>

              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/95 font-normal tracking-wide max-w-2xl drop-shadow-md leading-relaxed">
                {activeSlide.subtitle}
              </p>

              <div className="pt-3 sm:pt-5 pointer-events-auto">
                <Link
                  href={activeSlide.link}
                  className="inline-block bg-white hover:bg-zinc-100 active:bg-zinc-200 text-zinc-950 font-bold text-xs sm:text-sm tracking-[0.2em] uppercase px-8 sm:px-10 py-3.5 sm:py-4 transition-all duration-200 shadow-2xl hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {activeSlide.cta}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Carousel Dot / Bar Indicators */}
        <div className="flex items-center gap-2 pointer-events-auto pb-2">
          {CAROUSEL_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide
                  ? "bg-white w-8 shadow-sm"
                  : "bg-white/40 hover:bg-white/70 w-3"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Subtle Left and Right Arrows on Edges */}
      <button
        onClick={handlePrevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white/75 hover:text-white transition-all duration-200 z-20 cursor-pointer hover:scale-110 drop-shadow-lg"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-7 h-7 sm:w-9 sm:h-9 stroke-[1.5]" />
      </button>

      <button
        onClick={handleNextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white/75 hover:text-white transition-all duration-200 z-20 cursor-pointer hover:scale-110 drop-shadow-lg"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-7 h-7 sm:w-9 sm:h-9 stroke-[1.5]" />
      </button>
    </section>
  );
}