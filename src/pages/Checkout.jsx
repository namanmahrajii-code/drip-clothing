import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  Truck,
  ArrowLeft,
  Lock,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Smartphone,
  Copy,
  Check,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Checkout = () => {
  const {
    cart,
    cartSubtotal,
    coupon,
    discountAmount,
    freeShippingThreshold,
    createOrder,
    showToast
  } = useShop();

  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    city: '',
    state: 'Uttarakhand',
    pincode: '',
    paymentMethod: 'upi', // 'upi' or 'cod'
    utrNumber: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // If cart is empty, redirect
  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold uppercase">No Items in Checkout</h2>
        <p className="text-xs text-neutral-500">Your shopping bag is currently empty.</p>
        <Link to="/shop" className="bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest inline-block">
          Return to Shop
        </Link>
      </div>
    );
  }

  const isFreeShipping = cartSubtotal >= 1599 || coupon?.freeShipping;
  const baseShippingFee = isFreeShipping ? 0 : 99;
  const totalShipping = baseShippingFee;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount) + totalShipping;

  const upiId = '7900455958-2@axl';
  const payeeName = 'LIBAS Fashion';
  const upiPayUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${grandTotal}&cu=INR&tn=${encodeURIComponent('LIBAS Order')}`;
  const upiQrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(upiPayUrl)}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    showToast('UPI ID copied: ' + upiId);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.pincode.trim() || !formData.city.trim()) {
      showToast('Please fill all required shipping fields');
      return;
    }

    if (formData.phone.trim().length < 10) {
      showToast('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsSubmitting(true);

    // If payment method is WhatsApp, construct message and open WhatsApp
    if (formData.paymentMethod === 'whatsapp') {
      const itemsList = cart
        .map(
          (item, i) =>
            `${i + 1}. ${item.title} (Size: ${item.selectedSize}, Qty: ${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString('en-IN')}`
        )
        .join('\n');

      const waMessage = `*NEW ORDER QUERY - LIBAS HALDWANI*\n\n*Customer Details:*\n• Name: ${formData.fullName}\n• Phone: ${formData.phone}\n• Email: ${formData.email || 'N/A'}\n• Address: ${formData.address}, ${formData.landmark ? formData.landmark + ', ' : ''}${formData.city}, ${formData.state} - ${formData.pincode}\n\n*Ordered Items:*\n${itemsList}\n\n*Total Amount:* ₹${grandTotal.toLocaleString('en-IN')}\n*Payment Option:* Order via WhatsApp Direct\n\nPlease confirm order acceptance & delivery timeline!`;

      window.open(`https://wa.me/917900455958?text=${encodeURIComponent(waMessage)}`, '_blank');
    }

    // Simulate order placement
    setTimeout(() => {
      const order = createOrder({
        items: cart,
        shippingDetails: {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          landmark: formData.landmark,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        paymentMethod:
          formData.paymentMethod === 'upi'
            ? 'UPI (Google Pay / PhonePe / Paytm)'
            : formData.paymentMethod === 'whatsapp'
            ? 'Order via WhatsApp (7900455958)'
            : 'Cash on Delivery',
        upiDetails:
          formData.paymentMethod === 'upi'
            ? {
                upiId,
                payeeName,
                utrNumber: formData.utrNumber.trim() || 'Pending Verification',
              }
            : null,
        subtotal: cartSubtotal,
        discount: discountAmount,
        couponCode: coupon?.code || null,
        shippingFee: totalShipping,
        totalAmount: grandTotal,
        paymentStatus:
          formData.paymentMethod === 'upi'
            ? 'Paid via UPI'
            : formData.paymentMethod === 'whatsapp'
            ? 'WhatsApp Verification Pending'
            : 'Pending (COD)',
      });

      setIsSubmitting(false);
      navigate('/order-success', { state: { order } });
    }, 1000);
  };

  return (
    <div className="bg-white min-h-screen text-black py-8 sm:py-12 animate-page-fade">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-neutral-200 pb-6 mb-8 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-crimson block mb-1">
              Secure Checkout
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-wider text-black">
              CHECKOUT & DISPATCH
            </h1>
          </div>
          <Link
            to="/cart"
            className="text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black flex items-center gap-1.5"
          >
            <ArrowLeft size={14} />
            <span>Return to Bag</span>
          </Link>
        </div>

        {/* 2-Column Grid */}
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Contact, Shipping & Payment Form */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Contact Information */}
            <div className="bg-neutral-50 p-6 border border-neutral-200 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-black flex items-center gap-2">
                  <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px]">1</span>
                  CONTACT DETAILS
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Aryan Malhotra"
                    className="w-full bg-white border border-neutral-300 p-2.5 text-xs font-medium uppercase text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Mobile Phone (For WhatsApp Updates) *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit number (e.g. 9876543210)"
                    className="w-full bg-white border border-neutral-300 p-2.5 text-xs font-medium text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Email Address (For Invoice)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="aryan@example.com"
                    className="w-full bg-white border border-neutral-300 p-2.5 text-xs font-medium text-black focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-neutral-50 p-6 border border-neutral-200 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-black flex items-center gap-2">
                  <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px]">2</span>
                  DELIVERY ADDRESS
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Flat / House No / Building / Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="e.g. House 42, 2nd Floor, Park Street"
                    className="w-full bg-white border border-neutral-300 p-2.5 text-xs font-medium text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Haldwani"
                      className="w-full bg-white border border-neutral-300 p-2.5 text-xs font-medium uppercase text-black focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="e.g. Uttarakhand"
                      className="w-full bg-white border border-neutral-300 p-2.5 text-xs font-medium uppercase text-black focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="6-digit (e.g. 263139)"
                      className="w-full bg-white border border-neutral-300 p-2.5 text-xs font-medium text-black focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    placeholder="e.g. Near City Mall"
                    className="w-full bg-white border border-neutral-300 p-2.5 text-xs font-medium text-black focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-neutral-50 p-6 border border-neutral-200 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-black flex items-center gap-2">
                  <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px]">3</span>
                  PAYMENT METHOD
                </h3>
              </div>

              <div className="space-y-4">
                {/* 1. UPI Payment Option (Default Online Option) */}
                <div
                  className={`border transition-all ${
                    formData.paymentMethod === 'upi'
                      ? 'border-black bg-white shadow-xs'
                      : 'border-neutral-200 bg-neutral-50 opacity-80 hover:opacity-100'
                  }`}
                >
                  <label className="flex items-start gap-3 p-4 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      className="mt-1 accent-black"
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-2">
                          <Smartphone size={16} className="text-emerald-600" />
                          UPI PAYMENT (GPAY / PHONEPE / PAYTM / BHIM / CRED)
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 uppercase">
                          RECOMMENDED • ZERO SURCHARGE
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-1">
                        Pay directly to verified store UPI ID or scan dynamic QR Code via any UPI app.
                      </p>
                    </div>
                  </label>

                  {/* Expanded UPI Details Box when UPI is selected */}
                  {formData.paymentMethod === 'upi' && (
                    <div className="border-t border-neutral-200 bg-neutral-100/70 p-4 sm:p-5 space-y-4 animate-fade-in">
                      {/* UPI ID & Payee Card */}
                      <div className="bg-white p-3.5 border border-neutral-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                            Verified Beneficiary & UPI ID:
                          </span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-xs sm:text-sm font-black text-black">
                              {upiId}
                            </span>
                            <span className="text-[10px] font-bold bg-neutral-100 text-neutral-700 px-1.5 py-0.5 border border-neutral-300">
                              {payeeName}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="inline-flex items-center justify-center gap-1.5 bg-black hover:bg-neutral-800 text-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors shrink-0"
                        >
                          {copiedUpi ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                          <span>{copiedUpi ? 'COPIED!' : 'COPY UPI ID'}</span>
                        </button>
                      </div>

                      {/* QR Code & Mobile Direct Pay */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                        {/* QR Code Box */}
                        <div className="bg-white p-3 border border-neutral-300 flex flex-col items-center text-center shadow-2xs">
                          <span className="text-[10px] font-bold tracking-wider text-neutral-600 uppercase mb-2 flex items-center gap-1">
                            <QrCode size={13} />
                            Scan with Any UPI App
                          </span>
                          <img
                            src={upiQrCodeUrl}
                            alt="LIBAS UPI QR Code"
                            className="w-36 h-36 object-contain border border-neutral-200 p-1 bg-white"
                          />
                          <span className="text-[10px] font-mono text-neutral-500 mt-2">
                            Amount: <strong>₹{grandTotal.toLocaleString('en-IN')}</strong>
                          </span>
                        </div>

                        {/* Direct Mobile Pay CTA & App list */}
                        <div className="space-y-3">
                          <a
                            href={upiPayUrl}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-3 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs text-center"
                          >
                            <ExternalLink size={14} />
                            <span>TAP TO PAY VIA UPI APP</span>
                          </a>

                          <div className="text-[10px] text-neutral-500 space-y-1">
                            <p className="font-bold text-neutral-700">Supported Apps:</p>
                            <p>Google Pay • PhonePe • Paytm • BHIM • Cred UPI • Amazon Pay</p>
                          </div>

                          {/* Optional UTR / Reference Input */}
                          <div className="pt-2 border-t border-neutral-200">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                              UPI Reference / UTR No. (Optional)
                            </label>
                            <input
                              type="text"
                              name="utrNumber"
                              value={formData.utrNumber}
                              onChange={handleInputChange}
                              placeholder="e.g. 423871928371 (12 digits)"
                              className="w-full bg-white border border-neutral-300 p-2 text-xs font-mono text-black focus:outline-none focus:border-black"
                            />
                            <span className="text-[9px] text-neutral-400 block mt-0.5">
                              Enter after completing payment in your UPI app.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Order with WhatsApp Option */}
                <div
                  className={`border transition-all ${
                    formData.paymentMethod === 'whatsapp'
                      ? 'border-emerald-600 bg-emerald-50/40 shadow-xs'
                      : 'border-neutral-200 bg-neutral-50 opacity-80 hover:opacity-100'
                  }`}
                >
                  <label className="flex items-start gap-3 p-4 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="whatsapp"
                      checked={formData.paymentMethod === 'whatsapp'}
                      onChange={handleInputChange}
                      className="mt-1 accent-emerald-600"
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-2">
                          <MessageCircle size={16} className="text-emerald-600" />
                          ORDER WITH WHATSAPP (+91 7900455958)
                        </span>
                        <span className="text-[10px] font-bold text-white bg-emerald-600 px-2 py-0.5 uppercase tracking-wider">
                          INSTANT SUPPORT
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-600 mt-1">
                        Send this complete order details & query directly to our official WhatsApp (<strong>+91 7900455958</strong>). Our store manager will assist and confirm!
                      </p>
                    </div>
                  </label>
                </div>

                {/* 3. Cash on Delivery Option */}
                <label
                  className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-black bg-white shadow-xs'
                      : 'border-neutral-200 bg-neutral-50 opacity-80 hover:opacity-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="mt-1 accent-black"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-2">
                        <Banknote size={15} />
                        CASH ON DELIVERY (COD)
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 uppercase">
                        ZERO EXTRA CHARGES
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1">
                      Pay with cash upon package delivery. Free delivery on orders above ₹1,599.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Pay Button */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-50 border border-neutral-200 p-6 space-y-6 sticky top-28">
              <h3 className="text-xs font-black uppercase tracking-widest text-black border-b border-neutral-200 pb-3">
                ORDER REVIEW ({cart.length} ITEMS)
              </h3>

              {/* Items Preview */}
              <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-neutral-200 pr-1">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="pt-3 first:pt-0 flex gap-3 items-center">
                    <img
                      src={item.images ? item.images[0] : item.image}
                      alt={item.title}
                      className="w-14 h-16 object-cover bg-neutral-200 border border-neutral-300 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-black truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        Size: <strong>{item.selectedSize}</strong> • Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-black text-black shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs border-t border-neutral-200 pt-4">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-black">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({coupon?.code})</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-600">
                  <span>Shipping Fee (Free over ₹1,599)</span>
                  <span>{baseShippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${baseShippingFee}`}</span>
                </div>

                <div className="pt-3 border-t border-neutral-300 flex justify-between text-base font-black text-black uppercase tracking-wider">
                  <span>Total Amount</span>
                  <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors shadow-md rounded-none disabled:opacity-50 text-white ${
                  formData.paymentMethod === 'whatsapp'
                    ? 'bg-[#25D366] hover:bg-[#20ba5a]'
                    : 'bg-ink hover:bg-neutral-800'
                }`}
              >
                {formData.paymentMethod === 'whatsapp' ? <MessageCircle size={16} /> : <Lock size={15} />}
                <span>
                  {isSubmitting
                    ? 'PROCESSING DISPATCH...'
                    : formData.paymentMethod === 'upi'
                    ? `CONFIRM & PAY ₹${grandTotal.toLocaleString('en-IN')} VIA UPI`
                    : formData.paymentMethod === 'whatsapp'
                    ? `ORDER VIA WHATSAPP (+91 7900455958)`
                    : `CONFIRM COD ORDER (₹${grandTotal.toLocaleString('en-IN')})`}
                </span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 font-medium tracking-wider uppercase">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>256-Bit SSL Encrypted Payment Portal</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
