import React, { useState, useEffect, useRef } from 'react';

const theme = { primary: '#2D5A27', primaryLight: '#4A7C43', bg: '#FAFAFA', surface: '#FFF', text: '#1A1A1A', textLight: '#666', border: '#E0E0E0' };

const SCENARIOS = [
  { id: 'restaurant', icon: '🍽️', title: 'En el Restaurante', subtitle: 'Order food and drinks', level: 'A1-A2', setting: 'Mexican restaurant in Mexico City', aiRole: 'Carlos (waiter)', prompt: 'You are Carlos, a friendly Mexican waiter at a restaurant in Mexico City. Speak 80% Spanish, 20% English. Be warm and helpful. Keep responses to 1-2 sentences. Help the customer order food and drinks.' },
  { id: 'airport', icon: '✈️', title: 'En el Aeropuerto', subtitle: 'Check in for your flight', level: 'A2-B1', setting: 'Madrid International Airport', aiRole: 'Airline agent', prompt: 'You are an airline agent at Madrid airport. Speak 75% Spanish, 25% English. Be professional and efficient. Help the passenger check in, handle luggage, and find their gate.' },
  { id: 'hotel', icon: '🏨', title: 'En el Hotel', subtitle: 'Check into your room', level: 'A1-A2', setting: 'Boutique hotel in Barcelona', aiRole: 'Ana (receptionist)', prompt: 'You are Ana, a friendly hotel receptionist in Barcelona. Speak 80% Spanish, 20% English. Be welcoming. Help the guest check in, explain amenities, and answer questions about the room.' },
  { id: 'shopping', icon: '🛍️', title: 'De Compras', subtitle: 'Shop for clothes', level: 'A1-A2', setting: 'Clothing store in Buenos Aires', aiRole: 'Diego (shop assistant)', prompt: 'You are Diego, a helpful shop assistant in Buenos Aires. Use some Argentine expressions. Speak 80% Spanish, 20% English. Help the customer find clothes, sizes, and prices.' },
  { id: 'doctor', icon: '🏥', title: 'En el Médico', subtitle: 'Describe your symptoms', level: 'A2-B1', setting: 'Medical clinic', aiRole: 'Doctor', prompt: 'You are a caring doctor at a clinic. Speak 70% Spanish, 30% English. Be reassuring. Ask about symptoms, give a diagnosis, and explain treatment.' },
  { id: 'directions', icon: '🗺️', title: 'Pidiendo Direcciones', subtitle: 'Find your way around', level: 'A2', setting: 'Streets of Seville', aiRole: 'Helpful local', prompt: 'You are a friendly local in Seville. Speak 75% Spanish, 25% English. Give clear directions using words like izquierda, derecha, recto, cerca, lejos.' }
];

