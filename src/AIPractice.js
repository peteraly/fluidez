import React, { useState, useEffect } from 'react';
import { ProgressStorage, VocabularyStorage, MistakesStorage } from './services/storage';
import { useSound } from './hooks/useSound';
import { Confetti, useConfetti } from './components/Confetti';

const theme = {
  primary: '#2D5A27', primaryLight: '#4A7C43', success: '#228B22',
  error: '#CD5C5C', bg: '#FAFAFA', surface: '#FFF',
  text: '#1A1A1A', textLight: '#666', border: '#E0E0E0'
};

// María's system prompt
function buildMariaPrompt(dayData, userProgress) {
  const weakAreas = MistakesStorage.getWeakAreas();
  const vocab = VocabularyStorage.get();
  
  return `You are María, a warm and encouraging Spanish tutor from Mexico City. You have a friendly, playful personality and genuinely care about your student's progress.

STUDENT CONTEXT:
- Level: ${dayData.level || 'A1'}
- Words learned: ${vocab.summary?.total || 0}
- Current streak: ${userProgress?.streak?.current || 0} days
- Weak areas: ${weakAreas.map(w => w.type).join(', ') || 'None identified'}

CURRENT LESSON:
- Topic: ${dayData.title}
- Description: ${dayData.subtitle || ''}

YOUR PERSONALITY:
- Warm and encouraging - celebrate every success!
- Use "¡Muy bien!" "¡Excelente!" "¡Así se hace!" naturally
- Mix Spanish (70%) with English explanations (30%) for A1-A2
- Correct mistakes gently by modeling the right form
- Add relevant cultural notes when appropriate
- Keep responses conversational (1-3 sentences)

Generate exercises that are:
1. Practical and useful in real conversations
2. Matched exactly to ${dayData.level || 'A1'} level
3. Focused on "${dayData.title}"
4. Fun and engaging

Return ONLY valid JSON array with exercises. No other text.`;
}

