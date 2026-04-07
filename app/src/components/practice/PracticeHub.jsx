import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSeason } from '../../context/SeasonContext';
import deepData from '../../data/seasonsDeep.json';
import PracticeMandala from '../illustrations/PracticeMandala';
import GlassCard from '../common/GlassCard';
import Expandable from '../common/Expandable';
import { JournalIcon, MeditationIcon, OrganClockIcon } from '../illustrations/PracticeIcons';
import styles from './PracticeHub.module.css';

function getTimeOfDayPractice(deep, hour) {
  // Morning: yoga. Midday: breathing. Afternoon: meditation. Evening: journal.
  if (hour >= 5 && hour < 10) return { type: 'yoga', label: 'Morgenens yoga' };
  if (hour >= 10 && hour < 14) return { type: 'breathing', label: 'Middagens åndedræt' };
  if (hour >= 14 && hour < 19) return { type: 'meditation', label: 'Eftermiddagens meditation' };
  return { type: 'journal', label: 'Aftenens refleksion' };
}

export default function PracticeHub() {
  const { current } = useSeason();
  const navigate = useNavigate();
  const deep = deepData[current.id];

  const today = useMemo(() => {
    const hour = new Date().getHours();
    const dayIndex = new Date().getDate();
    const timePractice = getTimeOfDayPractice(deep, hour);

    let recommendation = null;
    if (timePractice.type === 'yoga' && deep?.yogaSequence?.length) {
      const pose = deep.yogaSequence[dayIndex % deep.yogaSequence.length];
      recommendation = {
        label: timePractice.label,
        title: pose.name,
        subtitle: `${pose.sanskrit} · ${pose.duration}`,
        body: pose.instruction,
        benefit: pose.benefit,
        action: 'Se alle yoga-stillinger →',
        route: `/saesoner/${current.id}`,
      };
    } else if (timePractice.type === 'breathing' && deep?.breathingExercises?.length) {
      const ex = deep.breathingExercises[dayIndex % deep.breathingExercises.length];
      recommendation = {
        label: timePractice.label,
        title: ex.title,
        subtitle: `${ex.rhythm} · ${ex.rounds} runder`,
        body: ex.instruction,
        benefit: ex.effect,
        action: 'Se alle øvelser →',
        route: `/saesoner/${current.id}`,
      };
    } else if (timePractice.type === 'meditation' && deep?.meditations?.length) {
      const med = deep.meditations[dayIndex % deep.meditations.length];
      recommendation = {
        label: timePractice.label,
        title: med.title,
        subtitle: med.duration,
        body: med.intention,
        steps: med.steps,
        action: 'Start meditation →',
        route: '/praksis/meditation',
      };
    } else if (deep?.journalPrompts?.length) {
      const prompt = deep.journalPrompts[dayIndex % deep.journalPrompts.length];
      recommendation = {
        label: timePractice.label,
        title: 'Dagens refleksion',
        subtitle: current.name,
        body: prompt,
        action: 'Åbn journal →',
        route: '/praksis/journal',
      };
    }

    // Today's food tip
    const food = deep?.foodGuide?.[dayIndex % (deep?.foodGuide?.length || 1)];

    return { recommendation, food };
  }, [current, deep]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.seasonLabel} style={{ color: current.color }}>{current.element}</p>
        <h1 className={styles.title}>Praksis</h1>
        <p className={styles.subtitle}>Øvelser for {current.name.toLowerCase()}</p>
      </header>

      <div className={styles.mandala}>
        <PracticeMandala size={140} />
      </div>

      {/* Dynamic recommendation based on time of day */}
      {today.recommendation && (
        <GlassCard
          glowColor={`${current.color}20`}
          className={`${styles.recCard} animate-fade-up-delay-1`}
          onClick={() => navigate(today.recommendation.route)}
        >
          <div className={styles.recHeader}>
            <span className={styles.recLabel}>{today.recommendation.label}</span>
            <span className={styles.recAccent} style={{ color: current.color }}>{current.name}</span>
          </div>
          <h3 className={styles.recTitle}>{today.recommendation.title}</h3>
          <p className={styles.recSubtitle}>{today.recommendation.subtitle}</p>
          <p className={styles.recBody}>{today.recommendation.body}</p>
          {today.recommendation.benefit && (
            <p className={styles.recBenefit} style={{ color: current.color }}>{today.recommendation.benefit}</p>
          )}
          {today.recommendation.steps && (
            <ol className={styles.recSteps}>
              {today.recommendation.steps.slice(0, 3).map((s, i) => <li key={i}>{s}</li>)}
              {today.recommendation.steps.length > 3 && (
                <li className={styles.recMore}>+ {today.recommendation.steps.length - 3} trin mere...</li>
              )}
            </ol>
          )}
          <span className={styles.recAction}>{today.recommendation.action}</span>
        </GlassCard>
      )}

      {/* Three practice paths */}
      <div className={styles.paths}>
        <GlassCard
          className={`${styles.pathCard} animate-fade-up-delay-2`}
          glowColor={`${current.color}10`}
          onClick={() => navigate('/praksis/journal')}
        >
          <div className={styles.pathIcon}><JournalIcon size={28} color={current.color} /></div>
          <h3 className={styles.pathTitle}>Journal</h3>
          <p className={styles.pathDesc}>Sæsonbaseret refleksion</p>
          <span className={styles.pathHint}>Skriv frit →</span>
        </GlassCard>

        <GlassCard
          className={`${styles.pathCard} animate-fade-up-delay-2`}
          glowColor={`${current.color}10`}
          onClick={() => navigate('/praksis/meditation')}
        >
          <div className={styles.pathIcon}><MeditationIcon size={28} color={current.color} /></div>
          <h3 className={styles.pathTitle}>Meditation</h3>
          <p className={styles.pathDesc}>Pusterum · 3-10 min</p>
          <span className={styles.pathHint}>Find ro →</span>
        </GlassCard>

        <GlassCard
          className={`${styles.pathCard} animate-fade-up-delay-3`}
          glowColor={`${current.color}10`}
          onClick={() => navigate('/praksis/organur')}
        >
          <div className={styles.pathIcon}><OrganClockIcon size={28} color={current.color} /></div>
          <h3 className={styles.pathTitle}>Organ-ur</h3>
          <p className={styles.pathDesc}>Kroppens rytme</p>
          <span className={styles.pathHint}>Se uret →</span>
        </GlassCard>
      </div>

      {/* Today's food from the season */}
      {today.food && (
        <GlassCard className="animate-fade-up-delay-3" glowColor={`${current.color}10`}>
          <div className={styles.recHeader}>
            <span className={styles.recLabel}>Dagens fødevare</span>
            <span className={styles.recAccent} style={{ color: current.color }}>Smag: {current.flavor}</span>
          </div>
          <h3 className={styles.foodName}>{today.food.name}</h3>
          <p className={styles.recBody}>{today.food.why}</p>
          <p className={styles.foodPrep}>{today.food.preparation}</p>
        </GlassCard>
      )}

      {/* Season's EFT — expandable */}
      {deep?.eftSequence && (
        <Expandable title="EFT-Tapping" subtitle={`${current.name} · emotionel frihed`} glowColor={`${current.color}10`}>
          <p className={styles.eftSetup}>{deep.eftSequence.setupPhrase}</p>
          <div className={styles.eftPoints}>
            {deep.eftSequence.points.map((pt, i) => (
              <div key={i} className={styles.eftPoint}>
                <span className={styles.eftPointName}>{pt.point}</span>
                <span className={styles.eftAffirmation}>{pt.affirmation}</span>
              </div>
            ))}
          </div>
        </Expandable>
      )}
    </div>
  );
}
