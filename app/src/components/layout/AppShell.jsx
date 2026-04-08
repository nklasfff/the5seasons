import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'
import styles from './AppShell.module.css'

export default function AppShell({ children, time, season }) {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div
      className={styles.shell}
      data-time={time.timeOfDay}
      data-season={season.current.id}
    >
      <header className={styles.topBar}>
        <span className={styles.brand}>De 5 Årstiders Energi</span>
        <nav className={styles.desktopNav}>
          <NavLink to="/" end className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navActive : ''}`}>I dag</NavLink>
          <NavLink to="/saeson" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navActive : ''}`}>Sæsonen</NavLink>
          <NavLink to="/oevelser" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navActive : ''}`}>Øvelser</NavLink>
          <NavLink to="/elementer" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navActive : ''}`}>Elementer</NavLink>
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
