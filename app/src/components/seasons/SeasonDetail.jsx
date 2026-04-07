import { useNavigate, useParams } from 'react-router-dom';
import { useSeason } from '../../context/SeasonContext';
import GlassCard from '../common/GlassCard';
import styles from './SeasonDetail.module.css';

export default function SeasonDetail() {
  const { id } = useParams();
  const { seasons } = useSeason();
  const navigate = useNavigate();
  const season = seasons.find(s => s.id === id);

  if (!season) return <p>Sæson ikke fundet</p>;

  return (
    <div style={{ '--accent': season.color, '--accent-light': season.lightColor, '--accent-glow': season.glowColor }}>
      <button className={styles.back} onClick={() => navigate('/saesoner')}>
        ‹ Sæsoner
      </button>

      <div className={`${styles.header} animate-fade-up`}>
        <div className={styles.circle} style={{ background: season.color }}>
          {season.chineseChar}
        </div>
        <h1 className={styles.name}>{season.name}</h1>
        <p className={styles.meta}>{season.element} · {season.monthLabel} · {season.direction}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        <GlassCard className="animate-fade-up-delay-1" glowColor={season.glowColor}>
          <div className={styles.section}>
            <p className={styles.sectionLabel}>Om denne sæson</p>
            <p className={styles.sectionText}>{season.description}</p>
          </div>
        </GlassCard>

        <GlassCard glowColor={season.glowColor}>
          <p className={styles.sectionLabel}>Organer</p>
          <div className={styles.organsGrid}>
            <div className={styles.organBox}>
              <p className={styles.organType}>Yin</p>
              <p className={styles.organName}>{season.organs.yin}</p>
            </div>
            <div className={styles.organBox}>
              <p className={styles.organType}>Yang</p>
              <p className={styles.organName}>{season.organs.yang}</p>
            </div>
          </div>
          <div style={{ marginTop: 'var(--space-sm)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {season.tissue} · Smag: {season.flavor} · Klima: {season.climate}
          </div>
        </GlassCard>

        <GlassCard glowColor={season.glowColor}>
          <p className={styles.sectionLabel}>Følelser</p>
          <div className={styles.emotionRow}>
            <div className={styles.emotionBox}>
              <p className={styles.emotionType}>I balance</p>
              <p className={styles.emotionText}>{season.emotion.balanced}</p>
            </div>
            <div className={styles.emotionBox}>
              <p className={styles.emotionType}>Ubalance</p>
              <p className={styles.emotionText}>{season.emotion.imbalanced}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard glowColor={season.glowColor}>
          <p className={styles.sectionLabel}>Fødevarer</p>
          <div className={styles.foodList}>
            {season.foods.map(f => (
              <span key={f} className={styles.foodTag}>{f}</span>
            ))}
          </div>
        </GlassCard>

        <GlassCard glowColor={season.glowColor}>
          <div className={styles.section}>
            <p className={styles.sectionLabel}>Yoga</p>
            <p className={styles.sectionText}>{season.yoga}</p>
          </div>
        </GlassCard>

        <GlassCard glowColor={season.glowColor}>
          <div className={styles.section}>
            <p className={styles.sectionLabel}>Åndedræt</p>
            <p className={styles.sectionText}>{season.breathing}</p>
          </div>
        </GlassCard>

        <GlassCard glowColor={season.glowColor}>
          <div className={styles.section}>
            <p className={styles.sectionLabel}>Meditation</p>
            <p className={styles.sectionText}>{season.meditation}</p>
          </div>
        </GlassCard>

        <GlassCard glowColor={season.glowColor}>
          <div className={styles.section}>
            <p className={styles.sectionLabel}>Akupressur</p>
            <p className={styles.sectionText}>{season.acupressure}</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
