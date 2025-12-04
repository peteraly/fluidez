import React, { useState, useEffect } from 'react';

const theme = {
  primary: '#2D5A27', primaryLight: '#4A7C43', success: '#228B22',
  error: '#CD5C5C', bg: '#FAFAFA', surface: '#FFF',
  text: '#1A1A1A', textLight: '#666', border: '#E0E0E0'
};

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
  progress: { height: 8, background: theme.border, borderRadius: 4, overflow: 'hidden', marginBottom: 20 },
  progressFill: { height: '100%', background: theme.success, transition: 'width 0.3s ease' }
};

// ============================================================================
// API KEY SETTINGS COMPONENT
// ============================================================================
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
        
        <div style={{ ...s.card, background: '#FFF9E6', border: '1px solid #DAA520' }}>
          <h4 style={{ margin: '0 0 8px' }}>🔒 Your key is stored locally</h4>
          <p style={{ margin: 0, fontSize: 13, color: theme.textLight }}>
            Your API key is saved only on this device and never sent to our servers.
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN AI PRACTICE COMPONENT
// ============================================================================
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

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) setApiKey(savedKey);
  }, []);

  // Save API key
  const saveApiKey = (key) => {
    if (key) {
      localStorage.setItem('gemini_api_key', key);
      setApiKey(key);
    } else {
      setApiKey('');
    }
    setShowSettings(false);
  };

  // Generate exercises using Gemini API
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
    const grammarTip = dayData.grammar?.tip || '';

    const prompt = `You are a Spanish tutor. Generate exactly 5 exercises for a student learning:

Topic: ${dayData.title}
Level: ${dayData.level || 'A1'}
Description: ${dayData.subtitle || ''}
Grammar: ${grammarInfo}
Tip: ${grammarTip}
Vocabulary: ${vocab}

Mix these types:
- multiple_choice (4 options, answer must be one of the options exactly)
- fill_blank (sentence with ___ to fill)
- translate_to_es (English to Spanish)
- translate_to_en (Spanish to English)

Requirements:
- Match ${dayData.level || 'A1'} difficulty exactly
- Focus specifically on "${dayData.title}"
- Use the vocabulary words provided
- Make practical, conversational exercises
- For multiple_choice, the "answer" field must exactly match one of the options

Return ONLY a valid JSON array with NO other text or markdown:
[{"type":"multiple_choice","question":"What does 'hola' mean?","options":["hello","goodbye","please","thanks"],"answer":"hello","hint":"Common greeting","explanation":"Hola is the standard Spanish greeting."}]`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2000
            }
          })
        }
      );

      const data = await res.json();
      
      if (data.error) {
        if (data.error.code === 400 || data.error.code === 403) {
          throw new Error('Invalid API key. Please check your key in settings.');
        }
        throw new Error(data.error.message || 'API request failed');
      }

      if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
        throw new Error('No response from API');
      }

      let json = data.candidates[0].content.parts[0].text.trim();
      
      // Clean up response - remove markdown code blocks if present
      if (json.startsWith('```')) {
        json = json.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
      }
      
      const parsed = JSON.parse(json);
      
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('Invalid exercise format received');
      }
      
      setExercises(parsed);
    } catch (err) {
      console.error('Gemini API Error:', err);
      if (err.message.includes('API key')) {
        setError(err.message);
      } else if (err.name === 'SyntaxError') {
        setError('Failed to parse exercises. Please try again.');
      } else {
        setError(err.message || 'Failed to generate exercises');
      }
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
    if (isCorrect) setScore(sc => sc + 1);
    setTotal(t => t + 1);
  };

  const next = () => {
    if (idx < exercises.length - 1) {
      setIdx(i => i + 1);
      setAnswer('');
      setResult(null);
    } else {
      setDone(true);
    }
  };

  // Show settings screen
  if (showSettings) {
    return <ApiKeySettings onSave={saveApiKey} onCancel={() => setShowSettings(false)} currentKey={apiKey} />;
  }

  // Loading
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
          <p style={{ color: theme.textLight }}>Generating exercises on</p>
          <p style={{ fontWeight: 600 }}>{dayData.title}...</p>
        </div>
      </div>
    );
  }

  // Start screen
  if (exercises.length === 0) {
    return (
      <div style={s.container}>
        <div style={s.header}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>←</button>
            <h2 style={{ margin: 0, fontSize: 18 }}>AI Practice</h2>
            <button onClick={() => setShowSettings(true)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>⚙️</button>
          </div>
        </div>
        <div style={s.content}>
          <div style={{ ...s.card, textAlign: 'center' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🤖</div>
            <h2 style={{ margin: '0 0 8px' }}>Unlimited AI Practice</h2>
            <div style={{ ...s.badge, marginBottom: 16 }}>{dayData.level || 'A1'}</div>
            <p style={{ color: theme.textLight, marginBottom: 8 }}>Generate exercises on:</p>
            <h3 style={{ color: theme.primary, margin: '0 0 8px' }}>{dayData.title}</h3>
            <p style={{ fontSize: 14, color: theme.textLight, marginBottom: 20 }}>{dayData.subtitle}</p>
            
            {error && (
              <div style={{ background: '#FFEBEE', padding: 16, borderRadius: 12, marginBottom: 16, color: theme.error, textAlign: 'left' }}>
                <strong>Error:</strong> {error}
                {error.includes('API key') && (
                  <button onClick={() => setShowSettings(true)} style={{ ...s.btnSec, marginTop: 12 }}>
                    ⚙️ Check API Key Settings
                  </button>
                )}
              </div>
            )}
            
            {!apiKey ? (
              <>
                <div style={{ background: '#FFF9E6', padding: 16, borderRadius: 12, marginBottom: 16, textAlign: 'left' }}>
                  <strong>🔑 API Key Required</strong>
                  <p style={{ margin: '8px 0 0', fontSize: 14, color: theme.textLight }}>
                    Add your free Google Gemini API key to generate exercises.
                  </p>
                </div>
                <button onClick={() => setShowSettings(true)} style={s.btn}>
                  ⚙️ Add API Key (Free)
                </button>
              </>
            ) : (
              <button onClick={generate} style={s.btn}>✨ Generate 5 Exercises</button>
            )}
          </div>
          
          <div style={{ ...s.card, background: '#F5F5F5' }}>
            <h4 style={{ margin: '0 0 12px' }}>📝 Exercise types:</h4>
            <ul style={{ margin: 0, paddingLeft: 20, color: theme.textLight }}>
              <li>Multiple choice</li>
              <li>Fill in the blank</li>
              <li>Translate to Spanish</li>
              <li>Translate to English</li>
            </ul>
          </div>
          
          {apiKey && (
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <button onClick={() => setShowSettings(true)} style={{ background: 'none', border: 'none', color: theme.textLight, cursor: 'pointer', fontSize: 13 }}>
                ⚙️ API Key Settings
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Complete
  if (done) {
    const pct = Math.round((score / exercises.length) * 100);
    return (
      <div style={s.container}>
        <div style={s.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>←</button>
            <h2 style={{ margin: 0, fontSize: 18 }}>Complete!</h2>
          </div>
        </div>
        <div style={s.content}>
          <div style={{ ...s.card, textAlign: 'center' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>{pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '💪'}</div>
            <h2>{pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good job!' : 'Keep practicing!'}</h2>
            <div style={{ fontSize: 48, fontWeight: 700, color: theme.primary }}>{score}/{exercises.length}</div>
            <p style={{ color: theme.textLight }}>{pct}% correct</p>
            <button onClick={() => { setScore(0); setTotal(0); generate(); }} style={s.btn}>🔄 Generate 5 More</button>
            <button onClick={onBack} style={s.btnSec}>← Back to Lesson</button>
          </div>
        </div>
      </div>
    );
  }

  // Exercise
  const ex = exercises[idx];
  return (
    <div style={s.container}>
      <div style={s.header}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                <strong style={{ color: result.correct ? theme.success : theme.error }}>{result.correct ? '✅ Correct!' : '❌ Not quite'}</strong>
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

export default AIPractice;
