import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/ui/AppBar.jsx';
import Button from '../components/ui/Button.jsx';
import Slider from '../components/ui/Slider.jsx';
import { useApp, formatLakhs } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';
import './Onboarding4.css';

export default function Onboarding4() {
  const nav = useNavigate();
  const { state, setBudget } = useApp();
  const t = useT();
  const [val, setVal] = useState(state.user.budget || 2500000);

  const next = () => {
    setBudget(val);
    nav('/onboarding/date');
  };

  return (
    <div className="screen screen--no-nav ob4">
      <AppBar title={t('ob4.title')} />
      <div className="ob4__body">
        <h2 className="ob4__title">{t('ob4.title')}</h2>
        <p className="ob4__sub">{t('ob4.sub')}</p>
        <Slider
          value={val}
          min={0}
          max={5000000}
          step={50000}
          onChange={setVal}
          formatValue={formatLakhs}
        />
      </div>
      <div className="ob4__footer">
        <Button size="block" onClick={next}>{t('btn.continue')}</Button>
      </div>
    </div>
  );
}
