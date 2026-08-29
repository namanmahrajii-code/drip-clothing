import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, Check, Sparkles, Filter, Layers } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { getCatalogSections } from '../data/products';

const Shop = () => {
  const { products, wishlist } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state sync
  const initialCategory = searchParams.get('category') || 'all';
  const initialGender = searchParams.get('gender') || 'All';
  const isWishlistView = searchParams.get('filter') === 'wishlist';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedGender, setSelectedGender] = useState(initialGender);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const gen = searchParams.get('gender');
    if (gen) setSelectedGender(gen);
  }, [searchParams]);

  // Update query params
  const updateCategoryFilter = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const updateGenderFilter = (gender) => {
    setSelectedGender(gender);
    if (gender === 'All') {
      searchParams.delete('gender');
    } else {
      searchParams.set('gender', gender);
    }
    setSearchParams(searchParams);
  };

  // Base list depending on wishlist vs all catalog
  const sourceProducts = useMemo(() => {
    return isWishlistView ? wishlist : products;
  }, [isWishlistView, wishlist, products]);

  // Filtered & Sorted master products
  const filteredProducts = useMemo(() => {
    let result = [...sourceProducts];

    // Gender filter
    if (selectedGender !== 'All') {
      result = result.filter(
        (p) => p.gender === selectedGender || p.gender === 'Unisex'
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'new-arrivals') {
        result = result.filter((p) => p.isNew === true);
      } else {
        result = result.filter((p) => p.category === selectedCategory);
      }
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.categoryName && p.categoryName.toLowerCase().includes(q)) ||
          (p.color && p.color.toLowerCase().includes(q)) ||
          (p.type && p.type.toLowerCase().includes(q)) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    // In-Stock only
    if (showInStockOnly) {
      result = result.filter((p) =>
        p.sizes?.some((s) => s.stock > 0)
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [
    sourceProducts,
    selectedGender,
    selectedCategory,
    searchQuery,
    showInStockOnly,
    sortBy
  ]);

  // Grouped sections for structured catalog display
  const structuredSections = useMemo(() => {
    if (selectedCategory === 'new-arrivals') {
      return [
        {
          id: 'new-arrivals',
          sectionNumber: '07',
          title: '07 — NEW ARRIVALS',
          subtitle: 'Fresh Waffle / Raglan collection and latest architectural releases',
          badge: 'FRESH DROP',
          products: filteredProducts,
        }
      ];
    }

    if (selectedCategory !== 'all') {
      const sec = getCatalogSections(filteredProducts).find(s => s.id === selectedCategory);
      return sec ? [sec] : [];
    }

    return getCatalogSections(filteredProducts).filter((sec) => sec.products.length > 0);
  }, [filteredProducts, selectedCategory]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedGender('All');
    setSearchQuery('');
    setShowInStockOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const categoriesNav = [
    { id: 'all', num: 'ALL', name: 'ALL COLLECTIONS', count: sourceProducts.length },
    { id: 'new-arrivals', num: '07', name: 'NEW ARRIVALS', count: sourceProducts.filter(p => p.isNew).length, isHot: true },
    { id: 'waffles', num: '04', name: 'WAFFLE / RAGLAN', count: sourceProducts.filter(p => p.category === 'waffles').length, isHot: true },
    { id: 'graphic-tees', num: '03', name: 'GRAPHIC T-SHIRTS', count: sourceProducts.filter(p => p.category === 'graphic-tees').length },
    { id: 'sweatshirts', num: '05', name: 'SWEATSHIRTS', count: sourceProducts.filter(p => p.category === 'sweatshirts').length },
    { id: 'shirts', num: '01', name: 'SHIRTS', count: sourceProducts.filter(p => p.category === 'shirts').length },
    { id: 'jerseys', num: '02', name: 'JERSEYS', count: sourceProducts.filter(p => p.category === 'jerseys').length },
    { id: 'pants', num: '06', name: 'PANTS', count: sourceProducts.filter(p => p.category === 'pants').length },
  ];

  return (
    <div className="bg-white min-h-screen text-black py-8 sm:py-12 animate-page-fade">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b-2 border-black pb-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-black text-white px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.25em] mb-2">
                <Sparkles size={11} className="text-brandYellow" />
                <span>LIBAS • MODERN FASHION & CLOTHING COLLECTION</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-black">
                {isWishlistView ? 'YOUR SAVED WISHLIST' : 'PRODUCT COLLECTION & CATALOG'}
              </h1>
            </div>

            <div className="text-xs text-neutral-600 max-w-md font-medium space-y-1">
              <p>
                Discover our curated fashion collections structured across <strong>7 official numbered categories</strong>: Shirts, Jerseys, Graphic T-Shirts, Waffle / Raglan Long Sleeves, Sweatshirts, Pants & New Arrivals.
              </p>
              <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider">
                Showing {filteredProducts.length} individual product cards • Clean Studio Cutouts
              </p>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search Panel */}
        <div className="space-y-4 mb-10 bg-neutral-50 p-4 sm:p-5 border border-neutral-300 shadow-xs">
          {/* Top Row: Gender Tabs, Search Input, and Sort */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Gender Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
              <span className="text-[11px] font-black uppercase tracking-wider text-neutral-500 mr-1.5 shrink-0">
                GENDER:
              </span>
              {['All', 'Men', 'Unisex'].map((g) => (
                <button
                  key={g}
                  onClick={() => updateGenderFilter(g)}
                  className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 transition-all shrink-0 ${
                    selectedGender === g
                      ? 'bg-black text-white'
                      : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-300'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Real-time Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-2.5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, waffle, raglan, color, cross..."
                className="w-full bg-white border border-neutral-300 pl-9 pr-8 py-2 text-xs font-medium uppercase tracking-wider text-black placeholder-neutral-400 focus:outline-none focus:border-black"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-neutral-400 hover:text-black"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-neutral-500 shrink-0">
                SORT BY:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-neutral-300 px-3 py-2 text-xs font-bold uppercase tracking-wider text-black focus:outline-none focus:border-black"
              >
                <option value="featured">Featured Drops</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Category Bar with Section Jump Buttons */}
          <div className="pt-3 border-t border-neutral-200 flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mr-1 flex items-center gap-1">
              <Filter size={11} />
              <span>SECTIONS:</span>
            </span>

            {categoriesNav.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  updateCategoryFilter(cat.id);
                  if (cat.id !== 'all' && cat.id !== 'new-arrivals') {
                    setTimeout(() => scrollToSection(`sec-${cat.id}`), 100);
                  }
                }}
                className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1.5 transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-black text-white shadow-xs'
                    : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-300'
                }`}
              >
                <span className="opacity-60 text-[9px] font-mono">{cat.num}</span>
                <span>{cat.name}</span>
                {cat.isHot && (
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
                )}
                <span className={`text-[9px] px-1 py-0.2 rounded-xs font-mono ${
                  selectedCategory === cat.id ? 'bg-neutral-800 text-brandYellow' : 'bg-neutral-100 text-neutral-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}

            {/* In-Stock Filter toggle */}
            <button
              onClick={() => setShowInStockOnly(!showInStockOnly)}
              className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 border ml-auto transition-colors flex items-center gap-1.5 ${
                showInStockOnly
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:border-black'
              }`}
            >
              <Check size={12} className={showInStockOnly ? 'opacity-100' : 'opacity-40'} />
              <span>In Stock Only</span>
            </button>
          </div>
        </div>

        {/* Active Filters Summary */}
        {(selectedCategory !== 'all' || selectedGender !== 'All' || searchQuery || showInStockOnly) && (
          <div className="flex items-center gap-2 mb-8 flex-wrap text-xs bg-neutral-100 p-2.5 border border-neutral-200">
            <span className="text-neutral-500 font-black uppercase tracking-wider text-[10px]">
              Active Filters:
            </span>
            {selectedGender !== 'All' && (
              <span className="bg-white px-2.5 py-1 text-black font-bold flex items-center gap-1 border border-neutral-300">
                Gender: {selectedGender}
                <button onClick={() => updateGenderFilter('All')}><X size={12} /></button>
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="bg-white px-2.5 py-1 text-black font-bold flex items-center gap-1 border border-neutral-300">
                Category: {selectedCategory.toUpperCase()}
                <button onClick={() => updateCategoryFilter('all')}><X size={12} /></button>
              </span>
            )}
            {searchQuery && (
              <span className="bg-white px-2.5 py-1 text-black font-bold flex items-center gap-1 border border-neutral-300">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')}><X size={12} /></button>
              </span>
            )}
            {showInStockOnly && (
              <span className="bg-white px-2.5 py-1 text-emerald-700 font-bold flex items-center gap-1 border border-neutral-300">
                In Stock Only
                <button onClick={() => setShowInStockOnly(false)}><X size={12} /></button>
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-crimson font-black uppercase text-[11px] underline ml-auto hover:text-black"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* CATEGORY SECTIONS RENDER */}
        {/* ============================================================== */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-neutral-50 border border-neutral-200 space-y-4">
            <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mx-auto text-neutral-500">
              <Search size={28} />
            </div>
            <h3 className="text-base font-bold uppercase tracking-widest text-black">
              No products found
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              We couldn't find any items matching your active criteria. Try selecting "ALL ARCHIVE" or clearing your search terms.
            </p>
            <button
              onClick={handleResetFilters}
              className="bg-black text-white px-6 py-2.5 text-xs font-black uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              SHOW ALL PRODUCTS
            </button>
          </div>
        ) : (
          <div className="space-y-16">
            {structuredSections.map((section) => (
              <section
                key={section.id}
                id={`sec-${section.id}`}
                className="scroll-mt-24"
              >
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 mb-6 border-b-2 border-black">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-black text-white font-mono font-black text-xs flex items-center justify-center">
                      {section.sectionNumber}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-black uppercase tracking-wider text-black">
                          {section.title}
                        </h2>
                        {section.badge && (
                          <span className="bg-crimson text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 shadow-xs">
                            {section.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 font-medium">
                        {section.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 bg-neutral-100 px-2.5 py-1 border border-neutral-200">
                      {section.products.length} {section.products.length === 1 ? 'Product' : 'Products'}
                    </span>
                  </div>
                </div>

                {/* Section Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {section.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Footer Guarantee Strip */}
        <div className="mt-20 pt-10 border-t border-neutral-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-neutral-50 border border-neutral-200">
            <span className="text-xs font-black uppercase tracking-wider text-black block mb-1">PREMIUM QUALITY</span>
            <span className="text-[11px] text-neutral-500">280–420 GSM Finest Fabrics</span>
          </div>
          <div className="p-4 bg-neutral-50 border border-neutral-200">
            <span className="text-xs font-black uppercase tracking-wider text-black block mb-1">TRENDY DESIGNS</span>
            <span className="text-[11px] text-neutral-500">Streetwear Essentials</span>
          </div>
          <div className="p-4 bg-neutral-50 border border-neutral-200">
            <span className="text-xs font-black uppercase tracking-wider text-black block mb-1">LIMITED DROPS</span>
            <span className="text-[11px] text-neutral-500">Exclusive Collections</span>
          </div>
          <div className="p-4 bg-neutral-50 border border-neutral-200">
            <span className="text-xs font-black uppercase tracking-wider text-black block mb-1">MADE TO STAND OUT</span>
            <span className="text-[11px] text-neutral-500">Be Bold & Different</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Shop;
