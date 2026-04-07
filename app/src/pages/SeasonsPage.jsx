import SeasonWheel from '../components/illustrations/SeasonWheel';
import SeasonList from '../components/seasons/SeasonList';

export default function SeasonsPage() {
  return (
    <div>
      <div className="animate-scale-in" style={{ marginBottom: 'var(--space-xl)' }}>
        <SeasonWheel size={220} />
      </div>
      <SeasonList />
    </div>
  );
}
