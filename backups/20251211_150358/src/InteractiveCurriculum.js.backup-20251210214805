import React, { useState, useEffect, useRef } from 'react';
import { SoundEffects } from './components/multimodal/SoundEffects';
import { getWordVisual } from './components/multimodal/VisualAssets';
import { WordMatchGame, FillBlankGame } from './components/multimodal/MiniGame';

const theme = { primary: '#2D5A27', primaryLight: '#4A7C43', bg: '#FAFAFA', surface: '#FFF', text: '#1A1A1A', textLight: '#666', border: '#E0E0E0' };

// Sample curriculum data
const CURRICULUM_DATA = {
  1: {
    title: 'Greetings & Introductions',
    sections: [
      {
        type: 'intro',
        content: '¡Hola! Today you\'ll learn to introduce yourself in Spanish.'
      },
      {
        type: 'vocabulary',
        title: 'Key Words',
        words: [
          { es: 'hola', en: 'hello' },
          { es: 'buenos días', en: 'good morning' },
          { es: 'me llamo', en: 'my name is' },
          { es: 'mucho gusto', en: 'nice to meet you' },
          { es: '¿cómo te llamas?', en: 'what\'s your name?' }
        ]
      },
      {
        type: 'listen',
        title: 'Listen & Repeat',
        phrases: [
          '¡Hola! Me llamo María.',
          'Buenos días. ¿Cómo estás?',
          'Mucho gusto. Soy de México.'
        ]
      },
      {
        type: 'game',
        gameType: 'match',
        pairs: [
          { spanish: 'hola', english: 'hello' },
          { spanish: 'buenos días', english: 'good morning' },
          { spanish: 'mucho gusto', english: 'nice to meet you' }
        ]
      },
      {
        type: 'speak',
        title: 'Your Turn!',
        prompts: [
          { prompt: 'Say hello', expected: 'hola', hint: '¡Hola!' },
          { prompt: 'Introduce yourself', expected: 'me llamo', hint: 'Me llamo [your name]' },
          { prompt: 'Say nice to meet you', expected: 'mucho gusto', hint: 'Mucho gusto' }
        ]
      }
    ]
  },
  2: {
    title: 'Ser vs Estar Basics',
    sections: [
      {
        type: 'intro',
        content: 'Spanish has TWO verbs for "to be": SER (permanent) and ESTAR (temporary).'
      },
      {
        type: 'grammar',
        title: 'SER - Permanent things',
        explanation: 'Use SER for: identity, origin, profession, personality',
        examples: [
          { es: 'Soy estudiante', en: 'I am a student (identity)' },
          { es: 'Soy de México', en: 'I am from Mexico (origin)' },
          { es: 'Soy alto', en: 'I am tall (permanent trait)' }
        ],
        conjugation: { yo: 'soy', tú: 'eres', él: 'es', nosotros: 'somos', ellos: 'son' }
      },
      {
        type: 'grammar',
        title: 'ESTAR - Temporary things',
        explanation: 'Use ESTAR for: location, emotions, conditions',
        examples: [
          { es: 'Estoy en casa', en: 'I am at home (location)' },
          { es: 'Estoy feliz', en: 'I am happy (emotion)' },
          { es: 'Estoy cansado', en: 'I am tired (condition)' }
        ],
        conjugation: { yo: 'estoy', tú: 'estás', él: 'está', nosotros: 'estamos', ellos: 'están' }
      },
      {
        type: 'game',
        gameType: 'fillblank',
        sentences: [
          { before: 'Yo', after: 'estudiante.', answer: 'soy', hint: 'Identity = SER' },
          { before: 'Ella', after: 'en la escuela.', answer: 'está', hint: 'Location = ESTAR' },
          { before: 'Nosotros', after: 'de España.', answer: 'somos', hint: 'Origin = SER' }
        ]
      },
      {
        type: 'speak',
        title: 'Practice Speaking',
        prompts: [
          { prompt: 'Say: I am a student', expected: 'soy', hint: 'Soy estudiante' },
          { prompt: 'Say: I am happy', expected: 'estoy', hint: 'Estoy feliz' },
          { prompt: 'Say: I am from [country]', expected: 'soy de', hint: 'Soy de...' }
        ]
      }
    ]
  }
};

