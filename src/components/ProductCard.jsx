import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const ProductCard = ({ product }) => {
  const { wishlist, toggleWishlist, setQuickViewProduct } = useShop();
  const isSaved = wishlist.some((p) => p.id === product.id);

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group relative flex flex-col bg-white border border-neutral-200 rounded-none overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-neutral-900 block"
    >
      {/* 1. Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#fafafa] flex items-center justify-center p-3 border-b border-neutral-100">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges Top Left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.discount && (
            <span className="bg-crimson text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 shadow-sm">
              {product.discount}
            </span>
          )}
          {product.isNew && (
            <span className="bg-black text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 shadow-sm">
              DROP
            </span>
          )}
        </div>

        {/* Action Float Top Right: Wishlist & Quick View */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all shadow-md ${
              isSaved
                ? 'bg-crimson text-white scale-105'
                : 'bg-white/90 text-neutral-700 hover:bg-white hover:text-crimson'
            }`}
            aria-label="Save to wishlist"
            title="Wishlist"
          >
            <Heart size={13} fill={isSaved ? 'currentColor' : 'none'} />
          </button>

          <button
            onClick={handleQuickView}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 text-neutral-700 hover:bg-black hover:text-white flex items-center justify-center transition-all shadow-md hidden sm:flex"
            aria-label="Quick preview"
            title="Quick preview"
          >
            <Eye size={13} />
          </button>
        </div>

        {/* Category Tag Bottom Left */}
        <div className="absolute bottom-2 left-2.5 z-10 pointer-events-none">
          <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-neutral-500 bg-white/90 px-1.5 py-0.5 border border-neutral-200">
            {product.categoryName || product.category}
          </span>
        </div>
      </div>

      {/* 2. Minimal Product Details */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Colour Indicator */}
          {product.color && (
            <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1 line-clamp-1">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 inline-block" />
              <span>{product.color}</span>
            </div>
          )}

          {/* Product Name */}
          <h3
            className="text-xs sm:text-sm font-black text-black group-hover:text-crimson transition-colors uppercase tracking-wider leading-snug line-clamp-1"
            title={product.title}
          >
            {product.title}
          </h3>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mt-2 pt-2 border-t border-neutral-100">
          <span className="text-xs sm:text-sm font-black text-black tracking-tight">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-[10px] sm:text-[11px] text-neutral-400 line-through font-medium">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
          {product.discount && (
            <span className="text-[9px] font-extrabold text-emerald-600 ml-auto">
              {product.discount}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