export default function RoleplayMode({ onBack }) {
  const [scenario, setScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const messagesEnd = useRef(null);

  useEffect(() => { messagesEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const startScenario = async (s) => {
    setScenario(s);
    setMessages([]);
    setComplete(false);
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) { alert('Please add your Gemini API key in AI Practice first'); return; }
    setLoading(true);
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: `${s.prompt}\n\nStart the roleplay by greeting the customer in character. Keep it to 1-2 sentences.` }] }], generationConfig: { temperature: 0.8, maxOutputTokens: 150 } })
      });
      if (res.status === 429) { alert('⏳ Rate limit reached - please wait 1 minute'); setScenario(null); setLoading(false); return; }
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '¡Hola! Bienvenido. ¿En qué puedo ayudarte?';
      setMessages([{ role: 'ai', text }]);
    } catch (e) { 
      console.error(e);
      setMessages([{ role: 'ai', text: '¡Hola! Bienvenido. ¿En qué puedo ayudarte?' }]); 
    }
    setLoading(false);
  };

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(m => [...m, { role: 'user', text: userMsg }]);
    setLoading(true);
    const apiKey = localStorage.getItem('gemini_api_key');
    const history = messages.map(m => `${m.role === 'ai' ? 'Assistant' : 'User'}: ${m.text}`).join('\n');
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: `${scenario.prompt}\n\nConversation so far:\n${history}\nUser: ${userMsg}\n\nContinue the roleplay naturally. Stay in character. 1-2 sentences.` }] }], generationConfig: { temperature: 0.8, maxOutputTokens: 150 } })
      });
      if (res.status === 429) { 
        setMessages(m => [...m, { role: 'system', text: '⏳ Rate limit - wait 1 minute' }]); 
        setLoading(false); 
        return; 
      }
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Lo siento, ¿puedes repetir?';
      setMessages(m => [...m, { role: 'ai', text }]);
      if (messages.length >= 7) setTimeout(() => setComplete(true), 2000);
    } catch (e) { 
      console.error(e);
      setMessages(m => [...m, { role: 'ai', text: 'Lo siento, ¿puedes repetir?' }]); 
    }
    setLoading(false);
  };

  // Scenario selection screen
  if (!scenario) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={onBack} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>Roleplay Scenarios</h2>
          <div style={{ width: 40 }} />
        </div>
        <div style={styles.content}>
          <p style={{ textAlign: 'center', color: theme.textLight, marginBottom: 20 }}>Practice real-world conversations</p>
          <div style={styles.scenarioGrid}>
            {SCENARIOS.map(s => (
              <button key={s.id} onClick={() => startScenario(s)} style={styles.scenarioCard}>
                <span style={{ fontSize: 32 }}>{s.icon}</span>
                <h3 style={{ margin: '8px 0 4px', fontSize: 14, fontWeight: 600 }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: 12, color: theme.textLight }}>{s.subtitle}</p>
                <span style={styles.levelBadge}>{s.level}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Completion screen
  if (complete) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={() => setScenario(null)} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>¡Completado!</h2>
          <div style={{ width: 40 }} />
        </div>
        <div style={{ ...styles.content, textAlign: 'center', paddingTop: 40 }}>
          <div style={{ fontSize: 64 }}>🎉</div>
          <h2 style={{ margin: '16px 0 8px' }}>¡Excelente trabajo!</h2>
          <p style={{ color: theme.textLight }}>You completed: {scenario.title}</p>
          <div style={styles.xpBadge}>+50 XP</div>
          <button onClick={() => setScenario(null)} style={styles.primaryBtn}>Try Another Scenario</button>
        </div>
      </div>
    );
  }

  // Chat screen
  return (
    <div style={{ ...styles.container, display: 'flex', flexDirection: 'column' }}>
      <div style={styles.header}>
        <button onClick={() => setScenario(null)} style={styles.backBtn}>←</button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 14 }}>{scenario.icon} {scenario.title}</div>
          <div style={{ fontSize: 11, opacity: 0.8 }}>Speaking with: {scenario.aiRole}</div>
        </div>
        <div style={{ width: 40 }} />
      </div>
      <div style={styles.chatArea}>
        <div style={styles.settingBadge}>📍 {scenario.setting}</div>
        {messages.map((m, i) => (
          <div key={i} style={{ ...styles.bubble, ...(m.role === 'user' ? styles.userBubble : styles.aiBubble) }}>
            {m.text}
          </div>
        ))}
        {loading && <div style={styles.aiBubble}>...</div>}
        <div ref={messagesEnd} />
      </div>
      <div style={styles.inputArea}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && send()}
          placeholder="Respond in Spanish..."
          disabled={loading}
          style={styles.input}
        />
        <button onClick={send} disabled={!input.trim() || loading} style={styles.sendBtn}>→</button>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 500, margin: '0 auto', minHeight: '100vh', background: theme.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  header: { background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`, color: '#fff', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  title: { margin: 0, fontSize: 18 },
  backBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', padding: 0 },
  content: { padding: 20 },
  scenarioGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  scenarioCard: { background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 16, textAlign: 'center', cursor: 'pointer' },
  levelBadge: { display: 'inline-block', marginTop: 8, padding: '2px 8px', background: theme.bg, borderRadius: 10, fontSize: 10, color: theme.textLight },
  xpBadge: { display: 'inline-block', background: '#FFD700', color: '#000', padding: '8px 20px', borderRadius: 20, fontWeight: 700, marginTop: 16, marginBottom: 24 },
  primaryBtn: { display: 'block', width: '100%', background: theme.primary, color: '#fff', border: 'none', padding: '14px 24px', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer' },
  chatArea: { flex: 1, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 },
  settingBadge: { alignSelf: 'center', background: theme.surface, padding: '6px 14px', borderRadius: 16, fontSize: 12, color: theme.textLight, marginBottom: 8 },
  bubble: { maxWidth: '80%', padding: 12, borderRadius: 16, fontSize: 15, lineHeight: 1.4 },
  userBubble: { alignSelf: 'flex-end', background: theme.primary, color: '#fff', borderBottomRightRadius: 4 },
  aiBubble: { alignSelf: 'flex-start', background: theme.surface, color: theme.text, borderBottomLeftRadius: 4, boxShadow: '0 1px 2px rgba(0,0,0,0.1)' },
  inputArea: { display: 'flex', gap: 10, padding: 16, background: theme.surface, borderTop: `1px solid ${theme.border}` },
  input: { flex: 1, padding: 12, fontSize: 16, border: `2px solid ${theme.border}`, borderRadius: 24, outline: 'none' },
  sendBtn: { width: 48, height: 48, borderRadius: '50%', background: theme.primary, color: '#fff', border: 'none', fontSize: 20, cursor: 'pointer' }
};
