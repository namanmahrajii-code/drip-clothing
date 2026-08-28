import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Instagram,
  Sparkles,
  ExternalLink,
  ShoppingBag,
  Compass
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { products, wallOfLoveReviews } = useShop();
  const [topPickGender, setTopPickGender] = useState('All');

  // Filter top picks
  const topPicks = products.filter((p) => {
    if (topPickGender === 'All') return true;
    if (topPickGender === 'Men') return p.gender === 'Men' || p.gender === 'Unisex';
    return p.gender === topPickGender;
  }).slice(0, 8);

  // Group products for category shelves
  const waffles = products.filter((p) => p.category === 'waffles');
  const graphicTees = products.filter((p) => p.category === 'graphic-tees');
  const jerseys = products.filter((p) => p.category === 'jerseys');
  const shirts = products.filter((p) => p.category === 'shirts');
  const sweatshirts = products.filter((p) => p.category === 'sweatshirts');

  const createScrollRef = () => useRef(null);
  const wafflesScroll = createScrollRef();
  const graphicTeesScroll = createScrollRef();
  const jerseysScroll = createScrollRef();
  const sweatshirtsScroll = createScrollRef();

  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=5FWQ%2BF9+Haldwani+Uttarakhand";

  return (
    <div className="bg-white min-h-screen text-black animate-page-fade">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[80vh] sm:min-h-[85vh] bg-black flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Vignette Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=2000&auto=format&fit=crop"
            alt="Drip Clothing Haldwani Streetwear"
            className="w-full h-full object-cover object-center opacity-35 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white py-20 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-neutral-900/90 border border-neutral-700 px-4 py-1.5 text-[10px] sm:text-xs uppercase font-bold tracking-[0.3em] text-neutral-200 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-brandYellow animate-pulse" />
            <span>HALDWANI • STREETWEAR CLOTHING STORE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] leading-tight mb-4 text-white">
            DRIP CLOTHING
          </h1>

          <p className="text-sm sm:text-lg text-neutral-300 max-w-2xl mx-auto mb-8 font-medium tracking-wide leading-relaxed">
            Drip Clothing Haldwani is a streetwear-focused clothing store bringing trending graphic tees, jerseys, waffle long sleeves, sweatshirts, shirts and everyday streetwear to Haldwani.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              to="/shop"
              className="w-full sm:w-auto bg-white text-black hover:bg-brandYellow hover:text-black px-8 py-4 text-xs font-black uppercase tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl group"
            >
              <span>SHOP COLLECTION</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto bg-transparent text-white hover:bg-neutral-900 border border-neutral-500 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MapPin size={15} />
              <span>VISIT OUR STORE</span>
            </Link>
          </div>
        </div>

        {/* Bottom Hero Marquee */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/95 py-2.5 border-t border-neutral-800 text-[10px] font-extrabold uppercase tracking-[0.3em] text-neutral-400">
          <div className="flex w-full whitespace-nowrap overflow-hidden">
            <div className="inline-flex animate-marquee gap-8 items-center marquee-fade">
              <span>CHARAYAL CHAURAHA, HALDWANI</span>
              <span>•</span>
              <span>WAFFLE RAGLAN LONG SLEEVES</span>
              <span>•</span>
              <span>280 GSM GRAPHIC TEES</span>
              <span>•</span>
              <span>RETRO FOOTBALL JERSEYS</span>
              <span>•</span>
              <span>★ 4.6 GOOGLE RATING (19 REVIEWS)</span>
              <span>•</span>
            </div>
            <div className="inline-flex animate-marquee gap-8 items-center marquee-fade" aria-hidden="true">
              <span>CHARAYAL CHAURAHA, HALDWANI</span>
              <span>•</span>
              <span>WAFFLE RAGLAN LONG SLEEVES</span>
              <span>•</span>
              <span>280 GSM GRAPHIC TEES</span>
              <span>•</span>
              <span>RETRO FOOTBALL JERSEYS</span>
              <span>•</span>
              <span>★ 4.6 GOOGLE RATING (19 REVIEWS)</span>
              <span>•</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TOP PICKS / FEATURED DROPS */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-neutral-200 gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-crimson block mb-1">
              Curated Selection
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-wider text-black">
              TOP PICKS OF THE WEEK
            </h2>
          </div>

          {/* Gender Filter Tabs */}
          <div className="flex items-center gap-2">
            {['All', 'Men', 'Unisex'].map((gender) => (
              <button
                key={gender}
                onClick={() => setTopPickGender(gender)}
                className={`text-xs font-bold uppercase tracking-widest px-4 py-2 transition-all ${
                  topPickGender === gender
                    ? 'bg-black text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {gender}
              </button>
            ))}
            <Link
              to="/shop"
              className="text-xs font-bold uppercase tracking-widest text-neutral-800 hover:text-crimson px-3 py-2 flex items-center gap-1 ml-2"
            >
              <span>VIEW ALL</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {topPicks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. HORIZONTAL SCROLLABLE SHELF: WAFFLE / RAGLAN LONG SLEEVES */}
      {waffles.length > 0 && (
        <section className="py-12 bg-neutral-900 text-white border-y border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-crimson text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest mb-1.5">
                  <span>NEW DROP // 04</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-wider text-white">
                  WAFFLE / RAGLAN LONG SLEEVES
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/shop?category=waffles"
                  className="text-xs font-bold uppercase tracking-widest text-neutral-300 hover:text-white mr-2 hidden sm:inline-block"
                >
                  View All ({waffles.length})
                </Link>
                <button
                  onClick={() => scrollContainer(wafflesScroll, 'left')}
                  className="w-9 h-9 bg-neutral-800 border border-neutral-700 hover:bg-white hover:text-black flex items-center justify-center transition-colors shadow-xs"
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scrollContainer(wafflesScroll, 'right')}
                  className="w-9 h-9 bg-neutral-800 border border-neutral-700 hover:bg-white hover:text-black flex items-center justify-center transition-colors shadow-xs"
                  aria-label="Scroll right"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div
              ref={wafflesScroll}
              className="flex gap-3 sm:gap-6 overflow-x-auto hide-scrollbar pb-3 snap-x"
            >
              {waffles.map((product) => (
                <div key={product.id} className="w-[165px] sm:w-[230px] md:w-[270px] shrink-0 snap-start">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. HORIZONTAL SCROLLABLE SHELF: GRAPHIC TEES */}
      {graphicTees.length > 0 && (
        <section className="py-10 sm:py-12 bg-neutral-50 border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-4 sm:mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">
                  280 GSM Combed Cotton
                </span>
                <h3 className="text-lg sm:text-2xl font-display font-black uppercase tracking-wider text-black">
                  GRAPHIC T-SHIRTS
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/shop?category=graphic-tees"
                  className="text-xs font-bold uppercase tracking-widest text-neutral-700 hover:text-black mr-2 hidden sm:inline-block"
                >
                  View All ({graphicTees.length})
                </Link>
                <button
                  onClick={() => scrollContainer(graphicTeesScroll, 'left')}
                  className="w-8 h-8 sm:w-9 sm:h-9 bg-white border border-neutral-300 hover:bg-black hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => scrollContainer(graphicTeesScroll, 'right')}
                  className="w-8 h-8 sm:w-9 sm:h-9 bg-white border border-neutral-300 hover:bg-black hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                  aria-label="Scroll right"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div
              ref={graphicTeesScroll}
              className="flex gap-3 sm:gap-6 overflow-x-auto hide-scrollbar pb-3 snap-x"
            >
              {graphicTees.map((product) => (
                <div key={product.id} className="w-[165px] sm:w-[230px] md:w-[270px] shrink-0 snap-start">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. BRAND STATEMENT BANNER */}
      <section className="py-14 sm:py-20 bg-neutral-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-bold mb-2 block">
            ABOUT OUR STORE
          </span>
          <h2 className="text-xl sm:text-4xl font-display font-black uppercase tracking-wider leading-tight text-white mb-4 sm:mb-6">
            DRIP CLOTHING HALDWANI
          </h2>
          <p className="text-neutral-300 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 font-normal">
            "Drip Clothing Haldwani is a streetwear-focused clothing store bringing trending graphic tees, jerseys, waffle long sleeves, sweatshirts, shirts and everyday streetwear to Haldwani."
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-white text-black hover:bg-brandYellow px-5 py-2.5 sm:px-6 sm:py-3 text-xs font-black uppercase tracking-[0.2em] transition-colors"
            >
              <span>ABOUT US</span>
              <ArrowRight size={14} />
            </Link>
            <a
              href="https://www.instagram.com/drip__clothing__/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-pink-600 border border-neutral-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 text-xs font-bold uppercase tracking-[0.2em] transition-colors"
            >
              <Instagram size={14} />
              <span>@drip__clothing__</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. VISIT OUR STORE SECTION */}
      <section className="py-14 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900 text-white border border-neutral-800 grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-2xl">
          {/* Store Info Column */}
          <div className="lg:col-span-6 p-6 sm:p-12 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-crimson text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 mb-3">
                <span>VISIT OUR STORE</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-wider text-white mb-2">
                FIND US IN HALDWANI
              </h2>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                Step inside our streetwear store in Haldwani. Explore our full collection of graphic tees, jerseys, waffle raglans, and sweatshirts in person.
              </p>

              <div className="space-y-4 text-xs text-neutral-300 border-t border-neutral-800 pt-6">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-crimson shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold uppercase">Store Address</strong>
                    <p className="text-neutral-400 mt-0.5 leading-relaxed">
                      Charayal Chauraha, Near Birla School,<br />
                      Opposite Nainital Bank,<br />
                      Haldwani, Uttarakhand 263139
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Compass size={18} className="text-brandYellow shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold uppercase">Google Maps Plus Code</strong>
                    <p className="text-neutral-300 font-mono font-bold mt-0.5">5FWQ+F9, Haldwani, Uttarakhand</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Instagram size={18} className="text-pink-500 shrink-0" />
                  <div>
                    <strong className="block text-white font-bold uppercase">Instagram</strong>
                    <a
                      href="https://www.instagram.com/drip__clothing__/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-300 hover:text-pink-400 font-semibold"
                    >
                      @drip__clothing__
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <Star size={18} className="text-amber-400 fill-amber-400 shrink-0" />
                  <div>
                    <strong className="block text-white font-bold uppercase">Google Rating</strong>
                    <p className="text-amber-400 font-bold">4.6 / 5.0 (19 Reviews)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black hover:bg-brandYellow hover:text-black px-5 py-2.5 sm:px-6 sm:py-3 text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2 shadow"
              >
                <span>GET DIRECTIONS</span>
                <ExternalLink size={14} />
              </a>

              <a
                href="https://www.instagram.com/drip__clothing__/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-800 hover:bg-pink-600 text-white px-5 py-2.5 sm:px-6 sm:py-3 text-xs font-bold uppercase tracking-widest transition-colors border border-neutral-700 flex items-center gap-2"
              >
                <Instagram size={15} />
                <span>INSTAGRAM PAGE</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="lg:col-span-6 min-h-[300px] sm:min-h-[350px] relative bg-neutral-800">
            <iframe
              title="Drip Clothing Haldwani Store Map"
              src="https://maps.google.com/maps?q=5FWQ%2BF9,+Haldwani,+Uttarakhand&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[300px] border-0 grayscale hover:grayscale-0 transition-all duration-500"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 7. HORIZONTAL MINIMAL & COZY CUSTOMER REVIEWS */}
      <section className="py-12 sm:py-20 bg-[#fbfbfb] border-t border-neutral-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-end justify-between mb-8 pb-4 border-b border-neutral-200/70">
            <div>
              <div className="flex items-center gap-2 text-amber-500 mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
                <span className="text-[11px] font-bold text-neutral-600 ml-1">
                  4.6 / 5.0 (19 Verified Reviews)
                </span>
              </div>
              <h2 className="text-xl sm:text-3xl font-display font-black uppercase tracking-wider text-neutral-900">
                WHAT CUSTOMERS SAY
              </h2>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                Swipe to read
              </span>
            </div>
          </div>

          {/* Horizontal Cozy Scroll Track */}
          <div className="flex gap-4 sm:gap-5 overflow-x-auto hide-scrollbar pb-4 pt-1 snap-x">
            {wallOfLoveReviews.map((review) => (
              <div
                key={review.id}
                className="w-[280px] sm:w-[340px] shrink-0 bg-white p-5 sm:p-6 rounded-none border border-neutral-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-4 snap-start hover:border-neutral-900 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-[9px] font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 uppercase">
                      VERIFIED BUYER
                    </span>
                  </div>

                  <p className="text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-normal italic">
                    "{review.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900">
                      {review.name}
                    </h4>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">
                      {review.city} • {review.productName || 'Streetwear'}
                    </p>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono">{review.date || 'Recently'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
