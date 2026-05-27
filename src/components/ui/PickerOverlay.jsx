import './PickerOverlay.css';

/**
 * Full-screen bottom-sheet style picker (single-select).
 * Options: [{ value, label, disabled?, hint? }]
 */
export default function PickerOverlay({
  open,
  title,
  options = [],
  value,
  onSelect,
  onClose,
}) {
  if (!open) return null;
  return (
    <div className="picker-backdrop" onClick={onClose} role="presentation">
      <div className="picker-sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="picker-grip" />
        <div className="picker-head">
          <h3 className="picker-title">{title}</h3>
          <button className="picker-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <ul className="picker-list">
          {options.map(opt => {
            const selected = opt.value === value;
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  className={`picker-item ${selected ? 'is-selected' : ''} ${opt.disabled ? 'is-disabled' : ''}`}
                  disabled={opt.disabled}
                  onClick={() => { if (!opt.disabled) { onSelect?.(opt.value); onClose?.(); } }}
                >
                  <span className="picker-item__label">{opt.label}</span>
                  {opt.hint && <span className="picker-item__hint">{opt.hint}</span>}
                  {selected && <span className="picker-item__check">✓</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
