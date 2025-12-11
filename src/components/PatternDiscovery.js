// src/modes/PatternDiscovery.js
// Pattern Discovery - Meaning-First Grammar Learning (replaces Grammar Drills)
// Reference: new_002, change_011, change_012, change_013
//
// KEY DIFFERENCE FROM GRAMMAR DRILLS:
// - Old: "Conjugate HABLAR in yo form" → Right/Wrong
// - New: "Tell your friend what you do on weekends" → Your attempt → How María would say it

import React, { useState, useEffect } from 'react';

// Pattern categories organized by communicative function (not grammar rules)
const PATTERN_CATEGORIES = [
  { id: 'talking-about-now', name: 'Talking About Now', emoji: '🕐', description: 'What you\'re doing right now' },
  { id: 'talking-about-past', name: 'Sharing Stories', emoji: '📖', description: 'Things that happened' },
  { id: 'talking-about-future', name: 'Making Plans', emoji: '📅', description: 'What you\'re going to do' },
  { id: 'describing-things', name: 'Describing Things', emoji: '🎨', description: 'How things look, feel, are' },
  { id: 'expressing-wants', name: 'Saying What You Want', emoji: '💭', description: 'Wishes, desires, needs' },
  { id: 'asking-questions', name: 'Asking Questions', emoji: '❓', description: 'Getting information' },
  { id: 'giving-opinions', name: 'Sharing Opinions', emoji: '💬', description: 'What you think and feel' },
  { id: 'making-requests', name: 'Making Requests', emoji: '🙏', description: 'Asking politely' },
];

