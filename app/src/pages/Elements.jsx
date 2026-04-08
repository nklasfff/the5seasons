import { seasons } from '../data/seasons'
import SeasonIllustration from '../components/illustrations/SeasonIllustration'
import styles from './Elements.module.css'

/*
 * "De fem elementer" — the deeper wisdom.
 *
 * Beautiful, educational. The wheel of seasons.
 * Each element as a world. Her philosophy connecting it all.
 * Not a data table — a visual journey through her teaching.
 */

const SEASON_ORDER = ['foraar', 'sommer', 'sensommer', 'efteraar', 'vinter']

const CYCLE_DESCRIPTIONS = {
  foraar: 'Træ nærer Ild — væksten tænder passionen',
  sommer: 'Ild nærer Jord — varmen modner frugterne',
  sensommer: 'Jord nærer Metal — høsten finder sin form',
  efteraar: 'Metal nærer Vand — klarheden synker til dybden',
  vinter: 'Vand nærer Træ — stilheden forbereder væksten',
}

export default function Elements({ season }) {
  const { current } = season

  return (
    <div className={styles.page}>

      <header className={styles.header}>
        <h1 className={styles.title}>De fem elementer</h1>
        <p className={styles.intro}>
          Alt i naturen bevæger sig i cykler. De fem elementer er fem kvaliteter
          af energi — fem måder livet udtrykker sig på gennem årets gang.
        </p>
      </header>

      {/* === THE FIVE ELEMENTS === */}
      <section className={styles.elements}>
        {SEASON_ORDER.map(id => {
          const s = seasons.find(s => s.id === id)
          const isActive = s.id === current.id

          return (
            <article
              key={id}
              className={`${styles.elementCard} ${isActive ? styles.elementActive : ''}`}
            >
              <div className={styles.cardTop}>
                <SeasonIllustration element={s.element} variant={0} size={56} color={s.color} opacity={isActive ? 0.5 : 0.25} />
                <div className={styles.cardIdentity}>
                  <span className={styles.cardChar} style={{ color: s.color }}>{s.chineseChar}</span>
                  <h2 className={styles.cardName}>{s.name}</h2>
                  <span className={styles.cardElement}>{s.element}</span>
                </div>
              </div>

              <p className={styles.cardDescription}>{s.description}</p>

              <div className={styles.cardDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Organer</span>
                  <span className={styles.detailValue}>{s.organs.yin} & {s.organs.yang}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Emotion</span>
                  <span className={styles.detailValue}>{s.emotion.balanced}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Smag</span>
                  <span className={styles.detailValue}>{s.flavor}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Retning</span>
                  <span className={styles.detailValue}>{s.direction}</span>
                </div>
              </div>

              <p className={styles.cardCycle}>{CYCLE_DESCRIPTIONS[id]}</p>

              {isActive && (
                <span className={styles.activeBadge}>Du er her nu</span>
              )}
            </article>
          )
        })}
      </section>

      {/* === PHILOSOPHY === */}
      <section className={styles.philosophy}>
        <blockquote className={styles.philosophyQuote}>
          Det du nærer, vokser.
        </blockquote>
        <p className={styles.philosophyText}>
          Når du lever i takt med sæsonernes rytme, støtter du din krop,
          dit sind og din sjæl. Ikke ved at gøre mere — men ved at lytte
          til hvad dette øjeblik kalder på.
        </p>
      </section>

      <footer className={styles.footer}>
        <p className={styles.footerText}>Isabelle Evita Søndergaard</p>
        <p className={styles.footerSub}>De 5 Årstiders Energi</p>
      </footer>
    </div>
  )
}
