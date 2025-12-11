import React, { useState } from 'react';

/**
 * PostConversationReflection
 * 
 * Optional, low-pressure reflection after voice chat sessions.
 * Focuses on feelings and celebration, NOT accuracy assessment.
 * 
 * Design principles:
 * - Never mandatory - always skippable
 * - Celebrates effort and communication
 * - Builds metacognitive awareness
 * - No grades or scores
 */

const theme = {
  primary: '#2D5A27',
  primaryLight: '#4A7C43',
  bg: '#FAFAFA',
  surface: '#FFF',
  text: '#1A1A1A',
  textLight: '#666',
  border: '#E0E0E0',
  success: '#4CAF50',
  warning: '#FFC107'
};

// Feeling options - emoji-based for quick selection
const FEELING_OPTIONS = [
  { emoji: '🔥', label: 'On fire!', value: 'amazing' },
  { emoji: '😊', label: 'Good', value: 'good' },
  { emoji: '😅', label: 'Challenged', value: 'challenged' },
  { emoji: '😤', label: 'Frustrated', value: 'frustrated' },
  { emoji: '🤔', label: 'Confused', value: 'confused' },
  { emoji: '😴', label: 'Tired', value: 'tired' }
];

// Quick reflection prompts
const REFLECTION_PROMPTS = [
  { id: 'proud', text: 'Something I\'m proud of:', placeholder: 'I tried saying...' },
  { id: 'learned', text: 'Something new I noticed:', placeholder: 'María used a word...' },
  { id: 'next', text: 'Next time I want to try:', placeholder: 'Asking more questions...' }
];

// Celebration messages based on session stats
const getCelebrationMessage = (stats) => {
  if (stats.speakingAttempts >= 20) return "¡Increíble! 20+ exchanges - you're having real conversations!";
  if (stats.speakingAttempts >= 10) return "¡Muy bien! Double digits - that's serious practice!";
  if (stats.speakingAttempts >= 5) return "¡Bien hecho! You showed up and spoke - that's what matters!";
  return "Every attempt builds your confidence. ¡Sigue adelante!";
};

// Insight based on patterns
const getInsight = (stats, feeling) => {
  if (feeling === 'frustrated' || feeling === 'confused') {
    return "Frustration means you're pushing your limits - that's where growth happens! 💪";
  }
  if (stats.hesitations > stats.speakingAttempts) {
    return "Lots of thinking time is normal! Your brain is processing Spanish. Trust the process.";
  }
  if (stats.longestUtterance >= 5) {
    return `You said ${stats.longestUtterance} words in a row! Your sentences are growing.`;
  }
  return "Speaking a new language takes courage. You showed up today - that's half the battle!";
};

