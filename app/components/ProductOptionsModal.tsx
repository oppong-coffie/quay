'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  price: number;
  rating?: number;
  category: string;
  image?: string;
  subImages?: string[];
  description?: string;
  colors?: string[];
  sizes?: string[];
  status?: string;
}

export default function ProductOptionsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const customEvent = event as CustomEvent<{ product: ProductItem }>;
      if (customEvent.detail && customEvent.detail.product) {
        const prod = customEvent.detail.product;
        setProduct(prod);
        setActiveImage(prod.image || '/featured1.jpg');
        // Set default selections
        setSelectedColor(prod.colors && prod.colors.length > 0 ? prod.colors[0] : '');
        setSelectedSize(prod.sizes && prod.sizes.length > 0 ? prod.sizes[0] : '');
        setIsOpen(true);
      }
    };

    window.addEventListener('show-product-options' as any, handleOpen);
    return () => {
      window.removeEventListener('show-product-options' as any, handleOpen);
    };
  }, []);

  const handleAddToCart = async () => {
    if (!product) return;

    setIsAdding(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          size: selectedSize || undefined,
          color: selectedColor || undefined
        }),
      });

      if (res.status === 401) {
        window.dispatchEvent(new CustomEvent('show-toast', {
          detail: { message: 'Please log in to add items to your cart.', type: 'error' }
        }));
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
        setIsOpen(false);
        return;
      }

      const data = await res.json();
      if (data.success) {
        window.dispatchEvent(new CustomEvent('show-toast', {
          detail: { message: 'Product added to cart!', type: 'success' }
        }));
        window.dispatchEvent(new CustomEvent('cart-updated'));
        setIsOpen(false);
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
      setIsAdding(false);
    }
  };

  if (!product) return null;

  const hasColors = product.colors && product.colors.length > 0;
  const hasSizes = product.sizes && product.sizes.length > 0;

  const allImages = [
    ...(product.image ? [product.image] : []),
    ...(product.subImages || [])
  ].filter((v, i, a) => a.indexOf(v) === i);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 text-left relative max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 dark:text-zinc-500 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight pr-6">
              Product Details & Options
            </h3>
            <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-1 mb-4">
              View images and customize options for this item.
            </p>

            {/* Product Preview Main Box */}
            <div className="flex gap-4 p-3 bg-zinc-50 dark:bg-zinc-950/40 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/40 mb-3">
              <div className="relative aspect-[3/4] w-20 rounded-xl overflow-hidden bg-zinc-150 dark:bg-zinc-900 border border-zinc-200/20 dark:border-zinc-800/20 shrink-0">
                <img
                  src={activeImage || product.image || `/featured1.jpg`}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-200"
                />
              </div>
              <div className="flex flex-col justify-center min-w-0 gap-1">
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50 truncate">
                  {product.name}
                </h4>
                <p className="font-extrabold text-xs text-zinc-700 dark:text-zinc-300">
                  GHS {product.price}
                </p>
                {product.description && (
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2">
                    {product.description}
                  </p>
                )}
                {product.status && (
                  <span className={`self-start text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border mt-1 ${product.status === 'Out Of Stock'
                      ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400'
                      : product.status === 'Few Left'
                        ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50 text-amber-600 dark:text-amber-400'
                        : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400'
                    }`}>
                    {product.status}
                  </span>
                )}
              </div>
            </div>

            {/* Sub-Images Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="space-y-1.5 mb-5">
                <span className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider block">
                  Product Gallery & Sub-Images ({allImages.length})
                </span>
                <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
                  {allImages.map((imgUrl, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveImage(imgUrl)}
                      className={`relative w-12 h-14 rounded-xl overflow-hidden border-2 transition cursor-pointer shrink-0 ${activeImage === imgUrl
                          ? 'border-yellow-500 ring-2 ring-yellow-500/30'
                          : 'border-zinc-200 dark:border-zinc-800 opacity-75 hover:opacity-100'
                        }`}
                    >
                      <img src={imgUrl} alt={`${product.name} image ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Options Selection */}
            <div className="space-y-4 mb-6">
              {/* Colors */}
              {hasColors && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider block">
                    Available Colors
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.colors!.map((color) => {
                      const isSelected = selectedColor === color;
                      return (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${isSelected
                              ? 'bg-yellow-50 dark:bg-yellow-955/20 border-yellow-500 text-yellow-700 dark:text-yellow-400 font-bold'
                              : 'bg-zinc-50 dark:bg-zinc-955/20 border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700'
                            }`}
                        >
                          {color}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {hasSizes && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider block">
                    Available Sizes
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes!.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${isSelected
                              ? 'bg-violet-50 dark:bg-violet-955/20 border-violet-500 text-violet-700 dark:text-violet-400 font-bold'
                              : 'bg-zinc-50 dark:bg-zinc-955/20 border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700'
                            }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs py-3 rounded-2xl border border-zinc-200/50 dark:border-zinc-700/30 transition cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdding || product.status === 'Out Of Stock'}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-550 text-white font-bold text-xs py-3 rounded-2xl transition cursor-pointer disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-1.5"
              >
                <ShoppingBag size={14} />
                <span>{
                  isAdding
                    ? 'Adding...'
                    : product.status === 'Out Of Stock'
                      ? 'Out of Stock'
                      : 'Add to Cart'
                }</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
