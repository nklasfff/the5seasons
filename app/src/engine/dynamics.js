/**
 * The Dynamics Engine
 *
 * Calculates the living relationship between the current season's element
 * and the organ clock's element at any given moment.
 *
 * Based on TCM's two fundamental cycles:
 * - Sheng (generating): Wood → Fire → Earth → Metal → Water → Wood
 * - Ke (controlling):   Wood → Earth → Water → Fire → Metal → Wood
 */

// The five elements in generating (sheng) cycle order
const ELEMENTS = ['Træ', 'Ild', 'Jord', 'Metal', 'Vand']

// Element → season mapping
const ELEMENT_TO_SEASON = {
  'Træ': 'foraar',
  'Ild': 'sommer',
  'Jord': 'sensommer',
  'Metal': 'efteraar',
  'Vand': 'vinter',
}

// The generating cycle: each element nourishes the next
// Wood feeds Fire, Fire creates Earth (ash), Earth holds Metal, Metal carries Water, Water nourishes Wood
function getShengChild(element) {
  const i = ELEMENTS.indexOf(element)
  return ELEMENTS[(i + 1) % 5]
}
function getShengParent(element) {
  const i = ELEMENTS.indexOf(element)
  return ELEMENTS[(i + 4) % 5]
}

// The controlling cycle: Wood→Earth→Water→Fire→Metal→Wood
const KE_ORDER = ['Træ', 'Jord', 'Vand', 'Ild', 'Metal']
function getKeTarget(element) {
  const i = KE_ORDER.indexOf(element)
  return KE_ORDER[(i + 1) % 5]
}
function getKeSource(element) {
  const i = KE_ORDER.indexOf(element)
  return KE_ORDER[(i + 4) % 5]
}

/**
 * The heart of the engine.
 * Given the season's element and the current organ's element,
 * returns the dynamic relationship between them.
 */
export function getElementRelation(seasonElement, organElement) {
  if (!seasonElement || !organElement) return null

  // Same element — pure harmony
  if (seasonElement === organElement) {
    return {
      type: 'harmony',
      label: 'Harmoni',
      description: 'Sæsonens eget element er aktivt. Energien flyder naturligt.',
      quality: 'Dyb resonans',
      advice: 'Dit element er hjemme. Mærk kraften i at være i sync med årstiden.',
    }
  }

  // The element that nourishes the season (Water nourishes Wood, etc.)
  if (organElement === getShengParent(seasonElement)) {
    return {
      type: 'nourishing',
      label: 'Næring',
      description: `${organElement} nærer ${seasonElement}. Du modtager støtte fra dybere lag.`,
      quality: 'Modtagelse',
      advice: 'Lad dig nære. Dette er et godt tidspunkt for hvile og genopladning.',
    }
  }

  // The element the season feeds (Wood feeds Fire, etc.)
  if (organElement === getShengChild(seasonElement)) {
    return {
      type: 'expressing',
      label: 'Udtryk',
      description: `${seasonElement} nærer ${organElement}. Din energi strømmer udad.`,
      quality: 'Skaberkraft',
      advice: 'Din sæsonenergi finder et udtryk. Brug det til at skabe og forbinde.',
    }
  }

  // The element that controls/challenges the season (Metal controls Wood, etc.)
  if (organElement === getKeSource(seasonElement)) {
    return {
      type: 'challenging',
      label: 'Udfordring',
      description: `${organElement} udfordrer ${seasonElement}. Der er en naturlig spænding.`,
      quality: 'Vækst gennem modstand',
      advice: 'Mærk spændingen uden at kæmpe imod. Udfordringer styrker dit element.',
    }
  }

  // The element the season controls (Wood controls Earth, etc.)
  if (organElement === getKeTarget(seasonElement)) {
    return {
      type: 'grounding',
      label: 'Jordforbindelse',
      description: `${seasonElement} påvirker ${organElement}. Du har indflydelse og retning.`,
      quality: 'Forankring',
      advice: 'Find dit center. Dette er et øjeblik til at mærke kroppen og jorden under dig.',
    }
  }

  // Fallback (shouldn't happen with 5 elements)
  return {
    type: 'neutral',
    label: 'Overgang',
    description: 'Energien er i bevægelse mellem tilstande.',
    quality: 'Stilhed',
    advice: 'Vær til stede i overgangen.',
  }
}

