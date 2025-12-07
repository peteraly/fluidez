import React, { useState, useEffect } from 'react';

const theme = { primary: '#2D5A27', primaryLight: '#4A7C43', success: '#228B22', error: '#CD5C5C', bg: '#FAFAFA', surface: '#FFF', text: '#1A1A1A', textLight: '#666', border: '#E0E0E0' };

const SAMPLE_VOCAB = [
  { spanish: 'hola', english: 'hello', example: '¡Hola! ¿Cómo estás?' },
  { spanish: 'gracias', english: 'thank you', example: 'Muchas gracias por tu ayuda.' },
  { spanish: 'agua', english: 'water', example: '¿Me puede traer un vaso de agua?' },
  { spanish: 'comida', english: 'food', example: 'La comida mexicana es deliciosa.' },
  { spanish: 'casa', english: 'house', example: 'Mi casa está cerca del parque.' },
  { spanish: 'tiempo', english: 'time/weather', example: '¿Qué tiempo hace hoy?' },
  { spanish: 'trabajo', english: 'work', example: 'Tengo mucho trabajo esta semana.' },
  { spanish: 'amigo', english: 'friend', example: 'Él es mi mejor amigo.' },
  { spanish: 'bueno', english: 'good', example: '¡Qué bueno verte!' },
  { spanish: 'grande', english: 'big', example: 'Es una ciudad muy grande.' }
];

export default function QuickReview({ onBack }) {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [done, setDone] = useState(false);

  useEffect(() => {
    setCards([...SAMPLE_VOCAB].sort(() => Math.random() - 0.5));
  }, []);

  const rate = (correct) => {
    setScore(s => correct ? { ...s, correct: s.correct + 1 } : { ...s, incorrect: s.incorrect + 1 });
    if (index < cards.length - 1) {
      setIndex(i => i + 1);
      setFlipped(false);
    } else {
      setDone(true);
    }
  };

  const restart = () => {
    setCards([...SAMPLE_VOCAB].sort(() => Math.random() - 0.5));
    setIndex(0);
    setFlipped(false);
    setScore({ correct: 0, incorrect: 0 });
    setDone(false);
  };

  if (cards.length === 0) return null;

  if (done) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={onBack} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>Complete!</h2>
          <div style={{ width: 40 }} />
        </div>
        <div style={{ ...styles.content, textAlign: 'center', paddingTop: 40 }}>
          <div style={{ fontSize: 64 }}>🎉</div>
          <h2 style={{ margin: '16px 0 8px' }}>Review Complete!</h2>
          <p style={{ color: theme.textLight }}>✅ {score.correct} correct · ❌ {score.incorrect} to review</p>
          <div style={styles.xpBadge}>+{score.correct * 5} XP</div>
          <button onClick={restart} style={styles.primaryBtn}>🔄 Practice Again</button>
          <button onClick={onBack} style={styles.secondaryBtn}>← Back</button>
        </div>
      </div>
    );
  }

  const card = cards[index];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>Quick Review</h2>
        <span style={styles.counter}>{index + 1}/{cards.length}</span>
      </div>
      <div style={styles.progressBar}><div style={{ ...styles.progressFill, width: `${((index + 1) / cards.length) * 100}%` }} /></div>
      <div style={styles.content}>
        <div onClick={() => setFlipped(!flipped)} style={styles.card}>
          {!flipped ? (
            <div style={styles.cardFront}>
              <p style={styles.cardWord}>{card.spanish}</p>
              <p style={styles.cardHint}>Tap to reveal</p>
            </div>
          ) : (
            <div style={styles.cardBack}>
              <p style={styles.cardTranslation}>{card.english}</p>
              <p style={styles.cardExample}>{card.example}</p>
            </div>
          )}
        </div>
        {flipped && (
          <div style={styles.ratingButtons}>
            <button onClick={() => rate(false)} style={styles.wrongBtn}>❌ Nope</button>
            <button onClick={() => rate(true)} style={styles.rightBtn}>✅ Got it!</button>
          </div>
        )}
        <div style={styles.scoreRow}>
          <span>✅ {score.correct}</span>
          <span>❌ {score.incorrect}</span>
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
  counter: { background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 12, fontSize: 14 },
  progressBar: { height: 4, background: theme.border },
  progressFill: { height: '100%', background: theme.success, transition: 'width 0.3s' },
  content: { padding: 20 },
  card: { background: theme.surface, borderRadius: 20, padding: 40, minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', cursor: 'pointer', marginBottom: 20 },
  cardFront: { textAlign: 'center' },
  cardBack: { textAlign: 'center' },
  cardWord: { fontSize: 36, fontWeight: 700, margin: 0, color: theme.text },
  cardHint: { fontSize: 14, color: theme.textLight, marginTop: 12 },
  cardTranslation: { fontSize: 28, fontWeight: 600, margin: 0, color: theme.primary },
  cardExample: { fontSize: 16, color: theme.textLight, marginTop: 16, fontStyle: 'italic' },
  ratingButtons: { display: 'flex', gap: 16, marginBottom: 20 },
  wrongBtn: { flex: 1, padding: 16, fontSize: 18, fontWeight: 600, background: '#FFEBEE', border: `2px solid ${theme.error}`, borderRadius: 12, cursor: 'pointer', color: theme.error },
  rightBtn: { flex: 1, padding: 16, fontSize: 18, fontWeight: 600, background: '#E8F5E9', border: `2px solid ${theme.success}`, borderRadius: 12, cursor: 'pointer', color: theme.success },
  scoreRow: { display: 'flex', justifyContent: 'center', gap: 24, color: theme.textLight },
  xpBadge: { display: 'inline-block', background: '#FFD700', color: '#000', padding: '8px 20px', borderRadius: 20, fontWeight: 700, marginTop: 16, marginBottom: 24 },
  primaryBtn: { display: 'block', width: '100%', background: theme.primary, color: '#fff', border: 'none', padding: '14px 24px', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer' },
  secondaryBtn: { display: 'block', width: '100%', background: 'transparent', color: theme.primary, border: `2px solid ${theme.primary}`, padding: '12px 20px', borderRadius: 12, fontSize: 16, cursor: 'pointer', marginTop: 8 }
};
