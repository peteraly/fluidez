import React, { useState, useEffect } from 'react';

/**
 * RealWorldMissions
 * 
 * Bridges in-app practice to real-world Spanish use.
 * Starts tiny (say hi to yourself), gradually builds to real interactions.
 * 
 * Design principles:
 * - Progressive difficulty (self → recording → real person)
 * - Optional photo/audio proof for motivation
 * - Celebrates completion regardless of "success"
 * - Never forces uncomfortable situations
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
  warning: '#FFC107',
  accent: '#FF6B6B'
};

// Mission difficulty levels
const DIFFICULTY_LEVELS = {
  solo: { name: 'Solo Practice', emoji: '🪞', color: '#E8F5E9' },
  recorded: { name: 'Record Yourself', emoji: '🎙️', color: '#E3F2FD' },
  passive: { name: 'Listen & Observe', emoji: '👀', color: '#FFF3E0' },
  lowStakes: { name: 'Low Stakes', emoji: '🌱', color: '#F3E5F5' },
  realWorld: { name: 'Real Interaction', emoji: '🌍', color: '#FFEBEE' }
};

// Missions organized by difficulty
const MISSIONS = {
  solo: [
    {
      id: 'mirror-greeting',
      title: 'Mirror Greeting',
      description: 'Say "¡Hola! ¿Cómo estás?" to yourself in a mirror',
      tip: 'Watch your mouth form the Spanish sounds!',
      xp: 10,
      category: 'greetings'
    },
    {
      id: 'count-objects',
      title: 'Count 10 Things',
      description: 'Count 10 objects in your room in Spanish (uno, dos, tres...)',
      tip: 'Point at each object as you count',
      xp: 10,
      category: 'numbers'
    },
    {
      id: 'narrate-morning',
      title: 'Morning Narrator',
      description: 'Narrate your morning routine in Spanish (Me levanto, me ducho...)',
      tip: 'Even just a few actions count!',
      xp: 15,
      category: 'daily'
    },
    {
      id: 'label-kitchen',
      title: 'Kitchen Tour',
      description: 'Name 5 things in your kitchen in Spanish',
      tip: 'el refrigerador, la mesa, la silla...',
      xp: 10,
      category: 'food'
    },
    {
      id: 'feelings-check',
      title: 'Feelings Check',
      description: 'Tell yourself how you\'re feeling: "Hoy estoy..."',
      tip: 'feliz, cansado, emocionado, nervioso',
      xp: 10,
      category: 'emotions'
    }
  ],
  recorded: [
    {
      id: 'voice-intro',
      title: 'Record Your Intro',
      description: 'Record yourself saying: "Hola, me llamo [name]. Estoy aprendiendo español."',
      tip: 'Listen back - you\'ll be surprised how good you sound!',
      xp: 20,
      category: 'greetings'
    },
    {
      id: 'favorite-food',
      title: 'Food Review',
      description: 'Record: "Mi comida favorita es... porque..."',
      tip: 'Keep it simple, even one word for "why" counts',
      xp: 20,
      category: 'food'
    },
    {
      id: 'weekend-plans',
      title: 'Weekend Plans',
      description: 'Record what you\'ll do this weekend: "Este fin de semana voy a..."',
      tip: 'Use "ir a + infinitive" for future plans',
      xp: 25,
      category: 'daily'
    }
  ],
  passive: [
    {
      id: 'listen-music',
      title: 'Spanish Song',
      description: 'Listen to a Spanish song and identify 3 words you recognize',
      tip: 'Try reggaeton - it\'s catchy and repetitive!',
      xp: 15,
      category: 'culture'
    },
    {
      id: 'watch-show',
      title: 'Show Detective',
      description: 'Watch 5 minutes of a Spanish show (subtitles OK) - note 2 phrases',
      tip: 'Start with shows you\'ve seen in English',
      xp: 15,
      category: 'culture'
    },
    {
      id: 'eavesdrop',
      title: 'Friendly Observer',
      description: 'If you hear Spanish in public, try to catch one word or phrase',
      tip: 'No need to understand everything - just one word is a win!',
      xp: 20,
      category: 'culture'
    }
  ],
  lowStakes: [
    {
      id: 'order-spanish',
      title: 'Order in Spanish',
      description: 'At a Mexican restaurant, say "Una agua, por favor" or "Gracias"',
      tip: 'Even just "gracias" when they bring food counts!',
      xp: 30,
      category: 'restaurant'
    },
    {
      id: 'spanish-hello',
      title: 'Hola to Staff',
      description: 'Say "¡Hola!" to a store employee (instead of "hi")',
      tip: 'Works anywhere - it\'s friendly and brief',
      xp: 25,
      category: 'greetings'
    },
    {
      id: 'text-friend',
      title: 'Spanish Text',
      description: 'Send a friend a text with Spanish: "¿Cómo estás?" or "¡Buenos días!"',
      tip: 'Pick someone who\'ll think it\'s fun!',
      xp: 20,
      category: 'greetings'
    }
  ],
  realWorld: [
    {
      id: 'full-order',
      title: 'Full Order',
      description: 'Order your entire meal in Spanish at a Mexican restaurant',
      tip: 'Servers at Mexican restaurants are usually happy to help!',
      xp: 50,
      category: 'restaurant'
    },
    {
      id: 'ask-directions',
      title: 'Ask Directions',
      description: 'Ask "¿Dónde está...?" to a Spanish speaker',
      tip: 'Works great at Mexican grocery stores',
      xp: 50,
      category: 'travel'
    },
    {
      id: 'small-talk',
      title: 'Small Talk',
      description: 'Have a brief conversation (3+ exchanges) with a Spanish speaker',
      tip: 'Weather, food, or "¿De dónde es?" are easy starters',
      xp: 75,
      category: 'daily'
    },
    {
      id: 'help-someone',
      title: 'Helper Hero',
      description: 'Help someone who needs Spanish-English translation',
      tip: 'Even just knowing numbers or food words helps!',
      xp: 100,
      category: 'community'
    }
  ]
};

// Get today's suggested mission based on progress
const getTodaysMission = (completedMissions, currentLevel) => {
  const levels = ['solo', 'solo', 'recorded', 'passive', 'lowStakes', 'realWorld'];
  const suggestedLevel = levels[Math.min(currentLevel, levels.length - 1)];
  
  const availableMissions = MISSIONS[suggestedLevel].filter(
    m => !completedMissions.includes(m.id)
  );
  
  if (availableMissions.length === 0) {
    // All missions at this level complete - suggest next level
    const nextLevel = levels[Math.min(currentLevel + 1, levels.length - 1)];
    return MISSIONS[nextLevel][0];
  }
  
  // Return random from available
  return availableMissions[Math.floor(Math.random() * availableMissions.length)];
};

export default function RealWorldMissions({ onBack, onStartConversation }) {
  const [selectedLevel, setSelectedLevel] = useState('solo');
  const [completedMissions, setCompletedMissions] = useState([]);
  const [activeMission, setActiveMission] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [totalXP, setTotalXP] = useState(0);
  const [reflectionNote, setReflectionNote] = useState('');

  // Load saved progress
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('fluidez_missions') || '{}');
    setCompletedMissions(saved.completed || []);
    setTotalXP(saved.totalXP || 0);
  }, []);

  // Save progress
  const saveProgress = (completed, xp) => {
    localStorage.setItem('fluidez_missions', JSON.stringify({
      completed,
      totalXP: xp,
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleStartMission = (mission) => {
    setActiveMission(mission);
  };

  const handleCompleteMission = () => {
    const newCompleted = [...completedMissions, activeMission.id];
    const newXP = totalXP + activeMission.xp;
    
    setCompletedMissions(newCompleted);
    setTotalXP(newXP);
    saveProgress(newCompleted, newXP);
    
    // Save reflection if provided
    if (reflectionNote.trim()) {
      const reflections = JSON.parse(localStorage.getItem('fluidez_mission_reflections') || '[]');
      reflections.push({
        missionId: activeMission.id,
        note: reflectionNote,
        date: new Date().toISOString()
      });
      localStorage.setItem('fluidez_mission_reflections', JSON.stringify(reflections.slice(-50)));
    }
    
    setShowCompletion(true);
  };

  const handleCloseCompletion = () => {
    setShowCompletion(false);
    setActiveMission(null);
    setReflectionNote('');
  };

  const currentLevel = Math.floor(completedMissions.length / 3);
  const todaysMission = getTodaysMission(completedMissions, currentLevel);

  // Active mission view
  if (activeMission) {
    const levelInfo = Object.values(DIFFICULTY_LEVELS).find(l => 
      MISSIONS[selectedLevel]?.some(m => m.id === activeMission.id)
    ) || DIFFICULTY_LEVELS.solo;

    if (showCompletion) {
      return (
        <div style={styles.container}>
          <div style={styles.completionScreen}>
            <span style={{ fontSize: 72 }}>🎉</span>
            <h2 style={{ margin: '16px 0 8px' }}>¡Misión Cumplida!</h2>
            <p style={{ color: theme.textLight }}>You earned {activeMission.xp} XP!</p>
            
            <div style={styles.completionStats}>
              <div style={styles.completionStat}>
                <span style={styles.completionNum}>{totalXP}</span>
                <span style={styles.completionLabel}>Total XP</span>
              </div>
              <div style={styles.completionStat}>
                <span style={styles.completionNum}>{completedMissions.length}</span>
                <span style={styles.completionLabel}>Missions</span>
              </div>
            </div>

            <p style={{ fontSize: 14, color: theme.textLight, marginTop: 20 }}>
              Every real-world attempt builds your confidence. ¡Muy bien!
            </p>

            <button onClick={handleCloseCompletion} style={styles.primaryBtn}>
              Continue
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={() => setActiveMission(null)} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>Active Mission</h2>
          <div style={{ width: 40 }} />
        </div>

        <div style={styles.content}>
          <div style={{ ...styles.missionCard, background: levelInfo.color }}>
            <span style={{ fontSize: 48 }}>{levelInfo.emoji}</span>
            <h3 style={{ margin: '16px 0 8px' }}>{activeMission.title}</h3>
            <p style={styles.missionDescription}>{activeMission.description}</p>
          </div>

          <div style={styles.tipCard}>
            <span>💡</span>
            <p style={{ margin: 0, flex: 1 }}>{activeMission.tip}</p>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>How did it go? (optional)</h4>
            <textarea
              value={reflectionNote}
              onChange={(e) => setReflectionNote(e.target.value)}
              placeholder="Quick note about your experience..."
              style={styles.reflectionInput}
            />
          </div>

          <div style={styles.reminderCard}>
            <h4 style={{ margin: '0 0 8px' }}>Remember:</h4>
            <ul style={styles.reminderList}>
              <li>Attempting = Success (regardless of outcome)</li>
              <li>Mistakes are part of learning</li>
              <li>Native speakers appreciate the effort!</li>
            </ul>
          </div>

          <button onClick={handleCompleteMission} style={styles.completeBtn}>
            ✅ Mark as Complete (+{activeMission.xp} XP)
          </button>

          <button 
            onClick={() => setActiveMission(null)} 
            style={styles.laterBtn}
          >
            Save for Later
          </button>
        </div>
      </div>
    );
  }

  // Main missions list view
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>🎯 Real-World Missions</h2>
        <div style={{ width: 40 }} />
      </div>

      <div style={styles.content}>
        {/* XP Progress */}
        <div style={styles.xpCard}>
          <div style={styles.xpInfo}>
            <span style={styles.xpNum}>{totalXP}</span>
            <span style={styles.xpLabel}>Total XP</span>
          </div>
          <div style={styles.xpInfo}>
            <span style={styles.xpNum}>{completedMissions.length}</span>
            <span style={styles.xpLabel}>Missions</span>
          </div>
          <div style={styles.xpInfo}>
            <span style={styles.xpNum}>Level {currentLevel + 1}</span>
            <span style={styles.xpLabel}>Explorer</span>
          </div>
        </div>

        {/* Today's Suggested Mission */}
        {todaysMission && (
          <div style={styles.todaySection}>
            <h3 style={styles.todayTitle}>🌟 Today's Mission</h3>
            <div 
              style={styles.todayCard}
              onClick={() => handleStartMission(todaysMission)}
            >
              <div style={styles.todayContent}>
                <h4 style={{ margin: '0 0 4px' }}>{todaysMission.title}</h4>
                <p style={{ margin: 0, fontSize: 13, color: theme.textLight }}>
                  {todaysMission.description}
                </p>
              </div>
              <span style={styles.xpBadge}>+{todaysMission.xp} XP</span>
            </div>
          </div>
        )}

        {/* Practice First CTA */}
        <div style={styles.practiceCard}>
          <p style={{ margin: '0 0 12px', fontWeight: 500 }}>
            Want to practice first?
          </p>
          <button onClick={onStartConversation} style={styles.practiceBtn}>
            🎙️ Chat with María
          </button>
        </div>

        {/* Level tabs */}
        <div style={styles.levelTabs}>
          {Object.entries(DIFFICULTY_LEVELS).map(([key, level]) => (
            <button
              key={key}
              onClick={() => setSelectedLevel(key)}
              style={{
                ...styles.levelTab,
                background: selectedLevel === key ? level.color : 'transparent',
                borderColor: selectedLevel === key ? theme.primary : 'transparent'
              }}
            >
              <span>{level.emoji}</span>
              <span style={{ fontSize: 11 }}>{level.name}</span>
            </button>
          ))}
        </div>

        {/* Mission list */}
        <div style={styles.missionList}>
          {MISSIONS[selectedLevel].map(mission => {
            const isCompleted = completedMissions.includes(mission.id);
            return (
              <div
                key={mission.id}
                onClick={() => !isCompleted && handleStartMission(mission)}
                style={{
                  ...styles.missionItem,
                  opacity: isCompleted ? 0.6 : 1,
                  cursor: isCompleted ? 'default' : 'pointer'
                }}
              >
                <div style={styles.missionInfo}>
                  <div style={styles.missionTitle}>
                    {isCompleted && <span style={{ marginRight: 6 }}>✓</span>}
                    {mission.title}
                  </div>
                  <div style={styles.missionDesc}>{mission.description}</div>
                </div>
                {!isCompleted && (
                  <span style={styles.missionXP}>+{mission.xp}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Encouragement */}
        <div style={styles.encouragement}>
          <p>🌱 Start small. Every attempt in the real world counts!</p>
        </div>
      </div>
    </div>
  );
}

// Get mission progress for display elsewhere
export function getMissionProgress() {
  const saved = JSON.parse(localStorage.getItem('fluidez_missions') || '{}');
  return {
    completed: saved.completed?.length || 0,
    totalXP: saved.totalXP || 0,
    level: Math.floor((saved.completed?.length || 0) / 3) + 1
  };
}

// Compact mission suggestion for home screen
export function MissionSuggestion({ onStartMission }) {
  const saved = JSON.parse(localStorage.getItem('fluidez_missions') || '{}');
  const completedMissions = saved.completed || [];
  const currentLevel = Math.floor(completedMissions.length / 3);
  const mission = getTodaysMission(completedMissions, currentLevel);

  if (!mission) return null;

  return (
    <div style={styles.suggestionCard} onClick={() => onStartMission(mission)}>
      <span style={{ fontSize: 24 }}>🎯</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: 14 }}>Today's Mission</div>
        <div style={{ fontSize: 12, color: theme.textLight }}>{mission.title}</div>
      </div>
      <span style={{ fontSize: 12, color: theme.primary }}>+{mission.xp} XP</span>
    </div>
  );
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
  xpCard: {
    display: 'flex',
    justifyContent: 'space-around',
    background: theme.surface,
    padding: 16,
    borderRadius: 12,
    border: `1px solid ${theme.border}`,
    marginBottom: 20
  },
  xpInfo: {
    textAlign: 'center'
  },
  xpNum: {
    display: 'block',
    fontSize: 20,
    fontWeight: 700,
    color: theme.primary
  },
  xpLabel: {
    fontSize: 11,
    color: theme.textLight
  },
  todaySection: {
    marginBottom: 20
  },
  todayTitle: {
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 10
  },
  todayCard: {
    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`,
    color: '#fff',
    padding: 16,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  todayContent: {
    flex: 1
  },
  xpBadge: {
    background: 'rgba(255,255,255,0.2)',
    padding: '6px 12px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600
  },
  practiceCard: {
    background: '#E8F5E9',
    padding: 16,
    borderRadius: 12,
    textAlign: 'center',
    marginBottom: 20
  },
  practiceBtn: {
    background: theme.primary,
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer'
  },
  levelTabs: {
    display: 'flex',
    gap: 6,
    marginBottom: 16,
    overflowX: 'auto',
    paddingBottom: 4
  },
  levelTab: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px 12px',
    borderRadius: 8,
    border: '2px solid',
    cursor: 'pointer',
    minWidth: 70,
    transition: 'all 0.2s'
  },
  missionList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  missionItem: {
    background: theme.surface,
    padding: 14,
    borderRadius: 12,
    border: `1px solid ${theme.border}`,
    display: 'flex',
    alignItems: 'center'
  },
  missionInfo: {
    flex: 1
  },
  missionTitle: {
    fontWeight: 600,
    fontSize: 14,
    marginBottom: 2
  },
  missionDesc: {
    fontSize: 12,
    color: theme.textLight
  },
  missionXP: {
    background: '#E8F5E9',
    color: theme.primary,
    padding: '4px 10px',
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600
  },
  encouragement: {
    textAlign: 'center',
    padding: 16,
    color: theme.textLight,
    fontSize: 13
  },
  missionCard: {
    padding: 24,
    borderRadius: 16,
    textAlign: 'center',
    marginBottom: 20
  },
  missionDescription: {
    fontSize: 15,
    color: theme.text,
    lineHeight: 1.5
  },
  tipCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    padding: 14,
    background: '#FEF3C7',
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 14
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 8
  },
  reflectionInput: {
    width: '100%',
    padding: 12,
    fontSize: 14,
    border: `1px solid ${theme.border}`,
    borderRadius: 8,
    minHeight: 80,
    resize: 'none',
    boxSizing: 'border-box'
  },
  reminderCard: {
    background: '#E8F5E9',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20
  },
  reminderList: {
    margin: 0,
    paddingLeft: 20,
    fontSize: 13,
    lineHeight: 1.8
  },
  completeBtn: {
    width: '100%',
    background: theme.success,
    color: '#fff',
    border: 'none',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    marginBottom: 10
  },
  laterBtn: {
    width: '100%',
    background: 'none',
    color: theme.textLight,
    border: `1px solid ${theme.border}`,
    padding: 14,
    borderRadius: 12,
    fontSize: 14,
    cursor: 'pointer'
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
    marginTop: 20
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
    gap: 24,
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
  suggestionCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: theme.surface,
    padding: 14,
    borderRadius: 12,
    border: `1px solid ${theme.border}`,
    cursor: 'pointer'
  }
};
