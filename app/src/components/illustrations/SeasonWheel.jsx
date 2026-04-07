/**
 * Annual cycle wheel showing the 5 seasons.
 * Rich visualization with:
 * - Gradient-filled arc segments
 * - Organ pairs labeled per segment
 * - Pulsing current-position marker with trail
 * - Inner ring with element characters
 * - Month labels around the perimeter
 */
import { useSeason } from '../../context/SeasonContext';

const segments = [
  { id: 'foraar', name: 'Forår', char: '木', color: '#5B8C5A', startMonth: 2, endMonth: 4, organs: 'Lever · Galdeblære' },
  { id: 'sommer', name: 'Sommer', char: '火', color: '#C75A3A', startMonth: 5, endMonth: 7, organs: 'Hjerte · Tyndtarm' },
  { id: 'sensommer', name: 'Sensommer', char: '土', color: '#C9A84C', startMonth: 8, endMonth: 9, organs: 'Milt · Mave' },
  { id: 'efteraar', name: 'Efterår', char: '金', color: '#A8A8A0', startMonth: 10, endMonth: 11, organs: 'Lunger · Tyktarm' },
  { id: 'vinter', name: 'Vinter', char: '水', color: '#3A6FA0', startMonth: 12, endMonth: 1, organs: 'Nyrer · Blære' },
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

function arcLine(cx, cy, r1, r2, startAngle, endAngle) {
  const [x1, y1] = polarToXY(cx, cy, r1, startAngle);
  const [x2, y2] = polarToXY(cx, cy, r2, startAngle);
  const [x3, y3] = polarToXY(cx, cy, r2, endAngle);
  const [x4, y4] = polarToXY(cx, cy, r1, endAngle);
  const largeArc = (endAngle - startAngle) > 180 ? 1 : 0;
  return `M${x1},${y1} A${r1},${r1} 0 ${largeArc},1 ${x4},${y4} L${x3},${y3} A${r2},${r2} 0 ${largeArc},0 ${x2},${y2} Z`;
}

export default function SeasonWheel({ size = 240 }) {
  const { current } = useSeason();
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.42;
  const innerR = size * 0.24;

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const dayProgress = now.getDate() / 30;
  const nowAngle = monthToAngle(currentMonth + dayProgress);
  const [markerX, markerY] = polarToXY(cx, cy, outerR + 6, nowAngle);

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ display: 'block', margin: '0 auto' }}>
      {/* Outer decorative ring */}
      <circle cx={cx} cy={cy} r={outerR + 14} fill="none" stroke="var(--line-faint, rgba(255,255,255,0.06))" strokeWidth="0.5" />

      {/* Season ring segments */}
      {segments.map((seg) => {
        let startAngle = monthToAngle(seg.startMonth);
        let endAngle = monthToAngle(seg.endMonth + 1);
        if (endAngle <= startAngle) endAngle += 360;
        const isActive = seg.id === current.id;

        const midAngle = (startAngle + endAngle) / 2;
        const [nameX, nameY] = polarToXY(cx, cy, (outerR + innerR) / 2, midAngle);
        const [charX, charY] = polarToXY(cx, cy, innerR - 12, midAngle);

        return (
          <g key={seg.id}>
            {/* Ring segment */}
            <path
              d={arcLine(cx, cy, innerR, outerR, startAngle, endAngle)}
              fill={seg.color}
              opacity={isActive ? 0.18 : 0.06}
              stroke={seg.color}
              strokeWidth={isActive ? 1.5 : 0.5}
              strokeOpacity={isActive ? 0.5 : 0.15}
            />

            {/* Season name in the ring */}
            <text x={nameX} y={nameY - 2} textAnchor="middle" dominantBaseline="central"
              fontSize={isActive ? 9 : 7.5} fontWeight={isActive ? 500 : 400}
              fill={isActive ? seg.color : 'var(--text-muted, #8A857E)'} fontFamily="Inter, sans-serif">
              {seg.name}
            </text>

            {/* Organ pair below name */}
            {isActive && (
              <text x={nameX} y={nameY + 9} textAnchor="middle"
                fontSize="5.5" fill={seg.color} opacity="0.7"
                fontFamily="Inter, sans-serif">
                {seg.organs}
              </text>
            )}

            {/* Element character inside inner ring */}
            <text x={charX} y={charY} textAnchor="middle" dominantBaseline="central"
              fontSize={isActive ? 13 : 10} fill={seg.color}
              opacity={isActive ? 0.7 : 0.2} fontFamily="serif" fontWeight="300">
              {seg.char}
            </text>
          </g>
        );
      })}

      {/* Inner circle border */}
      <circle cx={cx} cy={cy} r={innerR} fill="none" stroke="var(--line-faint, rgba(255,255,255,0.06))" strokeWidth="0.5" />
      <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="var(--line-faint, rgba(255,255,255,0.06))" strokeWidth="0.5" />

      {/* Month labels */}
      {monthNames.map((name, i) => {
        const angle = monthToAngle(i + 1.5);
        const [mx, my] = polarToXY(cx, cy, outerR + 12, angle);
        return (
          <text key={i} x={mx} y={my} textAnchor="middle" dominantBaseline="central"
            fontSize="5.5" fill="var(--text-dim, #A09890)" fontFamily="Inter, sans-serif">
            {name}
          </text>
        );
      })}

      {/* Current position marker */}
      <circle cx={markerX} cy={markerY} r={5} fill={current.color}>
        <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx={markerX} cy={markerY} r={10} fill={current.color} opacity="0.12">
        <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.12;0.04;0.12" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Center text */}
      <text x={cx} y={cy - 3} textAnchor="middle" fontSize="9" fill="var(--text-secondary, #9B7B5A)"
        fontFamily="Cormorant Garamond, serif" fontWeight="300">årets</text>
      <text x={cx} y={cy + 9} textAnchor="middle" fontSize="9" fill="var(--text-secondary, #9B7B5A)"
        fontFamily="Cormorant Garamond, serif" fontWeight="300">cyklus</text>
    </svg>
  );
}
