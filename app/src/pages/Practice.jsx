import { useState } from 'react'
import Reveal from '../components/Reveal'
import SeasonIllustration from '../components/illustrations/SeasonIllustration'
import styles from './Practice.module.css'

/*
 * "Øvelser" — ALL practices visible. Not one rotation.
 * The full richness of her teaching, organized by type.
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

  if (!deep) return null

  return (
    <div className={styles.page}>

      <header className={styles.header}>
        <SeasonIllustration element={current.element} variant={4} size={60} opacity={0.25} />
        <h1 className={styles.title}>Øvelser</h1>
        <p className={styles.subtitle}>{current.name} · {current.element}</p>
      </header>

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

      <div className={styles.content}>

        {/* === ALL BREATHING EXERCISES === */}
        {activeTab === 'breathing' && deep.breathingExercises?.map((ex, i) => (
          <div key={i} className={styles.practiceCard}>
            <h2 className={styles.practiceTitle}>{ex.title}</h2>
            <p className={styles.practiceMeta}>{ex.rhythm}</p>
            <Reveal preview={<span className={styles.revealHint}>Start øvelsen</span>}>
              <div className={styles.practiceBody}>
                <p className={styles.instruction}>{ex.instruction}</p>
                <p className={styles.effect}>{ex.effect}</p>
                <span className={styles.badge}>{ex.rounds} runder</span>
              </div>
            </Reveal>
          </div>
        ))}

        {/* === ALL YOGA POSES === */}
        {activeTab === 'yoga' && deep.yogaSequence?.map((pose, i) => (
          <div key={i} className={styles.practiceCard}>
            <h2 className={styles.practiceTitle}>{pose.name}</h2>
            {pose.sanskrit && <p className={styles.practiceMeta}>{pose.sanskrit}</p>}
            <Reveal preview={<span className={styles.revealHint}>Se instruktion</span>}>
              <div className={styles.practiceBody}>
                <p className={styles.instruction}>{pose.instruction}</p>
                <p className={styles.effect}>{pose.benefit}</p>
                <span className={styles.badge}>{pose.duration}</span>
              </div>
            </Reveal>
          </div>
        ))}

        {/* === ALL MEDITATIONS === */}
        {activeTab === 'meditation' && deep.meditations?.map((med, i) => (
          <div key={i} className={styles.practiceCard}>
            <h2 className={styles.practiceTitle}>{med.title}</h2>
            <p className={styles.practiceMeta}>{med.intention}</p>
            <Reveal preview={<span className={styles.revealHint}>Start meditation</span>}>
              <div className={styles.practiceBody}>
                <ol className={styles.steps}>
                  {med.steps.map((step, j) => (
                    <li key={j} className={styles.step}>
                      <span className={styles.stepNum}>{j + 1}</span>
                      <p className={styles.stepText}>{step}</p>
                    </li>
                  ))}
                </ol>
                <span className={styles.badge}>{med.duration}</span>
              </div>
            </Reveal>
          </div>
        ))}

        {/* === ALL ACUPRESSURE POINTS === */}
        {activeTab === 'acupressure' && deep.acupressure?.map((point, i) => (
          <div key={i} className={styles.practiceCard}>
            <h2 className={styles.practiceTitle}>{point.name}</h2>
            {point.chineseName && <p className={styles.practiceMeta}>{point.chineseName}</p>}
            <Reveal preview={<span className={styles.revealHint}>Find punktet</span>}>
              <div className={styles.practiceBody}>
                <p className={styles.instruction}><strong>Placering:</strong> {point.location}</p>
                <p className={styles.instruction}><strong>Teknik:</strong> {point.technique}</p>
                <p className={styles.effect}>{point.benefit}</p>
                <span className={styles.badge}>{point.duration}</span>
              </div>
            </Reveal>
          </div>
        ))}

        {/* === EFT TAPPING — full sequence === */}
        {activeTab === 'eft' && deep.eftSequence && (
          <div className={styles.practiceCard}>
            <h2 className={styles.practiceTitle}>{current.element}-elementets tapping</h2>
            <p className={styles.practiceMeta}>8 akupunkturpunkter med affirmationer</p>
            <Reveal preview={<span className={styles.revealHint}>Start tapping</span>}>
              <div className={styles.practiceBody}>
                <p className={styles.eftSetup}>{deep.eftSequence.setupPhrase}</p>
                <div className={styles.eftPoints}>
                  {deep.eftSequence.points.map((p, i) => (
                    <div key={i} className={styles.eftPoint}>
                      <span className={styles.eftNum}>{i + 1}</span>
                      <div>
                        <span className={styles.eftLocation}>{p.point}</span>
                        <p className={styles.eftAffirmation}>{p.affirmation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        )}
      </div>

      <footer className={styles.closing}>
        <p className={styles.closingText}>{mood.message}</p>
      </footer>
    </div>
  )
}
