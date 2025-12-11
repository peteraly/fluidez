// src/components/CommunicationAchievements.js
// Communication Achievements - Celebrates communication, not accuracy
// Reference: change_025, gamification, task_015
//
// CHANGES FROM PREVIOUS ACHIEVEMENTS:
// - Removed: "Perfect Score", accuracy-based badges
// - Added: Communication milestones, relationship depth, real-world attempts

import React, { useState, useEffect } from 'react';

// Communication-focused achievements
const ACHIEVEMENTS = [
  // === CONVERSATION MILESTONES ===
  {
    id: 'first-words',
    name: 'First Words',
    description: 'Had your first conversation with María',
    emoji: '🌱',
    category: 'milestones',
    requirement: { type: 'conversations', count: 1 },
  },
  {
    id: 'finding-voice',
    name: 'Finding Your Voice',
    description: 'Completed 5 conversations',
    emoji: '🗣️',
    category: 'milestones',
    requirement: { type: 'conversations', count: 5 },
  },
  {
    id: 'regular-speaker',
    name: 'Regular Speaker',
    description: 'Completed 25 conversations',
    emoji: '💬',
    category: 'milestones',
    requirement: { type: 'conversations', count: 25 },
  },
  {
    id: 'conversationalist',
    name: 'Conversationalist',
    description: 'Completed 50 conversations',
    emoji: '🎙️',
    category: 'milestones',
    requirement: { type: 'conversations', count: 50 },
  },
  {
    id: 'fluent-friend',
    name: 'Fluent Friend',
    description: 'Completed 100 conversations',
    emoji: '🌟',
    category: 'milestones',
    requirement: { type: 'conversations', count: 100 },
  },

  // === COMMUNICATION DEPTH ===
  {
    id: 'asked-question',
    name: 'Curious Mind',
    description: 'Asked María a question in Spanish',
    emoji: '❓',
    category: 'communication',
    requirement: { type: 'asked_question', count: 1 },
  },
  {
    id: 'storyteller',
    name: 'Storyteller',
    description: 'Shared something personal about yourself',
    emoji: '📖',
    category: 'communication',
    requirement: { type: 'shared_story', count: 1 },
  },
  {
    id: 'opinion-sharer',
    name: 'Opinion Sharer',
    description: 'Expressed an opinion in Spanish',
    emoji: '💭',
    category: 'communication',
    requirement: { type: 'gave_opinion', count: 1 },
  },
  {
    id: 'joke-maker',
    name: 'Sense of Humor',
    description: 'Made María laugh (or tried to!)',
    emoji: '😄',
    category: 'communication',
    requirement: { type: 'made_joke', count: 1 },
  },
  {
    id: 'deep-talk',
    name: 'Deep Conversation',
    description: 'Had a conversation with 20+ exchanges',
    emoji: '🌊',
    category: 'communication',
    requirement: { type: 'long_conversation', count: 1 },
  },

  // === TOPIC EXPLORER ===
  {
    id: 'topic-taster',
    name: 'Topic Taster',
    description: 'Practiced 3 different conversation topics',
    emoji: '🎨',
    category: 'explorer',
    requirement: { type: 'unique_topics', count: 3 },
  },
  {
    id: 'world-traveler',
    name: 'World Traveler',
    description: 'Practiced 6 different conversation topics',
    emoji: '🌍',
    category: 'explorer',
    requirement: { type: 'unique_topics', count: 6 },
  },
  {
    id: 'topic-master',
    name: 'Topic Master',
    description: 'Practiced all conversation topics',
    emoji: '🏆',
    category: 'explorer',
    requirement: { type: 'unique_topics', count: 10 },
  },

  // === BRAVERY & GROWTH ===
  {
    id: 'brave-start',
    name: 'Brave Start',
    description: 'Spoke without using any hints in a conversation',
    emoji: '💪',
    category: 'bravery',
    requirement: { type: 'no_hints_conversation', count: 1 },
  },
  {
    id: 'push-yourself',
    name: 'Pushing Yourself',
    description: 'Tried "Push Me" or "Full Spanish" difficulty',
    emoji: '🚀',
    category: 'bravery',
    requirement: { type: 'hard_difficulty', count: 1 },
  },
  {
    id: 'kept-going',
    name: 'Kept Going',
    description: 'Continued after getting confused',
    emoji: '🌈',
    category: 'bravery',
    requirement: { type: 'recovered_from_confusion', count: 1 },
  },
  {
    id: 'daily-speaker',
    name: 'Daily Speaker',
    description: 'Practiced every day for a week',
    emoji: '📅',
    category: 'consistency',
    requirement: { type: 'streak_days', count: 7 },
  },
  {
    id: 'habit-formed',
    name: 'Habit Formed',
    description: 'Practiced every day for a month',
    emoji: '⭐',
    category: 'consistency',
    requirement: { type: 'streak_days', count: 30 },
  },

  // === REAL WORLD ===
  {
    id: 'real-world-try',
    name: 'Into the Wild',
    description: 'Completed a real-world mission',
    emoji: '🌎',
    category: 'real-world',
    requirement: { type: 'missions_completed', count: 1 },
  },
  {
    id: 'real-world-regular',
    name: 'Living in Spanish',
    description: 'Completed 5 real-world missions',
    emoji: '🦋',
    category: 'real-world',
    requirement: { type: 'missions_completed', count: 5 },
  },

  // === PATTERN DISCOVERY ===
  {
    id: 'pattern-noticer',
    name: 'Pattern Noticer',
    description: 'Discovered your first grammar pattern',
    emoji: '🔍',
    category: 'patterns',
    requirement: { type: 'patterns_discovered', count: 1 },
  },
  {
    id: 'pattern-seeker',
    name: 'Pattern Seeker',
    description: 'Discovered 5 different patterns',
    emoji: '🧩',
    category: 'patterns',
    requirement: { type: 'patterns_discovered', count: 5 },
  },
];

