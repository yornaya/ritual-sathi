import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/ui/AppBar.jsx';
import Button from '../components/ui/Button.jsx';
import { Select } from '../components/ui/Input.jsx';
import { CITIES } from '../data/ceremonies.js';
import { useApp } from '../context/AppContext.jsx';
import './Onboarding5.css';

export default function Onboarding5() {
  const nav = useNavigate();
  const { state, setCity, completeOnboarding } = useApp();
  const [city, setCityLocal] = useState(state.user.city || 'Kolkata');

  const done = () => {
    setCity(city);
    completeOnboarding();
    nav('/home', { replace: true });
  };

  return (
    <div className="screen screen--no-nav ob5">
      <AppBar title="Your City" />
      <div className="ob5__body">
        <h2 className="ob5__title">What city are you in?</h2>
        <p className="ob5__sub">Help us find a vendor from your city. Choose the city.</p>
        <Select label="City" value={city} onChange={setCityLocal} options={CITIES} placeholder="Choose city..." />
      </div>
      <div className="ob5__footer">
        <Button size="block" disabled={!city} onClick={done}>DONE!</Button>
      </div>
    </div>
  );
}
