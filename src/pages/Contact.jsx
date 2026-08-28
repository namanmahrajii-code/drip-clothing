import React, { useState } from 'react';
import { MapPin, Instagram, ExternalLink, Send, Star, Compass, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Contact = () => {
  const { showToast } = useShop();
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.message) {
      showToast('Please fill all required fields');
      return;
    }
    setSubmitted(true);
    showToast('Message sent! We look forward to seeing you at Drip Clothing Haldwani.');
  };

  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=5FWQ%2BF9+Haldwani+Uttarakhand";

  return (
    <div className="bg-white min-h-screen text-black py-12 sm:py-16 animate-page-fade">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b-2 border-black pb-6 text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-crimson block mb-1">
            Store & Location
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-black">
            VISIT OUR STORE
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2 font-medium">
            Find us in Haldwani. Browse trending graphic tees, jerseys, waffle long sleeves, sweatshirts, and streetwear in person.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Contact Info & Store Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-neutral-50 p-6 sm:p-8 border border-neutral-300 space-y-6 shadow-xs">
              <div>
                <div className="inline-flex items-center gap-2 bg-black text-white px-2.5 py-1 text-[9px] font-black uppercase tracking-widest mb-3">
                  <span>CLOTHING STORE</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-black uppercase tracking-wider text-black">
                  DRIP CLOTHING HALDWANI
                </h2>
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-800 mt-1">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span>4.6 / 5 Google Rating (19 Reviews)</span>
                </div>
              </div>

              {/* Verified Address */}
              <div className="space-y-4 text-xs border-t border-neutral-200 pt-4">
                <div className="flex items-start gap-3.5">
                  <MapPin size={18} className="text-crimson shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-black font-bold uppercase tracking-wider">Address</strong>
                    <p className="text-neutral-700 mt-1 leading-relaxed">
                      Charayal Chauraha, Near Birla School,<br />
                      Opposite Nainital Bank,<br />
                      Haldwani, Prempur Loshyani,<br />
                      Uttarakhand – 263139, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Compass size={18} className="text-crimson shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-black font-bold uppercase tracking-wider">Google Maps Plus Code</strong>
                    <p className="text-neutral-800 font-mono font-bold mt-1">
                      5FWQ+F9, Haldwani, Uttarakhand
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Instagram size={18} className="text-pink-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-black font-bold uppercase tracking-wider">Instagram</strong>
                    <a
                      href="https://www.instagram.com/drip__clothing__/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-800 hover:text-pink-600 font-bold mt-1 inline-block"
                    >
                      @drip__clothing__
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-neutral-200 flex flex-wrap gap-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black hover:bg-neutral-800 text-white px-5 py-3 text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-colors shadow-xs"
                >
                  <MapPin size={14} />
                  <span>GET DIRECTIONS</span>
                  <ExternalLink size={13} />
                </a>

                <a
                  href="https://www.instagram.com/drip__clothing__/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-3 text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-colors shadow-xs"
                >
                  <Instagram size={14} />
                  <span>INSTAGRAM</span>
                </a>
              </div>
            </div>

            {/* Map Embed centered on Haldwani location */}
            <div className="h-72 bg-neutral-100 border border-neutral-300 overflow-hidden relative shadow-xs">
              <iframe
                title="Drip Clothing Haldwani Location"
                src="https://maps.google.com/maps?q=5FWQ%2BF9,+Haldwani,+Uttarakhand&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Message Form / Contact Us */}
          <div className="lg:col-span-6 bg-neutral-50 p-6 sm:p-8 border border-neutral-300 flex flex-col justify-between shadow-xs">
            <div>
              <div className="border-b border-neutral-200 pb-3 mb-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-black">
                  CONTACT US
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Have a question about stock or visiting the store? Drop us a message.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto text-lg">
                    ✓
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-wider text-black">
                    Message Sent Successfully
                  </h4>
                  <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                    Thank you, {form.name}. You can also visit us at Charayal Chauraha, Near Birla School, Haldwani.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', message: '' }); }}
                    className="bg-black text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full bg-white border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="Phone Number"
                      className="w-full bg-white border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Inquiry about drops, sizes, or store visits..."
                      className="w-full bg-white border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black hover:bg-neutral-800 text-white py-3.5 text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Send size={14} />
                    <span>SEND MESSAGE</span>
                  </button>
                </form>
              )}
            </div>

            {/* Quick Instagram connect banner */}
            <div className="mt-8 pt-4 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-600">
              <span className="font-semibold">Follow our official Instagram:</span>
              <a
                href="https://www.instagram.com/drip__clothing__/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-pink-600 hover:underline flex items-center gap-1"
              >
                <span>@drip__clothing__</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
