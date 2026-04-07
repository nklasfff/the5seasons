import styles from './GlassCard.module.css';

export default function GlassCard({ children, className = '', glowColor, style, ...props }) {
  return (
    <div
      className={`${styles.card} ${className}`}
      style={{ '--card-glow': glowColor, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
