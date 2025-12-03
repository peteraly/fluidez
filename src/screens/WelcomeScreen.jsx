import React from 'react';
import { Button } from '../components';
import { colors, spacing } from '../styles/theme';

export const WelcomeScreen = ({ onNext }) => (
  <div style={styles.container}>
    <div style={styles.content}>
      <h1 style={styles.title}>Speak Spanish in 30 Days</h1>
      <p style={styles.description}>
        Not "learn some words." Actual conversational fluency, in one month.
      </p>
      <p style={styles.subdescription}>
        No games. No gimmicks. Just a clear path that works.
      </p>
    </div>
    <Button onClick={onNext} fullWidth>Get Started</Button>
  </div>
);

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: `40px ${spacing.lg}px`,
    backgroundColor: colors.bgPrimary,
  },
  content: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: '700', color: colors.textPrimary, marginBottom: 24, lineHeight: 1.2 },
  description: { fontSize: 18, color: colors.textSecondary, lineHeight: 1.6, marginBottom: 16 },
  subdescription: { fontSize: 16, color: colors.textSecondary },
};
