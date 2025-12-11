// ============================================================================
// FLUIDEZ STORAGE SERVICE
// ============================================================================

const KEYS = {
  USER: 'fluidez_user',
  PROGRESS: 'fluidez_progress',
  VOCABULARY: 'fluidez_vocabulary',
  MISTAKES: 'fluidez_mistakes',
  CONVERSATIONS: 'fluidez_conversations'
};

// ============================================================================
// USER
// ============================================================================
export const UserStorage = {
  get() {
    const data = localStorage.getItem(KEYS.USER);
    if (!data) return this.createDefault();
    return JSON.parse(data);
  },

  save(user) {
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
  },

  createDefault() {
    const user = {
      id: 'user_' + Date.now(),
      createdAt: new Date().toISOString(),
      profile: { name: '', nativeLanguage: 'en' },
      settings: {
        level: 'A1',
        dailyGoalMinutes: 15,
        voiceSpeed: 0.9,
        preferredAccent: 'mexico',
        soundEffects: true
      },
      goals: { primary: 'general' },
      interests: []
    };
    this.save(user);
    return user;
  },

  update(updates) {
    const user = this.get();
    const updated = { ...user, ...updates, lastActiveAt: new Date().toISOString() };
    this.save(updated);
    return updated;
  }
};

// ============================================================================
// PROGRESS
// ============================================================================
export const ProgressStorage = {
  get() {
    const data = localStorage.getItem(KEYS.PROGRESS);
    if (!data) return this.createDefault();
    return JSON.parse(data);
  },

  save(progress) {
    localStorage.setItem(KEYS.PROGRESS, JSON.stringify(progress));
  },

  createDefault() {
    const progress = {
      stats: {
        totalXP: 0,
        totalMinutes: 0,
        totalSessions: 0,
        wordsLearned: 0,
        exercisesCompleted: 0,
        conversationMinutes: 0
      },
      streak: {
        current: 0,
        longest: 0,
        lastPracticeDate: null,
        freezesAvailable: 2
      },
      daysCompleted: {},
      moduleProgress: {},
      achievements: []
    };
    this.save(progress);
    return progress;
  },

  addXP(amount) {
    const progress = this.get();
    progress.stats.totalXP += amount;
    this.save(progress);
    return progress;
  },

  updateStreak() {
    const progress = this.get();
    const today = new Date().toISOString().split('T')[0];
    const lastPractice = progress.streak.lastPracticeDate;

    if (lastPractice === today) return progress;

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (lastPractice === yesterday) {
      progress.streak.current += 1;
      if (progress.streak.current > progress.streak.longest) {
        progress.streak.longest = progress.streak.current;
      }
    } else if (lastPractice !== today) {
      progress.streak.current = 1;
    }

    progress.streak.lastPracticeDate = today;
    this.save(progress);
    return progress;
  },

  completeModule(dayNumber, moduleType, score, timeSpent) {
    const progress = this.get();
    const key = `${dayNumber}-${moduleType}`;
    
    progress.moduleProgress[key] = {
      completed: true,
      score,
      timeSpent,
      completedAt: new Date().toISOString()
    };

    const modules = ['grammar', 'vocabulary', 'listening', 'reading'];
    const allComplete = modules.every(m => progress.moduleProgress[`${dayNumber}-${m}`]?.completed);

    if (allComplete && !progress.daysCompleted[dayNumber]) {
      progress.daysCompleted[dayNumber] = {
        completed: true,
        completedAt: new Date().toISOString(),
        score: Math.round(modules.reduce((sum, m) => 
          sum + (progress.moduleProgress[`${dayNumber}-${m}`]?.score || 0), 0) / modules.length)
      };
      progress.stats.totalXP += 100;
    }

    progress.stats.totalMinutes += Math.round(timeSpent / 60);
    progress.stats.exercisesCompleted += 1;
    this.save(progress);
    return progress;
  },

  incrementSession() {
    const progress = this.get();
    progress.stats.totalSessions += 1;
    this.save(progress);
    return progress;
  }
};

