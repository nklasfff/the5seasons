import { NavLink } from 'react-router-dom'
import styles from './BottomNav.module.css'

const NAV_ITEMS = [
  { to: '/', label: 'Hjem', icon: HomeIcon },
  { to: '/saeson', label: 'Sæson', icon: SeasonIcon },
  { to: '/praksis', label: 'Praksis', icon: PracticeIcon },
  { to: '/univers', label: 'Univers', icon: UniversIcon },
]

export default function BottomNav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `${styles.item} ${isActive ? styles.active : ''}`
            }
          >
            <Icon />
            <span className={styles.label}>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

/* Minimal, elegant SVG icons */
function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="8" opacity="0.3" />
    </svg>
  )
}

function SeasonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 C12 3, 4 10, 4 14 C4 18.4, 7.6 22, 12 22 C16.4 22, 20 18.4, 20 14 C20 10, 12 3, 12 3Z" opacity="0.4" />
      <path d="M12 8 L12 16" />
      <path d="M12 12 C10 10, 8 11, 7 13" />
    </svg>
  )
}

function PracticeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4 C8 4, 4 7, 4 12 C4 17, 8 20, 12 20 C16 20, 20 17, 20 12" opacity="0.3" />
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.5" />
      <path d="M12 6 L12 10" />
    </svg>
  )
}

function UniversIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" opacity="0.2" />
      <circle cx="12" cy="12" r="5" opacity="0.3" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  )
}
