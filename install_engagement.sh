#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════════
# FLUIDEZ ENGAGEMENT FEATURES INSTALLER
# ═══════════════════════════════════════════════════════════════════════════════
# This script creates all the engagement components and integrates them
# Run from your fluidez directory: bash install_engagement.sh
# ═══════════════════════════════════════════════════════════════════════════════

set -e
echo "═══════════════════════════════════════════════════════════════════════════"
echo "     FLUIDEZ ENGAGEMENT FEATURES INSTALLER"
echo "═══════════════════════════════════════════════════════════════════════════"

# ═══════════════════════════════════════════════════════════════════════════════
# FEATURE 1: Maria Greeting Component
# ═══════════════════════════════════════════════════════════════════════════════
echo ""
echo "[1/7] Creating MariaGreeting.js..."

cat > src/components/MariaGreeting.js << 'MARIAGREETING'
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
MARIAGREETING

echo "  ✅ MariaGreeting.js created"

# ═══════════════════════════════════════════════════════════════════════════════
# FEATURE 2: Noticing Display Component
# ═══════════════════════════════════════════════════════════════════════════════
echo ""
echo "[2/7] Creating NoticingDisplay.js..."

cat > src/components/NoticingDisplay.js << 'NOTICINGDISPLAY'
import React from 'react';

