// Visual assets mapped to Spanish vocabulary and contexts
// Uses emoji for instant visual representation

export const VocabVisuals = {
  // Food
  comida: '🍽️', comer: '🍽️', 
  tacos: '🌮', taco: '🌮',
  pizza: '🍕',
  agua: '💧', 
  café: '☕', coffee: '☕',
  cerveza: '🍺', beer: '🍺',
  vino: '🍷', wine: '🍷',
  pan: '🍞', bread: '🍞',
  pollo: '🍗', chicken: '🍗',
  pescado: '🐟', fish: '🐟',
  ensalada: '🥗', salad: '🥗',
  fruta: '🍎', fruit: '🍎',
  manzana: '🍎', apple: '🍎',
  naranja: '🍊', orange: '🍊',
  plátano: '🍌', banana: '🍌',
  
  // Places
  restaurante: '🍽️', restaurant: '🍽️',
  hotel: '🏨',
  aeropuerto: '✈️', airport: '✈️',
  hospital: '🏥',
  tienda: '🏪', store: '🏪',
  banco: '🏦', bank: '🏦',
  playa: '🏖️', beach: '🏖️',
  montaña: '⛰️', mountain: '⛰️',
  ciudad: '🌆', city: '🌆',
  casa: '🏠', house: '🏠',
  escuela: '🏫', school: '🏫',
  oficina: '🏢', office: '🏢',
  
  // Transport
  avión: '✈️', airplane: '✈️', plane: '✈️',
  carro: '🚗', coche: '🚗', car: '🚗',
  autobús: '🚌', bus: '🚌',
  tren: '🚂', train: '🚂',
  taxi: '🚕',
  bicicleta: '🚲', bicycle: '🚲',
  
  // People
  persona: '🧑', person: '🧑',
  hombre: '👨', man: '👨',
  mujer: '👩', woman: '👩',
  niño: '👦', boy: '👦',
  niña: '👧', girl: '👧',
  familia: '👨‍👩‍👧‍👦', family: '👨‍👩‍👧‍👦',
  amigo: '🧑‍🤝‍🧑', friend: '🧑‍🤝‍🧑',
  doctor: '👨‍⚕️', médico: '👨‍⚕️',
  maestro: '👨‍🏫', teacher: '👨‍🏫',
  
  // Actions
  hablar: '🗣️', speak: '🗣️', talk: '🗣️',
  caminar: '🚶', walk: '🚶',
  correr: '🏃', run: '🏃',
  dormir: '😴', sleep: '😴',
  trabajar: '💼', work: '💼',
  estudiar: '📚', study: '📚',
  bailar: '💃', dance: '💃',
  cantar: '🎤', sing: '🎤',
  cocinar: '👨‍🍳', cook: '👨‍🍳',
  viajar: '🧳', travel: '🧳',
  comprar: '🛒', buy: '🛒', shop: '🛒',
  
  // Objects
  libro: '📖', book: '📖',
  teléfono: '📱', phone: '📱',
  computadora: '💻', computer: '💻',
  dinero: '💵', money: '💵',
  llave: '🔑', key: '🔑',
  pasaporte: '🛂', passport: '🛂',
  maleta: '🧳', suitcase: '🧳',
  mesa: '🪑', table: '🪑',
  silla: '🪑', chair: '🪑',
  cama: '🛏️', bed: '🛏️',
  
  // Time
  hoy: '📅', today: '📅',
  mañana: '🌅', tomorrow: '🌅', morning: '🌅',
  noche: '🌙', night: '🌙',
  día: '☀️', day: '☀️',
  
  // Weather
  sol: '☀️', sun: '☀️', sunny: '☀️',
  lluvia: '🌧️', rain: '🌧️',
  nieve: '❄️', snow: '❄️',
  caliente: '🔥', hot: '🔥',
  frío: '🥶', cold: '🥶',
  
  // Emotions
  feliz: '😊', happy: '😊',
  triste: '😢', sad: '😢',
  cansado: '😫', tired: '😫',
  enfermo: '🤒', sick: '🤒',
  hambre: '🍽️', hungry: '🍽️',
  sed: '💧', thirsty: '💧',
  
  // Numbers (visual representation)
  uno: '1️⃣', one: '1️⃣',
  dos: '2️⃣', two: '2️⃣',
  tres: '3️⃣', three: '3️⃣',
  
  // Directions
  izquierda: '⬅️', left: '⬅️',
  derecha: '➡️', right: '➡️',
  arriba: '⬆️', up: '⬆️',
  abajo: '⬇️', down: '⬇️',
};

