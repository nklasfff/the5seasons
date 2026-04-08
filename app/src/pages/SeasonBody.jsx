import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SeasonIllustration from '../components/illustrations/SeasonIllustration'
import styles from './SeasonSub.module.css'

export default function SeasonBody({ season }) {
  const { current, deep } = season
  const symptoms = deep?.symptoms || []

  if (!symptoms.length) return null

  return (
    <main className={styles.page}>
      <Link to="/saeson" className={styles.back}>← {current.name}</Link>

      <header className={styles.header}>
        <SeasonIllustration element={current.element} variant={1} size={90} opacity={0.5} />
        <h1 className={styles.title}>Krop & signaler</h1>
        <p className={styles.subtitle}>Hvad din krop fortæller dig i {current.name.toLowerCase()}en</p>
      </header>

      <section className={styles.list}>
        {symptoms.map((s, i) => (
          <Reveal
            key={i}
            preview={
              <h3 className={styles.itemTitle}>{s.symptom}</h3>
            }
          >
            <p className={styles.body}>{s.explanation}</p>
            <p className={styles.hint}>{s.remedy}</p>
          </Reveal>
        ))}
      </section>
    </main>
  )
}
