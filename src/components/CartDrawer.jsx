import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartItemCount,
    freeShippingThreshold,
    isFreeShipping,
    coupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    shippingFee,
    cartFinalTotal
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    applyCoupon(couponInput);
    setCouponInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-page-fade"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slide-left">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-black" />
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-black">
                SHOPPING BAG ({cartItemCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-neutral-500 hover:text-black transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-5 py-3.5 bg-neutral-900 text-white text-xs">
            {isFreeShipping ? (
              <p className="font-semibold text-emerald-400 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                <span>✓ UNLOCKED FREE EXPRESS PAN-INDIA SHIPPING</span>
              </p>
            ) : (
              <p className="text-[11px] tracking-wide text-neutral-300">
                Add <span className="font-bold text-brandYellow">₹{amountNeededForFreeShipping}</span> more to unlock <span className="font-bold text-white uppercase">FREE EXPRESS SHIPPING</span>
              </p>
            )}
            <div className="w-full bg-neutral-800 h-1.5 mt-2 rounded-full overflow-hidden">
              <div
                className="bg-brandYellow h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-neutral-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-neutral-100 flex items-center justify-center rounded-full text-neutral-400">
                  <ShoppingBag size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-800">Your Bag is Empty</h3>
                  <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                    Explore our heavy Japanese denim, 280 GSM tees, and tactical streetwear drops.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="bg-ink text-white px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-neutral-800 transition-colors mt-2"
                >
                  START BROWSING
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartItemId} className="pt-4 first:pt-0 flex gap-3 sm:gap-4">
                  {/* Thumbnail */}
                  <img
                    src={item.images ? item.images[0] : item.image}
                    alt={item.title}
                    className="w-20 h-24 object-cover bg-neutral-100 shrink-0 border border-neutral-200"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="text-xs font-bold text-neutral-900 uppercase tracking-wider line-clamp-1 hover:text-crimson transition-colors"
                        >
                          {item.title}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-neutral-400 hover:text-crimson transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="text-[11px] text-neutral-500 mt-1 flex items-center gap-2 font-medium">
                        <span>Size: <strong className="text-black">{item.selectedSize}</strong></span>
                        <span>•</span>
                        <span>₹{item.price} each</span>
                      </div>
                    </div>

                    {/* Quantity & Item Total */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-neutral-300">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                          className="p-1 sm:p-1.5 hover:bg-neutral-100 text-neutral-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                          className="p-1 sm:p-1.5 hover:bg-neutral-100 text-neutral-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="text-xs font-black text-black tracking-wider">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-neutral-200 bg-neutral-50 space-y-4">
              {/* Promo code form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={13} className="absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="PROMO CODE (e.g. MONK10)"
                    className="w-full bg-white border border-neutral-300 pl-8 pr-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-black placeholder-neutral-400 focus:outline-none focus:border-black"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-neutral-900 hover:bg-black text-white px-4 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  APPLY
                </button>
              </form>

              {coupon && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 font-medium">
                  <span>✓ {coupon.code} ({coupon.description})</span>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-bold text-red-600 hover:underline uppercase"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-black">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span>{isFreeShipping ? <strong className="text-emerald-600">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="pt-2 border-t border-neutral-200 flex justify-between text-sm font-black text-black uppercase tracking-wider">
                  <span>Estimated Total</span>
                  <span>₹{cartFinalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-brandYellow hover:bg-yellow-400 text-black py-3.5 text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors shadow-md rounded-none"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => {
                    const itemsText = cart
                      .map(
                        (item, i) =>
                          `${i + 1}. ${item.title} (Size: ${item.selectedSize}, Qty: ${item.quantity}) - ₹${item.price * item.quantity}`
                      )
                      .join('\n');
                    const msg = `*LIBAS HALDWANI - WHATSAPP CART ORDER*\n\nHi LIBAS, I want to order the following items from my cart:\n\n${itemsText}\n\n*Estimated Total:* ₹${cartFinalTotal.toLocaleString('en-IN')}\n\nPlease share payment and delivery confirmation!`;
                    window.open(`https://wa.me/917900455958?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-2.5 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-2xs"
                >
                  <MessageCircle size={15} />
                  <span>ORDER BAG ON WHATSAPP</span>
                </button>

                <Link
                  to="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-ink hover:bg-neutral-800 text-white py-2.5 text-xs font-bold uppercase tracking-widest flex items-center justify-center transition-colors block text-center"
                >
                  VIEW FULL CART
                </Link>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 font-medium tracking-wider uppercase">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>100% Encrypted & Safe Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
