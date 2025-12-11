// ============================================================================
// VISUAL CONTEXT ENGINE - Emojis, scenes, and visual vocabulary
// ============================================================================

// Comprehensive vocabulary to emoji mapping (200+ words)
export const VOCAB_VISUALS = {
  // === FOOD & DRINK ===
  comida: '🍽️', comer: '🍽️', tacos: '🌮', taco: '🌮', pizza: '🍕', 
  hamburguesa: '🍔', sandwich: '🥪', sopa: '🍜', ensalada: '🥗',
  agua: '💧', café: '☕', cerveza: '🍺', vino: '🍷', leche: '🥛', 
  jugo: '🧃', té: '🍵', refresco: '🥤',
  pan: '🍞', pollo: '🍗', carne: '🥩', pescado: '🐟', camarones: '🦐',
  fruta: '🍎', manzana: '🍎', naranja: '🍊', plátano: '🍌', uvas: '🍇',
  fresa: '🍓', limón: '🍋', sandía: '🍉', piña: '🍍',
  helado: '🍦', pastel: '🎂', chocolate: '🍫', galleta: '🍪', 
  queso: '🧀', huevo: '🥚', arroz: '🍚', frijoles: '🫘',
  desayuno: '🍳', almuerzo: '🍽️', cena: '🌙', hambre: '😋', sed: '💧',
  delicioso: '😋', rico: '😋', picante: '🌶️', dulce: '🍬', salado: '🧂',
  
  // === PLACES ===
  restaurante: '🍽️', hotel: '🏨', aeropuerto: '✈️', hospital: '🏥',
  tienda: '🏪', banco: '🏦', playa: '🏖️', montaña: '⛰️', ciudad: '🌆',
  casa: '🏠', apartamento: '🏢', escuela: '🏫', universidad: '🎓',
  oficina: '🏢', parque: '🌳', mercado: '🛒', supermercado: '🛒',
  iglesia: '⛪', museo: '🏛️', biblioteca: '📚', cine: '🎬', teatro: '🎭',
  farmacia: '💊', estación: '🚉', parada: '🚏', centro: '🏙️',
  
  // === TRANSPORT ===
  avión: '✈️', vuelo: '✈️', carro: '🚗', coche: '🚗', auto: '🚗',
  autobús: '🚌', camión: '🚌', tren: '🚂', metro: '🚇',
  taxi: '🚕', uber: '🚕', bicicleta: '🚲', moto: '🏍️', barco: '🚢',
  caminar: '🚶', conducir: '🚗', manejar: '🚗', volar: '✈️',
  
  // === PEOPLE & BODY ===
  persona: '🧑', gente: '👥', hombre: '👨', mujer: '👩',
  niño: '👦', niña: '👧', bebé: '👶', joven: '🧑',
  familia: '👨‍👩‍👧‍👦', padre: '👨', madre: '👩', hijo: '👦', hija: '👧',
  hermano: '👦', hermana: '👧', abuelo: '👴', abuela: '👵',
  amigo: '🧑‍🤝‍🧑', amiga: '👭', novio: '💑', novia: '💑',
  doctor: '👨‍⚕️', médico: '👨‍⚕️', enfermera: '👩‍⚕️', maestro: '👨‍🏫',
  mesero: '🧑‍🍳', chef: '👨‍🍳', policía: '👮', bombero: '🧑‍🚒',
  cabeza: '🗣️', cara: '😊', ojo: '👁️', ojos: '👀', nariz: '👃',
  boca: '👄', oreja: '👂', mano: '✋', manos: '🙌', pie: '🦶',
  corazón: '❤️', estómago: '😖', espalda: '🔙',
  
  // === ACTIONS ===
  hablar: '🗣️', decir: '💬', preguntar: '❓', responder: '💭',
  caminar: '🚶', correr: '🏃', saltar: '🦘', bailar: '💃', nadar: '🏊',
  dormir: '😴', despertar: '⏰', descansar: '😌',
  trabajar: '💼', estudiar: '📚', leer: '📖', escribir: '✍️',
  escuchar: '👂', ver: '👀', mirar: '👁️', buscar: '🔍',
  comer: '🍽️', beber: '🥤', cocinar: '👨‍🍳', preparar: '🍳',
  comprar: '🛒', vender: '💰', pagar: '💳', gastar: '💸',
  jugar: '🎮', cantar: '🎤', tocar: '🎸', pintar: '🎨',
  viajar: '🧳', visitar: '🏛️', conocer: '🤝', encontrar: '🔍',
  ayudar: '🤝', necesitar: '❗', querer: '💕', poder: '💪',
  gustar: '❤️', amar: '💕', odiar: '😤', preferir: '⭐',
  
  // === WEATHER & NATURE ===
  sol: '☀️', soleado: '☀️', luna: '🌙', estrella: '⭐',
  lluvia: '🌧️', llover: '🌧️', nieve: '❄️', nevar: '❄️',
  nube: '☁️', nublado: '☁️', viento: '💨', tormenta: '⛈️',
  caliente: '🔥', calor: '🥵', frío: '🥶', templado: '😌',
  árbol: '🌳', flor: '🌸', planta: '🌱', jardín: '🌺',
  mar: '🌊', océano: '🌊', río: '🏞️', lago: '🏞️', bosque: '🌲',
  
  // === TIME ===
  hoy: '📅', mañana: '🌅', ayer: '📆', ahora: '⏰',
  día: '☀️', noche: '🌙', tarde: '🌅', mediodía: '🌞',
  semana: '📆', mes: '🗓️', año: '📅',
  hora: '⏰', minuto: '⏱️', segundo: '⏱️',
  temprano: '🌅', tarde: '🌆', siempre: '♾️', nunca: '❌',
  
  // === EMOTIONS ===
  feliz: '😊', contento: '😄', alegre: '😁', emocionado: '🤩',
  triste: '😢', llorar: '😭', deprimido: '😞',
  enojado: '😠', furioso: '😤', molesto: '😒',
  cansado: '😫', agotado: '😩', aburrido: '😐',
  nervioso: '😰', preocupado: '😟', asustado: '😨', miedo: '😱',
  sorprendido: '😮', confundido: '😕', tranquilo: '😌',
  enfermo: '🤒', dolor: '😖', bien: '👍', mal: '👎',
  
  // === OBJECTS ===
  libro: '📖', libros: '📚', cuaderno: '📓', papel: '📄', lápiz: '✏️',
  teléfono: '📱', celular: '📱', computadora: '💻', tablet: '📱',
  televisión: '📺', radio: '📻', música: '🎵', película: '🎬',
  dinero: '💵', efectivo: '💵', tarjeta: '💳', moneda: '🪙',
  llave: '🔑', llaves: '🔑', puerta: '🚪', ventana: '🪟',
  pasaporte: '🛂', boleto: '🎫', maleta: '🧳', mochila: '🎒',
  ropa: '👕', camisa: '👔', pantalón: '👖', vestido: '👗',
  zapatos: '👟', sombrero: '🎩', gafas: '👓', reloj: '⌚',
  cama: '🛏️', silla: '🪑', mesa: '🪑', sofá: '🛋️',
  bolsa: '👜', regalo: '🎁', cámara: '📷', foto: '📸',
  
  // === COMMON PHRASES ===
  hola: '👋', adiós: '👋', chao: '👋', 
  gracias: '🙏', favor: '🙏', perdón: '😔', disculpa: '😅',
  buenos: '☀️', buenas: '🌙', bienvenido: '🤗',
  sí: '✅', no: '❌', tal: '🤷', vez: '🔄',
  muy: '💯', mucho: '📈', poco: '📉', más: '➕', menos: '➖',
  aquí: '📍', allí: '👉', cerca: '🔍', lejos: '🌍',
  
  // === NUMBERS (visual representation) ===
  uno: '1️⃣', dos: '2️⃣', tres: '3️⃣', cuatro: '4️⃣', cinco: '5️⃣',
  
  // === COLORS ===
  rojo: '🔴', azul: '🔵', verde: '🟢', amarillo: '🟡',
  negro: '⚫', blanco: '⚪', rosa: '🩷', morado: '🟣'
};

