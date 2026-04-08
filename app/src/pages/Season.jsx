import { useMemo } from 'react'
import { dailyRotation } from '../hooks/useSeason'
import Reveal from '../components/Reveal'
import SeasonIllustration from '../components/illustrations/SeasonIllustration'
import styles from './Season.module.css'

/*
 * "Sæsonen" — the current season as a reading experience.
 *
 * This feels like opening the relevant chapter of her book.
 * Warm, flowing, illustrated. Philosophy → emotion → body → food.
 * Not a data page. A story about where you are in the year.
 */

export default function Season({ season }) {
  const { current, deep } = season

  const dayIndex = Math.floor(Date.now() / 86400000)
  const philosophy = deep?.philosophy?.[dayIndex % (deep?.philosophy?.length || 1)]
  const symptom = deep?.symptoms?.[dayIndex % (deep?.symptoms?.length || 1)]
  const yoga = deep?.yogaSequence?.[dayIndex % (deep?.yogaSequence?.length || 1)]
  const food = deep?.foodGuide?.[dayIndex % (deep?.foodGuide?.length || 1)]
  const acupressure = deep?.acupressure?.[dayIndex % (deep?.acupressure?.length || 1)]

  if (!deep) return null

  return (
    <div className={styles.page}>

      {/* === SEASON OPENING — large, atmospheric === */}
      <section className={styles.opening}>
        <SeasonIllustration element={current.element} variant={0} size={200} opacity={0.3} />
        <h1 className={styles.seasonName}>{current.name}</h1>
        <p className={styles.element}>{current.element} · {current.chineseChar}</p>
        <p className={styles.months}>{current.monthLabel}</p>
      </section>

      {/* === THE ESSENCE — her description === */}
      <section className={styles.essence}>
        <p className={styles.essenceText}>{current.description}</p>
      </section>

      {/* === EMOTIONAL LANDSCAPE === */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Følelsernes landskab</h2>
        <div className={styles.emotionPair}>
          <div className={styles.emotionBalanced}>
            <span className={styles.emotionLabel}>I balance</span>
            <span className={styles.emotionValue}>{current.emotion.balanced}</span>
          </div>
          <div className={styles.emotionBridge} />
          <div className={styles.emotionImbalanced}>
            <span className={styles.emotionLabel}>I ubalance</span>
            <span className={styles.emotionValue}>{current.emotion.imbalanced}</span>
          </div>
        </div>
        <div className={styles.themes}>
          {current.themes.map((t, i) => (
            <span key={i} className={styles.theme}>{t}</span>
          ))}
        </div>
      </section>

      {/* === PHILOSOPHY — from her book === */}
      {philosophy && (
        <section className={styles.section}>
          <blockquote className={styles.philosophyText}>{philosophy}</blockquote>
        </section>
      )}

      <div className={styles.illustrationBreak}>
        <SeasonIllustration element={current.element} variant={2} size={50} opacity={0.18} />
      </div>

      {/* === BODY WISDOM === */}
      {symptom && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Kroppens signaler</h2>
          <h3 className={styles.bodyTitle}>{symptom.symptom}</h3>
          <Reveal preview={<span className={styles.revealHint}>Hvad kan du gøre?</span>}>
            <p className={styles.bodyText}>{symptom.explanation}</p>
            <p className={styles.bodyRemedy}>{symptom.remedy}</p>
          </Reveal>
        </section>
      )}

      {/* === PRACTICE GLIMPSE === */}
      {yoga && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Sæsonens yoga</h2>
          <h3 className={styles.practiceTitle}>{yoga.name}</h3>
          {yoga.sanskrit && <p className={styles.practiceSanskrit}>{yoga.sanskrit}</p>}
          <Reveal preview={<span className={styles.revealHint}>Se instruktion</span>}>
            <p className={styles.bodyText}>{yoga.instruction}</p>
            <p className={styles.bodyRemedy}>{yoga.benefit}</p>
          </Reveal>
        </section>
      )}

      {/* === ACUPRESSURE === */}
      {acupressure && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Akupressurpunkt</h2>
          <h3 className={styles.practiceTitle}>{acupressure.name}</h3>
          {acupressure.chineseName && <p className={styles.practiceSanskrit}>{acupressure.chineseName}</p>}
          <Reveal preview={<span className={styles.revealHint}>Find punktet</span>}>
            <p className={styles.bodyText}>{acupressure.location}</p>
            <p className={styles.bodyText}>{acupressure.technique}</p>
            <p className={styles.bodyRemedy}>{acupressure.benefit}</p>
          </Reveal>
        </section>
      )}

      <div className={styles.illustrationBreak}>
        <SeasonIllustration element={current.element} variant={1} size={50} opacity={0.18} />
      </div>

      {/* === FOOD === */}
      {food && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Fra køkkenet</h2>
          <p className={styles.foodContext}>
            Den {current.flavor.toLowerCase()}e smag styrker {current.organs.yin.toLowerCase()}en
          </p>
          <h3 className={styles.foodName}>{food.name}</h3>
          <Reveal preview={<span className={styles.revealHint}>Hvorfor og hvordan</span>}>
            <p className={styles.bodyText}>{food.why}</p>
            {food.preparation && <p className={styles.bodyRemedy}>{food.preparation}</p>}
          </Reveal>
        </section>
      )}

      {/* === SEASON INFO === */}
      <footer className={styles.footer}>
        <div className={styles.footerRow}>
          <span className={styles.footerLabel}>Organer</span>
          <span className={styles.footerValue}>{current.organs.yin} & {current.organs.yang}</span>
        </div>
        <div className={styles.footerRow}>
          <span className={styles.footerLabel}>Væv</span>
          <span className={styles.footerValue}>{current.tissue}</span>
        </div>
        <div className={styles.footerRow}>
          <span className={styles.footerLabel}>Retning</span>
          <span className={styles.footerValue}>{current.direction}</span>
        </div>
        <div className={styles.footerRow}>
          <span className={styles.footerLabel}>Klima</span>
          <span className={styles.footerValue}>{current.climate}</span>
        </div>
      </footer>
    </div>
  )
}
