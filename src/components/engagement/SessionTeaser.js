import React from 'react';

const TEASERS = {
  1: "Tomorrow: Numbers! 🔢", 2: "Next: Meet la familia! 👨‍👩‍👧", 3: "Coming: Colors! 🎨",
  6: "Day 7 unlocks: Shadowing Mode! 🎧", 7: "🎉 Shadowing UNLOCKED!", 14: "Halfway there! ✈️",
  21: "Final week! 💪", 29: "Tomorrow: GRADUATION! 🎓", 30: "🏆 You did it!"
};

const SessionTeaser = ({ currentDay, onDismiss }) => (
  <div style={{
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
  }}>
    <div style={{ background: 'white', borderRadius: 24, padding: 32, textAlign: 'center', maxWidth: 340, margin: 20 }}>
      <div style={{ fontSize: 56 }}>🌟</div>
      <h3 style={{ margin: '12px 0' }}>Day {currentDay} Complete!</h3>
      <p style={{ fontSize: 16, color: '#666', marginBottom: 24 }}>{TEASERS[currentDay] || `Day ${currentDay + 1} awaits!`}</p>
      <button onClick={onDismiss} style={{
        width: '100%', background: 'linear-gradient(135deg, #2D5A27, #4A7C43)',
        color: 'white', border: 'none', padding: '14px 24px', borderRadius: 25,
        fontSize: 16, fontWeight: 600, cursor: 'pointer'
      }}>Can't wait! 😊</button>
    </div>
  </div>
);

export default SessionTeaser;
