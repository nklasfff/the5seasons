import { useState, useMemo, useCallback } from 'react';
import { useSeason } from '../context/SeasonContext';
import deepData from '../data/seasonsDeep.json';
import JourneyArc from '../components/illustrations/JourneyArc';
import GlassCard from '../components/common/GlassCard';
import Expandable from '../components/common/Expandable';
import styles from './ProfilePage.module.css';

const WEEKDAYS = ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'];

function getWeekDates() {
  const today = new Date();
  const day = today.getDay();
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - day + i);
    dates.push(d);
  }
  return dates;
}

function getStats() {
  const journalCount = parseInt(localStorage.getItem('5seasons-journal-count') || '0');
  const meditationCount = parseInt(localStorage.getItem('5seasons-meditation-count') || '0');

  // Check which days this week have journal entries
  const weekDates = getWeekDates();
  const weekActivity = weekDates.map(d => {
    const key = `5seasons-journal-${d.toISOString().slice(0, 10)}`;
    return { date: d, hasJournal: !!localStorage.getItem(key) };
  });

  // Streak: consecutive days with journal from today backwards
  let streak = 0;
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = `5seasons-journal-${d.toISOString().slice(0, 10)}`;
    if (localStorage.getItem(key)) streak++;
    else break;
  }

  return { journalCount, meditationCount, weekActivity, streak };
}

