import { useNavigate } from 'react-router-dom';
import './AppBar.css';

export default function AppBar({ title, onBack, right }) {
  const nav = useNavigate();
  return (
    <header className="app-bar">
      <button
        className="app-bar__back"
        onClick={() => (onBack ? onBack() : nav(-1))}
        aria-label="Back"
      >
        ‹
      </button>
      <h1 className="app-bar__title">{title}</h1>
      <div className="app-bar__right">{right}</div>
    </header>
  );
}
