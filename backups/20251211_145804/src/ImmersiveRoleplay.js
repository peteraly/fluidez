import React, { useState, useEffect, useRef } from 'react';
import SceneBackground from './components/multimodal/SceneBackground';
import AnimatedAvatar from './components/multimodal/AnimatedAvatar';
import VocabHighlight from './components/multimodal/VocabHighlight';
import { SoundEffects } from './components/multimodal/SoundEffects';
import { CharacterExpressions } from './components/multimodal/VisualAssets';

const theme = { primary: '#2D5A27', primaryLight: '#4A7C43', bg: '#FAFAFA', surface: '#FFF', text: '#1A1A1A', textLight: '#666', border: '#E0E0E0' };

const SCENARIOS = [
  {
    id: 'restaurant',
    title: '🍽️ Restaurant',
    scene: 'restaurant',
    character: 'Carlos (Waiter)',
    characterType: 'waiter',
    level: 'A1-A2',
    prepPhrases: [
      { es: 'Quisiera...', en: 'I would like...' },
      { es: 'La cuenta, por favor', en: 'The bill, please' },
      { es: '¿Qué recomienda?', en: 'What do you recommend?' }
    ],
    interactiveItems: ['🍽️ Menu', '💳 Card', '💵 Cash'],
    opener: '¡Bienvenido! Welcome! Here is the menu. ¿Qué le gustaría ordenar?',
    systemPrompt: `You are Carlos, a friendly waiter at a Mexican restaurant. 70% Spanish, 30% English. Keep responses short. Ask about their order, preferences, offer recommendations.`
  },
  {
    id: 'airport',
    title: '✈️ Airport',
    scene: 'airport',
    character: 'Agent',
    characterType: 'agent',
    level: 'A2-B1',
    prepPhrases: [
      { es: 'Mi vuelo es...', en: 'My flight is...' },
      { es: 'Solo equipaje de mano', en: 'Just carry-on' },
      { es: '¿Dónde está la puerta?', en: 'Where is the gate?' }
    ],
    interactiveItems: ['🛂 Passport', '🎫 Ticket', '🧳 Luggage'],
    opener: 'Buenos días. ¿Su pasaporte y boleto, por favor? Your passport and ticket?',
    systemPrompt: `You are an airport check-in agent. 65% Spanish. Ask for documents, luggage, seat preference. Be professional but friendly.`
  },
  {
    id: 'cafe',
    title: '☕ Café',
    scene: 'cafe',
    character: 'Sofia (New Friend)',
    characterType: 'friend',
    level: 'A1-A2',
    prepPhrases: [
      { es: '¿De dónde eres?', en: 'Where are you from?' },
      { es: 'Me gusta...', en: 'I like...' },
      { es: '¿Qué haces?', en: 'What do you do?' }
    ],
    interactiveItems: ['☕ Coffee', '🥐 Pastry', '📱 Phone'],
    opener: '¡Hola! ¿Puedo sentarme aquí? Can I sit here? Me llamo Sofia. ¿Y tú?',
    systemPrompt: `You are Sofia, a friendly person at a café. 75% Spanish. Make casual conversation, ask about them, share about yourself. Be warm and curious.`
  },
  {
    id: 'doctor',
    title: '🏥 Doctor',
    scene: 'doctor',
    character: 'Dra. García',
    characterType: 'doctor',
    level: 'A2-B1',
    prepPhrases: [
      { es: 'Me duele...', en: 'It hurts...' },
      { es: 'Tengo fiebre', en: 'I have a fever' },
      { es: '¿Necesito medicina?', en: 'Do I need medicine?' }
    ],
    interactiveItems: ['🩺 Stethoscope', '💊 Medicine', '📋 Form'],
    opener: 'Buenos días, soy la Doctora García. ¿Cómo se siente hoy? How do you feel?',
    systemPrompt: `You are Dr. García. 60% Spanish. Ask about symptoms, give simple advice. Be caring and reassuring.`
  }
];

