import React, { useEffect, useState } from 'react';

export default function SuccessAnimation({ show, onComplete, milestone, message = "¡Muy bien!" }) {
  const [phase, setPhase] = useState(0);
  
  useEffect(() => {
    if (!show) { setPhase(0); return; }
    setPhase(1);
    setTimeout(() => {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        [440, 554, 659].forEach((f, i) => {
          const osc = ctx.createOscillator(), gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.frequency.value = f; osc.type = 'sine';
          gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.05 + 0.15);
          osc.start(ctx.currentTime + i * 0.05);
          osc.stop(ctx.currentTime + i * 0.05 + 0.2);
        });
      } catch {}
      if (navigator.vibrate) navigator.vibrate([50, 30, 80]);
    }, 50);
    setTimeout(() => setPhase(2), 100);
    setTimeout(() => onComplete?.(), 2500);
  }, [show, onComplete]);
  
  if (!show) return null;
  
  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', zIndex: 1000 }}>
      <div style={{ background: 'white', borderRadius: '24px', padding: '48px', textAlign: 'center', transform: phase >= 2 ? 'scale(1)' : 'scale(0.8)', opacity: phase >= 1 ? 1 : 0, transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
        <div style={{ fontSize: '72px', marginBottom: '16px' }}>{milestone ? '🏆' : '✨'}</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>{message}</div>
        {milestone && <div style={{ fontSize: '18px', color: '#4CAF50' }}>🔥 {milestone} Day Streak!</div>}
      </div>
    </div>
  );
}
