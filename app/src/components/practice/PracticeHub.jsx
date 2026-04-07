import { useNavigate } from 'react-router-dom';
import { useSeason } from '../../context/SeasonContext';
import GlassCard from '../common/GlassCard';
import { JournalIcon, MeditationIcon, OrganClockIcon } from '../illustrations/PracticeIcons';
import styles from './PracticeHub.module.css';

const practices = [
  { id: 'journal', Icon: JournalIcon, title: 'Journal', desc: 'Sæsonbaseret refleksion' },
  { id: 'meditation', Icon: MeditationIcon, title: 'Meditation', desc: 'Pusterum · 3-10 min' },
  { id: 'organur', Icon: OrganClockIcon, title: 'Organ-ur', desc: 'Kroppens naturlige rytme' },
];

export default function PracticeHub() {
  const { current } = useSeason();
  const navigate = useNavigate();

  return (
    <div>
      <div className={`${styles.header} animate-fade-up`}>
        <h1 className={styles.title}>Praksis</h1>
        <p className={styles.subtitle}>{current.name} · {current.element}</p>
      </div>

      <div className={styles.grid}>
        {practices.map((p, i) => (
          <GlassCard
            key={p.id}
            className={`${styles.practiceCard} animate-fade-up-delay-${i + 1}`}
            glowColor={current.glowColor}
            onClick={() => navigate(`/praksis/${p.id}`)}
          >
            <div className={styles.cardInner}>
              <div className={styles.iconWrap}>
                <p.Icon size={32} color={current.color} />
              </div>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.desc}</p>
            </div>
            <span className={styles.arrow}>→</span>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
