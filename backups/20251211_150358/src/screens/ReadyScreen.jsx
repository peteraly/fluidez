import React from 'react';
import { Button } from '../components';
import { colors, spacing } from '../styles/theme';

export const ReadyScreen = ({ onStart }) => (
  <div style={styles.container}>
    <div style={styles.emoji}>🎉</div>
    <h1 style={styles.title}>You're All Set!</h1>
    <p style={styles.description}>
      In 30 days: 2,000+ words, core grammar, real conversations.
    </p>
    <Button onClick={onStart} fullWidth>Start Day 1</Button>
  </div>
);

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
  title: { fontSize: 28, fontWeight: '700', color: colors.textPrimary, marginBottom: 24 },
  description: { color: colors.textSecondary, marginBottom: 32 },
};
