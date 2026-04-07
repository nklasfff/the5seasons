import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSeason } from '../context/SeasonContext';
import SeasonWheel from '../components/illustrations/SeasonWheel';
import GlassCard from '../components/common/GlassCard';
import LotusDivider from '../components/common/LotusDivider';
import styles from './SeasonsPage.module.css';

function getNextSeasonInfo(seasons, currentId) {
  const idx = seasons.findIndex(s => s.id === currentId);
  const next = seasons[(idx + 1) % seasons.length];
  const firstMonth = next.months[0];
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  let monthsUntil = firstMonth - currentMonth;
  if (monthsUntil <= 0) monthsUntil += 12;
  return { season: next, monthsUntil };
}

export default function SeasonsPage() {
  const { seasons, current } = useSeason();
  const navigate = useNavigate();

  const nextInfo = useMemo(() => getNextSeasonInfo(seasons, current.id), [seasons, current]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Udforsk</h1>
        <p className={styles.subtitle}>Fem sæsoner · Fem elementer · Fem energier</p>
      </header>

      <div className={styles.wheel}>
        <SeasonWheel size={220} />
      </div>

      <LotusDivider size={28} />

      {/* Next season countdown */}
      <div className={styles.nextSeason}>
        <span className={styles.nextLabel}>Næste sæson</span>
        <span className={styles.nextName} style={{ color: nextInfo.season.color }}>
          {nextInfo.season.name} · {nextInfo.season.element}
        </span>
        <span className={styles.nextTime}>om {nextInfo.monthsUntil} {nextInfo.monthsUntil === 1 ? 'måned' : 'måneder'}</span>
      </div>

      <div className={styles.cards}>
        {seasons.map((s, i) => {
          const isActive = s.id === current.id;
          return (
            <GlassCard
              key={s.id}
              glowColor={`${s.color}${isActive ? '20' : '08'}`}
              onClick={() => navigate(`/saesoner/${s.id}`)}
              className={`${styles.card} animate-fade-up-delay-${Math.min(i + 1, 3)}`}
            >
              <div className={styles.cardTop}>
                <div className={styles.circle} style={{ background: s.color, opacity: isActive ? 1 : 0.5 }}>
                  {s.chineseChar}
                </div>
                <div className={styles.cardInfo}>
                  <div className={styles.cardNameRow}>
                    <h3 className={styles.cardName}>{s.name}</h3>
                    {isActive && (
                      <span className={styles.activeBadge} style={{ color: s.color, background: `${s.color}12` }}>Nu</span>
                    )}
                  </div>
                  <p className={styles.cardMeta}>{s.element} · {s.monthLabel}</p>
                </div>
                <span className={styles.arrow}>›</span>
              </div>
              <p className={styles.cardDesc}>{s.description}</p>
              {isActive && (
                <p className={styles.cardEmotion}>
                  I balance: {s.emotion.balanced}
                </p>
              )}
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
