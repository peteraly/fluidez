import React, { useState, useCallback, useEffect } from 'react';

/**
 * Shadowing Mode - Phonological Loop Training
 * From Matrix: Audit recommendation - elevated to P1
 * Listen → Repeat → Compare
 */

const ShadowingMode = ({ dayData, day, onComplete, onClose }) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [phase, setPhase] = useState('ready'); // ready | playing | recording | feedback
  const [feedback, setFeedback] = useState(null);
  const [speed, setSpeed] = useState(1.0);
  const [completedPhrases, setCompletedPhrases] = useState([]);
  
  // Get shadowing data
  const shadowingData = dayData?.shadowingMode;
  const isEnabled = shadowingData?.enabled || day >= 7;
  const phrases = shadowingData?.phrases || getDefaultPhrases(dayData);
  const config = shadowingData?.config || { speed: 1.0, focus: 'rhythm' };
  
  const currentPhraseData = phrases[currentPhrase];
  
  // Play phrase
  const playPhrase = useCallback(() => {
    if (!currentPhraseData) return;
    
    setPhase('playing');
    
    const utterance = new SpeechSynthesisUtterance(currentPhraseData.spanish || currentPhraseData);
    utterance.lang = 'es-ES';
    utterance.rate = speed;
    
    utterance.onend = () => {
      setPhase('recording');
      // Give user 3 seconds to repeat
      setTimeout(() => {
        setPhase('feedback');
        const feedbackOptions = [
          '¡Excelente! 🎵',
          '¡Muy bien! 👏',
          'Great rhythm! 💪',
          'Nice flow! 🌊',
          '¡Perfecto! ⭐'
        ];
        setFeedback(feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)]);
      }, 3000);
    };
    
    speechSynthesis.speak(utterance);
  }, [currentPhraseData, speed]);
  
  // Next phrase
  const nextPhrase = useCallback(() => {
    setCompletedPhrases(prev => [...prev, currentPhrase]);
    
    if (currentPhrase < phrases.length - 1) {
      setCurrentPhrase(prev => prev + 1);
      setPhase('ready');
      setFeedback(null);
    } else {
      onComplete?.({ completed: phrases.length });
    }
  }, [currentPhrase, phrases.length, onComplete]);
  
  // Locked state
  if (!isEnabled) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
        borderRadius: 20,
        padding: 40,
        textAlign: 'center'
      }}>
        <span style={{ fontSize: 64 }}>🔒</span>
        <h3 style={{ marginTop: 16, color: '#333' }}>Shadowing Mode</h3>
        <p style={{ color: '#666' }}>Unlocks on Day 7!</p>
        <p style={{ color: '#999', fontSize: 14, marginTop: 8 }}>
          Build your foundation first, then master pronunciation
        </p>
        <button 
          onClick={onClose}
          style={{
            marginTop: 20,
            padding: '12px 24px',
            background: '#2D5A27',
            color: '#fff',
            border: 'none',
            borderRadius: 20,
            cursor: 'pointer'
          }}
        >
          Got it!
        </button>
      </div>
    );
  }
  
  if (!currentPhraseData) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <p>No shadowing phrases available for this day.</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: 20,
      padding: 24,
      color: '#fff'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          🎧 Shadowing Mode
        </h3>
        <button 
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: '#fff',
            width: 32,
            height: 32,
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: 16
          }}
        >
          ✕
        </button>
      </div>
      
      {/* Progress */}
      <div style={{
        display: 'flex',
        gap: 4,
        marginBottom: 20
      }}>
        {phrases.map((_, i) => (
          <div 
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: completedPhrases.includes(i) 
                ? '#4CAF50' 
                : i === currentPhrase 
                  ? '#FFD700' 
                  : 'rgba(255,255,255,0.3)'
            }}
          />
        ))}
      </div>
      
      {/* Speed control */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 16
      }}>
        {[0.8, 1.0, 1.1].map(s => (
          <button
            key={s}
            onClick={() => setSpeed(s)}
            style={{
              padding: '6px 12px',
              background: speed === s ? '#fff' : 'rgba(255,255,255,0.2)',
              color: speed === s ? '#764ba2' : '#fff',
              border: 'none',
              borderRadius: 15,
              fontSize: 13,
              cursor: 'pointer'
            }}
          >
            {s}x
          </button>
        ))}
      </div>
      
      {/* Phrase display */}
      <div style={{
        background: 'rgba(255,255,255,0.15)',
        borderRadius: 16,
        padding: 28,
        textAlign: 'center',
        marginBottom: 20
      }}>
        <p style={{ 
          fontSize: 22, 
          fontWeight: 600, 
          margin: 0,
          lineHeight: 1.4
        }}>
          {currentPhraseData.spanish || currentPhraseData}
        </p>
        {currentPhraseData.english && (
          <p style={{ 
            fontSize: 14, 
            opacity: 0.8, 
            marginTop: 8 
          }}>
            {currentPhraseData.english}
          </p>
        )}
      </div>
      
      {/* Action area */}
      <div style={{ minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {phase === 'ready' && (
          <button
            onClick={playPhrase}
            style={{
              background: '#fff',
              color: '#764ba2',
              border: 'none',
              padding: '16px 40px',
              borderRadius: 30,
              fontSize: 18,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10
            }}
          >
            ▶️ Listen & Repeat
          </button>
        )}
        
        {phase === 'playing' && (
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 48, display: 'block', marginBottom: 10 }}>🔊</span>
            <p style={{ fontSize: 18 }}>Listen carefully...</p>
          </div>
        )}
        
        {phase === 'recording' && (
          <div style={{ textAlign: 'center' }}>
            <span style={{ 
              fontSize: 48, 
              display: 'block', 
              marginBottom: 10,
              animation: 'pulse 1s infinite'
            }}>🎤</span>
            <p style={{ fontSize: 18, color: '#FF6B6B' }}>Your turn! Repeat now...</p>
          </div>
        )}
        
        {phase === 'feedback' && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 24, marginBottom: 20 }}>{feedback}</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button
                onClick={() => { setPhase('ready'); setFeedback(null); }}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: 25,
                  cursor: 'pointer'
                }}
              >
                🔄 Try Again
              </button>
              <button
                onClick={nextPhrase}
                style={{
                  background: '#4CAF50',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: 25,
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                {currentPhrase < phrases.length - 1 ? 'Next →' : '🎉 Complete!'}
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Tips */}
      <div style={{
        marginTop: 20,
        padding: 12,
        background: 'rgba(255,255,255,0.1)',
        borderRadius: 10,
        fontSize: 13,
        textAlign: 'center'
      }}>
        💡 Focus on {config.focus || 'rhythm'}, not perfection!
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

// Default phrases if no enhanced data
function getDefaultPhrases(dayData) {
  const phrases = [];
  
  // Extract from grammar examples
  if (dayData?.grammar?.screens) {
    dayData.grammar.screens.forEach(screen => {
      if (screen.examples) {
        screen.examples.slice(0, 2).forEach(ex => {
          if (ex.spanish) phrases.push({ spanish: ex.spanish, english: ex.english });
        });
      }
    });
  }
  
  // Extract from vocabulary
  if (dayData?.vocabulary?.screens) {
    dayData.vocabulary.screens.forEach(screen => {
      if (screen.words) {
        screen.words.slice(0, 2).forEach(w => {
          if (w.spanish) phrases.push({ spanish: w.spanish, english: w.english });
        });
      }
    });
  }
  
  return phrases.slice(0, 7);
}

export default ShadowingMode;
