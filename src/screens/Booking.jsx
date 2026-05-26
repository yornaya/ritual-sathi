import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppBar from '../components/ui/AppBar.jsx';
import Button from '../components/ui/Button.jsx';
import VendorImage from '../components/ui/VendorImage.jsx';
import { Input, Textarea, Select } from '../components/ui/Input.jsx';
import { VENDORS_BY_ID, BUDGET_CATEGORIES } from '../data/vendors.js';
import { CEREMONIES } from '../data/ceremonies.js';
import { useApp, formatINR, formatDate } from '../context/AppContext.jsx';
import { useModal } from '../context/ModalContext.jsx';
import './Booking.css';

const HOURS = Array.from({ length: 24 }, (_, h) => {
  const label = `${(h % 12) || 12}:00 ${h < 12 ? 'AM' : 'PM'}`;
  return { value: String(h).padStart(2, '0') + ':00', label };
});

function ceremonyLabel(key) {
  return CEREMONIES.find(c => c.key === key)?.label || key || '—';
}

const DEFAULT_VENUE = 'Swapnobhor Hall & Lawn, New Town';

export default function Booking() {
  const { vendorId } = useParams();
  const nav = useNavigate();
  const vendor = VENDORS_BY_ID[vendorId];
  const { state, addBooking } = useApp();
  const modal = useModal();

  const isCaterer = vendor?.category === 'CATERER';

  const [form, setForm] = useState({
    timeFrom: '18:00',
    timeTo: '23:00',
    guests: 200,
    venue: DEFAULT_VENUE,
    notes: '',
  });

  const highestMenuPrice = useMemo(
    () => (vendor ? Math.max(...vendor.menu.map(m => m.price)) : 0),
    [vendor]
  );
  const computedAmount = useMemo(() => {
    if (!vendor) return 0;
    if (isCaterer) return highestMenuPrice * Math.max(1, Number(form.guests) || 1);
    return highestMenuPrice;
  }, [vendor, isCaterer, highestMenuPrice, form.guests]);

  if (!vendor) {
    return (
      <div className="screen screen--no-nav">
        <AppBar title="Booking" />
        <p style={{ padding: 24 }}>Vendor not found.</p>
      </div>
    );
  }

  const ceremonyKey = state.user.ceremonies?.[0] || '';
  const ceremonyDate = state.user.ceremonyDate || '';
  const overBudget = computedAmount > state.user.budget;
  const categoryKey = BUDGET_CATEGORIES.find(b => b.vendorCategory === vendor.category)?.key;

  const submit = async (e) => {
    e.preventDefault();
    if (overBudget) {
      const ok = await modal.confirm({
        title: 'Over budget',
        message: `This booking (${formatINR(computedAmount)}) exceeds your overall budget of ${formatINR(state.user.budget)}. Continue anyway?`,
        confirmText: 'Continue',
        danger: true,
      });
      if (!ok) return;
    }
    addBooking({
      vendorId: vendor.id,
      vendorName: vendor.name,
      vendorCategory: vendor.category,
      categoryKey,
      ceremony: ceremonyKey,
      date: ceremonyDate,
      timeFrom: form.timeFrom,
      timeTo: form.timeTo,
      guests: isCaterer ? Number(form.guests) || 0 : null,
      venue: form.venue,
      notes: form.notes,
      amount: computedAmount,
    });
    nav('/booking-confirmed', { replace: true });
  };

  return (
    <div className="screen screen--no-nav booking">
      <AppBar title="" />

      <form className="booking__form" onSubmit={submit}>
        <div className="booking__vendor">
          <VendorImage vendor={vendor} className="booking__vendor-img" />
          <div>
            <div className="booking__vendor-name">{vendor.name}</div>
            <div className="booking__vendor-meta">{vendor.location} · {vendor.priceLabel}</div>
          </div>
        </div>

        <div className="booking__readonly">
          <div className="booking__ro-row">
            <span className="booking__ro-label">Ceremony</span>
            <span className="booking__ro-value">{ceremonyLabel(ceremonyKey)}</span>
          </div>
          <div className="booking__ro-row">
            <span className="booking__ro-label">Date</span>
            <span className="booking__ro-value">{ceremonyDate ? formatDate(ceremonyDate) : 'Not set'}</span>
          </div>
        </div>

        <div className="booking__time-block">
          <span className="booking__label">Time</span>
          <div className="booking__time-row">
            <Select
              value={form.timeFrom}
              onChange={(v) => setForm({ ...form, timeFrom: v })}
              options={HOURS}
              placeholder="From"
            />
            <span className="booking__time-to">To</span>
            <Select
              value={form.timeTo}
              onChange={(v) => setForm({ ...form, timeTo: v })}
              options={HOURS}
              placeholder="To"
            />
          </div>
        </div>

        {isCaterer && (
          <Input
            label="Number of Guests"
            type="number"
            value={form.guests}
            onChange={(v) => setForm({ ...form, guests: Math.max(1, Number(v) || 1) })}
          />
        )}

        <Input
          label="Venue Location"
          value={form.venue}
          onChange={(v) => setForm({ ...form, venue: v })}
        />

        <Textarea
          label="Special Requirements"
          value={form.notes}
          onChange={(v) => setForm({ ...form, notes: v })}
        />

        <div className={`booking__estimate ${overBudget ? 'booking__estimate--over' : ''}`}>
          <span>Estimated Cost</span>
          <strong>{formatINR(computedAmount)}</strong>
        </div>

        <Button type="submit" size="block" disabled={!form.venue}>CONFIRM BOOKING →</Button>
      </form>
    </div>
  );
}
