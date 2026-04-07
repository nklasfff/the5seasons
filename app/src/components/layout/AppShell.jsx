import { useState, useEffect } from 'react';
import BottomNav from './BottomNav';
import GrainOverlay from '../common/GrainOverlay';
import GlowOrb from '../common/GlowOrb';
import { useSeason } from '../../context/SeasonContext';
import styles from './AppShell.module.css';

export default function AppShell({ children }) {
  const { current } = useSeason();
  const [theme, setTheme] = useState(() => localStorage.getItem('5seasons-theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('5seasons-theme', theme);
  }, [theme]);

  return (
    <div className={styles.shell}>
      <GlowOrb color={`${current.color}18`} size={400} top="-100px" right="-100px" />
      <GlowOrb color={`${current.lightColor}12`} size={350} bottom="100px" left="-80px" delay={5} />
      <GrainOverlay />

      <button
        className={styles.themeBtn}
        onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        aria-label={theme === 'dark' ? 'Skift til lys' : 'Skift til mørk'}
      >
        <svg viewBox="0 0 24 24" className={styles.themeIcon}>
          {theme === 'dark' ? (
            <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
              <circle cx="12" cy="12" r="4.5" />
              <line x1="12" y1="2" x2="12" y2="4.5" />
              <line x1="12" y1="19.5" x2="12" y2="22" />
              <line x1="2" y1="12" x2="4.5" y2="12" />
              <line x1="19.5" y1="12" x2="22" y2="12" />
            </g>
          ) : (
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
      </button>

      <main className={styles.main}>
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