// Achievement categories for display
const CATEGORIES = [
  { id: 'milestones', name: 'Milestones', emoji: '🏅' },
  { id: 'communication', name: 'Communication', emoji: '💬' },
  { id: 'explorer', name: 'Explorer', emoji: '🗺️' },
  { id: 'bravery', name: 'Bravery', emoji: '💪' },
  { id: 'consistency', name: 'Consistency', emoji: '📅' },
  { id: 'real-world', name: 'Real World', emoji: '🌎' },
  { id: 'patterns', name: 'Patterns', emoji: '🔍' },
];

// Get user's achievement progress from localStorage
const getAchievementProgress = () => {
  try {
    return JSON.parse(localStorage.getItem('fluidez_achievements') || '{}');
  } catch {
    return {};
  }
};

// Get user's stats for checking requirements
const getUserStats = () => {
  try {
    return JSON.parse(localStorage.getItem('fluidez_stats') || '{}');
  } catch {
    return {};
  }
};

// Check if achievement is earned
const isAchievementEarned = (achievement, stats) => {
  const { type, count } = achievement.requirement;
  const current = stats[type] || 0;
  return current >= count;
};

// Award an achievement
const awardAchievement = (achievementId) => {
  const progress = getAchievementProgress();
  if (!progress[achievementId]) {
    progress[achievementId] = {
      earned: true,
      earnedAt: new Date().toISOString(),
    };
    localStorage.setItem('fluidez_achievements', JSON.stringify(progress));
    return true; // Newly earned
  }
  return false; // Already had it
};

// Check all achievements and award any newly earned ones
const checkAndAwardAchievements = () => {
  const stats = getUserStats();
  const newlyEarned = [];

  ACHIEVEMENTS.forEach(achievement => {
    if (isAchievementEarned(achievement, stats)) {
      if (awardAchievement(achievement.id)) {
        newlyEarned.push(achievement);
      }
    }
  });

  return newlyEarned;
};

// Track specific events for achievements
const trackAchievementEvent = (eventType, value = 1) => {
  const stats = getUserStats();
  
  switch (eventType) {
    case 'conversation_complete':
      stats.conversations = (stats.conversations || 0) + 1;
      break;
    case 'asked_question':
      stats.asked_question = (stats.asked_question || 0) + 1;
      break;
    case 'shared_story':
      stats.shared_story = (stats.shared_story || 0) + 1;
      break;
    case 'gave_opinion':
      stats.gave_opinion = (stats.gave_opinion || 0) + 1;
      break;
    case 'made_joke':
      stats.made_joke = (stats.made_joke || 0) + 1;
      break;
    case 'long_conversation':
      if (value >= 20) stats.long_conversation = (stats.long_conversation || 0) + 1;
      break;
    case 'unique_topic':
      if (!stats.topics_practiced) stats.topics_practiced = [];
      if (!stats.topics_practiced.includes(value)) {
        stats.topics_practiced.push(value);
        stats.unique_topics = stats.topics_practiced.length;
      }
      break;
    case 'no_hints':
      stats.no_hints_conversation = (stats.no_hints_conversation || 0) + 1;
      break;
    case 'hard_difficulty':
      stats.hard_difficulty = (stats.hard_difficulty || 0) + 1;
      break;
    case 'recovered':
      stats.recovered_from_confusion = (stats.recovered_from_confusion || 0) + 1;
      break;
    case 'mission_complete':
      stats.missions_completed = (stats.missions_completed || 0) + 1;
      break;
    case 'pattern_discovered':
      stats.patterns_discovered = (stats.patterns_discovered || 0) + 1;
      break;
    default:
      stats[eventType] = (stats[eventType] || 0) + value;
  }

  localStorage.setItem('fluidez_stats', JSON.stringify(stats));
  
  // Check for newly earned achievements
  return checkAndAwardAchievements();
};