/**
 * Get a practice recommendation based on the current dynamic state.
 * This considers both the time of day AND the element relation.
 */
export function getRecommendation(relation, timeOfDay) {
  // Challenging periods → calming practices
  if (relation?.type === 'challenging') {
    if (timeOfDay === 'morning' || timeOfDay === 'dawn') {
      return { focus: 'breathing', reason: 'Åndedræt hjælper med at møde morgenen blødt når dit element er udfordret.' }
    }
    return { focus: 'meditation', reason: 'Meditation skaber rum i de øjeblikke hvor energien presser.' }
  }

  // Harmony periods → deepening practices
  if (relation?.type === 'harmony') {
    return { focus: 'yoga', reason: 'Når dit element er hjemme, er kroppen klar til at åbne sig dybere.' }
  }

  // Nourishing periods → receptive practices
  if (relation?.type === 'nourishing') {
    return { focus: 'acupressure', reason: 'Du er i modtager-modus. Blid berøring styrker den næring du modtager.' }
  }

  // Expressing periods → active/creative
  if (relation?.type === 'expressing') {
    return { focus: 'eft', reason: 'Din energi flyder udad. EFT hjælper med at kanalisere den konstruktivt.' }
  }

  // Grounding → earth practices
  if (relation?.type === 'grounding') {
    return { focus: 'breathing', reason: 'Mærk forbindelsen til kroppen og jorden under dig.' }
  }

  // Default by time of day
  if (timeOfDay === 'dawn' || timeOfDay === 'morning') return { focus: 'breathing', reason: 'Morgenen starter med åndedræt.' }
  if (timeOfDay === 'midday') return { focus: 'meditation', reason: 'Middagen inviterer til stilhed.' }
  if (timeOfDay === 'afternoon') return { focus: 'acupressure', reason: 'Eftermiddagen beder om blid berøring.' }
  if (timeOfDay === 'evening') return { focus: 'meditation', reason: 'Aftenen kalder på ro.' }
  return { focus: 'meditation', reason: 'Natten hviler.' }
}

/**
 * Map the organ clock element through the full 24-hour cycle
 * for a given season, returning each period's relation.
 */
const ORGAN_ELEMENTS = [
  { start: 23, end: 1,  organ: 'Galdeblære',    element: 'Træ' },
  { start: 1,  end: 3,  organ: 'Lever',         element: 'Træ' },
  { start: 3,  end: 5,  organ: 'Lunger',        element: 'Metal' },
  { start: 5,  end: 7,  organ: 'Tyktarm',       element: 'Metal' },
  { start: 7,  end: 9,  organ: 'Mave',          element: 'Jord' },
  { start: 9,  end: 11, organ: 'Milt',          element: 'Jord' },
  { start: 11, end: 13, organ: 'Hjerte',        element: 'Ild' },
  { start: 13, end: 15, organ: 'Tyndtarm',      element: 'Ild' },
  { start: 15, end: 17, organ: 'Blære',         element: 'Vand' },
  { start: 17, end: 19, organ: 'Nyrer',         element: 'Vand' },
  { start: 19, end: 21, organ: 'Perikardium',   element: 'Ild' },
  { start: 21, end: 23, organ: 'Trippelvarmer', element: 'Ild' },
]

export function getDayMap(seasonElement) {
  return ORGAN_ELEMENTS.map(period => ({
    ...period,
    relation: getElementRelation(seasonElement, period.element),
  }))
}

export { ELEMENTS, ELEMENT_TO_SEASON, ORGAN_ELEMENTS }
