// Vendors — Figma defaults plus i18n + per-city locality data.
//
// Image strategy: each vendor has `image` (preferred — file in /public/vendors/)
// and `fallbackImage` (remote URL used when the local file is absent).
//
// Each vendor has:
//   - name      : English name
//   - nameHi    : Devanagari transliteration (per spec)
//   - locations : { City: { en, hi, distanceKm } } — locality changes with the
//                 user's chosen city; distance becomes city-specific too.
// Menus stay in English for now (per "vendor data" being mostly visible chrome,
// and to keep prices readable). Hooks below select the right field by language.

const local = (id) => `/vendors/${id}.jpg`;

export const VENDORS = [
  {
    id: 'shri-santosh-catering',
    name: 'Shri Santosh Catering Service',
    nameHi: 'श्री संतोष कैटरिंग सर्विस',
    category: 'CATERER',
    rating: 4.9,
    reviews: 82,
    events: '200+',
    priceUnit: 'plate',
    image: local('shri-santosh-catering'),
    fallbackImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800',
    locations: {
      Kolkata:   { en: 'Ballygunge',  hi: 'बालीगंज',       distanceKm: 15 },
      Mumbai:    { en: 'Bandra West', hi: 'बांद्रा वेस्ट',  distanceKm: 11 },
      Delhi:     { en: 'Saket',       hi: 'साकेत',          distanceKm: 8  },
      Chennai:   { en: 'T. Nagar',    hi: 'टी. नगर',        distanceKm: 9  },
      Ahmedabad: { en: 'Bodakdev',    hi: 'बोडकदेव',         distanceKm: 7  },
    },
    menu: [
      { name: 'Bengali Veg Plate', price: 750 },
      { name: 'Bengali Non-Veg Plate', price: 900 },
      { name: 'North Indian Veg Plate', price: 700 },
      { name: 'North Indian Non-Veg Plate', price: 850 },
    ],
  },
  {
    id: 'subhajit-photography',
    name: 'Subhajit Photography',
    nameHi: 'शुभजीत फ़ोटोग्राफ़ी',
    category: 'PHOTOGRAPHER',
    rating: 4.8,
    reviews: 64,
    events: '120+',
    priceUnit: 'day',
    image: local('subhajit-photography'),
    fallbackImage: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800',
    locations: {
      Kolkata:   { en: 'Ultadanga',        hi: 'उल्टाडांगा',      distanceKm: 9  },
      Mumbai:    { en: 'Andheri',          hi: 'अंधेरी',          distanceKm: 14 },
      Delhi:     { en: 'Connaught Place',  hi: 'कनॉट प्लेस',      distanceKm: 6  },
      Chennai:   { en: 'Adyar',            hi: 'अड्यार',           distanceKm: 7  },
      Ahmedabad: { en: 'Navrangpura',      hi: 'नवरंगपुरा',        distanceKm: 5  },
    },
    menu: [
      { name: 'Half-day coverage', price: 18000 },
      { name: 'Full-day coverage', price: 30000 },
      { name: 'Full-day + Cinematic Reel', price: 45000 },
      { name: 'Pre-wedding shoot', price: 22000 },
    ],
  },
  {
    id: 'vandana-decor',
    name: 'Vandana Decor',
    nameHi: 'वंदना डेकोर',
    category: 'DECORATOR',
    rating: 4.7,
    reviews: 41,
    events: '90+',
    priceUnit: 'event',
    image: local('vandana-decor'),
    fallbackImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    locations: {
      Kolkata:   { en: 'Esplanade',        hi: 'एस्प्लेनेड',       distanceKm: 6  },
      Mumbai:    { en: 'Worli',            hi: 'वर्ली',            distanceKm: 10 },
      Delhi:     { en: 'South Extension',  hi: 'साउथ एक्सटेंशन',   distanceKm: 9  },
      Chennai:   { en: 'Mylapore',         hi: 'मायलापुर',          distanceKm: 5  },
      Ahmedabad: { en: 'Vastrapur',        hi: 'वस्त्रापुर',        distanceKm: 6  },
    },
    menu: [
      { name: 'Stage + Mandap', price: 150000 },
      { name: 'Full Venue Floral', price: 280000 },
      { name: 'Entrance + Photo Wall', price: 65000 },
      { name: 'Ceiling Drapes & Lights', price: 95000 },
    ],
  },
  {
    id: 'pandit-ramesh-sharma',
    name: 'Pandit Ramesh Sharma',
    nameHi: 'पंडित रमेश शर्मा',
    category: 'PANDIT',
    rating: 4.9,
    reviews: 130,
    events: '500+',
    priceUnit: 'day',
    image: local('pandit-ramesh-sharma'),
    fallbackImage: 'https://images.unsplash.com/photo-1604608672516-f1b9bca0a9b3?w=800',
    locations: {
      Kolkata:   { en: 'Kalighat',         hi: 'कालीघाट',         distanceKm: 4  },
      Mumbai:    { en: 'Dadar',            hi: 'दादर',            distanceKm: 8  },
      Delhi:     { en: 'Chandni Chowk',    hi: 'चांदनी चौक',      distanceKm: 5  },
      Chennai:   { en: 'Mylapore',         hi: 'मायलापुर',         distanceKm: 4  },
      Ahmedabad: { en: 'Maninagar',        hi: 'मणिनगर',          distanceKm: 5  },
    },
    // 'Griha Pravesh / Puja' removed per spec.
    menu: [
      { name: 'Wedding ceremony', price: 21000 },
      { name: 'Annaprashan / Upanayan', price: 11000 },
      { name: 'Shradhh', price: 9000 },
    ],
  },
  {
    id: 'phoolwala',
    name: 'PhoolWala',
    nameHi: 'फूलवाला',
    category: 'FLORIST',
    rating: 4.6,
    reviews: 53,
    events: '80+',
    priceUnit: 'day',
    image: local('phoolwala'),
    fallbackImage: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800',
    locations: {
      Kolkata:   { en: 'Sector V, Salt Lake', hi: 'सेक्टर V, साल्ट लेक', distanceKm: 12 },
      Mumbai:    { en: 'Dadar West',          hi: 'दादर वेस्ट',          distanceKm: 9  },
      Delhi:     { en: 'Karol Bagh',          hi: 'करोल बाग',            distanceKm: 7  },
      Chennai:   { en: 'Anna Nagar',          hi: 'अन्ना नगर',           distanceKm: 8  },
      Ahmedabad: { en: 'Satellite',           hi: 'सैटेलाइट',             distanceKm: 6  },
    },
    menu: [
      { name: 'Garland Set (Bride+Groom)', price: 8000 },
      { name: 'Mandap Florals', price: 35000 },
      { name: 'Aisle & Entry', price: 22000 },
      { name: 'Full Venue Florals', price: 50000 },
    ],
  },
  {
    id: 'beats-by-arun',
    name: 'Beats by Arun',
    nameHi: 'बीट्स बाय अरुण',
    category: 'MUSIC',
    rating: 4.5,
    reviews: 29,
    events: '60+',
    priceUnit: 'day',
    image: local('beats-by-arun'),
    fallbackImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
    locations: {
      Kolkata:   { en: 'New Town', hi: 'न्यू टाउन', distanceKm: 18 },
      Mumbai:    { en: 'Powai',    hi: 'पवई',        distanceKm: 16 },
      Delhi:     { en: 'Dwarka',   hi: 'द्वारका',     distanceKm: 14 },
      Chennai:   { en: 'Velachery',hi: 'वेलाचेरी',    distanceKm: 12 },
      Ahmedabad: { en: 'Bopal',    hi: 'बोपल',       distanceKm: 10 },
    },
    menu: [
      { name: 'DJ + Speakers (4hr)', price: 18000 },
      { name: 'DJ Full Night', price: 28000 },
      { name: 'Live Shehnai', price: 15000 },
      { name: 'Sound + Lights Combo', price: 35000 },
    ],
  },
  {
    id: 'glow-lights',
    name: 'Glow Lights & Sound',
    nameHi: 'ग्लो लाइट्स एंड साउंड',
    category: 'LIGHTS',
    rating: 4.4,
    reviews: 22,
    events: '40+',
    priceUnit: 'day',
    image: local('glow-lights'),
    fallbackImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
    locations: {
      Kolkata:   { en: 'Howrah',    hi: 'हावड़ा',    distanceKm: 14 },
      Mumbai:    { en: 'Thane',     hi: 'ठाणे',      distanceKm: 22 },
      Delhi:     { en: 'Gurgaon',   hi: 'गुरुग्राम',  distanceKm: 20 },
      Chennai:   { en: 'Tambaram',  hi: 'तांबरम',     distanceKm: 18 },
      Ahmedabad: { en: 'Gota',      hi: 'गोटा',      distanceKm: 11 },
    },
    menu: [
      { name: 'Fairy Lights Package', price: 18000 },
      { name: 'Stage Spotlights', price: 25000 },
      { name: 'Full Venue Lighting', price: 60000 },
      { name: 'Outdoor + Pathway', price: 35000 },
    ],
  },
];

