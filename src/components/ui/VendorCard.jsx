import { useNavigate } from 'react-router-dom';
import VendorImage from './VendorImage.jsx';
import {
  getVendorPriceLabel, getVendorName, getVendorLocationString,
} from '../../data/vendors.js';
import { useT } from '../../i18n/index.js';
import { useApp } from '../../context/AppContext.jsx';
import './VendorCard.css';

export default function VendorCard({ vendor, ceremonyKey }) {
  const nav = useNavigate();
  const t = useT();
  const { state } = useApp();
  const priceLabel = getVendorPriceLabel(vendor, ceremonyKey, t);
  const name = getVendorName(vendor, t.lang);
  const location = getVendorLocationString(vendor, state.user.city, t.lang, t);
  return (
    <article className="vendor-card" onClick={() => nav(`/vendor/${vendor.id}`)}>
      <div className="vendor-card__img-wrap">
        <VendorImage vendor={vendor} className="vendor-card__img" />
      </div>
      <div className="vendor-card__body">
        <div className="vendor-card__tag">{t(`cat.${vendor.category}`)}</div>
        <h3 className="vendor-card__name">{name}</h3>
        <div className="vendor-card__meta">
          <span className="vendor-card__location">📍 {location}</span>
          <span className="vendor-card__rating">★ {vendor.rating}</span>
        </div>
        <div className="vendor-card__row">
          <span className="vendor-card__price">{priceLabel}</span>
          <button
            className="vendor-card__book"
            onClick={(e) => { e.stopPropagation(); nav(`/book/${vendor.id}`); }}
          >
            {t('btn.book')}
          </button>
        </div>
      </div>
    </article>
  );
}
