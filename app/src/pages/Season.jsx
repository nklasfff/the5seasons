import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SeasonIllustration from '../components/illustrations/SeasonIllustration'
import styles from './Season.module.css'

export default function Season({ season }) {
  const { current, deep } = season
  if (!deep) return null

  return (
    <div className={styles.page}>

      <section className={styles.opening}>
        <SeasonIllustration element={current.element} variant={0} size={180} opacity={0.3} />
        <h1 className={styles.seasonName}>{current.name}</h1>
        <p className={styles.element}>{current.element} · {current.chineseChar}</p>
        <p className={styles.months}>{current.monthLabel}</p>
      </section>

      <section className={styles.essence}>
        <p className={styles.essenceText}>{current.description}</p>
      </section>

      {/* === EMOTIONS — always visible, compact === */}
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

      {/* === PHILOSOPHY — first text visible, rest foldable === */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Sæsonens filosofi</h2>
        {deep.philosophy?.[0] && (
          <p className={styles.philosophyText}>{deep.philosophy[0]}</p>
        )}
        {deep.philosophy?.length > 1 && (
          <Reveal preview={<span className={styles.revealHint}>Læs de øvrige {deep.philosophy.length - 1} tekster</span>}>
            <div className={styles.foldedContent}>
              {deep.philosophy.slice(1).map((text, i) => (
                <p key={i} className={styles.philosophyText}>{text}</p>
              ))}
            </div>
          </Reveal>
        )}
      </section>

      <div className={styles.illustrationBreak}>
        <SeasonIllustration element={current.element} variant={2} size={44} opacity={0.15} />
      </div>

      {/* === BODY SIGNALS — first visible, rest in fold === */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Kroppens signaler</h2>
        {deep.symptoms?.[0] && (
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>{deep.symptoms[0].symptom}</h3>
            <Reveal preview={<span className={styles.revealHint}>Forstå og lindre</span>}>
              <p className={styles.bodyText}>{deep.symptoms[0].explanation}</p>
              <p className={styles.remedy}>{deep.symptoms[0].remedy}</p>
            </Reveal>
          </div>
        )}
        {deep.symptoms?.length > 1 && (
          <Reveal preview={<span className={styles.revealHint}>Se alle {deep.symptoms.length} signaler</span>}>
            <div className={styles.foldedContent}>
              {deep.symptoms.slice(1).map((s, i) => (
                <div key={i} className={styles.card}>
                  <h3 className={styles.cardTitle}>{s.symptom}</h3>
                  <Reveal preview={<span className={styles.revealHint}>Forstå og lindre</span>}>
                    <p className={styles.bodyText}>{s.explanation}</p>
                    <p className={styles.remedy}>{s.remedy}</p>
                  </Reveal>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </section>

      {/* === PRACTICE PREVIEW — links to Øvelser === */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Sæsonens praksis</h2>
        <div className={styles.practiceGrid}>
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
        <Link to="/oevelser" className={styles.link}>Gå til alle øvelser</Link>
      </section>

      <div className={styles.illustrationBreak}>
        <SeasonIllustration element={current.element} variant={1} size={44} opacity={0.15} />
      </div>

      {/* === FOOD — first visible, rest in fold === */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Fra sæsonens køkken</h2>
        <p className={styles.sectionIntro}>
          Den {current.flavor.toLowerCase()}e smag styrker {current.organs.yin.toLowerCase()}en.
        </p>
        {deep.foodGuide?.[0] && (
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>{deep.foodGuide[0].name}</h3>
            <Reveal preview={<span className={styles.revealHint}>Hvorfor og hvordan</span>}>
              <p className={styles.bodyText}>{deep.foodGuide[0].why}</p>
              {deep.foodGuide[0].preparation && <p className={styles.remedy}>{deep.foodGuide[0].preparation}</p>}
            </Reveal>
          </div>
        )}
        {deep.foodGuide?.length > 1 && (
          <Reveal preview={<span className={styles.revealHint}>Se alle {deep.foodGuide.length} fødevarer</span>}>
            <div className={styles.foldedContent}>
              {deep.foodGuide.slice(1).map((food, i) => (
                <div key={i} className={styles.card}>
                  <h3 className={styles.cardTitle}>{food.name}</h3>
                  <Reveal preview={<span className={styles.revealHint}>Hvorfor og hvordan</span>}>
                    <p className={styles.bodyText}>{food.why}</p>
                    {food.preparation && <p className={styles.remedy}>{food.preparation}</p>}
                  </Reveal>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </section>

      {/* === ORGAN CLOCK — compact, foldable === */}
      {deep.organClockGuide && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Organur</h2>
          <Reveal preview={
            <span className={styles.revealHint}>
              {current.organs.yin} & {current.organs.yang} — se tiderne
            </span>
          }>
            <div className={styles.foldedContent}>
              {deep.organClockGuide.map((g, i) => (
                <div key={i} className={styles.clockItem}>
                  <div className={styles.clockHeader}>
                    <span className={styles.clockTime}>Kl. {g.time}</span>
                    <span className={styles.clockOrgan}>{g.organ}</span>
                  </div>
                  <p className={styles.bodyText}>{g.doThis}</p>
                  <p className={styles.clockAvoid}>{g.avoidThis}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* === WEEKLY CHECK-IN — foldable === */}
      {deep.weeklyCheckIn && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Ugens tjek-ind</h2>
          <Reveal preview={<span className={styles.revealHint}>{deep.weeklyCheckIn.length} refleksionsspørgsmål</span>}>
            <ol className={styles.numberedList}>
              {deep.weeklyCheckIn.map((q, i) => (
                <li key={i} className={styles.numberedItem}>{q}</li>
              ))}
            </ol>
          </Reveal>
        </section>
      )}

      {/* === MILESTONES — foldable === */}
      {deep.milestones && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Din rejse</h2>
          <Reveal preview={<span className={styles.revealHint}>Se {deep.milestones.length} milepæle</span>}>
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
          </Reveal>
        </section>
      )}

      {/* === JOURNAL — first 3 visible, rest foldable === */}
      {deep.journalPrompts && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Sæsonens refleksioner</h2>
          {deep.journalPrompts.slice(0, 3).map((prompt, i) => (
            <p key={i} className={styles.journalPrompt}>{prompt}</p>
          ))}
          {deep.journalPrompts.length > 3 && (
            <Reveal preview={<span className={styles.revealHint}>Se alle {deep.journalPrompts.length} refleksioner</span>}>
              <div className={styles.foldedContent}>
                {deep.journalPrompts.slice(3).map((prompt, i) => (
                  <p key={i} className={styles.journalPrompt}>{prompt}</p>
                ))}
              </div>
            </Reveal>
          )}
        </section>
      )}

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
