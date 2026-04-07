import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSeason } from '../context/SeasonContext';
import { getGreeting, formatDate } from '../utils/dateUtils';
import deepData from '../data/seasonsDeep.json';
import heroImg from '../assets/hero.jpeg';
import SeasonSymbol from '../components/illustrations/SeasonSymbol';
import GlassCard from '../components/common/GlassCard';
import styles from './HomePage.module.css';

const ORGAN_CLOCK = [
  { start: 23, end: 1, organ: 'Galdeblære', element: 'Træ', color: '#5B8C5A', guidance: 'Tid for dyb søvn. Galdeblæren renser og regenererer.' },
  { start: 1, end: 3, organ: 'Lever', element: 'Træ', color: '#5B8C5A', guidance: 'Leverens time. Optimal udrensning kræver hvile.' },
  { start: 3, end: 5, organ: 'Lunger', element: 'Metal', color: '#A8A8A0', guidance: 'Lungernes tid. Dyb søvn styrker immunforsvaret.' },
  { start: 5, end: 7, organ: 'Tyktarm', element: 'Metal', color: '#A8A8A0', guidance: 'Tid til at vågne. Drik varmt vand og lad kroppen rense.' },
  { start: 7, end: 9, organ: 'Mave', element: 'Jord', color: '#C9A84C', guidance: 'Mavens time. Spis en varm, nærende morgenmad.' },
  { start: 9, end: 11, organ: 'Milt', element: 'Jord', color: '#C9A84C', guidance: 'Miltens tid. Optimal for mentalt arbejde og fokus.' },
  { start: 11, end: 13, organ: 'Hjerte', element: 'Ild', color: '#C75A3A', guidance: 'Hjertets time. Tid for forbindelse og let frokost.' },
  { start: 13, end: 15, organ: 'Tyndtarm', element: 'Ild', color: '#C75A3A', guidance: 'Sortér og integrer. Lad kroppen fordøje i ro.' },
  { start: 15, end: 17, organ: 'Blære', element: 'Vand', color: '#3A6FA0', guidance: 'Blærens tid. Drik rigeligt vand, let motion.' },
  { start: 17, end: 19, organ: 'Nyrer', element: 'Vand', color: '#3A6FA0', guidance: 'Nyrernes time. Tid til at sænke tempoet.' },
  { start: 19, end: 21, organ: 'Perikardium', element: 'Ild', color: '#C75A3A', guidance: 'Tid for nærvær. Vær sammen med dem du holder af.' },
  { start: 21, end: 23, organ: 'Tre Varmere', element: 'Ild', color: '#C75A3A', guidance: 'Tid for ro. Lad kroppen forberede sig på søvn.' },
];

function getCurrentOrgan() {
  const h = new Date().getHours();
  return ORGAN_CLOCK.find((o, i) => {
    if (o.start > o.end) return h >= o.start || h < o.end;
    return h >= o.start && h < o.end;
  }) || ORGAN_CLOCK[0];
}

