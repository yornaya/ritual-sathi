import { useNavigate } from 'react-router-dom';
import AppBar from '../components/ui/AppBar.jsx';
import { useApp, formatINR, formatDate } from '../context/AppContext.jsx';
import { useModal } from '../context/ModalContext.jsx';
import { CEREMONIES } from '../data/ceremonies.js';
import './Bookings.css';

const ceremonyLabel = (k) => CEREMONIES.find(c => c.key === k)?.label || k || 'Ceremony';

export default function Bookings() {
  const { state, cancelBooking } = useApp();
  const modal = useModal();
  const nav = useNavigate();
  const bookings = state.bookings;
  const now = Date.now();
  const upcoming = bookings.filter(b => !b.date || new Date(b.date).getTime() >= now);
  const past = bookings.filter(b => b.date && new Date(b.date).getTime() < now);

  const handleCancel = async (b) => {
    const ok = await modal.confirm({
      title: 'Cancel booking?',
      message: `${b.vendorName} will be cancelled and ${formatINR(b.amount)} refunded to your budget.`,
      confirmText: 'Cancel Booking',
      cancelText: 'Keep It',
      danger: true,
    });
    if (ok) cancelBooking(b.id);
  };

  return (
    <div className="screen screen--no-nav bookings">
      <AppBar title="My Bookings" />
      <div className="bookings__body">
        {bookings.length === 0 ? (
          <div className="bookings__empty">
            <span>📅</span>
            <p>No bookings yet.</p>
            <button onClick={() => nav('/home')}>Find Vendors</button>
          </div>
        ) : (
          <>
            {upcoming.length > 0 && (
              <section>
                <h2 className="bookings__section">Upcoming</h2>
                {upcoming.map(b => (
                  <BookingItem
                    key={b.id} b={b}
                    onOpen={() => nav(`/vendor/${b.vendorId}`)}
                    onCancel={() => handleCancel(b)}
                  />
                ))}
              </section>
            )}
            {past.length > 0 && (
              <section>
                <h2 className="bookings__section">Past</h2>
                {past.map(b => (
                  <BookingItem
                    key={b.id} b={b}
                    onOpen={() => nav(`/vendor/${b.vendorId}`)}
                    onCancel={() => handleCancel(b)}
                    isPast
                  />
                ))}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function BookingItem({ b, onOpen, onCancel, isPast }) {
  return (
    <div className="booking-item">
      <button className="booking-item__main" onClick={onOpen}>
        <div className="booking-item__top">
          <div>
            <div className="booking-item__vendor">{b.vendorName}</div>
            <div className="booking-item__ceremony">
              {ceremonyLabel(b.ceremony)} · {b.vendorCategory}
            </div>
          </div>
          <div className="booking-item__amt">{formatINR(b.amount)}</div>
        </div>
        <div className="booking-item__row">
          {b.date ? formatDate(b.date) : 'Date TBD'}
          {b.timeFrom && b.timeTo ? ` · ${b.timeFrom} – ${b.timeTo}` : ''}
        </div>
        <div className="booking-item__row booking-item__row--muted">Ref: {b.id}</div>
      </button>
      <button className="booking-item__cancel" onClick={onCancel}>
        {isPast ? 'Remove' : 'Cancel Booking'}
      </button>
    </div>
  );
}
