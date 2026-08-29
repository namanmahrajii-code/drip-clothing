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
    <div className="bg-[#F7F4EF] min-h-screen text-[#1E1E1E] py-12 sm:py-16 animate-page-fade">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Banner */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#7D1E22]/10 text-[#7D1E22] border border-[#7D1E22]/20 px-4 py-1.5 rounded-full text-xs uppercase font-bold tracking-[0.25em]">
            <Sparkles size={14} className="text-[#7D1E22]" />
            <span>LIBAS SPECIAL COLLECTION REWARDS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black uppercase tracking-tight text-[#1E1E1E]">
            UNLOCK EXCLUSIVE LIBAS PERKS
          </h1>

          <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-xl mx-auto leading-relaxed font-normal">
            Register your details to unlock immediate store vouchers, collection gifts, and guaranteed VIP allocations for our latest fashion arrivals in Haldwani.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#E5DDD3] rounded-3xl p-6 sm:p-10 shadow-xs">
          {isSubmitted ? (
            <div className="text-center space-y-6 py-8">
              <div className="w-16 h-16 bg-[#7D1E22] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <Trophy size={32} />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7D1E22] block mb-1">
                  Registration Complete
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-black uppercase tracking-tight text-[#1E1E1E]">
                  YOU UNLOCKED:
                </h2>
                <div className="bg-[#FAF8F5] border border-[#7D1E22] rounded-2xl p-4 mt-3 max-w-md mx-auto shadow-2xs">
                  <p className="text-sm font-bold text-[#7D1E22] uppercase tracking-wider">{wonPrize}</p>
                </div>
              </div>

              <p className="text-xs text-[#6B6B6B] max-w-md mx-auto">
                We've linked this reward to your phone number ({phone}). Check your WhatsApp for drop links and redemption codes.
              </p>

              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-[#7D1E22] hover:bg-[#942429] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-sm"
              >
                ENTER AGAIN
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#1E1E1E] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aryan Malhotra"
                    className="w-full bg-[#FAF8F5] border border-[#E5DDD3] rounded-xl p-3 text-xs uppercase font-medium text-[#1E1E1E] placeholder-[#6B6B6B] focus:outline-none focus:border-[#7D1E22]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#1E1E1E] mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit number (e.g. 9876543210)"
                    className="w-full bg-[#FAF8F5] border border-[#E5DDD3] rounded-xl p-3 text-xs font-medium text-[#1E1E1E] placeholder-[#6B6B6B] focus:outline-none focus:border-[#7D1E22]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#1E1E1E] mb-1">
                    Instagram Handle (Optional)
                  </label>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@yourusername"
                    className="w-full bg-[#FAF8F5] border border-[#E5DDD3] rounded-xl p-3 text-xs text-[#1E1E1E] placeholder-[#6B6B6B] focus:outline-none focus:border-[#7D1E22]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#1E1E1E] mb-1">
                    Favorite Fashion Category
                  </label>
                  <select
                    value={favoriteCategory}
                    onChange={(e) => setFavoriteCategory(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5DDD3] rounded-xl p-3 text-xs font-bold uppercase tracking-wider text-[#1E1E1E] focus:outline-none focus:border-[#7D1E22]"
                  >
                    <option value="waffles">Waffle / Raglan Knits</option>
                    <option value="graphic-tees">Graphic T-Shirts</option>
                    <option value="sweatshirts">Sweatshirts & Pullovers</option>
                    <option value="shirts">Resort & Casual Shirts</option>
                    <option value="jerseys">Retro Match Jerseys</option>
                    <option value="pants">Track Pants & Bottoms</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#7D1E22] hover:bg-[#942429] text-white py-4 rounded-full text-xs font-bold uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2 shadow-md hover:scale-101"
              >
                <Gift size={16} />
                <span>CLAIM LIBAS VIP REWARD</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#6B6B6B] uppercase tracking-wider font-semibold">
                <ShieldCheck size={14} className="text-[#7D1E22]" />
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
