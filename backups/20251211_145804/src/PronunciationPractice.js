import React, { useState, useRef } from 'react';

const theme = { primary: '#2D5A27', primaryLight: '#4A7C43', success: '#228B22', error: '#CD5C5C', bg: '#FAFAFA', surface: '#FFF', text: '#1A1A1A', textLight: '#666', border: '#E0E0E0' };

const PHRASES = [
  { spanish: '¡Hola! ¿Cómo estás?', english: 'Hello! How are you?', level: 'A1' },
  { spanish: 'Me llamo María.', english: 'My name is María.', level: 'A1' },
  { spanish: 'Mucho gusto en conocerte.', english: 'Nice to meet you.', level: 'A1' },
  { spanish: '¿Dónde está el baño?', english: 'Where is the bathroom?', level: 'A1' },
  { spanish: 'Quisiera una mesa para dos.', english: "I'd like a table for two.", level: 'A2' },
  { spanish: 'La cuenta, por favor.', english: 'The check, please.', level: 'A1' },
  { spanish: '¿Cuánto cuesta esto?', english: 'How much does this cost?', level: 'A1' },
  { spanish: 'No entiendo. ¿Puede repetir?', english: "I don't understand. Can you repeat?", level: 'A2' },
  { spanish: '¿Qué me recomienda?', english: 'What do you recommend?', level: 'A2' },
  { spanish: 'Estoy aprendiendo español.', english: "I'm learning Spanish.", level: 'A2' }
];

