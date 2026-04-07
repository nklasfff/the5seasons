import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SeasonProvider } from './context/SeasonContext';
import AppShell from './components/layout/AppShell';
import HomePage from './pages/HomePage';
import SeasonsPage from './pages/SeasonsPage';
import SeasonDetailPage from './pages/SeasonDetailPage';
import PracticePage from './pages/PracticePage';
import Journal from './components/practice/Journal';
import Meditation from './components/practice/Meditation';
import OrganClockPage from './components/practice/OrganClock';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  return (
    <HashRouter>
      <SeasonProvider>
        <AppShell>
          <Routes>
            <Route path="/" element={<Navigate to="/hjem" replace />} />
            <Route path="/hjem" element={<HomePage />} />
            <Route path="/saesoner" element={<SeasonsPage />} />
            <Route path="/saesoner/:id" element={<SeasonDetailPage />} />
            <Route path="/praksis" element={<PracticePage />} />
            <Route path="/praksis/journal" element={<Journal />} />
            <Route path="/praksis/meditation" element={<Meditation />} />
            <Route path="/praksis/organur" element={<OrganClockPage />} />
            <Route path="/profil" element={<ProfilePage />} />
          </Routes>
        </AppShell>
      </SeasonProvider>
    </HashRouter>
  );
}
