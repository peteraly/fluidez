import React, { useState, useEffect } from 'react';

const theme = { primary: '#2D5A27', primaryLight: '#4A7C43', success: '#228B22', error: '#CD5C5C', bg: '#FAFAFA', surface: '#FFF', text: '#1A1A1A', textLight: '#666', border: '#E0E0E0' };

// Challenge pool - one will be selected based on the day
const CHALLENGES = [
  {
    type: 'translate',
    title: 'Translation Challenge',
    questions: [
      { q: 'How do you say "Good morning" in Spanish?', a: 'buenos días', options: ['buenos días', 'buenas noches', 'buenas tardes', 'hola'] },
      { q: 'What does "Me llamo" mean?', a: 'My name is', options: ['My name is', 'I want', 'I have', 'I like'] },
      { q: 'Translate: "¿Dónde está el baño?"', a: 'Where is the bathroom?', options: ['Where is the bathroom?', 'Where is the restaurant?', 'How much is it?', 'What time is it?'] },
    ]
  },
  {
    type: 'conjugation',
    title: 'Verb Challenge',
    questions: [
      { q: 'Conjugate HABLAR for "yo" (present)', a: 'hablo', options: ['hablo', 'hablas', 'habla', 'hablamos'] },
      { q: 'Conjugate COMER for "nosotros" (present)', a: 'comemos', options: ['como', 'comes', 'come', 'comemos'] },
      { q: 'Conjugate SER for "ellos" (present)', a: 'son', options: ['soy', 'eres', 'es', 'son'] },
    ]
  },
  {
    type: 'vocabulary',
    title: 'Vocabulary Challenge',
    questions: [
      { q: 'What is "apple" in Spanish?', a: 'manzana', options: ['naranja', 'manzana', 'plátano', 'uva'] },
      { q: 'What does "perro" mean?', a: 'dog', options: ['cat', 'dog', 'bird', 'fish'] },
      { q: '"Casa" in English is...', a: 'house', options: ['car', 'house', 'tree', 'water'] },
    ]
  },
  {
    type: 'grammar',
    title: 'Grammar Challenge',
    questions: [
      { q: '___ libro (the book)', a: 'El', options: ['El', 'La', 'Los', 'Las'] },
      { q: 'Yo ___ estudiante (I am a student)', a: 'soy', options: ['soy', 'estoy', 'tengo', 'voy'] },
      { q: 'María ___ en casa (is at home)', a: 'está', options: ['es', 'está', 'tiene', 'va'] },
    ]
  },
  {
    type: 'listening',
    title: 'Fill the Blank',
    questions: [
      { q: '¿Cómo ___ llamas?', a: 'te', options: ['te', 'me', 'se', 'le'] },
      { q: 'Yo ___ de Estados Unidos', a: 'soy', options: ['soy', 'estoy', 'voy', 'tengo'] },
      { q: '¿___ hora es?', a: 'Qué', options: ['Qué', 'Cómo', 'Dónde', 'Cuánto'] },
    ]
  },
  {
    type: 'culture',
    title: 'Culture Challenge',
    questions: [
      { q: 'What is the capital of Spain?', a: 'Madrid', options: ['Barcelona', 'Madrid', 'Sevilla', 'Valencia'] },
      { q: 'What currency is used in Mexico?', a: 'Peso', options: ['Dollar', 'Euro', 'Peso', 'Sol'] },
      { q: 'Which country does NOT speak Spanish?', a: 'Brazil', options: ['Argentina', 'Colombia', 'Brazil', 'Peru'] },
    ]
  },
  {
    type: 'expressions',
    title: 'Expressions Challenge',
    questions: [
      { q: 'What does "¡Buena suerte!" mean?', a: 'Good luck!', options: ['Good night!', 'Good luck!', 'Good morning!', 'Goodbye!'] },
      { q: '"De nada" means...', a: "You're welcome", options: ['Thank you', "You're welcome", 'Please', 'Sorry'] },
      { q: 'How do you say "See you later"?', a: 'Hasta luego', options: ['Hasta luego', 'Adiós', 'Hola', 'Gracias'] },
    ]
  }
];

