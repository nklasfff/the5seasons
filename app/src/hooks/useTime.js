import { useState, useEffect, useMemo } from 'react'

// The organ clock — each organ has its 2-hour window
const ORGAN_CLOCK = [
  { start: 23, end: 1,  organ: 'Galdeblære', element: 'Træ', id: 'foraar' },
  { start: 1,  end: 3,  organ: 'Lever',      element: 'Træ', id: 'foraar' },
  { start: 3,  end: 5,  organ: 'Lunger',     element: 'Metal', id: 'efteraar' },
  { start: 5,  end: 7,  organ: 'Tyktarm',    element: 'Metal', id: 'efteraar' },
  { start: 7,  end: 9,  organ: 'Mave',       element: 'Jord', id: 'sensommer' },
  { start: 9,  end: 11, organ: 'Milt',       element: 'Jord', id: 'sensommer' },
  { start: 11, end: 13, organ: 'Hjerte',     element: 'Ild', id: 'sommer' },
  { start: 13, end: 15, organ: 'Tyndtarm',   element: 'Ild', id: 'sommer' },
  { start: 15, end: 17, organ: 'Blære',      element: 'Vand', id: 'vinter' },
  { start: 17, end: 19, organ: 'Nyrer',      element: 'Vand', id: 'vinter' },
  { start: 19, end: 21, organ: 'Perikardium', element: 'Ild', id: 'sommer' },
  { start: 21, end: 23, organ: 'Trippelvarmer', element: 'Ild', id: 'sommer' },
]

function getOrganForHour(hour) {
  return ORGAN_CLOCK.find(o => {
    if (o.start > o.end) { // wraps midnight
      return hour >= o.start || hour < o.end
    }
    return hour >= o.start && hour < o.end
  })
}

function getTimeOfDay(hour) {
  if (hour >= 5 && hour < 7) return 'dawn'
  if (hour >= 7 && hour < 11) return 'morning'
  if (hour >= 11 && hour < 14) return 'midday'
  if (hour >= 14 && hour < 17) return 'afternoon'
  if (hour >= 17 && hour < 20) return 'evening'
  if (hour >= 20 && hour < 23) return 'night'
  return 'latenight'
}

const GREETINGS = {
  dawn: 'Dagen gryer',
  morning: 'God morgen',
  midday: 'God middag',
  afternoon: 'God eftermiddag',
  evening: 'God aften',
  night: 'God nat',
  latenight: 'Stilheden kalder',
}

const TIME_MOODS = {
  dawn: { quality: 'Opvågning', message: 'Kroppen vågner stille. Giv dig selv tid.' },
  morning: { quality: 'Klarhed', message: 'Energien stiger. Et godt tidspunkt for intention.' },
  midday: { quality: 'Fylde', message: 'Dagen er på sit højeste. Vær til stede.' },
  afternoon: { quality: 'Integration', message: 'Lad dagens oplevelser synke ind.' },
  evening: { quality: 'Ro', message: 'Dagen folder sig sammen. Giv slip.' },
  night: { quality: 'Stilhed', message: 'Mørket inviterer til indre refleksion.' },
  latenight: { quality: 'Hvile', message: 'Kroppen regenererer. Søvn er helbredende.' },
}

export function useTime() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    // Update every minute
    const interval = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(interval)
  }, [])

  return useMemo(() => {
    const hour = now.getHours()
    const timeOfDay = getTimeOfDay(hour)
    const organ = getOrganForHour(hour)
    const greeting = GREETINGS[timeOfDay]
    const mood = TIME_MOODS[timeOfDay]

    return {
      now,
      hour,
      timeOfDay,
      greeting,
      mood,
      organ: organ ? {
        name: organ.organ,
        element: organ.element,
        seasonId: organ.id,
        window: `${organ.start}–${organ.end < 10 ? '0' + organ.end : organ.end}`,
      } : null,
    }
  }, [now])
}
