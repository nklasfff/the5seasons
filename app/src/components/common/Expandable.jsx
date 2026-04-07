import { useState } from 'react';
import GlassCard from './GlassCard';
import styles from './Expandable.module.css';

export default function Expandable({ title, subtitle, defaultOpen = false, glowColor, children, className = '' }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <GlassCard
      className={`${styles.expandable} ${className}`}
      glowColor={glowColor}
      onClick={() => setOpen(!open)}
    >
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h3 className={styles.title}>{title}</h3>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        <span className={`${styles.icon} ${open ? styles.iconOpen : ''}`}>+</span>
      </div>
      <div className={`${styles.content} ${open ? styles.contentOpen : ''}`} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </GlassCard>
  );
}
