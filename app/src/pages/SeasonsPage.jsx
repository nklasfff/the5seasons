import { useNavigate } from 'react-router-dom';
import { useSeason } from '../context/SeasonContext';
import SeasonWheel from '../components/illustrations/SeasonWheel';
import GlassCard from '../components/common/GlassCard';

export default function SeasonsPage() {
  const { seasons, current } = useSeason();
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 'var(--space-xl) var(--space-lg) var(--space-lg)' }}>
      <header style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }} className="animate-fade-up">
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '2rem', color: 'var(--text-bright)' }}>
          Sæsonerne
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Fem sæsoner · Fem elementer · Fem energier
        </p>
      </header>

      <div className="animate-fade-in" style={{ marginBottom: 'var(--space-xl)' }}>
        <SeasonWheel size={220} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
        {seasons.map((s, i) => (
          <GlassCard
            key={s.id}
            glowColor={`${s.color}15`}
            onClick={() => navigate(`/saesoner/${s.id}`)}
            className={`animate-fade-up-delay-${Math.min(i + 1, 3)}`}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-sm)' }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', background: s.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem', color: 'white', flexShrink: 0,
                opacity: s.id === current.id ? 1 : 0.6,
              }}>
                {s.chineseChar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 300, color: 'var(--text-bright)' }}>
                    {s.name}
                  </h3>
                  {s.id === current.id && (
                    <span style={{
                      fontSize: '0.6rem', fontWeight: 500, textTransform: 'uppercase',
                      letterSpacing: '0.06em', padding: '2px 8px', borderRadius: 'var(--radius-full)',
                      background: `${s.color}15`, color: s.color,
                    }}>Nu</span>
                  )}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {s.element} · {s.monthLabel}
                </p>
              </div>
              <span style={{ color: 'var(--text-dim)', fontSize: '1.2rem' }}>›</span>
            </div>
            <p style={{
              fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.7,
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
              {s.description}
            </p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
