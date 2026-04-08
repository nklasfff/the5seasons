import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SeasonIllustration from '../components/illustrations/SeasonIllustration'
import styles from './Season.module.css'

/*
 * "Sæsonen" — The FULL chapter. ALL content visible.
 *
 * Philosophy (all 4), emotions, ALL symptoms, ALL foods,
 * yoga preview, acupressure, weekly check-in, milestones.
 * Like reading her entire chapter for this season.
 */

export default function Season({ season }) {
  const { current, deep } = season

  if (!deep) return null

  return (
    <div className={styles.page}>

      {/* === OPENING === */}
      <section className={styles.opening}>
        <SeasonIllustration element={current.element} variant={0} size={180} opacity={0.3} />
        <h1 className={styles.seasonName}>{current.name}</h1>
        <p className={styles.element}>{current.element} · {current.chineseChar}</p>
        <p className={styles.months}>{current.monthLabel}</p>
      </section>

      {/* === ESSENCE === */}
      <section className={styles.essence}>
        <p className={styles.essenceText}>{current.description}</p>
      </section>

      {/* === EMOTIONAL LANDSCAPE === */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Følelsernes landskab</h2>
        <div className={styles.emotionPair}>
          <div className={styles.emotionSide}>
            <span className={styles.emotionLabel}>I balance</span>
            <span className={styles.emotionValue}>{current.emotion.balanced}</span>
          </div>
          <div className={styles.emotionBridge} />
          <div className={styles.emotionSide}>
            <span className={styles.emotionLabel}>I ubalance</span>
            <span className={styles.emotionValueMuted}>{current.emotion.imbalanced}</span>
          </div>
        </div>
        <div className={styles.themes}>
          {current.themes.map((t, i) => (
            <span key={i} className={styles.theme}>{t}</span>
          ))}
        </div>
      </section>

      {/* === ALL PHILOSOPHY TEXTS === */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Sæsonens filosofi</h2>
        {deep.philosophy?.map((text, i) => (
          <div key={i} className={styles.philosophyBlock}>
            {i === 0 ? (
              <p className={styles.philosophyText}>{text}</p>
            ) : (
              <Reveal preview={<span className={styles.revealHint}>Læs videre</span>}>
                <p className={styles.philosophyText}>{text}</p>
              </Reveal>
            )}
          </div>
        ))}
      </section>

      <div className={styles.illustrationBreak}>
        <SeasonIllustration element={current.element} variant={2} size={44} opacity={0.15} />
      </div>

      {/* === ALL BODY SIGNALS === */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Kroppens signaler</h2>
        <p className={styles.sectionIntro}>
          Når {current.element.toLowerCase()}-energien er i ubalance, kan kroppen sende disse signaler.
        </p>
        {deep.symptoms?.map((s, i) => (
          <div key={i} className={styles.symptomCard}>
            <h3 className={styles.symptomTitle}>{s.symptom}</h3>
            <Reveal preview={<span className={styles.revealHint}>Forstå og lindre</span>}>
              <p className={styles.bodyText}>{s.explanation}</p>
              <p className={styles.remedy}>{s.remedy}</p>
            </Reveal>
          </div>
        ))}
      </section>

      {/* === PRACTICE PREVIEW — links to Øvelser === */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Sæsonens praksis</h2>
        <div className={styles.practicePreview}>
          <div className={styles.practiceItem}>
            <span className={styles.practiceLabel}>Yoga</span>
            <span className={styles.practiceCount}>{deep.yogaSequence?.length} stillinger</span>
          </div>
          <div className={styles.practiceItem}>
            <span className={styles.practiceLabel}>Meditation</span>
            <span className={styles.practiceCount}>{deep.meditations?.length} guidede</span>
          </div>
          <div className={styles.practiceItem}>
            <span className={styles.practiceLabel}>Åndedræt</span>
            <span className={styles.practiceCount}>{deep.breathingExercises?.length} øvelser</span>
          </div>
          <div className={styles.practiceItem}>
            <span className={styles.practiceLabel}>Akupressur</span>
            <span className={styles.practiceCount}>{deep.acupressure?.length} punkter</span>
          </div>
        </div>
        <Link to="/oevelser" className={styles.practiceLink}>Gå til alle øvelser</Link>
      </section>

      <div className={styles.illustrationBreak}>
        <SeasonIllustration element={current.element} variant={1} size={44} opacity={0.15} />
      </div>

      {/* === ALL FOODS === */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Fra sæsonens køkken</h2>
        <p className={styles.sectionIntro}>
          Den {current.flavor.toLowerCase()}e smag styrker {current.organs.yin.toLowerCase()}en.
        </p>
        <div className={styles.foodGrid}>
          {deep.foodGuide?.map((food, i) => (
            <div key={i} className={styles.foodCard}>
              <h3 className={styles.foodName}>{food.name}</h3>
              <Reveal preview={<span className={styles.revealHint}>Hvorfor og hvordan</span>}>
                <p className={styles.bodyText}>{food.why}</p>
                {food.preparation && <p className={styles.remedy}>{food.preparation}</p>}
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* === ORGAN CLOCK GUIDE === */}
      {deep.organClockGuide && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Organur — {current.organs.yin} & {current.organs.yang}</h2>
          {deep.organClockGuide.map((g, i) => (
            <div key={i} className={styles.clockCard}>
              <span className={styles.clockTime}>Kl. {g.time}</span>
              <span className={styles.clockOrgan}>{g.organ}</span>
              <p className={styles.clockDo}>{g.doThis}</p>
              <p className={styles.clockAvoid}>{g.avoidThis}</p>
            </div>
          ))}
        </section>
      )}

      {/* === WEEKLY CHECK-IN === */}
      {deep.weeklyCheckIn && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Ugens tjek-ind</h2>
          <p className={styles.sectionIntro}>Refleksionsspørgsmål til din uge.</p>
          <ol className={styles.checkInList}>
            {deep.weeklyCheckIn.map((q, i) => (
              <li key={i} className={styles.checkInItem}>{q}</li>
            ))}
          </ol>
        </section>
      )}

      {/* === MILESTONES === */}
      {deep.milestones && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Din rejse gennem {current.name.toLowerCase()}en</h2>
          <div className={styles.milestones}>
            {deep.milestones.map((m, i) => {
              const [label, ...rest] = m.split(':')
              return (
                <div key={i} className={styles.milestone}>
                  <span className={styles.milestoneLabel}>{label.trim()}</span>
                  <p className={styles.milestoneText}>{rest.join(':').trim()}</p>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* === JOURNAL PROMPTS — all 10 === */}
      {deep.journalPrompts && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Sæsonens refleksioner</h2>
          <div className={styles.journalList}>
            {deep.journalPrompts.map((prompt, i) => (
              <p key={i} className={styles.journalPrompt}>{prompt}</p>
            ))}
          </div>
        </section>
      )}

      {/* === FOOTER === */}
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
