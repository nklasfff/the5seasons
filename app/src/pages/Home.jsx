import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { dailyRotation } from '../hooks/useSeason'
import SeasonIllustration from '../components/illustrations/SeasonIllustration'
import styles from './Home.module.css'

/*
 * "I dag" — Your daily companion.
 *
 * Uses variant 3 (seed/essence) — the beginning of the day.
 * Shows organ clock guidance (time-specific TCM advice).
 * One practice, one reflection, one food. Warm and focused.
 */

const SEASON_INVITATIONS = {
  foraar: 'Foråret inviterer dig til at vokse. Hvad vil du give plads til?',
  sommer: 'Sommeren åbner dit hjerte. Hvad vil du forbinde dig med i dag?',
  sensommer: 'Sensommeren nærer dig. Hvad har du brug for at modtage?',
  efteraar: 'Efteråret beder dig give slip. Hvad er du klar til at frigive?',
  vinter: 'Vinteren holder dig. Hvad finder du, når du lytter indad?',
}

const PRACTICE_NAMES = {
  breathing: 'Åndedræt',
  yoga: 'Yoga',
  meditation: 'Meditation',
  acupressure: 'Akupressur',
  eft: 'EFT Tapping',
}

export default function Home({ time, season, dynamics }) {
  const { current, deep } = season
  const { greeting, mood, organ, hour } = time
  const { recommendation } = dynamics

  const philosophy = useMemo(() => dailyRotation(deep?.philosophy, 3), [deep])
  const journalPrompt = useMemo(() => dailyRotation(deep?.journalPrompts), [deep])
  const foodTip = useMemo(() => dailyRotation(deep?.foodGuide, 7), [deep])

  // Organ clock advice — what to do/avoid RIGHT NOW
  const organAdvice = useMemo(() => {
    if (!deep?.organClockGuide || !organ) return null
    return deep.organClockGuide.find(g => g.organ === organ.name)
  }, [deep, organ])

  // Today's practice
  const todaysPractice = useMemo(() => {
    const focus = recommendation?.focus || 'meditation'
    if (focus === 'breathing') {
      const item = dailyRotation(deep?.breathingExercises)
      return item ? { type: 'breathing', title: item.title, hint: item.rhythm } : null
    }
    if (focus === 'yoga') {
      const item = dailyRotation(deep?.yogaSequence)
      return item ? { type: 'yoga', title: item.name, hint: item.duration } : null
    }
    if (focus === 'meditation') {
      const item = dailyRotation(deep?.meditations)
      return item ? { type: 'meditation', title: item.title, hint: item.duration } : null
    }
    if (focus === 'acupressure') {
      const item = dailyRotation(deep?.acupressure)
      return item ? { type: 'acupressure', title: item.name, hint: item.duration } : null
    }
    if (focus === 'eft') {
      return { type: 'eft', title: `${current.element}-elementets tapping`, hint: '8 punkter' }
    }
    return null
  }, [deep, recommendation, current.element])

  // Wisdom — first two sentences
  const wisdomText = useMemo(() => {
    if (!philosophy) return ''
    const firstDot = philosophy.indexOf('.', 40)
    const secondDot = philosophy.indexOf('.', firstDot + 1)
    if (secondDot > 0 && secondDot < 200) return philosophy.slice(0, secondDot + 1)
    if (firstDot > 0) return philosophy.slice(0, firstDot + 1)
    return philosophy.slice(0, 160)
  }, [philosophy])

  const timeString = `${String(hour).padStart(2, '0')}:${String(time.now.getMinutes()).padStart(2, '0')}`

  return (
    <div className={styles.page}>

      {/* === WELCOME — seed illustration, seasonal greeting === */}
      <section className={styles.welcome}>
        <SeasonIllustration element={current.element} variant={3} size={90} opacity={0.35} />
        <h1 className={styles.greeting}>{greeting}</h1>
        <p className={styles.seasonLabel}>{current.name}</p>
        <p className={styles.invitation}>{SEASON_INVITATIONS[current.id]}</p>
      </section>

      {/* === ORGAN CLOCK — time-specific TCM wisdom === */}
      {organAdvice && (
        <section className={styles.organClock}>
          <div className={styles.organHeader}>
            <span className={styles.organTime}>{timeString}</span>
            <span className={styles.organName}>{organ.name}-tid</span>
          </div>
          <p className={styles.organDo}>{organAdvice.doThis}</p>
          <p className={styles.organAvoid}>{organAdvice.avoidThis}</p>
        </section>
      )}

      {/* === TODAY'S PRACTICE === */}
      {todaysPractice && (
        <section className={styles.card}>
          <span className={styles.cardLabel}>Din praksis i dag</span>
          <span className={styles.practiceType}>{PRACTICE_NAMES[todaysPractice.type]}</span>
          <h2 className={styles.practiceTitle}>{todaysPractice.title}</h2>
          {todaysPractice.hint && <span className={styles.practiceHint}>{todaysPractice.hint}</span>}
          <Link to="/oevelser" className={styles.cardAction}>Gå til øvelser</Link>
        </section>
      )}

      {/* === WISDOM === */}
      {wisdomText && (
        <section className={styles.wisdom}>
          <blockquote className={styles.wisdomQuote}>{wisdomText}</blockquote>
          <Link to="/saeson" className={styles.wisdomLink}>Læs mere om {current.name.toLowerCase()}en</Link>
        </section>
      )}

      {/* === JOURNAL === */}
      {journalPrompt && (
        <section className={styles.card}>
          <span className={styles.cardLabel}>Til refleksion</span>
          <p className={styles.reflectionText}>{journalPrompt}</p>
        </section>
      )}

      {/* === FOOD === */}
      {foodTip && (
        <section className={styles.card}>
          <span className={styles.cardLabel}>Fra sæsonens køkken</span>
          <h3 className={styles.foodName}>{foodTip.name}</h3>
          <p className={styles.foodDescription}>{foodTip.why}</p>
          {foodTip.preparation && (
            <p className={styles.foodPrep}>{foodTip.preparation}</p>
          )}
        </section>
      )}

      {/* === CLOSING === */}
      <section className={styles.closing}>
        <p className={styles.closingMood}>{mood.message}</p>
        <p className={styles.closingPhilosophy}>Det du nærer, vokser.</p>
      </section>
    </div>
  )
}
