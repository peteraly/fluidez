import React, { useState, useEffect, useRef } from 'react';

const theme = { 
  primary: '#2D5A27', 
  primaryLight: '#4A7C43', 
  success: '#228B22', 
  error: '#CD5C5C', 
  bg: '#FAFAFA', 
  surface: '#FFF', 
  text: '#1A1A1A', 
  textLight: '#666', 
  border: '#E0E0E0',
  warm: '#FF6B6B',
  excited: '#FFD93D',
  calm: '#6BCB77'
};

// ============================================================================
// MARÍA'S PERSONALITY - Creates parasocial bond
// ============================================================================
const MARIA_PERSONALITY = {
  name: 'María',
  traits: ['warm', 'encouraging', 'curious', 'playful', 'patient'],
  backstory: 'A friendly teacher from Mexico City who loves helping people discover Spanish. She gets genuinely excited when you try new things.',
  emotionalResponses: {
    userTries: ['¡Qué bien!', '¡Eso es!', '¡Me encanta!', '¡Sí, sí!', '¡Muy bien!'],
    userStruggles: ['No te preocupes...', 'Está bien, try this...', 'Poco a poco...', 'You\'re doing great...'],
    userSucceeds: ['¡Increíble!', '¡Fantástico!', '¡Lo lograste!', '¡Estoy tan orgullosa!'],
    greeting: ['¡Hola!', '¡Qué gusto verte!', '¡Hola, amigo/a!'],
    encouragement: ['You\'re becoming a real Spanish speaker!', 'I can hear your progress!', 'Your accent is improving!']
  }
};

// ============================================================================
// CONVERSATION SCENARIOS - Emotional stakes + real-world relevance
// ============================================================================
const CONVERSATION_SCENARIOS = [
  {
    id: 'check_in',
    type: 'daily',
    title: 'Daily Check-in',
    emotionalStake: 'María genuinely cares how you\'re doing',
    prompt: 'María asks about your day with genuine interest',
    starterTopics: ['how you feel', 'what you did', 'your plans'],
    mariaOpener: '¡Hola! ¿Cómo estás hoy? Tell me about your day!'
  },
  {
    id: 'story_share',
    type: 'connection',
    title: 'Share a Story',
    emotionalStake: 'Building a real friendship through sharing',
    prompt: 'Tell María about something interesting that happened',
    starterTopics: ['a funny moment', 'something you learned', 'someone you met'],
    mariaOpener: 'Cuéntame algo... What\'s something interesting that happened to you recently?'
  },
  {
    id: 'dream_talk',
    type: 'identity',
    title: 'Dreams & Goals',
    emotionalStake: 'Connecting Spanish to your life vision',
    prompt: 'María wants to know why you\'re learning Spanish',
    starterTopics: ['travel dreams', 'career goals', 'personal connections'],
    mariaOpener: '¿Por qué quieres hablar español? What\'s your dream?'
  },
  {
    id: 'opinion',
    type: 'thinking',
    title: 'Share Your Opinion',
    emotionalStake: 'Express your real thoughts in Spanish',
    prompt: 'María asks what you think about something',
    starterTopics: ['favorite food', 'best movie', 'ideal vacation'],
    mariaOpener: 'Tengo curiosidad... What do you think is the best [topic]? ¿Y por qué?'
  },
  {
    id: 'problem_solve',
    type: 'stakes',
    title: 'Help Me Decide',
    emotionalStake: 'María needs your real input',
    prompt: 'María asks for your advice on something',
    starterTopics: ['gift ideas', 'what to cook', 'weekend plans'],
    mariaOpener: 'Necesito tu ayuda... I can\'t decide what to [scenario]. ¿Qué piensas?'
  }
];

