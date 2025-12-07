import React, { useState, useEffect, useRef } from 'react';

const theme = { primary: '#2D5A27', primaryLight: '#4A7C43', success: '#228B22', error: '#CD5C5C', bg: '#FAFAFA', surface: '#FFF', text: '#1A1A1A', textLight: '#666', border: '#E0E0E0' };

export default function VoicePractice({ onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [phase, setPhase] = useState('warmup'); // warmup, main, celebration
  const [metrics, setMetrics] = useState({
    speakingAttempts: 0,
    hesitationEvents: 0,
    sessionStart: Date.now(),
    messagesFromUser: 0
  });
  const [showHint, setShowHint] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [sessionTime, setSessionTime] = useState(0);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Warm-up prompts
  const warmupPrompts = [
    { ai: "¡Hola! Let's warm up. Just say: 'Hola, ¿cómo estás?'", expected: "hola" },
    { ai: "¡Perfecto! Now say: 'Muy bien, gracias'", expected: "bien" },
    { ai: "¡Excelente! You're warmed up. Let's have a real conversation! 🎉", expected: null }
  ];
  const [warmupStep, setWarmupStep] = useState(0);

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(Math.floor((Date.now() - metrics.sessionStart) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [metrics.sessionStart]);

  // Hesitation detection
  useEffect(() => {
    if (phase !== 'main') return;
    
    const hesitationTimer = setInterval(() => {
      const timeSinceActivity = Date.now() - lastActivity;
      if (timeSinceActivity > 8000 && !isListening && !isLoading && messages.length > 0) {
        setShowHint(true);
        setMetrics(m => ({ ...m, hesitationEvents: m.hesitationEvents + 1 }));
      }
    }, 1000);
    return () => clearInterval(hesitationTimer);
  }, [lastActivity, isListening, isLoading, phase, messages.length]); // eslint-disable-line

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'es-MX';
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        setLastActivity(Date.now());
        setShowHint(false);
        // Auto-submit after voice input
        setTimeout(() => handleSend(transcript), 300);
      };
      
      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  // Start warm-up on mount
  useEffect(() => {
    if (phase === 'warmup' && messages.length === 0) {
      setMessages([{ role: 'ai', text: warmupPrompts[0].ai }]);
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      setLastActivity(Date.now());
      setShowHint(false);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-MX';
    utterance.rate = 0.85;
    speechSynthesis.speak(utterance);
  };

  const handleSend = async (text = input) => {
    if (!text.trim()) return;
    
    setLastActivity(Date.now());
    setShowHint(false);
    setMetrics(m => ({ 
      ...m, 
      speakingAttempts: m.speakingAttempts + 1,
      messagesFromUser: m.messagesFromUser + 1
    }));

    const userMessage = { role: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Handle warm-up phase
    if (phase === 'warmup') {
      const currentPrompt = warmupPrompts[warmupStep];
      if (currentPrompt.expected && text.toLowerCase().includes(currentPrompt.expected)) {
        // Correct warm-up response
        setTimeout(() => {
          if (warmupStep < warmupPrompts.length - 1) {
            setWarmupStep(warmupStep + 1);
            const nextPrompt = warmupPrompts[warmupStep + 1];
            setMessages(prev => [...prev, { role: 'ai', text: nextPrompt.ai }]);
            if (nextPrompt.expected === null) {
              // Warm-up complete, start main conversation
              setTimeout(() => {
                setPhase('main');
                startMainConversation();
              }, 1500);
            }
          }
        }, 500);
      } else {
        // Encourage retry
        setMessages(prev => [...prev, { role: 'ai', text: "¡Casi! Try again: " + warmupPrompts[warmupStep].ai.split(': ')[1] }]);
      }
      return;
    }

    // Main conversation with AI
    setIsLoading(true);
    try {
      const apiKey = localStorage.getItem('gemini_api_key');
      if (!apiKey) {
        setMessages(prev => [...prev, { role: 'ai', text: '⚙️ Please add your Gemini API key in Settings first!' }]);
        setIsLoading(false);
        return;
      }

      const conversationHistory = messages.slice(-6).map(m => 
        `${m.role === 'user' ? 'Student' : 'María'}: ${m.text}`
      ).join('\n');

      const systemPrompt = `You are María, a warm and encouraging Spanish tutor.

BEHAVIOR RULES:
1. Speak 80% Spanish, 20% English for support
2. Keep responses SHORT (1-2 sentences max)
3. ALWAYS celebrate attempts: "¡Muy bien!" even if imperfect
4. Ask ONE simple question to continue conversation
5. If user seems stuck, offer help: "Try saying: [simpler version]"
6. Use natural fillers: "Hmm...", "A ver...", "Bueno..."
7. Never criticize - reframe errors as learning

CURRENT CONVERSATION:
${conversationHistory}

Student's new message: ${text}

Respond as María (1-2 sentences, encouraging, ask a follow-up question):`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
            generationConfig: { temperature: 0.8, maxOutputTokens: 150 }
          })
        }
      );

      if (response.status === 429) {
        setMessages(prev => [...prev, { role: 'ai', text: '⏳ Too many requests - wait 1 minute and try again!' }]);
      } else {
        const data = await response.json();
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || '¿Puedes repetir?';
        setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
        speak(aiText);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Connection error. Try again!' }]);
    }
    setIsLoading(false);
  };

  const startMainConversation = async () => {
    setIsLoading(true);
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Add API key in Settings to continue!' }]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `You are María, a friendly Spanish tutor. Start a simple conversation. Ask ONE easy question in Spanish (with English hint). Keep it warm and encouraging. Example: "¿Cómo te llamas? (What's your name?)"` }] }],
            generationConfig: { temperature: 0.9, maxOutputTokens: 100 }
          })
        }
      );
      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || '¿Cómo te llamas? (What\'s your name?)';
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
      speak(aiText);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: '¿Cómo te llamas? (What\'s your name?)' }]);
    }
    setIsLoading(false);
  };

  const endSession = () => {
    // Calculate bravery score
    const total = metrics.speakingAttempts + metrics.hesitationEvents;
    const braveryScore = total > 0 ? Math.round((metrics.speakingAttempts / total) * 100) : 100;
    
    // Save to history
    const history = JSON.parse(localStorage.getItem('fluidez_voice_history') || '[]');
    history.push({
      ...metrics,
      braveryScore,
      sessionDuration: sessionTime,
      date: new Date().toISOString()
    });
    localStorage.setItem('fluidez_voice_history', JSON.stringify(history));
    
    // Mark practice day
    const practiceHistory = JSON.parse(localStorage.getItem('fluidez_practice_history') || '[]');
    const today = new Date().toDateString();
    if (!practiceHistory.includes(today)) {
      practiceHistory.push(today);
      localStorage.setItem('fluidez_practice_history', JSON.stringify(practiceHistory));
    }
    
    setPhase('celebration');
  };

  const getHint = () => {
    const hints = [
      "Try: 'No entiendo' (I don't understand)",
      "Try: 'Más despacio, por favor' (Slower please)",
      "Try: 'Sí' or 'No' to answer simply",
      "Try: '¿Cómo?' (What?/Pardon?)",
      "Try repeating María's last words"
    ];
    return hints[Math.floor(Math.random() * hints.length)];
  };

  // Celebration screen
  if (phase === 'celebration') {
    const braveryScore = metrics.speakingAttempts + metrics.hesitationEvents > 0 
      ? Math.round((metrics.speakingAttempts / (metrics.speakingAttempts + metrics.hesitationEvents)) * 100)
      : 100;
    const minutes = Math.floor(sessionTime / 60);
    const seconds = sessionTime % 60;
    
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={onBack} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>Session Complete! 🎉</h2>
          <div style={{ width: 40 }} />
        </div>
        <div style={{ ...styles.content, textAlign: 'center', paddingTop: 40 }}>
          <div style={{ fontSize: 64 }}>🌟</div>
          <h2 style={{ margin: '16px 0 8px' }}>¡Fantástico!</h2>
          
          <div style={styles.statsGrid}>
            <div style={styles.statBox}>
              <span style={styles.statNum}>{metrics.speakingAttempts}</span>
              <span style={styles.statLabel}>Times you spoke</span>
            </div>
            <div style={styles.statBox}>
              <span style={styles.statNum}>{braveryScore}%</span>
              <span style={styles.statLabel}>Bravery score</span>
            </div>
            <div style={styles.statBox}>
              <span style={styles.statNum}>{minutes}:{seconds.toString().padStart(2, '0')}</span>
              <span style={styles.statLabel}>Session time</span>
            </div>
          </div>

          <div style={styles.encouragement}>
            {braveryScore >= 80 ? "🔥 Incredible confidence! Keep it up!" :
             braveryScore >= 60 ? "💪 Great effort! You're building fluency!" :
             "🌱 Every attempt counts! You're learning!"}
          </div>

          <div style={styles.missionCard}>
            <h4 style={{ margin: '0 0 8px' }}>🎯 Today's Mission</h4>
            <p style={{ margin: 0, color: theme.textLight }}>
              Say "Hola, ¿cómo estás?" to someone in real life today!
            </p>
          </div>

          <button onClick={onBack} style={styles.primaryBtn}>Done</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>
          {phase === 'warmup' ? '🔥 Warm Up' : '🎙️ Voice Chat'}
        </h2>
        <span style={styles.timer}>
          {Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, '0')}
        </span>
      </div>

      {/* Progress indicator for warm-up */}
      {phase === 'warmup' && (
        <div style={styles.warmupProgress}>
          <div style={{ ...styles.warmupDot, background: warmupStep >= 0 ? theme.primary : theme.border }} />
          <div style={{ ...styles.warmupDot, background: warmupStep >= 1 ? theme.primary : theme.border }} />
          <div style={{ ...styles.warmupDot, background: warmupStep >= 2 ? theme.primary : theme.border }} />
        </div>
      )}

      {/* Messages */}
      <div style={styles.messages}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            ...styles.message,
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            background: msg.role === 'user' ? theme.primary : theme.surface,
            color: msg.role === 'user' ? '#fff' : theme.text
          }}>
            {msg.text}
            {msg.role === 'ai' && (
              <button onClick={() => speak(msg.text)} style={styles.speakBtn}>🔊</button>
            )}
          </div>
        ))}
        {isLoading && (
          <div style={{ ...styles.message, background: theme.surface }}>
            <span style={styles.thinking}>María is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Hint card */}
      {showHint && phase === 'main' && (
        <div style={styles.hintCard}>
          <span style={{ fontSize: 16 }}>💡</span>
          <span>{getHint()}</span>
          <button onClick={() => setShowHint(false)} style={styles.dismissHint}>✕</button>
        </div>
      )}

      {/* Input area */}
      <div style={styles.inputArea}>
        <input
          value={input}
          onChange={(e) => { setInput(e.target.value); setLastActivity(Date.now()); setShowHint(false); }}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type or tap mic to speak..."
          style={styles.input}
        />
        <button onClick={() => handleSend()} style={styles.sendBtn}>➤</button>
      </div>

      {/* Action buttons */}
      <div style={styles.actions}>
        <button 
          onClick={isListening ? stopListening : startListening} 
          style={{
            ...styles.actionBtn,
            background: isListening ? theme.error : theme.primary
          }}
        >
          {isListening ? '⏹️ Stop' : '🎤 Speak'}
        </button>
        {phase === 'main' && (
          <button onClick={endSession} style={{ ...styles.actionBtn, background: theme.textLight }}>
            ⏹️ End Session
          </button>
        )}
      </div>

      {/* Confidence meter */}
      {phase === 'main' && metrics.speakingAttempts > 0 && (
        <div style={styles.confidenceMeter}>
          <span>Bravery: </span>
          <div style={styles.meterBar}>
            <div style={{
              ...styles.meterFill,
              width: `${Math.min(100, (metrics.speakingAttempts / (metrics.speakingAttempts + metrics.hesitationEvents + 1)) * 100)}%`
            }} />
          </div>
          <span>{metrics.speakingAttempts} attempts</span>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: 500, margin: '0 auto', minHeight: '100vh', background: theme.bg, display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  header: { background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`, color: '#fff', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  title: { margin: 0, fontSize: 18 },
  backBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' },
  timer: { background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 12, fontSize: 14 },
  warmupProgress: { display: 'flex', justifyContent: 'center', gap: 8, padding: 12, background: theme.surface },
  warmupDot: { width: 10, height: 10, borderRadius: '50%', transition: 'background 0.3s' },
  messages: { flex: 1, overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 },
  message: { maxWidth: '80%', padding: '12px 16px', borderRadius: 16, position: 'relative', lineHeight: 1.4 },
  speakBtn: { background: 'none', border: 'none', cursor: 'pointer', marginLeft: 8, opacity: 0.7 },
  thinking: { fontStyle: 'italic', color: theme.textLight },
  hintCard: { display: 'flex', alignItems: 'center', gap: 10, margin: '0 16px', padding: 12, background: '#FEF3C7', borderRadius: 12, border: '1px solid #F59E0B' },
  dismissHint: { marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6 },
  inputArea: { display: 'flex', gap: 8, padding: '12px 16px', background: theme.surface, borderTop: `1px solid ${theme.border}` },
  input: { flex: 1, padding: 12, fontSize: 16, border: `1px solid ${theme.border}`, borderRadius: 24, outline: 'none' },
  sendBtn: { width: 48, height: 48, borderRadius: '50%', background: theme.primary, color: '#fff', border: 'none', fontSize: 18, cursor: 'pointer' },
  actions: { display: 'flex', gap: 12, padding: '12px 16px' },
  actionBtn: { flex: 1, padding: 14, border: 'none', borderRadius: 12, color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer' },
  confidenceMeter: { display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', fontSize: 12, color: theme.textLight },
  meterBar: { flex: 1, height: 6, background: theme.border, borderRadius: 3, overflow: 'hidden' },
  meterFill: { height: '100%', background: theme.success, transition: 'width 0.3s' },
  content: { padding: 20 },
  statsGrid: { display: 'flex', gap: 12, justifyContent: 'center', margin: '24px 0' },
  statBox: { background: theme.surface, padding: 16, borderRadius: 12, border: `1px solid ${theme.border}`, minWidth: 80, textAlign: 'center' },
  statNum: { display: 'block', fontSize: 24, fontWeight: 700, color: theme.primary },
  statLabel: { fontSize: 11, color: theme.textLight },
  encouragement: { fontSize: 16, fontWeight: 500, margin: '16px 0', color: theme.text },
  missionCard: { background: '#FEF3C7', padding: 16, borderRadius: 12, margin: '24px 0', textAlign: 'left' },
  primaryBtn: { background: theme.primary, color: '#fff', border: 'none', padding: '16px 32px', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer', width: '100%' }
};
