import { NavLink } from 'react-router-dom';
import styles from './BottomNav.module.css';

const tabs = [
  {
    to: '/hjem',
    label: 'Hjem',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
      </svg>
    ),
  },
  {
    to: '/saesoner',
    label: 'Saesoner',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 010 18" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    to: '/praksis',
    label: 'Praksis',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 6v6l4 2" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    to: '/profil',
    label: 'Profil',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  return (
    <nav className={styles.nav}>
      {tabs.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
        >
          {icon}
          <span className={styles.tabLabel}>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