export default function DailyChallenge({ onBack }) {
  const [challenge, setChallenge] = useState(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [alreadyDone, setAlreadyDone] = useState(false);

  useEffect(() => {
    // Check if already completed today
    const lastCompleted = localStorage.getItem('fluidez_daily_challenge_date');
    const today = new Date().toDateString();
    
    if (lastCompleted === today) {
      setAlreadyDone(true);
    }
    
    // Select challenge based on day of year
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const challengeIndex = dayOfYear % CHALLENGES.length;
    setChallenge(CHALLENGES[challengeIndex]);
  }, []);

  const selectAnswer = (answer) => {
    if (showResult) return;
    setSelected(answer);
    setShowResult(true);
    
    if (answer === challenge.questions[index].a) {
      setScore(s => s + 1);
    }
  };

  const next = () => {
    if (index < challenge.questions.length - 1) {
      setIndex(i => i + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      // Challenge complete
      setCompleted(true);
      localStorage.setItem('fluidez_daily_challenge_date', new Date().toDateString());
      
      // Add XP
      const xpGained = score * 10;
      const currentXP = parseInt(localStorage.getItem('fluidez_xp') || '0');
      localStorage.setItem('fluidez_xp', currentXP + xpGained);
      
      // Mark today as practiced
      const history = JSON.parse(localStorage.getItem('fluidez_practice_history') || '[]');
      const today = new Date().toDateString();
      if (!history.includes(today)) {
        history.push(today);
        localStorage.setItem('fluidez_practice_history', JSON.stringify(history));
      }
    }
  };

  if (!challenge) return null;

  // Already completed today
  if (alreadyDone) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={onBack} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>Daily Challenge</h2>
          <div style={{ width: 40 }} />
        </div>
        <div style={{ ...styles.content, textAlign: 'center', paddingTop: 60 }}>
          <div style={{ fontSize: 64 }}>✅</div>
          <h2 style={{ margin: '16px 0 8px' }}>Challenge Complete!</h2>
          <p style={{ color: theme.textLight }}>You've already completed today's challenge.</p>
          <p style={{ color: theme.textLight, marginTop: 8 }}>Come back tomorrow for a new one!</p>
          <button onClick={onBack} style={styles.primaryBtn}>← Back</button>
        </div>
      </div>
    );
  }

  // Completed screen
  if (completed) {
    const percentage = Math.round((score / challenge.questions.length) * 100);
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={onBack} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>Challenge Complete!</h2>
          <div style={{ width: 40 }} />
        </div>
        <div style={{ ...styles.content, textAlign: 'center', paddingTop: 40 }}>
          <div style={{ fontSize: 64 }}>{percentage >= 80 ? '🏆' : percentage >= 50 ? '👍' : '💪'}</div>
          <h2 style={{ margin: '16px 0 8px' }}>{challenge.title}</h2>
          <p style={{ color: theme.textLight }}>{score}/{challenge.questions.length} correct ({percentage}%)</p>
          <div style={styles.xpBadge}>+{score * 10} XP</div>
          <p style={{ color: theme.textLight, fontSize: 14, marginTop: 16 }}>Come back tomorrow for a new challenge!</p>
          <button onClick={onBack} style={styles.primaryBtn}>← Back</button>
        </div>
      </div>
    );
  }

  const question = challenge.questions[index];
  const isCorrect = selected === question.a;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>Daily Challenge</h2>
        <span style={styles.counter}>{index + 1}/{challenge.questions.length}</span>
      </div>

      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${((index + 1) / challenge.questions.length) * 100}%` }} />
      </div>

      <div style={styles.content}>
        {/* Challenge type badge */}
        <div style={styles.typeBadge}>⚡ {challenge.title}</div>

        {/* Question */}
        <div style={styles.questionCard}>
          <p style={styles.question}>{question.q}</p>
        </div>

        {/* Options */}
        <div style={styles.options}>
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => selectAnswer(opt)}
              disabled={showResult}
              style={{
                ...styles.optionBtn,
                borderColor: showResult
                  ? opt === question.a ? theme.success : (opt === selected ? theme.error : theme.border)
                  : selected === opt ? theme.primary : theme.border,
                background: showResult
                  ? opt === question.a ? '#E8F5E9' : (opt === selected && !isCorrect ? '#FFEBEE' : theme.surface)
                  : theme.surface
              }}
            >
              {opt}
              {showResult && opt === question.a && ' ✓'}
            </button>
          ))}
        </div>

        {/* Result feedback */}
        {showResult && (
          <div style={{
            ...styles.resultCard,
            background: isCorrect ? '#E8F5E9' : '#FFEBEE',
            borderColor: isCorrect ? theme.success : theme.error
          }}>
            <strong>{isCorrect ? '✅ Correct!' : '❌ Incorrect'}</strong>
            {!isCorrect && <p style={{ margin: '8px 0 0' }}>Answer: <strong>{question.a}</strong></p>}
          </div>
        )}

        {showResult && (
          <button onClick={next} style={styles.primaryBtn}>
            {index < challenge.questions.length - 1 ? 'Next →' : 'See Results'}
          </button>
        )}
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
  typeBadge: { display: 'inline-block', background: '#FEF3C7', color: '#92400E', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: 20 },
  questionCard: { background: theme.surface, borderRadius: 16, padding: 24, marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  question: { fontSize: 20, fontWeight: 600, margin: 0, textAlign: 'center', lineHeight: 1.4 },
  options: { display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 },
  optionBtn: { padding: 16, fontSize: 16, border: '2px solid', borderRadius: 12, background: theme.surface, cursor: 'pointer', textAlign: 'left' },
  resultCard: { padding: 16, borderRadius: 12, marginBottom: 16, border: '1px solid', textAlign: 'center' },
  primaryBtn: { background: theme.primary, color: '#fff', border: 'none', padding: '14px 24px', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer', width: '100%', marginTop: 8 },
  xpBadge: { display: 'inline-block', background: '#FFD700', color: '#000', padding: '8px 20px', borderRadius: 20, fontWeight: 700, marginTop: 16 }
};