export const VENDORS_BY_ID = Object.fromEntries(VENDORS.map(v => [v.id, v]));

export const BUDGET_CATEGORIES = [
  { key: 'decoration',  emoji: '🎨',  vendorCategory: 'DECORATOR',    share: 0.32 },
  { key: 'photography', emoji: '📸',  vendorCategory: 'PHOTOGRAPHER', share: 0.25 },
  { key: 'priest',      emoji: '🛕',  vendorCategory: 'PANDIT',       share: 0.06 },
  { key: 'music',       emoji: '🎵',  vendorCategory: 'MUSIC',        share: 0.012 },
  { key: 'lights',      emoji: '💡',  vendorCategory: 'LIGHTS',       share: 0.038 },
  { key: 'catering',    emoji: '🍽️', vendorCategory: 'CATERER',      share: 0.30 },
];

// ===== Helpers =====

const PANDIT_CEREMONY_TO_MENU = {
  wedding: 'Wedding ceremony',
  annaprashan: 'Annaprashan / Upanayan',
  upanayan: 'Annaprashan / Upanayan',
  shradhh: 'Shradhh',
};

const HIDDEN_CATEGORIES_BY_CEREMONY = {
  anniversary: new Set(['PANDIT']),
  engagement:  new Set(['PANDIT']),
  shradhh:     new Set(['PHOTOGRAPHER', 'MUSIC', 'LIGHTS']),
};

