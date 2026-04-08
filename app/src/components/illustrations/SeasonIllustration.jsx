/**
 * Abstract, organic SVG illustrations for each element.
 * Multiple variants per element for different contexts.
 */

// --- WOOD / TRÆ ---
const TreeSpire = ({ color, o }) => (
  <svg viewBox="0 0 200 280" fill="none">
    <path d="M100 260 C100 200, 96 160, 85 120 C75 85, 82 50, 100 20 C118 50, 125 85, 115 120 C104 160, 100 200, 100 260Z"
      fill={color} opacity={o * 0.6} />
    <path d="M100 150 C88 130, 62 115, 45 108" stroke={color} strokeWidth="1.2" opacity={o} strokeLinecap="round" />
    <path d="M100 120 C112 100, 138 88, 158 82" stroke={color} strokeWidth="1.2" opacity={o} strokeLinecap="round" />
    <path d="M100 90 C92 75, 72 62, 58 56" stroke={color} strokeWidth="0.8" opacity={o * 0.7} strokeLinecap="round" />
  </svg>
)

const TreeRoots = ({ color, o }) => (
  <svg viewBox="0 0 200 160" fill="none">
    <path d="M100 10 L100 55" stroke={color} strokeWidth="2.5" opacity={o} strokeLinecap="round" />
    <path d="M100 55 C75 85, 42 108, 20 135" stroke={color} strokeWidth="2" opacity={o * 0.9} strokeLinecap="round" />
    <path d="M100 55 C125 85, 158 108, 180 135" stroke={color} strokeWidth="2" opacity={o * 0.9} strokeLinecap="round" />
    <path d="M100 55 C88 80, 65 105, 55 145" stroke={color} strokeWidth="1.4" opacity={o * 0.7} strokeLinecap="round" />
    <path d="M100 55 C112 80, 135 105, 145 145" stroke={color} strokeWidth="1.4" opacity={o * 0.7} strokeLinecap="round" />
    <path d="M100 55 C95 90, 85 120, 100 150" stroke={color} strokeWidth="1" opacity={o * 0.5} strokeLinecap="round" />
    <circle cx="100" cy="55" r="5" fill={color} opacity={o} />
  </svg>
)

const TreeLeaf = ({ color, o }) => (
  <svg viewBox="0 0 120 160" fill="none">
    <path d="M60 150 C60 120, 20 80, 30 40 C35 20, 55 5, 60 5 C65 5, 85 20, 90 40 C100 80, 60 120, 60 150Z"
      fill={color} opacity={o * 0.5} />
    <path d="M60 140 L60 20" stroke={color} strokeWidth="0.8" opacity={o * 0.8} />
    <path d="M60 100 C50 85, 38 75, 35 65" stroke={color} strokeWidth="0.5" opacity={o * 0.5} />
    <path d="M60 80 C70 68, 78 58, 82 50" stroke={color} strokeWidth="0.5" opacity={o * 0.5} />
  </svg>
)

const TreeSeed = ({ color, o }) => (
  <svg viewBox="0 0 140 140" fill="none">
    <circle cx="70" cy="70" r="22" fill={color} opacity={o * 0.5} />
    <circle cx="70" cy="70" r="22" stroke={color} strokeWidth="1" opacity={o * 0.8} />
    <path d="M70 48 C70 38, 72 25, 70 15" stroke={color} strokeWidth="1.2" opacity={o * 0.7} strokeLinecap="round" />
    <path d="M62 52 C55 42, 46 35, 40 30" stroke={color} strokeWidth="0.8" opacity={o * 0.5} strokeLinecap="round" />
    <path d="M78 52 C85 42, 94 35, 100 30" stroke={color} strokeWidth="0.8" opacity={o * 0.5} strokeLinecap="round" />
    <circle cx="70" cy="70" r="5" fill={color} opacity={o} />
  </svg>
)

// --- FIRE / ILD ---
const FireRadiance = ({ color, o }) => (
  <svg viewBox="0 0 200 200" fill="none">
    <circle cx="100" cy="100" r="16" fill={color} opacity={o * 1.5} />
    <circle cx="100" cy="100" r="35" stroke={color} strokeWidth="1" opacity={o} />
    <circle cx="100" cy="100" r="60" stroke={color} strokeWidth="0.7" opacity={o * 0.6} />
    <circle cx="100" cy="100" r="88" stroke={color} strokeWidth="0.4" opacity={o * 0.3} />
  </svg>
)

const FireFlame = ({ color, o }) => (
  <svg viewBox="0 0 120 180" fill="none">
    <path d="M60 170 C40 130, 20 100, 25 70 C28 50, 45 30, 60 10 C75 30, 92 50, 95 70 C100 100, 80 130, 60 170Z"
      fill={color} opacity={o * 0.5} />
    <path d="M60 160 C50 130, 38 105, 42 82 C44 68, 52 50, 60 35 C68 50, 76 68, 78 82 C82 105, 70 130, 60 160Z"
      fill={color} opacity={o * 0.3} />
  </svg>
)

