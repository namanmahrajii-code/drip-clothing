export const initialCategories = [
  { id: 'all', name: 'All Collections', sectionNumber: 'ALL', description: 'Curated modern ethnic & festive fashion collection' },
  { id: 'kurtas', name: 'Chikankari & Silk Kurtas', sectionNumber: '01', description: 'Handcrafted Lucknowi Chikankari & Pure Silk Kurta Sets with Churidar' },
  { id: 'festive-kurtas', name: 'Festive & Wedding Kurtas', sectionNumber: '02', description: 'Vibrant Jacquard, Mirror Work & Sequin Kurtas for Celebrations' },
  { id: 'indo-western', name: 'Indo-Western & Achkans', sectionNumber: '03', description: 'Contemporary Structured Bandhgalas & Floral Embroidered Achkans' },
  { id: 'sherwanis', name: 'Royal Wedding Sherwanis', sectionNumber: '04', description: 'Grand Zari & Zardozi Embroidered Groom & Reception Sherwanis' },
  { id: 'new-arrivals', name: 'New Arrivals', sectionNumber: '05', description: 'Fresh seasonal drops & latest collection releases' },
];

export const initialProducts = [
  // =========================================================================
  // 01 — CHIKANKARI & SILK KURTAS (4 Products)
  // =========================================================================
  {
    id: 'prod_libas_01',
    slug: 'chikankari-cream-silk-kurta',
    title: 'Ivory Cream Chikankari Kurta Set',
    subtitle: 'Handcrafted Lucknowi Threadwork Silk Blend Kurta with Churidar',
    category: 'kurtas',
    categoryName: 'CHIKANKARI KURTAS',
    color: 'Ivory Cream',
    type: 'Kurta Pajama Set',
    gender: 'Men',
    price: 2499,
    originalPrice: 4999,
    discount: '50% OFF',
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 38,
    images: ['/images/products/cream_chikankari_kurta.jpg', '/images/products/libas_outfit_1.jpg'],
    sizes: [
      { size: '38 (S)', stock: 4 },
      { size: '40 (M)', stock: 6 },
      { size: '42 (L)', stock: 5 },
      { size: '44 (XL)', stock: 3 },
    ],
    description: 'Exquisite ivory cream silk-cotton blend kurta embellished with delicate all-over tone-on-tone Lucknowi Chikankari embroidery. Designed with a classic mandarin collar, side pockets, and paired with tailored off-white trousers.',
    details: [
      'Premium Silk-Cotton Blend with Fine Chikankari Stitchwork',
      'Mandarin collar with subtle embroidered placket buttons',
      'Includes matching tailored off-white stretch churidar/pajama',
      'Soft breathable inner lining for all-day festive comfort'
    ],
    care: 'Dry clean recommended. Gentle hand wash in cold water.',
    fitNote: 'Tailored ethnic silhouette. True to size with a graceful straight fall.'
  },
  {
    id: 'prod_libas_02',
    slug: 'classic-white-georgette-chikankari-kurta',
    title: 'Pure White Georgette Chikankari Kurta',
    subtitle: 'Intricate Lucknowi Shadow Work Kurta Set with Inner Lining',
    category: 'kurtas',
    categoryName: 'CHIKANKARI KURTAS',
    color: 'Pure White',
    type: 'Kurta Pajama Set',
    gender: 'Men',
    price: 2599,
    originalPrice: 5199,
    discount: '50% OFF',
    isNew: false,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 42,
    images: ['/images/products/classic_white_chikankari_kurta.jpg', '/images/products/libas_outfit_8.jpg'],
    sizes: [
      { size: '38 (S)', stock: 3 },
      { size: '40 (M)', stock: 8 },
      { size: '42 (L)', stock: 6 },
      { size: '44 (XL)', stock: 2 },
    ],
    description: 'Timeless pure white artisanal Chikankari kurta crafted on lightweight georgette with pure cotton inner lining. Showcases intricate floral jaal motifs and an elegant buttoned neckline.',
    details: [
      'Breathable Georgette with 100% Cotton Lining',
      'All-over Lucknowi jaal embroidery on front and sleeves',
      'Side slits with functional deep pockets',
      'Paired with crisp white cotton pajama'
    ],
    care: 'Dry clean only to maintain embroidery sheen.',
    fitNote: 'Comfortable regular ethnic fit.'
  },
  {
    id: 'prod_libas_03',
    slug: 'mint-green-embroidered-silk-kurta',
    title: 'Pastel Mint Embroidered Kurta Set',
    subtitle: 'Hand Embroidered Neckline Chanderi Silk Kurta Pajama',
    category: 'kurtas',
    categoryName: 'SILK KURTAS',
    color: 'Mint Green',
    type: 'Kurta Pajama Set',
    gender: 'Men',
    price: 2299,
    originalPrice: 4599,
    discount: '50% OFF',
    isNew: true,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 29,
    images: ['/images/products/mint_green_embroidered_kurta.jpg', '/images/products/libas_outfit_3.jpg'],
    sizes: [
      { size: '38 (S)', stock: 2 },
      { size: '40 (M)', stock: 5 },
      { size: '42 (L)', stock: 4 },
      { size: '44 (XL)', stock: 2 },
    ],
    description: 'Refreshing pastel mint green kurta tailored from rich Chanderi silk blend. Highlights intricate neckline embroidery with metallic dabka accents, styled with classic white churidar.',
    details: [
      'Fine Chanderi Silk Blend with Natural Sheen',
      'Subtle metallic zardozi detailing on mandarin band',
      'Comfortable side pockets and straight hem',
      'Includes premium white churidar'
    ],
    care: 'Dry clean recommended.',
    fitNote: 'Tailored fit for poojas, daytime weddings, and festive occasions.'
  },
  {
    id: 'prod_libas_04',
    slug: 'sage-green-textured-silk-kurta',
    title: 'Sage Olive Textured Silk Kurta Set',
    subtitle: 'Contemporary Minimalist Thread Embroidery Kurta Set',
    category: 'kurtas',
    categoryName: 'SILK KURTAS',
    color: 'Sage Green',
    type: 'Kurta Pajama Set',
    gender: 'Men',
    price: 2299,
    originalPrice: 4499,
    discount: '49% OFF',
    isNew: false,
    isBestSeller: false,
    rating: 4.7,
    reviewCount: 21,
    images: ['/images/products/sage_green_silk_kurta.jpg', '/images/products/libas_outfit_9.jpg'],
    sizes: [
      { size: '38 (S)', stock: 3 },
      { size: '40 (M)', stock: 4 },
      { size: '42 (L)', stock: 3 },
      { size: '44 (XL)', stock: 1 },
    ],
    description: 'Modern understated luxury in earthy sage olive green. Cut in premium raw silk blend with subtle self-textured slubs and delicate thread accents.',
    details: [
      'Textured Slub Raw Silk Blend',
      'Refined minimal bandhgala collar styling',
      'Full sleeves with slit cuffs',
      'Includes matching white trousers'
    ],
    care: 'Gentle hand wash or dry clean.',
    fitNote: 'Modern slim-straight fit.'
  },

  // =========================================================================
  // 02 — FESTIVE & WEDDING KURTAS (3 Products)
  // =========================================================================
  {
    id: 'prod_libas_05',
    slug: 'haldi-yellow-jacquard-silk-kurta',
    title: 'Royal Haldi Yellow Jacquard Kurta',
    subtitle: 'Self-Weave Jacquard Silk Festive Kurta for Weddings & Haldi',
    category: 'festive-kurtas',
    categoryName: 'FESTIVE KURTAS',
    color: 'Haldi Yellow / Gold',
    type: 'Festive Kurta Set',
    gender: 'Men',
    price: 2399,
    originalPrice: 4799,
    discount: '50% OFF',
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 46,
    images: ['/images/products/haldi_yellow_silk_kurta.jpg', '/images/products/libas_outfit_4.jpg'],
    sizes: [
      { size: '38 (S)', stock: 5 },
      { size: '40 (M)', stock: 7 },
      { size: '42 (L)', stock: 6 },
      { size: '44 (XL)', stock: 4 },
    ],
    description: 'Vibrant celebratory golden yellow kurta woven in intricate self-jacquard motifs. The ideal ensemble for Haldi ceremonies, Sangeet functions, and Diwali festivities.',
    details: [
      'Lustrous Banarasi Jacquard Silk Weave',
      'Mandarin collar with tonal loop button details',
      'Side vents and deep pockets',
      'Complete with ivory white churidar'
    ],
    care: 'Dry clean recommended to preserve gold luster.',
    fitNote: 'Regular ethnic fit for easy movement during rituals and celebrations.'
  },
  {
    id: 'prod_libas_06',
    slug: 'rust-brown-copper-printed-silk-kurta',
    title: 'Rust Copper Printed Silk Kurta Set',
    subtitle: 'Geometric Micro-Print Festive Silk Kurta with Mandarin Collar',
    category: 'festive-kurtas',
    categoryName: 'FESTIVE KURTAS',
    color: 'Rust Brown / Copper',
    type: 'Festive Kurta Set',
    gender: 'Men',
    price: 2199,
    originalPrice: 4299,
    discount: '49% OFF',
    isNew: false,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 31,
    images: ['/images/products/rust_brown_festive_kurta.jpg', '/images/products/libas_outfit_2.jpg'],
    sizes: [
      { size: '38 (S)', stock: 4 },
      { size: '40 (M)', stock: 5 },
      { size: '42 (L)', stock: 4 },
      { size: '44 (XL)', stock: 2 },
    ],
    description: 'Warm copper-rust festive kurta styled with geometric micro-print motifs and antique brass buttons. Offers a distinct traditional aesthetic with modern tailoring.',
    details: [
      'Art Silk with Metallic Foil & Micro Print',
      'Concealed placket with decorative buttons',
      'Comfortable breathable lining',
      'Paired with ivory white churidar'
    ],
    care: 'Hand wash cold or dry clean.',
    fitNote: 'Straight fit.'
  },
  {
    id: 'prod_libas_07',
    slug: 'midnight-black-sequin-mirror-kurta',
    title: 'Midnight Black Sequin Mirror Kurta',
    subtitle: 'Shimmer Mirror & Sequin Threadwork Kurta Set with Trousers',
    category: 'festive-kurtas',
    categoryName: 'FESTIVE KURTAS',
    color: 'Midnight Black',
    type: 'Festive Kurta Set',
    gender: 'Men',
    price: 2799,
    originalPrice: 5499,
    discount: '49% OFF',
    isNew: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 54,
    images: ['/images/products/midnight_black_sequin_kurta.jpg', '/images/products/libas_outfit_5.jpg'],
    sizes: [
      { size: '38 (S)', stock: 3 },
      { size: '40 (M)', stock: 7 },
      { size: '42 (L)', stock: 5 },
      { size: '44 (XL)', stock: 3 },
    ],
    description: 'Showstopping evening wear in jet black with subtle tonal sequins that catch the light effortlessly. Ideal for Sangeet nights, cocktail parties, and grand receptions.',
    details: [
      'Premium Georgette with Sequin Embellishments & Cotton Lining',
      'Mandarin collar with sequin border',
      'Includes matching jet black tailored trousers',
      'Dual side slits and pockets'
    ],
    care: 'Dry clean only.',
    fitNote: 'Tailored fit for a striking evening silhouette.'
  },

  // =========================================================================
  // 03 — INDO-WESTERN & ACHKANS (1 Product)
  // =========================================================================
  {
    id: 'prod_libas_08',
    slug: 'blush-pink-floral-indo-western-achkan',
    title: 'Blush Pink Floral Indo-Western Achkan',
    subtitle: 'Intricate Floral Embroidered Indo-Western Bandhgala with Trousers',
    category: 'indo-western',
    categoryName: 'INDO-WESTERN',
    color: 'Blush Pink / Rose Gold',
    type: 'Indo-Western Set',
    gender: 'Men',
    price: 4499,
    originalPrice: 8999,
    discount: '50% OFF',
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 37,
    images: ['/images/products/blush_pink_indo_western.jpg', '/images/products/libas_outfit_6.jpg'],
    sizes: [
      { size: '38 (S)', stock: 2 },
      { size: '40 (M)', stock: 4 },
      { size: '42 (L)', stock: 3 },
      { size: '44 (XL)', stock: 2 },
    ],
    description: 'Royal pastel blush pink structured Indo-Western Achkan jacket featuring intricate all-over floral threadwork. Offers a regal front-slit design paired with crisp off-white trousers.',
    details: [
      'Heavy Raw Silk Jacquard with Resham Threadwork',
      'Front open buttoned placket with structured shoulder pads',
      'Dual concealed pockets and premium satin lining',
      'Includes tailored stretch trousers'
    ],
    care: 'Strictly dry clean only.',
    fitNote: 'Structured designer fit. Elevates the groom or wedding guest look.'
  },

  // =========================================================================
  // 04 — ROYAL WEDDING SHERWANIS (2 Products)
  // =========================================================================
  {
    id: 'prod_libas_09',
    slug: 'royal-navy-blue-embellished-sherwani',
    title: 'Royal Navy Blue Embellished Sherwani',
    subtitle: 'Sequined Bandhgala Indo-Western Sherwani for Reception & Sangeet',
    category: 'sherwanis',
    categoryName: 'WEDDING SHERWANIS',
    color: 'Royal Navy Blue',
    type: 'Sherwani Set',
    gender: 'Men',
    price: 4999,
    originalPrice: 9999,
    discount: '50% OFF',
    isNew: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 49,
    images: ['/images/products/royal_navy_sherwani.jpg', '/images/products/libas_outfit_7.jpg'],
    sizes: [
      { size: '38 (S)', stock: 2 },
      { size: '40 (M)', stock: 5 },
      { size: '42 (L)', stock: 4 },
      { size: '44 (XL)', stock: 2 },
    ],
    description: 'Opulent midnight navy blue sherwani adorned with micro-sequins and tone-on-tone embroidery across the torso and sleeves. Center slit cut creates an imposing, stately royal stature.',
    details: [
      'Heavy Brocade Silk with Metallic Sequin Embroidery',
      'High mandarin bandhgala collar with custom velvet buttons',
      'Full inner lining and structured chest architecture',
      'Complete with ivory white churidar'
    ],
    care: 'Dry clean only.',
    fitNote: 'Regal structured fit.'
  },
  {
    id: 'prod_libas_10',
    slug: 'royal-cream-gold-zari-wedding-sherwani',
    title: 'Royal Cream & Gold Zari Wedding Sherwani',
    subtitle: 'Heavy Handcrafted Zardozi & Resham Embroidered Groom Sherwani',
    category: 'sherwanis',
    categoryName: 'WEDDING SHERWANIS',
    color: 'Ivory Gold / Cream',
    type: 'Sherwani Set',
    gender: 'Men',
    price: 5999,
    originalPrice: 11999,
    discount: '50% OFF',
    isNew: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 62,
    images: ['/images/products/luxury_cream_gold_sherwani.jpg', '/images/products/libas_outfit_10.jpg'],
    sizes: [
      { size: '38 (S)', stock: 2 },
      { size: '40 (M)', stock: 4 },
      { size: '42 (L)', stock: 3 },
      { size: '44 (XL)', stock: 1 },
    ],
    description: 'The pinnacle of wedding heritage — a mastercrafted ivory cream sherwani intricately hand-embroidered with antique gold zari, zardozi work, and subtle resham accents for the discerning Indian groom.',
    details: [
      'Pure Silk Brocade with Handcrafted Zari & Zardozi Work',
      'Ornate collar and pocket square welt with matching buttons',
      'Padded shoulders and full breathable satin lining',
      'Includes premium cream churidar'
    ],
    care: 'Dry clean only in protective garment bag.',
    fitNote: 'Grand royal wedding silhouette.'
  },
];

