import React from 'react';

const theme = { primary: '#2D5A27', primaryLight: '#4A7C43', bg: '#FAFAFA', surface: '#FFF', text: '#1A1A1A', textLight: '#666', border: '#E0E0E0' };

const MODES = [
  { id: 'roleplay', icon: '🎭', title: 'Roleplay', desc: 'Real conversations', color: '#8B5CF6' },
  { id: 'grammar', icon: '📝', title: 'Grammar', desc: 'Focused drills', color: '#3B82F6' },
  { id: 'pronunciation', icon: '🎤', title: 'Pronunciation', desc: 'Speak & compare', color: '#EC4899' },
  { id: 'review', icon: '🔄', title: 'Quick Review', desc: 'Flashcards', color: '#10B981' },
  { id: 'vault', icon: '📚', title: 'Content Vault', desc: 'Your content', color: '#F59E0B' }
];

export default function PracticeModes({ onSelectMode, onVoiceChat }) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.sectionTitle}>🎯 Practice Modes</h3>
      </div>
      <div style={styles.grid}>
        {MODES.map(mode => (
          <button key={mode.id} onClick={() => onSelectMode(mode.id)} style={styles.card}>
            <div style={{ ...styles.iconBg, background: mode.color + '20' }}>
              <span style={{ fontSize: 24 }}>{mode.icon}</span>
            </div>
            <h4 style={styles.cardTitle}>{mode.title}</h4>
            <p style={styles.cardDesc}>{mode.desc}</p>
          </button>
        ))}
        <button onClick={onVoiceChat} style={styles.card}>
          <div style={{ ...styles.iconBg, background: '#2D5A2720' }}>
            <span style={{ fontSize: 24 }}>🎙️</span>
          </div>
          <h4 style={styles.cardTitle}>Voice Chat</h4>
          <p style={styles.cardDesc}>Free conversation</p>
        </button>
      </div>
      <div style={styles.tipCard}>
        <span style={{ fontSize: 18 }}>💡</span>
        <span>Try Roleplay for real-world practice!</span>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '16px 0' },
  header: { padding: '0 16px', marginBottom: 12 },
  sectionTitle: { margin: 0, fontSize: 16, fontWeight: 600, color: theme.text },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, padding: '0 16px' },
  card: { background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 12, textAlign: 'center', cursor: 'pointer' },
  iconBg: { width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' },
  cardTitle: { margin: 0, fontSize: 13, fontWeight: 600 },
  cardDesc: { margin: '4px 0 0', fontSize: 11, color: theme.textLight },
  tipCard: { display: 'flex', alignItems: 'center', gap: 10, margin: '16px', padding: 12, background: '#E8F5E9', borderRadius: 10, fontSize: 13 }
};
