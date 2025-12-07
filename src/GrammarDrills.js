import React, { useState } from 'react';

const theme = { primary: '#2D5A27', primaryLight: '#4A7C43', success: '#228B22', error: '#CD5C5C', bg: '#FAFAFA', surface: '#FFF', text: '#1A1A1A', textLight: '#666', border: '#E0E0E0' };

const GRAMMAR_TOPICS = [
  {
    id: 'ser_estar', icon: '🎭', title: 'Ser vs Estar', subtitle: 'The two "to be" verbs', level: 'A1-A2',
    explanation: 'SER = permanent traits, identity, time, origin. ESTAR = location, emotions, temporary states.',
    exercises: [
      { q: 'Yo ___ estudiante.', a: 'soy', hint: 'Identity/profession', options: ['soy', 'estoy'] },
      { q: 'María ___ en la biblioteca.', a: 'está', hint: 'Location', options: ['es', 'está'] },
      { q: 'El café ___ caliente.', a: 'está', hint: 'Temporary state', options: ['es', 'está'] },
      { q: 'Nosotros ___ de México.', a: 'somos', hint: 'Origin', options: ['somos', 'estamos'] },
      { q: 'Ellos ___ cansados.', a: 'están', hint: 'Temporary feeling', options: ['son', 'están'] },
      { q: '___ las tres de la tarde.', a: 'Son', hint: 'Telling time', options: ['Son', 'Están'] },
      { q: 'La manzana ___ roja.', a: 'es', hint: 'Inherent characteristic', options: ['es', 'está'] },
      { q: 'Yo ___ feliz hoy.', a: 'estoy', hint: 'Current emotion', options: ['soy', 'estoy'] }
    ]
  },
  {
    id: 'gender', icon: '⚤', title: 'Gender Agreement', subtitle: 'El/La, -o/-a endings', level: 'A1',
    explanation: 'Most nouns ending in -o are masculine (el), -a are feminine (la). Adjectives must match!',
    exercises: [
      { q: '___ casa blanca', a: 'La', hint: 'Casa ends in -a', options: ['El', 'La'] },
      { q: '___ libro nuevo', a: 'El', hint: 'Libro ends in -o', options: ['El', 'La'] },
      { q: 'La chica es alt___', a: 'a', hint: 'Match feminine noun', options: ['o', 'a'] },
      { q: 'El carro es roj___', a: 'o', hint: 'Match masculine noun', options: ['o', 'a'] },
      { q: '___ problema grande', a: 'El', hint: 'Exception: -ma words often masculine', options: ['El', 'La'] },
      { q: '___ mano pequeña', a: 'La', hint: 'Exception: mano is feminine', options: ['El', 'La'] },
      { q: 'Las flores son bonit___', a: 'as', hint: 'Plural feminine', options: ['os', 'as'] },
      { q: 'Los perros son negr___', a: 'os', hint: 'Plural masculine', options: ['os', 'as'] }
    ]
  },
  {
    id: 'present', icon: '⏰', title: 'Present Tense', subtitle: '-AR, -ER, -IR verbs', level: 'A1',
    explanation: '-AR: o, as, a, amos, áis, an | -ER: o, es, e, emos, éis, en | -IR: o, es, e, imos, ís, en',
    exercises: [
      { q: 'Yo habl___ español.', a: 'o', hint: 'hablar, yo form', options: ['o', 'as', 'a'] },
      { q: 'Tú com___ pizza.', a: 'es', hint: 'comer, tú form', options: ['o', 'es', 'e'] },
      { q: 'Ella viv___ en Madrid.', a: 'e', hint: 'vivir, ella form', options: ['o', 'es', 'e'] },
      { q: 'Nosotros trabaj___ mucho.', a: 'amos', hint: 'trabajar, nosotros', options: ['amos', 'emos', 'imos'] },
      { q: 'Ellos escrib___ cartas.', a: 'en', hint: 'escribir, ellos', options: ['an', 'en', 'in'] },
      { q: 'Yo beb___ agua.', a: 'o', hint: 'beber, yo form', options: ['o', 'es', 'e'] }
    ]
  },
  {
    id: 'preterite', icon: '📅', title: 'Preterite Tense', subtitle: 'Completed past actions', level: 'A2',
    explanation: 'For completed actions. -AR: é, aste, ó, amos, asteis, aron | -ER/-IR: í, iste, ió, imos, isteis, ieron',
    exercises: [
      { q: 'Ayer yo habl___ con María.', a: 'é', hint: 'hablar, yo preterite', options: ['o', 'é', 'aba'] },
      { q: 'Ella com___ pizza anoche.', a: 'ió', hint: 'comer, ella preterite', options: ['e', 'ió', 'ía'] },
      { q: 'Nosotros bail___ toda la noche.', a: 'amos', hint: 'bailar, nosotros', options: ['amos', 'emos', 'ábamos'] },
      { q: 'Tú escrib___ una carta.', a: 'iste', hint: 'escribir, tú preterite', options: ['es', 'iste', 'ías'] },
      { q: 'Ellos lleg___ tarde.', a: 'aron', hint: 'llegar, ellos', options: ['an', 'aron', 'aban'] },
      { q: 'Yo viv___ en España por un año.', a: 'í', hint: 'vivir, yo preterite', options: ['o', 'í', 'ía'] }
    ]
  },
  {
    id: 'por_para', icon: '🔄', title: 'Por vs Para', subtitle: 'Two ways to say "for"', level: 'A2-B1',
    explanation: 'PARA = destination, purpose, deadline, recipient. POR = reason, exchange, duration, through.',
    exercises: [
      { q: 'Este regalo es ___ ti.', a: 'para', hint: 'Recipient', options: ['por', 'para'] },
      { q: 'Gracias ___ tu ayuda.', a: 'por', hint: 'Reason/cause', options: ['por', 'para'] },
      { q: 'Trabajo ___ ganar dinero.', a: 'para', hint: 'Purpose', options: ['por', 'para'] },
      { q: 'Pagué $20 ___ el libro.', a: 'por', hint: 'Exchange', options: ['por', 'para'] },
      { q: 'El tren sale ___ Madrid.', a: 'para', hint: 'Destination', options: ['por', 'para'] },
      { q: 'Caminé ___ el parque.', a: 'por', hint: 'Through/along', options: ['por', 'para'] },
      { q: 'Necesito esto ___ el lunes.', a: 'para', hint: 'Deadline', options: ['por', 'para'] },
      { q: 'Estudié ___ tres horas.', a: 'por', hint: 'Duration', options: ['por', 'para'] }
    ]
  },
  {
    id: 'gustar', icon: '❤️', title: 'Verbs like Gustar', subtitle: 'Me gusta, te gusta...', level: 'A1-A2',
    explanation: 'Gustar = "to please". Use: me, te, le, nos, les + gusta (singular) / gustan (plural).',
    exercises: [
      { q: 'A mí ___ gusta el café.', a: 'me', hint: 'Yo → me', options: ['me', 'te', 'le'] },
      { q: 'A ti ___ gustan los perros.', a: 'te', hint: 'Tú → te', options: ['me', 'te', 'le'] },
      { q: 'A ella ___ gusta bailar.', a: 'le', hint: 'Ella → le', options: ['me', 'te', 'le'] },
      { q: 'Me gust___ las películas.', a: 'an', hint: 'Plural subject', options: ['a', 'an'] },
      { q: 'Nos gust___ la música.', a: 'a', hint: 'Singular subject', options: ['a', 'an'] },
      { q: 'A ustedes ___ encanta viajar.', a: 'les', hint: 'Ustedes → les', options: ['le', 'les', 'nos'] }
    ]
  }
];

