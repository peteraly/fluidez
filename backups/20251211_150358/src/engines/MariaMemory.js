/**
 * MariaMemory
 * 
 * Gives María "memory" of past conversations for continuity and personalization.
 * Stores key facts the user shares and references them naturally.
 * 
 * Design principles:
 * - Privacy-first: all data stays local
 * - Organic references, not forced
 * - Builds relationship over time
 * - Never creepy or surveillance-like
 */

// Categories of things María can remember
const MEMORY_CATEGORIES = {
  personal: {
    name: 'Personal Info',
    examples: ['name', 'location', 'job', 'family'],
    maxItems: 10
  },
  preferences: {
    name: 'Preferences',
    examples: ['favorite food', 'hobbies', 'music taste'],
    maxItems: 15
  },
  experiences: {
    name: 'Shared Experiences',
    examples: ['trips discussed', 'stories told', 'jokes made'],
    maxItems: 20
  },
  learning: {
    name: 'Learning Journey',
    examples: ['struggles', 'breakthroughs', 'goals'],
    maxItems: 10
  },
  conversations: {
    name: 'Past Topics',
    examples: ['topics discussed', 'questions asked'],
    maxItems: 25
  }
};

// Patterns to extract memorable info from user messages
const EXTRACTION_PATTERNS = [
  // Personal info
  { pattern: /me llamo (\w+)/i, category: 'personal', key: 'name', extract: 1 },
  { pattern: /my name is (\w+)/i, category: 'personal', key: 'name', extract: 1 },
  { pattern: /soy de (\w+)/i, category: 'personal', key: 'location', extract: 1 },
  { pattern: /i('m| am) from (\w+)/i, category: 'personal', key: 'location', extract: 2 },
  { pattern: /vivo en (\w+)/i, category: 'personal', key: 'city', extract: 1 },
  { pattern: /i live in (\w+)/i, category: 'personal', key: 'city', extract: 1 },
  { pattern: /trabajo como (\w+)/i, category: 'personal', key: 'job', extract: 1 },
  { pattern: /i('m| am) a(n)? (\w+)/i, category: 'personal', key: 'job', extract: 3 },
  { pattern: /tengo (\d+) años/i, category: 'personal', key: 'age', extract: 1 },
  
  // Family
  { pattern: /mi (esposo|esposa|novio|novia)/i, category: 'personal', key: 'partner', extract: 1 },
  { pattern: /my (husband|wife|boyfriend|girlfriend)/i, category: 'personal', key: 'partner', extract: 1 },
  { pattern: /tengo (\d+) (hijos|niños)/i, category: 'personal', key: 'children', extract: 1 },
  { pattern: /mi (perro|gato|mascota) se llama (\w+)/i, category: 'personal', key: 'pet', extract: 2 },
  { pattern: /my (dog|cat|pet)('s name is| is named) (\w+)/i, category: 'personal', key: 'pet', extract: 3 },
  
  // Preferences
  { pattern: /me gusta (mucho )?(.+)/i, category: 'preferences', key: 'likes', extract: 2 },
  { pattern: /i (really )?like (.+)/i, category: 'preferences', key: 'likes', extract: 2 },
  { pattern: /me encanta (.+)/i, category: 'preferences', key: 'loves', extract: 1 },
  { pattern: /i love (.+)/i, category: 'preferences', key: 'loves', extract: 1 },
  { pattern: /mi comida favorita es (.+)/i, category: 'preferences', key: 'favorite_food', extract: 1 },
  { pattern: /my favorite food is (.+)/i, category: 'preferences', key: 'favorite_food', extract: 1 },
  { pattern: /no me gusta (.+)/i, category: 'preferences', key: 'dislikes', extract: 1 },
  { pattern: /i don't like (.+)/i, category: 'preferences', key: 'dislikes', extract: 1 },
  
  // Goals
  { pattern: /quiero (aprender|viajar|visitar) (.+)/i, category: 'learning', key: 'goals', extract: 0 },
  { pattern: /i want to (learn|visit|travel) (.+)/i, category: 'learning', key: 'goals', extract: 0 },
  { pattern: /my goal is (.+)/i, category: 'learning', key: 'goals', extract: 1 },
  
  // Experiences
  { pattern: /fui a (.+)/i, category: 'experiences', key: 'places_visited', extract: 1 },
  { pattern: /i (went|traveled) to (.+)/i, category: 'experiences', key: 'places_visited', extract: 2 }
];

// Load memories from localStorage
export function loadMemories() {
  try {
    return JSON.parse(localStorage.getItem('fluidez_maria_memory') || '{}');
  } catch {
    return {};
  }
}

// Save memories to localStorage
function saveMemories(memories) {
  localStorage.setItem('fluidez_maria_memory', JSON.stringify(memories));
}

// Extract memorable info from a user message
export function extractMemories(userMessage) {
  const extracted = [];
  
  for (const pattern of EXTRACTION_PATTERNS) {
    const match = userMessage.match(pattern.pattern);
    if (match) {
      const value = pattern.extract === 0 
        ? match[0] 
        : match[pattern.extract];
      
      if (value && value.length > 1 && value.length < 50) {
        extracted.push({
          category: pattern.category,
          key: pattern.key,
          value: value.trim(),
          timestamp: new Date().toISOString()
        });
      }
    }
  }
  
  return extracted;
}

// Store new memories
export function storeMemories(newMemories) {
  if (!newMemories || newMemories.length === 0) return;
  
  const memories = loadMemories();
  
  for (const memory of newMemories) {
    const { category, key, value, timestamp } = memory;
    
    if (!memories[category]) {
      memories[category] = {};
    }
    
    // For array-type keys (likes, goals, etc), append
    if (['likes', 'loves', 'dislikes', 'goals', 'places_visited'].includes(key)) {
      if (!memories[category][key]) {
        memories[category][key] = [];
      }
      // Avoid duplicates
      if (!memories[category][key].some(m => m.value === value)) {
        memories[category][key].push({ value, timestamp });
        // Keep within limits
        const limit = MEMORY_CATEGORIES[category]?.maxItems || 10;
        if (memories[category][key].length > limit) {
          memories[category][key] = memories[category][key].slice(-limit);
        }
      }
    } else {
      // For single-value keys (name, location), replace
      memories[category][key] = { value, timestamp };
    }
  }
  
  saveMemories(memories);
}

// Process a user message and store any memories
export function processUserMessage(message) {
  const newMemories = extractMemories(message);
  if (newMemories.length > 0) {
    storeMemories(newMemories);
  }
  return newMemories;
}

// Get a specific memory
export function getMemory(category, key) {
  const memories = loadMemories();
  return memories[category]?.[key];
}

// Get user's name if known
export function getUserName() {
  const nameMemory = getMemory('personal', 'name');
  return nameMemory?.value || null;
}

// Build memory context for AI prompt
export function buildMemoryContext() {
  const memories = loadMemories();
  const contextParts = [];
  
  // Personal info
  if (memories.personal) {
    const personal = memories.personal;
    if (personal.name) contextParts.push(`Student's name: ${personal.name.value}`);
    if (personal.location) contextParts.push(`From: ${personal.location.value}`);
    if (personal.city) contextParts.push(`Lives in: ${personal.city.value}`);
    if (personal.job) contextParts.push(`Works as: ${personal.job.value}`);
    if (personal.pet) contextParts.push(`Has a pet named: ${personal.pet.value}`);
  }
  
  // Preferences
  if (memories.preferences) {
    const prefs = memories.preferences;
    if (prefs.likes?.length > 0) {
      const likes = prefs.likes.slice(-3).map(l => l.value).join(', ');
      contextParts.push(`Likes: ${likes}`);
    }
    if (prefs.favorite_food) {
      contextParts.push(`Favorite food: ${prefs.favorite_food.value}`);
    }
  }
  
  // Learning goals
  if (memories.learning?.goals?.length > 0) {
    const goals = memories.learning.goals.slice(-2).map(g => g.value).join(', ');
    contextParts.push(`Learning goals: ${goals}`);
  }
  
  if (contextParts.length === 0) return null;
  
  return `
[María's memory of this student]
${contextParts.join('\n')}

Use this information naturally in conversation - reference things they've shared when relevant, but don't force it. Make them feel known and remembered.
`;
}

// Generate a personalized greeting based on memories
export function getPersonalizedGreeting() {
  const memories = loadMemories();
  const name = memories.personal?.name?.value;
  const lastTopic = memories.conversations?.lastTopic?.value;
  
  const greetings = [
    name ? `¡Hola ${name}! ¡Qué gusto verte de nuevo!` : '¡Hola! ¡Qué gusto verte!',
    name ? `¡${name}! ¿Cómo has estado?` : '¡Hola! ¿Cómo has estado?',
    '¡Hola amigo! Ready to practice?'
  ];
  
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];
  
  // Add reference to past topic sometimes
  if (lastTopic && Math.random() > 0.5) {
    return `${greeting} Last time we talked about ${lastTopic}...`;
  }
  
  return greeting;
}

// Record conversation topic for continuity
export function recordConversationTopic(topic) {
  const memories = loadMemories();
  
  if (!memories.conversations) {
    memories.conversations = {};
  }
  
  memories.conversations.lastTopic = {
    value: topic,
    timestamp: new Date().toISOString()
  };
  
  if (!memories.conversations.topicHistory) {
    memories.conversations.topicHistory = [];
  }
  
  memories.conversations.topicHistory.push({
    value: topic,
    timestamp: new Date().toISOString()
  });
  
  // Keep last 25 topics
  if (memories.conversations.topicHistory.length > 25) {
    memories.conversations.topicHistory = memories.conversations.topicHistory.slice(-25);
  }
  
  saveMemories(memories);
}

// Get conversation history summary
export function getConversationHistory() {
  const memories = loadMemories();
  return {
    lastTopic: memories.conversations?.lastTopic?.value,
    topicHistory: memories.conversations?.topicHistory?.map(t => t.value) || [],
    totalConversations: memories.conversations?.topicHistory?.length || 0
  };
}

// Generate callback references (things María might say about past conversations)
export function getCallbackReference() {
  const memories = loadMemories();
  const callbacks = [];
  
  // Reference name
  const name = memories.personal?.name?.value;
  if (name) {
    callbacks.push(`Remember ${name}, you've got this!`);
  }
  
  // Reference favorite things
  const likes = memories.preferences?.likes;
  if (likes?.length > 0) {
    const randomLike = likes[Math.floor(Math.random() * likes.length)].value;
    callbacks.push(`Hey, remember when you told me you like ${randomLike}?`);
  }
  
  // Reference goals
  const goals = memories.learning?.goals;
  if (goals?.length > 0) {
    const randomGoal = goals[Math.floor(Math.random() * goals.length)].value;
    callbacks.push(`You mentioned you want to ${randomGoal} - you're making progress!`);
  }
  
  // Reference places
  const places = memories.experiences?.places_visited;
  if (places?.length > 0) {
    const randomPlace = places[Math.floor(Math.random() * places.length)].value;
    callbacks.push(`Remember when you told me about going to ${randomPlace}?`);
  }
  
  if (callbacks.length === 0) return null;
  return callbacks[Math.floor(Math.random() * callbacks.length)];
}

// Clear all memories (for privacy/reset)
export function clearMemories() {
  localStorage.removeItem('fluidez_maria_memory');
}

// Get memory stats for display
export function getMemoryStats() {
  const memories = loadMemories();
  
  let totalFacts = 0;
  for (const category of Object.values(memories)) {
    for (const value of Object.values(category)) {
      if (Array.isArray(value)) {
        totalFacts += value.length;
      } else if (value) {
        totalFacts += 1;
      }
    }
  }
  
  return {
    totalFacts,
    hasName: !!memories.personal?.name,
    categories: Object.keys(memories).length,
    oldestMemory: getOldestMemoryDate(memories),
    newestMemory: getNewestMemoryDate(memories)
  };
}

function getOldestMemoryDate(memories) {
  let oldest = null;
  
  for (const category of Object.values(memories)) {
    for (const value of Object.values(category)) {
      if (Array.isArray(value)) {
        for (const item of value) {
          if (item.timestamp && (!oldest || item.timestamp < oldest)) {
            oldest = item.timestamp;
          }
        }
      } else if (value?.timestamp) {
        if (!oldest || value.timestamp < oldest) {
          oldest = value.timestamp;
        }
      }
    }
  }
  
  return oldest;
}

function getNewestMemoryDate(memories) {
  let newest = null;
  
  for (const category of Object.values(memories)) {
    for (const value of Object.values(category)) {
      if (Array.isArray(value)) {
        for (const item of value) {
          if (item.timestamp && (!newest || item.timestamp > newest)) {
            newest = item.timestamp;
          }
        }
      } else if (value?.timestamp) {
        if (!newest || value.timestamp > newest) {
          newest = value.timestamp;
        }
      }
    }
  }
  
  return newest;
}

export default {
  loadMemories,
  processUserMessage,
  storeMemories,
  getMemory,
  getUserName,
  buildMemoryContext,
  getPersonalizedGreeting,
  recordConversationTopic,
  getConversationHistory,
  getCallbackReference,
  clearMemories,
  getMemoryStats
};
