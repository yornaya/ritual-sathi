import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/ui/AppBar.jsx';
import Button from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Input.jsx';
import { useApp, formatDate } from '../context/AppContext.jsx';
import './OnboardingDate.css';

function defaultDate() {
  const d = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  return d.toISOString().slice(0, 10);
}

export default function OnboardingDate() {
  const nav = useNavigate();
  const { state, setCeremonyDate } = useApp();
  const [date, setDate] = useState(state.user.ceremonyDate || defaultDate());

  const next = () => {
    setCeremonyDate(date);
    nav('/onboarding/5');
  };

  return (
    <div className="screen screen--no-nav obd">
      <AppBar title="Pick the Ceremony Date" />
      <div className="obd__body">
        <h2 className="obd__title">When is the ceremony?</h2>
        <p className="obd__sub">We'll use this across your bookings, budget planner, and reminders.</p>

        <Input label="Ceremony Date" type="date" value={date} onChange={setDate} />

        {date && (
          <div className="obd__preview">
            <span>You picked</span>
            <strong>{formatDate(date)}</strong>
          </div>
        )}
      </div>
      <div className="obd__footer">
        <Button size="block" disabled={!date} onClick={next}>CONTINUE</Button>
      </div>
    </div>
  );
}
