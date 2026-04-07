import { useParams, useNavigate } from 'react-router-dom';
import { useSeason } from '../../context/SeasonContext';
import SeasonNav from '../common/SeasonNav';
import GlassCard from '../common/GlassCard';
import Expandable from '../common/Expandable';
import SeasonSymbol from '../illustrations/SeasonSymbol';
import styles from './SeasonDetail.module.css';

export default function SeasonDetail() {
  const { id } = useParams();
  const { seasons } = useSeason();
  const navigate = useNavigate();
  const season = seasons.find(s => s.id === id);

  if (!season) return <p>Sæson ikke fundet</p>;

  return (
    <div style={{ '--accent': season.color, '--accent-light': season.lightColor, '--accent-glow': season.glowColor }}>
      <SeasonNav currentId={id} />

      {/* Hero header with animated season symbol */}
      <div className={`${styles.header} animate-fade-up`}>
        <div className={styles.symbolWrap}>
          <SeasonSymbol seasonId={season.id} color={season.color} size={140} />
        </div>
        <div className={styles.bigChar} style={{ color: season.color }}>
          {season.chineseChar}
        </div>
        <h1 className={styles.name}>{season.name}</h1>
        <p className={styles.meta}>{season.element} · {season.monthLabel} · {season.direction}</p>
      </div>

      {/* Quick correspondences */}
      <GlassCard className="animate-fade-up-delay-1" glowColor={season.glowColor}>
        <div className={styles.correspondences}>
          <div className="correspondence-row">
            <span className="correspondence-label">Element</span>
            <span className="correspondence-value">{season.element}</span>
          </div>
          <div className="correspondence-row">
            <span className="correspondence-label">Retning</span>
            <span className="correspondence-value">{season.direction}</span>
          </div>
          <div className="correspondence-row">
            <span className="correspondence-label">Smag</span>
            <span className="correspondence-value">{season.flavor}</span>
          </div>
          <div className="correspondence-row">
            <span className="correspondence-label">Klima</span>
            <span className="correspondence-value">{season.climate}</span>
          </div>
          <div className="correspondence-row">
            <span className="correspondence-label">Væv</span>
            <span className="correspondence-value">{season.tissue}</span>
          </div>
        </div>
      </GlassCard>

      <div className={styles.sections}>
        {/* Om sæsonen - default open */}
        <Expandable title="Om denne sæson" subtitle={season.monthLabel} defaultOpen glowColor={season.glowColor}>
          <p className={styles.sectionText}>{season.description}</p>
          <ul className="left-border-list" style={{ marginTop: 'var(--space-md)' }}>
            {season.themes.map(t => <li key={t}>{t}</li>)}
          </ul>
        </Expandable>

        {/* Organer */}
        <Expandable title="Organer" subtitle={`${season.organs.yin} · ${season.organs.yang}`} glowColor={season.glowColor}>
          <div className={styles.organsGrid}>
            <div className={styles.organBox}>
              <p className={styles.organType}>Yin</p>
              <p className={styles.organName}>{season.organs.yin}</p>
              <p className={styles.organTime}>{season.organClockYin.label}</p>
            </div>
            <div className={styles.organBox}>
              <p className={styles.organType}>Yang</p>
              <p className={styles.organName}>{season.organs.yang}</p>
              <p className={styles.organTime}>{season.organClockYang.label}</p>
            </div>
          </div>
        </Expandable>

        {/* Følelser */}
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

        {/* Fødevarer */}
        <Expandable title="Fødevarer" subtitle={`Smag: ${season.flavor}`} glowColor={season.glowColor}>
          <div className={styles.foodList}>
            {season.foods.map(f => (
              <span key={f} className={styles.foodTag}>{f}</span>
            ))}
          </div>
        </Expandable>

        {/* Yoga */}
        <Expandable title="Yoga" subtitle="Sæsonens bevægelse" glowColor={season.glowColor}>
          <p className={styles.sectionText}>{season.yoga}</p>
        </Expandable>

        {/* Åndedræt */}
        <Expandable title="Åndedræt" subtitle="Sæsonens pranayama" glowColor={season.glowColor}>
          <p className={styles.sectionText}>{season.breathing}</p>
        </Expandable>

        {/* Meditation */}
        <Expandable title="Meditation" subtitle="Sæsonens indre praksis" glowColor={season.glowColor}>
          <p className={styles.sectionText}>{season.meditation}</p>
        </Expandable>

        {/* Akupressur */}
        <Expandable title="Akupressur" subtitle="Sæsonens punkt" glowColor={season.glowColor}>
          <p className={styles.sectionText}>{season.acupressure}</p>
        </Expandable>

        {/* Relateret praksis */}
        <GlassCard
          className={styles.practiceLink}
          glowColor={season.glowColor}
          onClick={() => navigate('/praksis')}
        >
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
