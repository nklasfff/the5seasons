import GlassCard from '../common/GlassCard';
import styles from './OrganMini.module.css';

const organs = [
  { time: '23-01', name: 'Galdeblære', color: '#5B8C5A' },
  { time: '01-03', name: 'Lever', color: '#5B8C5A' },
  { time: '03-05', name: 'Lunger', color: '#A8A8A0' },
  { time: '05-07', name: 'Tyktarm', color: '#A8A8A0' },
  { time: '07-09', name: 'Mave', color: '#C9A84C' },
  { time: '09-11', name: 'Milt', color: '#C9A84C' },
  { time: '11-13', name: 'Hjerte', color: '#C75A3A' },
  { time: '13-15', name: 'Tyndtarm', color: '#C75A3A' },
  { time: '15-17', name: 'Blære', color: '#3A6FA0' },
  { time: '17-19', name: 'Nyrer', color: '#3A6FA0' },
  { time: '19-21', name: 'Perikardium', color: '#C75A3A' },
  { time: '21-23', name: 'Tre Varmere', color: '#C75A3A' },
];

function getActive() {
  const h = new Date().getHours();
  if (h >= 23 || h < 1) return organs[0];
  if (h < 3) return organs[1];
  if (h < 5) return organs[2];
  if (h < 7) return organs[3];
  if (h < 9) return organs[4];
  if (h < 11) return organs[5];
  if (h < 13) return organs[6];
  if (h < 15) return organs[7];
  if (h < 17) return organs[8];
  if (h < 19) return organs[9];
  if (h < 21) return organs[10];
  return organs[11];
}

export default function OrganMini() {
  const active = getActive();

  return (
    <GlassCard>
      <div className={styles.wrap}>
        <div className={styles.dot} style={{ background: active.color }} />
        <div className={styles.info}>
          <p className={styles.label}>Organ-uret</p>
          <p className={styles.organ}>{active.name}</p>
        </div>
        <span className={styles.time}>{active.time}</span>
      </div>
    </GlassCard>
  );
}
