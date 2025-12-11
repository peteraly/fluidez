// ============================================================================
// FLUIDEZ CURRICULUM - 120-Day A1 to C2 Spanish Mastery
// ============================================================================

// Dynamic import of all day files
const dayModules = {};
for (let i = 1; i <= 120; i++) {
  const dayNum = i.toString().padStart(2, '0');
  try {
    dayModules[i] = require(`./content/days/day${dayNum}.json`);
  } catch (e) {
    console.warn(`Day ${i} not found`);
  }
}

// Transform JSON day into app format
function transformDay(jsonDay) {
  if (!jsonDay) return null;
  
  const vocabulary = [];
  if (jsonDay.vocabulary?.screens) {
    jsonDay.vocabulary.screens.forEach(screen => {
      if (screen.type === 'vocab' && screen.words) {
        screen.words.forEach(word => {
          vocabulary.push({
            spanish: word.spanish,
            english: word.english,
            pronunciation: word.pronunciation || '',
            sentence: word.example || '',
            category: screen.category || 'General'
          });
        });
      }
    });
  }

  const exercises = [];
  ['grammar', 'vocabulary', 'listening', 'reading'].forEach(section => {
    if (jsonDay[section]?.screens) {
      jsonDay[section].screens.forEach(screen => {
        if (screen.type === 'exercise' || screen.type === 'listening') {
          exercises.push({
            type: screen.exerciseType || screen.type,
            prompt: screen.instruction,
            options: screen.options,
            correctAnswer: screen.correctAnswer,
            correctAnswers: screen.correctAnswers,
            explanation: screen.explanation,
            pairs: screen.pairs,
            items: screen.items,
            correctOrder: screen.correctOrder,
            transcript: screen.transcript
          });
        }
      });
    }
  });

  const grammar = {
    title: jsonDay.grammar?.title || '',
    focus: [],
    explanation: '',
    examples: []
  };
  
  if (jsonDay.grammar?.screens) {
    jsonDay.grammar.screens.forEach(screen => {
      if (screen.type === 'lesson') {
        if (screen.heading) grammar.focus.push(screen.heading);
        if (screen.content) grammar.explanation += (grammar.explanation ? '\n\n' : '') + screen.content;
        if (screen.examples) {
          screen.examples.forEach(ex => {
            grammar.examples.push({
              spanish: ex.spanish || '',
              english: ex.english || ''
            });
          });
        }
      }
    });
  }

  let reading = null;
  if (jsonDay.reading?.screens) {
    const readingScreen = jsonDay.reading.screens.find(s => s.type === 'reading');
    if (readingScreen) {
      reading = {
        title: readingScreen.title || '',
        passage: readingScreen.passage || '',
        translation: readingScreen.translation || ''
      };
    }
  }

  return {
    id: jsonDay.day,
    day: jsonDay.day,
    title: jsonDay.title,
    subtitle: jsonDay.subtitle || '',
    level: jsonDay.level || 'A1',
    objectives: jsonDay.objectives || [],
    vocabulary,
    grammar,
    exercises,
    reading,
    _raw: jsonDay
  };
}

// Build curriculum object
const curriculum = {};
Object.keys(dayModules).forEach(dayNum => {
  const transformed = transformDay(dayModules[dayNum]);
  if (transformed) {
    curriculum[dayNum] = transformed;
  }
});

// Helper methods
curriculum.getDay = function(dayNumber) {
  return this[dayNumber] || null;
};

curriculum.getAllDays = function() {
  return Object.keys(this)
    .filter(key => !isNaN(key))
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map(key => this[key]);
};

curriculum.getTotalDays = function() {
  return 120;
};

curriculum.getDaysByLevel = function(level) {
  return this.getAllDays().filter(day => day.level === level);
};

curriculum.getLevels = function() {
  return ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
};

curriculum.getDayRange = function(level) {
  const ranges = {
    'A1': [1, 15],
    'A2': [16, 30],
    'B1': [31, 45],
    'B2': [46, 60],
    'C1': [61, 90],
    'C2': [91, 120]
  };
  return ranges[level] || [1, 120];
};

export default curriculum;
