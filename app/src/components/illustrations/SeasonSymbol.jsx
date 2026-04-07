/**
 * Unique animated SVG illustration for each season.
 * Each season gets its own distinct visual language:
 * - Forår/Wood: Growing branches with unfurling leaves
 * - Sommer/Fire: Radiating flames with pulsing heart
 * - Sensommer/Earth: Concentric rings with nurturing center
 * - Efterår/Metal: Falling leaves with crystalline structure
 * - Vinter/Water: Flowing waves with deep stillness
 */

function SpringSymbol({ size, color }) {
  const cx = size / 2, cy = size / 2;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      {/* Trunk growing upward */}
      <line x1={cx} y1={cy + 40} x2={cx} y2={cy - 20} stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6">
        <animate attributeName="y2" values={`${cy};${cy - 20}`} dur="2s" fill="freeze" />
      </line>
      {/* Left branch */}
      <path d={`M${cx},${cy - 5} Q${cx - 25},${cy - 15} ${cx - 35},${cy - 30}`} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
        <animate attributeName="opacity" values="0;0.5" dur="1.5s" begin="0.5s" fill="freeze" />
      </path>
      {/* Right branch */}
      <path d={`M${cx},${cy - 10} Q${cx + 20},${cy - 25} ${cx + 30},${cy - 38}`} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
        <animate attributeName="opacity" values="0;0.5" dur="1.5s" begin="0.7s" fill="freeze" />
      </path>
      {/* Leaves unfurling */}
      {[
        { x: cx - 35, y: cy - 30, delay: '1s', r: 6 },
        { x: cx + 30, y: cy - 38, delay: '1.2s', r: 5 },
        { x: cx - 15, y: cy - 25, delay: '1.4s', r: 4 },
        { x: cx + 10, y: cy - 32, delay: '1.6s', r: 5 },
        { x: cx, y: cy - 22, delay: '0.8s', r: 7 },
      ].map((leaf, i) => (
        <circle key={i} cx={leaf.x} cy={leaf.y} r={leaf.r} fill={color} opacity="0">
          <animate attributeName="opacity" values="0;0.3" dur="1s" begin={leaf.delay} fill="freeze" />
          <animate attributeName="r" values={`0;${leaf.r}`} dur="1s" begin={leaf.delay} fill="freeze" />
        </circle>
      ))}
      {/* Rising energy spirals */}
      <circle cx={cx} cy={cy + 30} r="3" fill={color} opacity="0.2">
        <animate attributeName="cy" values={`${cy + 30};${cy - 45}`} dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0" dur="4s" repeatCount="indefinite" />
        <animate attributeName="r" values="3;1" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx + 8} cy={cy + 25} r="2" fill={color} opacity="0.15">
        <animate attributeName="cy" values={`${cy + 25};${cy - 50}`} dur="5s" begin="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.2;0" dur="5s" begin="1.5s" repeatCount="indefinite" />
      </circle>
      {/* Ground roots */}
      <path d={`M${cx},${cy + 40} Q${cx - 15},${cy + 50} ${cx - 25},${cy + 45}`} fill="none" stroke={color} strokeWidth="1" opacity="0.2" />
      <path d={`M${cx},${cy + 40} Q${cx + 12},${cy + 48} ${cx + 20},${cy + 44}`} fill="none" stroke={color} strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

