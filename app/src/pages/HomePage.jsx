import SeasonHero from '../components/home/SeasonHero';
import CurrentSeason from '../components/home/CurrentSeason';
import DailyWisdom from '../components/home/DailyWisdom';

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
      <SeasonHero />
      <CurrentSeason />
      <DailyWisdom />
    </div>
  );
}
