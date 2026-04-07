import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSeason } from '../../context/SeasonContext';
import GlassCard from '../common/GlassCard';
import styles from './PracticeHub.module.css';

const practices = [
  { id: 'journal', icon: '✎', title: 'Journal', desc: 'Sæsonbaseret refleksion og skrivning' },
  { id: 'meditation', icon: '◉', title: 'Meditation', desc: 'Pusterumsmeditationer · 3-5 min' },
  { id: 'organur', icon: '◷', title: 'Organ-ur', desc: 'Se hvilke organer der er aktive nu' },
];

export default function PracticeHub() {
  const { current } = useSeason();
  const navigate = useNavigate();
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('5seasons-mode');
    return saved ? Number(saved) : 50;
  });

  const handleMode = (e) => {
    const val = Number(e.target.value);
    setMode(val);
    localStorage.setItem('5seasons-mode', val);
  };

  return (
    <div>
      <div className={`${styles.header} animate-fade-up`}>
        <h1 className={styles.title}>Praksis</h1>
        <p className={styles.subtitle}>{current.name} · {current.element}</p>
      </div>

      <GlassCard className="animate-fade-up-delay-1">
        <p className={styles.modeLabel}>Dagens balance</p>
        <div className={styles.modeTrack}>
          <span className={styles.modeEnd}>Handle</span>
          <input
            type="range"
            min="0"
            max="100"
            value={mode}
            onChange={handleMode}
            className={styles.slider}
          />
          <span className={styles.modeEnd}>Være</span>
        </div>
      </GlassCard>

      <div className={styles.grid} style={{ marginTop: 'var(--space-md)' }}>
        {practices.map((p, i) => (
          <GlassCard
            key={p.id}
            className={`${styles.practiceCard} animate-fade-up-delay-${Math.min(i + 1, 3)}`}
            onClick={() => navigate(`/praksis/${p.id}`)}
          >
            <div className={styles.cardContent}>
              <div className={styles.icon}>{p.icon}</div>
              <div className={styles.cardText}>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.desc}</p>
              </div>
              <span className={styles.arrow}>›</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
