import { useMemo } from 'react'
import { dailyRotation } from '../hooks/useSeason'
import Reveal from '../components/Reveal'
import SeasonIllustration from '../components/illustrations/SeasonIllustration'
import styles from './Practice.module.css'

export default function Practice({ time, season }) {
  const { current, deep } = season
  const { hour, mood } = time

  const yoga = useMemo(() => dailyRotation(deep?.yogaSequence), [deep])
  const meditation = useMemo(() => dailyRotation(deep?.meditations), [deep])
  const breathing = useMemo(() => dailyRotation(deep?.breathingExercises), [deep])
  const acupressure = useMemo(() => dailyRotation(deep?.acupressure), [deep])
  const eft = deep?.eftSequence

  const timeContext = useMemo(() => {
    if (hour >= 5 && hour < 11) return 'Morgenen kalder på åndedræt og bevægelse'
    if (hour >= 11 && hour < 15) return 'Middagen inviterer til stilhed'
    if (hour >= 15 && hour < 18) return 'Eftermiddagen beder om blid berøring'
    if (hour >= 18 && hour < 22) return 'Aftenen kalder på ro og refleksion'
    return 'Natten hviler. Vend tilbage i morgen.'
  }, [hour])

  return (
    <div className={styles.page}>

      <header className={styles.header}>
        <SeasonIllustration element={current.element} variant={3} size={48} opacity={0.25} />
        <h1 className={styles.title}>Praksis</h1>
        <p className={styles.subtitle}>{timeContext}</p>
        <p className={styles.seasonContext}>{current.name} · {current.element}</p>
      </header>

      {/* === BREATHING === */}
      {breathing && (
        <section className={styles.section}>
          <Reveal
            preview={
              <>
                <span className={styles.label}>Åndedræt</span>
                <h2 className={styles.sectionTitle}>{breathing.title}</h2>
                <p className={styles.teaser}>{breathing.rhythm}</p>
              </>
            }
          >
            <p className={styles.body}>{breathing.instruction}</p>
            <p className={styles.effect}>{breathing.effect}</p>
            <span className={styles.badge}>{breathing.rounds} runder</span>
          </Reveal>
        </section>
      )}

      <Divider />

      {/* === YOGA === */}
      {yoga && (
        <section className={styles.section}>
          <Reveal
            preview={
              <>
                <span className={styles.label}>Yoga</span>
                <h2 className={styles.sectionTitle}>{yoga.name}</h2>
                {yoga.sanskrit && <p className={styles.teaser}>{yoga.sanskrit}</p>}
              </>
            }
          >
            <p className={styles.body}>{yoga.instruction}</p>
            <p className={styles.effect}>{yoga.benefit}</p>
            <span className={styles.badge}>{yoga.duration}</span>
          </Reveal>
        </section>
      )}

      <Divider />

      {/* === MEDITATION === */}
      {meditation && (
        <section className={styles.section}>
          <Reveal
            preview={
              <>
                <span className={styles.label}>Meditation</span>
                <h2 className={styles.sectionTitle}>{meditation.title}</h2>
                <p className={styles.teaser}>{meditation.intention}</p>
              </>
            }
          >
            <ol className={styles.steps}>
              {meditation.steps.map((step, i) => (
                <li key={i} className={styles.step}>
                  <span className={styles.stepNum}>{i + 1}</span>
                  <p className={styles.stepText}>{step}</p>
                </li>
              ))}
            </ol>
            <span className={styles.badge}>{meditation.duration}</span>
          </Reveal>
        </section>
      )}

      <Divider />

      {/* === ACUPRESSURE === */}
      {acupressure && (
        <section className={styles.section}>
          <Reveal
            preview={
              <>
                <span className={styles.label}>Akupressur</span>
                <h2 className={styles.sectionTitle}>{acupressure.name}</h2>
                {acupressure.chineseName && <p className={styles.teaser}>{acupressure.chineseName}</p>}
              </>
            }
          >
            <p className={styles.body}>{acupressure.location}</p>
            <p className={styles.body}>{acupressure.technique}</p>
            <p className={styles.effect}>{acupressure.benefit}</p>
            <span className={styles.badge}>{acupressure.duration}</span>
          </Reveal>
        </section>
      )}

      <Divider />

      {/* === EFT TAPPING === */}
      {eft && (
        <section className={styles.section}>
          <Reveal
            preview={
              <>
                <span className={styles.label}>EFT Tapping</span>
                <h2 className={styles.sectionTitle}>{current.element}-elementets tapping</h2>
                <p className={styles.teaser}>8 akupunkturpunkter med affirmationer</p>
              </>
            }
          >
            <p className={styles.eftSetup}>{eft.setupPhrase}</p>
            <div className={styles.eftPoints}>
              {eft.points.map((p, i) => (
                <div key={i} className={styles.eftPoint}>
                  <span className={styles.eftDot} />
                  <div>
                    <span className={styles.eftLocation}>{p.point}</span>
                    <p className={styles.eftAffirmation}>{p.affirmation}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      <footer className={styles.closing}>
        <p className={styles.closingText}>{mood.message}</p>
      </footer>
    </div>
  )
}

function Divider() {
  return <div className={styles.divider}><div className={styles.dividerLine} /></div>
}
