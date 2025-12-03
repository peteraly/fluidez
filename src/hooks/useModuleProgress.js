import { useState, useEffect } from 'react';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from '../services/storage';

export const useModuleProgress = () => {
  const [moduleProgress, setModuleProgress] = useState(() => 
    loadFromStorage(STORAGE_KEYS.MODULE_PROGRESS, {})
  );
  
  const [completedDays, setCompletedDays] = useState(() => 
    loadFromStorage(STORAGE_KEYS.COMPLETED_DAYS, [])
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.MODULE_PROGRESS, moduleProgress);
  }, [moduleProgress]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.COMPLETED_DAYS, completedDays);
  }, [completedDays]);

  const getModuleStatus = (day, module) => 
    moduleProgress[`${day}-${module}`] || 'available';

  const setModuleStatus = (day, module, status) => {
    setModuleProgress(prev => ({
      ...prev,
      [`${day}-${module}`]: status,
    }));
  };

  const isModuleComplete = (day, module) => 
    getModuleStatus(day, module) === 'completed';

  const isDayComplete = (day) => {
    const modules = ['grammar', 'vocabulary', 'listening', 'reading'];
    return modules.every(m => isModuleComplete(day, m));
  };

  const markDayComplete = (day) => {
    if (!completedDays.includes(day)) {
      setCompletedDays(prev => [...prev, day]);
    }
  };

  return {
    moduleProgress,
    completedDays,
    getModuleStatus,
    setModuleStatus,
    isModuleComplete,
    isDayComplete,
    markDayComplete,
  };
};
