// Vendors from the Figma prototype + extras per category so all are bookable.
// Image strategy: each vendor has `image` (preferred — file in /public/vendors/) and
// `fallbackImage` (remote URL used until you add your own file). Drop a .jpg with the
// matching <id> into `public/vendors/` and reload — it loads automatically.

const local = (id) => `/vendors/${id}.jpg`;

export const VENDORS = [
  {
    id: 'shri-santosh-catering',
    name: 'Shri Santosh Catering Service',
    category: 'CATERER',
    location: 'Ballygunge, Kolkata',
    distanceKm: 15,
    rating: 4.9,
    reviews: 82,
    events: '200+',
    priceUnit: 'plate',
    image: local('shri-santosh-catering'),
    fallbackImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800',
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
    category: 'PHOTOGRAPHER',
    location: 'Ultadanga, Kolkata',
    distanceKm: 9,
    rating: 4.8,
    reviews: 64,
    events: '120+',
    priceUnit: 'day',
    image: local('subhajit-photography'),
    fallbackImage: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800',
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
    category: 'DECORATOR',
    location: 'Esplanade, Kolkata',
    distanceKm: 6,
    rating: 4.7,
    reviews: 41,
    events: '90+',
    priceUnit: 'event',
    image: local('vandana-decor'),
    fallbackImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
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
    category: 'PANDIT',
    location: 'Kalighat, Kolkata',
    distanceKm: 4,
    rating: 4.9,
    reviews: 130,
    events: '500+',
    priceUnit: 'day',
    image: local('pandit-ramesh-sharma'),
    fallbackImage: 'https://images.unsplash.com/photo-1604608672516-f1b9bca0a9b3?w=800',
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
    category: 'FLORIST',
    location: 'Sector V, Salt Lake',
    distanceKm: 12,
    rating: 4.6,
    reviews: 53,
    events: '80+',
    priceUnit: 'day',
    image: local('phoolwala'),
    fallbackImage: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800',
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
    category: 'MUSIC',
    location: 'New Town, Kolkata',
    distanceKm: 18,
    rating: 4.5,
    reviews: 29,
    events: '60+',
    priceUnit: 'day',
    image: local('beats-by-arun'),
    fallbackImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
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
    category: 'LIGHTS',
    location: 'Howrah, Kolkata',
    distanceKm: 14,
    rating: 4.4,
    reviews: 22,
    events: '40+',
    priceUnit: 'day',
    image: local('glow-lights'),
    fallbackImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
    menu: [
      { name: 'Fairy Lights Package', price: 18000 },
      { name: 'Stage Spotlights', price: 25000 },
      { name: 'Full Venue Lighting', price: 60000 },
      { name: 'Outdoor + Pathway', price: 35000 },
    ],
  },
];

export const VENDORS_BY_ID = Object.fromEntries(VENDORS.map(v => [v.id, v]));

// Budget Planner categories with their mapped vendor category & emoji from Figma
export const BUDGET_CATEGORIES = [
  { key: 'decoration',  label: 'Decoration',       emoji: '🎨',  vendorCategory: 'DECORATOR',    share: 0.32 },
  { key: 'photography', label: 'Photography',      emoji: '📸',  vendorCategory: 'PHOTOGRAPHER', share: 0.25 },
  { key: 'priest',      label: 'Priest / Rituals', emoji: '🛕',  vendorCategory: 'PANDIT',       share: 0.06 },
  { key: 'music',       label: 'Music / Sound',    emoji: '🎵',  vendorCategory: 'MUSIC',        share: 0.012 },
  { key: 'lights',      label: 'Lights',           emoji: '💡',  vendorCategory: 'LIGHTS',       share: 0.038 },
  { key: 'catering',    label: 'Catering',         emoji: '🍽️', vendorCategory: 'CATERER',      share: 0.30 },
];

// ===== Helpers =====

// Map ceremony key -> menu item name on the pandit's price list
const PANDIT_CEREMONY_TO_MENU = {
  wedding: 'Wedding ceremony',
  annaprashan: 'Annaprashan / Upanayan',
  upanayan: 'Annaprashan / Upanayan',
  shradhh: 'Shradhh',
};

// Which vendor categories to hide for a given ceremony
const HIDDEN_CATEGORIES_BY_CEREMONY = {
  anniversary: new Set(['PANDIT']),
  engagement:  new Set(['PANDIT']),
  shradhh:     new Set(['PHOTOGRAPHER', 'MUSIC', 'LIGHTS']),
};

/** Filter the vendor list to only those bookable for the given ceremony. */
export function filterVendorsByCeremony(vendors, ceremonyKey) {
  const hidden = HIDDEN_CATEGORIES_BY_CEREMONY[ceremonyKey];
  if (!hidden) return vendors;
  return vendors.filter(v => !hidden.has(v.category));
}

function formatINR(n) {
  return '₹' + Number(n).toLocaleString('en-IN');
}

/**
 * Display label rule (per spec):
 *  - CATERER: max plate price as "₹X / Plate"
 *  - PANDIT:  exact price of the selected ceremony
 *  - Everyone else: "From ₹<min menu price>"
 */
export function getVendorPriceLabel(vendor, ceremonyKey) {
  if (!vendor?.menu?.length) return '';

  if (vendor.category === 'CATERER') {
    const max = Math.max(...vendor.menu.map(m => m.price));
    return `${formatINR(max)} / Plate`;
  }

  if (vendor.category === 'PANDIT') {
    const targetName = PANDIT_CEREMONY_TO_MENU[ceremonyKey];
    const item = vendor.menu.find(m => m.name === targetName);
    const price = item ? item.price : vendor.menu[0].price; // fallback for unmapped ceremonies
    return formatINR(price);
  }

  const min = Math.min(...vendor.menu.map(m => m.price));
  return `From ${formatINR(min)}`;
}

/** Lowest possible booking cost for budget-fit filtering. */
export function getVendorMinPrice(vendor) {
  if (!vendor?.menu?.length) return 0;
  return Math.min(...vendor.menu.map(m => m.price));
}
