import { useSeason } from '../../context/SeasonContext';
import styles from './TimeGreeting.module.css';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 6) return 'God nat';
  if (h < 10) return 'God morgen';
  if (h < 13) return 'God formiddag';
  if (h < 17) return 'God eftermiddag';
  if (h < 21) return 'God aften';
  return 'God nat';
}

const months = ['januar','februar','marts','april','maj','juni','juli','august','september','oktober','november','december'];

export default function TimeGreeting() {
  const { current } = useSeason();
  const now = new Date();
  const dateStr = `${now.getDate()}. ${months[now.getMonth()]} ${now.getFullYear()}`;

  return (
    <div className={`${styles.greeting} animate-fade-down`}>
      <p className={styles.text}>
        {getGreeting()}, <span className={styles.season}>{current.name}</span>
      </p>
      <p className={styles.date}>{dateStr}</p>
    </div>
  );
}
