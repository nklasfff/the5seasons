/**
 * Personal season journey visualization.
 * Shows a flowing arc through the 5 seasons with the user's current position.
 * Unlike ElementCircle (which shows element relationships),
 * this shows the linear progression through the year.
 */
import { useSeason } from '../../context/SeasonContext';

const seasonData = [
  { id: 'foraar', name: 'Forår', char: '木', color: '#5B8C5A' },
  { id: 'sommer', name: 'Sommer', char: '火', color: '#C75A3A' },
  { id: 'sensommer', name: 'Sensommer', char: '土', color: '#C9A84C' },
  { id: 'efteraar', name: 'Efterår', char: '金', color: '#A8A8A0' },
  { id: 'vinter', name: 'Vinter', char: '水', color: '#3A6FA0' },
];

export default function JourneyArc({ size = 280 }) {
  const { current } = useSeason();
  const w = size;
  const h = size * 0.55;
  const padX = 30;
  const arcY = h * 0.35;
  const baseY = h * 0.7;

  // Sine-wave arc positions
  const points = seasonData.map((s, i) => {
    const t = i / (seasonData.length - 1);
    const x = padX + t * (w - padX * 2);
    const y = baseY - Math.sin(t * Math.PI) * (baseY - arcY);
    return { ...s, x, y };
  });

  // Path through all points
  const pathD = points.reduce((d, p, i) => {
    if (i === 0) return `M${p.x},${p.y}`;
    const prev = points[i - 1];
    const cpx = (prev.x + p.x) / 2;
    return d + ` Q${cpx},${Math.min(prev.y, p.y) - 15} ${p.x},${p.y}`;
  }, '');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{ display: 'block', margin: '0 auto' }}>
      {/* Background arc path */}
      <path d={pathD} fill="none" stroke="var(--line-subtle, rgba(255,255,255,0.12))" strokeWidth="2" strokeLinecap="round" />

      {/* Animated traveling particle */}
      <circle r="2.5" fill={current.color} opacity="0.4">
        <animateMotion dur="8s" repeatCount="indefinite" path={pathD} />
      </circle>

      {/* Season nodes */}
      {points.map((p) => {
        const isActive = p.id === current.id;
        const r = isActive ? 16 : 11;
        return (
          <g key={p.id}>
            {/* Glow ring for active */}
            {isActive && (
              <circle cx={p.x} cy={p.y} r={24} fill={p.color} opacity="0.06">
                <animate attributeName="r" values="22;28;22" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.04;0.1;0.04" dur="3s" repeatCount="indefinite" />
              </circle>
            )}

            {/* Node circle */}
            <circle cx={p.x} cy={p.y} r={r} fill={p.color} opacity={isActive ? 0.9 : 0.2}>
              {isActive && <animate attributeName="r" values="15;17;15" dur="3s" repeatCount="indefinite" />}
            </circle>

            {/* Chinese character */}
            <text x={p.x} y={p.y + 1} textAnchor="middle" dominantBaseline="central"
              fontSize={isActive ? 12 : 9} fill="white" fontFamily="serif" fontWeight="300"
              opacity={isActive ? 1 : 0.8}>
              {p.char}
            </text>

            {/* Name below */}
            <text x={p.x} y={p.y + r + 12} textAnchor="middle"
              fontSize="7" fill={isActive ? p.color : '#A09890'}
              fontFamily="Inter, sans-serif" fontWeight={isActive ? 500 : 400}>
              {p.name}
            </text>
          </g>
        );
      })}

      {/* "Din rejse" label */}
      <text x={w / 2} y={h - 4} textAnchor="middle" fontSize="7" fill="var(--text-dim, #A09890)"
        fontFamily="Inter, sans-serif" fontWeight="400" letterSpacing="0.08em"
        style={{ textTransform: 'uppercase' }}>
        din sæsonrejse
      </text>
    </svg>
  );
}
