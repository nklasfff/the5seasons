import { seasons } from '../data/seasons'
import SeasonIllustration from '../components/illustrations/SeasonIllustration'
import styles from './Univers.module.css'

const SEASON_ORDER = ['foraar', 'sommer', 'sensommer', 'efteraar', 'vinter']

export default function Univers({ season }) {
  const { current } = season

  return (
    <div className={styles.page}>

      {/* === BRAND HEADER === */}
      <header className={styles.header}>
        <h1 className={styles.brandName}>Isabelle Evita</h1>
        <p className={styles.tagline}>Et Liv i Vækst</p>
      </header>

      {/* === THE FIVE SEASONS WHEEL === */}
      <section className={styles.wheel}>
        <p className={styles.wheelIntro}>
          Fem årstider. Fem elementer. Fem veje til balance.
        </p>
        <div className={styles.elements}>
          {SEASON_ORDER.map(id => {
            const s = seasons.find(s => s.id === id)
            const isActive = s.id === current.id
            return (
              <div key={id} className={`${styles.element} ${isActive ? styles.elementActive : ''}`}>
                <span className={styles.elementChar} style={{ color: s.color }}>{s.chineseChar}</span>
                <span className={styles.elementName}>{s.name}</span>
                <span className={styles.elementDetail}>{s.element}</span>
              </div>
            )
          })}
        </div>
        <p className={styles.wheelNote}>
          Du er i {current.name.toLowerCase()}en. {current.element}-energien præger dit liv lige nu.
        </p>
      </section>

      <Divider />

      {/* === THE BOOK === */}
      <section className={styles.book}>
        <span className={styles.sectionTag}>Bogen</span>
        <h2 className={styles.bookTitle}>De 5 Årstiders Energi</h2>
        <p className={styles.bookSubtitle}>Inspiration for krop, sind og sjæl</p>
        <p className={styles.bookDescription}>
          En guide til at leve i takt med naturens rytme gennem de fem elementer,
          kinesisk medicin, yin yoga, mindfulness og sæsonens visdom.
        </p>
        <span className={styles.bookMeta}>Bestseller · 15.000+ solgte · 3. udgave</span>
      </section>

      <Divider />

      {/* === THE PHILOSOPHY === */}
      <section className={styles.philosophy}>
        <span className={styles.sectionTag}>Filosofien</span>
        <blockquote className={styles.philosophyQuote}>
          Det du nærer, vokser.
        </blockquote>
        <p className={styles.philosophyText}>
          Denne app er en forlængelse af bogen — et levende, dynamisk rum
          der følger dig gennem dagens timer og årets sæsoner. Den kinesiske
          medicins organur, de fem elementers samspil, og sæsonens praksis
          møder dig præcis hvor du er, lige nu.
        </p>
      </section>

      <Divider />

      {/* === THE ELEMENTS DEEPER === */}
      <section className={styles.elementsDeep}>
        <span className={styles.sectionTag}>De fem elementer</span>
        {SEASON_ORDER.map(id => {
          const s = seasons.find(s => s.id === id)
          const isActive = s.id === current.id
          return (
            <div key={id} className={`${styles.elementCard} ${isActive ? styles.elementCardActive : ''}`}>
              <div className={styles.cardHeader}>
                <SeasonIllustration element={s.element} variant={0} size={40} color={s.color} opacity={0.4} />
                <div>
                  <h3 className={styles.cardName}>{s.name} · {s.element}</h3>
                  <p className={styles.cardOrgans}>{s.organs.yin} & {s.organs.yang}</p>
                </div>
              </div>
              <p className={styles.cardDirection}>{s.direction} · {s.flavor} · {s.climate}</p>
              <div className={styles.cardEmotion}>
                <span>{s.emotion.balanced}</span>
                <span className={styles.cardBridge} />
                <span className={styles.cardImbalanced}>{s.emotion.imbalanced}</span>
              </div>
            </div>
          )
        })}
      </section>

      <Divider />

      {/* === THE PRACTICE FORMS === */}
      <section className={styles.forms}>
        <span className={styles.sectionTag}>Praksisformer</span>
        <div className={styles.formsList}>
          {[
            { title: 'Yin Yoga', desc: 'Stille holdninger der åbner meridianer og væv' },
            { title: 'Åndedræt', desc: 'Pranayama tilpasset sæsonens element' },
            { title: 'Meditation', desc: 'Guidet stilhed med sæsonens intention' },
            { title: 'Akupressur', desc: 'Punkter der styrker sæsonens organpar' },
            { title: 'EFT Tapping', desc: 'Affirmationer på kroppens energipunkter' },
            { title: 'Journaling', desc: 'Daglige refleksionsspørgsmål' },
          ].map((form, i) => (
            <div key={i} className={styles.formItem}>
              <h4 className={styles.formTitle}>{form.title}</h4>
              <p className={styles.formDesc}>{form.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          Isabelle Evita Søndergaard
        </p>
        <p className={styles.footerSubtext}>
          Forfatter · Yogalærer · Human Energy Futurist
        </p>
        <p className={styles.footerLink}>isabelleevita.dk</p>
      </footer>
    </div>
  )
}

function Divider() {
  return <div className={styles.divider}><div className={styles.dividerLine} /></div>
}
