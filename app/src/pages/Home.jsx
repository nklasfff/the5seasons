import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { dailyRotation } from '../hooks/useSeason'
import SeasonIllustration from '../components/illustrations/SeasonIllustration'
import styles from './Home.module.css'

const ORGAN_POETRY = {
  'Galdeblære': 'Galdeblæren sorterer nattens drømme. Slip tanker og lad kroppen hvile.',
  'Lever': 'Leveren renser og fornyer. Dyb søvn er din bedste medicin nu.',
  'Lunger': 'Lungerne fylder sig med morgenens første åndedrag. Livskraften vågner.',
  'Tyktarm': 'Kroppen renser og gør plads til det nye. Et godt tidspunkt at starte dagen.',
  'Mave': 'Maven er klar til at modtage næring. Spis varmt og roligt.',
  'Milt': 'Milten omdanner næring til energi. Lad tankerne falde til ro.',
  'Hjerte': 'Hjertet er på sit mest åbne. Forbind dig med det der betyder noget.',
  'Tyndtarm': 'Tyndtarmen sorterer det vigtige fra det uvigtige. Hvad har du brug for?',
  'Blære': 'Blæren frigiver det unødvendige. Lad eftermiddagen være en blid landing.',
  'Nyrer': 'Nyrerne samler dagens essens. Drik varmt og find ro.',
  'Perikardium': 'Hjertebeskytteren omslutter dig. Giv dig selv omsorg i aftentimerne.',
  'Trippelvarmer': 'Energien harmoniserer. Lad kroppen forberede sig på søvn.',
}

export default function Home({ time, season, dynamics }) {
  const { current, deep } = season
  const { greeting, organ, mood, hour } = time
  const { relation } = dynamics

  const journalPrompt = useMemo(() => dailyRotation(deep?.journalPrompts), [deep])
  const philosophy = useMemo(() => dailyRotation(deep?.philosophy, 3), [deep])
  const foodTip = useMemo(() => dailyRotation(deep?.foodGuide, 7), [deep])

  const organPoetry = organ ? ORGAN_POETRY[organ.name] : ''
  const timeString = `${String(hour).padStart(2, '0')}:${String(time.now.getMinutes()).padStart(2, '0')}`

  return (
    <div className={styles.home}>

      {/* === THE OPENING — Full-screen moment === */}
      <section className={styles.hero}>
        <div className={styles.heroCenter}>
          <span className={styles.character}>{current.chineseChar}</span>
          <h1 className={styles.greeting}>{greeting}</h1>
          <p className={styles.seasonLine}>
            {current.name} · {current.element}
          </p>
        </div>
        <div className={styles.heroBottom}>
          <span className={styles.clock}>{timeString}</span>
          {organ && <span className={styles.organLabel}>{organ.name}-tid</span>}
        </div>
      </section>

      {/* === THE LIVING STATE === */}
      {relation && (
        <section className={styles.state}>
          <span className={styles.stateLabel}>{relation.label}</span>
          <p className={styles.stateText}>{relation.description}</p>
          <p className={styles.stateAdvice}>{relation.advice}</p>
        </section>
      )}

      <Divider />

      {/* === ORGAN CLOCK POETRY === */}
      {organ && (
        <section className={styles.moment}>
          <p className={styles.momentText}>{organPoetry}</p>
          <span className={styles.momentQuality}>{mood.quality}</span>
        </section>
      )}

      <Divider />

      {/* === TODAY'S PRACTICE === */}
      {deep && (
        <section className={styles.practice}>
          <PracticeSuggestion hour={hour} deep={deep} dynamics={dynamics} />
          <Link to="/praksis" className={styles.practiceLink}>
            Gå til praksis
          </Link>
        </section>
      )}

      <Divider />

      {/* === DAILY WISDOM === */}
      {philosophy && (
        <section className={styles.wisdom}>
          <blockquote className={styles.quote}>
            {philosophy.length > 180
              ? philosophy.slice(0, philosophy.indexOf('.', 120) + 1)
              : philosophy}
          </blockquote>
          <Link to="/saeson" className={styles.wisdomLink}>
            Sæsonens tråd
          </Link>
        </section>
      )}

      <Divider />

      {/* === JOURNAL === */}
      {journalPrompt && (
        <section className={styles.journal}>
          <span className={styles.sectionTag}>Dagens refleksion</span>
          <p className={styles.journalText}>{journalPrompt}</p>
        </section>
      )}

      <Divider />

      {/* === FOOD === */}
      {foodTip && (
        <section className={styles.food}>
          <span className={styles.sectionTag}>Fra sæsonens køkken</span>
          <h3 className={styles.foodName}>{foodTip.name}</h3>
          <p className={styles.foodWhy}>{foodTip.why}</p>
        </section>
      )}

      {/* === CLOSING === */}
      <section className={styles.closing}>
        <SeasonIllustration element={current.element} variant={2} size={60} opacity={0.2} />
        <p className={styles.closingText}>{mood.message}</p>
      </section>
    </div>
  )
}

function Divider() {
  return <div className={styles.divider}><div className={styles.dividerLine} /></div>
}

function PracticeSuggestion({ hour, deep, dynamics }) {
  const { recommendation } = dynamics

  const suggestion = useMemo(() => {
    const focus = recommendation?.focus || 'meditation'

    if (focus === 'breathing') {
      const ex = dailyRotation(deep.breathingExercises)
      if (ex) return { type: 'Åndedræt', title: ex.title, detail: recommendation.reason, label: ex.rhythm }
    }
    if (focus === 'yoga') {
      const pose = dailyRotation(deep.yogaSequence)
      if (pose) return { type: 'Yoga', title: pose.name, detail: recommendation.reason, label: pose.duration }
    }
    if (focus === 'meditation') {
      const med = dailyRotation(deep.meditations)
      if (med) return { type: 'Meditation', title: med.title, detail: recommendation.reason, label: med.duration }
    }
    if (focus === 'acupressure') {
      const point = dailyRotation(deep.acupressure)
      if (point) return { type: 'Akupressur', title: point.name, detail: recommendation.reason, label: point.duration }
    }
    if (focus === 'eft') {
      return { type: 'EFT Tapping', title: `${deep.element || ''}-elementets tapping`, detail: recommendation.reason, label: '8 punkter' }
    }

    return { type: 'Hvile', title: 'Giv dig selv ro', detail: 'Natten er til regenerering.', label: '' }
  }, [hour, deep, recommendation])

  return (
    <>
      <span className={styles.sectionTag}>Lige nu</span>
      <span className={styles.practiceType}>{suggestion.type}</span>
      <h2 className={styles.practiceTitle}>{suggestion.title}</h2>
      <p className={styles.practiceDetail}>{suggestion.detail}</p>
      {suggestion.label && (
        <span className={styles.badge}>{suggestion.label}</span>
      )}
    </>
  )
}
