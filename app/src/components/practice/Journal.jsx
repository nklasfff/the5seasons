import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSeason } from '../../context/SeasonContext';
import GlassCard from '../common/GlassCard';
import styles from './Journal.module.css';

const promptsBySeason = {
  foraar: [
    'Hvor i dit liv har du brug for at trække en grænse lige nu?',
    'Hvad vil du gerne forny i denne sæson?',
    'Hvem eller hvad har du brug for at tilgive?',
  ],
  sommer: [
    'Hvad giver dit liv mening lige nu?',
    'Hvor vælger du frygt over kærlighed i dit liv?',
    'Hvad brænder du for — og lever du det?',
  ],
  sensommer: [
    'Hvad nærer dig virkelig — krop, sind og sjæl?',
    'Hvad har du svært ved at modtage?',
    'Hvor i kroppen mærker du ro? Og uro?',
  ],
  efteraar: [
    'Hvad er du klar til at give slip på?',
    'Hvad savner du — og kan du give sorgen plads?',
    'Hvad er du taknemlig for lige nu?',
  ],
  vinter: [
    'Hvad sker der når du virkelig hviler?',
    'Hvad er din dybeste visdom lige nu?',
    'Hvad frygter du — og kan du møde det med tillid?',
  ],
};

export default function Journal() {
  const { current } = useSeason();
  const navigate = useNavigate();
  const prompts = promptsBySeason[current.id];
  const dayIndex = new Date().getDate() % prompts.length;
  const todayKey = `5seasons-journal-${new Date().toISOString().slice(0, 10)}`;

  const [text, setText] = useState(() => localStorage.getItem(todayKey) || '');
  const [saved, setSaved] = useState(false);

  const save = () => {
    localStorage.setItem(todayKey, text);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <button className={styles.back} onClick={() => navigate('/praksis')}>‹ Praksis</button>
      <h1 className={`${styles.title} animate-fade-up`}>Journal</h1>
      <GlassCard className="animate-fade-up-delay-1" glowColor={current.glowColor}>
        <p className={styles.prompt}>{prompts[dayIndex]}</p>
        <textarea
          className={styles.textarea}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Skriv frit..."
        />
        <button className={styles.saveBtn} onClick={save}>Gem</button>
        {saved && <p className={styles.saved}>Gemt</p>}
      </GlassCard>
    </div>
  );
}