// --- EARTH / JORD ---
const EarthLayers = ({ color, o }) => (
  <svg viewBox="0 0 200 140" fill="none">
    <ellipse cx="100" cy="110" rx="85" ry="14" fill={color} opacity={o * 0.4} />
    <ellipse cx="100" cy="85" rx="60" ry="10" fill={color} opacity={o * 0.6} />
    <ellipse cx="100" cy="65" rx="35" ry="7" fill={color} opacity={o * 0.8} />
    <circle cx="100" cy="48" r="4" fill={color} opacity={o} />
  </svg>
)

const EarthBowl = ({ color, o }) => (
  <svg viewBox="0 0 200 120" fill="none">
    <path d="M20 40 C40 90, 80 110, 100 110 C120 110, 160 90, 180 40"
      stroke={color} strokeWidth="1.5" opacity={o} strokeLinecap="round" fill="none" />
    <circle cx="100" cy="70" r="5" fill={color} opacity={o * 0.6} />
  </svg>
)

// --- METAL ---
const MetalDiamond = ({ color, o }) => (
  <svg viewBox="0 0 160 220" fill="none">
    <path d="M80 10 L140 90 L80 210 L20 90 Z" fill={color} opacity={o * 0.35} />
    <path d="M80 30 L125 90 L80 190 L35 90 Z" stroke={color} strokeWidth="0.6" opacity={o * 0.6} fill="none" />
    <line x1="80" y1="10" x2="80" y2="210" stroke={color} strokeWidth="0.4" opacity={o * 0.3} />
  </svg>
)

const MetalFeather = ({ color, o }) => (
  <svg viewBox="0 0 100 200" fill="none">
    <path d="M50 10 L50 190" stroke={color} strokeWidth="1" opacity={o} />
    <path d="M50 30 C35 50, 20 60, 15 70" stroke={color} strokeWidth="0.6" opacity={o * 0.5} strokeLinecap="round" />
    <path d="M50 60 C65 75, 80 82, 88 88" stroke={color} strokeWidth="0.6" opacity={o * 0.5} strokeLinecap="round" />
    <path d="M50 90 C35 105, 22 115, 18 125" stroke={color} strokeWidth="0.6" opacity={o * 0.5} strokeLinecap="round" />
    <path d="M50 120 C65 132, 78 140, 85 148" stroke={color} strokeWidth="0.6" opacity={o * 0.5} strokeLinecap="round" />
  </svg>
)

// --- WATER / VAND ---
const WaterWaves = ({ color, o }) => (
  <svg viewBox="0 0 220 140" fill="none">
    <path d="M10 60 C40 35, 75 85, 110 60 C145 35, 175 85, 210 60"
      stroke={color} strokeWidth="1.5" opacity={o} strokeLinecap="round" />
    <path d="M20 85 C48 65, 78 105, 110 85 C142 65, 168 105, 200 85"
      stroke={color} strokeWidth="1" opacity={o * 0.6} strokeLinecap="round" />
    <path d="M35 108 C55 94, 80 118, 110 108 C140 94, 160 118, 185 108"
      stroke={color} strokeWidth="0.6" opacity={o * 0.4} strokeLinecap="round" />
  </svg>
)

const WaterDrop = ({ color, o }) => (
  <svg viewBox="0 0 100 140" fill="none">
    <path d="M50 10 C50 10, 15 65, 15 85 C15 108, 30 130, 50 130 C70 130, 85 108, 85 85 C85 65, 50 10, 50 10Z"
      fill={color} opacity={o * 0.4} />
    <path d="M50 30 C50 30, 28 72, 28 87 C28 103, 38 118, 50 118"
      stroke={color} strokeWidth="0.6" opacity={o * 0.6} fill="none" />
  </svg>
)

// Variant maps — multiple illustrations per element
const VARIANTS = {
  'Træ':   [TreeSpire, TreeRoots, TreeLeaf, TreeSeed],
  'Ild':   [FireRadiance, FireFlame, FireRadiance],
  'Jord':  [EarthLayers, EarthBowl, EarthLayers],
  'Metal': [MetalDiamond, MetalFeather, MetalDiamond],
  'Vand':  [WaterWaves, WaterDrop, WaterWaves],
}

export default function SeasonIllustration({ element, variant = 0, size = 160, color = '#C89494', opacity = 0.35 }) {
  const variants = VARIANTS[element]
  if (!variants) return null

  const Component = variants[variant % variants.length]

  return (
    <div style={{ width: size, height: size, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Component color={color} o={opacity} />
    </div>
  )
}
