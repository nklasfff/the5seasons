import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <SeasonProvider>
        <ScrollToTop />
        <AppShell>
          <Routes>
            <Route path="/hjem" element={<HomePage />} />
            <Route path="/saesoner" element={<SeasonsPage />} />
            <Route path="/saesoner/:id" element={<SeasonDetailPage />} />
            <Route path="/praksis" element={<PracticePage />} />
            <Route path="/praksis/journal" element={<Journal />} />
            <Route path="/praksis/meditation" element={<Meditation />} />
            <Route path="/praksis/organur" element={<OrganClockPage />} />
            <Route path="/profil" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/hjem" replace />} />
          </Routes>
        </AppShell>
      </SeasonProvider>
    </HashRouter>
  );
}
