import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'
import styles from './AppShell.module.css'

export default function AppShell({ children, time, season }) {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div
      className={styles.shell}
      data-time={time.timeOfDay}
      data-season={season.current.id}
    >
      {/* Desktop top bar */}
      <header className={styles.topBar}>
        <span className={styles.brand}>Isabelle Evita</span>
        <nav className={styles.desktopNav}>
          <NavLink to="/" end className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>Hjem</NavLink>
          <NavLink to="/saeson" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>Sæson</NavLink>
          <NavLink to="/praksis" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>Praksis</NavLink>
          <NavLink to="/univers" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>Univers</NavLink>
        </nav>
        <span className={styles.tagline}>Et Liv i Vækst</span>
      </header>

      <main className={styles.content}>
        {children}
      </main>

      <BottomNav />
    </div>
  )
}
