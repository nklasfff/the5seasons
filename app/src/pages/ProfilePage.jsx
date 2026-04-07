import { useSeason } from '../context/SeasonContext';
import JourneyArc from '../components/illustrations/JourneyArc';
import GlassCard from '../components/common/GlassCard';
import Expandable from '../components/common/Expandable';

export default function ProfilePage() {
  const { current } = useSeason();

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 'var(--space-xl) var(--space-lg) var(--space-lg)' }}>
      <header style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }} className="animate-fade-up">
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '2rem', color: 'var(--text-bright)' }}>
          Profil
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Din sæsonrejse</p>
      </header>

      <div className="animate-fade-in" style={{ marginBottom: 'var(--space-xl)' }}>
        <JourneyArc size={300} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
        <GlassCard glowColor={`${current.color}20`} className="animate-fade-up-delay-1">
          <p style={{ fontSize: '0.65rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 'var(--space-sm)' }}>
            Aktuel sæson
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%', background: current.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem', color: 'white',
            }}>
              {current.chineseChar}
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 300, color: 'var(--text-bright)' }}>
                {current.name} · {current.element}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{current.monthLabel}</p>
            </div>
          </div>
        </GlassCard>

        <Expandable title="Om De Fem Sæsoner" subtitle="Isabelle Evita Søndergaard" glowColor={`${current.color}15`}>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: 'var(--text-primary)', marginBottom: 'var(--space-sm)' }}>
            Baseret på Isabelle Evita Søndergaards arbejde med traditionel kinesisk medicin og vedisk filosofi.
          </p>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: 'var(--text-primary)' }}>
            De fem sæsoner integrerer Wu Xing, organuret og mindfulness i et system for at leve i harmoni med årets naturlige rytmer.
          </p>
        </Expandable>
      </div>
    </div>
  );
}
