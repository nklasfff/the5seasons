import { useSeason } from '../context/SeasonContext';
import GlassCard from '../components/common/GlassCard';

export default function ProfilePage() {
  const { current, seasons } = useSeason();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
      <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: 'var(--space-md)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '2rem', color: 'var(--text-bright)' }}>
          Profil
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Din sæsonrejse
        </p>
      </div>

      <GlassCard className="animate-fade-up-delay-1" glowColor={current.glowColor}>
        <p style={{ fontSize: '0.65rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: 'var(--space-sm)' }}>
          Aktuel sæson
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%', background: current.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.4rem', color: 'white'
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

      <GlassCard className="animate-fade-up-delay-2">
        <p style={{ fontSize: '0.65rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
          Alle sæsoner
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {seasons.map(s => (
            <div key={s.id} style={{ textAlign: 'center' }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%', background: s.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', color: 'white', margin: '0 auto var(--space-xs)',
                opacity: s.id === current.id ? 1 : 0.4,
                boxShadow: s.id === current.id ? `0 2px 12px ${s.glowColor}` : 'none',
              }}>
                {s.chineseChar}
              </div>
              <p style={{
                fontSize: '0.6rem', fontWeight: 500, textTransform: 'uppercase',
                letterSpacing: '0.06em', color: s.id === current.id ? s.color : 'var(--text-muted)',
              }}>
                {s.name}
              </p>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="animate-fade-up-delay-3">
        <p style={{ fontSize: '0.65rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: 'var(--space-sm)' }}>
          Om De Fem Sæsoner
        </p>
        <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-primary)' }}>
          Baseret på Isabelle Evita Søndergaards arbejde med traditionel kinesisk medicin og vedisk filosofi.
          Appen guider dig gennem årets fem sæsoner med øvelser, refleksioner og visdom tilpasset den energi der naturligt hersker.
        </p>
      </GlassCard>
    </div>
  );
}