// Scenarios for each pattern - communicative context first!
const PATTERN_SCENARIOS = {
  'talking-about-now': [
    {
      id: 'now-1',
      situation: 'Your friend calls and asks what you\'re doing.',
      image: '📱',
      prompt: 'Tell them you\'re eating breakfast.',
      nativeSays: 'Estoy desayunando.',
      alternates: ['Estoy comiendo el desayuno.', 'Desayuno ahorita.'],
      patternHint: 'Notice: "Estoy" + verb ending in "-ando/-iendo" = what\'s happening right now',
      keyPhrase: 'Estoy + -ando/-iendo',
    },
    {
      id: 'now-2',
      situation: 'You\'re at a café and the waiter asks if you need anything.',
      image: '☕',
      prompt: 'Tell them you\'re waiting for a friend.',
      nativeSays: 'Estoy esperando a un amigo.',
      alternates: ['Espero a un amigo.', 'Estoy esperando a alguien.'],
      patternHint: 'Same pattern! "Estoy esperando" = I\'m waiting',
      keyPhrase: 'Estoy esperando',
    },
    {
      id: 'now-3',
      situation: 'Your roommate looks for you and finds you in your room.',
      image: '📚',
      prompt: 'Tell them you\'re studying Spanish.',
      nativeSays: 'Estoy estudiando español.',
      alternates: ['Estudio español.', 'Estoy practicando español.'],
      patternHint: '"Estoy estudiando" = I\'m studying (right now)',
      keyPhrase: 'Estoy estudiando',
    },
    {
      id: 'now-4',
      situation: 'Someone at the gym asks what you\'re doing.',
      image: '🏃',
      prompt: 'Tell them you\'re running.',
      nativeSays: 'Estoy corriendo.',
      alternates: ['Corro.', 'Hago ejercicio.'],
      patternHint: 'For -er/-ir verbs: "Estoy" + "-iendo"',
      keyPhrase: 'Estoy corriendo',
    },
  ],
  'talking-about-past': [
    {
      id: 'past-1',
      situation: 'Your friend asks about your weekend.',
      image: '🎬',
      prompt: 'Tell them you watched a movie.',
      nativeSays: 'Vi una película.',
      alternates: ['Miré una película.', 'Fui al cine.'],
      patternHint: 'For past actions: the verb changes form. "Ver" → "Vi" (I saw/watched)',
      keyPhrase: 'Vi = I saw/watched',
    },
    {
      id: 'past-2',
      situation: 'María asks what you did yesterday.',
      image: '🍽️',
      prompt: 'Tell her you ate at a restaurant.',
      nativeSays: 'Comí en un restaurante.',
      alternates: ['Fui a comer a un restaurante.', 'Cené afuera.'],
      patternHint: '"Comer" → "Comí" = I ate. Notice the -í ending for "I" in past.',
      keyPhrase: 'Comí = I ate',
    },
    {
      id: 'past-3',
      situation: 'Someone asks about your trip.',
      image: '✈️',
      prompt: 'Tell them you traveled to Mexico.',
      nativeSays: 'Viajé a México.',
      alternates: ['Fui a México.', 'Visité México.'],
      patternHint: '"Viajar" → "Viajé" = I traveled. The -é ending for -ar verbs in past.',
      keyPhrase: 'Viajé = I traveled',
    },
  ],
  'talking-about-future': [
    {
      id: 'future-1',
      situation: 'Your friend asks about your plans tonight.',
      image: '🍿',
      prompt: 'Tell them you\'re going to watch TV.',
      nativeSays: 'Voy a ver la tele.',
      alternates: ['Veré la televisión.', 'Pienso ver algo en Netflix.'],
      patternHint: '"Voy a" + verb = I\'m going to... (easy way to talk about future!)',
      keyPhrase: 'Voy a + verb',
    },
    {
      id: 'future-2',
      situation: 'María asks about your weekend plans.',
      image: '🏖️',
      prompt: 'Tell her you\'re going to go to the beach.',
      nativeSays: 'Voy a ir a la playa.',
      alternates: ['Iré a la playa.', 'Pienso ir a la playa.'],
      patternHint: 'Same pattern: "Voy a ir" = I\'m going to go',
      keyPhrase: 'Voy a ir',
    },
    {
      id: 'future-3',
      situation: 'A coworker asks what you\'ll do after work.',
      image: '🏠',
      prompt: 'Tell them you\'re going to rest.',
      nativeSays: 'Voy a descansar.',
      alternates: ['Descansaré.', 'Pienso relajarme.'],
      patternHint: '"Voy a descansar" = I\'m going to rest. Works with any verb!',
      keyPhrase: 'Voy a descansar',
    },
  ],
  'expressing-wants': [
    {
      id: 'want-1',
      situation: 'You\'re at a restaurant looking at the menu.',
      image: '🍕',
      prompt: 'Tell the waiter you want pizza.',
      nativeSays: 'Quiero pizza.',
      alternates: ['Quisiera pizza.', 'Me gustaría pizza.'],
      patternHint: '"Quiero" = I want. Simple and direct!',
      keyPhrase: 'Quiero',
    },
    {
      id: 'want-2',
      situation: 'Your friend asks what you want to do.',
      image: '💃',
      prompt: 'Tell them you want to dance.',
      nativeSays: 'Quiero bailar.',
      alternates: ['Tengo ganas de bailar.', 'Me gustaría bailar.'],
      patternHint: '"Quiero" + verb = I want to (do something)',
      keyPhrase: 'Quiero + verb',
    },
    {
      id: 'want-3',
      situation: 'You\'re thirsty at a party.',
      image: '🥤',
      prompt: 'Tell the host you\'d like water.',
      nativeSays: 'Quisiera agua, por favor.',
      alternates: ['Quiero agua.', '¿Me puede dar agua?'],
      patternHint: '"Quisiera" = I would like (more polite than "quiero")',
      keyPhrase: 'Quisiera',
    },
  ],
  'asking-questions': [
    {
      id: 'question-1',
      situation: 'You\'re lost in a new city.',
      image: '🗺️',
      prompt: 'Ask where the bathroom is.',
      nativeSays: '¿Dónde está el baño?',
      alternates: ['¿Dónde hay un baño?', '¿Me puede decir dónde está el baño?'],
      patternHint: '"¿Dónde está...?" = Where is...?',
      keyPhrase: '¿Dónde está?',
    },
    {
      id: 'question-2',
      situation: 'You\'re shopping and see something you like.',
      image: '🏷️',
      prompt: 'Ask how much it costs.',
      nativeSays: '¿Cuánto cuesta?',
      alternates: ['¿Cuánto es?', '¿Qué precio tiene?'],
      patternHint: '"¿Cuánto cuesta?" = How much does it cost?',
      keyPhrase: '¿Cuánto cuesta?',
    },
    {
      id: 'question-3',
      situation: 'You meet someone new at a party.',
      image: '👋',
      prompt: 'Ask what their name is.',
      nativeSays: '¿Cómo te llamas?',
      alternates: ['¿Cuál es tu nombre?', '¿Cómo se llama?'],
      patternHint: '"¿Cómo te llamas?" = What\'s your name? (casual)',
      keyPhrase: '¿Cómo te llamas?',
    },
  ],
  'describing-things': [
    {
      id: 'describe-1',
      situation: 'Your friend asks about your new apartment.',
      image: '🏠',
      prompt: 'Tell them it\'s big and beautiful.',
      nativeSays: 'Es grande y bonito.',
      alternates: ['Es muy grande y lindo.', 'Es amplio y hermoso.'],
      patternHint: '"Es" + adjective = It is... (for permanent qualities)',
      keyPhrase: 'Es + adjective',
    },
    {
      id: 'describe-2',
      situation: 'Someone asks how you\'re feeling.',
      image: '😊',
      prompt: 'Tell them you\'re happy.',
      nativeSays: 'Estoy feliz.',
      alternates: ['Estoy contento/a.', 'Me siento bien.'],
      patternHint: '"Estoy" + feeling = I am/feel... (for current states)',
      keyPhrase: 'Estoy + feeling',
    },
    {
      id: 'describe-3',
      situation: 'You\'re describing the weather to plan an outing.',
      image: '☀️',
      prompt: 'Tell your friend it\'s hot today.',
      nativeSays: 'Hace calor hoy.',
      alternates: ['Está caliente.', 'Hoy está muy caluroso.'],
      patternHint: '"Hace calor/frío" = It\'s hot/cold (for weather)',
      keyPhrase: 'Hace calor',
    },
  ],
  'giving-opinions': [
    {
      id: 'opinion-1',
      situation: 'Your friend asks what you think of a movie.',
      image: '🎬',
      prompt: 'Tell them you think it\'s very good.',
      nativeSays: 'Creo que es muy buena.',
      alternates: ['Pienso que es excelente.', 'Me parece muy buena.'],
      patternHint: '"Creo que..." = I think that...',
      keyPhrase: 'Creo que',
    },
    {
      id: 'opinion-2',
      situation: 'Someone asks if you like the food.',
      image: '🍲',
      prompt: 'Tell them you love it.',
      nativeSays: 'Me encanta.',
      alternates: ['Me gusta mucho.', '¡Está delicioso!'],
      patternHint: '"Me encanta" = I love it (stronger than "me gusta")',
      keyPhrase: 'Me encanta',
    },
    {
      id: 'opinion-3',
      situation: 'You\'re discussing plans and want to share your preference.',
      image: '🤔',
      prompt: 'Say you prefer going to the beach.',
      nativeSays: 'Prefiero ir a la playa.',
      alternates: ['Me gustaría más ir a la playa.', 'Yo prefiero la playa.'],
      patternHint: '"Prefiero" + verb = I prefer to...',
      keyPhrase: 'Prefiero',
    },
  ],
  'making-requests': [
    {
      id: 'request-1',
      situation: 'You need help reaching something at a store.',
      image: '🏪',
      prompt: 'Ask if they can help you.',
      nativeSays: '¿Me puede ayudar?',
      alternates: ['¿Podría ayudarme?', '¿Me ayuda, por favor?'],
      patternHint: '"¿Me puede...?" = Can you...? (for me)',
      keyPhrase: '¿Me puede...?',
    },
    {
      id: 'request-2',
      situation: 'You\'re at a restaurant and want the check.',
      image: '💳',
      prompt: 'Ask for the check.',
      nativeSays: 'La cuenta, por favor.',
      alternates: ['¿Me trae la cuenta?', '¿Nos puede traer la cuenta?'],
      patternHint: 'Adding "por favor" makes any request polite!',
      keyPhrase: 'por favor',
    },
    {
      id: 'request-3',
      situation: 'You didn\'t hear what someone said.',
      image: '👂',
      prompt: 'Ask them to repeat it.',
      nativeSays: '¿Puede repetir, por favor?',
      alternates: ['¿Cómo?', '¿Me lo puede repetir?', 'Perdón, no entendí.'],
      patternHint: '"¿Puede repetir?" = Can you repeat? (super useful!)',
      keyPhrase: '¿Puede repetir?',
    },
  ],
};

