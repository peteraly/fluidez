import React, { useState, useEffect } from 'react';

const MariaGreeting = ({ onDismiss, currentDay = 1, streak = 0 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => { setVisible(false); onDismiss?.(); }, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? '¡Buenos días' : hour < 18 ? '¡Buenas tardes' : '¡Buenas noches';

  if (!visible) return null;

  return (
    <div onClick={() => { setVisible(false); onDismiss?.(); }} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'linear-gradient(135deg, #2D5A27 0%, #4A7C43 100%)',
        borderRadius: 24, padding: 32, textAlign: 'center', color: 'white', maxWidth: 340, margin: 20
      }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>👩🏽‍🏫</div>
        <h2 style={{ fontSize: 28, margin: '0 0 8px' }}>{greeting}!</h2>
        <p style={{ opacity: 0.9, marginBottom: 24 }}>
          {streak > 1 ? `${streak} days in a row! 🔥` : `Ready for Day ${currentDay}?`}
        </p>
        <button onClick={() => { setVisible(false); onDismiss?.(); }} style={{
          background: 'white', color: '#2D5A27', border: 'none', padding: '14px 32px',
          borderRadius: 30, fontSize: 16, fontWeight: 600, cursor: 'pointer'
        }}>💬 Let's Go!</button>
      </div>
    </div>
  );
};

export default MariaGreeting;