export default function HomePage() {
  const navigate = useNavigate();
  const { current } = useSeason();
  const deep = deepData[current.id];

  const today = useMemo(() => {
    const now = new Date();
    const hour = now.getHours();
    const dayIndex = now.getDate();
    const organ = getCurrentOrgan();
    const dayWisdom = deep?.journalPrompts?.[dayIndex % (deep.journalPrompts?.length || 1)] || '';

    // Today's practice — pick based on time of day
    let practice = { title: 'Pusterum', subtitle: '3 min', body: 'Tag tre dybe vejrtrækninger.' };
    if (hour >= 5 && hour < 10 && deep?.yogaSequence?.length) {
      const pose = deep.yogaSequence[dayIndex % deep.yogaSequence.length];
      practice = { title: pose.name, subtitle: `${pose.sanskrit} · ${pose.duration}`, body: pose.instruction };
    } else if (hour >= 10 && hour < 14 && deep?.breathingExercises?.length) {
      const ex = deep.breathingExercises[dayIndex % deep.breathingExercises.length];
      practice = { title: ex.title, subtitle: `${ex.rhythm}`, body: ex.instruction };
    } else if (hour >= 14 && hour < 21 && deep?.meditations?.length) {
      const med = deep.meditations[dayIndex % deep.meditations.length];
      practice = { title: med.title, subtitle: med.duration, body: med.intention };
    }

    return { now, organ, dayWisdom, practice, formatted: formatDate(now) };
  }, [deep]);

  return (
    <div className={styles.page}>
      {/* Header — personal greeting */}
      <header className={styles.header}>
        <p className={styles.greeting}>{getGreeting()}</p>
        <h1 className={styles.seasonName} style={{ color: current.color }}>
          {current.chineseChar} {current.name}
        </h1>
        <p className={styles.date}>{today.formatted}</p>
      </header>

      {/* Hero — the soul of the app */}
      <section className={styles.heroSection}>
        <img src={heroImg} alt="De fem sæsoner" className={styles.heroImage} />
      </section>

      {/* Season symbol — alive, breathing */}
      <section className={styles.symbolSection}>
        <SeasonSymbol seasonId={current.id} color={current.color} size={120} />
      </section>

      {/* Current season — who you are right now */}
      <section className={styles.cards}>
        <GlassCard
          glowColor={`${current.color}20`}
          onClick={() => navigate(`/saesoner/${current.id}`)}
          className={styles.tappable}
        >
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>Aktuel sæson</span>
            <span className={styles.cardAccent} style={{ color: current.color }}>
              {current.element} · {current.direction}
            </span>
          </div>
          <h3 className={styles.cardTitle}>{current.name}</h3>
          <p className={styles.cardQuote}>{current.monthLabel}</p>
          <p className={styles.cardBody}>{current.description}</p>
          <div className={styles.themes}>
            {current.themes.map(t => (
              <span key={t} className={styles.theme} style={{ color: current.color, borderColor: `${current.color}30` }}>{t}</span>
            ))}
          </div>
          <span className={styles.tapHint}>Udforsk denne sæson →</span>
        </GlassCard>

        {/* Organ clock — what's happening RIGHT NOW */}
        <GlassCard glowColor={`${today.organ.color}15`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>Lige nu</span>
            <span className={styles.cardAccent} style={{ color: today.organ.color }}>
              {today.organ.organ}
            </span>
          </div>
          <div className={styles.organRow}>
            <div className={styles.organDot} style={{ background: today.organ.color }} />
            <div>
              <p className={styles.organName}>{today.organ.organ}</p>
              <p className={styles.organTime}>{today.organ.start}:00 — {today.organ.end}:00</p>
            </div>
          </div>
          <p className={styles.cardBody}>{today.organ.guidance}</p>
        </GlassCard>

        {/* Today's practice — concrete, actionable */}
        <GlassCard glowColor={`${current.color}15`} onClick={() => navigate('/praksis')} className={styles.tappable}>
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>Dagens praksis</span>
            <span className={styles.cardAccent} style={{ color: current.color }}>{current.element}</span>
          </div>
          <h3 className={styles.cardTitle}>{today.practice.title}</h3>
          <p className={styles.cardQuote}>{today.practice.subtitle}</p>
          <p className={styles.cardBody}>{today.practice.body}</p>
          <span className={styles.tapHint}>Start din praksis →</span>
        </GlassCard>

        {/* Daily wisdom — temporal, specific */}
        <GlassCard>
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>Dagens refleksion</span>
          </div>
          <p className={styles.wisdomQuote}>{today.dayWisdom}</p>
          <span className={styles.tapHint} onClick={() => navigate('/praksis/journal')} style={{ cursor: 'pointer' }}>
            Skriv i din journal →
          </span>
        </GlassCard>
      </section>
    </div>
  );
}
