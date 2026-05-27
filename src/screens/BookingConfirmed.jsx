import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';
import './BookingConfirmed.css';

export default function BookingConfirmed() {
  const nav = useNavigate();
  const { state } = useApp();
  const t = useT();
  const latest = state.bookings[0];

  return (
    <div className="screen screen--no-nav bc">
      <div className="bc__center">
        <div className="bc__check">
          <svg viewBox="0 0 24 24" width="56" height="56" fill="none">
            <circle cx="12" cy="12" r="11" fill="#3CB338" />
            <path d="M7 12.5l3.5 3.5L17 9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="bc__title">{t('bc.title')}</h1>
        <p className="bc__sub">
          {t('bc.line1')}<br />
          {t('bc.line2')}
        </p>

        {latest && (
          <div className="bc__ref">
            <span>{t('bc.ref')}</span>
            <strong>{latest.id}</strong>
          </div>
        )}
      </div>
      <div className="bc__footer">
        <Button size="block" onClick={() => nav('/home', { replace: true })}>{t('btn.backToHome')}</Button>
      </div>
    </div>
  );
}
