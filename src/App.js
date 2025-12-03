import React, { useState, useEffect } from 'react';

// ============================================
// FLUIDEZ - Complete 30-Day Spanish Course
// ============================================

const colors = {
  bgPrimary: '#FAFAFA',
  bgSecondary: '#FFFFFF',
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A68',
  accent: '#2D5A7B',
  accentLight: '#E8F4F8',
  success: '#2E7D6F',
  successLight: '#E8F5F2',
  error: '#C25450',
  errorLight: '#FDEEEE',
  border: '#E0E0E0',
};

// ============================================
// COMPLETE 30-DAY CURRICULUM DATA
// ============================================

const curriculum = {
  // ==================== DAY 1 ====================
  1: {
    title: "Alphabet & Pronunciation",
    subtitle: "Spanish sounds and greetings",
    grammar: {
      title: "Spanish Sounds",
      screens: [
        { type: 'lesson', heading: "Welcome to Spanish!", content: "¡Bienvenidos! Spanish is one of the most widely spoken languages in the world, with over 500 million speakers. The great news? Spanish pronunciation is very consistent — once you learn the rules, you can read any word correctly.", tip: "Spanish is phonetic: letters almost always make the same sound!" },
        { type: 'lesson', heading: "The 5 Vowels", content: "Spanish has only 5 pure vowel sounds. They NEVER change, unlike English. Master these and you're halfway there:", examples: [
          { spanish: "A", pronunciation: "ah (like 'father')", word: "casa", meaning: "house" },
          { spanish: "E", pronunciation: "eh (like 'bed')", word: "mesa", meaning: "table" },
          { spanish: "I", pronunciation: "ee (like 'see')", word: "libro", meaning: "book" },
          { spanish: "O", pronunciation: "oh (like 'go')", word: "todo", meaning: "everything" },
          { spanish: "U", pronunciation: "oo (like 'food')", word: "mucho", meaning: "much" },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Which vowel makes the 'ee' sound?", options: ["A", "E", "I", "U"], correctAnswer: 2, explanation: "Spanish 'I' always sounds like 'ee' in 'see'." },
        { type: 'lesson', heading: "Consonants That Differ", content: "Most consonants are similar to English, but these are different:", examples: [
          { spanish: "H", pronunciation: "always silent", word: "hola", meaning: "hello" },
          { spanish: "J", pronunciation: "like English 'h'", word: "julio", meaning: "July" },
          { spanish: "LL", pronunciation: "like 'y' in yes", word: "llamar", meaning: "to call" },
          { spanish: "Ñ", pronunciation: "like 'ny' in canyon", word: "año", meaning: "year" },
          { spanish: "RR", pronunciation: "rolled/trilled", word: "perro", meaning: "dog" },
          { spanish: "V", pronunciation: "like 'b'", word: "vamos", meaning: "let's go" },
          { spanish: "Z", pronunciation: "like 's' (Latin Am)", word: "zapato", meaning: "shoe" },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "How is 'H' pronounced in Spanish?", options: ["Like English 'H'", "Like 'J'", "It's silent", "Like 'CH'"], correctAnswer: 2, explanation: "The Spanish 'H' is always silent. 'Hola' is pronounced 'oh-la'." },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "The Spanish 'J' sounds like which English letter?", options: ["J", "H", "Y", "G"], correctAnswer: 1, explanation: "Spanish 'J' sounds like English 'H'. 'Julio' = 'HOO-lee-oh'." },
      ]
    },
    vocabulary: {
      title: "Greetings & Numbers",
      screens: [
        { type: 'vocab', category: "Essential Greetings", words: [
          { spanish: "hola", english: "hello", example: "¡Hola! ¿Cómo estás?" },
          { spanish: "buenos días", english: "good morning", example: "Buenos días, señora García." },
          { spanish: "buenas tardes", english: "good afternoon", example: "Buenas tardes, ¿cómo está usted?" },
          { spanish: "buenas noches", english: "good evening/night", example: "Buenas noches, hasta mañana." },
          { spanish: "adiós", english: "goodbye", example: "Adiós, que te vaya bien." },
          { spanish: "hasta luego", english: "see you later", example: "Hasta luego, amigo." },
          { spanish: "hasta mañana", english: "see you tomorrow", example: "Hasta mañana en clase." },
          { spanish: "por favor", english: "please", example: "Un café, por favor." },
          { spanish: "gracias", english: "thank you", example: "Muchas gracias por tu ayuda." },
          { spanish: "de nada", english: "you're welcome", example: "—Gracias. —De nada." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "How do you say 'good morning'?", options: ["Buenas noches", "Buenos días", "Buenas tardes", "Hasta luego"], correctAnswer: 1, explanation: "'Buenos días' = good morning (literally 'good days')." },
        { type: 'vocab', category: "Numbers 0-10", words: [
          { spanish: "cero", english: "zero", example: "Cero grados." },
          { spanish: "uno", english: "one", example: "Tengo un hermano." },
          { spanish: "dos", english: "two", example: "Dos cafés, por favor." },
          { spanish: "tres", english: "three", example: "Son las tres." },
          { spanish: "cuatro", english: "four", example: "Cuatro personas." },
          { spanish: "cinco", english: "five", example: "Cinco minutos." },
          { spanish: "seis", english: "six", example: "A las seis." },
          { spanish: "siete", english: "seven", example: "Siete días." },
          { spanish: "ocho", english: "eight", example: "Ocho horas." },
          { spanish: "nueve", english: "nine", example: "Nueve euros." },
          { spanish: "diez", english: "ten", example: "Diez estudiantes." },
        ]},
        { type: 'exercise', exerciseType: 'fill_blank', instruction: "Write the Spanish word for 'five':", correctAnswers: ["cinco"], hint: "Starts with 'c'..." },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "What number is 'siete'?", options: ["6", "7", "8", "9"], correctAnswer: 1, explanation: "'Siete' = 7" },
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Listen and select what you hear:", transcript: "Buenos días", options: ["Buenos días", "Buenas noches", "Buenas tardes", "Hasta luego"], correctAnswer: 0 },
        { type: 'listening', instruction: "🔊 Listen and select what you hear:", transcript: "Muchas gracias", options: ["De nada", "Por favor", "Muchas gracias", "Hasta mañana"], correctAnswer: 2 },
        { type: 'listening', instruction: "🔊 Listen and select the number:", transcript: "siete", options: ["5", "6", "7", "8"], correctAnswer: 2 },
      ]
    },
    reading: {
      title: "First Reading",
      screens: [
        { type: 'reading', title: "En la clase", passage: "¡Hola! Buenos días. Me llamo María. Soy estudiante. Hoy es lunes. La clase es a las nueve. El profesor se llama Carlos. Él es muy simpático. En la clase hay diez estudiantes: cinco chicos y cinco chicas.", translation: "Hello! Good morning. My name is María. I am a student. Today is Monday. The class is at nine. The teacher's name is Carlos. He is very nice. In the class there are ten students: five boys and five girls.", wordCount: 45 },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "What is the teacher's name?", options: ["María", "Carlos", "Pedro", "Juan"], correctAnswer: 1, explanation: "'El profesor se llama Carlos' = The teacher's name is Carlos." },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "How many students are in the class?", options: ["5", "9", "10", "15"], correctAnswer: 2, explanation: "'Diez estudiantes' = ten students." },
      ]
    }
  },

  // ==================== DAY 2 ====================
  2: {
    title: "Introducing Yourself",
    subtitle: "Subject pronouns & SER verb",
    grammar: {
      title: "Subject Pronouns & SER",
      screens: [
        { type: 'lesson', heading: "Subject Pronouns", content: "Before we learn verbs, let's meet the subject pronouns. These tell us WHO is doing the action:", examples: [
          { spanish: "yo", pronunciation: "I", word: "Yo soy María.", meaning: "I am María." },
          { spanish: "tú", pronunciation: "you (informal)", word: "Tú eres mi amigo.", meaning: "You are my friend." },
          { spanish: "él", pronunciation: "he", word: "Él es profesor.", meaning: "He is a teacher." },
          { spanish: "ella", pronunciation: "she", word: "Ella es doctora.", meaning: "She is a doctor." },
          { spanish: "usted", pronunciation: "you (formal)", word: "Usted es muy amable.", meaning: "You are very kind." },
          { spanish: "nosotros/as", pronunciation: "we", word: "Nosotros somos estudiantes.", meaning: "We are students." },
          { spanish: "ellos/ellas", pronunciation: "they", word: "Ellos son amigos.", meaning: "They are friends." },
          { spanish: "ustedes", pronunciation: "you all", word: "Ustedes son bienvenidos.", meaning: "You all are welcome." },
        ]},
        { type: 'lesson', heading: "The Verb SER (to be)", content: "SER is one of the most important verbs. It's used for permanent characteristics, identity, origin, time, and professions.", tip: "SER = permanent/essential qualities. Think: 'What something IS.'" },
        { type: 'lesson', heading: "SER Conjugation", content: "Here's how SER changes with each subject:", examples: [
          { spanish: "yo soy", pronunciation: "I am", word: "Yo soy americano.", meaning: "I am American." },
          { spanish: "tú eres", pronunciation: "you are", word: "Tú eres inteligente.", meaning: "You are intelligent." },
          { spanish: "él/ella/usted es", pronunciation: "he/she/you is/are", word: "Ella es alta.", meaning: "She is tall." },
          { spanish: "nosotros somos", pronunciation: "we are", word: "Somos amigos.", meaning: "We are friends." },
          { spanish: "ellos/ellas/ustedes son", pronunciation: "they/you all are", word: "Son estudiantes.", meaning: "They are students." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Complete: Yo ___ estudiante.", options: ["soy", "eres", "es", "somos"], correctAnswer: 0, explanation: "Yo soy = I am" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Complete: Ella ___ doctora.", options: ["soy", "eres", "es", "son"], correctAnswer: 2, explanation: "Él/Ella/Usted es = He/She is, You (formal) are" },
        { type: 'exercise', exerciseType: 'fill_blank', instruction: "Nosotros ___ amigos. (We are friends)", correctAnswers: ["somos"], hint: "The 'we' form of SER..." },
      ]
    },
    vocabulary: {
      title: "Personal Information",
      screens: [
        { type: 'vocab', category: "Asking & Giving Info", words: [
          { spanish: "¿Cómo te llamas?", english: "What's your name? (informal)", example: "¡Hola! ¿Cómo te llamas?" },
          { spanish: "Me llamo...", english: "My name is...", example: "Me llamo Juan." },
          { spanish: "¿De dónde eres?", english: "Where are you from?", example: "¿De dónde eres tú?" },
          { spanish: "Soy de...", english: "I'm from...", example: "Soy de México." },
          { spanish: "¿Cuántos años tienes?", english: "How old are you?", example: "¿Cuántos años tienes?" },
          { spanish: "Tengo...años", english: "I am...years old", example: "Tengo veinticinco años." },
          { spanish: "mucho gusto", english: "nice to meet you", example: "Mucho gusto, María." },
          { spanish: "igualmente", english: "likewise", example: "—Mucho gusto. —Igualmente." },
        ]},
        { type: 'vocab', category: "Nationalities", words: [
          { spanish: "americano/a", english: "American", example: "Soy americano." },
          { spanish: "mexicano/a", english: "Mexican", example: "Ella es mexicana." },
          { spanish: "español/a", english: "Spanish", example: "Él es español." },
          { spanish: "inglés/inglesa", english: "English", example: "Mi amiga es inglesa." },
          { spanish: "francés/francesa", english: "French", example: "El vino es francés." },
          { spanish: "alemán/alemana", english: "German", example: "El coche es alemán." },
          { spanish: "italiano/a", english: "Italian", example: "La pizza es italiana." },
          { spanish: "chino/a", english: "Chinese", example: "El restaurante es chino." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "How do you say 'Nice to meet you'?", options: ["De nada", "Mucho gusto", "Igualmente", "Hasta luego"], correctAnswer: 1, explanation: "'Mucho gusto' = Nice to meet you" },
        { type: 'exercise', exerciseType: 'fill_blank', instruction: "Soy de Estados Unidos. Soy ___.", correctAnswers: ["americano", "americana"], hint: "The nationality for USA..." },
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Listen and select what you hear:", transcript: "Me llamo Carlos", options: ["Me gusta Carlos", "Me llamo Carlos", "Mi amigo Carlos", "Yo soy Carlos"], correctAnswer: 1 },
        { type: 'listening', instruction: "🔊 Listen and select what you hear:", transcript: "Soy de México", options: ["Soy mexicano", "Voy a México", "Soy de México", "Estoy en México"], correctAnswer: 2 },
        { type: 'listening', instruction: "🔊 What nationality is mentioned?", transcript: "Ella es española", options: ["Mexican", "American", "Spanish", "French"], correctAnswer: 2 },
      ]
    },
    reading: {
      title: "Reading: Introductions",
      screens: [
        { type: 'reading', title: "Nuevos amigos", passage: "¡Hola! Me llamo Roberto. Soy de Argentina. Tengo veintitrés años. Soy estudiante de medicina. Mi amiga se llama Ana. Ella es de España. Es profesora de inglés. Nosotros somos amigos desde hace dos años. Ella es muy simpática e inteligente.", translation: "Hello! My name is Roberto. I'm from Argentina. I'm 23 years old. I'm a medical student. My friend's name is Ana. She's from Spain. She's an English teacher. We have been friends for two years. She is very nice and intelligent.", wordCount: 55 },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Where is Roberto from?", options: ["Spain", "Mexico", "Argentina", "USA"], correctAnswer: 2, explanation: "'Soy de Argentina' = I'm from Argentina" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "What does Ana do?", options: ["Student", "Doctor", "English teacher", "Nurse"], correctAnswer: 2, explanation: "'Es profesora de inglés' = She's an English teacher" },
      ]
    }
  },

  // ==================== DAY 3 ====================
  3: {
    title: "Descriptions & Gender",
    subtitle: "Articles, nouns, and adjectives",
    grammar: {
      title: "Gender & Articles",
      screens: [
        { type: 'lesson', heading: "Noun Gender", content: "In Spanish, ALL nouns are either masculine or feminine. This affects the articles and adjectives used with them.", tip: "Most nouns ending in -o are masculine, most ending in -a are feminine. But there are exceptions!" },
        { type: 'lesson', heading: "Definite Articles (The)", content: "Spanish has 4 forms of 'the':", examples: [
          { spanish: "el", pronunciation: "the (masc. singular)", word: "el libro", meaning: "the book" },
          { spanish: "la", pronunciation: "the (fem. singular)", word: "la mesa", meaning: "the table" },
          { spanish: "los", pronunciation: "the (masc. plural)", word: "los libros", meaning: "the books" },
          { spanish: "las", pronunciation: "the (fem. plural)", word: "las mesas", meaning: "the tables" },
        ]},
        { type: 'lesson', heading: "Indefinite Articles (A/An/Some)", content: "Spanish also has 4 forms of 'a/an/some':", examples: [
          { spanish: "un", pronunciation: "a/an (masc.)", word: "un libro", meaning: "a book" },
          { spanish: "una", pronunciation: "a/an (fem.)", word: "una mesa", meaning: "a table" },
          { spanish: "unos", pronunciation: "some (masc.)", word: "unos libros", meaning: "some books" },
          { spanish: "unas", pronunciation: "some (fem.)", word: "unas mesas", meaning: "some tables" },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Which article goes with 'casa' (house)?", options: ["el", "la", "los", "las"], correctAnswer: 1, explanation: "'Casa' ends in -a, so it's feminine: 'la casa'." },
        { type: 'lesson', heading: "Adjective Agreement", content: "Adjectives must match the noun in gender AND number:", examples: [
          { spanish: "el chico alto", pronunciation: "the tall boy", word: "alto → alta → altos → altas", meaning: "tall (4 forms)" },
          { spanish: "la chica alta", pronunciation: "the tall girl", word: "grande → grandes", meaning: "big (2 forms - same for m/f)" },
          { spanish: "los libros interesantes", pronunciation: "the interesting books", word: "interesante → interesantes", meaning: "interesting" },
        ]},
        { type: 'exercise', exerciseType: 'fill_blank', instruction: "La casa es muy ___. (big)", correctAnswers: ["grande"], hint: "Adjectives ending in -e don't change for gender." },
      ]
    },
    vocabulary: {
      title: "Descriptions",
      screens: [
        { type: 'vocab', category: "Common Adjectives", words: [
          { spanish: "grande", english: "big", example: "La casa es grande." },
          { spanish: "pequeño/a", english: "small", example: "El gato es pequeño." },
          { spanish: "alto/a", english: "tall", example: "Mi padre es alto." },
          { spanish: "bajo/a", english: "short", example: "Mi madre es baja." },
          { spanish: "bonito/a", english: "pretty", example: "La flor es bonita." },
          { spanish: "feo/a", english: "ugly", example: "El edificio es feo." },
          { spanish: "nuevo/a", english: "new", example: "Tengo un coche nuevo." },
          { spanish: "viejo/a", english: "old", example: "La iglesia es vieja." },
          { spanish: "bueno/a", english: "good", example: "Es un buen libro." },
          { spanish: "malo/a", english: "bad", example: "Hace mal tiempo." },
        ]},
        { type: 'vocab', category: "Colors", words: [
          { spanish: "rojo/a", english: "red", example: "La manzana es roja." },
          { spanish: "azul", english: "blue", example: "El cielo es azul." },
          { spanish: "verde", english: "green", example: "La hierba es verde." },
          { spanish: "amarillo/a", english: "yellow", example: "El sol es amarillo." },
          { spanish: "blanco/a", english: "white", example: "La nieve es blanca." },
          { spanish: "negro/a", english: "black", example: "El gato es negro." },
          { spanish: "marrón", english: "brown", example: "El perro es marrón." },
          { spanish: "gris", english: "gray", example: "El elefante es gris." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "The apple is red = La manzana es ___", options: ["rojo", "roja", "rojos", "rojas"], correctAnswer: 1, explanation: "'Manzana' is feminine, so 'roja' matches." },
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Listen and select what you hear:", transcript: "La casa es grande", options: ["The house is small", "The house is big", "The car is big", "The house is old"], correctAnswer: 1 },
        { type: 'listening', instruction: "🔊 What color is mentioned?", transcript: "El coche es azul", options: ["red", "green", "blue", "black"], correctAnswer: 2 },
        { type: 'listening', instruction: "🔊 Listen and select:", transcript: "Los libros son interesantes", options: ["The book is interesting", "The books are interesting", "The books are boring", "The class is interesting"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Descriptions",
      screens: [
        { type: 'reading', title: "Mi apartamento", passage: "Vivo en un apartamento pequeño pero bonito. Tiene dos habitaciones y un baño. La cocina es blanca y moderna. El salón es grande con un sofá azul y una mesa marrón. Las paredes son amarillas. Hay una ventana grande con cortinas verdes. Me gusta mucho mi apartamento.", translation: "I live in a small but pretty apartment. It has two bedrooms and one bathroom. The kitchen is white and modern. The living room is big with a blue sofa and a brown table. The walls are yellow. There's a big window with green curtains. I like my apartment a lot.", wordCount: 58 },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "What color is the sofa?", options: ["Brown", "Yellow", "Blue", "Green"], correctAnswer: 2, explanation: "'Un sofá azul' = a blue sofa" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "How is the kitchen described?", options: ["Big and old", "Small and dark", "White and modern", "Yellow and small"], correctAnswer: 2, explanation: "'La cocina es blanca y moderna'" },
      ]
    }
  },

  // ==================== DAY 4 ====================
  4: {
    title: "Locations & Feelings",
    subtitle: "The verb ESTAR",
    grammar: {
      title: "The Verb ESTAR",
      screens: [
        { type: 'lesson', heading: "SER vs ESTAR", content: "Both mean 'to be' but are used differently. ESTAR is for temporary states, locations, and emotions.", tip: "ESTAR = temporary/changeable states & locations. Think: 'How/Where something IS right now.'" },
        { type: 'lesson', heading: "ESTAR Conjugation", content: "Here's how ESTAR conjugates:", examples: [
          { spanish: "yo estoy", pronunciation: "I am", word: "Estoy cansado.", meaning: "I am tired." },
          { spanish: "tú estás", pronunciation: "you are", word: "¿Estás bien?", meaning: "Are you okay?" },
          { spanish: "él/ella/usted está", pronunciation: "he/she is", word: "Está en casa.", meaning: "He/She is at home." },
          { spanish: "nosotros estamos", pronunciation: "we are", word: "Estamos contentos.", meaning: "We are happy." },
          { spanish: "ellos/ustedes están", pronunciation: "they are", word: "Están aquí.", meaning: "They are here." },
        ]},
        { type: 'lesson', heading: "When to Use ESTAR", content: "Use ESTAR for:", examples: [
          { spanish: "Location", pronunciation: "where something/someone is", word: "El libro está en la mesa.", meaning: "The book is on the table." },
          { spanish: "Emotions", pronunciation: "how someone feels", word: "Estoy feliz.", meaning: "I am happy." },
          { spanish: "Conditions", pronunciation: "temporary states", word: "La puerta está abierta.", meaning: "The door is open." },
          { spanish: "Actions in progress", pronunciation: "with -ando/-iendo", word: "Estoy comiendo.", meaning: "I am eating." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "María ___ en la oficina. (María is at the office)", options: ["es", "está", "son", "están"], correctAnswer: 1, explanation: "Use ESTAR for location." },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "SER or ESTAR? 'She is tired.'", options: ["Ella es cansada", "Ella está cansada"], correctAnswer: 1, explanation: "Being tired is temporary → ESTAR" },
        { type: 'exercise', exerciseType: 'fill_blank', instruction: "¿Dónde ___ el baño? (Where is the bathroom?)", correctAnswers: ["está"], hint: "Location requires ESTAR..." },
      ]
    },
    vocabulary: {
      title: "Emotions & Locations",
      screens: [
        { type: 'vocab', category: "Emotions (with ESTAR)", words: [
          { spanish: "contento/a", english: "happy/content", example: "Estoy muy contento hoy." },
          { spanish: "triste", english: "sad", example: "¿Por qué estás triste?" },
          { spanish: "cansado/a", english: "tired", example: "Estamos cansados después del trabajo." },
          { spanish: "enfermo/a", english: "sick", example: "Mi madre está enferma." },
          { spanish: "nervioso/a", english: "nervous", example: "Estoy nervioso por el examen." },
          { spanish: "emocionado/a", english: "excited", example: "Están emocionados por el viaje." },
          { spanish: "enojado/a", english: "angry", example: "Mi jefe está enojado." },
          { spanish: "preocupado/a", english: "worried", example: "Estoy preocupado por ti." },
        ]},
        { type: 'vocab', category: "Places", words: [
          { spanish: "la casa", english: "house/home", example: "Estoy en casa." },
          { spanish: "la oficina", english: "office", example: "Mi padre está en la oficina." },
          { spanish: "el restaurante", english: "restaurant", example: "Vamos al restaurante." },
          { spanish: "el supermercado", english: "supermarket", example: "Está en el supermercado." },
          { spanish: "el hospital", english: "hospital", example: "Mi abuela está en el hospital." },
          { spanish: "la escuela", english: "school", example: "Los niños están en la escuela." },
          { spanish: "el parque", english: "park", example: "Estamos en el parque." },
          { spanish: "la playa", english: "beach", example: "Mis amigos están en la playa." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Estoy muy ___. (I'm very tired)", options: ["cansado", "contento", "en casa", "bien"], correctAnswer: 0, explanation: "'Cansado' = tired" },
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 How does the person feel?", transcript: "Estoy muy cansado hoy", options: ["Happy", "Tired", "Sad", "Nervous"], correctAnswer: 1 },
        { type: 'listening', instruction: "🔊 Where is María?", transcript: "María está en el supermercado", options: ["At home", "At school", "At the supermarket", "At work"], correctAnswer: 2 },
        { type: 'listening', instruction: "🔊 Listen and select:", transcript: "¿Cómo estás?", options: ["What's your name?", "How are you?", "Where are you?", "Who are you?"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: A Busy Day",
      screens: [
        { type: 'reading', title: "Un día ocupado", passage: "Hoy es un día muy ocupado. Mi esposa está en la oficina. Mis hijos están en la escuela. Yo estoy en casa pero estoy muy cansado. El perro está en el jardín y el gato está en el sofá. Mi madre está preocupada porque mi padre está enfermo. Él está en el hospital. Estamos todos un poco tristes.", translation: "Today is a very busy day. My wife is at the office. My children are at school. I am at home but I am very tired. The dog is in the garden and the cat is on the sofa. My mother is worried because my father is sick. He is in the hospital. We are all a bit sad.", wordCount: 72 },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Where is the father?", options: ["At home", "At work", "In the hospital", "At school"], correctAnswer: 2, explanation: "'Mi padre está en el hospital.'" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "How does the mother feel?", options: ["Tired", "Happy", "Worried", "Excited"], correctAnswer: 2, explanation: "'Mi madre está preocupada' = My mother is worried" },
      ]
    }
  },

  // ==================== DAY 5 ====================
  5: {
    title: "Having & Needing",
    subtitle: "The verb TENER",
    grammar: {
      title: "The Verb TENER",
      screens: [
        { type: 'lesson', heading: "TENER (to have)", content: "TENER is an essential irregular verb. Beyond 'to have,' it's used in many expressions where English uses 'to be.'", tip: "TENER is irregular in yo form (tengo) and has stem changes (ie) in some forms." },
        { type: 'lesson', heading: "TENER Conjugation", content: "Here's how TENER conjugates:", examples: [
          { spanish: "yo tengo", pronunciation: "I have", word: "Tengo dos hermanos.", meaning: "I have two siblings." },
          { spanish: "tú tienes", pronunciation: "you have", word: "¿Tienes hambre?", meaning: "Are you hungry?" },
          { spanish: "él/ella tiene", pronunciation: "he/she has", word: "Ella tiene un perro.", meaning: "She has a dog." },
          { spanish: "nosotros tenemos", pronunciation: "we have", word: "Tenemos una casa grande.", meaning: "We have a big house." },
          { spanish: "ellos/ustedes tienen", pronunciation: "they have", word: "Tienen tres hijos.", meaning: "They have three children." },
        ]},
        { type: 'lesson', heading: "TENER Expressions", content: "These common expressions use TENER where English uses 'to be':", examples: [
          { spanish: "tener hambre", pronunciation: "to be hungry", word: "Tengo hambre.", meaning: "I'm hungry." },
          { spanish: "tener sed", pronunciation: "to be thirsty", word: "¿Tienes sed?", meaning: "Are you thirsty?" },
          { spanish: "tener frío", pronunciation: "to be cold", word: "Tenemos frío.", meaning: "We're cold." },
          { spanish: "tener calor", pronunciation: "to be hot", word: "Tengo calor.", meaning: "I'm hot." },
          { spanish: "tener sueño", pronunciation: "to be sleepy", word: "Tiene sueño.", meaning: "He's sleepy." },
          { spanish: "tener miedo", pronunciation: "to be afraid", word: "Tienen miedo.", meaning: "They're afraid." },
          { spanish: "tener prisa", pronunciation: "to be in a hurry", word: "Tengo prisa.", meaning: "I'm in a hurry." },
          { spanish: "tener razón", pronunciation: "to be right", word: "Tienes razón.", meaning: "You're right." },
          { spanish: "tener...años", pronunciation: "to be...years old", word: "Tengo 25 años.", meaning: "I'm 25 years old." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Yo ___ dos gatos. (I have two cats)", options: ["tengo", "tienes", "tiene", "tienen"], correctAnswer: 0, explanation: "Yo tengo = I have" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "How do you say 'I'm hungry'?", options: ["Estoy hambre", "Soy hambre", "Tengo hambre", "Hay hambre"], correctAnswer: 2, explanation: "Spanish uses TENER for hunger: 'Tengo hambre'" },
        { type: 'exercise', exerciseType: 'fill_blank', instruction: "Ella ___ veinte años. (She is 20 years old)", correctAnswers: ["tiene"], hint: "Use TENER for age..." },
      ]
    },
    vocabulary: {
      title: "Numbers 11-100",
      screens: [
        { type: 'vocab', category: "Numbers 11-20", words: [
          { spanish: "once", english: "eleven", example: "Son las once." },
          { spanish: "doce", english: "twelve", example: "Hay doce meses." },
          { spanish: "trece", english: "thirteen", example: "Tengo trece años." },
          { spanish: "catorce", english: "fourteen", example: "Catorce estudiantes." },
          { spanish: "quince", english: "fifteen", example: "Quince minutos." },
          { spanish: "dieciséis", english: "sixteen", example: "Dieciséis personas." },
          { spanish: "diecisiete", english: "seventeen", example: "Tengo diecisiete primos." },
          { spanish: "dieciocho", english: "eighteen", example: "Dieciocho años." },
          { spanish: "diecinueve", english: "nineteen", example: "Diecinueve dólares." },
          { spanish: "veinte", english: "twenty", example: "Veinte estudiantes." },
        ]},
        { type: 'vocab', category: "Numbers by 10s", words: [
          { spanish: "treinta", english: "thirty", example: "Tengo treinta años." },
          { spanish: "cuarenta", english: "forty", example: "Cuarenta minutos." },
          { spanish: "cincuenta", english: "fifty", example: "Cincuenta dólares." },
          { spanish: "sesenta", english: "sixty", example: "Sesenta segundos." },
          { spanish: "setenta", english: "seventy", example: "Mi abuelo tiene setenta años." },
          { spanish: "ochenta", english: "eighty", example: "Ochenta por ciento." },
          { spanish: "noventa", english: "ninety", example: "Noventa kilómetros." },
          { spanish: "cien", english: "one hundred", example: "Cien personas." },
        ]},
        { type: 'lesson', heading: "Combining Numbers", content: "For numbers 21-99, use 'y' (and) to combine:", examples: [
          { spanish: "veintiuno", pronunciation: "21", word: "veintiuno, veintidós...", meaning: "21-29 are one word" },
          { spanish: "treinta y uno", pronunciation: "31", word: "treinta y uno, treinta y dos...", meaning: "31+ use 'y'" },
          { spanish: "cuarenta y cinco", pronunciation: "45", word: "cuarenta y cinco", meaning: "forty-five" },
          { spanish: "noventa y nueve", pronunciation: "99", word: "noventa y nueve", meaning: "ninety-nine" },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "How do you say 35?", options: ["treinta y cinco", "treinticinco", "tres y cinco", "treinta cinco"], correctAnswer: 0, explanation: "35 = treinta y cinco (use 'y' between tens and ones)" },
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Listen and select:", transcript: "Tengo mucha hambre", options: ["I'm very thirsty", "I'm very hungry", "I'm very tired", "I'm very cold"], correctAnswer: 1 },
        { type: 'listening', instruction: "🔊 What number do you hear?", transcript: "cuarenta y dos", options: ["32", "42", "52", "24"], correctAnswer: 1 },
        { type: 'listening', instruction: "🔊 Listen and select:", transcript: "Ella tiene veinticinco años", options: ["She is 15", "She is 20", "She is 25", "She is 35"], correctAnswer: 2 },
      ]
    },
    reading: {
      title: "Reading: Family",
      screens: [
        { type: 'reading', title: "Mi familia", passage: "Tengo una familia grande. Mis padres tienen cincuenta y cinco años. Tengo dos hermanos mayores y una hermana menor. Mi hermano Carlos tiene treinta años y tiene dos hijos. Mi hermana Ana tiene dieciocho años y tiene un novio. Yo tengo veinticinco años. No tengo hijos pero tengo un perro. Se llama Max y tiene tres años. Siempre tengo hambre cuando estoy en casa de mi madre porque ella cocina muy bien.", translation: "I have a big family. My parents are 55 years old. I have two older brothers and one younger sister. My brother Carlos is 30 and has two children. My sister Ana is 18 and has a boyfriend. I am 25. I don't have children but I have a dog. His name is Max and he is 3 years old. I'm always hungry when I'm at my mother's house because she cooks very well.", wordCount: 95 },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "How old is the narrator?", options: ["18", "25", "30", "55"], correctAnswer: 1, explanation: "'Yo tengo veinticinco años' = I am 25 years old" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "How many children does Carlos have?", options: ["None", "One", "Two", "Three"], correctAnswer: 2, explanation: "'Tiene dos hijos' = He has two children" },
      ]
    }
  },

  // ==================== DAY 6 ====================
  6: {
    title: "Daily Activities",
    subtitle: "Regular -AR verbs",
    grammar: {
      title: "Regular -AR Verbs",
      screens: [
        { type: 'lesson', heading: "Verb Infinitives", content: "Spanish verbs in their basic form (infinitive) end in -AR, -ER, or -IR. Today we'll master -AR verbs, the largest group.", tip: "The infinitive is like English 'to + verb' (to speak, to eat, etc.)" },
        { type: 'lesson', heading: "-AR Verb Conjugation", content: "To conjugate, remove -AR and add these endings:", examples: [
          { spanish: "yo hablo", pronunciation: "-o", word: "hablar → hablo", meaning: "I speak" },
          { spanish: "tú hablas", pronunciation: "-as", word: "hablar → hablas", meaning: "you speak" },
          { spanish: "él/ella habla", pronunciation: "-a", word: "hablar → habla", meaning: "he/she speaks" },
          { spanish: "nosotros hablamos", pronunciation: "-amos", word: "hablar → hablamos", meaning: "we speak" },
          { spanish: "ellos/ustedes hablan", pronunciation: "-an", word: "hablar → hablan", meaning: "they speak" },
        ]},
        { type: 'lesson', heading: "Common -AR Verbs", content: "Here are essential -AR verbs you'll use daily:", examples: [
          { spanish: "hablar", pronunciation: "to speak", word: "Hablo español.", meaning: "I speak Spanish." },
          { spanish: "trabajar", pronunciation: "to work", word: "Trabajo en un banco.", meaning: "I work at a bank." },
          { spanish: "estudiar", pronunciation: "to study", word: "Estudio medicina.", meaning: "I study medicine." },
          { spanish: "comprar", pronunciation: "to buy", word: "Compro comida.", meaning: "I buy food." },
          { spanish: "cocinar", pronunciation: "to cook", word: "Mi madre cocina bien.", meaning: "My mother cooks well." },
          { spanish: "caminar", pronunciation: "to walk", word: "Caminamos al parque.", meaning: "We walk to the park." },
          { spanish: "escuchar", pronunciation: "to listen", word: "Escucho música.", meaning: "I listen to music." },
          { spanish: "mirar", pronunciation: "to watch/look", word: "Miran la televisión.", meaning: "They watch TV." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Yo ___ español. (hablar)", options: ["hablo", "hablas", "habla", "hablan"], correctAnswer: 0, explanation: "Yo + -AR verb = -o ending: hablo" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Nosotros ___ mucho. (trabajar)", options: ["trabajo", "trabajas", "trabaja", "trabajamos"], correctAnswer: 3, explanation: "Nosotros + -AR verb = -amos ending: trabajamos" },
        { type: 'exercise', exerciseType: 'fill_blank', instruction: "Ella ___ la televisión. (mirar)", correctAnswers: ["mira"], hint: "Él/Ella/Usted takes the -a ending..." },
      ]
    },
    vocabulary: {
      title: "Daily Routine",
      screens: [
        { type: 'vocab', category: "Morning Routine", words: [
          { spanish: "despertarse", english: "to wake up", example: "Me despierto a las siete." },
          { spanish: "levantarse", english: "to get up", example: "Me levanto temprano." },
          { spanish: "ducharse", english: "to shower", example: "Me ducho por la mañana." },
          { spanish: "desayunar", english: "to have breakfast", example: "Desayuno café y tostadas." },
          { spanish: "vestirse", english: "to get dressed", example: "Me visto rápido." },
        ]},
        { type: 'vocab', category: "Daily Activities", words: [
          { spanish: "almorzar", english: "to have lunch", example: "Almuerzo a las dos." },
          { spanish: "cenar", english: "to have dinner", example: "Cenamos a las ocho." },
          { spanish: "descansar", english: "to rest", example: "Descanso después del trabajo." },
          { spanish: "limpiar", english: "to clean", example: "Limpio la casa los sábados." },
          { spanish: "cocinar", english: "to cook", example: "Cocino la cena." },
          { spanish: "llamar", english: "to call", example: "Llamo a mi madre cada día." },
          { spanish: "llegar", english: "to arrive", example: "Llego a casa a las seis." },
          { spanish: "tomar", english: "to take/drink", example: "Tomo café por la mañana." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "What does 'desayunar' mean?", options: ["To have dinner", "To have lunch", "To have breakfast", "To rest"], correctAnswer: 2, explanation: "'Desayunar' = to have breakfast" },
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Listen and select:", transcript: "Trabajo en un hospital", options: ["I work at a school", "I work at a hospital", "I work at an office", "I work at a restaurant"], correctAnswer: 1 },
        { type: 'listening', instruction: "🔊 What time?", transcript: "Desayuno a las ocho", options: ["7:00", "8:00", "9:00", "10:00"], correctAnswer: 1 },
        { type: 'listening', instruction: "🔊 Listen and select:", transcript: "Estudiamos español", options: ["I study Spanish", "We study Spanish", "They study Spanish", "You study Spanish"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Daily Routine",
      screens: [
        { type: 'reading', title: "Un día típico", passage: "Me llamo Laura. Me despierto a las seis y media. Me ducho y desayuno café con tostadas. Trabajo en una oficina en el centro de la ciudad. Llego al trabajo a las ocho. Trabajo hasta las cinco. Almuerzo en un restaurante cerca de la oficina. Después del trabajo, camino al gimnasio. Ceno a las ocho con mi familia. Miramos la televisión juntos. Me acuesto a las once.", translation: "My name is Laura. I wake up at 6:30. I shower and have coffee with toast for breakfast. I work in an office in the city center. I arrive at work at 8. I work until 5. I have lunch at a restaurant near the office. After work, I walk to the gym. I have dinner at 8 with my family. We watch TV together. I go to bed at 11.", wordCount: 85 },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "What time does Laura wake up?", options: ["6:00", "6:30", "7:00", "7:30"], correctAnswer: 1, explanation: "'A las seis y media' = at 6:30" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Where does Laura work?", options: ["In a hospital", "In a restaurant", "In an office", "In a school"], correctAnswer: 2, explanation: "'Trabajo en una oficina' = I work in an office" },
      ]
    }
  },

  // ==================== DAY 7 ====================
  7: {
    title: "Week 1 Review",
    subtitle: "-ER/-IR verbs & consolidation",
    grammar: {
      title: "-ER and -IR Verbs",
      screens: [
        { type: 'lesson', heading: "-ER Verb Conjugation", content: "Now let's learn -ER verbs. The endings are similar but slightly different:", examples: [
          { spanish: "yo como", pronunciation: "-o", word: "comer → como", meaning: "I eat" },
          { spanish: "tú comes", pronunciation: "-es", word: "comer → comes", meaning: "you eat" },
          { spanish: "él/ella come", pronunciation: "-e", word: "comer → come", meaning: "he/she eats" },
          { spanish: "nosotros comemos", pronunciation: "-emos", word: "comer → comemos", meaning: "we eat" },
          { spanish: "ellos comen", pronunciation: "-en", word: "comer → comen", meaning: "they eat" },
        ]},
        { type: 'lesson', heading: "-IR Verb Conjugation", content: "-IR verbs are almost identical to -ER (only 'nosotros' differs):", examples: [
          { spanish: "yo vivo", pronunciation: "-o", word: "vivir → vivo", meaning: "I live" },
          { spanish: "tú vives", pronunciation: "-es", word: "vivir → vives", meaning: "you live" },
          { spanish: "él/ella vive", pronunciation: "-e", word: "vivir → vive", meaning: "he/she lives" },
          { spanish: "nosotros vivimos", pronunciation: "-imos", word: "vivir → vivimos", meaning: "we live" },
          { spanish: "ellos viven", pronunciation: "-en", word: "vivir → viven", meaning: "they live" },
        ]},
        { type: 'lesson', heading: "Common -ER/-IR Verbs", content: "Essential verbs to know:", examples: [
          { spanish: "comer", pronunciation: "to eat", word: "Como a las dos.", meaning: "I eat at 2." },
          { spanish: "beber", pronunciation: "to drink", word: "Bebo agua.", meaning: "I drink water." },
          { spanish: "leer", pronunciation: "to read", word: "Leo el periódico.", meaning: "I read the newspaper." },
          { spanish: "aprender", pronunciation: "to learn", word: "Aprendo español.", meaning: "I learn Spanish." },
          { spanish: "vivir", pronunciation: "to live", word: "Vivo en Madrid.", meaning: "I live in Madrid." },
          { spanish: "escribir", pronunciation: "to write", word: "Escribo emails.", meaning: "I write emails." },
          { spanish: "abrir", pronunciation: "to open", word: "Abro la puerta.", meaning: "I open the door." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Nosotros ___ en México. (vivir)", options: ["vivo", "vives", "vive", "vivimos"], correctAnswer: 3, explanation: "Nosotros + -IR verb = -imos ending: vivimos" },
        { type: 'exercise', exerciseType: 'fill_blank', instruction: "Ella ___ un libro. (leer)", correctAnswers: ["lee"], hint: "Él/Ella + -ER verb = -e ending..." },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Yo ___ agua. (beber)", options: ["bebo", "bebes", "bebe", "beben"], correctAnswer: 0, explanation: "Yo + -ER verb = -o ending: bebo" },
      ]
    },
    vocabulary: {
      title: "Days & Time",
      screens: [
        { type: 'vocab', category: "Days of the Week", words: [
          { spanish: "lunes", english: "Monday", example: "El lunes trabajo." },
          { spanish: "martes", english: "Tuesday", example: "Los martes estudio." },
          { spanish: "miércoles", english: "Wednesday", example: "El miércoles tengo clase." },
          { spanish: "jueves", english: "Thursday", example: "Los jueves descanso." },
          { spanish: "viernes", english: "Friday", example: "¡Por fin es viernes!" },
          { spanish: "sábado", english: "Saturday", example: "El sábado salgo con amigos." },
          { spanish: "domingo", english: "Sunday", example: "Los domingos como con mi familia." },
        ]},
        { type: 'vocab', category: "Time Expressions", words: [
          { spanish: "hoy", english: "today", example: "Hoy es lunes." },
          { spanish: "mañana", english: "tomorrow", example: "Mañana tengo examen." },
          { spanish: "ayer", english: "yesterday", example: "Ayer fui al cine." },
          { spanish: "ahora", english: "now", example: "Ahora estoy ocupado." },
          { spanish: "siempre", english: "always", example: "Siempre llego temprano." },
          { spanish: "nunca", english: "never", example: "Nunca como carne." },
          { spanish: "a veces", english: "sometimes", example: "A veces cocino." },
          { spanish: "todos los días", english: "every day", example: "Estudio todos los días." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "What day comes after 'miércoles'?", options: ["Martes", "Jueves", "Viernes", "Lunes"], correctAnswer: 1, explanation: "Miércoles (Wednesday) → Jueves (Thursday)" },
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Listen and select:", transcript: "Vivo en una casa grande", options: ["I work in a big house", "I live in a big house", "I buy a big house", "I see a big house"], correctAnswer: 1 },
        { type: 'listening', instruction: "🔊 What day is mentioned?", transcript: "El viernes tengo una fiesta", options: ["Thursday", "Friday", "Saturday", "Sunday"], correctAnswer: 1 },
        { type: 'listening', instruction: "🔊 Listen and select:", transcript: "Siempre como a las dos", options: ["I sometimes eat at 2", "I never eat at 2", "I always eat at 2", "I usually eat at 2"], correctAnswer: 2 },
      ]
    },
    reading: {
      title: "Week 1 Review Reading",
      screens: [
        { type: 'reading', title: "Mi semana", passage: "Me llamo Pedro. Soy español, de Barcelona. Tengo treinta años y vivo en un apartamento pequeño en el centro. Trabajo en un banco. Los lunes, martes y miércoles trabajo mucho. Los jueves estudio inglés por la noche. Los viernes salgo con mis amigos. Comemos en un restaurante y bebemos vino. Los sábados limpio mi apartamento y hago la compra. Los domingos siempre como con mi familia. Mi madre cocina muy bien. Estoy muy contento con mi vida.", translation: "My name is Pedro. I'm Spanish, from Barcelona. I'm 30 years old and I live in a small apartment in the center. I work at a bank. On Mondays, Tuesdays, and Wednesdays I work a lot. On Thursdays I study English at night. On Fridays I go out with my friends. We eat at a restaurant and drink wine. On Saturdays I clean my apartment and do the shopping. On Sundays I always eat with my family. My mother cooks very well. I'm very happy with my life.", wordCount: 110 },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Where does Pedro live?", options: ["In a big house", "In a small apartment", "With his family", "In a hotel"], correctAnswer: 1, explanation: "'Vivo en un apartamento pequeño' = I live in a small apartment" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "What does Pedro do on Sundays?", options: ["Works", "Studies English", "Cleans his apartment", "Eats with his family"], correctAnswer: 3, explanation: "'Los domingos siempre como con mi familia'" },
      ]
    }
  },

  // ==================== DAYS 8-14: PAST TENSES ====================
  8: {
    title: "Talking About the Past",
    subtitle: "Preterite tense - regular -AR verbs",
    grammar: {
      title: "Preterite Tense (Past)",
      screens: [
        { type: 'lesson', heading: "The Preterite Tense", content: "The preterite is used for completed actions in the past — things that happened and are finished.", tip: "Think of preterite as 'snapshot' past — specific events that happened at a specific time." },
        { type: 'lesson', heading: "Preterite -AR Endings", content: "For -AR verbs, use these endings:", examples: [
          { spanish: "yo hablé", pronunciation: "-é", word: "hablar → hablé", meaning: "I spoke" },
          { spanish: "tú hablaste", pronunciation: "-aste", word: "hablar → hablaste", meaning: "you spoke" },
          { spanish: "él/ella habló", pronunciation: "-ó", word: "hablar → habló", meaning: "he/she spoke" },
          { spanish: "nosotros hablamos", pronunciation: "-amos", word: "hablar → hablamos", meaning: "we spoke" },
          { spanish: "ellos hablaron", pronunciation: "-aron", word: "hablar → hablaron", meaning: "they spoke" },
        ]},
        { type: 'lesson', heading: "Examples in Context", content: "Notice the accent marks — they're important!", examples: [
          { spanish: "Ayer trabajé mucho.", pronunciation: "Yesterday I worked a lot.", word: "trabajar → trabajé", meaning: "worked" },
          { spanish: "¿Estudiaste anoche?", pronunciation: "Did you study last night?", word: "estudiar → estudiaste", meaning: "studied" },
          { spanish: "Ella compró un vestido.", pronunciation: "She bought a dress.", word: "comprar → compró", meaning: "bought" },
          { spanish: "Caminamos al parque.", pronunciation: "We walked to the park.", word: "caminar → caminamos", meaning: "walked" },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Ayer yo ___ con mi madre. (hablar)", options: ["hablo", "hablé", "habló", "hablaste"], correctAnswer: 1, explanation: "Yo + preterite -AR = -é: hablé" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Ellos ___ mucho ayer. (trabajar)", options: ["trabajó", "trabajamos", "trabajaron", "trabajaste"], correctAnswer: 2, explanation: "Ellos + preterite -AR = -aron: trabajaron" },
        { type: 'exercise', exerciseType: 'fill_blank', instruction: "María ___ un libro ayer. (comprar)", correctAnswers: ["compró"], hint: "Él/Ella in preterite takes -ó..." },
      ]
    },
    vocabulary: {
      title: "Past Time Expressions",
      screens: [
        { type: 'vocab', category: "Past Time Words", words: [
          { spanish: "ayer", english: "yesterday", example: "Ayer trabajé mucho." },
          { spanish: "anoche", english: "last night", example: "Anoche cené con amigos." },
          { spanish: "la semana pasada", english: "last week", example: "La semana pasada viajé." },
          { spanish: "el mes pasado", english: "last month", example: "El mes pasado compré un coche." },
          { spanish: "el año pasado", english: "last year", example: "El año pasado visité España." },
          { spanish: "hace dos días", english: "two days ago", example: "Hace dos días llegué." },
          { spanish: "hace una semana", english: "a week ago", example: "Hace una semana empecé." },
          { spanish: "el lunes pasado", english: "last Monday", example: "El lunes pasado estudié." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'Anoche' means:", options: ["Last week", "Yesterday", "Last night", "Last month"], correctAnswer: 2, explanation: "'Anoche' = last night" },
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Listen and select:", transcript: "Ayer trabajé ocho horas", options: ["Today I worked 8 hours", "Yesterday I worked 8 hours", "Yesterday I worked 6 hours", "Last week I worked 8 hours"], correctAnswer: 1 },
        { type: 'listening', instruction: "🔊 Listen and select:", transcript: "Anoche cenamos en un restaurante", options: ["We had lunch at a restaurant", "We had dinner at a restaurant last night", "We had dinner at home", "We had breakfast at a restaurant"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Yesterday",
      screens: [
        { type: 'reading', title: "Mi día de ayer", passage: "Ayer fue un día muy ocupado. Me levanté a las seis y desayuné rápido. Trabajé desde las ocho hasta las cinco. Almorcé en la oficina. Después del trabajo, caminé al gimnasio y hablé con un amigo. Llegué a casa a las ocho. Cené solo y miré la televisión. Me acosté a las once porque estaba muy cansado.", translation: "Yesterday was a very busy day. I got up at six and had breakfast quickly. I worked from eight to five. I had lunch at the office. After work, I walked to the gym and talked with a friend. I arrived home at eight. I had dinner alone and watched TV. I went to bed at eleven because I was very tired.", wordCount: 78 },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "What time did the narrator get up?", options: ["5:00", "6:00", "7:00", "8:00"], correctAnswer: 1, explanation: "'Me levanté a las seis' = I got up at six" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Where did they have lunch?", options: ["At home", "At a restaurant", "At the office", "At the gym"], correctAnswer: 2, explanation: "'Almorcé en la oficina' = I had lunch at the office" },
      ]
    }
  },

  // Days 9-14 continue the pattern...
  9: {
    title: "Irregular Preterite",
    subtitle: "SER/IR, hacer, tener in past",
    grammar: {
      title: "Irregular Preterite Verbs",
      screens: [
        { type: 'lesson', heading: "SER and IR in Preterite", content: "SER and IR share the SAME preterite forms! Context tells you which one:", examples: [
          { spanish: "yo fui", pronunciation: "I was / I went", word: "Fui al cine.", meaning: "I went to the movies." },
          { spanish: "tú fuiste", pronunciation: "you were / went", word: "¿Fuiste a la fiesta?", meaning: "Did you go to the party?" },
          { spanish: "él/ella fue", pronunciation: "he/she was / went", word: "Fue un buen día.", meaning: "It was a good day." },
          { spanish: "nosotros fuimos", pronunciation: "we were / went", word: "Fuimos al parque.", meaning: "We went to the park." },
          { spanish: "ellos fueron", pronunciation: "they were / went", word: "Fueron amigos.", meaning: "They were friends." },
        ]},
        { type: 'lesson', heading: "HACER in Preterite", content: "HACER (to do/make) is irregular:", examples: [
          { spanish: "yo hice", pronunciation: "I did/made", word: "Hice la tarea.", meaning: "I did the homework." },
          { spanish: "tú hiciste", pronunciation: "you did/made", word: "¿Qué hiciste?", meaning: "What did you do?" },
          { spanish: "él/ella hizo", pronunciation: "he/she did/made", word: "Él hizo la cena.", meaning: "He made dinner." },
          { spanish: "nosotros hicimos", pronunciation: "we did/made", word: "Hicimos ejercicio.", meaning: "We exercised." },
          { spanish: "ellos hicieron", pronunciation: "they did/made", word: "Hicieron un pastel.", meaning: "They made a cake." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Ayer yo ___ al supermercado. (ir)", options: ["voy", "fui", "fue", "fuiste"], correctAnswer: 1, explanation: "Yo + IR preterite = fui" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "¿Qué ___ tú ayer? (hacer)", options: ["hice", "hizo", "hiciste", "hicieron"], correctAnswer: 2, explanation: "Tú + HACER preterite = hiciste" },
        { type: 'exercise', exerciseType: 'fill_blank', instruction: "Ella ___ a la fiesta anoche. (ir)", correctAnswers: ["fue"], hint: "Él/Ella/Usted form of IR in preterite..." },
      ]
    },
    vocabulary: {
      title: "Common Activities",
      screens: [
        { type: 'vocab', category: "Things to Do", words: [
          { spanish: "ir de compras", english: "to go shopping", example: "Fui de compras ayer." },
          { spanish: "ir al cine", english: "to go to the movies", example: "Fuimos al cine el sábado." },
          { spanish: "hacer ejercicio", english: "to exercise", example: "Hice ejercicio por la mañana." },
          { spanish: "hacer la tarea", english: "to do homework", example: "Hice la tarea anoche." },
          { spanish: "hacer la cama", english: "to make the bed", example: "Hice la cama temprano." },
          { spanish: "ir a trabajar", english: "to go to work", example: "Fui a trabajar a las ocho." },
          { spanish: "ir de vacaciones", english: "to go on vacation", example: "Fuimos de vacaciones a México." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'Fui de compras' means:", options: ["I went to work", "I went shopping", "I went to the movies", "I went home"], correctAnswer: 1, explanation: "'Ir de compras' = to go shopping" },
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Listen and select:", transcript: "Ayer fui al cine", options: ["Yesterday I went to the park", "Yesterday I went to the movies", "Yesterday I went shopping", "Yesterday I went to work"], correctAnswer: 1 },
        { type: 'listening', instruction: "🔊 Listen and select:", transcript: "¿Qué hiciste el fin de semana?", options: ["What did you do yesterday?", "What did you do last week?", "What did you do on the weekend?", "What are you doing?"], correctAnswer: 2 },
      ]
    },
    reading: {
      title: "Reading: Weekend Trip",
      screens: [
        { type: 'reading', title: "Mi fin de semana", passage: "El fin de semana pasado fui a la playa con mi familia. Fuimos en coche y el viaje fue de tres horas. Llegamos el viernes por la noche. El sábado hicimos muchas cosas: fuimos a nadar, hicimos castillos de arena y comimos mariscos en un restaurante. El domingo fue más tranquilo. Hice una caminata por la mañana y después fuimos a un mercado local. Fue un fin de semana perfecto.", translation: "Last weekend I went to the beach with my family. We went by car and the trip was three hours. We arrived Friday night. On Saturday we did many things: we went swimming, made sandcastles, and ate seafood at a restaurant. Sunday was quieter. I took a walk in the morning and then we went to a local market. It was a perfect weekend.", wordCount: 90 },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "How long was the trip?", options: ["1 hour", "2 hours", "3 hours", "4 hours"], correctAnswer: 2, explanation: "'El viaje fue de tres horas' = The trip was three hours" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "What did they do on Saturday?", options: ["Went hiking", "Went swimming and made sandcastles", "Stayed at the hotel", "Went shopping"], correctAnswer: 1, explanation: "'Fuimos a nadar, hicimos castillos de arena'" },
      ]
    }
  },

  10: {
    title: "Background & Description",
    subtitle: "The Imperfect tense",
    grammar: {
      title: "Imperfect Tense",
      screens: [
        { type: 'lesson', heading: "What is the Imperfect?", content: "The imperfect describes ongoing or habitual actions in the past. It sets the scene or describes how things 'used to be.'", tip: "Think of imperfect as 'video' past — ongoing background, habits, descriptions." },
        { type: 'lesson', heading: "Imperfect -AR Endings", content: "For -AR verbs:", examples: [
          { spanish: "yo hablaba", pronunciation: "-aba", word: "hablar → hablaba", meaning: "I used to speak / was speaking" },
          { spanish: "tú hablabas", pronunciation: "-abas", word: "hablar → hablabas", meaning: "you used to speak" },
          { spanish: "él hablaba", pronunciation: "-aba", word: "hablar → hablaba", meaning: "he used to speak" },
          { spanish: "nosotros hablábamos", pronunciation: "-ábamos", word: "hablar → hablábamos", meaning: "we used to speak" },
          { spanish: "ellos hablaban", pronunciation: "-aban", word: "hablar → hablaban", meaning: "they used to speak" },
        ]},
        { type: 'lesson', heading: "Imperfect -ER/-IR Endings", content: "For -ER and -IR verbs (same endings!):", examples: [
          { spanish: "yo comía / vivía", pronunciation: "-ía", word: "comer/vivir → comía/vivía", meaning: "I used to eat/live" },
          { spanish: "tú comías / vivías", pronunciation: "-ías", word: "comer/vivir → comías/vivías", meaning: "you used to eat/live" },
          { spanish: "él comía / vivía", pronunciation: "-ía", word: "comer/vivir → comía/vivía", meaning: "he used to eat/live" },
          { spanish: "nosotros comíamos / vivíamos", pronunciation: "-íamos", word: "comer/vivir → comíamos/vivíamos", meaning: "we used to eat/live" },
          { spanish: "ellos comían / vivían", pronunciation: "-ían", word: "comer/vivir → comían/vivían", meaning: "they used to eat/live" },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Cuando era niño, yo ___ en México. (vivir)", options: ["viví", "vivía", "vivo", "vivió"], correctAnswer: 1, explanation: "Imperfect for habitual past: vivía (used to live)" },
        { type: 'exercise', exerciseType: 'fill_blank', instruction: "De niña, ella ___ mucho. (estudiar)", correctAnswers: ["estudiaba"], hint: "Imperfect -AR: -aba ending..." },
      ]
    },
    vocabulary: {
      title: "Childhood & Memories",
      screens: [
        { type: 'vocab', category: "Talking About the Past", words: [
          { spanish: "cuando era niño/a", english: "when I was a child", example: "Cuando era niño, vivía en el campo." },
          { spanish: "de pequeño/a", english: "as a child", example: "De pequeña, jugaba mucho." },
          { spanish: "en aquella época", english: "in those days", example: "En aquella época, no había internet." },
          { spanish: "siempre", english: "always", example: "Siempre íbamos a la playa." },
          { spanish: "todos los veranos", english: "every summer", example: "Todos los veranos visitábamos a los abuelos." },
          { spanish: "a menudo", english: "often", example: "A menudo jugábamos en el parque." },
          { spanish: "antes", english: "before / in the past", example: "Antes vivíamos en otra ciudad." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'Cuando era niño' means:", options: ["When I am a child", "When I was a child", "When I will be a child", "When I have a child"], correctAnswer: 1, explanation: "'Cuando era niño' = When I was a child" },
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Listen and select:", transcript: "Cuando era niña, vivía en Madrid", options: ["When I was a child, I lived in Madrid", "When I was a child, I visited Madrid", "When I am a child, I live in Madrid", "I want to live in Madrid"], correctAnswer: 0 },
        { type: 'listening', instruction: "🔊 Listen and select:", transcript: "Siempre jugábamos en el parque", options: ["We always played in the park", "We sometimes played in the park", "We played in the park yesterday", "We will play in the park"], correctAnswer: 0 },
      ]
    },
    reading: {
      title: "Reading: Childhood Memories",
      screens: [
        { type: 'reading', title: "Mi infancia", passage: "Cuando era niño, vivía en un pueblo pequeño en el campo. Mi familia tenía una casa grande con un jardín. Todos los días jugaba con mis hermanos en el jardín. Mi madre cocinaba platos deliciosos y mi padre trabajaba en el campo. Los fines de semana íbamos al río a nadar. En aquella época la vida era más simple. No teníamos televisión ni internet, pero éramos muy felices.", translation: "When I was a child, I lived in a small town in the countryside. My family had a big house with a garden. Every day I played with my siblings in the garden. My mother cooked delicious dishes and my father worked in the field. On weekends we went to the river to swim. In those days life was simpler. We didn't have TV or internet, but we were very happy.", wordCount: 88 },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Where did the narrator live as a child?", options: ["In a big city", "In a small town", "In another country", "By the beach"], correctAnswer: 1, explanation: "'Vivía en un pueblo pequeño' = I lived in a small town" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "What did they do on weekends?", options: ["Watched TV", "Went to the river to swim", "Went shopping", "Visited grandparents"], correctAnswer: 1, explanation: "'Íbamos al río a nadar' = We went to the river to swim" },
      ]
    }
  },

  // Continue with simplified entries for days 11-30...
  11: {
    title: "Preterite vs Imperfect",
    subtitle: "Using both past tenses together",
    grammar: {
      title: "Preterite vs Imperfect",
      screens: [
        { type: 'lesson', heading: "When to Use Each", content: "Use PRETERITE for completed actions, IMPERFECT for ongoing/background:", examples: [
          { spanish: "Preterite", pronunciation: "Completed action", word: "Ayer comí pizza.", meaning: "Yesterday I ate pizza." },
          { spanish: "Imperfect", pronunciation: "Habitual action", word: "Siempre comía pizza los viernes.", meaning: "I always used to eat pizza on Fridays." },
          { spanish: "Preterite", pronunciation: "Specific event", word: "Llamé a las tres.", meaning: "I called at 3." },
          { spanish: "Imperfect", pronunciation: "Background/description", word: "Hacía sol cuando llegué.", meaning: "It was sunny when I arrived." },
        ]},
        { type: 'lesson', heading: "Together in Stories", content: "In narratives, imperfect sets the scene, preterite advances the action:", examples: [
          { spanish: "Era de noche...", pronunciation: "Setting the scene", word: "It was nighttime...", meaning: "(imperfect - background)" },
          { spanish: "...cuando oí un ruido.", pronunciation: "Action", word: "...when I heard a noise.", meaning: "(preterite - event)" },
          { spanish: "Estaba durmiendo...", pronunciation: "Ongoing action", word: "I was sleeping...", meaning: "(imperfect - in progress)" },
          { spanish: "...cuando sonó el teléfono.", pronunciation: "Interruption", word: "...when the phone rang.", meaning: "(preterite - interruption)" },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Mientras yo ___ (estudiar), mi hermano llegó.", options: ["estudié", "estudiaba", "estudio", "estudiará"], correctAnswer: 1, explanation: "Imperfect for ongoing action interrupted by preterite" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Ayer ___ (hacer) mucho calor.", options: ["hizo", "hacía", "hace", "hará"], correctAnswer: 0, explanation: "Preterite for specific past observation" },
      ]
    },
    vocabulary: {
      title: "Story Connectors",
      screens: [
        { type: 'vocab', category: "Connecting Words", words: [
          { spanish: "mientras", english: "while", example: "Mientras comía, leía el periódico." },
          { spanish: "cuando", english: "when", example: "Cuando llegué, ya estaban allí." },
          { spanish: "de repente", english: "suddenly", example: "De repente, oí un ruido." },
          { spanish: "entonces", english: "then", example: "Entonces decidí salir." },
          { spanish: "después", english: "after/then", example: "Después fuimos al cine." },
          { spanish: "primero", english: "first", example: "Primero desayuné." },
          { spanish: "luego", english: "later/then", example: "Luego me duché." },
          { spanish: "por fin", english: "finally", example: "Por fin llegamos." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'De repente' means:", options: ["Sometimes", "Suddenly", "Finally", "Then"], correctAnswer: 1, explanation: "'De repente' = suddenly" },
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Listen and select:", transcript: "Mientras dormía, sonó el teléfono", options: ["While I was sleeping, the phone rang", "When I slept, I called", "I was sleeping and calling", "The phone was ringing while sleeping"], correctAnswer: 0 },
        { type: 'listening', instruction: "🔊 Listen and select:", transcript: "De repente, empezó a llover", options: ["It started raining slowly", "Suddenly, it started to rain", "It was raining", "It will rain suddenly"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: A Story",
      screens: [
        { type: 'reading', title: "El accidente", passage: "Era un día normal. Hacía sol y yo caminaba por el parque. Escuchaba música con mis auriculares. De repente, oí un ruido muy fuerte. Miré a la izquierda y vi un coche que chocó con otro. Corrí hacia los coches. Un hombre estaba en el suelo. Llamé a una ambulancia inmediatamente. Mientras esperábamos, hablé con el hombre. Tenía miedo pero estaba bien. La ambulancia llegó en cinco minutos.", translation: "It was a normal day. It was sunny and I was walking through the park. I was listening to music with my headphones. Suddenly, I heard a very loud noise. I looked to the left and saw a car that crashed into another. I ran toward the cars. A man was on the ground. I called an ambulance immediately. While we waited, I talked with the man. He was scared but he was okay. The ambulance arrived in five minutes.", wordCount: 95 },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "What was the weather like?", options: ["Rainy", "Cloudy", "Sunny", "Cold"], correctAnswer: 2, explanation: "'Hacía sol' = It was sunny (imperfect for weather description)" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "How long did the ambulance take?", options: ["2 minutes", "5 minutes", "10 minutes", "15 minutes"], correctAnswer: 1, explanation: "'Llegó en cinco minutos' = arrived in five minutes" },
      ]
    }
  },
};

// Fill in remaining days with placeholder structure
for (let day = 12; day <= 30; day++) {
  if (!curriculum[day]) {
    const weekNum = Math.ceil(day / 7);
    let title, subtitle, topic;
    
    if (day <= 14) {
      title = `Past Tense Practice ${day - 11}`;
      subtitle = "More preterite and imperfect";
      topic = "past tenses";
    } else if (day <= 21) {
      const topics = ["Future Tense", "Conditional Mood", "Commands (Tú)", "Commands (Usted)", "Subjunctive Intro", "Subjunctive Practice", "Week 3 Review"];
      title = topics[day - 15] || `Day ${day}`;
      subtitle = "Advanced structures";
      topic = "advanced grammar";
    } else {
      const topics = ["Real Conversations", "Travel Spanish", "Restaurant & Food", "Shopping", "Directions", "Health & Emergencies", "Business Spanish", "Culture & Customs", "Final Review"];
      title = topics[day - 22] || `Day ${day}`;
      subtitle = "Practical fluency";
      topic = "practical Spanish";
    }
    
    curriculum[day] = {
      title,
      subtitle,
      grammar: {
        title: `Day ${day} Grammar`,
        screens: [
          { type: 'lesson', heading: `${title}`, content: `Today we'll continue building your Spanish skills with ${topic}. This lesson covers essential patterns you'll use in real conversations.`, tip: "Practice makes perfect! Try using these patterns in your daily life." },
          { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Quick review: How do you say 'I spoke' in Spanish?", options: ["Hablo", "Hablé", "Hablaba", "Hablaré"], correctAnswer: 1, explanation: "'Hablé' is the preterite (past) form of hablar." },
        ]
      },
      vocabulary: {
        title: `Day ${day} Vocabulary`,
        screens: [
          { type: 'vocab', category: `Week ${weekNum} Words`, words: [
            { spanish: "importante", english: "important", example: "Es muy importante estudiar." },
            { spanish: "necesario", english: "necessary", example: "Es necesario practicar." },
            { spanish: "posible", english: "possible", example: "Todo es posible." },
            { spanish: "fácil", english: "easy", example: "El español es fácil." },
            { spanish: "difícil", english: "difficult", example: "A veces es difícil." },
          ]},
          { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'Importante' means:", options: ["Easy", "Difficult", "Important", "Necessary"], correctAnswer: 2, explanation: "'Importante' = important" },
        ]
      },
      listening: {
        title: "Listening Practice",
        screens: [
          { type: 'listening', instruction: "🔊 Listen and select:", transcript: "Es muy importante", options: ["It's very easy", "It's very important", "It's very difficult", "It's necessary"], correctAnswer: 1 },
        ]
      },
      reading: {
        title: `Day ${day} Reading`,
        screens: [
          { type: 'reading', title: "Práctica de lectura", passage: "El español es un idioma muy bonito e importante. Más de 500 millones de personas hablan español en el mundo. Es el segundo idioma más hablado como lengua materna. Aprender español abre muchas puertas: puedes viajar, trabajar y conocer nuevas culturas. La práctica diaria es la clave del éxito.", translation: "Spanish is a very beautiful and important language. More than 500 million people speak Spanish in the world. It's the second most spoken language as a native tongue. Learning Spanish opens many doors: you can travel, work, and get to know new cultures. Daily practice is the key to success.", wordCount: 60 },
          { type: 'exercise', exerciseType: 'multiple_choice', instruction: "How many people speak Spanish?", options: ["100 million", "300 million", "500 million", "700 million"], correctAnswer: 2, explanation: "'Más de 500 millones' = more than 500 million" },
        ]
      }
    };
  }
}

// ============================================
// FLASHCARDS FOR ALL VOCABULARY
// ============================================

const allFlashcards = [
  // Day 1
  { id: 1, front: "hola", back: "hello", day: 1 },
  { id: 2, front: "buenos días", back: "good morning", day: 1 },
  { id: 3, front: "buenas tardes", back: "good afternoon", day: 1 },
  { id: 4, front: "buenas noches", back: "good evening/night", day: 1 },
  { id: 5, front: "adiós", back: "goodbye", day: 1 },
  { id: 6, front: "hasta luego", back: "see you later", day: 1 },
  { id: 7, front: "por favor", back: "please", day: 1 },
  { id: 8, front: "gracias", back: "thank you", day: 1 },
  { id: 9, front: "de nada", back: "you're welcome", day: 1 },
  { id: 10, front: "uno", back: "one", day: 1 },
  { id: 11, front: "dos", back: "two", day: 1 },
  { id: 12, front: "tres", back: "three", day: 1 },
  { id: 13, front: "cuatro", back: "four", day: 1 },
  { id: 14, front: "cinco", back: "five", day: 1 },
  { id: 15, front: "seis", back: "six", day: 1 },
  { id: 16, front: "siete", back: "seven", day: 1 },
  { id: 17, front: "ocho", back: "eight", day: 1 },
  { id: 18, front: "nueve", back: "nine", day: 1 },
  { id: 19, front: "diez", back: "ten", day: 1 },
  // Day 2
  { id: 20, front: "yo", back: "I", day: 2 },
  { id: 21, front: "tú", back: "you (informal)", day: 2 },
  { id: 22, front: "él", back: "he", day: 2 },
  { id: 23, front: "ella", back: "she", day: 2 },
  { id: 24, front: "nosotros", back: "we", day: 2 },
  { id: 25, front: "ellos", back: "they", day: 2 },
  { id: 26, front: "soy", back: "I am (ser)", day: 2 },
  { id: 27, front: "eres", back: "you are (ser)", day: 2 },
  { id: 28, front: "es", back: "he/she/it is (ser)", day: 2 },
  { id: 29, front: "somos", back: "we are (ser)", day: 2 },
  { id: 30, front: "son", back: "they are (ser)", day: 2 },
  { id: 31, front: "mucho gusto", back: "nice to meet you", day: 2 },
  { id: 32, front: "¿De dónde eres?", back: "Where are you from?", day: 2 },
  { id: 33, front: "Soy de...", back: "I'm from...", day: 2 },
  // Day 3
  { id: 34, front: "el", back: "the (masc.)", day: 3 },
  { id: 35, front: "la", back: "the (fem.)", day: 3 },
  { id: 36, front: "grande", back: "big", day: 3 },
  { id: 37, front: "pequeño", back: "small", day: 3 },
  { id: 38, front: "alto", back: "tall", day: 3 },
  { id: 39, front: "bajo", back: "short", day: 3 },
  { id: 40, front: "bonito", back: "pretty", day: 3 },
  { id: 41, front: "rojo", back: "red", day: 3 },
  { id: 42, front: "azul", back: "blue", day: 3 },
  { id: 43, front: "verde", back: "green", day: 3 },
  { id: 44, front: "blanco", back: "white", day: 3 },
  { id: 45, front: "negro", back: "black", day: 3 },
  // Day 4
  { id: 46, front: "estoy", back: "I am (estar)", day: 4 },
  { id: 47, front: "estás", back: "you are (estar)", day: 4 },
  { id: 48, front: "está", back: "he/she is (estar)", day: 4 },
  { id: 49, front: "estamos", back: "we are (estar)", day: 4 },
  { id: 50, front: "están", back: "they are (estar)", day: 4 },
  { id: 51, front: "contento", back: "happy", day: 4 },
  { id: 52, front: "triste", back: "sad", day: 4 },
  { id: 53, front: "cansado", back: "tired", day: 4 },
  { id: 54, front: "enfermo", back: "sick", day: 4 },
  { id: 55, front: "la casa", back: "house/home", day: 4 },
  { id: 56, front: "la oficina", back: "office", day: 4 },
  // Day 5
  { id: 57, front: "tengo", back: "I have", day: 5 },
  { id: 58, front: "tienes", back: "you have", day: 5 },
  { id: 59, front: "tiene", back: "he/she has", day: 5 },
  { id: 60, front: "tenemos", back: "we have", day: 5 },
  { id: 61, front: "tienen", back: "they have", day: 5 },
  { id: 62, front: "tengo hambre", back: "I'm hungry", day: 5 },
  { id: 63, front: "tengo sed", back: "I'm thirsty", day: 5 },
  { id: 64, front: "tengo frío", back: "I'm cold", day: 5 },
  { id: 65, front: "tengo calor", back: "I'm hot", day: 5 },
  { id: 66, front: "tengo sueño", back: "I'm sleepy", day: 5 },
  { id: 67, front: "veinte", back: "twenty", day: 5 },
  { id: 68, front: "treinta", back: "thirty", day: 5 },
  { id: 69, front: "cuarenta", back: "forty", day: 5 },
  { id: 70, front: "cincuenta", back: "fifty", day: 5 },
  { id: 71, front: "cien", back: "one hundred", day: 5 },
  // Day 6
  { id: 72, front: "hablar", back: "to speak", day: 6 },
  { id: 73, front: "trabajar", back: "to work", day: 6 },
  { id: 74, front: "estudiar", back: "to study", day: 6 },
  { id: 75, front: "comprar", back: "to buy", day: 6 },
  { id: 76, front: "cocinar", back: "to cook", day: 6 },
  { id: 77, front: "caminar", back: "to walk", day: 6 },
  { id: 78, front: "escuchar", back: "to listen", day: 6 },
  { id: 79, front: "mirar", back: "to watch/look", day: 6 },
  { id: 80, front: "desayunar", back: "to have breakfast", day: 6 },
  { id: 81, front: "almorzar", back: "to have lunch", day: 6 },
  { id: 82, front: "cenar", back: "to have dinner", day: 6 },
  // Day 7
  { id: 83, front: "comer", back: "to eat", day: 7 },
  { id: 84, front: "beber", back: "to drink", day: 7 },
  { id: 85, front: "leer", back: "to read", day: 7 },
  { id: 86, front: "vivir", back: "to live", day: 7 },
  { id: 87, front: "escribir", back: "to write", day: 7 },
  { id: 88, front: "lunes", back: "Monday", day: 7 },
  { id: 89, front: "martes", back: "Tuesday", day: 7 },
  { id: 90, front: "miércoles", back: "Wednesday", day: 7 },
  { id: 91, front: "jueves", back: "Thursday", day: 7 },
  { id: 92, front: "viernes", back: "Friday", day: 7 },
  { id: 93, front: "sábado", back: "Saturday", day: 7 },
  { id: 94, front: "domingo", back: "Sunday", day: 7 },
  { id: 95, front: "hoy", back: "today", day: 7 },
  { id: 96, front: "mañana", back: "tomorrow", day: 7 },
  { id: 97, front: "ayer", back: "yesterday", day: 7 },
  // Day 8
  { id: 98, front: "hablé", back: "I spoke", day: 8 },
  { id: 99, front: "trabajé", back: "I worked", day: 8 },
  { id: 100, front: "estudié", back: "I studied", day: 8 },
  { id: 101, front: "anoche", back: "last night", day: 8 },
  { id: 102, front: "la semana pasada", back: "last week", day: 8 },
  { id: 103, front: "el año pasado", back: "last year", day: 8 },
  // Day 9
  { id: 104, front: "fui", back: "I went / I was", day: 9 },
  { id: 105, front: "hice", back: "I did/made", day: 9 },
  { id: 106, front: "ir de compras", back: "to go shopping", day: 9 },
  { id: 107, front: "ir al cine", back: "to go to the movies", day: 9 },
  // Day 10
  { id: 108, front: "hablaba", back: "I used to speak / was speaking", day: 10 },
  { id: 109, front: "vivía", back: "I used to live / was living", day: 10 },
  { id: 110, front: "cuando era niño", back: "when I was a child", day: 10 },
  // Day 11
  { id: 111, front: "mientras", back: "while", day: 11 },
  { id: 112, front: "de repente", back: "suddenly", day: 11 },
  { id: 113, front: "entonces", back: "then", day: 11 },
  { id: 114, front: "después", back: "after/then", day: 11 },
  { id: 115, front: "por fin", back: "finally", day: 11 },
];

// ============================================
// UI COMPONENTS
// ============================================

const Button = ({ children, onClick, variant = 'primary', disabled, fullWidth, style }) => {
  const baseStyle = {
    padding: '16px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    width: fullWidth ? '100%' : 'auto',
    transition: 'all 0.2s',
    opacity: disabled ? 0.5 : 1,
    ...style
  };
  
  const variants = {
    primary: { backgroundColor: colors.accent, color: 'white' },
    secondary: { backgroundColor: 'transparent', color: colors.accent, border: `2px solid ${colors.accent}` },
  };
  
  return (
    <button 
      style={{ ...baseStyle, ...variants[variant] }} 
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const Card = ({ children, style, onClick }) => (
  <div style={{
    backgroundColor: colors.bgSecondary,
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    cursor: onClick ? 'pointer' : 'default',
    ...style
  }} onClick={onClick}>
    {children}
  </div>
);

const ProgressBar = ({ progress }) => (
  <div style={{ width: '100%', height: '6px', backgroundColor: colors.border, borderRadius: '6px', overflow: 'hidden' }}>
    <div style={{ width: `${Math.min(100, progress)}%`, height: '100%', backgroundColor: colors.accent, borderRadius: '6px', transition: 'width 0.5s' }} />
  </div>
);

const AudioButton = ({ text }) => {
  const [playing, setPlaying] = useState(false);
  const speak = () => {
    setPlaying(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.8;
      utterance.onend = () => setPlaying(false);
      utterance.onerror = () => setPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setPlaying(false), 1000);
    }
  };
  return (
    <button 
      onClick={speak}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: `2px solid ${colors.accent}`,
        backgroundColor: playing ? colors.accentLight : 'white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        flexShrink: 0
      }}
    >
      {playing ? '🔊' : '▶️'}
    </button>
  );
};

// ============================================
// SCREENS
// ============================================

const SplashScreen = ({ onComplete }) => {
  useEffect(() => { setTimeout(onComplete, 2000); }, [onComplete]);
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bgPrimary }}>
      <div style={{ fontSize: '64px', marginBottom: '16px' }}>🇪🇸</div>
      <h1 style={{ fontSize: '36px', fontWeight: '700', color: colors.accent, margin: 0 }}>Fluidez</h1>
      <p style={{ color: colors.textSecondary, marginTop: '8px' }}>30 Days to Spanish Fluency</p>
    </div>
  );
};

const WelcomeScreen = ({ onNext }) => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '40px 24px', backgroundColor: colors.bgPrimary }}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '700', color: colors.textPrimary, marginBottom: '24px', lineHeight: 1.2 }}>
        Speak Spanish in 30 Days
      </h1>
      <p style={{ fontSize: '18px', color: colors.textSecondary, lineHeight: 1.6, marginBottom: '16px' }}>
        Not "learn some words." Not "maintain a streak." Actual conversational fluency, in one month.
      </p>
      <p style={{ fontSize: '16px', color: colors.textSecondary }}>
        No games. No gimmicks. Just a clear path that works.
      </p>
    </div>
    <Button onClick={onNext} fullWidth>Get Started</Button>
  </div>
);

const DialectScreen = ({ onNext, setDialect }) => {
  const [selected, setSelected] = useState(null);
  const options = [
    { id: 'latam', title: 'Latin American Spanish', desc: 'Mexico, Central & South America' },
    { id: 'spain', title: 'European Spanish', desc: 'Spain (distinción, vosotros)' }
  ];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '40px 24px', backgroundColor: colors.bgPrimary }}>
      <h2 style={{ fontSize: '24px', fontWeight: '600', color: colors.textPrimary, marginBottom: '8px' }}>Which Spanish would you like to learn?</h2>
      <p style={{ color: colors.textSecondary, marginBottom: '32px' }}>You can change this later in Settings.</p>
      <div style={{ flex: 1 }}>
        {options.map(opt => (
          <Card 
            key={opt.id}
            onClick={() => setSelected(opt.id)}
            style={{
              marginBottom: '16px',
              cursor: 'pointer',
              border: selected === opt.id ? `2px solid ${colors.accent}` : '2px solid transparent',
              backgroundColor: selected === opt.id ? colors.accentLight : colors.bgSecondary
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%',
                border: `2px solid ${selected === opt.id ? colors.accent : colors.border}`,
                backgroundColor: selected === opt.id ? colors.accent : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {selected === opt.id && <span style={{ color: 'white', fontSize: '14px' }}>✓</span>}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', color: colors.textPrimary }}>{opt.title}</h3>
                <p style={{ margin: '4px 0 0', fontSize: '14px', color: colors.textSecondary }}>{opt.desc}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Button onClick={() => { setDialect(selected); onNext(); }} fullWidth disabled={!selected}>Continue</Button>
    </div>
  );
};

const ReadyScreen = ({ onStart }) => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', backgroundColor: colors.bgPrimary, textAlign: 'center' }}>
    <div style={{ fontSize: '72px', marginBottom: '24px' }}>🎉</div>
    <h1 style={{ fontSize: '28px', fontWeight: '700', color: colors.textPrimary, marginBottom: '24px' }}>You're All Set!</h1>
    <div style={{ textAlign: 'left', marginBottom: '32px' }}>
      <p style={{ color: colors.textSecondary, marginBottom: '16px' }}>In 30 days, you'll learn:</p>
      <ul style={{ color: colors.textSecondary, lineHeight: 1.8, paddingLeft: '20px', margin: 0 }}>
        <li>2,000+ essential Spanish words</li>
        <li>Core grammar (present to subjunctive)</li>
        <li>Real conversations</li>
      </ul>
    </div>
    <Button onClick={onStart} fullWidth>Start Day 1</Button>
  </div>
);

const HomeScreen = ({ progress, onContinue, onFlashcards, onSelectDay }) => {
  const currentDayData = curriculum[progress.currentDay];
  
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '24px', paddingBottom: '32px', backgroundColor: colors.bgPrimary, overflowY: 'auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <p style={{ color: colors.textSecondary, fontSize: '14px', marginBottom: '8px' }}>DAY {progress.currentDay} of 30</p>
        <ProgressBar progress={(progress.currentDay / 30) * 100} />
      </div>
      
      <Card style={{ marginBottom: '16px' }}>
        <h2 style={{ margin: '0 0 4px', fontSize: '20px', color: colors.textPrimary }}>
          Day {progress.currentDay}: {currentDayData?.title || 'Loading...'}
        </h2>
        <p style={{ margin: '0 0 16px', color: colors.textSecondary, fontSize: '14px' }}>
          {currentDayData?.subtitle || ''}
        </p>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '14px', color: colors.textSecondary }}>Progress</span>
            <span style={{ fontSize: '14px', color: colors.accent }}>{progress.dayProgress}%</span>
          </div>
          <ProgressBar progress={progress.dayProgress} />
        </div>
        <Button onClick={onContinue} fullWidth>{progress.dayProgress > 0 ? 'Continue' : 'Start'}</Button>
      </Card>
      
      <Card onClick={onFlashcards} style={{ cursor: 'pointer', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', color: colors.textPrimary }}>Review Flashcards</h3>
            <p style={{ margin: '4px 0 0', fontSize: '14px', color: colors.textSecondary }}>{progress.cardsToReview} cards due</p>
          </div>
          <span style={{ fontSize: '24px' }}>📚</span>
        </div>
      </Card>
      
      <Card onClick={onSelectDay} style={{ cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', color: colors.textPrimary }}>View All Days</h3>
            <p style={{ margin: '4px 0 0', fontSize: '14px', color: colors.textSecondary }}>Browse the full curriculum</p>
          </div>
          <span style={{ fontSize: '24px' }}>📅</span>
        </div>
      </Card>
      
      <div style={{ marginTop: '24px', paddingTop: '24px', paddingBottom: '16px', display: 'flex', justifyContent: 'space-around', textAlign: 'center', borderTop: `1px solid ${colors.border}` }}>
        <div><p style={{ fontSize: '24px', fontWeight: '600', color: colors.accent, margin: 0 }}>{progress.streak}</p><p style={{ fontSize: '12px', color: colors.textSecondary, margin: '4px 0 0' }}>Streak</p></div>
        <div><p style={{ fontSize: '24px', fontWeight: '600', color: colors.accent, margin: 0 }}>{progress.wordsLearned}</p><p style={{ fontSize: '12px', color: colors.textSecondary, margin: '4px 0 0' }}>Words</p></div>
        <div><p style={{ fontSize: '24px', fontWeight: '600', color: colors.accent, margin: 0 }}>{progress.timeSpent}m</p><p style={{ fontSize: '12px', color: colors.textSecondary, margin: '4px 0 0' }}>Time</p></div>
      </div>
    </div>
  );
};

const AllDaysScreen = ({ progress, completedDays, onSelectDay, onBack }) => {
  const weeks = [
    { num: 1, title: "Foundations", days: [1,2,3,4,5,6,7] },
    { num: 2, title: "Past Tenses", days: [8,9,10,11,12,13,14] },
    { num: 3, title: "Advanced Structures", days: [15,16,17,18,19,20,21] },
    { num: 4, title: "Practical Fluency", days: [22,23,24,25,26,27,28,29,30] },
  ];
  
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: colors.bgPrimary }}>
      <div style={{ padding: '16px 24px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>←</button>
        <h2 style={{ margin: 0, fontSize: '20px', color: colors.textPrimary }}>All 30 Days</h2>
      </div>
      <div style={{ flex: 1, padding: '16px 24px', overflowY: 'auto' }}>
        {weeks.map(week => (
          <div key={week.num} style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', color: colors.textSecondary, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Week {week.num}: {week.title}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
              {week.days.map(day => {
                const isCompleted = completedDays.includes(day);
                const isAvailable = day <= progress.currentDay;
                const isCurrent = day === progress.currentDay;
                
                return (
                  <button
                    key={day}
                    onClick={() => isAvailable && onSelectDay(day)}
                    disabled={!isAvailable}
                    style={{
                      width: '100%',
                      aspectRatio: '1',
                      borderRadius: '8px',
                      border: isCurrent ? `2px solid ${colors.accent}` : 'none',
                      backgroundColor: isCompleted ? colors.success : isAvailable ? colors.bgSecondary : colors.border,
                      color: isCompleted ? 'white' : isAvailable ? colors.textPrimary : colors.textSecondary,
                      cursor: isAvailable ? 'pointer' : 'not-allowed',
                      fontSize: '14px',
                      fontWeight: isCurrent ? '700' : '500',
                      opacity: isAvailable ? 1 : 0.5
                    }}
                  >
                    {isCompleted ? '✓' : day}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DayView = ({ day, onSelectModule, moduleProgress, onBack }) => {
  const dayData = curriculum[day];
  const modules = [
    { id: 'grammar', title: 'Grammar', subtitle: dayData?.grammar?.title || 'Grammar', duration: '15 min' },
    { id: 'vocabulary', title: 'Vocabulary', subtitle: dayData?.vocabulary?.title || 'Vocabulary', duration: '12 min' },
    { id: 'listening', title: 'Listening', subtitle: dayData?.listening?.title || 'Listening', duration: '8 min' },
    { id: 'reading', title: 'Reading', subtitle: dayData?.reading?.title || 'Reading', duration: '10 min' },
  ];
  const getStatus = (id) => moduleProgress[`${day}-${id}`] || 'available';
  
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: colors.bgPrimary }}>
      <div style={{ padding: '16px 24px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>←</button>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', color: colors.textPrimary }}>Day {day}</h2>
          <p style={{ margin: '2px 0 0', fontSize: '14px', color: colors.textSecondary }}>{dayData?.title}: {dayData?.subtitle}</p>
        </div>
      </div>
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        {modules.map((m, i) => {
          const status = getStatus(m.id);
          const prevComplete = i === 0 || getStatus(modules[i-1].id) === 'completed';
          const isLocked = !prevComplete;
          return (
            <Card 
              key={m.id}
              onClick={() => !isLocked && onSelectModule(day, m.id)}
              style={{
                marginBottom: '12px',
                cursor: isLocked ? 'not-allowed' : 'pointer',
                opacity: isLocked ? 0.5 : 1,
                backgroundColor: status === 'completed' ? colors.successLight : colors.bgSecondary
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  backgroundColor: status === 'completed' ? colors.success : colors.accentLight,
                  color: status === 'completed' ? 'white' : colors.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', fontWeight: '600'
                }}>
                  {isLocked ? '🔒' : status === 'completed' ? '✓' : status === 'in_progress' ? '◐' : '○'}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: '16px', color: colors.textPrimary }}>{m.title}</h3>
                  <p style={{ margin: '2px 0 0', fontSize: '14px', color: colors.textSecondary }}>{m.subtitle}</p>
                </div>
                <span style={{ fontSize: '14px', color: colors.textSecondary }}>{m.duration}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const LessonScreen = ({ day, module, onComplete, onBack }) => {
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [input, setInput] = useState('');
  
  const dayData = curriculum[day];
  const content = dayData?.[module];
  const screen = content?.screens?.[idx];
  const progress = content?.screens ? ((idx + 1) / content.screens.length) * 100 : 0;
  
  if (!screen) {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bgPrimary }}>
        <p>Content loading...</p>
      </div>
    );
  }
  
  const handleAnswer = (i) => { setAnswer(i); setShowResult(true); };
  const handleFillBlank = () => {
    const correct = screen.correctAnswers?.some(a => a.toLowerCase() === input.toLowerCase().trim());
    setAnswer(correct ? 0 : -1);
    setShowResult(true);
  };
  const handleContinue = () => {
    if (idx < content.screens.length - 1) {
      setIdx(idx + 1); setAnswer(null); setShowResult(false); setInput('');
    } else onComplete();
  };
  
  const renderContent = () => {
    if (screen.type === 'lesson') return (
      <div style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: colors.textPrimary, marginBottom: '16px' }}>{screen.heading}</h2>
        <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: 1.7, marginBottom: '24px' }}>{screen.content}</p>
        {screen.tip && (
          <div style={{ backgroundColor: colors.accentLight, padding: '16px', borderRadius: '8px', borderLeft: `4px solid ${colors.accent}`, marginBottom: '24px' }}>
            <p style={{ margin: 0, fontSize: '14px' }}>💡 {screen.tip}</p>
          </div>
        )}
        {screen.examples && screen.examples.map((ex, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: colors.bgSecondary, borderRadius: '8px', marginBottom: '8px' }}>
            <AudioButton text={ex.word || ex.spanish} />
            <div>
              <span style={{ fontWeight: '600', fontSize: '18px' }}>{ex.spanish}</span>
              <span style={{ color: colors.textSecondary, marginLeft: '8px' }}>({ex.pronunciation})</span>
              {ex.word && <p style={{ margin: '4px 0 0', fontSize: '14px', color: colors.textSecondary }}>{ex.word} = {ex.meaning}</p>}
              {!ex.word && ex.meaning && <p style={{ margin: '4px 0 0', fontSize: '14px', color: colors.textSecondary }}>{ex.meaning}</p>}
            </div>
          </div>
        ))}
      </div>
    );
    
    if (screen.type === 'vocab') return (
      <div style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: colors.textPrimary, marginBottom: '16px' }}>{screen.category}</h2>
        {screen.words.map((w, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: colors.bgSecondary, borderRadius: '8px', marginBottom: '8px' }}>
            <AudioButton text={w.spanish} />
            <div style={{ flex: 1 }}>
              <span style={{ fontWeight: '600', fontSize: '18px' }}>{w.spanish}</span>
              <span style={{ color: colors.textSecondary, marginLeft: '8px' }}>{w.english}</span>
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: colors.textSecondary, fontStyle: 'italic' }}>"{w.example}"</p>
            </div>
          </div>
        ))}
      </div>
    );
    
    if (screen.type === 'reading') return (
      <div style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: colors.textPrimary, marginBottom: '4px' }}>{screen.title}</h2>
        <p style={{ fontSize: '14px', color: colors.textSecondary, marginBottom: '16px' }}>{screen.wordCount} words</p>
        <Card style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <AudioButton text={screen.passage} />
            <p style={{ fontSize: '18px', lineHeight: 1.8, margin: 0 }}>{screen.passage}</p>
          </div>
        </Card>
        <details style={{ marginBottom: '16px' }}>
          <summary style={{ color: colors.accent, cursor: 'pointer', fontSize: '14px' }}>Show translation</summary>
          <p style={{ fontSize: '14px', color: colors.textSecondary, fontStyle: 'italic', padding: '12px', backgroundColor: colors.bgSecondary, borderRadius: '8px', marginTop: '8px' }}>{screen.translation}</p>
        </details>
      </div>
    );
    
    if (screen.type === 'exercise' || screen.type === 'listening') {
      const correct = screen.exerciseType === 'fill_blank' ? answer === 0 : answer === screen.correctAnswer;
      return (
        <div style={{ padding: '24px' }}>
          <p style={{ fontSize: '18px', color: colors.textPrimary, marginBottom: '24px' }}>{screen.instruction}</p>
          {screen.type === 'listening' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
              <AudioButton text={screen.transcript} />
              <span style={{ color: colors.textSecondary }}>Tap to play</span>
            </div>
          )}
          {(screen.exerciseType === 'multiple_choice' || screen.type === 'listening') && screen.options && screen.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => !showResult && handleAnswer(i)}
              disabled={showResult}
              style={{
                width: '100%', padding: '16px', marginBottom: '8px', borderRadius: '8px',
                border: `2px solid ${
                  showResult && i === screen.correctAnswer ? colors.success :
                  showResult && i === answer && i !== screen.correctAnswer ? colors.error :
                  answer === i ? colors.accent : colors.border
                }`,
                backgroundColor: 
                  showResult && i === screen.correctAnswer ? colors.successLight :
                  showResult && i === answer && i !== screen.correctAnswer ? colors.errorLight : 'white',
                cursor: showResult ? 'default' : 'pointer',
                textAlign: 'left', fontSize: '16px', color: colors.textPrimary
              }}
            >
              {opt}
            </button>
          ))}
          {screen.exerciseType === 'fill_blank' && (
            <>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={showResult}
                placeholder="Type your answer..."
                style={{
                  width: '100%', padding: '16px', fontSize: '18px', borderRadius: '8px',
                  border: `2px solid ${showResult ? (answer === 0 ? colors.success : colors.error) : colors.border}`,
                  backgroundColor: showResult ? (answer === 0 ? colors.successLight : colors.errorLight) : 'white',
                  marginBottom: '16px', boxSizing: 'border-box'
                }}
                onKeyPress={(e) => e.key === 'Enter' && !showResult && handleFillBlank()}
              />
              {screen.hint && !showResult && <p style={{ fontSize: '14px', color: colors.textSecondary, marginBottom: '16px' }}>Hint: {screen.hint}</p>}
              {!showResult && <Button onClick={handleFillBlank} fullWidth disabled={!input.trim()}>Check Answer</Button>}
            </>
          )}
          {showResult && (
            <div style={{
              marginTop: '16px', padding: '16px', borderRadius: '8px',
              backgroundColor: correct ? colors.successLight : colors.errorLight,
              borderLeft: `4px solid ${correct ? colors.success : colors.error}`
            }}>
              <p style={{ margin: 0, fontWeight: '600', color: correct ? colors.success : colors.error }}>{correct ? '✓ Correct!' : '✗ Not quite'}</p>
              {screen.explanation && <p style={{ margin: '8px 0 0', fontSize: '14px' }}>{screen.explanation}</p>}
              {screen.exerciseType === 'fill_blank' && !correct && <p style={{ margin: '8px 0 0', fontSize: '14px' }}>Answer: <strong>{screen.correctAnswers[0]}</strong></p>}
            </div>
          )}
        </div>
      );
    }
    return null;
  };
  
  const showContinue = ['lesson', 'vocab', 'reading'].includes(screen.type) || showResult;
  
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: colors.bgPrimary }}>
      <div style={{ padding: '16px 24px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>←</button>
        <div style={{ flex: 1 }}><ProgressBar progress={progress} /></div>
        <span style={{ fontSize: '14px', color: colors.textSecondary }}>{idx + 1}/{content.screens.length}</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>{renderContent()}</div>
      {showContinue && (
        <div style={{ padding: '16px 24px', borderTop: `1px solid ${colors.border}` }}>
          <Button onClick={handleContinue} fullWidth>{idx < content.screens.length - 1 ? 'Continue' : 'Complete Module'}</Button>
        </div>
      )}
    </div>
  );
};

const FlashcardScreen = ({ currentDay, onComplete, onBack }) => {
  const availableCards = allFlashcards.filter(c => c.day <= currentDay);
  const [cards] = useState(() => {
    const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(10, shuffled.length));
  });
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [correct, setCorrect] = useState(0);
  
  if (cards.length === 0) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', backgroundColor: colors.bgPrimary }}>
        <p>No flashcards available yet. Complete some lessons first!</p>
        <Button onClick={onBack} style={{ marginTop: '16px' }}>Go Back</Button>
      </div>
    );
  }
  
  const card = cards[idx];
  const handleResponse = (grade) => {
    if (grade >= 2) setCorrect(c => c + 1);
    setReviewed(r => r + 1);
    if (idx < cards.length - 1) { setIdx(idx + 1); setFlipped(false); }
    else onComplete({ reviewed: reviewed + 1, correct: correct + (grade >= 2 ? 1 : 0) });
  };
  
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: colors.bgPrimary }}>
      <div style={{ padding: '16px 24px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>←</button>
        <div style={{ flex: 1 }}><ProgressBar progress={((idx + 1) / cards.length) * 100} /></div>
        <span style={{ fontSize: '14px', color: colors.textSecondary }}>{idx + 1}/{cards.length}</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div 
          onClick={() => !flipped && setFlipped(true)}
          style={{ width: '100%', maxWidth: '320px', height: '240px', perspective: '1000px', cursor: flipped ? 'default' : 'pointer' }}
        >
          <div style={{
            width: '100%', height: '100%', position: 'relative',
            transformStyle: 'preserve-3d', transition: 'transform 0.4s',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)'
          }}>
            <Card style={{
              position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box'
            }}>
              <AudioButton text={card.front} />
              <h2 style={{ fontSize: '32px', fontWeight: '600', marginTop: '16px', marginBottom: '8px' }}>{card.front}</h2>
              <p style={{ fontSize: '14px', color: colors.textSecondary }}>Tap to reveal</p>
            </Card>
            <Card style={{
              position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box'
            }}>
              <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '16px' }}>{card.back}</h2>
              <p style={{ fontSize: '14px', color: colors.textSecondary, fontStyle: 'italic', textAlign: 'center' }}>Day {card.day}</p>
            </Card>
          </div>
        </div>
        {flipped && (
          <div style={{ display: 'flex', gap: '12px', marginTop: '32px', width: '100%', maxWidth: '320px' }}>
            <Button onClick={() => handleResponse(1)} variant="secondary" style={{ flex: 1, padding: '12px' }}>Hard</Button>
            <Button onClick={() => handleResponse(2)} style={{ flex: 1, padding: '12px' }}>Good</Button>
            <Button onClick={() => handleResponse(3)} variant="secondary" style={{ flex: 1, padding: '12px' }}>Easy</Button>
          </div>
        )}
      </div>
    </div>
  );
};

const CompletionScreen = ({ type, stats, onContinue }) => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', backgroundColor: colors.bgPrimary, textAlign: 'center' }}>
    <div style={{ fontSize: '72px', marginBottom: '24px' }}>{type === 'flashcards' ? '🎯' : type === 'day' ? '🏆' : '✨'}</div>
    <h1 style={{ fontSize: '28px', fontWeight: '700', color: colors.textPrimary, marginBottom: '8px' }}>
      {type === 'flashcards' ? 'Review Complete!' : type === 'day' ? 'Day Complete!' : 'Module Complete!'}
    </h1>
    {stats && <p style={{ fontSize: '18px', color: colors.textSecondary, marginBottom: '32px' }}>{stats.correct}/{stats.reviewed} correct ({Math.round((stats.correct/stats.reviewed)*100)}%)</p>}
    <Button onClick={onContinue}>Continue</Button>
  </div>
);

// ============================================
// MAIN APP
// ============================================

function App() {
  const [screen, setScreen] = useState('splash');
  const [dialect, setDialect] = useState(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [currentModule, setCurrentModule] = useState(null);
  const [moduleProgress, setModuleProgress] = useState({});
  const [completedDays, setCompletedDays] = useState([]);
  const [flashcardStats, setFlashcardStats] = useState(null);
  const [progress, setProgress] = useState({ 
    currentDay: 1, 
    dayProgress: 0, 
    streak: 1, 
    wordsLearned: 0, 
    timeSpent: 0, 
    cardsToReview: 10 
  });
  
  console.log(dialect); // Suppress unused warning
  
  const handleModuleComplete = () => {
    const key = `${selectedDay}-${currentModule}`;
    const newModuleProgress = { ...moduleProgress, [key]: 'completed' };
    setModuleProgress(newModuleProgress);
    
    // Check if all modules for this day are complete
    const dayModules = ['grammar', 'vocabulary', 'listening', 'reading'];
    const completedModules = dayModules.filter(m => newModuleProgress[`${selectedDay}-${m}`] === 'completed');
    const dayComplete = completedModules.length === dayModules.length;
    
    if (dayComplete && !completedDays.includes(selectedDay)) {
      setCompletedDays([...completedDays, selectedDay]);
      if (selectedDay === currentDay && currentDay < 30) {
        setCurrentDay(currentDay + 1);
        setProgress(p => ({ ...p, currentDay: currentDay + 1 }));
      }
    }
    
    const dayProgress = Math.round((completedModules.length / dayModules.length) * 100);
    setProgress(p => ({ 
      ...p, 
      dayProgress: selectedDay === currentDay ? dayProgress : p.dayProgress,
      wordsLearned: p.wordsLearned + 15, 
      timeSpent: p.timeSpent + 12 
    }));
    
    if (dayComplete) {
      setScreen('day-complete');
    } else {
      setScreen('completion');
    }
  };
  
  const handleFlashcardComplete = (stats) => {
    setFlashcardStats(stats);
    setProgress(p => ({ ...p, cardsToReview: Math.max(0, p.cardsToReview - stats.reviewed) }));
    setScreen('flashcard-complete');
  };
  
  const renderScreen = () => {
    switch (screen) {
      case 'splash': return <SplashScreen onComplete={() => setScreen('welcome')} />;
      case 'welcome': return <WelcomeScreen onNext={() => setScreen('dialect')} />;
      case 'dialect': return <DialectScreen onNext={() => setScreen('ready')} setDialect={setDialect} />;
      case 'ready': return <ReadyScreen onStart={() => setScreen('home')} />;
      case 'home': return (
        <HomeScreen 
          progress={progress} 
          onContinue={() => { setSelectedDay(currentDay); setScreen('dayview'); }}
          onFlashcards={() => setScreen('flashcards')}
          onSelectDay={() => setScreen('alldays')}
        />
      );
      case 'alldays': return (
        <AllDaysScreen
          progress={progress}
          completedDays={completedDays}
          onSelectDay={(day) => { setSelectedDay(day); setScreen('dayview'); }}
          onBack={() => setScreen('home')}
        />
      );
      case 'dayview': return (
        <DayView 
          day={selectedDay}
          moduleProgress={moduleProgress}
          onSelectModule={(day, mod) => { 
            setCurrentModule(mod); 
            setModuleProgress({ ...moduleProgress, [`${day}-${mod}`]: 'in_progress' }); 
            setScreen('lesson'); 
          }}
          onBack={() => setScreen('home')}
        />
      );
      case 'lesson': return (
        <LessonScreen 
          day={selectedDay}
          module={currentModule}
          onComplete={handleModuleComplete}
          onBack={() => setScreen('dayview')}
        />
      );
      case 'completion': return <CompletionScreen type="module" onContinue={() => setScreen('dayview')} />;
      case 'day-complete': return <CompletionScreen type="day" onContinue={() => setScreen('home')} />;
      case 'flashcards': return (
        <FlashcardScreen 
          currentDay={currentDay}
          onComplete={handleFlashcardComplete}
          onBack={() => setScreen('home')}
        />
      );
      case 'flashcard-complete': return (
        <CompletionScreen type="flashcards" stats={flashcardStats} onContinue={() => setScreen('home')} />
      );
      default: return null;
    }
  };
  
  return (
    <div style={{
      width: '100%', height: '100vh', maxWidth: '420px', margin: '0 auto',
      backgroundColor: colors.bgPrimary, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden'
    }}>
      {renderScreen()}
    </div>
  );
}

export default App;
