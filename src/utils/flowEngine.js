const STORAGE_KEY = 'fluidez_flow';

export function getFlowData() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"attempts":[],"difficulty":2}'); }
  catch { return { attempts: [], difficulty: 2 }; }
}

export function saveFlowData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function recordAttempt(correct) {
  const data = getFlowData();
  data.attempts.push({ correct, ts: Date.now() });
  if (data.attempts.length > 20) data.attempts = data.attempts.slice(-20);
  
  const rate = data.attempts.filter(a => a.correct).length / data.attempts.length;
  if (rate > 0.85 && data.difficulty < 3) data.difficulty += 1;
  else if (rate < 0.60 && data.difficulty > 1) data.difficulty -= 1;
  
  saveFlowData(data);
  return { rate, difficulty: data.difficulty };
}

export function getDifficulty() { return getFlowData().difficulty; }
