// Error Intelligence - Tracks patterns and generates personalized recommendations

export const ERROR_CATEGORIES = {
  grammar: {
    serEstar: { name: 'Ser vs Estar', weight: 3 },
    gender: { name: 'Gender Agreement', weight: 2 },
    verbConjugation: { name: 'Verb Conjugation', weight: 3 },
    pastTense: { name: 'Past Tense', weight: 3 },
    porPara: { name: 'Por vs Para', weight: 2 }
  },
  pronunciation: {
    rolledR: { name: 'Rolled R', weight: 2 },
    vowels: { name: 'Vowel Sounds', weight: 1 },
    stress: { name: 'Word Stress', weight: 2 }
  },
  vocabulary: {
    basicWords: { name: 'Basic Vocabulary', weight: 1 },
    contextual: { name: 'Contextual Usage', weight: 2 }
  }
};

export function logError(category, type, context = {}) {
  const errors = JSON.parse(localStorage.getItem('fluidez_errors') || '{}');
  
  if (!errors[category]) errors[category] = {};
  if (!errors[category][type]) errors[category][type] = { count: 0, contexts: [] };
  
  errors[category][type].count++;
  errors[category][type].contexts.push({
    ...context,
    timestamp: Date.now()
  });
  
  // Keep only last 10 contexts
  if (errors[category][type].contexts.length > 10) {
    errors[category][type].contexts = errors[category][type].contexts.slice(-10);
  }
  
  localStorage.setItem('fluidez_errors', JSON.stringify(errors));
}

export function getTopErrors(limit = 3) {
  const errors = JSON.parse(localStorage.getItem('fluidez_errors') || '{}');
  const allErrors = [];
  
  Object.entries(errors).forEach(([category, types]) => {
    Object.entries(types).forEach(([type, data]) => {
      const categoryInfo = ERROR_CATEGORIES[category]?.[type];
      if (categoryInfo) {
        allErrors.push({
          category,
          type,
          name: categoryInfo.name,
          count: data.count,
          score: data.count * categoryInfo.weight
        });
      }
    });
  });
  
  return allErrors.sort((a, b) => b.score - a.score).slice(0, limit);
}

export function getRecommendedDrills() {
  const topErrors = getTopErrors(3);
  const drills = [];
  
  topErrors.forEach(error => {
    if (error.category === 'grammar') {
      drills.push({
        type: 'grammar',
        topic: error.type,
        name: `Practice: ${error.name}`,
        icon: '📝'
      });
    } else if (error.category === 'pronunciation') {
      drills.push({
        type: 'pronunciation',
        topic: error.type,
        name: `Practice: ${error.name}`,
        icon: '🎤'
      });
    }
  });
  
  return drills;
}

export function getUserState() {
  const progress = JSON.parse(localStorage.getItem('fluidez_progress') || '{}');
  const voiceHistory = JSON.parse(localStorage.getItem('fluidez_voice_history') || '[]');
  const errors = JSON.parse(localStorage.getItem('fluidez_errors') || '{}');
  const practiceHistory = JSON.parse(localStorage.getItem('fluidez_practice_history') || '[]');
  
  const completedDays = Object.keys(progress).filter(k => progress[k]?.completed).length;
  const recentVoice = voiceHistory.slice(-7);
  const avgBravery = recentVoice.length > 0 
    ? recentVoice.reduce((sum, s) => sum + (s.braveryScore || 0), 0) / recentVoice.length 
    : 50;
  
  return {
    level: completedDays < 7 ? 'A1' : completedDays < 15 ? 'A2' : 'B1',
    completedDays,
    streakDays: practiceHistory.length,
    braveryScore: Math.round(avgBravery),
    topErrors: getTopErrors(3),
    recommendedDrills: getRecommendedDrills()
  };
}
