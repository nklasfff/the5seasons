import { Link } from 'react-router-dom';
import GlassCard from '../common/GlassCard';
import styles from './QuickPractice.module.css';

const practices = [
  { to: '/praksis/journal', icon: '✎', name: 'Journal' },
  { to: '/praksis/meditation', icon: '◉', name: 'Meditation' },
  { to: '/praksis/organur', icon: '◷', name: 'Organ-ur' },
];

export default function QuickPractice() {
  return (
    <GlassCard>
      <p className={styles.label}>Start din praksis</p>
      <div className={styles.grid}>
        {practices.map(p => (
          <Link key={p.to} to={p.to} className={styles.item}>
            <span className={styles.icon}>{p.icon}</span>
            <span className={styles.name}>{p.name}</span>
          </Link>
        ))}
      </div>
    </GlassCard>
  );
}
