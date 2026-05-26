import './Slider.css';

export default function Slider({ value, min = 0, max = 100, step = 1, onChange, formatValue }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="slider">
      <div className="slider__value">{formatValue ? formatValue(value) : value}</div>
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
