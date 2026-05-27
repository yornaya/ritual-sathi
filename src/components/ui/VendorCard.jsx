import { useNavigate } from 'react-router-dom';
import VendorImage from './VendorImage.jsx';
import { getVendorPriceLabel } from '../../data/vendors.js';
import './VendorCard.css';

export default function VendorCard({ vendor, ceremonyKey }) {
  const nav = useNavigate();
  const priceLabel = getVendorPriceLabel(vendor, ceremonyKey);
  return (
    <article className="vendor-card" onClick={() => nav(`/vendor/${vendor.id}`)}>
      <div className="vendor-card__img-wrap">
        <VendorImage vendor={vendor} className="vendor-card__img" />
      </div>
      <div className="vendor-card__body">
        <div className="vendor-card__tag">{vendor.category}</div>
        <h3 className="vendor-card__name">{vendor.name}</h3>
        <div className="vendor-card__meta">
          <span className="vendor-card__location">📍 {vendor.location}</span>
          <span className="vendor-card__rating">★ {vendor.rating}</span>
        </div>
        <div className="vendor-card__row">
          <span className="vendor-card__price">{priceLabel}</span>
          <button
            className="vendor-card__book"
            onClick={(e) => { e.stopPropagation(); nav(`/book/${vendor.id}`); }}
          >
            BOOK
          </button>
        </div>
      </div>
    </article>
  );
}
