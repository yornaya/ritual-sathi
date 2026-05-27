import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/ui/AppBar.jsx';
import Button from '../components/ui/Button.jsx';
import { PinIcon } from '../components/ui/Icons.jsx';
import { CITIES } from '../data/ceremonies.js';
import { useApp } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';
import './Onboarding5.css';

export default function Onboarding5() {
  const nav = useNavigate();
  const { state, setCity, completeOnboarding } = useApp();
  const t = useT();
  const [city, setCityLocal] = useState(state.user.city || 'Kolkata');

  const done = () => {
    setCity(city);
    completeOnboarding();
    nav('/home', { replace: true });
  };

  return (
    <div className="screen screen--no-nav ob5">
      <AppBar title={t('ob5.title')} />
      <div className="ob5__body">
        <h2 className="ob5__heading">{t('ob5.heading')}</h2>
        <p className="ob5__sub">{t('ob5.sub')}</p>

        <ul className="ob5__list">
          {CITIES.map(c => {
            const selected = city === c;
            return (
              <li key={c}>
                <button
                  type="button"
                  className={`ob5__item ${selected ? 'is-selected' : ''}`}
                  onClick={() => setCityLocal(c)}
                >
                  <span className="ob5__item-icon">
                    <PinIcon size={18} color={selected ? '#532200' : '#5F5A5A'} />
                  </span>
                  <span className="ob5__item-label">{t(`city.${c}`)}</span>
                  <span className="ob5__item-check">{selected ? '✓' : ''}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="ob5__footer">
        <Button size="block" disabled={!city} onClick={done}>{t('btn.done')}</Button>
      </div>
    </div>
  );
}