// Scene backgrounds (CSS gradient + emoji based)
export const SceneBackgrounds = {
  restaurant: {
    gradient: 'linear-gradient(180deg, #2C1810 0%, #4A2C2A 50%, #1A0F0A 100%)',
    emoji: '🍽️🕯️🍷',
    ambientEmoji: ['🍽️', '🕯️', '🍷', '🌹'],
    description: 'Cozy restaurant with warm lighting'
  },
  airport: {
    gradient: 'linear-gradient(180deg, #E8F4F8 0%, #B8D4E3 50%, #87CEEB 100%)',
    emoji: '✈️🛫🧳',
    ambientEmoji: ['✈️', '🛫', '🧳', '🎫'],
    description: 'Bright airport terminal'
  },
  hotel: {
    gradient: 'linear-gradient(180deg, #F5E6D3 0%, #E8D4B8 50%, #D4C4A8 100%)',
    emoji: '🏨🛎️🔑',
    ambientEmoji: ['🏨', '🛎️', '🔑', '🧳'],
    description: 'Elegant hotel lobby'
  },
  cafe: {
    gradient: 'linear-gradient(180deg, #D4A574 0%, #8B6914 50%, #654321 100%)',
    emoji: '☕🥐📰',
    ambientEmoji: ['☕', '🥐', '📰', '🪴'],
    description: 'Warm café atmosphere'
  },
  doctor: {
    gradient: 'linear-gradient(180deg, #FFFFFF 0%, #E8F5E9 50%, #C8E6C9 100%)',
    emoji: '🏥👨‍⚕️💊',
    ambientEmoji: ['🏥', '👨‍⚕️', '💊', '🩺'],
    description: 'Clean medical office'
  },
  street: {
    gradient: 'linear-gradient(180deg, #87CEEB 0%, #98D8C8 50%, #7CB342 100%)',
    emoji: '🏙️🚶🗺️',
    ambientEmoji: ['🏙️', '🚶', '🗺️', '🚗'],
    description: 'Sunny city street'
  },
  beach: {
    gradient: 'linear-gradient(180deg, #87CEEB 0%, #00BCD4 50%, #FFE0B2 100%)',
    emoji: '🏖️🌊🌴',
    ambientEmoji: ['🏖️', '🌊', '🌴', '☀️'],
    description: 'Beautiful beach scene'
  },
  home: {
    gradient: 'linear-gradient(180deg, #FFF8E1 0%, #FFECB3 50%, #FFE082 100%)',
    emoji: '🏠🛋️🪴',
    ambientEmoji: ['🏠', '🛋️', '🪴', '📺'],
    description: 'Cozy home interior'
  }
};

// Character expressions
export const CharacterExpressions = {
  maria: {
    neutral: '👩‍🏫',
    happy: '😊',
    excited: '🤩',
    thinking: '🤔',
    supportive: '🤗',
    laughing: '😄',
    surprised: '😮',
    proud: '🥹'
  },
  waiter: {
    neutral: '🧑‍🍳',
    happy: '😊',
    helpful: '🤗'
  },
  agent: {
    neutral: '🧑‍✈️',
    professional: '😐',
    helpful: '😊'
  },
  doctor: {
    neutral: '👨‍⚕️',
    caring: '😊',
    concerned: '🤔'
  },
  friend: {
    neutral: '🧑',
    happy: '😊',
    excited: '🤩',
    curious: '🤔'
  }
};

// Get visual for a word
export const getWordVisual = (word) => {
  const lowerWord = word.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return VocabVisuals[lowerWord] || null;
};

// Detect context from text and return relevant visuals
export const detectContextVisuals = (text) => {
  const lowerText = text.toLowerCase();
  const visuals = [];
  
  Object.entries(VocabVisuals).forEach(([word, emoji]) => {
    if (lowerText.includes(word) && !visuals.includes(emoji)) {
      visuals.push(emoji);
    }
  });
  
  return visuals.slice(0, 5); // Return max 5 relevant visuals
};

export default { VocabVisuals, SceneBackgrounds, CharacterExpressions, getWordVisual, detectContextVisuals };
