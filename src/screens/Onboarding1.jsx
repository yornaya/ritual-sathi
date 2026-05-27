import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';
import Logo from '../components/ui/Logo.jsx';
import { useT } from '../i18n/index.js';
import './Onboarding1.css';

export default function Onboarding1() {
  const nav = useNavigate();
  const t = useT();
  return (
    <div className="ob1">
      <div className="ob1__hero">
        <Logo size="xl" />
        <p className="ob1__tagline">{t('ob1.tagline')}</p>
      </div>
      <div className="ob1__panel">
        <Button size="block" onClick={() => nav('/onboarding/2')}>{t('btn.createAccount')}</Button>
        <Button variant="outline" size="block" onClick={() => nav('/login')}>{t('btn.login')}</Button>
        <p className="ob1__terms">{t('ob1.terms')}</p>
      </div>
    </div>
  );
}
