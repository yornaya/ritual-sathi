import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/ui/AppBar.jsx';
import Button from '../components/ui/Button.jsx';
import CeremonyChip from '../components/ui/CeremonyChip.jsx';
import { CEREMONIES } from '../data/ceremonies.js';
import { useApp } from '../context/AppContext.jsx';
import './Onboarding3.css';

export default function Onboarding3() {
  const nav = useNavigate();
  const { state, setCeremonies } = useApp();
  const [selected, setSelected] = useState(state.user.ceremonies?.[0] || 'wedding');

  const next = () => {
    if (!selected) return;
    setCeremonies([selected]); // single selection stored as one-element array
    nav('/onboarding/4');
  };

  return (
    <div className="screen screen--no-nav ob3">
      <AppBar title="Plan Ceremony" />
      <div className="ob3__body">
        <h2 className="ob3__title">Which Ceremony do you want to plan?</h2>
        <p className="ob3__sub">Help us find the right vendors for your upcoming event. Pick one.</p>
        <div className="ob3__grid">
          {CEREMONIES.map(c => (
            <CeremonyChip
              key={c.key}
              ceremony={c}
              selected={selected === c.key}
              onClick={() => setSelected(c.key)}
              size="lg"
            />
          ))}
        </div>
      </div>
      <div className="ob3__footer">
        <Button size="block" disabled={!selected} onClick={next}>CONTINUE</Button>
      </div>
    </div>
  );
}