// Scene configurations with gradients and emojis
export const SCENE_CONFIGS = {
  restaurant: {
    gradient: 'linear-gradient(180deg, #2C1810 0%, #4A2C2A 50%, #1A0F0A 100%)',
    ambientEmojis: ['🍽️', '🕯️', '🍷', '🌹', '👨‍🍳', '🥂'],
    contextEmojis: ['🌮', '🍕', '☕', '🥗', '💵', '📋'],
    description: 'Cozy restaurant'
  },
  cafe: {
    gradient: 'linear-gradient(180deg, #D4A574 0%, #A67C52 50%, #8B6914 100%)',
    ambientEmojis: ['☕', '🥐', '📰', '🪴', '💬', '📱'],
    contextEmojis: ['☕', '🧁', '📱', '💭', '😊', '🥪'],
    description: 'Warm café'
  },
  airport: {
    gradient: 'linear-gradient(180deg, #E8F4F8 0%, #B8D4E3 50%, #87CEEB 100%)',
    ambientEmojis: ['✈️', '🛫', '🧳', '🎫', '🛃', '🕐'],
    contextEmojis: ['🛂', '✈️', '🧳', '⏰', '🎫', '💺'],
    description: 'Bright airport'
  },
  hotel: {
    gradient: 'linear-gradient(180deg, #F5E6D3 0%, #E8D4B8 50%, #D4C4A8 100%)',
    ambientEmojis: ['🏨', '🛎️', '🔑', '🛏️', '🧳', '🛗'],
    contextEmojis: ['🔑', '🛏️', '📺', '🚿', '☎️', '🧴'],
    description: 'Elegant hotel'
  },
  doctor: {
    gradient: 'linear-gradient(180deg, #FFFFFF 0%, #E8F5E9 50%, #C8E6C9 100%)',
    ambientEmojis: ['🏥', '👨‍⚕️', '💊', '🩺', '🩹', '💉'],
    contextEmojis: ['💊', '🤒', '💉', '🩹', '❤️', '🩺'],
    description: 'Clean clinic'
  },
  street: {
    gradient: 'linear-gradient(180deg, #87CEEB 0%, #98D8C8 50%, #7CB342 100%)',
    ambientEmojis: ['🏙️', '🚶', '🗺️', '🚗', '🏪', '🚦'],
    contextEmojis: ['➡️', '⬅️', '🗺️', '📍', '🚶', '🏪'],
    description: 'City street'
  },
  beach: {
    gradient: 'linear-gradient(180deg, #87CEEB 0%, #00BCD4 50%, #FFE0B2 100%)',
    ambientEmojis: ['🏖️', '🌊', '🌴', '☀️', '🐚', '🏄'],
    contextEmojis: ['🏖️', '🌊', '🧴', '🩱', '🍹', '⛱️'],
    description: 'Sunny beach'
  },
  home: {
    gradient: 'linear-gradient(180deg, #FFF8E1 0%, #FFECB3 50%, #FFE082 100%)',
    ambientEmojis: ['🏠', '🛋️', '🪴', '📺', '🍳', '🐕'],
    contextEmojis: ['🏠', '🛏️', '🍳', '📺', '🧹', '🛋️'],
    description: 'Cozy home'
  },
  daily: {
    gradient: 'linear-gradient(180deg, #E3F2FD 0%, #BBDEFB 50%, #90CAF9 100%)',
    ambientEmojis: ['☀️', '☕', '📱', '💬', '😊', '🌤️'],
    contextEmojis: ['☀️', '⏰', '📅', '✅', '💪', '🎯'],
    description: 'Daily life'
  },
  market: {
    gradient: 'linear-gradient(180deg, #FFE0B2 0%, #FFCC80 50%, #FFB74D 100%)',
    ambientEmojis: ['🛒', '🍎', '🥬', '💰', '👨‍🌾', '🧺'],
    contextEmojis: ['🍎', '🥕', '💵', '⚖️', '🛒', '🧾'],
    description: 'Vibrant market'
  }
};

