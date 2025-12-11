const STORAGE_KEY = 'fluidez_srs_data';
const DEFAULT_ITEM = { easeFactor: 2.5, interval: 0, repetitions: 0, nextReview: null };

export function getSRSData() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
  catch { return {}; }
}

export function saveSRSData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function reviewItem(itemId, quality) {
  const data = getSRSData();
  let item = data[itemId] || { ...DEFAULT_ITEM };
  
  if (quality < 3) {
    item.repetitions = 0;
    item.interval = 1;
  } else {
    if (item.repetitions === 0) item.interval = 1;
    else if (item.repetitions === 1) item.interval = 3;
    else item.interval = Math.round(item.interval * item.easeFactor);
    item.repetitions += 1;
  }
  
  item.easeFactor = Math.max(1.3, item.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  const next = new Date();
  next.setDate(next.getDate() + item.interval);
  item.nextReview = next.toISOString();
  item.lastReview = new Date().toISOString();
  
  data[itemId] = item;
  saveSRSData(data);
  return item;
}

export function getReviewStats() {
  const data = getSRSData();
  const items = Object.values(data);
  const now = new Date();
  return {
    total: items.length,
    due: items.filter(i => !i.nextReview || new Date(i.nextReview) <= now).length,
    mastered: items.filter(i => i.repetitions >= 5).length
  };
}
