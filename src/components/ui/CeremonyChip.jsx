import './CeremonyChip.css';

export default function CeremonyChip({ ceremony, selected, onClick, size = 'md' }) {
  return (
    <button
      type="button"
      className={`ceremony-chip ceremony-chip--${size} ${selected ? 'is-selected' : ''}`}
      onClick={onClick}
    >
      <span className="ceremony-chip__emoji">{ceremony.emoji}</span>
      <span className="ceremony-chip__label">{ceremony.label}</span>
    </button>
  );
}
