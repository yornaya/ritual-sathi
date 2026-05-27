import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import Logo from '../components/ui/Logo.jsx';
import { useT } from '../i18n/index.js';
import './Splash.css';

export default function Splash() {
  const nav = useNavigate();
  const { state } = useApp();
  const t = useT();

  useEffect(() => {
    const id = setTimeout(() => {
      nav(state.isAuthed ? '/home' : '/onboarding/1', { replace: true });
    }, 1800);
    return () => clearTimeout(id);
  }, [nav, state.isAuthed]);

  return (
    <div className="splash">
      <div className="splash__center">
        <Logo size="xl" />
        <p className="splash__tag">{t('splash.tag')}</p>
      </div>
    </div>
  );
}
