import { useSeason } from '../../context/SeasonContext';

const elements = [
  { id: 'foraar', char: '木', name: 'Træ', color: '#5B8C5A', angle: -90 },
  { id: 'sommer', char: '火', name: 'Ild', color: '#C75A3A', angle: -18 },
  { id: 'sensommer', char: '土', name: 'Jord', color: '#C9A84C', angle: 54 },
  { id: 'efteraar', char: '金', name: 'Metal', color: '#A8A8A0', angle: 126 },
  { id: 'vinter', char: '水', name: 'Vand', color: '#3A6FA0', angle: 198 },
];

// Sheng cycle: Wood → Fire → Earth → Metal → Water → Wood
const shengPairs = [[0,1],[1,2],[2,3],[3,4],[4,0]];

export default function ElementCircle({ size = 260 }) {
  const { current } = useSeason();
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.34;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ display: 'block', margin: '0 auto' }}>
      {/* Sheng cycle connection lines */}
      {shengPairs.map(([a, b], i) => {
        const ax = cx + r * Math.cos(elements[a].angle * Math.PI / 180);
        const ay = cy + r * Math.sin(elements[a].angle * Math.PI / 180);
        const bx = cx + r * Math.cos(elements[b].angle * Math.PI / 180);
        const by = cy + r * Math.sin(elements[b].angle * Math.PI / 180);
        return (
          <line
            key={i}
            x1={ax} y1={ay} x2={bx} y2={by}
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="1"
          />
        );
      })}

      {/* Center label */}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="9" fill="#9B7B5A"
        fontFamily="Cormorant Garamond, serif" fontWeight="300">五行</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="7" fill="#A09890"
        fontFamily="Inter, sans-serif" fontWeight="400">Wu Xing</text>

      {/* Element circles */}
      {elements.map((el) => {
        const ex = cx + r * Math.cos(el.angle * Math.PI / 180);
        const ey = cy + r * Math.sin(el.angle * Math.PI / 180);
        const isActive = el.id === current.id;
        const circleR = isActive ? 28 : 24;

        return (
          <g key={el.id}>
            {/* Glow behind active */}
            {isActive && (
              <circle cx={ex} cy={ey} r={36} fill={el.color} opacity="0.08">
                <animate attributeName="r" values="34;40;34" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.08;0.15;0.08" dur="3s" repeatCount="indefinite" />
              </circle>
            )}

            {/* Circle */}
            <circle
              cx={ex} cy={ey} r={circleR}
              fill={el.color}
              opacity={isActive ? 1 : 0.35}
            >
              {isActive && (
                <animate attributeName="r" values="27;30;27" dur="4s" repeatCount="indefinite" />
              )}
            </circle>

            {/* Chinese character */}
            <text
              x={ex} y={ey + 1}
              textAnchor="middle" dominantBaseline="central"
              fontSize={isActive ? 18 : 15}
              fontWeight="300"
              fill="white"
              fontFamily="serif"
            >
              {el.char}
            </text>

            {/* Name label */}
            <text
              x={ex} y={ey + circleR + 14}
              textAnchor="middle"
              fontSize="8"
              fontWeight={isActive ? 500 : 400}
              fill={isActive ? el.color : '#A09890'}
              fontFamily="Inter, sans-serif"
              style={{ textTransform: 'uppercase' }}
              letterSpacing="0.06em"
            >
              {el.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
