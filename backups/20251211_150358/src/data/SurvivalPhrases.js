/**
 * SurvivalPhrases.js
 * 
 * 100+ essential Spanish survival phrases organized by situation.
 * These are the phrases you MUST know for basic communication.
 */

export const SURVIVAL_PHRASES = {
  // ============ EMERGENCY (15 phrases) ============
  emergency: {
    name: "Emergency",
    emoji: "🆘",
    priority: 1,
    phrases: [
      { spanish: "¡Ayuda!", english: "Help!", context: "emergency", audio: true },
      { spanish: "¡Llame a la policía!", english: "Call the police!", context: "emergency", audio: true },
      { spanish: "¡Llame a una ambulancia!", english: "Call an ambulance!", context: "medical", audio: true },
      { spanish: "Necesito un médico", english: "I need a doctor", context: "medical", audio: true },
      { spanish: "Estoy perdido/a", english: "I'm lost", context: "navigation", audio: true },
      { spanish: "Me robaron", english: "I was robbed", context: "crime", audio: true },
      { spanish: "Hay un incendio", english: "There's a fire", context: "emergency", audio: true },
      { spanish: "Es una emergencia", english: "It's an emergency", context: "general", audio: true },
      { spanish: "¿Dónde está el hospital?", english: "Where is the hospital?", context: "medical", audio: true },
      { spanish: "¿Dónde está la comisaría?", english: "Where is the police station?", context: "police", audio: true },
      { spanish: "Necesito ayuda", english: "I need help", context: "general", audio: true },
      { spanish: "¡Cuidado!", english: "Be careful!/Watch out!", context: "warning", audio: true },
      { spanish: "¡Fuego!", english: "Fire!", context: "emergency", audio: true },
      { spanish: "Soy alérgico/a a...", english: "I'm allergic to...", context: "medical", audio: true },
      { spanish: "No me siento bien", english: "I don't feel well", context: "medical", audio: true },
    ]
  },

  // ============ BASIC COMMUNICATION (20 phrases) ============
  basicCommunication: {
    name: "Basic Communication",
    emoji: "💬",
    priority: 2,
    phrases: [
      { spanish: "No entiendo", english: "I don't understand", context: "communication", audio: true },
      { spanish: "No hablo español muy bien", english: "I don't speak Spanish very well", context: "communication", audio: true },
      { spanish: "¿Habla inglés?", english: "Do you speak English?", context: "communication", audio: true },
      { spanish: "¿Puede repetir, por favor?", english: "Can you repeat, please?", context: "communication", audio: true },
      { spanish: "¿Puede hablar más despacio?", english: "Can you speak more slowly?", context: "communication", audio: true },
      { spanish: "¿Cómo se dice ___ en español?", english: "How do you say ___ in Spanish?", context: "learning", audio: true },
      { spanish: "¿Qué significa ___?", english: "What does ___ mean?", context: "learning", audio: true },
      { spanish: "¿Puede escribirlo?", english: "Can you write it down?", context: "communication", audio: true },
      { spanish: "Un momento, por favor", english: "One moment, please", context: "general", audio: true },
      { spanish: "Estoy aprendiendo español", english: "I'm learning Spanish", context: "learning", audio: true },
      { spanish: "¿Me entiende?", english: "Do you understand me?", context: "communication", audio: true },
      { spanish: "No sé", english: "I don't know", context: "general", audio: true },
      { spanish: "Creo que sí", english: "I think so", context: "general", audio: true },
      { spanish: "Creo que no", english: "I don't think so", context: "general", audio: true },
      { spanish: "¿Cómo?", english: "What? (didn't hear)", context: "communication", audio: true },
      { spanish: "Perdone, ¿qué dijo?", english: "Sorry, what did you say?", context: "communication", audio: true },
      { spanish: "¿Puede explicar?", english: "Can you explain?", context: "communication", audio: true },
      { spanish: "Más o menos", english: "More or less", context: "general", audio: true },
      { spanish: "Depende", english: "It depends", context: "general", audio: true },
      { spanish: "¡Perfecto!", english: "Perfect!", context: "agreement", audio: true },
    ]
  },

  // ============ DIRECTIONS (15 phrases) ============
  directions: {
    name: "Directions",
    emoji: "🧭",
    priority: 3,
    phrases: [
      { spanish: "¿Dónde está...?", english: "Where is...?", context: "asking location", audio: true },
      { spanish: "¿Cómo llego a...?", english: "How do I get to...?", context: "asking directions", audio: true },
      { spanish: "Estoy buscando...", english: "I'm looking for...", context: "searching", audio: true },
      { spanish: "¿Está cerca?", english: "Is it close?", context: "distance", audio: true },
      { spanish: "¿Está lejos?", english: "Is it far?", context: "distance", audio: true },
      { spanish: "A la derecha", english: "To the right", context: "directions", audio: true },
      { spanish: "A la izquierda", english: "To the left", context: "directions", audio: true },
      { spanish: "Todo recto", english: "Straight ahead", context: "directions", audio: true },
      { spanish: "En la esquina", english: "On the corner", context: "location", audio: true },
      { spanish: "Al lado de...", english: "Next to...", context: "location", audio: true },
      { spanish: "Enfrente de...", english: "In front of...", context: "location", audio: true },
      { spanish: "¿Cuánto tiempo se tarda?", english: "How long does it take?", context: "duration", audio: true },
      { spanish: "¿Puede mostrarme en el mapa?", english: "Can you show me on the map?", context: "maps", audio: true },
      { spanish: "¿Hay un ___ cerca?", english: "Is there a ___ nearby?", context: "searching", audio: true },
      { spanish: "Me perdí", english: "I got lost", context: "lost", audio: true },
    ]
  },

  // ============ SHOPPING & MONEY (18 phrases) ============
  shopping: {
    name: "Shopping & Money",
    emoji: "🛒",
    priority: 4,
    phrases: [
      { spanish: "¿Cuánto cuesta?", english: "How much does it cost?", context: "price", audio: true },
      { spanish: "¿Cuánto es?", english: "How much is it?", context: "total", audio: true },
      { spanish: "Es muy caro", english: "It's very expensive", context: "price", audio: true },
      { spanish: "¿Tiene algo más barato?", english: "Do you have something cheaper?", context: "bargaining", audio: true },
      { spanish: "¿Aceptan tarjeta de crédito?", english: "Do you accept credit cards?", context: "payment", audio: true },
      { spanish: "Solo efectivo", english: "Cash only", context: "payment", audio: true },
      { spanish: "Quisiera comprar...", english: "I would like to buy...", context: "purchasing", audio: true },
      { spanish: "Solo estoy mirando", english: "I'm just looking", context: "browsing", audio: true },
      { spanish: "Me lo llevo", english: "I'll take it", context: "purchasing", audio: true },
      { spanish: "¿Tiene esto en otra talla?", english: "Do you have this in another size?", context: "clothing", audio: true },
      { spanish: "¿Puedo probármelo?", english: "Can I try it on?", context: "clothing", audio: true },
      { spanish: "¿Dónde están los probadores?", english: "Where are the fitting rooms?", context: "clothing", audio: true },
      { spanish: "¿Tiene cambio?", english: "Do you have change?", context: "payment", audio: true },
      { spanish: "El recibo, por favor", english: "The receipt, please", context: "payment", audio: true },
      { spanish: "¿Hay descuento?", english: "Is there a discount?", context: "bargaining", audio: true },
      { spanish: "Está en oferta", english: "It's on sale", context: "sales", audio: true },
      { spanish: "¿Dónde puedo cambiar dinero?", english: "Where can I exchange money?", context: "money", audio: true },
      { spanish: "¿Cuál es el tipo de cambio?", english: "What's the exchange rate?", context: "money", audio: true },
    ]
  },

  // ============ RESTAURANT (20 phrases) ============
  restaurant: {
    name: "Restaurant",
    emoji: "🍽️",
    priority: 5,
    phrases: [
      { spanish: "Una mesa para dos, por favor", english: "A table for two, please", context: "seating", audio: true },
      { spanish: "El menú, por favor", english: "The menu, please", context: "ordering", audio: true },
      { spanish: "¿Qué me recomienda?", english: "What do you recommend?", context: "ordering", audio: true },
      { spanish: "Quisiera...", english: "I would like...", context: "ordering", audio: true },
      { spanish: "Para mí...", english: "For me...", context: "ordering", audio: true },
      { spanish: "¿Qué tiene de...?", english: "What do you have for...?", context: "asking", audio: true },
      { spanish: "¿Cuál es el plato del día?", english: "What's the dish of the day?", context: "asking", audio: true },
      { spanish: "Sin carne, por favor", english: "Without meat, please", context: "dietary", audio: true },
      { spanish: "Soy vegetariano/a", english: "I'm vegetarian", context: "dietary", audio: true },
      { spanish: "¿Tiene opciones sin gluten?", english: "Do you have gluten-free options?", context: "dietary", audio: true },
      { spanish: "¿Algo más?", english: "Anything else?", context: "waiter asking", audio: true },
      { spanish: "Eso es todo", english: "That's all", context: "ordering", audio: true },
      { spanish: "La cuenta, por favor", english: "The check, please", context: "paying", audio: true },
      { spanish: "¿Está incluida la propina?", english: "Is the tip included?", context: "paying", audio: true },
      { spanish: "¿Puedo pagar con tarjeta?", english: "Can I pay with card?", context: "paying", audio: true },
      { spanish: "Está delicioso", english: "It's delicious", context: "compliment", audio: true },
      { spanish: "¿Me trae más agua?", english: "Can you bring me more water?", context: "request", audio: true },
      { spanish: "¿Dónde está el baño?", english: "Where is the bathroom?", context: "location", audio: true },
      { spanish: "Para llevar", english: "To go", context: "takeout", audio: true },
      { spanish: "Para comer aquí", english: "To eat here", context: "dining in", audio: true },
    ]
  },

  // ============ TRANSPORTATION (15 phrases) ============
  transportation: {
    name: "Transportation",
    emoji: "🚌",
    priority: 6,
    phrases: [
      { spanish: "¿A qué hora sale el próximo...?", english: "What time does the next... leave?", context: "schedule", audio: true },
      { spanish: "Un boleto a..., por favor", english: "A ticket to..., please", context: "ticket", audio: true },
      { spanish: "¿De ida o ida y vuelta?", english: "One-way or round-trip?", context: "ticket", audio: true },
      { spanish: "¿Cuánto cuesta el boleto?", english: "How much is the ticket?", context: "price", audio: true },
      { spanish: "¿Dónde está la parada de...?", english: "Where is the... stop?", context: "location", audio: true },
      { spanish: "¿Este autobús va a...?", english: "Does this bus go to...?", context: "verification", audio: true },
      { spanish: "¿Cuál es la próxima parada?", english: "What's the next stop?", context: "information", audio: true },
      { spanish: "¿Me avisa cuando lleguemos?", english: "Can you tell me when we arrive?", context: "request", audio: true },
      { spanish: "¿Dónde puedo tomar un taxi?", english: "Where can I get a taxi?", context: "taxi", audio: true },
      { spanish: "¿Cuánto cuesta ir a...?", english: "How much to go to...?", context: "taxi", audio: true },
      { spanish: "Pare aquí, por favor", english: "Stop here, please", context: "taxi", audio: true },
      { spanish: "¿Tiene asiento disponible?", english: "Is there a seat available?", context: "seating", audio: true },
      { spanish: "Con permiso, voy a bajar", english: "Excuse me, I'm getting off", context: "bus/train", audio: true },
      { spanish: "¿A qué andén?", english: "Which platform?", context: "train", audio: true },
      { spanish: "¿Hay retrasos?", english: "Are there delays?", context: "schedule", audio: true },
    ]
  },

  // ============ HOTEL (12 phrases) ============
  hotel: {
    name: "Hotel",
    emoji: "🏨",
    priority: 7,
    phrases: [
      { spanish: "Tengo una reservación", english: "I have a reservation", context: "check-in", audio: true },
      { spanish: "Quisiera una habitación", english: "I would like a room", context: "booking", audio: true },
      { spanish: "¿Cuánto cuesta por noche?", english: "How much per night?", context: "price", audio: true },
      { spanish: "¿Está incluido el desayuno?", english: "Is breakfast included?", context: "amenities", audio: true },
      { spanish: "¿Tiene WiFi?", english: "Do you have WiFi?", context: "amenities", audio: true },
      { spanish: "¿Cuál es la contraseña?", english: "What's the password?", context: "WiFi", audio: true },
      { spanish: "¿A qué hora es el check-out?", english: "What time is checkout?", context: "schedule", audio: true },
      { spanish: "La llave, por favor", english: "The key, please", context: "request", audio: true },
      { spanish: "No funciona el...", english: "The... doesn't work", context: "problem", audio: true },
      { spanish: "¿Puede llamar un taxi?", english: "Can you call a taxi?", context: "request", audio: true },
      { spanish: "¿Tiene caja fuerte?", english: "Do you have a safe?", context: "security", audio: true },
      { spanish: "Quisiera hacer el check-out", english: "I would like to check out", context: "leaving", audio: true },
    ]
  },

  // ============ SOCIAL (15 phrases) ============
  social: {
    name: "Social",
    emoji: "🎉",
    priority: 8,
    phrases: [
      { spanish: "¿Cómo te llamas?", english: "What's your name?", context: "introduction", audio: true },
      { spanish: "Me llamo...", english: "My name is...", context: "introduction", audio: true },
      { spanish: "¿De dónde eres?", english: "Where are you from?", context: "introduction", audio: true },
      { spanish: "Soy de...", english: "I'm from...", context: "introduction", audio: true },
      { spanish: "¿A qué te dedicas?", english: "What do you do?", context: "work", audio: true },
      { spanish: "¿Cuánto tiempo llevas aquí?", english: "How long have you been here?", context: "visit", audio: true },
      { spanish: "¿Te gustaría...?", english: "Would you like to...?", context: "invitation", audio: true },
      { spanish: "¡Salud!", english: "Cheers!", context: "toasting", audio: true },
      { spanish: "¡Feliz cumpleaños!", english: "Happy birthday!", context: "celebration", audio: true },
      { spanish: "¡Felicidades!", english: "Congratulations!", context: "celebration", audio: true },
      { spanish: "Ha sido un placer", english: "It's been a pleasure", context: "farewell", audio: true },
      { spanish: "Espero verte pronto", english: "I hope to see you soon", context: "farewell", audio: true },
      { spanish: "¿Tienes Instagram?", english: "Do you have Instagram?", context: "social media", audio: true },
      { spanish: "Dame tu número", english: "Give me your number", context: "contact", audio: true },
      { spanish: "¡Que te vaya bien!", english: "Take care!/Good luck!", context: "farewell", audio: true },
    ]
  },

  // ============ POLITE EXPRESSIONS (10 phrases) ============
  polite: {
    name: "Polite Expressions",
    emoji: "🙏",
    priority: 9,
    phrases: [
      { spanish: "Con su permiso", english: "With your permission", context: "polite", audio: true },
      { spanish: "Disculpe la molestia", english: "Sorry for the trouble", context: "polite", audio: true },
      { spanish: "¿Le importaría...?", english: "Would you mind...?", context: "polite request", audio: true },
      { spanish: "¿Sería tan amable de...?", english: "Would you be so kind as to...?", context: "polite request", audio: true },
      { spanish: "Se lo agradezco mucho", english: "I really appreciate it", context: "thanks", audio: true },
      { spanish: "Es muy amable", english: "You're very kind", context: "thanks", audio: true },
      { spanish: "No hay de qué", english: "Don't mention it", context: "response", audio: true },
      { spanish: "No se preocupe", english: "Don't worry", context: "reassurance", audio: true },
      { spanish: "¡Que tenga un buen día!", english: "Have a good day!", context: "farewell", audio: true },
      { spanish: "¡Que disfrute!", english: "Enjoy!", context: "well-wishes", audio: true },
    ]
  },

  // ============ TIME & APPOINTMENTS (10 phrases) ============
  appointments: {
    name: "Time & Appointments",
    emoji: "📅",
    priority: 10,
    phrases: [
      { spanish: "¿Qué hora es?", english: "What time is it?", context: "time", audio: true },
      { spanish: "¿A qué hora?", english: "At what time?", context: "schedule", audio: true },
      { spanish: "Tengo una cita a las...", english: "I have an appointment at...", context: "appointment", audio: true },
      { spanish: "¿Puedo hacer una reservación?", english: "Can I make a reservation?", context: "booking", audio: true },
      { spanish: "¿Está abierto?", english: "Is it open?", context: "hours", audio: true },
      { spanish: "¿A qué hora abre/cierra?", english: "What time do you open/close?", context: "hours", audio: true },
      { spanish: "Voy a llegar tarde", english: "I'm going to be late", context: "delay", audio: true },
      { spanish: "¿Cuánto tiempo tengo que esperar?", english: "How long do I have to wait?", context: "waiting", audio: true },
      { spanish: "¿Hay que esperar mucho?", english: "Is there a long wait?", context: "waiting", audio: true },
      { spanish: "¿Para cuándo tiene disponibilidad?", english: "When do you have availability?", context: "booking", audio: true },
    ]
  },
};

