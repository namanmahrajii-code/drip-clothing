import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Heart, Star, Check, Ruler, ArrowRight, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const QuickViewModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    setIsSizeGuideOpen
  } = useShop();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const navigate = useNavigate();

  if (!quickViewProduct) return null;

  const isSaved = wishlist.some((p) => p.id === quickViewProduct.id);
  const currentSizeObj = quickViewProduct.sizes?.find((s) => s.size === selectedSize);

  const handleAdd = () => {
    if (!selectedSize) return;
    addToCart(quickViewProduct, selectedSize, 1, true);
    setQuickViewProduct(null);
  };

  const handleBuyNow = () => {
    if (!selectedSize) return;
    addToCart(quickViewProduct, selectedSize, 1, false);
    setQuickViewProduct(null);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-3xl shadow-2xl z-10 border border-neutral-200 overflow-hidden animate-slide-up max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3.5 right-3.5 z-20 bg-white/90 hover:bg-black hover:text-white p-1.5 transition-colors shadow"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="overflow-y-auto p-5 sm:p-7 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gallery Column */}
          <div className="space-y-3">
            <div className="aspect-[3/4] bg-[#fafafa] overflow-hidden border border-neutral-200 flex items-center justify-center p-3">
              <img
                src={quickViewProduct.images[selectedImage]}
                alt={quickViewProduct.title}
                className="w-full h-full object-contain object-center"
              />
            </div>
            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-20 bg-[#fafafa] p-1 overflow-hidden border-2 transition-all flex items-center justify-center ${
                      selectedImage === idx ? 'border-black' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-crimson">
                  {quickViewProduct.categoryName || quickViewProduct.category}
                </span>
                <span>•</span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
                  {quickViewProduct.gender}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-display font-black uppercase tracking-wider text-black">
                {quickViewProduct.title}
              </h2>

              <p className="text-xs text-neutral-500 mt-1 font-medium">
                {quickViewProduct.subtitle}
              </p>

              {/* Colour Indicator */}
              {quickViewProduct.color && (
                <div className="mt-2 text-[11px] font-semibold text-neutral-600 uppercase tracking-wider">
                  Colour: <strong className="text-black">{quickViewProduct.color}</strong>
                </div>
              )}

              {/* Price & Rating */}
              <div className="flex items-center gap-3 my-3">
                <span className="text-lg font-black text-black">
                  ₹{quickViewProduct.price.toLocaleString('en-IN')}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-xs text-neutral-400 line-through">
                    ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {quickViewProduct.discount && (
                  <span className="bg-crimson text-white text-[9px] font-extrabold px-2 py-0.5 uppercase tracking-widest">
                    {quickViewProduct.discount}
                  </span>
                )}
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                {quickViewProduct.description}
              </p>

              {/* Sizing Selection */}
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-black">
                    SELECT SIZE: <strong className="text-crimson">{selectedSize || 'NONE'}</strong>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="flex items-center gap-1 text-neutral-500 hover:text-black uppercase text-[10px] font-bold tracking-wider underline"
                  >
                    <Ruler size={12} />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes?.map((s) => {
                    const isOOS = s.stock <= 0;
                    const isSelected = selectedSize === s.size;
                    return (
                      <button
                        key={s.size}
                        disabled={isOOS}
                        onClick={() => setSelectedSize(s.size)}
                        className={`text-xs font-bold px-3.5 py-2 border transition-all ${
                          isOOS
                            ? 'border-neutral-200 text-neutral-300 line-through cursor-not-allowed bg-neutral-50'
                            : isSelected
                            ? 'bg-black text-white border-black'
                            : 'border-neutral-300 text-black hover:border-black'
                        }`}
                      >
                        {s.size} {isOOS ? '(OOS)' : ''}
                      </button>
                    );
                  })}
                </div>

                {currentSizeObj && (
                  <p className="text-[11px] font-semibold text-amber-600 mt-1">
                    {currentSizeObj.stock <= 2
                      ? `⚠️ Only ${currentSizeObj.stock} left in stock!`
                      : '✓ In Stock & Ready to Dispatch'}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-4 border-t border-neutral-100">
              <div className="grid grid-cols-2 gap-2">
                <button
                  disabled={!selectedSize}
                  onClick={handleAdd}
                  className="w-full bg-brandYellow hover:bg-yellow-400 disabled:opacity-50 text-black py-3 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingBag size={14} />
                  <span>ADD TO BAG</span>
                </button>

                <button
                  disabled={!selectedSize}
                  onClick={handleBuyNow}
                  className="w-full bg-ink hover:bg-neutral-800 disabled:opacity-50 text-white py-3 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                >
                  <span>BUY NOW</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  const sizeText = selectedSize ? ` (Size: ${selectedSize})` : '';
                  const msg = `*DRIP CLOTHING HALDWANI*\nHi, I want to query/order *${quickViewProduct.title}*${sizeText} (₹${quickViewProduct.price}). Is this available?`;
                  window.open(`https://wa.me/917900455958?text=${encodeURIComponent(msg)}`, '_blank');
                }}
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-2.5 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <MessageCircle size={15} />
                <span>ORDER / QUERY VIA WHATSAPP</span>
              </button>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-black font-semibold uppercase tracking-wider"
                >
                  <Heart size={14} fill={isSaved ? 'red' : 'none'} className={isSaved ? 'text-crimson' : ''} />
                  <span>{isSaved ? 'SAVED TO WISHLIST' : 'SAVE TO WISHLIST'}</span>
                </button>

                <Link
                  to={`/product/${quickViewProduct.slug}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="flex items-center gap-1 text-xs text-black font-bold uppercase tracking-wider hover:text-crimson"
                >
                  <span>VIEW FULL DETAILS</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
