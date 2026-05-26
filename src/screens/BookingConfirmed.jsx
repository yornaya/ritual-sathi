import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';
import { useApp } from '../context/AppContext.jsx';
import './BookingConfirmed.css';

export default function BookingConfirmed() {
  const nav = useNavigate();
  const { state } = useApp();
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
        <h1 className="bc__title">Booking Confirmed!</h1>
        <p className="bc__sub">
          The Vendor has been notified.<br />
          You'll receive a WhatsApp Confirmation soon.
        </p>

        {latest && (
          <div className="bc__ref">
            <span>BOOKING REFERENCE</span>
            <strong>{latest.id}</strong>
          </div>
        )}
      </div>
      <div className="bc__footer">
        <Button size="block" onClick={() => nav('/home', { replace: true })}>BACK TO HOME</Button>
      </div>
    </div>
  );
}
