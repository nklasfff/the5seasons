import { useNavigate } from 'react-router-dom';
import { useSeason } from '../../context/SeasonContext';
import styles from './SeasonNav.module.css';

export default function SeasonNav({ currentId }) {
  const { seasons } = useSeason();
  const navigate = useNavigate();
  const idx = seasons.findIndex(s => s.id === currentId);
  const prev = seasons[(idx - 1 + seasons.length) % seasons.length];
  const next = seasons[(idx + 1) % seasons.length];

  return (
    <nav className={styles.nav}>
      <button className={styles.btn} onClick={() => navigate(`/saesoner/${prev.id}`)}>
        <span className={`${styles.arrow} ${styles.arrowLeft}`}>‹</span>
        {prev.name}
      </button>
      <span className={styles.center}>Sæsoner</span>
      <button className={styles.btn} onClick={() => navigate(`/saesoner/${next.id}`)}>
        {next.name}
        <span className={`${styles.arrow} ${styles.arrowRight}`}>›</span>
      </button>
    </nav>
  );
}