const PatternDiscovery = ({ onBack, onPracticeInConversation }) => {
  const [phase, setPhase] = useState('categories'); // categories, scenarios, practice, reflection
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [userAttempt, setUserAttempt] = useState('');
  const [showComparison, setShowComparison] = useState(false);
  const [showPattern, setShowPattern] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState([]);

  // Track progress in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('fluidez_pattern_progress');
    if (saved) setCompletedScenarios(JSON.parse(saved));
  }, []);

  const saveProgress = (scenarioId) => {
    const updated = [...new Set([...completedScenarios, scenarioId])];
    setCompletedScenarios(updated);
    localStorage.setItem('fluidez_pattern_progress', JSON.stringify(updated));
  };

  const currentScenarios = selectedCategory ? PATTERN_SCENARIOS[selectedCategory.id] || [] : [];
  const currentScenario = currentScenarios[currentScenarioIndex];

  const handleSubmitAttempt = () => {
    if (userAttempt.trim()) {
      setShowComparison(true);
      saveProgress(currentScenario.id);
    }
  };

  const handleNextScenario = () => {
    if (currentScenarioIndex < currentScenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      setUserAttempt('');
      setShowComparison(false);
      setShowPattern(false);
    } else {
      // Completed all scenarios in category
      setPhase('reflection');
    }
  };

  const handleTryInConversation = () => {
    if (onPracticeInConversation) {
      onPracticeInConversation(selectedCategory, currentScenario?.keyPhrase);
    }
  };

  // Styles
  const s = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f0 100%)',
      padding: 20,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      marginBottom: 24,
    },
    backButton: {
      background: 'none',
      border: 'none',
      fontSize: 24,
      cursor: 'pointer',
      padding: 8,
    },
    title: {
      fontSize: 24,
      fontWeight: 600,
      color: '#2D5A27',
      margin: 0,
    },
    subtitle: {
      fontSize: 14,
      color: '#666',
      margin: 0,
      marginTop: 4,
    },
    categoryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 16,
    },
    categoryCard: {
      background: 'white',
      borderRadius: 16,
      padding: 20,
      cursor: 'pointer',
      border: '2px solid transparent',
      transition: 'all 0.2s',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    },
    categoryEmoji: {
      fontSize: 32,
      marginBottom: 8,
    },
    categoryName: {
      fontSize: 16,
      fontWeight: 600,
      color: '#333',
      marginBottom: 4,
    },
    categoryDesc: {
      fontSize: 13,
      color: '#666',
    },
    scenarioCard: {
      background: 'white',
      borderRadius: 20,
      padding: 24,
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    },
    situationBadge: {
      display: 'inline-block',
      background: '#e8f5e9',
      color: '#2D5A27',
      padding: '6px 12px',
      borderRadius: 20,
      fontSize: 13,
      fontWeight: 500,
      marginBottom: 16,
    },
    situationText: {
      fontSize: 18,
      color: '#333',
      marginBottom: 20,
      lineHeight: 1.5,
    },
    scenarioImage: {
      fontSize: 48,
      textAlign: 'center',
      marginBottom: 20,
    },
    promptLabel: {
      fontSize: 14,
      color: '#666',
      marginBottom: 8,
    },
    promptText: {
      fontSize: 20,
      fontWeight: 600,
      color: '#2D5A27',
      marginBottom: 20,
      padding: 16,
      background: '#f8f9fa',
      borderRadius: 12,
      borderLeft: '4px solid #4caf50',
    },
    inputArea: {
      width: '100%',
      padding: 16,
      fontSize: 18,
      border: '2px solid #e0e0e0',
      borderRadius: 12,
      marginBottom: 16,
      fontFamily: 'inherit',
      resize: 'none',
    },
    submitButton: {
      width: '100%',
      padding: 16,
      background: '#2D5A27',
      color: 'white',
      border: 'none',
      borderRadius: 12,
      fontSize: 18,
      fontWeight: 600,
      cursor: 'pointer',
    },
    comparisonContainer: {
      marginTop: 24,
    },
    comparisonBox: {
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
    },
    yourAttempt: {
      background: '#e3f2fd',
      borderLeft: '4px solid #2196f3',
    },
    nativeWay: {
      background: '#e8f5e9',
      borderLeft: '4px solid #4caf50',
    },
    comparisonLabel: {
      fontSize: 13,
      fontWeight: 600,
      color: '#666',
      marginBottom: 8,
    },
    comparisonText: {
      fontSize: 18,
      color: '#333',
    },
    alternatesSection: {
      marginTop: 16,
      padding: 16,
      background: '#fff8e1',
      borderRadius: 12,
    },
    alternatesLabel: {
      fontSize: 13,
      fontWeight: 600,
      color: '#f57c00',
      marginBottom: 8,
    },
    patternButton: {
      width: '100%',
      padding: 14,
      background: 'transparent',
      border: '2px solid #2D5A27',
      color: '#2D5A27',
      borderRadius: 12,
      fontSize: 16,
      fontWeight: 500,
      cursor: 'pointer',
      marginTop: 16,
    },
    patternBox: {
      marginTop: 16,
      padding: 16,
      background: '#f3e5f5',
      borderRadius: 12,
      borderLeft: '4px solid #9c27b0',
    },
    nextButton: {
      width: '100%',
      padding: 16,
      background: '#2D5A27',
      color: 'white',
      border: 'none',
      borderRadius: 12,
      fontSize: 18,
      fontWeight: 600,
      cursor: 'pointer',
      marginTop: 20,
    },
    tryConversationButton: {
      width: '100%',
      padding: 14,
      background: 'transparent',
      border: '2px solid #2D5A27',
      color: '#2D5A27',
      borderRadius: 12,
      fontSize: 16,
      fontWeight: 500,
      cursor: 'pointer',
      marginTop: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    progressDots: {
      display: 'flex',
      justifyContent: 'center',
      gap: 8,
      marginBottom: 20,
    },
    dot: (active, completed) => ({
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: completed ? '#4caf50' : active ? '#2D5A27' : '#e0e0e0',
    }),
    reflectionCard: {
      background: 'white',
      borderRadius: 20,
      padding: 32,
      textAlign: 'center',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    },
    celebrationEmoji: {
      fontSize: 64,
      marginBottom: 16,
    },
    reflectionTitle: {
      fontSize: 24,
      fontWeight: 600,
      color: '#2D5A27',
      marginBottom: 8,
    },
    reflectionText: {
      fontSize: 16,
      color: '#666',
      marginBottom: 24,
    },
    keyPhrasesBox: {
      background: '#f8f9fa',
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
      textAlign: 'left',
    },
  };

  // Render categories phase
  if (phase === 'categories') {
    return (
      <div style={s.container}>
        <div style={s.header}>
          <button style={s.backButton} onClick={onBack}>←</button>
          <div>
            <h1 style={s.title}>Pattern Discovery</h1>
            <p style={s.subtitle}>Learn by communicating, not memorizing rules</p>
          </div>
        </div>

        <div style={s.categoryGrid}>
          {PATTERN_CATEGORIES.map((category) => {
            const categoryScenarios = PATTERN_SCENARIOS[category.id] || [];
            const completedCount = categoryScenarios.filter(sc => 
              completedScenarios.includes(sc.id)
            ).length;
            
            return (
              <div
                key={category.id}
                style={{
                  ...s.categoryCard,
                  border: completedCount === categoryScenarios.length && categoryScenarios.length > 0
                    ? '2px solid #4caf50'
                    : '2px solid transparent',
                }}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentScenarioIndex(0);
                  setPhase('scenarios');
                }}
              >
                <div style={s.categoryEmoji}>{category.emoji}</div>
                <div style={s.categoryName}>{category.name}</div>
                <div style={s.categoryDesc}>{category.description}</div>
                {categoryScenarios.length > 0 && (
                  <div style={{ fontSize: 12, color: '#888', marginTop: 8 }}>
                    {completedCount}/{categoryScenarios.length} practiced
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Render scenario practice phase
  if (phase === 'scenarios' && currentScenario) {
    return (
      <div style={s.container}>
        <div style={s.header}>
          <button style={s.backButton} onClick={() => setPhase('categories')}>←</button>
          <div>
            <h1 style={s.title}>{selectedCategory.emoji} {selectedCategory.name}</h1>
          </div>
        </div>

        {/* Progress dots */}
        <div style={s.progressDots}>
          {currentScenarios.map((_, idx) => (
            <div
              key={idx}
              style={s.dot(
                idx === currentScenarioIndex,
                completedScenarios.includes(currentScenarios[idx]?.id)
              )}
            />
          ))}
        </div>

        <div style={s.scenarioCard}>
          <div style={s.situationBadge}>📍 Situation</div>
          <div style={s.scenarioImage}>{currentScenario.image}</div>
          <p style={s.situationText}>{currentScenario.situation}</p>
          
          <div style={s.promptLabel}>Your goal:</div>
          <div style={s.promptText}>{currentScenario.prompt}</div>

          {!showComparison ? (
            <>
              <textarea
                style={s.inputArea}
                placeholder="Type what you would say in Spanish... (it's okay to guess!)"
                value={userAttempt}
                onChange={(e) => setUserAttempt(e.target.value)}
                rows={2}
              />
              <button 
                style={{
                  ...s.submitButton,
                  opacity: userAttempt.trim() ? 1 : 0.5,
                }}
                onClick={handleSubmitAttempt}
                disabled={!userAttempt.trim()}
              >
                See How María Would Say It
              </button>
            </>
          ) : (
            <div style={s.comparisonContainer}>
              {/* Your attempt */}
              <div style={{ ...s.comparisonBox, ...s.yourAttempt }}>
                <div style={s.comparisonLabel}>✨ You said:</div>
                <div style={s.comparisonText}>{userAttempt}</div>
              </div>

              {/* Native way */}
              <div style={{ ...s.comparisonBox, ...s.nativeWay }}>
                <div style={s.comparisonLabel}>💚 María would say:</div>
                <div style={s.comparisonText}>{currentScenario.nativeSays}</div>
              </div>

              {/* Alternates */}
              {currentScenario.alternates && (
                <div style={s.alternatesSection}>
                  <div style={s.alternatesLabel}>🔄 Other ways to say it:</div>
                  {currentScenario.alternates.map((alt, idx) => (
                    <div key={idx} style={{ fontSize: 15, color: '#666', marginTop: 4 }}>
                      • {alt}
                    </div>
                  ))}
                </div>
              )}

              {/* Pattern reveal button */}
              {!showPattern && (
                <button style={s.patternButton} onClick={() => setShowPattern(true)}>
                  🔍 Notice the Pattern
                </button>
              )}

              {/* Pattern explanation */}
              {showPattern && (
                <div style={s.patternBox}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#7b1fa2', marginBottom: 8 }}>
                    💡 Pattern:
                  </div>
                  <div style={{ fontSize: 15, color: '#333' }}>
                    {currentScenario.patternHint}
                  </div>
                  <div style={{ 
                    marginTop: 12, 
                    padding: '8px 12px', 
                    background: 'white', 
                    borderRadius: 8,
                    display: 'inline-block',
                    fontWeight: 600,
                    color: '#7b1fa2',
                  }}>
                    {currentScenario.keyPhrase}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <button style={s.nextButton} onClick={handleNextScenario}>
                {currentScenarioIndex < currentScenarios.length - 1 ? 'Next Scenario →' : 'Finish! 🎉'}
              </button>

              <button style={s.tryConversationButton} onClick={handleTryInConversation}>
                💬 Try This in a Real Conversation
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Render reflection phase
  if (phase === 'reflection') {
    const keyPhrases = currentScenarios.map(sc => sc.keyPhrase);
    
    return (
      <div style={s.container}>
        <div style={s.reflectionCard}>
          <div style={s.celebrationEmoji}>🌟</div>
          <h2 style={s.reflectionTitle}>Great Discovery!</h2>
          <p style={s.reflectionText}>
            You practiced {selectedCategory.name.toLowerCase()} through real situations.
          </p>

          <div style={s.keyPhrasesBox}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#666', marginBottom: 12 }}>
              Key phrases you discovered:
            </div>
            {keyPhrases.map((phrase, idx) => (
              <div key={idx} style={{ 
                padding: '8px 12px', 
                background: '#e8f5e9', 
                borderRadius: 8, 
                marginBottom: 8,
                color: '#2D5A27',
                fontWeight: 500,
              }}>
                {phrase}
              </div>
            ))}
          </div>

          <button style={s.nextButton} onClick={handleTryInConversation}>
            💬 Practice in Conversation
          </button>

          <button 
            style={{ ...s.patternButton, marginTop: 12 }}
            onClick={() => setPhase('categories')}
          >
            ← Back to Categories
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default PatternDiscovery;
