/**
 * curriculumLoader.js
 * 
 * Loads curriculum from JSON files in src/content/days/
 * This is the single source of truth for all lesson content.
 */

// Import all day files
const dayModules = {};
for (let i = 1; i <= 30; i++) {
  const num = i.toString().padStart(2, '0');
  try {
    dayModules[i] = require(`./content/days/day${num}.json`);
  } catch (e) {
    console.warn(`Day ${i} not found in JSON files`);
  }
}

/**
 * Get curriculum data for a specific day
 * Transforms JSON structure to match what App.js expects
 */
export function getDayData(dayNum) {
  const dayJson = dayModules[dayNum];
  if (!dayJson) return null;
  
  // Extract vocabulary words from all vocab screens
  const vocabulary = [];
  if (dayJson.vocabulary?.screens) {
    dayJson.vocabulary.screens.forEach(screen => {
      if (screen.type === 'vocab' && screen.words) {
        screen.words.forEach(word => {
          vocabulary.push(word.spanish);
        });
      }
    });
  }
  
  // Extract grammar info
  const grammar = {
    content: '',
    examples: [],
    tip: ''
  };
  if (dayJson.grammar?.screens) {
    const lessons = dayJson.grammar.screens.filter(s => s.type === 'lesson');
    if (lessons.length > 0) {
      grammar.content = lessons.map(l => l.content || l.heading).join(' ');
      grammar.examples = lessons.flatMap(l => 
        (l.examples || []).map(e => e.spanish || e)
      ).slice(0, 3);
      grammar.tip = lessons[0]?.tip || '';
    }
  }
  
  // Extract exercise
  let exercise = { q: '', opts: [], a: 0 };
  if (dayJson.grammar?.screens) {
    const ex = dayJson.grammar.screens.find(s => s.type === 'exercise');
    if (ex) {
      exercise = {
        q: ex.instruction || '',
        opts: ex.options || [],
        a: ex.correctAnswer || 0
      };
    }
  }
  
  // Extract listening
  let listening = '';
  if (dayJson.listening?.screens?.[0]) {
    listening = dayJson.listening.screens[0].transcript || '';
  }
  
  // Extract reading
  let reading = '';
  if (dayJson.reading?.screens) {
    const readingScreen = dayJson.reading.screens.find(s => s.type === 'reading');
    if (readingScreen) {
      reading = readingScreen.passage || '';
    }
  }
  
  return {
    title: dayJson.title || `Day ${dayNum}`,
    subtitle: dayJson.subtitle || '',
    level: dayJson.level || 'A1',
    grammar,
    vocabulary,
    exercise,
    listening,
    reading,
    _raw: dayJson  // Keep raw data for components that need full structure
  };
}

/**
 * Get full JSON data for a day (for detailed views)
 */
export function getDayJson(dayNum) {
  return dayModules[dayNum] || null;
}

/**
 * Get all curriculum as object keyed by day number
 */
export function getAllCurriculum() {
  const curriculum = {};
  for (let i = 1; i <= 30; i++) {
    const data = getDayData(i);
    if (data) {
      curriculum[i] = data;
    }
  }
  return curriculum;
}

/**
 * Get vocabulary words with full details for a day
 */
export function getDayVocabulary(dayNum) {
  const dayJson = dayModules[dayNum];
  if (!dayJson?.vocabulary?.screens) return [];
  
  const words = [];
  dayJson.vocabulary.screens.forEach(screen => {
    if (screen.type === 'vocab' && screen.words) {
      screen.words.forEach(word => {
        words.push({
          spanish: word.spanish,
          english: word.english,
          example: word.example || '',
          category: screen.category || 'General'
        });
      });
    }
  });
  return words;
}

export default {
  getDayData,
  getDayJson,
  getAllCurriculum,
  getDayVocabulary
};
