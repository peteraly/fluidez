import React, { useState, useEffect } from 'react';

const DELIGHTS = [
  { type: 'joke', emoji: '😂', content: '¿Por qué el libro de matemáticas está triste? ¡Porque tiene muchos problemas!' },
  { type: 'joke', emoji: '😄', content: '¿Qué hace una abeja en el gimnasio? ¡Zum-ba!' },
  { type: 'fact', emoji: '🌎', content: 'Spanish is spoken in 21 countries!' },
  { type: 'fact', emoji: '📊', content: 'Spanish has 500+ million native speakers worldwide!' },
  { type: 'compliment', emoji: '🌟', content: 'Your pronunciation is getting SO much better!' },
  { type: 'compliment', emoji: '💪', content: 'You\'re making amazing progress!' },
  { type: 'secret', emoji: '🤫', content: "Native speaker secret: We often drop the 's' at the end of words!" },
  { type: 'secret', emoji: '💡', content: "Pro tip: 'Vale' means 'okay' in Spain but not in Latin America!" },
  { type: 'culture', emoji: '🍽️', content: "In Spain, dinner doesn't start until 9 or 10 PM!" },
  { type: 'culture', emoji: '💤', content: "La siesta is a real tradition - shops close from 2-5 PM!" },
  { type: 'music', emoji: '🎵', content: "Try listening to 'Despacito' - you know more words than you think!" },
  { type: 'music', emoji: '🎶', content: "Listen to Shakira's Spanish songs - great for learning!" },
  { type: 'milestone', emoji: '🏆', content: "You've learned more Spanish than most tourists ever do!" }
];

const RandomDelight = ({ triggerChance = 0.15 }) => {
  const [delight, setDelight] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Random chance to show a delight
    if (Math.random() < triggerChance) {
      const randomDelight = DELIGHTS[Math.floor(Math.random() * DELIGHTS.length)];
      setDelight(randomDelight);
      setShow(true);

      // Auto-hide after 6 seconds
      const timer = setTimeout(() => setShow(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [triggerChance]);

  if (!show || !delight) return null;

  return (
    <div className={`random-delight delight-${delight.type}`}>
      <span className="delight-emoji">{delight.emoji}</span>
      <p className="delight-content">{delight.content}</p>
      <button onClick={() => setShow(false)} className="delight-dismiss">✨</button>
    </div>
  );
};

export default RandomDelight;
