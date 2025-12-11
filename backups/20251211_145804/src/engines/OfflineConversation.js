// ============================================================================
// OFFLINE CONVERSATION ENGINE - Works without AI API
// ============================================================================

// Pre-scripted María responses by topic and keyword
const CONVERSATION_TREES = {
  food: {
    opener: "¿Qué te gusta comer? What's your favorite food? I love tacos! 🌮",
    responses: [
      { keywords: ['taco', 'tacos'], response: "¡Me encantan los tacos también! 🌮 What's your favorite filling? ¿Carne, pollo, o vegetales?" },
      { keywords: ['pizza'], response: "¡Pizza! Muy rico. Do you like pizza con piña? Some people love it, some hate it! 🍕" },
      { keywords: ['pollo', 'chicken'], response: "¡Pollo es delicioso! I love pollo asado. ¿Cómo lo preparas? How do you make it?" },
      { keywords: ['carne', 'meat', 'beef'], response: "¡Qué rico! La carne es muy popular en México. Do you like it with salsa? 🥩" },
      { keywords: ['pasta', 'spaghetti'], response: "¡Pasta! Very Italian but we love it too. ¿Con qué salsa? Tomato or cream?" },
      { keywords: ['fish', 'pescado'], response: "¡Pescado! Very healthy. In Mexico we make amazing fish tacos. Have you tried them? 🐟" },
      { keywords: ['vegetarian', 'vegetales', 'verduras'], response: "¡Qué bueno! Vegetables are important. I love ensaladas con aguacate. 🥗" },
      { keywords: ['fruta', 'fruit'], response: "¡Las frutas mexicanas son increíbles! Mangos, papayas, piñas... What's your favorite? 🍎" },
      { keywords: ['cafe', 'coffee'], response: "¡El café! I can't live without my morning coffee. ¿Con leche o negro? ☕" },
      { keywords: ['desayuno', 'breakfast'], response: "¡El desayuno es importante! In Mexico we eat huevos con frijoles. What do you eat? 🍳" },
      { keywords: ['almuerzo', 'lunch'], response: "For almuerzo, I usually have something light. ¿Y tú? What's your typical lunch?" },
      { keywords: ['cena', 'dinner'], response: "La cena should be light, they say. But I love a good meal! ¿Qué cenas normalmente?" },
      { keywords: ['hambre', 'hungry'], response: "¡Yo también tengo hambre! Talking about food makes me hungry. 😋" },
      { keywords: ['cocinar', 'cook'], response: "¿Te gusta cocinar? I love cooking! It's very relaxing. What do you like to make?" },
      { keywords: ['restaurante', 'restaurant'], response: "¿Cuál es tu restaurante favorito? I love trying new places! 🍽️" },
      { keywords: ['delicioso', 'rico', 'good', 'delicious'], response: "¡Sí, muy rico! Food is one of life's greatest pleasures, ¿no crees?" }
    ],
    fallback: "¡Qué interesante! Tell me more about that. ¿Te gusta cocinar en casa o comer afuera?",
    corrections: [
      { wrong: 'me gusta comer', right: '¡Perfecto! "Me gusta comer" is exactly right! 👏' },
      { wrong: 'yo gusto', right: 'Small tip: we say "me gusta" not "yo gusto". But I understood you! 💚' }
    ],
    phrases: [
      "Try saying: 'Me gusta mucho...' (I really like...)",
      "Try: '¿Qué recomiendas?' (What do you recommend?)",
      "Try: 'Tengo hambre' (I'm hungry)",
      "Try: 'Quiero probar...' (I want to try...)"
    ]
  },
  
  travel: {
    opener: "¿Te gusta viajar? Tell me about a place you want to visit!",
    responses: [
      { keywords: ['mexico', 'méxico'], response: "¡México es hermoso! I'm from Mexico City. Have you visited? There's so much to see! 🇲🇽" },
      { keywords: ['spain', 'españa'], response: "¡España! Beautiful country. The Spanish there sounds a bit different from Mexican Spanish. 🇪🇸" },
      { keywords: ['beach', 'playa'], response: "¡La playa! I love Cancún and Puerto Vallarta. ¿Prefieres playa o montaña? 🏖️" },
      { keywords: ['mountain', 'montaña'], response: "¡Las montañas! Very peaceful. Mexico has amazing mountains too. Have you been hiking?" },
      { keywords: ['city', 'ciudad'], response: "I love cities! So much energy. ¿Qué ciudad quieres visitar?" },
      { keywords: ['hotel'], response: "Finding a good hotel is important! Do you prefer luxury or budget? 🏨" },
      { keywords: ['flight', 'vuelo', 'avion', 'avión'], response: "Flying can be tiring but exciting! ¿A dónde vas a volar? ✈️" },
      { keywords: ['passport', 'pasaporte'], response: "¡El pasaporte es esencial! Always keep it safe when traveling. 🛂" },
      { keywords: ['europe', 'europa'], response: "¡Europa! So much history. Which countries interest you most?" },
      { keywords: ['usa', 'estados unidos', 'america'], response: "The US is so big! Each state is like a different country. Where would you go?" }
    ],
    fallback: "¡Qué emocionante! Traveling opens your mind. ¿Has viajado mucho? Have you traveled much?",
    phrases: [
      "Try: 'Quiero viajar a...' (I want to travel to...)",
      "Try: '¿Dónde está...?' (Where is...?)",
      "Try: 'Necesito un hotel' (I need a hotel)"
    ]
  },
  
  family: {
    opener: "Cuéntame de tu familia. Who's important in your life?",
    responses: [
      { keywords: ['madre', 'mom', 'mother', 'mamá'], response: "¡Las madres son especiales! Tell me about her. ¿Cómo es tu mamá?" },
      { keywords: ['padre', 'dad', 'father', 'papá'], response: "¡Los padres! Family is so important in Latino culture. ¿Son ustedes cercanos?" },
      { keywords: ['hermano', 'brother'], response: "¡Hermanos! I have two brothers. Are you close with your brother? ¿Son amigos?" },
      { keywords: ['hermana', 'sister'], response: "¡Hermanas! Sisters are special. ¿Es mayor o menor que tú? Older or younger?" },
      { keywords: ['hijo', 'son', 'hija', 'daughter'], response: "¡Qué lindo! Children are a blessing. ¿Cuántos años tiene? How old?" },
      { keywords: ['esposo', 'husband', 'esposa', 'wife'], response: "¡Qué bonito! Having a partner is wonderful. ¿Cuánto tiempo juntos?" },
      { keywords: ['abuelo', 'grandpa', 'abuela', 'grandma'], response: "¡Los abuelos! They have the best stories and the best food! 👴👵" },
      { keywords: ['perro', 'dog', 'gato', 'cat', 'mascota', 'pet'], response: "¡Las mascotas son familia también! What's their name? 🐕" }
    ],
    fallback: "Family is everything in Latino culture. Cuéntame más - tell me more!",
    phrases: [
      "Try: 'Tengo dos hermanos' (I have two siblings)",
      "Try: 'Mi familia es pequeña/grande' (My family is small/big)",
      "Try: 'Vivo con...' (I live with...)"
    ]
  },
  
  daily: {
    opener: "¡Hola! ¿Cómo estás hoy? Tell me something about your day!",
    responses: [
      { keywords: ['bien', 'good', 'fine', 'great'], response: "¡Qué bueno! I'm happy to hear that. ¿Qué hiciste hoy? What did you do?" },
      { keywords: ['mal', 'bad', 'tired', 'cansado'], response: "Lo siento... I hope it gets better. ¿Qué pasó? What happened?" },
      { keywords: ['trabajo', 'work', 'working'], response: "¡El trabajo! It keeps us busy. ¿Te gusta tu trabajo? Do you like it?" },
      { keywords: ['estudio', 'study', 'studying', 'school'], response: "¡Estudiar es importante! What are you studying? 📚" },
      { keywords: ['mañana', 'morning'], response: "¿Cómo fue tu mañana? I love mornings with coffee! ☀️" },
      { keywords: ['noche', 'night', 'evening'], response: "Evenings are for relaxing! ¿Qué te gusta hacer en las noches?" },
      { keywords: ['weekend', 'fin de semana'], response: "¡El fin de semana! The best time. ¿Tienes planes? Any plans?" },
      { keywords: ['hoy', 'today'], response: "¿Qué más vas a hacer hoy? What else will you do today?" }
    ],
    fallback: "¡Qué interesante! Tell me more. I love hearing about your life!",
    phrases: [
      "Try: 'Hoy voy a...' (Today I'm going to...)",
      "Try: 'Me siento...' (I feel...)",
      "Try: 'Estoy muy ocupado/a' (I'm very busy)"
    ]
  },
  
  weekend: {
    opener: "¿Qué vas a hacer este fin de semana? Any fun plans?",
    responses: [
      { keywords: ['movie', 'película', 'cine'], response: "¡Me encanta el cine! What kind of movies do you like? 🎬" },
      { keywords: ['friend', 'amigo', 'amigos'], response: "¡Amigos! That's the best. ¿Qué van a hacer juntos?" },
      { keywords: ['relax', 'descansar', 'rest'], response: "Sometimes rest is the best plan! ¿Qué haces para relajarte?" },
      { keywords: ['party', 'fiesta'], response: "¡Fiesta! How fun! What's the occasion? 🎉" },
      { keywords: ['sport', 'deporte', 'exercise', 'gym'], response: "¡Muy saludable! I should exercise more. What sport? 🏃" },
      { keywords: ['read', 'leer', 'book', 'libro'], response: "¡Leer es maravilloso! What are you reading? 📖" },
      { keywords: ['cook', 'cocinar'], response: "Cooking on weekends is relaxing! ¿Qué vas a preparar?" },
      { keywords: ['nothing', 'nada'], response: "Sometimes doing nada is perfect! Self-care is important. 😌" }
    ],
    fallback: "Sounds fun! Weekends are for enjoying life. ¿Y qué más?",
    phrases: [
      "Try: 'Voy a salir con amigos' (I'm going out with friends)",
      "Try: 'Quiero descansar' (I want to rest)",
      "Try: 'No tengo planes' (I don't have plans)"
    ]
  },
  
  work: {
    opener: "¿Qué haces? Tell me about your work or what you study!",
    responses: [
      { keywords: ['office', 'oficina'], response: "¡La vida de oficina! ¿Te gusta o prefieres trabajar desde casa?" },
      { keywords: ['remote', 'casa', 'home'], response: "Working from home has pros and cons! ¿Qué prefieres tú?" },
      { keywords: ['teacher', 'maestro', 'profesor'], response: "¡Qué noble profesión! Teaching is so important. What do you teach?" },
      { keywords: ['doctor', 'médico', 'nurse', 'enfermera'], response: "¡Héroes de la salud! That's hard but rewarding work. 👨‍⚕️" },
      { keywords: ['engineer', 'ingeniero'], response: "¡Ingeniero! Very impressive. What kind of engineering?" },
      { keywords: ['student', 'estudiante'], response: "¡Estudiante! What are you studying? ¿Es difícil?" },
      { keywords: ['busy', 'ocupado'], response: "Being busy is good... but rest is important too! Balance! ⚖️" },
      { keywords: ['boss', 'jefe'], response: "Ah, the boss! ¿Es bueno o difícil tu jefe? 😅" }
    ],
    fallback: "Work is a big part of life! Cuéntame más about what you do.",
    phrases: [
      "Try: 'Trabajo como...' (I work as a...)",
      "Try: 'Mi trabajo es interesante' (My job is interesting)",
      "Try: 'Estoy buscando trabajo' (I'm looking for work)"
    ]
  },
  
  opinion: {
    opener: "¿Qué piensas de...? Let's discuss something interesting!",
    responses: [
      { keywords: ['agree', 'de acuerdo', 'sí'], response: "¡Estoy de acuerdo! Great minds think alike. ¿Por qué piensas eso?" },
      { keywords: ['disagree', 'no'], response: "Interesting! It's okay to disagree. Tell me your perspective." },
      { keywords: ['think', 'creo', 'pienso'], response: "¡Me gusta cómo piensas! Tell me more about your opinion." },
      { keywords: ['maybe', 'quizás', 'tal vez'], response: "Hmm, you're being diplomatic! ¿Pero qué prefieres tú realmente?" },
      { keywords: ['love', 'encanta', 'like', 'gusta'], response: "¡Qué bueno que te gusta! Passion is important. ¿Por qué te gusta tanto?" },
      { keywords: ['hate', 'odio', 'don\'t like'], response: "Strong feelings! That's okay. ¿Qué no te gusta específicamente?" }
    ],
    fallback: "Interesting perspective! I love hearing different opinions. ¿Y qué más piensas?",
    phrases: [
      "Try: 'Creo que...' (I think that...)",
      "Try: 'En mi opinión...' (In my opinion...)",
      "Try: 'No estoy seguro/a' (I'm not sure)"
    ]
  }
};

