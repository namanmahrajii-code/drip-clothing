import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const SearchModal = () => {
  const { products, isSearchOpen, setIsSearchOpen } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = searchTerm.trim()
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleProductClick = (slug) => {
    setIsSearchOpen(false);
    navigate(`/product/${slug}`);
  };

  const handleCategoryClick = (cat) => {
    setIsSearchOpen(false);
    navigate(`/shop?category=${cat}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-page-fade"
      />

      <div className="relative max-w-3xl mx-auto mt-12 sm:mt-20 px-4 z-10">
        <div className="bg-white shadow-2xl border border-[#E5DDD3] rounded-3xl overflow-hidden animate-slide-up">
          {/* Search Input Bar */}
          <div className="p-4 sm:p-5 border-b border-[#E5DDD3] flex items-center gap-3 bg-[#FAF8F5]">
            <Search size={22} className="text-[#7D1E22]" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="SEARCH BY PRODUCT, SHIRT, WAFFLE, SWEATSHIRT..."
              className="w-full bg-transparent text-sm sm:text-base font-semibold uppercase tracking-wider text-[#1E1E1E] placeholder-[#6B6B6B] focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-[#6B6B6B] hover:text-[#7D1E22] p-1"
                aria-label="Clear input"
              >
                <X size={18} />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="bg-white hover:bg-[#7D1E22] text-[#6B6B6B] hover:text-white border border-[#E5DDD3] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-2xs"
            >
              ESC
            </button>
          </div>

          {/* Body Content */}
          <div className="max-h-[60vh] overflow-y-auto p-5 sm:p-6">
            {searchTerm.trim() ? (
              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-[#7D1E22] mb-4">
                  {filteredProducts.length} Result{filteredProducts.length !== 1 ? 's' : ''} found
                </p>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-10 text-[#6B6B6B]">
                    <p className="text-sm font-semibold text-[#1E1E1E]">No pieces matched "{searchTerm}"</p>
                    <p className="text-xs mt-1">Try searching for "Waffle", "Shirt", "Sweatshirt", or "Jersey".</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product.slug)}
                        className="flex items-center gap-3.5 p-3 rounded-2xl border border-[#E5DDD3] hover:border-[#7D1E22] bg-[#FAF8F5] cursor-pointer group transition-all"
                      >
                        <div className="w-14 h-16 bg-white rounded-xl border border-[#E5DDD3] p-1 shrink-0 flex items-center justify-center">
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] uppercase font-bold tracking-widest text-[#7D1E22]">
                            {product.category}
                          </span>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E] group-hover:text-[#7D1E22] transition-colors truncate">
                            {product.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-black text-[#1E1E1E]">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            {product.originalPrice && (
                              <span className="text-[10px] text-[#6B6B6B] line-through">
                                ₹{product.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-[#6B6B6B] group-hover:text-[#7D1E22] group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Popular / Trending Searches */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#6B6B6B] mb-3">
                    <TrendingUp size={14} className="text-[#7D1E22]" />
                    <span>Popular Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Waffle Knit', 'Raglan Long Sleeve', 'Heavy Sweatshirt', 'Resort Shirt', 'Retro Jersey', 'Cotton Pants'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchTerm(tag)}
                        className="bg-[#FAF8F5] hover:bg-[#7D1E22] hover:text-white text-[#1E1E1E] text-xs font-medium px-4 py-1.5 rounded-full border border-[#E5DDD3] transition-colors uppercase tracking-wider"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct Category Shortcuts */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#6B6B6B] mb-3">
                    Browse Collections
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {[
                      { name: '01 • Shirts', slug: 'shirts' },
                      { name: '02 • Jerseys', slug: 'jerseys' },
                      { name: '03 • Graphic T-Shirts', slug: 'graphic-tees' },
                      { name: '04 • Waffles & Raglans', slug: 'waffles' },
                      { name: '05 • Sweatshirts', slug: 'sweatshirts' },
                      { name: '06 • Pants', slug: 'pants' },
                    ].map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => handleCategoryClick(cat.slug)}
                        className="p-3 bg-[#FAF8F5] hover:bg-[#7D1E22] hover:text-white text-left font-bold uppercase tracking-wider text-[#1E1E1E] rounded-xl border border-[#E5DDD3] transition-all"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
