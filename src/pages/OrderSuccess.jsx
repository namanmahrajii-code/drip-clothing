import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Package, Truck, MessageCircle, ArrowRight, Home } from 'lucide-react';
import confetti from 'canvas-confetti';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  useEffect(() => {
    // Fire festive confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  }, []);

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold uppercase">No Active Order Found</h2>
        <p className="text-xs text-neutral-500">Please visit the shop to view pieces.</p>
        <Link to="/shop" className="bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest inline-block">
          Go To Catalog
        </Link>
      </div>
    );
  }

  const orderDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="bg-white min-h-screen text-black py-12 sm:py-16 animate-page-fade">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-neutral-50 border border-neutral-200 p-6 sm:p-10 text-center shadow-lg space-y-6">
          {/* Success Checkmark */}
          <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 size={36} className="text-emerald-400" />
          </div>

          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 block mb-1">
              Order Confirmed & Logged
            </span>
            <h1 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-wider text-black">
              THANK YOU FOR YOUR ORDER
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
              Order ID: <strong className="text-black font-mono">{order.id}</strong> • Placed on {orderDate}
            </p>
          </div>

          {/* Delivery Estimate Box */}
          <div className="bg-white border border-neutral-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3">
              <Truck size={24} className="text-crimson shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-black">Estimated Express Dispatch</h4>
                <p className="text-[11px] text-neutral-500">Expected Delivery in 3-5 business days to {order.shippingDetails?.city}, {order.shippingDetails?.pincode}</p>
              </div>
            </div>
            <span className="text-[10px] font-black bg-neutral-100 px-3 py-1 text-black uppercase tracking-widest border border-neutral-200">
              {order.paymentStatus}
            </span>
          </div>

          {/* Purchased Items List */}
          <div className="border-t border-neutral-200 pt-6 text-left space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              Pieces in this Order ({order.items?.length})
            </h4>

            <div className="divide-y divide-neutral-200 max-h-56 overflow-y-auto">
              {order.items?.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.images ? item.images[0] : item.image}
                      alt={item.title}
                      className="w-12 h-14 object-cover bg-neutral-200"
                    />
                    <div>
                      <h5 className="font-bold uppercase text-black">{item.title}</h5>
                      <p className="text-[11px] text-neutral-500">Size: {item.selectedSize} • Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-black text-black">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-300 pt-3 space-y-1.5 text-xs text-left">
              <div className="flex justify-between text-neutral-600">
                <span>Payment Method:</span>
                <span className="font-bold text-black">{order.paymentMethod}</span>
              </div>
              {order.upiDetails?.utrNumber && order.upiDetails?.utrNumber !== 'Pending Verification' && (
                <div className="flex justify-between text-neutral-600">
                  <span>UPI Reference / UTR:</span>
                  <span className="font-mono font-bold text-emerald-700">{order.upiDetails.utrNumber}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-black uppercase pt-1 border-t border-neutral-200">
                <span>Total Amount</span>
                <span>₹{order.totalAmount?.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-200">
            <a
              href={`https://wa.me/917900455958?text=Hi%20Drip%20Clothing%20Haldwani,%20my%20order%20ID%20is%20${order.id}.%20Please%20send%20tracking%20updates.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <MessageCircle size={16} />
              <span>GET WHATSAPP UPDATES</span>
            </a>

            <Link
              to="/shop"
              className="flex-1 bg-ink hover:bg-neutral-800 text-white py-3.5 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
            >
              <Home size={15} />
              <span>CONTINUE SHOPPING</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
