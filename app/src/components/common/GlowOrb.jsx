export default function GlowOrb({ color = 'var(--accent-light)', size = 350, top, right, bottom, left, delay = 0 }) {
  return (
    <div
      style={{
        position: 'fixed',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(80px)',
        opacity: 0.15,
        pointerEvents: 'none',
        zIndex: 0,
        top, right, bottom, left,
        animation: `drift 20s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}
