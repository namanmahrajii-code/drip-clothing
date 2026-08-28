import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MapPin, ArrowRight, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useShop();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to Drip Clothing Drop Updates');
    setEmail('');
  };

  return (
    <footer className="bg-black text-white pt-16 pb-12 border-t border-neutral-800">
      {/* Brand Trust Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 border-b border-neutral-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-neutral-900 flex items-center justify-center text-amber-400 border border-neutral-800 shrink-0">
            <Star size={20} fill="currentColor" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">4.6 / 5 Google Rating</h4>
            <p className="text-[11px] text-neutral-400">19 Verified Customer Reviews</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-neutral-900 flex items-center justify-center text-white border border-neutral-800 shrink-0">
            <MapPin size={20} className="text-crimson" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Haldwani, Uttarakhand</h4>
            <p className="text-[11px] text-neutral-400">Charayal Chauraha, Near Birla School</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-neutral-900 flex items-center justify-center text-pink-500 border border-neutral-800 shrink-0">
            <Instagram size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">@drip__clothing__</h4>
            <p className="text-[11px] text-neutral-400">Official Instagram Page</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-neutral-900 flex items-center justify-center text-brandYellow border border-neutral-800 shrink-0">
            <span className="font-mono font-black text-sm">2026</span>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Streetwear Clothing Brand</h4>
            <p className="text-[11px] text-neutral-400">Graphic Tees, Jerseys & Waffles</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        {/* Brand Details */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Drip Clothing"
              className="h-12 w-auto object-contain brightness-110"
            />
            <div className="flex flex-col">
              <span className="font-display font-black text-xl sm:text-2xl tracking-[0.18em] uppercase text-white">
                DRIP CLOTHING
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 font-semibold">
                HALDWANI • STREETWEAR
              </span>
            </div>
          </div>

          <div className="text-xs text-neutral-300 space-y-1 leading-relaxed border-l-2 border-neutral-700 pl-3">
            <p className="font-bold text-white">Drip Clothing Haldwani</p>
            <p>Charayal Chauraha, Near Birla School,</p>
            <p>Opposite Nainital Bank,</p>
            <p>Haldwani, Prempur Loshyani,</p>
            <p>Uttarakhand – 263139, India</p>
            <p className="pt-1 text-neutral-400 font-mono text-[11px]">
              Plus Code: <strong className="text-brandYellow">5FWQ+F9</strong>, Haldwani, Uttarakhand
            </p>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <a
              href="https://www.instagram.com/drip__clothing__/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-pink-600 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white border border-neutral-800 transition-colors"
            >
              <Instagram size={15} />
              <span>Instagram: @drip__clothing__</span>
            </a>

            <a
              href="https://maps.google.com/?q=5FWQ%2BF9,+Haldwani,+Uttarakhand"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-white hover:text-black px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white border border-neutral-800 transition-colors"
            >
              <MapPin size={15} />
              <span>Get Directions</span>
            </a>
          </div>
        </div>

        {/* Collections */}
        <div className="lg:col-span-3">
          <h4 className="text-xs font-black uppercase tracking-[0.25em] text-white mb-4">
            Collections
          </h4>
          <ul className="space-y-2 text-xs text-neutral-400">
            <li><Link to="/shop?category=waffles" className="hover:text-white transition-colors">04 — Waffle / Raglan Tops</Link></li>
            <li><Link to="/shop?category=graphic-tees" className="hover:text-white transition-colors">03 — Graphic T-Shirts</Link></li>
            <li><Link to="/shop?category=sweatshirts" className="hover:text-white transition-colors">05 — Sweatshirts & Hoodies</Link></li>
            <li><Link to="/shop?category=shirts" className="hover:text-white transition-colors">01 — Shirts & Baseball Knits</Link></li>
            <li><Link to="/shop?category=jerseys" className="hover:text-white transition-colors">02 — Retro Match Jerseys</Link></li>
            <li><Link to="/shop?category=pants" className="hover:text-white transition-colors">06 — Track Pants</Link></li>
          </ul>
        </div>

        {/* Quick Links & Newsletter */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-[0.25em] text-white mb-2">
            Store & Contact
          </h4>
          <ul className="space-y-1.5 text-xs text-neutral-400 mb-4">
            <li><Link to="/contact" className="hover:text-white transition-colors">Visit Our Haldwani Store</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Drip Clothing</Link></li>
            <li><Link to="/policy" className="hover:text-white transition-colors">Store Policies</Link></li>
          </ul>

          <h5 className="text-[11px] font-black uppercase tracking-wider text-neutral-300">
            Stay Updated On New Drops
          </h5>
          <form onSubmit={handleSubscribe} className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER YOUR EMAIL"
              className="w-full bg-neutral-900 border border-neutral-800 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white uppercase"
            />
            <button
              type="submit"
              className="bg-white text-black px-3.5 hover:bg-brandYellow transition-colors flex items-center justify-center font-bold text-xs"
              aria-label="Submit newsletter"
            >
              <ArrowRight size={16} />
            </button>
          </form>
          {subscribed && (
            <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold">
              ✓ Subscribed to Drip Clothing drop alerts.
            </p>
          )}
        </div>
      </div>

      {/* Bottom Legal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <p className="text-[11px] tracking-wider uppercase">
          © {new Date().getFullYear()} DRIP CLOTHING HALDWANI. ALL RIGHTS RESERVED.
        </p>

        <div className="flex items-center gap-3 text-[10px] tracking-widest uppercase font-semibold text-neutral-400">
          <a
            href="https://www.instagram.com/drip__clothing__/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Instagram: @drip__clothing__
          </a>
          <span>•</span>
          <span>Google Rating: 4.6 ★ (19 Reviews)</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
