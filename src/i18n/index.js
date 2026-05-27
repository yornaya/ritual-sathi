import { useCallback } from 'react';
import { useApp } from '../context/AppContext.jsx';
import en from './en.js';
import hi from './hi.js';

const DICTS = { en, hi };

export const LANGUAGES = [
  { code: 'en', label: 'English', active: true },
  { code: 'hi', label: 'हिंदी',   active: true },
  { code: 'bn', label: 'বাংলা',   active: false },
  { code: 'ta', label: 'தமிழ்',   active: false },
  { code: 'gu', label: 'ગુજરાતી', active: false },
  { code: 'mr', label: 'मराठी',   active: false },
];

function fillTemplate(str, vars) {
  if (!vars) return str;
  return str.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in vars ? String(vars[k]) : `{{${k}}}`));
}

export function t(lang, key, vars) {
  const dict = DICTS[lang] || DICTS.en;
  const value = dict[key] ?? DICTS.en[key] ?? key;
  return fillTemplate(value, vars);
}

export function useT() {
  const { state } = useApp();
  const lang = state.user.language || 'en';
  const tt = useCallback((key, vars) => t(lang, key, vars), [lang]);
  tt.lang = lang;
  return tt;
}
