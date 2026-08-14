import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const STATIC_PROMOS = [
  {
    title: "All Sunglasses Collection",
    subtitle: "Explore our complete range of premium sunglasses and frames.",
    badge: "Full Catalog",
    image: "/promo1.jpg",
    link: "/category/all-sunglasses",
    cta: "Explore All",
    accentText: "text-amber-400"
  },
  {
    title: "Women's Sunglasses",
    subtitle: "Chic cat-eye, oversized, and classic women's frames.",
    badge: "Trending Now",
    image: "/promo2.webp",
    link: "/category/womens-sunglasses",
    cta: "Shop Women's",
    accentText: "text-emerald-400"
  },
  {
    title: "Men's Sunglasses",
    subtitle: "Durable aviators, square frames, and modern men's shades.",
    badge: "Essential Edit",
    image: "/promo3.webp",
    link: "/category/mens-sunglasses",
    cta: "Shop Men's",
    accentText: "text-violet-400"
  },
  {
    title: "New Arrivals",
    subtitle: "Fresh seasonal drops and latest designer frame arrivals.",
    badge: "New Release",
    image: "/promo4.webp",
    link: "/category/new-arrivals",
    cta: "Shop New",
    accentText: "text-amber-400"
  },
  {
    title: "Bestsellers",
    subtitle: "Our top-rated and most popular sunglasses of the season.",
    badge: "Top Rated",
    image: "/promo5.webp",
    link: "/category/bestsellers",
    cta: "Shop Favorites",
    accentText: "text-emerald-400"
  },
  {
    title: "Polarized Lenses",
    subtitle: "Anti-glare, high-definition clarity polarized optics.",
    badge: "Optics Grade",
    image: "/promo6.webp",
    link: "/category/polarized",
    cta: "Shop Polarized",
    accentText: "text-violet-400"
  },
  {
    title: "Eyewear Accessories",
    subtitle: "Cases, cleaning kits, chains, and care accessories.",
    badge: "Essentials",
    image: "/promo7.webp",
    link: "/category/accessories",
    cta: "Shop Accessories",
    accentText: "text-emerald-400"
  }
];

export default function Promo() {
  const displayPromos = STATIC_PROMOS;

  return (
    <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-1 mt-10 md:mt-14">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-4 flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Exclusive Promotions
          </h2>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Carefully curated collections with limited-time offers.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-zinc-500">
          <span>Swipe or Scroll</span>
          <ArrowRight size={14} className="text-zinc-400" />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        className="w-full overflow-x-auto pb-6 pt-2 no-scrollbar scroll-smooth snap-x snap-mandatory flex gap-6"
      >
        {displayPromos.map((promo, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.4) }}
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="snap-start flex-shrink-0"
          >
            <Link 
              href={promo.link}
              className="w-[320px] md:w-[250px] h-[220px] md:h-[230px] group relative rounded-3xl overflow-hidden shadow-sm block cursor-pointer"
            >
              {/* Background Image with Auto-Floating/Bouncing Effect */}
              <motion.img 
                src={promo.image} 
                alt={promo.title}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 2.5 + (idx % 3) * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-x-0 w-full h-[110%] -top-2.5 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-300" />
              
              {/* Promo Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${promo.accentText} mb-1.5`}>
                  {promo.badge}
                </span>
                <h3 className="text-lg md:text-xl font-bold tracking-tight mb-0.5 leading-snug">
                  {promo.title}
                </h3>
                <p className="text-xs text-zinc-300 mb-3 max-w-[240px] md:max-w-xs line-clamp-2 leading-relaxed">
                  {promo.subtitle}
                </p>
                <div className="inline-flex items-center gap-1 font-semibold text-xs text-white group-hover:gap-2 transition-all duration-150">
                  <span>{promo.cta}</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}