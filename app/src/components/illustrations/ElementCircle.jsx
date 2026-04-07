/**
 * Wu Xing (Five Elements) relationship diagram.
 * Shows both the Sheng (nurturing) cycle as curved arrows
 * and the Ko (controlling) cycle as inner lines.
 * The active season pulses with layered glow rings.
 * Each element has a unique ring pattern reflecting its nature.
 */
import { useSeason } from '../../context/SeasonContext';

const elements = [
  { id: 'foraar', char: '木', name: 'Træ', color: '#5B8C5A', angle: -90, nature: 'grow' },
  { id: 'sommer', char: '火', name: 'Ild', color: '#C75A3A', angle: -18, nature: 'radiate' },
  { id: 'sensommer', char: '土', name: 'Jord', color: '#C9A84C', angle: 54, nature: 'center' },
  { id: 'efteraar', char: '金', name: 'Metal', color: '#A8A8A0', angle: 126, nature: 'refine' },
  { id: 'vinter', char: '水', name: 'Vand', color: '#3A6FA0', angle: 198, nature: 'flow' },
];

// Sheng (nurturing): Wood→Fire→Earth→Metal→Water→Wood
const shengPairs = [[0,1],[1,2],[2,3],[3,4],[4,0]];
// Ko (controlling): Wood→Earth, Earth→Water, Water→Fire, Fire→Metal, Metal→Wood
const koPairs = [[0,2],[2,4],[4,1],[1,3],[3,0]];

function getPos(cx, cy, r, angleDeg) {
  const rad = angleDeg * Math.PI / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

// Curved arrow path between two points
function curvedArrow(ax, ay, bx, by, bulge = 15) {
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const dx = bx - ax;
  const dy = by - ay;
  const nx = -dy / Math.sqrt(dx * dx + dy * dy) * bulge;
  const ny = dx / Math.sqrt(dx * dx + dy * dy) * bulge;
  return `M${ax},${ay} Q${mx + nx},${my + ny} ${bx},${by}`;
}

export default function ElementCircle({ size = 260 }) {
  const { current } = useSeason();
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.34;
  const activeIdx = elements.findIndex(e => e.id === current.id);

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ display: 'block', margin: '0 auto' }}>
      {/* Outer decorative ring */}
      <circle cx={cx} cy={cy} r={r + 35} fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="0.5" />

      {/* Ko cycle (controlling) — dashed inner lines */}
      {koPairs.map(([a, b], i) => {
        const [ax, ay] = getPos(cx, cy, r, elements[a].angle);
        const [bx, by] = getPos(cx, cy, r, elements[b].angle);
        return (
          <line key={`ko-${i}`} x1={ax} y1={ay} x2={bx} y2={by}
            stroke="var(--line-faint, rgba(255,255,255,0.06))" strokeWidth="0.5" strokeDasharray="3 4" />
        );
      })}

      {/* Sheng cycle (nurturing) — curved paths with traveling particles */}
      {shengPairs.map(([a, b], i) => {
        const [ax, ay] = getPos(cx, cy, r, elements[a].angle);
        const [bx, by] = getPos(cx, cy, r, elements[b].angle);
        const path = curvedArrow(ax, ay, bx, by, 20);
        const isActiveEdge = a === activeIdx;
        return (
          <g key={`sheng-${i}`}>
            <path d={path} fill="none" stroke={isActiveEdge ? elements[a].color : 'var(--line-subtle, rgba(255,255,255,0.12))'}
              strokeWidth={isActiveEdge ? 1.5 : 0.8} strokeLinecap="round"
              opacity={isActiveEdge ? 0.4 : 1} />
            {/* Traveling energy dot on active Sheng edge */}
            {isActiveEdge && (
              <circle r="2" fill={elements[a].color} opacity="0.5">
                <animateMotion dur="3s" repeatCount="indefinite" path={path} />
              </circle>
            )}
          </g>
        );
      })}

      {/* Center — Wu Xing symbol */}
      <circle cx={cx} cy={cy} r="18" fill="none" stroke="var(--line-faint, rgba(255,255,255,0.06))" strokeWidth="0.5" />
      <text x={cx} y={cy - 5} textAnchor="middle" fontSize="11" fill="var(--text-secondary, #9B7B5A)"
        fontFamily="Cormorant Garamond, serif" fontWeight="300">五行</text>
      <text x={cx} y={cy + 9} textAnchor="middle" fontSize="6.5" fill="var(--text-muted, #A09890)"
        fontFamily="Inter, sans-serif" fontWeight="400" letterSpacing="0.06em">Wu Xing</text>

      {/* Element nodes */}
      {elements.map((el, idx) => {
        const [ex, ey] = getPos(cx, cy, r, el.angle);
        const isActive = el.id === current.id;
        const baseR = isActive ? 26 : 20;

        return (
          <g key={el.id}>
            {/* Multi-layered glow for active */}
            {isActive && (
              <>
                <circle cx={ex} cy={ey} r={42} fill={el.color} opacity="0.03">
                  <animate attributeName="r" values="38;46;38" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx={ex} cy={ey} r={34} fill={el.color} opacity="0.06">
                  <animate attributeName="r" values="32;38;32" dur="3.5s" repeatCount="indefinite" />
                </circle>
              </>
            )}

            {/* Decorative ring per element nature */}
            {isActive && el.nature === 'grow' && (
              <circle cx={ex} cy={ey} r={baseR + 6} fill="none" stroke={el.color}
                strokeWidth="0.8" strokeDasharray="2 4" opacity="0.3">
                <animateTransform attributeName="transform" type="rotate"
                  values={`0 ${ex} ${ey};360 ${ex} ${ey}`} dur="20s" repeatCount="indefinite" />
              </circle>
            )}
            {isActive && el.nature === 'radiate' && (
              <circle cx={ex} cy={ey} r={baseR + 6} fill="none" stroke={el.color}
                strokeWidth="0.8" strokeDasharray="1 3" opacity="0.3">
                <animate attributeName="r" values={`${baseR + 4};${baseR + 10};${baseR + 4}`} dur="2s" repeatCount="indefinite" />
              </circle>
            )}
            {isActive && el.nature === 'flow' && (
              <circle cx={ex} cy={ey} r={baseR + 6} fill="none" stroke={el.color}
                strokeWidth="0.8" strokeDasharray="6 3" opacity="0.25">
                <animate attributeName="stroke-dashoffset" values="0;-20" dur="3s" repeatCount="indefinite" />
              </circle>
            )}

            {/* Main circle */}
            <circle cx={ex} cy={ey} r={baseR} fill={el.color}
              opacity={isActive ? 1 : 0.25}>
              {isActive && <animate attributeName="r" values={`${baseR - 1};${baseR + 2};${baseR - 1}`} dur="4s" repeatCount="indefinite" />}
            </circle>

            {/* Chinese character */}
            <text x={ex} y={ey + 1} textAnchor="middle" dominantBaseline="central"
              fontSize={isActive ? 16 : 12} fontWeight="300" fill="white" fontFamily="serif">
              {el.char}
            </text>

            {/* Label */}
            <text x={ex} y={ey + baseR + 13} textAnchor="middle"
              fontSize="7.5" fontWeight={isActive ? 500 : 400}
              fill={isActive ? el.color : '#A09890'}
              fontFamily="Inter, sans-serif" letterSpacing="0.05em"
              style={{ textTransform: 'uppercase' }}>
              {el.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
