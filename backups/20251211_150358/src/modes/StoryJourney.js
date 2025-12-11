import React, { useState, useEffect } from 'react';

/**
 * StoryJourney
 * 
 * Immersive story-based learning where user makes choices in Spanish.
 * Narrative-driven practice that feels like a game, not a lesson.
 * 
 * Design principles:
 * - Compelling stories with emotional stakes
 * - Choices in Spanish (with support as needed)
 * - No wrong answers, just different paths
 * - Celebrates participation over perfection
 */

const theme = {
  primary: '#2D5A27',
  primaryLight: '#4A7C43',
  bg: '#FAFAFA',
  surface: '#FFF',
  text: '#1A1A1A',
  textLight: '#666',
  border: '#E0E0E0',
  success: '#4CAF50',
  story: '#1a1a2e'
};

// Story adventures
const STORIES = {
  'cafe-mystery': {
    id: 'cafe-mystery',
    title: 'El Misterio del Café',
    subtitle: 'A mystery unfolds at a Mexico City café',
    emoji: '☕',
    difficulty: 'A1-A2',
    duration: '5-10 min',
    scenes: [
      {
        id: 'intro',
        background: '🌆',
        narration: 'You\'re sitting in a cozy café in Mexico City. The smell of fresh coffee fills the air. A woman at the next table suddenly gasps and looks at you.',
        mariaText: '¡Disculpe! ¿Habla español?',
        choices: [
          { text: 'Sí, un poco', nextScene: 'help-yes', spanish: 'Sí, un poco' },
          { text: 'No mucho, pero...', nextScene: 'help-yes', spanish: 'No mucho, pero puedo intentar' },
          { text: '(Pretend not to hear)', nextScene: 'ignore', spanish: null }
        ]
      },
      {
        id: 'help-yes',
        background: '☕',
        narration: 'The woman looks relieved. She holds up a mysterious envelope.',
        mariaText: '¡Gracias! Encontré esta carta, pero no es mía. Tiene un nombre... ¿puede leerlo?',
        choices: [
          { text: 'Let me see...', nextScene: 'read-letter', spanish: 'Déjame ver...' },
          { text: 'Where did you find it?', nextScene: 'ask-where', spanish: '¿Dónde la encontró?' }
        ]
      },
      {
        id: 'ignore',
        background: '☕',
        narration: 'You look away, but the woman gently taps your shoulder.',
        mariaText: 'Por favor... es importante. Solo necesito un momento.',
        choices: [
          { text: 'Okay, what is it?', nextScene: 'help-yes', spanish: 'Está bien, ¿qué pasa?' },
          { text: 'I\'m sorry, I\'m busy', nextScene: 'leave-early', spanish: 'Lo siento, estoy ocupado' }
        ]
      },
      {
        id: 'ask-where',
        background: '☕',
        narration: 'The woman points to an empty table near the window.',
        mariaText: 'Allí, en esa mesa. Alguien la dejó hace diez minutos. El sobre dice "URGENTE".',
        choices: [
          { text: 'Let\'s read it together', nextScene: 'read-letter', spanish: 'Vamos a leerla juntos' },
          { text: 'Should we call someone?', nextScene: 'call-staff', spanish: '¿Debemos llamar a alguien?' }
        ]
      },
      {
        id: 'read-letter',
        background: '📜',
        narration: 'The envelope says "Para María García - URGENTE". Inside is a handwritten note.',
        mariaText: '"Querida María: El paquete está debajo de la tercera mesa. No confíes en nadie con lentes rojos. - Tu amigo"',
        choices: [
          { text: 'Look for the package!', nextScene: 'find-package', spanish: '¡Busquemos el paquete!' },
          { text: 'This could be dangerous...', nextScene: 'hesitate', spanish: 'Esto podría ser peligroso...' },
          { text: 'Who is María García?', nextScene: 'ask-maria', spanish: '¿Quién es María García?' }
        ]
      },
      {
        id: 'call-staff',
        background: '👨‍🍳',
        narration: 'A waiter approaches. He\'s wearing... red glasses.',
        mariaText: '¿Necesitan ayuda? ¿Encontraron algo interesante?',
        choices: [
          { text: 'No, everything is fine', nextScene: 'suspicious', spanish: 'No, todo está bien' },
          { text: 'We found a letter...', nextScene: 'reveal-letter', spanish: 'Encontramos una carta...' }
        ]
      },
      {
        id: 'find-package',
        background: '📦',
        narration: 'You both look under the third table. There\'s a small box wrapped in brown paper!',
        mariaText: '¡Lo encontramos! ¿Qué hacemos ahora? ¿Lo abrimos?',
        choices: [
          { text: 'Yes, open it!', nextScene: 'open-box', spanish: '¡Sí, ábrelo!' },
          { text: 'Wait, it\'s not ours', nextScene: 'ethical-pause', spanish: 'Espera, no es nuestro' },
          { text: 'Let\'s find the real María', nextScene: 'find-maria', spanish: 'Busquemos a la verdadera María' }
        ]
      },
      {
        id: 'open-box',
        background: '🎁',
        narration: 'Inside the box is... an old photograph and a key! The photo shows this very café, but from many years ago.',
        mariaText: '¡Increíble! Esta foto es muy antigua. Y esta llave... ¿de qué será?',
        choices: [
          { text: 'Look for a lock somewhere', nextScene: 'search-lock', spanish: 'Busquemos una cerradura' },
          { text: 'Ask the café staff', nextScene: 'ask-about-photo', spanish: 'Preguntemos al personal' }
        ]
      },
      {
        id: 'search-lock',
        background: '🔐',
        narration: 'You notice a small, old door behind the counter that looks like it hasn\'t been opened in years.',
        mariaText: '¡Mira! Esa puerta pequeña... ¿crees que la llave funciona ahí?',
        choices: [
          { text: 'Only one way to find out!', nextScene: 'ending-adventure', spanish: '¡Solo hay una forma de saberlo!' },
          { text: 'This is getting too crazy', nextScene: 'ending-safe', spanish: 'Esto se está poniendo muy loco' }
        ]
      },
      {
        id: 'ending-adventure',
        background: '🌟',
        narration: 'The key turns! Behind the door, you find a time capsule from 1952 - letters, photos, and a journal. The café owner is overjoyed - it\'s from her grandmother!',
        mariaText: '¡Qué aventura! Gracias por tu ayuda. ¿Sabes qué? Tu español es muy bueno. ¡Deberías practicar más!',
        choices: [
          { text: 'That was amazing!', nextScene: 'complete', spanish: '¡Eso fue increíble!' }
        ],
        ending: 'adventure'
      },
      {
        id: 'ending-safe',
        background: '☕',
        narration: 'You decide to leave the mystery for another day. The woman thanks you for your help and invites you for coffee.',
        mariaText: 'Gracias por escucharme. ¿Quieres un café? Yo invito.',
        choices: [
          { text: 'I\'d love that!', nextScene: 'complete', spanish: '¡Me encantaría!' }
        ],
        ending: 'connection'
      },
      {
        id: 'complete',
        background: '🎉',
        isEnding: true,
        narration: '¡Felicidades! You completed the story!',
        mariaText: '¡Muy bien! Usaste mucho español en esta aventura.',
        choices: []
      }
    ]
  },
  'market-adventure': {
    id: 'market-adventure',
    title: 'Aventura en el Mercado',
    subtitle: 'Navigate a busy Mexican market',
    emoji: '🛒',
    difficulty: 'A1',
    duration: '5 min',
    scenes: [
      {
        id: 'intro',
        background: '🏪',
        narration: 'You\'re at a colorful Mexican market. The sounds and smells are incredible! You need to buy ingredients for dinner.',
        mariaText: '¡Bienvenido al mercado! ¿Qué necesitas hoy?',
        choices: [
          { text: 'I need fruits', nextScene: 'fruits', spanish: 'Necesito frutas' },
          { text: 'I\'m looking for vegetables', nextScene: 'vegetables', spanish: 'Busco verduras' },
          { text: 'Just looking around', nextScene: 'explore', spanish: 'Solo estoy mirando' }
        ]
      },
      {
        id: 'fruits',
        background: '🍎',
        narration: 'You approach a stand overflowing with colorful fruits. The vendor smiles warmly.',
        mariaText: '¡Hola! Tenemos mangos, piñas, papayas... ¿qué le doy?',
        choices: [
          { text: 'How much are the mangos?', nextScene: 'buy-fruit', spanish: '¿Cuánto cuestan los mangos?' },
          { text: 'Can I try one?', nextScene: 'try-fruit', spanish: '¿Puedo probar uno?' }
        ]
      },
      {
        id: 'vegetables',
        background: '🥬',
        narration: 'Mountains of fresh vegetables surround you. A vendor arranges her tomatoes.',
        mariaText: 'Buenos días. Tengo los tomates más frescos del mercado. ¿Cuántos quiere?',
        choices: [
          { text: 'Five tomatoes, please', nextScene: 'buy-veg', spanish: 'Cinco tomates, por favor' },
          { text: 'Do you have onions?', nextScene: 'onions', spanish: '¿Tiene cebollas?' }
        ]
      },
      {
        id: 'buy-fruit',
        background: '💰',
        narration: 'The vendor weighs some beautiful mangos for you.',
        mariaText: 'Tres mangos por veinte pesos. ¿Algo más?',
        choices: [
          { text: 'Perfect, thank you!', nextScene: 'market-end', spanish: '¡Perfecto, gracias!' },
          { text: 'That\'s too expensive', nextScene: 'bargain', spanish: 'Es muy caro' }
        ]
      },
      {
        id: 'bargain',
        background: '🤝',
        narration: 'The vendor laughs and winks at you.',
        mariaText: '¡Ay! Para ti, quince pesos. Pero no le digas a nadie, ¿eh?',
        choices: [
          { text: 'Deal! Thank you!', nextScene: 'market-end', spanish: '¡Trato hecho! ¡Gracias!' }
        ]
      },
      {
        id: 'market-end',
        background: '🎉',
        isEnding: true,
        narration: 'You successfully shopped at the market in Spanish!',
        mariaText: '¡Excelente! Ya puedes ir de compras en cualquier mercado.',
        choices: [],
        ending: 'success'
      }
    ]
  }
};

