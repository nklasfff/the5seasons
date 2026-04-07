import { useSeason } from '../../context/SeasonContext';
import GlassCard from '../common/GlassCard';
import WisdomLeaf from '../illustrations/WisdomLeaf';
import styles from './DailyWisdom.module.css';

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

export default function DailyWisdom() {
  const { current } = useSeason();
  const dayIndex = new Date().getDate() % wisdomBySeason[current.id].length;
  const wisdom = wisdomBySeason[current.id][dayIndex];

  const hour = new Date().getHours();
  const activeOrgan =
    hour >= current.organClockYin.start && hour < current.organClockYin.end
      ? current.organClockYin.label
      : hour >= current.organClockYang.start && hour < current.organClockYang.end
        ? current.organClockYang.label
        : null;

  return (
    <GlassCard className="animate-fade-up-delay-2">
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-xs)' }}>
        <WisdomLeaf size={28} />
        <p className={styles.label}>Dagens visdom</p>
      </div>
      <p className={styles.quote}>{wisdom}</p>
      {activeOrgan && (
        <p className={styles.detail}>
          <span className={styles.organDot} />
          Aktiv nu: {activeOrgan}
        </p>
      )}
    </GlassCard>
  );
}
