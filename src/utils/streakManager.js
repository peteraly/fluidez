const STORAGE_KEY = 'fluidez_streak';
const MILESTONES = [3, 7, 14, 21, 30, 60, 90, 180, 365];

export function getStreakData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {
      currentStreak: 0, longestStreak: 0, lastCompletedDate: null,
      totalDaysCompleted: 0, completedDays: []
    };
  } catch { return { currentStreak: 0, longestStreak: 0, lastCompletedDate: null, totalDaysCompleted: 0, completedDays: [] }; }
}

export function saveStreakData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function completeDay(dayNumber) {
  const data = getStreakData();
  const today = new Date().toDateString();
  
  if (data.lastCompletedDate === today) return { ...data, alreadyCompleted: true };
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (data.lastCompletedDate === yesterday.toDateString() || !data.lastCompletedDate) {
    data.currentStreak += 1;
  } else {
    data.currentStreak = 1;
  }
  
  data.longestStreak = Math.max(data.longestStreak, data.currentStreak);
  data.lastCompletedDate = today;
  data.totalDaysCompleted += 1;
  if (!data.completedDays.includes(dayNumber)) data.completedDays.push(dayNumber);
  
  const milestone = MILESTONES.find(m => m === data.currentStreak);
  saveStreakData(data);
  return { ...data, milestone };
}

export function getFlameIntensity(streak) {
  if (streak >= 30) return { emoji: '🔥', color: '#FF4500' };
  if (streak >= 14) return { emoji: '🔥', color: '#FF6B35' };
  if (streak >= 7) return { emoji: '🔥', color: '#FFA500' };
  if (streak >= 3) return { emoji: '🔥', color: '#FFD700' };
  return { emoji: '🕯️', color: '#888' };
}

export function getNextMilestone(streak) {
  return MILESTONES.find(m => m > streak) || null;
}