export default function ProfilePage() {
  const { current, seasons } = useSeason();
  const deep = deepData[current.id];
  const stats = useMemo(getStats, []);

  // Weekly check-in
  const checkInKey = `5seasons-checkin-${new Date().toISOString().slice(0, 10)}`;
  const [checkIn, setCheckIn] = useState(() => {
    const saved = localStorage.getItem(checkInKey);
    return saved ? JSON.parse(saved) : null;
  });

  const weeklyQuestion = deep?.weeklyCheckIn?.[new Date().getDay() % (deep.weeklyCheckIn?.length || 1)] || '';

  const [checkInAnswer, setCheckInAnswer] = useState('');
  const [energyLevel, setEnergyLevel] = useState(3);

  const saveCheckIn = useCallback(() => {
    const data = { answer: checkInAnswer, energy: energyLevel, timestamp: new Date().toISOString() };
    localStorage.setItem(checkInKey, JSON.stringify(data));
    setCheckIn(data);
  }, [checkInAnswer, energyLevel, checkInKey]);

  // Milestone text
  const milestone = useMemo(() => {
    const total = stats.journalCount + stats.meditationCount;
    if (total === 0) return null;
    const milestones = deep?.milestones || [];
    if (total >= 30 && milestones[4]) return milestones[4];
    if (total >= 14 && milestones[3]) return milestones[3];
    if (total >= 7 && milestones[2]) return milestones[2];
    if (total >= 3 && milestones[1]) return milestones[1];
    if (milestones[0]) return milestones[0];
    return null;
  }, [stats, deep]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.seasonLabel} style={{ color: current.color }}>{current.element}</p>
        <h1 className={styles.title}>Din rejse</h1>
        <p className={styles.subtitle}>{current.name} · {current.monthLabel}</p>
      </header>

      <div className="animate-fade-in" style={{ marginBottom: 'var(--space-2xl)' }}>
        <JourneyArc size={300} />
      </div>

      <div className={styles.cards}>
        {/* Weekly activity tracker */}
        <GlassCard glowColor={`${current.color}15`} className="animate-fade-up-delay-1">
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>Denne uge</span>
            {stats.streak > 0 && (
              <span className={styles.streak} style={{ color: current.color }}>
                {stats.streak} dage i træk
              </span>
            )}
          </div>
          <div className={styles.weekGrid}>
            {stats.weekActivity.map((day, i) => {
              const isToday = day.date.toDateString() === new Date().toDateString();
              return (
                <div key={i} className={styles.weekDay}>
                  <span className={styles.weekDayName}>{WEEKDAYS[i].slice(0, 2)}</span>
                  <div
                    className={`${styles.weekDot} ${day.hasJournal ? styles.weekDotActive : ''} ${isToday ? styles.weekDotToday : ''}`}
                    style={day.hasJournal ? { background: current.color } : {}}
                  />
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* Stats */}
        <GlassCard className="animate-fade-up-delay-2">
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>Din praksis</span>
          </div>
          <div className={styles.statsGrid}>
            <div className={styles.stat}>
              <span className={styles.statNumber} style={{ color: current.color }}>
                {stats.journalCount}
              </span>
              <span className={styles.statLabel}>Journal</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber} style={{ color: current.color }}>
                {stats.meditationCount}
              </span>
              <span className={styles.statLabel}>Meditationer</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber} style={{ color: current.color }}>
                {stats.streak}
              </span>
              <span className={styles.statLabel}>Streak</span>
            </div>
          </div>
        </GlassCard>

        {/* Milestone insight */}
        {milestone && (
          <GlassCard glowColor={`${current.color}15`} className="animate-fade-up-delay-3">
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>Indsigt</span>
            </div>
            <p className={styles.milestone}>{milestone}</p>
          </GlassCard>
        )}

        {/* Weekly check-in */}
        {!checkIn ? (
          <GlassCard glowColor={`${current.color}10`} className="animate-fade-up-delay-3">
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>Ugentlig check-in</span>
            </div>
            <p className={styles.checkInQuestion}>{weeklyQuestion}</p>

            <div className={styles.energyRow}>
              <span className={styles.energyLabel}>Energiniveau</span>
              <div className={styles.energyDots}>
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    className={`${styles.energyDot} ${n <= energyLevel ? styles.energyDotActive : ''}`}
                    style={n <= energyLevel ? { background: current.color } : {}}
                    onClick={() => setEnergyLevel(n)}
                  />
                ))}
              </div>
            </div>

            <textarea
              className={styles.checkInTextarea}
              value={checkInAnswer}
              onChange={e => setCheckInAnswer(e.target.value)}
              placeholder="Skriv dit svar..."
              rows={3}
            />
            <button className={styles.checkInBtn} style={{ background: current.color }} onClick={saveCheckIn}>
              Gem check-in
            </button>
          </GlassCard>
        ) : (
          <GlassCard className="animate-fade-up-delay-3">
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>Dagens check-in</span>
              <span className={styles.cardLabel} style={{ color: current.color }}>✓ Gemt</span>
            </div>
            <p className={styles.checkInSaved}>Energi: {checkIn.energy}/5</p>
            {checkIn.answer && <p className={styles.checkInSavedText}>{checkIn.answer}</p>}
          </GlassCard>
        )}

        {/* Symptoms awareness */}
        {deep?.symptoms && (
          <Expandable title="Kender du disse tegn?" subtitle={`${current.name} · ubalance`} glowColor={`${current.color}10`}>
            {deep.symptoms.map((s, i) => (
              <div key={i} className={styles.symptomItem}>
                <p className={styles.symptomName}>{s.symptom}</p>
                <p className={styles.symptomExpl}>{s.explanation}</p>
                <p className={styles.symptomRemedy}>→ {s.remedy}</p>
              </div>
            ))}
          </Expandable>
        )}

        {/* Current season detail */}
        <GlassCard glowColor={`${current.color}15`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>Aktuel sæson</span>
            <span className={styles.cardAccent} style={{ color: current.color }}>{current.chineseChar}</span>
          </div>
          <div className={styles.seasonRow}>
            <div className={styles.seasonCircle} style={{ background: current.color }}>
              {current.chineseChar}
            </div>
            <div>
              <p className={styles.seasonName}>{current.name} · {current.element}</p>
              <p className={styles.seasonMeta}>{current.monthLabel} · {current.direction}</p>
            </div>
          </div>
          <p className={styles.seasonEmotion}>
            I balance: {current.emotion.balanced} · Ubalance: {current.emotion.imbalanced}
          </p>
        </GlassCard>

        {/* All seasons overview */}
        <GlassCard>
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>Sæsonernes cyklus</span>
          </div>
          <div className={styles.cycleRow}>
            {seasons.map(s => (
              <div key={s.id} className={styles.cycleSeason}>
                <div
                  className={styles.cycleCircle}
                  style={{
                    background: s.color,
                    opacity: s.id === current.id ? 1 : 0.25,
                    boxShadow: s.id === current.id ? `0 0 20px ${s.color}30` : 'none',
                  }}
                >
                  {s.chineseChar}
                </div>
                <span className={styles.cycleName} style={{ color: s.id === current.id ? s.color : 'var(--text-dim)' }}>
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        <Expandable title="Om De Fem Sæsoner" subtitle="Isabelle Evita Søndergaard" glowColor={`${current.color}10`}>
          <p className={styles.aboutText}>
            Baseret på Isabelle Evita Søndergaards arbejde med traditionel kinesisk medicin og vedisk filosofi.
            De fem sæsoner integrerer Wu Xing, organuret og mindfulness i et system for at leve i harmoni med årets naturlige rytmer.
          </p>
        </Expandable>
      </div>
    </div>
  );
}
