import React, { useState, useEffect, useRef } from 'react';

const theme = {
  primary: '#2D5A27', primaryLight: '#4A7C43', success: '#228B22',
  error: '#CD5C5C', bg: '#FAFAFA', surface: '#FFF',
  text: '#1A1A1A', textLight: '#666', border: '#E0E0E0'
};

const Avatar = ({ speaking, listening, mood }) => {
  const [frame, setFrame] = useState(0);
  const mouthFrames = speaking ? ['😊', '😃', '😄', '😀'] : ['🙂'];
  
  useEffect(() => {
    if (speaking) {
      const interval = setInterval(() => setFrame(f => (f + 1) % 4), 150);
      return () => clearInterval(interval);
    }
  }, [speaking]);

  return (
    <div style={{ width: 120, height: 120, borderRadius: '50%', background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', position: 'relative', boxShadow: speaking ? `0 0 30px ${theme.primaryLight}` : '0 4px 20px rgba(0,0,0,0.1)' }}>
      {listening && (
        <>
          <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: `3px solid ${theme.primary}`, animation: 'pulse 1.5s ease-out infinite', opacity: 0.6 }} />
          <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: `3px solid ${theme.primary}`, animation: 'pulse 1.5s ease-out infinite 0.5s', opacity: 0.4 }} />
        </>
      )}
      <div style={{ fontSize: 60 }}>{mood === 'thinking' ? '🤔' : mouthFrames[frame]}</div>
      <style>{`@keyframes pulse { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.5); opacity: 0; } }`}</style>
    </div>
  );
};

const Waveform = ({ active, color = theme.primary }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, height: 30 }}>
    {[0,1,2,3,4].map(i => (
      <div key={i} style={{ width: 4, height: active ? '100%' : 8, background: color, borderRadius: 2, animation: active ? `wave 0.5s ease-in-out infinite ${i * 0.1}s` : 'none' }} />
    ))}
    <style>{`@keyframes wave { 0%, 100% { height: 8px; } 50% { height: 24px; } }`}</style>
  </div>
);

