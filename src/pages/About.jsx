import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Star, Sparkles, CheckCircle2, ShoppingBag } from 'lucide-react';

const About = () => {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=RTO+Gas+Godown+Link+Road+Haldwani+Uttarakhand";

  return (
    <div className="bg-white min-h-screen text-black py-12 sm:py-20 animate-page-fade">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 border-b-2 border-black pb-8">
          <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 block font-bold">
            ABOUT THE BRAND
          </span>
          <h1 className="text-3xl sm:text-6xl font-display font-black uppercase tracking-wider text-black">
            LIBAS
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Modern Fashion & Clothing Destination in Haldwani, Uttarakhand
          </p>
        </div>

        {/* Official Brand Positioning & About Copy Box */}
        <div className="bg-neutral-50 p-8 sm:p-12 border border-neutral-300 shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-crimson" />
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-700">OUR PHILOSOPHY</span>
          </div>

          <p className="text-base sm:text-xl font-display font-bold uppercase tracking-wide text-neutral-900 leading-relaxed">
            "LIBAS is your fashion destination in Haldwani, offering a thoughtfully curated collection of stylish clothing for different styles and occasions. From everyday essentials to the latest fashion trends, we bring together quality, comfort and style under one roof."
          </p>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            At LIBAS, we believe that your style speaks for you. We are dedicated to providing modern fashion enthusiasts with premium quality attire, carefully tailored fits, and versatile collections suitable for every occasion.
          </p>

          {/* 4 Key Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-neutral-200 text-xs">
            <div className="p-4 bg-white border border-neutral-200 flex items-start gap-3">
              <CheckCircle2 size={18} className="text-crimson shrink-0 mt-0.5" />
              <div>
                <strong className="block text-black font-black uppercase text-xs">Premium Brands</strong>
                <p className="text-neutral-500 text-[11px] mt-0.5">Carefully curated authentic labels and superior finishes.</p>
              </div>
            </div>

            <div className="p-4 bg-white border border-neutral-200 flex items-start gap-3">
              <CheckCircle2 size={18} className="text-crimson shrink-0 mt-0.5" />
              <div>
                <strong className="block text-black font-black uppercase text-xs">Latest Collections</strong>
                <p className="text-neutral-500 text-[11px] mt-0.5">Fresh seasonal trends, contemporary fits and new arrivals.</p>
              </div>
            </div>

            <div className="p-4 bg-white border border-neutral-200 flex items-start gap-3">
              <CheckCircle2 size={18} className="text-crimson shrink-0 mt-0.5" />
              <div>
                <strong className="block text-black font-black uppercase text-xs">Quality Assured</strong>
                <p className="text-neutral-500 text-[11px] mt-0.5">Finest fabrics and strict quality control for enduring comfort.</p>
              </div>
            </div>

            <div className="p-4 bg-white border border-neutral-200 flex items-start gap-3">
              <CheckCircle2 size={18} className="text-crimson shrink-0 mt-0.5" />
              <div>
                <strong className="block text-black font-black uppercase text-xs">Style for Everyone</strong>
                <p className="text-neutral-500 text-[11px] mt-0.5">Versatile fashion selections crafted for every style and event.</p>
              </div>
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
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black hover:bg-brandYellow px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-colors inline-flex items-center gap-2 self-start"
            >
              <span>GET DIRECTIONS</span>
              <ArrowRight size={13} />
            </a>
          </div>

          <div className="text-xs text-neutral-300 space-y-2 border-t border-neutral-800 pt-4 leading-relaxed">
            <p className="font-bold text-white text-sm">LIBAS</p>
            <p>RTO Gas Godown Link Road</p>
            <p>Haldwani, Nainital</p>
            <p>Uttarakhand – 263139, India</p>
            <div className="pt-2 flex items-center gap-2 text-amber-400 font-bold">
              <Clock size={15} />
              <span>Opening Hours: 9:00 AM – 7:00 PM (Daily)</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-3 text-xs font-black uppercase tracking-widest border border-neutral-700 transition-colors"
            >
              <ShoppingBag size={14} />
              <span>EXPLORE LATEST COLLECTION</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
