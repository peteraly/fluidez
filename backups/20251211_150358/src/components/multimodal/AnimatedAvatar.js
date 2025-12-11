import React, { useState, useEffect } from 'react';
import { CharacterExpressions } from './VisualAssets';

const AnimatedAvatar = ({ character = 'maria', emotion = 'neutral', speaking = false, size = 48 }) => {
  const [bounce, setBounce] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState('👩‍🏫');
  
  // Get character expressions
  const expressions = CharacterExpressions[character] || CharacterExpressions.maria;
  
  // Update emoji based on emotion
  useEffect(() => {
    setCurrentEmoji(expressions[emotion] || expressions.neutral);
    
    // Bounce animation on emotion change
    setBounce(true);
    setTimeout(() => setBounce(false), 300);
  }, [emotion, expressions]);
  
  // Speaking animation
  useEffect(() => {
    if (speaking) {
      const interval = setInterval(() => {
        setBounce(b => !b);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [speaking]);
  
  return (
    <div style={{
      ...styles.avatar,
      width: size,
      height: size,
      fontSize: size * 0.7,
      transform: bounce ? 'scale(1.1)' : 'scale(1)',
      transition: 'transform 0.15s ease'
    }}>
      {currentEmoji}
      {speaking && <span style={styles.speakingIndicator}>💬</span>}
    </div>
  );
};

const styles = {
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  speakingIndicator: {
    position: 'absolute',
    top: -8,
    right: -8,
    fontSize: 16,
    animation: 'pulse 1s infinite'
  }
};

export default AnimatedAvatar;
