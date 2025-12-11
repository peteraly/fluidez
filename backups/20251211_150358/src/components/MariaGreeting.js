import React, { useState, useEffect } from 'react';

const MariaGreeting = ({ onDismiss, userName, currentDay, streak }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [greeting, setGreeting] = useState('');
  const [personalTouch, setPersonalTouch] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    let timeGreeting = hour < 12 ? '¡Buenos días' : 
                       hour < 18 ? '¡Buenas tardes' : '¡Buenas noches';
    
    if (userName) {
      timeGreeting += `, ${userName}`;
    }
    setGreeting(timeGreeting + '!');

    // Personal touches based on context
    const touches = [
      streak > 1 ? `${streak} days in a row! You're on fire 🔥` : null,
      currentDay === 7 ? "Today you unlock Shadowing Mode! 🎧" : null,
      currentDay > 1 ? `Ready for Day ${currentDay}?` : "Let's start your Spanish journey!",
    ].filter(Boolean);
    
    setPersonalTouch(touches[0] || "Ready to practice?");

    // Auto-dismiss after 5 seconds
    const timer = setTimeout(() => {
      handleDismiss();
    }, 5000);

    return () => clearTimeout(timer);
  }, [userName, currentDay, streak]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss?.(), 300);
  };

  if (!isVisible) return null;

  return (
    <div className="maria-greeting-overlay" onClick={handleDismiss}>
      <div className="maria-greeting-card" onClick={e => e.stopPropagation()}>
        <div className="maria-avatar-large">
          <span>👩🏽‍🏫</span>
        </div>
        
        <h2 className="maria-greeting-text">{greeting}</h2>
        <p className="maria-personal-touch">{personalTouch}</p>
        
        <div className="maria-quick-actions">
          <button 
            className="maria-action-primary"
            onClick={() => { handleDismiss(); }}
          >
            💬 Let's Chat!
          </button>
          <button 
            className="maria-action-secondary"
            onClick={() => { handleDismiss(); }}
          >
            📚 Today's Lesson
          </button>
        </div>
        
        <p className="maria-tap-dismiss">Tap anywhere to continue</p>
      </div>
    </div>
  );
};

export default MariaGreeting;
