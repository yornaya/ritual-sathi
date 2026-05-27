import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';
import VendorImage from '../components/ui/VendorImage.jsx';
import {
  VENDORS_BY_ID, getVendorPriceLabel, getVendorName, getVendorLocation,
} from '../data/vendors.js';
import { useApp, formatINR } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';
import './VendorDetail.css';

export default function VendorDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const vendor = VENDORS_BY_ID[id];
  const { state, toggleSavedVendor, isVendorSaved } = useApp();
  const t = useT();

  if (!vendor) {
    return (
      <div className="screen screen--no-nav">
        <p style={{ padding: 24 }}>Vendor not found.</p>
        <Button onClick={() => nav('/home')}>Back to Home</Button>
      </div>
    );
  }

  const saved = isVendorSaved(vendor.id);
  const ceremonyKey = state.user.ceremonies?.[0] || 'wedding';
  const priceLabel = getVendorPriceLabel(vendor, ceremonyKey, t);
  const name = getVendorName(vendor, t.lang);
  const { locality, distanceKm } = getVendorLocation(vendor, state.user.city, t.lang);
  const cityLabel = t(`city.${state.user.city}`);

  return (
    <div className="screen screen--no-nav vd">
      <div className="vd__hero">
        <VendorImage vendor={vendor} className="vd__hero-img" />
        <div className="vd__hero-overlay" />
        <button className="vd__back" onClick={() => nav(-1)} aria-label="Back">‹</button>
        <button
          className={`vd__save ${saved ? 'is-saved' : ''}`}
          onClick={() => toggleSavedVendor(vendor.id)}
          aria-label="Save"
        >
          {saved ? '♥' : '♡'}
        </button>
      </div>

      <div className="vd__body">
        <div className="vd__tag">{t(`cat.${vendor.category}`)}</div>
        <h1 className="vd__name">{name}</h1>
        <div className="vd__row">
          <span>📍 {locality}, {cityLabel} · {distanceKm} {t('vd.kmAway')}</span>
        </div>
        <div className="vd__stats">
          <span className="vd__rating">★ {vendor.rating}</span>
          <span>({vendor.reviews} {t('vd.reviews')})</span>
          <span>·</span>
          <span>{vendor.events} {t('vd.events')}</span>
        </div>

        <div className="vd__price-banner">
          <span>{t('vd.priceLabel')}</span>
          <strong>{priceLabel}</strong>
        </div>

        <h2 className="vd__sub">{t('vd.menu')}</h2>
        <ul className="vd__menu">
          {vendor.menu.map((m, i) => (
            <li key={i} className="vd__menu-item">
              <span>{m.name}</span>
              <span className="vd__menu-price">
                {formatINR(m.price)}{vendor.priceUnit === 'plate' ? ' ' + t('vd.perPlate') : ''}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="vd__cta">
        <Button size="block" onClick={() => nav(`/book/${vendor.id}`)}>{t('btn.bookNow')}</Button>
      </div>
    </div>
  );
}
