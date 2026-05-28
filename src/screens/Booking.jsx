import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppBar from '../components/ui/AppBar.jsx';
import Button from '../components/ui/Button.jsx';
import VendorImage from '../components/ui/VendorImage.jsx';
import { Input, Textarea, Select } from '../components/ui/Input.jsx';
import {
  VENDORS_BY_ID, BUDGET_CATEGORIES, getVendorName, getVendorLocationString, getVendorPriceLabel,
  getVendorMaxPrice, getVendorMenu,
} from '../data/vendors.js';
import { useApp, formatINR, formatDate } from '../context/AppContext.jsx';
import { useModal } from '../context/ModalContext.jsx';
import { useT } from '../i18n/index.js';
import './Booking.css';

const HOURS = Array.from({ length: 24 }, (_, h) => {
  const label = `${(h % 12) || 12}:00 ${h < 12 ? 'AM' : 'PM'}`;
  return { value: String(h).padStart(2, '0') + ':00', label };
});

const DEFAULT_VENUES = {
  Kolkata:   'Swapnobhor Hall & Lawn, New Town',
  Mumbai:    'The Grand Pavilion, Bandra West',
  Delhi:     'Regal Banquet Hall, Saket',
  Chennai:   'Sri Lakshmi Gardens, T. Nagar',
  Ahmedabad: 'Shree Mangalam Hall, Bodakdev',
};

export default function Booking() {
  const { vendorId } = useParams();
  const nav = useNavigate();
  const vendor = VENDORS_BY_ID[vendorId];
  const { state, addBooking } = useApp();
  const modal = useModal();
  const t = useT();

  const isCaterer = vendor?.category === 'CATERER';
  const isPandit  = vendor?.category === 'PANDIT';

  const menuItems = vendor
    ? getVendorMenu(vendor, state.user.city, t.lang)
    : [];

  const defaultService = menuItems.reduce(
    (max, item) => (item.price > (max?.price ?? -1) ? item : max),
    null
  );

  const [form, setForm] = useState({
    timeFrom: '18:00',
    timeTo: '23:00',
    guests: 200,
    venue: DEFAULT_VENUES[state.user.city] || '',
    notes: '',
    selectedService: defaultService?.name ?? '',
  });

  const selectedMenuPrice = useMemo(() => {
    if (!vendor) return 0;
    if (isPandit) return getVendorMaxPrice(vendor, state.user.city);
    const item = menuItems.find(m => m.name === form.selectedService);
    return item?.price ?? getVendorMaxPrice(vendor, state.user.city);
  }, [vendor, isPandit, menuItems, form.selectedService, state.user.city]);

  const computedAmount = useMemo(() => {
    if (!vendor) return 0;
    if (isCaterer) return selectedMenuPrice * Math.max(1, Number(form.guests) || 1);
    return selectedMenuPrice;
  }, [vendor, isCaterer, selectedMenuPrice, form.guests]);

  if (!vendor) {
    return (
      <div className="screen screen--no-nav">
        <AppBar title={t('booking.ceremony')} />
        <p style={{ padding: 24 }}>Vendor not found.</p>
      </div>
    );
  }

  const ceremonyKey = state.user.ceremonies?.[0] || '';
  const ceremonyDate = state.user.ceremonyDate || '';
  const overBudget = computedAmount > state.user.budget;
  const categoryKey = BUDGET_CATEGORIES.find(b => b.vendorCategory === vendor.category)?.key;

  const vendorName = getVendorName(vendor, t.lang);
  const vendorLocation = getVendorLocationString(vendor, state.user.city, t.lang, t);
  const vendorPriceLabel = getVendorPriceLabel(vendor, ceremonyKey, t, state.user.city);
  const dateLocale = t.lang === 'hi' ? 'hi-IN' : 'en-IN';

  const submit = async (e) => {
    e.preventDefault();
    if (overBudget) {
      const ok = await modal.confirm({
        title: t('booking.over.title'),
        message: t('booking.over.body', { amount: formatINR(computedAmount), budget: formatINR(state.user.budget) }),
        confirmText: t('btn.continueAnyway'),
        cancelText: t('btn.cancel'),
        danger: true,
      });
      if (!ok) return;
    }
    addBooking({
      vendorId: vendor.id,
      vendorName: vendor.name,
      vendorNameHi: vendor.nameHi,
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
            <div className="booking__vendor-name">{vendorName}</div>
            <div className="booking__vendor-meta">{vendorLocation} · {vendorPriceLabel}</div>
          </div>
        </div>

        <div className="booking__readonly">
          <div className="booking__ro-row">
            <span className="booking__ro-label">{t('booking.ceremony')}</span>
            <span className="booking__ro-value">{t(`ceremony.${ceremonyKey}`)}</span>
          </div>
          <div className="booking__ro-row">
            <span className="booking__ro-label">{t('booking.date')}</span>
            <span className="booking__ro-value">{ceremonyDate ? formatDate(ceremonyDate, dateLocale) : t('booking.notSet')}</span>
          </div>
        </div>

        <div className="booking__time-block">
          <span className="booking__label">{t('booking.time')}</span>
          <div className="booking__time-row">
            <Select
              value={form.timeFrom}
              onChange={(v) => setForm({ ...form, timeFrom: v })}
              options={HOURS}
              placeholder={t('booking.timeFrom')}
            />
            <span className="booking__time-to">{t('booking.timeTo')}</span>
            <Select
              value={form.timeTo}
              onChange={(v) => setForm({ ...form, timeTo: v })}
              options={HOURS}
              placeholder={t('booking.timeTo')}
            />
          </div>
        </div>

        {isCaterer && (
          <Input
            label={t('booking.guests')}
            type="number"
            value={form.guests}
            onChange={(v) => setForm({ ...form, guests: Math.max(1, Number(v) || 1) })}
          />
        )}

        {!isPandit && (
          <Select
            label="Service"
            value={form.selectedService}
            onChange={(v) => setForm({ ...form, selectedService: v })}
            options={menuItems.map(m => ({
              value: m.name,
              label: `${m.name} — ₹${m.price.toLocaleString('en-IN')}`,
            }))}
          />
        )}

        <Input label={t('booking.venue')} value={form.venue} onChange={(v) => setForm({ ...form, venue: v })} />

        <Textarea label={t('booking.notes')} value={form.notes} onChange={(v) => setForm({ ...form, notes: v })} />

        <div className={`booking__estimate ${overBudget ? 'booking__estimate--over' : ''}`}>
          <span>{t('booking.estimate')}</span>
          <strong>{formatINR(computedAmount)}</strong>
        </div>

        <Button type="submit" size="block" disabled={!form.venue}>{t('btn.confirmBooking')}</Button>
      </form>
    </div>
  );
}
