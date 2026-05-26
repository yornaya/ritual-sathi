import { useMemo, useState } from 'react';
import BottomNav from '../components/ui/BottomNav.jsx';
import Slider from '../components/ui/Slider.jsx';
import { BUDGET_CATEGORIES } from '../data/vendors.js';
import { useApp, formatINR, formatLakhs, formatDate } from '../context/AppContext.jsx';
import './BudgetPlanner.css';

export default function BudgetPlanner() {
  const { state, setBudget } = useApp();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(state.user.budget);

  const totalSpent = useMemo(
    () => Object.values(state.spentByCategory).reduce((a, b) => a + b, 0),
    [state.spentByCategory]
  );
  const remaining = Math.max(0, state.user.budget - totalSpent);
  const pct = state.user.budget ? Math.min(100, (totalSpent / state.user.budget) * 100) : 0;

  const ceremonyLabel = state.user.ceremonies?.[0]?.toUpperCase() || 'CEREMONY';
  const cityLabel = state.user.city || 'YOUR CITY';
  const dateLabel = state.user.ceremonyDate ? formatDate(state.user.ceremonyDate) : '';

  return (
    <div className="screen budget">
      <header className="budget__top">
        <h1>Budget Planner</h1>
        <button className="budget__edit" onClick={() => { setDraft(state.user.budget); setEditing(true); }}>
          Edit
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
          <span>{formatINR(totalSpent)} spent</span>
          <span>· {formatINR(remaining)} remaining</span>
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
            <button className="budget__btn budget__btn--ghost" onClick={() => setEditing(false)}>Cancel</button>
            <button className="budget__btn" onClick={() => { setBudget(draft); setEditing(false); }}>Save</button>
          </div>
        </section>
      )}

      <section className="budget__grid">
        {BUDGET_CATEGORIES.map(cat => {
          const spent = state.spentByCategory[cat.key] || 0;
          return (
            <div key={cat.key} className="budget__cat">
              <div className="budget__cat-emoji">{cat.emoji}</div>
              <div className="budget__cat-label">{cat.label}</div>
              <div className="budget__cat-amt">{formatINR(spent)}</div>
              <div className="budget__cat-spent">{spent > 0 ? 'Booked' : 'Nothing booked yet'}</div>
            </div>
          );
        })}
      </section>

      <BottomNav />
    </div>
  );
}
