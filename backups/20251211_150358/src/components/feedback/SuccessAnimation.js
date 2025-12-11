import React, { useState, useEffect } from 'react';

/**
 * Success Animation with Immediate Feedback
 * From Matrix: Rank #10 - Impact 9 - Immediate Feedback
 * Critical: Animation must start within 100ms
 */

const SuccessAnimation = ({ 
  show, 
  type = 'standard', // 'standard' | 'milestone' | 'streak' | 'correct'
  xpGain = 0,
  message = '',
  onComplete
}) => {
  const [phase, setPhase] = useState('idle');
  const [confetti, setConfetti] = useState([]);
  
  useEffect(() => {
    if (show) {
      // T+0ms: Immediate visual feedback
      setPhase('check');
      
      // T+50ms: Sound + Haptic
      setTimeout(() => {
        playSuccessSound(type);
        triggerHaptic(type);
      }, 50);
      
      // T+100ms: Background pulse
      setTimeout(() => setPhase('pulse'), 100);
      
      // T+300ms: Show XP/message
      setTimeout(() => setPhase('info'), 300);
      
      // T+500ms: Confetti (conditional)
      if (type === 'milestone' || type === 'streak' || Math.random() < 0.3) {
        setTimeout(() => {
          setConfetti(generateConfetti(type === 'milestone' ? 100 : 50));
          setPhase('confetti');
        }, 500);
      }
      
      // T+2500ms: Complete
      setTimeout(() => {
        setPhase('idle');
        setConfetti([]);
        onComplete?.();
      }, 2500);
    }
  }, [show, type, onComplete]);
  
  if (!show && phase === 'idle') return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: phase === 'pulse' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(0,0,0,0.3)',
      zIndex: 9999,
      transition: 'background 0.3s ease',
      pointerEvents: 'none'
    }}>
      {/* Checkmark */}
      <div style={{
        width: 120,
        height: 120,
        borderRadius: '50%',
        background: '#4CAF50',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: phase !== 'idle' ? 'scale(1)' : 'scale(0)',
        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        boxShadow: '0 10px 40px rgba(76, 175, 80, 0.4)'
      }}>
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 12l6 6L20 6"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 30,
              strokeDashoffset: phase !== 'idle' ? 0 : 30,
              transition: 'stroke-dashoffset 0.3s ease'
            }}
          />
        </svg>
      </div>
      
      {/* XP Gain */}
      {xpGain > 0 && phase === 'info' && (
        <div style={{
          position: 'absolute',
          top: '35%',
          fontSize: 24,
          fontWeight: 700,
          color: '#FFD700',
          textShadow: '0 2px 10px rgba(0,0,0,0.3)',
          animation: 'floatUp 1s ease-out'
        }}>
          +{xpGain} XP
        </div>
      )}
      
      {/* Message */}
      {message && phase === 'info' && (
        <div style={{
          position: 'absolute',
          bottom: '30%',
          fontSize: 20,
          fontWeight: 600,
          color: '#fff',
          textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          animation: 'fadeIn 0.3s ease'
        }}>
          {message}
        </div>
      )}
      
      {/* Confetti */}
      {confetti.map((particle, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: '-10px',
            width: particle.size,
            height: particle.size,
            background: particle.color,
            borderRadius: particle.shape === 'circle' ? '50%' : 0,
            animation: `fall ${particle.duration}s linear forwards`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
      
      <style>{`
        @keyframes floatUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fall {
          from { transform: translateY(0) rotate(0deg); opacity: 1; }
          to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

function generateConfetti(count) {
  const colors = ['#4CAF50', '#FFD700', '#FF9800', '#2196F3', '#E91E63', '#9C27B0'];
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    size: Math.random() * 10 + 5,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: Math.random() > 0.5 ? 'circle' : 'square',
    duration: Math.random() * 2 + 2,
    delay: Math.random() * 0.5
  }));
}

function playSuccessSound(type) {
  if (typeof AudioContext === 'undefined') return;
  
  try {
    const ctx = new AudioContext();
    const notes = type === 'milestone' ? [392, 494, 588, 784] : [440, 554, 659];
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.value = 0.2;
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime + i * 0.1);
      osc.stop(ctx.currentTime + 0.5);
    });
  } catch (e) {
    // Audio not supported
  }
}

function triggerHaptic(type) {
  if ('vibrate' in navigator) {
    const patterns = {
      standard: [50, 30, 80],
      milestone: [100, 50, 100, 50, 200],
      streak: [100, 50, 100],
      correct: [30]
    };
    navigator.vibrate(patterns[type] || patterns.standard);
  }
}

export default SuccessAnimation;
