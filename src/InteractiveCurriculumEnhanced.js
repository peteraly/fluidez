import React, { useState, useEffect } from 'react';
import { StreakDisplay } from './components/engagement';
import { ReviewSystem, QuizMode, ShadowingMode, PTStageDisplay } from './components/learning';
import { SuccessAnimation } from './components/feedback';
import { completeDay, getStreakData } from './utils/streakManager';

// Keep the original CURRICULUM data
const CURRICULUM = {
  1: {
    title: "Spanish Sounds & Alphabet",
    subtitle: "Pronunciation foundations",
    level: "A1",
    grammar: {
      title: "Spanish Sounds",
      screens: [
        {
          title: "Welcome to Spanish!",
          content: "¡Bienvenidos! Today you'll master the sounds of Spanish. The great news? Spanish is phonetic — once you learn the sounds, you can pronounce any word correctly!",
          tip: "Spanish has only 5 vowel sounds (English has 14+). Master these first!"
        },
        {
          title: "The 5 Vowels",
          content: "Spanish vowels are pure and consistent:",
          examples: [
            { spanish: "A", english: "ah (father)", audio: "a" },
            { spanish: "E", english: "eh (bet)", audio: "e" },
            { spanish: "I", english: "ee (feet)", audio: "i" },
            { spanish: "O", english: "oh (hope)", audio: "o" },
            { spanish: "U", english: "oo (boot)", audio: "u" }
          ]
        },
        {
          title: "Key Consonant Differences",
          content: "Most consonants are similar to English, but watch these:",
          examples: [
            { spanish: "H", english: "always silent: hola = 'ola'", audio: "hola" },
            { spanish: "J", english: "like English 'h': Juan = 'Hwan'", audio: "Juan" },
            { spanish: "LL", english: "like 'y': llamar = 'yamar'", audio: "llamar" },
            { spanish: "Ñ", english: "like 'ny': año = 'anyo'", audio: "año" },
            { spanish: "RR", english: "rolled/trilled: perro", audio: "perro" }
          ]
        },
        {
          title: "Stress Rules",
          content: "Spanish stress is predictable! Words ending in vowel, -n, or -s: stress second-to-last syllable. Words ending in other consonants: stress last syllable. Accent marks override these rules.",
          examples: [
            { spanish: "ha-BLO", english: "I speak (ends in vowel)", audio: "hablo" },
            { spanish: "ha-BLAR", english: "to speak (ends in -r)", audio: "hablar" },
            { spanish: "te-LÉ-fo-no", english: "telephone (accent mark)", audio: "teléfono" }
          ]
        }
      ]
    },
    vocabulary: {
      title: "Greetings & Numbers",
      categories: [
        {
          name: "Essential Greetings",
          words: [
            { spanish: "hola", english: "hello" },
            { spanish: "buenos días", english: "good morning" },
            { spanish: "buenas tardes", english: "good afternoon" },
            { spanish: "buenas noches", english: "good evening/night" },
            { spanish: "adiós", english: "goodbye" },
            { spanish: "hasta luego", english: "see you later" },
            { spanish: "gracias", english: "thank you" },
            { spanish: "de nada", english: "you're welcome" }
          ]
        },
        {
          name: "Numbers 1-10",
          words: [
            { spanish: "uno", english: "one" },
            { spanish: "dos", english: "two" },
            { spanish: "tres", english: "three" },
            { spanish: "cuatro", english: "four" },
            { spanish: "cinco", english: "five" },
            { spanish: "seis", english: "six" },
            { spanish: "siete", english: "seven" },
            { spanish: "ocho", english: "eight" },
            { spanish: "nueve", english: "nine" },
            { spanish: "diez", english: "ten" }
          ]
        }
      ]
    },
    listening: {
      title: "Sound Practice",
      phrases: [
        "hola", "buenos días", "buenas tardes", "buenas noches", "adiós", "hasta luego"
      ]
    },
    reading: {
      title: "Practice Reading",
      passage: "¡Hola! Me llamo María. Soy de España. Mucho gusto. ¿Cómo te llamas? Buenos días. Gracias por tu ayuda. De nada. Hasta luego.",
      objectives: [
        "Master the 5 Spanish vowel sounds",
        "Learn key consonant differences", 
        "Understand stress rules",
        "Greet people in Spanish"
      ],
      culturalNote: "Spanish is spoken in 21 countries with rich regional variations.",
      falseAmigos: [
        { word: "embarazada", means: "pregnant", notMeans: "embarrassed (= avergonzado/a)" },
        { word: "actualmente", means: "currently", notMeans: "actually (= en realidad)" },
        { word: "realizar", means: "to accomplish", notMeans: "to realize (= darse cuenta)" }
      ]
    }
  }
};

