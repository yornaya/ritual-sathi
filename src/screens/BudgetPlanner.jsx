import { useMemo, useState } from 'react';
import BottomNav from '../components/ui/BottomNav.jsx';
import Slider from '../components/ui/Slider.jsx';
import { BUDGET_CATEGORIES } from '../data/vendors.js';
import { useApp, formatINR, formatLakhs, formatDate } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';
import './BudgetPlanner.css';

export default function BudgetPlanner() {
  const { state, setBudget } = useApp();
  const t = useT();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(state.user.budget);

  const totalSpent = useMemo(
    () => Object.values(state.spentByCategory).reduce((a, b) => a + b, 0),
    [state.spentByCategory]
  );
  const remaining = Math.max(0, state.user.budget - totalSpent);
  const pct = state.user.budget ? Math.min(100, (totalSpent / state.user.budget) * 100) : 0;

  const ceremonyLabel = t(`ceremony.${state.user.ceremonies?.[0] || 'wedding'}`).toUpperCase();
  const cityLabel = t(`city.${state.user.city}`);
  const dateLocale = t.lang === 'hi' ? 'hi-IN' : 'en-IN';
  const dateLabel = state.user.ceremonyDate ? formatDate(state.user.ceremonyDate, dateLocale) : '';

  return (
    <div className="screen budget">
      <header className="budget__top">
        <h1>{t('bp.title')}</h1>
        <button className="budget__edit" onClick={() => { setDraft(state.user.budget); setEditing(true); }}>
          {t('btn.edit')}
        </button>
      </header>

      <section className="budget__card">
        <div className="budget__card-tag">
          {ceremonyLabel} · {cityLabel}{dateLabel ? ` · ${dateLabel}` : ''}
        </div>
        <div className="budget__card-total">{formatLakhs(state.user.budget)}</div>
        <div className="budget__progress">
          <div className="budget__progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="budget__card-meta">
          <span>{formatINR(totalSpent)} {t('bp.spent')}</span>
          <span>· {formatINR(remaining)} {t('bp.remaining')}</span>
        </div>
      </section>

      {editing && (
        <section className="budget__edit-block">
          <Slider
            value={draft}
            min={0}
            max={10000000}
            step={50000}
            onChange={setDraft}
            formatValue={formatLakhs}
          />
          <div className="budget__edit-actions">
            <button className="budget__btn budget__btn--ghost" onClick={() => setEditing(false)}>{t('btn.cancel')}</button>
            <button className="budget__btn" onClick={() => { setBudget(draft); setEditing(false); }}>{t('btn.save')}</button>
          </div>
        </section>
      )}

      <section className="budget__grid">
        {BUDGET_CATEGORIES.map(cat => {
          const spent = state.spentByCategory[cat.key] || 0;
          return (
            <div key={cat.key} className="budget__cat">
              <div className="budget__cat-emoji">{cat.emoji}</div>
              <div className="budget__cat-label">{t(`bcat.${cat.key}`)}</div>
              <div className="budget__cat-amt">{formatINR(spent)}</div>
              <div className="budget__cat-spent">{spent > 0 ? t('bp.booked') : t('bp.nothingBooked')}</div>
            </div>
          );
        })}
      </section>

      <BottomNav />
    </div>
  );
}
