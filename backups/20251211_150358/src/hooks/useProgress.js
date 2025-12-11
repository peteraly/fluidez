import { useState, useEffect } from 'react';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from '../services/storage';

const defaultProgress = {
  currentDay: 1,
  dayProgress: 0,
  streak: 1,
  wordsLearned: 0,
  timeSpent: 0,
  cardsToReview: 10,
};

export const useProgress = () => {
  const [progress, setProgress] = useState(() => 
    loadFromStorage(STORAGE_KEYS.PROGRESS, defaultProgress)
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PROGRESS, progress);
  }, [progress]);

  const updateProgress = (updates) => {
    setProgress(prev => ({ ...prev, ...updates }));
  };

  const advanceDay = () => {
    if (progress.currentDay < 30) {
      setProgress(prev => ({ 
        ...prev, 
        currentDay: prev.currentDay + 1, 
        dayProgress: 0 
      }));
    }
  };

  return { progress, updateProgress, advanceDay };
};
