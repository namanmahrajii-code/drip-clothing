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
        <div className="bg-white shadow-2xl border border-neutral-200 overflow-hidden animate-slide-up">
          {/* Search Input Bar */}
          <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center gap-3">
            <Search size={22} className="text-neutral-400" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="SEARCH BY PRODUCT, DENIM, HOODIE, FABRIC..."
              className="w-full bg-transparent text-sm sm:text-base font-semibold uppercase tracking-wider text-black placeholder-neutral-400 focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-neutral-400 hover:text-black p-1"
                aria-label="Clear input"
              >
                <X size={18} />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-1.5 text-xs font-bold uppercase tracking-wider"
            >
              ESC
            </button>
          </div>

          {/* Body Content */}
          <div className="max-h-[60vh] overflow-y-auto p-5">
            {searchTerm.trim() ? (
              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-neutral-400 mb-4">
                  {filteredProducts.length} Result{filteredProducts.length !== 1 ? 's' : ''} found
                </p>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-10 text-neutral-500">
                    <p className="text-sm font-semibold">No streetwear pieces matched "{searchTerm}"</p>
                    <p className="text-xs mt-1">Try searching for "Denim", "T-shirt", "Shacket", or "Waffle".</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product.slug)}
                        className="flex items-center gap-3.5 p-2.5 border border-neutral-100 hover:border-black cursor-pointer group transition-all"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-14 h-16 object-cover bg-neutral-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-400">
                            {product.category}
                          </span>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-black group-hover:text-crimson transition-colors truncate">
                            {product.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-black text-black">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            {product.originalPrice && (
                              <span className="text-[10px] text-neutral-400 line-through">
                                ₹{product.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Popular / Trending Searches */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
                    <TrendingUp size={14} />
                    <span>Popular Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Knee Torn Denim', 'Washed Onyx Tee', 'Heavy Hoodie', 'Tactical Shacket', 'Thermal Waffle', 'Skater Lower'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchTerm(tag)}
                        className="bg-neutral-100 hover:bg-black hover:text-white text-neutral-800 text-xs font-medium px-3 py-1.5 transition-colors uppercase tracking-wider"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct Category Shortcuts */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
                    Browse Categories
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { name: 'Denims', slug: 'denims' },
                      { name: 'T-Shirts', slug: 'tshirts' },
                      { name: 'Hoodies', slug: 'hoodies' },
                      { name: 'Waffles', slug: 'waffles' },
                      { name: 'Shackets', slug: 'shackets' },
                      { name: 'Jerseys', slug: 'jersey' },
                      { name: 'Lowers', slug: 'lower' },
                      { name: 'Windbreakers', slug: 'windbreakers' },
                    ].map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => handleCategoryClick(cat.slug)}
                        className="p-2.5 bg-neutral-50 hover:bg-neutral-200 text-left font-bold uppercase tracking-wider text-black transition-colors"
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
