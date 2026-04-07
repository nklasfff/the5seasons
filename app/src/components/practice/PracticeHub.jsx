import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSeason } from '../../context/SeasonContext';
import GlassCard from '../common/GlassCard';
import Expandable from '../common/Expandable';
import PracticeMandala from '../illustrations/PracticeMandala';
import { JournalIcon, MeditationIcon, OrganClockIcon } from '../illustrations/PracticeIcons';
import styles from './PracticeHub.module.css';

const organs = [
  { time: '23-01', name: 'Galdeblære' }, { time: '01-03', name: 'Lever' },
  { time: '03-05', name: 'Lunger' }, { time: '05-07', name: 'Tyktarm' },
  { time: '07-09', name: 'Mave' }, { time: '09-11', name: 'Milt' },
  { time: '11-13', name: 'Hjerte' }, { time: '13-15', name: 'Tyndtarm' },
  { time: '15-17', name: 'Blære' }, { time: '17-19', name: 'Nyrer' },
  { time: '19-21', name: 'Perikardium' }, { time: '21-23', name: 'Tre Varmere' },
];

function getActiveOrgan() {
  const h = new Date().getHours();
  if (h >= 23 || h < 1) return organs[0];
  return organs[Math.floor((h < 23 ? h : 0) / 2) - (h < 1 ? 0 : 0)] || organs[Math.min(Math.floor(h / 2), 11)];
}

// Simple organ lookup
function getOrganNow() {
  const h = new Date().getHours();
  const idx = [23,1,3,5,7,9,11,13,15,17,19,21].findIndex((start, i, arr) => {
    const end = arr[(i+1) % arr.length];
    if (start > end) return h >= start || h < end;
    return h >= start && h < end;
  });
  return organs[idx >= 0 ? idx : 0];
}

const practices = [
  { id: 'journal', Icon: JournalIcon, title: 'Journal', desc: 'Sæsonbaseret refleksion og skrivning' },
  { id: 'meditation', Icon: MeditationIcon, title: 'Meditation', desc: 'Pusterumsmeditationer · 3-10 min' },
  { id: 'organur', Icon: OrganClockIcon, title: 'Organ-ur', desc: 'Se hvilke organer der er aktive nu' },
];

export default function PracticeHub() {
  const { current } = useSeason();
  const navigate = useNavigate();
  const activeOrgan = getOrganNow();
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('5seasons-mode');
    return saved ? Number(saved) : 50;
  });

  const handleMode = (e) => {
    const val = Number(e.target.value);
    setMode(val);
    localStorage.setItem('5seasons-mode', val);
  };

  const modeLabel = mode < 30 ? 'Handle-modus' : mode > 70 ? 'Værens-modus' : 'Balanceret';

  return (
    <div>
      <div className="animate-scale-in" style={{ marginBottom: 'var(--space-sm)' }}>
        <PracticeMandala size={180} />
      </div>
      <div className={`${styles.header} animate-fade-up`}>
        <h1 className={styles.title}>Praksis</h1>
        <p className={styles.subtitle}>{current.name} · {current.element}</p>
      </div>

      {/* Organ recommendation */}
      <GlassCard className="animate-fade-up-delay-1" glowColor={current.glowColor}>
        <div className={styles.recommendation}>
          <div className={styles.recDot} style={{ background: current.color }} />
          <div>
            <p className={styles.recLabel}>Organ-uret foreslår</p>
            <p className={styles.recText}>{activeOrgan.name} er aktiv ({activeOrgan.time})</p>
          </div>
        </div>
      </GlassCard>

      {/* Balance slider */}
      <GlassCard className="animate-fade-up-delay-1" style={{ marginTop: 'var(--space-md)' }}>
        <p className={styles.modeLabel}>Dagens balance</p>
        <div className={styles.modeTrack}>
          <span className={styles.modeEnd} style={{ color: mode < 30 ? current.color : undefined }}>Handle</span>
          <input
            type="range" min="0" max="100" value={mode}
            onChange={handleMode} className={styles.slider}
          />
          <span className={styles.modeEnd} style={{ color: mode > 70 ? current.color : undefined }}>Være</span>
        </div>
        <p className={styles.modeResult}>{modeLabel}</p>
      </GlassCard>

      {/* Practice cards */}
      <div className={styles.grid}>
        {practices.map((p, i) => (
          <GlassCard
            key={p.id}
            className={`${styles.practiceCard} animate-fade-up-delay-${Math.min(i + 2, 3)}`}
            onClick={() => navigate(`/praksis/${p.id}`)}
          >
            <div className={styles.cardContent}>
              <div className={styles.icon}><p.Icon size={22} /></div>
              <div className={styles.cardText}>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.desc}</p>
              </div>
              <span className={styles.arrow}>›</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Season exercises - expandable */}
      <div style={{ marginTop: 'var(--space-md)' }}>
        <Expandable title="Sæsonens yoga" subtitle={current.element} glowColor={current.glowColor}>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-primary)' }}>{current.yoga}</p>
        </Expandable>
      </div>
      <div style={{ marginTop: 'var(--space-sm)' }}>
        <Expandable title="Sæsonens åndedræt" subtitle={current.element} glowColor={current.glowColor}>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-primary)' }}>{current.breathing}</p>
        </Expandable>
      </div>
    </div>
  );
}
