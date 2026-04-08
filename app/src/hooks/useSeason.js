import { useMemo } from 'react'
import { getCurrentSeason, seasons } from '../data/seasons'
import seasonsDeep from '../data/seasonsDeep.json'

export function useSeason() {
  return useMemo(() => {
    const current = getCurrentSeason()
    const deep = seasonsDeep[current.id]

    return {
      current,
      deep,
      all: seasons,
      allDeep: seasonsDeep,
    }
  }, [])
}

// Get a rotating item from an array based on the day of the year
export function dailyRotation(arr, offset = 0) {
  if (!arr || arr.length === 0) return null
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
  )
  return arr[(dayOfYear + offset) % arr.length]
}
