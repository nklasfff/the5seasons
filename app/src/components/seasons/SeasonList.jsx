import { useNavigate } from 'react-router-dom';
import { useSeason } from '../../context/SeasonContext';
import GlassCard from '../common/GlassCard';
import styles from './SeasonList.module.css';

export default function SeasonList() {
  const { seasons, current } = useSeason();
  const navigate = useNavigate();

  return (
    <div>
      <div className={`${styles.header} animate-fade-up`}>
        <h1 className={styles.title}>Sæsonerne</h1>
        <p className={styles.subtitle}>Fem sæsoner · Fem elementer · Fem energier</p>
      </div>
      <div className={styles.grid}>
        {seasons.map((s, i) => (
          <GlassCard
            key={s.id}
            className={`${styles.seasonCard} animate-fade-up-delay-${Math.min(i + 1, 3)}`}
            glowColor={s.glowColor}
            onClick={() => navigate(`/saesoner/${s.id}`)}
          >
            <div className={styles.cardTop}>
              <div className={styles.circle} style={{ background: s.color }}>
                {s.chineseChar}
              </div>
              <div className={styles.cardInfo}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                  <h3 className={styles.seasonName}>{s.name}</h3>
                  {s.id === current.id && <span className={styles.activeBadge}>Nu</span>}
                </div>
                <div className={styles.seasonMeta}>
                  <span>{s.element}</span>
                  <span>·</span>
                  <span>{s.monthLabel}</span>
                </div>
              </div>
              <span className={styles.arrow}>›</span>
            </div>
            <p className={styles.seasonDesc}>{s.description}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
