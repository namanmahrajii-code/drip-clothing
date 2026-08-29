import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, Check, Sparkles, Filter, Layers, ChevronDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { getCatalogSections } from '../data/products';

// ── Inline Levenshtein for smart search in Shop ──────────────────────────────
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

const SHOP_SYNONYM_MAP = {
  chikan: ['chikankari'], chikankari: ['chikankari'], lucknowi: ['chikankari'],
  silk: ['silk'], georgette: ['georgette'], velvet: ['velvet'], brocade: ['brocade'],
  kurta: ['kurta','men'], kurtas: ['kurta','men'], sherwani: ['sherwani','men','wedding'],
  sherwanis: ['sherwani','men','wedding'], achkan: ['achkan','men','indo-western'],
  bandhgala: ['achkan','men','indo-western'], anarkali: ['anarkali','women'],
  lehenga: ['lehenga','women','bridal'], lehnga: ['lehenga','women','bridal'],
  sharara: ['sharara','women','festive'], kurti: ['kurti','women'], palazzo: ['palazzo','women'],
  kids: ['kids'], children: ['kids'], boys: ['kids','boys'], girls: ['kids','girls'],
  dhoti: ['dhoti','kids','festive'], jacket: ['jacket','kids'],
  wedding: ['wedding','bridal'], bridal: ['bridal','wedding'], haldi: ['haldi','festive','yellow'],
  festive: ['festive'], sangeet: ['festive','sequin'], reception: ['wedding'],
  yellow: ['yellow','haldi'], gold: ['gold','wedding'], white: ['white','ivory'],
  ivory: ['ivory','white'], cream: ['ivory','white'], red: ['red','bridal'],
  maroon: ['red','bridal'], navy: ['navy','blue'], blue: ['blue','navy'],
  pink: ['pink','women'], blush: ['pink','women'], mint: ['mint','green'],
  green: ['green','mint'], sage: ['green','sage'], black: ['black','sequin'],
  rust: ['rust','festive'], mustard: ['yellow','festive'], silver: ['silver'],
  mirror: ['mirror-work','festive'], sequin: ['sequin','festive'], zari: ['zari','embroidery'],
  embroidery: ['embroidery'], embroidered: ['embroidery'], jacquard: ['jacquard','festive'],
  'indo-western': ['indo-western'], indowestern: ['indo-western'], indo: ['indo-western'],
  royal: ['royal','blue','wedding'],
};

const SHOP_PRODUCT_TAGS = {
  prod_women_01: ['chikankari','anarkali','women','ivory','white','georgette','embroidery','festive','wedding'],
  prod_women_02: ['lehenga','women','bridal','red','velvet','zari','embroidery','wedding'],
  prod_women_03: ['sharara','women','pink','mirror-work','festive','georgette','embroidery'],
  prod_women_04: ['kurti','palazzo','women','yellow','silk','festive','embroidery'],
  prod_kids_01: ['kids','boys','jacket','kurta','blue','silk','brocade','festive','wedding'],
  prod_kids_02: ['kids','boys','dhoti','kurta','yellow','haldi','festive'],
  prod_kids_03: ['kids','girls','lehenga','pink','embroidery','festive','mirror-work'],
  prod_kids_04: ['kids','boys','sherwani','ivory','white','gold','zari','wedding','royal'],
  prod_libas_01: ['chikankari','kurta','men','ivory','white','silk','embroidery','festive'],
  prod_libas_02: ['chikankari','kurta','men','white','georgette','embroidery'],
  prod_libas_03: ['kurta','men','mint','green','silk','embroidery'],
  prod_libas_04: ['kurta','men','green','sage','silk'],
  prod_libas_05: ['kurta','men','yellow','haldi','festive','jacquard','silk'],
  prod_libas_06: ['kurta','men','rust','festive','silk','embroidery'],
  prod_libas_07: ['kurta','men','black','sequin','festive','wedding','georgette'],
  prod_libas_08: ['achkan','indo-western','men','pink','embroidery','wedding','silk'],
  prod_libas_11: ['achkan','indo-western','men','black','embroidery','wedding'],
  prod_libas_12: ['achkan','indo-western','men','green','mint','embroidery'],
  prod_libas_09: ['sherwani','men','navy','blue','royal','wedding','sequin','brocade'],
  prod_libas_10: ['sherwani','men','ivory','gold','zari','wedding','bridal','silk'],
  prod_libas_13: ['sherwani','men','ivory','white','chikankari','wedding','silk'],
  prod_libas_14: ['sherwani','men','white','silver','wedding','reception','brocade'],
};

