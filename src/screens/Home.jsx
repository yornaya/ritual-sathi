import { useMemo, useState } from 'react';
import BottomNav from '../components/ui/BottomNav.jsx';
import VendorCard from '../components/ui/VendorCard.jsx';
import Logo from '../components/ui/Logo.jsx';
import { SearchIcon, WalletIcon, PinIcon, CalendarIcon } from '../components/ui/Icons.jsx';
import {
  VENDORS, filterVendorsByCeremony, getVendorMinPrice,
} from '../data/vendors.js';
import { useApp, formatLakhs, formatShortDate } from '../context/AppContext.jsx';
import './Home.css';

export default function Home() {
  const { state } = useApp();
  const [query, setQuery] = useState('');

  const ceremonyKey = state.user.ceremonies?.[0] || 'wedding';

  const filteredVendors = useMemo(() => {
    const q = query.trim().toLowerCase();
    const eligible = filterVendorsByCeremony(VENDORS, ceremonyKey);
    return eligible.filter(v => {
      if (q && !(`${v.name} ${v.category} ${v.location}`.toLowerCase().includes(q))) return false;
      // Use the cheapest menu item for the budget-fit gate so cards still appear when
      // *any* package fits the user's budget.
      if (getVendorMinPrice(v) > state.user.budget) return false;
      return true;
    });
  }, [query, ceremonyKey, state.user.budget]);

  return (
    <div className="screen home">
      <header className="home__top">
        <Logo size="md" />
      </header>

      <div className="home__search">
        <SearchIcon size={18} />
        <input
          placeholder="Search for vendors"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <section className="home__info">
        <div className="home__info-cell">
          <div className="home__info-icon"><WalletIcon size={18} color="#F07F37" /></div>
          <div className="home__info-value">{formatLakhs(state.user.budget)}</div>
          <div className="home__info-label">Budget</div>
        </div>
        <div className="home__info-divider" />
        <div className="home__info-cell">
          <div className="home__info-icon"><PinIcon size={18} color="#F07F37" /></div>
          <div className="home__info-value">{state.user.city || '—'}</div>
          <div className="home__info-label">Location</div>
        </div>
        <div className="home__info-divider" />
        <div className="home__info-cell">
          <div className="home__info-icon"><CalendarIcon size={18} color="#F07F37" /></div>
          <div className="home__info-value">{state.user.ceremonyDate ? formatShortDate(state.user.ceremonyDate) : '—'}</div>
          <div className="home__info-label">Date</div>
        </div>
      </section>

      <section className="home__section">
        <h2 className="home__section-title">High-Rated Vendors Near You</h2>
        <div className="home__list">
          {filteredVendors.length === 0
            ? <p className="home__empty">No vendors available for this ceremony / budget. Try a different ceremony or raise your budget.</p>
            : filteredVendors.map(v => (
              <VendorCard key={v.id} vendor={v} ceremonyKey={ceremonyKey} />
            ))
          }
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
