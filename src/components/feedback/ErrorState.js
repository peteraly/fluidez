import React from 'react';

const ErrorState = ({ userAnswer, correctAnswer, tip, onContinue, onPlayAudio }) => (
  <div style={{
    background: 'rgba(255, 149, 0, 0.1)', border: '1px solid #FFA726',
    borderRadius: 16, padding: 20, margin: '12px 0'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
      <span style={{ fontSize: 24 }}>💭</span>
      <span style={{ fontSize: 16, fontWeight: 600, color: '#E65100' }}>Not quite</span>
    </div>
    <div style={{ background: '#fff', borderRadius: 12, padding: 16, marginBottom: 12 }}>
      <div style={{ color: '#666', fontSize: 13 }}>The answer is:</div>
      <div style={{ fontSize: 20, fontWeight: 600, color: '#2D5A27' }}>{correctAnswer}</div>
      {userAnswer && <div style={{ marginTop: 8, color: '#888', fontSize: 13 }}>You said: "{userAnswer}"</div>}
    </div>
    {tip && <div style={{ background: '#FFF8E1', padding: 12, borderRadius: 10, marginBottom: 12, fontSize: 14, color: '#F57F17' }}>💡 {tip}</div>}
    <p style={{ color: '#4CAF50', fontSize: 14, marginBottom: 16 }}>Now you'll remember this! 🧠</p>
    <div style={{ display: 'flex', gap: 10 }}>
      {onPlayAudio && <button onClick={onPlayAudio} style={{ flex: 1, padding: 12, background: '#fff', border: '1px solid #ddd', borderRadius: 10, cursor: 'pointer' }}>🔊 Hear it</button>}
      <button onClick={onContinue} style={{ flex: 1, padding: 12, background: '#2D5A27', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, cursor: 'pointer' }}>Got it →</button>
    </div>
  </div>
);

export default ErrorState;
