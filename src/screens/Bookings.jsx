import { useNavigate } from 'react-router-dom';
import AppBar from '../components/ui/AppBar.jsx';
import { useApp, formatINR, formatDate } from '../context/AppContext.jsx';
import { useModal } from '../context/ModalContext.jsx';
import { useT } from '../i18n/index.js';
import './Bookings.css';

export default function Bookings() {
  const { state, cancelBooking } = useApp();
  const modal = useModal();
  const t = useT();
  const nav = useNavigate();
  const bookings = state.bookings;
  const now = Date.now();
  const upcoming = bookings.filter(b => !b.date || new Date(b.date).getTime() >= now);
  const past = bookings.filter(b => b.date && new Date(b.date).getTime() < now);
  const dateLocale = t.lang === 'hi' ? 'hi-IN' : 'en-IN';

  const handleCancel = async (b) => {
    const localName = t.lang === 'hi' && b.vendorNameHi ? b.vendorNameHi : b.vendorName;
    const ok = await modal.confirm({
      title: t('bookings.cancel.title'),
      message: t('bookings.cancel.body', { vendor: localName, amount: formatINR(b.amount) }),
      confirmText: t('btn.cancelBooking'),
      cancelText: t('btn.keepIt'),
      danger: true,
    });
    if (ok) cancelBooking(b.id);
  };

  return (
    <div className="screen screen--no-nav bookings">
      <AppBar title={t('bookings.title')} />
      <div className="bookings__body">
        {bookings.length === 0 ? (
          <div className="bookings__empty">
            <span>📅</span>
            <p>{t('bookings.empty')}</p>
            <button onClick={() => nav('/home')}>{t('bookings.find')}</button>
          </div>
        ) : (
          <>
            {upcoming.length > 0 && (
              <section>
                <h2 className="bookings__section">{t('bookings.upcoming')}</h2>
                {upcoming.map(b => (
                  <BookingItem key={b.id} b={b} t={t} dateLocale={dateLocale}
                    onOpen={() => nav(`/vendor/${b.vendorId}`)}
                    onCancel={() => handleCancel(b)} />
                ))}
              </section>
            )}
            {past.length > 0 && (
              <section>
                <h2 className="bookings__section">{t('bookings.past')}</h2>
                {past.map(b => (
                  <BookingItem key={b.id} b={b} t={t} dateLocale={dateLocale}
                    onOpen={() => nav(`/vendor/${b.vendorId}`)}
                    onCancel={() => handleCancel(b)} isPast />
                ))}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function BookingItem({ b, onOpen, onCancel, isPast, t, dateLocale }) {
  const name = t.lang === 'hi' && b.vendorNameHi ? b.vendorNameHi : b.vendorName;
  return (
    <div className="booking-item">
      <button className="booking-item__main" onClick={onOpen}>
        <div className="booking-item__top">
          <div>
            <div className="booking-item__vendor">{name}</div>
            <div className="booking-item__ceremony">
              {t(`ceremony.${b.ceremony}`)} · {t(`cat.${b.vendorCategory}`)}
            </div>
          </div>
          <div className="booking-item__amt">{formatINR(b.amount)}</div>
        </div>
        <div className="booking-item__row">
          {b.date ? formatDate(b.date, dateLocale) : t('bookings.dateTbd')}
          {b.timeFrom && b.timeTo ? ` · ${b.timeFrom} – ${b.timeTo}` : ''}
        </div>
        <div className="booking-item__row booking-item__row--muted">{t('bookings.ref')} {b.id}</div>
      </button>
      <button className="booking-item__cancel" onClick={onCancel}>
        {isPast ? t('btn.remove') : t('btn.cancelBooking')}
      </button>
    </div>
  );
}
