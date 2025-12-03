import React from 'react';
import { Button } from '../components';
import { colors, spacing } from '../styles/theme';

export const CompletionScreen = ({ type, stats, onContinue }) => {
  const config = {
    module: { emoji: '✨', title: 'Module Complete!' },
    day: { emoji: '🏆', title: 'Day Complete!' },
    flashcards: { emoji: '🎯', title: 'Review Complete!' },
    assessment: { 
      emoji: stats?.passed ? '🏆' : '📚', 
      title: stats?.passed ? 'Assessment Passed!' : 'Keep Practicing!' 
    },
  };
  
  const { emoji, title } = config[type] || config.module;
  
  return (
    <div style={styles.container}>
      <div style={styles.emoji}>{emoji}</div>
      <h1 style={styles.title}>{title}</h1>
      {stats && (
        <p style={styles.stats}>
          {stats.correct !== undefined && `${stats.correct}/${stats.reviewed} correct`}
          {stats.score !== undefined && `${stats.score}/${stats.total} correct`}
        </p>
      )}
      <Button onClick={onContinue}>Continue</Button>
    </div>
  );
};

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `40px ${spacing.lg}px`,
    backgroundColor: colors.bgPrimary,
    textAlign: 'center',
  },
  emoji: { fontSize: 72, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '700', color: colors.textPrimary, marginBottom: 8 },
  stats: { fontSize: 18, color: colors.textSecondary, marginBottom: 32 },
};