export default function PostConversationReflection({ 
  stats, 
  scenario, 
  onComplete, 
  onSkip 
}) {
  const [feeling, setFeeling] = useState(null);
  const [reflections, setReflections] = useState({});
  const [showPrompts, setShowPrompts] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFeelingSelect = (value) => {
    setFeeling(value);
    setShowPrompts(true);
  };

  const handleReflectionChange = (id, value) => {
    setReflections(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    // Save reflection to localStorage
    const reflectionData = {
      date: new Date().toISOString(),
      scenario: scenario?.id,
      feeling,
      reflections,
      stats: {
        speakingAttempts: stats.speakingAttempts,
        duration: stats.duration,
        spanishWords: stats.spanishWordsUsed?.size || 0
      }
    };

    const history = JSON.parse(localStorage.getItem('fluidez_reflections') || '[]');
    history.push(reflectionData);
    localStorage.setItem('fluidez_reflections', JSON.stringify(history.slice(-50))); // Keep last 50

    setSubmitted(true);
    setTimeout(() => onComplete(reflectionData), 1500);
  };

  // Thank you screen after submission
  if (submitted) {
    return (
      <div style={styles.container}>
        <div style={styles.thankYou}>
          <span style={{ fontSize: 64 }}>🌟</span>
          <h2 style={{ margin: '16px 0 8px' }}>¡Gracias!</h2>
          <p style={{ color: theme.textLight }}>Your reflection helps track your journey</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Quick Reflection</h2>
        <button onClick={onSkip} style={styles.skipBtn}>Skip →</button>
      </div>

      <div style={styles.content}>
        {/* Celebration message */}
        <div style={styles.celebrationCard}>
          <span style={{ fontSize: 32 }}>🎉</span>
          <p style={styles.celebrationText}>{getCelebrationMessage(stats)}</p>
        </div>

        {/* How are you feeling? */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>How do you feel about that conversation?</h3>
          <div style={styles.feelingGrid}>
            {FEELING_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => handleFeelingSelect(opt.value)}
                style={{
                  ...styles.feelingBtn,
                  borderColor: feeling === opt.value ? theme.primary : theme.border,
                  background: feeling === opt.value ? '#E8F5E9' : theme.surface
                }}
              >
                <span style={{ fontSize: 28 }}>{opt.emoji}</span>
                <span style={{ fontSize: 12, marginTop: 4 }}>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Insight based on feeling */}
        {feeling && (
          <div style={styles.insightCard}>
            <span>💡</span>
            <p style={{ margin: 0, flex: 1 }}>{getInsight(stats, feeling)}</p>
          </div>
        )}

        {/* Optional reflection prompts */}
        {showPrompts && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Optional: Quick notes (for yourself)</h3>
            {REFLECTION_PROMPTS.map(prompt => (
              <div key={prompt.id} style={styles.promptCard}>
                <label style={styles.promptLabel}>{prompt.text}</label>
                <input
                  type="text"
                  placeholder={prompt.placeholder}
                  value={reflections[prompt.id] || ''}
                  onChange={(e) => handleReflectionChange(prompt.id, e.target.value)}
                  style={styles.promptInput}
                />
              </div>
            ))}
          </div>
        )}

        {/* Submit button */}
        {feeling && (
          <button onClick={handleSubmit} style={styles.submitBtn}>
            Save & Continue →
          </button>
        )}

        {/* Stats summary */}
        <div style={styles.statsCard}>
          <div style={styles.statItem}>
            <span style={styles.statNum}>{stats.speakingAttempts || 0}</span>
            <span style={styles.statLabel}>Times you spoke</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNum}>{stats.spanishWordsUsed?.size || 0}</span>
            <span style={styles.statLabel}>Spanish words</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNum}>{Math.floor((stats.duration || 0) / 60)}m</span>
            <span style={styles.statLabel}>Practice time</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Compact inline version for end of chat
export function QuickReflectionPrompt({ onReflect, onSkip }) {
  return (
    <div style={styles.quickPrompt}>
      <p style={{ margin: '0 0 12px', fontWeight: 500 }}>Take 30 seconds to reflect?</p>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={onReflect} style={styles.quickBtn}>
          ✍️ Quick reflection
        </button>
        <button onClick={onSkip} style={styles.quickSkipBtn}>
          Skip
        </button>
      </div>
    </div>
  );
}

// Get reflection history for insights
export function getReflectionInsights() {
  const reflections = JSON.parse(localStorage.getItem('fluidez_reflections') || '[]');
  
  if (reflections.length === 0) return null;

  const feelings = reflections.map(r => r.feeling);
  const mostCommon = feelings.sort((a, b) =>
    feelings.filter(v => v === a).length - feelings.filter(v => v === b).length
  ).pop();

  const totalSpeaking = reflections.reduce((sum, r) => sum + (r.stats?.speakingAttempts || 0), 0);
  
  return {
    totalReflections: reflections.length,
    mostCommonFeeling: mostCommon,
    totalSpeakingAttempts: totalSpeaking,
    recentReflections: reflections.slice(-5)
  };
}

const styles = {
  container: {
    maxWidth: 500,
    margin: '0 auto',
    minHeight: '100vh',
    background: theme.bg,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: `1px solid ${theme.border}`
  },
  title: {
    margin: 0,
    fontSize: 18,
    fontWeight: 600
  },
  skipBtn: {
    background: 'none',
    border: 'none',
    color: theme.textLight,
    fontSize: 14,
    cursor: 'pointer'
  },
  content: {
    padding: 20
  },
  celebrationCard: {
    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`,
    color: '#fff',
    padding: 24,
    borderRadius: 16,
    textAlign: 'center',
    marginBottom: 24
  },
  celebrationText: {
    margin: '12px 0 0',
    fontSize: 16,
    lineHeight: 1.5
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 12
  },
  feelingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 10
  },
  feelingBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    border: '2px solid',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  insightCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    background: '#FEF3C7',
    borderRadius: 12,
    marginBottom: 24,
    fontSize: 14,
    lineHeight: 1.5
  },
  promptCard: {
    marginBottom: 12
  },
  promptLabel: {
    display: 'block',
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 6,
    color: theme.text
  },
  promptInput: {
    width: '100%',
    padding: 12,
    fontSize: 14,
    border: `1px solid ${theme.border}`,
    borderRadius: 8,
    outline: 'none',
    boxSizing: 'border-box'
  },
  submitBtn: {
    width: '100%',
    background: theme.primary,
    color: '#fff',
    border: 'none',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    marginBottom: 24
  },
  statsCard: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: 16,
    background: theme.surface,
    borderRadius: 12,
    border: `1px solid ${theme.border}`
  },
  statItem: {
    textAlign: 'center'
  },
  statNum: {
    display: 'block',
    fontSize: 20,
    fontWeight: 700,
    color: theme.primary
  },
  statLabel: {
    fontSize: 11,
    color: theme.textLight
  },
  thankYou: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    textAlign: 'center'
  },
  quickPrompt: {
    background: theme.surface,
    padding: 16,
    borderRadius: 12,
    textAlign: 'center',
    margin: '16px 0'
  },
  quickBtn: {
    flex: 1,
    padding: 12,
    background: theme.primary,
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 500
  },
  quickSkipBtn: {
    padding: '12px 20px',
    background: 'none',
    border: `1px solid ${theme.border}`,
    borderRadius: 8,
    cursor: 'pointer',
    color: theme.textLight
  }
};
