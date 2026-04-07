/**
 * Decorative illustration for DailyWisdom card.
 * A single leaf or natural form that frames the wisdom quote,
 * with gentle breathing animation. Changes subtly per season.
 */
import { useSeason } from '../../context/SeasonContext';

export default function WisdomLeaf({ size = 48 }) {
  const { current } = useSeason();
  const color = current.color;

  return (
    <svg viewBox="0 0 48 48" width={size} height={size} style={{ display: 'block' }}>
      {/* Opening quotation mark — stylized as a leaf curl */}
      <path
        d={`M12,28 Q12,16 20,12 Q14,18 14,24 Q14,28 18,28 Q14,32 12,28 Z`}
        fill={color} opacity="0.15">
        <animate attributeName="opacity" values="0.1;0.2;0.1" dur="4s" repeatCount="indefinite" />
      </path>
      <path
        d={`M24,28 Q24,16 32,12 Q26,18 26,24 Q26,28 30,28 Q26,32 24,28 Z`}
        fill={color} opacity="0.12">
        <animate attributeName="opacity" values="0.08;0.18;0.08" dur="4s" begin="0.5s" repeatCount="indefinite" />
      </path>

      {/* Stem line connecting the two marks */}
      <path d="M18,28 Q21,34 30,28" fill="none" stroke={color}
        strokeWidth="0.5" opacity="0.1" />
    </svg>
  );
}
