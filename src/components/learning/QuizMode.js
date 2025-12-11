import React, { useState, useEffect } from 'react';
import { recordAttempt } from '../../utils/flowEngine';

export default function QuizMode({ vocabulary = [], onClose }) {
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState(false);
  
  useEffect(() => {
    if (vocabulary.length < 4) return;
    const shuffled = [...vocabulary].sort(() => Math.random() - 0.5);
    const qs = shuffled.slice(0, Math.min(15, vocabulary.length)).map(item => {
      const others = vocabulary.filter(v => v.spanish !== item.spanish);
      const distractors = others.sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [...distractors, item].sort(() => Math.random() - 0.5).map(o => o.english);
      return { ...item, options, correctAnswer: item.english };
    });
    setQuestions(qs);
  }, [vocabulary]);
  
  const current = questions[idx];
  
  const speak = (text) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-ES'; u.rate = 0.9;
    speechSynthesis.speak(u);
  };
  
  const check = (answer) => {
    if (showResult) return;
    setSelected(answer);
    setShowResult(true);
    const correct = answer === current.correctAnswer;
    recordAttempt(correct);
    if (correct) { setScore(s => s + 10 + streak * 2); setStreak(s => s + 1); }
    else setStreak(0);
    setTimeout(() => {
      if (idx < questions.length - 1) { setIdx(i => i + 1); setSelected(null); setShowResult(false); }
      else setDone(true);
    }, 1200);
  };
  
  if (vocabulary.length < 4) return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <p>Need 4+ vocabulary items for quiz.</p>
      <button onClick={onClose} style={{ marginTop: '20px', padding: '12px 24px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Go Back</button>
    </div>
  );
  
  if (done) {
    const pct = Math.round((score / (questions.length * 10)) * 100);
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '64px' }}>{pct >= 80 ? '🏆' : pct >= 60 ? '⭐' : '💪'}</div>
        <h2>Quiz Complete!</h2>
        <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#4CAF50', margin: '16px 0' }}>{score} pts</div>
        <button onClick={onClose} style={{ marginTop: '20px', padding: '12px 32px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Continue</button>
      </div>
    );
  }
  
  if (!current) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  
  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div><strong>{score}</strong> pts {streak > 1 && <span style={{ color: '#FF9800' }}>🔥x{streak}</span>}</div>
        <div>{idx + 1}/{questions.length}</div>
      </div>
      
      <div style={{ height: '4px', background: '#e0e0e0', borderRadius: '2px', marginBottom: '24px' }}>
        <div style={{ height: '100%', width: `${((idx + 1) / questions.length) * 100}%`, background: '#4CAF50', borderRadius: '2px' }} />
      </div>
      
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '14px', opacity: 0.6, marginBottom: '8px' }}>What does this mean?</div>
        <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>{current.spanish}</div>
        <button onClick={() => speak(current.spanish)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>🔊</button>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {current.options.map((opt, i) => {
          const isCorrect = opt === current.correctAnswer;
          const isSelected = selected === opt;
          let bg = 'white', border = '#e0e0e0';
          if (showResult) {
            if (isCorrect) { bg = '#C8E6C9'; border = '#4CAF50'; }
            else if (isSelected) { bg = '#FFCDD2'; border = '#F44336'; }
          } else if (isSelected) border = '#2196F3';
          
          return (
            <button key={i} onClick={() => check(opt)} disabled={showResult}
              style={{ padding: '16px 20px', background: bg, border: `2px solid ${border}`, borderRadius: '12px', fontSize: '16px', textAlign: 'left', cursor: showResult ? 'default' : 'pointer' }}>
              {opt} {showResult && isCorrect && '✓'}
            </button>
          );
        })}
      </div>
      
      <button onClick={onClose} style={{ marginTop: '24px', padding: '12px', background: 'none', border: '1px solid #ddd', borderRadius: '8px', width: '100%', cursor: 'pointer' }}>Exit Quiz</button>
    </div>
  );
}
