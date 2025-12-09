import React, { useState, useEffect, useRef } from 'react';
import VocabHighlight from './components/multimodal/VocabHighlight';
import AnimatedAvatar from './components/multimodal/AnimatedAvatar';
import { SoundEffects } from './components/multimodal/SoundEffects';
import { detectContextVisuals, SceneBackgrounds } from './components/multimodal/VisualAssets';

const theme = { primary: '#2D5A27', primaryLight: '#4A7C43', bg: '#FAFAFA', surface: '#FFF', text: '#1A1A1A', textLight: '#666', border: '#E0E0E0' };

const SCENARIOS = [
  { id: 'daily', title: '☀️ Daily Chat', description: 'Casual conversation', scene: 'home', mariaOpener: '¡Buenos días! ¿Cómo estás hoy? Tell me something!' },
  { id: 'food', title: '🍽️ Food Talk', description: 'Discuss food & cooking', scene: 'restaurant', mariaOpener: '¿Qué te gusta comer? What\'s your favorite food?' },
  { id: 'travel', title: '✈️ Travel Dreams', description: 'Talk about travel', scene: 'airport', mariaOpener: '¿Te gusta viajar? Where do you want to go?' },
  { id: 'family', title: '👨‍👩‍👧 Family & Friends', description: 'Describe your people', scene: 'home', mariaOpener: 'Cuéntame de tu familia. Tell me about your family!' },
  { id: 'work', title: '💼 Work & Study', description: 'Daily activities', scene: 'home', mariaOpener: '¿Qué haces? What do you do for work or study?' },
];

