import React, { useState } from 'react';

const Policy = () => {
  const [activeTab, setActiveTab] = useState('shipping');

  const tabs = [
    { id: 'shipping', label: 'Shipping & Delivery' },
    { id: 'returns', label: 'Returns & Exchanges' },
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'terms', label: 'Terms of Service' },
  ];

  return (
    <div className="bg-white min-h-screen text-black py-12 sm:py-16 animate-page-fade">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="border-b border-neutral-200 pb-6 mb-8 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-crimson block mb-1">
            Store Policies
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-wider text-black">
            POLICIES & TERMS
          </h1>
          <p className="text-xs text-neutral-500 mt-1 uppercase font-bold tracking-wider">
            LIBAS Haldwani
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 border-b border-neutral-200 pb-4 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs font-bold uppercase tracking-wider px-4 py-2 shrink-0 transition-all ${
                activeTab === tab.id
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="bg-neutral-50 p-6 sm:p-10 border border-neutral-200 text-xs sm:text-sm text-neutral-700 leading-relaxed space-y-6">
          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <h2 className="text-base font-black uppercase tracking-wider text-black">
                Shipping & Store Dispatch
              </h2>
              <p>
                <strong>Dispatch Window:</strong> All orders are carefully inspected and packed at our store in Haldwani and dispatched within 24 to 48 hours of order confirmation.
              </p>
              <p>
                <strong>Delivery Timelines:</strong> Packages are delivered promptly across India through trusted logistics courier partners.
              </p>
              <p>
                <strong>Shipping Rates:</strong> Orders with cart value ₹1,599 and above receive FREE express delivery. Orders below ₹1,599 are charged a flat ₹99 delivery fee.
              </p>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-4">
              <h2 className="text-base font-black uppercase tracking-wider text-black">
                Returns & Exchanges
              </h2>
              <p>
                <strong>Eligibility:</strong> Items must be in unworn, unwashed condition with original tags and packaging intact.
              </p>
              <p>
                <strong>Size Exchange:</strong> Need a different size or fit? Visit our store at RTO Gas Godown Link Road, Haldwani or contact our customer support for assistance.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h2 className="text-base font-black uppercase tracking-wider text-black">
                Privacy Policy
              </h2>
              <p>
                <strong>Customer Confidentiality:</strong> LIBAS respects your privacy. We only utilize your contact information for order fulfillment, customer support, and authorized collection updates.
              </p>
              <p>
                <strong>No Third-Party Sharing:</strong> We do NOT sell or share customer contact details with third-party advertisers.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h2 className="text-base font-black uppercase tracking-wider text-black">
                Terms of Service
              </h2>
              <p>
                <strong>Store Location:</strong> LIBAS, RTO Gas Godown Link Road, Haldwani, Nainital, Uttarakhand – 263139, India.
              </p>
              <p>
                <strong>Opening Hours:</strong> 9:00 AM – 7:00 PM (Daily).
              </p>
              <p>
                <strong>Jurisdiction:</strong> Any disputes shall be subject to the exclusive jurisdiction of the courts in Haldwani / Nainital, Uttarakhand, India.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Policy;
