import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../common/GlassCard';
import styles from './OrganClock.module.css';

const organs = [
  { time: '23-01', name: 'Galdeblære', element: 'Træ', color: '#5B8C5A', guidance: 'Dyb søvn. Galdeblæren regenererer og renser.', doThis: 'Sov dybt, undgå skærmtid.', avoidThis: 'Fed mad og alkohol.' },
  { time: '01-03', name: 'Lever', element: 'Træ', color: '#5B8C5A', guidance: 'Leverens udrensning. Drømmesøvnens tid.', doThis: 'Sov tungt. Leveren arbejder bedst under dyb søvn.', avoidThis: 'Vågner du her, kan det indikere overbelastning.' },
  { time: '03-05', name: 'Lunger', element: 'Metal', color: '#A8A8A0', guidance: 'Lungernes regenerering. Dyb søvn.', doThis: 'Lad kroppen hvile og forny lungerne.', avoidThis: 'Undgå kold luft og stimulanser.' },
  { time: '05-07', name: 'Tyktarm', element: 'Metal', color: '#A8A8A0', guidance: 'Tid til at vågne og rense kroppen.', doThis: 'Drik varmt vand. Morgenritual.', avoidThis: 'Spring ikke morgenmaden over.' },
  { time: '07-09', name: 'Mave', element: 'Jord', color: '#C9A84C', guidance: 'Mavens optimale tid. Nærende morgenmad.', doThis: 'Spis en varm, nærende morgenmad.', avoidThis: 'Kold mad og kaffe på tom mave.' },
  { time: '09-11', name: 'Milt', element: 'Jord', color: '#C9A84C', guidance: 'Mental klarhed. Bedste tid for fokus.', doThis: 'Koncentreret arbejde. Mental aktivitet.', avoidThis: 'Multitasking og sukker.' },
  { time: '11-13', name: 'Hjerte', element: 'Ild', color: '#C75A3A', guidance: 'Hjertets time. Forbindelse og lethed.', doThis: 'Let frokost. Social forbindelse.', avoidThis: 'Tung mad og stress.' },
  { time: '13-15', name: 'Tyndtarm', element: 'Ild', color: '#C75A3A', guidance: 'Sortering og integration.', doThis: 'Lad kroppen fordøje i ro.', avoidThis: 'Intenst arbejde lige efter frokost.' },
  { time: '15-17', name: 'Blære', element: 'Vand', color: '#3A6FA0', guidance: 'Blærens tid. Bevægelse og væske.', doThis: 'Drik rigeligt vand. Let motion.', avoidThis: 'Dehydrering og stillesiddende arbejde.' },
  { time: '17-19', name: 'Nyrer', element: 'Vand', color: '#3A6FA0', guidance: 'Nyrernes time. Sænk tempoet.', doThis: 'Afslut dagens arbejde. Bevæg dig roligt.', avoidThis: 'Overanstrengelse og koffein.' },
  { time: '19-21', name: 'Perikardium', element: 'Ild', color: '#C75A3A', guidance: 'Tid for nærvær og kærlighed.', doThis: 'Vær sammen med dem du holder af.', avoidThis: 'Skærmtid og arbejde.' },
  { time: '21-23', name: 'Tre Varmere', element: 'Ild', color: '#C75A3A', guidance: 'Forberedelse til søvn.', doThis: 'Lad kroppen falde til ro. Læs eller mediter.', avoidThis: 'Stimulerende aktiviteter og lys.' },
];

function getActiveOrgan() {
  const h = new Date().getHours();
  if (h >= 23 || h < 1) return 0;
  if (h < 3) return 1;
  if (h < 5) return 2;
  if (h < 7) return 3;
  if (h < 9) return 4;
  if (h < 11) return 5;
  if (h < 13) return 6;
  if (h < 15) return 7;
  if (h < 17) return 8;
  if (h < 19) return 9;
  if (h < 21) return 10;
  return 11;
}

