import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RefreshCw,
  Ruler,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Share2,
  Check,
  AlertCircle,
  MessageCircle
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    products,
    addToCart,
    wishlist,
    toggleWishlist,
    setIsSizeGuideOpen,
    productReviews,
    addReview,
    showToast
  } = useShop();

  // Find product by slug or id
  const product = products.find((p) => p.slug === slug || p.id === slug) || products[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('fabric');

  // Review form state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImage(0);
    if (product?.sizes) {
      const firstAvailable = product.sizes.find((s) => s.stock > 0)?.size || '';
      setSelectedSize(firstAvailable);
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold uppercase">Product Not Found</h2>
        <Link to="/shop" className="text-xs uppercase font-bold underline mt-4 inline-block">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isSaved = wishlist.some((p) => p.id === product.id);
  const currentSizeObj = product.sizes?.find((s) => s.size === selectedSize);
  const reviewsForThisProduct = productReviews.filter((r) => r.productId === product.id);

  // Recommendations
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast('Please select a size');
      return;
    }
    addToCart(product, selectedSize, quantity, true);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      showToast('Please select a size');
      return;
    }
    addToCart(product, selectedSize, quantity, false);
    navigate('/checkout');
  };

  const handleWhatsAppOrder = () => {
    const sizeText = selectedSize ? `Size: ${selectedSize}` : 'Size: All Sizes Query';
    const message = `*LIBAS HALDWANI - PRODUCT INQUIRY & ORDER*\n\nHi LIBAS, I am interested in purchasing:\n\n• *Product:* ${product.title}\n• *${sizeText}*\n• *Quantity:* ${quantity}\n• *Price:* ₹${product.price}\n• *Link:* ${window.location.href}\n\nPlease share stock availability and delivery options!`;

    window.open(`https://wa.me/917900455958?text=${encodeURIComponent(message)}`, '_blank');
  };

  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.subtitle,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard');
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) {
      showToast('Please fill all review fields');
      return;
    }
    addReview({
      productId: product.id,
      name: reviewName,
      rating: reviewRating,
      title: reviewTitle || 'Verified Streetwear Review',
      comment: reviewComment
    });
    setShowReviewModal(false);
    setReviewName('');
    setReviewTitle('');
    setReviewComment('');
  };

  return (
    <div className="bg-[#F7F4EF] min-h-screen text-[#1E1E1E] py-6 sm:py-10 animate-page-fade">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="text-[11px] font-semibold uppercase tracking-wider text-[#6B6B6B] mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[#7D1E22] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#7D1E22] transition-colors">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-[#7D1E22] transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#1E1E1E] truncate max-w-[200px]">{product.title}</span>
        </nav>

        {/* Product Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Image View */}
            <div className="relative aspect-[3/4] bg-white border border-[#E5DDD3] rounded-3xl overflow-hidden shadow-xs flex items-center justify-center p-6 sm:p-10">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-contain object-center"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {product.discount && (
                  <span className="bg-[#7D1E22] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                    {product.discount}
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-[#1E1E1E] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                    LIMITED DROP
                  </span>
                )}
              </div>

              {/* Share & Wishlist Float */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${
                    isSaved ? 'bg-[#7D1E22] text-white' : 'bg-white/90 text-[#1E1E1E] hover:bg-white hover:text-[#7D1E22] border border-[#E5DDD3]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#1E1E1E] flex items-center justify-center transition-all shadow-md border border-[#E5DDD3]"
                  aria-label="Share"
                >
                  <Share2 size={17} />
                </button>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-[3/4] bg-white rounded-2xl p-2 overflow-hidden border-2 transition-all flex items-center justify-center ${
                      selectedImage === idx ? 'border-[#7D1E22] shadow-sm' : 'border-[#E5DDD3] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Quality Notice */}
            <div className="bg-white border border-[#E5DDD3] rounded-2xl p-4 flex items-center gap-3 text-xs text-[#6B6B6B]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7D1E22] shrink-0" />
              <p className="text-[11px] leading-relaxed">
                <strong className="text-[#1E1E1E]">Premium Fabric Architecture:</strong> Superior substance textiles (280–420 GSM) with tailored contemporary fits and enduring color richness.
              </p>
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs uppercase font-bold tracking-widest text-[#6B6B6B] mb-2">
                <span className="text-[#7D1E22] bg-[#7D1E22]/10 px-2.5 py-0.5 rounded-full">{product.categoryName || product.category} • {product.gender}</span>
                <div className="flex items-center gap-1.5 text-[#1E1E1E] font-bold">
                  <Star size={13} className="fill-amber-500 text-amber-500" />
                  <span>{product.rating || '4.9'}</span>
                  <span className="text-[#6B6B6B]">({product.reviewCount || 24} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-serif font-black uppercase tracking-tight text-[#1E1E1E] leading-tight">
                {product.title}
              </h1>
              
              <p className="text-xs sm:text-sm text-[#6B6B6B] font-normal mt-1">
                {product.subtitle}
              </p>

              {/* Colour Indicator */}
              {product.color && (
                <div className="mt-3 inline-flex items-center gap-2 bg-white border border-[#E5DDD3] rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#1E1E1E]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7D1E22]" />
                  <span>Colour: <strong className="text-[#1E1E1E]">{product.color}</strong></span>
                </div>
              )}

              {/* Price Section */}
              <div className="flex items-baseline gap-3 my-4">
                <span className="text-2xl sm:text-3xl font-black text-[#1E1E1E] tracking-wider">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#6B6B6B] line-through font-semibold">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discount && (
                  <span className="bg-[#7D1E22] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                    {product.discount}
                  </span>
                )}
                <span className="text-[10px] text-[#6B6B6B] uppercase font-semibold ml-auto">
                  Inclusive of all taxes
                </span>
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-3 pt-4 border-t border-[#E5DDD3]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-[#1E1E1E]">
                  SELECT SIZE: <strong className="text-[#7D1E22]">{selectedSize || 'PLEASE CHOOSE'}</strong>
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center gap-1 text-[#6B6B6B] hover:text-[#7D1E22] font-bold uppercase text-[11px] tracking-wider underline"
                >
                  <Ruler size={13} />
                  <span>Size Chart</span>
                </button>
              </div>

              {/* Size Buttons */}
              <div className="flex flex-wrap gap-2.5">
                {product.sizes?.map((s) => {
                  const isOOS = s.stock <= 0;
                  const isSelected = selectedSize === s.size;
                  return (
                    <button
                      key={s.size}
                      disabled={isOOS}
                      onClick={() => setSelectedSize(s.size)}
                      className={`min-w-[48px] h-12 px-4 flex items-center justify-center font-bold text-xs uppercase tracking-wider border rounded-xl transition-all ${
                        isOOS
                          ? 'border-[#E5DDD3] bg-[#FAF8F5] text-[#6B6B6B]/40 line-through cursor-not-allowed'
                          : isSelected
                          ? 'bg-[#7D1E22] text-white border-[#7D1E22] shadow-md'
                          : 'border-[#E5DDD3] text-[#1E1E1E] hover:border-[#7D1E22] bg-white'
                      }`}
                    >
                      {s.size} {isOOS ? '(OOS)' : ''}
                    </button>
                  );
                })}
              </div>

              {/* Stock Alert */}
              {currentSizeObj && (
                <div className="flex items-center gap-2 text-xs font-semibold pt-1">
                  {currentSizeObj.stock <= 2 ? (
                    <span className="text-amber-600 flex items-center gap-1.5">
                      <AlertCircle size={14} />
                      Only {currentSizeObj.stock} unit{currentSizeObj.stock > 1 ? 's' : ''} left in size {selectedSize}!
                    </span>
                  ) : (
                    <span className="text-emerald-700 flex items-center gap-1.5">
                      <Check size={14} />
                      Size {selectedSize} is in stock • Ready for dispatch
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E]">Quantity:</span>
              <div className="flex items-center border border-[#E5DDD3] rounded-full overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-[#1E1E1E] hover:bg-[#FAF8F5] font-bold"
                >
                  -
                </button>
                <span className="px-4 text-xs font-black">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-[#1E1E1E] hover:bg-[#FAF8F5] font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                disabled={!selectedSize}
                onClick={handleAddToCart}
                className="w-full bg-[#7D1E22] hover:bg-[#942429] disabled:opacity-50 text-white py-4 text-xs font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-2.5 rounded-full transition-all shadow-md hover:scale-101"
              >
                <ShoppingBag size={16} />
                <span>ADD TO CART</span>
              </button>

              <button
                disabled={!selectedSize}
                onClick={handleBuyNow}
                className="w-full bg-white hover:bg-[#7D1E22] text-[#7D1E22] hover:text-white border border-[#7D1E22] disabled:opacity-50 py-4 text-xs font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-2.5 rounded-full transition-all shadow-xs"
              >
                <span>BUY NOW WITH CASH ON DELIVERY / UPI</span>
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2.5 rounded-full transition-colors shadow-md"
              >
                <MessageCircle size={17} />
                <span>ORDER / QUERY VIA WHATSAPP (+91 7900455958)</span>
              </button>
            </div>

            {/* Perks Strip */}
            <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-[#E5DDD3] text-[10px] font-bold uppercase tracking-wider text-[#6B6B6B]">
              <div className="p-3 bg-white border border-[#E5DDD3] rounded-2xl shadow-2xs">
                <Truck size={16} className="mx-auto mb-1 text-[#7D1E22]" />
                <span>Express Dispatch</span>
              </div>
              <div className="p-3 bg-white border border-[#E5DDD3] rounded-2xl shadow-2xs">
                <RefreshCw size={16} className="mx-auto mb-1 text-[#7D1E22]" />
                <span>7-Day Return</span>
              </div>
              <div className="p-3 bg-white border border-[#E5DDD3] rounded-2xl shadow-2xs">
                <ShieldCheck size={16} className="mx-auto mb-1 text-[#7D1E22]" />
                <span>Quality Assured</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="space-y-2 pt-2 border-t border-[#E5DDD3] text-xs">
              {/* Description & Overview */}
              <div className="border border-[#E5DDD3] rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleAccordion('description')}
                  className="w-full p-4 flex items-center justify-between font-bold uppercase tracking-wider text-left bg-white hover:bg-[#FAF8F5] transition-colors"
                >
                  <span>Product Overview & Silhouette</span>
                  {openAccordion === 'description' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === 'description' && (
                  <div className="p-4 text-[#6B6B6B] leading-relaxed space-y-2 border-t border-[#E5DDD3]">
                    <p>{product.description}</p>
                    <p className="font-semibold text-[#1E1E1E] mt-2">{product.fitNote}</p>
                  </div>
                )}
              </div>

              {/* Fabric & Specs */}
              <div className="border border-[#E5DDD3] rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleAccordion('fabric')}
                  className="w-full p-4 flex items-center justify-between font-bold uppercase tracking-wider text-left bg-white hover:bg-[#FAF8F5] transition-colors"
                >
                  <span>Fabric Specifications & Details</span>
                  {openAccordion === 'fabric' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === 'fabric' && (
                  <div className="p-4 text-[#6B6B6B] leading-relaxed border-t border-[#E5DDD3]">
                    <ul className="space-y-2 list-disc list-inside">
                      {product.details?.map((detail, idx) => (
                        <li key={idx} className="font-medium">{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Care & Maintenance */}
              <div className="border border-[#E5DDD3] rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full p-4 flex items-center justify-between font-bold uppercase tracking-wider text-left bg-white hover:bg-[#FAF8F5] transition-colors"
                >
                  <span>Wash & Care Instructions</span>
                  {openAccordion === 'care' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === 'care' && (
                  <div className="p-4 text-[#6B6B6B] leading-relaxed border-t border-[#E5DDD3]">
                    <p>{product.care}</p>
                  </div>
                )}
              </div>

              {/* Shipping & Returns */}
              <div className="border border-[#E5DDD3] rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full p-4 flex items-center justify-between font-bold uppercase tracking-wider text-left bg-white hover:bg-[#FAF8F5] transition-colors"
                >
                  <span>Pan-India Shipping & 7-Day Returns</span>
                  {openAccordion === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === 'shipping' && (
                  <div className="p-4 text-[#6B6B6B] leading-relaxed border-t border-[#E5DDD3] space-y-2">
                    <p>• <strong>Free Shipping:</strong> Orders above ₹1,499 qualify for free express courier delivery.</p>
                    <p>• <strong>Cash on Delivery:</strong> Available across 19,000+ Indian pincodes (+₹99 handling fee).</p>
                    <p>• <strong>Returns:</strong> 7-day hassle-free reverse pickup for size exchange or full refund.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <section className="mt-16 sm:mt-24 pt-12 border-t border-[#E5DDD3]">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-[#E5DDD3] gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7D1E22] block mb-1">
                Verified Buyer Feedback
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-black uppercase tracking-tight text-[#1E1E1E]">
                CUSTOMER REVIEWS ({reviewsForThisProduct.length + 3})
              </h3>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="bg-[#7D1E22] hover:bg-[#942429] text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-sm"
            >
              WRITE A REVIEW
            </button>
          </div>

          <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviewsForThisProduct.map((rev) => (
              <div key={rev.id} className="bg-white p-6 border border-[#E5DDD3] rounded-2xl shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={13} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#6B6B6B]">{rev.date}</span>
                </div>
                <h4 className="text-xs font-bold uppercase text-[#1E1E1E]">{rev.title}</h4>
                <p className="text-xs text-[#6B6B6B] italic">"{rev.comment}"</p>
                <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest pt-2">
                  By {rev.name} • <span className="text-emerald-700">Verified Buyer</span>
                </p>
              </div>
            ))}

            {/* Default sample reviews */}
            <div className="bg-white p-6 border border-[#E5DDD3] rounded-2xl shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                </div>
                <span className="text-[10px] text-[#6B6B6B]">2026-02-12</span>
              </div>
              <h4 className="text-xs font-bold uppercase text-[#1E1E1E]">Top tier fashion quality</h4>
              <p className="text-xs text-[#6B6B6B] italic">"The texture and thickness of the material is exceptional. Doesn’t shrink or fade after wash."</p>
              <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest pt-2">
                By Aditya V. • <span className="text-emerald-700">Verified Buyer</span>
              </p>
            </div>

            <div className="bg-white p-6 border border-[#E5DDD3] rounded-2xl shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                </div>
                <span className="text-[10px] text-[#6B6B6B]">2026-02-08</span>
              </div>
              <h4 className="text-xs font-bold uppercase text-[#1E1E1E]">Perfect Luxury Fit</h4>
              <p className="text-xs text-[#6B6B6B] italic">"Exactly what I was looking for. Fits true to modern aesthetic without looking sloppy."</p>
              <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest pt-2">
                By Neil P. • <span className="text-emerald-700">Verified Buyer</span>
              </p>
            </div>
          </div>
        </section>

        {/* You May Also Like Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 sm:mt-24 pt-12 border-t border-[#E5DDD3]">
            <div className="mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7D1E22] block mb-1">
                Complete Your Look
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-black uppercase tracking-tight text-[#1E1E1E]">
                YOU MAY ALSO LIKE
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
          <div
            onClick={() => setShowReviewModal(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-xs"
          />
          <div className="relative bg-white w-full max-w-lg shadow-2xl z-10 border border-[#E5DDD3] rounded-3xl p-6 sm:p-8 animate-slide-up">
            <h3 className="text-base font-serif font-black uppercase tracking-widest text-[#1E1E1E] mb-4">
              Write A Product Review
            </h3>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-[#1E1E1E] mb-1">
                  Rating:
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="p-1 text-amber-500 hover:scale-110 transition-transform"
                    >
                      <Star size={20} fill={reviewRating >= star ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#1E1E1E] mb-1">
                  Your Name:
                </label>
                <input
                  type="text"
                  required
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="e.g. Aryan Malhotra"
                  className="w-full bg-[#FAF8F5] border border-[#E5DDD3] rounded-xl p-3 text-xs text-[#1E1E1E] placeholder-[#6B6B6B] focus:outline-none focus:border-[#7D1E22]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#1E1E1E] mb-1">
                  Headline:
                </label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="e.g. Amazing drape and fabric feel"
                  className="w-full bg-[#FAF8F5] border border-[#E5DDD3] rounded-xl p-3 text-xs text-[#1E1E1E] placeholder-[#6B6B6B] focus:outline-none focus:border-[#7D1E22]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#1E1E1E] mb-1">
                  Review:
                </label>
                <textarea
                  required
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Describe the fabric, sizing fit, and your experience with this piece..."
                  className="w-full bg-[#FAF8F5] border border-[#E5DDD3] rounded-xl p-3 text-xs text-[#1E1E1E] placeholder-[#6B6B6B] focus:outline-none focus:border-[#7D1E22]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-5 py-2.5 font-bold uppercase tracking-wider text-[#6B6B6B] hover:text-[#1E1E1E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#7D1E22] hover:bg-[#942429] text-white px-7 py-2.5 rounded-full font-bold uppercase tracking-widest transition-all shadow-sm"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sticky Mobile Bottom Quick Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E5DDD3] p-2.5 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex items-center gap-2">
        <button
          onClick={handleWhatsAppOrder}
          className="bg-[#25D366] text-white p-3 rounded-full flex items-center justify-center shrink-0 shadow-xs"
          title="Query on WhatsApp"
        >
          <MessageCircle size={18} />
        </button>

        <button
          onClick={handleAddToCart}
          className="flex-1 bg-[#7D1E22] hover:bg-[#942429] text-white py-3 px-2 text-[11px] font-bold uppercase tracking-wider rounded-full flex items-center justify-center gap-1.5 shadow-md"
        >
          <ShoppingBag size={14} />
          <span>{selectedSize ? `ADD (${selectedSize})` : 'ADD TO BAG'}</span>
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 bg-white border border-[#7D1E22] text-[#7D1E22] py-3 px-2 text-[11px] font-bold uppercase tracking-wider rounded-full flex items-center justify-center gap-1 shadow-xs"
        >
          <span>BUY NOW</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