// ============================================================================
// DIFFICULTY MODES - Desirable difficulty principle
// ============================================================================
const DIFFICULTY_MODES = {
  comfort: {
    name: 'Comfort Zone',
    icon: '🌱',
    description: 'Lots of English support, slow pace',
    spanishPercent: 50,
    responseTime: null,
    hints: true
  },
  growth: {
    name: 'Growth Zone',
    icon: '🌿',
    description: 'More Spanish, natural pace',
    spanishPercent: 75,
    responseTime: null,
    hints: true
  },
  challenge: {
    name: 'Challenge Zone',
    icon: '🌳',
    description: 'Mostly Spanish, some time pressure',
    spanishPercent: 90,
    responseTime: 30,
    hints: false
  },
  immersion: {
    name: 'Full Immersion',
    icon: '🔥',
    description: 'All Spanish, real conversation speed',
    spanishPercent: 100,
    responseTime: 15,
    hints: false
  }
};

export default function VoicePractice({ onBack }) {
  // Core state
  const [phase, setPhase] = useState('setup'); // setup, warmup, conversation, reflection, celebration
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Scenario & difficulty
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [difficulty, setDifficulty] = useState('growth');
  
  // Emotional state tracking
  const [mariaEmotion, setMariaEmotion] = useState('neutral'); // neutral, happy, excited, supportive, curious
  const [userConfidence, setUserConfidence] = useState(50);
  
  // Metrics for learning optimization
  const [metrics, setMetrics] = useState({
    speakingAttempts: 0,
    hesitations: 0,
    sessionStart: Date.now(),
    emotionalHighPoints: 0,
    topicsExplored: [],
    longestUtterance: 0,
    spanishWordsUsed: new Set()
  });
  
  // Time pressure (for challenge modes)
  const [responseTimer, setResponseTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  
  // Hints and scaffolding
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [lastActivity, setLastActivity] = useState(Date.now());
  
  // Conversation memory (makes María feel "real")
  const [conversationMemory, setConversationMemory] = useState({
    userMentioned: [],
    topicsDiscussed: [],
    userPreferences: []
  });

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // ============================================================================
  // EMOTIONAL FEEDBACK SYSTEM
  // ============================================================================
  const getMariaReaction = (type) => {
    const reactions = MARIA_PERSONALITY.emotionalResponses[type];
    return reactions[Math.floor(Math.random() * reactions.length)];
  };

  const updateMariaEmotion = (emotion) => {
    setMariaEmotion(emotion);
    // Reset to neutral after 3 seconds
    setTimeout(() => setMariaEmotion('neutral'), 3000);
  };

  // ============================================================================
  // SPEECH RECOGNITION SETUP
  // ============================================================================
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
        
        // Track Spanish words used
        const words = transcript.toLowerCase().split(/\s+/);
        setMetrics(m => ({
          ...m,
          spanishWordsUsed: new Set([...m.spanishWordsUsed, ...words]),
          longestUtterance: Math.max(m.longestUtterance, words.length)
        }));
        
        // Auto-submit
        setTimeout(() => handleSend(transcript), 300);
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
        setShowHint(true);
        setCurrentHint("Mic didn't catch that. Try typing or tap mic again!");
      };
      
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  // ============================================================================
  // HESITATION DETECTION - Triggers supportive scaffolding
  // ============================================================================
  useEffect(() => {
    if (phase !== 'conversation') return;
    
    const timer = setInterval(() => {
      const timeSinceActivity = Date.now() - lastActivity;
      const mode = DIFFICULTY_MODES[difficulty];
      
      // After 10 seconds of silence in conversation
      if (timeSinceActivity > 10000 && !isListening && !isLoading && messages.length > 0) {
        setMetrics(m => ({ ...m, hesitations: m.hesitations + 1 }));
        
        if (mode.hints) {
          setShowHint(true);
          setCurrentHint(getContextualHint());
          updateMariaEmotion('supportive');
        }
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [lastActivity, isListening, isLoading, phase, messages.length, difficulty]);

  // ============================================================================
  // CONTEXTUAL HINTS - Based on conversation context
  // ============================================================================
  const getContextualHint = () => {
    const hints = [
      { text: "Try: 'Sí, me gusta...' (Yes, I like...)", context: 'opinion' },
      { text: "Try: 'Creo que...' (I think that...)", context: 'opinion' },
      { text: "Try: 'No entiendo' (I don't understand)", context: 'confusion' },
      { text: "Try: 'Puedes repetir?' (Can you repeat?)", context: 'confusion' },
      { text: "Try: 'Ayer yo...' (Yesterday I...)", context: 'past' },
      { text: "Try: 'Quiero...' (I want...)", context: 'desire' },
      { text: "Just say one word to start - María will help!", context: 'stuck' },
      { text: "It's okay to mix Spanish and English!", context: 'stuck' }
    ];
    return hints[Math.floor(Math.random() * hints.length)].text;
  };

  // ============================================================================
  // TIME PRESSURE SYSTEM (for challenge modes)
  // ============================================================================
  useEffect(() => {
    if (phase !== 'conversation') return;
    const mode = DIFFICULTY_MODES[difficulty];
    
    if (mode.responseTime && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === 'ai') {
        setTimeLeft(mode.responseTime);
        const timer = setInterval(() => {
          setTimeLeft(t => {
            if (t <= 1) {
              clearInterval(timer);
              // Time's up - María reacts playfully
              handleTimeUp();
              return null;
            }
            return t - 1;
          });
        }, 1000);
        setResponseTimer(timer);
        return () => clearInterval(timer);
      }
    }
  }, [messages, phase, difficulty]);

  const handleTimeUp = () => {
    setMessages(prev => [...prev, {
      role: 'ai',
      text: '¡Rápido, rápido! 😄 Take your time, pero in real life people keep talking! Try again?',
      emotion: 'playful'
    }]);
  };

  // ============================================================================
  // SPEECH SYNTHESIS
  // ============================================================================
  const speak = (text) => {
    // Remove English for more immersive audio
    const spanishOnly = text.replace(/\([^)]*\)/g, '').replace(/[A-Za-z]{4,}/g, '');
    const utterance = new SpeechSynthesisUtterance(spanishOnly || text);
    utterance.lang = 'es-MX';
    utterance.rate = difficulty === 'immersion' ? 1.0 : 0.85;
    speechSynthesis.speak(utterance);
  };

  // ============================================================================
  // MICROPHONE CONTROLS
  // ============================================================================
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      setLastActivity(Date.now());
      setShowHint(false);
      if (responseTimer) clearInterval(responseTimer);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // ============================================================================
  // MESSAGE HANDLING - Core conversation logic
  // ============================================================================
  const handleSend = async (text = input) => {
    if (!text.trim()) return;
    
    setLastActivity(Date.now());
    setShowHint(false);
    if (responseTimer) {
      clearInterval(responseTimer);
      setTimeLeft(null);
    }
    
    // Update metrics
    setMetrics(m => ({ 
      ...m, 
      speakingAttempts: m.speakingAttempts + 1,
      emotionalHighPoints: m.emotionalHighPoints + (text.length > 20 ? 1 : 0)
    }));

    // Update confidence based on utterance length
    const newConfidence = Math.min(100, userConfidence + (text.split(' ').length * 2));
    setUserConfidence(newConfidence);

    const userMessage = { role: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: '⚙️ I need a Gemini API key to chat! Go to Settings to add one.',
        emotion: 'helpful'
      }]);
      setIsLoading(false);
      return;
    }

    try {
      const mode = DIFFICULTY_MODES[difficulty];
      const conversationHistory = messages.slice(-8).map(m => 
        `${m.role === 'user' ? 'Student' : 'María'}: ${m.text}`
      ).join('\n');

      // Build system prompt with all the psychology baked in
      const systemPrompt = buildMariaPrompt(mode, conversationHistory, text);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
            generationConfig: { temperature: 0.9, maxOutputTokens: 200 }
          })
        }
      );

      if (response.status === 429) {
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: '⏳ Necesito un momento... (Rate limit - wait 1 minute!)',
          emotion: 'patient'
        }]);
      } else {
        const data = await response.json();
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || '¿Puedes repetir?';
        
        // Determine María's emotion from response
        const emotion = detectEmotion(aiText);
        updateMariaEmotion(emotion);
        
        setMessages(prev => [...prev, { role: 'ai', text: aiText, emotion }]);
        speak(aiText);
        
        // Check for conversation milestones
        checkMilestones();
      }
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: 'Hmm, connection issue. ¿Intentamos otra vez?',
        emotion: 'supportive'
      }]);
    }
    setIsLoading(false);
  };

  // ============================================================================
  // MARÍA'S PROMPT - Psychology-optimized
  // ============================================================================
  const buildMariaPrompt = (mode, history, userText) => {
    return `You are María, a warm Spanish teacher from Mexico City.

CORE PERSONALITY:
- Genuinely caring and interested in the student
- Gets visibly excited when they try new things
- Uses encouraging reactions: "¡Eso es!", "¡Muy bien!", "¡Me encanta!"
- Shares bits about yourself to build connection
- Remembers what they've told you (builds relationship)

LANGUAGE MIX: Use ${mode.spanishPercent}% Spanish, ${100 - mode.spanishPercent}% English.

CRITICAL BEHAVIORS:
1. CELEBRATE EVERY ATTEMPT - Even imperfect Spanish is a win
2. ASK FOLLOW-UP QUESTIONS - Show genuine curiosity
3. KEEP RESPONSES SHORT - 1-2 sentences max so they speak more
4. USE EMOTION - React with feeling, not just information
5. CREATE CONTINUITY - Reference what they said, build on it
6. MAKE IT PERSONAL - Connect topics to their life

WHAT MAKES REAL CONVERSATION:
- Unpredictable topics (introduce surprises)
- Emotional reactions (laugh, express surprise, show care)
- Imperfection (use fillers: "Hmm...", "A ver...", "Pues...")
- Memory ("You mentioned X earlier...")
- Stakes ("This will help you when you travel to...")

AVOID:
- Lecturing or explaining grammar
- Long responses that dominate the conversation
- Generic responses ("That's nice")
- Being a robot - you're a friend

SCENARIO: ${selectedScenario?.title || 'Free Conversation'}

CONVERSATION SO FAR:
${history}

Student just said: "${userText}"

Respond as María (1-2 sentences, emotionally engaged, ask a follow-up):`;
  };

  // ============================================================================
  // EMOTION DETECTION
  // ============================================================================
  const detectEmotion = (text) => {
    if (text.includes('!') && (text.includes('Muy bien') || text.includes('Excelente') || text.includes('encanta'))) {
      return 'excited';
    }
    if (text.includes('?')) return 'curious';
    if (text.includes('No te preocupes') || text.includes('Está bien')) return 'supportive';
    if (text.includes('jaja') || text.includes('😄')) return 'happy';
    return 'neutral';
  };

  // ============================================================================
  // MILESTONE TRACKING - Dopamine hits
  // ============================================================================
  const checkMilestones = () => {
    const attempts = metrics.speakingAttempts + 1;
    
    if (attempts === 5) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'system',
          text: '🎉 5 responses! You\'re in the flow now!',
          type: 'milestone'
        }]);
      }, 1000);
    }
    
    if (attempts === 10) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'system',
          text: '🔥 10 responses! This is a real conversation!',
          type: 'milestone'
        }]);
      }, 1000);
    }
  };

  // ============================================================================
  // START CONVERSATION
  // ============================================================================
  const startConversation = async () => {
    setPhase('conversation');
    setMessages([]);
    setIsLoading(true);

    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
      setMessages([{ role: 'ai', text: 'Add your Gemini API key in Settings first! ⚙️' }]);
      setIsLoading(false);
      return;
    }

    try {
      const opener = selectedScenario?.mariaOpener || '¡Hola! ¿Cómo estás hoy? Tell me something about your day!';
      setMessages([{ role: 'ai', text: opener, emotion: 'happy' }]);
      speak(opener);
    } catch (err) {
      setMessages([{ role: 'ai', text: '¡Hola! ¿Cómo estás?' }]);
    }
    setIsLoading(false);
  };

  // ============================================================================
  // END SESSION & REFLECTION
  // ============================================================================
  const endSession = () => {
    // Calculate final metrics
    const sessionDuration = Math.floor((Date.now() - metrics.sessionStart) / 1000);
    const braveryScore = metrics.speakingAttempts > 0 
      ? Math.round((metrics.speakingAttempts / (metrics.speakingAttempts + metrics.hesitations + 1)) * 100)
      : 0;

    // Save to history
    const history = JSON.parse(localStorage.getItem('fluidez_voice_history') || '[]');
    history.push({
      ...metrics,
      braveryScore,
      sessionDuration,
      uniqueWordsUsed: metrics.spanishWordsUsed.size,
      difficulty,
      scenario: selectedScenario?.id,
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

  // ============================================================================
  // AUTO-SCROLL
  // ============================================================================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ============================================================================
  // RENDER: SETUP PHASE
  // ============================================================================
  if (phase === 'setup') {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={onBack} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>🎙️ Voice Practice</h2>
          <div style={{ width: 40 }} />
        </div>
        
        <div style={styles.content}>
          {/* María Introduction */}
          <div style={styles.mariaIntro}>
            <div style={styles.mariaAvatar}>👩‍🏫</div>
            <h3 style={{ margin: '8px 0 4px' }}>Meet María</h3>
            <p style={{ color: theme.textLight, margin: 0, fontSize: 14 }}>
              Your conversation partner from Mexico City
            </p>
          </div>

          {/* Scenario Selection */}
          <h4 style={{ margin: '24px 0 12px' }}>What do you want to talk about?</h4>
          <div style={styles.scenarioGrid}>
            {CONVERSATION_SCENARIOS.map(scenario => (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario)}
                style={{
                  ...styles.scenarioCard,
                  borderColor: selectedScenario?.id === scenario.id ? theme.primary : theme.border,
                  background: selectedScenario?.id === scenario.id ? '#E8F5E9' : theme.surface
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 600 }}>{scenario.title}</div>
                <div style={{ fontSize: 12, color: theme.textLight }}>{scenario.emotionalStake}</div>
              </button>
            ))}
          </div>

          {/* Difficulty Selection */}
          <h4 style={{ margin: '24px 0 12px' }}>Choose your challenge level</h4>
          <div style={styles.difficultyGrid}>
            {Object.entries(DIFFICULTY_MODES).map(([key, mode]) => (
              <button
                key={key}
                onClick={() => setDifficulty(key)}
                style={{
                  ...styles.difficultyCard,
                  borderColor: difficulty === key ? theme.primary : theme.border,
                  background: difficulty === key ? '#E8F5E9' : theme.surface
                }}
              >
                <span style={{ fontSize: 24 }}>{mode.icon}</span>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{mode.name}</div>
                <div style={{ fontSize: 11, color: theme.textLight }}>{mode.description}</div>
              </button>
            ))}
          </div>

          {/* Start Button */}
          <button 
            onClick={startConversation}
            disabled={!selectedScenario}
            style={{
              ...styles.primaryBtn,
              opacity: selectedScenario ? 1 : 0.5,
              marginTop: 24
            }}
          >
            Start Conversation with María →
          </button>

          {/* Tip */}
          <div style={styles.tip}>
            💡 <strong>Tip:</strong> Don't worry about being perfect. María celebrates every attempt!
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDER: CELEBRATION PHASE
  // ============================================================================
  if (phase === 'celebration') {
    const sessionDuration = Math.floor((Date.now() - metrics.sessionStart) / 1000);
    const minutes = Math.floor(sessionDuration / 60);
    const seconds = sessionDuration % 60;
    const braveryScore = metrics.speakingAttempts > 0 
      ? Math.round((metrics.speakingAttempts / (metrics.speakingAttempts + metrics.hesitations + 1)) * 100)
      : 0;

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={onBack} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>Session Complete! 🎉</h2>
          <div style={{ width: 40 }} />
        </div>
        
        <div style={{ ...styles.content, textAlign: 'center' }}>
          <div style={{ fontSize: 64 }}>🌟</div>
          <h2 style={{ margin: '16px 0 8px' }}>¡Fantástico!</h2>
          <p style={{ color: theme.textLight }}>María says: "{getMariaReaction('userSucceeds')}"</p>

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
              <span style={styles.statLabel}>Conversation time</span>
            </div>
          </div>

          <div style={styles.statsGrid}>
            <div style={styles.statBox}>
              <span style={styles.statNum}>{metrics.spanishWordsUsed.size}</span>
              <span style={styles.statLabel}>Unique Spanish words</span>
            </div>
            <div style={styles.statBox}>
              <span style={styles.statNum}>{metrics.longestUtterance}</span>
              <span style={styles.statLabel}>Longest sentence</span>
            </div>
          </div>

          {/* Personalized feedback */}
          <div style={styles.feedbackCard}>
            {braveryScore >= 80 ? (
              <>
                <h4 style={{ margin: '0 0 8px' }}>🔥 Incredible confidence!</h4>
                <p style={{ margin: 0, color: theme.textLight }}>
                  You're speaking like a real Spanish speaker. Keep pushing into harder conversations!
                </p>
              </>
            ) : braveryScore >= 50 ? (
              <>
                <h4 style={{ margin: '0 0 8px' }}>💪 Great progress!</h4>
                <p style={{ margin: 0, color: theme.textLight }}>
                  You're building fluency with every conversation. The hesitations will decrease!
                </p>
              </>
            ) : (
              <>
                <h4 style={{ margin: '0 0 8px' }}>🌱 Every attempt counts!</h4>
                <p style={{ margin: 0, color: theme.textLight }}>
                  Speaking is hard, and you showed up. That's what builds fluency!
                </p>
              </>
            )}
          </div>

          {/* Real-world mission */}
          <div style={styles.missionCard}>
            <h4 style={{ margin: '0 0 8px' }}>🎯 Today's Real-World Mission</h4>
            <p style={{ margin: 0, color: theme.textLight }}>
              {selectedScenario?.id === 'check_in' && "Ask someone '¿Cómo estás?' today - even a pet counts! 🐕"}
              {selectedScenario?.id === 'story_share' && "Tell someone one thing about your day in Spanish!"}
              {selectedScenario?.id === 'dream_talk' && "Write down your Spanish dream and put it somewhere you'll see it!"}
              {selectedScenario?.id === 'opinion' && "Share an opinion with someone using 'Creo que...' (I think that...)"}
              {selectedScenario?.id === 'problem_solve' && "Ask someone for their opinion: '¿Qué piensas?'"}
              {!selectedScenario && "Practice one phrase from today's conversation with a mirror!"}
            </p>
          </div>

          <button onClick={onBack} style={styles.primaryBtn}>Done</button>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDER: CONVERSATION PHASE
  // ============================================================================
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>
          <span style={styles.mariaEmoji}>{
            mariaEmotion === 'excited' ? '🤩' :
            mariaEmotion === 'happy' ? '😊' :
            mariaEmotion === 'supportive' ? '🤗' :
            mariaEmotion === 'curious' ? '🤔' : '👩‍🏫'
          }</span>
          {' '}María
        </h2>
        <div style={styles.confidenceBadge}>
          {userConfidence >= 70 ? '🔥' : userConfidence >= 40 ? '💪' : '🌱'} {userConfidence}%
        </div>
      </div>

      {/* Time pressure indicator */}
      {timeLeft !== null && (
        <div style={{
          ...styles.timerBar,
          background: timeLeft <= 5 ? theme.error : theme.primary
        }}>
          <div style={{
            ...styles.timerFill,
            width: `${(timeLeft / DIFFICULTY_MODES[difficulty].responseTime) * 100}%`
          }} />
        </div>
      )}

      {/* Messages */}
      <div style={styles.messages}>
        {messages.map((msg, i) => (
          <div key={i}>
            {msg.type === 'milestone' ? (
              <div style={styles.milestone}>{msg.text}</div>
            ) : (
              <div style={{
                ...styles.message,
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                background: msg.role === 'user' ? theme.primary : theme.surface,
                color: msg.role === 'user' ? '#fff' : theme.text
              }}>
                {msg.role === 'ai' && (
                  <span style={styles.emotionIndicator}>
                    {msg.emotion === 'excited' && '✨'}
                    {msg.emotion === 'curious' && '🤔'}
                    {msg.emotion === 'supportive' && '💚'}
                  </span>
                )}
                {msg.text}
                {msg.role === 'ai' && (
                  <button onClick={() => speak(msg.text)} style={styles.speakBtn}>🔊</button>
                )}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div style={{ ...styles.message, background: theme.surface }}>
            <span style={styles.typing}>María is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Hint */}
      {showHint && (
        <div style={styles.hintCard}>
          <span>💡</span>
          <span>{currentHint}</span>
          <button onClick={() => setShowHint(false)} style={styles.dismissHint}>✕</button>
        </div>
      )}

      {/* Input */}
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

      {/* Actions */}
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
        <button 
          onClick={endSession}
          style={{ ...styles.actionBtn, background: theme.textLight }}
        >
          ⏹️ End Session
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// STYLES
// ============================================================================
const styles = {
  container: { maxWidth: 500, margin: '0 auto', minHeight: '100vh', background: theme.bg, display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  header: { background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`, color: '#fff', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  title: { margin: 0, fontSize: 18, display: 'flex', alignItems: 'center', gap: 8 },
  backBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' },
  content: { flex: 1, padding: 20, overflow: 'auto' },
  mariaIntro: { background: theme.surface, borderRadius: 16, padding: 24, textAlign: 'center', border: `1px solid ${theme.border}`, marginBottom: 16 },
  mariaAvatar: { fontSize: 48 },
  scenarioGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
  scenarioCard: { padding: 14, borderRadius: 12, border: '2px solid', textAlign: 'left', cursor: 'pointer', background: theme.surface },
  difficultyGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
  difficultyCard: { padding: 12, borderRadius: 12, border: '2px solid', textAlign: 'center', cursor: 'pointer' },
  primaryBtn: { width: '100%', background: theme.primary, color: '#fff', border: 'none', padding: 16, borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer' },
  tip: { marginTop: 16, padding: 16, background: '#FEF3C7', borderRadius: 12, fontSize: 14, textAlign: 'center' },
  messages: { flex: 1, overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 },
  message: { maxWidth: '85%', padding: '12px 16px', borderRadius: 16, position: 'relative', lineHeight: 1.5 },
  speakBtn: { background: 'none', border: 'none', cursor: 'pointer', marginLeft: 8, opacity: 0.7, fontSize: 16 },
  typing: { fontStyle: 'italic', color: theme.textLight },
  emotionIndicator: { marginRight: 6 },
  milestone: { textAlign: 'center', padding: '8px 16px', background: '#E8F5E9', borderRadius: 20, fontSize: 14, fontWeight: 500, color: theme.primary },
  hintCard: { display: 'flex', alignItems: 'center', gap: 10, margin: '0 16px', padding: 12, background: '#FEF3C7', borderRadius: 12 },
  dismissHint: { marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6 },
  inputArea: { display: 'flex', gap: 8, padding: '12px 16px', background: theme.surface, borderTop: `1px solid ${theme.border}` },
  input: { flex: 1, padding: 12, fontSize: 16, border: `1px solid ${theme.border}`, borderRadius: 24, outline: 'none' },
  sendBtn: { width: 48, height: 48, borderRadius: '50%', background: theme.primary, color: '#fff', border: 'none', fontSize: 18, cursor: 'pointer' },
  actions: { display: 'flex', gap: 12, padding: '12px 16px' },
  actionBtn: { flex: 1, padding: 14, border: 'none', borderRadius: 12, color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer' },
  confidenceBadge: { background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 12, fontSize: 14 },
  timerBar: { height: 4, width: '100%' },
  timerFill: { height: '100%', background: 'rgba(255,255,255,0.5)', transition: 'width 1s linear' },
  mariaEmoji: { fontSize: 24 },
  statsGrid: { display: 'flex', gap: 12, justifyContent: 'center', margin: '16px 0' },
  statBox: { background: theme.surface, padding: 16, borderRadius: 12, border: `1px solid ${theme.border}`, minWidth: 80, textAlign: 'center' },
  statNum: { display: 'block', fontSize: 24, fontWeight: 700, color: theme.primary },
  statLabel: { fontSize: 11, color: theme.textLight },
  feedbackCard: { background: theme.surface, padding: 20, borderRadius: 16, margin: '16px 0', border: `1px solid ${theme.border}`, textAlign: 'left' },
  missionCard: { background: '#FEF3C7', padding: 16, borderRadius: 12, margin: '16px 0', textAlign: 'left' }
};
