import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext(null);

const STORAGE_KEY = 'ritual-sathi-state-v4';

function defaultCeremonyDate() {
  return new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().slice(0, 10);
}

const DEFAULT_STATE = {
  user: {
    name: 'Ranjan Ghosh',
    phone: '9876543210',
    email: 'ranjanghosh@gmail.com',
    password: '••••••••',
    city: 'Kolkata',
    ceremonies: ['wedding'],
    ceremonyDate: defaultCeremonyDate(),
    budget: 2500000,
    avatar: '',
  },
  bookings: [],
  savedVendors: [],
  spentByCategory: {},
  isAuthed: false,
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      user: { ...DEFAULT_STATE.user, ...(parsed.user || {}) },
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function recomputeSpend(bookings) {
  const out = {};
  for (const b of bookings) {
    if (!b.categoryKey) continue;
    out[b.categoryKey] = (out[b.categoryKey] || 0) + (b.amount || 0);
  }
  return out;
}

export function AppProvider({ children }) {
  const [state, setState] = useState(loadState);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const api = useMemo(() => ({
    state,
    setUser: (patch) => setState(s => ({ ...s, user: { ...s.user, ...patch } })),
    setBudget: (budget) => setState(s => ({ ...s, user: { ...s.user, budget } })),
    setCeremonies: (keys) => setState(s => ({ ...s, user: { ...s.user, ceremonies: keys } })),
    setCity: (city) => setState(s => ({ ...s, user: { ...s.user, city } })),
    setCeremonyDate: (date) => setState(s => ({ ...s, user: { ...s.user, ceremonyDate: date } })),
    completeOnboarding: () => setState(s => ({ ...s, isAuthed: true })),
    logout: () => {
      setState({ ...DEFAULT_STATE, user: { ...DEFAULT_STATE.user, ceremonyDate: defaultCeremonyDate() } });
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
    },
    addBooking: (booking) => setState(s => {
      const newBooking = { ...booking, id: `RS-${Date.now()}`, createdAt: new Date().toISOString() };
      const bookings = [newBooking, ...s.bookings];
      return { ...s, bookings, spentByCategory: recomputeSpend(bookings) };
    }),
    cancelBooking: (bookingId) => setState(s => {
      const bookings = s.bookings.filter(b => b.id !== bookingId);
      return { ...s, bookings, spentByCategory: recomputeSpend(bookings) };
    }),
    toggleSavedVendor: (vendorId) => setState(s => ({
      ...s,
      savedVendors: s.savedVendors.includes(vendorId)
        ? s.savedVendors.filter(id => id !== vendorId)
        : [...s.savedVendors, vendorId],
    })),
    isVendorSaved: (vendorId) => state.savedVendors.includes(vendorId),
  }), [state]);

  return <AppContext.Provider value={api}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}

// Currency helpers
export function formatINR(n) {
  if (n === null || n === undefined || isNaN(n)) return '₹0';
  return '₹' + Number(n).toLocaleString('en-IN');
}

export function formatLakhs(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2).replace(/\.00$/, '')} L`;
  return formatINR(n);
}

export function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}

export function formatShortDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  } catch {
    return iso;
  }
}
