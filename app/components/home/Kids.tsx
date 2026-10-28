'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface KidsProps {
  products?: any[];
}

export default function Kids({ products = [] }: KidsProps) {
  return (
    <section className="w-full relative overflow-hidden mt-10 md:mt-1">
      {/* Kids Collection Full-Width Banner */}
      <div className="relative w-full h-[360px] sm:h-[420px] md:h-[900px] overflow-hidden select-none bg-zinc-100 dark:bg-zinc-900 group">
        {/* Background Image */}
        <img
          src="/kids-banner.jpg"
          alt="Kids Collection - Vastistore"
          className="w-full h-full object-cover object-[center_32%] sm:object-[center_28%] md:object-center transition-transform duration-700 ease-out group-hover:scale-102"
        />

        {/* Soft Contrast Overlay to ensure perfect text readability */}
        <div className="absolute inset-0 bg-white/10 dark:bg-black/10 pointer-events-none" />

        {/* Centered Content: Title, Subtitle, and SHOP Button */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 sm:p-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center max-w-3xl mx-auto"
          >
            {/* Bold Vibrant Red Headline */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase text-[#EA3829] leading-none drop-shadow-sm">
              KIDS COLLECTION
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base font-semibold text-zinc-900 dark:text-zinc-900 max-w-xl text-center px-4 mt-2.5 sm:mt-3 leading-snug drop-shadow-sm">
              Roll out to recess in the hottest styles which also includes blue light filter
            </p>

            {/* SHOP Button */}
            <div className="mt-4 sm:mt-6">
              <Link
                href="/category/all-sunglasses"
                className="inline-block bg-white hover:bg-zinc-100 active:bg-zinc-200 text-zinc-950 font-extrabold text-xs sm:text-sm tracking-[0.25em] uppercase px-8 sm:px-10 py-2.5 sm:py-3 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                SHOP
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Optional Products Grid if kid products are provided */}
      {products && products.length > 0 && (
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 mt-8 md:mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden p-3 transition-all duration-200 hover:shadow-md"
              >
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-800 mb-3">
                  <img
                    src={p.image || '/logo.png'}
                    alt={p.name}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 truncate">
                  {p.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  GHS {p.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