const NoticingDisplay = ({ dayData }) => {
  if (!dayData?.noticingEnhancements) return null;
  
  const { colorScheme, colorCodes, callouts, inputFlooding, morphemeDisplay } = dayData.noticingEnhancements;

  const getCalloutStyle = (type) => {
    const styles = {
      pre_pattern: { background: '#E3F2FD', borderColor: '#2196F3' },
      post_pattern: { background: '#E8F5E9', borderColor: '#4CAF50' },
      rule: { background: '#FFF3E0', borderColor: '#FF9800' },
      exception: { background: '#FFEBEE', borderColor: '#F44336' },
      memory: { background: '#F3E5F5', borderColor: '#9C27B0' },
      comparison: { background: '#E0F7FA', borderColor: '#00BCD4' }
    };
    return styles[type] || styles.rule;
  };

  return (
    <div className="noticing-container">
      {/* Callouts */}
      {callouts?.map((callout, i) => (
        <div 
          key={i} 
          className="noticing-callout"
          style={{
            background: getCalloutStyle(callout.type).background,
            borderLeft: `4px solid ${getCalloutStyle(callout.type).borderColor}`
          }}
        >
          {callout.text}
        </div>
      ))}
      
      {/* Morpheme Display */}
      {morphemeDisplay && (
        <div className="morpheme-table">
          <h4 className="morpheme-verb">{morphemeDisplay.verb}</h4>
          <div className="morpheme-stem">Stem: <strong>{morphemeDisplay.stem}</strong></div>
          <div className="conjugation-grid">
            {['yo', 'tú', 'él/ella', 'nosotros', 'vosotros', 'ellos'].map((pronoun, i) => {
              const colors = colorCodes || {};
              const colorKeys = Object.keys(colors);
              const color = colors[colorKeys[i]] || '#333';
              
              return (
                <div key={i} className="conjugation-row">
                  <span className="pronoun">{pronoun}</span>
                  <span className="stem">{morphemeDisplay.stem}</span>
                  <span className="ending" style={{ color, fontWeight: 'bold' }}>
                    {morphemeDisplay.endings[i]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Input Flooding */}
      {inputFlooding?.length > 0 && (
        <div className="input-flooding">
          <p className="flooding-label">📝 Practice these examples:</p>
          <div className="examples-grid">
            {inputFlooding.map((example, i) => (
              <div key={i} className="example-chip">
                {example}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticingDisplay;
NOTICINGDISPLAY

echo "  ✅ NoticingDisplay.js created"

# ═══════════════════════════════════════════════════════════════════════════════
# FEATURE 3: Shadowing Mode Component
# ═══════════════════════════════════════════════════════════════════════════════
echo ""
echo "[3/7] Creating ShadowingMode.js..."

cat > src/components/ShadowingMode.js << 'SHADOWINGMODE'
import React, { useState, useCallback } from 'react';

const ShadowingMode = ({ dayData, onComplete, onClose }) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [phase, setPhase] = useState('ready'); // ready, playing, recording, feedback
  const [feedback, setFeedback] = useState(null);

  const { shadowingMode } = dayData || {};

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

  const phrases = shadowingMode.phrases || [];
  const config = shadowingMode.config || { speed: 1.0 };
  const phrase = phrases[currentPhrase];

  const playPhrase = useCallback(() => {
    if (!phrase) return;
    
    setPhase('playing');
    
    const utterance = new SpeechSynthesisUtterance(phrase.spanish);
    utterance.lang = 'es-ES';
    utterance.rate = config.speed || 1.0;
    
    utterance.onend = () => {
      setPhase('recording');
      // Simulate recording for 3 seconds
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

  const nextPhrase = () => {
    if (currentPhrase < phrases.length - 1) {
      setCurrentPhrase(prev => prev + 1);
      setPhase('ready');
      setFeedback(null);
    } else {
      onComplete?.();
    }
  };

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
SHADOWINGMODE

echo "  ✅ ShadowingMode.js created"

# ═══════════════════════════════════════════════════════════════════════════════
# FEATURE 4: Session Teaser Component
# ═══════════════════════════════════════════════════════════════════════════════
echo ""
echo "[4/7] Creating SessionTeaser.js..."

cat > src/components/SessionTeaser.js << 'SESSIONTEASER'
import React from 'react';

const TEASERS = {
  1: { text: "Tomorrow: Learn to count to 100!", emoji: "🔢", hook: "Numbers open up so many conversations..." },
  2: { text: "Coming up: Meet your first Spanish family!", emoji: "👨‍👩‍👧‍👦", hook: "Family vocab is essential!" },
  3: { text: "Next: Describe anything with colors!", emoji: "🎨", hook: "Make your Spanish more vivid..." },
  4: { text: "Soon: Give your home a Spanish tour!", emoji: "🏠", hook: "Talk about where you live..." },
  5: { text: "Tomorrow: Demonstratives - point at anything!", emoji: "👆", hook: "Este, esta, esto..." },
  6: { text: "Next up: Order food like a local!", emoji: "🍽️", hook: "Restaurant Spanish is a game-changer..." },
  7: { text: "🎧 UNLOCKED: Shadowing Mode!", emoji: "🎉", hook: "Practice pronunciation with audio!" },
  8: { text: "Tomorrow: Tell time in Spanish!", emoji: "⏰", hook: "Never miss a meeting again..." },
  9: { text: "Coming: Master the days of the week!", emoji: "📅", hook: "Plan your vida in Spanish..." },
  10: { text: "Soon: Go shopping in Spanish!", emoji: "🛍️", hook: "¿Cuánto cuesta?" },
  11: { text: "Next: Talk about your body & health!", emoji: "💪", hook: "Essential for emergencies..." },
  12: { text: "Tomorrow: Give and get directions!", emoji: "🗺️", hook: "Never get lost again..." },
  13: { text: "Coming: Transportation vocabulary!", emoji: "🚗", hook: "Get around anywhere..." },
  14: { text: "✈️ TRAVEL MODE unlocking soon!", emoji: "🌎", hook: "Your Spanish adventure begins..." },
  15: { text: "Next: Daily routine - reflexive verbs!", emoji: "🌅", hook: "Me levanto, me ducho..." },
  16: { text: "Tomorrow: Work & professions!", emoji: "💼", hook: "What do you do?" },
  17: { text: "Coming: Hobbies & gustar!", emoji: "⚽", hook: "Talk about what you love..." },
  18: { text: "Next: Past tense - tell stories!", emoji: "📖", hook: "Ayer, la semana pasada..." },
  19: { text: "Tomorrow: More past tense!", emoji: "⏮️", hook: "Complete the picture..." },
  20: { text: "👶 Unlock: Talk about childhood!", emoji: "🎈", hook: "Cuando era niño..." },
  21: { text: "Next: Plan your travels!", emoji: "✈️", hook: "Voy a viajar a..." },
  22: { text: "Tomorrow: Hotel conversations!", emoji: "🏨", hook: "Book like a pro..." },
  23: { text: "Coming: Sightseeing vocabulary!", emoji: "📸", hook: "Explore in Spanish..." },
  24: { text: "Next: Handle emergencies!", emoji: "🚨", hook: "Important safety vocab..." },
  25: { text: "Tomorrow: Technology & present perfect!", emoji: "📱", hook: "He aprendido mucho..." },
  26: { text: "💭 Unlock: Express opinions!", emoji: "🗣️", hook: "Creo que, pienso que..." },
  27: { text: "Next: Subjunctive introduction!", emoji: "✨", hook: "Advanced grammar unlocked..." },
  28: { text: "Tomorrow: Hypotheticals!", emoji: "🤔", hook: "Si pudiera..." },
  29: { text: "Coming: Master storytelling!", emoji: "📚", hook: "Put it all together..." },
  30: { text: "🏆 FINAL DAY: You made it!", emoji: "🎊", hook: "Celebrate your journey!" }
};

const SessionTeaser = ({ currentDay, onDismiss, onRemind }) => {
  const teaser = TEASERS[currentDay] || TEASERS[1];

  return (
    <div className="session-teaser-overlay">
      <div className="session-teaser-card">
        <div className="teaser-celebration">
          <span className="teaser-emoji">{teaser.emoji}</span>
          <h3>Great session! 🌟</h3>
        </div>
        
        <div className="teaser-content">
          <p className="teaser-main">{teaser.text}</p>
          <p className="teaser-hook">{teaser.hook}</p>
        </div>

        <div className="teaser-actions">
          <button onClick={onDismiss} className="teaser-primary">
            Can't wait! 😊
          </button>
          <button onClick={onRemind} className="teaser-secondary">
            🔔 Remind me tomorrow
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionTeaser;
SESSIONTEASER

echo "  ✅ SessionTeaser.js created"

# ═══════════════════════════════════════════════════════════════════════════════
# FEATURE 5: Random Delight Component
# ═══════════════════════════════════════════════════════════════════════════════
echo ""
echo "[5/7] Creating RandomDelight.js..."

cat > src/components/RandomDelight.js << 'RANDOMDELIGHT'
import React, { useState, useEffect } from 'react';

const DELIGHTS = [
  { type: 'joke', emoji: '😂', content: '¿Por qué el libro de matemáticas está triste? ¡Porque tiene muchos problemas!' },
  { type: 'joke', emoji: '😄', content: '¿Qué hace una abeja en el gimnasio? ¡Zum-ba!' },
  { type: 'fact', emoji: '🌎', content: 'Spanish is spoken in 21 countries!' },
  { type: 'fact', emoji: '📊', content: 'Spanish has 500+ million native speakers worldwide!' },
  { type: 'compliment', emoji: '🌟', content: 'Your pronunciation is getting SO much better!' },
  { type: 'compliment', emoji: '💪', content: 'You\'re making amazing progress!' },
  { type: 'secret', emoji: '🤫', content: "Native speaker secret: We often drop the 's' at the end of words!" },
  { type: 'secret', emoji: '💡', content: "Pro tip: 'Vale' means 'okay' in Spain but not in Latin America!" },
  { type: 'culture', emoji: '🍽️', content: "In Spain, dinner doesn't start until 9 or 10 PM!" },
  { type: 'culture', emoji: '💤', content: "La siesta is a real tradition - shops close from 2-5 PM!" },
  { type: 'music', emoji: '🎵', content: "Try listening to 'Despacito' - you know more words than you think!" },
  { type: 'music', emoji: '🎶', content: "Listen to Shakira's Spanish songs - great for learning!" },
  { type: 'milestone', emoji: '🏆', content: "You've learned more Spanish than most tourists ever do!" }
];

const RandomDelight = ({ triggerChance = 0.15 }) => {
  const [delight, setDelight] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Random chance to show a delight
    if (Math.random() < triggerChance) {
      const randomDelight = DELIGHTS[Math.floor(Math.random() * DELIGHTS.length)];
      setDelight(randomDelight);
      setShow(true);

      // Auto-hide after 6 seconds
      const timer = setTimeout(() => setShow(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [triggerChance]);

  if (!show || !delight) return null;

  return (
    <div className={`random-delight delight-${delight.type}`}>
      <span className="delight-emoji">{delight.emoji}</span>
      <p className="delight-content">{delight.content}</p>
      <button onClick={() => setShow(false)} className="delight-dismiss">✨</button>
    </div>
  );
};

export default RandomDelight;
RANDOMDELIGHT

echo "  ✅ RandomDelight.js created"

# ═══════════════════════════════════════════════════════════════════════════════
# FEATURE 6: Add CSS Styles
# ═══════════════════════════════════════════════════════════════════════════════
echo ""
echo "[6/7] Adding engagement styles to App.css..."

cat >> src/App.css << 'ENGAGEMENTCSS'

/* ═══════════════════════════════════════════════════════════════════════════════
   ENGAGEMENT FEATURES STYLES
   ═══════════════════════════════════════════════════════════════════════════════ */

/* Maria Greeting Overlay */
.maria-greeting-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.maria-greeting-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px;
  padding: 32px;
  text-align: center;
  color: white;
  max-width: 340px;
  margin: 20px;
  animation: slideUp 0.4s ease;
}

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.maria-avatar-large span {
  font-size: 64px;
  display: block;
  margin-bottom: 16px;
}

.maria-greeting-text {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.maria-personal-touch {
  font-size: 16px;
  opacity: 0.9;
  margin: 0 0 24px 0;
}

.maria-quick-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.maria-action-primary {
  background: white;
  color: #667eea;
  border: none;
  padding: 14px 24px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.maria-action-primary:hover {
  transform: scale(1.03);
}

.maria-action-secondary {
  background: rgba(255,255,255,0.2);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
}

.maria-tap-dismiss {
  font-size: 12px;
  opacity: 0.7;
  margin-top: 20px;
}

/* Noticing Display */
.noticing-container {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  padding: 20px;
  margin: 16px 0;
}

.noticing-callout {
  padding: 14px 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  font-size: 15px;
  line-height: 1.5;
}

.morpheme-table {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
}

.morpheme-verb {
  font-size: 18px;
  margin: 0 0 8px 0;
  color: #333;
}

.morpheme-stem {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}

.conjugation-grid {
  display: grid;
  gap: 10px;
}

.conjugation-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'SF Mono', 'Menlo', monospace;
  font-size: 17px;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 8px;
}

.pronoun {
  color: #666;
  min-width: 80px;
}

.stem {
  color: #999;
}

.ending {
  font-size: 19px;
}

.input-flooding {
  margin-top: 20px;
}

.flooding-label {
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
}

.examples-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.example-chip {
  background: white;
  padding: 10px 16px;
  border-radius: 20px;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

/* Shadowing Mode */
.shadowing-mode {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 24px;
  color: white;
  text-align: center;
}

.shadowing-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.shadowing-header h3 {
  margin: 0;
  font-size: 20px;
}

.shadowing-close {
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
}

.shadowing-progress {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.focus-badge {
  background: rgba(255,255,255,0.2);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
}

.progress-text {
  opacity: 0.8;
}

.phrase-display {
  background: rgba(255,255,255,0.15);
  border-radius: 16px;
  padding: 28px 20px;
  margin: 20px 0;
}

.spanish-phrase {
  font-size: 22px;
  font-weight: 600;
  margin: 0;
}

.shadowing-controls {
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-button {
  background: white;
  color: #667eea;
  border: none;
  padding: 16px 32px;
  border-radius: 30px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.play-button:hover {
  transform: scale(1.05);
}

.status {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
}

.pulse-icon {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}

.status.recording {
  color: #ff6b6b;
}

.feedback-display {
  background: rgba(255,255,255,0.2);
  border-radius: 16px;
  padding: 20px;
}

.feedback-message {
  font-size: 18px;
  margin: 0 0 16px 0;
}

.next-button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 25px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.shadowing-tip {
  margin-top: 20px;
  font-size: 14px;
  opacity: 0.85;
}

.shadowing-locked {
  background: #f5f5f5;
  border-radius: 20px;
  padding: 40px 24px;
  text-align: center;
}

.lock-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
}

.shadowing-locked h3 {
  margin: 0 0 8px 0;
  color: #333;
}

.shadowing-locked p {
  color: #666;
  margin: 0 0 8px 0;
}

.unlock-reason {
  font-size: 14px;
  color: #999;
}

.shadowing-close-btn {
  margin-top: 20px;
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 20px;
  cursor: pointer;
}

/* Session Teaser */
.session-teaser-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.session-teaser-card {
  background: white;
  border-radius: 24px;
  padding: 32px;
  text-align: center;
  max-width: 340px;
  margin: 20px;
}

.teaser-celebration {
  margin-bottom: 20px;
}

.teaser-emoji {
  font-size: 56px;
  display: block;
  margin-bottom: 8px;
}

.teaser-celebration h3 {
  margin: 0;
  color: #333;
}

.teaser-main {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.teaser-hook {
  color: #666;
  font-size: 14px;
  margin: 0 0 24px 0;
}

.teaser-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.teaser-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.teaser-secondary {
  background: #f5f5f5;
  color: #666;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 14px;
  cursor: pointer;
}

/* Random Delight */
.random-delight {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  max-width: 320px;
  z-index: 900;
  animation: slideUpDelight 0.4s ease;
}

@keyframes slideUpDelight {
  from { transform: translateX(-50%) translateY(100px); opacity: 0; }
  to { transform: translateX(-50%) translateY(0); opacity: 1; }
}

.delight-emoji {
  font-size: 32px;
}

.delight-content {
  flex: 1;
  margin: 0;
  font-size: 14px;
  color: #333;
  line-height: 1.4;
}

.delight-dismiss {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
}

.delight-joke { border-left: 4px solid #FF9800; }
.delight-fact { border-left: 4px solid #2196F3; }
.delight-compliment { border-left: 4px solid #4CAF50; }
.delight-secret { border-left: 4px solid #9C27B0; }
.delight-culture { border-left: 4px solid #E91E63; }
.delight-music { border-left: 4px solid #00BCD4; }
.delight-milestone { border-left: 4px solid #FFD700; }
ENGAGEMENTCSS

echo "  ✅ Engagement styles added to App.css"

# ═══════════════════════════════════════════════════════════════════════════════
# FEATURE 7: Export Components Index
# ═══════════════════════════════════════════════════════════════════════════════
echo ""
echo "[7/7] Creating engagement components index..."

cat > src/components/engagement/index.js << 'ENGAGEMENTINDEX'
export { default as MariaGreeting } from '../MariaGreeting';
export { default as NoticingDisplay } from '../NoticingDisplay';
export { default as ShadowingMode } from '../ShadowingMode';
export { default as SessionTeaser } from '../SessionTeaser';
export { default as RandomDelight } from '../RandomDelight';
ENGAGEMENTINDEX

# Create directory if it doesn't exist
mkdir -p src/components/engagement

echo "  ✅ Engagement index created"

# ═══════════════════════════════════════════════════════════════════════════════
# DONE
# ═══════════════════════════════════════════════════════════════════════════════
echo ""
echo "═══════════════════════════════════════════════════════════════════════════"
echo "     ✅ ALL ENGAGEMENT FEATURES INSTALLED!"
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""
echo "📁 New files created:"
echo "   • src/components/MariaGreeting.js"
echo "   • src/components/NoticingDisplay.js"
echo "   • src/components/ShadowingMode.js"
echo "   • src/components/SessionTeaser.js"
echo "   • src/components/RandomDelight.js"
echo "   • src/components/engagement/index.js"
echo "   • Styles appended to src/App.css"
echo ""
echo "📋 NEXT STEPS:"
echo "   1. Test locally:  npm start"
echo "   2. Add to your components (see Integration Guide below)"
echo "   3. Deploy:  git add -A && git commit -m 'Add engagement features' && git push && vercel --prod"
echo ""
echo "═══════════════════════════════════════════════════════════════════════════"
echo "     INTEGRATION GUIDE"
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""
echo "Add to InteractiveCurriculum.js:"
echo ""
echo "  import NoticingDisplay from './components/NoticingDisplay';"
echo "  import ShadowingMode from './components/ShadowingMode';"
echo ""
echo "  // In Grammar module:"
echo "  {dayData?.noticingEnhancements && <NoticingDisplay dayData={dayData} />}"
echo ""
echo "  // In Listen module:"
echo "  <ShadowingMode dayData={dayData} onClose={() => {}} />"
echo ""
echo "═══════════════════════════════════════════════════════════════════════════"
