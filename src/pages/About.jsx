import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Instagram, Star, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white min-h-screen text-black py-12 sm:py-20 animate-page-fade">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 border-b-2 border-black pb-8">
          <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 block font-bold">
            ABOUT THE STORE
          </span>
          <h1 className="text-3xl sm:text-6xl font-display font-black uppercase tracking-wider text-black">
            DRIP CLOTHING HALDWANI
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Clothing Store / Streetwear Clothing Brand in Haldwani, Uttarakhand
          </p>
        </div>

        {/* Concise Verified Brand Copy Box */}
        <div className="bg-neutral-50 p-8 sm:p-12 border border-neutral-300 shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-crimson" />
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-700">OUR FOCUS</span>
          </div>

          <p className="text-base sm:text-xl font-display font-bold uppercase tracking-wide text-neutral-900 leading-relaxed">
            "Drip Clothing Haldwani is a streetwear-focused clothing store bringing trending graphic tees, jerseys, waffle long sleeves, sweatshirts, shirts and everyday streetwear to Haldwani."
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-200 text-xs">
            <div className="p-4 bg-white border border-neutral-200">
              <span className="text-neutral-500 font-bold uppercase text-[10px] block mb-1">Google Rating</span>
              <span className="text-sm font-black text-black flex items-center gap-1">
                <Star size={14} className="text-amber-500 fill-amber-500" />
                4.6 / 5 (19 Reviews)
              </span>
            </div>

            <div className="p-4 bg-white border border-neutral-200">
              <span className="text-neutral-500 font-bold uppercase text-[10px] block mb-1">Location</span>
              <span className="text-xs font-bold text-black flex items-center gap-1">
                <MapPin size={13} className="text-crimson" />
                Haldwani, Uttarakhand
              </span>
            </div>

            <div className="p-4 bg-white border border-neutral-200">
              <span className="text-neutral-500 font-bold uppercase text-[10px] block mb-1">Instagram</span>
              <a
                href="https://www.instagram.com/drip__clothing__/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-pink-600 hover:underline flex items-center gap-1"
              >
                <Instagram size={13} />
                @drip__clothing__
              </a>
            </div>
          </div>
        </div>

        {/* Store Location Details */}
        <div className="bg-neutral-900 text-white p-8 sm:p-10 border border-neutral-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-brandYellow block mb-1">
                VISIT IN PERSON
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-black uppercase tracking-wider text-white">
                FIND US IN HALDWANI
              </h2>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=5FWQ%2BF9+Haldwani+Uttarakhand"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black hover:bg-brandYellow px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-colors inline-flex items-center gap-2 self-start"
            >
              <span>GET DIRECTIONS</span>
              <ArrowRight size={13} />
            </a>
          </div>

          <div className="text-xs text-neutral-300 space-y-1 border-t border-neutral-800 pt-4 leading-relaxed">
            <p className="font-bold text-white">Drip Clothing Haldwani</p>
            <p>Charayal Chauraha, Near Birla School, Opposite Nainital Bank,</p>
            <p>Haldwani, Prempur Loshyani, Uttarakhand – 263139, India</p>
            <p className="font-mono text-neutral-400 pt-1">Google Maps Plus Code: <strong className="text-brandYellow">5FWQ+F9</strong></p>
          </div>

          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-3 text-xs font-black uppercase tracking-widest border border-neutral-700 transition-colors"
            >
              <span>BROWSE STREETWEAR COLLECTION</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