// Extract visuals from text
export const extractVisualsFromText = (text) => {
  if (!text) return [];
  const lowerText = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const visuals = [];
  
  Object.entries(VOCAB_VISUALS).forEach(([word, emoji]) => {
    if (lowerText.includes(word) && !visuals.includes(emoji)) {
      visuals.push(emoji);
    }
  });
  
  return visuals.slice(0, 6);
};

// Get visual for single word
export const getWordVisual = (word) => {
  if (!word) return null;
  const normalized = word.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return VOCAB_VISUALS[normalized] || null;
};

// Detect scene from conversation
export const detectSceneFromConversation = (messages) => {
  if (!messages || messages.length === 0) return 'daily';
  const text = messages.map(m => m.text || '').join(' ').toLowerCase();
  
  if (text.includes('restaurante') || text.includes('comer') || text.includes('menu') || text.includes('mesero')) return 'restaurant';
  if (text.includes('café') || text.includes('coffee') || text.includes('cafetería')) return 'cafe';
  if (text.includes('aeropuerto') || text.includes('vuelo') || text.includes('avión') || text.includes('pasaporte')) return 'airport';
  if (text.includes('hotel') || text.includes('habitación') || text.includes('reserva') || text.includes('recepción')) return 'hotel';
  if (text.includes('doctor') || text.includes('hospital') || text.includes('enfermo') || text.includes('medicina')) return 'doctor';
  if (text.includes('playa') || text.includes('mar') || text.includes('nadar') || text.includes('arena')) return 'beach';
  if (text.includes('calle') || text.includes('dirección') || text.includes('perdido') || text.includes('izquierda')) return 'street';
  if (text.includes('mercado') || text.includes('comprar') || text.includes('precio') || text.includes('fruta')) return 'market';
  if (text.includes('casa') || text.includes('cocina') || text.includes('familia') || text.includes('hogar')) return 'home';
  
  return 'daily';
};

// Get vocabulary with visuals for a topic
export const getVocabForTopic = (topic) => {
  const topics = {
    food: ['comida', 'agua', 'café', 'tacos', 'pollo', 'ensalada', 'fruta', 'desayuno', 'almuerzo', 'cena'],
    travel: ['avión', 'hotel', 'pasaporte', 'maleta', 'vuelo', 'boleto', 'aeropuerto', 'taxi'],
    family: ['familia', 'padre', 'madre', 'hermano', 'hermana', 'hijo', 'hija', 'abuelo'],
    weather: ['sol', 'lluvia', 'nieve', 'caliente', 'frío', 'nube', 'viento'],
    daily: ['hoy', 'mañana', 'trabajo', 'casa', 'comer', 'dormir', 'hablar']
  };
  
  return (topics[topic] || topics.daily).map(word => ({
    word,
    visual: VOCAB_VISUALS[word] || '📝'
  }));
};

export default { 
  VOCAB_VISUALS, 
  SCENE_CONFIGS, 
  extractVisualsFromText, 
  getWordVisual, 
  detectSceneFromConversation,
  getVocabForTopic
};