// Achievement Display Component
const CommunicationAchievements = ({ onClose }) => {
  const [achievements, setAchievements] = useState([]);
  const [earnedIds, setEarnedIds] = useState({});
  const [stats, setStats] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const progress = getAchievementProgress();
    const userStats = getUserStats();
    setEarnedIds(progress);
    setStats(userStats);
    setAchievements(ACHIEVEMENTS);
  }, []);

  const earnedCount = Object.keys(earnedIds).filter(id => earnedIds[id]?.earned).length;
  const totalCount = ACHIEVEMENTS.length;

  const filteredAchievements = selectedCategory
    ? achievements.filter(a => a.category === selectedCategory)
    : achievements;

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
    },
    progressBar: {
      background: '#e0e0e0',
      borderRadius: 10,
      height: 8,
      marginBottom: 24,
      overflow: 'hidden',
    },
    progressFill: {
      background: 'linear-gradient(90deg, #4caf50, #81c784)',
      height: '100%',
      borderRadius: 10,
      transition: 'width 0.5s ease',
    },
    categoryTabs: {
      display: 'flex',
      gap: 8,
      overflowX: 'auto',
      paddingBottom: 8,
      marginBottom: 20,
    },
    categoryTab: (active) => ({
      padding: '8px 16px',
      background: active ? '#2D5A27' : 'white',
      color: active ? 'white' : '#666',
      border: 'none',
      borderRadius: 20,
      fontSize: 14,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
    }),
    achievementsGrid: {
      display: 'grid',
      gap: 12,
    },
    achievementCard: (earned) => ({
      background: earned ? 'white' : '#f5f5f5',
      borderRadius: 16,
      padding: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      opacity: earned ? 1 : 0.6,
      border: earned ? '2px solid #4caf50' : '2px solid transparent',
    }),
    achievementEmoji: {
      fontSize: 36,
      filter: 'grayscale(0)',
    },
    achievementEmojiLocked: {
      fontSize: 36,
      filter: 'grayscale(1)',
    },
    achievementInfo: {
      flex: 1,
    },
    achievementName: {
      fontSize: 16,
      fontWeight: 600,
      color: '#333',
      marginBottom: 4,
    },
    achievementDesc: {
      fontSize: 13,
      color: '#666',
    },
    achievementDate: {
      fontSize: 11,
      color: '#999',
      marginTop: 4,
    },
    checkmark: {
      color: '#4caf50',
      fontSize: 24,
    },
  };

  return (
    <div style={s.container}>
      <div style={s.header}>
        <button style={s.backButton} onClick={onClose}>←</button>
        <div>
          <h1 style={s.title}>Achievements</h1>
          <p style={s.subtitle}>{earnedCount} of {totalCount} earned</p>
        </div>
      </div>

      {/* Progress bar */}
      <div style={s.progressBar}>
        <div style={{ ...s.progressFill, width: `${(earnedCount / totalCount) * 100}%` }} />
      </div>

      {/* Category tabs */}
      <div style={s.categoryTabs}>
        <button
          style={s.categoryTab(selectedCategory === null)}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            style={s.categoryTab(selectedCategory === cat.id)}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.emoji} {cat.name}
          </button>
        ))}
      </div>

      {/* Achievements list */}
      <div style={s.achievementsGrid}>
        {filteredAchievements.map(achievement => {
          const earned = earnedIds[achievement.id]?.earned;
          const earnedAt = earnedIds[achievement.id]?.earnedAt;

          return (
            <div key={achievement.id} style={s.achievementCard(earned)}>
              <div style={earned ? s.achievementEmoji : s.achievementEmojiLocked}>
                {achievement.emoji}
              </div>
              <div style={s.achievementInfo}>
                <div style={s.achievementName}>{achievement.name}</div>
                <div style={s.achievementDesc}>{achievement.description}</div>
                {earned && earnedAt && (
                  <div style={s.achievementDate}>
                    Earned {new Date(earnedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
              {earned && <span style={s.checkmark}>✓</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Achievement notification popup
const AchievementPopup = ({ achievement, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!achievement) return null;

  const s = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    },
    popup: {
      background: 'white',
      borderRadius: 24,
      padding: 32,
      textAlign: 'center',
      maxWidth: 300,
      animation: 'popIn 0.3s ease',
    },
    emoji: {
      fontSize: 64,
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      color: '#4caf50',
      fontWeight: 600,
      marginBottom: 8,
    },
    name: {
      fontSize: 24,
      fontWeight: 600,
      color: '#333',
      marginBottom: 8,
    },
    desc: {
      fontSize: 15,
      color: '#666',
    },
  };

  return (
    <div style={s.overlay} onClick={onDismiss}>
      <div style={s.popup} onClick={e => e.stopPropagation()}>
        <div style={s.emoji}>{achievement.emoji}</div>
        <div style={s.label}>🎉 Achievement Unlocked!</div>
        <div style={s.name}>{achievement.name}</div>
        <div style={s.desc}>{achievement.description}</div>
      </div>
    </div>
  );
};

export {
  CommunicationAchievements,
  AchievementPopup,
  ACHIEVEMENTS,
  CATEGORIES,
  trackAchievementEvent,
  checkAndAwardAchievements,
  getAchievementProgress,
  getUserStats,
};

export default CommunicationAchievements;
