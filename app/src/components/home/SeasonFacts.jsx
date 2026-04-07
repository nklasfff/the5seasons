import { useSeason } from '../../context/SeasonContext';
import GlassCard from '../common/GlassCard';
import styles from './SeasonFacts.module.css';

export default function SeasonFacts() {
  const { current } = useSeason();

  const facts = [
    { label: 'Element', value: current.element },
    { label: 'Organer', value: `${current.organs.yin} · ${current.organs.yang}` },
    { label: 'Smag', value: current.flavor },
    { label: 'Klima', value: current.climate },
  ];

  return (
    <GlassCard glowColor={current.glowColor}>
      <p className={styles.label}>Sæsonens nøgletal</p>
      <div className={styles.grid}>
        {facts.map(f => (
          <div key={f.label} className={styles.fact}>
            <p className={styles.factLabel}>{f.label}</p>
            <p className={styles.factValue}>{f.value}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
