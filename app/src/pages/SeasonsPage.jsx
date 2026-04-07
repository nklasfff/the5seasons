import SeasonWheel from '../components/illustrations/SeasonWheel';
import SeasonList from '../components/seasons/SeasonList';

export default function SeasonsPage() {
  return (
    <div>
      <div className="animate-scale-in" style={{ marginBottom: 'var(--space-md)' }}>
        <SeasonWheel size={200} />
      </div>
      <SeasonList />
    </div>
  );
}
