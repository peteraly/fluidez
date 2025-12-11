import React, { useState } from 'react';
import { Button, Card } from '../components';
import { colors, spacing } from '../styles/theme';

export const DialectScreen = ({ onNext, setDialect }) => {
  const [selected, setSelected] = useState(null);
  
  const options = [
    { id: 'latam', title: 'Latin American', desc: 'Mexico, Central & South America' },
    { id: 'spain', title: 'European', desc: 'Spain' },
  ];
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Which Spanish?</h2>
      <p style={styles.subtitle}>You can change this later.</p>
      <div style={styles.options}>
        {options.map(opt => (
          <Card 
            key={opt.id} 
            onClick={() => setSelected(opt.id)} 
            style={{
              marginBottom: 16,
              cursor: 'pointer',
              border: selected === opt.id ? `2px solid ${colors.accent}` : '2px solid transparent',
              backgroundColor: selected === opt.id ? colors.accentLight : colors.bgSecondary,
            }}
          >
            <h3 style={styles.optionTitle}>{opt.title}</h3>
            <p style={styles.optionDesc}>{opt.desc}</p>
          </Card>
        ))}
      </div>
      <Button 
        onClick={() => { setDialect(selected); onNext(); }} 
        fullWidth 
        disabled={!selected}
      >
        Continue
      </Button>
    </div>
  );
};

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: `40px ${spacing.lg}px`,
    backgroundColor: colors.bgPrimary,
  },
  title: { fontSize: 24, fontWeight: '600', color: colors.textPrimary, marginBottom: 8 },
  subtitle: { color: colors.textSecondary, marginBottom: 32 },
  options: { flex: 1 },
  optionTitle: { margin: 0, fontSize: 18, color: colors.textPrimary },
  optionDesc: { margin: '4px 0 0', fontSize: 14, color: colors.textSecondary },
};
