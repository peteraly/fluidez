import React, { useState } from 'react';
import { colors } from '../styles/theme';

export const AudioButton = ({ text, lang = 'es-ES', rate = 0.8 }) => {
  const [playing, setPlaying] = useState(false);
  
  const speak = () => {
    setPlaying(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.onend = () => setPlaying(false);
      utterance.onerror = () => setPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setPlaying(false), 1000);
    }
  };
  
  return (
    <button 
      onClick={speak} 
      style={{
        width: 40, 
        height: 40, 
        borderRadius: '50%',
        border: `2px solid ${colors.accent}`,
        backgroundColor: playing ? colors.accentLight : 'white',
        cursor: 'pointer', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: 16, 
        flexShrink: 0
      }}
    >
      {playing ? '🔊' : '▶️'}
    </button>
  );
};
