import { useState, useMemo } from 'react'
import { dailyRotation } from '../hooks/useSeason'
import Reveal from '../components/Reveal'
import styles from './Practice.module.css'

/*
 * "Øvelser" — Guided practice.
 *
 * Feels like she's leading you through it.
 * Tabs to choose type, then one focused experience.
 * Not a list to scan — a place to practice.
 */

const TABS = [
  { key: 'breathing', label: 'Åndedræt' },
  { key: 'yoga', label: 'Yoga' },
  { key: 'meditation', label: 'Meditation' },
  { key: 'acupressure', label: 'Akupressur' },
  { key: 'eft', label: 'EFT' },
]

export default function Practice({ time, season }) {
  const { current, deep } = season
  const { mood } = time
  const [activeTab, setActiveTab] = useState('breathing')

  const breathing = useMemo(() => dailyRotation(deep?.breathingExercises), [deep])
  const yoga = useMemo(() => dailyRotation(deep?.yogaSequence), [deep])
  const meditation = useMemo(() => dailyRotation(deep?.meditations), [deep])
  const acupressure = useMemo(() => dailyRotation(deep?.acupressure), [deep])
  const eft = deep?.eftSequence

  return (
    <div className={styles.page}>

      <header className={styles.header}>
        <h1 className={styles.title}>Øvelser</h1>
        <p className={styles.subtitle}>{current.name} · {current.element}</p>
      </header>

      {/* === PRACTICE TYPE TABS === */}
      <div className={styles.tabs}>
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            className={`${styles.tab} ${activeTab === key ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* === PRACTICE CONTENT === */}
      <div className={styles.content}>

        {activeTab === 'breathing' && breathing && (
          <PracticeCard
            title={breathing.title}
            meta={breathing.rhythm}
          >
            <p className={styles.instruction}>{breathing.instruction}</p>
            <p className={styles.effect}>{breathing.effect}</p>
            <span className={styles.badge}>{breathing.rounds} runder</span>
          </PracticeCard>
        )}

        {activeTab === 'yoga' && yoga && (
          <PracticeCard
            title={yoga.name}
            meta={yoga.sanskrit}
          >
            <p className={styles.instruction}>{yoga.instruction}</p>
            <p className={styles.effect}>{yoga.benefit}</p>
            <span className={styles.badge}>{yoga.duration}</span>
          </PracticeCard>
        )}

        {activeTab === 'meditation' && meditation && (
          <PracticeCard
            title={meditation.title}
            meta={meditation.intention}
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
          </PracticeCard>
        )}

        {activeTab === 'acupressure' && acupressure && (
          <PracticeCard
            title={acupressure.name}
            meta={acupressure.chineseName}
          >
            <p className={styles.instruction}>{acupressure.location}</p>
            <p className={styles.instruction}>{acupressure.technique}</p>
            <p className={styles.effect}>{acupressure.benefit}</p>
            <span className={styles.badge}>{acupressure.duration}</span>
          </PracticeCard>
        )}

        {activeTab === 'eft' && eft && (
          <PracticeCard
            title={`${current.element}-elementets tapping`}
            meta="8 akupunkturpunkter"
          >
            <p className={styles.eftSetup}>{eft.setupPhrase}</p>
            <div className={styles.eftPoints}>
              {eft.points.map((p, i) => (
                <div key={i} className={styles.eftPoint}>
                  <span className={styles.eftNum}>{i + 1}</span>
                  <div>
                    <span className={styles.eftLocation}>{p.point}</span>
                    <p className={styles.eftAffirmation}>{p.affirmation}</p>
                  </div>
                </div>
              ))}
            </div>
          </PracticeCard>
        )}
      </div>

      <footer className={styles.closing}>
        <p className={styles.closingText}>{mood.message}</p>
      </footer>
    </div>
  )
}

function PracticeCard({ title, meta, children }) {
  return (
    <div className={styles.practiceCard}>
      <h2 className={styles.practiceTitle}>{title}</h2>
      {meta && <p className={styles.practiceMeta}>{meta}</p>}
      <Reveal preview={<span className={styles.revealHint}>Start øvelsen</span>}>
        <div className={styles.practiceBody}>
          {children}
        </div>
      </Reveal>
    </div>
  )
}