export default function GrammarDrills({ onBack }) {
  const [topic, setTopic] = useState(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showResult, setShowResult] = useState(false);
  const [done, setDone] = useState(false);

  const selectAnswer = (answer) => {
    if (showResult) return;
    setSelected(answer);
    setShowResult(true);
    const isCorrect = answer === topic.exercises[index].a;
    setScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));
  };

  const next = () => {
    if (index < topic.exercises.length - 1) {
      setIndex(i => i + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setDone(true);
    }
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setShowResult(false);
    setScore({ correct: 0, total: 0 });
    setDone(false);
  };

  // Topic selection
  if (!topic) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={onBack} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>Grammar Drills</h2>
          <div style={{ width: 40 }} />
        </div>
        <div style={styles.content}>
          <p style={{ textAlign: 'center', color: theme.textLight, marginBottom: 20 }}>Choose a grammar topic to practice</p>
          <div style={styles.topicList}>
            {GRAMMAR_TOPICS.map(t => (
              <button key={t.id} onClick={() => setTopic(t)} style={styles.topicCard}>
                <span style={{ fontSize: 28 }}>{t.icon}</span>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <h3 style={{ margin: 0, fontSize: 16 }}>{t.title}</h3>
                  <p style={{ margin: '4px 0 0', fontSize: 13, color: theme.textLight }}>{t.subtitle}</p>
                </div>
                <span style={styles.levelBadge}>{t.level}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Complete screen
  if (done) {
    const pct = Math.round((score.correct / score.total) * 100);
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={() => { setTopic(null); restart(); }} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>Complete!</h2>
          <div style={{ width: 40 }} />
        </div>
        <div style={{ ...styles.content, textAlign: 'center', paddingTop: 40 }}>
          <div style={{ fontSize: 64 }}>{pct >= 80 ? '🌟' : pct >= 60 ? '👍' : '💪'}</div>
          <h2 style={{ margin: '16px 0 8px' }}>{topic.title}</h2>
          <p style={{ color: theme.textLight }}>{score.correct} / {score.total} correct ({pct}%)</p>
          <div style={styles.xpBadge}>+{score.correct * 5} XP</div>
          <button onClick={restart} style={styles.primaryBtn}>🔄 Try Again</button>
          <button onClick={() => { setTopic(null); restart(); }} style={styles.secondaryBtn}>← Other Topics</button>
        </div>
      </div>
    );
  }

  const exercise = topic.exercises[index];
  const isCorrect = selected === exercise.a;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => { setTopic(null); restart(); }} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>{topic.icon} {topic.title}</h2>
        <span style={styles.counter}>{index + 1}/{topic.exercises.length}</span>
      </div>
      <div style={styles.progressBar}><div style={{ ...styles.progressFill, width: `${(index / topic.exercises.length) * 100}%` }} /></div>
      <div style={styles.content}>
        <div style={styles.tipCard}><span style={{ fontSize: 16 }}>💡</span><span style={{ fontSize: 13 }}>{topic.explanation}</span></div>
        <div style={styles.questionCard}>
          <p style={styles.question}>{exercise.q}</p>
          <p style={styles.hint}>Hint: {exercise.hint}</p>
        </div>
        <div style={styles.options}>
          {exercise.options.map((opt, i) => (
            <button key={i} onClick={() => selectAnswer(opt)} disabled={showResult} style={{
              ...styles.optionBtn,
              borderColor: showResult ? (opt === exercise.a ? theme.success : (opt === selected ? theme.error : theme.border)) : (selected === opt ? theme.primary : theme.border),
              background: showResult ? (opt === exercise.a ? '#E8F5E9' : (opt === selected && !isCorrect ? '#FFEBEE' : theme.surface)) : theme.surface
            }}>
              {opt}{showResult && opt === exercise.a && ' ✓'}
            </button>
          ))}
        </div>
        {showResult && (
          <div style={{ ...styles.resultCard, background: isCorrect ? '#E8F5E9' : '#FFEBEE', borderColor: isCorrect ? theme.success : theme.error }}>
            <strong>{isCorrect ? '✅ ¡Correcto!' : '❌ Incorrect'}</strong>
            {!isCorrect && <p style={{ margin: '8px 0 0' }}>Answer: <strong>{exercise.a}</strong></p>}
          </div>
        )}
        {showResult && <button onClick={next} style={styles.primaryBtn}>{index < topic.exercises.length - 1 ? 'Next →' : 'See Results'}</button>}
        <div style={styles.scoreBar}>Score: {score.correct}/{score.total}</div>
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
  topicList: { display: 'flex', flexDirection: 'column', gap: 12 },
  topicCard: { display: 'flex', alignItems: 'center', gap: 16, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 16, cursor: 'pointer', textAlign: 'left' },
  levelBadge: { background: theme.bg, padding: '4px 10px', borderRadius: 12, fontSize: 11, color: theme.textLight },
  tipCard: { display: 'flex', alignItems: 'flex-start', gap: 10, background: '#FEF3C7', padding: 14, borderRadius: 12, marginBottom: 20 },
  questionCard: { background: theme.surface, borderRadius: 16, padding: 24, textAlign: 'center', marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  question: { fontSize: 24, fontWeight: 600, margin: 0 },
  hint: { fontSize: 14, color: theme.textLight, margin: '12px 0 0' },
  options: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 },
  optionBtn: { padding: 16, fontSize: 18, fontWeight: 600, border: '2px solid', borderRadius: 12, background: theme.surface, cursor: 'pointer' },
  resultCard: { padding: 16, borderRadius: 12, marginBottom: 16, border: '1px solid' },
  primaryBtn: { background: theme.primary, color: '#fff', border: 'none', padding: '14px 24px', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer', width: '100%' },
  secondaryBtn: { background: 'transparent', color: theme.primary, border: `2px solid ${theme.primary}`, padding: '12px 20px', borderRadius: 12, fontSize: 16, cursor: 'pointer', width: '100%', marginTop: 8 },
  scoreBar: { textAlign: 'center', marginTop: 20, color: theme.textLight, fontSize: 14 },
  xpBadge: { display: 'inline-block', background: '#FFD700', color: '#000', padding: '8px 20px', borderRadius: 20, fontWeight: 700, marginTop: 16, marginBottom: 24 }
};
