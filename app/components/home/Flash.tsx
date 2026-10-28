'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Zap,
  Clock,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';



interface FlashSalesProps {
  products?: any[];
}

export default function FlashSales({ products = [] }: FlashSalesProps) {
  const [countdown, setCountdown] = useState({ hours: 8, minutes: 0, seconds: 0 });

  if (products.length === 0) return null;

  const displayProducts = products.map((p, i) => {
    const oldP = p.oldPrice || p.price * 1.3;
    const newP = p.newPrice || p.price;
    const discountPercent = Math.round(((oldP - newP) / oldP) * 100);
    return {
      id: p.id,
      name: p.name,
      price: newP,
      originalPrice: Math.round(oldP),
      discount: `${discountPercent}% OFF`,
      rating: p.rating || 4.8,
      description: "Exclusive flash sale product offer.",
      category: p.category,
      image: p.image || `/flash${(i % 3) + 1}.jpg`,
      subImages: p.subImages || [],
      colors: p.colors || [],
      sizes: p.sizes || [],
      status: p.status || 'In Stock',
    };
  });

  const [addingId, setAddingId] = React.useState<string | null>(null);

  const handleAddToCart = async (product: any) => {
    if ((product.sizes && product.sizes.length > 0) || (product.colors && product.colors.length > 0) || (product.subImages && product.subImages.length > 0)) {
      window.dispatchEvent(new CustomEvent('show-product-options', {
        detail: { product }
      }));
      return;
    }

    setAddingId(product.id);
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product.id }),
      });
      if (res.status === 401) {
        window.dispatchEvent(new CustomEvent('show-toast', {
          detail: { message: 'Please log in to add items to your cart.', type: 'error' }
        }));
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
        return;
      }
      const data = await res.json();
      if (data.success) {
        window.dispatchEvent(new CustomEvent('show-toast', {
          detail: { message: 'Product added to cart!', type: 'success' }
        }));
        window.dispatchEvent(new CustomEvent('cart-updated'));
      } else {
        window.dispatchEvent(new CustomEvent('show-toast', {
          detail: { message: data.message || 'Failed to add item to cart.', type: 'error' }
        }));
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message: 'An error occurred. Please try again.', type: 'error' }
      }));
    } finally {
      setAddingId(null);
    }
  };

  // Live Countdown Effect
  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(countdownTimer);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, []);

  return (
    <section className="w-full px-6 md:px-12 lg:px-16 py-12 md:py-16 bg-white dark:bg-zinc-955 transition-colors duration-200">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-8">

        {/* Banner Top Info Card */}
        <div className="w-full bg-gradient-to-r from-yellow-500 to-yellow-500 dark:from-violet-900/60 dark:to-indigo-955/60 text-white rounded-3xl p-3 md:p-4 flex md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest bg-red-500 px-3 py-1 rounded-full inline-block">
              Flash Deal
            </span>
            <h2 className="text-lg md:text-2xl font-extrabold tracking-tight leading-tight">
              Low Sales
            </h2>
          </div>

          <div className="flex flex-col items-end shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 dark:text-red-400 block mb-2 font-mono">
              Ending In
            </span>
            <div className="flex items-center gap-2 font-mono font-bold text-lg md:text-2xl">
              <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-red-500">
                {String(countdown.hours).padStart(2, '0')}
              </span>
              <span className="text-white/60 animate-pulse">:</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-red-500">
                {String(countdown.minutes).padStart(2, '0')}
              </span>
              <span className="text-white/60 animate-pulse">:</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-red-500">
                {String(countdown.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Full-width Products Grid */}
       
      </div>
    </section>
  );
}