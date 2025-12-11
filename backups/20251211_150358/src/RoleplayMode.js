import React, { useState, useEffect, useRef } from 'react';

const theme = { primary: '#2D5A27', primaryLight: '#4A7C43', success: '#228B22', error: '#CD5C5C', bg: '#FAFAFA', surface: '#FFF', text: '#1A1A1A', textLight: '#666', border: '#E0E0E0' };

const SCENARIOS = [
  {
    id: 'restaurant',
    icon: '🍽️',
    title: 'At the Restaurant',
    titleEs: 'En el Restaurante',
    location: 'Mexico City',
    level: 'A1-A2',
    description: 'Order food and drinks',
    unlocksAfterDay: 5,
    persona: 'Carlos',
    personaRole: 'Waiter',
    prepPhrases: [
      { es: 'Quisiera...', en: 'I would like...' },
      { es: 'La cuenta, por favor', en: 'The check, please' },
      { es: '¿Qué recomienda?', en: 'What do you recommend?' },
      { es: '¿Tiene...?', en: 'Do you have...?' }
    ],
    systemPrompt: `You are Carlos, a friendly waiter at a Mexican restaurant in Mexico City. Speak 70% Spanish, 30% English.
- Greet the customer warmly
- Offer menu items (tacos, enchiladas, agua fresca, cerveza)
- Ask about preferences and allergies
- Be patient with language mistakes
- Keep responses to 1-2 sentences
- End with the bill after 6+ exchanges
Current exchange count: {count}`
  },
  {
    id: 'hotel',
    icon: '🏨',
    title: 'Hotel Check-in',
    titleEs: 'En el Hotel',
    location: 'Barcelona',
    level: 'A1-A2',
    description: 'Check in and ask about amenities',
    unlocksAfterDay: 9,
    persona: 'Ana',
    personaRole: 'Receptionist',
    prepPhrases: [
      { es: 'Tengo una reservación', en: 'I have a reservation' },
      { es: '¿A qué hora es el desayuno?', en: 'What time is breakfast?' },
      { es: '¿Dónde está el ascensor?', en: 'Where is the elevator?' },
      { es: 'La llave, por favor', en: 'The key, please' }
    ],
    systemPrompt: `You are Ana, a professional hotel receptionist in Barcelona. Speak 70% Spanish, 30% English.
- Welcome the guest professionally
- Ask for name and reservation details
- Explain room amenities and breakfast hours
- Offer help with luggage or directions
- Keep responses to 1-2 sentences`
  },
  {
    id: 'airport',
    icon: '✈️',
    title: 'At the Airport',
    titleEs: 'En el Aeropuerto',
    location: 'Madrid',
    level: 'A2-B1',
    description: 'Check-in for your flight',
    unlocksAfterDay: 14,
    persona: 'Miguel',
    personaRole: 'Airline Agent',
    prepPhrases: [
      { es: 'Mi vuelo es a las...', en: 'My flight is at...' },
      { es: 'Ventana o pasillo', en: 'Window or aisle' },
      { es: 'Solo equipaje de mano', en: 'Only carry-on luggage' },
      { es: '¿Dónde está la puerta?', en: 'Where is the gate?' }
    ],
    systemPrompt: `You are Miguel, an airline check-in agent at Madrid airport. Speak 65% Spanish, 35% English.
- Ask for passport and booking reference
- Confirm flight details
- Ask about luggage and seat preference
- Provide gate information
- Keep responses professional but friendly`
  },
  {
    id: 'directions',
    icon: '🗺️',
    title: 'Asking Directions',
    titleEs: 'Pidiendo Direcciones',
    location: 'Seville',
    level: 'A2',
    description: 'Find your way around the city',
    unlocksAfterDay: 18,
    persona: 'Local',
    personaRole: 'Friendly Local',
    prepPhrases: [
      { es: '¿Dónde está...?', en: 'Where is...?' },
      { es: 'A la derecha/izquierda', en: 'To the right/left' },
      { es: '¿Está lejos?', en: 'Is it far?' },
      { es: 'Sigue recto', en: 'Go straight' }
    ],
    systemPrompt: `You are a friendly local in Seville giving directions. Speak 70% Spanish, 30% English.
- Ask where they want to go
- Give clear, simple directions
- Use landmarks (la plaza, la iglesia, el río)
- Offer to help more if they seem confused
- Keep directions simple: left, right, straight, blocks`
  },
  {
    id: 'doctor',
    icon: '🏥',
    title: 'Doctor Visit',
    titleEs: 'En el Médico',
    location: 'Buenos Aires',
    level: 'A2-B1',
    description: 'Describe symptoms and understand advice',
    unlocksAfterDay: 25,
    persona: 'Dra. García',
    personaRole: 'Doctor',
    prepPhrases: [
      { es: 'Me duele...', en: 'It hurts...' },
      { es: 'Tengo fiebre/tos', en: 'I have a fever/cough' },
      { es: '¿Es grave?', en: 'Is it serious?' },
      { es: '¿Necesito medicina?', en: 'Do I need medicine?' }
    ],
    systemPrompt: `You are Dra. García, a caring doctor in Buenos Aires. Speak 60% Spanish, 40% English for medical terms.
- Ask about symptoms
- Ask follow-up questions (how long, how bad)
- Give simple diagnosis
- Recommend treatment (rest, medicine, etc.)
- Be reassuring and professional`
  },
  {
    id: 'cafe',
    icon: '☕',
    title: 'Making Friends at a Café',
    titleEs: 'Haciendo Amigos',
    location: 'Bogotá',
    level: 'A1-A2',
    description: 'Have a friendly conversation',
    unlocksAfterDay: 3,
    persona: 'Sofia',
    personaRole: 'New Friend',
    prepPhrases: [
      { es: '¿De dónde eres?', en: 'Where are you from?' },
      { es: 'Me gusta...', en: 'I like...' },
      { es: '¿Qué haces?', en: 'What do you do?' },
      { es: '¿Te gusta...?', en: 'Do you like...?' }
    ],
    systemPrompt: `You are Sofia, a friendly Colombian you meet at a café. Speak 75% Spanish, 25% English.
- Introduce yourself casually
- Ask where they're from
- Ask about hobbies and interests
- Share about yourself too
- Be warm, use '¡Qué cool!' and other casual expressions`
  }
];

