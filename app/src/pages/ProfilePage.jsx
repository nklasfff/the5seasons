import { useMemo } from 'react';
import { useSeason } from '../context/SeasonContext';
import JourneyArc from '../components/illustrations/JourneyArc';
import GlassCard from '../components/common/GlassCard';
import Expandable from '../components/common/Expandable';

export default function ProfilePage() {
  const { current, seasons } = useSeason();

  const stats = useMemo(() => ({
    meditations: parseInt(localStorage.getItem('5seasons-meditation-count') || '0'),
    journals: parseInt(localStorage.getItem('5seasons-journal-count') || '0'),
  }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
      <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: 'var(--space-sm)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '2rem', color: 'var(--text-bright)' }}>
          Profil
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Din sæsonrejse
        </p>
      </div>

      {/* Journey Arc — unique to profile */}
      <div className="animate-scale-in">
        <JourneyArc size={300} />
      </div>

      {/* Current season */}
      <GlassCard className="animate-fade-up-delay-1" glowColor={current.glowColor}>
        <p style={{ fontSize: '0.65rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: 'var(--space-sm)' }}>
          Aktuel sæson
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%', background: current.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.4rem', color: 'white', textShadow: '0 0 20px rgba(255,255,255,0.3)',
          }}>
            {current.chineseChar}
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 300, color: 'var(--text-bright)' }}>
              {current.name} · {current.element}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {current.monthLabel}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Season journey */}
      <GlassCard className="animate-fade-up-delay-2">
        <p style={{ fontSize: '0.65rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
          Sæsonernes cyklus
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {seasons.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', background: s.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.9rem', color: 'white',
                opacity: s.id === current.id ? 1 : 0.35,
                boxShadow: s.id === current.id ? `0 0 16px ${s.glowColor}` : 'none',
                transition: 'all 0.3s ease',
              }}>
                {s.chineseChar}
              </div>
              {i < seasons.length - 1 && (
                <div style={{ position: 'absolute', width: 20, height: 1, background: 'var(--border)' }} />
              )}
              <p style={{
                fontSize: '0.55rem', fontWeight: 500, textTransform: 'uppercase',
                letterSpacing: '0.04em', color: s.id === current.id ? s.color : 'var(--text-dim)',
              }}>
                {s.name}
              </p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Stats */}
      {(stats.meditations > 0 || stats.journals > 0) && (
        <GlassCard className="animate-fade-up-delay-3">
          <p style={{ fontSize: '0.65rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: 'var(--space-sm)' }}>
            Din praksis
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-sm)' }}>
            <div style={{ textAlign: 'center', padding: 'var(--space-sm)' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--accent)' }}>
                {stats.meditations}
              </p>
              <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
                Meditationer
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: 'var(--space-sm)' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--accent)' }}>
                {stats.journals}
              </p>
              <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
                Journal-indlæg
              </p>
            </div>
          </div>
        </GlassCard>
      )}

      {/* About - expandable */}
      <Expandable title="Om De Fem Sæsoner" subtitle="Isabelle Evita Søndergaard" glowColor={current.glowColor}>
        <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-primary)', marginBottom: 'var(--space-sm)' }}>
          Baseret på Isabelle Evita Søndergaards arbejde med traditionel kinesisk medicin og vedisk filosofi.
        </p>
        <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-primary)' }}>
          De fem sæsoner integrerer Wu Xing (fem elementer), organuret og mindfulness-principper
          i et praktisk system for at leve i harmoni med årets naturlige rytmer.
          Appen guider dig gennem hver sæson med øvelser, refleksioner og visdom.
        </p>
      </Expandable>
    </div>
  );
}
