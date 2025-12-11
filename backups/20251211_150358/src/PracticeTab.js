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

// Practice modes data
const PRACTICE_MODES = [
  { id: 'roleplay', icon: '🎭', title: 'Roleplay', desc: 'Real scenarios', color: '#8B5CF6' },
  { id: 'grammar', icon: '📝', title: 'Grammar', desc: 'Focused drills', color: '#3B82F6' },
  { id: 'pronunciation', icon: '🎤', title: 'Pronunciation', desc: 'Speak & compare', color: '#EC4899' },
  { id: 'vault', icon: '📚', title: 'My Content', desc: 'Your imports', color: '#F59E0B' },
];

// Vocabulary categories (existing)
const VOCAB_CATEGORIES = [
  { id: 'greetings', icon: '👋', name: 'Greetings', count: 25 },
  { id: 'numbers', icon: '🔢', name: 'Numbers', count: 40 },
  { id: 'time', icon: '📅', name: 'Time & Calendar', count: 38 },
  { id: 'family', icon: '👨‍👩‍👧‍👦', name: 'Family', count: 25 },
  { id: 'food', icon: '🍽️', name: 'Food & Drinks', count: 35 },
  { id: 'body', icon: '🫀', name: 'Body Parts', count: 24 },
  { id: 'clothing', icon: '👕', name: 'Clothing', count: 22 },
  { id: 'house', icon: '🏠', name: 'House & Home', count: 25 },
  { id: 'weather', icon: '🌤️', name: 'Weather', count: 16 },
  { id: 'professions', icon: '💼', name: 'Professions', count: 20 },
  { id: 'animals', icon: '🐾', name: 'Animals', count: 20 },
  { id: 'transport', icon: '🚗', name: 'Transportation', count: 16 },
  { id: 'places', icon: '📍', name: 'Places', count: 20 },
  { id: 'adjectives', icon: '📝', name: 'Adjectives', count: 30 },
  { id: 'verbs', icon: '🏃', name: 'Common Verbs', count: 40 },
  { id: 'phrases', icon: '💬', name: 'Essential Phrases', count: 25 },
];