export default function ImmersiveRoleplay({ onBack }) {
  const [phase, setPhase] = useState('select'); // select, prep, play, complete
  const [scenario, setScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [characterEmotion, setCharacterEmotion] = useState('neutral');
  const [exchanges, setExchanges] = useState(0);
  const [usedItems, setUsedItems] = useState([]);
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const speak = (text) => {
    const spanishOnly = text.replace(/\([^)]*\)/g, '').replace(/[A-Za-z]{5,}/g, '');
    const utterance = new SpeechSynthesisUtterance(spanishOnly || text);
    utterance.lang = 'es-MX';
    utterance.rate = 0.85;
    speechSynthesis.speak(utterance);
  };
  
  const startScenario = () => {
    setPhase('play');
    setMessages([{ role: 'ai', text: scenario.opener }]);
    SoundEffects.message();
    speak(scenario.opener);
  };
  
  const handleItem = (item) => {
    if (usedItems.includes(item)) return;
    setUsedItems([...usedItems, item]);
    SoundEffects.tap();
    
    // Add item use to conversation
    const itemName = item.split(' ')[1];
    setMessages(prev => [...prev, { role: 'action', text: `[You show your ${itemName}]` }]);
  };
  
  const handleSend = async (text = input) => {
    if (!text.trim()) return;
    
    const userMsg = { role: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setExchanges(e => e + 1);
    setIsLoading(true);
    SoundEffects.tap();
    
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
      setMessages(prev => [...prev, { role: 'ai', text: '⚙️ Add API key in Settings!' }]);
      setIsLoading(false);
      return;
    }
    
    try {
      const history = messages.slice(-6).map(m => {
        if (m.role === 'action') return m.text;
        return `${m.role === 'user' ? 'Customer' : scenario.character}: ${m.text}`;
      }).join('\n');
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${scenario.systemPrompt}\n\nConversation:\n${history}\n\nCustomer: ${text}\n\nRespond as ${scenario.character} (1-2 sentences):` }] }],
            generationConfig: { temperature: 0.85, maxOutputTokens: 120 }
          })
        }
      );
      
      if (response.status === 429) {
        setMessages(prev => [...prev, { role: 'ai', text: '⏳ Un momento... (Rate limit!)' }]);
      } else {
        const data = await response.json();
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || '¿Perdón?';
        
        // Update emotion
        if (aiText.includes('!')) setCharacterEmotion('happy');
        else if (aiText.includes('?')) setCharacterEmotion('curious');
        else setCharacterEmotion('neutral');
        
        SoundEffects.message();
        setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
        speak(aiText);
        
        if (exchanges >= 6) {
          setTimeout(() => {
            SoundEffects.levelUp();
            setPhase('complete');
          }, 2000);
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Error. ¿Intentamos otra vez?' }]);
    }
    setIsLoading(false);
  };
  
  // SELECT PHASE
  if (phase === 'select') {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={onBack} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>🎭 Roleplay</h2>
          <div style={{ width: 40 }} />
        </div>
        <div style={styles.content}>
          <p style={{ color: theme.textLight, textAlign: 'center', marginBottom: 16 }}>
            Immersive conversation scenarios
          </p>
          {SCENARIOS.map(s => (
            <button
              key={s.id}
              onClick={() => { setScenario(s); setPhase('prep'); }}
              style={styles.scenarioCard}
            >
              <span style={{ fontSize: 32 }}>{s.title.split(' ')[0]}</span>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontWeight: 600 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: theme.textLight }}>{s.character} • {s.level}</div>
              </div>
              <span>→</span>
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  // PREP PHASE
  if (phase === 'prep') {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={() => setPhase('select')} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>📝 Prep</h2>
          <div style={{ width: 40 }} />
        </div>
        <div style={styles.content}>
          <div style={styles.prepCard}>
            <span style={{ fontSize: 48 }}>{scenario.title.split(' ')[0]}</span>
            <h3 style={{ margin: '12px 0 4px' }}>{scenario.title}</h3>
            <p style={{ color: theme.textLight, margin: 0 }}>With: {scenario.character}</p>
          </div>
          
          <h4 style={{ margin: '20px 0 12px' }}>Key Phrases:</h4>
          {scenario.prepPhrases.map((p, i) => (
            <div key={i} style={styles.phraseRow}>
              <div>
                <div style={{ fontWeight: 600 }}>{p.es}</div>
                <div style={{ fontSize: 13, color: theme.textLight }}>{p.en}</div>
              </div>
              <button onClick={() => speak(p.es)} style={styles.speakSmall}>🔊</button>
            </div>
          ))}
          
          <h4 style={{ margin: '20px 0 12px' }}>You can use:</h4>
          <div style={styles.itemsRow}>
            {scenario.interactiveItems.map(item => (
              <span key={item} style={styles.itemBadge}>{item}</span>
            ))}
          </div>
          
          <button onClick={startScenario} style={styles.primaryBtn}>
            Enter Scene →
          </button>
        </div>
      </div>
    );
  }
  
  // COMPLETE PHASE
  if (phase === 'complete') {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={onBack} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>Complete! 🎉</h2>
          <div style={{ width: 40 }} />
        </div>
        <div style={{ ...styles.content, textAlign: 'center' }}>
          <span style={{ fontSize: 64 }}>{scenario.title.split(' ')[0]}</span>
          <h2>Scenario Complete!</h2>
          <p style={{ color: theme.textLight }}>{exchanges} exchanges</p>
          <div style={styles.xpBadge}>+50 XP</div>
          <div style={styles.missionCard}>
            <h4 style={{ margin: '0 0 8px' }}>🎯 Real Mission</h4>
            <p style={{ margin: 0, color: theme.textLight }}>
              Try this scenario in real life this week!
            </p>
          </div>
          <button onClick={onBack} style={styles.primaryBtn}>Done</button>
        </div>
      </div>
    );
  }
  
  // PLAY PHASE
  return (
    <SceneBackground scene={scenario.scene}>
      <div style={styles.header}>
        <button onClick={() => setPhase('select')} style={styles.backBtn}>←</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <AnimatedAvatar character={scenario.characterType} emotion={characterEmotion} size={36} />
          <span style={styles.title}>{scenario.character}</span>
        </div>
        <span style={styles.badge}>{exchanges}/7</span>
      </div>
      
      {/* Interactive items */}
      <div style={styles.itemBar}>
        {scenario.interactiveItems.map(item => (
          <button
            key={item}
            onClick={() => handleItem(item)}
            style={{
              ...styles.itemBtn,
              opacity: usedItems.includes(item) ? 0.5 : 1
            }}
          >
            {item}
          </button>
        ))}
      </div>
      
      {/* Messages */}
      <div style={styles.messages}>
        {messages.map((msg, i) => (
          <div key={i}>
            {msg.role === 'action' ? (
              <div style={styles.actionMsg}>{msg.text}</div>
            ) : (
              <div style={{
                ...styles.message,
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                background: msg.role === 'user' ? theme.primary : 'rgba(255,255,255,0.95)',
                color: msg.role === 'user' ? '#fff' : theme.text
              }}>
                {msg.role === 'ai' ? <VocabHighlight text={msg.text} /> : msg.text}
                {msg.role === 'ai' && (
                  <button onClick={() => speak(msg.text)} style={styles.speakBtn}>🔊</button>
                )}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div style={{ ...styles.message, background: 'rgba(255,255,255,0.95)' }}>
            <span style={{ fontStyle: 'italic', color: theme.textLight }}>...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div style={styles.inputArea}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          placeholder="Type response..."
          style={styles.input}
        />
        <button onClick={() => handleSend()} style={styles.sendBtn}>➤</button>
      </div>
    </SceneBackground>
  );
}

const styles = {
  container: { maxWidth: 500, margin: '0 auto', minHeight: '100vh', background: theme.bg, display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' },
  header: { background: 'rgba(45,90,39,0.95)', color: '#fff', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 10 },
  title: { margin: 0, fontSize: 18, fontWeight: 600 },
  backBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' },
  badge: { background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 12, fontSize: 14 },
  content: { flex: 1, padding: 20, overflow: 'auto' },
  scenarioCard: { display: 'flex', alignItems: 'center', gap: 16, width: '100%', background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 16, marginBottom: 12, cursor: 'pointer' },
  prepCard: { background: theme.surface, borderRadius: 16, padding: 24, textAlign: 'center', border: `1px solid ${theme.border}` },
  phraseRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme.surface, padding: 12, borderRadius: 12, marginBottom: 8, border: `1px solid ${theme.border}` },
  speakSmall: { background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' },
  itemsRow: { display: 'flex', gap: 10, flexWrap: 'wrap' },
  itemBadge: { background: theme.surface, padding: '8px 14px', borderRadius: 20, border: `1px solid ${theme.border}` },
  primaryBtn: { width: '100%', background: theme.primary, color: '#fff', border: 'none', padding: 16, borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer', marginTop: 20 },
  itemBar: { display: 'flex', justifyContent: 'center', gap: 10, padding: 12, background: 'rgba(255,255,255,0.9)', position: 'relative', zIndex: 10 },
  itemBtn: { padding: '8px 14px', background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 20, cursor: 'pointer', fontSize: 14 },
  messages: { flex: 1, overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12, minHeight: 300 },
  message: { maxWidth: '85%', padding: '12px 16px', borderRadius: 16, lineHeight: 1.5, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  actionMsg: { textAlign: 'center', padding: '6px 12px', background: 'rgba(255,255,255,0.7)', borderRadius: 12, fontSize: 13, fontStyle: 'italic', color: theme.textLight },
  speakBtn: { background: 'none', border: 'none', cursor: 'pointer', marginLeft: 8, opacity: 0.7 },
  inputArea: { display: 'flex', gap: 8, padding: '12px 16px', background: 'rgba(255,255,255,0.95)', position: 'relative', zIndex: 10 },
  input: { flex: 1, padding: 12, fontSize: 16, border: `1px solid ${theme.border}`, borderRadius: 24, outline: 'none' },
  sendBtn: { width: 48, height: 48, borderRadius: '50%', background: theme.primary, color: '#fff', border: 'none', fontSize: 18, cursor: 'pointer' },
  xpBadge: { display: 'inline-block', background: '#FFD700', color: '#000', padding: '8px 20px', borderRadius: 20, fontWeight: 700, margin: '16px 0' },
  missionCard: { background: '#FEF3C7', padding: 16, borderRadius: 12, margin: '20px 0', textAlign: 'left' }
};
