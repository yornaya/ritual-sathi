import { useMemo, useState } from 'react';
import BottomNav from '../components/ui/BottomNav.jsx';
import VendorCard from '../components/ui/VendorCard.jsx';
import Logo from '../components/ui/Logo.jsx';
import { SearchIcon, WalletIcon, PinIcon, CalendarIcon } from '../components/ui/Icons.jsx';
import {
  VENDORS, filterVendorsByCeremony, getVendorMinPrice, getVendorName, getVendorLocationString,
} from '../data/vendors.js';
import { useApp, formatLakhs, formatShortDate } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';
import './Home.css';

export default function Home() {
  const { state } = useApp();
  const t = useT();
  const [query, setQuery] = useState('');

  const ceremonyKey = state.user.ceremonies?.[0] || 'wedding';

  const filteredVendors = useMemo(() => {
    const q = query.trim().toLowerCase();
    const eligible = filterVendorsByCeremony(VENDORS, ceremonyKey);
    return eligible.filter(v => {
      if (q) {
        // Search across English + Hindi names + the localised location
        const haystack = [
          v.name, v.nameHi || '', v.category,
          getVendorLocationString(v, state.user.city, t.lang),
        ].join(' ').toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (getVendorMinPrice(v, state.user.city) > state.user.budget) return false;
      return true;
    });
  }, [query, ceremonyKey, state.user.budget, state.user.city, t.lang]);

  const dateLocale = t.lang === 'hi' ? 'hi-IN' : 'en-IN';

  return (
    <div className="screen home">
      <header className="home__top">
        <Logo size="md" />
      </header>

      <div className="home__search">
        <SearchIcon size={18} />
        <input
          placeholder={t('home.search')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <section className="home__info">
        <div className="home__info-cell">
          <div className="home__info-icon"><WalletIcon size={18} color="#F07F37" /></div>
          <div className="home__info-value">{formatLakhs(state.user.budget)}</div>
          <div className="home__info-label">{t('home.budget')}</div>
        </div>
        <div className="home__info-divider" />
        <div className="home__info-cell">
          <div className="home__info-icon"><PinIcon size={18} color="#F07F37" /></div>
          <div className="home__info-value">{t(`city.${state.user.city}`)}</div>
          <div className="home__info-label">{t('home.location')}</div>
        </div>
        <div className="home__info-divider" />
        <div className="home__info-cell">
          <div className="home__info-icon"><CalendarIcon size={18} color="#F07F37" /></div>
          <div className="home__info-value">
            {state.user.ceremonyDate ? formatShortDate(state.user.ceremonyDate, dateLocale) : '—'}
          </div>
          <div className="home__info-label">{t('home.date')}</div>
        </div>
      </section>

      <section className="home__section">
        <h2 className="home__section-title">{t('home.section.highRated')}</h2>
        <div className="home__list">
          {filteredVendors.length === 0
            ? <p className="home__empty">{t('home.empty')}</p>
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
