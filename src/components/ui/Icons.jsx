/* Small inline SVG icon set so we don't depend on emojis for UI chrome. */

export function SearchIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" />
      <path d="m20 20-3.2-3.2" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function WalletIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="18" height="13" rx="2.5" stroke={color} strokeWidth="2" />
      <path d="M16 13h2" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M3 9h18" stroke={color} strokeWidth="2" />
    </svg>
  );
}

export function PinIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 22s7-7.2 7-13a7 7 0 1 0-14 0c0 5.8 7 13 7 13z"
        stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" stroke={color} strokeWidth="2" />
    </svg>
  );
}

export function CalendarIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="14" rx="2" stroke={color} strokeWidth="2" />
      <path d="M3.5 10h17M8 3.5v4M16 3.5v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function HeartIcon({ size = 18, color = 'currentColor', filled = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} aria-hidden>
      <path d="M12 20.5s-7.5-4.7-9.5-9.4C1.3 8 3.5 4.5 7 4.5c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 5.7 3.5 4.5 6.6-2 4.7-9.5 9.4-9.5 9.4z"
        stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function GlobeIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke={color} strokeWidth="2" />
      <path d="M3 12h18" stroke={color} strokeWidth="2" />
    </svg>
  );
}

export function LifebuoyIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
      <circle cx="12" cy="12" r="3.5" stroke={color} strokeWidth="2" />
      <path d="M5.6 5.6l3.3 3.3M18.4 5.6l-3.3 3.3M5.6 18.4l3.3-3.3M18.4 18.4l-3.3-3.3"
        stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function LogoutIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15 17l5-5-5-5M20 12H9M12 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h7"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StorefrontIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 9l1.5-4h13L20 9" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path d="M4 9v11h16V9" stroke={color} strokeWidth="2" />
      <path d="M4 9c0 1.7 1.3 3 3 3s3-1.3 3-3M10 9c0 1.7 1.3 3 3 3s3-1.3 3-3M16 9c0 1.7 1.3 3 3 3"
        stroke={color} strokeWidth="2" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 6l6 6-6 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