const TopicSidebar = ({ isOpen, onClose, selectedDays, setSelectedDays, selectedTopics, setSelectedTopics, level, setLevel, curriculum }) => {
  if (!isOpen) return null;
  const days = Object.keys(curriculum).map(d => ({ num: parseInt(d), ...curriculum[d] }));
  const quickTopics = [
    { id: 'free', label: '💬 Free Conversation' },
    { id: 'restaurant', label: '🍽️ Restaurant' },
    { id: 'directions', label: '🗺️ Directions' },
    { id: 'shopping', label: '🛍️ Shopping' },
    { id: 'travel', label: '✈️ Travel' },
    { id: 'family', label: '👨‍👩‍👧 Family' }
  ];

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 300, background: theme.surface, boxShadow: '-4px 0 20px rgba(0,0,0,0.15)', zIndex: 1000, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: 16 }}>Conversation Focus</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer' }}>×</button>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        <h4 style={{ margin: '0 0 12px', fontSize: 14, color: theme.textLight }}>📊 Level</h4>
        {['A1', 'A2', 'B1'].map(l => (
          <label key={l} style={{ display: 'flex', alignItems: 'center', padding: '10px 12px', marginBottom: 6, borderRadius: 8, background: level === l ? '#E8F5E9' : theme.bg, border: `1px solid ${level === l ? theme.primary : theme.border}`, cursor: 'pointer' }}>
            <input type="radio" checked={level === l} onChange={() => setLevel(l)} style={{ marginRight: 10 }} />
            {l}
          </label>
        ))}
        <h4 style={{ margin: '20px 0 12px', fontSize: 14, color: theme.textLight }}>💬 Topics</h4>
        {quickTopics.map(t => (
          <label key={t.id} style={{ display: 'flex', alignItems: 'center', padding: '10px 12px', marginBottom: 6, borderRadius: 8, background: selectedTopics.includes(t.id) ? '#E8F5E9' : theme.bg, cursor: 'pointer' }}>
            <input type="checkbox" checked={selectedTopics.includes(t.id)} onChange={() => setSelectedTopics(prev => prev.includes(t.id) ? prev.filter(x => x !== t.id) : [...prev.filter(x => x !== 'free'), t.id])} style={{ marginRight: 10 }} />
            {t.label}
          </label>
        ))}
        <h4 style={{ margin: '20px 0 12px', fontSize: 14, color: theme.textLight }}>📅 Daily Lessons</h4>
        <div style={{ maxHeight: 200, overflow: 'auto' }}>
          {days.map(d => (
            <label key={d.num} style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', marginBottom: 4, borderRadius: 8, background: selectedDays.includes(d.num) ? '#E8F5E9' : 'transparent', cursor: 'pointer', fontSize: 13 }}>
              <input type="checkbox" checked={selectedDays.includes(d.num)} onChange={() => setSelectedDays(prev => prev.includes(d.num) ? prev.filter(x => x !== d.num) : [...prev, d.num])} style={{ marginRight: 10 }} />
              Day {d.num}: {d.title}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContextUpload = ({ context, setContext, isOpen, onClose }) => {
  const [textInput, setTextInput] = useState('');
  if (!isOpen) return null;
  
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001, padding: 20 }}>
      <div style={{ background: theme.surface, borderRadius: 16, width: '100%', maxWidth: 500, maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>📎 Add Context</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer' }}>×</button>
        </div>
        <div style={{ padding: 20, flex: 1, overflow: 'auto' }}>
          <p style={{ color: theme.textLight, marginTop: 0, fontSize: 14 }}>Add text or topics to discuss in Spanish.</p>
          <textarea value={textInput} onChange={e => setTextInput(e.target.value)} placeholder="Paste text here..." style={{ width: '100%', height: 100, padding: 12, borderRadius: 8, border: `1px solid ${theme.border}`, resize: 'none', fontSize: 14, boxSizing: 'border-box' }} />
          <button onClick={() => { if (textInput.trim()) { setContext(prev => [...prev, { type: 'text', content: textInput.substring(0, 3000), timestamp: Date.now() }]); setTextInput(''); } }} disabled={!textInput.trim()} style={{ marginTop: 8, padding: '10px 16px', borderRadius: 8, border: 'none', background: textInput.trim() ? theme.primary : theme.border, color: '#fff', cursor: textInput.trim() ? 'pointer' : 'default' }}>Add</button>
          {context.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <h4 style={{ margin: '0 0 8px', fontSize: 14 }}>Added:</h4>
              {context.map(c => (
                <div key={c.timestamp} style={{ display: 'flex', justifyContent: 'space-between', padding: 10, marginBottom: 8, borderRadius: 8, background: theme.bg }}>
                  <span style={{ fontSize: 13 }}>{c.content.substring(0, 40)}...</span>
                  <button onClick={() => setContext(prev => prev.filter(x => x.timestamp !== c.timestamp))} style={{ background: 'none', border: 'none', color: theme.error, cursor: 'pointer' }}>×</button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ padding: 16, borderTop: `1px solid ${theme.border}` }}>
          <button onClick={onClose} style={{ width: '100%', padding: 14, borderRadius: 12, border: 'none', background: theme.primary, color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Done</button>
        </div>
      </div>
    </div>
  );
};

const SessionSummary = ({ messages, duration, onClose }) => {
  const userMsgs = messages.filter(m => m.role === 'user');
  const words = userMsgs.reduce((acc, m) => acc + m.text.split(' ').length, 0);
  
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001, padding: 20 }}>
      <div style={{ background: theme.surface, borderRadius: 16, width: '100%', maxWidth: 400, padding: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <h2 style={{ margin: '0 0 8px' }}>Great Practice!</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '24px 0' }}>
          <div style={{ padding: 16, background: theme.bg, borderRadius: 12 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: theme.primary }}>{Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}</div>
            <div style={{ fontSize: 12, color: theme.textLight }}>Duration</div>
          </div>
          <div style={{ padding: 16, background: theme.bg, borderRadius: 12 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: theme.primary }}>{userMsgs.length}</div>
            <div style={{ fontSize: 12, color: theme.textLight }}>Exchanges</div>
          </div>
          <div style={{ padding: 16, background: theme.bg, borderRadius: 12 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: theme.primary }}>{words}</div>
            <div style={{ fontSize: 12, color: theme.textLight }}>Words</div>
          </div>
          <div style={{ padding: 16, background: theme.bg, borderRadius: 12 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: theme.success }}>+{Math.floor(words / 2)}</div>
            <div style={{ fontSize: 12, color: theme.textLight }}>XP</div>
          </div>
        </div>
        <button onClick={onClose} style={{ width: '100%', padding: 14, borderRadius: 12, border: 'none', background: theme.primary, color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Continue</button>
      </div>
    </div>
  );
};

function VoicePractice({ curriculum, onBack }) {
  const [apiKey, setApiKey] = useState('');
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rateLimited, setRateLimited] = useState(false); // eslint-disable-line
  const [transcript, setTranscript] = useState('');
  const [avatarMood, setAvatarMood] = useState('neutral');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contextOpen, setContextOpen] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [useKeyboard, setUseKeyboard] = useState(false);
  const [keyboardInput, setKeyboardInput] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState(['free']);
  const [level, setLevel] = useState('A1');
  const [context, setContext] = useState([]);
  const [sessionStart, setSessionStart] = useState(null);
  const [recognitionActive, setRecognitionActive] = useState(false);
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const key = localStorage.getItem('gemini_api_key');
    if (key) setApiKey(key);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speak = (text) => {
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = level === 'A1' ? 0.8 : level === 'A2' ? 0.9 : 1.0;
    utterance.onstart = () => { setIsSpeaking(true); setAvatarMood('speaking'); };
    utterance.onend = () => { setIsSpeaking(false); setAvatarMood('neutral'); };
    synthRef.current.speak(utterance);
  };

  const addMessage = (role, text) => {
    setMessages(prev => [...prev, { role, text, timestamp: Date.now() }]);
  };

  const buildSystemPrompt = () => {
    let prompt = `You are María, a warm and encouraging Spanish tutor from Mexico City. You have a friendly, playful personality.

RULES:
- Mix Spanish (70%) with English (30%) for explanations at ${level} level
- Keep responses to 1-3 sentences for natural conversation
- Celebrate successes: "¡Muy bien!", "¡Excelente!", "¡Así se hace!"
- Correct mistakes gently by modeling the correct form
- Ask follow-up questions to keep the conversation flowing
- Reference their interests when possible
- Add cultural notes when relevant

PERSONALITY:
- Warm and patient
- Genuinely excited about their progress
- Makes learning feel like chatting with a friend`;

    if (!selectedTopics.includes('free')) {
      prompt += `\nTopics: ${selectedTopics.join(', ')}`;
    }
    if (selectedDays.length > 0) {
      const dayInfo = selectedDays.map(d => `Day ${d}: ${curriculum[d]?.title}`).join(', ');
      prompt += `\nLesson focus: ${dayInfo}`;
    }
    if (context.length > 0) {
      prompt += `\nContext to discuss: ${context.map(c => c.content).join(' ').substring(0, 1000)}`;
    }
    return prompt;
  };

  const handleUserMessage = async (text) => {
    if (!text.trim() || !apiKey) return;
    addMessage('user', text);
    setIsProcessing(true);
    setAvatarMood('thinking');

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
          contents: [...messages.map(m => ({ role: m.role === 'ai' ? 'model' : 'user', parts: [{ text: m.text }] })), { role: 'user', parts: [{ text }] }],
          generationConfig: { temperature: 0.8, maxOutputTokens: 200 }
        })
      });
      const data = await res.json();
      
      if (res.status === 429) {
        setRateLimited(true);
        setTimeout(() => setRateLimited(false), 60000);
        throw new Error('⏳ Rate limit - please wait 1 minute');
      }
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        const reply = data.candidates[0].content.parts[0].text;
        addMessage('ai', reply);
        speak(reply);
      }
    } catch (err) {
      console.error('API Error:', err);
      const errMsg = "Perdón, hubo un error. ¿Puedes repetir?";
      addMessage('ai', errMsg);
      speak(errMsg);
    } finally {
      setIsProcessing(false);
      setAvatarMood('neutral');
    }
  };

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'es-ES';

      recognition.onstart = () => {
        setRecognitionActive(true);
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const current = event.results[event.results.length - 1];
        const text = current[0].transcript;
        setTranscript(text);
        if (current.isFinal) {
          handleUserMessage(text);
          setTranscript('');
        }
      };

      recognition.onend = () => {
        setRecognitionActive(false);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech error:', event.error);
        setRecognitionActive(false);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    const synth = synthRef.current;
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) { /* ignore */ }
      }
      synth.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Send greeting on mount
  useEffect(() => {
    if (apiKey && messages.length === 0) {
      setSessionStart(Date.now());
      const greeting = "¡Hola! ¿Cómo estás? Estoy aquí para practicar español contigo.";
      addMessage('ai', greeting);
      speak(greeting);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported. Try Chrome or Edge.');
      return;
    }

    synthRef.current.cancel();
    setIsSpeaking(false);

    if (recognitionActive) {
      try { recognitionRef.current.stop(); } catch (e) { /* ignore */ }
    } else {
      try { 
        recognitionRef.current.start(); 
      } catch (e) {
        try {
          recognitionRef.current.stop();
          setTimeout(() => {
            try { recognitionRef.current.start(); } catch (e2) { /* ignore */ }
          }, 100);
        } catch (e2) { /* ignore */ }
      }
    }
  };

  const handleKeyboardSubmit = () => {
    if (keyboardInput.trim()) {
      handleUserMessage(keyboardInput);
      setKeyboardInput('');
    }
  };

  const endSession = () => {
    synthRef.current.cancel();
    setShowSummary(true);
  };

  const getDuration = () => sessionStart ? Math.floor((Date.now() - sessionStart) / 1000) : 0;

  if (!apiKey) {
    return (
      <div style={{ maxWidth: 500, margin: '0 auto', minHeight: '100vh', background: theme.bg, fontFamily: '-apple-system, sans-serif' }}>
        <div style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`, color: '#fff', padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>←</button>
            <h2 style={{ margin: 0, fontSize: 18 }}>Voice Practice</h2>
          </div>
        </div>
        <div style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🔑</div>
          <h3>API Key Required</h3>
          <p style={{ color: theme.textLight }}>Set up your Gemini API key in AI Practice first.</p>
          <button onClick={onBack} style={{ marginTop: 16, padding: '14px 24px', borderRadius: 12, border: 'none', background: theme.primary, color: '#fff', fontSize: 16, cursor: 'pointer' }}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', minHeight: '100vh', background: theme.bg, fontFamily: '-apple-system, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`, color: '#fff', padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>←</button>
          <h2 style={{ margin: 0, fontSize: 18 }}>Voice Practice</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setContextOpen(true)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}>📎</button>
            <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}>☰</button>
          </div>
        </div>
        {(selectedDays.length > 0 || !selectedTopics.includes('free') || context.length > 0) && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
            {selectedDays.map(d => <span key={d} style={{ fontSize: 11, background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: 12 }}>Day {d}</span>)}
            {!selectedTopics.includes('free') && selectedTopics.map(t => <span key={t} style={{ fontSize: 11, background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: 12 }}>{t}</span>)}
            {context.length > 0 && <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: 12 }}>📎 {context.length}</span>}
          </div>
        )}
      </div>

      <div style={{ padding: '24px 20px', textAlign: 'center' }}>
        <Avatar speaking={isSpeaking} listening={isListening} mood={avatarMood} />
        <div style={{ marginTop: 12 }}>
          {isListening ? <Waveform active color={theme.error} /> : isSpeaking ? <Waveform active color={theme.primary} /> : isProcessing ? <span style={{ color: theme.textLight, fontSize: 14 }}>Pensando...</span> : <span style={{ color: theme.textLight, fontSize: 14 }}>Tap mic to speak</span>}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '80%', padding: '12px 16px', borderRadius: 16, background: msg.role === 'user' ? theme.primary : theme.surface, color: msg.role === 'user' ? '#fff' : theme.text, border: msg.role === 'user' ? 'none' : `1px solid ${theme.border}` }}>
              <p style={{ margin: 0, lineHeight: 1.5 }}>{msg.text}</p>
              {msg.role === 'ai' && <button onClick={() => speak(msg.text)} style={{ background: 'none', border: 'none', color: theme.textLight, cursor: 'pointer', fontSize: 14, marginTop: 4, padding: 0 }}>🔊</button>}
            </div>
          </div>
        ))}
        {transcript && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ maxWidth: '80%', padding: '12px 16px', borderRadius: 16, background: theme.primaryLight, color: '#fff', opacity: 0.7 }}>{transcript}...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ padding: 16, background: theme.surface, borderTop: `1px solid ${theme.border}` }}>
        {useKeyboard ? (
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="text" value={keyboardInput} onChange={e => setKeyboardInput(e.target.value)} placeholder="Escribe en español..." style={{ flex: 1, padding: 14, borderRadius: 12, border: `1px solid ${theme.border}`, fontSize: 16 }} onKeyPress={e => e.key === 'Enter' && handleKeyboardSubmit()} />
            <button onClick={handleKeyboardSubmit} disabled={!keyboardInput.trim()} style={{ padding: '14px 20px', borderRadius: 12, border: 'none', background: keyboardInput.trim() ? theme.primary : theme.border, color: '#fff', cursor: keyboardInput.trim() ? 'pointer' : 'default' }}>➤</button>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={toggleListening} disabled={isProcessing || isSpeaking} style={{ width: 72, height: 72, borderRadius: '50%', border: 'none', background: isListening ? theme.error : isProcessing || isSpeaking ? theme.border : theme.primary, color: '#fff', fontSize: 28, cursor: isProcessing || isSpeaking ? 'default' : 'pointer', boxShadow: isListening ? `0 0 20px ${theme.error}` : '0 4px 12px rgba(0,0,0,0.15)' }}>
              {isListening ? '⏹' : '🎙️'}
            </button>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16 }}>
          <button onClick={() => setUseKeyboard(!useKeyboard)} style={{ background: 'none', border: 'none', color: theme.textLight, cursor: 'pointer', fontSize: 13 }}>{useKeyboard ? '🎙️ Voice' : '⌨️ Keyboard'}</button>
          <button onClick={() => { const hint = "Puedes preguntar: '¿Cómo se dice...?'"; addMessage('ai', hint); speak(hint); }} style={{ background: 'none', border: 'none', color: theme.textLight, cursor: 'pointer', fontSize: 13 }}>💡 Hint</button>
          <button onClick={endSession} style={{ background: 'none', border: 'none', color: theme.error, cursor: 'pointer', fontSize: 13 }}>⏹️ End</button>
        </div>
      </div>

      <TopicSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} selectedDays={selectedDays} setSelectedDays={setSelectedDays} selectedTopics={selectedTopics} setSelectedTopics={setSelectedTopics} level={level} setLevel={setLevel} curriculum={curriculum} />
      <ContextUpload context={context} setContext={setContext} isOpen={contextOpen} onClose={() => setContextOpen(false)} />
      {showSummary && <SessionSummary messages={messages} duration={getDuration()} onClose={() => { setShowSummary(false); onBack(); }} />}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 999 }} />}
    </div>
  );
}

export default VoicePractice;
