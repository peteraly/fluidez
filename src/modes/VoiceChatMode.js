import React, { useState, useEffect, useRef, useCallback } from 'react';
import Sounds, { getAmbientForScenario } from '../engines/SoundSystem';
import { SCENE_CONFIGS, extractVisualsFromText, detectSceneFromConversation, getWordVisual } from '../engines/VisualContext';
import { MARIA_EMOTIONS, detectMariaEmotion, getMariaPhrase, buildMariaPrompt, getContextualHint } from '../engines/MariaPersona';
import { getCircadianPhase, inferEmotionalState, logSession } from '../engines/PhenomenaEngine';

const theme = { 
  primary: '#2D5A27', primaryLight: '#4A7C43', 
  bg: '#FAFAFA', surface: '#FFF', 
  text: '#1A1A1A', textLight: '#666', 
  border: '#E0E0E0', success: '#4CAF50', error: '#EF5350' 
};

// Conversation scenarios with emotional stakes
const SCENARIOS = [
  { id: 'daily', title: '☀️ Daily Check-in', description: 'How\'s your day going?', scene: 'daily', 
    opener: '¡Hola! ¿Cómo estás hoy? Tell me something about your day!',
    topics: ['routine', 'feelings', 'plans'] },
  { id: 'food', title: '🍽️ Food & Cooking', description: 'Talk about food you love', scene: 'restaurant',
    opener: '¿Qué te gusta comer? What\'s your favorite food? I love tacos! 🌮',
    topics: ['favorites', 'cooking', 'restaurants'] },
  { id: 'travel', title: '✈️ Travel Dreams', description: 'Places you want to visit', scene: 'beach',
    opener: '¿Te gusta viajar? Tell me about a place you want to visit!',
    topics: ['destinations', 'experiences', 'planning'] },
  { id: 'family', title: '👨‍👩‍👧 Family & Friends', description: 'Tell me about your people', scene: 'home',
    opener: 'Cuéntame de tu familia. Who\'s important in your life?',
    topics: ['relationships', 'memories', 'traditions'] },
  { id: 'work', title: '💼 Work & Life', description: 'What keeps you busy?', scene: 'daily',
    opener: '¿Qué haces? Tell me about your work or what you study!',
    topics: ['job', 'goals', 'challenges'] },
  { id: 'weekend', title: '🎉 Weekend Fun', description: 'Plans and hobbies', scene: 'daily',
    opener: '¿Qué vas a hacer este fin de semana? Any fun plans?',
    topics: ['hobbies', 'activities', 'relaxation'] },
  { id: 'opinion', title: '💭 Share Opinion', description: 'What do you think about...?', scene: 'cafe',
    opener: '¿Qué piensas de...? Let\'s discuss something interesting!',
    topics: ['preferences', 'ideas', 'debates'] },
];

// Difficulty configurations
const DIFFICULTIES = {
  comfort: { name: '🌱 Comfort', spanish: 50, hints: true, timer: null, description: 'Maximum support' },
  growth: { name: '🌿 Growth', spanish: 70, hints: true, timer: null, description: 'Balanced challenge' },
  challenge: { name: '🌳 Challenge', spanish: 85, hints: false, timer: 20, description: 'Push your limits' },
  immersion: { name: '🔥 Immersion', spanish: 95, hints: false, timer: 12, description: 'Full Spanish mode' }
};

