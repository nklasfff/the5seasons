import { useMemo } from 'react'
import { dailyRotation } from '../hooks/useSeason'
import { getElementRelation } from '../engine/dynamics'
import Reveal from '../components/Reveal'
import SeasonIllustration from '../components/illustrations/SeasonIllustration'
import styles from './Season.module.css'

export default function Season({ time, season, dynamics }) {
  const { current, deep, all, allDeep } = season
  const { relation, organElement } = dynamics
  const organName = time.organ?.name

  const dayIndex = Math.floor(Date.now() / 86400000)
  const philosophy = deep?.philosophy?.[dayIndex % (deep?.philosophy?.length || 1)]
  const symptom = deep?.symptoms?.[dayIndex % (deep?.symptoms?.length || 1)]
  const yoga = deep?.yogaSequence?.[dayIndex % (deep?.yogaSequence?.length || 1)]
  const food = deep?.foodGuide?.[dayIndex % (deep?.foodGuide?.length || 1)]
  const journal = deep?.journalPrompts?.[dayIndex % (deep?.journalPrompts?.length || 1)]
  const acupressure = deep?.acupressure?.[dayIndex % (deep?.acupressure?.length || 1)]

  const organSeason = useMemo(() => {
    if (!organElement) return null
    const elementToId = { 'Træ': 'foraar', 'Ild': 'sommer', 'Jord': 'sensommer', 'Metal': 'efteraar', 'Vand': 'vinter' }
    const id = elementToId[organElement]
    return { season: all.find(s => s.id === id), deep: allDeep?.[id] }
  }, [organElement, all, allDeep])

  const crossoverFood = useMemo(() => {
    if (!organSeason?.deep?.foodGuide || organElement === current.element) return null
    return dailyRotation(organSeason.deep.foodGuide, 3)
  }, [organSeason, organElement, current.element])

  if (!deep) return null

  const philoPreview = philosophy ? philosophy.slice(0, philosophy.indexOf('.', 50) + 1) : ''
  const philoRest = philosophy ? philosophy.slice(philoPreview.length) : ''

  return (
    <div className={styles.page}>

      {/* === 1. SEASON OPENS === */}
      <section className={styles.opening}>
        <SeasonIllustration element={current.element} variant={0} size={180} opacity={0.4} />
        <h1 className={styles.title}>{current.name}</h1>
        <p className={styles.elementLine}>{current.element} · {current.chineseChar}</p>
      </section>

      <p className={styles.essence}>{current.description}</p>

      {/* === 2. EMOTIONAL LANDSCAPE === */}
      <section className={styles.emotions}>
        <div className={styles.polarity}>
          <span className={styles.poleBalanced}>{current.emotion.balanced}</span>
          <span className={styles.polarityBridge} />
          <span className={styles.poleImbalanced}>{current.emotion.imbalanced}</span>
        </div>
        <div className={styles.themes}>
          {current.themes.map((t, i) => (
            <span key={i} className={styles.theme}>{t}</span>
          ))}
        </div>
      </section>

      {/* === 3. PHILOSOPHY === */}
      {philosophy && (
        <section className={styles.thread}>
          <p className={styles.threadLead}>{philoPreview}</p>
          {philoRest && (
            <Reveal preview={<span className={styles.more}>Læs videre</span>}>
              <p className={styles.threadBody}>{philoRest}</p>
            </Reveal>
          )}
        </section>
      )}

      <div className={styles.illustrationBreak}>
        <SeasonIllustration element={current.element} variant={2} size={60} opacity={0.2} />
      </div>

      {/* === 4. BODY SIGNAL === */}
      {symptom && (
        <section className={styles.thread}>
          <span className={styles.connector}>Når {current.element.toLowerCase()}-energien blokerer</span>
          <h2 className={styles.threadTitle}>{symptom.symptom}</h2>
          <Reveal preview={<span className={styles.more}>Hvad kan du gøre?</span>}>
            <p className={styles.threadBody}>{symptom.explanation}</p>
            <p className={styles.threadHint}>{symptom.remedy}</p>
          </Reveal>
        </section>
      )}

      {/* === 5. YOGA === */}
      {yoga && (
        <section className={styles.thread}>
          <span className={styles.connector}>{current.organs.yin}-meridianen åbnes med</span>
          <h2 className={styles.threadTitle}>{yoga.name}</h2>
          {yoga.sanskrit && <p className={styles.sanskrit}>{yoga.sanskrit}</p>}
          <Reveal preview={<span className={styles.more}>Instruktion</span>}>
            <p className={styles.threadBody}>{yoga.instruction}</p>
            <p className={styles.threadHint}>{yoga.benefit}</p>
            <span className={styles.badge}>{yoga.duration}</span>
          </Reveal>
        </section>
      )}

      {/* === 6. ACUPRESSURE === */}
      {acupressure && (
        <section className={styles.thread}>
          <span className={styles.connector}>Eller mærk punktet</span>
          <h2 className={styles.threadTitle}>{acupressure.name}</h2>
          {acupressure.chineseName && <p className={styles.sanskrit}>{acupressure.chineseName}</p>}
          <Reveal preview={<span className={styles.more}>Find punktet</span>}>
            <p className={styles.threadBody}>{acupressure.location}</p>
            <p className={styles.threadBody}>{acupressure.technique}</p>
            <p className={styles.threadHint}>{acupressure.benefit}</p>
          </Reveal>
        </section>
      )}

      <div className={styles.illustrationBreak}>
        <SeasonIllustration element={current.element} variant={1} size={60} opacity={0.2} />
      </div>

      {/* === 7. FOOD === */}
      {food && (
        <section className={styles.thread}>
          <span className={styles.connector}>{current.flavor} smag styrker {current.organs.yin.toLowerCase()}en</span>
          <h2 className={styles.threadTitle}>{food.name}</h2>
          <Reveal preview={<span className={styles.more}>Hvorfor og hvordan</span>}>
            <p className={styles.threadBody}>{food.why}</p>
            <p className={styles.threadHint}>{food.preparation}</p>
          </Reveal>
        </section>
      )}

      {/* === 8. CROSSOVER === */}
      {crossoverFood && relation && organSeason?.season && (
        <section className={styles.crossover}>
          <span className={styles.crossoverLabel}>{relation.label} · {organName}-tid</span>
          <p className={styles.crossoverText}>
            Lige nu er {organElement}-elementet aktivt.
            {' '}{relation.type === 'nourishing' && `${organElement} nærer dit ${current.element}. Modtag.`}
            {relation.type === 'expressing' && `Dit ${current.element} nærer ${organElement}. Din energi strømmer udad.`}
            {relation.type === 'challenging' && `${organElement} udfordrer dit ${current.element}. Mærk spændingen.`}
            {relation.type === 'harmony' && `Dit element er hjemme. Dyb resonans.`}
            {relation.type === 'grounding' && `${current.element} forankrer ${organElement}. Find dit center.`}
          </p>
          <p className={styles.crossoverFood}>
            Fra {organSeason.season.name.toLowerCase()}ens køkken: <strong>{crossoverFood.name}</strong>
          </p>
        </section>
      )}

      {/* === 9. JOURNAL === */}
      {journal && (
        <section className={styles.journal}>
          <p className={styles.journalPrompt}>{journal}</p>
        </section>
      )}

      {/* === FOOTER === */}
      <footer className={styles.footer}>
        <span className={styles.footerDetail}>{current.organs.yin} & {current.organs.yang}</span>
        <span className={styles.footerDot}>·</span>
        <span className={styles.footerDetail}>{current.tissue}</span>
        <span className={styles.footerDot}>·</span>
        <span className={styles.footerDetail}>{current.monthLabel}</span>
      </footer>
    </div>
  )
}
