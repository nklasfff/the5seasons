import { NavLink } from 'react-router-dom'
import styles from './BottomNav.module.css'

const NAV_ITEMS = [
  { to: '/', label: 'I dag' },
  { to: '/saeson', label: 'Sæsonen' },
  { to: '/oevelser', label: 'Øvelser' },
  { to: '/elementer', label: 'Elementer' },
]

export default function BottomNav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {NAV_ITEMS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `${styles.item} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.dot} />
            <span className={styles.label}>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