export default function PronunciationPractice({ onBack }) {
  const [index, setIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState({ good: 0, total: 0 });
  const recognitionRef = useRef(null);

  const phrase = PHRASES[index];

  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(phrase.spanish);
    utterance.lang = 'es-MX';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported. Try Chrome.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'es-MX';
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      evaluatePronunciation(result);
    };
    recognitionRef.current.onerror = () => {
      setIsRecording(false);
      setFeedback({ type: 'error', message: "Couldn't hear you. Try again!" });
    };
    recognitionRef.current.onend = () => setIsRecording(false);

    setTranscript('');
    setFeedback(null);
    setIsRecording(true);
    recognitionRef.current.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsRecording(false);
  };

  const evaluatePronunciation = (spoken) => {
    const target = phrase.spanish.toLowerCase().replace(/[¿¡!?.,]/g, '');
    const spokenClean = spoken.toLowerCase().replace(/[¿¡!?.,]/g, '');
    const targetWords = target.split(' ');
    const spokenWords = spokenClean.split(' ');
    let matches = 0;
    targetWords.forEach(word => {
      if (spokenWords.some(sw => sw.includes(word) || word.includes(sw))) matches++;
    });
    const accuracy = Math.round((matches / targetWords.length) * 100);

    if (accuracy >= 80) {
      setFeedback({ type: 'success', message: '¡Excelente! Great pronunciation!', accuracy });
      setScore(s => ({ good: s.good + 1, total: s.total + 1 }));
    } else if (accuracy >= 50) {
      setFeedback({ type: 'ok', message: 'Good effort! Try again for better accuracy.', accuracy });
      setScore(s => ({ ...s, total: s.total + 1 }));
    } else {
      setFeedback({ type: 'retry', message: 'Keep practicing! Listen again.', accuracy });
      setScore(s => ({ ...s, total: s.total + 1 }));
    }
  };

  const next = () => { if (index < PHRASES.length - 1) { setIndex(i => i + 1); setTranscript(''); setFeedback(null); } };
  const prev = () => { if (index > 0) { setIndex(i => i - 1); setTranscript(''); setFeedback(null); } };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>Pronunciation</h2>
        <span style={styles.counter}>{index + 1}/{PHRASES.length}</span>
      </div>
      <div style={styles.progressBar}><div style={{ ...styles.progressFill, width: `${((index + 1) / PHRASES.length) * 100}%` }} /></div>
      <div style={styles.content}>
        <div style={styles.scoreCard}>🎯 {score.good}/{score.total} good</div>
        <div style={styles.phraseCard}>
          <span style={styles.levelBadge}>{phrase.level}</span>
          <p style={styles.spanish}>{phrase.spanish}</p>
          <p style={styles.english}>{phrase.english}</p>
          <button onClick={playAudio} style={styles.listenBtn}>🔊 Listen</button>
        </div>
        <div style={styles.recordSection}>
          <p style={styles.instruction}>{isRecording ? '🎙️ Listening... Speak now!' : 'Press and speak the phrase'}</p>
          <button onClick={isRecording ? stopRecording : startRecording} style={{ ...styles.recordBtn, background: isRecording ? theme.error : theme.primary }}>
            {isRecording ? '⏹️ Stop' : '🎤 Record'}
          </button>
          {transcript && (
            <div style={styles.transcriptCard}>
              <p style={styles.transcriptLabel}>You said:</p>
              <p style={styles.transcriptText}>{transcript}</p>
            </div>
          )}
        </div>
        {feedback && (
          <div style={{ ...styles.feedbackCard, background: feedback.type === 'success' ? '#E8F5E9' : feedback.type === 'ok' ? '#FEF3C7' : '#FFEBEE', borderColor: feedback.type === 'success' ? theme.success : feedback.type === 'ok' ? '#F59E0B' : theme.error }}>
            <p style={{ margin: 0, fontWeight: 600 }}>{feedback.message}</p>
            {feedback.accuracy !== undefined && <p style={{ margin: '8px 0 0', fontSize: 14 }}>Accuracy: {feedback.accuracy}%</p>}
          </div>
        )}
        <div style={styles.navButtons}>
          <button onClick={prev} disabled={index === 0} style={{ ...styles.navBtn, opacity: index === 0 ? 0.5 : 1 }}>← Previous</button>
          <button onClick={next} disabled={index === PHRASES.length - 1} style={{ ...styles.navBtn, opacity: index === PHRASES.length - 1 ? 0.5 : 1 }}>Next →</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 500, margin: '0 auto', minHeight: '100vh', background: theme.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  header: { background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`, color: '#fff', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  title: { margin: 0, fontSize: 18 },
  backBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' },
  counter: { background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 12, fontSize: 14 },
  progressBar: { height: 4, background: theme.border },
  progressFill: { height: '100%', background: theme.success, transition: 'width 0.3s' },
  content: { padding: 20 },
  scoreCard: { textAlign: 'center', marginBottom: 16, color: theme.textLight },
  phraseCard: { background: theme.surface, borderRadius: 20, padding: 24, textAlign: 'center', marginBottom: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
  levelBadge: { display: 'inline-block', background: theme.bg, padding: '4px 12px', borderRadius: 12, fontSize: 12, color: theme.textLight, marginBottom: 12 },
  spanish: { fontSize: 24, fontWeight: 700, margin: '0 0 8px', color: theme.text },
  english: { fontSize: 16, color: theme.textLight, margin: '0 0 16px' },
  listenBtn: { background: '#E8F5E9', border: 'none', padding: '12px 24px', borderRadius: 24, fontSize: 16, cursor: 'pointer', color: theme.primary, fontWeight: 600 },
  recordSection: { textAlign: 'center', marginBottom: 20 },
  instruction: { color: theme.textLight, marginBottom: 16 },
  recordBtn: { width: 80, height: 80, borderRadius: '50%', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' },
  transcriptCard: { marginTop: 20, background: theme.surface, padding: 16, borderRadius: 12, border: `1px solid ${theme.border}` },
  transcriptLabel: { margin: '0 0 4px', fontSize: 12, color: theme.textLight },
  transcriptText: { margin: 0, fontSize: 18, fontWeight: 500 },
  feedbackCard: { padding: 16, borderRadius: 12, marginBottom: 20, border: '1px solid' },
  navButtons: { display: 'flex', gap: 12 },
  navBtn: { flex: 1, padding: 14, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, fontSize: 16, cursor: 'pointer' }
};
