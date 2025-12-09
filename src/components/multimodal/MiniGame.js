import React, { useState, useEffect } from 'react';
import { SoundEffects } from './SoundEffects';
import { getWordVisual } from './VisualAssets';

const theme = { primary: '#2D5A27', success: '#228B22', error: '#CD5C5C' };

// Word Match Game
export const WordMatchGame = ({ pairs, onComplete }) => {
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    // Shuffle items
    const allItems = pairs.flatMap(p => [
      { id: p.spanish + '-es', text: p.spanish, type: 'spanish', pairId: p.spanish },
      { id: p.spanish + '-en', text: p.english, type: 'english', pairId: p.spanish }
    ]);
    setItems(allItems.sort(() => Math.random() - 0.5));
  }, [pairs]);
  
  const handleSelect = (item) => {
    if (matched.includes(item.pairId)) return;
    
    SoundEffects.tap();
    
    if (selected.length === 0) {
      setSelected([item]);
    } else if (selected.length === 1) {
      if (selected[0].pairId === item.pairId && selected[0].type !== item.type) {
        // Match!
        SoundEffects.correct();
        setMatched([...matched, item.pairId]);
        setSelected([]);
        
        if (matched.length + 1 === pairs.length) {
          setTimeout(() => {
            SoundEffects.levelUp();
            onComplete && onComplete(100);
          }, 500);
        }
      } else {
        // No match
        SoundEffects.incorrect();
        setSelected([item]);
      }
    }
  };
  
  return (
    <div style={styles.gameContainer}>
      <h4 style={styles.gameTitle}>🎯 Match the Words!</h4>
      <div style={styles.matchGrid}>
        {items.map(item => {
          const isSelected = selected.some(s => s.id === item.id);
          const isMatched = matched.includes(item.pairId);
          const visual = item.type === 'spanish' ? getWordVisual(item.text) : null;
          
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item)}
              disabled={isMatched}
              style={{
                ...styles.matchCard,
                background: isMatched ? '#E8F5E9' : isSelected ? '#FFF3E0' : '#fff',
                borderColor: isMatched ? theme.success : isSelected ? '#FF9800' : '#ddd',
                opacity: isMatched ? 0.6 : 1
              }}
            >
              {visual && <span style={{ marginRight: 6 }}>{visual}</span>}
              {item.text}
            </button>
          );
        })}
      </div>
      <p style={styles.progress}>Matched: {matched.length}/{pairs.length}</p>
    </div>
  );
};

// Speed Conjugation Game
export const ConjugationGame = ({ verb, conjugations, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  const current = conjugations[currentIndex];
  
  const handleAnswer = (answer) => {
    if (answer === current.correct) {
      SoundEffects.correct();
      setScore(s => s + 1);
    } else {
      SoundEffects.incorrect();
    }
    
    if (currentIndex + 1 >= conjugations.length) {
      setShowResult(true);
      setTimeout(() => {
        onComplete && onComplete(Math.round((score + (answer === current.correct ? 1 : 0)) / conjugations.length * 100));
      }, 1500);
    } else {
      setCurrentIndex(i => i + 1);
    }
  };
  
  if (showResult) {
    return (
      <div style={{ ...styles.gameContainer, textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>{score >= conjugations.length * 0.7 ? '🎉' : '💪'}</div>
        <h4>{score}/{conjugations.length} correct!</h4>
      </div>
    );
  }
  
  return (
    <div style={styles.gameContainer}>
      <h4 style={styles.gameTitle}>⚡ Quick! Conjugate: {verb}</h4>
      <div style={styles.conjugationPrompt}>
        <span style={styles.pronoun}>{current.pronoun}</span>
        <span style={styles.verbRoot}>{verb.slice(0, -2)}</span>
        <span style={styles.blank}>____</span>
      </div>
      <div style={styles.optionGrid}>
        {current.options.map(opt => (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            style={styles.optionBtn}
          >
            {opt}
          </button>
        ))}
      </div>
      <p style={styles.progress}>{currentIndex + 1}/{conjugations.length}</p>
    </div>
  );
};

// Fill in the Blank
export const FillBlankGame = ({ sentences, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  
  const current = sentences[currentIndex];
  
  const checkAnswer = () => {
    const isCorrect = input.toLowerCase().trim() === current.answer.toLowerCase();
    
    if (isCorrect) {
      SoundEffects.correct();
      setScore(s => s + 1);
      setFeedback('correct');
    } else {
      SoundEffects.incorrect();
      setFeedback('incorrect');
    }
    
    setTimeout(() => {
      setFeedback(null);
      setInput('');
      if (currentIndex + 1 >= sentences.length) {
        onComplete && onComplete(Math.round((score + (isCorrect ? 1 : 0)) / sentences.length * 100));
      } else {
        setCurrentIndex(i => i + 1);
      }
    }, 1000);
  };
  
  return (
    <div style={styles.gameContainer}>
      <h4 style={styles.gameTitle}>✏️ Fill in the Blank</h4>
      <p style={styles.sentence}>
        {current.before}
        <span style={{
          ...styles.blankInline,
          background: feedback === 'correct' ? '#C8E6C9' : feedback === 'incorrect' ? '#FFCDD2' : '#FFF9C4'
        }}>
          {feedback ? current.answer : input || '____'}
        </span>
        {current.after}
      </p>
      {current.hint && <p style={styles.hint}>💡 Hint: {current.hint}</p>}
      <div style={styles.inputRow}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && checkAnswer()}
          placeholder="Type answer..."
          style={styles.gameInput}
          autoFocus
        />
        <button onClick={checkAnswer} style={styles.checkBtn}>Check</button>
      </div>
    </div>
  );
};

const styles = {
  gameContainer: { background: '#fff', borderRadius: 16, padding: 20, margin: '16px 0', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  gameTitle: { margin: '0 0 16px', textAlign: 'center', color: theme.primary },
  matchGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
  matchCard: { padding: 14, borderRadius: 12, border: '2px solid', fontSize: 15, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' },
  progress: { textAlign: 'center', color: '#666', marginTop: 12, fontSize: 14 },
  conjugationPrompt: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 24, marginBottom: 20 },
  pronoun: { fontWeight: 600, color: theme.primary },
  verbRoot: { color: '#333' },
  blank: { borderBottom: '3px solid #333', minWidth: 60, textAlign: 'center' },
  optionGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
  optionBtn: { padding: 14, borderRadius: 12, border: `2px solid ${theme.primary}`, background: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer', color: theme.primary },
  sentence: { fontSize: 18, lineHeight: 1.8, textAlign: 'center', marginBottom: 16 },
  blankInline: { padding: '4px 12px', borderRadius: 6, margin: '0 4px', fontWeight: 600 },
  hint: { textAlign: 'center', color: '#666', fontSize: 14 },
  inputRow: { display: 'flex', gap: 10 },
  gameInput: { flex: 1, padding: 12, fontSize: 16, border: '2px solid #ddd', borderRadius: 12 },
  checkBtn: { padding: '12px 24px', background: theme.primary, color: '#fff', border: 'none', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }
};


export default { WordMatchGame, ConjugationGame, FillBlankGame };
