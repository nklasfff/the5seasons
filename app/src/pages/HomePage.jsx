import TimeGreeting from '../components/home/TimeGreeting';
import SeasonHero from '../components/home/SeasonHero';
import ElementCircle from '../components/illustrations/ElementCircle';
import CurrentSeason from '../components/home/CurrentSeason';
import OrganMini from '../components/home/OrganMini';
import DailyWisdom from '../components/home/DailyWisdom';
import QuickPractice from '../components/home/QuickPractice';
import SeasonFacts from '../components/home/SeasonFacts';

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
      <TimeGreeting />
      <SeasonHero />
      <div className="animate-scale-in" style={{ margin: 'var(--space-sm) 0' }}>
        <ElementCircle size={240} />
      </div>
      <CurrentSeason />
      <div className="animate-fade-up-delay-2">
        <OrganMini />
      </div>
      <DailyWisdom />
      <div className="animate-fade-up-delay-3">
        <QuickPractice />
      </div>
      <div className="animate-fade-up-delay-4">
        <SeasonFacts />
      </div>
    </div>
  );
}