export default function PracticeTab({ onVoiceChat, existingPracticeContent }) {
  const [activeMode, setActiveMode] = useState(null);
  const [activeSection, setActiveSection] = useState('modes'); // 'modes' | 'vocab'

  // Render active practice mode
  if (activeMode === 'roleplay') return <RoleplayMode onBack={() => setActiveMode(null)} />;
  if (activeMode === 'grammar') return <GrammarDrills onBack={() => setActiveMode(null)} />;
  if (activeMode === 'pronunciation') return <PronunciationPractice onBack={() => setActiveMode(null)} />;
  if (activeMode === 'vault') return <ContentVault onBack={() => setActiveMode(null)} />;
  if (activeMode === 'flashcards') return <QuickReview onBack={() => setActiveMode(null)} />;

  // Get mastered count from localStorage
  const getMasteredCount = () => {
    try {
      const vocab = JSON.parse(localStorage.getItem('fluidez_vocabulary') || '{}');
      return vocab.summary?.mastered || 0;
    } catch {
      return 0;
    }
  };

  const totalWords = VOCAB_CATEGORIES.reduce((sum, c) => sum + c.count, 0);
  const masteredCount = getMasteredCount();

  return (
    <div style={styles.container}>
      {/* Header Stats */}
      <div style={styles.statsCard}>
        <div style={styles.statItem}>
          <div style={styles.statValue}>{masteredCount}/{totalWords}</div>
          <div style={styles.statLabel}>Vocabulary Mastery</div>
        </div>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${(masteredCount / totalWords) * 100}%` }} />
        </div>
        <div style={styles.statHint}>Review cards 3+ times to master</div>
      </div>

      {/* Section Tabs */}
      <div style={styles.sectionTabs}>
        <button 
          onClick={() => setActiveSection('modes')}
          style={{
            ...styles.sectionTab,
            borderBottom: activeSection === 'modes' ? `3px solid ${theme.primary}` : '3px solid transparent',
            color: activeSection === 'modes' ? theme.primary : theme.textLight
          }}
        >
          🎯 Practice Modes
        </button>
        <button 
          onClick={() => setActiveSection('vocab')}
          style={{
            ...styles.sectionTab,
            borderBottom: activeSection === 'vocab' ? `3px solid ${theme.primary}` : '3px solid transparent',
            color: activeSection === 'vocab' ? theme.primary : theme.textLight
          }}
        >
          📚 Vocabulary
        </button>
      </div>

      {/* Practice Modes Section */}
      {activeSection === 'modes' && (
        <div style={styles.content}>
          {/* AI Practice Modes */}
          <div style={styles.modesGrid}>
            {PRACTICE_MODES.map(mode => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                style={styles.modeCard}
              >
                <div style={{ ...styles.modeIcon, background: mode.color + '20' }}>
                  <span style={{ fontSize: 24 }}>{mode.icon}</span>
                </div>
                <div style={styles.modeInfo}>
                  <h3 style={styles.modeTitle}>{mode.title}</h3>
                  <p style={styles.modeDesc}>{mode.desc}</p>
                </div>
                <span style={styles.arrow}>→</span>
              </button>
            ))}

            {/* Voice Chat */}
            <button onClick={onVoiceChat} style={styles.modeCard}>
              <div style={{ ...styles.modeIcon, background: '#10B98120' }}>
                <span style={{ fontSize: 24 }}>🎙️</span>
              </div>
              <div style={styles.modeInfo}>
                <h3 style={styles.modeTitle}>Voice Chat</h3>
                <p style={styles.modeDesc}>Free conversation</p>
              </div>
              <span style={styles.arrow}>→</span>
            </button>

            {/* Quick Flashcards */}
            <button onClick={() => setActiveMode('flashcards')} style={styles.modeCard}>
              <div style={{ ...styles.modeIcon, background: '#F59E0B20' }}>
                <span style={{ fontSize: 24 }}>🔄</span>
              </div>
              <div style={styles.modeInfo}>
                <h3 style={styles.modeTitle}>Quick Review</h3>
                <p style={styles.modeDesc}>Flashcard drill</p>
              </div>
              <span style={styles.arrow}>→</span>
            </button>
          </div>

          {/* Tips */}
          <div style={styles.tipCard}>
            <span style={{ fontSize: 20 }}>💡</span>
            <div>
              <strong>Tip:</strong> Roleplay scenarios are great for building real-world confidence!
            </div>
          </div>
        </div>
      )}

      {/* Vocabulary Section */}
      {activeSection === 'vocab' && (
        <div style={styles.content}>
          <div style={styles.vocabGrid}>
            {VOCAB_CATEGORIES.map(cat => (
              <button key={cat.id} style={styles.vocabCard}>
                <span style={styles.vocabIcon}>{cat.icon}</span>
                <div style={styles.vocabInfo}>
                  <h4 style={styles.vocabName}>{cat.name}</h4>
                  <p style={styles.vocabCount}>0/{cat.count}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    background: theme.bg,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  statsCard: {
    background: theme.surface,
    padding: 20,
    margin: 16,
    borderRadius: 16,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  },
  statItem: {
    textAlign: 'center',
    marginBottom: 12
  },
  statValue: {
    fontSize: 28,
    fontWeight: 700,
    color: theme.primary
  },
  statLabel: {
    fontSize: 14,
    color: theme.textLight
  },
  progressBar: {
    height: 8,
    background: theme.border,
    borderRadius: 4,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    background: theme.primary,
    borderRadius: 4,
    transition: 'width 0.5s ease'
  },
  statHint: {
    fontSize: 12,
    color: theme.textLight,
    textAlign: 'center',
    marginTop: 8
  },
  sectionTabs: {
    display: 'flex',
    background: theme.surface,
    borderBottom: `1px solid ${theme.border}`
  },
  sectionTab: {
    flex: 1,
    padding: '14px 16px',
    background: 'none',
    border: 'none',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  content: {
    padding: 16
  },
  modesGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  modeCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    background: theme.surface,
    border: `1px solid ${theme.border}`,
    borderRadius: 16,
    padding: 16,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  modeIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modeInfo: {
    flex: 1
  },
  modeTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 600
  },
  modeDesc: {
    margin: '4px 0 0',
    fontSize: 13,
    color: theme.textLight
  },
  arrow: {
    fontSize: 18,
    color: theme.textLight
  },
  tipCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    marginTop: 20,
    padding: 16,
    background: '#E8F5E9',
    borderRadius: 12,
    fontSize: 14
  },
  vocabGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12
  },
  vocabCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: theme.surface,
    border: `1px solid ${theme.border}`,
    borderRadius: 12,
    padding: 14,
    cursor: 'pointer',
    textAlign: 'left'
  },
  vocabIcon: {
    fontSize: 24
  },
  vocabInfo: {
    flex: 1
  },
  vocabName: {
    margin: 0,
    fontSize: 14,
    fontWeight: 600
  },
  vocabCount: {
    margin: '2px 0 0',
    fontSize: 12,
    color: theme.textLight
  }
};
