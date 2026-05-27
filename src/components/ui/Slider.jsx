import { useEffect, useRef, useState } from 'react';
import './Slider.css';

/**
 * Slider with click-to-type. Tap (or double-click) the big value on top to
 * replace it with an input field, type any number within [min..max], press
 * Enter or blur to commit.
 */
export default function Slider({ value, min = 0, max = 100, step = 1, onChange, formatValue, allowType = true }) {
  const pct = ((value - min) / (max - min)) * 100;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  useEffect(() => {
    if (!editing) setDraft(String(value));
  }, [value, editing]);

  const commit = () => {
    const n = Number(draft.replace(/[^\d.]/g, ''));
    if (!isNaN(n)) {
      const clamped = Math.max(min, Math.min(max, Math.round(n / step) * step));
      onChange?.(clamped);
    }
    setEditing(false);
  };

  const cancel = () => {
    setDraft(String(value));
    setEditing(false);
  };

  return (
    <div className="slider">
      {editing ? (
        <div className="slider__value slider__value--editing">
          <span className="slider__value-prefix">₹</span>
          <input
            ref={inputRef}
            className="slider__value-input"
            type="text"
            inputMode="numeric"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commit();
              else if (e.key === 'Escape') cancel();
            }}
          />
        </div>
      ) : (
        <button
          type="button"
          className="slider__value"
          onClick={() => allowType && setEditing(true)}
          title={allowType ? 'Tap to type an amount' : ''}
        >
          {formatValue ? formatValue(value) : value}
        </button>
      )}

      <div className="slider__track-wrap">
        <div className="slider__track">
          <div className="slider__fill" style={{ width: `${pct}%` }} />
        </div>
        <input
          className="slider__input"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange?.(Number(e.target.value))}
        />
      </div>
      <div className="slider__ticks">
        <span>{formatValue ? formatValue(min) : min}</span>
        <span>{formatValue ? formatValue(max) : max}</span>
      </div>
    </div>
  );
}