function shopSmartSearch(query, products) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!words.length) return null; // null = no query, show all
  const synonymKeys = Object.keys(SHOP_SYNONYM_MAP);

  const expandedTags = new Set();
  words.forEach((word) => {
    if (SHOP_SYNONYM_MAP[word]) {
      SHOP_SYNONYM_MAP[word].forEach((t) => expandedTags.add(t));
      expandedTags.add(word);
      return;
    }
    const maxDist = word.length <= 4 ? 1 : word.length <= 7 ? 2 : 3;
    synonymKeys.forEach((key) => {
      if (levenshtein(word, key) <= maxDist) SHOP_SYNONYM_MAP[key].forEach((t) => expandedTags.add(t));
      if (key.startsWith(word) || word.startsWith(key.slice(0, Math.max(4, key.length - 2))))
        SHOP_SYNONYM_MAP[key].forEach((t) => expandedTags.add(t));
    });
    expandedTags.add(word);
  });

  const tagArray = [...expandedTags];
  const scored = products.map((p) => {
    // Merge hardcoded tags + admin-added product.tags
    const ptags = [...(SHOP_PRODUCT_TAGS[p.id] || []), ...(p.tags || [])];
    let score = 0;
    tagArray.forEach((t) => { if (ptags.includes(t)) score += 2; });
    const txt = [
      p.title,
      p.subtitle,
      p.color,
      p.type,
      p.description,
      p.category,
      p.categoryName,
      ...(p.tags || []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    const tokens = txt.split(/\s+/);
    words.forEach((w) => {
      if (txt.includes(w)) { score += 3; }
      else {
        const md = w.length <= 4 ? 1 : 2;
        tokens.forEach((tok) => { if (tok.length >= 3 && levenshtein(w, tok) <= md) score += 1; });
      }
    });
    return { p, score };
  });
  return scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score).map((s) => s.p);
}
// ─────────────────────────────────────────────────────────────────────────────

