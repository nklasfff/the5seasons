import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SeasonIllustration from '../components/illustrations/SeasonIllustration'
import styles from './SeasonSub.module.css'

export default function SeasonFood({ season }) {
  const { current, deep } = season
  const foods = deep?.foodGuide || []

  if (!foods.length) return null

  return (
    <main className={styles.page}>
      <Link to="/saeson" className={styles.back}>← {current.name}</Link>

      <header className={styles.header}>
        <SeasonIllustration element={current.element} variant={3} size={90} opacity={0.5} />
        <h1 className={styles.title}>Sæsonens køkken</h1>
        <p className={styles.subtitle}>{current.flavor} smag styrker {current.element.toLowerCase()}-elementet</p>
      </header>

      <section className={styles.list}>
        {foods.map((f, i) => (
          <Reveal
            key={i}
            preview={
              <h3 className={styles.itemTitle}>{f.name}</h3>
            }
          >
            <p className={styles.body}>{f.why}</p>
            <p className={styles.hint}>{f.preparation}</p>
          </Reveal>
        ))}
      </section>
    </main>
  )
}