export default function InteractiveCurriculum({ day = 1, onBack, onComplete }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [sectionProgress, setSectionProgress] = useState({});
  const [speakingIndex, setSpeakingIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [speakResult, setSpeakResult] = useState(null);
  
  const recognitionRef = useRef(null);
  const data = CURRICULUM_DATA[day] || CURRICULUM_DATA[1];
  const section = data.sections[currentSection];
  const progress = ((currentSection + 1) / data.sections.length) * 100;
  
  // Speech recognition
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) {
      recognitionRef.current = new SR();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'es-MX';
      
      recognitionRef.current.onresult = (e) => {
        const transcript = e.results[0][0].transcript.toLowerCase();
        setSpokenText(transcript);
        setIsListening(false);
        
        // Check if correct
        const currentPrompt = section.prompts?.[speakingIndex];
        if (currentPrompt && transcript.includes(currentPrompt.expected)) {
          SoundEffects.correct();
          setSpeakResult('correct');
          setTimeout(() => {
            setSpeakResult(null);
            setSpokenText('');
            if (speakingIndex + 1 < section.prompts.length) {
              setSpeakingIndex(speakingIndex + 1);
            } else {
              handleSectionComplete();
            }
          }, 1500);
        } else {
          SoundEffects.incorrect();
          setSpeakResult('incorrect');
        }
      };
      
      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, [speakingIndex, section]);
  
  const speak = (text) => {
    SoundEffects.tap();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-MX';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };
  
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      setSpeakResult(null);
      SoundEffects.recordStart();
      recognitionRef.current.start();
    }
  };
  
  const handleSectionComplete = () => {
    setSectionProgress({ ...sectionProgress, [currentSection]: true });
    SoundEffects.encourage();
    
    if (currentSection + 1 < data.sections.length) {
      setTimeout(() => {
        setCurrentSection(currentSection + 1);
        setSpeakingIndex(0);
      }, 500);
    } else {
      // Lesson complete!
      SoundEffects.levelUp();
      onComplete && onComplete();
    }
  };
  
  const nextSection = () => {
    if (currentSection + 1 < data.sections.length) {
      setSectionProgress({ ...sectionProgress, [currentSection]: true });
      setCurrentSection(currentSection + 1);
      setSpeakingIndex(0);
      SoundEffects.tap();
    }
  };
  
  // RENDER SECTIONS
  const renderSection = () => {
    switch (section.type) {
      case 'intro':
        return (
          <div style={styles.sectionCard}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>👋</div>
            <p style={{ fontSize: 18, lineHeight: 1.6 }}>{section.content}</p>
            <button onClick={nextSection} style={styles.nextBtn}>Let's Go! →</button>
          </div>
        );
        
      case 'vocabulary':
        return (
          <div style={styles.sectionCard}>
            <h3 style={styles.sectionTitle}>{section.title}</h3>
            <div style={styles.vocabGrid}>
              {section.words.map((word, i) => {
                const visual = getWordVisual(word.es.split(' ')[0]);
                return (
                  <button key={i} onClick={() => speak(word.es)} style={styles.vocabCard}>
                    {visual && <span style={styles.vocabEmoji}>{visual}</span>}
                    <span style={styles.vocabEs}>{word.es}</span>
                    <span style={styles.vocabEn}>{word.en}</span>
                    <span style={styles.speakIcon}>🔊</span>
                  </button>
                );
              })}
            </div>
            <button onClick={nextSection} style={styles.nextBtn}>Continue →</button>
          </div>
        );
        
      case 'listen':
        return (
          <div style={styles.sectionCard}>
            <h3 style={styles.sectionTitle}>👂 {section.title}</h3>
            <p style={{ color: theme.textLight, marginBottom: 16 }}>Tap each phrase to hear it, then repeat aloud!</p>
            {section.phrases.map((phrase, i) => (
              <button key={i} onClick={() => speak(phrase)} style={styles.listenRow}>
                <span style={{ flex: 1 }}>{phrase}</span>
                <span>🔊</span>
              </button>
            ))}
            <button onClick={nextSection} style={styles.nextBtn}>Continue →</button>
          </div>
        );
        
      case 'grammar':
        return (
          <div style={styles.sectionCard}>
            <h3 style={styles.sectionTitle}>📝 {section.title}</h3>
            <p style={{ marginBottom: 16 }}>{section.explanation}</p>
            
            {/* Conjugation table */}
            {section.conjugation && (
              <div style={styles.conjugationBox}>
                {Object.entries(section.conjugation).map(([pronoun, verb]) => (
                  <button key={pronoun} onClick={() => speak(`${pronoun} ${verb}`)} style={styles.conjugationRow}>
                    <span style={styles.pronoun}>{pronoun}</span>
                    <span style={styles.verb}>{verb}</span>
                    <span>🔊</span>
                  </button>
                ))}
              </div>
            )}
            
            {/* Examples */}
            <h4 style={{ marginTop: 20 }}>Examples:</h4>
            {section.examples.map((ex, i) => (
              <button key={i} onClick={() => speak(ex.es)} style={styles.exampleRow}>
                <div>
                  <div style={{ fontWeight: 600 }}>{ex.es}</div>
                  <div style={{ fontSize: 13, color: theme.textLight }}>{ex.en}</div>
                </div>
                <span>🔊</span>
              </button>
            ))}
            
            <button onClick={nextSection} style={styles.nextBtn}>Continue →</button>
          </div>
        );
        
      case 'game':
        if (section.gameType === 'match') {
          return (
            <WordMatchGame pairs={section.pairs} onComplete={(score) => {
              if (score >= 80) handleSectionComplete();
            }} />
          );
        } else if (section.gameType === 'fillblank') {
          return (
            <FillBlankGame sentences={section.sentences} onComplete={(score) => {
              if (score >= 60) handleSectionComplete();
            }} />
          );
        }
        return null;
        
      case 'speak':
        const currentPrompt = section.prompts[speakingIndex];
        return (
          <div style={styles.sectionCard}>
            <h3 style={styles.sectionTitle}>🎤 {section.title}</h3>
            <p style={{ color: theme.textLight, marginBottom: 20 }}>
              {speakingIndex + 1} of {section.prompts.length}
            </p>
            
            <div style={styles.speakPrompt}>
              <p style={{ fontSize: 18, marginBottom: 8 }}>{currentPrompt.prompt}</p>
              <button onClick={() => speak(currentPrompt.hint)} style={styles.hintBtn}>
                💡 Hear hint: "{currentPrompt.hint}"
              </button>
            </div>
            
            {spokenText && (
              <div style={{
                ...styles.resultBox,
                background: speakResult === 'correct' ? '#C8E6C9' : speakResult === 'incorrect' ? '#FFCDD2' : '#FFF9C4'
              }}>
                <p>You said: "{spokenText}"</p>
                {speakResult === 'correct' && <span style={{ fontSize: 24 }}>✅ ¡Perfecto!</span>}
                {speakResult === 'incorrect' && <span>Try again! Expected: "{currentPrompt.expected}"</span>}
              </div>
            )}
            
            <button
              onClick={isListening ? null : startListening}
              style={{
                ...styles.micBtn,
                background: isListening ? '#CD5C5C' : theme.primary
              }}
            >
              {isListening ? '🎤 Listening...' : '🎤 Tap to Speak'}
            </button>
          </div>
        );
        
      default:
        return <div>Unknown section type</div>;
    }
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>Day {day}: {data.title}</h2>
        <div style={{ width: 40 }} />
      </div>
      
      {/* Progress bar */}
      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${progress}%` }} />
      </div>
      
      <div style={styles.content}>
        {renderSection()}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 500, margin: '0 auto', minHeight: '100vh', background: theme.bg, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' },
  header: { background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`, color: '#fff', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  title: { margin: 0, fontSize: 16, fontWeight: 600 },
  backBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' },
  progressBar: { height: 4, background: theme.border },
  progressFill: { height: '100%', background: theme.primary, transition: 'width 0.3s' },
  content: { padding: 20 },
  sectionCard: { background: theme.surface, borderRadius: 16, padding: 24, border: `1px solid ${theme.border}` },
  sectionTitle: { margin: '0 0 16px', color: theme.primary },
  vocabGrid: { display: 'flex', flexDirection: 'column', gap: 10 },
  vocabCard: { display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderRadius: 12, border: `1px solid ${theme.border}`, background: theme.bg, cursor: 'pointer', textAlign: 'left' },
  vocabEmoji: { fontSize: 28 },
  vocabEs: { fontWeight: 600, flex: 1 },
  vocabEn: { color: theme.textLight, fontSize: 14 },
  speakIcon: { opacity: 0.5 },
  listenRow: { display: 'flex', alignItems: 'center', width: '100%', padding: 14, borderRadius: 12, border: `1px solid ${theme.border}`, background: theme.bg, marginBottom: 10, cursor: 'pointer', textAlign: 'left' },
  conjugationBox: { background: theme.bg, borderRadius: 12, padding: 12 },
  conjugationRow: { display: 'flex', alignItems: 'center', width: '100%', padding: 10, border: 'none', background: 'transparent', cursor: 'pointer', borderBottom: `1px solid ${theme.border}` },
  pronoun: { fontWeight: 600, width: 80, color: theme.primary },
  verb: { flex: 1 },
  exampleRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: 12, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.bg, marginBottom: 8, cursor: 'pointer', textAlign: 'left' },
  nextBtn: { width: '100%', background: theme.primary, color: '#fff', border: 'none', padding: 16, borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer', marginTop: 20 },
  speakPrompt: { background: theme.bg, padding: 20, borderRadius: 12, textAlign: 'center', marginBottom: 20 },
  hintBtn: { background: '#FEF3C7', border: 'none', padding: '8px 16px', borderRadius: 20, cursor: 'pointer', fontSize: 14 },
  resultBox: { padding: 16, borderRadius: 12, marginBottom: 20, textAlign: 'center' },
  micBtn: { width: '100%', padding: 18, border: 'none', borderRadius: 12, color: '#fff', fontSize: 18, fontWeight: 600, cursor: 'pointer' }
};