// Add days 2-30 with basic structure
for (let i = 2; i <= 30; i++) {
  CURRICULUM[i] = {
    title: `Day ${i}`,
    subtitle: "Coming soon",
    level: i <= 10 ? "A1" : i <= 20 ? "A2" : "B1",
    grammar: { title: "Grammar", screens: [{ title: "Coming Soon", content: `Day ${i} content is being prepared.` }] },
    vocabulary: { title: "Vocabulary", categories: [{ name: "Words", words: [] }] },
    listening: { title: "Listening", phrases: [] },
    reading: { title: "Reading", passage: "", objectives: [] }
  };
}

export default function InteractiveCurriculum({ day = 1, onBack, onComplete }) {
  const [activeTab, setActiveTab] = useState('grammar');
  const [grammarScreen, setGrammarScreen] = useState(0);
  const [vocabCategory, setVocabCategory] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showShadowing, setShowShadowing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [streakData, setStreakData] = useState(getStreakData());

  const dayData = CURRICULUM[day] || CURRICULUM[1];
  const grammarScreens = dayData.grammar?.screens || [];
  const vocabCategories = dayData.vocabulary?.categories || [];
  const currentGrammar = grammarScreens[grammarScreen] || {};
  const currentVocab = vocabCategories[vocabCategory] || { words: [] };

  // Get PT stage based on day
  const ptStage = Math.min(Math.ceil(day / 5), 6);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'es-ES';
      u.rate = 0.85;
      speechSynthesis.speak(u);
    }
  };

  const getAllVocabulary = () => {
    const words = [];
    vocabCategories.forEach(cat => {
      cat.words?.forEach(w => words.push({ spanish: w.spanish, english: w.english }));
    });
    return words;
  };

  const handleComplete = () => {
    const result = completeDay();
    setStreakData(result);
    setShowSuccess(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA' }}>
      {/* MODALS */}
      {showReview && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
          <ReviewSystem
            vocabulary={getAllVocabulary()}
            onClose={() => setShowReview(false)}
            onComplete={() => { setShowReview(false); setShowSuccess(true); }}
          />
        </div>
      )}

      {showQuiz && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
          <QuizMode
            items={getAllVocabulary()}
            onExit={() => setShowQuiz(false)}
            onComplete={() => { setShowQuiz(false); setShowSuccess(true); }}
          />
        </div>
      )}

      {showShadowing && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ maxWidth: 500, width: '100%' }}>
            <ShadowingMode
              dayData={dayData}
              day={day}
              onClose={() => setShowShadowing(false)}
              onComplete={() => { setShowShadowing(false); setShowSuccess(true); }}
            />
          </div>
        </div>
      )}

      <SuccessAnimation
        show={showSuccess}
        xpGain={25}
        message="Great work!"
        onComplete={() => { setShowSuccess(false); onComplete?.(); }}
      />

      {/* HEADER */}
      <div style={{ background: 'linear-gradient(135deg, #2D5A27 0%, #4A7C43 100%)', color: 'white', padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: 20, cursor: 'pointer', fontSize: 14 }}>
            ← Back
          </button>
          <StreakDisplay compact />
        </div>
        <h1 style={{ margin: '0 0 4px', fontSize: 20 }}>Day {day}: {dayData.title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: 0.9, fontSize: 14 }}>
          <span>{dayData.subtitle}</span>
          <span>•</span>
          <span>{dayData.level}</span>
          <PTStageDisplay stage={ptStage} compact />
        </div>
      </div>

      {/* TAB BAR */}
      <div style={{ display: 'flex', background: '#fff', borderBottom: '1px solid #e0e0e0' }}>
        {[
          { id: 'grammar', icon: '📖', label: 'Grammar' },
          { id: 'vocab', icon: '📚', label: 'Vocab' },
          { id: 'listen', icon: '🎧', label: 'Listen' },
          { id: 'read', icon: '📰', label: 'Read' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1, padding: '12px 8px', border: 'none', cursor: 'pointer',
              background: activeTab === tab.id ? '#E8F5E9' : 'transparent',
              borderBottom: activeTab === tab.id ? '3px solid #2D5A27' : '3px solid transparent',
              fontWeight: activeTab === tab.id ? 600 : 400
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ padding: 20 }}>
        {/* GRAMMAR TAB */}
        {activeTab === 'grammar' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>📖 Grammar</h2>
              <div style={{ display: 'flex', gap: 6 }}>
                {grammarScreens.map((_, i) => (
                  <button key={i} onClick={() => setGrammarScreen(i)} style={{
                    width: 28, height: 28, borderRadius: '50%', border: 'none', cursor: 'pointer',
                    background: grammarScreen === i ? '#2D5A27' : '#e0e0e0',
                    color: grammarScreen === i ? '#fff' : '#666', fontSize: 12, fontWeight: 600
                  }}>{i + 1}</button>
                ))}
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: 16, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h3 style={{ margin: '0 0 12px', color: '#2D5A27' }}>{currentGrammar.title}</h3>
              <p style={{ color: '#444', lineHeight: 1.6, marginBottom: 16 }}>{currentGrammar.content}</p>
              
              {currentGrammar.tip && (
                <div style={{ background: '#FFF8E1', padding: 12, borderRadius: 10, marginBottom: 16, fontSize: 14 }}>
                  💡 {currentGrammar.tip}
                </div>
              )}

              {currentGrammar.examples && (
                <div style={{ marginTop: 16 }}>
                  {currentGrammar.examples.map((ex, i) => (
                    <div key={i} onClick={() => speak(ex.audio || ex.spanish)} style={{
                      display: 'flex', alignItems: 'center', padding: '12px 16px', marginBottom: 8,
                      background: '#f8f9fa', borderRadius: 10, cursor: 'pointer'
                    }}>
                      <span style={{ marginRight: 10 }}>🔊</span>
                      <span style={{ fontWeight: 600, color: '#2D5A27', marginRight: 8 }}>{ex.spanish}</span>
                      <span style={{ color: '#666' }}>= {ex.english}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
              <button onClick={() => setGrammarScreen(Math.max(0, grammarScreen - 1))} disabled={grammarScreen === 0}
                style={{ padding: '10px 20px', background: grammarScreen === 0 ? '#e0e0e0' : '#fff', border: '1px solid #ddd', borderRadius: 10, cursor: grammarScreen === 0 ? 'not-allowed' : 'pointer' }}>
                ← Prev
              </button>
              <span style={{ color: '#666' }}>{grammarScreen + 1} / {grammarScreens.length}</span>
              <button onClick={() => setGrammarScreen(Math.min(grammarScreens.length - 1, grammarScreen + 1))} disabled={grammarScreen >= grammarScreens.length - 1}
                style={{ padding: '10px 20px', background: grammarScreen >= grammarScreens.length - 1 ? '#e0e0e0' : '#2D5A27', color: grammarScreen >= grammarScreens.length - 1 ? '#666' : '#fff', border: 'none', borderRadius: 10, cursor: grammarScreen >= grammarScreens.length - 1 ? 'not-allowed' : 'pointer' }}>
                Next →
              </button>
            </div>
          </div>
        )}

        {/* VOCABULARY TAB */}
        {activeTab === 'vocab' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>📚 Vocabulary</h2>
            </div>

            {/* ACTION BUTTONS - NEW! */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              <button onClick={() => setShowReview(true)} style={{
                flex: 1, padding: '14px 16px', background: 'linear-gradient(135deg, #7B1FA2, #9C27B0)',
                color: '#fff', border: 'none', borderRadius: 12, cursor: 'pointer', fontWeight: 600, fontSize: 15
              }}>
                📚 Review Words
              </button>
              <button onClick={() => setShowQuiz(true)} style={{
                flex: 1, padding: '14px 16px', background: 'linear-gradient(135deg, #2D5A27, #4A7C43)',
                color: '#fff', border: 'none', borderRadius: 12, cursor: 'pointer', fontWeight: 600, fontSize: 15
              }}>
                📝 Take Quiz
              </button>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              {vocabCategories.map((cat, i) => (
                <button key={i} onClick={() => setVocabCategory(i)} style={{
                  padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
                  background: vocabCategory === i ? '#2D5A27' : '#e0e0e0',
                  color: vocabCategory === i ? '#fff' : '#666', fontWeight: 500, fontSize: 13
                }}>{cat.name}</button>
              ))}
            </div>

            <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ margin: 0, fontSize: 16 }}>{currentVocab.name}</h3>
                <span style={{ color: '#666', fontSize: 13 }}>{currentVocab.words?.length || 0} words</span>
              </div>
              {currentVocab.words?.map((word, i) => (
                <div key={i} onClick={() => speak(word.spanish)} style={{
                  display: 'flex', alignItems: 'center', padding: '10px 0',
                  borderBottom: i < currentVocab.words.length - 1 ? '1px solid #f0f0f0' : 'none', cursor: 'pointer'
                }}>
                  <span style={{ marginRight: 10, color: '#2D5A27' }}>🔊</span>
                  <span style={{ fontWeight: 600, minWidth: 120 }}>{word.spanish}</span>
                  <span style={{ color: '#666' }}>= {word.english}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LISTENING TAB */}
        {activeTab === 'listen' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>🎧 Listening Practice</h2>
            </div>

            {/* SHADOWING BUTTON - NEW! */}
            <button onClick={() => setShowShadowing(true)} style={{
              width: '100%', padding: '16px 20px', marginBottom: 16,
              background: day >= 7 ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#e0e0e0',
              color: day >= 7 ? '#fff' : '#999', border: 'none', borderRadius: 12,
              cursor: day >= 7 ? 'pointer' : 'not-allowed', fontWeight: 600, fontSize: 15
            }}>
              🎧 {day >= 7 ? 'Shadowing Mode' : 'Shadowing Mode (Unlocks Day 7)'}
            </button>

            <p style={{ color: '#666', marginBottom: 16 }}>Tap each phrase to hear it, then repeat aloud:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {dayData.listening?.phrases?.map((phrase, i) => (
                <button key={i} onClick={() => speak(phrase)} style={{
                  padding: '12px 20px', background: '#fff', border: '1px solid #e0e0e0',
                  borderRadius: 25, cursor: 'pointer', fontSize: 15
                }}>
                  🔊{phrase}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* READING TAB */}
        {activeTab === 'read' && (
          <div>
            <h2 style={{ margin: '0 0 16px', fontSize: 18 }}>📰 Reading & Culture</h2>

            {dayData.reading?.passage && (
              <div style={{ background: '#fff', borderRadius: 16, padding: 20, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <h3 style={{ margin: '0 0 12px', fontSize: 16 }}>📖 Practice Reading</h3>
                <p style={{ lineHeight: 1.8, color: '#333' }}>{dayData.reading.passage}</p>
                <button onClick={() => speak(dayData.reading.passage)} style={{
                  marginTop: 12, padding: '10px 20px', background: '#E8F5E9', border: 'none',
                  borderRadius: 20, cursor: 'pointer', color: '#2D5A27', fontWeight: 500
                }}>🔊 Listen to Passage</button>
              </div>
            )}

            {dayData.reading?.objectives?.length > 0 && (
              <div style={{ background: '#fff', borderRadius: 16, padding: 20, marginBottom: 16 }}>
                <h3 style={{ margin: '0 0 12px', fontSize: 16 }}>📎 Today's Objectives</h3>
                {dayData.reading.objectives.map((obj, i) => (
                  <div key={i} style={{ padding: '8px 0', color: '#444' }}>✓ {obj}</div>
                ))}
              </div>
            )}

            {dayData.reading?.culturalNote && (
              <div style={{ background: '#FFF8E1', borderRadius: 16, padding: 20, marginBottom: 16 }}>
                <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>🌍 Cultural Note</h3>
                <p style={{ color: '#666', margin: 0 }}>{dayData.reading.culturalNote}</p>
              </div>
            )}

            {dayData.reading?.falseAmigos?.length > 0 && (
              <div style={{ background: '#FFEBEE', borderRadius: 16, padding: 20 }}>
                <h3 style={{ margin: '0 0 12px', fontSize: 16 }}>⚠️ False Friends (¡Cuidado!)</h3>
                {dayData.reading.falseAmigos.map((fa, i) => (
                  <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < dayData.reading.falseAmigos.length - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none' }}>
                    <div style={{ fontWeight: 700, color: '#C62828' }}>{fa.word}</div>
                    <div style={{ color: '#4CAF50' }}>✓ Means: {fa.means}</div>
                    <div style={{ color: '#F44336' }}>✗ NOT: {fa.notMeans}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* COMPLETE BUTTON */}
      <div style={{ padding: 20, paddingBottom: 40 }}>
        <button onClick={handleComplete} style={{
          width: '100%', padding: '16px 24px',
          background: 'linear-gradient(135deg, #2D5A27 0%, #4A7C43 100%)',
          color: '#fff', border: 'none', borderRadius: 16,
          fontSize: 18, fontWeight: 600, cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(45, 90, 39, 0.3)'
        }}>
          Complete Day {day} ✓
        </button>
      </div>
    </div>
  );
}