// Get story progress from localStorage
function getStoryProgress() {
  return JSON.parse(localStorage.getItem('fluidez_story_progress') || '{}');
}

// Save story progress
function saveStoryProgress(progress) {
  localStorage.setItem('fluidez_story_progress', JSON.stringify(progress));
}

export default function StoryJourney({ onBack }) {
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentScene, setCurrentScene] = useState(null);
  const [history, setHistory] = useState([]);
  const [showSpanish, setShowSpanish] = useState({});
  const [completed, setCompleted] = useState(false);
  const [storyProgress, setStoryProgress] = useState({});

  useEffect(() => {
    setStoryProgress(getStoryProgress());
  }, []);

  const startStory = (storyId) => {
    const story = STORIES[storyId];
    setSelectedStory(story);
    setCurrentScene(story.scenes[0]);
    setHistory([]);
    setShowSpanish({});
    setCompleted(false);
  };

  const makeChoice = (choice) => {
    if (choice.nextScene === 'complete' || currentScene.isEnding) {
      // Story complete!
      const progress = { ...storyProgress };
      progress[selectedStory.id] = {
        completed: true,
        ending: currentScene.ending || 'default',
        completedAt: new Date().toISOString(),
        choicesMade: history.length + 1
      };
      setStoryProgress(progress);
      saveStoryProgress(progress);
      setCompleted(true);
      return;
    }

    const nextScene = selectedStory.scenes.find(s => s.id === choice.nextScene);
    if (nextScene) {
      setHistory([...history, { scene: currentScene, choice }]);
      setCurrentScene(nextScene);
      setShowSpanish({});
    }
  };

  const toggleSpanish = (index) => {
    setShowSpanish(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-MX';
      utterance.rate = 0.85;
      speechSynthesis.speak(utterance);
    }
  };

  // Completion screen
  if (completed && selectedStory) {
    return (
      <div style={styles.container}>
        <div style={styles.completionScreen}>
          <span style={{ fontSize: 72 }}>🌟</span>
          <h2 style={{ margin: '16px 0 8px' }}>¡Historia Completa!</h2>
          <h3 style={{ fontWeight: 400, color: theme.textLight }}>
            {selectedStory.title}
          </h3>
          
          <div style={styles.completionStats}>
            <div style={styles.completionStat}>
              <span style={styles.completionNum}>{history.length + 1}</span>
              <span style={styles.completionLabel}>Choices Made</span>
            </div>
            <div style={styles.completionStat}>
              <span style={styles.completionNum}>
                {history.filter(h => h.choice.spanish).length}
              </span>
              <span style={styles.completionLabel}>Spanish Used</span>
            </div>
          </div>

          <p style={{ color: theme.textLight, marginTop: 20, lineHeight: 1.6 }}>
            You navigated a story entirely in Spanish context! 
            Each choice you made practiced real communication skills.
          </p>

          <button onClick={() => setSelectedStory(null)} style={styles.primaryBtn}>
            More Stories
          </button>
          <button onClick={onBack} style={styles.secondaryBtn}>
            Back to App
          </button>
        </div>
      </div>
    );
  }

  // Active story view
  if (selectedStory && currentScene) {
    return (
      <div style={{ ...styles.container, background: theme.story }}>
        {/* Story header */}
        <div style={styles.storyHeader}>
          <button onClick={() => setSelectedStory(null)} style={styles.exitBtn}>✕</button>
          <span style={styles.storyTitle}>{selectedStory.title}</span>
          <span style={styles.sceneCount}>{history.length + 1}</span>
        </div>

        {/* Scene background */}
        <div style={styles.sceneBackground}>
          <span style={{ fontSize: 80 }}>{currentScene.background}</span>
        </div>

        {/* Narration */}
        <div style={styles.narrationBox}>
          <p style={styles.narrationText}>{currentScene.narration}</p>
        </div>

        {/* María's dialogue */}
        {currentScene.mariaText && (
          <div style={styles.dialogueBox}>
            <div style={styles.mariaAvatar}>👩‍🏫</div>
            <div style={styles.speechBubble}>
              <p style={styles.dialogueText}>{currentScene.mariaText}</p>
              <button onClick={() => speak(currentScene.mariaText)} style={styles.speakBtn}>
                🔊
              </button>
            </div>
          </div>
        )}

        {/* Choices */}
        {!currentScene.isEnding && (
          <div style={styles.choicesContainer}>
            {currentScene.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => makeChoice(choice)}
                style={styles.choiceBtn}
              >
                <div style={styles.choiceContent}>
                  <span style={styles.choiceText}>{choice.text}</span>
                  {choice.spanish && (
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleSpanish(index); }}
                      style={styles.toggleSpanishBtn}
                    >
                      {showSpanish[index] ? '🔽' : '🇪🇸'}
                    </button>
                  )}
                </div>
                {showSpanish[index] && choice.spanish && (
                  <div style={styles.spanishReveal}>
                    <span>{choice.spanish}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); speak(choice.spanish); }}
                      style={styles.miniSpeakBtn}
                    >
                      🔊
                    </button>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Ending scene */}
        {currentScene.isEnding && (
          <button 
            onClick={() => makeChoice({ nextScene: 'complete' })} 
            style={styles.finishBtn}
          >
            🎉 Finish Story
          </button>
        )}
      </div>
    );
  }

  // Story selection view
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>📖 Story Adventures</h2>
        <div style={{ width: 40 }} />
      </div>

      <div style={styles.content}>
        <p style={styles.intro}>
          Choose your adventure! Make choices in Spanish and see where the story takes you.
        </p>

        <div style={styles.storyList}>
          {Object.values(STORIES).map(story => {
            const progress = storyProgress[story.id];
            return (
              <div
                key={story.id}
                onClick={() => startStory(story.id)}
                style={styles.storyCard}
              >
                <div style={styles.storyEmoji}>{story.emoji}</div>
                <div style={styles.storyInfo}>
                  <h3 style={styles.storyName}>
                    {progress?.completed && <span style={{ marginRight: 6 }}>✓</span>}
                    {story.title}
                  </h3>
                  <p style={styles.storySubtitle}>{story.subtitle}</p>
                  <div style={styles.storyMeta}>
                    <span style={styles.metaBadge}>{story.difficulty}</span>
                    <span style={styles.metaBadge}>{story.duration}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Coming soon */}
        <div style={styles.comingSoon}>
          <h4>More stories coming soon!</h4>
          <p>🏖️ Beach Vacation • 🏥 Doctor's Visit • 🎉 Birthday Party</p>
        </div>
      </div>
    </div>
  );
}

// Get story completion stats
export function getStoryStats() {
  const progress = getStoryProgress();
  const totalStories = Object.keys(STORIES).length;
  const completedStories = Object.values(progress).filter(p => p.completed).length;
  
  return {
    total: totalStories,
    completed: completedStories,
    percentage: Math.round((completedStories / totalStories) * 100)
  };
}

const styles = {
  container: {
    maxWidth: 500,
    margin: '0 auto',
    minHeight: '100vh',
    background: theme.bg,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`,
    color: '#fff',
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    margin: 0,
    fontSize: 18,
    fontWeight: 600
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: 24,
    cursor: 'pointer'
  },
  content: {
    padding: 20
  },
  intro: {
    color: theme.textLight,
    marginBottom: 20,
    lineHeight: 1.5
  },
  storyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  storyCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    background: theme.surface,
    padding: 16,
    borderRadius: 14,
    border: `1px solid ${theme.border}`,
    cursor: 'pointer',
    transition: 'transform 0.2s'
  },
  storyEmoji: {
    fontSize: 40
  },
  storyInfo: {
    flex: 1
  },
  storyName: {
    margin: '0 0 4px',
    fontSize: 16,
    fontWeight: 600
  },
  storySubtitle: {
    margin: '0 0 8px',
    fontSize: 13,
    color: theme.textLight
  },
  storyMeta: {
    display: 'flex',
    gap: 8
  },
  metaBadge: {
    fontSize: 11,
    background: '#E8F5E9',
    color: theme.primary,
    padding: '3px 8px',
    borderRadius: 10
  },
  comingSoon: {
    marginTop: 30,
    textAlign: 'center',
    color: theme.textLight,
    padding: 20
  },
  // Story view styles
  storyHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    background: 'rgba(0,0,0,0.3)'
  },
  exitBtn: {
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    color: '#fff',
    width: 36,
    height: 36,
    borderRadius: '50%',
    fontSize: 18,
    cursor: 'pointer'
  },
  storyTitle: {
    color: '#fff',
    fontWeight: 600
  },
  sceneCount: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14
  },
  sceneBackground: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    background: 'rgba(255,255,255,0.1)'
  },
  narrationBox: {
    padding: '20px 16px',
    background: 'rgba(255,255,255,0.95)',
    margin: 16,
    borderRadius: 12
  },
  narrationText: {
    margin: 0,
    lineHeight: 1.6,
    fontStyle: 'italic',
    color: theme.text
  },
  dialogueBox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    padding: '0 16px',
    marginBottom: 16
  },
  mariaAvatar: {
    fontSize: 36,
    background: 'rgba(255,255,255,0.9)',
    borderRadius: '50%',
    padding: 8
  },
  speechBubble: {
    flex: 1,
    background: '#fff',
    padding: 14,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    position: 'relative'
  },
  dialogueText: {
    margin: 0,
    lineHeight: 1.5,
    color: theme.text
  },
  speakBtn: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    background: 'none',
    border: 'none',
    fontSize: 18,
    cursor: 'pointer',
    opacity: 0.7
  },
  choicesContainer: {
    padding: '0 16px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  choiceBtn: {
    background: 'rgba(255,255,255,0.95)',
    border: 'none',
    padding: 14,
    borderRadius: 12,
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'transform 0.2s'
  },
  choiceContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  choiceText: {
    fontWeight: 500,
    color: theme.text
  },
  toggleSpanishBtn: {
    background: 'none',
    border: 'none',
    fontSize: 18,
    cursor: 'pointer'
  },
  spanishReveal: {
    marginTop: 10,
    paddingTop: 10,
    borderTop: `1px solid ${theme.border}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.primary,
    fontWeight: 500
  },
  miniSpeakBtn: {
    background: 'none',
    border: 'none',
    fontSize: 16,
    cursor: 'pointer'
  },
  finishBtn: {
    margin: '0 16px 20px',
    background: theme.success,
    color: '#fff',
    border: 'none',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    width: 'calc(100% - 32px)'
  },
  completionScreen: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: 20,
    textAlign: 'center'
  },
  completionStats: {
    display: 'flex',
    gap: 30,
    marginTop: 20
  },
  completionStat: {
    textAlign: 'center'
  },
  completionNum: {
    display: 'block',
    fontSize: 28,
    fontWeight: 700,
    color: theme.primary
  },
  completionLabel: {
    fontSize: 12,
    color: theme.textLight
  },
  primaryBtn: {
    width: '100%',
    background: theme.primary,
    color: '#fff',
    border: 'none',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: 30
  },
  secondaryBtn: {
    width: '100%',
    background: 'none',
    color: theme.textLight,
    border: `1px solid ${theme.border}`,
    padding: 14,
    borderRadius: 12,
    fontSize: 14,
    cursor: 'pointer',
    marginTop: 10
  }
};
