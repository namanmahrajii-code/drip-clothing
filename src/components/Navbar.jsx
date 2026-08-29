import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, Shield, Instagram, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Navbar = () => {
  const { cartItemCount, wishlist, setIsCartOpen, setIsSearchOpen } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'COLLECTION', path: '/shop' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'VISIT STORE', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Announcement Marquee */}
      <div className="bg-black text-white py-1.5 px-4 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase border-b border-neutral-800 overflow-hidden relative">
        <div className="flex w-full whitespace-nowrap overflow-hidden">
          <div className="inline-flex animate-marquee gap-10 items-center marquee-fade">
            <span>✨ LIBAS HALDWANI • MODERN FASHION & CLOTHING STORE</span>
            <span className="text-brandYellow font-bold">📍 RTO GAS GODOWN LINK ROAD, HALDWANI</span>
            <span className="text-amber-400 font-bold">⏰ OPEN DAILY: 9:00 AM – 7:00 PM</span>
            <span>• PREMIUM BRANDS • LATEST COLLECTIONS • QUALITY ASSURED •</span>
            <span>• STYLE THAT SPEAKS FOR YOU •</span>
          </div>
          <div className="inline-flex animate-marquee gap-10 items-center marquee-fade" aria-hidden="true">
            <span>✨ LIBAS HALDWANI • MODERN FASHION & CLOTHING STORE</span>
            <span className="text-brandYellow font-bold">📍 RTO GAS GODOWN LINK ROAD, HALDWANI</span>
            <span className="text-amber-400 font-bold">⏰ OPEN DAILY: 9:00 AM – 7:00 PM</span>
            <span>• PREMIUM BRANDS • LATEST COLLECTIONS • QUALITY ASSURED •</span>
            <span>• STYLE THAT SPEAKS FOR YOU •</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-sm border-b border-neutral-200/80 py-3.5'
            : 'bg-white border-b border-neutral-200 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Trigger & Logo Area */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1 text-black hover:text-crimson transition-colors focus:outline-none shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group min-w-0">
              <img
                src="/images/logo.png"
                alt="LIBAS Logo"
                className="h-8 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105 shrink-0 rounded-sm"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-display font-black text-base sm:text-xl tracking-[0.16em] sm:tracking-[0.2em] text-black group-hover:text-neutral-700 transition-colors uppercase leading-none truncate">
                  LIBAS
                </span>
                <span className="text-[7px] sm:text-[8px] font-sans uppercase tracking-[0.3em] sm:tracking-[0.4em] text-neutral-500 font-bold mt-0.5 truncate">
                  HALDWANI • FASHION STORE
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs font-bold tracking-[0.2em] transition-all relative py-1 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-black font-black'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action Icons: Location & Timing (Desktop), Search, Wishlist, Bag */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            {/* Store Hours / Location preview */}
            <Link
              to="/contact"
              className="hidden md:flex p-1.5 text-neutral-700 hover:text-black transition-colors items-center gap-1.5 text-xs font-bold"
              title="RTO Gas Godown Link Road, Haldwani (9:00 AM – 7:00 PM)"
            >
              <MapPin size={16} className="text-crimson" />
              <span className="hidden xl:inline text-[11px] font-sans tracking-wider uppercase text-neutral-600">
                Haldwani • 9 AM–7 PM
              </span>
            </Link>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-neutral-800 hover:text-black transition-colors flex items-center gap-1.5 text-xs font-medium"
              aria-label="Search catalog"
            >
              <Search size={19} />
              <span className="hidden md:inline text-[11px] tracking-wider uppercase text-neutral-500 hover:text-black font-bold">
                Search
              </span>
            </button>

            {/* Wishlist Shortcut */}
            <Link
              to="/shop?filter=wishlist"
              className="p-1.5 text-neutral-800 hover:text-crimson transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-crimson text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Bag / Cart Drawer Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-black text-white px-3.5 py-2 rounded-none hover:bg-neutral-800 transition-colors shadow-sm"
              aria-label="View shopping bag"
            >
              <ShoppingBag size={17} />
              <span className="text-[11px] font-bold tracking-widest uppercase hidden sm:inline">
                BAG
              </span>
              <span className="bg-brandYellow text-black font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-neutral-200 px-6 py-6 animate-slide-up shadow-xl">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-bold tracking-[0.2em] text-neutral-900 hover:text-crimson transition-colors py-2 flex items-center justify-between border-b border-neutral-100"
                >
                  <span>{link.name}</span>
                </Link>
              ))}

              <Link
                to="/contact"
                className="text-xs font-bold tracking-[0.15em] text-neutral-700 hover:text-black py-2 flex items-center gap-2 border-b border-neutral-100"
              >
                <MapPin size={16} className="text-crimson" />
                <span>RTO GAS GODOWN LINK ROAD, HALDWANI</span>
              </Link>

              <div className="text-[11px] font-bold tracking-[0.15em] text-neutral-500 py-1 flex items-center gap-2">
                <span>⏰ OPEN DAILY: 9:00 AM – 7:00 PM</span>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
