import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/ui/BottomNav.jsx';
import {
  LogoutIcon, CalendarIcon, HeartIcon, GlobeIcon, PinIcon,
  LifebuoyIcon, StorefrontIcon, ChevronRightIcon,
} from '../components/ui/Icons.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useModal } from '../context/ModalContext.jsx';
import './Profile.css';

function Row({ icon, label, onClick, danger }) {
  return (
    <button type="button" className={`profile__row ${danger ? 'profile__row--danger' : ''}`} onClick={onClick}>
      <span className="profile__row-icon">{icon}</span>
      <span className="profile__row-label">{label}</span>
      <span className="profile__row-chev"><ChevronRightIcon size={16} /></span>
    </button>
  );
}

export default function Profile() {
  const nav = useNavigate();
  const { state, logout } = useApp();
  const modal = useModal();

  const handleLogout = async () => {
    const ok = await modal.confirm({
      title: 'Log out?',
      message: 'You will be signed out and returned to the welcome screen.',
      confirmText: 'Log Out',
      danger: true,
    });
    if (ok) {
      logout();
      // Per spec: return to the first onboarding screen, skipping the splash.
      nav('/onboarding/1', { replace: true });
    }
  };

  const initials = (state.user.name || 'U')
    .split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div className="screen profile">
      <header className="profile__hero">
        <button
          type="button"
          className="profile__logout-icon"
          onClick={handleLogout}
          aria-label="Log out"
          title="Log out"
        >
          <LogoutIcon size={18} color="#FFFFFF" />
        </button>

        <div className="profile__avatar">{initials}</div>
        <h1 className="profile__name">{state.user.name || 'Guest'}</h1>
        <p className="profile__email">{state.user.email || ''}</p>
      </header>

      <section className="profile__stats">
        <div className="profile__stat">
          <strong>{state.bookings.length}</strong>
          <span>Bookings</span>
        </div>
        <div className="profile__stat profile__stat--mid">
          <strong>{state.bookings.length}</strong>
          <span>Reviews</span>
        </div>
        <div className="profile__stat">
          <strong>{state.savedVendors.length}</strong>
          <span>Saved</span>
        </div>
      </section>

      <section className="profile__section">
        <h2 className="profile__section-title">My Ceremonies</h2>
        <Row icon={<CalendarIcon color="#F07F37" />} label="My Bookings"
          onClick={() => nav('/profile/bookings')} />
        <Row icon={<HeartIcon color="#F07F37" />} label="Saved Vendors"
          onClick={() => nav('/profile/saved')} />
      </section>

      <section className="profile__section">
        <h2 className="profile__section-title">Account</h2>
        <Row icon={<GlobeIcon color="#49454F" />} label="Language: English"
          onClick={() => modal.alert({ title: 'Language', message: 'Currently set to English.' })} />
        <Row icon={<PinIcon color="#49454F" />}
          label={`Location: ${state.user.city || 'Set city'}`}
          onClick={() => modal.alert({ title: 'Location', message: 'City picker coming soon.' })} />
        <Row icon={<LifebuoyIcon color="#49454F" />} label="Help & Support"
          onClick={() => modal.alert({ title: 'Help & Support', message: 'Reach us at help@ritualsathi.com' })} />
      </section>

      <button
        type="button"
        className="profile__logout-btn"
        onClick={handleLogout}
      >
        <LogoutIcon size={16} color="#FF6262" />
        <span>Log Out</span>
      </button>

      <button
        type="button"
        className="profile__vendor-cta"
        onClick={() => modal.alert({ title: 'Register as a Vendor', message: 'Vendor registration is coming soon.' })}
      >
        <span className="profile__vendor-icon"><StorefrontIcon size={18} color="#532200" /></span>
        <span className="profile__vendor-text">
          <strong>Sell your services on RitualSathi</strong>
          <small>Reach thousands of customers across India</small>
        </span>
        <ChevronRightIcon size={16} color="#532200" />
      </button>

      <BottomNav />
    </div>
  );
}
