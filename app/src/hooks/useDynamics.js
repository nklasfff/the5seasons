import { useMemo } from 'react'
import { getElementRelation, getRecommendation } from '../engine/dynamics'

/**
 * Combines time + season into a living dynamic state.
 * This is the pulse of the app.
 */
export function useDynamics(time, season) {
  return useMemo(() => {
    const seasonElement = season.current.element
    const organElement = time.organ?.element

    const relation = getElementRelation(seasonElement, organElement)
    const recommendation = getRecommendation(relation, time.timeOfDay)

    return {
      relation,
      recommendation,
      seasonElement,
      organElement,
      // Is the current organ part of the season's own element?
      isHome: relation?.type === 'harmony',
      // Is the current moment challenging?
      isChallenging: relation?.type === 'challenging',
      // Is the current moment nourishing?
      isNourishing: relation?.type === 'nourishing',
    }
  }, [time, season])
}
