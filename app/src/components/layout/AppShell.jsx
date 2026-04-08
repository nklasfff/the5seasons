import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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
        <span className={styles.tagline}>Et Liv i Vækst</span>
      </header>

      <main className={styles.content}>
        {children}
      </main>

      <BottomNav />
    </div>
  )
}