export default function VoiceChatMode({ onBack }) {
  // Core state
  const [phase, setPhase] = useState('setup');
  const [scenario, setScenario] = useState(null);
  const [difficulty, setDifficulty] = useState('growth');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Phenomena state
  const [mariaEmotion, setMariaEmotion] = useState('neutral');
  const [mariaSpeaking, setMariaSpeaking] = useState(false);
  const [contextVisuals, setContextVisuals] = useState([]);
  const [currentScene, setCurrentScene] = useState('daily');
  const [showHint, setShowHint] = useState(false);
  const [hintText, setHintText] = useState('');
  const [timeLeft, setTimeLeft] = useState(null);
  const [milestone, setMilestone] = useState(null);
  
  // Metrics
  const [metrics, setMetrics] = useState({
    speakingAttempts: 0,
    hesitations: 0,
    responseTimes: [],
    sessionStart: Date.now(),
    longestUtterance: 0,
    spanishWordsUsed: new Set(),
    errorCount: 0
  });
  
  const [lastActivity, setLastActivity] = useState(Date.now());
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const ambientStopRef = useRef(null);
  const timerRef = useRef(null);
  
  // Circadian info
  const circadianInfo = getCircadianPhase();
  
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
        Sounds.stopRecording();
        
        // Track Spanish words
        const words = transcript.toLowerCase().split(/\s+/);
        setMetrics(m => ({
          ...m,
          longestUtterance: Math.max(m.longestUtterance, words.length),
          spanishWordsUsed: new Set([...m.spanishWordsUsed, ...words])
        }));
        
        setTimeout(() => handleSend(transcript), 300);
      };
      
      recognitionRef.current.onerror = (e) => {
        setIsListening(false);
        if (e.error !== 'aborted') {
          triggerHint("Didn't catch that. Try again or type!");
        }
      };
      
      recognitionRef.current.onend = () => setIsListening(false);
    }
    
    return () => {
      if (ambientStopRef.current) ambientStopRef.current();
      if (timerRef.current) clearInterval(timerRef.current);
      Sounds.stopAmbient();
    };
  }, []);
  
  // Hesitation detection
  useEffect(() => {
    if (phase !== 'chat') return;
    
    const checkHesitation = setInterval(() => {
      const timeSince = Date.now() - lastActivity;
      const diffSettings = DIFFICULTIES[difficulty];
      
      if (timeSince > 10000 && !isListening && !isLoading && messages.length > 0 && !showHint) {
        setMetrics(m => ({ ...m, hesitations: m.hesitations + 1 }));
        
        if (diffSettings.hints) {
          const hint = getContextualHint({ topic: scenario?.id, difficulty });
          triggerHint(hint);
          setMariaEmotion('supportive');
        }
      }
    }, 1000);
    
    return () => clearInterval(checkHesitation);
  }, [lastActivity, isListening, isLoading, phase, messages.length, difficulty, scenario, showHint]);
  
  // Update visuals from messages
  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      const visuals = extractVisualsFromText(lastMsg.text);
      if (visuals.length > 0) {
        setContextVisuals(prev => [...new Set([...prev, ...visuals])].slice(-6));
      }
      
      const detectedScene = detectSceneFromConversation(messages);
      if (detectedScene !== currentScene) {
        setCurrentScene(detectedScene);
        if (ambientStopRef.current) ambientStopRef.current();
        const startAmbient = getAmbientForScenario(detectedScene);
        ambientStopRef.current = startAmbient();
      }
    }
  }, [messages, currentScene]);
  
  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Timer for challenge modes
  useEffect(() => {
    if (phase !== 'chat') return;
    const diffSettings = DIFFICULTIES[difficulty];
    
    if (diffSettings.timer && messages.length > 0 && messages[messages.length - 1].role === 'ai') {
      setTimeLeft(diffSettings.timer);
      if (timerRef.current) clearInterval(timerRef.current);
      
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            handleTimeUp();
            return null;
          }
          return t - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [messages, phase, difficulty]);
  
  const triggerHint = useCallback((text) => {
    setHintText(text);
    setShowHint(true);
    Sounds.hint();
  }, []);
  
  const handleTimeUp = () => {
    Sounds.gentleReminder();
    setMessages(prev => [...prev, {
      role: 'ai',
      text: '¡No te preocupes! Take your time. In real life, people pause too. Try again? 💚',
      emotion: 'supportive'
    }]);
    setMariaEmotion('supportive');
  };
  
  const speak = useCallback((text) => {
    setMariaSpeaking(true);
    const cleanText = text.replace(/\([^)]*\)/g, '').replace(/[A-Za-z]{7,}/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText || text);
    utterance.lang = 'es-MX';
    utterance.rate = difficulty === 'immersion' ? 1.0 : 0.85;
    utterance.onend = () => setMariaSpeaking(false);
    utterance.onerror = () => setMariaSpeaking(false);
    speechSynthesis.speak(utterance);
  }, [difficulty]);
  
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      speechSynthesis.cancel();
      setIsListening(true);
      setLastActivity(Date.now());
      setShowHint(false);
      if (timerRef.current) clearInterval(timerRef.current);
      setTimeLeft(null);
      Sounds.recording();
      try {
        recognitionRef.current.start();
      } catch (e) {
        setIsListening(false);
      }
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
    setMessages([{ role: 'ai', text: scenario.opener, emotion: 'happy' }]);
    Sounds.warmWelcome();
    speak(scenario.opener);
    setMariaEmotion('happy');
    setCurrentScene(scenario.scene);
    
    const startAmbient = getAmbientForScenario(scenario.scene);
    ambientStopRef.current = startAmbient();
    
    // Initial context visuals
    const visuals = extractVisualsFromText(scenario.opener);
    setContextVisuals(visuals);
  };
  
  const handleSend = async (text = input) => {
    if (!text.trim()) return;
    
    const responseStart = Date.now();
    setLastActivity(Date.now());
    setShowHint(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(null);
    
    setMetrics(m => ({
      ...m,
      speakingAttempts: m.speakingAttempts + 1,
      responseTimes: [...m.responseTimes, responseStart - lastActivity]
    }));
    
    const userMsg = { role: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    Sounds.tap();
    
    // Update visuals
    const userVisuals = extractVisualsFromText(text);
    if (userVisuals.length > 0) {
      setContextVisuals(prev => [...new Set([...prev, ...userVisuals])].slice(-6));
    }
    
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: '⚙️ Please add your Gemini API key in Settings to chat!', 
        emotion: 'supportive' 
      }]);
      setIsLoading(false);
      return;
    }
    
    try {
      const history = messages.slice(-8).map(m => 
        `${m.role === 'user' ? 'Student' : 'María'}: ${m.text}`
      ).join('\n');
      
      const emotionalState = inferEmotionalState({
        hesitationCount: metrics.hesitations,
        skipCount: 0,
        sessionLengthMin: (Date.now() - metrics.sessionStart) / 60000,
        speakingAttempts: metrics.speakingAttempts,
        errorStreak: metrics.errorCount
      });
      
      const prompt = buildMariaPrompt({
        mode: 'voice_chat',
        difficulty,
        userLevel: 'A1-A2',
        conversationHistory: history,
        topic: scenario?.title,
        emotionalState: emotionalState.state,
        scenario
      }) + `\n\nStudent: ${text}\n\nRespond as María (1-2 sentences, be warm and curious):`;
      
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
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: '⏳ Un momento... Too many requests! Wait a minute.', 
          emotion: 'supportive' 
        }]);
      } else {
        const data = await response.json();
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || '¿Puedes repetir, por favor?';
        
        const emotion = detectMariaEmotion(aiText);
        setMariaEmotion(emotion);
        
        if (emotion === 'excited' || emotion === 'proud') {
          Sounds.encourage();
        } else {
          Sounds.message();
        }
        
        setMessages(prev => [...prev, { role: 'ai', text: aiText, emotion }]);
        speak(aiText);
        
        checkMilestones();
      }
    } catch (err) {
      console.error('API error:', err);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: 'Hmm, connection issue. ¿Intentamos otra vez?', 
        emotion: 'supportive' 
      }]);
    }
    setIsLoading(false);
  };
  
  const checkMilestones = () => {
    const attempts = metrics.speakingAttempts + 1;
    
    if (attempts === 5 && !milestone) {
      setTimeout(() => {
        Sounds.levelUp();
        setMilestone('5');
        setMessages(prev => [...prev, { role: 'system', text: '🎉 5 exchanges! You\'re warming up!' }]);
        setTimeout(() => setMilestone(null), 3000);
      }, 1500);
    }
    
    if (attempts === 10 && milestone !== '10') {
      setTimeout(() => {
        Sounds.celebration();
        setMilestone('10');
        setMessages(prev => [...prev, { role: 'system', text: '🔥 10 exchanges! Real conversation happening!' }]);
        setTimeout(() => setMilestone(null), 3000);
      }, 1500);
    }
    
    if (attempts === 20 && milestone !== '20') {
      setTimeout(() => {
        Sounds.achievement();
        setMilestone('20');
        setMessages(prev => [...prev, { role: 'system', text: '⭐ 20 exchanges! You\'re on fire!' }]);
        setTimeout(() => setMilestone(null), 3000);
      }, 1500);
    }
  };
  
  const endSession = () => {
    if (ambientStopRef.current) ambientStopRef.current();
    Sounds.stopAmbient();
    speechSynthesis.cancel();
    
    const duration = Math.floor((Date.now() - metrics.sessionStart) / 1000);
    const braveryScore = metrics.speakingAttempts > 0
      ? Math.round((metrics.speakingAttempts / (metrics.speakingAttempts + metrics.hesitations + 1)) * 100)
      : 0;
    
    logSession({
      activity: 'voice_chat',
      duration,
      speakingAttempts: metrics.speakingAttempts,
      braveryScore,
      scenario: scenario?.id,
      difficulty,
      spanishWords: metrics.spanishWordsUsed.size,
      longestUtterance: metrics.longestUtterance
    });
    
    // Save to voice history
    const history = JSON.parse(localStorage.getItem('fluidez_voice_history') || '[]');
    history.push({
      ...metrics,
      spanishWordsUsed: metrics.spanishWordsUsed.size,
      braveryScore,
      duration,
      scenario: scenario?.id,
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
    
    Sounds.celebration();
    setPhase('celebration');
  };
  
  const sceneConfig = SCENE_CONFIGS[currentScene] || SCENE_CONFIGS.daily;
  
  // ========== SETUP PHASE ==========
  if (phase === 'setup') {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={onBack} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>🎙️ Voice Chat</h2>
          <div style={{ width: 40 }} />
        </div>
        
        <div style={styles.content}>
          {/* María intro */}
          <div style={styles.mariaCard}>
            <span style={{ fontSize: 56 }}>👩‍🏫</span>
            <h3 style={{ margin: '12px 0 4px' }}>Chat with María</h3>
            <p style={styles.subtitle}>Your conversation partner from Mexico City</p>
          </div>
          
          {/* Circadian tip */}
          <div style={{
            ...styles.tipCard,
            background: circadianInfo.optimal.includes('voice_chat') ? '#E8F5E9' : '#FFF3E0'
          }}>
            <span>⏰</span>
            <span style={{ flex: 1 }}>{circadianInfo.recommendation}</span>
          </div>
          
          {/* Scenario selection */}
          <h4 style={styles.sectionTitle}>What do you want to talk about?</h4>
          <div style={styles.scenarioGrid}>
            {SCENARIOS.map(s => (
              <button
                key={s.id}
                onClick={() => { setScenario(s); Sounds.tap(); }}
                style={{
                  ...styles.scenarioBtn,
                  borderColor: scenario?.id === s.id ? theme.primary : theme.border,
                  background: scenario?.id === s.id ? '#E8F5E9' : theme.surface
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 15 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: theme.textLight }}>{s.description}</div>
              </button>
            ))}
          </div>
          
          {/* Difficulty selection */}
          <h4 style={styles.sectionTitle}>Challenge level</h4>
          <div style={styles.diffGrid}>
            {Object.entries(DIFFICULTIES).map(([key, d]) => (
              <button
                key={key}
                onClick={() => { setDifficulty(key); Sounds.tap(); }}
                style={{
                  ...styles.diffBtn,
                  borderColor: difficulty === key ? theme.primary : theme.border,
                  background: difficulty === key ? '#E8F5E9' : theme.surface
                }}
              >
                <div style={{ fontWeight: 600 }}>{d.name}</div>
                <div style={{ fontSize: 11, color: theme.textLight }}>{d.description}</div>
              </button>
            ))}
          </div>
          
          {/* Start button */}
          <button
            onClick={startChat}
            disabled={!scenario}
            style={{ 
              ...styles.primaryBtn, 
              opacity: scenario ? 1 : 0.5, 
              marginTop: 24 
            }}
          >
            Start Conversation →
          </button>
          
          <p style={styles.footerTip}>
            💡 María celebrates every attempt - don't worry about being perfect!
          </p>
        </div>
      </div>
    );
  }
  
  // ========== CELEBRATION PHASE ==========
  if (phase === 'celebration') {
    const duration = Math.floor((Date.now() - metrics.sessionStart) / 1000);
    const mins = Math.floor(duration / 60);
    const secs = duration % 60;
    const braveryScore = metrics.speakingAttempts > 0
      ? Math.round((metrics.speakingAttempts / (metrics.speakingAttempts + metrics.hesitations + 1)) * 100)
      : 0;
    
    const feedback = braveryScore >= 80 
      ? { emoji: '🔥', title: 'Incredible confidence!', text: 'You\'re speaking like a natural!' }
      : braveryScore >= 50 
      ? { emoji: '💪', title: 'Great progress!', text: 'Every conversation builds fluency!' }
      : { emoji: '🌱', title: 'Every attempt counts!', text: 'Showing up is the hardest part!' };
    
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={onBack} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>Session Complete! 🎉</h2>
          <div style={{ width: 40 }} />
        </div>
        
        <div style={{ ...styles.content, textAlign: 'center' }}>
          <div style={{ fontSize: 72, marginBottom: 8 }}>🌟</div>
          <h2 style={{ margin: '8px 0' }}>¡Fantástico!</h2>
          <p style={{ color: theme.textLight }}>{getMariaPhrase('celebrations')}</p>
          
          {/* Stats */}
          <div style={styles.statsRow}>
            <div style={styles.statBox}>
              <span style={styles.statNum}>{metrics.speakingAttempts}</span>
              <span style={styles.statLabel}>Spoke</span>
            </div>
            <div style={styles.statBox}>
              <span style={styles.statNum}>{braveryScore}%</span>
              <span style={styles.statLabel}>Bravery</span>
            </div>
            <div style={styles.statBox}>
              <span style={styles.statNum}>{mins}:{secs.toString().padStart(2, '0')}</span>
              <span style={styles.statLabel}>Time</span>
            </div>
            <div style={styles.statBox}>
              <span style={styles.statNum}>{metrics.spanishWordsUsed.size}</span>
              <span style={styles.statLabel}>Words</span>
            </div>
          </div>
          
          {/* Feedback */}
          <div style={styles.feedbackCard}>
            <span style={{ fontSize: 32 }}>{feedback.emoji}</span>
            <h4 style={{ margin: '8px 0 4px' }}>{feedback.title}</h4>
            <p style={{ margin: 0, color: theme.textLight }}>{feedback.text}</p>
          </div>
          
          {/* Mission */}
          <div style={styles.missionCard}>
            <h4 style={{ margin: '0 0 8px' }}>🎯 Real-World Mission</h4>
            <p style={{ margin: 0, color: theme.text }}>
              Say "¡Hola! ¿Cómo estás?" to someone today - even to yourself in a mirror!
            </p>
          </div>
          
          <button onClick={onBack} style={styles.primaryBtn}>Done</button>
        </div>
      </div>
    );
  }
  
  // ========== CHAT PHASE ==========
  return (
    <div style={{ ...styles.container, background: sceneConfig.gradient }}>
      {/* Header */}
      <div style={styles.chatHeader}>
        <button onClick={onBack} style={styles.backBtn}>←</button>
        <div style={styles.mariaInfo}>
          <span style={{ fontSize: 32, transition: 'all 0.3s' }}>
            {MARIA_EMOTIONS[mariaEmotion]?.emoji || '👩‍🏫'}
          </span>
          <div>
            <span style={{ fontWeight: 600 }}>María</span>
            {mariaSpeaking && <span style={{ marginLeft: 6, fontSize: 12 }}>💬</span>}
          </div>
        </div>
        <button onClick={endSession} style={styles.endBtn}>End</button>
      </div>
      
      {/* Timer bar */}
      {timeLeft !== null && (
        <div style={styles.timerBar}>
          <div style={{
            ...styles.timerFill,
            width: `${(timeLeft / DIFFICULTIES[difficulty].timer) * 100}%`,
            background: timeLeft <= 5 ? '#EF5350' : '#fff'
          }} />
        </div>
      )}
      
      {/* Context visuals */}
      {contextVisuals.length > 0 && (
        <div style={styles.visualBar}>
          {contextVisuals.map((v, i) => (
            <span key={i} style={styles.visualEmoji}>{v}</span>
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
                <MessageContent text={msg.text} isUser={msg.role === 'user'} />
                {msg.role === 'ai' && (
                  <button onClick={() => speak(msg.text)} style={styles.speakBtn}>🔊</button>
                )}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div style={{ ...styles.message, background: 'rgba(255,255,255,0.95)' }}>
            <span style={{ fontStyle: 'italic', color: theme.textLight }}>María is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Hint */}
      {showHint && (
        <div style={styles.hintBar}>
          <span>💡</span>
          <span style={{ flex: 1 }}>{hintText}</span>
          <button onClick={() => setShowHint(false)} style={styles.dismissBtn}>✕</button>
        </div>
      )}
      
      {/* Input area */}
      <div style={styles.inputArea}>
        <input
          value={input}
          onChange={e => { 
            setInput(e.target.value); 
            setLastActivity(Date.now()); 
            setShowHint(false); 
          }}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          placeholder="Type or tap mic to speak..."
          style={styles.input}
        />
        <button 
          onClick={() => handleSend()} 
          disabled={!input.trim()}
          style={{
            ...styles.sendBtn,
            opacity: input.trim() ? 1 : 0.5
          }}
        >
          ➤
        </button>
      </div>
      
      {/* Mic button */}
      <div style={styles.micRow}>
        <button
          onClick={isListening ? stopListening : startListening}
          style={{
            ...styles.micBtn,
            background: isListening ? '#EF5350' : theme.primary
          }}
        >
          {isListening ? '🎤 Listening... (tap to stop)' : '🎤 Tap to Speak Spanish'}
        </button>
      </div>
      
      {/* Confidence meter */}
      <div style={styles.confidenceBar}>
        <span style={{ fontSize: 12 }}>Bravery:</span>
        <div style={styles.confMeter}>
          <div style={{
            ...styles.confFill,
            width: `${Math.min(100, metrics.speakingAttempts > 0 
              ? (metrics.speakingAttempts / (metrics.speakingAttempts + metrics.hesitations + 1)) * 100 
              : 0)}%`
          }} />
        </div>
        <span style={{ fontSize: 12 }}>{metrics.speakingAttempts} 🗣️</span>
      </div>
    </div>
  );
}

// Message content with vocabulary highlighting
function MessageContent({ text, isUser }) {
  if (isUser) return <span>{text}</span>;
  
  // Simple highlighting for AI messages
  const words = text.split(/(\s+)/);
  return (
    <span>
      {words.map((word, i) => {
        const cleanWord = word.toLowerCase().replace(/[.,!?¿¡]/g, '');
        const visual = getWordVisual(cleanWord);
        if (visual && word.trim()) {
          return (
            <span key={i} style={{ position: 'relative' }}>
              <span style={{ borderBottom: '1px dotted #2D5A27' }}>{word}</span>
            </span>
          );
        }
        return <span key={i}>{word}</span>;
      })}
    </span>
  );
}

const styles = {
  container: { 
    maxWidth: 500, 
    margin: '0 auto', 
    minHeight: '100vh', 
    display: 'flex', 
    flexDirection: 'column', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' 
  },
  header: { 
    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`, 
    color: '#fff', 
    padding: '14px 16px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  chatHeader: {
    background: 'rgba(45,90,39,0.95)',
    color: '#fff',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 10
  },
  title: { margin: 0, fontSize: 18, fontWeight: 600 },
  backBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer', padding: 4 },
  endBtn: { 
    background: 'rgba(255,255,255,0.2)', 
    border: 'none', 
    color: '#fff', 
    padding: '8px 14px', 
    borderRadius: 8, 
    cursor: 'pointer', 
    fontSize: 14,
    fontWeight: 500
  },
  content: { flex: 1, padding: 20, overflow: 'auto', background: theme.bg },
  mariaCard: { 
    background: theme.surface, 
    borderRadius: 20, 
    padding: 28, 
    textAlign: 'center', 
    border: `1px solid ${theme.border}`, 
    marginBottom: 16 
  },
  mariaInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10
  },
  subtitle: { color: theme.textLight, margin: 0, fontSize: 14 },
  tipCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 12,
    fontSize: 14,
    marginBottom: 20
  },
  sectionTitle: { margin: '20px 0 12px', fontSize: 15, fontWeight: 600 },
  scenarioGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
  scenarioBtn: { 
    padding: 16, 
    borderRadius: 14, 
    border: '2px solid', 
    textAlign: 'left', 
    cursor: 'pointer', 
    background: theme.surface,
    transition: 'all 0.2s'
  },
  diffGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
  diffBtn: { 
    padding: 14, 
    borderRadius: 12, 
    border: '2px solid', 
    cursor: 'pointer', 
    textAlign: 'left',
    transition: 'all 0.2s'
  },
  primaryBtn: { 
    width: '100%', 
    background: theme.primary, 
    color: '#fff', 
    border: 'none', 
    padding: 18, 
    borderRadius: 14, 
    fontSize: 16, 
    fontWeight: 600, 
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  footerTip: { textAlign: 'center', color: theme.textLight, marginTop: 20, fontSize: 14 },
  timerBar: { height: 4, background: 'rgba(0,0,0,0.2)' },
  timerFill: { height: '100%', transition: 'width 1s linear, background 0.3s' },
  visualBar: { 
    display: 'flex', 
    justifyContent: 'center', 
    gap: 14, 
    padding: 12, 
    background: 'rgba(255,255,255,0.9)',
    position: 'relative',
    zIndex: 5
  },
  visualEmoji: { fontSize: 30 },
  messages: { 
    flex: 1, 
    overflow: 'auto', 
    padding: 16, 
    display: 'flex', 
    flexDirection: 'column', 
    gap: 12 
  },
  message: { 
    maxWidth: '85%', 
    padding: '12px 16px', 
    borderRadius: 18, 
    lineHeight: 1.5, 
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    position: 'relative'
  },
  systemMsg: { 
    textAlign: 'center', 
    padding: '10px 16px', 
    background: 'rgba(255,255,255,0.95)', 
    borderRadius: 20, 
    fontSize: 14, 
    fontWeight: 500, 
    color: theme.primary 
  },
  speakBtn: { 
    background: 'none', 
    border: 'none', 
    cursor: 'pointer', 
    marginLeft: 8, 
    opacity: 0.7,
    fontSize: 16
  },
  hintBar: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: 12, 
    padding: 14, 
    background: '#FEF3C7', 
    fontSize: 14 
  },
  dismissBtn: { background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6, fontSize: 16 },
  inputArea: { 
    display: 'flex', 
    gap: 10, 
    padding: '14px 16px', 
    background: 'rgba(255,255,255,0.98)' 
  },
  input: { 
    flex: 1, 
    padding: 14, 
    fontSize: 16, 
    border: `2px solid ${theme.border}`, 
    borderRadius: 24, 
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  sendBtn: { 
    width: 50, 
    height: 50, 
    borderRadius: '50%', 
    background: theme.primary, 
    color: '#fff', 
    border: 'none', 
    fontSize: 20, 
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  micRow: { padding: '12px 16px', background: 'rgba(255,255,255,0.98)' },
  micBtn: { 
    width: '100%', 
    padding: 18, 
    border: 'none', 
    borderRadius: 14, 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 600, 
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  confidenceBar: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: 10, 
    padding: '10px 16px', 
    background: 'rgba(255,255,255,0.98)', 
    color: theme.textLight 
  },
  confMeter: { flex: 1, height: 8, background: '#E0E0E0', borderRadius: 4, overflow: 'hidden' },
  confFill: { height: '100%', background: theme.primary, transition: 'width 0.3s' },
  statsRow: { display: 'flex', gap: 10, justifyContent: 'center', margin: '24px 0', flexWrap: 'wrap' },
  statBox: { 
    background: theme.surface, 
    padding: 16, 
    borderRadius: 14, 
    border: `1px solid ${theme.border}`, 
    minWidth: 70, 
    textAlign: 'center' 
  },
  statNum: { display: 'block', fontSize: 22, fontWeight: 700, color: theme.primary },
  statLabel: { fontSize: 11, color: theme.textLight, textTransform: 'uppercase' },
  feedbackCard: { 
    background: theme.surface, 
    padding: 24, 
    borderRadius: 16, 
    margin: '20px 0', 
    border: `1px solid ${theme.border}` 
  },
  missionCard: { 
    background: '#FEF3C7', 
    padding: 18, 
    borderRadius: 14, 
    margin: '20px 0', 
    textAlign: 'left' 
  }
};
