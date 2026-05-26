import './Logo.css';

export default function Logo({ size = 'md', center = true }) {
  return (
    <h1 className={`rs-logo rs-logo--${size} ${center ? 'rs-logo--center' : ''}`}>
      <span className="rs-logo__ritual">Ritual</span><span className="rs-logo__sathi">Sathi</span>
    </h1>
  );
}
