export const STORAGE_KEYS = {
  PROGRESS: 'fluidez_progress',
  MODULE_PROGRESS: 'fluidez_modules',
  COMPLETED_DAYS: 'fluidez_completed_days',
  FLASHCARD_PROGRESS: 'fluidez_flashcards',
  SETTINGS: 'fluidez_settings',
  ASSESSMENT_SCORES: 'fluidez_assessments',
};

export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.warn('localStorage save failed:', e);
    return false;
  }
};

export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (e) {
    console.warn('localStorage load failed:', e);
    return defaultValue;
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};
