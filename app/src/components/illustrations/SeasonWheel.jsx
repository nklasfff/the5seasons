import { useSeason } from '../../context/SeasonContext';

const segments = [
  { id: 'foraar', name: 'Forår', color: '#5B8C5A', startMonth: 2, endMonth: 4 },
  { id: 'sommer', name: 'Sommer', color: '#C75A3A', startMonth: 5, endMonth: 7 },
  { id: 'sensommer', name: 'Sensommer', color: '#C9A84C', startMonth: 8, endMonth: 9 },
  { id: 'efteraar', name: 'Efterår', color: '#A8A8A0', startMonth: 10, endMonth: 11 },
  { id: 'vinter', name: 'Vinter', color: '#3A6FA0', startMonth: 12, endMonth: 1 },
];

const monthNames = ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec'];

function monthToAngle(month) {
  return ((month - 1) / 12) * 360 - 90;
}

function polarToXY(cx, cy, r, angleDeg) {
  const rad = angleDeg * Math.PI / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function arcPath(cx, cy, r, startAngle, endAngle) {
  const [x1, y1] = polarToXY(cx, cy, r, startAngle);
  const [x2, y2] = polarToXY(cx, cy, r, endAngle);
  const largeArc = (endAngle - startAngle) > 180 ? 1 : 0;
  return `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`;
}

export default function SeasonWheel({ size = 220 }) {
  const { current } = useSeason();
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.42;

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const dayProgress = now.getDate() / 30;
  const nowAngle = monthToAngle(currentMonth + dayProgress);
  const [markerX, markerY] = polarToXY(cx, cy, r + 8, nowAngle);

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ display: 'block', margin: '0 auto' }}>
      {/* Season segments */}
      {segments.map((seg) => {
        let startAngle = monthToAngle(seg.startMonth);
        let endAngle = monthToAngle(seg.endMonth + 1);
        if (endAngle <= startAngle) endAngle += 360;
        const isActive = seg.id === current.id;

        const midAngle = (startAngle + endAngle) / 2;
        const [labelX, labelY] = polarToXY(cx, cy, r * 0.65, midAngle);

        return (
          <g key={seg.id}>
            <path
              d={arcPath(cx, cy, r, startAngle, endAngle)}
              fill={seg.color}
              opacity={isActive ? 0.25 : 0.1}
              stroke={seg.color}
              strokeWidth={isActive ? 2 : 0.5}
              strokeOpacity={isActive ? 0.6 : 0.2}
            />
            <text
              x={labelX} y={labelY}
              textAnchor="middle" dominantBaseline="central"
              fontSize={isActive ? 9 : 8}
              fontWeight={isActive ? 500 : 400}
              fill={isActive ? seg.color : '#8A857E'}
              fontFamily="Inter, sans-serif"
            >
              {seg.name}
            </text>
          </g>
        );
      })}

      {/* Month labels around the edge */}
      {monthNames.map((name, i) => {
        const angle = monthToAngle(i + 1.5);
        const [mx, my] = polarToXY(cx, cy, r + 16, angle);
        return (
          <text
            key={i}
            x={mx} y={my}
            textAnchor="middle" dominantBaseline="central"
            fontSize="6"
            fill="#A09890"
            fontFamily="Inter, sans-serif"
          >
            {name}
          </text>
        );
      })}

      {/* Current position marker */}
      <circle cx={markerX} cy={markerY} r={4} fill={current.color}>
        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx={markerX} cy={markerY} r={8} fill={current.color} opacity="0.15">
        <animate attributeName="r" values="7;11;7" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Center text */}
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="8" fill="#9B7B5A"
        fontFamily="Cormorant Garamond, serif" fontWeight="300">årets</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="8" fill="#9B7B5A"
        fontFamily="Cormorant Garamond, serif" fontWeight="300">cyklus</text>
    </svg>
  );
}
