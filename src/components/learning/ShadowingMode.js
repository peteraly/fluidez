import React, { useState } from 'react';

export default function ShadowingMode({ dayNumber, phrases = [], onClose }) {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState('ready');
  const [speed, setSpeed] = useState(1.0);
  const [completed, setCompleted] = useState(0);
  
  const locked = dayNumber < 7;
  const defaultPhrases = [
    { spanish: 'Buenos días, ¿cómo estás?', english: 'Good morning, how are you?' },
    { spanish: 'Me llamo María.', english: 'My name is María.' },
    { spanish: 'Mucho gusto.', english: 'Nice to meet you.' },
    { spanish: '¿De dónde eres?', english: 'Where are you from?' },
    { spanish: 'Soy de Estados Unidos.', english: 'I am from the United States.' }
  ];
  const active = phrases.length ? phrases : defaultPhrases;
  const current = active[idx];
  
  const speak = () => {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(current.spanish);
    u.lang = 'es-ES'; u.rate = speed;
    u.onend = () => setPhase('recording');
    speechSynthesis.speak(u);
    setPhase('playing');
  };
  
  const next = () => {
    setCompleted(c => c + 1);
    if (idx < active.length - 1) { setIdx(i => i + 1); setPhase('ready'); }
    else setPhase('complete');
  };
  
  if (locked) return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔒</div>
      <h2>Shadowing Unlocks Day 7</h2>
      <p style={{ opacity: 0.7, marginBottom: '24px' }}>Build your foundation first!</p>
      <button onClick={onClose} style={{ padding: '12px 24px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Continue Learning</button>
    </div>
  );
  
  if (phase === 'complete') return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
      <h2>Great Session!</h2>
      <p>Practiced {completed} phrases</p>
      <button onClick={onClose} style={{ marginTop: '20px', padding: '12px 24px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Done</button>
    </div>
  );
  
  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2 style={{ marginBottom: '4px' }}>🎧 Shadowing</h2>
        <p style={{ opacity: 0.7, fontSize: '14px' }}>Listen, then repeat</p>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
        {active.map((_, i) => (
          <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: i < idx ? '#4CAF50' : i === idx ? '#2196F3' : '#e0e0e0' }} />
        ))}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
        {[0.8, 1.0, 1.1].map(s => (
          <button key={s} onClick={() => setSpeed(s)} style={{ padding: '6px 14px', background: speed === s ? '#2196F3' : '#f5f5f5', color: speed === s ? 'white' : 'black', border: 'none', borderRadius: '16px', cursor: 'pointer' }}>{s}x</button>
        ))}
      </div>
      
      <div style={{ background: 'white', borderRadius: '16px', padding: '32px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
        <div style={{ fontSize: '24px', marginBottom: '12px' }}>{current?.spanish}</div>
        <div style={{ fontSize: '16px', opacity: 0.6 }}>{current?.english}</div>
        <div style={{ marginTop: '20px', fontSize: '14px' }}>
          {phase === 'ready' && '👆 Tap play'}
          {phase === 'playing' && '🔊 Listen...'}
          {phase === 'recording' && '🎤 Your turn!'}
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        {phase === 'ready' && (
          <button onClick={speak} style={{ padding: '16px 32px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '12px', fontSize: '18px', cursor: 'pointer' }}>▶️ Play</button>
        )}
        {phase === 'recording' && (
          <>
            <button onClick={() => setPhase('ready')} style={{ padding: '14px 24px', background: '#f5f5f5', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>🔄 Again</button>
            <button onClick={next} style={{ padding: '14px 24px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>Next →</button>
          </>
        )}
      </div>
      
      <button onClick={onClose} style={{ marginTop: '20px', padding: '12px', background: 'none', border: '1px solid #ddd', borderRadius: '8px', width: '100%', cursor: 'pointer' }}>Close</button>
    </div>
  );
}
