import React, { useState, useEffect } from 'react';
import { SceneBackgrounds } from './VisualAssets';

const SceneBackground = ({ scene = 'home', children, showAmbient = true }) => {
  const [ambientEmojis, setAmbientEmojis] = useState([]);
  const sceneData = SceneBackgrounds[scene] || SceneBackgrounds.home;
  
  // Generate floating ambient emojis
  useEffect(() => {
    if (!showAmbient) return;
    
    const emojis = sceneData.ambientEmoji.map((emoji, i) => ({
      id: i,
      emoji,
      left: Math.random() * 80 + 10,
      top: Math.random() * 30 + 5,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2
    }));
    setAmbientEmojis(emojis);
  }, [scene, showAmbient, sceneData.ambientEmoji]);
  
  return (
    <div style={{
      ...styles.container,
      background: sceneData.gradient
    }}>
      {/* Ambient floating emojis */}
      {showAmbient && ambientEmojis.map(item => (
        <span
          key={item.id}
          style={{
            ...styles.ambientEmoji,
            left: `${item.left}%`,
            top: `${item.top}%`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`
          }}
        >
          {item.emoji}
        </span>
      ))}
      
      {/* Scene label */}
      <div style={styles.sceneLabel}>
        <span style={styles.sceneEmoji}>{sceneData.emoji}</span>
        <span style={styles.sceneName}>{sceneData.description}</span>
      </div>
      
      {/* Content */}
      <div style={styles.content}>
        {children}
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-10px) rotate(5deg); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden'
  },
  ambientEmoji: {
    position: 'absolute',
    fontSize: 24,
    opacity: 0.6,
    animation: 'float 4s ease-in-out infinite',
    pointerEvents: 'none',
    zIndex: 1
  },
  sceneLabel: {
    position: 'absolute',
    top: 16,
    right: 16,
    background: 'rgba(255,255,255,0.9)',
    padding: '8px 12px',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    zIndex: 2,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  sceneEmoji: {
    fontSize: 16
  },
  sceneName: {
    fontSize: 12,
    fontWeight: 500,
    color: '#333'
  },
  content: {
    position: 'relative',
    zIndex: 3
  }
};

export default SceneBackground;
