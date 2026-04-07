import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSeason } from '../../context/SeasonContext';
import GlassCard from '../common/GlassCard';
import styles from './Meditation.module.css';

export default function Meditation() {
  const { current } = useSeason();
  const navigate = useNavigate();
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(180); // 3 min default
  const [phase, setPhase] = useState('inhale');
  const intervalRef = useRef(null);
  const breathRef = useRef(null);

  useEffect(() => {
    if (running && seconds > 0) {
      intervalRef.current = setInterval(() => setSeconds(s => s - 1), 1000);
      breathRef.current = setInterval(() => {
        setPhase(p => p === 'inhale' ? 'exhale' : 'inhale');
      }, 4000);
    }
    if (seconds === 0) setRunning(false);
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(breathRef.current);
    };
  }, [running, seconds]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const reset = () => {
    setRunning(false);
    setSeconds(180);
    setPhase('inhale');
  };

  return (
    <div>
      <button className={styles.back} onClick={() => navigate('/praksis')}>‹ Praksis</button>
      <h1 className={`${styles.title} animate-fade-up`}>Pusterum</h1>

      <GlassCard className="animate-fade-up-delay-1" glowColor={current.glowColor}>
        <div
          className={`${styles.breatheCircle} ${styles[phase]}`}
          style={{ background: current.glowColor, border: `1px solid ${current.lightColor}` }}
        >
          {running ? (phase === 'inhale' ? 'Indånd' : 'Udånd') : 'Klar'}
        </div>

        <p className={styles.timerDisplay}>
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </p>

        <div className={styles.controls}>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => setRunning(!running)}
          >
            {running ? 'Pause' : seconds < 180 ? 'Fortsæt' : 'Start'}
          </button>
          {!running && seconds < 180 && (
            <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={reset}>
              Nulstil
            </button>
          )}
        </div>

        <p className={styles.instruction}>{current.meditation}</p>
      </GlassCard>
    </div>
  );
}
