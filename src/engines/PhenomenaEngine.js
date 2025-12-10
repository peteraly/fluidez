// ============================================================================
// PHENOMENA ENGINE - Applies neuroscience & psychology to language learning
// ============================================================================

// Circadian phase detection
export const getCircadianPhase = () => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 9) return { 
    phase: 'early_am', 
    optimal: ['grammar', 'review', 'pronunciation'], 
    energy: 'rising', 
    cortisol: 'peak',
    recommendation: 'Great time for analytical learning - grammar & review!'
  };
  if (hour >= 9 && hour < 12) return { 
    phase: 'mid_morning', 
    optimal: ['vocabulary', 'new_concepts', 'grammar'], 
    energy: 'high', 
    cortisol: 'high',
    recommendation: 'Peak learning time - tackle new material!'
  };
  if (hour >= 12 && hour < 15) return { 
    phase: 'early_pm', 
    optimal: ['stories', 'listening', 'review'], 
    energy: 'dip', 
    cortisol: 'falling',
    recommendation: 'Good for passive learning - stories & listening'
  };
  if (hour >= 15 && hour < 18) return { 
    phase: 'late_pm', 
    optimal: ['roleplay', 'voice_chat', 'speaking'], 
    energy: 'recovered', 
    cortisol: 'moderate',
    recommendation: 'Perfect for speaking practice!'
  };
  if (hour >= 18 && hour < 21) return { 
    phase: 'evening', 
    optimal: ['stories', 'review', 'voice_chat'], 
    energy: 'winding', 
    cortisol: 'low',
    recommendation: 'Relaxed practice - stories & conversation'
  };
  return { 
    phase: 'night', 
    optimal: ['light_review'], 
    energy: 'low', 
    cortisol: 'minimal',
    recommendation: 'Quick review to seed overnight memory consolidation'
  };
};

// Cognitive load detection from session metrics
export const detectCognitiveLoad = (sessionData) => {
  const { responseTimesMs = [], errorRate = 0, sessionDurationMin = 0 } = sessionData;
  
  const avgResponseTime = responseTimesMs.length > 0 
    ? responseTimesMs.reduce((a, b) => a + b, 0) / responseTimesMs.length 
    : 0;
  
  let load = 'optimal';
  let action = 'continue';
  
  if (avgResponseTime > 8000 || errorRate > 0.4) {
    load = 'high';
    action = 'reduce_difficulty';
  }
  if (sessionDurationMin > 15 && avgResponseTime > 5000) {
    load = 'fatigued';
    action = 'suggest_break';
  }
  if (avgResponseTime < 2000 && errorRate < 0.1 && sessionDurationMin > 3) {
    load = 'underutilized';
    action = 'increase_challenge';
  }
  
  return { load, avgResponseTime, errorRate, action };
};

// Emotional state inference from behavior
export const inferEmotionalState = (signals) => {
  const { 
    hesitationCount = 0, 
    skipCount = 0, 
    sessionLengthMin = 0, 
    speakingAttempts = 0, 
    errorStreak = 0,
    rapidCorrectStreak = 0
  } = signals;
  
  if (skipCount > 2 || errorStreak > 4) {
    return { state: 'frustrated', action: 'switch_activity', tone: 'supportive', scaffold: true };
  }
  if (hesitationCount > speakingAttempts * 0.6) {
    return { state: 'anxious', action: 'offer_scaffolds', tone: 'gentle', scaffold: true };
  }
  if (sessionLengthMin > 20 && speakingAttempts > 15) {
    return { state: 'flowing', action: 'ride_momentum', tone: 'energetic', scaffold: false };
  }
  if (rapidCorrectStreak > 5) {
    return { state: 'confident', action: 'increase_challenge', tone: 'challenging', scaffold: false };
  }
  if (speakingAttempts < 3 && sessionLengthMin > 5) {
    return { state: 'stuck', action: 'simplify', tone: 'encouraging', scaffold: true };
  }
  return { state: 'engaged', action: 'continue', tone: 'warm', scaffold: false };
};

// Spaced repetition calculator
export const calculateNextReview = (item) => {
  const { lastReview, reviewCount = 0, wasCorrect, easeFactor = 2.5 } = item;
  const intervals = [1, 3, 7, 14, 30, 60, 120]; // days
  
  let newEaseFactor = easeFactor;
  let nextInterval;
  
  if (wasCorrect) {
    newEaseFactor = Math.max(1.3, easeFactor + 0.1);
    nextInterval = intervals[Math.min(reviewCount, intervals.length - 1)] * newEaseFactor;
  } else {
    newEaseFactor = Math.max(1.3, easeFactor - 0.2);
    nextInterval = 1; // Reset to 1 day
  }
  
  const nextReviewDate = new Date(lastReview || Date.now());
  nextReviewDate.setDate(nextReviewDate.getDate() + Math.round(nextInterval));
  
  return { nextReviewDate, interval: Math.round(nextInterval), easeFactor: newEaseFactor };
};