// Generic responses for any topic
const GENERIC_RESPONSES = [
  "¡Muy bien! You're doing great. Tell me more!",
  "¡Interesante! I want to hear more about that.",
  "¡Sí! Keep practicing. ¿Y qué más?",
  "¡Perfecto! Your Spanish is improving. Continue!",
  "Hmm, ¡qué interesante! What else can you tell me?",
  "¡Me gusta! You're making good progress. ¿Algo más?"
];

// Encouraging responses when user struggles
const ENCOURAGEMENT = [
  "¡No te preocupes! Mistakes help you learn. Try again!",
  "¡Muy bien por intentar! Trying is the hardest part.",
  "You're braver than you think! Keep going. 💪",
  "¡Excelente esfuerzo! Every word counts.",
  "Don't worry about perfect - communication is the goal!"
];

// Find best response based on user input
export const getOfflineResponse = (userText, topic = 'daily') => {
  const lowerText = userText.toLowerCase();
  const tree = CONVERSATION_TREES[topic] || CONVERSATION_TREES.daily;
  
  // Check for keyword matches
  for (const item of tree.responses) {
    for (const keyword of item.keywords) {
      if (lowerText.includes(keyword)) {
        return {
          text: item.response,
          emotion: 'happy',
          type: 'matched'
        };
      }
    }
  }
  
  // Check if very short response (might be struggling)
  if (userText.trim().split(' ').length <= 2) {
    const encourageIdx = Math.floor(Math.random() * ENCOURAGEMENT.length);
    const phraseIdx = Math.floor(Math.random() * tree.phrases.length);
    return {
      text: ENCOURAGEMENT[encourageIdx] + " " + tree.phrases[phraseIdx],
      emotion: 'supportive',
      type: 'encouragement'
    };
  }
  
  // Use topic fallback or generic
  if (Math.random() > 0.5 && tree.fallback) {
    return {
      text: tree.fallback,
      emotion: 'curious',
      type: 'fallback'
    };
  }
  
  const genericIdx = Math.floor(Math.random() * GENERIC_RESPONSES.length);
  return {
    text: GENERIC_RESPONSES[genericIdx],
    emotion: 'happy',
    type: 'generic'
  };
};

// Get topic opener
export const getTopicOpener = (topic) => {
  const tree = CONVERSATION_TREES[topic] || CONVERSATION_TREES.daily;
  return tree.opener;
};

// Get a practice phrase hint
export const getPracticeHint = (topic) => {
  const tree = CONVERSATION_TREES[topic] || CONVERSATION_TREES.daily;
  const idx = Math.floor(Math.random() * tree.phrases.length);
  return tree.phrases[idx];
};

// Check if AI is available
export const checkAIAvailable = () => {
  const apiKey = localStorage.getItem('gemini_api_key');
  return !!apiKey;
};

export default {
  getOfflineResponse,
  getTopicOpener,
  getPracticeHint,
  checkAIAvailable,
  CONVERSATION_TREES
};
