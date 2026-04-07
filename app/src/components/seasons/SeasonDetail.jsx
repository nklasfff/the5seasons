import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSeason } from '../../context/SeasonContext';
import deepData from '../../data/seasonsDeep.json';
import SeasonNav from '../common/SeasonNav';
import GlassCard from '../common/GlassCard';
import Expandable from '../common/Expandable';
import TabBar from '../common/TabBar';
import SeasonSymbol from '../illustrations/SeasonSymbol';
import LotusDivider from '../common/LotusDivider';
import styles from './SeasonDetail.module.css';

const tabs = [
  { id: 'forst', label: 'Forstå' },
  { id: 'praktiser', label: 'Praktiser' },
  { id: 'anvend', label: 'Anvend' },
];

export default function SeasonDetail() {
  const { id } = useParams();
  const { seasons } = useSeason();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('forst');
  const season = seasons.find(s => s.id === id);
  const deep = deepData[id];

  if (!season) return <p>Sæson ikke fundet</p>;

  return (
    <div style={{ '--accent': season.color, '--accent-light': season.lightColor, '--accent-glow': season.glowColor }}>
      <SeasonNav currentId={id} />

      {/* Hero */}
      <div className={`${styles.header} animate-fade-up`}>
        <div className={styles.symbolWrap}>
          <SeasonSymbol seasonId={season.id} color={season.color} size={120} />
        </div>
        <div className={styles.bigChar} style={{ color: season.color }}>{season.chineseChar}</div>
        <h1 className={styles.name}>{season.name}</h1>
        <p className={styles.meta}>{season.element} · {season.monthLabel} · {season.direction}</p>
      </div>

      <LotusDivider />

      {/* Tabs */}
      <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {/* Tab: Forstå */}
      {activeTab === 'forst' && (
        <div className={styles.sections}>
          <Expandable title="Filosofi" subtitle={`${season.element}-elementet`} glowColor={season.glowColor}>
            {deep?.philosophy?.map((p, i) => (
              <p key={i} className={styles.sectionText} style={{ marginBottom: i < deep.philosophy.length - 1 ? 'var(--space-md)' : 0 }}>{p}</p>
            ))}
          </Expandable>

          <GlassCard glowColor={season.glowColor}>
            <div className={styles.correspondences}>
              {[
                ['Element', season.element], ['Retning', season.direction],
                ['Smag', season.flavor], ['Klima', season.climate], ['Væv', season.tissue],
              ].map(([label, value]) => (
                <div key={label} className="correspondence-row">
                  <span className="correspondence-label">{label}</span>
                  <span className="correspondence-value">{value}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <Expandable title="Følelser" subtitle={season.emotion.balanced} glowColor={season.glowColor}>
            <div className={styles.emotionRow}>
              <div className={styles.emotionBox} style={{ borderLeft: `3px solid ${season.color}` }}>
                <p className={styles.emotionType}>I balance</p>
                <p className={styles.emotionText}>{season.emotion.balanced}</p>
              </div>
              <div className={styles.emotionBox} style={{ borderLeft: '3px solid var(--border)' }}>
                <p className={styles.emotionType}>Ubalance</p>
                <p className={styles.emotionText}>{season.emotion.imbalanced}</p>
              </div>
            </div>
          </Expandable>

          {deep?.symptoms && (
            <Expandable title="Symptomer" subtitle={`${deep.symptoms.length} tegn på ubalance`} glowColor={season.glowColor}>
              {deep.symptoms.map((s, i) => (
                <div key={i} className={styles.symptomItem}>
                  <p className={styles.symptomName}>{s.symptom}</p>
                  <p className={styles.symptomExpl}>{s.explanation}</p>
                  <p className={styles.symptomRemedy}>→ {s.remedy}</p>
                </div>
              ))}
            </Expandable>
          )}
        </div>
      )}

      {/* Tab: Praktiser */}
      {activeTab === 'praktiser' && (
        <div className={styles.sections}>
          {deep?.yogaSequence && (
            <Expandable title="Yoga-sekvens" subtitle={`${deep.yogaSequence.length} stillinger`} glowColor={season.glowColor}>
              {deep.yogaSequence.map((pose, i) => (
                <div key={i} className={styles.poseItem}>
                  <div className={styles.poseHeader}>
                    <span className={styles.poseNumber}>{i + 1}</span>
                    <div>
                      <p className={styles.poseName}>{pose.name}</p>
                      <p className={styles.poseSanskrit}>{pose.sanskrit} · {pose.duration}</p>
                    </div>
                  </div>
                  <p className={styles.poseInstruction}>{pose.instruction}</p>
                  <p className={styles.poseBenefit}>{pose.benefit}</p>
                </div>
              ))}
            </Expandable>
          )}

          {deep?.meditations && (
            <Expandable title="Meditationer" subtitle={`${deep.meditations.length} guidede`} glowColor={season.glowColor}>
              {deep.meditations.map((med, i) => (
                <div key={i} className={styles.meditationItem}>
                  <p className={styles.meditationTitle}>{med.title}</p>
                  <p className={styles.meditationDuration}>{med.duration}</p>
                  <p className={styles.meditationIntention}>{med.intention}</p>
                  <ol className={styles.stepsList}>
                    {med.steps.map((step, j) => <li key={j}>{step}</li>)}
                  </ol>
                </div>
              ))}
            </Expandable>
          )}

          {deep?.breathingExercises && (
            <Expandable title="Åndedræt" subtitle={`${deep.breathingExercises.length} øvelser`} glowColor={season.glowColor}>
              {deep.breathingExercises.map((ex, i) => (
                <div key={i} className={styles.breathingItem}>
                  <p className={styles.breathingTitle}>{ex.title}</p>
                  <div className={styles.breathingMeta}>
                    <span className={styles.breathingRhythm}>{ex.rhythm}</span>
                    <span className={styles.breathingRounds}>{ex.rounds} runder</span>
                  </div>
                  <p className={styles.sectionText}>{ex.instruction}</p>
                  <p className={styles.breathingEffect}>{ex.effect}</p>
                </div>
              ))}
            </Expandable>
          )}

          {deep?.eftSequence && (
            <Expandable title="EFT-Tapping" subtitle="Emotionel frihedsteknik" glowColor={season.glowColor}>
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
      )}

      {/* Tab: Anvend */}
      {activeTab === 'anvend' && (
        <div className={styles.sections}>
          {deep?.foodGuide && (
            <Expandable title="Madguide" subtitle={`${deep.foodGuide.length} fødevarer`} glowColor={season.glowColor}>
              {deep.foodGuide.map((food, i) => (
                <div key={i} className={styles.foodItem}>
                  <p className={styles.foodName}>{food.name}</p>
                  <p className={styles.foodWhy}>{food.why}</p>
                  <p className={styles.foodPrep}>Tilberedning: {food.preparation}</p>
                </div>
              ))}
            </Expandable>
          )}

          {deep?.acupressure && (
            <Expandable title="Akupressur" subtitle={`${deep.acupressure.length} punkter`} glowColor={season.glowColor}>
              {deep.acupressure.map((pt, i) => (
                <div key={i} className={styles.acuItem}>
                  <p className={styles.acuName}>{pt.name}</p>
                  <p className={styles.acuChinese}>{pt.chineseName}</p>
                  <div className={styles.acuDetails}>
                    <div className="correspondence-row">
                      <span className="correspondence-label">Placering</span>
                      <span className="correspondence-value" style={{ fontSize: '0.8rem', textAlign: 'right', maxWidth: '60%' }}>{pt.location}</span>
                    </div>
                    <div className="correspondence-row">
                      <span className="correspondence-label">Teknik</span>
                      <span className="correspondence-value" style={{ fontSize: '0.8rem', textAlign: 'right', maxWidth: '60%' }}>{pt.technique}</span>
                    </div>
                    <div className="correspondence-row">
                      <span className="correspondence-label">Varighed</span>
                      <span className="correspondence-value">{pt.duration}</span>
                    </div>
                  </div>
                  <p className={styles.acuBenefit}>{pt.benefit}</p>
                </div>
              ))}
            </Expandable>
          )}

          {deep?.organClockGuide && (
            <Expandable title="Organ-ur guide" subtitle="Hvad du skal gøre hvornår" glowColor={season.glowColor}>
              {deep.organClockGuide.map((slot, i) => (
                <div key={i} className={styles.clockSlot}>
                  <div className={styles.clockSlotHeader}>
                    <span className={styles.clockTime}>{slot.time}</span>
                    <span className={styles.clockOrgan}>{slot.organ}</span>
                  </div>
                  <p className={styles.clockDo}>✓ {slot.doThis}</p>
                  <p className={styles.clockAvoid}>✗ {slot.avoidThis}</p>
                </div>
              ))}
            </Expandable>
          )}
        </div>
      )}

      {/* CTA */}
      <div style={{ marginTop: 'var(--space-xl)' }}>
        <GlassCard className={styles.practiceLink} glowColor={season.glowColor} onClick={() => navigate('/praksis')}>
          <div className={styles.practiceLinkContent}>
            <div>
              <p className={styles.practiceLinkLabel}>Prøv sæsonens praksis</p>
              <p className={styles.practiceLinkTitle}>Meditation · Yoga · Journal</p>
            </div>
            <span className={styles.practiceLinkArrow}>→</span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
