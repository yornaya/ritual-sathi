import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';
import Logo from '../components/ui/Logo.jsx';
import './Onboarding1.css';

export default function Onboarding1() {
  const nav = useNavigate();
  return (
    <div className="ob1">
      <div className="ob1__hero">
        <Logo size="xl" />
        <p className="ob1__tagline">Plan every ceremony, effortlessly.</p>
      </div>
      <div className="ob1__panel">
        <Button size="block" onClick={() => nav('/onboarding/2')}>CREATE AN ACCOUNT</Button>
        <Button variant="outline" size="block" onClick={() => nav('/login')}>LOGIN</Button>
        <p className="ob1__terms">By continuing, you agree to our Terms &amp; Privacy Policy</p>
      </div>
    </div>
  );
}