// Get items due for review
export const getDueReviewItems = () => {
  const vocab = JSON.parse(localStorage.getItem('fluidez_vocab_progress') || '{}');
  const now = Date.now();
  const due = [];
  
  Object.entries(vocab).forEach(([word, data]) => {
    if (!data.nextReview || new Date(data.nextReview).getTime() <= now) {
      due.push({ word, ...data });
    }
  });
  
  return due.sort((a, b) => (a.reviewCount || 0) - (b.reviewCount || 0));
};

// Update vocabulary progress
export const updateVocabProgress = (word, wasCorrect) => {
  const vocab = JSON.parse(localStorage.getItem('fluidez_vocab_progress') || '{}');
  const current = vocab[word] || { reviewCount: 0, easeFactor: 2.5 };
  
  const { nextReviewDate, interval, easeFactor } = calculateNextReview({
    ...current,
    lastReview: Date.now(),
    wasCorrect
  });
  
  vocab[word] = {
    ...current,
    reviewCount: current.reviewCount + 1,
    lastReview: Date.now(),
    nextReview: nextReviewDate.toISOString(),
    easeFactor,
    interval,
    lastCorrect: wasCorrect
  };
  
  localStorage.setItem('fluidez_vocab_progress', JSON.stringify(vocab));
  return vocab[word];
};

// Get recommended activity based on multiple factors
export const getRecommendedActivity = () => {
  const circadian = getCircadianPhase();
  const history = JSON.parse(localStorage.getItem('fluidez_session_history') || '[]');
  const lastSession = history[history.length - 1];
  const dueReviews = getDueReviewItems();
  
  // Priority: Due reviews if many pending
  if (dueReviews.length > 10) {
    return {
      recommended: 'review',
      reason: `${dueReviews.length} items due for review!`,
      circadian
    };
  }
  
  // Avoid repeating same activity
  const recentActivities = history.slice(-3).map(s => s.activity);
  const available = circadian.optimal.filter(a => !recentActivities.includes(a));
  
  return {
    recommended: available[0] || circadian.optimal[0],
    circadian,
    reason: circadian.recommendation
  };
};

// Log session for learning
export const logSession = (sessionData) => {
  const history = JSON.parse(localStorage.getItem('fluidez_session_history') || '[]');
  history.push({
    ...sessionData,
    timestamp: Date.now(),
    circadian: getCircadianPhase().phase
  });
  if (history.length > 100) history.shift();
  localStorage.setItem('fluidez_session_history', JSON.stringify(history));
};

// Get learning stats
export const getLearningStats = () => {
  const history = JSON.parse(localStorage.getItem('fluidez_session_history') || '[]');
  const vocab = JSON.parse(localStorage.getItem('fluidez_vocab_progress') || '{}');
  const practiceHistory = JSON.parse(localStorage.getItem('fluidez_practice_history') || '[]');
  
  const totalSessions = history.length;
  const totalSpeakingAttempts = history.reduce((sum, s) => sum + (s.speakingAttempts || 0), 0);
  const avgBravery = history.length > 0 
    ? Math.round(history.reduce((sum, s) => sum + (s.braveryScore || 0), 0) / history.length)
    : 0;
  const vocabMastered = Object.values(vocab).filter(v => v.reviewCount >= 3 && v.lastCorrect).length;
  const currentStreak = calculateStreak(practiceHistory);
  
  return {
    totalSessions,
    totalSpeakingAttempts,
    avgBravery,
    vocabMastered,
    vocabTotal: Object.keys(vocab).length,
    currentStreak,
    dueReviews: getDueReviewItems().length
  };
};

// Calculate streak
const calculateStreak = (practiceHistory) => {
  if (!practiceHistory.length) return 0;
  
  const today = new Date().toDateString();
  const sortedDates = [...new Set(practiceHistory)].sort((a, b) => new Date(b) - new Date(a));
  
  if (sortedDates[0] !== today && sortedDates[0] !== new Date(Date.now() - 86400000).toDateString()) {
    return 0;
  }
  
  let streak = 0;
  let checkDate = new Date();
  
  for (const dateStr of sortedDates) {
    if (dateStr === checkDate.toDateString()) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
};

export default {
  getCircadianPhase,
  detectCognitiveLoad,
  inferEmotionalState,
  calculateNextReview,
  getDueReviewItems,
  updateVocabProgress,
  getRecommendedActivity,
  logSession,
  getLearningStats
};
