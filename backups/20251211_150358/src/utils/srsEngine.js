/**
 * SM-2 Spaced Repetition Algorithm
 * From Matrix: Rank #1 - Impact 10 - CRITICAL
 */

const DEFAULT_EASE = 2.5;
const MIN_EASE = 1.3;
const MAX_EASE = 2.8;

export function calculateNextReview(item, quality) {
  // quality: 1=Again, 2=Hard, 3=Good, 4=Easy
  const newItem = { ...item };
  
  if (quality < 3) {
    // INCORRECT: Reset interval, decrease ease
    newItem.repetitions = 0;
    newItem.lapses = (newItem.lapses || 0) + 1;
    newItem.interval = 1;
    newItem.ease = Math.max(MIN_EASE, (newItem.ease || DEFAULT_EASE) - 0.2);
  } else {
    // CORRECT: Extend interval
    if (newItem.repetitions === 0) {
      newItem.interval = 1;
    } else if (newItem.repetitions === 1) {
      newItem.interval = 3;
    } else {
      newItem.interval = Math.round(newItem.interval * (newItem.ease || DEFAULT_EASE));
    }
    
    newItem.repetitions = (newItem.repetitions || 0) + 1;
    
    // Adjust ease factor
    newItem.ease = (newItem.ease || DEFAULT_EASE) + (0.1 - (4 - quality) * (0.08 + (4 - quality) * 0.02));
    newItem.ease = Math.min(MAX_EASE, Math.max(MIN_EASE, newItem.ease));
  }
  
  // Set next due date
  const today = new Date();
  today.setDate(today.getDate() + newItem.interval);
  newItem.dueDate = today.toISOString().split('T')[0];
  newItem.lastReview = new Date().toISOString().split('T')[0];
  newItem.lastQuality = quality;
  
  return newItem;
}

export function isDue(item) {
  if (!item.dueDate) return true;
  return new Date(item.dueDate) <= new Date();
}

export function getDueItems(items) {
  return items.filter(isDue).sort((a, b) => {
    // Overdue first, then by ease (hardest first)
    const aOverdue = new Date(a.dueDate || 0);
    const bOverdue = new Date(b.dueDate || 0);
    if (aOverdue < bOverdue) return -1;
    if (aOverdue > bOverdue) return 1;
    return (a.ease || DEFAULT_EASE) - (b.ease || DEFAULT_EASE);
  });
}

export function getReviewStats(items) {
  const due = getDueItems(items);
  const mastered = items.filter(i => (i.repetitions || 0) >= 4 && (i.ease || DEFAULT_EASE) > 2.3);
  const learning = items.filter(i => (i.repetitions || 0) > 0 && (i.repetitions || 0) < 4);
  const newItems = items.filter(i => !i.repetitions);
  
  return {
    total: items.length,
    due: due.length,
    mastered: mastered.length,
    learning: learning.length,
    new: newItems.length,
    retention: items.length > 0 ? Math.round((mastered.length / items.length) * 100) : 0
  };
}
