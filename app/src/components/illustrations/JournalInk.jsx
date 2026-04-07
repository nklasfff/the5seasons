/**
 * Journal page illustration — flowing ink and reflection.
 * An abstract representation of thoughts flowing from pen to paper,
 * with seasonal coloring. Unique to the Journal page.
 *
 * Visual: A quill tip with ink droplets flowing into
 * rippling water-like circles (reflection metaphor).
 */
import { useSeason } from '../../context/SeasonContext';

export default function JournalInk({ size = 160 }) {
  const { current } = useSeason();
  const cx = size / 2;
  const cy = size / 2;
  const color = current.color;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ display: 'block', margin: '0 auto' }}>
      {/* Quill stroke — diagonal line representing writing */}
      <line x1={cx + 25} y1={cy - 35} x2={cx - 5} y2={cy - 5}
        stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.3">
        <animate attributeName="opacity" values="0.2;0.4;0.2" dur="3s" repeatCount="indefinite" />
      </line>

      {/* Pen tip */}
      <circle cx={cx - 5} cy={cy - 5} r="2" fill={color} opacity="0.5">
        <animate attributeName="r" values="1.5;2.5;1.5" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Ink drop falling */}
      <circle cx={cx - 3} cy={cy} r="1.5" fill={color} opacity="0">
        <animate attributeName="cy" values={`${cy - 5};${cy + 15}`} dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0" dur="3s" repeatCount="indefinite" />
        <animate attributeName="r" values="1.5;0.5" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Second ink drop — offset timing */}
      <circle cx={cx + 2} cy={cy} r="1" fill={color} opacity="0">
        <animate attributeName="cy" values={`${cy - 3};${cy + 12}`} dur="4s" begin="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0" dur="4s" begin="1.5s" repeatCount="indefinite" />
      </circle>

      {/* Reflection ripples — expanding circles where ink meets surface */}
      {[0, 1, 2].map(i => (
        <circle key={i} cx={cx} cy={cy + 18} r="5" fill="none"
          stroke={color} strokeWidth="0.6" opacity="0">
          <animate attributeName="r" values={`3;${20 + i * 12}`}
            dur={`${3 + i * 0.8}s`} begin={`${i * 1}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values={`${0.25 - i * 0.06};0`}
            dur={`${3 + i * 0.8}s`} begin={`${i * 1}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* Subtle horizontal line — the page surface */}
      <line x1={cx - 40} y1={cy + 18} x2={cx + 40} y2={cy + 18}
        stroke={color} strokeWidth="0.5" opacity="0.08" />

      {/* Floating word fragments — abstract text lines below surface */}
      {[
        { x: cx - 20, y: cy + 30, w: 18 },
        { x: cx + 5, y: cy + 35, w: 25 },
        { x: cx - 12, y: cy + 40, w: 15 },
        { x: cx + 10, y: cy + 45, w: 20 },
      ].map((line, i) => (
        <line key={i} x1={line.x} y1={line.y} x2={line.x + line.w} y2={line.y}
          stroke={color} strokeWidth="0.8" strokeLinecap="round"
          opacity="0.06">
          <animate attributeName="opacity" values="0.04;0.1;0.04"
            dur={`${4 + i * 0.5}s`} begin={`${i * 0.8}s`} repeatCount="indefinite" />
        </line>
      ))}
    </svg>
  );
}
