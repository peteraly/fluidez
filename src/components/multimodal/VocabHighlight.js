import React, { useState } from 'react';
import { getWordVisual } from './VisualAssets';

const theme = { primary: '#2D5A27', primaryLight: '#4A7C43' };

// Common Spanish vocabulary with translations
const VOCAB_DB = {
  // Greetings
  hola: 'hello', buenos: 'good', días: 'days', tardes: 'afternoon', noches: 'night',
  cómo: 'how', estás: 'are you', está: 'are you (formal)', bien: 'well', mal: 'bad',
  gracias: 'thank you', favor: 'please', perdón: 'sorry', disculpe: 'excuse me',
  
  // Pronouns
  yo: 'I', tú: 'you', él: 'he', ella: 'she', nosotros: 'we', ellos: 'they',
  
  // Verbs
  soy: 'I am', eres: 'you are', es: 'is', somos: 'we are', son: 'they are',
  estoy: 'I am', tengo: 'I have', tienes: 'you have', tiene: 'has',
  quiero: 'I want', puedo: 'I can', necesito: 'I need', voy: 'I go',
  hablo: 'I speak', hablas: 'you speak', habla: 'speaks',
  como: 'I eat', comes: 'you eat', come: 'eats',
  
  // Questions
  qué: 'what', cuál: 'which', dónde: 'where', cuándo: 'when', por: 'for/by',
  cuánto: 'how much', cuántos: 'how many',
  
  // Common words
  sí: 'yes', no: 'no', muy: 'very', más: 'more', menos: 'less',
  aquí: 'here', allí: 'there', ahora: 'now', después: 'after', antes: 'before',
  
  // Food
  comida: 'food', agua: 'water', café: 'coffee', cerveza: 'beer', vino: 'wine',
  carne: 'meat', pollo: 'chicken', pescado: 'fish', pan: 'bread',
  
  // Places  
  casa: 'house', hotel: 'hotel', restaurante: 'restaurant', aeropuerto: 'airport',
  
  // Time
  hoy: 'today', mañana: 'tomorrow', ayer: 'yesterday', hora: 'hour', minuto: 'minute'
};

const VocabHighlight = ({ text, onWordTap }) => {
  const [activeWord, setActiveWord] = useState(null);
  
  // Split text into words while preserving punctuation
  const words = text.split(/(\s+|[.,!?¿¡])/);
  
  const handleWordTap = (word, translation, visual) => {
    setActiveWord(word);
    
    // Speak the word
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'es-MX';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
    
    if (onWordTap) {
      onWordTap({ word, translation, visual });
    }
    
    // Clear after 2 seconds
    setTimeout(() => setActiveWord(null), 2000);
  };
  
  return (
    <span style={styles.container}>
      {words.map((word, i) => {
        const cleanWord = word.toLowerCase().replace(/[.,!?¿¡]/g, '').trim();
        const translation = VOCAB_DB[cleanWord];
        const visual = getWordVisual(cleanWord);
        const isKnownWord = translation || visual;
        const isActive = activeWord === word;
        
        if (!word.trim() || /^[.,!?¿¡\s]+$/.test(word)) {
          return <span key={i}>{word}</span>;
        }
        
        return (
          <span
            key={i}
            onClick={() => isKnownWord && handleWordTap(word, translation, visual)}
            style={{
              ...styles.word,
              ...(isKnownWord ? styles.knownWord : {}),
              ...(isActive ? styles.activeWord : {}),
              cursor: isKnownWord ? 'pointer' : 'default'
            }}
          >
            {word}
            {isActive && (
              <span style={styles.tooltip}>
                {visual && <span style={styles.tooltipEmoji}>{visual}</span>}
                <span style={styles.tooltipText}>{translation || 'Tap to hear'}</span>
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
};

const styles = {
  container: { },
  word: {
    position: 'relative',
    transition: 'all 0.2s'
  },
  knownWord: {
    borderBottom: `1px dotted ${theme.primary}`,
    paddingBottom: 1
  },
  activeWord: {
    background: '#E8F5E9',
    borderRadius: 4,
    padding: '2px 4px'
  },
  tooltip: {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    background: theme.primary,
    color: '#fff',
    padding: '6px 10px',
    borderRadius: 8,
    fontSize: 12,
    whiteSpace: 'nowrap',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  },
  tooltipEmoji: {
    fontSize: 16
  },
  tooltipText: {
    fontWeight: 500
  }
};

export default VocabHighlight;
