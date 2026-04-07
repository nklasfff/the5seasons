import { useSeason } from '../context/SeasonContext';
import { getGreeting } from '../utils/dateUtils';
import SeasonWheel from '../components/illustrations/SeasonWheel';
import GlassCard from '../components/common/GlassCard';
import styles from './HomePage.module.css';

const wisdomBySeason = {
  foraar: [
    'Lad vrede være en vejviser — den viser dig hvor dine grænser er.',
    'Foråret minder dig om at fornyelse kræver mod til at begynde forfra.',
    'Som et træ der vokser mod lyset — find din retning og stræk dig.',
  ],
  sommer: [
    'Dit hjerte kender forskellen mellem frygt og kærlighed. Vælg kærlighed.',
    'Sommeren inviterer dig til at leve fuldt ud — ikke perfekt, men ægte.',
    'Passion uden rod bliver rastløshed. Find din ild og giv den retning.',
  ],
  sensommer: [
    'Du behøver ikke gøre mere. Du behøver at modtage det der allerede er.',
    'Fordøjelse handler ikke kun om mad — det handler om at integrere livet.',
    'Mærk jorden under dine fødder. Du er allerede hjemme.',
  ],
  efteraar: [
    'At slippe er ikke at tabe. Det er at gøre plads til det nye.',
    'Sorg er kærlighedens ekko. Giv den plads.',
    'Efteråret viser os at skønhed også findes i det der falder.',
  ],
  vinter: [
    'Hvile er ikke dovenskab. Det er visdom i dens reneste form.',
    'Vinteren inviterer dig indad — til stilhed, dybde og essens.',
    'Stol på at frøet gror i mørket. Du behøver ikke forstå alt nu.',
  ],
};

export default function HomePage() {
  const { current } = useSeason();
  const dayIndex = new Date().getDate() % wisdomBySeason[current.id].length;
  const wisdom = wisdomBySeason[current.id][dayIndex];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.greeting}>{getGreeting()}</p>
        <h1 className={styles.seasonName} style={{ color: current.color }}>
          {current.chineseChar} {current.name}
        </h1>
      </header>

      <section className={styles.heroSection}>
        <SeasonWheel size={220} />
      </section>

      <section className={styles.cards}>
        <GlassCard glowColor={`${current.color}20`} className={styles.tappable}>
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>Aktuel sæson</span>
            <span className={styles.cardAccent} style={{ color: current.color }}>
              {current.element}
            </span>
          </div>
          <h3 className={styles.cardTitle}>{current.name}</h3>
          <p className={styles.cardQuote}>{current.monthLabel} · {current.direction}</p>
          <p className={styles.cardBody}>{current.description}</p>
          <div className={styles.themes}>
            {current.themes.map(t => (
              <span key={t} className={styles.theme} style={{ color: current.color, background: `${current.color}10` }}>{t}</span>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>Dagens visdom</span>
          </div>
          <p className={styles.wisdomQuote}>{wisdom}</p>
        </GlassCard>
      </section>
    </div>
  );
}
