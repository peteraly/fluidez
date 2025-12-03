import React, { useState, useEffect } from 'react';

const theme = {
  colors: {
    primary: '#2D5A27',
    primaryLight: '#4A7C43',
    success: '#228B22',
    warning: '#DAA520',
    error: '#CD5C5C',
    background: '#FAF9F6',
    surface: '#FFFFFF',
    text: '#2C2C2C',
    textLight: '#666666',
    border: '#E0E0E0',
  },
};

const TOTAL_DAYS = 11;

const curriculum = {
  1: {
    title: "Spanish Sounds & The Alphabet",
    subtitle: "Foundation of pronunciation",
    grammar: {
      title: "Pronunciation Fundamentals",
      screens: [
        { type: 'lesson', heading: "Welcome to Spanish!", content: "Spanish is a phonetic language—once you learn the sounds, you can pronounce any word correctly just by reading it.", tip: "Spanish has only 5 vowel sounds (English has 14+)!" },
        { type: 'lesson', heading: "The 5 Spanish Vowels", content: "Each vowel has ONE sound, always:", examples: [
          { spanish: "A = 'ah'", pronunciation: "like 'father'", word: "casa", meaning: "house" },
          { spanish: "E = 'eh'", pronunciation: "like 'pet'", word: "este", meaning: "this" },
          { spanish: "I = 'ee'", pronunciation: "like 'feet'", word: "sí", meaning: "yes" },
          { spanish: "O = 'oh'", pronunciation: "like 'hope'", word: "hola", meaning: "hello" },
          { spanish: "U = 'oo'", pronunciation: "like 'food'", word: "uno", meaning: "one" },
        ]},
        { type: 'lesson', heading: "Key Consonants", content: "These sound different from English:", examples: [
          { spanish: "H", pronunciation: "Always SILENT", word: "hola = 'oh-la'", meaning: "hello" },
          { spanish: "J", pronunciation: "Like English 'h'", word: "Juan", meaning: "John" },
          { spanish: "LL", pronunciation: "Like 'y'", word: "llamar", meaning: "to call" },
          { spanish: "Ñ", pronunciation: "Like 'ny'", word: "mañana", meaning: "tomorrow" },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "How is 'H' pronounced in Spanish?", options: ["Like English 'h'", "It's silent", "Like 'ch'"], correctAnswer: 1, explanation: "H is always silent in Spanish." },
      ]
    },
    vocabulary: {
      title: "Essential First Words",
      screens: [
        { type: 'vocab', category: "Greetings", words: [
          { spanish: "¡Hola!", english: "Hello!", example: "¡Hola! ¿Cómo estás?" },
          { spanish: "Buenos días", english: "Good morning", example: "Buenos días, señor." },
          { spanish: "Buenas tardes", english: "Good afternoon", example: "Buenas tardes." },
          { spanish: "Buenas noches", english: "Good evening", example: "Buenas noches." },
        ]},
        { type: 'vocab', category: "Courtesy", words: [
          { spanish: "Gracias", english: "Thank you", example: "Muchas gracias." },
          { spanish: "De nada", english: "You're welcome", example: "De nada." },
          { spanish: "Por favor", english: "Please", example: "Un café, por favor." },
          { spanish: "Adiós", english: "Goodbye", example: "Adiós, hasta luego." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "How do you say 'Good morning'?", options: ["Buenas noches", "Buenos días", "Hola"], correctAnswer: 1, explanation: "'Buenos días' = Good morning" },
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Listen and select:", transcript: "Buenos días", options: ["Buenas noches", "Buenos días", "Buenas tardes"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: First Conversation",
      screens: [
        { type: 'reading', title: "En el café", passage: "—¡Hola! Buenos días.\n—Buenos días. ¿Cómo estás?\n—Muy bien, gracias.\n—Un café, por favor.\n—Aquí tiene.\n—Gracias.\n—De nada.", translation: "—Hello! Good morning.\n—Good morning. How are you?\n—Very well, thanks.\n—A coffee, please.\n—Here you go.\n—Thanks.\n—You're welcome.", wordCount: 25 },
      ]
    }
  },
  2: {
    title: "Introducing Yourself",
    subtitle: "Subject pronouns & SER",
    grammar: {
      title: "Subject Pronouns & SER",
      screens: [
        { type: 'lesson', heading: "Subject Pronouns", content: "Subject pronouns tell us WHO does the action:", examples: [
          { spanish: "yo", pronunciation: "I", word: "Yo soy María.", meaning: "I am María." },
          { spanish: "tú", pronunciation: "you (informal)", word: "Tú eres mi amigo.", meaning: "You are my friend." },
          { spanish: "él/ella", pronunciation: "he/she", word: "Él es alto.", meaning: "He is tall." },
          { spanish: "nosotros", pronunciation: "we", word: "Nosotros somos estudiantes.", meaning: "We are students." },
          { spanish: "ellos", pronunciation: "they", word: "Ellos son amigos.", meaning: "They are friends." },
        ]},
        { type: 'lesson', heading: "SER Conjugation", content: "SER = to be (permanent):", examples: [
          { spanish: "yo soy", pronunciation: "I am", word: "Soy americano.", meaning: "I am American." },
          { spanish: "tú eres", pronunciation: "you are", word: "Eres inteligente.", meaning: "You are intelligent." },
          { spanish: "él/ella es", pronunciation: "he/she is", word: "Es alta.", meaning: "She is tall." },
          { spanish: "nosotros somos", pronunciation: "we are", word: "Somos amigos.", meaning: "We are friends." },
          { spanish: "ellos son", pronunciation: "they are", word: "Son estudiantes.", meaning: "They are students." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Yo ___ estudiante.", options: ["soy", "eres", "es", "somos"], correctAnswer: 0, explanation: "Yo soy = I am" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Ella ___ doctora.", options: ["soy", "eres", "es", "son"], correctAnswer: 2, explanation: "Ella es = She is" },
      ]
    },
    vocabulary: {
      title: "Personal Information",
      screens: [
        { type: 'vocab', category: "Introductions", words: [
          { spanish: "¿Cómo te llamas?", english: "What's your name?", example: "¡Hola! ¿Cómo te llamas?" },
          { spanish: "Me llamo...", english: "My name is...", example: "Me llamo Juan." },
          { spanish: "Mucho gusto", english: "Nice to meet you", example: "Mucho gusto." },
          { spanish: "¿De dónde eres?", english: "Where are you from?", example: "Soy de México." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Listen:", transcript: "Me llamo Carlos", options: ["My friend is Carlos", "My name is Carlos", "I call Carlos"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Meeting Someone",
      screens: [
        { type: 'reading', title: "Nueva estudiante", passage: "Hoy hay una estudiante nueva. Se llama Ana y es de Colombia. Es muy simpática.", translation: "Today there is a new student. Her name is Ana and she is from Colombia. She is very nice.", wordCount: 20 },
      ]
    }
  },
  3: {
    title: "Being & Describing",
    subtitle: "SER vs ESTAR",
    grammar: {
      title: "SER vs ESTAR",
      screens: [
        { type: 'lesson', heading: "Two Verbs for 'To Be'", content: "SER = permanent. ESTAR = temporary/location.", tip: "This is the most important distinction in Spanish!" },
        { type: 'lesson', heading: "ESTAR Conjugation", content: "ESTAR = to be (temporary):", examples: [
          { spanish: "yo estoy", pronunciation: "I am", word: "Estoy cansado.", meaning: "I am tired." },
          { spanish: "tú estás", pronunciation: "you are", word: "¿Estás bien?", meaning: "Are you okay?" },
          { spanish: "él/ella está", pronunciation: "he/she is", word: "Está en casa.", meaning: "He is at home." },
          { spanish: "nosotros estamos", pronunciation: "we are", word: "Estamos contentos.", meaning: "We are happy." },
          { spanish: "ellos están", pronunciation: "they are", word: "Están aquí.", meaning: "They are here." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "María ___ en la oficina. (location)", options: ["es", "está"], correctAnswer: 1, explanation: "Use ESTAR for location." },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Ella ___ doctora. (profession)", options: ["es", "está"], correctAnswer: 0, explanation: "Use SER for profession." },
      ]
    },
    vocabulary: {
      title: "Descriptions",
      screens: [
        { type: 'vocab', category: "Physical (SER)", words: [
          { spanish: "alto/a", english: "tall", example: "Mi padre es alto." },
          { spanish: "bajo/a", english: "short", example: "Mi madre es baja." },
          { spanish: "grande", english: "big", example: "La casa es grande." },
        ]},
        { type: 'vocab', category: "Emotions (ESTAR)", words: [
          { spanish: "contento/a", english: "happy", example: "Estoy contento." },
          { spanish: "triste", english: "sad", example: "Está triste." },
          { spanish: "cansado/a", english: "tired", example: "Estoy cansado." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Listen:", transcript: "Estoy muy cansado", options: ["I'm happy", "I'm tired", "I'm tall"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Descriptions",
      screens: [
        { type: 'reading', title: "Mi familia", passage: "Mi padre es alto. Mi madre es baja. Hoy estoy cansado pero estoy feliz.", translation: "My father is tall. My mother is short. Today I am tired but I am happy.", wordCount: 20 },
      ]
    }
  },
  4: {
    title: "Present Tense Regular Verbs",
    subtitle: "-AR, -ER, -IR conjugations",
    grammar: {
      title: "Regular Verb Conjugation",
      screens: [
        { type: 'lesson', heading: "The Three Verb Families", content: "Spanish verbs end in -AR, -ER, or -IR.", tip: "Learn these patterns—they apply to hundreds of verbs!" },
        { type: 'lesson', heading: "-AR Verbs: HABLAR", content: "Remove -AR and add:", examples: [
          { spanish: "yo hablo", pronunciation: "I speak", word: "Hablo español.", meaning: "I speak Spanish." },
          { spanish: "tú hablas", pronunciation: "you speak", word: "¿Hablas inglés?", meaning: "Do you speak English?" },
          { spanish: "él habla", pronunciation: "he speaks", word: "Habla rápido.", meaning: "He speaks fast." },
          { spanish: "nosotros hablamos", pronunciation: "we speak", word: "Hablamos español.", meaning: "We speak Spanish." },
          { spanish: "ellos hablan", pronunciation: "they speak", word: "Hablan mucho.", meaning: "They speak a lot." },
        ]},
        { type: 'lesson', heading: "-ER/-IR Verbs", content: "Similar pattern:", examples: [
          { spanish: "comer: como, comes, come, comemos, comen", pronunciation: "to eat", word: "Como a las doce.", meaning: "I eat at twelve." },
          { spanish: "vivir: vivo, vives, vive, vivimos, viven", pronunciation: "to live", word: "Vivo en Madrid.", meaning: "I live in Madrid." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Yo ___ español. (hablar)", options: ["hablo", "hablas", "habla"], correctAnswer: 0, explanation: "Yo hablo = I speak" },
      ]
    },
    vocabulary: {
      title: "Daily Activities",
      screens: [
        { type: 'vocab', category: "Common Verbs", words: [
          { spanish: "trabajar", english: "to work", example: "Trabajo mucho." },
          { spanish: "estudiar", english: "to study", example: "Estudio español." },
          { spanish: "comer", english: "to eat", example: "Como a la una." },
          { spanish: "vivir", english: "to live", example: "Vivo en Madrid." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 What does the person do?", transcript: "Trabajo en una oficina", options: ["Studies", "Works in an office", "Lives"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Daily Routine",
      screens: [
        { type: 'reading', title: "Un día típico", passage: "Me llamo Roberto. Trabajo en una oficina. Como a la una. Vivo en Madrid.", translation: "My name is Roberto. I work in an office. I eat at one. I live in Madrid.", wordCount: 20 },
      ]
    }
  },
  5: {
    title: "Essential Irregular Verbs",
    subtitle: "IR, TENER, HACER",
    grammar: {
      title: "Key Irregular Verbs",
      screens: [
        { type: 'lesson', heading: "IR (to go)", content: "Completely irregular:", examples: [
          { spanish: "yo voy", pronunciation: "I go", word: "Voy al trabajo.", meaning: "I go to work." },
          { spanish: "tú vas", pronunciation: "you go", word: "¿Adónde vas?", meaning: "Where are you going?" },
          { spanish: "él va", pronunciation: "he goes", word: "Va al cine.", meaning: "He goes to the movies." },
          { spanish: "nosotros vamos", pronunciation: "we go", word: "Vamos a la playa.", meaning: "We go to the beach." },
          { spanish: "ellos van", pronunciation: "they go", word: "Van de vacaciones.", meaning: "They go on vacation." },
        ]},
        { type: 'lesson', heading: "TENER (to have)", content: "Irregular yo + stem change:", examples: [
          { spanish: "yo tengo", pronunciation: "I have", word: "Tengo dos hermanos.", meaning: "I have two siblings." },
          { spanish: "tú tienes", pronunciation: "you have", word: "¿Tienes hambre?", meaning: "Are you hungry?" },
          { spanish: "él tiene", pronunciation: "he has", word: "Tiene mucho trabajo.", meaning: "He has a lot of work." },
        ]},
        { type: 'lesson', heading: "TENER Expressions", content: "Used where English uses 'to be':", examples: [
          { spanish: "tener hambre", pronunciation: "to be hungry", word: "Tengo hambre.", meaning: "I am hungry." },
          { spanish: "tener sed", pronunciation: "to be thirsty", word: "Tengo sed.", meaning: "I am thirsty." },
          { spanish: "tener...años", pronunciation: "to be...years old", word: "Tengo 25 años.", meaning: "I am 25." },
          { spanish: "tener que", pronunciation: "to have to", word: "Tengo que estudiar.", meaning: "I have to study." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'I am hungry' is:", options: ["Estoy hambre", "Soy hambre", "Tengo hambre"], correctAnswer: 2, explanation: "Tengo hambre (use TENER)" },
      ]
    },
    vocabulary: {
      title: "Places",
      screens: [
        { type: 'vocab', category: "Common Places", words: [
          { spanish: "la casa", english: "house/home", example: "Voy a casa." },
          { spanish: "el trabajo", english: "work", example: "Voy al trabajo." },
          { spanish: "el supermercado", english: "supermarket", example: "Voy al supermercado." },
          { spanish: "el cine", english: "movie theater", example: "Vamos al cine." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Where?", transcript: "Voy al supermercado", options: ["Bank", "Supermarket", "Restaurant"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Weekend Plans",
      screens: [
        { type: 'reading', title: "El fin de semana", passage: "El sábado voy al gimnasio. Tengo que ir al supermercado. Quiero ir al cine con mis amigos.", translation: "On Saturday I go to the gym. I have to go to the supermarket. I want to go to the movies with my friends.", wordCount: 25 },
      ]
    }
  },
  6: {
    title: "Questions & Negation",
    subtitle: "Forming questions and saying no",
    grammar: {
      title: "Question Formation",
      screens: [
        { type: 'lesson', heading: "Question Words", content: "All have accents:", examples: [
          { spanish: "¿Qué?", pronunciation: "What?", word: "¿Qué quieres?", meaning: "What do you want?" },
          { spanish: "¿Quién?", pronunciation: "Who?", word: "¿Quién es?", meaning: "Who is it?" },
          { spanish: "¿Dónde?", pronunciation: "Where?", word: "¿Dónde vives?", meaning: "Where do you live?" },
          { spanish: "¿Cuándo?", pronunciation: "When?", word: "¿Cuándo llegas?", meaning: "When do you arrive?" },
          { spanish: "¿Por qué?", pronunciation: "Why?", word: "¿Por qué?", meaning: "Why?" },
          { spanish: "¿Cómo?", pronunciation: "How?", word: "¿Cómo estás?", meaning: "How are you?" },
        ]},
        { type: 'lesson', heading: "Negation", content: "Put 'no' before the verb:", examples: [
          { spanish: "No hablo francés.", pronunciation: "I don't speak French", word: "", meaning: "" },
          { spanish: "No tengo tiempo.", pronunciation: "I don't have time", word: "", meaning: "" },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'Where do you live?'", options: ["¿Qué vives?", "¿Dónde vives?", "¿Cómo vives?"], correctAnswer: 1, explanation: "¿Dónde? = Where?" },
      ]
    },
    vocabulary: {
      title: "Conversation",
      screens: [
        { type: 'vocab', category: "Opinions", words: [
          { spanish: "me gusta", english: "I like", example: "Me gusta el chocolate." },
          { spanish: "no me gusta", english: "I don't like", example: "No me gusta el café." },
          { spanish: "me encanta", english: "I love", example: "Me encanta la música." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 What is asked?", transcript: "¿Dónde está el banco?", options: ["What is the bank?", "Where is the bank?", "When?"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Conversation",
      screens: [
        { type: 'reading', title: "En la calle", passage: "—¿Dónde está el banco?\n—No sé. No soy de aquí.\n—Gracias.", translation: "—Where is the bank?\n—I don't know. I'm not from here.\n—Thanks.", wordCount: 15 },
      ]
    }
  },
  7: {
    title: "Week 1 Review",
    subtitle: "Consolidating your foundation",
    grammar: {
      title: "Comprehensive Review",
      screens: [
        { type: 'lesson', heading: "Week 1 Summary", content: "You've learned essential Spanish!", examples: [
          { spanish: "Day 1-2", pronunciation: "SER + pronouns", word: "Soy estudiante.", meaning: "I am a student." },
          { spanish: "Day 3", pronunciation: "SER vs ESTAR", word: "Estoy cansado.", meaning: "I am tired." },
          { spanish: "Day 4-5", pronunciation: "Verbs", word: "Voy al trabajo.", meaning: "I go to work." },
          { spanish: "Day 6", pronunciation: "Questions", word: "¿Dónde vives?", meaning: "Where do you live?" },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Ella ___ de México. (origin)", options: ["es", "está"], correctAnswer: 0, explanation: "Origin uses SER" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Él ___ en la oficina. (location)", options: ["es", "está"], correctAnswer: 1, explanation: "Location uses ESTAR" },
      ]
    },
    vocabulary: {
      title: "Review Vocabulary",
      screens: [
        { type: 'vocab', category: "Essential Verbs", words: [
          { spanish: "ser", english: "to be (permanent)", example: "Soy estudiante." },
          { spanish: "estar", english: "to be (temporary)", example: "Estoy bien." },
          { spanish: "ir", english: "to go", example: "Voy a casa." },
          { spanish: "tener", english: "to have", example: "Tengo hambre." },
        ]},
      ]
    },
    listening: {
      title: "Listening Review",
      screens: [
        { type: 'listening', instruction: "🔊 Listen:", transcript: "Soy de Colombia y vivo en Madrid", options: ["From Madrid, lives in Colombia", "From Colombia, lives in Madrid"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Introduction",
      screens: [
        { type: 'reading', title: "Mi presentación", passage: "Me llamo Carlos. Soy de Argentina pero vivo en Madrid. Tengo treinta años. Soy ingeniero.", translation: "My name is Carlos. I'm from Argentina but I live in Madrid. I'm thirty years old. I'm an engineer.", wordCount: 22 },
      ]
    }
  },
  8: {
    title: "Preterite Tense: -AR Verbs",
    subtitle: "Completed past actions",
    grammar: {
      title: "Preterite -AR",
      screens: [
        { type: 'lesson', heading: "The Preterite", content: "For completed past actions.", tip: "English: 'I spoke', 'I ate'" },
        { type: 'lesson', heading: "-AR Preterite Endings", content: "Remove -AR and add:", examples: [
          { spanish: "yo hablé", pronunciation: "I spoke", word: "Hablé con María.", meaning: "I spoke with María." },
          { spanish: "tú hablaste", pronunciation: "you spoke", word: "¿Hablaste con él?", meaning: "Did you speak with him?" },
          { spanish: "él habló", pronunciation: "he spoke", word: "Habló muy bien.", meaning: "He spoke very well." },
          { spanish: "nosotros hablamos", pronunciation: "we spoke", word: "Hablamos ayer.", meaning: "We spoke yesterday." },
          { spanish: "ellos hablaron", pronunciation: "they spoke", word: "Hablaron mucho.", meaning: "They spoke a lot." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Yo ___ con María ayer. (hablar)", options: ["hablo", "hablé", "habló"], correctAnswer: 1, explanation: "Yo hablé = I spoke" },
      ]
    },
    vocabulary: {
      title: "Time Expressions",
      screens: [
        { type: 'vocab', category: "Past Time", words: [
          { spanish: "ayer", english: "yesterday", example: "Ayer trabajé." },
          { spanish: "anoche", english: "last night", example: "Anoche cené tarde." },
          { spanish: "la semana pasada", english: "last week", example: "La semana pasada estudié." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 When?", transcript: "Ayer trabajé mucho", options: ["Today", "Yesterday", "Tomorrow"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Yesterday",
      screens: [
        { type: 'reading', title: "Mi día ayer", passage: "Ayer trabajé mucho. Llegué a casa a las ocho. Cené y llamé a mi madre.", translation: "Yesterday I worked a lot. I arrived home at eight. I had dinner and called my mother.", wordCount: 20 },
      ]
    }
  },
  9: {
    title: "Preterite: -ER/-IR & Irregulars",
    subtitle: "More past tense patterns",
    grammar: {
      title: "Preterite -ER/-IR & Irregulars",
      screens: [
        { type: 'lesson', heading: "-ER/-IR Preterite", content: "Same endings for both:", examples: [
          { spanish: "yo comí / viví", pronunciation: "I ate / lived", word: "Comí pizza.", meaning: "I ate pizza." },
          { spanish: "tú comiste", pronunciation: "you ate", word: "¿Comiste bien?", meaning: "Did you eat well?" },
          { spanish: "él comió", pronunciation: "he ate", word: "Comió mucho.", meaning: "He ate a lot." },
        ]},
        { type: 'lesson', heading: "IR & SER (Same!)", content: "Identical in preterite:", examples: [
          { spanish: "fui", pronunciation: "I went / was", word: "Fui al cine.", meaning: "I went to movies." },
          { spanish: "fue", pronunciation: "he went / was", word: "Fue increíble.", meaning: "It was incredible." },
          { spanish: "fuimos", pronunciation: "we went / were", word: "Fuimos a España.", meaning: "We went to Spain." },
        ]},
        { type: 'lesson', heading: "HACER", content: "Key irregular:", examples: [
          { spanish: "hice", pronunciation: "I did", word: "Hice la tarea.", meaning: "I did homework." },
          { spanish: "hizo", pronunciation: "he did", word: "Hizo ejercicio.", meaning: "He exercised." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Yo ___ a la fiesta. (ir)", options: ["fui", "fue", "fueron"], correctAnswer: 0, explanation: "Yo fui = I went" },
      ]
    },
    vocabulary: {
      title: "Travel",
      screens: [
        { type: 'vocab', category: "Travel Verbs", words: [
          { spanish: "viajar", english: "to travel", example: "Viajé a México." },
          { spanish: "llegar", english: "to arrive", example: "Llegué tarde." },
          { spanish: "visitar", english: "to visit", example: "Visité el museo." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Where?", transcript: "Fui a Barcelona", options: ["Madrid", "Barcelona", "Seville"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: A Trip",
      screens: [
        { type: 'reading', title: "Mi viaje", passage: "El año pasado fui a Barcelona. Visité la Sagrada Familia. ¡Fue increíble!", translation: "Last year I went to Barcelona. I visited the Sagrada Familia. It was incredible!", wordCount: 18 },
      ]
    }
  },
  10: {
    title: "The Imperfect Tense",
    subtitle: "Habitual past actions",
    grammar: {
      title: "Imperfect Tense",
      screens: [
        { type: 'lesson', heading: "Imperfect vs Preterite", content: "IMPERFECT = ongoing, habitual past.", tip: "Think: 'used to', 'was doing'" },
        { type: 'lesson', heading: "-AR Imperfect", content: "Remove -AR and add:", examples: [
          { spanish: "yo hablaba", pronunciation: "I used to speak", word: "Hablaba español.", meaning: "I used to speak Spanish." },
          { spanish: "tú hablabas", pronunciation: "you used to speak", word: "Hablabas mucho.", meaning: "You used to talk a lot." },
          { spanish: "él hablaba", pronunciation: "he used to speak", word: "Hablaba rápido.", meaning: "He used to speak fast." },
        ]},
        { type: 'lesson', heading: "Only 3 Irregulars!", content: "SER, IR, VER:", examples: [
          { spanish: "era", pronunciation: "I was (ser)", word: "Era estudiante.", meaning: "I was a student." },
          { spanish: "iba", pronunciation: "I used to go", word: "Iba al cine.", meaning: "I used to go to movies." },
          { spanish: "veía", pronunciation: "I used to see", word: "Veía televisión.", meaning: "I used to watch TV." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Cuando era niño, ___ al parque. (ir)", options: ["fui", "iba", "voy"], correctAnswer: 1, explanation: "Habitual → imperfect: iba" },
      ]
    },
    vocabulary: {
      title: "Childhood",
      screens: [
        { type: 'vocab', category: "Childhood", words: [
          { spanish: "cuando era niño", english: "when I was a child", example: "Cuando era niño, jugaba mucho." },
          { spanish: "siempre", english: "always", example: "Siempre íbamos a la playa." },
          { spanish: "todos los días", english: "every day", example: "Todos los días comía helado." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Habitual or single event?", transcript: "Cuando era joven, iba al gimnasio todos los días", options: ["Single event", "Habitual action"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Childhood",
      screens: [
        { type: 'reading', title: "Mi infancia", passage: "Cuando era niño, vivía en un pueblo pequeño. Todos los días jugaba con mis hermanos. La vida era más simple.", translation: "When I was a child, I lived in a small town. Every day I played with my siblings. Life was simpler.", wordCount: 25 },
      ]
    }
  },
  11: {
    title: "Preterite vs Imperfect",
    subtitle: "Using both tenses together",
    grammar: {
      title: "Combining Tenses",
      screens: [
        { type: 'lesson', heading: "The Key Distinction", content: "Preterite = completed. Imperfect = ongoing/habitual.", tip: "Imperfect sets scene, preterite advances action." },
        { type: 'lesson', heading: "Together in Stories", content: "Imperfect for background, preterite for action:", examples: [
          { spanish: "Era de noche...", pronunciation: "Setting scene", word: "It was nighttime...", meaning: "(imperfect)" },
          { spanish: "...cuando oí un ruido.", pronunciation: "Action", word: "...when I heard a noise.", meaning: "(preterite)" },
          { spanish: "Estaba durmiendo...", pronunciation: "Ongoing", word: "I was sleeping...", meaning: "(imperfect)" },
          { spanish: "...cuando sonó el teléfono.", pronunciation: "Interruption", word: "...when the phone rang.", meaning: "(preterite)" },
        ]},
        { type: 'lesson', heading: "Trigger Words", content: "Indicators for each tense:", examples: [
          { spanish: "PRETERITE", pronunciation: "completed", word: "ayer, anoche, de repente", meaning: "yesterday, last night, suddenly" },
          { spanish: "IMPERFECT", pronunciation: "ongoing", word: "siempre, todos los días, mientras", meaning: "always, every day, while" },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Mientras yo ___ (estudiar), mi hermano llegó.", options: ["estudié", "estudiaba"], correctAnswer: 1, explanation: "Ongoing action → imperfect" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Ayer ___ (ir) al cine.", options: ["iba", "fui"], correctAnswer: 1, explanation: "'Ayer' = completed → preterite" },
      ]
    },
    vocabulary: {
      title: "Story Connectors",
      screens: [
        { type: 'vocab', category: "Connectors", words: [
          { spanish: "mientras", english: "while", example: "Mientras comía, leía." },
          { spanish: "cuando", english: "when", example: "Cuando llegué, ya estaban." },
          { spanish: "de repente", english: "suddenly", example: "De repente, oí un ruido." },
          { spanish: "entonces", english: "then", example: "Entonces decidí salir." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 What was happening?", transcript: "Mientras dormía, sonó el teléfono", options: ["Eating", "Sleeping", "Reading"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: A Story",
      screens: [
        { type: 'reading', title: "El accidente", passage: "Era un día normal. Hacía sol. Caminaba por el parque. De repente, oí un ruido fuerte. Miré y vi un accidente.", translation: "It was a normal day. It was sunny. I was walking through the park. Suddenly, I heard a loud noise. I looked and saw an accident.", wordCount: 30 },
      ]
    }
  }
};

const allFlashcards = [
  { id: 1, front: "hola", back: "hello", day: 1 },
  { id: 2, front: "gracias", back: "thank you", day: 1 },
  { id: 3, front: "por favor", back: "please", day: 1 },
  { id: 4, front: "yo soy", back: "I am (ser)", day: 2 },
  { id: 5, front: "me llamo", back: "my name is", day: 2 },
  { id: 6, front: "estoy", back: "I am (estar)", day: 3 },
  { id: 7, front: "cansado", back: "tired", day: 3 },
  { id: 8, front: "hablo", back: "I speak", day: 4 },
  { id: 9, front: "voy", back: "I go", day: 5 },
  { id: 10, front: "tengo", back: "I have", day: 5 },
  { id: 11, front: "tengo hambre", back: "I'm hungry", day: 5 },
  { id: 12, front: "¿dónde?", back: "where?", day: 6 },
  { id: 13, front: "me gusta", back: "I like", day: 6 },
  { id: 14, front: "hablé", back: "I spoke", day: 8 },
  { id: 15, front: "ayer", back: "yesterday", day: 8 },
  { id: 16, front: "fui", back: "I went/was", day: 9 },
  { id: 17, front: "hablaba", back: "I used to speak", day: 10 },
  { id: 18, front: "era", back: "I was (imperfect)", day: 10 },
  { id: 19, front: "mientras", back: "while", day: 11 },
  { id: 20, front: "de repente", back: "suddenly", day: 11 },
];

const assessments = {
  week1: {
    title: "Week 1 Assessment",
    passingScore: 70,
    questions: [
      { question: "'I am' with SER:", options: ["estoy", "soy", "tengo"], correctAnswer: 1, explanation: "Yo soy" },
      { question: "Ella ___ profesora", options: ["soy", "es", "son"], correctAnswer: 1, explanation: "Ella es" },
      { question: "Location uses:", options: ["SER", "ESTAR"], correctAnswer: 1, explanation: "ESTAR for location" },
      { question: "'I go':", options: ["voy", "tengo", "soy"], correctAnswer: 0, explanation: "Yo voy" },
      { question: "'I am hungry':", options: ["Estoy hambre", "Tengo hambre"], correctAnswer: 1, explanation: "Tengo hambre" },
    ]
  },
  final: {
    title: "Foundation Assessment",
    passingScore: 70,
    questions: [
      { question: "'Yo hablé' is:", options: ["Present", "Preterite", "Imperfect"], correctAnswer: 1, explanation: "Preterite" },
      { question: "'Yo hablaba' is:", options: ["Present", "Preterite", "Imperfect"], correctAnswer: 2, explanation: "Imperfect" },
      { question: "Preterite is for:", options: ["Habitual", "Completed"], correctAnswer: 1, explanation: "Completed actions" },
      { question: "Imperfect is for:", options: ["Single events", "Habitual/ongoing"], correctAnswer: 1, explanation: "Habitual/ongoing" },
      { question: "'De repente' triggers:", options: ["Imperfect", "Preterite"], correctAnswer: 1, explanation: "Preterite" },
    ]
  }
};

const styles = {
  container: { maxWidth: 480, margin: '0 auto', minHeight: '100vh', backgroundColor: '#FAF9F6', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' },
  header: { backgroundColor: '#2D5A27', color: 'white', padding: 20, textAlign: 'center' },
  content: { padding: 20 },
  card: { backgroundColor: 'white', borderRadius: 12, padding: 20, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  button: { backgroundColor: '#2D5A27', color: 'white', border: 'none', padding: '14px 28px', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer', width: '100%', marginTop: 12 },
  buttonSecondary: { backgroundColor: 'transparent', color: '#2D5A27', border: '2px solid #2D5A27', padding: '12px 24px', borderRadius: 8, fontSize: 16, cursor: 'pointer', width: '100%', marginTop: 8 },
  progressBar: { height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, overflow: 'hidden', marginBottom: 8 },
  progressFill: { height: '100%', backgroundColor: '#228B22', transition: 'width 0.3s ease' },
  optionButton: { display: 'block', width: '100%', padding: 16, marginBottom: 8, border: '2px solid #E0E0E0', borderRadius: 8, backgroundColor: 'white', cursor: 'pointer', textAlign: 'left', fontSize: 16 },
  heading: { fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#2C2C2C' },
  tip: { backgroundColor: '#FFF9E6', padding: 12, borderRadius: 8, marginTop: 12, borderLeft: '4px solid #DAA520' },
  flashcard: { backgroundColor: '#2D5A27', color: 'white', padding: 40, borderRadius: 16, textAlign: 'center', cursor: 'pointer', minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 600 },
};

function App() {
  const [screen, setScreen] = useState('splash');
  const [currentDay, setCurrentDay] = useState(1);
  const [progress, setProgress] = useState({});
  const [moduleProgress, setModuleProgress] = useState({});
  const [currentModule, setCurrentModule] = useState(null);
  const [screenIndex, setScreenIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState('week1');

  useEffect(() => {
    const saved = localStorage.getItem('fluidez_11day');
    if (saved) {
      const d = JSON.parse(saved);
      setProgress(d.progress || {});
      setModuleProgress(d.moduleProgress || {});
      setCurrentDay(d.currentDay || 1);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fluidez_11day', JSON.stringify({ progress, moduleProgress, currentDay }));
  }, [progress, moduleProgress, currentDay]);

  useEffect(() => {
    if (screen === 'splash') {
      const t = setTimeout(() => setScreen('home'), 2000);
      return () => clearTimeout(t);
    }
  }, [screen]);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'es-ES';
      u.rate = 0.85;
      speechSynthesis.speak(u);
    }
  };

  const getDayFlashcards = (d) => allFlashcards.filter(f => f.day <= d);
  const getCompletedDays = () => Object.keys(progress).filter(d => progress[d]?.completed).length;

  const handleModuleComplete = (module) => {
    const newMP = { ...moduleProgress, [currentDay + '-' + module]: true };
    setModuleProgress(newMP);
    const mods = ['grammar', 'vocabulary', 'listening', 'reading'];
    if (mods.filter(m => newMP[currentDay + '-' + m]).length === 4) {
      setProgress(p => ({ ...p, [currentDay]: { completed: true } }));
      if (currentDay < TOTAL_DAYS) setCurrentDay(d => d + 1);
    }
    setScreen('day');
    setCurrentModule(null);
    setScreenIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const renderExercise = (ex) => {
    const { exerciseType, instruction, options, correctAnswer, explanation } = ex;
    if (exerciseType === 'multiple_choice') {
      return (
        <div>
          <p style={{ fontSize: 18, marginBottom: 20 }}>{instruction}</p>
          {options.map((o, i) => (
            <button key={i} onClick={() => { setSelectedAnswer(i); setShowResult(true); }} disabled={showResult}
              style={{ ...styles.optionButton, backgroundColor: showResult ? (i === correctAnswer ? '#E8F5E9' : (i === selectedAnswer ? '#FFEBEE' : 'white')) : 'white' }}>
              {o}
            </button>
          ))}
          {showResult && <div style={{ ...styles.tip, backgroundColor: selectedAnswer === correctAnswer ? '#E8F5E9' : '#FFEBEE' }}><strong>{selectedAnswer === correctAnswer ? '✓ Correct!' : '✗ Incorrect'}</strong><p>{explanation}</p></div>}
        </div>
      );
    }
    return null;
  };

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <div style={{ ...styles.container, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#2D5A27' }}><h1 style={{ color: 'white', fontSize: 48 }}>🇪🇸 Fluidez</h1><p style={{ color: 'rgba(255,255,255,0.8)' }}>11-Day Spanish Foundation</p></div>;

      case 'home':
        const done = getCompletedDays();
        return (
          <div style={styles.container}>
            <div style={styles.header}><h1 style={{ margin: 0 }}>🇪🇸 Fluidez</h1><p style={{ margin: '8px 0 0', opacity: 0.9 }}>11-Day Spanish Foundation</p></div>
            <div style={styles.content}>
              <div style={styles.card}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span>Progress</span><span style={{ color: '#2D5A27' }}>{done}/{TOTAL_DAYS}</span></div><div style={styles.progressBar}><div style={{ ...styles.progressFill, width: (done/TOTAL_DAYS*100)+'%' }}/></div></div>
              <h2 style={styles.heading}>📚 Daily Lessons</h2>
              {Array.from({length: TOTAL_DAYS}, (_, i) => i + 1).map(day => {
                const d = curriculum[day], comp = progress[day]?.completed, locked = day > currentDay && !comp;
                return <div key={day} onClick={() => !locked && (setCurrentDay(day), setScreen('day'))} style={{ ...styles.card, opacity: locked ? 0.5 : 1, cursor: locked ? 'not-allowed' : 'pointer', borderLeft: '4px solid ' + (comp ? '#228B22' : (day === currentDay ? '#2D5A27' : '#E0E0E0')) }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><div><h3 style={{ margin: 0, fontSize: 16 }}>Day {day}: {d.title}</h3><p style={{ margin: '4px 0 0', fontSize: 14, color: '#666' }}>{d.subtitle}</p></div><span style={{ fontSize: 24 }}>{comp ? '✅' : (locked ? '🔒' : '→')}</span></div></div>;
              })}
              <h2 style={{ ...styles.heading, marginTop: 24 }}>🎯 Practice</h2>
              <div style={styles.card} onClick={() => setScreen('flashcards')}><h3 style={{ margin: 0 }}>📚 Flashcards ({getDayFlashcards(currentDay).length})</h3></div>
              {currentDay >= 7 && <div style={styles.card} onClick={() => { setCurrentAssessment('week1'); setScreen('assessment'); }}><h3 style={{ margin: 0 }}>📝 Week 1 Assessment</h3></div>}
              {currentDay >= 11 && <div style={styles.card} onClick={() => { setCurrentAssessment('final'); setScreen('assessment'); }}><h3 style={{ margin: 0 }}>🏆 Final Assessment</h3></div>}
            </div>
          </div>
        );

      case 'day':
        const day = curriculum[currentDay], mods = ['grammar', 'vocabulary', 'listening', 'reading'], icons = { grammar: '📖', vocabulary: '📝', listening: '🎧', reading: '📚' };
        return (
          <div style={styles.container}>
            <div style={styles.header}><button onClick={() => setScreen('home')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>← Back</button><h1 style={{ margin: 0 }}>Day {currentDay}</h1><p style={{ margin: '4px 0 0', opacity: 0.9 }}>{day.title}</p></div>
            <div style={styles.content}>
              {mods.map(m => {
                const done = moduleProgress[currentDay + '-' + m];
                return <div key={m} onClick={() => { setCurrentModule(m); setScreenIndex(0); setSelectedAnswer(null); setShowResult(false); setScreen('module'); }} style={{ ...styles.card, cursor: 'pointer', borderLeft: '4px solid ' + (done ? '#228B22' : '#E0E0E0') }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><div><h3 style={{ margin: 0, textTransform: 'capitalize' }}>{icons[m]} {m}</h3><p style={{ margin: '4px 0 0', color: '#666' }}>{day[m].title}</p></div><span>{done ? '✅' : '→'}</span></div></div>;
              })}
            </div>
          </div>
        );

      case 'module':
        const mod = curriculum[currentDay][currentModule], cur = mod.screens[screenIndex], last = screenIndex === mod.screens.length - 1;
        const next = () => { if (last) handleModuleComplete(currentModule); else { setScreenIndex(i => i + 1); setSelectedAnswer(null); setShowResult(false); } };
        return (
          <div style={styles.container}>
            <div style={styles.header}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><button onClick={() => { setScreen('day'); setCurrentModule(null); setScreenIndex(0); }} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>← Exit</button><span>{screenIndex + 1}/{mod.screens.length}</span></div><div style={styles.progressBar}><div style={{ ...styles.progressFill, width: ((screenIndex + 1)/mod.screens.length*100)+'%' }}/></div></div>
            <div style={styles.content}>
              {cur.type === 'lesson' && <div><h2 style={styles.heading}>{cur.heading}</h2><p style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 16 }}>{cur.content}</p>{cur.examples && cur.examples.map((e, i) => <div key={i} style={{ ...styles.card, padding: 16, cursor: 'pointer' }} onClick={() => speak(e.word || e.spanish)}><div style={{ fontWeight: 600, color: '#2D5A27' }}>{e.spanish}</div><div style={{ fontSize: 14, color: '#666' }}>{e.pronunciation}</div>{e.word && <div style={{ marginTop: 8 }}>{e.word}</div>}<div style={{ fontSize: 14, color: '#666' }}>{e.meaning}</div></div>)}{cur.tip && <div style={styles.tip}>💡 {cur.tip}</div>}</div>}
              {cur.type === 'vocab' && <div><h2 style={styles.heading}>{cur.category}</h2>{cur.words.map((w, i) => <div key={i} style={{ ...styles.card, padding: 16, cursor: 'pointer' }} onClick={() => speak(w.spanish)}><div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontWeight: 600 }}>{w.spanish}</span><span style={{ color: '#666' }}>{w.english}</span></div><div style={{ fontSize: 14, color: '#666', marginTop: 4, fontStyle: 'italic' }}>{w.example}</div></div>)}</div>}
              {cur.type === 'exercise' && renderExercise(cur)}
              {cur.type === 'listening' && <div><p style={{ fontSize: 18, marginBottom: 20 }}>{cur.instruction}</p><button onClick={() => speak(cur.transcript)} style={{ ...styles.button, backgroundColor: '#4A7C43', marginBottom: 20 }}>🔊 Play</button>{cur.options.map((o, i) => <button key={i} onClick={() => { setSelectedAnswer(i); setShowResult(true); }} disabled={showResult} style={{ ...styles.optionButton, backgroundColor: showResult ? (i === cur.correctAnswer ? '#E8F5E9' : (i === selectedAnswer ? '#FFEBEE' : 'white')) : 'white' }}>{o}</button>)}{showResult && <div style={{ ...styles.tip, backgroundColor: selectedAnswer === cur.correctAnswer ? '#E8F5E9' : '#FFEBEE' }}><strong>{selectedAnswer === cur.correctAnswer ? '✓ Correct!' : '✗ Listen again!'}</strong><p>Audio: "{cur.transcript}"</p></div>}</div>}
              {cur.type === 'reading' && <div><h2 style={styles.heading}>{cur.title}</h2><div style={{ ...styles.card, backgroundColor: '#F5F5F5' }}><p style={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>{cur.passage}</p><button onClick={() => speak(cur.passage.replace(/[—\n]/g, ' '))} style={{ ...styles.buttonSecondary, marginTop: 16 }}>🔊 Listen</button></div><details style={{ marginTop: 16 }}><summary style={{ cursor: 'pointer', color: '#2D5A27', fontWeight: 600 }}>Translation</summary><p style={{ marginTop: 8, color: '#666', whiteSpace: 'pre-line' }}>{cur.translation}</p></details></div>}
              <button style={{ ...styles.button, marginTop: 24 }} onClick={next} disabled={(cur.type === 'exercise' || cur.type === 'listening') && !showResult}>{last ? 'Complete ✓' : 'Continue →'}</button>
            </div>
          </div>
        );

      case 'flashcards':
        const cards = getDayFlashcards(currentDay), card = cards[flashcardIndex];
        return (
          <div style={styles.container}>
            <div style={styles.header}><button onClick={() => { setScreen('home'); setFlashcardIndex(0); setFlashcardFlipped(false); }} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>← Back</button><h2 style={{ margin: '8px 0 0' }}>Flashcards</h2><p style={{ opacity: 0.8 }}>{flashcardIndex + 1}/{cards.length}</p></div>
            <div style={styles.content}>
              <div onClick={() => { setFlashcardFlipped(!flashcardFlipped); if (!flashcardFlipped) speak(card.front); }} style={{ ...styles.flashcard, backgroundColor: flashcardFlipped ? '#228B22' : '#2D5A27' }}>{flashcardFlipped ? card.back : card.front}</div>
              <p style={{ textAlign: 'center', color: '#666', marginTop: 12 }}>Tap to flip</p>
              <div style={{ display: 'flex', gap: 12, marginTop: 20 }}><button onClick={() => { setFlashcardIndex(Math.max(0, flashcardIndex - 1)); setFlashcardFlipped(false); }} style={{ ...styles.buttonSecondary, flex: 1 }} disabled={flashcardIndex === 0}>← Prev</button><button onClick={() => { setFlashcardIndex(Math.min(cards.length - 1, flashcardIndex + 1)); setFlashcardFlipped(false); }} style={{ ...styles.button, flex: 1, marginTop: 0 }} disabled={flashcardIndex === cards.length - 1}>Next →</button></div>
            </div>
          </div>
        );

      case 'assessment':
        const asmt = assessments[currentAssessment], qs = asmt.questions;
        if (assessmentComplete) {
          const score = Object.keys(assessmentAnswers).filter(q => assessmentAnswers[q] === qs[parseInt(q)].correctAnswer).length, pct = (score/qs.length)*100, pass = pct >= asmt.passingScore;
          return <div style={styles.container}><div style={{ ...styles.header, backgroundColor: pass ? '#228B22' : '#DAA520' }}><h1>{pass ? '🎉 Passed!' : '📚 Keep Practicing'}</h1></div><div style={styles.content}><div style={{ ...styles.card, textAlign: 'center' }}><h2 style={{ fontSize: 48, margin: 0 }}>{score}/{qs.length}</h2><p style={{ fontSize: 24, color: '#666' }}>{pct.toFixed(0)}%</p></div><button style={styles.button} onClick={() => { setScreen('home'); setAssessmentComplete(false); setAssessmentAnswers({}); }}>Home</button></div></div>;
        }
        const ans = Object.keys(assessmentAnswers).length, q = qs[ans] || qs[qs.length-1], idx = ans < qs.length ? ans : qs.length-1;
        return (
          <div style={styles.container}>
            <div style={styles.header}><button onClick={() => { setScreen('home'); setAssessmentAnswers({}); }} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>← Exit</button><h2>{asmt.title}</h2><div style={styles.progressBar}><div style={{ ...styles.progressFill, width: (ans/qs.length*100)+'%' }}/></div></div>
            <div style={styles.content}>
              <h3 style={styles.heading}>Q{idx + 1}</h3><p style={{ fontSize: 18, marginBottom: 20 }}>{q.question}</p>
              {q.options.map((o, i) => <button key={i} onClick={() => { const na = { ...assessmentAnswers, [idx]: i }; setAssessmentAnswers(na); if (Object.keys(na).length === qs.length) setTimeout(() => setAssessmentComplete(true), 800); }} disabled={assessmentAnswers[idx] !== undefined} style={{ ...styles.optionButton, backgroundColor: assessmentAnswers[idx] !== undefined ? (i === q.correctAnswer ? '#E8F5E9' : (i === assessmentAnswers[idx] ? '#FFEBEE' : 'white')) : 'white' }}>{o}</button>)}
              {assessmentAnswers[idx] !== undefined && <div style={{ ...styles.tip, backgroundColor: assessmentAnswers[idx] === q.correctAnswer ? '#E8F5E9' : '#FFEBEE' }}>{q.explanation}</div>}
            </div>
          </div>
        );

      default: return <div style={styles.container}><div style={styles.content}>Unknown screen</div></div>;
    }
  };

  return renderScreen();
}

export default App;
