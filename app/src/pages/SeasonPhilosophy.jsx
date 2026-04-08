import { useState } from 'react'
import { Link } from 'react-router-dom'
import SeasonIllustration from '../components/illustrations/SeasonIllustration'
import styles from './SeasonSub.module.css'

export default function SeasonPhilosophy({ season }) {
  const { current, deep } = season
  const texts = deep?.philosophy || []
  const [index, setIndex] = useState(0)

  if (!texts.length) return null

  return (
    <main className={styles.page}>
      <Link to="/saeson" className={styles.back}>← {current.name}</Link>

      <header className={styles.header}>
        <SeasonIllustration element={current.element} variant={2} size={90} opacity={0.5} />
        <h1 className={styles.title}>Filosofi</h1>
        <p className={styles.count}>{index + 1} af {texts.length}</p>
      </header>

      <section className={styles.content}>
        <p className={styles.body}>{texts[index]}</p>
      </section>

      <nav className={styles.nav}>
        <button
          className={styles.navBtn}
          onClick={() => setIndex(i => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          Forrige
        </button>
        <button
          className={styles.navBtn}
          onClick={() => setIndex(i => Math.min(texts.length - 1, i + 1))}
          disabled={index === texts.length - 1}
        >
          Næste
        </button>
      </nav>
    </main>
  )
}
