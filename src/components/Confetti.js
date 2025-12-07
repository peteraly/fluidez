import React, { useEffect, useState } from 'react';

const COLORS = ['#FF6B35', '#2D5A27', '#FFD700', '#FF69B4', '#00CED1', '#9370DB', '#4A7C43'];

export function Confetti({ active = false, duration = 3000 }) {
  const [particles, setParticles] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (active) {
      const newParticles = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 10 + 5,
        delay: Math.random() * 0.5,
        duration: Math.random() * 2 + 2,
        rotation: Math.random() * 360,
        type: Math.random() > 0.5 ? 'circle' : 'rect'
      }));
      
      setParticles(newParticles);
      setVisible(true);
      
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [active, duration]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 9999
    }}>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: -20,
            width: p.size,
            height: p.type === 'rect' ? p.size * 0.6 : p.size,
            backgroundColor: p.color,
            borderRadius: p.type === 'circle' ? '50%' : 2,
            transform: `rotate(${p.rotation}deg)`,
            animation: `confettiFall ${p.duration}s ease-out ${p.delay}s forwards`
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export function useConfetti() {
  const [active, setActive] = useState(false);
  const trigger = () => {
    setActive(true);
    setTimeout(() => setActive(false), 100);
  };
  return { active, trigger };
}

export default Confetti;
