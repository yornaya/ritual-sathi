import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/ui/AppBar.jsx';
import Button from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Input.jsx';
import { useApp } from '../context/AppContext.jsx';
import './Onboarding2.css';

export default function Onboarding2() {
  const nav = useNavigate();
  const { state, setUser } = useApp();
  const [form, setForm] = useState({
    name: state.user.name || 'Ranjan Ghosh',
    phone: state.user.phone || '9876543210',
    email: state.user.email || 'ranjanghosh@gmail.com',
    password: state.user.password || '••••••••',
  });

  const valid = form.name && form.phone.length >= 10 && form.email.includes('@') && form.password.length >= 4;

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    setUser(form);
    nav('/onboarding/3');
  };

  return (
    <div className="screen screen--no-nav ob2">
      <AppBar title="Create an Account" onBack={() => nav('/onboarding/1')} />
      <form className="ob2__form" onSubmit={submit}>
        <Input label="Full Name" placeholder="Ranjan Ghosh"
          value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Input label="Phone Number" placeholder="9876543210" type="tel"
          value={form.phone} onChange={(v) => setForm({ ...form, phone: v.replace(/\D/g, '').slice(0, 10) })} />
        <Input label="Email Address" placeholder="ranjanghosh@gmail.com" type="email"
          value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
        <Input label="Password" placeholder="••••••••••" type="password"
          value={form.password} onChange={(v) => setForm({ ...form, password: v })} />
        <div className="ob2__spacer" />
        <Button type="submit" size="block" disabled={!valid}>CREATE ACCOUNT</Button>
      </form>
    </div>
  );
}
