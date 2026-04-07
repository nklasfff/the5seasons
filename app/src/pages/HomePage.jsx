import TimeGreeting from '../components/home/TimeGreeting';
import SeasonHero from '../components/home/SeasonHero';
import CurrentSeason from '../components/home/CurrentSeason';
import DailyWisdom from '../components/home/DailyWisdom';
import LotusDivider from '../components/common/LotusDivider';

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
      <TimeGreeting />
      <SeasonHero />
      <LotusDivider />
      <CurrentSeason />
      <DailyWisdom />
    </div>
  );
}
