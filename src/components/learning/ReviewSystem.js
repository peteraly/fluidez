import React, { useState, useEffect } from 'react';
import { getSRSData, reviewItem } from '../../utils/srsEngine';

export default function ReviewSystem({ vocabulary = [], onClose }) {
  const [items, setItems] = useState([]);
  const [idx, setIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [stats, setStats] = useState({ reviewed: 0, correct: 0 });
  const [done, setDone] = useState(false);
  
  useEffect(() => {
    const srs = getSRSData();
    const now = new Date();
    const due = vocabulary.filter(v => {
      const d = srs[v.spanish];
      return !d || !d.nextReview || new Date(d.nextReview) <= now;
    }).slice(0, 20);
    setItems(due.length ? due : vocabulary.slice(0, 10));
  }, [vocabulary]);
  
  const current = items[idx];
  
  const speak = (text) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-ES'; u.rate = 0.85;
    speechSynthesis.speak(u);
  };
  
  const rate = (q) => {
    reviewItem(current.spanish, q);
    setStats(s => ({ reviewed: s.reviewed + 1, correct: q >= 3 ? s.correct + 1 : s.correct }));
    if (idx < items.length - 1) { setIdx(i => i + 1); setShowAnswer(false); }
    else setDone(true);
  };
  
  if (!items.length) return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <div style={{ fontSize: '48px' }}>🎉</div>
      <h2>All caught up!</h2>
      <button onClick={onClose} style={{ marginTop: '20px', padding: '12px 24px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Continue</button>
    </div>
  );
  
  if (done) {
    const pct = stats.reviewed ? Math.round((stats.correct / stats.reviewed) * 100) : 0;
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px' }}>✨</div>
        <h2>Review Complete!</h2>
        <div style={{ fontSize: '24px', margin: '16px 0' }}>{stats.correct}/{stats.reviewed} correct</div>
        <div style={{ color: pct >= 80 ? '#4CAF50' : '#FF9800' }}>{pct}% retention</div>
        <button onClick={onClose} style={{ marginTop: '20px', padding: '12px 24px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Done</button>
      </div>
    );
  }
  
  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Progress</span><span>{idx + 1}/{items.length}</span>
        </div>
        <div style={{ height: '8px', background: '#e0e0e0', borderRadius: '4px' }}>
          <div style={{ height: '100%', width: `${((idx + 1) / items.length) * 100}%`, background: '#4CAF50', borderRadius: '4px' }} />
        </div>
      </div>
      
      <div onClick={() => !showAnswer && setShowAnswer(true)} style={{ background: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', cursor: showAnswer ? 'default' : 'pointer', minHeight: '180px' }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>{current?.spanish}</div>
        <button onClick={(e) => { e.stopPropagation(); speak(current?.spanish); }} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>🔊</button>
        {showAnswer ? (
          <div style={{ fontSize: '24px', color: '#4CAF50', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #eee' }}>{current?.english}</div>
        ) : (
          <div style={{ fontSize: '14px', opacity: 0.5, marginTop: '16px' }}>Tap to reveal</div>
        )}
      </div>
      
      {showAnswer && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginTop: '20px' }}>
          <button onClick={() => rate(1)} style={{ padding: '14px', background: '#FFCDD2', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>😓<br/><small>Again</small></button>
          <button onClick={() => rate(2)} style={{ padding: '14px', background: '#FFE0B2', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>🤔<br/><small>Hard</small></button>
          <button onClick={() => rate(4)} style={{ padding: '14px', background: '#C8E6C9', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>😊<br/><small>Good</small></button>
          <button onClick={() => rate(5)} style={{ padding: '14px', background: '#B2DFDB', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>🎯<br/><small>Easy</small></button>
        </div>
      )}
      
      <button onClick={onClose} style={{ marginTop: '20px', padding: '12px', background: 'none', border: '1px solid #ddd', borderRadius: '8px', width: '100%', cursor: 'pointer' }}>Close</button>
    </div>
  );
}
