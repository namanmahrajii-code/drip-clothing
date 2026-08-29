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
  Compass,
  Flame,
  Layers,
  Gift,
  ArrowUpRight
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


      {/* ========================================================================= */}
      {/* SECTION 1: TRENDING NOW */}
      {/* ========================================================================= */}
      <section id="trending-now" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-neutral-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-crimson/10 text-crimson border border-crimson/20 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-2">
              <Flame size={12} className="text-crimson" />
              <span>01 • HOT DROPS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-wider text-black">
              TRENDING NOW
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium">
              Discover what’s turning heads this week — trending cuts, premium brands & daily essentials.
            </p>
          </div>

          {/* Gender Filter Tabs with Glass Effect */}
          <div className="flex items-center gap-2 flex-wrap">
            {['All', 'Men', 'Unisex'].map((gender) => (
              <button
                key={gender}
                onClick={() => setTopPickGender(gender)}
                className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-all ${
                  topPickGender === gender
                    ? 'glass-btn-dark text-white shadow-md'
                    : 'glass-btn-light text-neutral-700 hover:text-black'
                }`}
              >
                {gender}
              </button>
            ))}
            <Link
              to="/shop"
              className="glass-btn-light text-xs font-bold uppercase tracking-wider text-neutral-800 hover:text-crimson px-4 py-2 rounded-full flex items-center gap-1.5 ml-1"
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

        {/* Bottom Explore Link */}
        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2.5 glass-btn-dark text-white px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-[0.25em] shadow-lg hover:scale-105 transition-all"
          >
            <span>EXPLORE ALL TRENDING ITEMS</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: COLLECTIONS */}
      {/* ========================================================================= */}
      <section id="collections" className="py-14 sm:py-20 bg-neutral-900 text-white border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-neutral-800 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 text-amber-300 border border-white/15 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-2 backdrop-blur-md">
                <Layers size={12} className="text-amber-300" />
                <span>02 • CATEGORY ARCHIVE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-wider text-white">
                COLLECTIONS
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Explore our 7 curated fashion categories tailored for quality, fit and all occasions.
              </p>
            </div>

            <Link
              to="/shop"
              className="glass-btn-light text-black px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest self-start md:self-auto hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>BROWSE ALL</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Visual Category Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-14">
            {[
              { id: 'shirts', name: 'Shirts', sec: '01', img: '/images/products/one-purple-shirt.png', desc: 'Camp collars & casuals' },
              { id: 'jerseys', name: 'Jerseys', sec: '02', img: '/images/products/bvb-home-jersey.png', desc: 'Retro match & sports' },
              { id: 'graphic-tees', name: 'Graphic Tees', sec: '03', img: '/images/products/midnight-graphic-tee.png', desc: '280 GSM Heavyweight' },
              { id: 'waffles', name: 'Waffle Knits', sec: '04', img: '/images/products/master-angel-raglan.png', desc: '350 GSM Raglan long sleeves' },
              { id: 'sweatshirts', name: 'Sweatshirts', sec: '05', img: '/images/products/heavy-sweatshirt-sand.png', desc: '420 GSM French terry' },
              { id: 'pants', name: 'Pants', sec: '06', img: '/images/products/piping-wideleg-trackpant-black.png', desc: 'Wide-leg relaxed track' },
            ].map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.id}`}
                className="group relative bg-neutral-950/80 border border-neutral-800 rounded-2xl overflow-hidden p-3 sm:p-4 flex flex-col justify-between hover:border-neutral-500 transition-all hover:-translate-y-1 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-black text-amber-400/90">{cat.sec}</span>
                  <ArrowUpRight size={13} className="text-neutral-500 group-hover:text-white transition-colors" />
                </div>

                <div className="my-3 aspect-square flex items-center justify-center p-2">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-black uppercase text-white tracking-wider group-hover:text-amber-300 transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Featured Horizontal Shelf A: Waffle / Raglan Knits */}
          {waffles.length > 0 && (
            <div className="border-t border-neutral-800 pt-8 pb-4">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                    SECTION 04 • 350 GSM
                  </span>
                  <h3 className="text-lg sm:text-2xl font-display font-black uppercase tracking-wider text-white">
                    WAFFLE / RAGLAN LONG SLEEVES
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scrollContainer(wafflesScroll, 'left')}
                    className="w-9 h-9 rounded-full glass-btn-dark text-white flex items-center justify-center transition-transform hover:scale-105"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => scrollContainer(wafflesScroll, 'right')}
                    className="w-9 h-9 rounded-full glass-btn-dark text-white flex items-center justify-center transition-transform hover:scale-105"
                    aria-label="Scroll right"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div
                ref={wafflesScroll}
                className="flex gap-4 sm:gap-6 overflow-x-auto hide-scrollbar pb-3 snap-x"
              >
                {waffles.map((product) => (
                  <div key={product.id} className="w-[170px] sm:w-[230px] md:w-[270px] shrink-0 snap-start">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Featured Horizontal Shelf B: Graphic Tees */}
          {graphicTees.length > 0 && (
            <div className="border-t border-neutral-800 pt-8">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                    SECTION 03 • 280 GSM
                  </span>
                  <h3 className="text-lg sm:text-2xl font-display font-black uppercase tracking-wider text-white">
                    GRAPHIC T-SHIRTS
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scrollContainer(graphicTeesScroll, 'left')}
                    className="w-9 h-9 rounded-full glass-btn-dark text-white flex items-center justify-center transition-transform hover:scale-105"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => scrollContainer(graphicTeesScroll, 'right')}
                    className="w-9 h-9 rounded-full glass-btn-dark text-white flex items-center justify-center transition-transform hover:scale-105"
                    aria-label="Scroll right"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div
                ref={graphicTeesScroll}
                className="flex gap-4 sm:gap-6 overflow-x-auto hide-scrollbar pb-3 snap-x"
              >
                {graphicTees.map((product) => (
                  <div key={product.id} className="w-[170px] sm:w-[230px] md:w-[270px] shrink-0 snap-start">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: EXPLORE MORE */}
      {/* ========================================================================= */}
      <section id="explore-more" className="py-14 sm:py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-neutral-900 text-white px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-2 shadow-xs">
              <Compass size={12} className="text-amber-300" />
              <span>03 • DISCOVER LIBAS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-wider text-neutral-900">
              EXPLORE MORE
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Store visits, brand story, VIP perks & verified customer love in Haldwani.
            </p>
          </div>

          {/* 3 Interactive Highlight Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tile 1: Store Destination */}
            <div className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-xl transition-all group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                  <MapPin size={20} className="text-crimson" />
                </div>
                <h3 className="text-lg sm:text-xl font-display font-black uppercase text-black">
                  VISIT OUR STORE
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                  Experience our premium collection in person. Open daily from 9:00 AM to 7:00 PM at RTO Gas Godown Link Road, Haldwani.
                </p>
              </div>
              <Link
                to="/contact"
                className="glass-btn-light text-black py-2.5 px-4 rounded-full text-xs font-black uppercase tracking-wider flex items-center justify-between group-hover:bg-neutral-900 group-hover:text-white transition-colors"
              >
                <span>Store Timings & Map</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Tile 2: VIP Perks & Giveaway */}
            <div className="bg-neutral-900 text-white border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-4 hover:border-amber-400/40 transition-all group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 text-amber-300 flex items-center justify-center border border-white/20">
                  <Gift size={20} className="text-amber-300" />
                </div>
                <h3 className="text-lg sm:text-xl font-display font-black uppercase text-white">
                  VIP REWARDS & PERKS
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                  Unlock immediate ₹500 vouchers, 20% drop codes, and guaranteed VIP allocations for new arrivals.
                </p>
              </div>
              <Link
                to="/giveaway"
                className="glass-btn-light text-black py-2.5 px-4 rounded-full text-xs font-black uppercase tracking-wider flex items-center justify-between hover:scale-102 transition-all shadow-md"
              >
                <span>Claim VIP Rewards</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Tile 3: About LIBAS Story */}
            <div className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-xl transition-all group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200">
                  <Sparkles size={20} className="text-indigo-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-display font-black uppercase text-black">
                  THE LIBAS STORY
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                  Quality fabrics, contemporary fits, and curated collections brought together under one roof in Haldwani.
                </p>
              </div>
              <Link
                to="/about"
                className="glass-btn-light text-black py-2.5 px-4 rounded-full text-xs font-black uppercase tracking-wider flex items-center justify-between group-hover:bg-neutral-900 group-hover:text-white transition-colors"
              >
                <span>Read Brand Story</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Store Location & Map Banner */}
          <div className="bg-neutral-900 text-white border border-neutral-800/80 rounded-3xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-2xl">
            {/* Store Info Column */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-crimson text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                  <span>HALDWANI STORE</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-wider text-white mb-2">
                  VISIT LIBAS IN HALDWANI
                </h3>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                  Step inside our fashion destination at RTO Gas Godown Link Road. Explore premium brand collections and tailored fits in person.
                </p>

                <div className="space-y-3.5 text-xs text-neutral-300 border-t border-neutral-800 pt-5">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-crimson shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white font-bold uppercase">Store Address</strong>
                      <p className="text-neutral-300 mt-0.5 leading-relaxed font-medium">
                        LIBAS, RTO Gas Godown Link Road, Haldwani, Nainital, Uttarakhand – 263139
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Compass size={18} className="text-brandYellow shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white font-bold uppercase">Opening Hours</strong>
                      <p className="text-amber-400 font-bold mt-0.5">
                        9:00 AM – 7:00 PM (Daily)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn-light text-black px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
                >
                  <span>GET DIRECTIONS</span>
                  <ExternalLink size={14} />
                </a>

                <Link
                  to="/shop"
                  className="glass-btn-dark text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all"
                >
                  <ShoppingBag size={15} />
                  <span>EXPLORE COLLECTION</span>
                </Link>
              </div>
            </div>

            {/* Interactive Map Embed */}
            <div className="lg:col-span-6 min-h-[280px] sm:min-h-[320px] relative bg-neutral-800 p-3 sm:p-4">
              <div className="w-full h-full min-h-[280px] rounded-2xl overflow-hidden shadow-inner border border-neutral-700">
                <iframe
                  title="LIBAS Haldwani Store Location Map"
                  src="https://maps.google.com/maps?q=RTO+Gas+Godown+Link+Road,+Haldwani,+Uttarakhand&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full min-h-[280px] border-0 grayscale hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div>
            <div className="flex items-end justify-between mb-8 pb-4 border-b border-neutral-200">
              <div>
                <div className="flex items-center gap-2 text-amber-500 mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                  <span className="text-[11px] font-bold text-neutral-600 ml-1">
                    4.8 / 5.0 (Verified Shopper Reviews)
                  </span>
                </div>
                <h3 className="text-xl sm:text-3xl font-display font-black uppercase tracking-wider text-neutral-900">
                  WHAT CUSTOMERS SAY ABOUT LIBAS
                </h3>
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
                  className="w-[280px] sm:w-[340px] shrink-0 bg-white p-5 sm:p-6 rounded-2xl border border-neutral-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-4 snap-start hover:border-neutral-900/30 hover:shadow-lg transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={12} fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-[9px] font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase">
                        VERIFIED BUYER
                      </span>
                    </div>

                    <p className="text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-normal italic">
                      "{review.comment}"
                    </p>
                  </div>

                  <div className="border-t border-neutral-100 pt-3 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-neutral-900 block">{review.name}</span>
                      <span className="text-[10px] text-neutral-400">{review.city}</span>
                    </div>
                    <span className="text-[10px] text-neutral-400">{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
