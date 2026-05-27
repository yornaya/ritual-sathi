import { useNavigate } from 'react-router-dom';
import AppBar from '../components/ui/AppBar.jsx';
import VendorCard from '../components/ui/VendorCard.jsx';
import { VENDORS_BY_ID } from '../data/vendors.js';
import { useApp } from '../context/AppContext.jsx';
import './SavedVendors.css';

export default function SavedVendors() {
  const { state } = useApp();
  const nav = useNavigate();
  const saved = state.savedVendors.map(id => VENDORS_BY_ID[id]).filter(Boolean);
  const ceremonyKey = state.user.ceremonies?.[0] || 'wedding';

  return (
    <div className="screen screen--no-nav saved">
      <AppBar title="Saved Vendors" />
      <div className="saved__body">
        {saved.length === 0 ? (
          <div className="saved__empty">
            <span className="saved__empty-emoji">🩷</span>
            <p>No vendors saved yet.</p>
            <button className="saved__cta" onClick={() => nav('/home')}>Browse Vendors</button>
          </div>
        ) : (
          <div className="saved__list">
            {saved.map(v => <VendorCard key={v.id} vendor={v} ceremonyKey={ceremonyKey} />)}
          </div>
        )}
      </div>
    </div>
  );
}
