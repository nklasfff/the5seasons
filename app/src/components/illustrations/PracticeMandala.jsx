/**
 * Animated practice mandala for PracticeHub.
 * A living, breathing circular pattern that represents
 * the integration of body, mind, and spirit through practice.
 *
 * Structure:
 * - Outer ring: 12 organ-clock nodes (subtle)
 * - Middle ring: 5 rotating practice petals
 * - Inner ring: breathing core that pulses
 * - Center: season character
 */
import { useSeason } from '../../context/SeasonContext';

export default function PracticeMandala({ size = 200 }) {
  const { current } = useSeason();
  const cx = size / 2;
  const cy = size / 2;
  const color = current.color;

  // Petal paths — 5 petals for 5 elements
  const petals = Array.from({ length: 5 }).map((_, i) => {
    const angle = (i / 5) * 360 - 90;
    const rad = angle * Math.PI / 180;
    const tipR = size * 0.35;
    const tipX = cx + tipR * Math.cos(rad);
    const tipY = cy + tipR * Math.sin(rad);

    const spread = 18;
    const baseR = size * 0.12;
    const leftRad = (angle - spread) * Math.PI / 180;
    const rightRad = (angle + spread) * Math.PI / 180;
    const leftX = cx + baseR * Math.cos(leftRad);
    const leftY = cy + baseR * Math.sin(leftRad);
    const rightX = cx + baseR * Math.cos(rightRad);
    const rightY = cy + baseR * Math.sin(rightRad);

    const cpR = size * 0.28;
    const cpLeftRad = (angle - 10) * Math.PI / 180;
    const cpRightRad = (angle + 10) * Math.PI / 180;
    const cpLX = cx + cpR * Math.cos(cpLeftRad);
    const cpLY = cy + cpR * Math.sin(cpLeftRad);
    const cpRX = cx + cpR * Math.cos(cpRightRad);
    const cpRY = cy + cpR * Math.sin(cpRightRad);

    return `M${leftX},${leftY} Q${cpLX},${cpLY} ${tipX},${tipY} Q${cpRX},${cpRY} ${rightX},${rightY} Z`;
  });

  // 12 organ-clock dots
  const organDots = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i / 12) * 360 - 90;
    const rad = angle * Math.PI / 180;
    const r = size * 0.44;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ display: 'block', margin: '0 auto' }}>
      {/* Outermost whisper ring */}
      <circle cx={cx} cy={cy} r={size * 0.46} fill="none" stroke={color} strokeWidth="0.3" opacity="0.08" />

      {/* 12 organ dots — subtle time markers */}
      {organDots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="1.5" fill={color} opacity="0.1">
          <animate attributeName="opacity" values="0.06;0.15;0.06"
            dur={`${3 + (i % 4) * 0.5}s`} begin={`${i * 0.25}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* Rotating petal group */}
      <g opacity="0.08">
        <animateTransform attributeName="transform" type="rotate"
          values={`0 ${cx} ${cy};360 ${cx} ${cy}`} dur="60s" repeatCount="indefinite" />
        {petals.map((d, i) => (
          <path key={i} d={d} fill={color} />
        ))}
      </g>

      {/* Counter-rotating inner petals (smaller, offset) */}
      <g opacity="0.05">
        <animateTransform attributeName="transform" type="rotate"
          values={`36 ${cx} ${cy};-324 ${cx} ${cy}`} dur="45s" repeatCount="indefinite" />
        {petals.map((d, i) => (
          <path key={i} d={d} fill={color} />
        ))}
      </g>

      {/* Middle breathing ring */}
      <circle cx={cx} cy={cy} r={size * 0.22} fill="none" stroke={color} strokeWidth="0.8"
        strokeDasharray="4 6" opacity="0.12">
        <animate attributeName="r" values={`${size * 0.21};${size * 0.24};${size * 0.21}`}
          dur="6s" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="rotate"
          values={`0 ${cx} ${cy};-360 ${cx} ${cy}`} dur="30s" repeatCount="indefinite" />
      </circle>

      {/* Inner core — three concentric breathing layers */}
      <circle cx={cx} cy={cy} r={size * 0.14} fill={color} opacity="0.04">
        <animate attributeName="r" values={`${size * 0.13};${size * 0.16};${size * 0.13}`}
          dur="5s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r={size * 0.09} fill={color} opacity="0.08">
        <animate attributeName="r" values={`${size * 0.08};${size * 0.11};${size * 0.08}`}
          dur="4.5s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r={size * 0.05} fill={color} opacity="0.15">
        <animate attributeName="r" values={`${size * 0.04};${size * 0.06};${size * 0.04}`}
          dur="4s" repeatCount="indefinite" />
      </circle>

      {/* Center character */}
      <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="central"
        fontSize={size * 0.09} fill={color} opacity="0.5"
        fontFamily="serif" fontWeight="300">
        {current.chineseChar}
      </text>
    </svg>
  );
}
