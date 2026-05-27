import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/ui/AppBar.jsx';
import Button from '../components/ui/Button.jsx';
import CeremonyChip from '../components/ui/CeremonyChip.jsx';
import { CEREMONIES } from '../data/ceremonies.js';
import { useApp } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';
import './Onboarding3.css';

export default function Onboarding3() {
  const nav = useNavigate();
  const { state, setCeremonies } = useApp();
  const t = useT();
  const [selected, setSelected] = useState(state.user.ceremonies?.[0] || 'wedding');

  const next = () => {
    if (!selected) return;
    setCeremonies([selected]);
    nav('/onboarding/4');
  };

  return (
    <div className="screen screen--no-nav ob3">
      <AppBar title={t('ob3.title')} />
      <div className="ob3__body">
        <h2 className="ob3__title">{t('ob3.heading')}</h2>
        <p className="ob3__sub">{t('ob3.sub')}</p>
        <div className="ob3__grid">
          {CEREMONIES.map(c => (
            <CeremonyChip
              key={c.key}
              ceremony={{ ...c, label: t(`ceremony.${c.key}`) }}
              selected={selected === c.key}
              onClick={() => setSelected(c.key)}
              size="lg"
            />
          ))}
        </div>
      </div>
      <div className="ob3__footer">
        <Button size="block" disabled={!selected} onClick={next}>{t('btn.continue')}</Button>
      </div>
    </div>
  );
}