export default function OrganClockPage() {
  const navigate = useNavigate();
  const activeIdx = getActiveOrgan();
  const [selectedIdx, setSelectedIdx] = useState(activeIdx);
  const selected = organs[selectedIdx];

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate('/praksis')}>‹ Praksis</button>
      <h1 className={`${styles.title} animate-fade-up`}>Organ-uret</h1>

      <div className={styles.activeInfo}>
        <p className={styles.activeLabel}>Aktiv nu</p>
        <p className={styles.activeOrgan}>{organs[activeIdx].name} · {organs[activeIdx].element}</p>
      </div>

      {/* SVG Clock */}
      <div className={`${styles.clockWrap} animate-fade-up-delay-1`}>
        <svg viewBox="0 0 300 300" width="280" height="280">
          {organs.map((o, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const nextAngle = ((i + 1) * 30 - 90) * (Math.PI / 180);
            const r1 = 80, r2 = 130;
            const isActive = i === activeIdx;
            const isSelected = i === selectedIdx;

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
              <g key={i} style={{ cursor: 'pointer' }} onClick={() => setSelectedIdx(i)}>
                <path
                  d={`M${x1},${y1} L${x2},${y2} A${r2},${r2} 0 0,1 ${x3},${y3} L${x4},${y4} A${r1},${r1} 0 0,0 ${x1},${y1}`}
                  fill={isActive || isSelected ? o.color : 'transparent'}
                  fillOpacity={isActive ? 0.2 : isSelected ? 0.1 : 0}
                  stroke={o.color}
                  strokeWidth={isActive || isSelected ? 2 : 0.5}
                  strokeOpacity={isActive || isSelected ? 0.8 : 0.2}
                />
                <text
                  x={lx} y={ly}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={isActive || isSelected ? 8 : 7}
                  fontWeight={isActive || isSelected ? 500 : 400}
                  fill={isActive || isSelected ? o.color : 'var(--text-muted, #8A857E)'}
                  fontFamily="Inter, sans-serif"
                >
                  {o.name}
                </text>
              </g>
            );
          })}
          <circle cx="150" cy="150" r="78" fill="none" stroke="var(--line-faint, rgba(255,255,255,0.06))" strokeWidth="0.5" />
          <circle cx="150" cy="150" r="132" fill="none" stroke="var(--line-faint, rgba(255,255,255,0.06))" strokeWidth="0.5" />
          <text x="150" y="148" textAnchor="middle" fontSize="10" fill="var(--text-secondary, #9B7B5A)" fontFamily="Cormorant Garamond, serif" fontWeight="300">
            organ
          </text>
          <text x="150" y="162" textAnchor="middle" fontSize="10" fill="var(--text-secondary, #9B7B5A)" fontFamily="Cormorant Garamond, serif" fontWeight="300">
            uret
          </text>
        </svg>
      </div>

      {/* Selected organ guidance */}
      <GlassCard glowColor={`${selected.color}15`} className="animate-fade-up-delay-2">
        <div className={styles.guidanceHeader}>
          <div className={styles.guidanceDot} style={{ background: selected.color }} />
          <div>
            <h3 className={styles.guidanceName}>{selected.name}</h3>
            <p className={styles.guidanceMeta}>{selected.element} · {selected.time}</p>
          </div>
          {selectedIdx === activeIdx && (
            <span className={styles.nowBadge} style={{ color: selected.color, background: `${selected.color}15` }}>Nu</span>
          )}
        </div>
        <p className={styles.guidanceText}>{selected.guidance}</p>
        <div className={styles.guidanceActions}>
          <div className={styles.guidanceAction}>
            <span className={styles.guidanceActionLabel}>✓ Gør dette</span>
            <p className={styles.guidanceActionText}>{selected.doThis}</p>
          </div>
          <div className={styles.guidanceAction}>
            <span className={styles.guidanceActionLabel}>✗ Undgå</span>
            <p className={styles.guidanceActionText}>{selected.avoidThis}</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