export const getCatalogSections = (productsList = initialProducts) => {
  const newArrivals = productsList.filter((p) => p.isNew === true);

  return [
    {
      id: 'new-arrivals',
      sectionNumber: '05',
      title: '05 — NEW ARRIVALS',
      subtitle: 'Freshly arrived festive kurtas, Chikankari sets & royal wedding sherwanis',
      badge: 'FRESH COLLECTION',
      products: newArrivals.length > 0 ? newArrivals : productsList.slice(0, 4),
    },
    {
      id: 'kurtas',
      sectionNumber: '01',
      title: '01 — CHIKANKARI & SILK KURTAS',
      subtitle: 'Handcrafted Lucknowi threadwork & fine silk kurta sets with churidar',
      badge: 'HOT FAVOURITE',
      products: productsList.filter((p) => p.category === 'kurtas'),
    },
    {
      id: 'festive-kurtas',
      sectionNumber: '02',
      title: '02 — FESTIVE & WEDDING KURTAS',
      subtitle: 'Vibrant Haldi yellows, mirror sequin & rich copper festive kurtas',
      badge: 'FESTIVE EDIT',
      products: productsList.filter((p) => p.category === 'festive-kurtas'),
    },
    {
      id: 'indo-western',
      sectionNumber: '03',
      title: '03 — INDO-WESTERN & ACHKANS',
      subtitle: 'Structured designer bandhgalas & floral embroidered achkans with trousers',
      products: productsList.filter((p) => p.category === 'indo-western'),
    },
    {
      id: 'sherwanis',
      sectionNumber: '04',
      title: '04 — ROYAL WEDDING SHERWANIS',
      subtitle: 'Handcrafted zari, zardozi & sequined wedding sherwanis for grooms & receptions',
      badge: 'ROYAL HERITAGE',
      products: productsList.filter((p) => p.category === 'sherwanis'),
    },
  ];
};
