import { useSeason } from '../../context/SeasonContext';
import GlassCard from '../common/GlassCard';
import styles from './CurrentSeason.module.css';

export default function CurrentSeason() {
  const { current } = useSeason();

  return (
    <GlassCard className="animate-fade-up-delay-1" glowColor={current.glowColor}>
      <span className={styles.badge}>Aktuel sæson</span>
      <h2 className={styles.name}>
        {current.name} <span className={styles.element}>· {current.element}</span>
      </h2>
      <p className={styles.meta}>
        {current.monthLabel} · {current.direction} · {current.chineseChar}
      </p>
      <p className={styles.description}>{current.description}</p>
      <div className={styles.themes}>
        {current.themes.map(t => (
          <span key={t} className={styles.theme}>{t}</span>
        ))}
      </div>
    </GlassCard>
  );
}
