/**
 * Streak System with Dopamine Anticipation + Loss Aversion
 * From Matrix: Rank #8 (Dopamine) + Rank #9 (Loss Aversion) - Impact 9
 */

const MILESTONES = [
  { days: 3, name: 'Beginner', badge: '🌱', xp: 50 },
  { days: 7, name: 'One Week Strong', badge: '🔥', xp: 100 },
  { days: 14, name: 'Two Week Warrior', badge: '⚔️', xp: 200 },
  { days: 21, name: '21-Day Champion', badge: '🏆', xp: 300 },
  { days: 30, name: 'Monthly Master', badge: '👑', xp: 500 },
  { days: 60, name: 'Two Month Titan', badge: '💎', xp: 1000 },
  { days: 90, name: 'Quarterly Quest', badge: '🎖️', xp: 1500 },
  { days: 365, name: 'Year of Spanish', badge: '🌟', xp: 10000 }
];

const STORAGE_KEY = 'fluidez_streak';

export function getStreakData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    current: 0,
    longest: 0,
    lastCompleted: null,
    todayCompleted: false,
    freezesAvailable: 1,
    totalDays: 0,
    milestonesAchieved: []
  };
}

export function saveStreakData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function completeDay() {
  const data = getStreakData();
  const today = new Date().toISOString().split('T')[0];
  
  if (data.lastCompleted === today) {
    return { ...data, message: 'Already completed today!' };
  }
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  // Check if streak continues or resets
  if (data.lastCompleted === yesterdayStr || !data.lastCompleted) {
    data.current += 1;
  } else {
    // Streak broken - check grace period (4 hours)
    data.current = 1;
  }
  
  data.lastCompleted = today;
  data.todayCompleted = true;
  data.totalDays += 1;
  data.longest = Math.max(data.longest, data.current);
  
  // Check for milestone
  const newMilestone = MILESTONES.find(m => 
    m.days === data.current && !data.milestonesAchieved.includes(m.days)
  );
  
  if (newMilestone) {
    data.milestonesAchieved.push(newMilestone.days);
    saveStreakData(data);
    return { ...data, milestone: newMilestone };
  }
  
  saveStreakData(data);
  return data;
}

export function getNextMilestone(currentStreak) {
  return MILESTONES.find(m => m.days > currentStreak) || MILESTONES[MILESTONES.length - 1];
}

export function getMilestoneProgress(currentStreak) {
  const next = getNextMilestone(currentStreak);
  const prev = [...MILESTONES].reverse().find(m => m.days <= currentStreak) || { days: 0 };
  
  return {
    daysToNext: next.days - currentStreak,
    progress: prev.days === next.days ? 1 : (currentStreak - prev.days) / (next.days - prev.days),
    nextMilestone: next,
    isCloseToMilestone: next.days - currentStreak <= 3
  };
}

export function getFlameState(streak) {
  if (streak === 0) return { color: '#9E9E9E', animation: 'none', label: 'cold' };
  if (streak < 7) return { color: '#FF9800', animation: 'flicker', label: 'warm' };
  if (streak < 21) return { color: '#FF5722', animation: 'burn', label: 'hot' };
  if (streak < 100) return { color: '#F44336', animation: 'blaze', label: 'blazing' };
  return { color: 'linear-gradient(#FF5722, #FFD700)', animation: 'epic', label: 'legendary' };
}

export function useStreakFreeze() {
  const data = getStreakData();
  if (data.freezesAvailable <= 0) {
    return { success: false, message: 'No freezes available' };
  }
  
  data.freezesAvailable -= 1;
  saveStreakData(data);
  return { success: true, message: 'Freeze used! Your streak is safe ❄️', remaining: data.freezesAvailable };
}

export { MILESTONES };
