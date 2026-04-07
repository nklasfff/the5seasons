import { Link } from 'react-router-dom';
import GlassCard from '../common/GlassCard';
import { JournalIcon, MeditationIcon, OrganClockIcon } from '../illustrations/PracticeIcons';
import styles from './QuickPractice.module.css';

const practices = [
  { to: '/praksis/journal', Icon: JournalIcon, name: 'Journal' },
  { to: '/praksis/meditation', Icon: MeditationIcon, name: 'Meditation' },
  { to: '/praksis/organur', Icon: OrganClockIcon, name: 'Organ-ur' },
];

export default function QuickPractice() {
  return (
    <GlassCard>
      <p className={styles.label}>Start din praksis</p>
      <div className={styles.grid}>
        {practices.map(p => (
          <Link key={p.to} to={p.to} className={styles.item}>
            <span className={styles.icon}><p.Icon size={26} /></span>
            <span className={styles.name}>{p.name}</span>
          </Link>
        ))}
      </div>
    </GlassCard>
  );
}
