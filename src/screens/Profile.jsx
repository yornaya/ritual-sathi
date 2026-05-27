import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/ui/BottomNav.jsx';
import PickerOverlay from '../components/ui/PickerOverlay.jsx';
import {
  LogoutIcon, CalendarIcon, HeartIcon, GlobeIcon, PinIcon,
  LifebuoyIcon, StorefrontIcon, ChevronRightIcon,
} from '../components/ui/Icons.jsx';
import { CITIES } from '../data/ceremonies.js';
import { useApp } from '../context/AppContext.jsx';
import { useModal } from '../context/ModalContext.jsx';
import { useT, LANGUAGES } from '../i18n/index.js';
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
  const { state, logout, setCity, setLanguage } = useApp();
  const modal = useModal();
  const t = useT();
  const [cityOpen, setCityOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const handleLogout = async () => {
    const ok = await modal.confirm({
      title: t('profile.logout.confirm.title'),
      message: t('profile.logout.confirm.body'),
      confirmText: t('btn.logout'),
      cancelText: t('btn.cancel'),
      danger: true,
    });
    if (ok) {
      logout();
      nav('/onboarding/1', { replace: true });
    }
  };

  const initials = (state.user.name || 'U')
    .split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase();

  const currentLangLabel = LANGUAGES.find(l => l.code === state.user.language)?.label || 'English';

  const cityOptions = CITIES.map(c => ({ value: c, label: t(`city.${c}`) }));
  const langOptions = LANGUAGES.map(l => ({
    value: l.code,
    label: l.label,
    disabled: !l.active,
    hint: !l.active ? t('language.comingSoon') : undefined,
  }));

  return (
    <div className="screen profile">
      <header className="profile__hero">
        <button
          type="button"
          className="profile__logout-icon"
          onClick={handleLogout}
          aria-label={t('btn.logout')}
          title={t('btn.logout')}
        >
          <LogoutIcon size={16} color="#FFFFFF" />
        </button>

        <div className="profile__avatar">{initials}</div>
        <h1 className="profile__name">{state.user.name || 'Guest'}</h1>
        <p className="profile__email">{state.user.email || ''}</p>
      </header>

      <section className="profile__stats">
        <div className="profile__stat">
          <strong>{state.bookings.length}</strong>
          <span>{t('profile.bookings')}</span>
        </div>
        <div className="profile__stat profile__stat--mid">
          <strong>0</strong>
          <span>{t('profile.reviews')}</span>
        </div>
        <div className="profile__stat">
          <strong>{state.savedVendors.length}</strong>
          <span>{t('profile.saved')}</span>
        </div>
      </section>

      <section className="profile__section">
        <h2 className="profile__section-title">{t('profile.section.ceremonies')}</h2>
        <Row icon={<CalendarIcon color="#F07F37" />} label={t('profile.row.myBookings')}
          onClick={() => nav('/profile/bookings')} />
        <Row icon={<HeartIcon color="#F07F37" />} label={t('profile.row.savedVendors')}
          onClick={() => nav('/profile/saved')} />
      </section>

      <section className="profile__section">
        <h2 className="profile__section-title">{t('profile.section.account')}</h2>
        <Row icon={<GlobeIcon color="#49454F" />}
          label={t('profile.row.language', { value: currentLangLabel })}
          onClick={() => setLangOpen(true)} />
        <Row icon={<PinIcon color="#49454F" />}
          label={t('profile.row.location', { value: t(`city.${state.user.city}`) })}
          onClick={() => setCityOpen(true)} />
        <Row icon={<LifebuoyIcon color="#49454F" />} label={t('profile.row.help')}
          onClick={() => modal.alert({
            title: t('profile.alert.help.title'),
            message: t('profile.alert.help.body'),
          })} />
      </section>

      <button type="button" className="profile__logout-btn" onClick={handleLogout}>
        <LogoutIcon size={16} color="#FF6262" />
        <span>{t('btn.logout')}</span>
      </button>

      <button
        type="button"
        className="profile__vendor-cta"
        onClick={() => modal.alert({
          title: t('profile.alert.vendor.title'),
          message: t('profile.alert.vendor.body'),
        })}
      >
        <span className="profile__vendor-icon"><StorefrontIcon size={18} color="#532200" /></span>
        <span className="profile__vendor-text">
          <strong>{t('profile.vendor.cta.title')}</strong>
          <small>{t('profile.vendor.cta.sub')}</small>
        </span>
        <ChevronRightIcon size={16} color="#532200" />
      </button>

      <BottomNav />

      <PickerOverlay
        open={cityOpen}
        title={t('city.picker.title')}
        options={cityOptions}
        value={state.user.city}
        onSelect={(c) => setCity(c)}
        onClose={() => setCityOpen(false)}
      />

      <PickerOverlay
        open={langOpen}
        title={t('language.picker.title')}
        options={langOptions}
        value={state.user.language}
        onSelect={(c) => setLanguage(c)}
        onClose={() => setLangOpen(false)}
      />
    </div>
  );
}
