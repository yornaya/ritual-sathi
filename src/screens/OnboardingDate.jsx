import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/ui/AppBar.jsx';
import Button from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Input.jsx';
import { CalendarIcon } from '../components/ui/Icons.jsx';
import { useApp, formatDate } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';
import './OnboardingDate.css';

function defaultDate() {
  const d = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  return d.toISOString().slice(0, 10);
}

export default function OnboardingDate() {
  const nav = useNavigate();
  const { state, setCeremonyDate } = useApp();
  const t = useT();
  const [date, setDate] = useState(state.user.ceremonyDate || defaultDate());

  const next = () => {
    setCeremonyDate(date);
    nav('/onboarding/5');
  };

  // Use Indian-style locale for both languages (date format is similar)
  const formatted = formatDate(date, t.lang === 'hi' ? 'hi-IN' : 'en-IN');
  // Day-of-week label
  const weekday = (() => {
    try {
      return new Date(date).toLocaleDateString(t.lang === 'hi' ? 'hi-IN' : 'en-IN', { weekday: 'long' });
    } catch { return ''; }
  })();

  return (
    <div className="screen screen--no-nav obd">
      <AppBar title={t('obd.title')} />
      <div className="obd__body">
        <h2 className="obd__heading">{t('obd.heading')}</h2>
        <p className="obd__sub">{t('obd.sub')}</p>

        <Input label={t('obd.label')} type="date" value={date} onChange={setDate} />

        {date && (
          <div className="obd__pretty">
            <div className="obd__pretty-icon">
              <CalendarIcon size={28} color="#FFFFFF" />
            </div>
            <div className="obd__pretty-text">
              <span className="obd__pretty-label">{t('obd.picked')}</span>
              <strong className="obd__pretty-date">{formatted}</strong>
              {weekday && <span className="obd__pretty-day">{weekday}</span>}
            </div>
          </div>
        )}
      </div>
      <div className="obd__footer">
        <Button size="block" disabled={!date} onClick={next}>{t('btn.continue')}</Button>
      </div>
    </div>
  );
}
