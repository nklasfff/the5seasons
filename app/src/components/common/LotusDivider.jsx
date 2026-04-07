import lotusImg from '../../assets/lotus-divider.png';
import styles from './LotusDivider.module.css';

export default function LotusDivider({ size = 36 }) {
  return (
    <div className={styles.divider}>
      <img src={lotusImg} alt="" className={styles.lotus} style={{ width: size }} />
    </div>
  );
}
