import './Input.css';

export function Input({ label, value, onChange, type = 'text', placeholder, ...rest }) {
  return (
    <label className="input-field">
      {label && <span className="input-field__label">{label}</span>}
      <input
        className="input-field__input"
        type={type}
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        {...rest}
      />
    </label>
  );
}

export function Textarea({ label, value, onChange, placeholder, rows = 4 }) {
  return (
    <label className="input-field">
      {label && <span className="input-field__label">{label}</span>}
      <textarea
        className="input-field__input input-field__input--area"
        value={value || ''}
        placeholder={placeholder}
        rows={rows}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </label>
  );
}

export function Select({ label, value, onChange, options, placeholder = 'Select...' }) {
  return (
    <label className="input-field">
      {label && <span className="input-field__label">{label}</span>}
      <select
        className="input-field__input"
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(opt => {
          const v = typeof opt === 'string' ? opt : opt.value;
          const l = typeof opt === 'string' ? opt : opt.label;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </label>
  );
}
