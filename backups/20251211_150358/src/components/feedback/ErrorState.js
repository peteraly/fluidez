import React from 'react';

/**
 * Low-Anxiety Error Display
 * From Matrix: Rank #6 - Impact 10 - Affective Filter
 * CRITICAL: Never use red, never say "Wrong", always use "Not quite"
 */

const ErrorState = ({ 
  userAnswer,
  correctAnswer,
  tip,
  onTryAgain,
  onContinue,
  onPlayAudio
}) => {
  // Normalization messages (reduce shame)
  const normalizations = [
    "This one trips up most learners",
    "Even native speakers mix these up!",
    "85% of learners get this wrong the first time"
  ];
  
  // Growth framing
  const growthMessages = [
    "Now you'll remember this!",
    "Your brain just made a new connection 🧠",
    "This is exactly how learning works"
  ];
  
  const normalization = normalizations[Math.floor(Math.random() * normalizations.length)];
  const growth = growthMessages[Math.floor(Math.random() * growthMessages.length)];
  
  return (
    <div style={{
      background: 'rgba(255, 149, 0, 0.1)', // Warm orange, NOT red
      border: '1px solid #FFA726',
      borderRadius: 16,
      padding: 20,
      margin: '12px 0'
    }}>
      {/* Header - NEVER use ❌ or "Wrong" */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: 24 }}>💭</span>
        <span style={{ fontSize: 16, fontWeight: 600, color: '#E65100' }}>Not quite</span>
      </div>
      
      {/* Correct answer */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12
      }}>
        <div style={{ color: '#666', fontSize: 13, marginBottom: 4 }}>The answer is:</div>
        <div style={{ fontSize: 20, fontWeight: 600, color: '#2D5A27' }}>{correctAnswer}</div>
        
        {userAnswer && (
          <div style={{ marginTop: 8, color: '#888', fontSize: 13 }}>
            You said: "{userAnswer}"
          </div>
        )}
      </div>
      
      {/* Tip (if provided) */}
      {tip && (
        <div style={{
          background: '#FFF8E1',
          padding: 12,
          borderRadius: 10,
          marginBottom: 12,
          fontSize: 14,
          color: '#F57F17'
        }}>
          💡 {tip}
        </div>
      )}
      
      {/* Normalization (reduce shame) */}
      <p style={{ color: '#888', fontSize: 13, marginBottom: 12, fontStyle: 'italic' }}>
        {normalization}
      </p>
      
      {/* Growth message */}
      <p style={{ color: '#4CAF50', fontSize: 14, fontWeight: 500, marginBottom: 16 }}>
        {growth}
      </p>
      
      {/* Actions */}
      <div style={{ display: 'flex', gap: 10 }}>
        {onPlayAudio && (
          <button
            onClick={onPlayAudio}
            style={{
              flex: 1,
              padding: '12px 16px',
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: 10,
              fontSize: 14,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6
            }}
          >
            🔊 Hear it
          </button>
        )}
        
        {onTryAgain && (
          <button
            onClick={onTryAgain}
            style={{
              flex: 1,
              padding: '12px 16px',
              background: '#FFA726',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Try again
          </button>
        )}
        
        <button
          onClick={onContinue}
          style={{
            flex: 1,
            padding: '12px 16px',
            background: '#2D5A27',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Got it →
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
