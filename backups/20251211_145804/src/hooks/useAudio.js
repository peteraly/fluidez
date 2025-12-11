import { useState, useCallback } from 'react';

export const useAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = useCallback((text, lang = 'es-ES', rate = 0.8) => {
    if (!('speechSynthesis' in window)) return;
    
    setIsPlaying(true);
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, []);

  return { isPlaying, speak, stop };
};
