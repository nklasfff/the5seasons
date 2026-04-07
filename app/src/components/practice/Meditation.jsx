import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSeason } from '../../context/SeasonContext';
import GlassCard from '../common/GlassCard';
import styles from './Meditation.module.css';

const durations = [
  { label: '3 min', seconds: 180 },
  { label: '5 min', seconds: 300 },
  { label: '10 min', seconds: 600 },
];

export default function Meditation() {
  const { current } = useSeason();
  const navigate = useNavigate();
  const [durIdx, setDurIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(durations[0].seconds);
  const [phase, setPhase] = useState('inhale');
  const intervalRef = useRef(null);
  const breathRef = useRef(null);

  const selectDuration = (i) => {
    if (running) return;
    setDurIdx(i);
    setSeconds(durations[i].seconds);
  };

  useEffect(() => {
    if (running && seconds > 0) {
      intervalRef.current = setInterval(() => setSeconds(s => s - 1), 1000);
      breathRef.current = setInterval(() => {
        setPhase(p => p === 'inhale' ? 'exhale' : 'inhale');
      }, 4000);
    }
    if (seconds === 0) {
      setRunning(false);
      // Track completion
      const count = parseInt(localStorage.getItem('5seasons-meditation-count') || '0');
      localStorage.setItem('5seasons-meditation-count', count + 1);
    }
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(breathRef.current);
    };
  }, [running, seconds]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const reset = () => {
    setRunning(false);
    setSeconds(durations[durIdx].seconds);
    setPhase('inhale');
  };

  return (
    <div>
      <button className={styles.back} onClick={() => navigate('/praksis')}>‹ Praksis</button>
      <h1 className={`${styles.title} animate-fade-up`}>Pusterum</h1>

      {/* Duration selector */}
      <div className={`${styles.durationRow} animate-fade-up-delay-1`}>
        {durations.map((d, i) => (
          <button
            key={d.label}
            className={`${styles.durationBtn} ${i === durIdx ? styles.durationActive : ''}`}
            onClick={() => selectDuration(i)}
          >
            {d.label}
          </button>
        ))}
      </div>

      <GlassCard className="animate-fade-up-delay-2" glowColor={current.glowColor}>
        {/* Breathing visualization with outer rings */}
        <div className={styles.breatheWrap}>
          <svg className={styles.breatheRings} viewBox="0 0 220 220" width="220" height="220">
            {/* Outer guide ring */}
            <circle cx="110" cy="110" r="105" fill="none" stroke={current.color}
              strokeWidth="0.5" strokeDasharray="4 6" opacity={running ? 0.15 : 0.06}>
              <animateTransform attributeName="transform" type="rotate"
                values="0 110 110;360 110 110" dur="30s" repeatCount="indefinite" />
            </circle>
            {/* Middle breathing ring */}
            <circle cx="110" cy="110" r="95" fill="none" stroke={current.color}
              strokeWidth="0.8" opacity={running ? 0.12 : 0.04}>
              <animate attributeName="r" values={running ? (phase === 'inhale' ? '85;100' : '100;85') : '92;92'}
                dur="4s" fill="freeze" />
            </circle>
            {/* Inner glow */}
            <circle cx="110" cy="110" r="80" fill={current.color}
              opacity={running ? 0.04 : 0.02}>
              <animate attributeName="r" values={running ? (phase === 'inhale' ? '70;85' : '85;70') : '78;78'}
                dur="4s" fill="freeze" />
            </circle>
          </svg>
          <div
            className={`${styles.breatheCircle} ${styles[phase]}`}
            style={{
              background: `radial-gradient(circle, ${current.lightColor}40 0%, ${current.glowColor} 100%)`,
              border: `1px solid ${current.lightColor}60`,
              boxShadow: running ? `0 0 50px ${current.glowColor}, 0 0 100px ${current.glowColor}40` : 'none',
            }}
          >
            {running ? (phase === 'inhale' ? 'Indånd' : 'Udånd') : seconds === 0 ? 'Færdig' : 'Klar'}
          </div>
        </div>

        <p className={styles.timerDisplay}>
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </p>

        <div className={styles.controls}>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => seconds === 0 ? reset() : setRunning(!running)}
          >
            {seconds === 0 ? 'Igen' : running ? 'Pause' : seconds < durations[durIdx].seconds ? 'Fortsæt' : 'Start'}
          </button>
          {!running && seconds < durations[durIdx].seconds && seconds > 0 && (
            <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={reset}>
              Nulstil
            </button>
          )}
        </div>
      </GlassCard>

      <GlassCard className="animate-fade-up-delay-3" style={{ marginTop: 'var(--space-md)' }}>
        <p className={styles.instructionLabel}>Sæsonens meditation</p>
        <p className={styles.instruction}>{current.meditation}</p>
      </GlassCard>
    </div>
  );
}
