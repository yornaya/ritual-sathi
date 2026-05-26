import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/ui/AppBar.jsx';
import Button from '../components/ui/Button.jsx';
import Logo from '../components/ui/Logo.jsx';
import { Input } from '../components/ui/Input.jsx';
import { useApp } from '../context/AppContext.jsx';
import './Login.css';

const DEFAULT_EMAIL = 'ranjanghosh@gmail.com';
const DEFAULT_PASSWORD = '••••••••';

export default function Login() {
  const nav = useNavigate();
  const { setUser, setCity, setCeremonies, setBudget, setCeremonyDate, completeOnboarding } = useApp();
  const [identifier, setIdentifier] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);

  const login = (e) => {
    e.preventDefault();
    // Seed the demo account with sensible defaults so /home is usable straight away
    setUser({
      name: 'Ranjan Ghosh',
      email: DEFAULT_EMAIL,
      phone: '9876543210',
      password: DEFAULT_PASSWORD,
    });
    setCeremonies(['wedding']);
    setBudget(2500000);
    setCity('Kolkata');
    setCeremonyDate(new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().slice(0, 10));
    completeOnboarding();
    nav('/home', { replace: true });
  };

  return (
    <div className="screen screen--no-nav login">
      <AppBar title="Login" onBack={() => nav('/onboarding/1')} />
      <form className="login__body" onSubmit={login}>
        <div className="login__logo"><Logo size="lg" /></div>
        <p className="login__welcome">Welcome back!</p>

        <Input
          label="Phone Number / Email Address"
          value={identifier}
          onChange={setIdentifier}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
        />

        <div className="login__spacer" />
        <Button type="submit" size="block" disabled={!identifier || !password}>LOGIN</Button>
        <p className="login__alt">
          Don't have an account?{' '}
          <button type="button" className="login__alt-btn" onClick={() => nav('/onboarding/2')}>
            Create one
          </button>
        </p>
      </form>
    </div>
  );
}
