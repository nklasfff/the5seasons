import { useSeason } from '../../context/SeasonContext';
import GlowOrb from '../common/GlowOrb';
import GrainOverlay from '../common/GrainOverlay';
import BottomNav from './BottomNav';
import styles from './AppShell.module.css';

export default function AppShell({ children }) {
  const { current } = useSeason();

  return (
    <div className={styles.shell}>
      <GlowOrb color={current.lightColor} size={400} top="-150px" right="-100px" />
      <GlowOrb color={current.lightColor} size={300} bottom="10%" left="-80px" delay={5} />
      <GrainOverlay />
      <main className={styles.main}>
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
