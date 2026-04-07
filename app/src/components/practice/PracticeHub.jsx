import { useNavigate } from 'react-router-dom';
import { useSeason } from '../../context/SeasonContext';
import PracticeMandala from '../illustrations/PracticeMandala';
import GlassCard from '../common/GlassCard';
import { JournalIcon, MeditationIcon, OrganClockIcon } from '../illustrations/PracticeIcons';
import styles from './PracticeHub.module.css';

const practices = [
  {
    id: 'journal',
    Icon: JournalIcon,
    title: 'Journal',
    desc: 'Sæsonbaseret refleksion og skrivning',
    hint: 'Skriv frit →',
  },
  {
    id: 'meditation',
    Icon: MeditationIcon,
    title: 'Meditation',
    desc: 'Pusterumsmeditationer tilpasset sæsonen',
    hint: 'Find ro →',
  },
  {
    id: 'organur',
    Icon: OrganClockIcon,
    title: 'Organ-ur',
    desc: 'Følg kroppens naturlige rytme time for time',
    hint: 'Se uret →',
  },
];

export default function PracticeHub() {
  const { current } = useSeason();
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.seasonLabel} style={{ color: current.color }}>{current.element}</p>
        <h1 className={styles.title}>Praksis</h1>
        <p className={styles.subtitle}>Øvelser for {current.name.toLowerCase()}</p>
      </header>

      <div className={styles.mandala}>
        <PracticeMandala size={160} />
      </div>

      <div className={styles.cards}>
        {practices.map((p, i) => (
          <GlassCard
            key={p.id}
            className={`${styles.card} animate-fade-up-delay-${i + 1}`}
            glowColor={`${current.color}15`}
            onClick={() => navigate(`/praksis/${p.id}`)}
          >
            <div className={styles.cardTop}>
              <div className={styles.iconWrap} style={{ color: current.color }}>
                <p.Icon size={28} color={current.color} />
              </div>
              <div className={styles.cardText}>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.desc}</p>
              </div>
            </div>
            <span className={styles.tapHint}>{p.hint}</span>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
