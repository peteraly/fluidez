/**
 * SpanishCurriculum30Day.js
 * 
 * Complete 30-day structured curriculum for A1→B1 Spanish fluency.
 * Each day includes: vocabulary, grammar focus, phrases, conversation topics, and practice exercises.
 * 
 * Design: Meaning-first approach - communication over perfection
 */

// Day structure template
const createDay = (day, title, focus, vocab, grammar, phrases, conversation, exercises, culturalNote) => ({
  day,
  title,
  focus,
  vocab,
  grammar,
  phrases,
  conversation,
  exercises,
  culturalNote,
  unlocked: day === 1, // Only day 1 unlocked by default
});

export const CURRICULUM = [
  // ============ WEEK 1: FOUNDATIONS ============
  createDay(1, "¡Hola! Greetings & Introductions", "survival", 
    [
      { spanish: "hola", english: "hello", audio: true },
      { spanish: "buenos días", english: "good morning", audio: true },
      { spanish: "buenas tardes", english: "good afternoon", audio: true },
      { spanish: "buenas noches", english: "good evening/night", audio: true },
      { spanish: "adiós", english: "goodbye", audio: true },
      { spanish: "hasta luego", english: "see you later", audio: true },
      { spanish: "hasta mañana", english: "see you tomorrow", audio: true },
      { spanish: "por favor", english: "please", audio: true },
      { spanish: "gracias", english: "thank you", audio: true },
      { spanish: "de nada", english: "you're welcome", audio: true },
      { spanish: "sí", english: "yes", audio: true },
      { spanish: "no", english: "no", audio: true },
      { spanish: "perdón", english: "excuse me/sorry", audio: true },
      { spanish: "lo siento", english: "I'm sorry", audio: true },
      { spanish: "con permiso", english: "excuse me (passing)", audio: true },
    ],
    {
      title: "Subject Pronouns",
      explanation: "Who is doing the action",
      content: [
        { spanish: "yo", english: "I" },
        { spanish: "tú", english: "you (informal)" },
        { spanish: "usted", english: "you (formal)" },
        { spanish: "él/ella", english: "he/she" },
        { spanish: "nosotros", english: "we" },
        { spanish: "ellos/ellas", english: "they" },
      ],
      tip: "Use 'tú' with friends, 'usted' with strangers and elders"
    },
    [
      { spanish: "¿Cómo te llamas?", english: "What's your name? (informal)", context: "meeting peers" },
      { spanish: "Me llamo...", english: "My name is...", context: "introducing yourself" },
      { spanish: "Mucho gusto", english: "Nice to meet you", context: "after introductions" },
      { spanish: "¿Cómo está usted?", english: "How are you? (formal)", context: "formal situations" },
      { spanish: "¿Cómo estás?", english: "How are you? (informal)", context: "with friends" },
      { spanish: "Muy bien, gracias", english: "Very well, thank you", context: "responding" },
      { spanish: "¿Y tú?", english: "And you?", context: "continuing conversation" },
    ],
    {
      topic: "Meeting María at a café",
      opener: "¡Hola! Soy María. ¿Cómo te llamas?",
      goals: ["Introduce yourself", "Ask how someone is doing", "Say goodbye politely"],
      hints: ["Start with 'Me llamo...'", "Ask '¿Y tú?' to continue the conversation"]
    },
    [
      { type: "matching", pairs: [["Hola", "Hello"], ["Gracias", "Thank you"], ["Adiós", "Goodbye"]] },
      { type: "fill-blank", sentence: "_____ días, ¿cómo está?", answer: "Buenos" },
      { type: "respond", prompt: "¿Cómo te llamas?", hint: "Me llamo..." },
    ],
    "In Spanish-speaking countries, it's common to greet everyone when entering a room or store, even strangers!"
  ),

  createDay(2, "Numbers 1-20 & Age", "numbers",
    [
      { spanish: "cero", english: "0", audio: true },
      { spanish: "uno", english: "1", audio: true },
      { spanish: "dos", english: "2", audio: true },
      { spanish: "tres", english: "3", audio: true },
      { spanish: "cuatro", english: "4", audio: true },
      { spanish: "cinco", english: "5", audio: true },
      { spanish: "seis", english: "6", audio: true },
      { spanish: "siete", english: "7", audio: true },
      { spanish: "ocho", english: "8", audio: true },
      { spanish: "nueve", english: "9", audio: true },
      { spanish: "diez", english: "10", audio: true },
      { spanish: "once", english: "11", audio: true },
      { spanish: "doce", english: "12", audio: true },
      { spanish: "trece", english: "13", audio: true },
      { spanish: "catorce", english: "14", audio: true },
      { spanish: "quince", english: "15", audio: true },
      { spanish: "dieciséis", english: "16", audio: true },
      { spanish: "diecisiete", english: "17", audio: true },
      { spanish: "dieciocho", english: "18", audio: true },
      { spanish: "diecinueve", english: "19", audio: true },
      { spanish: "veinte", english: "20", audio: true },
    ],
    {
      title: "TENER (to have) - Present",
      explanation: "Used for age, possession, and expressions",
      content: [
        { spanish: "yo tengo", english: "I have" },
        { spanish: "tú tienes", english: "you have" },
        { spanish: "él/ella tiene", english: "he/she has" },
        { spanish: "nosotros tenemos", english: "we have" },
        { spanish: "ellos tienen", english: "they have" },
      ],
      tip: "In Spanish, you 'have' years, not 'are' years old!"
    },
    [
      { spanish: "¿Cuántos años tienes?", english: "How old are you?", context: "asking age" },
      { spanish: "Tengo ___ años", english: "I am ___ years old", context: "stating age" },
      { spanish: "¿Cuál es tu número?", english: "What's your number?", context: "phone number" },
      { spanish: "Mi número es...", english: "My number is...", context: "giving phone number" },
    ],
    {
      topic: "Exchanging contact info",
      opener: "¡Hola! ¿Cuántos años tienes?",
      goals: ["Tell your age", "Count to 20", "Exchange phone numbers"],
      hints: ["Use 'Tengo...' for age", "Numbers stay the same for phone"]
    },
    [
      { type: "number-listen", numbers: [5, 12, 18, 7, 15] },
      { type: "fill-blank", sentence: "Tengo veinte _____", answer: "años" },
      { type: "speak", prompt: "Say your age in Spanish" },
    ],
    "In many Latin American countries, quinceañera celebrates a girl's 15th birthday as her transition to womanhood."
  ),

  createDay(3, "Numbers 21-100 & Prices", "numbers",
    [
      { spanish: "veintiuno", english: "21", audio: true },
      { spanish: "veintidós", english: "22", audio: true },
      { spanish: "veintitrés", english: "23", audio: true },
      { spanish: "treinta", english: "30", audio: true },
      { spanish: "treinta y uno", english: "31", audio: true },
      { spanish: "cuarenta", english: "40", audio: true },
      { spanish: "cincuenta", english: "50", audio: true },
      { spanish: "sesenta", english: "60", audio: true },
      { spanish: "setenta", english: "70", audio: true },
      { spanish: "ochenta", english: "80", audio: true },
      { spanish: "noventa", english: "90", audio: true },
      { spanish: "cien", english: "100", audio: true },
      { spanish: "el peso", english: "peso (currency)", audio: true },
      { spanish: "el dólar", english: "dollar", audio: true },
      { spanish: "el euro", english: "euro", audio: true },
    ],
    {
      title: "Number patterns",
      explanation: "21-29 are one word, 31+ use 'y' (and)",
      content: [
        { spanish: "veinticinco", english: "25 (one word)" },
        { spanish: "treinta y cinco", english: "35 (with 'y')" },
        { spanish: "cuarenta y dos", english: "42" },
        { spanish: "noventa y nueve", english: "99" },
      ],
      tip: "Pattern: [tens] y [ones] for 31-99"
    },
    [
      { spanish: "¿Cuánto cuesta?", english: "How much does it cost?", context: "shopping" },
      { spanish: "Cuesta ___ pesos", english: "It costs ___ pesos", context: "prices" },
      { spanish: "¿Cuánto es?", english: "How much is it?", context: "total" },
      { spanish: "Son ___ pesos", english: "It's ___ pesos", context: "stating total" },
      { spanish: "Es muy caro", english: "It's very expensive", context: "bargaining" },
      { spanish: "¿Tiene algo más barato?", english: "Do you have something cheaper?", context: "bargaining" },
    ],
    {
      topic: "Shopping at a market",
      opener: "¡Bienvenido al mercado! ¿Qué necesita?",
      goals: ["Ask prices", "Understand numbers", "Make a purchase"],
      hints: ["Use '¿Cuánto cuesta?' for prices"]
    },
    [
      { type: "number-listen", numbers: [35, 72, 48, 99, 100] },
      { type: "calculate", problem: "Treinta + quince = ?", answer: "cuarenta y cinco" },
    ],
    "Bargaining is common and expected in traditional markets throughout Latin America!"
  ),

  createDay(4, "Essential Verbs: SER & ESTAR", "grammar",
    [
      { spanish: "ser", english: "to be (permanent)", audio: true },
      { spanish: "estar", english: "to be (temporary/location)", audio: true },
      { spanish: "alto/a", english: "tall", audio: true },
      { spanish: "bajo/a", english: "short", audio: true },
      { spanish: "grande", english: "big", audio: true },
      { spanish: "pequeño/a", english: "small", audio: true },
      { spanish: "bonito/a", english: "pretty", audio: true },
      { spanish: "feo/a", english: "ugly", audio: true },
      { spanish: "joven", english: "young", audio: true },
      { spanish: "viejo/a", english: "old", audio: true },
      { spanish: "feliz", english: "happy", audio: true },
      { spanish: "triste", english: "sad", audio: true },
      { spanish: "cansado/a", english: "tired", audio: true },
      { spanish: "enfermo/a", english: "sick", audio: true },
    ],
    {
      title: "SER vs ESTAR",
      explanation: "Both mean 'to be' but used differently",
      content: [
        { spanish: "SER: yo soy, tú eres, él es", english: "permanent traits, identity, origin" },
        { spanish: "ESTAR: yo estoy, tú estás, él está", english: "temporary states, location, feelings" },
        { spanish: "Soy alto", english: "I am tall (permanent trait)" },
        { spanish: "Estoy cansado", english: "I am tired (temporary state)" },
        { spanish: "Soy de México", english: "I am from Mexico (origin)" },
        { spanish: "Estoy en México", english: "I am in Mexico (location)" },
      ],
      tip: "SER = essence (who you ARE), ESTAR = state (how you're DOING)"
    },
    [
      { spanish: "¿De dónde eres?", english: "Where are you from?", context: "origin" },
      { spanish: "Soy de...", english: "I'm from...", context: "stating origin" },
      { spanish: "¿Dónde estás?", english: "Where are you?", context: "location" },
      { spanish: "Estoy en...", english: "I'm at/in...", context: "stating location" },
      { spanish: "¿Cómo eres?", english: "What are you like?", context: "personality" },
      { spanish: "¿Cómo estás?", english: "How are you?", context: "current state" },
    ],
    {
      topic: "Describing yourself and asking about others",
      opener: "¡Hola! ¿De dónde eres?",
      goals: ["Tell where you're from", "Describe yourself", "Ask about someone's day"],
      hints: ["Use SER for origin", "Use ESTAR for feelings"]
    },
    [
      { type: "choose", sentence: "Ella ___ de España", options: ["es", "está"], answer: "es" },
      { type: "choose", sentence: "Yo ___ muy feliz hoy", options: ["soy", "estoy"], answer: "estoy" },
    ],
    "Spanish speakers might ask '¿Cómo estás?' multiple times a day - it's a genuine check-in, not just small talk!"
  ),

  createDay(5, "Common Verbs: HABLAR, COMER, VIVIR", "grammar",
    [
      { spanish: "hablar", english: "to speak", audio: true },
      { spanish: "comer", english: "to eat", audio: true },
      { spanish: "vivir", english: "to live", audio: true },
      { spanish: "trabajar", english: "to work", audio: true },
      { spanish: "estudiar", english: "to study", audio: true },
      { spanish: "necesitar", english: "to need", audio: true },
      { spanish: "beber", english: "to drink", audio: true },
      { spanish: "leer", english: "to read", audio: true },
      { spanish: "escribir", english: "to write", audio: true },
      { spanish: "abrir", english: "to open", audio: true },
    ],
    {
      title: "Regular Verb Conjugation - Present",
      explanation: "Three verb types: -AR, -ER, -IR",
      content: [
        { spanish: "-AR: hablo, hablas, habla, hablamos, hablan", english: "I speak, you speak, etc." },
        { spanish: "-ER: como, comes, come, comemos, comen", english: "I eat, you eat, etc." },
        { spanish: "-IR: vivo, vives, vive, vivimos, viven", english: "I live, you live, etc." },
      ],
      tip: "Remove the ending (-ar/-er/-ir), add the correct ending for each person"
    },
    [
      { spanish: "¿Hablas español?", english: "Do you speak Spanish?", context: "asking ability" },
      { spanish: "Hablo un poco", english: "I speak a little", context: "modest response" },
      { spanish: "¿Dónde vives?", english: "Where do you live?", context: "asking location" },
      { spanish: "Vivo en...", english: "I live in...", context: "stating location" },
      { spanish: "¿Dónde trabajas?", english: "Where do you work?", context: "occupation" },
      { spanish: "Trabajo en...", english: "I work at/in...", context: "stating workplace" },
    ],
    {
      topic: "Talking about daily life",
      opener: "¿Hablas español? ¿Dónde vives?",
      goals: ["Talk about where you live and work", "Discuss languages you speak"],
      hints: ["Remove -ar/-er/-ir, add -o for 'I'"]
    },
    [
      { type: "conjugate", verb: "hablar", pronoun: "yo", answer: "hablo" },
      { type: "conjugate", verb: "comer", pronoun: "ella", answer: "come" },
      { type: "conjugate", verb: "vivir", pronoun: "nosotros", answer: "vivimos" },
    ],
    "In Spanish-speaking cultures, asking about someone's work is considered friendly interest, not intrusive!"
  ),

  createDay(6, "Irregular Verbs: IR, QUERER, PODER", "grammar",
    [
      { spanish: "ir", english: "to go", audio: true },
      { spanish: "querer", english: "to want", audio: true },
      { spanish: "poder", english: "to be able to/can", audio: true },
      { spanish: "hacer", english: "to do/make", audio: true },
      { spanish: "al", english: "to the (a + el)", audio: true },
      { spanish: "a la", english: "to the (feminine)", audio: true },
      { spanish: "el restaurante", english: "restaurant", audio: true },
      { spanish: "el cine", english: "movie theater", audio: true },
      { spanish: "la playa", english: "beach", audio: true },
      { spanish: "el parque", english: "park", audio: true },
      { spanish: "la tienda", english: "store", audio: true },
      { spanish: "el supermercado", english: "supermarket", audio: true },
    ],
    {
      title: "Irregular Verbs - Present",
      explanation: "These common verbs don't follow regular patterns",
      content: [
        { spanish: "IR: voy, vas, va, vamos, van", english: "to go" },
        { spanish: "QUERER: quiero, quieres, quiere, queremos, quieren", english: "to want" },
        { spanish: "PODER: puedo, puedes, puede, podemos, pueden", english: "can/to be able" },
        { spanish: "HACER: hago, haces, hace, hacemos, hacen", english: "to do/make" },
      ],
      tip: "IR + a + place = going somewhere. IR + a + infinitive = going to do something"
    },
    [
      { spanish: "¿Adónde vas?", english: "Where are you going?", context: "asking destination" },
      { spanish: "Voy al restaurante", english: "I'm going to the restaurant", context: "stating destination" },
      { spanish: "¿Quieres ir?", english: "Do you want to go?", context: "invitation" },
      { spanish: "Sí, quiero ir", english: "Yes, I want to go", context: "accepting" },
      { spanish: "No puedo", english: "I can't", context: "declining" },
      { spanish: "¿Qué vas a hacer?", english: "What are you going to do?", context: "plans" },
    ],
    {
      topic: "Making plans",
      opener: "¡Hola! ¿Qué vas a hacer hoy?",
      goals: ["Discuss plans", "Invite someone", "Accept or decline invitations"],
      hints: ["voy a = I'm going to", "quiero = I want"]
    },
    [
      { type: "translate", spanish: "Voy a comer", answer: "I'm going to eat" },
      { type: "fill-blank", sentence: "¿_____ ir al cine?", answer: "Quieres" },
    ],
    "In Spanish culture, 'vamos' (let's go) is often used casually even without firm plans!"
  ),

  createDay(7, "Week 1 Review: Conversation Practice", "review",
    [
      // Review vocab from days 1-6
      { spanish: "¡Repasemos!", english: "Let's review!", audio: true },
    ],
    {
      title: "Week 1 Grammar Summary",
      explanation: "Everything you've learned",
      content: [
        { spanish: "Subject pronouns", english: "yo, tú, él/ella, nosotros, ellos" },
        { spanish: "SER vs ESTAR", english: "permanent vs temporary 'to be'" },
        { spanish: "TENER", english: "to have (age, possession)" },
        { spanish: "-AR, -ER, -IR verbs", english: "regular conjugation patterns" },
        { spanish: "IR, QUERER, PODER", english: "important irregular verbs" },
      ],
      tip: "Focus on communication, not perfection!"
    },
    [
      { spanish: "¿Cómo te llamas y de dónde eres?", english: "What's your name and where are you from?", context: "introduction" },
      { spanish: "¿Cuántos años tienes?", english: "How old are you?", context: "getting to know" },
      { spanish: "¿Dónde vives y trabajas?", english: "Where do you live and work?", context: "daily life" },
      { spanish: "¿Qué vas a hacer hoy?", english: "What are you going to do today?", context: "plans" },
    ],
    {
      topic: "Complete conversation with María",
      opener: "¡Hola! Vamos a practicar todo lo que aprendiste esta semana.",
      goals: ["Introduce yourself fully", "Share personal info", "Discuss plans"],
      hints: ["Use everything you've learned!", "Don't worry about mistakes"]
    },
    [
      { type: "conversation", scenario: "meet-and-greet" },
    ],
    "¡Felicidades! You've completed Week 1. You can now have basic conversations in Spanish!"
  ),

  // ============ WEEK 2: DAILY LIFE ============
  createDay(8, "Family & Relationships", "vocabulary",
    [
      { spanish: "la familia", english: "family", audio: true },
      { spanish: "la madre / la mamá", english: "mother / mom", audio: true },
      { spanish: "el padre / el papá", english: "father / dad", audio: true },
      { spanish: "los padres", english: "parents", audio: true },
      { spanish: "el hermano", english: "brother", audio: true },
      { spanish: "la hermana", english: "sister", audio: true },
      { spanish: "el hijo", english: "son", audio: true },
      { spanish: "la hija", english: "daughter", audio: true },
      { spanish: "los hijos", english: "children", audio: true },
      { spanish: "el abuelo", english: "grandfather", audio: true },
      { spanish: "la abuela", english: "grandmother", audio: true },
      { spanish: "el tío", english: "uncle", audio: true },
      { spanish: "la tía", english: "aunt", audio: true },
      { spanish: "el primo", english: "cousin (male)", audio: true },
      { spanish: "la prima", english: "cousin (female)", audio: true },
      { spanish: "el esposo / el marido", english: "husband", audio: true },
      { spanish: "la esposa / la mujer", english: "wife", audio: true },
      { spanish: "el novio", english: "boyfriend", audio: true },
      { spanish: "la novia", english: "girlfriend", audio: true },
      { spanish: "el amigo", english: "friend (male)", audio: true },
      { spanish: "la amiga", english: "friend (female)", audio: true },
    ],
    {
      title: "Possessive Adjectives",
      explanation: "Showing who something belongs to",
      content: [
        { spanish: "mi/mis", english: "my" },
        { spanish: "tu/tus", english: "your (informal)" },
        { spanish: "su/sus", english: "his/her/your (formal)/their" },
        { spanish: "nuestro/a/os/as", english: "our" },
      ],
      tip: "Possessives agree with the noun, not the owner! 'Mi hermana' (my sister)"
    },
    [
      { spanish: "¿Tienes hermanos?", english: "Do you have siblings?", context: "asking about family" },
      { spanish: "Tengo dos hermanos", english: "I have two siblings", context: "describing family" },
      { spanish: "Mi madre se llama...", english: "My mother's name is...", context: "introducing family" },
      { spanish: "¿Cómo es tu familia?", english: "What's your family like?", context: "family description" },
      { spanish: "Somos muy unidos", english: "We're very close", context: "describing relationships" },
    ],
    {
      topic: "Describing your family",
      opener: "Cuéntame de tu familia. ¿Tienes hermanos?",
      goals: ["Describe family members", "Use possessive adjectives", "Talk about relationships"],
      hints: ["Use 'tengo' for 'I have'", "'mi' = my, 'mis' = my (plural)"]
    },
    [
      { type: "family-tree", task: "Label the family members" },
      { type: "fill-blank", sentence: "___ madre es muy simpática", answer: "Mi" },
    ],
    "Family is central to Spanish-speaking cultures. It's common to live with parents until marriage!"
  ),

  createDay(9, "Time & Daily Routine", "time",
    [
      { spanish: "¿Qué hora es?", english: "What time is it?", audio: true },
      { spanish: "Es la una", english: "It's one o'clock", audio: true },
      { spanish: "Son las dos", english: "It's two o'clock", audio: true },
      { spanish: "Son las tres y media", english: "It's 3:30", audio: true },
      { spanish: "Son las cuatro y cuarto", english: "It's 4:15", audio: true },
      { spanish: "Son las cinco menos cuarto", english: "It's 4:45", audio: true },
      { spanish: "la mañana", english: "morning", audio: true },
      { spanish: "la tarde", english: "afternoon", audio: true },
      { spanish: "la noche", english: "night", audio: true },
      { spanish: "el mediodía", english: "noon", audio: true },
      { spanish: "la medianoche", english: "midnight", audio: true },
      { spanish: "temprano", english: "early", audio: true },
      { spanish: "tarde", english: "late", audio: true },
      { spanish: "a tiempo", english: "on time", audio: true },
    ],
    {
      title: "Telling Time",
      explanation: "Es la... for 1:00, Son las... for 2:00-12:00",
      content: [
        { spanish: "Es la una y diez", english: "It's 1:10" },
        { spanish: "Son las ocho de la mañana", english: "It's 8 AM" },
        { spanish: "Son las diez de la noche", english: "It's 10 PM" },
      ],
      tip: "'Y' (and) for :01-:30, 'menos' (minus) for :31-:59"
    },
    [
      { spanish: "¿A qué hora?", english: "At what time?", context: "asking schedule" },
      { spanish: "A las ocho", english: "At eight o'clock", context: "stating time" },
      { spanish: "¿A qué hora te despiertas?", english: "What time do you wake up?", context: "routine" },
      { spanish: "Me despierto a las siete", english: "I wake up at seven", context: "routine" },
    ],
    {
      topic: "Daily schedule",
      opener: "¿A qué hora te despiertas normalmente?",
      goals: ["Tell time", "Discuss daily schedule", "Ask about routines"],
      hints: ["Es la una... Son las dos/tres/etc.", "A las + time"]
    },
    [
      { type: "clock-reading", times: ["2:00", "7:30", "10:15", "11:45"] },
      { type: "speak", prompt: "What time do you eat lunch?" },
    ],
    "In Spain, lunch is typically at 2-3 PM and dinner at 9-10 PM. Latin America follows more varied schedules."
  ),

  createDay(10, "Days, Months & Dates", "time",
    [
      { spanish: "lunes", english: "Monday", audio: true },
      { spanish: "martes", english: "Tuesday", audio: true },
      { spanish: "miércoles", english: "Wednesday", audio: true },
      { spanish: "jueves", english: "Thursday", audio: true },
      { spanish: "viernes", english: "Friday", audio: true },
      { spanish: "sábado", english: "Saturday", audio: true },
      { spanish: "domingo", english: "Sunday", audio: true },
      { spanish: "enero", english: "January", audio: true },
      { spanish: "febrero", english: "February", audio: true },
      { spanish: "marzo", english: "March", audio: true },
      { spanish: "abril", english: "April", audio: true },
      { spanish: "mayo", english: "May", audio: true },
      { spanish: "junio", english: "June", audio: true },
      { spanish: "julio", english: "July", audio: true },
      { spanish: "agosto", english: "August", audio: true },
      { spanish: "septiembre", english: "September", audio: true },
      { spanish: "octubre", english: "October", audio: true },
      { spanish: "noviembre", english: "November", audio: true },
      { spanish: "diciembre", english: "December", audio: true },
      { spanish: "hoy", english: "today", audio: true },
      { spanish: "mañana", english: "tomorrow", audio: true },
      { spanish: "ayer", english: "yesterday", audio: true },
    ],
    {
      title: "Dates in Spanish",
      explanation: "Day first, then month (opposite of US English)",
      content: [
        { spanish: "¿Cuál es la fecha?", english: "What's the date?" },
        { spanish: "Es el 15 de mayo", english: "It's May 15th" },
        { spanish: "Mi cumpleaños es el 3 de julio", english: "My birthday is July 3rd" },
      ],
      tip: "Days and months are NOT capitalized in Spanish!"
    },
    [
      { spanish: "¿Qué día es hoy?", english: "What day is today?", context: "asking day" },
      { spanish: "Hoy es lunes", english: "Today is Monday", context: "stating day" },
      { spanish: "¿Cuándo es tu cumpleaños?", english: "When is your birthday?", context: "asking date" },
      { spanish: "Es el primero de enero", english: "It's January 1st", context: "ordinal for 1st" },
    ],
    {
      topic: "Making appointments and plans",
      opener: "¿Qué día es hoy? ¿Tienes planes para esta semana?",
      goals: ["Say dates", "Discuss weekly schedule", "Make plans"],
      hints: ["el + number + de + month", "Days aren't capitalized"]
    },
    [
      { type: "calendar", task: "Schedule three activities this week" },
    ],
    "Many Spanish-speaking countries celebrate 'Día de los Muertos' on November 1-2, honoring deceased loved ones."
  ),

  createDay(11, "Weather & Seasons", "vocabulary",
    [
      { spanish: "¿Qué tiempo hace?", english: "What's the weather like?", audio: true },
      { spanish: "Hace sol", english: "It's sunny", audio: true },
      { spanish: "Hace calor", english: "It's hot", audio: true },
      { spanish: "Hace frío", english: "It's cold", audio: true },
      { spanish: "Hace viento", english: "It's windy", audio: true },
      { spanish: "Hace buen tiempo", english: "The weather is nice", audio: true },
      { spanish: "Hace mal tiempo", english: "The weather is bad", audio: true },
      { spanish: "Está lloviendo", english: "It's raining", audio: true },
      { spanish: "Está nevando", english: "It's snowing", audio: true },
      { spanish: "Está nublado", english: "It's cloudy", audio: true },
      { spanish: "la primavera", english: "spring", audio: true },
      { spanish: "el verano", english: "summer", audio: true },
      { spanish: "el otoño", english: "autumn/fall", audio: true },
      { spanish: "el invierno", english: "winter", audio: true },
    ],
    {
      title: "Weather expressions",
      explanation: "HACER for general weather, ESTAR for current conditions",
      content: [
        { spanish: "Hace + noun", english: "Hace calor, hace frío, hace sol" },
        { spanish: "Está + -ando/-iendo", english: "Está lloviendo, está nevando" },
        { spanish: "Hay + noun", english: "Hay niebla (there's fog)" },
      ],
      tip: "Use HACER for temperature/general, ESTAR for active weather"
    },
    [
      { spanish: "¿Qué tiempo hace hoy?", english: "What's the weather like today?", context: "asking" },
      { spanish: "Hace mucho calor", english: "It's very hot", context: "complaining" },
      { spanish: "Creo que va a llover", english: "I think it's going to rain", context: "predicting" },
    ],
    {
      topic: "Discussing weather and plans",
      opener: "¡Qué buen día! ¿Qué tiempo hace donde vives?",
      goals: ["Describe weather", "Discuss seasonal activities", "Make weather-based plans"],
      hints: ["Hace + weather word", "Está + -ando/-iendo"]
    },
    [
      { type: "weather-match", images: ["sun", "rain", "snow", "wind"] },
    ],
    "Remember: South American seasons are opposite! When it's winter in the US, it's summer in Argentina."
  ),

  createDay(12, "Food & Drinks Vocabulary", "vocabulary",
    [
      { spanish: "el desayuno", english: "breakfast", audio: true },
      { spanish: "el almuerzo", english: "lunch", audio: true },
      { spanish: "la cena", english: "dinner", audio: true },
      { spanish: "la comida", english: "food/meal", audio: true },
      { spanish: "el pan", english: "bread", audio: true },
      { spanish: "el arroz", english: "rice", audio: true },
      { spanish: "la carne", english: "meat", audio: true },
      { spanish: "el pollo", english: "chicken", audio: true },
      { spanish: "el pescado", english: "fish", audio: true },
      { spanish: "las verduras", english: "vegetables", audio: true },
      { spanish: "la fruta", english: "fruit", audio: true },
      { spanish: "el huevo", english: "egg", audio: true },
      { spanish: "el queso", english: "cheese", audio: true },
      { spanish: "el agua", english: "water", audio: true },
      { spanish: "el café", english: "coffee", audio: true },
      { spanish: "el té", english: "tea", audio: true },
      { spanish: "el jugo / el zumo", english: "juice", audio: true },
      { spanish: "la leche", english: "milk", audio: true },
      { spanish: "la cerveza", english: "beer", audio: true },
      { spanish: "el vino", english: "wine", audio: true },
    ],
    {
      title: "GUSTAR - To like",
      explanation: "Spanish says 'it pleases me' not 'I like it'",
      content: [
        { spanish: "Me gusta el café", english: "I like coffee (coffee pleases me)" },
        { spanish: "Me gustan las frutas", english: "I like fruits (plural)" },
        { spanish: "Te gusta", english: "You like" },
        { spanish: "Le gusta", english: "He/she/you(formal) likes" },
        { spanish: "Nos gusta", english: "We like" },
      ],
      tip: "GUSTA for singular things, GUSTAN for plural things"
    },
    [
      { spanish: "¿Qué te gusta comer?", english: "What do you like to eat?", context: "preferences" },
      { spanish: "Me gusta mucho el...", english: "I really like...", context: "expressing preference" },
      { spanish: "No me gusta el...", english: "I don't like...", context: "dislike" },
      { spanish: "¿Tienes hambre?", english: "Are you hungry?", context: "asking" },
      { spanish: "Tengo sed", english: "I'm thirsty", context: "stating need" },
    ],
    {
      topic: "Food preferences",
      opener: "¿Qué te gusta desayunar?",
      goals: ["Discuss food preferences", "Use GUSTAR correctly", "Talk about meals"],
      hints: ["Me gusta + singular", "Me gustan + plural"]
    },
    [
      { type: "preference-sort", items: ["pizza", "ensalada", "tacos", "sushi"] },
    ],
    "In Mexico, breakfast often includes eggs, beans, and tortillas. Coffee is typically served after the meal."
  ),

  createDay(13, "Ordering at a Restaurant", "survival",
    [
      { spanish: "el menú / la carta", english: "menu", audio: true },
      { spanish: "el mesero / el camarero", english: "waiter", audio: true },
      { spanish: "la cuenta", english: "the bill/check", audio: true },
      { spanish: "la propina", english: "tip", audio: true },
      { spanish: "el plato", english: "dish/plate", audio: true },
      { spanish: "el plato principal", english: "main course", audio: true },
      { spanish: "el postre", english: "dessert", audio: true },
      { spanish: "la bebida", english: "drink", audio: true },
      { spanish: "para llevar", english: "to go", audio: true },
      { spanish: "para comer aquí", english: "to eat here", audio: true },
    ],
    {
      title: "Restaurant phrases",
      explanation: "Essential ordering vocabulary",
      content: [
        { spanish: "Quisiera...", english: "I would like... (polite)" },
        { spanish: "Para mí...", english: "For me..." },
        { spanish: "¿Qué me recomienda?", english: "What do you recommend?" },
      ],
      tip: "Quisiera is more polite than Quiero in restaurants"
    },
    [
      { spanish: "Una mesa para dos, por favor", english: "A table for two, please", context: "arriving" },
      { spanish: "¿Qué me recomienda?", english: "What do you recommend?", context: "ordering" },
      { spanish: "Quisiera el pollo, por favor", english: "I'd like the chicken, please", context: "ordering" },
      { spanish: "¿Algo más?", english: "Anything else?", context: "waiter asking" },
      { spanish: "La cuenta, por favor", english: "The check, please", context: "finishing" },
      { spanish: "¿Está incluida la propina?", english: "Is the tip included?", context: "payment" },
    ],
    {
      topic: "Complete restaurant experience",
      opener: "¡Bienvenido! ¿Mesa para cuántas personas?",
      goals: ["Get a table", "Order food and drinks", "Pay the bill"],
      hints: ["Quisiera = I would like", "La cuenta = the bill"]
    },
    [
      { type: "roleplay", scenario: "restaurant-order" },
    ],
    "In Spain, you often have to ask for the bill - waiters won't bring it automatically. It's not rude to wait!"
  ),

  createDay(14, "Week 2 Review: Daily Life Conversations", "review",
    [],
    {
      title: "Week 2 Grammar Summary",
      explanation: "Review all week 2 concepts",
      content: [
        { spanish: "Possessive adjectives", english: "mi, tu, su, nuestro" },
        { spanish: "Telling time", english: "Es la una, Son las dos" },
        { spanish: "Days and months", english: "lunes, martes... enero, febrero..." },
        { spanish: "Weather", english: "Hace calor, Está lloviendo" },
        { spanish: "GUSTAR", english: "Me gusta, Te gusta, Le gusta" },
      ],
      tip: "You can now talk about daily life, family, time, and food!"
    },
    [
      { spanish: "Cuéntame de tu día típico", english: "Tell me about your typical day", context: "routine" },
      { spanish: "¿Qué tiempo hace donde vives?", english: "What's the weather like where you live?", context: "weather" },
      { spanish: "¿Qué te gusta hacer los fines de semana?", english: "What do you like to do on weekends?", context: "hobbies" },
    ],
    {
      topic: "Complete daily life conversation",
      opener: "¡Hola! Cuéntame de tu vida. ¿Cómo es un día normal para ti?",
      goals: ["Describe daily routine", "Talk about preferences", "Discuss family and weather"],
      hints: ["Use everything from Week 2!"]
    },
    [
      { type: "conversation", scenario: "daily-life" },
    ],
    "¡Increíble! You've completed Week 2. You can now discuss daily life, family, time, weather, and food!"
  ),

  // ============ WEEK 3: PRACTICAL SKILLS ============
  createDay(15, "Directions & Locations", "survival",
    [
      { spanish: "a la izquierda", english: "to the left", audio: true },
      { spanish: "a la derecha", english: "to the right", audio: true },
      { spanish: "todo recto / derecho", english: "straight ahead", audio: true },
      { spanish: "en la esquina", english: "on the corner", audio: true },
      { spanish: "al lado de", english: "next to", audio: true },
      { spanish: "enfrente de", english: "in front of", audio: true },
      { spanish: "detrás de", english: "behind", audio: true },
      { spanish: "entre", english: "between", audio: true },
      { spanish: "cerca de", english: "near", audio: true },
      { spanish: "lejos de", english: "far from", audio: true },
      { spanish: "la calle", english: "street", audio: true },
      { spanish: "la cuadra / la manzana", english: "block", audio: true },
      { spanish: "el semáforo", english: "traffic light", audio: true },
      { spanish: "cruzar", english: "to cross", audio: true },
      { spanish: "doblar / girar", english: "to turn", audio: true },
      { spanish: "seguir", english: "to continue/follow", audio: true },
    ],
    {
      title: "Commands (Imperative) - Usted form",
      explanation: "Giving directions uses formal commands",
      content: [
        { spanish: "Siga recto", english: "Continue straight" },
        { spanish: "Doble a la derecha", english: "Turn right" },
        { spanish: "Cruce la calle", english: "Cross the street" },
      ],
      tip: "For formal commands: -AR verbs → -e, -ER/-IR verbs → -a"
    },
    [
      { spanish: "¿Dónde está...?", english: "Where is...?", context: "asking location" },
      { spanish: "¿Cómo llego a...?", english: "How do I get to...?", context: "asking directions" },
      { spanish: "Está a dos cuadras", english: "It's two blocks away", context: "giving distance" },
      { spanish: "No sé, lo siento", english: "I don't know, sorry", context: "if you can't help" },
      { spanish: "¿Puede repetir?", english: "Can you repeat?", context: "asking for clarification" },
    ],
    {
      topic: "Getting directions",
      opener: "Disculpe, ¿cómo llego al centro?",
      goals: ["Ask for directions", "Understand directions", "Describe locations"],
      hints: ["¿Dónde está...? = Where is...?", "a la derecha = to the right"]
    },
    [
      { type: "map-navigation", task: "Follow directions to the destination" },
    ],
    "In many Spanish cities, addresses use landmarks more than numbers: 'next to the church' or 'in front of the park.'"
  ),

  createDay(16, "Transportation", "vocabulary",
    [
      { spanish: "el coche / el carro / el auto", english: "car", audio: true },
      { spanish: "el autobús / el camión", english: "bus", audio: true },
      { spanish: "el metro / el subte", english: "subway", audio: true },
      { spanish: "el taxi", english: "taxi", audio: true },
      { spanish: "el tren", english: "train", audio: true },
      { spanish: "el avión", english: "airplane", audio: true },
      { spanish: "el barco", english: "boat/ship", audio: true },
      { spanish: "la bicicleta / la bici", english: "bicycle", audio: true },
      { spanish: "a pie", english: "on foot", audio: true },
      { spanish: "la estación", english: "station", audio: true },
      { spanish: "la parada", english: "stop (bus)", audio: true },
      { spanish: "el boleto / el billete", english: "ticket", audio: true },
      { spanish: "el horario", english: "schedule", audio: true },
      { spanish: "salir", english: "to leave/depart", audio: true },
      { spanish: "llegar", english: "to arrive", audio: true },
    ],
    {
      title: "Transportation verbs",
      explanation: "Getting around",
      content: [
        { spanish: "tomar / coger el autobús", english: "to take the bus" },
        { spanish: "ir en coche", english: "to go by car" },
        { spanish: "ir en avión", english: "to fly (go by plane)" },
      ],
      tip: "Use 'en' for mode of transport: en coche, en tren, en avión. Exception: a pie (on foot)"
    },
    [
      { spanish: "¿A qué hora sale el próximo tren?", english: "What time does the next train leave?", context: "schedule" },
      { spanish: "¿Dónde está la parada de autobús?", english: "Where is the bus stop?", context: "finding transport" },
      { spanish: "Un boleto a..., por favor", english: "A ticket to..., please", context: "buying ticket" },
      { spanish: "¿Cuánto tarda?", english: "How long does it take?", context: "duration" },
    ],
    {
      topic: "Taking public transportation",
      opener: "Necesito ir al aeropuerto. ¿Cómo llego?",
      goals: ["Buy tickets", "Ask about schedules", "Navigate public transport"],
      hints: ["¿A qué hora sale...? = What time does... leave?"]
    },
    [
      { type: "schedule-reading", task: "Find the correct departure" },
    ],
    "In many Latin American cities, 'colectivo' or 'micro' are common names for local buses."
  ),

  createDay(17, "Shopping & Clothes", "vocabulary",
    [
      { spanish: "la tienda", english: "store", audio: true },
      { spanish: "el centro comercial", english: "shopping center/mall", audio: true },
      { spanish: "la ropa", english: "clothes", audio: true },
      { spanish: "la camisa", english: "shirt", audio: true },
      { spanish: "los pantalones", english: "pants", audio: true },
      { spanish: "el vestido", english: "dress", audio: true },
      { spanish: "la falda", english: "skirt", audio: true },
      { spanish: "los zapatos", english: "shoes", audio: true },
      { spanish: "la chaqueta", english: "jacket", audio: true },
      { spanish: "el abrigo", english: "coat", audio: true },
      { spanish: "la talla", english: "size", audio: true },
      { spanish: "grande", english: "large", audio: true },
      { spanish: "mediano/a", english: "medium", audio: true },
      { spanish: "pequeño/a", english: "small", audio: true },
      { spanish: "el probador", english: "fitting room", audio: true },
      { spanish: "el descuento", english: "discount", audio: true },
      { spanish: "la oferta", english: "sale/offer", audio: true },
    ],
    {
      title: "Demonstrative adjectives",
      explanation: "This, that, these, those",
      content: [
        { spanish: "este/esta/estos/estas", english: "this/these (near)" },
        { spanish: "ese/esa/esos/esas", english: "that/those (middle distance)" },
        { spanish: "aquel/aquella/aquellos/aquellas", english: "that/those (far)" },
      ],
      tip: "Agreement with gender AND number of noun"
    },
    [
      { spanish: "¿Puedo probármelo?", english: "Can I try it on?", context: "fitting room" },
      { spanish: "¿Tiene esto en otra talla?", english: "Do you have this in another size?", context: "sizing" },
      { spanish: "Me queda grande/pequeño", english: "It's too big/small on me", context: "fit" },
      { spanish: "Me lo llevo", english: "I'll take it", context: "deciding to buy" },
      { spanish: "Solo estoy mirando", english: "I'm just looking", context: "browsing" },
    ],
    {
      topic: "Shopping for clothes",
      opener: "¡Bienvenida! ¿Busca algo en particular?",
      goals: ["Ask about sizes", "Try on clothes", "Make purchases"],
      hints: ["¿Tiene...? = Do you have...?", "Me queda = It fits me"]
    },
    [
      { type: "shopping-scenario", task: "Buy a complete outfit" },
    ],
    "Clothing sizes vary significantly between countries. Always try things on!"
  ),

  createDay(18, "Health & Body", "vocabulary",
    [
      { spanish: "la cabeza", english: "head", audio: true },
      { spanish: "el ojo", english: "eye", audio: true },
      { spanish: "la nariz", english: "nose", audio: true },
      { spanish: "la boca", english: "mouth", audio: true },
      { spanish: "el oído / la oreja", english: "ear (inner/outer)", audio: true },
      { spanish: "el brazo", english: "arm", audio: true },
      { spanish: "la mano", english: "hand", audio: true },
      { spanish: "la pierna", english: "leg", audio: true },
      { spanish: "el pie", english: "foot", audio: true },
      { spanish: "el estómago", english: "stomach", audio: true },
      { spanish: "la espalda", english: "back", audio: true },
      { spanish: "me duele", english: "it hurts me", audio: true },
      { spanish: "me duelen", english: "they hurt me (plural)", audio: true },
      { spanish: "enfermo/a", english: "sick", audio: true },
      { spanish: "la fiebre", english: "fever", audio: true },
      { spanish: "el resfriado", english: "cold (illness)", audio: true },
      { spanish: "la farmacia", english: "pharmacy", audio: true },
      { spanish: "el médico / el doctor", english: "doctor", audio: true },
      { spanish: "el hospital", english: "hospital", audio: true },
    ],
    {
      title: "DOLER - To hurt (like GUSTAR)",
      explanation: "Works like GUSTAR - indirect object pronouns",
      content: [
        { spanish: "Me duele la cabeza", english: "My head hurts" },
        { spanish: "Me duelen los pies", english: "My feet hurt" },
        { spanish: "¿Te duele algo?", english: "Does something hurt?" },
      ],
      tip: "Duele for singular body parts, Duelen for plural"
    },
    [
      { spanish: "No me siento bien", english: "I don't feel well", context: "feeling sick" },
      { spanish: "Necesito un médico", english: "I need a doctor", context: "emergency" },
      { spanish: "¿Tiene algo para el dolor de cabeza?", english: "Do you have something for headache?", context: "pharmacy" },
      { spanish: "Soy alérgico/a a...", english: "I'm allergic to...", context: "allergies" },
    ],
    {
      topic: "At the doctor/pharmacy",
      opener: "Buenos días. ¿Cómo se siente hoy?",
      goals: ["Describe symptoms", "Ask for medicine", "Understand instructions"],
      hints: ["Me duele = it hurts", "Necesito = I need"]
    },
    [
      { type: "body-labeling", task: "Label body parts" },
      { type: "symptom-matching", task: "Match symptoms to remedies" },
    ],
    "Pharmacies in Spanish-speaking countries often provide basic medical advice and many medicines without prescription."
  ),

  createDay(19, "Past Tense Introduction (Preterite)", "grammar",
    [
      { spanish: "ayer", english: "yesterday", audio: true },
      { spanish: "anoche", english: "last night", audio: true },
      { spanish: "la semana pasada", english: "last week", audio: true },
      { spanish: "el mes pasado", english: "last month", audio: true },
      { spanish: "el año pasado", english: "last year", audio: true },
      { spanish: "hace dos días", english: "two days ago", audio: true },
      { spanish: "una vez", english: "once", audio: true },
    ],
    {
      title: "Preterite Tense - Regular Verbs",
      explanation: "For completed actions in the past",
      content: [
        { spanish: "-AR: hablé, hablaste, habló, hablamos, hablaron", english: "I spoke, you spoke, etc." },
        { spanish: "-ER/-IR: comí, comiste, comió, comimos, comieron", english: "I ate, you ate, etc." },
        { spanish: "Ayer hablé con mi madre", english: "Yesterday I spoke with my mom" },
        { spanish: "La semana pasada viajé a México", english: "Last week I traveled to Mexico" },
      ],
      tip: "Preterite = completed, one-time, or sequential past actions"
    },
    [
      { spanish: "¿Qué hiciste ayer?", english: "What did you do yesterday?", context: "asking about past" },
      { spanish: "Fui al cine", english: "I went to the movies", context: "past activity" },
      { spanish: "Comí tacos", english: "I ate tacos", context: "past meal" },
      { spanish: "¿Adónde viajaste?", english: "Where did you travel?", context: "travel" },
    ],
    {
      topic: "Talking about yesterday",
      opener: "¿Qué hiciste ayer?",
      goals: ["Describe past activities", "Use time expressions", "Ask about someone's past"],
      hints: ["-AR → -é, -aste, -ó", "-ER/-IR → -í, -iste, -ió"]
    },
    [
      { type: "conjugate-past", verb: "hablar", pronoun: "yo", answer: "hablé" },
      { type: "conjugate-past", verb: "comer", pronoun: "ella", answer: "comió" },
    ],
    "When telling stories, Spanish often uses the preterite for main events and imperfect for background/description."
  ),

  createDay(20, "Irregular Past Tense (Preterite)", "grammar",
    [
      { spanish: "fui (ir/ser)", english: "I went / I was", audio: true },
      { spanish: "hice (hacer)", english: "I did/made", audio: true },
      { spanish: "tuve (tener)", english: "I had", audio: true },
      { spanish: "estuve (estar)", english: "I was (location/state)", audio: true },
      { spanish: "pude (poder)", english: "I could/was able", audio: true },
      { spanish: "puse (poner)", english: "I put", audio: true },
      { spanish: "vine (venir)", english: "I came", audio: true },
      { spanish: "dije (decir)", english: "I said", audio: true },
      { spanish: "traje (traer)", english: "I brought", audio: true },
      { spanish: "vi (ver)", english: "I saw", audio: true },
      { spanish: "di (dar)", english: "I gave", audio: true },
    ],
    {
      title: "Irregular Preterite Verbs",
      explanation: "Common verbs with stem changes",
      content: [
        { spanish: "IR/SER: fui, fuiste, fue, fuimos, fueron", english: "went/was" },
        { spanish: "HACER: hice, hiciste, hizo, hicimos, hicieron", english: "did/made" },
        { spanish: "TENER: tuve, tuviste, tuvo, tuvimos, tuvieron", english: "had" },
        { spanish: "ESTAR: estuve, estuviste, estuvo, estuvimos, estuvieron", english: "was (state)" },
      ],
      tip: "IR and SER have the same preterite forms - context tells you which!"
    },
    [
      { spanish: "Fui a la playa", english: "I went to the beach", context: "past trip" },
      { spanish: "Fue muy divertido", english: "It was very fun", context: "describing" },
      { spanish: "Hice la tarea", english: "I did the homework", context: "completed task" },
      { spanish: "Tuve que trabajar", english: "I had to work", context: "obligation" },
    ],
    {
      topic: "Telling stories about the past",
      opener: "Cuéntame de tus vacaciones. ¿Adónde fuiste?",
      goals: ["Use irregular past verbs", "Tell a story", "Describe past experiences"],
      hints: ["fui = I went", "fue = it was", "hice = I did"]
    },
    [
      { type: "story-order", task: "Put the story events in order" },
    ],
    "When Mexicans say 'fui' it sounds like 'fwee' - listen for regional pronunciation differences!"
  ),

  createDay(21, "Week 3 Review: Practical Conversations", "review",
    [],
    {
      title: "Week 3 Grammar Summary",
      explanation: "Review all practical skills",
      content: [
        { spanish: "Directions", english: "a la derecha, todo recto, cerca de" },
        { spanish: "Transportation", english: "tomar el autobús, ir en tren" },
        { spanish: "Shopping", english: "¿Tiene...?, Me lo llevo" },
        { spanish: "Health", english: "Me duele, Necesito" },
        { spanish: "Preterite regular", english: "-é, -aste, -ó / -í, -iste, -ió" },
        { spanish: "Preterite irregular", english: "fui, hice, tuve, estuve" },
      ],
      tip: "You can now navigate, shop, handle emergencies, and talk about the past!"
    },
    [
      { spanish: "Cuéntame de tu última aventura", english: "Tell me about your last adventure", context: "story" },
    ],
    {
      topic: "Complete practical scenario",
      opener: "Imagina que estás en México. Cuéntame qué hiciste ayer.",
      goals: ["Navigate a city", "Shop successfully", "Tell stories about the past"],
      hints: ["Combine all skills from Week 3!"]
    },
    [
      { type: "conversation", scenario: "practical-adventure" },
    ],
    "¡Fantástico! You've completed Week 3. You can now handle real-world situations in Spanish!"
  ),

  // ============ WEEK 4: FLUENCY ============
  createDay(22, "Future Plans & Intentions", "grammar",
    [
      { spanish: "mañana", english: "tomorrow", audio: true },
      { spanish: "la próxima semana", english: "next week", audio: true },
      { spanish: "el próximo mes", english: "next month", audio: true },
      { spanish: "el próximo año", english: "next year", audio: true },
      { spanish: "pronto", english: "soon", audio: true },
      { spanish: "algún día", english: "someday", audio: true },
    ],
    {
      title: "Future with IR + A + Infinitive",
      explanation: "The most common way to express future",
      content: [
        { spanish: "Voy a estudiar", english: "I'm going to study" },
        { spanish: "Vas a viajar", english: "You're going to travel" },
        { spanish: "Vamos a celebrar", english: "We're going to celebrate" },
      ],
      tip: "IR + A + INFINITIVE is used much more than simple future tense in everyday speech!"
    },
    [
      { spanish: "¿Qué vas a hacer mañana?", english: "What are you going to do tomorrow?", context: "plans" },
      { spanish: "Voy a visitar a mi familia", english: "I'm going to visit my family", context: "future plan" },
      { spanish: "¿Cuáles son tus planes?", english: "What are your plans?", context: "asking" },
      { spanish: "Espero viajar a España", english: "I hope to travel to Spain", context: "hopes" },
      { spanish: "Quiero aprender más español", english: "I want to learn more Spanish", context: "goals" },
    ],
    {
      topic: "Discussing future plans",
      opener: "¿Qué planes tienes para el futuro?",
      goals: ["Discuss future plans", "Express hopes and dreams", "Make arrangements"],
      hints: ["voy a = I'm going to", "quiero = I want to"]
    },
    [
      { type: "plan-creation", task: "Create a travel itinerary" },
    ],
    "In Spanish, the present tense is often used for near future: 'Mañana trabajo' (Tomorrow I work/I'm working tomorrow)."
  ),

  createDay(23, "Expressing Opinions", "conversation",
    [
      { spanish: "creo que", english: "I think that", audio: true },
      { spanish: "pienso que", english: "I think that", audio: true },
      { spanish: "me parece que", english: "it seems to me that", audio: true },
      { spanish: "en mi opinión", english: "in my opinion", audio: true },
      { spanish: "estoy de acuerdo", english: "I agree", audio: true },
      { spanish: "no estoy de acuerdo", english: "I disagree", audio: true },
      { spanish: "tienes razón", english: "you're right", audio: true },
      { spanish: "depende", english: "it depends", audio: true },
      { spanish: "por un lado... por otro lado", english: "on one hand... on the other hand", audio: true },
      { spanish: "sin embargo", english: "however", audio: true },
      { spanish: "además", english: "also/furthermore", audio: true },
      { spanish: "por eso", english: "that's why/therefore", audio: true },
    ],
    {
      title: "Opinion expressions",
      explanation: "Sharing your thoughts politely",
      content: [
        { spanish: "Creo que es importante", english: "I think it's important" },
        { spanish: "Me parece interesante", english: "It seems interesting to me" },
        { spanish: "No estoy seguro/a", english: "I'm not sure" },
      ],
      tip: "Spanish speakers often soften opinions with 'creo que' or 'me parece que'"
    },
    [
      { spanish: "¿Qué opinas de...?", english: "What do you think about...?", context: "asking opinion" },
      { spanish: "¿Qué piensas?", english: "What do you think?", context: "asking" },
      { spanish: "Para mí, lo más importante es...", english: "For me, the most important thing is...", context: "expressing" },
      { spanish: "¿Por qué?", english: "Why?", context: "asking reason" },
      { spanish: "Porque...", english: "Because...", context: "explaining" },
    ],
    {
      topic: "Discussing opinions on various topics",
      opener: "¿Qué opinas del aprendizaje de idiomas? ¿Es importante?",
      goals: ["Express opinions", "Agree/disagree politely", "Give reasons"],
      hints: ["Creo que... = I think that...", "Porque = because"]
    },
    [
      { type: "debate", topic: "Is technology good for learning?" },
    ],
    "In Spanish culture, lively debate is common and expected. Disagreeing is not rude - it's engaging!"
  ),

  createDay(24, "Comparisons & Superlatives", "grammar",
    [
      { spanish: "más... que", english: "more... than", audio: true },
      { spanish: "menos... que", english: "less... than", audio: true },
      { spanish: "tan... como", english: "as... as", audio: true },
      { spanish: "tanto como", english: "as much as", audio: true },
      { spanish: "el/la más", english: "the most", audio: true },
      { spanish: "el/la menos", english: "the least", audio: true },
      { spanish: "mejor", english: "better/best", audio: true },
      { spanish: "peor", english: "worse/worst", audio: true },
      { spanish: "mayor", english: "older/bigger", audio: true },
      { spanish: "menor", english: "younger/smaller", audio: true },
    ],
    {
      title: "Comparatives and Superlatives",
      explanation: "Comparing things and people",
      content: [
        { spanish: "María es más alta que Juan", english: "María is taller than Juan" },
        { spanish: "Este libro es tan interesante como ese", english: "This book is as interesting as that one" },
        { spanish: "Es el mejor restaurante de la ciudad", english: "It's the best restaurant in the city" },
      ],
      tip: "Use 'que' for comparisons (more than), 'de' for superlatives (the best OF)"
    },
    [
      { spanish: "¿Cuál prefieres?", english: "Which do you prefer?", context: "preferences" },
      { spanish: "Prefiero este porque es mejor", english: "I prefer this one because it's better", context: "explaining" },
      { spanish: "¿Qué es más importante para ti?", english: "What's more important to you?", context: "values" },
    ],
    {
      topic: "Comparing options and preferences",
      opener: "¿Qué es mejor: viajar solo o con amigos?",
      goals: ["Make comparisons", "Express preferences", "Use superlatives"],
      hints: ["más + adj + que = more... than", "el/la más = the most"]
    },
    [
      { type: "comparison-game", task: "Compare two cities" },
    ],
    "Spanish has irregular comparatives: bueno→mejor, malo→peor, grande→mayor, pequeño→menor."
  ),

  createDay(25, "Emotions & Reactions", "vocabulary",
    [
      { spanish: "feliz / contento/a", english: "happy", audio: true },
      { spanish: "triste", english: "sad", audio: true },
      { spanish: "enojado/a / enfadado/a", english: "angry", audio: true },
      { spanish: "preocupado/a", english: "worried", audio: true },
      { spanish: "nervioso/a", english: "nervous", audio: true },
      { spanish: "emocionado/a", english: "excited", audio: true },
      { spanish: "sorprendido/a", english: "surprised", audio: true },
      { spanish: "aburrido/a", english: "bored", audio: true },
      { spanish: "cansado/a", english: "tired", audio: true },
      { spanish: "asustado/a", english: "scared", audio: true },
      { spanish: "orgulloso/a", english: "proud", audio: true },
      { spanish: "celoso/a", english: "jealous", audio: true },
    ],
    {
      title: "Emotion expressions",
      explanation: "Expressing how you feel",
      content: [
        { spanish: "Estoy muy feliz", english: "I'm very happy" },
        { spanish: "Me siento triste", english: "I feel sad" },
        { spanish: "Me hace feliz", english: "It makes me happy" },
        { spanish: "Me pone nervioso/a", english: "It makes me nervous" },
      ],
      tip: "Use ESTAR for temporary emotions, SER for personality traits"
    },
    [
      { spanish: "¿Cómo te sientes?", english: "How do you feel?", context: "asking emotions" },
      { spanish: "Me siento bien/mal", english: "I feel good/bad", context: "responding" },
      { spanish: "¡Qué alegría!", english: "What joy!", context: "reacting happily" },
      { spanish: "¡Qué pena!", english: "What a shame!", context: "expressing sympathy" },
      { spanish: "¡No me digas!", english: "No way! / You don't say!", context: "surprise" },
      { spanish: "¡Qué bien!", english: "How great!", context: "positive reaction" },
    ],
    {
      topic: "Sharing and responding to emotions",
      opener: "¿Cómo te sientes hoy? ¿Por qué?",
      goals: ["Express emotions", "React to news", "Show empathy"],
      hints: ["Estoy + emotion", "Me siento + emotion"]
    },
    [
      { type: "emotion-scenarios", task: "React appropriately to news" },
    ],
    "Spanish speakers often use physical gestures with emotional expressions - the language is very expressive!"
  ),

  createDay(26, "Telling Stories", "conversation",
    [
      { spanish: "había una vez", english: "once upon a time", audio: true },
      { spanish: "primero", english: "first", audio: true },
      { spanish: "luego / después", english: "then / after", audio: true },
      { spanish: "mientras", english: "while", audio: true },
      { spanish: "de repente", english: "suddenly", audio: true },
      { spanish: "por fin / finalmente", english: "finally", audio: true },
      { spanish: "al final", english: "in the end", audio: true },
      { spanish: "entonces", english: "so/then", audio: true },
      { spanish: "por eso", english: "that's why", audio: true },
    ],
    {
      title: "Story connectors",
      explanation: "Linking events in a narrative",
      content: [
        { spanish: "Primero fui al mercado, luego cociné", english: "First I went to the market, then I cooked" },
        { spanish: "Mientras caminaba, vi un perro", english: "While I was walking, I saw a dog" },
        { spanish: "De repente empezó a llover", english: "Suddenly it started to rain" },
      ],
      tip: "Use connectors to make your stories flow naturally"
    },
    [
      { spanish: "¿Qué pasó?", english: "What happened?", context: "asking for story" },
      { spanish: "Cuéntame más", english: "Tell me more", context: "encouraging" },
      { spanish: "¿Y luego?", english: "And then?", context: "continuing" },
      { spanish: "¡No lo puedo creer!", english: "I can't believe it!", context: "reacting" },
    ],
    {
      topic: "Telling personal stories",
      opener: "Cuéntame una historia interesante de tu vida.",
      goals: ["Tell a coherent story", "Use time connectors", "Keep listener engaged"],
      hints: ["Use connectors: primero, luego, después, al final"]
    },
    [
      { type: "story-building", task: "Tell a travel story" },
    ],
    "Spanish storytelling often involves more detail and emotion than English - take your time and be expressive!"
  ),

  createDay(27, "Hypotheticals & Wishes", "grammar",
    [
      { spanish: "si pudiera", english: "if I could", audio: true },
      { spanish: "si tuviera", english: "if I had", audio: true },
      { spanish: "me gustaría", english: "I would like", audio: true },
      { spanish: "sería", english: "it would be", audio: true },
      { spanish: "haría", english: "I would do", audio: true },
      { spanish: "iría", english: "I would go", audio: true },
      { spanish: "ojalá", english: "I wish / hopefully", audio: true },
      { spanish: "espero que", english: "I hope that", audio: true },
    ],
    {
      title: "Conditional & Wishes",
      explanation: "Expressing hypothetical situations",
      content: [
        { spanish: "Me gustaría viajar más", english: "I would like to travel more" },
        { spanish: "Si tuviera dinero, iría a España", english: "If I had money, I would go to Spain" },
        { spanish: "Ojalá pudiera hablar perfectamente", english: "I wish I could speak perfectly" },
      ],
      tip: "Conditional = -ía endings (hablaría, comería, viviría)"
    },
    [
      { spanish: "¿Qué harías con un millón de dólares?", english: "What would you do with a million dollars?", context: "hypothetical" },
      { spanish: "Si pudiera, viviría en la playa", english: "If I could, I would live on the beach", context: "wishes" },
      { spanish: "Me encantaría conocerte", english: "I would love to meet you", context: "polite desire" },
    ],
    {
      topic: "Discussing dreams and hypotheticals",
      opener: "Si pudieras vivir en cualquier país, ¿dónde vivirías?",
      goals: ["Express wishes", "Discuss hypotheticals", "Use conditional politely"],
      hints: ["Me gustaría = I would like", "Si pudiera = If I could"]
    },
    [
      { type: "dream-discussion", task: "Describe your ideal life" },
    ],
    "'Ojalá' comes from Arabic 'inshallah' (God willing) - a reminder of Spain's Moorish history!"
  ),

  createDay(28, "Week 4 Review: Fluent Conversations", "review",
    [],
    {
      title: "Week 4 Grammar Summary",
      explanation: "Review all advanced concepts",
      content: [
        { spanish: "Future with IR", english: "voy a + infinitive" },
        { spanish: "Opinions", english: "creo que, me parece que" },
        { spanish: "Comparisons", english: "más/menos... que, tan... como" },
        { spanish: "Emotions", english: "estoy feliz, me siento triste" },
        { spanish: "Story connectors", english: "primero, luego, de repente" },
        { spanish: "Conditional", english: "me gustaría, sería, haría" },
      ],
      tip: "You can now have complex, nuanced conversations in Spanish!"
    },
    [
      { spanish: "Vamos a tener una conversación completa", english: "Let's have a complete conversation", context: "full practice" },
    ],
    {
      topic: "Complete fluent conversation",
      opener: "¡Hola! Hoy vamos a hablar de todo. Cuéntame de ti, tus planes, tus sueños...",
      goals: ["Use all tenses", "Express complex ideas", "Have a natural conversation"],
      hints: ["Relax and let the Spanish flow!"]
    },
    [
      { type: "conversation", scenario: "complete-interview" },
    ],
    "¡Impresionante! You've completed Week 4. You can now hold meaningful conversations in Spanish!"
  ),

  // ============ FINAL DAYS ============
  createDay(29, "Spanish in the Real World", "application",
    [],
    {
      title: "Applying Your Skills",
      explanation: "Real-world scenarios",
      content: [
        { spanish: "At a party", english: "socializing, small talk" },
        { spanish: "Job interview basics", english: "professional Spanish" },
        { spanish: "Making friends", english: "building relationships" },
        { spanish: "Handling problems", english: "complaints, solutions" },
      ],
      tip: "The best practice is real conversation - use your Spanish every day!"
    },
    [
      { spanish: "¿En qué puedo ayudarle?", english: "How can I help you?", context: "service" },
      { spanish: "Tengo una queja", english: "I have a complaint", context: "problems" },
      { spanish: "¿Podemos resolver esto?", english: "Can we resolve this?", context: "solutions" },
      { spanish: "Ha sido un placer", english: "It's been a pleasure", context: "closing" },
    ],
    {
      topic: "Multiple real-world scenarios",
      opener: "Vamos a practicar situaciones de la vida real.",
      goals: ["Handle various situations", "Stay calm under pressure", "Communicate effectively"],
      hints: ["Focus on communication, not perfection!"]
    },
    [
      { type: "scenario-rotation", scenarios: ["party", "work", "problem"] },
    ],
    "Remember: Native speakers appreciate your effort! Don't be afraid to make mistakes."
  ),

  createDay(30, "¡Felicidades! Final Celebration", "celebration",
    [],
    {
      title: "Your Achievement",
      explanation: "Celebrate your journey",
      content: [
        { spanish: "You've learned ~800 words", english: "Core vocabulary" },
        { spanish: "3 tenses: present, past, future", english: "Time expression" },
        { spanish: "Essential survival phrases", english: "Real-world skills" },
        { spanish: "Cultural awareness", english: "Understanding context" },
      ],
      tip: "This is just the beginning! Keep practicing every day."
    },
    [
      { spanish: "¡Lo lograste!", english: "You did it!", context: "celebration" },
      { spanish: "Estoy muy orgulloso/a de ti", english: "I'm very proud of you", context: "encouragement" },
      { spanish: "¡Sigue adelante!", english: "Keep going!", context: "motivation" },
    ],
    {
      topic: "Reflection and celebration",
      opener: "¡Felicidades! Has completado 30 días de español. ¿Cómo te sientes?",
      goals: ["Reflect on journey", "Celebrate progress", "Plan next steps"],
      hints: ["Be proud of how far you've come!"]
    },
    [
      { type: "final-conversation", topic: "Your Spanish journey" },
    ],
    "¡Felicidades! You've completed 30 days of Spanish. You're now ready for B1-level conversations. ¡Sigue practicando!"
  ),
];

// Helper functions
export function getDayContent(dayNumber) {
  return CURRICULUM.find(d => d.day === dayNumber) || null;
}

export function getWeekContent(weekNumber) {
  const startDay = (weekNumber - 1) * 7 + 1;
  const endDay = weekNumber * 7;
  return CURRICULUM.filter(d => d.day >= startDay && d.day <= endDay);
}

export function getTotalVocabulary() {
  let total = 0;
  CURRICULUM.forEach(day => {
    total += day.vocab?.length || 0;
  });
  return total;
}

export function getAllPhrases() {
  const phrases = [];
  CURRICULUM.forEach(day => {
    if (day.phrases) {
      phrases.push(...day.phrases);
    }
  });
  return phrases;
}

export function getGrammarTopics() {
  return CURRICULUM.map(day => ({
    day: day.day,
    title: day.grammar?.title,
    explanation: day.grammar?.explanation
  })).filter(g => g.title);
}

export default CURRICULUM;
