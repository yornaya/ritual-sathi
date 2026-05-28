import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import Logo from '../components/ui/Logo.jsx';
import { useT } from '../i18n/index.js';
import './Splash.css';

export default function Splash() {
  const nav = useNavigate();
  const { state } = useApp();
  const t = useT();
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitId = setTimeout(() => setExiting(true), 2450);
    const navId  = setTimeout(() => {
      nav(state.isAuthed ? '/home' : '/onboarding/1', { replace: true });
    }, 2800);
    return () => { clearTimeout(exitId); clearTimeout(navId); };
  }, [nav, state.isAuthed]);

  return (
    <div className={`splash${exiting ? ' splash--exiting' : ''}`}>
      <div className="splash__center">
        <Logo size="xl" />
        <p className="splash__tag">{t('splash.tag')}</p>
        <div className="splash__spinner" />
      </div>
    </div>
  );
}
