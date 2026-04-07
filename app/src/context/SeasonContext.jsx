import { createContext, useContext, useMemo } from 'react';
import { getCurrentSeason, seasons } from '../data/seasons';

const SeasonContext = createContext(null);

export function SeasonProvider({ children }) {
  const value = useMemo(() => {
    const current = getCurrentSeason();
    return { current, seasons };
  }, []);

  return (
    <SeasonContext.Provider value={value}>
      <div style={{
        '--accent': value.current.color,
        '--accent-light': value.current.lightColor,
        '--accent-glow': value.current.glowColor,
      }}>
        {children}
      </div>
    </SeasonContext.Provider>
  );
}

export function useSeason() {
  const ctx = useContext(SeasonContext);
  if (!ctx) throw new Error('useSeason must be used within SeasonProvider');
  return ctx;
}
