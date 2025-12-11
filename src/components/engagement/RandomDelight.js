import React, { useState, useEffect } from 'react';

const DELIGHTS = [
  { emoji: '😂', text: '¿Por qué el libro está triste? ¡Tiene muchos problemas!' },
  { emoji: '🌎', text: 'Spanish is spoken in 21 countries!' },
  { emoji: '🌟', text: "You're doing amazing!" },
  { emoji: '🤫', text: "Secret: 'Vale' means 'okay' in Spain!" },
  { emoji: '🍽️', text: 'In Spain, dinner starts at 10 PM!' }
];

const RandomDelight = ({ chance = 0.1 }) => {
  const [delight, setDelight] = useState(null);

  useEffect(() => {
    if (Math.random() < chance) {
      setDelight(DELIGHTS[Math.floor(Math.random() * DELIGHTS.length)]);
      setTimeout(() => setDelight(null), 5000);
    }
  }, [chance]);

  if (!delight) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 100, left: '50%', transform: 'translateX(-50%)',
      background: 'white', borderRadius: 16, padding: '16px 20px',
      display: 'flex', alignItems: 'center', gap: 12,
      boxShadow: '0 10px 40px rgba(0,0,0,0.2)', maxWidth: 300, zIndex: 900
    }}>
      <span style={{ fontSize: 32 }}>{delight.emoji}</span>
      <p style={{ margin: 0, fontSize: 14 }}>{delight.text}</p>
    </div>
  );
};

export default RandomDelight;