export default function RoleplayMode({ onBack }) {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [phase, setPhase] = useState('select'); // select, prep, chat, complete
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [exchangeCount, setExchangeCount] = useState(0);
  const messagesEndRef = useRef(null);

  // Check which scenarios are unlocked
  const getUnlockedScenarios = () => {
    const progress = JSON.parse(localStorage.getItem('fluidez_progress') || '{}');
    const completedDays = Object.keys(progress).filter(k => progress[k]?.completed).length;
    return SCENARIOS.filter(s => s.unlocksAfterDay <= completedDays || completedDays === 0);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startScenario = async () => {
    setPhase('chat');
    setMessages([]);
    setExchangeCount(0);
    
    // Get initial AI message
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
      setMessages([{ role: 'ai', text: '⚙️ Add your Gemini API key in Settings to start!' }]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: selectedScenario.systemPrompt.replace('{count}', '0') + '\n\nStart the conversation with a greeting.' }] }],
            generationConfig: { temperature: 0.8, maxOutputTokens: 100 }
          })
        }
      );
      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || '¡Hola! ¿En qué puedo ayudarte?';
      setMessages([{ role: 'ai', text: aiText, persona: selectedScenario.persona }]);
    } catch (err) {
      setMessages([{ role: 'ai', text: '¡Hola! ¿En qué puedo ayudarte?', persona: selectedScenario.persona }]);
    }
    setIsLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setExchangeCount(c => c + 1);
    setIsLoading(true);

    const apiKey = localStorage.getItem('gemini_api_key');
    try {
      const history = messages.slice(-6).map(m => 
        `${m.role === 'user' ? 'Customer' : m.persona}: ${m.text}`
      ).join('\n');

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${selectedScenario.systemPrompt.replace('{count}', String(exchangeCount + 1))}\n\nConversation so far:\n${history}\n\nCustomer: ${input}\n\nRespond as ${selectedScenario.persona}:` }] }],
            generationConfig: { temperature: 0.8, maxOutputTokens: 120 }
          })
        }
      );

      if (response.status === 429) {
        setMessages(prev => [...prev, { role: 'ai', text: '⏳ Rate limit - wait 1 minute!', persona: selectedScenario.persona }]);
      } else {
        const data = await response.json();
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || '¿Algo más?';
        setMessages(prev => [...prev, { role: 'ai', text: aiText, persona: selectedScenario.persona }]);

        // Check for scenario completion
        if (exchangeCount >= 7) {
          setTimeout(() => setPhase('complete'), 2000);
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Connection error. Try again!', persona: selectedScenario.persona }]);
    }
    setIsLoading(false);
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-MX';
    utterance.rate = 0.85;
    speechSynthesis.speak(utterance);
  };

  // Scenario selection
  if (phase === 'select') {
    const unlockedScenarios = getUnlockedScenarios();
    

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={onBack} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>Roleplay Scenarios</h2>
          <div style={{ width: 40 }} />
        </div>
        <div style={styles.content}>
          <p style={{ color: theme.textLight, marginBottom: 16, textAlign: 'center' }}>
            Practice real conversations with AI personas
          </p>
          
          {SCENARIOS.map((scenario, index) => {
            const isUnlocked = unlockedScenarios.includes(scenario) || index < 2;
            return (
              <button
                key={scenario.id}
                onClick={() => isUnlocked && (setSelectedScenario(scenario), setPhase('prep'))}
                style={{
                  ...styles.scenarioCard,
                  opacity: isUnlocked ? 1 : 0.5,
                  cursor: isUnlocked ? 'pointer' : 'not-allowed'
                }}
              >
                <span style={{ fontSize: 32 }}>{scenario.icon}</span>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <h3 style={{ margin: 0, fontSize: 16 }}>{scenario.title}</h3>
                  <p style={{ margin: '4px 0 0', fontSize: 13, color: theme.textLight }}>
                    {scenario.description}
                  </p>
                  <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                    <span style={styles.badge}>{scenario.level}</span>
                    <span style={{ fontSize: 12, color: theme.textLight }}>📍 {scenario.location}</span>
                  </div>
                </div>
                <span style={{ color: theme.textLight }}>{isUnlocked ? '→' : '🔒'}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Prep screen
  if (phase === 'prep') {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={() => setPhase('select')} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>{selectedScenario.icon} Prep</h2>
          <div style={{ width: 40 }} />
        </div>
        <div style={styles.content}>
          <div style={styles.prepCard}>
            <h3 style={{ margin: '0 0 8px' }}>{selectedScenario.title}</h3>
            <p style={{ color: theme.textLight, margin: '0 0 4px' }}>
              📍 {selectedScenario.location} • {selectedScenario.level}
            </p>
            <p style={{ color: theme.textLight, margin: 0 }}>
              You'll talk to: <strong>{selectedScenario.persona}</strong> ({selectedScenario.personaRole})
            </p>
          </div>

          <h4 style={{ margin: '24px 0 12px' }}>📝 Key Phrases</h4>
          <div style={styles.phraseList}>
            {selectedScenario.prepPhrases.map((phrase, i) => (
              <div key={i} style={styles.phraseItem}>
                <div>
                  <div style={{ fontWeight: 600 }}>{phrase.es}</div>
                  <div style={{ fontSize: 13, color: theme.textLight }}>{phrase.en}</div>
                </div>
                <button onClick={() => speak(phrase.es)} style={styles.speakSmall}>🔊</button>
              </div>
            ))}
          </div>

          <button onClick={startScenario} style={styles.primaryBtn}>
            Start Conversation →
          </button>
        </div>
      </div>
    );
  }

  // Complete screen
  if (phase === 'complete') {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={onBack} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>Scenario Complete! 🎉</h2>
          <div style={{ width: 40 }} />
        </div>
        <div style={{ ...styles.content, textAlign: 'center', paddingTop: 40 }}>
          <div style={{ fontSize: 64 }}>{selectedScenario.icon}</div>
          <h2 style={{ margin: '16px 0 8px' }}>{selectedScenario.title}</h2>
          <p style={{ color: theme.textLight }}>
            {exchangeCount} exchanges completed
          </p>
          <div style={styles.xpBadge}>+50 XP</div>

          <div style={styles.missionCard}>
            <h4 style={{ margin: '0 0 8px' }}>🎯 Real-World Mission</h4>
            <p style={{ margin: 0, color: theme.textLight }}>
              {selectedScenario.id === 'restaurant' && 'Try ordering something in Spanish at a real restaurant!'}
              {selectedScenario.id === 'hotel' && 'Practice saying "Tengo una reservación" next time you check in!'}
              {selectedScenario.id === 'cafe' && 'Start a conversation with someone new in Spanish!'}
              {selectedScenario.id === 'directions' && 'Ask for directions in Spanish next time you\'re out!'}
              {selectedScenario.id === 'airport' && 'Try speaking Spanish at your next flight check-in!'}
              {selectedScenario.id === 'doctor' && 'Learn body parts vocabulary for your next visit!'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setPhase('prep')} style={{ ...styles.secondaryBtn, flex: 1 }}>
              Practice Again
            </button>
            <button onClick={onBack} style={{ ...styles.primaryBtn, flex: 1 }}>
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Chat screen
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => setPhase('select')} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>{selectedScenario.icon} {selectedScenario.persona}</h2>
        <span style={styles.badge}>{exchangeCount}/8</span>
      </div>

      <div style={styles.messages}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            ...styles.message,
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            background: msg.role === 'user' ? theme.primary : theme.surface,
            color: msg.role === 'user' ? '#fff' : theme.text
          }}>
            {msg.role === 'ai' && <span style={styles.personaTag}>{msg.persona}</span>}
            {msg.text}
            {msg.role === 'ai' && (
              <button onClick={() => speak(msg.text)} style={styles.speakBtn}>🔊</button>
            )}
          </div>
        ))}
        {isLoading && (
          <div style={{ ...styles.message, background: theme.surface }}>
            <span style={{ fontStyle: 'italic', color: theme.textLight }}>
              {selectedScenario.persona} is typing...
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={styles.inputArea}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your response..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.sendBtn}>➤</button>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 500, margin: '0 auto', minHeight: '100vh', background: theme.bg, display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  header: { background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`, color: '#fff', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  title: { margin: 0, fontSize: 18 },
  backBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' },
  content: { flex: 1, padding: 20, overflow: 'auto' },
  scenarioCard: { display: 'flex', alignItems: 'center', gap: 16, width: '100%', background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 16, marginBottom: 12, textAlign: 'left' },
  badge: { background: theme.bg, padding: '3px 10px', borderRadius: 8, fontSize: 11, color: theme.primary, fontWeight: 600 },
  prepCard: { background: theme.surface, borderRadius: 16, padding: 20, border: `1px solid ${theme.border}` },
  phraseList: { display: 'flex', flexDirection: 'column', gap: 8 },
  phraseItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme.surface, padding: 12, borderRadius: 12, border: `1px solid ${theme.border}` },
  speakSmall: { background: 'none', border: 'none', fontSize: 18, cursor: 'pointer' },
  messages: { flex: 1, overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 },
  message: { maxWidth: '80%', padding: '12px 16px', borderRadius: 16, position: 'relative' },
  personaTag: { display: 'block', fontSize: 11, color: theme.primary, fontWeight: 600, marginBottom: 4 },
  speakBtn: { background: 'none', border: 'none', cursor: 'pointer', marginLeft: 8, opacity: 0.7 },
  inputArea: { display: 'flex', gap: 8, padding: '12px 16px', background: theme.surface, borderTop: `1px solid ${theme.border}` },
  input: { flex: 1, padding: 12, fontSize: 16, border: `1px solid ${theme.border}`, borderRadius: 24, outline: 'none' },
  sendBtn: { width: 48, height: 48, borderRadius: '50%', background: theme.primary, color: '#fff', border: 'none', fontSize: 18, cursor: 'pointer' },
  primaryBtn: { width: '100%', background: theme.primary, color: '#fff', border: 'none', padding: 16, borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer', marginTop: 24 },
  secondaryBtn: { background: 'transparent', border: `2px solid ${theme.primary}`, color: theme.primary, padding: 14, borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer' },
  xpBadge: { display: 'inline-block', background: '#FFD700', color: '#000', padding: '8px 20px', borderRadius: 20, fontWeight: 700, marginTop: 16 },
  missionCard: { background: '#FEF3C7', padding: 16, borderRadius: 12, margin: '24px 0', textAlign: 'left' }
};