const Shop = () => {
  const { products, wishlist } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state sync
  const initialCategory = searchParams.get('category') || 'all';
  const initialGender = searchParams.get('gender') || 'All';
  const initialQ = searchParams.get('q') || '';
  const isWishlistView = searchParams.get('filter') === 'wishlist';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedGender, setSelectedGender] = useState(initialGender);
  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [sortBy, setSortBy] = useState('featured');
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const gen = searchParams.get('gender');
    if (gen) setSelectedGender(gen);
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
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

    // Smart search — uses tag+fuzzy engine (same as SearchModal)
    if (searchQuery.trim()) {
      const smartResults = shopSmartSearch(searchQuery, result);
      if (smartResults !== null) result = smartResults;
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
          sectionNumber: '00',
          title: '00 — NEW ARRIVALS',
          subtitle: 'Freshly arrived festive kurtas, Chikankari sets & royal wedding sherwanis',
          badge: 'FRESH DROPS',
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

  const categoriesOptions = useMemo(() => {
    return [
      { id: 'all', label: 'All Ethnic Collections', count: sourceProducts.length },
      { id: 'new-arrivals', label: '00 — New Arrivals', count: sourceProducts.filter(p => p.isNew).length },
      { id: 'women-ethnic', label: "01 — Women's Ethnic & Festive", count: sourceProducts.filter(p => p.category === 'women-ethnic').length },
      { id: 'kids-ethnic', label: "02 — Kids' Ethnic Collection", count: sourceProducts.filter(p => p.category === 'kids-ethnic').length },
      { id: 'kurtas', label: "03 — Men's Chikankari & Silk", count: sourceProducts.filter(p => p.category === 'kurtas').length },
      { id: 'festive-kurtas', label: "04 — Men's Festive & Haldi", count: sourceProducts.filter(p => p.category === 'festive-kurtas').length },
      { id: 'indo-western', label: "05 — Men's Indo-Western & Achkans", count: sourceProducts.filter(p => p.category === 'indo-western').length },
      { id: 'sherwanis', label: '06 — Royal Wedding Sherwanis', count: sourceProducts.filter(p => p.category === 'sherwanis').length },
    ];
  }, [sourceProducts]);

  return (
    <div className="bg-[#F7F4EF] min-h-screen text-[#1E1E1E] py-8 sm:py-12 animate-page-fade">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-[#E5DDD3] pb-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#7D1E22]/10 text-[#7D1E22] border border-[#7D1E22]/20 px-3 py-0.5 text-[9px] font-bold uppercase tracking-[0.25em] mb-2 rounded-full">
                <Sparkles size={11} className="text-[#7D1E22]" />
                <span>LIBAS • MODERN ETHNIC & FESTIVE FASHION</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-black uppercase tracking-tight text-[#1E1E1E]">
                {isWishlistView ? 'YOUR SAVED WISHLIST' : 'COLLECTIONS & CATALOG'}
              </h1>
            </div>

            <div className="text-xs text-[#6B6B6B] max-w-md font-normal space-y-1">
              <p>
                Discover our curated ethnic and wedding collections for Men, Women & Kids — Chikankari Anarkalis, Bridal Lehengas, Festive Dhoti Sets, Silk Kurtas and Royal Wedding Sherwanis.
              </p>
              <p className="text-[11px] text-[#7D1E22] font-semibold uppercase tracking-wider">
                Showing {filteredProducts.length} curated designs • Pure Silk, Georgette & Brocade
              </p>
            </div>
          </div>
        </div>

        {/* Clean Filter Controls & Dropdown Menu Panel */}
        <div className="mb-8 bg-white p-4 sm:p-5 border border-[#E5DDD3] rounded-2xl shadow-xs space-y-4">
          {/* Row 1: Search & Category Dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Real-time Search Input */}
            <div className="relative md:col-span-6 lg:col-span-7">
              <Search size={16} className="absolute left-3.5 top-3 text-[#6B6B6B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Anarkali, Lehenga, Chikankari, Kids Kurta, Sherwani..."
                className="w-full bg-[#FAF8F5] border border-[#E5DDD3] rounded-full pl-10 pr-9 py-2.5 text-xs font-medium tracking-wider text-[#1E1E1E] placeholder-[#8A8A8A] focus:outline-none focus:border-[#7D1E22] transition-colors shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-[#6B6B6B] hover:text-[#7D1E22]"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category Dropdown Menu */}
            <div className="relative md:col-span-6 lg:col-span-5">
              <div className="relative flex items-center">
                <div className="absolute left-3.5 pointer-events-none flex items-center gap-1.5 text-[#7D1E22]">
                  <Layers size={15} />
                </div>
                <select
                  id="category-dropdown-select"
                  value={selectedCategory}
                  onChange={(e) => updateCategoryFilter(e.target.value)}
                  className="w-full appearance-none bg-[#FAF8F5] border border-[#E5DDD3] hover:border-[#7D1E22] text-[#1E1E1E] font-bold text-xs uppercase tracking-wider rounded-full pl-10 pr-9 py-2.5 transition-all focus:outline-none focus:border-[#7D1E22] shadow-2xs cursor-pointer"
                >
                  {categoriesOptions.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label} ({cat.count})
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3.5 text-[#6B6B6B] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 2: Gender Tabs, Sort By Dropdown, and In-Stock Toggle */}
          <div className="pt-3 border-t border-[#E5DDD3]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Gender Filters */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6B6B] shrink-0">
                GENDER:
              </span>
              <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1 rounded-full border border-[#E5DDD3] overflow-x-auto">
                {['All', 'Men', 'Women', 'Kids'].map((g) => (
                  <button
                    key={g}
                    onClick={() => updateGenderFilter(g)}
                    className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full transition-all shrink-0 ${
                      selectedGender === g
                        ? 'bg-[#7D1E22] text-white shadow-xs'
                        : 'text-[#6B6B6B] hover:text-[#1E1E1E]'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Controls: Sort & In Stock Toggle */}
            <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap justify-between sm:justify-end">
              {/* In-Stock Filter toggle */}
              <button
                onClick={() => setShowInStockOnly(!showInStockOnly)}
                className={`text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-all flex items-center gap-1.5 shrink-0 ${
                  showInStockOnly
                    ? 'bg-[#7D1E22] text-white border-[#7D1E22] shadow-xs'
                    : 'bg-[#FAF8F5] text-[#1E1E1E] border border-[#E5DDD3] hover:border-[#7D1E22]'
                }`}
              >
                <Check size={12} className={showInStockOnly ? 'opacity-100' : 'opacity-40'} />
                <span>In Stock Only</span>
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6B6B]">
                  SORT:
                </span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-[#FAF8F5] border border-[#E5DDD3] hover:border-[#7D1E22] rounded-full pl-3 pr-7 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1E1E1E] focus:outline-none focus:border-[#7D1E22] shadow-2xs cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
                  <ChevronDown size={13} className="absolute right-2.5 top-2 text-[#6B6B6B] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        {(selectedCategory !== 'all' || selectedGender !== 'All' || searchQuery || showInStockOnly) && (
          <div className="flex items-center gap-2 mb-8 flex-wrap text-xs bg-[#EFE8DE] p-3 rounded-xl border border-[#E5DDD3]">
            <span className="text-[#6B6B6B] font-bold uppercase tracking-wider text-[10px]">
              Active Filters:
            </span>
            {selectedCategory !== 'all' && (
              <span className="bg-white px-3 py-1 text-[#1E1E1E] font-bold rounded-full flex items-center gap-1.5 border border-[#E5DDD3]">
                Category: {categoriesOptions.find(c => c.id === selectedCategory)?.label || selectedCategory}
                <button onClick={() => updateCategoryFilter('all')}><X size={12} /></button>
              </span>
            )}
            {selectedGender !== 'All' && (
              <span className="bg-white px-3 py-1 text-[#1E1E1E] font-bold rounded-full flex items-center gap-1.5 border border-[#E5DDD3]">
                Gender: {selectedGender}
                <button onClick={() => updateGenderFilter('All')}><X size={12} /></button>
              </span>
            )}
            {searchQuery && (
              <span className="bg-white px-3 py-1 text-[#1E1E1E] font-bold rounded-full flex items-center gap-1.5 border border-[#E5DDD3]">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')}><X size={12} /></button>
              </span>
            )}
            {showInStockOnly && (
              <span className="bg-white px-3 py-1 text-[#7D1E22] font-bold rounded-full flex items-center gap-1.5 border border-[#E5DDD3]">
                In Stock Only
                <button onClick={() => setShowInStockOnly(false)}><X size={12} /></button>
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-[#7D1E22] font-bold uppercase text-[11px] underline ml-auto hover:text-[#1E1E1E]"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* CATEGORY SECTIONS RENDER */}
        {/* ============================================================== */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#E5DDD3] rounded-3xl space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-[#FAF8F5] border border-[#E5DDD3] rounded-full flex items-center justify-center mx-auto text-[#6B6B6B]">
              <Search size={28} />
            </div>
            <h3 className="text-base font-serif font-bold uppercase tracking-widest text-[#1E1E1E]">
              No products found
            </h3>
            <p className="text-xs text-[#6B6B6B] max-w-sm mx-auto">
              We couldn't find any items matching your active criteria. Try selecting "All Ethnic Collections" or clearing your search terms.
            </p>
            <button
              onClick={handleResetFilters}
              className="bg-[#7D1E22] hover:bg-[#942429] text-white px-7 py-3 text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-md"
            >
              SHOW ALL ETHNIC DESIGNS
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
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 mb-6 border-b border-[#E5DDD3]">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#7D1E22] text-white font-mono font-bold text-xs flex items-center justify-center rounded-lg shadow-xs">
                      {section.sectionNumber}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-black uppercase tracking-tight text-[#1E1E1E]">
                          {section.title}
                        </h2>
                        {section.badge && (
                          <span className="bg-[#7D1E22] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-xs">
                            {section.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#6B6B6B] font-normal">
                        {section.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B] bg-white px-3 py-1 rounded-full border border-[#E5DDD3]">
                      {section.products.length} {section.products.length === 1 ? 'Design' : 'Designs'}
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
        <div className="mt-20 pt-10 border-t border-[#E5DDD3] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-4 sm:p-5 bg-white border border-[#E5DDD3] rounded-2xl shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E] block mb-1">HANDCRAFTED ARTISTRY</span>
            <span className="text-[11px] text-[#6B6B6B]">Fine Chikankari & Zardozi Work</span>
          </div>
          <div className="p-4 sm:p-5 bg-white border border-[#E5DDD3] rounded-2xl shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E] block mb-1">PREMIUM SILK & BROCADE</span>
            <span className="text-[11px] text-[#6B6B6B]">Finest Fabrics & Pure Linings</span>
          </div>
          <div className="p-4 sm:p-5 bg-white border border-[#E5DDD3] rounded-2xl shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E] block mb-1">ROYAL TAILORING</span>
            <span className="text-[11px] text-[#6B6B6B]">Curated Wedding & Festive Fits</span>
          </div>
          <div className="p-4 sm:p-5 bg-white border border-[#E5DDD3] rounded-2xl shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E] block mb-1">LIBAS HALDWANI</span>
            <span className="text-[11px] text-[#6B6B6B]">Style That Speaks For You</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Shop;