// Helper functions
export function getAllPhrases() {
  let allPhrases = [];
  Object.values(SURVIVAL_PHRASES).forEach(category => {
    allPhrases = allPhrases.concat(category.phrases.map(p => ({
      ...p,
      category: category.name
    })));
  });
  return allPhrases;
}

export function getPhrasesByCategory(categoryKey) {
  return SURVIVAL_PHRASES[categoryKey]?.phrases || [];
}

export function getCategories() {
  return Object.entries(SURVIVAL_PHRASES)
    .map(([key, value]) => ({
      key,
      name: value.name,
      emoji: value.emoji,
      priority: value.priority,
      count: value.phrases.length
    }))
    .sort((a, b) => a.priority - b.priority);
}

export function getTotalPhraseCount() {
  return getAllPhrases().length;
}

export function searchPhrases(query) {
  const lowerQuery = query.toLowerCase();
  return getAllPhrases().filter(phrase =>
    phrase.spanish.toLowerCase().includes(lowerQuery) ||
    phrase.english.toLowerCase().includes(lowerQuery)
  );
}

export function getPhrasesByContext(context) {
  return getAllPhrases().filter(phrase =>
    phrase.context?.toLowerCase() === context.toLowerCase()
  );
}

// Quick reference for most critical phrases
export const CRITICAL_PHRASES = [
  "¡Ayuda!",
  "Necesito un médico",
  "No entiendo",
  "¿Habla inglés?",
  "¿Dónde está...?",
  "¿Cuánto cuesta?",
  "La cuenta, por favor",
  "No hablo español muy bien",
  "¿Puede repetir, por favor?",
  "Gracias",
  "Por favor",
  "Lo siento",
];

export default SURVIVAL_PHRASES;
