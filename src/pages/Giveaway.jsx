import React, { useState } from 'react';
import { Gift, Sparkles, CheckCircle2, Trophy, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';

const Giveaway = () => {
  const { addGiveawayEntry, showToast } = useShop();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [favoriteCategory, setFavoriteCategory] = useState('denims');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [wonPrize, setWonPrize] = useState('');

  const prizes = [
    '₹500 Store Voucher (Code: LIBAS500)',
    '15% Off Any Fashion Collection Item (Code: LIBAS15)',
    'Free Premium LIBAS Style Kit & Accessories',
    'Early VIP Access to Next Collection Launch',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number');
      return;
    }

    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    setWonPrize(randomPrize);

    addGiveawayEntry({
      name,
      phone,
      instagram,
      favoriteCategory,
      prize: randomPrize
    });

    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {}
  };

  return (
    <div className="bg-white min-h-screen text-black py-12 sm:py-16 animate-page-fade">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Banner */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-neutral-900 text-white px-4 py-1.5 text-xs uppercase font-bold tracking-[0.25em]">
            <Sparkles size={14} className="text-brandYellow" />
            <span>LIBAS SPECIAL COLLECTION GIVEAWAY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-wider text-black">
            UNLOCK EXCLUSIVE LIBAS REWARDS
          </h1>

          <p className="text-xs sm:text-sm text-neutral-500 max-w-xl mx-auto leading-relaxed font-medium">
            Register your details to unlock immediate store vouchers, collection gifts, and guaranteed VIP allocations for our latest fashion arrivals in Haldwani.
          </p>
        </div>

        {/* Card */}
        <div className="bg-neutral-50 border border-neutral-200 p-6 sm:p-10 shadow-xl">
          {isSubmitted ? (
            <div className="text-center space-y-6 py-8">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <Trophy size={32} className="text-brandYellow" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-600 block mb-1">
                  Registration Complete
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-wider text-black">
                  YOU UNLOCKED:
                </h2>
                <div className="bg-white border-2 border-black p-4 mt-3 max-w-md mx-auto shadow-sm">
                  <p className="text-sm font-black text-black uppercase tracking-wider">{wonPrize}</p>
                </div>
              </div>

              <p className="text-xs text-neutral-500 max-w-md mx-auto">
                We've linked this reward to your phone number ({phone}). Check your WhatsApp for drop links and redemption codes.
              </p>

              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-black text-white px-8 py-3.5 text-xs font-black uppercase tracking-widest hover:bg-neutral-800 transition-colors"
              >
                ENTER ANOTHER DROP
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-black mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aryan Malhotra"
                    className="w-full bg-white border border-neutral-300 p-3 text-xs uppercase font-medium focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-black mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit number (e.g. 9876543210)"
                    className="w-full bg-white border border-neutral-300 p-3 text-xs font-medium focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-black mb-1">
                    Instagram Handle (Optional)
                  </label>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@yourusername"
                    className="w-full bg-white border border-neutral-300 p-3 text-xs focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-black mb-1">
                    Favorite Streetwear Category
                  </label>
                  <select
                    value={favoriteCategory}
                    onChange={(e) => setFavoriteCategory(e.target.value)}
                    className="w-full bg-white border border-neutral-300 p-3 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-black"
                  >
                    <option value="denims">Raw Selvedge Denims</option>
                    <option value="tshirts">280 GSM Heavyweight Tees</option>
                    <option value="hoodies">450 GSM Fleece Hoodies</option>
                    <option value="waffles">Thermal Waffles</option>
                    <option value="shackets">Tactical Shackets & Vests</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black hover:bg-neutral-800 text-white py-4 text-xs font-black uppercase tracking-[0.25em] transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Gift size={16} />
                <span>SPIN & CLAIM LIBAS REWARD</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>No Spam Guarantee • Strictly LIBAS Collection Updates</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Giveaway;
