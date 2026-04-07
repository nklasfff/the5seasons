import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSeason } from '../../context/SeasonContext';
import GlassCard from '../common/GlassCard';
import JournalInk from '../illustrations/JournalInk';
import deepData from '../../data/seasonsDeep.json';
import styles from './Journal.module.css';

// Use deep prompts from JSON, fallback to basic
const promptsBySeason = Object.fromEntries(
  Object.entries(deepData).map(([id, data]) => [id, data.journalPrompts || []])
);


export default function Journal() {
  const { current } = useSeason();
  const navigate = useNavigate();
  const prompts = promptsBySeason[current.id];
  const [promptIdx, setPromptIdx] = useState(() => new Date().getDate() % prompts.length);
  const todayKey = `5seasons-journal-${new Date().toISOString().slice(0, 10)}`;

  const [text, setText] = useState(() => localStorage.getItem(todayKey) || '');
  const [saved, setSaved] = useState(false);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  // Recent entries
  const history = useMemo(() => {
    const entries = [];
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = `5seasons-journal-${d.toISOString().slice(0, 10)}`;
      const val = localStorage.getItem(key);
      if (val) {
        entries.push({
          date: `${d.getDate()}/${d.getMonth() + 1}`,
          preview: val.slice(0, 60) + (val.length > 60 ? '...' : ''),
        });
      }
    }
    return entries;
  }, []);

  const save = () => {
    localStorage.setItem(todayKey, text);
    const count = parseInt(localStorage.getItem('5seasons-journal-count') || '0');
    localStorage.setItem('5seasons-journal-count', count + 1);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <button className={styles.back} onClick={() => navigate('/praksis')}>‹ Praksis</button>
      <div className="animate-scale-in" style={{ marginBottom: 'var(--space-sm)' }}>
        <JournalInk size={120} />
      </div>
      <h1 className={`${styles.title} animate-fade-up`}>Journal</h1>

      <GlassCard className="animate-fade-up-delay-1" glowColor={current.glowColor}>
        {/* Prompt with navigation */}
        <div className={styles.promptNav}>
          <button
            className={styles.promptArrow}
            onClick={(e) => { e.stopPropagation(); setPromptIdx((promptIdx - 1 + prompts.length) % prompts.length); }}
          >
            ‹
          </button>
          <p className={styles.prompt}>{prompts[promptIdx]}</p>
          <button
            className={styles.promptArrow}
            onClick={(e) => { e.stopPropagation(); setPromptIdx((promptIdx + 1) % prompts.length); }}
          >
            ›
          </button>
        </div>
        <p className={styles.promptCount}>{promptIdx + 1} / {prompts.length}</p>

        <textarea
          className={styles.textarea}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Skriv frit..."
        />

        <div className={styles.footer}>
          <span className={styles.wordCount}>{wordCount} ord</span>
          <button className={styles.saveBtn} onClick={save}>Gem</button>
        </div>
        {saved && <p className={styles.saved}>Gemt</p>}
      </GlassCard>

      {/* History */}
      {history.length > 0 && (
        <GlassCard className="animate-fade-up-delay-2" style={{ marginTop: 'var(--space-md)' }}>
          <p className={styles.historyLabel}>Tidligere refleksioner</p>
          {history.map((entry, i) => (
            <div key={i} className={styles.historyItem}>
              <span className={styles.historyDate}>{entry.date}</span>
              <span className={styles.historyPreview}>{entry.preview}</span>
            </div>
          ))}
        </GlassCard>
      )}
    </div>
  );
}
