import { useNavigate } from 'react-router-dom';
import GlassCard from '../common/GlassCard';
import styles from './OrganClock.module.css';

const organs = [
  { time: '23-01', name: 'Galdeblære', element: 'Træ', color: '#5B8C5A' },
  { time: '01-03', name: 'Lever', element: 'Træ', color: '#5B8C5A' },
  { time: '03-05', name: 'Lunger', element: 'Metal', color: '#A8A8A0' },
  { time: '05-07', name: 'Tyktarm', element: 'Metal', color: '#A8A8A0' },
  { time: '07-09', name: 'Mave', element: 'Jord', color: '#C9A84C' },
  { time: '09-11', name: 'Milt', element: 'Jord', color: '#C9A84C' },
  { time: '11-13', name: 'Hjerte', element: 'Ild', color: '#C75A3A' },
  { time: '13-15', name: 'Tyndtarm', element: 'Ild', color: '#C75A3A' },
  { time: '15-17', name: 'Blære', element: 'Vand', color: '#3A6FA0' },
  { time: '17-19', name: 'Nyrer', element: 'Vand', color: '#3A6FA0' },
  { time: '19-21', name: 'Perikardium', element: 'Ild', color: '#C75A3A' },
  { time: '21-23', name: 'Tre Varmere', element: 'Ild', color: '#C75A3A' },
];

function getActiveOrgan() {
  const h = new Date().getHours();
  if (h >= 23 || h < 1) return 0;
  if (h >= 1 && h < 3) return 1;
  if (h >= 3 && h < 5) return 2;
  if (h >= 5 && h < 7) return 3;
  if (h >= 7 && h < 9) return 4;
  if (h >= 9 && h < 11) return 5;
  if (h >= 11 && h < 13) return 6;
  if (h >= 13 && h < 15) return 7;
  if (h >= 15 && h < 17) return 8;
  if (h >= 17 && h < 19) return 9;
  if (h >= 19 && h < 21) return 10;
  return 11;
}

export default function OrganClockPage() {
  const navigate = useNavigate();
  const activeIdx = getActiveOrgan();
  const active = organs[activeIdx];

  return (
    <div>
      <button className={styles.back} onClick={() => navigate('/praksis')}>‹ Praksis</button>
      <h1 className={`${styles.title} animate-fade-up`}>Organ-uret</h1>

      <div className={styles.activeInfo}>
        <p className={styles.activeLabel}>Aktiv nu</p>
        <p className={styles.activeOrgan}>{active.name} · {active.element}</p>
      </div>

      {/* SVG Clock */}
      <div className={`${styles.clockWrap} animate-fade-up-delay-1`}>
        <svg viewBox="0 0 300 300" width="280" height="280">
          {organs.map((o, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const nextAngle = ((i + 1) * 30 - 90) * (Math.PI / 180);
            const r1 = 80, r2 = 130;
            const isActive = i === activeIdx;

            const x1 = 150 + r1 * Math.cos(angle);
            const y1 = 150 + r1 * Math.sin(angle);
            const x2 = 150 + r2 * Math.cos(angle);
            const y2 = 150 + r2 * Math.sin(angle);
            const x3 = 150 + r2 * Math.cos(nextAngle);
            const y3 = 150 + r2 * Math.sin(nextAngle);
            const x4 = 150 + r1 * Math.cos(nextAngle);
            const y4 = 150 + r1 * Math.sin(nextAngle);

            const midAngle = ((i * 30 + 15) - 90) * (Math.PI / 180);
            const labelR = 105;
            const lx = 150 + labelR * Math.cos(midAngle);
            const ly = 150 + labelR * Math.sin(midAngle);

            return (
              <g key={i}>
                <path
                  d={`M${x1},${y1} L${x2},${y2} A${r2},${r2} 0 0,1 ${x3},${y3} L${x4},${y4} A${r1},${r1} 0 0,0 ${x1},${y1}`}
                  fill={isActive ? o.color : 'transparent'}
                  fillOpacity={isActive ? 0.15 : 0}
                  stroke={o.color}
                  strokeWidth={isActive ? 2 : 0.5}
                  strokeOpacity={isActive ? 1 : 0.3}
                />
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={isActive ? 8 : 7}
                  fontWeight={isActive ? 500 : 400}
                  fill={isActive ? o.color : '#8A857E'}
                  fontFamily="Inter, sans-serif"
                >
                  {o.name}
                </text>
              </g>
            );
          })}
          <circle cx="150" cy="150" r="78" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
          <circle cx="150" cy="150" r="132" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
          <text x="150" y="148" textAnchor="middle" fontSize="10" fill="#9B7B5A" fontFamily="Cormorant Garamond, serif" fontWeight="300">
            organ
          </text>
          <text x="150" y="162" textAnchor="middle" fontSize="10" fill="#9B7B5A" fontFamily="Cormorant Garamond, serif" fontWeight="300">
            uret
          </text>
        </svg>
      </div>

      <GlassCard className="animate-fade-up-delay-2">
        <div className={styles.organList}>
          {organs.map((o, i) => (
            <div key={i} className={`${styles.organItem} ${i === activeIdx ? styles.active : ''}`}>
              <span className={styles.organTime}>{o.time}</span>
              <span className={styles.organName}>{o.name}</span>
              <span className={styles.organDot} style={{ background: o.color, opacity: i === activeIdx ? 1 : 0.3 }} />
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