export default function MultimodalVoiceChat({ onBack }) {
  const [phase, setPhase] = useState('setup'); // setup, chat, celebration
  const [scenario, setScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [mariaEmotion, setMariaEmotion] = useState('neutral');
  const [mariaSpeaking, setMariaSpeaking] = useState(false);
  const [contextVisuals, setContextVisuals] = useState([]);
  const [metrics, setMetrics] = useState({ attempts: 0, start: Date.now() });
  const [showHint, setShowHint] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  
  // Speech recognition setup
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) {
      recognitionRef.current = new SR();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'es-MX';
      
      recognitionRef.current.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        SoundEffects.recordStop();
        setTimeout(() => handleSend(transcript), 300);
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
        setShowHint(true);
      };
      
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);
  
  // Hesitation detection
  useEffect(() => {
    if (phase !== 'chat') return;
    const timer = setInterval(() => {
      if (Date.now() - lastActivity > 12000 && !isListening && !isLoading && messages.length > 0) {
        setShowHint(true);
        setMariaEmotion('supportive');
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [lastActivity, isListening, isLoading, phase, messages.length]);
  
  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Update context visuals when messages change
  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      const visuals = detectContextVisuals(lastMsg.text);
      if (visuals.length > 0) {
        setContextVisuals(visuals);
      }
    }
  }, [messages]);
  
  const speak = (text) => {
    setMariaSpeaking(true);
    const spanishOnly = text.replace(/\([^)]*\)/g, '').replace(/[A-Za-z]{5,}/g, '');
    const utterance = new SpeechSynthesisUtterance(spanishOnly || text);
    utterance.lang = 'es-MX';
    utterance.rate = 0.85;
    utterance.onend = () => setMariaSpeaking(false);
    speechSynthesis.speak(utterance);
  };
  
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      setLastActivity(Date.now());
      setShowHint(false);
      SoundEffects.recordStart();
      recognitionRef.current.start();
    }
  };
  
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };
  
  const startChat = () => {
    setPhase('chat');
    setMessages([{ role: 'ai', text: scenario.mariaOpener }]);
    SoundEffects.message();
    speak(scenario.mariaOpener);
    setMariaEmotion('happy');
  };
  
  const handleSend = async (text = input) => {
    if (!text.trim()) return;
    
    setLastActivity(Date.now());
    setShowHint(false);
    setMetrics(m => ({ ...m, attempts: m.attempts + 1 }));
    
    const userMsg = { role: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    
    // Update context visuals from user input
    const userVisuals = detectContextVisuals(text);
    if (userVisuals.length > 0) {
      setContextVisuals(v => [...new Set([...v, ...userVisuals])].slice(-6));
    }
    
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
      setMessages(prev => [...prev, { role: 'ai', text: '⚙️ Add Gemini API key in Settings!' }]);
      setIsLoading(false);
      return;
    }
    
    try {
      const history = messages.slice(-6).map(m => `${m.role === 'user' ? 'Student' : 'María'}: ${m.text}`).join('\n');
      
      const prompt = `You are María, a warm Spanish tutor from Mexico City.

RULES:
- Speak 70% Spanish, 30% English support
- Keep responses SHORT (1-2 sentences)
- ALWAYS celebrate attempts: "¡Muy bien!", "¡Eso es!"
- Ask ONE follow-up question
- Be genuinely curious and warm
- Use emojis occasionally

SCENARIO: ${scenario.title}
CONVERSATION:
${history}

Student: ${text}

Respond as María (1-2 sentences, encouraging):`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.9, maxOutputTokens: 150 }
          })
        }
      );
      
      if (response.status === 429) {
        setMessages(prev => [...prev, { role: 'ai', text: '⏳ Un momento... (Rate limit, wait 1 min!)' }]);
      } else {
        const data = await response.json();
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || '¿Puedes repetir?';
        
        // Detect emotion from response
        if (aiText.includes('!') && (aiText.includes('Muy bien') || aiText.includes('Excelente'))) {
          setMariaEmotion('excited');
          SoundEffects.encourage();
        } else if (aiText.includes('?')) {
          setMariaEmotion('curious');
        } else {
          setMariaEmotion('happy');
        }
        
        SoundEffects.message();
        setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
        speak(aiText);
        
        // Milestone check
        if (metrics.attempts === 4) {
          setTimeout(() => {
            SoundEffects.levelUp();
            setMessages(prev => [...prev, { role: 'system', text: '🎉 5 exchanges! Great conversation!' }]);
          }, 1500);
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Connection error. ¿Intentamos otra vez?' }]);
    }
    setIsLoading(false);
  };
  
  const endSession = () => {
    // Save history
    const history = JSON.parse(localStorage.getItem('fluidez_voice_history') || '[]');
    history.push({
      attempts: metrics.attempts,
      duration: Math.floor((Date.now() - metrics.start) / 1000),
      scenario: scenario.id,
      date: new Date().toISOString()
    });
    localStorage.setItem('fluidez_voice_history', JSON.stringify(history));
    
    // Mark practice
    const practiceHistory = JSON.parse(localStorage.getItem('fluidez_practice_history') || '[]');
    const today = new Date().toDateString();
    if (!practiceHistory.includes(today)) {
      practiceHistory.push(today);
      localStorage.setItem('fluidez_practice_history', JSON.stringify(practiceHistory));
    }
    
    SoundEffects.levelUp();
    setPhase('celebration');
  };
  
  // SETUP PHASE
  if (phase === 'setup') {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={onBack} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>🎙️ Voice Chat</h2>
          <div style={{ width: 40 }} />
        </div>
        <div style={styles.content}>
          <div style={styles.mariaIntro}>
            <AnimatedAvatar character="maria" emotion="happy" size={64} />
            <h3 style={{ margin: '8px 0 4px' }}>Chat with María</h3>
            <p style={{ color: theme.textLight, margin: 0, fontSize: 14 }}>
              Multimodal conversation practice
            </p>
          </div>
          
          <h4 style={{ margin: '20px 0 12px' }}>Choose a topic:</h4>
          {SCENARIOS.map(s => (
            <button
              key={s.id}
              onClick={() => setScenario(s)}
              style={{
                ...styles.scenarioBtn,
                borderColor: scenario?.id === s.id ? theme.primary : theme.border,
                background: scenario?.id === s.id ? '#E8F5E9' : theme.surface
              }}
            >
              <span style={{ fontSize: 20 }}>{s.title.split(' ')[0]}</span>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontWeight: 600 }}>{s.title.split(' ').slice(1).join(' ')}</div>
                <div style={{ fontSize: 12, color: theme.textLight }}>{s.description}</div>
              </div>
            </button>
          ))}
          
          <button
            onClick={startChat}
            disabled={!scenario}
            style={{ ...styles.primaryBtn, opacity: scenario ? 1 : 0.5, marginTop: 20 }}
          >
            Start Chat →
          </button>
        </div>
      </div>
    );
  }
  
  // CELEBRATION PHASE
  if (phase === 'celebration') {
    const duration = Math.floor((Date.now() - metrics.start) / 1000);
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={onBack} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>Complete! 🎉</h2>
          <div style={{ width: 40 }} />
        </div>
        <div style={{ ...styles.content, textAlign: 'center' }}>
          <div style={{ fontSize: 64 }}>🌟</div>
          <h2>¡Fantástico!</h2>
          <div style={styles.statsRow}>
            <div style={styles.statBox}>
              <span style={styles.statNum}>{metrics.attempts}</span>
              <span style={styles.statLabel}>Exchanges</span>
            </div>
            <div style={styles.statBox}>
              <span style={styles.statNum}>{Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}</span>
              <span style={styles.statLabel}>Duration</span>
            </div>
          </div>
          <div style={styles.missionCard}>
            <h4 style={{ margin: '0 0 8px' }}>🎯 Real-World Mission</h4>
            <p style={{ margin: 0, color: theme.textLight }}>
              Practice one phrase from this conversation in real life today!
            </p>
          </div>
          <button onClick={onBack} style={styles.primaryBtn}>Done</button>
        </div>
      </div>
    );
  }
  
  // CHAT PHASE
  const sceneData = SceneBackgrounds[scenario?.scene] || SceneBackgrounds.home;
  
  return (
    <div style={{ ...styles.container, background: sceneData.gradient }}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>←</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <AnimatedAvatar character="maria" emotion={mariaEmotion} speaking={mariaSpeaking} size={36} />
          <span style={styles.title}>María</span>
        </div>
        <button onClick={endSession} style={styles.endBtn}>End</button>
      </div>
      
      {/* Context visuals bar */}
      {contextVisuals.length > 0 && (
        <div style={styles.visualBar}>
          {contextVisuals.map((v, i) => (
            <span key={i} style={styles.contextEmoji}>{v}</span>
          ))}
        </div>
      )}
      
      {/* Messages */}
      <div style={styles.messages}>
        {messages.map((msg, i) => (
          <div key={i}>
            {msg.role === 'system' ? (
              <div style={styles.systemMsg}>{msg.text}</div>
            ) : (
              <div style={{
                ...styles.message,
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                background: msg.role === 'user' ? theme.primary : 'rgba(255,255,255,0.95)',
                color: msg.role === 'user' ? '#fff' : theme.text
              }}>
                {msg.role === 'ai' ? (
                  <VocabHighlight text={msg.text} />
                ) : (
                  msg.text
                )}
                {msg.role === 'ai' && (
                  <button onClick={() => speak(msg.text)} style={styles.speakBtn}>🔊</button>
                )}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div style={{ ...styles.message, background: 'rgba(255,255,255,0.95)' }}>
            <span style={{ fontStyle: 'italic', color: theme.textLight }}>María typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Hint */}
      {showHint && (
        <div style={styles.hintBar}>
          💡 Try: "Sí" / "No" / "No entiendo" / "¿Cómo?"
          <button onClick={() => setShowHint(false)} style={styles.dismissHint}>✕</button>
        </div>
      )}
      
      {/* Input */}
      <div style={styles.inputArea}>
        <input
          value={input}
          onChange={e => { setInput(e.target.value); setLastActivity(Date.now()); setShowHint(false); }}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          placeholder="Type or tap mic..."
          style={styles.input}
        />
        <button onClick={() => handleSend()} style={styles.sendBtn}>➤</button>
      </div>
      
      {/* Mic button */}
      <div style={styles.micRow}>
        <button
          onClick={isListening ? stopListening : startListening}
          style={{
            ...styles.micBtn,
            background: isListening ? '#CD5C5C' : theme.primary
          }}
        >
          {isListening ? '⏹️ Stop' : '🎤 Speak Spanish'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 500, margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' },
  header: { background: 'rgba(45,90,39,0.95)', color: '#fff', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  title: { margin: 0, fontSize: 18, fontWeight: 600 },
  backBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' },
  endBtn: { background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: 8, cursor: 'pointer' },
  content: { flex: 1, padding: 20, overflow: 'auto', background: theme.bg },
  mariaIntro: { background: theme.surface, borderRadius: 16, padding: 24, textAlign: 'center', border: `1px solid ${theme.border}` },
  scenarioBtn: { display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: 14, borderRadius: 12, border: '2px solid', marginBottom: 10, cursor: 'pointer', background: theme.surface },
  primaryBtn: { width: '100%', background: theme.primary, color: '#fff', border: 'none', padding: 16, borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer' },
  visualBar: { display: 'flex', justifyContent: 'center', gap: 12, padding: '10px', background: 'rgba(255,255,255,0.9)' },
  contextEmoji: { fontSize: 28, animation: 'pulse 2s infinite' },
  messages: { flex: 1, overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 },
  message: { maxWidth: '85%', padding: '12px 16px', borderRadius: 16, position: 'relative', lineHeight: 1.5, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  systemMsg: { textAlign: 'center', padding: '8px 16px', background: 'rgba(255,255,255,0.9)', borderRadius: 20, fontSize: 14, fontWeight: 500, color: theme.primary },
  speakBtn: { background: 'none', border: 'none', cursor: 'pointer', marginLeft: 8, opacity: 0.7 },
  hintBar: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 12, background: '#FEF3C7', fontSize: 14 },
  dismissHint: { background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6 },
  inputArea: { display: 'flex', gap: 8, padding: '12px 16px', background: 'rgba(255,255,255,0.95)' },
  input: { flex: 1, padding: 12, fontSize: 16, border: `1px solid ${theme.border}`, borderRadius: 24, outline: 'none' },
  sendBtn: { width: 48, height: 48, borderRadius: '50%', background: theme.primary, color: '#fff', border: 'none', fontSize: 18, cursor: 'pointer' },
  micRow: { padding: '12px 16px', background: 'rgba(255,255,255,0.95)' },
  micBtn: { width: '100%', padding: 16, border: 'none', borderRadius: 12, color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer' },
  statsRow: { display: 'flex', gap: 16, justifyContent: 'center', margin: '20px 0' },
  statBox: { background: theme.surface, padding: 20, borderRadius: 12, border: `1px solid ${theme.border}`, minWidth: 100 },
  statNum: { display: 'block', fontSize: 28, fontWeight: 700, color: theme.primary },
  statLabel: { fontSize: 12, color: theme.textLight },
  missionCard: { background: '#FEF3C7', padding: 16, borderRadius: 12, margin: '20px 0', textAlign: 'left' }
};