// ============================================================================
// VOCABULARY
// ============================================================================
export const VocabularyStorage = {
  get() {
    const data = localStorage.getItem(KEYS.VOCABULARY);
    if (!data) return { items: {}, summary: { total: 0, mastered: 0, learning: 0 } };
    return JSON.parse(data);
  },

  save(vocab) {
    localStorage.setItem(KEYS.VOCABULARY, JSON.stringify(vocab));
  },

  addWord(word) {
    const vocab = this.get();
    if (!vocab.items[word.spanish]) {
      vocab.items[word.spanish] = {
        ...word,
        addedAt: new Date().toISOString(),
        mastery: 0,
        timesCorrect: 0,
        timesIncorrect: 0,
        srs: {
          interval: 1,
          easeFactor: 2.5,
          nextReview: new Date().toISOString().split('T')[0]
        }
      };
      vocab.summary.total = Object.keys(vocab.items).length;
      this.save(vocab);
      
      const progress = ProgressStorage.get();
      progress.stats.wordsLearned = vocab.summary.total;
      ProgressStorage.save(progress);
    }
    return vocab;
  },

  recordReview(spanish, correct) {
    const vocab = this.get();
    const item = vocab.items[spanish];
    if (!item) return vocab;

    if (correct) {
      item.timesCorrect += 1;
      item.srs.interval = Math.min(item.srs.interval * item.srs.easeFactor, 365);
    } else {
      item.timesIncorrect += 1;
      item.srs.interval = 1;
    }

    item.mastery = item.timesCorrect / (item.timesCorrect + item.timesIncorrect);
    item.srs.nextReview = new Date(Date.now() + item.srs.interval * 86400000).toISOString().split('T')[0];

    const items = Object.values(vocab.items);
    vocab.summary.mastered = items.filter(i => i.mastery >= 0.9).length;
    vocab.summary.learning = items.filter(i => i.mastery > 0 && i.mastery < 0.9).length;

    this.save(vocab);
    return vocab;
  },

  getDueForReview(count = 10) {
    const vocab = this.get();
    const today = new Date().toISOString().split('T')[0];
    return Object.values(vocab.items)
      .filter(item => item.srs.nextReview <= today)
      .sort((a, b) => a.mastery - b.mastery)
      .slice(0, count);
  }
};

// ============================================================================
// MISTAKES
// ============================================================================
export const MistakesStorage = {
  get() {
    const data = localStorage.getItem(KEYS.MISTAKES);
    if (!data) return { patterns: {}, recent: [] };
    return JSON.parse(data);
  },

  save(mistakes) {
    localStorage.setItem(KEYS.MISTAKES, JSON.stringify(mistakes));
  },

  record(type, context) {
    const mistakes = this.get();
    
    if (!mistakes.patterns[type]) {
      mistakes.patterns[type] = { type, count: 0, contexts: [] };
    }
    
    mistakes.patterns[type].count += 1;
    mistakes.patterns[type].lastOccurrence = new Date().toISOString();
    mistakes.patterns[type].contexts.push(context);
    
    if (mistakes.patterns[type].contexts.length > 10) {
      mistakes.patterns[type].contexts = mistakes.patterns[type].contexts.slice(-10);
    }

    mistakes.recent.unshift({ type, ...context, date: new Date().toISOString() });
    mistakes.recent = mistakes.recent.slice(0, 20);

    this.save(mistakes);
    return mistakes;
  },

  getWeakAreas() {
    const mistakes = this.get();
    return Object.values(mistakes.patterns)
      .filter(p => p.count >= 3)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }
};

// ============================================================================
// NAMED EXPORT FOR DEFAULT
// ============================================================================
const StorageService = {
  UserStorage,
  ProgressStorage,
  VocabularyStorage,
  MistakesStorage
};

export default StorageService;
