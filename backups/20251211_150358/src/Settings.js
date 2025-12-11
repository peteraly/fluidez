import React, { useState, useEffect } from 'react';

const theme = { primary: '#2D5A27', primaryLight: '#4A7C43', bg: '#FAFAFA', surface: '#FFF', text: '#1A1A1A', textLight: '#666', border: '#E0E0E0', error: '#CD5C5C' };

export default function Settings({ onBack }) {
  const [settings, setSettings] = useState({
    soundEffects: true,
    vibration: true,
    autoPlayAudio: true,
    dailyReminder: false,
    reminderTime: '09:00',
    spanishLevel: 'A1',
    dailyGoal: 15,
    geminiKey: ''
  });
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load settings
    const savedSettings = JSON.parse(localStorage.getItem('fluidez_settings') || '{}');
    const geminiKey = localStorage.getItem('gemini_api_key') || '';
    setSettings(s => ({ ...s, ...savedSettings, geminiKey }));
  }, []);

  const updateSetting = (key, value) => {
    setSettings(s => ({ ...s, [key]: value }));
    setSaved(false);
  };

  const saveSettings = () => {
    const { geminiKey, ...otherSettings } = settings;
    localStorage.setItem('fluidez_settings', JSON.stringify(otherSettings));
    if (geminiKey) {
      localStorage.setItem('gemini_api_key', geminiKey);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const resetProgress = () => {
    if (window.confirm('Are you sure? This will reset ALL your progress, achievements, and statistics. This cannot be undone!')) {
      localStorage.removeItem('fluidez_progress');
      localStorage.removeItem('fluidez_achievements');
      localStorage.removeItem('fluidez_practice_history');
      localStorage.removeItem('fluidez_vocabulary');
      localStorage.removeItem('fluidez_xp');
      localStorage.removeItem('fluidez_vault');
      alert('Progress reset. Refresh the app to start fresh.');
    }
  };

  const clearCache = () => {
    if (window.confirm('Clear cached data? Your progress will be kept.')) {
      localStorage.removeItem('fluidez_onboarded');
      localStorage.removeItem('fluidez_daily_challenge_date');
      alert('Cache cleared.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>Settings</h2>
        <button onClick={saveSettings} style={styles.saveBtn}>
          {saved ? '✓' : 'Save'}
        </button>
      </div>

      <div style={styles.content}>
        {/* API Key Section */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>🔑 API Configuration</h3>
          <div style={styles.card}>
            <label style={styles.label}>Gemini API Key</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type={showKey ? 'text' : 'password'}
                value={settings.geminiKey}
                onChange={e => updateSetting('geminiKey', e.target.value)}
                placeholder="Enter your Gemini API key"
                style={styles.input}
              />
              <button onClick={() => setShowKey(!showKey)} style={styles.toggleKeyBtn}>
                {showKey ? '🙈' : '👁️'}
              </button>
            </div>
            <p style={styles.hint}>Required for AI Practice, Voice Chat, and Roleplay</p>
          </div>
        </div>

        {/* Learning Preferences */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>📚 Learning Preferences</h3>
          <div style={styles.card}>
            <div style={styles.row}>
              <span>Spanish Level</span>
              <select
                value={settings.spanishLevel}
                onChange={e => updateSetting('spanishLevel', e.target.value)}
                style={styles.select}
              >
                <option value="A1">A1 - Beginner</option>
                <option value="A2">A2 - Elementary</option>
                <option value="B1">B1 - Intermediate</option>
              </select>
            </div>
            <div style={styles.row}>
              <span>Daily Goal (minutes)</span>
              <select
                value={settings.dailyGoal}
                onChange={e => updateSetting('dailyGoal', parseInt(e.target.value))}
                style={styles.select}
              >
                <option value={5}>5 min</option>
                <option value={10}>10 min</option>
                <option value={15}>15 min</option>
                <option value={30}>30 min</option>
                <option value={60}>60 min</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sound & Feedback */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>🔊 Sound & Feedback</h3>
          <div style={styles.card}>
            <div style={styles.row}>
              <span>Sound Effects</span>
              <label style={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.soundEffects}
                  onChange={e => updateSetting('soundEffects', e.target.checked)}
                />
                <span style={styles.slider}></span>
              </label>
            </div>
            <div style={styles.row}>
              <span>Auto-play Audio</span>
              <label style={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.autoPlayAudio}
                  onChange={e => updateSetting('autoPlayAudio', e.target.checked)}
                />
                <span style={styles.slider}></span>
              </label>
            </div>
            <div style={styles.row}>
              <span>Vibration</span>
              <label style={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.vibration}
                  onChange={e => updateSetting('vibration', e.target.checked)}
                />
                <span style={styles.slider}></span>
              </label>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>💾 Data Management</h3>
          <div style={styles.card}>
            <button onClick={clearCache} style={styles.actionBtn}>
              🗑️ Clear Cache
            </button>
            <button onClick={resetProgress} style={{ ...styles.actionBtn, color: theme.error, borderColor: theme.error }}>
              ⚠️ Reset All Progress
            </button>
          </div>
        </div>

        {/* App Info */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>ℹ️ About</h3>
          <div style={styles.card}>
            <div style={styles.infoRow}>
              <span>Version</span>
              <span style={{ color: theme.textLight }}>2.0.0</span>
            </div>
            <div style={styles.infoRow}>
              <span>30-Day Spanish Course</span>
              <span style={{ color: theme.textLight }}>A1 → B1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 500, margin: '0 auto', minHeight: '100vh', background: theme.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  header: { background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`, color: '#fff', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  title: { margin: 0, fontSize: 18 },
  backBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' },
  saveBtn: { background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  content: { padding: 16 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 14, fontWeight: 600, color: theme.textLight, marginBottom: 8, marginLeft: 4 },
  card: { background: theme.surface, borderRadius: 12, padding: 16, border: `1px solid ${theme.border}` },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${theme.border}` },
  infoRow: { display: 'flex', justifyContent: 'space-between', padding: '10px 0' },
  label: { display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 8 },
  input: { flex: 1, padding: 12, fontSize: 14, border: `1px solid ${theme.border}`, borderRadius: 8, outline: 'none' },
  toggleKeyBtn: { padding: '8px 12px', background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 8, cursor: 'pointer' },
  hint: { fontSize: 12, color: theme.textLight, marginTop: 8 },
  select: { padding: '8px 12px', fontSize: 14, border: `1px solid ${theme.border}`, borderRadius: 8, background: theme.surface },
  toggle: { position: 'relative', display: 'inline-block', width: 50, height: 28 },
  slider: { position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#ccc', borderRadius: 28, transition: '.3s' },
  actionBtn: { width: '100%', padding: 14, background: 'transparent', border: `1px solid ${theme.border}`, borderRadius: 8, fontSize: 14, cursor: 'pointer', marginBottom: 8 }
};

// Add CSS for toggle switch
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .toggle input { opacity: 0; width: 0; height: 0; }
  .toggle input:checked + .slider { background-color: #2D5A27; }
  .slider:before { position: absolute; content: ""; height: 20px; width: 20px; left: 4px; bottom: 4px; background-color: white; border-radius: 50%; transition: .3s; }
  input:checked + .slider:before { transform: translateX(22px); }
`;
document.head.appendChild(styleSheet);
