import React, { useState, useCallback } from 'react';

const ShadowingMode = ({ dayData, onComplete, onClose }) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [phase, setPhase] = useState('ready');
  const [feedback, setFeedback] = useState(null);

  const { shadowingMode } = dayData || {};
  const phrases = shadowingMode?.phrases || [];
  const config = shadowingMode?.config || { speed: 1.0 };
  const phrase = phrases[currentPhrase];

  const playPhrase = useCallback(() => {
    if (!phrase) return;
    
    setPhase('playing');
    
    const utterance = new SpeechSynthesisUtterance(phrase.spanish);
    utterance.lang = 'es-ES';
    utterance.rate = config.speed || 1.0;
    
    utterance.onend = () => {
      setPhase('recording');
      setTimeout(() => {
        setPhase('feedback');
        const feedbackMessages = [
          { type: 'great', message: '¡Excelente! Perfect rhythm! 🎵' },
          { type: 'good', message: '¡Muy bien! Great flow! 👏' },
          { type: 'nice', message: 'Nice try! Keep that energy! 💪' }
        ];
        setFeedback(feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)]);
      }, 3000);
    };
    
    speechSynthesis.speak(utterance);
  }, [phrase, config.speed]);

  const nextPhrase = useCallback(() => {
    if (currentPhrase < phrases.length - 1) {
      setCurrentPhrase(prev => prev + 1);
      setPhase('ready');
      setFeedback(null);
    } else {
      onComplete?.();
    }
  }, [currentPhrase, phrases.length, onComplete]);

  // Early returns AFTER all hooks
  if (!shadowingMode?.enabled) {
    return (
      <div className="shadowing-locked">
        <span className="lock-icon">🔒</span>
        <h3>Shadowing Mode</h3>
        <p>Unlocks on Day 7!</p>
        <p className="unlock-reason">Build your vocabulary first, then practice pronunciation.</p>
        <button onClick={onClose} className="shadowing-close-btn">Got it!</button>
      </div>
    );
  }

  if (!phrase) {
    return (
      <div className="shadowing-empty">
        <p>No shadowing phrases available for this day yet.</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <div className="shadowing-mode">
      <div className="shadowing-header">
        <h3>🎧 Shadowing Mode</h3>
        <button onClick={onClose} className="shadowing-close">✕</button>
      </div>
      
      <div className="shadowing-progress">
        <span className="focus-badge">Focus: {phrase.focus}</span>
        <span className="progress-text">{currentPhrase + 1} / {phrases.length}</span>
      </div>

      <div className="phrase-display">
        <p className="spanish-phrase">{phrase.spanish}</p>
      </div>

      <div className="shadowing-controls">
        {phase === 'ready' && (
          <button onClick={playPhrase} className="play-button">
            ▶️ Listen & Repeat
          </button>
        )}

        {phase === 'playing' && (
          <div className="status listening">
            <span className="pulse-icon">🔊</span>
            <span>Listen carefully...</span>
          </div>
        )}

        {phase === 'recording' && (
          <div className="status recording">
            <span className="pulse-icon">🎤</span>
            <span>Your turn! Speak now...</span>
          </div>
        )}

        {phase === 'feedback' && feedback && (
          <div className="feedback-display">
            <p className="feedback-message">{feedback.message}</p>
            <button onClick={nextPhrase} className="next-button">
              {currentPhrase < phrases.length - 1 ? 'Next Phrase →' : '🎉 Complete!'}
            </button>
          </div>
        )}
      </div>

      <div className="shadowing-tip">
        💡 {shadowingMode.instructions?.tip || "Don't worry about perfection - focus on the rhythm!"}
      </div>
    </div>
  );
};

export default ShadowingMode;
