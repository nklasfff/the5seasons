/**
 * Custom SVG icons for practice shortcuts.
 * Each icon is unique and hand-crafted — not text characters.
 * Used in QuickPractice and PracticeHub.
 */

export function JournalIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Book/notebook */}
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      {/* Writing lines */}
      <line x1="8" y1="7" x2="16" y2="7" opacity="0.5" />
      <line x1="8" y1="11" x2="14" y2="11" opacity="0.5" />
      {/* Pen stroke */}
      <line x1="8" y1="15" x2="11" y2="15" opacity="0.5" />
    </svg>
  );
}

export function MeditationIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
      {/* Person sitting in meditation */}
      <circle cx="12" cy="5" r="2.5" />
      <path d="M8 22v-3a4 4 0 014-4v0a4 4 0 014 4v3" />
      {/* Crossed legs hint */}
      <path d="M7 22h10" />
      {/* Breath/aura circles */}
      <circle cx="12" cy="12" r="7" opacity="0.2" strokeDasharray="2 3" />
      <circle cx="12" cy="12" r="10" opacity="0.1" strokeDasharray="1 4" />
    </svg>
  );
}

export function OrganClockIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
      {/* Clock circle */}
      <circle cx="12" cy="12" r="9" />
      {/* Yin-yang inspired divider */}
      <path d="M12 3a9 9 0 010 18" opacity="0.15" fill={color} />
      {/* Clock hands */}
      <line x1="12" y1="12" x2="12" y2="7" />
      <line x1="12" y1="12" x2="16" y2="12" />
      {/* Center dot */}
      <circle cx="12" cy="12" r="1" fill={color} />
      {/* 12 hour marks */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => {
        const rad = (deg - 90) * Math.PI / 180;
        const x1 = 12 + 8 * Math.cos(rad);
        const y1 = 12 + 8 * Math.sin(rad);
        const x2 = 12 + 9 * Math.cos(rad);
        const y2 = 12 + 9 * Math.sin(rad);
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} opacity="0.3" />;
      })}
    </svg>
  );
}
