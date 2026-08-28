import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Zap, ArrowRight, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const ProductCard = ({ product }) => {
  const { wishlist, toggleWishlist, addToCart, setQuickViewProduct } = useShop();
  const navigate = useNavigate();

  // Find first available size
  const defaultSize = product.sizes?.find((s) => s.stock > 0)?.size || '';
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedAnim, setIsAddedAnim] = useState(false);

  const isSaved = wishlist.some((p) => p.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const sizeToUse = selectedSize || defaultSize;
    if (!sizeToUse) {
      setQuickViewProduct(product);
      return;
    }
    const success = addToCart(product, sizeToUse, 1, true);
    if (success) {
      setIsAddedAnim(true);
      setTimeout(() => setIsAddedAnim(false), 1200);
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const sizeToUse = selectedSize || defaultSize;
    if (!sizeToUse) {
      setQuickViewProduct(product);
      return;
    }
    addToCart(product, sizeToUse, 1, false);
    navigate('/checkout');
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-white border border-neutral-200 rounded-none overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-neutral-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#fafafa] flex items-center justify-center p-3 border-b border-neutral-100">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

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

        {/* Wishlist Button Top Right */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md ${
              isSaved
                ? 'bg-crimson text-white scale-105'
                : 'bg-white/90 text-neutral-700 hover:bg-white hover:text-crimson'
            }`}
            aria-label="Save to wishlist"
            title="Wishlist"
          >
            <Heart size={14} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Category Tag Bottom Left */}
        <div className="absolute bottom-2 left-2.5 z-10 pointer-events-none">
          <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 bg-white/90 px-1.5 py-0.5 border border-neutral-200">
            {product.categoryName || product.category}
          </span>
        </div>
      </div>

      {/* 2. Product Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-grow justify-between bg-white space-y-3">
        <div>
          {/* Colour Indicator */}
          {product.color && (
            <div className="flex items-center gap-1 text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1 line-clamp-1">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 inline-block" />
              <span>Colour: <strong className="text-neutral-800">{product.color}</strong></span>
            </div>
          )}

          {/* Product Name */}
          <Link
            to={`/product/${product.slug}`}
            className="block text-xs sm:text-sm font-black text-black group-hover:text-crimson transition-colors uppercase tracking-wider leading-snug line-clamp-1"
            title={product.title}
          >
            {product.title}
          </Link>

          {/* Price Row */}
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-sm sm:text-base font-black text-black tracking-tight">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-neutral-400 line-through font-medium">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* 3. Available Sizes */}
          <div className="mt-2.5 pt-2 border-t border-neutral-100">
            <div className="flex items-center justify-between text-[10px] uppercase font-bold text-neutral-500 tracking-wider mb-1.5">
              <span>Size:</span>
              <span className="text-black font-extrabold">{selectedSize || 'Select'}</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {product.sizes?.map((s) => {
                const isOutOfStock = s.stock <= 0;
                const isSelected = selectedSize === s.size;
                return (
                  <button
                    key={s.size}
                    disabled={isOutOfStock}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedSize(s.size);
                    }}
                    className={`text-[10px] font-bold px-2 py-1 transition-all border ${
                      isOutOfStock
                        ? 'border-neutral-200 text-neutral-300 line-through bg-neutral-50 cursor-not-allowed'
                        : isSelected
                        ? 'bg-black text-white border-black font-black shadow-xs'
                        : 'border-neutral-200 text-neutral-700 bg-neutral-50 hover:bg-neutral-200 hover:text-black'
                    }`}
                    title={isOutOfStock ? 'Out of stock' : `Select size ${s.size}`}
                  >
                    {s.size}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. Action Buttons Strip */}
        <div className="pt-2.5 border-t border-neutral-100 space-y-1.5">
          {/* Dual Action: Add to Cart & Buy Now */}
          <div className="grid grid-cols-2 gap-1.5">
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-2 px-1 text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-all border ${
                isAddedAnim
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-black border-neutral-900 hover:bg-black hover:text-white'
              }`}
              aria-label="Add to cart"
            >
              {isAddedAnim ? (
                <>
                  <Check size={12} />
                  <span>ADDED</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={12} />
                  <span>ADD TO CART</span>
                </>
              )}
            </button>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="w-full bg-brandYellow hover:bg-yellow-400 text-black py-2 px-1 text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-all border border-brandYellow hover:border-yellow-400 shadow-xs"
              aria-label="Buy now"
            >
              <Zap size={12} className="fill-black" />
              <span>BUY NOW</span>
            </button>
          </div>

          {/* View Product Button */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <Link
              to={`/product/${product.slug}`}
              className="w-full bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-800 py-1.5 px-2 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1 transition-colors"
            >
              <span>VIEW PRODUCT</span>
              <ArrowRight size={11} />
            </Link>

            <button
              onClick={handleQuickView}
              className="bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-700 p-1.5 transition-colors shrink-0"
              title="Quick preview modal"
              aria-label="Quick View"
            >
              <Eye size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