function SummerSymbol({ size, color }) {
  const cx = size / 2, cy = size / 2;
  const rays = 12;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      {/* Radiating warmth */}
      {Array.from({ length: rays }).map((_, i) => {
        const angle = (i / rays) * 360 * Math.PI / 180;
        const x1 = cx + 20 * Math.cos(angle);
        const y1 = cy + 20 * Math.sin(angle);
        const x2 = cx + (35 + (i % 3) * 5) * Math.cos(angle);
        const y2 = cy + (35 + (i % 3) * 5) * Math.sin(angle);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.25">
            <animate attributeName="opacity" values="0.15;0.35;0.15"
              dur={`${2 + (i % 3) * 0.5}s`} begin={`${i * 0.15}s`} repeatCount="indefinite" />
          </line>
        );
      })}
      {/* Core flame layers */}
      <ellipse cx={cx} cy={cy + 5} rx="14" ry="18" fill={color} opacity="0.15">
        <animate attributeName="ry" values="17;20;17" dur="2s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx={cx} cy={cy + 2} rx="10" ry="14" fill={color} opacity="0.25">
        <animate attributeName="ry" values="13;16;13" dur="1.8s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx={cx} cy={cy} rx="7" ry="10" fill={color} opacity="0.4">
        <animate attributeName="ry" values="9;12;9" dur="1.5s" repeatCount="indefinite" />
      </ellipse>
      {/* Heart center beat */}
      <circle cx={cx} cy={cy} r="4" fill={color} opacity="0.6">
        <animate attributeName="r" values="3;5;3" dur="1.2s" repeatCount="indefinite" />
      </circle>
      {/* Rising sparks */}
      {[0, 1, 2].map(i => (
        <circle key={i} cx={cx + (i - 1) * 8} cy={cy - 10} r="1.5" fill={color} opacity="0">
          <animate attributeName="cy" values={`${cy - 10};${cy - 55}`} dur={`${3 + i * 0.7}s`} begin={`${i * 1.2}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0" dur={`${3 + i * 0.7}s`} begin={`${i * 1.2}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

function LateSummerSymbol({ size, color }) {
  const cx = size / 2, cy = size / 2;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      {/* Concentric nurturing rings */}
      {[45, 35, 25].map((r, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={color}
          strokeWidth="1" opacity={0.1 + i * 0.08} strokeDasharray={`${4 + i * 2} ${6 - i}`}>
          <animate attributeName="r" values={`${r - 2};${r + 2};${r - 2}`} dur={`${4 + i}s`} repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate"
            values={`0 ${cx} ${cy};${i % 2 === 0 ? 360 : -360} ${cx} ${cy}`}
            dur={`${30 + i * 10}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* Earth center — solid and grounding */}
      <circle cx={cx} cy={cy} r="16" fill={color} opacity="0.12">
        <animate attributeName="r" values="15;18;15" dur="5s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r="8" fill={color} opacity="0.25">
        <animate attributeName="r" values="7;10;7" dur="4s" repeatCount="indefinite" />
      </circle>
      {/* Four directional dots — stability */}
      {[0, 90, 180, 270].map((deg, i) => {
        const rad = deg * Math.PI / 180;
        const dx = cx + 30 * Math.cos(rad);
        const dy = cy + 30 * Math.sin(rad);
        return (
          <circle key={i} cx={dx} cy={dy} r="3" fill={color} opacity="0.2">
            <animate attributeName="opacity" values="0.15;0.3;0.15" dur="3s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
          </circle>
        );
      })}
      {/* Gentle harvest particles settling inward */}
      {[0, 1, 2, 3].map(i => {
        const startAngle = (i * 90 + 45) * Math.PI / 180;
        const sx = cx + 48 * Math.cos(startAngle);
        const sy = cy + 48 * Math.sin(startAngle);
        return (
          <circle key={i} cx={sx} cy={sy} r="2" fill={color} opacity="0">
            <animate attributeName="cx" values={`${sx};${cx}`} dur="6s" begin={`${i * 1.5}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values={`${sy};${cy}`} dur="6s" begin={`${i * 1.5}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0" dur="6s" begin={`${i * 1.5}s`} repeatCount="indefinite" />
          </circle>
        );
      })}
    </svg>
  );
}

function AutumnSymbol({ size, color }) {
  const cx = size / 2, cy = size / 2;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      {/* Crystalline structure — precision of metal */}
      <line x1={cx - 30} y1={cy} x2={cx + 30} y2={cy} stroke={color} strokeWidth="0.8" opacity="0.2" />
      <line x1={cx} y1={cy - 30} x2={cx} y2={cy + 30} stroke={color} strokeWidth="0.8" opacity="0.2" />
      <line x1={cx - 22} y1={cy - 22} x2={cx + 22} y2={cy + 22} stroke={color} strokeWidth="0.5" opacity="0.15" />
      <line x1={cx + 22} y1={cy - 22} x2={cx - 22} y2={cy + 22} stroke={color} strokeWidth="0.5" opacity="0.15" />
      {/* Diamond shape — metal refinement */}
      <polygon points={`${cx},${cy - 28} ${cx + 22},${cy} ${cx},${cy + 28} ${cx - 22},${cy}`}
        fill="none" stroke={color} strokeWidth="1" opacity="0.2">
        <animate attributeName="opacity" values="0.15;0.3;0.15" dur="4s" repeatCount="indefinite" />
      </polygon>
      {/* Inner diamond */}
      <polygon points={`${cx},${cy - 14} ${cx + 11},${cy} ${cx},${cy + 14} ${cx - 11},${cy}`}
        fill={color} opacity="0.08">
        <animate attributeName="opacity" values="0.06;0.15;0.06" dur="3s" repeatCount="indefinite" />
      </polygon>
      {/* Center point — essence after letting go */}
      <circle cx={cx} cy={cy} r="3" fill={color} opacity="0.4">
        <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite" />
      </circle>
      {/* Falling leaves — release */}
      {[
        { x: cx - 20, startY: cy - 40, endY: cy + 50, dur: '7s', delay: '0s', drift: 15 },
        { x: cx + 15, startY: cy - 45, endY: cy + 50, dur: '8s', delay: '2s', drift: -10 },
        { x: cx + 5, startY: cy - 35, endY: cy + 50, dur: '6s', delay: '4s', drift: 20 },
        { x: cx - 10, startY: cy - 50, endY: cy + 50, dur: '9s', delay: '1s', drift: -15 },
      ].map((leaf, i) => (
        <g key={i}>
          <ellipse cx={leaf.x} cy={leaf.startY} rx="3" ry="2" fill={color}
            opacity="0" transform={`rotate(${30 + i * 20} ${leaf.x} ${leaf.startY})`}>
            <animate attributeName="cy" values={`${leaf.startY};${leaf.endY}`} dur={leaf.dur} begin={leaf.delay} repeatCount="indefinite" />
            <animate attributeName="cx" values={`${leaf.x};${leaf.x + leaf.drift}`} dur={leaf.dur} begin={leaf.delay} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.3;0.3;0" dur={leaf.dur} begin={leaf.delay} repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="rotate"
              values={`0 ${leaf.x} ${leaf.startY};360 ${leaf.x} ${leaf.startY}`}
              dur={leaf.dur} begin={leaf.delay} repeatCount="indefinite" />
          </ellipse>
        </g>
      ))}
    </svg>
  );
}

function WinterSymbol({ size, color }) {
  const cx = size / 2, cy = size / 2;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      {/* Deep water waves — horizontal flowing lines */}
      {[-15, 0, 15].map((offset, i) => (
        <path key={i}
          d={`M${cx - 45},${cy + offset} Q${cx - 20},${cy + offset - 8} ${cx},${cy + offset} Q${cx + 20},${cy + offset + 8} ${cx + 45},${cy + offset}`}
          fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round"
          opacity={0.15 + i * 0.05}>
          <animate attributeName="d"
            values={`M${cx - 45},${cy + offset} Q${cx - 20},${cy + offset - 8} ${cx},${cy + offset} Q${cx + 20},${cy + offset + 8} ${cx + 45},${cy + offset};M${cx - 45},${cy + offset} Q${cx - 20},${cy + offset + 8} ${cx},${cy + offset} Q${cx + 20},${cy + offset - 8} ${cx + 45},${cy + offset};M${cx - 45},${cy + offset} Q${cx - 20},${cy + offset - 8} ${cx},${cy + offset} Q${cx + 20},${cy + offset + 8} ${cx + 45},${cy + offset}`}
            dur={`${5 + i}s`} repeatCount="indefinite" />
        </path>
      ))}
      {/* Deep center — stillness beneath */}
      <circle cx={cx} cy={cy + 25} r="20" fill={color} opacity="0.05">
        <animate attributeName="r" values="18;22;18" dur="6s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy + 25} r="10" fill={color} opacity="0.1">
        <animate attributeName="r" values="8;12;8" dur="5s" repeatCount="indefinite" />
      </circle>
      {/* Seed of potential at the very bottom */}
      <circle cx={cx} cy={cy + 25} r="3" fill={color} opacity="0.3">
        <animate attributeName="opacity" values="0.2;0.4;0.2" dur="4s" repeatCount="indefinite" />
      </circle>
      {/* Snowflake-like particles drifting down */}
      {[0, 1, 2, 3, 4].map(i => {
        const sx = cx - 30 + i * 15;
        return (
          <circle key={i} cx={sx} cy={cy - 45} r="1.5" fill={color} opacity="0">
            <animate attributeName="cy" values={`${cy - 45};${cy + 45}`}
              dur={`${6 + i * 1.2}s`} begin={`${i * 1.3}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.25;0.25;0"
              dur={`${6 + i * 1.2}s`} begin={`${i * 1.3}s`} repeatCount="indefinite" />
          </circle>
        );
      })}
    </svg>
  );
}

const symbolMap = {
  foraar: SpringSymbol,
  sommer: SummerSymbol,
  sensommer: LateSummerSymbol,
  efteraar: AutumnSymbol,
  vinter: WinterSymbol,
};

export default function SeasonSymbol({ seasonId, color, size = 160 }) {
  const Component = symbolMap[seasonId];
  if (!Component) return null;
  return <Component size={size} color={color} />;
}