function ApiKeySettings({ onSave, onCancel, currentKey }) {
  const [key, setKey] = useState(currentKey || '');
  const [showKey, setShowKey] = useState(false);

  return (
    <div style={s.container}>
      <div style={s.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onCancel} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>←</button>
          <h2 style={{ margin: 0, fontSize: 18 }}>API Key Settings</h2>
        </div>
      </div>
      <div style={s.content}>
        <div style={s.card}>
          <h3 style={{ margin: '0 0 16px' }}>🔑 Google Gemini API Key</h3>
          <p style={{ color: theme.textLight, marginBottom: 16, fontSize: 14, lineHeight: 1.6 }}>
            AI Practice uses Google's Gemini API (free tier). Get your free API key:
          </p>
          <ol style={{ margin: '0 0 20px', paddingLeft: 20, color: theme.textLight, fontSize: 14, lineHeight: 1.8 }}>
            <li>Go to <strong>aistudio.google.com/apikey</strong></li>
            <li>Sign in with Google</li>
            <li>Click "Create API Key"</li>
            <li>Copy and paste below</li>
          </ol>
          
          <div style={{ position: 'relative' }}>
            <input
              type={showKey ? 'text' : 'password'}
              value={key}
              onChange={e => setKey(e.target.value)}
              placeholder="Paste your API key here..."
              style={{ ...s.input, paddingRight: 50 }}
            />
            <button
              onClick={() => setShowKey(!showKey)}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
            >
              {showKey ? '🙈' : '👁️'}
            </button>
          </div>
          
          <button 
            onClick={() => onSave(key)} 
            disabled={!key.trim()}
            style={{ ...s.btn, opacity: key.trim() ? 1 : 0.5 }}
          >
            Save API Key
          </button>
          
          {currentKey && (
            <button 
              onClick={() => { localStorage.removeItem('gemini_api_key'); onSave(''); }}
              style={{ ...s.btnSec, color: theme.error, borderColor: theme.error, marginTop: 12 }}
            >
              Remove Saved Key
            </button>
          )}
        </div>
        
        <div style={{ ...s.card, background: '#E8F5E9', border: `1px solid ${theme.success}` }}>
          <h4 style={{ margin: '0 0 8px', color: theme.primary }}>✨ Free Tier Includes:</h4>
          <ul style={{ margin: 0, paddingLeft: 20, color: theme.text, fontSize: 14 }}>
            <li>1 million tokens per day</li>
            <li>15 requests per minute</li>
            <li>No credit card required</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function AIPractice({ dayData, onBack }) {
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(false);
  const [userProgress, setUserProgress] = useState(null);
  
  const { playCorrect, playIncorrect, playComplete } = useSound();
  const { active: confettiActive, trigger: triggerConfetti } = useConfetti();

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) setApiKey(savedKey);
    setUserProgress(ProgressStorage.get());
  }, []);

  const saveApiKey = (key) => {
    if (key) {
      localStorage.setItem('gemini_api_key', key);
      setApiKey(key);
    } else {
      setApiKey('');
    }
    setShowSettings(false);
  };

  const generate = async () => {
    if (!apiKey) {
      setShowSettings(true);
      return;
    }

    setLoading(true);
    setError(null);
    setExercises([]);
    setIdx(0);
    setResult(null);
    setAnswer('');
    setDone(false);

    const vocab = Array.isArray(dayData.vocabulary) ? dayData.vocabulary.join(', ') : 'basic vocabulary';
    const grammarInfo = dayData.grammar?.content || 'general practice';

    const prompt = `${buildMariaPrompt(dayData, userProgress)}

VOCABULARY TO USE: ${vocab}
GRAMMAR FOCUS: ${grammarInfo}

Generate exactly 5 exercises mixing these types:
- multiple_choice (4 options)
- fill_blank (sentence with ___)
- translate_to_es (English → Spanish)
- translate_to_en (Spanish → English)

Return JSON array only:
[{"type":"multiple_choice","question":"¿Cómo se dice 'hello'?","options":["Hola","Adiós","Gracias","Por favor"],"answer":"Hola","hint":"The most common greeting","explanation":"¡Muy bien! 'Hola' is the universal Spanish greeting 👋"}]`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 2000 }
          })
        }
      );

      const data = await res.json();
      
      if (data.error) {
        if (data.error.code === 429) {
          throw new Error('Rate limit reached. Please wait 1 minute and try again.');
        }
        throw new Error(data.error.message || 'API request failed');
      }

      let json = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
      if (json.startsWith('```')) {
        json = json.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
      }
      
      const parsed = JSON.parse(json);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('Invalid exercise format');
      }
      
      setExercises(parsed);
      ProgressStorage.updateStreak();
      ProgressStorage.incrementSession();
    } catch (err) {
      setError(err.message || 'Failed to generate exercises');
    } finally {
      setLoading(false);
    }
  };

  const check = () => {
    const ex = exercises[idx];
    const userAns = answer.trim().toLowerCase();
    const correct = ex.answer.toLowerCase().trim();
    const isCorrect = userAns === correct || correct.includes(userAns) || userAns.includes(correct);
    
    setResult({ correct: isCorrect, explanation: ex.explanation });
    
    if (isCorrect) {
      playCorrect();
      setScore(sc => sc + 1);
      ProgressStorage.addXP(10);
    } else {
      playIncorrect();
      MistakesStorage.record(ex.type, { question: ex.question, userAnswer: answer, correct: ex.answer });
    }
    setTotal(t => t + 1);
  };

  const next = () => {
    if (idx < exercises.length - 1) {
      setIdx(i => i + 1);
      setAnswer('');
      setResult(null);
    } else {
      setDone(true);
      playComplete();
      if (score >= 4) triggerConfetti();
      ProgressStorage.addXP(25); // Completion bonus
    }
  };

  if (showSettings) {
    return <ApiKeySettings onSave={saveApiKey} onCancel={() => setShowSettings(false)} currentKey={apiKey} />;
  }

  if (loading) {
    return (
      <div style={s.container}>
        <div style={s.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>←</button>
            <h2 style={{ margin: 0, fontSize: 18 }}>AI Practice</h2>
          </div>
        </div>
        <div style={{ ...s.content, textAlign: 'center', paddingTop: 60 }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🤖</div>
          <div style={{ width: 40, height: 40, border: '4px solid #E0E0E0', borderTopColor: theme.primary, borderRadius: '50%', margin: '0 auto 20px', animation: 'spin 1s linear infinite' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: theme.textLight }}>María is creating exercises on</p>
          <p style={{ fontWeight: 600 }}>{dayData.title}...</p>
        </div>
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div style={s.container}>
        <div style={s.header}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>←</button>
            <h2 style={{ margin: 0, fontSize: 18 }}>AI Practice</h2>
            <button onClick={() => setShowSettings(true)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>⚙️</button>
          </div>
        </div>
        <div style={s.content}>
          <div style={{ ...s.card, textAlign: 'center' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>👩‍🏫</div>
            <h2 style={{ margin: '0 0 8px' }}>Practice with María</h2>
            <p style={{ color: theme.textLight, marginBottom: 16 }}>Your AI Spanish tutor</p>
            <div style={{ ...s.badge, marginBottom: 16 }}>{dayData.level || 'A1'}</div>
            <p style={{ color: theme.textLight, marginBottom: 8 }}>Today's topic:</p>
            <h3 style={{ color: theme.primary, margin: '0 0 8px' }}>{dayData.title}</h3>
            <p style={{ fontSize: 14, color: theme.textLight, marginBottom: 20 }}>{dayData.subtitle}</p>
            
            {error && (
              <div style={{ background: '#FFEBEE', padding: 16, borderRadius: 12, marginBottom: 16, color: theme.error, textAlign: 'left' }}>
                <strong>Error:</strong> {error}
              </div>
            )}
            
            {!apiKey ? (
              <button onClick={() => setShowSettings(true)} style={s.btn}>⚙️ Add API Key (Free)</button>
            ) : (
              <button onClick={generate} style={s.btn}>✨ Start Practice</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (done) {
    const pct = Math.round((score / exercises.length) * 100);
    return (
      <div style={s.container}>
        <Confetti active={confettiActive} />
        <div style={s.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>←</button>
            <h2 style={{ margin: 0, fontSize: 18 }}>Complete!</h2>
          </div>
        </div>
        <div style={s.content}>
          <div style={{ ...s.card, textAlign: 'center' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>{pct >= 80 ? '🏆' : pct >= 60 ? '👏' : '💪'}</div>
            <h2 style={{ margin: '0 0 8px' }}>
              {pct >= 80 ? '¡Excelente!' : pct >= 60 ? '¡Muy bien!' : '¡Buen esfuerzo!'}
            </h2>
            <p style={{ color: theme.textLight, marginBottom: 16 }}>
              {pct >= 80 ? 'María is proud of you!' : pct >= 60 ? 'Keep practicing!' : "You're improving!"}
            </p>
            <div style={{ fontSize: 48, fontWeight: 700, color: theme.primary }}>{score}/{exercises.length}</div>
            <p style={{ color: theme.textLight }}>{pct}% correct</p>
            <div style={{ background: '#E8F5E9', padding: 12, borderRadius: 8, margin: '16px 0' }}>
              <span style={{ color: theme.success, fontWeight: 600 }}>+{25 + score * 10} XP earned!</span>
            </div>
            <button onClick={() => { setScore(0); setTotal(0); generate(); }} style={s.btn}>🔄 Practice More</button>
            <button onClick={onBack} style={s.btnSec}>← Back to Lesson</button>
          </div>
        </div>
      </div>
    );
  }

  const ex = exercises[idx];
  return (
    <div style={s.container}>
      <div style={s.header}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>←</button>
          <span style={{ fontWeight: 600 }}>{dayData.title}</span>
          <span style={{ ...s.badge, background: 'rgba(255,255,255,0.2)' }}>{idx + 1}/{exercises.length}</span>
        </div>
        <div style={{ ...s.progress, marginTop: 12, marginBottom: 0 }}>
          <div style={{ ...s.progressFill, width: `${((idx + 1) / exercises.length) * 100}%` }} />
        </div>
      </div>
      <div style={s.content}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <span style={{ color: theme.textLight }}>Score: {score}/{total}</span>
          <span style={{ ...s.badge, background: ex.type === 'multiple_choice' ? '#3B82F6' : '#8B5CF6' }}>{ex.type.replace(/_/g, ' ')}</span>
        </div>
        <div style={s.card}>
          <h3 style={{ margin: '0 0 20px', lineHeight: 1.5 }}>{ex.question}</h3>
          {ex.type === 'multiple_choice' && ex.options ? (
            ex.options.map((opt, i) => (
              <button key={i} onClick={() => !result && setAnswer(opt)} disabled={result !== null}
                style={{ ...s.opt, borderColor: result ? (opt.toLowerCase() === ex.answer.toLowerCase() ? theme.success : (opt === answer ? theme.error : theme.border)) : (opt === answer ? theme.primary : theme.border), background: result ? (opt.toLowerCase() === ex.answer.toLowerCase() ? '#E8F5E9' : (opt === answer && opt.toLowerCase() !== ex.answer.toLowerCase() ? '#FFEBEE' : '#fff')) : (opt === answer ? '#E8F5E9' : '#fff') }}>
                {opt}
              </button>
            ))
          ) : (
            <div>
              <input type="text" value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Type your answer..." disabled={result !== null}
                style={{ ...s.input, borderColor: result ? (result.correct ? theme.success : theme.error) : theme.border }}
                onKeyPress={e => { if (e.key === 'Enter' && answer.trim() && !result) check(); }} />
              {!result && ex.hint && <p style={{ fontSize: 13, color: theme.textLight, marginTop: 12 }}>💡 {ex.hint}</p>}
            </div>
          )}
          {!result ? (
            <button onClick={check} disabled={!answer.trim()} style={{ ...s.btn, opacity: answer.trim() ? 1 : 0.5 }}>Check Answer</button>
          ) : (
            <>
              <div style={{ marginTop: 20, padding: 16, borderRadius: 12, background: result.correct ? '#E8F5E9' : '#FFEBEE' }}>
                <strong style={{ color: result.correct ? theme.success : theme.error }}>{result.correct ? '✅ ¡Correcto!' : '❌ Casi...'}</strong>
                {!result.correct && <p style={{ margin: '8px 0 0', fontWeight: 600 }}>Answer: {ex.answer}</p>}
                <p style={{ margin: '8px 0 0', color: theme.textLight, fontSize: 14 }}>{result.explanation}</p>
              </div>
              <button onClick={next} style={s.btn}>{idx < exercises.length - 1 ? 'Next →' : 'See Results'}</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const s = {
  container: { maxWidth: 500, margin: '0 auto', minHeight: '100vh', background: theme.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  header: { background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`, color: '#fff', padding: '20px 24px', position: 'sticky', top: 0, zIndex: 100 },
  content: { padding: 20 },
  card: { background: theme.surface, borderRadius: 16, padding: 20, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: `1px solid ${theme.border}` },
  btn: { background: theme.primary, color: '#fff', border: 'none', padding: '14px 24px', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer', width: '100%', marginTop: 12 },
  btnSec: { background: 'transparent', color: theme.primary, border: `2px solid ${theme.primary}`, padding: '12px 20px', borderRadius: 12, fontSize: 16, cursor: 'pointer', width: '100%', marginTop: 8 },
  input: { width: '100%', padding: 16, fontSize: 16, borderRadius: 12, border: `2px solid ${theme.border}`, boxSizing: 'border-box', outline: 'none' },
  opt: { display: 'block', width: '100%', padding: 16, marginBottom: 10, border: `2px solid ${theme.border}`, borderRadius: 12, background: '#fff', cursor: 'pointer', textAlign: 'left', fontSize: 16 },
  badge: { display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: theme.primaryLight, color: '#fff' },
  progress: { height: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', background: '#fff', transition: 'width 0.3s ease' }
};

export default AIPractice;
