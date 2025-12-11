// src/components/ConversationStarters.js
// Conversation Starters - Optional scaffolded prompts during conversation
// Reference: new_004, task_014
//
// Shows contextual conversation starters when user is struggling
// Fades as user gains confidence (based on usage stats)

import React, { useState, useEffect } from 'react';

// Starters organized by conversation context/topic
const STARTERS_BY_TOPIC = {
  general: [
    { spanish: '¿Cómo estás?', english: 'How are you?', type: 'question' },
    { spanish: 'Me llamo...', english: 'My name is...', type: 'statement' },
    { spanish: '¿Y tú?', english: 'And you?', type: 'question' },
    { spanish: 'Me gusta...', english: 'I like...', type: 'statement' },
    { spanish: 'No sé', english: "I don't know", type: 'response' },
    { spanish: '¿Puedes repetir?', english: 'Can you repeat?', type: 'help' },
  ],
  restaurant: [
    { spanish: 'Quisiera...', english: 'I would like...', type: 'request' },
    { spanish: '¿Qué me recomienda?', english: 'What do you recommend?', type: 'question' },
    { spanish: 'La cuenta, por favor', english: 'The check, please', type: 'request' },
    { spanish: '¿Tienen...?', english: 'Do you have...?', type: 'question' },
    { spanish: 'Para mí...', english: 'For me...', type: 'statement' },
    { spanish: '¿Cuánto cuesta?', english: 'How much?', type: 'question' },
  ],
  travel: [
    { spanish: '¿Dónde está...?', english: 'Where is...?', type: 'question' },
    { spanish: '¿Cómo llego a...?', english: 'How do I get to...?', type: 'question' },
    { spanish: 'Busco...', english: "I'm looking for...", type: 'statement' },
    { spanish: 'Una habitación, por favor', english: 'A room, please', type: 'request' },
    { spanish: '¿A qué hora...?', english: 'At what time...?', type: 'question' },
    { spanish: 'Necesito ayuda', english: 'I need help', type: 'help' },
  ],
  shopping: [
    { spanish: '¿Cuánto cuesta?', english: 'How much does it cost?', type: 'question' },
    { spanish: '¿Tienen otro color?', english: 'Do you have another color?', type: 'question' },
    { spanish: 'Me lo llevo', english: "I'll take it", type: 'statement' },
    { spanish: '¿Puedo probármelo?', english: 'Can I try it on?', type: 'question' },
    { spanish: 'Solo estoy mirando', english: "I'm just looking", type: 'response' },
    { spanish: '¿Aceptan tarjeta?', english: 'Do you accept cards?', type: 'question' },
  ],
  greetings: [
    { spanish: '¡Hola!', english: 'Hi!', type: 'greeting' },
    { spanish: '¿Qué tal?', english: "What's up?", type: 'question' },
    { spanish: 'Mucho gusto', english: 'Nice to meet you', type: 'response' },
    { spanish: '¿De dónde eres?', english: 'Where are you from?', type: 'question' },
    { spanish: 'Soy de...', english: "I'm from...", type: 'statement' },
    { spanish: '¡Hasta luego!', english: 'See you later!', type: 'farewell' },
  ],
  'free-chat': [
    { spanish: '¿Qué hiciste hoy?', english: 'What did you do today?', type: 'question' },
    { spanish: 'Hoy yo...', english: 'Today I...', type: 'statement' },
    { spanish: '¿Te gusta...?', english: 'Do you like...?', type: 'question' },
    { spanish: 'Creo que...', english: 'I think that...', type: 'opinion' },
    { spanish: 'Cuéntame más', english: 'Tell me more', type: 'response' },
    { spanish: 'Qué interesante', english: 'How interesting', type: 'response' },
  ],
  'surprise-me': [
    { spanish: '¿De qué quieres hablar?', english: 'What do you want to talk about?', type: 'question' },
    { spanish: 'Sorpréndeme', english: 'Surprise me', type: 'response' },
    { spanish: 'Buena pregunta', english: 'Good question', type: 'response' },
    { spanish: 'Déjame pensar...', english: 'Let me think...', type: 'filler' },
    { spanish: 'Pues...', english: 'Well...', type: 'filler' },
    { spanish: 'Es que...', english: 'The thing is...', type: 'filler' },
  ],
};

// Universal starters that work in any context
const UNIVERSAL_STARTERS = [
  { spanish: '¿Cómo?', english: 'What?/Sorry?', type: 'clarification' },
  { spanish: 'No entiendo', english: "I don't understand", type: 'help' },
  { spanish: 'Más despacio, por favor', english: 'Slower, please', type: 'help' },
  { spanish: 'Un momento...', english: 'One moment...', type: 'filler' },
  { spanish: 'Sí', english: 'Yes', type: 'response' },
  { spanish: 'No', english: 'No', type: 'response' },
];

// Get user's confidence level (affects whether starters show)
const getUserConfidence = () => {
  try {
    const stats = JSON.parse(localStorage.getItem('fluidez_conversation_stats') || '{}');
    const totalExchanges = stats.totalExchanges || 0;
    const unassistedResponses = stats.unassistedResponses || 0;
    
    if (totalExchanges < 10) return 'beginner';
    if (totalExchanges < 50) return 'developing';
    if (unassistedResponses / totalExchanges > 0.7) return 'confident';
    return 'developing';
  } catch {
    return 'beginner';
  }
};

