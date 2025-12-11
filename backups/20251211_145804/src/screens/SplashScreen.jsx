import React, { useEffect } from 'react';
import { colors } from '../styles/theme';

export const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  return (
    <div style={styles.container}>
      <div style={styles.emoji}>🇪🇸</div>
      <h1 style={styles.title}>Fluidez</h1>
      <p style={styles.subtitle}>30 Days to Spanish Fluency</p>
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
    backgroundColor: colors.bgPrimary,
  },
  emoji: { fontSize: 64, marginBottom: 16 },
  title: { fontSize: 36, fontWeight: '700', color: colors.accent, margin: 0 },
  subtitle: { color: colors.textSecondary, marginTop: 8 },
};