export function filterVendorsByCeremony(vendors, ceremonyKey) {
  const hidden = HIDDEN_CATEGORIES_BY_CEREMONY[ceremonyKey];
  if (!hidden) return vendors;
  return vendors.filter(v => !hidden.has(v.category));
}

function formatINR(n) {
  return '₹' + Number(n).toLocaleString('en-IN');
}

export function getVendorPriceLabel(vendor, ceremonyKey, t) {
  if (!vendor?.menu?.length) return '';
  if (vendor.category === 'CATERER') {
    const max = Math.max(...vendor.menu.map(m => m.price));
    return `${formatINR(max)} / ${t ? t('vd.perPlate').replace(/^\//, '') : 'Plate'}`.replace(' / /', ' /');
  }
  if (vendor.category === 'PANDIT') {
    const targetName = PANDIT_CEREMONY_TO_MENU[ceremonyKey];
    const item = vendor.menu.find(m => m.name === targetName);
    const price = item ? item.price : vendor.menu[0].price;
    return formatINR(price);
  }
  const min = Math.min(...vendor.menu.map(m => m.price));
  const from = t ? (t.lang === 'hi' ? 'से' : 'From') : 'From';
  return `${from} ${formatINR(min)}`;
}

export function getVendorMinPrice(vendor) {
  if (!vendor?.menu?.length) return 0;
  return Math.min(...vendor.menu.map(m => m.price));
}

/** City-specific locality (and distance) for a vendor in the current language. */
export function getVendorLocation(vendor, city, lang = 'en') {
  const loc = vendor.locations?.[city];
  if (!loc) {
    // Fallback when the user's city isn't in our list — show first defined locality
    const first = Object.values(vendor.locations || {})[0];
    return first ? { locality: first[lang] || first.en, distanceKm: first.distanceKm } : { locality: '', distanceKm: 0 };
  }
  return { locality: loc[lang] || loc.en, distanceKm: loc.distanceKm };
}

/** Full "Locality, City" string in the active language. */
export function getVendorLocationString(vendor, city, lang = 'en', t) {
  const { locality } = getVendorLocation(vendor, city, lang);
  const cityLabel = t ? t(`city.${city}`) : city;
  return locality ? `${locality}, ${cityLabel}` : cityLabel;
}

/** Vendor display name in the active language. */
export function getVendorName(vendor, lang = 'en') {
  return lang === 'hi' && vendor.nameHi ? vendor.nameHi : vendor.name;
}
