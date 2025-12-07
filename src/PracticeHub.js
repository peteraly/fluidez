import React, { useState } from 'react';
import RoleplayMode from './RoleplayMode';
import QuickReview from './QuickReview';
import ContentVault from './ContentVault';
import GrammarDrills from './GrammarDrills';
import PronunciationPractice from './PronunciationPractice';

const theme = {
  primary: '#2D5A27',
  primaryLight: '#4A7C43',
  bg: '#FAFAFA',
  surface: '#FFF',
  text: '#1A1A1A',
  textLight: '#666',
  border: '#E0E0E0'
};

const MODES = [
  { id: 'roleplay', icon: '🎭', title: 'Roleplay', desc: 'Real scenarios', color: '#8B5CF6' },
  { id: 'grammar', icon: '📝', title: 'Grammar', desc: 'Focused drills', color: '#3B82F6' },
  { id: 'pronunciation', icon: '🎤', title: 'Pronunciation', desc: 'Speak & compare', color: '#EC4899' },
  { id: 'review', icon: '🔄', title: 'Flashcards', desc: 'Quick review', color: '#10B981' },
  { id: 'vault', icon: '📚', title: 'Content', desc: 'Your content', color: '#F59E0B' }
];

export default function PracticeHub({ onBack, onVoiceChat }) {
  const [activeMode, setActiveMode] = useState(null);

  if (activeMode === 'roleplay') return <RoleplayMode onBack={() => setActiveMode(null)} />;
  if (activeMode === 'review') return <QuickReview onBack={() => setActiveMode(null)} />;
  if (activeMode === 'vault') return <ContentVault onBack={() => setActiveMode(null)} />;
  if (activeMode === 'grammar') return <GrammarDrills onBack={() => setActiveMode(null)} />;
  if (activeMode === 'pronunciation') return <PronunciationPractice onBack={() => setActiveMode(null)} />;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>Practice Hub</h2>
        <div style={{ width: 40 }} />
      </div>

      <div style={styles.content}>
        <p style={styles.intro}>Choose your practice mode</p>

        <div style={styles.grid}>
          {MODES.map(mode => (
            <button key={mode.id} onClick={() => setActiveMode(mode.id)} style={styles.card}>
              <div style={{ ...styles.iconBg, background: mode.color + '20' }}>
                <span style={styles.icon}>{mode.icon}</span>
              </div>
              <h3 style={styles.cardTitle}>{mode.title}</h3>
              <p style={styles.cardDesc}>{mode.desc}</p>
            </button>
          ))}

          <button onClick={onVoiceChat} style={styles.card}>
            <div style={{ ...styles.iconBg, background: '#2D5A2720' }}>
              <span style={styles.icon}>🎙️</span>
            </div>
            <h3 style={styles.cardTitle}>Voice Chat</h3>
            <p style={styles.cardDesc}>Conversation</p>
          </button>
        </div>

        <div style={styles.tipCard}>
          <span style={styles.tipIcon}>💡</span>
          <div>
            <strong>New!</strong> Grammar Drills for focused practice on tricky topics like Ser vs Estar.
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 500, margin: '0 auto', minHeight: '100vh', background: theme.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  header: { background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`, color: '#fff', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  title: { margin: 0, fontSize: 18, fontWeight: 600 },
  backBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer', padding: 8 },
  content: { padding: 20 },
  intro: { textAlign: 'center', color: theme.textLight, marginBottom: 24 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  card: { background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 20, padding: 20, textAlign: 'center', cursor: 'pointer' },
  iconBg: { width: 56, height: 56, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' },
  icon: { fontSize: 28 },
  cardTitle: { margin: '0 0 4px', fontSize: 15, fontWeight: 600 },
  cardDesc: { margin: 0, fontSize: 12, color: theme.textLight },
  tipCard: { display: 'flex', alignItems: 'flex-start', gap: 12, marginTop: 24, padding: 16, background: '#E8F5E9', borderRadius: 12, fontSize: 14 },
  tipIcon: { fontSize: 20 }
};
