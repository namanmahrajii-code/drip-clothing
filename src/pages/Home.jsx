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
      {/* 1. HERO SECTION - RESPONSIVE PHOTOSHOOT BANNER */}
      <section className="relative w-full overflow-hidden bg-neutral-950 border-b border-neutral-200">
        <div className="relative w-full">
          {/* Desktop / Laptop Banner (Full resolution 2:1 landscape) */}
          <div className="hidden md:block w-full relative overflow-hidden bg-neutral-950 group">
            <img
              src="/images/banners/hero-desktop.jpg"
              alt="LIBAS Haldwani - Premium Fashion Destination"
              className="w-full h-auto max-h-[720px] object-cover object-center transition-transform duration-700 group-hover:scale-[1.008]"
              loading="eager"
            />
            {/* Subtle soft gradient at bottom edge to blend with marquee */}
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            {/* Interactive CTAs on Desktop positioned over banner */}
            <div className="absolute bottom-6 right-8 lg:bottom-10 lg:right-16 flex items-center gap-3.5 z-10">
              <Link
                to="/shop"
                className="bg-white/95 hover:bg-white text-black px-6 py-3 lg:px-8 lg:py-3.5 text-xs font-black uppercase tracking-[0.25em] shadow-2xl hover:scale-105 transition-all flex items-center gap-2 border border-white group/btn"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="bg-stone-200/95 hover:bg-white text-stone-900 px-6 py-3 lg:px-7 lg:py-3.5 text-xs font-black uppercase tracking-[0.25em] shadow-2xl hover:scale-105 transition-all flex items-center gap-2 border border-stone-300"
              >
                <MapPin size={14} className="text-crimson" />
                <span>VISIT STORE</span>
              </Link>
            </div>
          </div>

          {/* Mobile Phone Banner (Portrait) */}
          <div className="block md:hidden w-full h-[540px] sm:h-[580px] relative overflow-hidden bg-neutral-950">
            <img
              src="/images/banners/hero-mobile.jpg"
              alt="LIBAS Haldwani Fashion Store"
              className="w-full h-full object-cover object-center brightness-[0.88]"
              loading="eager"
            />
            {/* Mobile Gradient Overlay - gentle on top so the illuminated LIBAS sign shines */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/10" />

            {/* Mobile Hero Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 text-white">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-amber-300 border border-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em]">
                  <Sparkles size={12} className="text-amber-300" />
                  <span>LIBAS • HALDWANI</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight text-white leading-tight">
                  Style That Speaks For You.
                </h1>

                <p className="text-xs text-neutral-200 font-normal leading-relaxed">
                  Discover stylish collections, premium brands and everyday fashion curated to help you look and feel your best.
                </p>

                {/* Mobile CTAs */}
                <div className="flex flex-col gap-2 pt-1">
                  <Link
                    to="/shop"
                    className="inline-flex items-center justify-center gap-2 bg-white text-black py-3 text-xs font-black uppercase tracking-[0.2em] shadow-lg active:scale-[0.99] transition-all"
                  >
                    <span>Explore Collection</span>
                    <ArrowRight size={14} />
                  </Link>

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-black/75 border border-white/40 text-white py-3 text-xs font-black uppercase tracking-[0.2em] backdrop-blur-md active:scale-[0.99] transition-all"
                  >
                    <MapPin size={14} className="text-crimson" />
                    <span>Visit Our Store</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hero Marquee */}
        <div className="bg-black text-white py-2.5 border-t border-neutral-800 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.3em] text-neutral-300">
          <div className="flex w-full whitespace-nowrap overflow-hidden">
            <div className="inline-flex animate-marquee gap-8 items-center marquee-fade">
              <span>LIBAS HALDWANI</span>
              <span>•</span>
              <span>RTO GAS GODOWN LINK ROAD</span>
              <span>•</span>
              <span>OPEN DAILY: 9:00 AM – 7:00 PM</span>
              <span>•</span>
              <span>PREMIUM BRANDS</span>
              <span>•</span>
              <span>LATEST COLLECTIONS</span>
              <span>•</span>
              <span>QUALITY ASSURED</span>
              <span>•</span>
              <span>STYLE FOR EVERYONE</span>
              <span>•</span>
            </div>
            <div className="inline-flex animate-marquee gap-8 items-center marquee-fade" aria-hidden="true">
              <span>LIBAS HALDWANI</span>
              <span>•</span>
              <span>RTO GAS GODOWN LINK ROAD</span>
              <span>•</span>
              <span>OPEN DAILY: 9:00 AM – 7:00 PM</span>
              <span>•</span>
              <span>PREMIUM BRANDS</span>
              <span>•</span>
              <span>LATEST COLLECTIONS</span>
              <span>•</span>
              <span>QUALITY ASSURED</span>
              <span>•</span>
              <span>STYLE FOR EVERYONE</span>
              <span>•</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KEY FEATURES PILLARS */}
      <section className="py-8 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-4 sm:p-5 bg-white border border-neutral-200 shadow-2xs flex flex-col justify-center">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-crimson block mb-1">01 / BRAND</span>
              <h3 className="text-sm sm:text-base font-display font-black uppercase tracking-wider text-black">Premium Brands</h3>
              <p className="text-[11px] sm:text-xs text-neutral-500 mt-1">Carefully selected high-quality labels & contemporary designs</p>
            </div>

            <div className="p-4 sm:p-5 bg-white border border-neutral-200 shadow-2xs flex flex-col justify-center">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-crimson block mb-1">02 / TREND</span>
              <h3 className="text-sm sm:text-base font-display font-black uppercase tracking-wider text-black">Latest Collections</h3>
              <p className="text-[11px] sm:text-xs text-neutral-500 mt-1">Fresh seasonal drops, trending fits and modern essentials</p>
            </div>

            <div className="p-4 sm:p-5 bg-white border border-neutral-200 shadow-2xs flex flex-col justify-center">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-crimson block mb-1">03 / FABRIC</span>
              <h3 className="text-sm sm:text-base font-display font-black uppercase tracking-wider text-black">Quality Assured</h3>
              <p className="text-[11px] sm:text-xs text-neutral-500 mt-1">Premium fabrics, superior comfort and reliable craftsmanship</p>
            </div>

            <div className="p-4 sm:p-5 bg-white border border-neutral-200 shadow-2xs flex flex-col justify-center">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-crimson block mb-1">04 / OCCASION</span>
              <h3 className="text-sm sm:text-base font-display font-black uppercase tracking-wider text-black">Style for Everyone</h3>
              <p className="text-[11px] sm:text-xs text-neutral-500 mt-1">Everyday fashion to statement styles for diverse occasions</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TOP PICKS / FEATURED COLLECTION */}
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

      {/* 4. HORIZONTAL SCROLLABLE SHELF: WAFFLE / RAGLAN KNITS */}
      {waffles.length > 0 && (
        <section className="py-12 bg-neutral-900 text-white border-y border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-crimson text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest mb-1.5">
                  <span>NEW ARRIVALS</span>
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

      {/* 5. HORIZONTAL SCROLLABLE SHELF: GRAPHIC TEES */}
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

      {/* 6. BRAND STATEMENT / ABOUT LIBAS */}
      <section className="py-14 sm:py-20 bg-neutral-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-bold block">
            ABOUT LIBAS
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-wider leading-tight text-white">
            LIBAS HALDWANI
          </h2>
          <p className="text-neutral-300 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            "LIBAS is your fashion destination in Haldwani, offering a thoughtfully curated collection of stylish clothing for different styles and occasions. From everyday essentials to the latest fashion trends, we bring together quality, comfort and style under one roof."
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-white text-black hover:bg-brandYellow px-6 py-3 text-xs font-black uppercase tracking-[0.2em] transition-colors shadow-md"
            >
              <span>ABOUT LIBAS</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-colors"
            >
              <MapPin size={14} className="text-crimson" />
              <span>VISIT STORE</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. VISIT OUR STORE SECTION */}
      <section className="py-14 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900 text-white border border-neutral-800 grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-2xl">
          {/* Store Info Column */}
          <div className="lg:col-span-6 p-6 sm:p-12 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-crimson text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 mb-3">
                <span>VISIT OUR STORE</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-wider text-white mb-2">
                LIBAS HALDWANI
              </h2>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                Step inside LIBAS in Haldwani. Explore our full collection of stylish clothing, premium brands, and latest occasion wear in person.
              </p>

              <div className="space-y-4 text-xs text-neutral-300 border-t border-neutral-800 pt-6">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-crimson shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold uppercase">Store Address</strong>
                    <p className="text-neutral-300 mt-0.5 leading-relaxed font-medium">
                      LIBAS<br />
                      RTO Gas Godown Link Road<br />
                      Haldwani, Nainital<br />
                      Uttarakhand – 263139<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Compass size={18} className="text-brandYellow shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold uppercase">Opening Hours</strong>
                    <p className="text-amber-400 font-bold mt-0.5">
                      9:00 AM – 7:00 PM (Open Daily)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <Star size={18} className="text-amber-400 fill-amber-400 shrink-0" />
                  <div>
                    <strong className="block text-white font-bold uppercase">Customer Rating</strong>
                    <p className="text-amber-400 font-bold">4.8 / 5.0 (Verified Store Reviews)</p>
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

              <Link
                to="/shop"
                className="bg-neutral-800 hover:bg-neutral-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 text-xs font-bold uppercase tracking-widest transition-colors border border-neutral-700 flex items-center gap-2"
              >
                <ShoppingBag size={15} />
                <span>EXPLORE COLLECTION</span>
              </Link>
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="lg:col-span-6 min-h-[300px] sm:min-h-[350px] relative bg-neutral-800">
            <iframe
              title="LIBAS Haldwani Store Location Map"
              src="https://maps.google.com/maps?q=RTO+Gas+Godown+Link+Road,+Haldwani,+Uttarakhand&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[300px] border-0 grayscale hover:grayscale-0 transition-all duration-500"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 8. HORIZONTAL MINIMAL & COZY CUSTOMER REVIEWS */}
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
                  4.8 / 5.0 (Verified Shopper Reviews)
                </span>
              </div>
              <h2 className="text-xl sm:text-3xl font-display font-black uppercase tracking-wider text-neutral-900">
                WHAT CUSTOMERS SAY ABOUT LIBAS
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
                      {review.city} • {review.productName || 'LIBAS Collection'}
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
