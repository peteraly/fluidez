import React, { useState } from 'react';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return { spanish: '¡Buenos días!', english: 'Good morning!' };
  if (hour < 18) return { spanish: '¡Buenas tardes!', english: 'Good afternoon!' };
  return { spanish: '¡Buenas noches!', english: 'Good evening!' };
};

const DAILY_PROMPTS = [
  { spanish: '¿Listo para hablar?', english: 'Ready to talk?' },
  { spanish: '¿Qué tal tu día?', english: "How's your day?" },
  { spanish: '¿Hablamos un poco?', english: 'Shall we chat?' },
  { spanish: '¡Te extrañé!', english: 'I missed you!' },
  { spanish: '¿Qué hay de nuevo?', english: "What's new?" },
  { spanish: '¿Cómo te sientes?', english: 'How are you feeling?' },
  { spanish: '¿Qué planes tienes?', english: 'What are your plans?' },
];

const QuickChatHero = ({ onStartChat, userName }) => {
  const [greeting] = useState(getGreeting());
  const [dailyPrompt] = useState(() => {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    return DAILY_PROMPTS[dayOfYear % DAILY_PROMPTS.length];
  });

  const s = {
    container: {
      background: 'linear-gradient(135deg, #2D5A27 0%, #4A7C43 100%)',
      borderRadius: 20,
      padding: '24px 20px',
      marginBottom: 20,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(45, 90, 39, 0.3)',
    },
    bgCircle1: {
      position: 'absolute',
      top: -30,
      right: -30,
      width: 120,
      height: 120,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.1)',
    },
    bgCircle2: {
      position: 'absolute',
      bottom: -20,
      left: -20,
      width: 80,
      height: 80,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.05)',
    },
    content: { position: 'relative', zIndex: 1 },
    mariaSection: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 },
    avatar: {
      width: 60, height: 60, borderRadius: '50%',
      background: 'linear-gradient(135deg, #FFE4B5 0%, #FFDAB9 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 28, border: '3px solid rgba(255,255,255,0.3)',
    },
    greeting: { color: 'white', fontSize: 22, fontWeight: 600, margin: 0, marginBottom: 4 },
    subGreeting: { color: 'rgba(255,255,255,0.85)', fontSize: 15, margin: 0 },
    promptBubble: {
      background: 'rgba(255,255,255,0.15)',
      borderRadius: 16, padding: '12px 16px', marginBottom: 16,
      backdropFilter: 'blur(10px)',
    },
    promptText: { color: 'white', fontSize: 17, margin: 0, marginBottom: 4 },
    promptTranslation: { color: 'rgba(255,255,255,0.7)', fontSize: 13, margin: 0, fontStyle: 'italic' },
    button: {
      width: '100%', padding: '16px 24px', background: 'white', border: 'none',
      borderRadius: 14, fontSize: 18, fontWeight: 600, color: '#2D5A27',
      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
  };

  return (
    <div style={s.container}>
      <div style={s.bgCircle1} />
      <div style={s.bgCircle2} />
      <div style={s.content}>
        <div style={s.mariaSection}>
          <div style={s.avatar}>👩🏻</div>
          <div>
            <p style={s.greeting}>{greeting.spanish}</p>
            <p style={s.subGreeting}>{userName ? `${greeting.english} ${userName}!` : greeting.english}</p>
          </div>
        </div>
        <div style={s.promptBubble}>
          <p style={s.promptText}>{dailyPrompt.spanish}</p>
          <p style={s.promptTranslation}>{dailyPrompt.english}</p>
        </div>
        <button 
          style={s.button} 
          onClick={onStartChat}
          onMouseOver={(e) => { e.target.style.transform = 'scale(1.02)'; e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)'; }}
          onMouseOut={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'; }}
        >
          <span style={{ fontSize: 22 }}>💬</span> Start Chatting
        </button>
      </div>
    </div>
  );
};

export default QuickChatHero;
