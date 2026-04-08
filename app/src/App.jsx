import { Routes, Route } from 'react-router-dom'
import { useTime } from './hooks/useTime'
import { useSeason } from './hooks/useSeason'
import { useDynamics } from './hooks/useDynamics'
import AppShell from './components/layout/AppShell'
import Home from './pages/Home'
import Practice from './pages/Practice'
import Season from './pages/Season'
import Univers from './pages/Univers'

export default function App() {
  const time = useTime()
  const season = useSeason()
  const dynamics = useDynamics(time, season)

  return (
    <AppShell time={time} season={season}>
      <Routes>
        <Route path="/" element={<Home time={time} season={season} dynamics={dynamics} />} />
        <Route path="/saeson" element={<Season time={time} season={season} dynamics={dynamics} />} />
        <Route path="/praksis" element={<Practice time={time} season={season} dynamics={dynamics} />} />
        <Route path="/univers" element={<Univers season={season} />} />
      </Routes>
    </AppShell>
  )
}