// Track when user uses a starter vs responds on their own
const trackStarterUsage = (usedStarter = false) => {
  try {
    const stats = JSON.parse(localStorage.getItem('fluidez_conversation_stats') || '{}');
    stats.totalExchanges = (stats.totalExchanges || 0) + 1;
    if (!usedStarter) {
      stats.unassistedResponses = (stats.unassistedResponses || 0) + 1;
    }
    localStorage.setItem('fluidez_conversation_stats', JSON.stringify(stats));
  } catch (e) {
    console.log('Could not track starter usage');
  }
};

const ConversationStarters = ({ 
  topic = 'general', 
  onSelectStarter, 
  isExpanded = false,
  onToggle,
  forceShow = false, // Override confidence-based hiding
}) => {
  const [expanded, setExpanded] = useState(isExpanded);
  const [confidence, setConfidence] = useState(getUserConfidence());

  useEffect(() => {
    setConfidence(getUserConfidence());
  }, []);

  // Don't show if user is confident (unless forced)
  if (confidence === 'confident' && !forceShow) {
    return null;
  }

  const topicStarters = STARTERS_BY_TOPIC[topic] || STARTERS_BY_TOPIC.general;
  const starters = [...topicStarters.slice(0, 4), ...UNIVERSAL_STARTERS.slice(0, 2)];

  const handleSelect = (starter) => {
    trackStarterUsage(true);
    if (onSelectStarter) {
      onSelectStarter(starter);
    }
  };

  const handleToggle = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    if (onToggle) onToggle(newExpanded);
  };

  const s = {
    container: {
      position: 'relative',
    },
    toggleButton: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 16px',
      background: expanded ? '#e8f5e9' : 'rgba(255,255,255,0.9)',
      border: expanded ? '2px solid #4caf50' : '2px solid #e0e0e0',
      borderRadius: 20,
      fontSize: 14,
      color: expanded ? '#2D5A27' : '#666',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    startersPanel: {
      position: 'absolute',
      bottom: '100%',
      left: 0,
      right: 0,
      background: 'white',
      borderRadius: 16,
      padding: 12,
      marginBottom: 8,
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      display: expanded ? 'block' : 'none',
      zIndex: 100,
    },
    startersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 8,
    },
    starterChip: {
      padding: '10px 12px',
      background: '#f5f5f5',
      borderRadius: 12,
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all 0.2s',
    },
    starterSpanish: {
      fontSize: 15,
      fontWeight: 500,
      color: '#333',
      marginBottom: 2,
    },
    starterEnglish: {
      fontSize: 12,
      color: '#888',
    },
    panelHeader: {
      fontSize: 13,
      color: '#666',
      marginBottom: 10,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  };

  return (
    <div style={s.container}>
      {/* Starters panel */}
      <div style={s.startersPanel}>
        <div style={s.panelHeader}>
          <span>💡 Need a starter?</span>
          <button 
            onClick={handleToggle}
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: 18, 
              cursor: 'pointer',
              color: '#999',
            }}
          >
            ×
          </button>
        </div>
        <div style={s.startersGrid}>
          {starters.map((starter, idx) => (
            <button
              key={idx}
              style={s.starterChip}
              onClick={() => handleSelect(starter)}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#e8f5e9';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#f5f5f5';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div style={s.starterSpanish}>{starter.spanish}</div>
              <div style={s.starterEnglish}>{starter.english}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Toggle button */}
      <button 
        style={s.toggleButton}
        onClick={handleToggle}
      >
        <span>💡</span>
        {expanded ? 'Hide starters' : 'Need help?'}
      </button>
    </div>
  );
};

// Compact inline version for tight spaces
const ConversationStartersInline = ({ topic = 'general', onSelectStarter }) => {
  const [showAll, setShowAll] = useState(false);
  
  const topicStarters = STARTERS_BY_TOPIC[topic] || STARTERS_BY_TOPIC.general;
  const starters = showAll ? topicStarters : topicStarters.slice(0, 3);

  const s = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      padding: '8px 0',
    },
    chip: {
      padding: '6px 12px',
      background: '#f5f5f5',
      borderRadius: 16,
      border: 'none',
      fontSize: 14,
      color: '#333',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    moreButton: {
      padding: '6px 12px',
      background: 'transparent',
      border: '1px dashed #ccc',
      borderRadius: 16,
      fontSize: 13,
      color: '#888',
      cursor: 'pointer',
    },
  };

  return (
    <div style={s.container}>
      {starters.map((starter, idx) => (
        <button
          key={idx}
          style={s.chip}
          onClick={() => {
            trackStarterUsage(true);
            if (onSelectStarter) onSelectStarter(starter);
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#e8f5e9'}
          onMouseOut={(e) => e.currentTarget.style.background = '#f5f5f5'}
        >
          {starter.spanish}
        </button>
      ))}
      {!showAll && topicStarters.length > 3 && (
        <button style={s.moreButton} onClick={() => setShowAll(true)}>
          +{topicStarters.length - 3} more
        </button>
      )}
    </div>
  );
};

export { 
  ConversationStarters, 
  ConversationStartersInline, 
  STARTERS_BY_TOPIC, 
  UNIVERSAL_STARTERS,
  trackStarterUsage,
  getUserConfidence,
};
export default ConversationStarters;
