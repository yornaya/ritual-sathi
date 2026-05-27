import { NavLink } from 'react-router-dom';
import { useT } from '../../i18n/index.js';
import './BottomNav.css';

const HomeIcon = ({ active }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-8.5z"
      stroke={active ? '#F07F37' : '#49454F'} strokeWidth="2" strokeLinejoin="round"
      fill={active ? '#FFDBC9' : 'none'} />
  </svg>
);
const BudgetIcon = ({ active }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={active ? '#F07F37' : '#49454F'} strokeWidth="2"
      fill={active ? '#FFDBC9' : 'none'} />
    <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="700"
      fill={active ? '#F07F37' : '#49454F'}>₹</text>
  </svg>
);
const ProfileIcon = ({ active }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke={active ? '#F07F37' : '#49454F'} strokeWidth="2"
      fill={active ? '#FFDBC9' : 'none'} />
    <path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" stroke={active ? '#F07F37' : '#49454F'} strokeWidth="2"
      strokeLinecap="round" fill="none" />
  </svg>
);

export default function BottomNav() {
  const t = useT();
  return (
    <nav className="bottom-nav">
      <NavLink to="/home" className={({ isActive }) => `bn-item ${isActive ? 'active' : ''}`}>
        {({ isActive }) => (<><HomeIcon active={isActive} /><span>{t('nav.home')}</span></>)}
      </NavLink>
      <NavLink to="/budget" className={({ isActive }) => `bn-item ${isActive ? 'active' : ''}`}>
        {({ isActive }) => (<><BudgetIcon active={isActive} /><span>{t('nav.budget')}</span></>)}
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => `bn-item ${isActive ? 'active' : ''}`}>
        {({ isActive }) => (<><ProfileIcon active={isActive} /><span>{t('nav.profile')}</span></>)}
      </NavLink>
    </nav>
  );
}
